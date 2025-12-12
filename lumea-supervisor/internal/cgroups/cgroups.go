// Package cgroups provides cgroups v2 management for process isolation
package cgroups

import (
	"fmt"
	"os"
	"path/filepath"
	"strconv"
	"strings"

	"github.com/shoplixsrl/lumea-supervisor/internal/types"
)

const (
	cgroupRoot = "/sys/fs/cgroup"
	lumeaBase  = "lumea"
)

// Manager manages cgroups v2 for server processes
type Manager struct {
	basePath string
}

// NewManager creates a new cgroups manager
func NewManager() *Manager {
	return &Manager{
		basePath: filepath.Join(cgroupRoot, lumeaBase),
	}
}

// IsAvailable checks if cgroups v2 is available and writable
func (m *Manager) IsAvailable() bool {
	// Check if cgroups v2 is mounted
	_, err := os.Stat(filepath.Join(cgroupRoot, "cgroup.controllers"))
	if err != nil {
		return false
	}

	// Try to create base directory
	if err := os.MkdirAll(m.basePath, 0755); err != nil {
		return false
	}

	return true
}

// Create creates a cgroup for a server
func (m *Manager) Create(serverID string, config types.CgroupsConfig) error {
	if !config.Enabled {
		return nil
	}

	cgroupPath := filepath.Join(m.basePath, serverID)

	// Create cgroup directory
	if err := os.MkdirAll(cgroupPath, 0755); err != nil {
		return fmt.Errorf("failed to create cgroup: %w", err)
	}

	// Enable controllers
	if err := m.enableControllers(cgroupPath); err != nil {
		return fmt.Errorf("failed to enable controllers: %w", err)
	}

	// Set CPU limit
	if config.CPUMax != "" {
		if err := m.setCPUMax(cgroupPath, config.CPUMax); err != nil {
			return fmt.Errorf("failed to set cpu.max: %w", err)
		}
	}

	// Set memory limit
	if config.MemoryMaxBytes > 0 {
		if err := m.setMemoryMax(cgroupPath, config.MemoryMaxBytes); err != nil {
			return fmt.Errorf("failed to set memory.max: %w", err)
		}
	}

	// Set PIDs limit
	if config.PidsMax > 0 {
		if err := m.setPidsMax(cgroupPath, config.PidsMax); err != nil {
			return fmt.Errorf("failed to set pids.max: %w", err)
		}
	}

	return nil
}

// AddProcess adds a process to a cgroup
func (m *Manager) AddProcess(serverID string, pid int) error {
	cgroupPath := filepath.Join(m.basePath, serverID)

	// Check if cgroup exists
	if _, err := os.Stat(cgroupPath); os.IsNotExist(err) {
		return nil // Cgroup not configured for this server
	}

	// Write PID to cgroup.procs
	procsPath := filepath.Join(cgroupPath, "cgroup.procs")
	return os.WriteFile(procsPath, []byte(strconv.Itoa(pid)), 0644)
}

// Remove removes a cgroup
func (m *Manager) Remove(serverID string) error {
	cgroupPath := filepath.Join(m.basePath, serverID)

	// Check if exists
	if _, err := os.Stat(cgroupPath); os.IsNotExist(err) {
		return nil
	}

	// Kill all processes in cgroup first
	_ = m.killProcesses(cgroupPath)

	// Remove directory
	return os.Remove(cgroupPath)
}

// GetStats returns resource usage stats from cgroup
func (m *Manager) GetStats(serverID string) (map[string]string, error) {
	cgroupPath := filepath.Join(m.basePath, serverID)
	stats := make(map[string]string)

	// Read cpu.stat
	cpuStat, err := os.ReadFile(filepath.Join(cgroupPath, "cpu.stat"))
	if err == nil {
		stats["cpu.stat"] = string(cpuStat)
	}

	// Read memory.current
	memCurrent, err := os.ReadFile(filepath.Join(cgroupPath, "memory.current"))
	if err == nil {
		stats["memory.current"] = strings.TrimSpace(string(memCurrent))
	}

	// Read memory.peak
	memPeak, err := os.ReadFile(filepath.Join(cgroupPath, "memory.peak"))
	if err == nil {
		stats["memory.peak"] = strings.TrimSpace(string(memPeak))
	}

	// Read pids.current
	pidsCurrent, err := os.ReadFile(filepath.Join(cgroupPath, "pids.current"))
	if err == nil {
		stats["pids.current"] = strings.TrimSpace(string(pidsCurrent))
	}

	return stats, nil
}

// enableControllers enables cpu, memory, and pids controllers
func (m *Manager) enableControllers(path string) error {
	// Enable controllers in parent
	parentPath := filepath.Dir(path)
	subtreeControl := filepath.Join(parentPath, "cgroup.subtree_control")

	// Try to enable controllers (may fail if already enabled or not available)
	controllers := []string{"+cpu", "+memory", "+pids"}
	for _, ctrl := range controllers {
		_ = os.WriteFile(subtreeControl, []byte(ctrl), 0644)
	}

	return nil
}

// setCPUMax sets cpu.max (format: "$MAX $PERIOD" or "max $PERIOD")
func (m *Manager) setCPUMax(path, value string) error {
	cpuMaxPath := filepath.Join(path, "cpu.max")
	return os.WriteFile(cpuMaxPath, []byte(value), 0644)
}

// setMemoryMax sets memory.max in bytes
func (m *Manager) setMemoryMax(path string, bytes int64) error {
	memMaxPath := filepath.Join(path, "memory.max")
	return os.WriteFile(memMaxPath, []byte(strconv.FormatInt(bytes, 10)), 0644)
}

// setPidsMax sets pids.max
func (m *Manager) setPidsMax(path string, max int) error {
	pidsMaxPath := filepath.Join(path, "pids.max")
	return os.WriteFile(pidsMaxPath, []byte(strconv.Itoa(max)), 0644)
}

// killProcesses kills all processes in a cgroup
func (m *Manager) killProcesses(path string) error {
	// Write "1" to cgroup.kill (cgroups v2 feature)
	killPath := filepath.Join(path, "cgroup.kill")
	return os.WriteFile(killPath, []byte("1"), 0644)
}

// Cleanup removes all lumea cgroups
func (m *Manager) Cleanup() error {
	entries, err := os.ReadDir(m.basePath)
	if err != nil {
		return err
	}

	for _, entry := range entries {
		if entry.IsDir() {
			m.Remove(entry.Name())
		}
	}

	return os.Remove(m.basePath)
}
