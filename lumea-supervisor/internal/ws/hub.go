// Package ws provides WebSocket functionality for real-time streaming
package ws

import (
	"sync"
	"time"

	"github.com/gorilla/websocket"
	"github.com/shoplixsrl/lumea-supervisor/internal/events"
)

const (
	// Time allowed to write a message to the peer.
	writeWait = 10 * time.Second

	// Time allowed to read the next pong message from the peer.
	pongWait = 60 * time.Second

	// Send pings to peer with this period. Must be less than pongWait.
	pingPeriod = (pongWait * 9) / 10

	// Maximum message size allowed from peer.
	maxMessageSize = 512
)

// Client represents a WebSocket client
type Client struct {
	hub      *Hub
	conn     *websocket.Conn
	send     chan []byte
	serverID string // empty for all servers
	stream   string // "events", "logs", "metrics"
}

// Hub maintains the set of active clients and broadcasts messages to them
type Hub struct {
	// Registered clients
	clients map[*Client]bool

	// Channel for broadcasting to all clients
	broadcast chan []byte

	// Register requests from clients
	register chan *Client

	// Unregister requests from clients
	unregister chan *Client

	// Event bus subscription
	eventSub *events.Subscriber
	eventBus *events.EventBus

	mu sync.RWMutex
}

// NewHub creates a new hub
func NewHub(eventBus *events.EventBus) *Hub {
	h := &Hub{
		clients:    make(map[*Client]bool),
		broadcast:  make(chan []byte, 256),
		register:   make(chan *Client),
		unregister: make(chan *Client),
		eventBus:   eventBus,
	}

	return h
}

// Run starts the hub
func (h *Hub) Run() {
	// Subscribe to event bus
	h.eventSub = h.eventBus.Subscribe("", nil)

	go h.eventLoop()

	for {
		select {
		case client := <-h.register:
			h.mu.Lock()
			h.clients[client] = true
			h.mu.Unlock()

		case client := <-h.unregister:
			h.mu.Lock()
			if _, ok := h.clients[client]; ok {
				delete(h.clients, client)
				close(client.send)
			}
			h.mu.Unlock()

		case message := <-h.broadcast:
			h.mu.RLock()
			for client := range h.clients {
				select {
				case client.send <- message:
				default:
					close(client.send)
					delete(h.clients, client)
				}
			}
			h.mu.RUnlock()
		}
	}
}

// eventLoop forwards events to WebSocket clients
func (h *Hub) eventLoop() {
	for event := range h.eventSub.Ch {
		data, err := events.MarshalEvent(event)
		if err != nil {
			continue
		}

		h.mu.RLock()
		for client := range h.clients {
			// Filter by stream type
			if client.stream != "events" && client.stream != "logs" {
				continue
			}

			// Filter by server ID
			if client.serverID != "" && client.serverID != event.ServerID {
				continue
			}

			// Filter logs to log stream only
			if event.Type == events.EventServerLogLine && client.stream != "logs" {
				continue
			}

			// Filter non-log events to events stream only
			if event.Type != events.EventServerLogLine && client.stream != "events" {
				continue
			}

			select {
			case client.send <- data:
			default:
				// Client buffer full, skip
			}
		}
		h.mu.RUnlock()
	}
}

// Shutdown closes the hub
func (h *Hub) Shutdown() {
	if h.eventSub != nil {
		h.eventBus.Unsubscribe(h.eventSub.ID)
	}

	h.mu.Lock()
	for client := range h.clients {
		close(client.send)
		delete(h.clients, client)
	}
	h.mu.Unlock()
}

// readPump pumps messages from the WebSocket connection to the hub.
func (c *Client) readPump() {
	defer func() {
		c.hub.unregister <- c
		c.conn.Close()
	}()

	c.conn.SetReadLimit(maxMessageSize)
	c.conn.SetReadDeadline(time.Now().Add(pongWait))
	c.conn.SetPongHandler(func(string) error {
		c.conn.SetReadDeadline(time.Now().Add(pongWait))
		return nil
	})

	for {
		_, _, err := c.conn.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				// Log error if needed
			}
			break
		}
	}
}

// writePump pumps messages from the hub to the WebSocket connection.
func (c *Client) writePump() {
	ticker := time.NewTicker(pingPeriod)
	defer func() {
		ticker.Stop()
		c.conn.Close()
	}()

	for {
		select {
		case message, ok := <-c.send:
			c.conn.SetWriteDeadline(time.Now().Add(writeWait))
			if !ok {
				// The hub closed the channel.
				c.conn.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}

			w, err := c.conn.NextWriter(websocket.TextMessage)
			if err != nil {
				return
			}
			w.Write(message)

			// Add queued messages to the current WebSocket message.
			n := len(c.send)
			for i := 0; i < n; i++ {
				w.Write([]byte{'\n'})
				w.Write(<-c.send)
			}

			if err := w.Close(); err != nil {
				return
			}

		case <-ticker.C:
			c.conn.SetWriteDeadline(time.Now().Add(writeWait))
			if err := c.conn.WriteMessage(websocket.PingMessage, nil); err != nil {
				return
			}
		}
	}
}
