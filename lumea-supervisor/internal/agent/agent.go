// Package agent provides the main agent that coordinates all components
package agent

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/shoplixsrl/lumea-supervisor/internal/api"
	"github.com/shoplixsrl/lumea-supervisor/internal/cgroups"
	"github.com/shoplixsrl/lumea-supervisor/internal/events"
	"github.com/shoplixsrl/lumea-supervisor/internal/logging"
	"github.com/shoplixsrl/lumea-supervisor/internal/metrics"
	"github.com/shoplixsrl/lumea-supervisor/internal/process"
	"github.com/shoplixsrl/lumea-supervisor/internal/store"
	"github.com/shoplixsrl/lumea-supervisor/internal/types"
	"github.com/shoplixsrl/lumea-supervisor/internal/ws"
)

// Config holds agent configuration
type Config struct {
	// HTTP server address
	ListenAddr string

	// Path to persist server specs
	StatePath string

	// Log directory base path
	LogDir string

	// Node resource policy
	NodePolicy types.NodePolicy

	// Metrics sampling interval
	MetricsSampleInterval time.Duration
}

// DefaultConfig returns the default configuration
func DefaultConfig() Config {
	return Config{
		ListenAddr:            ":8080",
		StatePath:             "/var/lib/lumea/servers.json",
		LogDir:                "/var/log/lumea",
		NodePolicy:            types.DefaultNodePolicy(),
		MetricsSampleInterval: time.Second,
	}
}

// Agent is the main supervisor agent
type Agent struct {
	config         Config
	eventBus       *events.EventBus
	store          *store.Store
	logManager     *logging.LogManager
	metricsManager *metrics.MetricsManager
	cgroupsManager *cgroups.Manager
	supervisor     *process.Supervisor
	wsHub          *ws.Hub
	httpServer     *http.Server
}

// New creates a new agent
func New(config Config) *Agent {
	// Create event bus
	eventBus := events.NewEventBus(1000)

	// Create store
	st := store.NewStore(eventBus, config.StatePath)

	// Create log manager
	logManager := logging.NewLogManager(eventBus)

	// Create metrics manager
	metricsManager := metrics.NewMetricsManager(config.MetricsSampleInterval)

	// Create cgroups manager
	cgroupsManager := cgroups.NewManager()

	// Create process supervisor
	supervisor := process.NewSupervisor(
		st,
		eventBus,
		logManager,
		metricsManager,
		cgroupsManager,
		config.NodePolicy,
	)

	// Create WebSocket hub
	wsHub := ws.NewHub(eventBus)

	return &Agent{
		config:         config,
		eventBus:       eventBus,
		store:          st,
		logManager:     logManager,
		metricsManager: metricsManager,
		cgroupsManager: cgroupsManager,
		supervisor:     supervisor,
		wsHub:          wsHub,
	}
}

// Run starts the agent and blocks until shutdown
func (a *Agent) Run() error {
	// Start WebSocket hub
	go a.wsHub.Run()

	// Start supervisor
	a.supervisor.Start()

	// Create HTTP router
	router := api.Router(a.store, a.supervisor, a.logManager, a.metricsManager, a.wsHub)

	// Create HTTP server
	a.httpServer = &http.Server{
		Addr:         a.config.ListenAddr,
		Handler:      router,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	// Start HTTP server in goroutine
	errCh := make(chan error, 1)
	go func() {
		log.Printf("Lumea agent listening on %s", a.config.ListenAddr)
		if err := a.httpServer.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			errCh <- err
		}
	}()

	// Wait for shutdown signal
	sigCh := make(chan os.Signal, 1)
	signal.Notify(sigCh, syscall.SIGINT, syscall.SIGTERM)

	select {
	case err := <-errCh:
		return fmt.Errorf("HTTP server error: %w", err)
	case sig := <-sigCh:
		log.Printf("Received signal %v, shutting down...", sig)
	}

	return a.Shutdown()
}

// Shutdown gracefully shuts down the agent
func (a *Agent) Shutdown() error {
	// Shutdown HTTP server
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	if err := a.httpServer.Shutdown(ctx); err != nil {
		log.Printf("HTTP server shutdown error: %v", err)
	}

	// Shutdown WebSocket hub
	a.wsHub.Shutdown()

	// Stop supervisor (stops all processes)
	a.supervisor.Stop()

	// Close log manager
	a.logManager.CloseAll()

	// Cleanup cgroups
	if a.cgroupsManager != nil {
		a.cgroupsManager.Cleanup()
	}

	log.Println("Agent shutdown complete")
	return nil
}

// GetStore returns the store
func (a *Agent) GetStore() *store.Store {
	return a.store
}

// GetSupervisor returns the supervisor
func (a *Agent) GetSupervisor() *process.Supervisor {
	return a.supervisor
}

// GetEventBus returns the event bus
func (a *Agent) GetEventBus() *events.EventBus {
	return a.eventBus
}
