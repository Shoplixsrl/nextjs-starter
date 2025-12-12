// Package api provides HTTP API handlers for the supervisor
package api

import (
	"encoding/json"
	"net/http"
	"strconv"
	"time"

	"github.com/google/uuid"
	"github.com/gorilla/mux"
	"github.com/shoplixsrl/lumea-supervisor/internal/logging"
	"github.com/shoplixsrl/lumea-supervisor/internal/metrics"
	"github.com/shoplixsrl/lumea-supervisor/internal/process"
	"github.com/shoplixsrl/lumea-supervisor/internal/store"
	"github.com/shoplixsrl/lumea-supervisor/internal/types"
)

// APIError represents an API error response
type APIError struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
}

// Handler holds dependencies for API handlers
type Handler struct {
	store          *store.Store
	supervisor     *process.Supervisor
	logManager     *logging.LogManager
	metricsManager *metrics.MetricsManager
}

// NewHandler creates a new API handler
func NewHandler(
	s *store.Store,
	sup *process.Supervisor,
	lm *logging.LogManager,
	mm *metrics.MetricsManager,
) *Handler {
	return &Handler{
		store:          s,
		supervisor:     sup,
		logManager:     lm,
		metricsManager: mm,
	}
}

// respondJSON sends a JSON response
func respondJSON(w http.ResponseWriter, status int, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(data)
}

// respondError sends an error response
func respondError(w http.ResponseWriter, status int, message string) {
	respondJSON(w, status, APIError{Code: status, Message: message})
}

// CreateServerRequest is the request body for creating a server
type CreateServerRequest struct {
	ID            string            `json:"id,omitempty"`
	WorkspaceDir  string            `json:"workspaceDir"`
	Command       string            `json:"command"`
	Args          []string          `json:"args"`
	Env           map[string]string `json:"env"`
	Port          int               `json:"port"`
	URL           string            `json:"url"`
	RestartPolicy *types.RestartPolicy `json:"restartPolicy,omitempty"`
	Resources     *types.ResourceConfig `json:"resources,omitempty"`
	Log           *types.LogConfig      `json:"log,omitempty"`
}

// CreateServer handles POST /v1/servers
func (h *Handler) CreateServer(w http.ResponseWriter, r *http.Request) {
	var req CreateServerRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		respondError(w, http.StatusBadRequest, "invalid request body")
		return
	}

	// Validate required fields
	if req.WorkspaceDir == "" {
		respondError(w, http.StatusBadRequest, "workspaceDir is required")
		return
	}
	if req.Command == "" {
		respondError(w, http.StatusBadRequest, "command is required")
		return
	}

	// Generate ID if not provided
	serverID := req.ID
	if serverID == "" {
		serverID = uuid.New().String()[:8]
	}

	// Build spec with defaults
	spec := types.ServerSpec{
		ID:           serverID,
		WorkspaceDir: req.WorkspaceDir,
		Command:      req.Command,
		Args:         req.Args,
		Env:          req.Env,
		Port:         req.Port,
		URL:          req.URL,
		RestartPolicy: types.DefaultRestartPolicy(),
		Log:          types.DefaultLogConfig(serverID),
	}

	if req.RestartPolicy != nil {
		spec.RestartPolicy = *req.RestartPolicy
	}
	if req.Resources != nil {
		spec.Resources = *req.Resources
	}
	if req.Log != nil {
		spec.Log = *req.Log
	}

	// Create server
	server, err := h.store.Create(spec)
	if err != nil {
		if err == store.ErrServerExists {
			respondError(w, http.StatusConflict, "server already exists")
			return
		}
		respondError(w, http.StatusInternalServerError, err.Error())
		return
	}

	respondJSON(w, http.StatusCreated, server)
}

// ListServers handles GET /v1/servers
func (h *Handler) ListServers(w http.ResponseWriter, r *http.Request) {
	servers := h.store.List()
	respondJSON(w, http.StatusOK, servers)
}

// GetServer handles GET /v1/servers/{id}
func (h *Handler) GetServer(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	serverID := vars["id"]

	server, err := h.store.Get(serverID)
	if err != nil {
		if err == store.ErrServerNotFound {
			respondError(w, http.StatusNotFound, "server not found")
			return
		}
		respondError(w, http.StatusInternalServerError, err.Error())
		return
	}

	respondJSON(w, http.StatusOK, server)
}

// UpdateServer handles PUT /v1/servers/{id}
func (h *Handler) UpdateServer(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	serverID := vars["id"]

	var req CreateServerRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		respondError(w, http.StatusBadRequest, "invalid request body")
		return
	}

	// Get existing server
	existing, err := h.store.Get(serverID)
	if err != nil {
		if err == store.ErrServerNotFound {
			respondError(w, http.StatusNotFound, "server not found")
			return
		}
		respondError(w, http.StatusInternalServerError, err.Error())
		return
	}

	// Build updated spec
	existing.RLock()
	spec := existing.Spec
	existing.RUnlock()

	if req.WorkspaceDir != "" {
		spec.WorkspaceDir = req.WorkspaceDir
	}
	if req.Command != "" {
		spec.Command = req.Command
	}
	if req.Args != nil {
		spec.Args = req.Args
	}
	if req.Env != nil {
		spec.Env = req.Env
	}
	if req.Port != 0 {
		spec.Port = req.Port
	}
	if req.URL != "" {
		spec.URL = req.URL
	}
	if req.RestartPolicy != nil {
		spec.RestartPolicy = *req.RestartPolicy
	}
	if req.Resources != nil {
		spec.Resources = *req.Resources
	}
	if req.Log != nil {
		spec.Log = *req.Log
	}

	server, err := h.store.Update(serverID, spec)
	if err != nil {
		respondError(w, http.StatusInternalServerError, err.Error())
		return
	}

	respondJSON(w, http.StatusOK, server)
}

// DeleteServer handles DELETE /v1/servers/{id}
func (h *Handler) DeleteServer(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	serverID := vars["id"]

	// Stop if running
	if h.supervisor.IsRunning(serverID) {
		if err := h.supervisor.StopServer(serverID, 10*time.Second); err != nil {
			respondError(w, http.StatusInternalServerError, err.Error())
			return
		}
	}

	// Delete from store
	if err := h.store.Delete(serverID); err != nil {
		if err == store.ErrServerNotFound {
			respondError(w, http.StatusNotFound, "server not found")
			return
		}
		respondError(w, http.StatusInternalServerError, err.Error())
		return
	}

	// Close logger
	h.logManager.Close(serverID)

	w.WriteHeader(http.StatusNoContent)
}

// StartServer handles POST /v1/servers/{id}/start
func (h *Handler) StartServer(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	serverID := vars["id"]

	// Check if server exists
	server, err := h.store.Get(serverID)
	if err != nil {
		if err == store.ErrServerNotFound {
			respondError(w, http.StatusNotFound, "server not found")
			return
		}
		respondError(w, http.StatusInternalServerError, err.Error())
		return
	}

	// Check if already running
	server.RLock()
	status := server.Runtime.Status
	server.RUnlock()

	if status == types.StatusRunning || status == types.StatusStarting {
		respondError(w, http.StatusConflict, "server is already running or starting")
		return
	}

	// Start server
	if err := h.supervisor.StartServer(serverID); err != nil {
		respondError(w, http.StatusInternalServerError, err.Error())
		return
	}

	// Get updated server
	server, _ = h.store.Get(serverID)
	respondJSON(w, http.StatusOK, server)
}

// StopServer handles POST /v1/servers/{id}/stop
func (h *Handler) StopServer(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	serverID := vars["id"]

	// Check if server exists
	server, err := h.store.Get(serverID)
	if err != nil {
		if err == store.ErrServerNotFound {
			respondError(w, http.StatusNotFound, "server not found")
			return
		}
		respondError(w, http.StatusInternalServerError, err.Error())
		return
	}

	// Check if running
	server.RLock()
	status := server.Runtime.Status
	server.RUnlock()

	if status != types.StatusRunning && status != types.StatusStarting && status != types.StatusBackingOff {
		respondError(w, http.StatusConflict, "server is not running")
		return
	}

	// Parse timeout
	timeout := 10 * time.Second
	if t := r.URL.Query().Get("timeout"); t != "" {
		if secs, err := strconv.Atoi(t); err == nil {
			timeout = time.Duration(secs) * time.Second
		}
	}

	// Stop server
	if err := h.supervisor.StopServer(serverID, timeout); err != nil {
		respondError(w, http.StatusInternalServerError, err.Error())
		return
	}

	// Get updated server
	server, _ = h.store.Get(serverID)
	respondJSON(w, http.StatusOK, server)
}

// RestartServer handles POST /v1/servers/{id}/restart
func (h *Handler) RestartServer(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	serverID := vars["id"]

	// Check if server exists
	_, err := h.store.Get(serverID)
	if err != nil {
		if err == store.ErrServerNotFound {
			respondError(w, http.StatusNotFound, "server not found")
			return
		}
		respondError(w, http.StatusInternalServerError, err.Error())
		return
	}

	// Restart server
	if err := h.supervisor.RestartServer(serverID); err != nil {
		respondError(w, http.StatusInternalServerError, err.Error())
		return
	}

	// Get updated server
	server, _ := h.store.Get(serverID)
	respondJSON(w, http.StatusOK, server)
}

// GetServerLogs handles GET /v1/servers/{id}/logs
func (h *Handler) GetServerLogs(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	serverID := vars["id"]

	// Check if server exists
	_, err := h.store.Get(serverID)
	if err != nil {
		if err == store.ErrServerNotFound {
			respondError(w, http.StatusNotFound, "server not found")
			return
		}
		respondError(w, http.StatusInternalServerError, err.Error())
		return
	}

	// Get logger
	logger := h.logManager.Get(serverID)
	if logger == nil {
		respondJSON(w, http.StatusOK, []logging.LogEntry{})
		return
	}

	// Parse tail parameter
	tail := 200
	if t := r.URL.Query().Get("tail"); t != "" {
		if n, err := strconv.Atoi(t); err == nil && n > 0 {
			tail = n
		}
	}

	entries := logger.Tail(tail)
	if entries == nil {
		entries = []logging.LogEntry{}
	}

	respondJSON(w, http.StatusOK, entries)
}

// GetServerMetrics handles GET /v1/servers/{id}/metrics
func (h *Handler) GetServerMetrics(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	serverID := vars["id"]

	// Get server
	server, err := h.store.Get(serverID)
	if err != nil {
		if err == store.ErrServerNotFound {
			respondError(w, http.StatusNotFound, "server not found")
			return
		}
		respondError(w, http.StatusInternalServerError, err.Error())
		return
	}

	server.RLock()
	metrics := server.Runtime.Metrics
	server.RUnlock()

	respondJSON(w, http.StatusOK, metrics)
}

// GetNodeMetrics handles GET /v1/node/metrics
func (h *Handler) GetNodeMetrics(w http.ResponseWriter, r *http.Request) {
	nodeMetrics, err := h.metricsManager.GetNodeMetrics()
	if err != nil {
		respondError(w, http.StatusInternalServerError, err.Error())
		return
	}

	// Add server counts
	nodeMetrics.RunningServers = h.store.GetRunningCount()
	nodeMetrics.TotalServers = h.store.GetTotalCount()

	respondJSON(w, http.StatusOK, nodeMetrics)
}

// HealthCheck handles GET /health
func (h *Handler) HealthCheck(w http.ResponseWriter, r *http.Request) {
	respondJSON(w, http.StatusOK, map[string]string{
		"status": "healthy",
		"time":   time.Now().Format(time.RFC3339),
	})
}
