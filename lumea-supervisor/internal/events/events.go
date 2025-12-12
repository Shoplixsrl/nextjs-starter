// Package events provides the event bus for Lumea supervisor
package events

import (
	"encoding/json"
	"sync"
	"time"

	"github.com/google/uuid"
)

// EventType defines the type of event
type EventType string

const (
	EventServerCreated      EventType = "server.created"
	EventServerUpdated      EventType = "server.updated"
	EventServerDeleted      EventType = "server.deleted"
	EventServerStateChanged EventType = "server.state_changed"
	EventServerProcessExit  EventType = "server.process_exit"
	EventServerResourceAlert EventType = "server.resource_alert"
	EventServerLogLine      EventType = "server.log_line"
	EventNodeMetrics        EventType = "node.metrics"
)

// Event represents a system event
type Event struct {
	ID        string      `json:"id"`
	Type      EventType   `json:"type"`
	ServerID  string      `json:"serverId,omitempty"`
	Timestamp time.Time   `json:"timestamp"`
	Data      interface{} `json:"data,omitempty"`
}

// StateChangeData contains state transition information
type StateChangeData struct {
	PreviousState string `json:"previousState"`
	CurrentState  string `json:"currentState"`
	Reason        string `json:"reason,omitempty"`
}

// ProcessExitData contains process exit information
type ProcessExitData struct {
	ExitCode int    `json:"exitCode"`
	Signal   string `json:"signal,omitempty"`
	Error    string `json:"error,omitempty"`
}

// ResourceAlertData contains resource alert information
type ResourceAlertData struct {
	Resource   string  `json:"resource"`
	Current    float64 `json:"current"`
	Threshold  float64 `json:"threshold"`
	Action     string  `json:"action"`
}

// LogLineData contains a log line
type LogLineData struct {
	Stream    string `json:"stream"` // stdout or stderr
	Line      string `json:"line"`
	Timestamp int64  `json:"timestamp"`
}

// Subscriber is a channel that receives events
type Subscriber struct {
	ID       string
	Ch       chan Event
	Filter   func(Event) bool
	ServerID string // empty means all servers
}

// EventBus manages event publishing and subscription
type EventBus struct {
	subscribers map[string]*Subscriber
	mu          sync.RWMutex
	bufferSize  int
}

// NewEventBus creates a new event bus
func NewEventBus(bufferSize int) *EventBus {
	if bufferSize <= 0 {
		bufferSize = 100
	}
	return &EventBus{
		subscribers: make(map[string]*Subscriber),
		bufferSize:  bufferSize,
	}
}

// Subscribe creates a new subscription
func (eb *EventBus) Subscribe(serverID string, filter func(Event) bool) *Subscriber {
	eb.mu.Lock()
	defer eb.mu.Unlock()

	sub := &Subscriber{
		ID:       uuid.New().String(),
		Ch:       make(chan Event, eb.bufferSize),
		Filter:   filter,
		ServerID: serverID,
	}

	eb.subscribers[sub.ID] = sub
	return sub
}

// Unsubscribe removes a subscription
func (eb *EventBus) Unsubscribe(id string) {
	eb.mu.Lock()
	defer eb.mu.Unlock()

	if sub, exists := eb.subscribers[id]; exists {
		close(sub.Ch)
		delete(eb.subscribers, id)
	}
}

// Publish sends an event to all matching subscribers
func (eb *EventBus) Publish(event Event) {
	if event.ID == "" {
		event.ID = uuid.New().String()
	}
	if event.Timestamp.IsZero() {
		event.Timestamp = time.Now()
	}

	eb.mu.RLock()
	defer eb.mu.RUnlock()

	for _, sub := range eb.subscribers {
		// Check server filter
		if sub.ServerID != "" && sub.ServerID != event.ServerID {
			continue
		}

		// Check custom filter
		if sub.Filter != nil && !sub.Filter(event) {
			continue
		}

		// Non-blocking send with backpressure handling
		select {
		case sub.Ch <- event:
		default:
			// Channel full, skip this event (backpressure)
		}
	}
}

// PublishServerCreated publishes a server created event
func (eb *EventBus) PublishServerCreated(serverID string, data interface{}) {
	eb.Publish(Event{
		Type:     EventServerCreated,
		ServerID: serverID,
		Data:     data,
	})
}

// PublishStateChange publishes a state change event
func (eb *EventBus) PublishStateChange(serverID, previousState, currentState, reason string) {
	eb.Publish(Event{
		Type:     EventServerStateChanged,
		ServerID: serverID,
		Data: StateChangeData{
			PreviousState: previousState,
			CurrentState:  currentState,
			Reason:        reason,
		},
	})
}

// PublishProcessExit publishes a process exit event
func (eb *EventBus) PublishProcessExit(serverID string, exitCode int, signal, errMsg string) {
	eb.Publish(Event{
		Type:     EventServerProcessExit,
		ServerID: serverID,
		Data: ProcessExitData{
			ExitCode: exitCode,
			Signal:   signal,
			Error:    errMsg,
		},
	})
}

// PublishResourceAlert publishes a resource alert event
func (eb *EventBus) PublishResourceAlert(serverID, resource string, current, threshold float64, action string) {
	eb.Publish(Event{
		Type:     EventServerResourceAlert,
		ServerID: serverID,
		Data: ResourceAlertData{
			Resource:  resource,
			Current:   current,
			Threshold: threshold,
			Action:    action,
		},
	})
}

// PublishLogLine publishes a log line event
func (eb *EventBus) PublishLogLine(serverID, stream, line string) {
	eb.Publish(Event{
		Type:     EventServerLogLine,
		ServerID: serverID,
		Data: LogLineData{
			Stream:    stream,
			Line:      line,
			Timestamp: time.Now().UnixMilli(),
		},
	})
}

// MarshalEvent serializes an event to JSON
func MarshalEvent(event Event) ([]byte, error) {
	return json.Marshal(event)
}
