/**
 * Lumea Dev Server Supervisor - TypeScript Types
 */

// ============================================================================
// Enums
// ============================================================================

/** Server status states */
export type ServerStatus =
  | 'stopped'
  | 'starting'
  | 'running'
  | 'stopping'
  | 'crashed'
  | 'backing_off';

/** Restart policy modes */
export type RestartMode = 'never' | 'on-failure' | 'always';

/** Event types */
export type EventType =
  | 'server.created'
  | 'server.updated'
  | 'server.deleted'
  | 'server.state_changed'
  | 'server.process_exit'
  | 'server.resource_alert'
  | 'server.log_line'
  | 'node.metrics';

/** Log stream types */
export type LogStream = 'stdout' | 'stderr';

// ============================================================================
// Configuration Types
// ============================================================================

/** Exponential backoff configuration */
export interface BackoffConfig {
  /** Initial backoff delay in milliseconds */
  initialMs: number;
  /** Maximum backoff delay in milliseconds */
  maxMs: number;
  /** Backoff multiplier */
  multiplier: number;
  /** Jitter percentage (0-1) */
  jitterPct: number;
}

/** Restart policy configuration */
export interface RestartPolicy {
  /** When to restart */
  mode: RestartMode;
  /** Maximum restart attempts in window */
  maxRetries: number;
  /** Time window for counting retries in seconds */
  windowSec: number;
  /** Backoff configuration */
  backoff: BackoffConfig;
}

/** cgroups v2 configuration */
export interface CgroupsConfig {
  /** Enable cgroups isolation */
  enabled: boolean;
  /** CPU limit (e.g., '50000 100000' for 50%) */
  cpuMax?: string;
  /** Memory limit in bytes */
  memoryMaxBytes?: number;
  /** Maximum number of PIDs */
  pidsMax?: number;
}

/** Resource limits configuration */
export interface ResourceConfig {
  /** Maximum CPU percentage */
  cpuMaxPct?: number;
  /** Maximum memory in MB */
  memoryMaxMB?: number;
  /** cgroups configuration */
  cgroups?: CgroupsConfig;
}

/** Logging configuration */
export interface LogConfig {
  /** Log directory path */
  dir: string;
  /** Maximum log file size in MB */
  maxFileSizeMB: number;
  /** Maximum number of rotated files */
  maxFiles: number;
  /** Number of lines to keep in memory */
  ringBufferLines: number;
}

// ============================================================================
// Server Types
// ============================================================================

/** Server specification (desired state) */
export interface ServerSpec {
  /** Unique server identifier */
  id: string;
  /** Working directory for the server */
  workspaceDir: string;
  /** Command to execute */
  command: string;
  /** Command arguments */
  args: string[];
  /** Environment variables */
  env: Record<string, string>;
  /** Port number */
  port: number;
  /** Server URL */
  url: string;
  /** Restart policy */
  restartPolicy: RestartPolicy;
  /** Resource limits */
  resources: ResourceConfig;
  /** Logging configuration */
  log: LogConfig;
}

/** Process metrics */
export interface ProcessMetrics {
  /** CPU usage percentage */
  cpuPct: number;
  /** Resident set size in MB */
  rssMB: number;
  /** Number of open file descriptors */
  fds: number;
}

/** Server runtime state */
export interface ServerRuntime {
  /** Current status */
  status: ServerStatus;
  /** Process ID */
  pid?: number;
  /** Process group ID */
  pgid?: number;
  /** When the server was started */
  startedAt?: string;
  /** When the server last exited */
  lastExitAt?: string;
  /** Last exit code */
  lastExitCode?: number;
  /** Last error message */
  lastError?: string;
  /** Restart count in current window */
  restartCountWindow: number;
  /** Total restart count */
  restartCountTotal: number;
  /** Backoff end time */
  backoffUntil?: string;
  /** Current metrics */
  metrics: ProcessMetrics;
}

/** Complete server object */
export interface Server {
  /** Server specification */
  spec: ServerSpec;
  /** Runtime state */
  runtime: ServerRuntime;
}

// ============================================================================
// Request Types
// ============================================================================

/** Create server request */
export interface CreateServerRequest {
  /** Unique server identifier (auto-generated if not provided) */
  id?: string;
  /** Working directory for the server */
  workspaceDir: string;
  /** Command to execute */
  command: string;
  /** Command arguments */
  args?: string[];
  /** Environment variables */
  env?: Record<string, string>;
  /** Port number */
  port?: number;
  /** Server URL */
  url?: string;
  /** Restart policy */
  restartPolicy?: Partial<RestartPolicy>;
  /** Resource limits */
  resources?: Partial<ResourceConfig>;
  /** Logging configuration */
  log?: Partial<LogConfig>;
}

/** Update server request */
export interface UpdateServerRequest {
  /** Working directory for the server */
  workspaceDir?: string;
  /** Command to execute */
  command?: string;
  /** Command arguments */
  args?: string[];
  /** Environment variables */
  env?: Record<string, string>;
  /** Port number */
  port?: number;
  /** Server URL */
  url?: string;
  /** Restart policy */
  restartPolicy?: Partial<RestartPolicy>;
  /** Resource limits */
  resources?: Partial<ResourceConfig>;
  /** Logging configuration */
  log?: Partial<LogConfig>;
}

// ============================================================================
// Response Types
// ============================================================================

/** Health check response */
export interface HealthResponse {
  /** Health status */
  status: string;
  /** Current time */
  time: string;
}

/** API error response */
export interface ApiError {
  /** HTTP status code */
  code: number;
  /** Error message */
  message: string;
}

/** Log entry */
export interface LogEntry {
  /** Timestamp */
  timestamp: string;
  /** Stream (stdout/stderr) */
  stream: LogStream;
  /** Log line content */
  line: string;
}

/** Node metrics */
export interface NodeMetrics {
  /** Total memory in MB */
  totalMemoryMB: number;
  /** Used memory in MB */
  usedMemoryMB: number;
  /** Memory usage percentage */
  memoryUsedPct: number;
  /** 1-minute load average */
  loadAvg1: number;
  /** 5-minute load average */
  loadAvg5: number;
  /** 15-minute load average */
  loadAvg15: number;
  /** Number of CPU cores */
  cpuCount: number;
  /** Number of running servers */
  runningServers: number;
  /** Total number of servers */
  totalServers: number;
}

// ============================================================================
// Event Types
// ============================================================================

/** Base event structure */
export interface Event<T = unknown> {
  /** Event ID */
  id: string;
  /** Event type */
  type: EventType;
  /** Server ID (if applicable) */
  serverId?: string;
  /** Event timestamp */
  timestamp: string;
  /** Event data */
  data?: T;
}

/** State change event data */
export interface StateChangeData {
  /** Previous state */
  previousState: string;
  /** Current state */
  currentState: string;
  /** Reason for change */
  reason?: string;
}

/** Process exit event data */
export interface ProcessExitData {
  /** Exit code */
  exitCode: number;
  /** Signal that caused exit */
  signal?: string;
  /** Error message */
  error?: string;
}

/** Resource alert event data */
export interface ResourceAlertData {
  /** Resource type (cpu, memory) */
  resource: string;
  /** Current value */
  current: number;
  /** Threshold value */
  threshold: number;
  /** Action taken */
  action: string;
}

/** Log line event data */
export interface LogLineData {
  /** Stream (stdout/stderr) */
  stream: LogStream;
  /** Log line content */
  line: string;
  /** Timestamp in milliseconds */
  timestamp: number;
}

/** Metrics stream message */
export interface MetricsStreamMessage {
  /** Message type */
  type: 'metrics';
  /** Timestamp in milliseconds */
  timestamp: number;
  /** Server metrics keyed by server ID */
  servers: Record<string, {
    status: ServerStatus;
    metrics: ProcessMetrics;
  }>;
}

// ============================================================================
// SDK Types
// ============================================================================

/** SDK configuration options */
export interface LumeaClientOptions {
  /** Base URL of the Lumea agent */
  baseUrl: string;
  /** Request timeout in milliseconds */
  timeout?: number;
  /** Custom fetch implementation */
  fetch?: typeof fetch;
  /** Custom headers to include in requests */
  headers?: Record<string, string>;
}

/** WebSocket connection options */
export interface WebSocketOptions {
  /** Reconnect on disconnect */
  reconnect?: boolean;
  /** Reconnect interval in milliseconds */
  reconnectInterval?: number;
  /** Maximum reconnect attempts */
  maxReconnectAttempts?: number;
}

/** Event handler callback */
export type EventHandler<T = unknown> = (event: Event<T>) => void;

/** Log handler callback */
export type LogHandler = (entry: LogEntry) => void;

/** Metrics handler callback */
export type MetricsHandler = (metrics: MetricsStreamMessage) => void;

/** Error handler callback */
export type ErrorHandler = (error: Error) => void;
