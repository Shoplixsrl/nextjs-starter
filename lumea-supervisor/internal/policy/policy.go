// Package policy implements resource policies and restart logic
package policy

import (
	"math"
	"math/rand"
	"sync"
	"time"

	"github.com/shoplixsrl/lumea-supervisor/internal/events"
	"github.com/shoplixsrl/lumea-supervisor/internal/metrics"
	"github.com/shoplixsrl/lumea-supervisor/internal/store"
	"github.com/shoplixsrl/lumea-supervisor/internal/types"
)

// RestartDecision represents the outcome of restart policy evaluation
type RestartDecision struct {
	ShouldRestart bool
	BackoffUntil  *time.Time
	Reason        string
}

// RestartTracker tracks restart attempts for a server
type RestartTracker struct {
	attempts     []time.Time
	backoffMs    int64
	mu           sync.Mutex
}

// NewRestartTracker creates a new restart tracker
func NewRestartTracker() *RestartTracker {
	return &RestartTracker{
		attempts: make([]time.Time, 0),
	}
}

// RecordAttempt records a restart attempt
func (rt *RestartTracker) RecordAttempt() {
	rt.mu.Lock()
	defer rt.mu.Unlock()

	rt.attempts = append(rt.attempts, time.Now())
}

// GetAttemptsInWindow returns the number of attempts in the given window
func (rt *RestartTracker) GetAttemptsInWindow(windowSec int) int {
	rt.mu.Lock()
	defer rt.mu.Unlock()

	cutoff := time.Now().Add(-time.Duration(windowSec) * time.Second)
	count := 0

	for _, t := range rt.attempts {
		if t.After(cutoff) {
			count++
		}
	}

	return count
}

// PruneOldAttempts removes attempts older than the window
func (rt *RestartTracker) PruneOldAttempts(windowSec int) {
	rt.mu.Lock()
	defer rt.mu.Unlock()

	cutoff := time.Now().Add(-time.Duration(windowSec) * time.Second)
	newAttempts := make([]time.Time, 0)

	for _, t := range rt.attempts {
		if t.After(cutoff) {
			newAttempts = append(newAttempts, t)
		}
	}

	rt.attempts = newAttempts
}

// GetNextBackoff calculates the next backoff duration
func (rt *RestartTracker) GetNextBackoff(config types.BackoffConfig) time.Duration {
	rt.mu.Lock()
	defer rt.mu.Unlock()

	if rt.backoffMs == 0 {
		rt.backoffMs = config.InitialMs
	} else {
		rt.backoffMs = int64(float64(rt.backoffMs) * config.Multiplier)
		if rt.backoffMs > config.MaxMs {
			rt.backoffMs = config.MaxMs
		}
	}

	// Add jitter
	jitter := float64(rt.backoffMs) * config.JitterPct * (rand.Float64()*2 - 1)
	finalMs := float64(rt.backoffMs) + jitter

	return time.Duration(finalMs) * time.Millisecond
}

// Reset resets the tracker
func (rt *RestartTracker) Reset() {
	rt.mu.Lock()
	defer rt.mu.Unlock()

	rt.attempts = make([]time.Time, 0)
	rt.backoffMs = 0
}

// TotalAttempts returns the total number of attempts
func (rt *RestartTracker) TotalAttempts() int {
	rt.mu.Lock()
	defer rt.mu.Unlock()

	return len(rt.attempts)
}

// RestartPolicyEvaluator evaluates restart policies
type RestartPolicyEvaluator struct {
	trackers map[string]*RestartTracker
	mu       sync.RWMutex
}

// NewRestartPolicyEvaluator creates a new evaluator
func NewRestartPolicyEvaluator() *RestartPolicyEvaluator {
	return &RestartPolicyEvaluator{
		trackers: make(map[string]*RestartTracker),
	}
}

// Evaluate evaluates whether a server should restart
func (rpe *RestartPolicyEvaluator) Evaluate(serverID string, policy types.RestartPolicy, exitCode int) RestartDecision {
	rpe.mu.Lock()
	tracker, exists := rpe.trackers[serverID]
	if !exists {
		tracker = NewRestartTracker()
		rpe.trackers[serverID] = tracker
	}
	rpe.mu.Unlock()

	decision := RestartDecision{}

	// Check restart mode
	switch policy.Mode {
	case types.RestartNever:
		decision.ShouldRestart = false
		decision.Reason = "restart policy is 'never'"
		return decision

	case types.RestartOnFailure:
		if exitCode == 0 {
			decision.ShouldRestart = false
			decision.Reason = "process exited successfully"
			return decision
		}

	case types.RestartAlways:
		// Always restart regardless of exit code
	}

	// Check crash loop
	tracker.PruneOldAttempts(policy.WindowSec)
	attemptsInWindow := tracker.GetAttemptsInWindow(policy.WindowSec)

	if attemptsInWindow >= policy.MaxRetries {
		decision.ShouldRestart = false
		decision.Reason = "crash loop detected - max retries exceeded"
		return decision
	}

	// Record this attempt and calculate backoff
	tracker.RecordAttempt()
	backoff := tracker.GetNextBackoff(policy.Backoff)
	backoffUntil := time.Now().Add(backoff)

	decision.ShouldRestart = true
	decision.BackoffUntil = &backoffUntil
	decision.Reason = "restart scheduled"

	return decision
}

// Reset resets the tracker for a server (e.g., after successful start)
func (rpe *RestartPolicyEvaluator) Reset(serverID string) {
	rpe.mu.Lock()
	defer rpe.mu.Unlock()

	if tracker, exists := rpe.trackers[serverID]; exists {
		tracker.Reset()
	}
}

// Remove removes a server's tracker
func (rpe *RestartPolicyEvaluator) Remove(serverID string) {
	rpe.mu.Lock()
	defer rpe.mu.Unlock()

	delete(rpe.trackers, serverID)
}

// ResourcePolicyEnforcer enforces resource policies
type ResourcePolicyEnforcer struct {
	store          *store.Store
	metricsManager *metrics.MetricsManager
	eventBus       *events.EventBus
	nodePolicy     types.NodePolicy
	stopCh         chan struct{}
	wg             sync.WaitGroup
	mu             sync.RWMutex
}

// NewResourcePolicyEnforcer creates a new enforcer
func NewResourcePolicyEnforcer(
	s *store.Store,
	mm *metrics.MetricsManager,
	eb *events.EventBus,
	nodePolicy types.NodePolicy,
) *ResourcePolicyEnforcer {
	return &ResourcePolicyEnforcer{
		store:          s,
		metricsManager: mm,
		eventBus:       eb,
		nodePolicy:     nodePolicy,
		stopCh:         make(chan struct{}),
	}
}

// SetNodePolicy updates the node policy
func (rpe *ResourcePolicyEnforcer) SetNodePolicy(policy types.NodePolicy) {
	rpe.mu.Lock()
	defer rpe.mu.Unlock()

	rpe.nodePolicy = policy
}

// CheckServer checks if a server violates its resource limits
func (rpe *ResourcePolicyEnforcer) CheckServer(server *types.Server) *ResourceViolation {
	server.RLock()
	defer server.RUnlock()

	if server.Runtime.Status != types.StatusRunning || server.Runtime.PID == 0 {
		return nil
	}

	m, err := rpe.metricsManager.GetProcessMetrics(server.Runtime.PID)
	if err != nil {
		return nil
	}

	// Check CPU limit
	if server.Spec.Resources.CPUMaxPct > 0 && m.CPUPct > server.Spec.Resources.CPUMaxPct {
		return &ResourceViolation{
			ServerID:  server.Spec.ID,
			Resource:  "cpu",
			Current:   m.CPUPct,
			Threshold: server.Spec.Resources.CPUMaxPct,
		}
	}

	// Check memory limit
	if server.Spec.Resources.MemoryMaxMB > 0 && m.RSSMB > float64(server.Spec.Resources.MemoryMaxMB) {
		return &ResourceViolation{
			ServerID:  server.Spec.ID,
			Resource:  "memory",
			Current:   m.RSSMB,
			Threshold: float64(server.Spec.Resources.MemoryMaxMB),
		}
	}

	return nil
}

// CheckNode checks if node-wide resource limits are violated
func (rpe *ResourcePolicyEnforcer) CheckNode() *NodeViolation {
	rpe.mu.RLock()
	policy := rpe.nodePolicy
	rpe.mu.RUnlock()

	nodeMetrics, err := rpe.metricsManager.GetNodeMetrics()
	if err != nil {
		return nil
	}

	// Check memory
	if policy.MaxTotalMemPct > 0 && nodeMetrics.MemoryUsedPct > policy.MaxTotalMemPct {
		return &NodeViolation{
			Resource:  "memory",
			Current:   nodeMetrics.MemoryUsedPct,
			Threshold: policy.MaxTotalMemPct,
		}
	}

	// Check CPU (using load average as proxy)
	cpuCount := float64(nodeMetrics.CPUCount)
	cpuUsedPct := (nodeMetrics.LoadAvg1 / cpuCount) * 100.0
	if policy.MaxTotalCPUPct > 0 && cpuUsedPct > policy.MaxTotalCPUPct {
		return &NodeViolation{
			Resource:  "cpu",
			Current:   cpuUsedPct,
			Threshold: policy.MaxTotalCPUPct,
		}
	}

	// Check running servers count
	runningCount := rpe.store.GetRunningCount()
	if policy.MaxRunningServers > 0 && runningCount > policy.MaxRunningServers {
		return &NodeViolation{
			Resource:  "servers",
			Current:   float64(runningCount),
			Threshold: float64(policy.MaxRunningServers),
		}
	}

	return nil
}

// SelectEvictionCandidate selects a server to evict based on priority
func (rpe *ResourcePolicyEnforcer) SelectEvictionCandidate() string {
	servers := rpe.store.List()
	var candidate *types.Server
	var candidateScore float64 = math.MaxFloat64

	for _, server := range servers {
		server.RLock()
		if server.Runtime.Status != types.StatusRunning {
			server.RUnlock()
			continue
		}

		// Score based on: lower = more likely to evict
		// Consider: restart count, memory usage, uptime
		score := float64(server.Runtime.RestartCountTotal) * -10.0
		if server.Runtime.StartedAt != nil {
			score += time.Since(*server.Runtime.StartedAt).Seconds()
		}

		server.RUnlock()

		if score < candidateScore {
			candidateScore = score
			candidate = server
		}
	}

	if candidate != nil {
		return candidate.Spec.ID
	}

	return ""
}

// ResourceViolation represents a per-server resource violation
type ResourceViolation struct {
	ServerID  string
	Resource  string
	Current   float64
	Threshold float64
}

// NodeViolation represents a node-wide resource violation
type NodeViolation struct {
	Resource  string
	Current   float64
	Threshold float64
}
