// Package store provides in-memory storage for server state
package store

import (
	"encoding/json"
	"errors"
	"os"
	"path/filepath"
	"sync"

	"github.com/shoplixsrl/lumea-supervisor/internal/events"
	"github.com/shoplixsrl/lumea-supervisor/internal/types"
)

var (
	ErrServerNotFound = errors.New("server not found")
	ErrServerExists   = errors.New("server already exists")
)

// Store manages server state in memory with optional persistence
type Store struct {
	servers     map[string]*types.Server
	mu          sync.RWMutex
	eventBus    *events.EventBus
	persistPath string
}

// NewStore creates a new store
func NewStore(eventBus *events.EventBus, persistPath string) *Store {
	s := &Store{
		servers:     make(map[string]*types.Server),
		eventBus:    eventBus,
		persistPath: persistPath,
	}

	// Load persisted state if available
	if persistPath != "" {
		_ = s.load()
	}

	return s
}

// Create adds a new server to the store
func (s *Store) Create(spec types.ServerSpec) (*types.Server, error) {
	s.mu.Lock()
	defer s.mu.Unlock()

	if _, exists := s.servers[spec.ID]; exists {
		return nil, ErrServerExists
	}

	server := &types.Server{
		Spec: spec,
		Runtime: types.ServerRuntime{
			Status: types.StatusStopped,
		},
	}

	s.servers[spec.ID] = server

	if s.eventBus != nil {
		s.eventBus.PublishServerCreated(spec.ID, spec)
	}

	s.persist()

	return server, nil
}

// Get retrieves a server by ID
func (s *Store) Get(id string) (*types.Server, error) {
	s.mu.RLock()
	defer s.mu.RUnlock()

	server, exists := s.servers[id]
	if !exists {
		return nil, ErrServerNotFound
	}

	return server, nil
}

// List returns all servers
func (s *Store) List() []*types.Server {
	s.mu.RLock()
	defer s.mu.RUnlock()

	servers := make([]*types.Server, 0, len(s.servers))
	for _, server := range s.servers {
		servers = append(servers, server)
	}

	return servers
}

// Update modifies a server's spec
func (s *Store) Update(id string, spec types.ServerSpec) (*types.Server, error) {
	s.mu.Lock()
	defer s.mu.Unlock()

	server, exists := s.servers[id]
	if !exists {
		return nil, ErrServerNotFound
	}

	server.Lock()
	server.Spec = spec
	server.Unlock()

	if s.eventBus != nil {
		s.eventBus.Publish(events.Event{
			Type:     events.EventServerUpdated,
			ServerID: id,
			Data:     spec,
		})
	}

	s.persist()

	return server, nil
}

// Delete removes a server from the store
func (s *Store) Delete(id string) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	if _, exists := s.servers[id]; !exists {
		return ErrServerNotFound
	}

	delete(s.servers, id)

	if s.eventBus != nil {
		s.eventBus.Publish(events.Event{
			Type:     events.EventServerDeleted,
			ServerID: id,
		})
	}

	s.persist()

	return nil
}

// UpdateRuntime updates a server's runtime state
func (s *Store) UpdateRuntime(id string, fn func(*types.ServerRuntime)) error {
	s.mu.RLock()
	server, exists := s.servers[id]
	s.mu.RUnlock()

	if !exists {
		return ErrServerNotFound
	}

	server.Lock()
	fn(&server.Runtime)
	server.Unlock()

	return nil
}

// SetStatus updates a server's status and publishes an event
func (s *Store) SetStatus(id string, status types.ServerStatus, reason string) error {
	s.mu.RLock()
	server, exists := s.servers[id]
	s.mu.RUnlock()

	if !exists {
		return ErrServerNotFound
	}

	server.Lock()
	previousStatus := server.Runtime.Status
	server.Runtime.Status = status
	server.Unlock()

	if s.eventBus != nil {
		s.eventBus.PublishStateChange(id, string(previousStatus), string(status), reason)
	}

	return nil
}

// GetRunningCount returns the number of running servers
func (s *Store) GetRunningCount() int {
	s.mu.RLock()
	defer s.mu.RUnlock()

	count := 0
	for _, server := range s.servers {
		server.RLock()
		if server.Runtime.Status == types.StatusRunning {
			count++
		}
		server.RUnlock()
	}

	return count
}

// GetTotalCount returns the total number of servers
func (s *Store) GetTotalCount() int {
	s.mu.RLock()
	defer s.mu.RUnlock()

	return len(s.servers)
}

// persist saves the current state to disk
func (s *Store) persist() {
	if s.persistPath == "" {
		return
	}

	// Create directory if needed
	dir := filepath.Dir(s.persistPath)
	if err := os.MkdirAll(dir, 0755); err != nil {
		return
	}

	// Marshal specs only (not runtime state)
	specs := make([]types.ServerSpec, 0, len(s.servers))
	for _, server := range s.servers {
		server.RLock()
		specs = append(specs, server.Spec)
		server.RUnlock()
	}

	data, err := json.MarshalIndent(specs, "", "  ")
	if err != nil {
		return
	}

	// Write atomically
	tmpPath := s.persistPath + ".tmp"
	if err := os.WriteFile(tmpPath, data, 0644); err != nil {
		return
	}

	_ = os.Rename(tmpPath, s.persistPath)
}

// load restores state from disk
func (s *Store) load() error {
	data, err := os.ReadFile(s.persistPath)
	if err != nil {
		return err
	}

	var specs []types.ServerSpec
	if err := json.Unmarshal(data, &specs); err != nil {
		return err
	}

	for _, spec := range specs {
		s.servers[spec.ID] = &types.Server{
			Spec: spec,
			Runtime: types.ServerRuntime{
				Status: types.StatusStopped,
			},
		}
	}

	return nil
}
