/**
 * Lumea Dev Server Supervisor - TypeScript SDK
 *
 * @packageDocumentation
 */

// Export all types
export * from './types';

// Export HTTP client
export { LumeaClient, LumeaApiError } from './client';

// Export WebSocket clients
export {
  LumeaWebSocket,
  EventStreamClient,
  LogStreamClient,
  MetricsStreamClient,
  type ConnectionState,
} from './websocket';

// Re-export commonly used types for convenience
export type {
  Server,
  ServerSpec,
  ServerRuntime,
  ServerStatus,
  ProcessMetrics,
  NodeMetrics,
  LogEntry,
  Event,
  CreateServerRequest,
  UpdateServerRequest,
  RestartPolicy,
  RestartMode,
  ResourceConfig,
  LogConfig,
  LumeaClientOptions,
  WebSocketOptions,
} from './types';

/**
 * Create a Lumea client with the given options
 *
 * @example
 * ```typescript
 * import { createClient } from '@lumea/supervisor-sdk';
 *
 * const client = createClient({ baseUrl: 'http://localhost:8080' });
 *
 * // List all servers
 * const servers = await client.listServers();
 *
 * // Create and start a new server
 * const server = await client.createAndStart({
 *   workspaceDir: '/path/to/project',
 *   command: 'bun',
 *   args: ['run', 'dev'],
 *   port: 3000,
 * });
 *
 * // Get logs
 * const logs = await client.getServerLogs(server.spec.id);
 * ```
 */
export function createClient(options: import('./types').LumeaClientOptions) {
  const { LumeaClient } = require('./client');
  return new LumeaClient(options);
}

/**
 * Create a Lumea WebSocket manager
 *
 * @example
 * ```typescript
 * import { createWebSocket } from '@lumea/supervisor-sdk';
 *
 * const ws = createWebSocket('http://localhost:8080');
 *
 * // Stream events
 * const events = ws.events();
 * events.onStateChanged((event) => {
 *   console.log(`Server ${event.serverId} changed to ${event.data.currentState}`);
 * });
 * events.connect();
 *
 * // Stream logs for a specific server
 * const logs = ws.logs('my-server', 100);
 * logs.onLog((entry) => {
 *   console.log(`[${entry.stream}] ${entry.line}`);
 * });
 * logs.connect();
 *
 * // Stream metrics
 * const metrics = ws.metrics(1000);
 * metrics.onMetrics((data) => {
 *   console.log('Metrics:', data.servers);
 * });
 * metrics.connect();
 * ```
 */
export function createWebSocket(
  baseUrl: string,
  options?: import('./types').WebSocketOptions
) {
  const { LumeaWebSocket } = require('./websocket');
  return new LumeaWebSocket(baseUrl, options);
}

// Default export for convenience
export default {
  createClient,
  createWebSocket,
};
