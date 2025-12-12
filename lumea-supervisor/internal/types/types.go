// Package types defines the core data structures for Lumea Dev Server Supervisor
package types

import (
	"sync"
	"time"
)

// ServerStatus represents the current state of a server
type ServerStatus string

const (
	StatusStopped   ServerStatus = "stopped"
	StatusStarting  ServerStatus = "starting"
	StatusRunning   ServerStatus = "running"
	StatusStopping  ServerStatus = "stopping"
	StatusCrashed   ServerStatus = "crashed"
	StatusBackingOff ServerStatus = "backing_off"
)

// RestartMode defines when a server should be restarted
type RestartMode string

const (
	RestartNever     RestartMode = "never"
	RestartOnFailure RestartMode = "on-failure"
	RestartAlways    RestartMode = "always"
)

// BackoffConfig defines exponential backoff parameters
type BackoffConfig struct {
	InitialMs  int64   `json:"initialMs"`
	MaxMs      int64   `json:"maxMs"`
	Multiplier float64 `json:"multiplier"`
	JitterPct  float64 `json:"jitterPct"`
}

// RestartPolicy defines restart behavior
type RestartPolicy struct {
	Mode       RestartMode   `json:"mode"`
	MaxRetries int           `json:"maxRetries"`
	WindowSec  int           `json:"windowSec"`
	Backoff    BackoffConfig `json:"backoff"`
}

// CgroupsConfig defines cgroups v2 limits
type CgroupsConfig struct {
	Enabled        bool   `json:"enabled"`
	CPUMax         string `json:"cpuMax,omitempty"`
	MemoryMaxBytes int64  `json:"memoryMaxBytes,omitempty"`
	PidsMax        int    `json:"pidsMax,omitempty"`
}

// ResourceConfig defines resource limits per server
type ResourceConfig struct {
	CPUMaxPct   float64       `json:"cpuMaxPct,omitempty"`
	MemoryMaxMB int64         `json:"memoryMaxMB,omitempty"`
	Cgroups     CgroupsConfig `json:"cgroups,omitempty"`
}

// LogConfig defines logging configuration
type LogConfig struct {
	Dir             string `json:"dir"`
	MaxFileSizeMB   int    `json:"maxFileSizeMB"`
	MaxFiles        int    `json:"maxFiles"`
	RingBufferLines int    `json:"ringBufferLines"`
}

// ServerSpec defines the desired configuration for a server
type ServerSpec struct {
	ID           string            `json:"id"`
	WorkspaceDir string            `json:"workspaceDir"`
	Command      string            `json:"command"`
	Args         []string          `json:"args"`
	Env          map[string]string `json:"env"`
	Port         int               `json:"port"`
	URL          string            `json:"url"`

	RestartPolicy RestartPolicy  `json:"restartPolicy"`
	Resources     ResourceConfig `json:"resources"`
	Log           LogConfig      `json:"log"`
}

// ProcessMetrics holds resource usage metrics for a process
type ProcessMetrics struct {
	CPUPct float64 `json:"cpuPct"`
	RSSMB  float64 `json:"rssMB"`
	FDs    int     `json:"fds"`
}

// ServerRuntime holds the current runtime state of a server
type ServerRuntime struct {
	Status       ServerStatus `json:"status"`
	PID          int          `json:"pid,omitempty"`
	PGID         int          `json:"pgid,omitempty"`
	StartedAt    *time.Time   `json:"startedAt,omitempty"`
	LastExitAt   *time.Time   `json:"lastExitAt,omitempty"`
	LastExitCode *int         `json:"lastExitCode,omitempty"`
	LastError    string       `json:"lastError,omitempty"`

	RestartCountWindow int        `json:"restartCountWindow"`
	RestartCountTotal  int        `json:"restartCountTotal"`
	BackoffUntil       *time.Time `json:"backoffUntil,omitempty"`

	Metrics ProcessMetrics `json:"metrics"`
}

// Server combines spec and runtime state
type Server struct {
	Spec    ServerSpec    `json:"spec"`
	Runtime ServerRuntime `json:"runtime"`

	mu sync.RWMutex `json:"-"`
}

// NodePolicy defines global resource limits
type NodePolicy struct {
	MaxTotalMemPct    float64 `json:"maxTotalMemPct"`
	MaxTotalCPUPct    float64 `json:"maxTotalCpuPct"`
	MaxRunningServers int     `json:"maxRunningServers"`
}

// NodeMetrics holds system-wide metrics
type NodeMetrics struct {
	TotalMemoryMB     float64 `json:"totalMemoryMB"`
	UsedMemoryMB      float64 `json:"usedMemoryMB"`
	MemoryUsedPct     float64 `json:"memoryUsedPct"`
	LoadAvg1          float64 `json:"loadAvg1"`
	LoadAvg5          float64 `json:"loadAvg5"`
	LoadAvg15         float64 `json:"loadAvg15"`
	CPUCount          int     `json:"cpuCount"`
	RunningServers    int     `json:"runningServers"`
	TotalServers      int     `json:"totalServers"`
}

// Lock locks the server for writing
func (s *Server) Lock() {
	s.mu.Lock()
}

// Unlock unlocks the server
func (s *Server) Unlock() {
	s.mu.Unlock()
}

// RLock locks the server for reading
func (s *Server) RLock() {
	s.mu.RLock()
}

// RUnlock unlocks the server read lock
func (s *Server) RUnlock() {
	s.mu.RUnlock()
}

// DefaultRestartPolicy returns a sensible default restart policy
func DefaultRestartPolicy() RestartPolicy {
	return RestartPolicy{
		Mode:       RestartOnFailure,
		MaxRetries: 5,
		WindowSec:  300,
		Backoff: BackoffConfig{
			InitialMs:  1000,
			MaxMs:      60000,
			Multiplier: 2.0,
			JitterPct:  0.1,
		},
	}
}

// DefaultLogConfig returns default logging configuration
func DefaultLogConfig(serverID string) LogConfig {
	return LogConfig{
		Dir:             "/var/log/lumea/" + serverID,
		MaxFileSizeMB:   10,
		MaxFiles:        5,
		RingBufferLines: 1000,
	}
}

// DefaultNodePolicy returns default node policy
func DefaultNodePolicy() NodePolicy {
	return NodePolicy{
		MaxTotalMemPct:    85.0,
		MaxTotalCPUPct:    90.0,
		MaxRunningServers: 10,
	}
}
