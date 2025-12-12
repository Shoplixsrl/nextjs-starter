// Package process provides process supervision and lifecycle management
package process

import (
	"context"
	"fmt"
	"os"
	"os/exec"
	"sync"
	"syscall"
	"time"

	"github.com/shoplixsrl/lumea-supervisor/internal/cgroups"
	"github.com/shoplixsrl/lumea-supervisor/internal/events"
	"github.com/shoplixsrl/lumea-supervisor/internal/logging"
	"github.com/shoplixsrl/lumea-supervisor/internal/metrics"
	"github.com/shoplixsrl/lumea-supervisor/internal/policy"
	"github.com/shoplixsrl/lumea-supervisor/internal/store"
	"github.com/shoplixsrl/lumea-supervisor/internal/types"
)

// ProcessHandle represents a running process
type ProcessHandle struct {
	cmd          *exec.Cmd
	serverID     string
	stdoutReader *logging.StreamReader
	stderrReader *logging.StreamReader
	done         chan struct{}
	exitCode     int
	exitErr      error
}

// Supervisor manages server process lifecycles
type Supervisor struct {
	store           *store.Store
	eventBus        *events.EventBus
	logManager      *logging.LogManager
	metricsManager  *metrics.MetricsManager
	cgroupsManager  *cgroups.Manager
	restartEval     *policy.RestartPolicyEvaluator
	resourceEnforce *policy.ResourcePolicyEnforcer

	processes map[string]*ProcessHandle
	mu        sync.RWMutex

	stopCh     chan struct{}
	wg         sync.WaitGroup
	monitorWg  sync.WaitGroup
}

// NewSupervisor creates a new supervisor
func NewSupervisor(
	s *store.Store,
	eb *events.EventBus,
	lm *logging.LogManager,
	mm *metrics.MetricsManager,
	cm *cgroups.Manager,
	nodePolicy types.NodePolicy,
) *Supervisor {
	restartEval := policy.NewRestartPolicyEvaluator()
	resourceEnforce := policy.NewResourcePolicyEnforcer(s, mm, eb, nodePolicy)

	return &Supervisor{
		store:           s,
		eventBus:        eb,
		logManager:      lm,
		metricsManager:  mm,
		cgroupsManager:  cm,
		restartEval:     restartEval,
		resourceEnforce: resourceEnforce,
		processes:       make(map[string]*ProcessHandle),
		stopCh:          make(chan struct{}),
	}
}

// Start begins the supervisor background tasks
func (sup *Supervisor) Start() {
	sup.wg.Add(1)
	go sup.resourceMonitorLoop()
}

// Stop stops all processes and the supervisor
func (sup *Supervisor) Stop() {
	close(sup.stopCh)

	// Stop all processes
	sup.mu.RLock()
	serverIDs := make([]string, 0, len(sup.processes))
	for id := range sup.processes {
		serverIDs = append(serverIDs, id)
	}
	sup.mu.RUnlock()

	for _, id := range serverIDs {
		sup.StopServer(id, 10*time.Second)
	}

	sup.wg.Wait()
	sup.monitorWg.Wait()
}

// StartServer starts a server process
func (sup *Supervisor) StartServer(serverID string) error {
	server, err := sup.store.Get(serverID)
	if err != nil {
		return err
	}

	sup.mu.Lock()
	if _, running := sup.processes[serverID]; running {
		sup.mu.Unlock()
		return fmt.Errorf("server %s is already running", serverID)
	}
	sup.mu.Unlock()

	server.RLock()
	spec := server.Spec
	server.RUnlock()

	// Update status to starting
	sup.store.SetStatus(serverID, types.StatusStarting, "starting process")

	// Create logger
	logger, err := sup.logManager.GetOrCreate(serverID, spec.Log)
	if err != nil {
		sup.store.SetStatus(serverID, types.StatusCrashed, err.Error())
		return fmt.Errorf("failed to create logger: %w", err)
	}

	// Setup cgroups if enabled
	if spec.Resources.Cgroups.Enabled && sup.cgroupsManager != nil {
		if err := sup.cgroupsManager.Create(serverID, spec.Resources.Cgroups); err != nil {
			logger.Write("stderr", fmt.Sprintf("Warning: failed to create cgroup: %v", err))
		}
	}

	// Create command
	cmd := exec.Command(spec.Command, spec.Args...)
	cmd.Dir = spec.WorkspaceDir

	// Setup environment
	cmd.Env = os.Environ()
	for k, v := range spec.Env {
		cmd.Env = append(cmd.Env, fmt.Sprintf("%s=%s", k, v))
	}
	if spec.Port > 0 {
		cmd.Env = append(cmd.Env, fmt.Sprintf("PORT=%d", spec.Port))
	}

	// Setup process group for signal propagation
	cmd.SysProcAttr = &syscall.SysProcAttr{
		Setpgid: true,
	}

	// Setup pipes for stdout/stderr
	stdout, err := cmd.StdoutPipe()
	if err != nil {
		sup.store.SetStatus(serverID, types.StatusCrashed, err.Error())
		return fmt.Errorf("failed to create stdout pipe: %w", err)
	}

	stderr, err := cmd.StderrPipe()
	if err != nil {
		sup.store.SetStatus(serverID, types.StatusCrashed, err.Error())
		return fmt.Errorf("failed to create stderr pipe: %w", err)
	}

	// Start the process
	if err := cmd.Start(); err != nil {
		sup.store.SetStatus(serverID, types.StatusCrashed, err.Error())
		return fmt.Errorf("failed to start process: %w", err)
	}

	pid := cmd.Process.Pid
	pgid, _ := syscall.Getpgid(pid)

	// Add to cgroup
	if spec.Resources.Cgroups.Enabled && sup.cgroupsManager != nil {
		if err := sup.cgroupsManager.AddProcess(serverID, pid); err != nil {
			logger.Write("stderr", fmt.Sprintf("Warning: failed to add to cgroup: %v", err))
		}
	}

	// Start stream readers
	stdoutReader := logging.NewStreamReader(stdout, logger, "stdout")
	stderrReader := logging.NewStreamReader(stderr, logger, "stderr")
	stdoutReader.Start()
	stderrReader.Start()

	// Create process handle
	handle := &ProcessHandle{
		cmd:          cmd,
		serverID:     serverID,
		stdoutReader: stdoutReader,
		stderrReader: stderrReader,
		done:         make(chan struct{}),
	}

	sup.mu.Lock()
	sup.processes[serverID] = handle
	sup.mu.Unlock()

	// Add to metrics monitoring
	sup.metricsManager.AddProcess(pid)

	// Update runtime state
	now := time.Now()
	sup.store.UpdateRuntime(serverID, func(rt *types.ServerRuntime) {
		rt.Status = types.StatusRunning
		rt.PID = pid
		rt.PGID = pgid
		rt.StartedAt = &now
		rt.LastExitAt = nil
		rt.LastExitCode = nil
		rt.LastError = ""
	})

	// Reset restart tracker on successful start
	sup.restartEval.Reset(serverID)

	sup.eventBus.PublishStateChange(serverID, string(types.StatusStarting), string(types.StatusRunning), "process started")

	// Start wait goroutine
	sup.monitorWg.Add(1)
	go sup.waitForProcess(handle)

	return nil
}

// StopServer stops a server process
func (sup *Supervisor) StopServer(serverID string, timeout time.Duration) error {
	sup.mu.RLock()
	handle, exists := sup.processes[serverID]
	sup.mu.RUnlock()

	if !exists {
		return fmt.Errorf("server %s is not running", serverID)
	}

	// Update status
	sup.store.SetStatus(serverID, types.StatusStopping, "stopping process")

	// Send SIGTERM to process group
	if handle.cmd.Process != nil {
		pgid, err := syscall.Getpgid(handle.cmd.Process.Pid)
		if err == nil {
			syscall.Kill(-pgid, syscall.SIGTERM)
		} else {
			handle.cmd.Process.Signal(syscall.SIGTERM)
		}
	}

	// Wait for graceful shutdown or timeout
	select {
	case <-handle.done:
		// Process exited
	case <-time.After(timeout):
		// Force kill
		if handle.cmd.Process != nil {
			pgid, err := syscall.Getpgid(handle.cmd.Process.Pid)
			if err == nil {
				syscall.Kill(-pgid, syscall.SIGKILL)
			} else {
				handle.cmd.Process.Kill()
			}
		}
		<-handle.done
	}

	return nil
}

// RestartServer restarts a server process
func (sup *Supervisor) RestartServer(serverID string) error {
	// Check if running
	sup.mu.RLock()
	_, exists := sup.processes[serverID]
	sup.mu.RUnlock()

	if exists {
		if err := sup.StopServer(serverID, 10*time.Second); err != nil {
			return err
		}
	}

	return sup.StartServer(serverID)
}

// waitForProcess waits for a process to exit and handles restarts
func (sup *Supervisor) waitForProcess(handle *ProcessHandle) {
	defer sup.monitorWg.Done()

	// Wait for process to exit
	err := handle.cmd.Wait()

	// Stop stream readers
	handle.stdoutReader.Stop()
	handle.stderrReader.Stop()

	// Get exit code
	exitCode := 0
	if err != nil {
		if exitErr, ok := err.(*exec.ExitError); ok {
			exitCode = exitErr.ExitCode()
		} else {
			exitCode = -1
		}
	}
	handle.exitCode = exitCode
	handle.exitErr = err

	// Signal done
	close(handle.done)

	// Remove from processes map
	sup.mu.Lock()
	delete(sup.processes, handle.serverID)
	sup.mu.Unlock()

	// Remove from metrics
	if handle.cmd.Process != nil {
		sup.metricsManager.RemoveProcess(handle.cmd.Process.Pid)
	}

	// Update runtime state
	now := time.Now()
	sup.store.UpdateRuntime(handle.serverID, func(rt *types.ServerRuntime) {
		rt.PID = 0
		rt.PGID = 0
		rt.LastExitAt = &now
		rt.LastExitCode = &exitCode
		if err != nil {
			rt.LastError = err.Error()
		}
	})

	// Publish exit event
	signal := ""
	errMsg := ""
	if err != nil {
		errMsg = err.Error()
	}
	sup.eventBus.PublishProcessExit(handle.serverID, exitCode, signal, errMsg)

	// Check if this was a requested stop
	server, err := sup.store.Get(handle.serverID)
	if err != nil {
		return
	}

	server.RLock()
	status := server.Runtime.Status
	restartPolicy := server.Spec.RestartPolicy
	server.RUnlock()

	// If stopping was requested, don't restart
	if status == types.StatusStopping {
		sup.store.SetStatus(handle.serverID, types.StatusStopped, "process stopped")
		return
	}

	// Update to crashed status
	sup.store.SetStatus(handle.serverID, types.StatusCrashed, fmt.Sprintf("exit code %d", exitCode))

	// Evaluate restart policy
	decision := sup.restartEval.Evaluate(handle.serverID, restartPolicy, exitCode)

	if !decision.ShouldRestart {
		sup.store.SetStatus(handle.serverID, types.StatusStopped, decision.Reason)
		return
	}

	// Schedule restart with backoff
	if decision.BackoffUntil != nil {
		sup.store.UpdateRuntime(handle.serverID, func(rt *types.ServerRuntime) {
			rt.Status = types.StatusBackingOff
			rt.BackoffUntil = decision.BackoffUntil
			rt.RestartCountWindow++
			rt.RestartCountTotal++
		})

		sup.eventBus.PublishStateChange(handle.serverID, string(types.StatusCrashed), string(types.StatusBackingOff), decision.Reason)

		// Wait for backoff
		select {
		case <-time.After(time.Until(*decision.BackoffUntil)):
		case <-sup.stopCh:
			return
		}
	}

	// Restart the server
	if err := sup.StartServer(handle.serverID); err != nil {
		sup.store.SetStatus(handle.serverID, types.StatusStopped, err.Error())
	}
}

// resourceMonitorLoop periodically checks resource usage
func (sup *Supervisor) resourceMonitorLoop() {
	defer sup.wg.Done()

	ticker := time.NewTicker(5 * time.Second)
	defer ticker.Stop()

	for {
		select {
		case <-sup.stopCh:
			return
		case <-ticker.C:
			sup.checkResources()
		}
	}
}

// checkResources checks resource usage and enforces policies
func (sup *Supervisor) checkResources() {
	// Update metrics for all running processes
	servers := sup.store.List()
	for _, server := range servers {
		server.RLock()
		pid := server.Runtime.PID
		status := server.Runtime.Status
		serverID := server.Spec.ID
		server.RUnlock()

		if status != types.StatusRunning || pid == 0 {
			continue
		}

		// Get metrics
		m, err := sup.metricsManager.GetProcessMetrics(pid)
		if err != nil {
			continue
		}

		// Update runtime metrics
		sup.store.UpdateRuntime(serverID, func(rt *types.ServerRuntime) {
			rt.Metrics = m
		})

		// Check for violations
		violation := sup.resourceEnforce.CheckServer(server)
		if violation != nil {
			sup.eventBus.PublishResourceAlert(
				violation.ServerID,
				violation.Resource,
				violation.Current,
				violation.Threshold,
				"warning",
			)
		}
	}

	// Check node-wide policy
	nodeViolation := sup.resourceEnforce.CheckNode()
	if nodeViolation != nil {
		// Find candidate for eviction
		candidateID := sup.resourceEnforce.SelectEvictionCandidate()
		if candidateID != "" {
			sup.eventBus.PublishResourceAlert(
				candidateID,
				nodeViolation.Resource,
				nodeViolation.Current,
				nodeViolation.Threshold,
				"eviction_candidate",
			)
		}
	}
}

// GetProcessStatus returns the status of a process
func (sup *Supervisor) GetProcessStatus(serverID string) (bool, int) {
	sup.mu.RLock()
	handle, exists := sup.processes[serverID]
	sup.mu.RUnlock()

	if !exists || handle.cmd.Process == nil {
		return false, 0
	}

	return true, handle.cmd.Process.Pid
}

// IsRunning checks if a server is running
func (sup *Supervisor) IsRunning(serverID string) bool {
	sup.mu.RLock()
	defer sup.mu.RUnlock()

	_, exists := sup.processes[serverID]
	return exists
}

// GetRunningServers returns IDs of all running servers
func (sup *Supervisor) GetRunningServers() []string {
	sup.mu.RLock()
	defer sup.mu.RUnlock()

	ids := make([]string, 0, len(sup.processes))
	for id := range sup.processes {
		ids = append(ids, id)
	}
	return ids
}

// ForceKill forcefully kills a process
func (sup *Supervisor) ForceKill(serverID string) error {
	sup.mu.RLock()
	handle, exists := sup.processes[serverID]
	sup.mu.RUnlock()

	if !exists {
		return fmt.Errorf("server %s is not running", serverID)
	}

	if handle.cmd.Process != nil {
		pgid, err := syscall.Getpgid(handle.cmd.Process.Pid)
		if err == nil {
			return syscall.Kill(-pgid, syscall.SIGKILL)
		}
		return handle.cmd.Process.Kill()
	}

	return nil
}

// StartServerWithContext starts a server with cancellation support
func (sup *Supervisor) StartServerWithContext(ctx context.Context, serverID string) error {
	errCh := make(chan error, 1)

	go func() {
		errCh <- sup.StartServer(serverID)
	}()

	select {
	case err := <-errCh:
		return err
	case <-ctx.Done():
		sup.StopServer(serverID, 5*time.Second)
		return ctx.Err()
	}
}
