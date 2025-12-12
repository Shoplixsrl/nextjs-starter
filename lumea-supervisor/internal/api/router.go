// Package api provides HTTP API routing for the supervisor
package api

import (
	"net/http"

	"github.com/gorilla/mux"
	"github.com/shoplixsrl/lumea-supervisor/internal/logging"
	"github.com/shoplixsrl/lumea-supervisor/internal/metrics"
	"github.com/shoplixsrl/lumea-supervisor/internal/process"
	"github.com/shoplixsrl/lumea-supervisor/internal/store"
	"github.com/shoplixsrl/lumea-supervisor/internal/ws"
)

// Router creates and configures the HTTP router
func Router(
	s *store.Store,
	sup *process.Supervisor,
	lm *logging.LogManager,
	mm *metrics.MetricsManager,
	wsHub *ws.Hub,
) *mux.Router {
	handler := NewHandler(s, sup, lm, mm)
	wsHandler := ws.NewHandler(wsHub, s, lm)

	r := mux.NewRouter()

	// Apply middleware
	r.Use(loggingMiddleware)
	r.Use(corsMiddleware)

	// Health check
	r.HandleFunc("/health", handler.HealthCheck).Methods("GET")

	// API v1
	api := r.PathPrefix("/v1").Subrouter()

	// Server management
	api.HandleFunc("/servers", handler.CreateServer).Methods("POST")
	api.HandleFunc("/servers", handler.ListServers).Methods("GET")
	api.HandleFunc("/servers/{id}", handler.GetServer).Methods("GET")
	api.HandleFunc("/servers/{id}", handler.UpdateServer).Methods("PUT")
	api.HandleFunc("/servers/{id}", handler.DeleteServer).Methods("DELETE")

	// Lifecycle
	api.HandleFunc("/servers/{id}/start", handler.StartServer).Methods("POST")
	api.HandleFunc("/servers/{id}/stop", handler.StopServer).Methods("POST")
	api.HandleFunc("/servers/{id}/restart", handler.RestartServer).Methods("POST")

	// Logs
	api.HandleFunc("/servers/{id}/logs", handler.GetServerLogs).Methods("GET")

	// Metrics
	api.HandleFunc("/servers/{id}/metrics", handler.GetServerMetrics).Methods("GET")
	api.HandleFunc("/node/metrics", handler.GetNodeMetrics).Methods("GET")

	// WebSocket endpoints
	api.HandleFunc("/ws/events", wsHandler.HandleEvents).Methods("GET")
	api.HandleFunc("/ws/servers/{id}/logs", wsHandler.HandleLogs).Methods("GET")
	api.HandleFunc("/ws/metrics", wsHandler.HandleMetrics).Methods("GET")

	return r
}

// loggingMiddleware logs HTTP requests
func loggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Skip logging for WebSocket upgrades and health checks
		if r.Header.Get("Upgrade") == "websocket" || r.URL.Path == "/health" {
			next.ServeHTTP(w, r)
			return
		}

		// Simple logging - in production, use structured logging
		next.ServeHTTP(w, r)
	})
}

// corsMiddleware adds CORS headers
func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}
