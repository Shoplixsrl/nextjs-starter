// Package metrics provides process and system metrics collection
package metrics

import (
	"bufio"
	"fmt"
	"os"
	"path/filepath"
	"runtime"
	"strconv"
	"strings"
	"sync"
	"time"

	"github.com/shoplixsrl/lumea-supervisor/internal/types"
)

// ProcessCollector collects metrics for a single process
type ProcessCollector struct {
	pid          int
	prevCPUTime  uint64
	prevSysTime  time.Time
	mu           sync.Mutex
}

// NewProcessCollector creates a new process collector
func NewProcessCollector(pid int) *ProcessCollector {
	return &ProcessCollector{
		pid:         pid,
		prevSysTime: time.Now(),
	}
}

// Collect gathers current metrics for the process
func (pc *ProcessCollector) Collect() (types.ProcessMetrics, error) {
	pc.mu.Lock()
	defer pc.mu.Unlock()

	metrics := types.ProcessMetrics{}

	// Read CPU usage from /proc/<pid>/stat
	cpuPct, cpuTime, err := pc.readCPU()
	if err != nil {
		return metrics, err
	}
	metrics.CPUPct = cpuPct
	pc.prevCPUTime = cpuTime
	pc.prevSysTime = time.Now()

	// Read memory from /proc/<pid>/status
	rssMB, err := pc.readMemory()
	if err != nil {
		return metrics, err
	}
	metrics.RSSMB = rssMB

	// Read FD count from /proc/<pid>/fd
	fds, err := pc.readFDs()
	if err != nil {
		return metrics, err
	}
	metrics.FDs = fds

	return metrics, nil
}

// readCPU reads CPU time from /proc/<pid>/stat
func (pc *ProcessCollector) readCPU() (float64, uint64, error) {
	path := fmt.Sprintf("/proc/%d/stat", pc.pid)
	data, err := os.ReadFile(path)
	if err != nil {
		return 0, 0, err
	}

	// Parse stat file - format: pid (comm) state ...
	// We need fields 14 (utime) and 15 (stime)
	fields := strings.Fields(string(data))
	if len(fields) < 15 {
		return 0, 0, fmt.Errorf("unexpected stat format")
	}

	// Find start of numeric fields (after comm which is in parentheses)
	startIdx := 0
	for i, f := range fields {
		if strings.HasSuffix(f, ")") {
			startIdx = i + 1
			break
		}
	}

	if startIdx+12 >= len(fields) {
		return 0, 0, fmt.Errorf("unexpected stat format")
	}

	utime, _ := strconv.ParseUint(fields[startIdx+11], 10, 64)
	stime, _ := strconv.ParseUint(fields[startIdx+12], 10, 64)
	totalTime := utime + stime

	// Calculate CPU percentage
	cpuPct := 0.0
	if pc.prevCPUTime > 0 {
		deltaTime := totalTime - pc.prevCPUTime
		elapsedSec := time.Since(pc.prevSysTime).Seconds()
		if elapsedSec > 0 {
			// Convert jiffies to seconds (typically 100 Hz = 100 jiffies per second)
			hz := uint64(100) // sysconf(_SC_CLK_TCK)
			cpuPct = float64(deltaTime) / float64(hz) / elapsedSec * 100.0
		}
	}

	return cpuPct, totalTime, nil
}

// readMemory reads RSS from /proc/<pid>/status
func (pc *ProcessCollector) readMemory() (float64, error) {
	path := fmt.Sprintf("/proc/%d/status", pc.pid)
	file, err := os.Open(path)
	if err != nil {
		return 0, err
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()
		if strings.HasPrefix(line, "VmRSS:") {
			fields := strings.Fields(line)
			if len(fields) >= 2 {
				kb, _ := strconv.ParseFloat(fields[1], 64)
				return kb / 1024.0, nil // Convert KB to MB
			}
		}
	}

	return 0, fmt.Errorf("VmRSS not found")
}

// readFDs counts open file descriptors
func (pc *ProcessCollector) readFDs() (int, error) {
	path := fmt.Sprintf("/proc/%d/fd", pc.pid)
	entries, err := os.ReadDir(path)
	if err != nil {
		return 0, err
	}
	return len(entries), nil
}

// NodeCollector collects system-wide metrics
type NodeCollector struct {
	mu sync.Mutex
}

// NewNodeCollector creates a new node collector
func NewNodeCollector() *NodeCollector {
	return &NodeCollector{}
}

// Collect gathers current node metrics
func (nc *NodeCollector) Collect() (types.NodeMetrics, error) {
	nc.mu.Lock()
	defer nc.mu.Unlock()

	metrics := types.NodeMetrics{
		CPUCount: runtime.NumCPU(),
	}

	// Read memory info
	if err := nc.readMemInfo(&metrics); err != nil {
		return metrics, err
	}

	// Read load average
	if err := nc.readLoadAvg(&metrics); err != nil {
		return metrics, err
	}

	return metrics, nil
}

// readMemInfo reads /proc/meminfo
func (nc *NodeCollector) readMemInfo(metrics *types.NodeMetrics) error {
	file, err := os.Open("/proc/meminfo")
	if err != nil {
		return err
	}
	defer file.Close()

	var memTotal, memAvailable float64
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()
		fields := strings.Fields(line)
		if len(fields) < 2 {
			continue
		}

		switch fields[0] {
		case "MemTotal:":
			kb, _ := strconv.ParseFloat(fields[1], 64)
			memTotal = kb / 1024.0
		case "MemAvailable:":
			kb, _ := strconv.ParseFloat(fields[1], 64)
			memAvailable = kb / 1024.0
		}
	}

	metrics.TotalMemoryMB = memTotal
	metrics.UsedMemoryMB = memTotal - memAvailable
	if memTotal > 0 {
		metrics.MemoryUsedPct = (metrics.UsedMemoryMB / memTotal) * 100.0
	}

	return nil
}

// readLoadAvg reads /proc/loadavg
func (nc *NodeCollector) readLoadAvg(metrics *types.NodeMetrics) error {
	data, err := os.ReadFile("/proc/loadavg")
	if err != nil {
		return err
	}

	fields := strings.Fields(string(data))
	if len(fields) >= 3 {
		metrics.LoadAvg1, _ = strconv.ParseFloat(fields[0], 64)
		metrics.LoadAvg5, _ = strconv.ParseFloat(fields[1], 64)
		metrics.LoadAvg15, _ = strconv.ParseFloat(fields[2], 64)
	}

	return nil
}

// MetricsManager manages metrics collection for multiple processes
type MetricsManager struct {
	collectors     map[int]*ProcessCollector
	nodeCollector  *NodeCollector
	mu             sync.RWMutex
	sampleInterval time.Duration
	stopCh         chan struct{}
	wg             sync.WaitGroup
}

// NewMetricsManager creates a new metrics manager
func NewMetricsManager(sampleInterval time.Duration) *MetricsManager {
	if sampleInterval <= 0 {
		sampleInterval = time.Second
	}
	return &MetricsManager{
		collectors:     make(map[int]*ProcessCollector),
		nodeCollector:  NewNodeCollector(),
		sampleInterval: sampleInterval,
		stopCh:         make(chan struct{}),
	}
}

// AddProcess adds a process to monitor
func (mm *MetricsManager) AddProcess(pid int) {
	mm.mu.Lock()
	defer mm.mu.Unlock()

	if _, exists := mm.collectors[pid]; !exists {
		mm.collectors[pid] = NewProcessCollector(pid)
	}
}

// RemoveProcess removes a process from monitoring
func (mm *MetricsManager) RemoveProcess(pid int) {
	mm.mu.Lock()
	defer mm.mu.Unlock()

	delete(mm.collectors, pid)
}

// GetProcessMetrics returns metrics for a specific process
func (mm *MetricsManager) GetProcessMetrics(pid int) (types.ProcessMetrics, error) {
	mm.mu.RLock()
	collector, exists := mm.collectors[pid]
	mm.mu.RUnlock()

	if !exists {
		return types.ProcessMetrics{}, fmt.Errorf("process %d not found", pid)
	}

	return collector.Collect()
}

// GetNodeMetrics returns system-wide metrics
func (mm *MetricsManager) GetNodeMetrics() (types.NodeMetrics, error) {
	return mm.nodeCollector.Collect()
}

// ProcessExists checks if a process exists
func ProcessExists(pid int) bool {
	path := filepath.Join("/proc", strconv.Itoa(pid))
	_, err := os.Stat(path)
	return err == nil
}
