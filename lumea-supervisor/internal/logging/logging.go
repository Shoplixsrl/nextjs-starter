// Package logging provides log management with ring buffer and file rotation
package logging

import (
	"bufio"
	"fmt"
	"io"
	"os"
	"path/filepath"
	"sync"
	"time"

	"github.com/shoplixsrl/lumea-supervisor/internal/events"
	"github.com/shoplixsrl/lumea-supervisor/internal/types"
)

// LogEntry represents a single log line
type LogEntry struct {
	Timestamp time.Time `json:"timestamp"`
	Stream    string    `json:"stream"` // stdout or stderr
	Line      string    `json:"line"`
}

// RingBuffer is a circular buffer for log entries
type RingBuffer struct {
	entries []LogEntry
	head    int
	tail    int
	size    int
	count   int
	mu      sync.RWMutex
}

// NewRingBuffer creates a new ring buffer with the given capacity
func NewRingBuffer(size int) *RingBuffer {
	if size <= 0 {
		size = 1000
	}
	return &RingBuffer{
		entries: make([]LogEntry, size),
		size:    size,
	}
}

// Push adds a new entry to the buffer
func (rb *RingBuffer) Push(entry LogEntry) {
	rb.mu.Lock()
	defer rb.mu.Unlock()

	rb.entries[rb.tail] = entry
	rb.tail = (rb.tail + 1) % rb.size

	if rb.count < rb.size {
		rb.count++
	} else {
		rb.head = (rb.head + 1) % rb.size
	}
}

// Tail returns the last n entries
func (rb *RingBuffer) Tail(n int) []LogEntry {
	rb.mu.RLock()
	defer rb.mu.RUnlock()

	if n <= 0 || rb.count == 0 {
		return nil
	}

	if n > rb.count {
		n = rb.count
	}

	result := make([]LogEntry, n)
	start := (rb.tail - n + rb.size) % rb.size

	for i := 0; i < n; i++ {
		result[i] = rb.entries[(start+i)%rb.size]
	}

	return result
}

// All returns all entries in order
func (rb *RingBuffer) All() []LogEntry {
	return rb.Tail(rb.count)
}

// Clear empties the buffer
func (rb *RingBuffer) Clear() {
	rb.mu.Lock()
	defer rb.mu.Unlock()

	rb.head = 0
	rb.tail = 0
	rb.count = 0
}

// Logger manages logging for a single server
type Logger struct {
	serverID    string
	config      types.LogConfig
	ringBuffer  *RingBuffer
	currentFile *os.File
	currentSize int64
	eventBus    *events.EventBus
	mu          sync.Mutex
}

// NewLogger creates a new logger for a server
func NewLogger(serverID string, config types.LogConfig, eventBus *events.EventBus) (*Logger, error) {
	// Ensure log directory exists
	if err := os.MkdirAll(config.Dir, 0755); err != nil {
		return nil, fmt.Errorf("failed to create log directory: %w", err)
	}

	l := &Logger{
		serverID:   serverID,
		config:     config,
		ringBuffer: NewRingBuffer(config.RingBufferLines),
		eventBus:   eventBus,
	}

	// Open initial log file
	if err := l.openNewFile(); err != nil {
		return nil, err
	}

	return l, nil
}

// Write writes a log line
func (l *Logger) Write(stream, line string) error {
	l.mu.Lock()
	defer l.mu.Unlock()

	entry := LogEntry{
		Timestamp: time.Now(),
		Stream:    stream,
		Line:      line,
	}

	// Add to ring buffer
	l.ringBuffer.Push(entry)

	// Publish event
	if l.eventBus != nil {
		l.eventBus.PublishLogLine(l.serverID, stream, line)
	}

	// Write to file
	if l.currentFile != nil {
		formatted := fmt.Sprintf("[%s] [%s] %s\n",
			entry.Timestamp.Format(time.RFC3339Nano),
			stream,
			line,
		)

		n, err := l.currentFile.WriteString(formatted)
		if err != nil {
			return err
		}

		l.currentSize += int64(n)

		// Check if rotation needed
		if l.config.MaxFileSizeMB > 0 && l.currentSize >= int64(l.config.MaxFileSizeMB)*1024*1024 {
			if err := l.rotate(); err != nil {
				return err
			}
		}
	}

	return nil
}

// Tail returns the last n log entries
func (l *Logger) Tail(n int) []LogEntry {
	return l.ringBuffer.Tail(n)
}

// Close closes the logger
func (l *Logger) Close() error {
	l.mu.Lock()
	defer l.mu.Unlock()

	if l.currentFile != nil {
		err := l.currentFile.Close()
		l.currentFile = nil
		return err
	}

	return nil
}

// openNewFile opens a new log file
func (l *Logger) openNewFile() error {
	filename := filepath.Join(l.config.Dir, fmt.Sprintf("%s.log", l.serverID))

	f, err := os.OpenFile(filename, os.O_CREATE|os.O_APPEND|os.O_WRONLY, 0644)
	if err != nil {
		return fmt.Errorf("failed to open log file: %w", err)
	}

	// Get current file size
	stat, err := f.Stat()
	if err != nil {
		f.Close()
		return err
	}

	l.currentFile = f
	l.currentSize = stat.Size()

	return nil
}

// rotate rotates log files
func (l *Logger) rotate() error {
	if l.currentFile != nil {
		l.currentFile.Close()
		l.currentFile = nil
	}

	baseFile := filepath.Join(l.config.Dir, fmt.Sprintf("%s.log", l.serverID))

	// Rotate existing files
	for i := l.config.MaxFiles - 1; i >= 1; i-- {
		oldPath := fmt.Sprintf("%s.%d", baseFile, i)
		newPath := fmt.Sprintf("%s.%d", baseFile, i+1)

		if i == l.config.MaxFiles-1 {
			// Remove oldest file
			os.Remove(oldPath)
		} else {
			os.Rename(oldPath, newPath)
		}
	}

	// Rename current to .1
	if _, err := os.Stat(baseFile); err == nil {
		os.Rename(baseFile, baseFile+".1")
	}

	// Open new file
	return l.openNewFile()
}

// StreamReader captures output from a process pipe
type StreamReader struct {
	reader   io.Reader
	logger   *Logger
	stream   string
	done     chan struct{}
	wg       sync.WaitGroup
}

// NewStreamReader creates a new stream reader
func NewStreamReader(reader io.Reader, logger *Logger, stream string) *StreamReader {
	return &StreamReader{
		reader: reader,
		logger: logger,
		stream: stream,
		done:   make(chan struct{}),
	}
}

// Start begins reading from the stream
func (sr *StreamReader) Start() {
	sr.wg.Add(1)
	go sr.read()
}

// Stop stops the stream reader
func (sr *StreamReader) Stop() {
	close(sr.done)
	sr.wg.Wait()
}

func (sr *StreamReader) read() {
	defer sr.wg.Done()

	scanner := bufio.NewScanner(sr.reader)
	// Increase buffer size for long lines
	buf := make([]byte, 64*1024)
	scanner.Buffer(buf, 1024*1024)

	for scanner.Scan() {
		select {
		case <-sr.done:
			return
		default:
			line := scanner.Text()
			if err := sr.logger.Write(sr.stream, line); err != nil {
				// Log error but continue
				continue
			}
		}
	}
}

// LogManager manages loggers for multiple servers
type LogManager struct {
	loggers  map[string]*Logger
	eventBus *events.EventBus
	mu       sync.RWMutex
}

// NewLogManager creates a new log manager
func NewLogManager(eventBus *events.EventBus) *LogManager {
	return &LogManager{
		loggers:  make(map[string]*Logger),
		eventBus: eventBus,
	}
}

// GetOrCreate gets or creates a logger for a server
func (lm *LogManager) GetOrCreate(serverID string, config types.LogConfig) (*Logger, error) {
	lm.mu.Lock()
	defer lm.mu.Unlock()

	if logger, exists := lm.loggers[serverID]; exists {
		return logger, nil
	}

	logger, err := NewLogger(serverID, config, lm.eventBus)
	if err != nil {
		return nil, err
	}

	lm.loggers[serverID] = logger
	return logger, nil
}

// Get retrieves a logger for a server
func (lm *LogManager) Get(serverID string) *Logger {
	lm.mu.RLock()
	defer lm.mu.RUnlock()

	return lm.loggers[serverID]
}

// Close closes and removes a logger
func (lm *LogManager) Close(serverID string) error {
	lm.mu.Lock()
	defer lm.mu.Unlock()

	if logger, exists := lm.loggers[serverID]; exists {
		err := logger.Close()
		delete(lm.loggers, serverID)
		return err
	}

	return nil
}

// CloseAll closes all loggers
func (lm *LogManager) CloseAll() {
	lm.mu.Lock()
	defer lm.mu.Unlock()

	for _, logger := range lm.loggers {
		logger.Close()
	}
	lm.loggers = make(map[string]*Logger)
}
