/**
 * Lumea Dev Server Supervisor - WebSocket Client
 */

import type {
  Event,
  LogEntry,
  MetricsStreamMessage,
  WebSocketOptions,
  EventHandler,
  LogHandler,
  MetricsHandler,
  ErrorHandler,
  StateChangeData,
  ProcessExitData,
  ResourceAlertData,
  LogLineData,
} from './types';

/** Default WebSocket options */
const DEFAULT_WS_OPTIONS: WebSocketOptions = {
  reconnect: true,
  reconnectInterval: 1000,
  maxReconnectAttempts: 10,
};

/** Connection state */
export type ConnectionState = 'connecting' | 'connected' | 'disconnected' | 'reconnecting';

/**
 * Base WebSocket client
 */
abstract class BaseWebSocketClient {
  protected ws: WebSocket | null = null;
  protected readonly url: string;
  protected readonly options: Required<WebSocketOptions>;
  protected reconnectAttempts: number = 0;
  protected state: ConnectionState = 'disconnected';
  protected errorHandlers: Set<ErrorHandler> = new Set();
  protected stateChangeHandlers: Set<(state: ConnectionState) => void> = new Set();

  constructor(baseUrl: string, path: string, options?: WebSocketOptions) {
    const wsUrl = baseUrl.replace(/^http/, 'ws');
    this.url = `${wsUrl}${path}`;
    this.options = { ...DEFAULT_WS_OPTIONS, ...options } as Required<WebSocketOptions>;
  }

  /**
   * Connect to WebSocket
   */
  connect(): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      return;
    }

    this.setState('connecting');
    this.ws = new WebSocket(this.url);

    this.ws.onopen = () => {
      this.reconnectAttempts = 0;
      this.setState('connected');
      this.onOpen();
    };

    this.ws.onclose = (event) => {
      this.setState('disconnected');
      this.onClose(event);

      if (this.options.reconnect && this.reconnectAttempts < this.options.maxReconnectAttempts) {
        this.scheduleReconnect();
      }
    };

    this.ws.onerror = (event) => {
      const error = new Error('WebSocket error');
      this.errorHandlers.forEach(handler => handler(error));
      this.onError(event);
    };

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data as string);
        this.onMessage(data);
      } catch (error) {
        const parseError = new Error(`Failed to parse message: ${error}`);
        this.errorHandlers.forEach(handler => handler(parseError));
      }
    };
  }

  /**
   * Disconnect from WebSocket
   */
  disconnect(): void {
    this.options.reconnect = false;
    this.ws?.close();
    this.ws = null;
    this.setState('disconnected');
  }

  /**
   * Get current connection state
   */
  getState(): ConnectionState {
    return this.state;
  }

  /**
   * Check if connected
   */
  isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }

  /**
   * Register error handler
   */
  onError(handler: ErrorHandler): () => void;
  onError(event: globalThis.Event): void;
  onError(handlerOrEvent: ErrorHandler | globalThis.Event): (() => void) | void {
    if (typeof handlerOrEvent === 'function') {
      this.errorHandlers.add(handlerOrEvent);
      return () => this.errorHandlers.delete(handlerOrEvent);
    }
    // Event case - handled internally
  }

  /**
   * Register state change handler
   */
  onStateChange(handler: (state: ConnectionState) => void): () => void {
    this.stateChangeHandlers.add(handler);
    return () => this.stateChangeHandlers.delete(handler);
  }

  protected setState(state: ConnectionState): void {
    this.state = state;
    this.stateChangeHandlers.forEach(handler => handler(state));
  }

  protected scheduleReconnect(): void {
    this.reconnectAttempts++;
    this.setState('reconnecting');

    setTimeout(() => {
      if (this.options.reconnect) {
        this.connect();
      }
    }, this.options.reconnectInterval);
  }

  protected abstract onOpen(): void;
  protected abstract onClose(event: CloseEvent): void;
  protected abstract onMessage(data: unknown): void;
}

/**
 * WebSocket client for event streaming
 */
export class EventStreamClient extends BaseWebSocketClient {
  private handlers: Map<string, Set<EventHandler>> = new Map();
  private allHandlers: Set<EventHandler> = new Set();

  constructor(baseUrl: string, serverId?: string, options?: WebSocketOptions) {
    const path = serverId
      ? `/v1/ws/events?serverId=${encodeURIComponent(serverId)}`
      : '/v1/ws/events';
    super(baseUrl, path, options);
  }

  /**
   * Subscribe to a specific event type
   */
  on<T = unknown>(eventType: string, handler: EventHandler<T>): () => void {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, new Set());
    }
    this.handlers.get(eventType)!.add(handler as EventHandler);
    return () => this.handlers.get(eventType)?.delete(handler as EventHandler);
  }

  /**
   * Subscribe to all events
   */
  onAll(handler: EventHandler): () => void {
    this.allHandlers.add(handler);
    return () => this.allHandlers.delete(handler);
  }

  /**
   * Subscribe to state change events
   */
  onStateChanged(handler: EventHandler<StateChangeData>): () => void {
    return this.on('server.state_changed', handler);
  }

  /**
   * Subscribe to process exit events
   */
  onProcessExit(handler: EventHandler<ProcessExitData>): () => void {
    return this.on('server.process_exit', handler);
  }

  /**
   * Subscribe to resource alert events
   */
  onResourceAlert(handler: EventHandler<ResourceAlertData>): () => void {
    return this.on('server.resource_alert', handler);
  }

  /**
   * Subscribe to server created events
   */
  onServerCreated(handler: EventHandler): () => void {
    return this.on('server.created', handler);
  }

  /**
   * Subscribe to server deleted events
   */
  onServerDeleted(handler: EventHandler): () => void {
    return this.on('server.deleted', handler);
  }

  protected onOpen(): void {}

  protected onClose(_event: CloseEvent): void {}

  protected onMessage(data: unknown): void {
    const event = data as Event;

    // Notify specific handlers
    const typeHandlers = this.handlers.get(event.type);
    typeHandlers?.forEach(handler => handler(event));

    // Notify all handlers
    this.allHandlers.forEach(handler => handler(event));
  }
}

/**
 * WebSocket client for log streaming
 */
export class LogStreamClient extends BaseWebSocketClient {
  private handlers: Set<LogHandler> = new Set();

  constructor(baseUrl: string, serverId: string, tail?: number, options?: WebSocketOptions) {
    const params = new URLSearchParams();
    if (tail !== undefined) {
      params.set('tail', String(tail));
    }
    const queryString = params.toString();
    const path = `/v1/ws/servers/${encodeURIComponent(serverId)}/logs${queryString ? `?${queryString}` : ''}`;
    super(baseUrl, path, options);
  }

  /**
   * Subscribe to log entries
   */
  onLog(handler: LogHandler): () => void {
    this.handlers.add(handler);
    return () => this.handlers.delete(handler);
  }

  protected onOpen(): void {}

  protected onClose(_event: CloseEvent): void {}

  protected onMessage(data: unknown): void {
    const message = data as { type: string; data: LogEntry };

    if (message.type === 'log' && message.data) {
      this.handlers.forEach(handler => handler(message.data));
    }
  }
}

/**
 * WebSocket client for metrics streaming
 */
export class MetricsStreamClient extends BaseWebSocketClient {
  private handlers: Set<MetricsHandler> = new Set();

  constructor(baseUrl: string, intervalMs?: number, options?: WebSocketOptions) {
    const params = new URLSearchParams();
    if (intervalMs !== undefined) {
      params.set('intervalMs', String(intervalMs));
    }
    const queryString = params.toString();
    const path = `/v1/ws/metrics${queryString ? `?${queryString}` : ''}`;
    super(baseUrl, path, options);
  }

  /**
   * Subscribe to metrics updates
   */
  onMetrics(handler: MetricsHandler): () => void {
    this.handlers.add(handler);
    return () => this.handlers.delete(handler);
  }

  protected onOpen(): void {}

  protected onClose(_event: CloseEvent): void {}

  protected onMessage(data: unknown): void {
    const message = data as MetricsStreamMessage;

    if (message.type === 'metrics') {
      this.handlers.forEach(handler => handler(message));
    }
  }
}

/**
 * Factory for creating WebSocket clients
 */
export class LumeaWebSocket {
  private readonly baseUrl: string;
  private readonly options?: WebSocketOptions;

  constructor(baseUrl: string, options?: WebSocketOptions) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
    this.options = options;
  }

  /**
   * Create an event stream client
   * @param serverId Optional server ID to filter events
   */
  events(serverId?: string): EventStreamClient {
    return new EventStreamClient(this.baseUrl, serverId, this.options);
  }

  /**
   * Create a log stream client
   * @param serverId Server ID
   * @param tail Number of initial log entries to receive
   */
  logs(serverId: string, tail?: number): LogStreamClient {
    return new LogStreamClient(this.baseUrl, serverId, tail, this.options);
  }

  /**
   * Create a metrics stream client
   * @param intervalMs Metrics update interval in milliseconds
   */
  metrics(intervalMs?: number): MetricsStreamClient {
    return new MetricsStreamClient(this.baseUrl, intervalMs, this.options);
  }
}
