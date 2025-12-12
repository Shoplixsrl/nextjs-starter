// Package ws provides WebSocket handlers
package ws

import (
	"encoding/json"
	"net/http"
	"strconv"
	"time"

	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
	"github.com/shoplixsrl/lumea-supervisor/internal/logging"
	"github.com/shoplixsrl/lumea-supervisor/internal/store"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true // Allow all origins for development
	},
}

// Handler handles WebSocket connections
type Handler struct {
	hub        *Hub
	store      *store.Store
	logManager *logging.LogManager
}

// NewHandler creates a new WebSocket handler
func NewHandler(hub *Hub, s *store.Store, lm *logging.LogManager) *Handler {
	return &Handler{
		hub:        hub,
		store:      s,
		logManager: lm,
	}
}

// HandleEvents handles WebSocket connections for event streaming
// WS /v1/ws/events
func (h *Handler) HandleEvents(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		return
	}

	client := &Client{
		hub:      h.hub,
		conn:     conn,
		send:     make(chan []byte, 256),
		serverID: r.URL.Query().Get("serverId"), // Optional filter
		stream:   "events",
	}

	h.hub.register <- client

	// Start read and write pumps
	go client.writePump()
	go client.readPump()
}

// HandleLogs handles WebSocket connections for log streaming
// WS /v1/ws/servers/{id}/logs
func (h *Handler) HandleLogs(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	serverID := vars["id"]

	// Check if server exists
	_, err := h.store.Get(serverID)
	if err != nil {
		http.Error(w, "server not found", http.StatusNotFound)
		return
	}

	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		return
	}

	// Parse tail parameter
	tail := 200
	if t := r.URL.Query().Get("tail"); t != "" {
		if n, err := strconv.Atoi(t); err == nil && n > 0 {
			tail = n
		}
	}

	// Send initial tail
	logger := h.logManager.Get(serverID)
	if logger != nil {
		entries := logger.Tail(tail)
		for _, entry := range entries {
			data, err := json.Marshal(map[string]interface{}{
				"type": "log",
				"data": entry,
			})
			if err == nil {
				conn.WriteMessage(websocket.TextMessage, data)
			}
		}
	}

	client := &Client{
		hub:      h.hub,
		conn:     conn,
		send:     make(chan []byte, 256),
		serverID: serverID,
		stream:   "logs",
	}

	h.hub.register <- client

	// Start read and write pumps
	go client.writePump()
	go client.readPump()
}

// HandleMetrics handles WebSocket connections for metrics streaming
// WS /v1/ws/metrics
func (h *Handler) HandleMetrics(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		return
	}

	// Parse interval parameter
	intervalMs := 1000
	if i := r.URL.Query().Get("intervalMs"); i != "" {
		if n, err := strconv.Atoi(i); err == nil && n > 0 {
			intervalMs = n
		}
	}

	// Run metrics streaming in a goroutine
	go h.streamMetrics(conn, time.Duration(intervalMs)*time.Millisecond)
}

// streamMetrics sends metrics at regular intervals
func (h *Handler) streamMetrics(conn *websocket.Conn, interval time.Duration) {
	ticker := time.NewTicker(interval)
	defer func() {
		ticker.Stop()
		conn.Close()
	}()

	for range ticker.C {
		// Collect server metrics
		servers := h.store.List()
		metricsData := make(map[string]interface{})

		for _, server := range servers {
			server.RLock()
			metricsData[server.Spec.ID] = map[string]interface{}{
				"status":  server.Runtime.Status,
				"metrics": server.Runtime.Metrics,
			}
			server.RUnlock()
		}

		data, err := json.Marshal(map[string]interface{}{
			"type":      "metrics",
			"timestamp": time.Now().UnixMilli(),
			"servers":   metricsData,
		})
		if err != nil {
			continue
		}

		conn.SetWriteDeadline(time.Now().Add(writeWait))
		if err := conn.WriteMessage(websocket.TextMessage, data); err != nil {
			return
		}
	}
}
