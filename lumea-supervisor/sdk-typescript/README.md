# @lumea/supervisor-sdk

TypeScript SDK for Lumea Dev Server Supervisor.

## Installation

```bash
# npm
npm install @lumea/supervisor-sdk

# bun
bun add @lumea/supervisor-sdk

# yarn
yarn add @lumea/supervisor-sdk

# pnpm
pnpm add @lumea/supervisor-sdk
```

## Quick Start

```typescript
import { createClient, createWebSocket } from '@lumea/supervisor-sdk';

// Create HTTP client
const client = createClient({
  baseUrl: 'http://localhost:8080',
});

// List all servers
const servers = await client.listServers();
console.log('Servers:', servers);

// Create and start a new server
const server = await client.createAndStart({
  workspaceDir: '/path/to/my-nextjs-app',
  command: 'bun',
  args: ['run', 'dev'],
  port: 3000,
});
console.log('Server started:', server.spec.id);
```

## HTTP Client

### Server Management

```typescript
import { LumeaClient } from '@lumea/supervisor-sdk';

const client = new LumeaClient({ baseUrl: 'http://localhost:8080' });

// Create a server
const server = await client.createServer({
  id: 'my-app',
  workspaceDir: '/path/to/app',
  command: 'bun',
  args: ['run', 'dev'],
  port: 3000,
  restartPolicy: {
    mode: 'on-failure',
    maxRetries: 5,
  },
});

// List all servers
const servers = await client.listServers();

// Get a specific server
const server = await client.getServer('my-app');

// Update server configuration
await client.updateServer('my-app', {
  port: 3001,
});

// Delete a server
await client.deleteServer('my-app');
```

### Lifecycle Control

```typescript
// Start a server
await client.startServer('my-app');

// Stop a server (with optional timeout)
await client.stopServer('my-app', 30); // 30 second timeout

// Restart a server
await client.restartServer('my-app');

// Wait for a specific status
await client.waitForStatus('my-app', 'running', 60000);

// Check if running
const isRunning = await client.isRunning('my-app');

// Get all running servers
const running = await client.getRunningServers();
```

### Logs & Metrics

```typescript
// Get recent logs
const logs = await client.getServerLogs('my-app', 500);
logs.forEach(entry => {
  console.log(`[${entry.stream}] ${entry.line}`);
});

// Get server metrics
const metrics = await client.getServerMetrics('my-app');
console.log(`CPU: ${metrics.cpuPct}%, Memory: ${metrics.rssMB}MB`);

// Get node metrics
const nodeMetrics = await client.getNodeMetrics();
console.log(`Running servers: ${nodeMetrics.runningServers}/${nodeMetrics.totalServers}`);
```

### Convenience Methods

```typescript
// Create and start in one operation
const server = await client.createAndStart({
  workspaceDir: '/path/to/app',
  command: 'bun',
  args: ['run', 'dev'],
});

// Stop and delete in one operation
await client.stopAndDelete('my-app', 30);
```

## WebSocket Streaming

### Event Stream

```typescript
import { createWebSocket } from '@lumea/supervisor-sdk';

const ws = createWebSocket('http://localhost:8080');

// Create event stream (optionally filter by server)
const events = ws.events(); // All servers
// const events = ws.events('my-app'); // Specific server

// Subscribe to state changes
events.onStateChanged((event) => {
  console.log(`Server ${event.serverId}: ${event.data.previousState} -> ${event.data.currentState}`);
});

// Subscribe to process exits
events.onProcessExit((event) => {
  console.log(`Server ${event.serverId} exited with code ${event.data.exitCode}`);
});

// Subscribe to resource alerts
events.onResourceAlert((event) => {
  console.log(`Alert: ${event.data.resource} at ${event.data.current}% (threshold: ${event.data.threshold}%)`);
});

// Subscribe to all events
events.onAll((event) => {
  console.log('Event:', event.type, event);
});

// Handle connection state
events.onStateChange((state) => {
  console.log('Connection state:', state);
});

// Handle errors
events.onError((error) => {
  console.error('WebSocket error:', error);
});

// Connect
events.connect();

// Later: disconnect
events.disconnect();
```

### Log Stream

```typescript
const ws = createWebSocket('http://localhost:8080');

// Stream logs with initial tail
const logs = ws.logs('my-app', 100);

logs.onLog((entry) => {
  const timestamp = new Date(entry.timestamp).toISOString();
  console.log(`[${timestamp}] [${entry.stream}] ${entry.line}`);
});

logs.connect();
```

### Metrics Stream

```typescript
const ws = createWebSocket('http://localhost:8080');

// Stream metrics every second
const metrics = ws.metrics(1000);

metrics.onMetrics((data) => {
  console.log(`Timestamp: ${data.timestamp}`);
  for (const [serverId, serverData] of Object.entries(data.servers)) {
    console.log(`  ${serverId}: ${serverData.status}, CPU: ${serverData.metrics.cpuPct}%`);
  }
});

metrics.connect();
```

## Error Handling

```typescript
import { LumeaClient, LumeaApiError } from '@lumea/supervisor-sdk';

const client = new LumeaClient({ baseUrl: 'http://localhost:8080' });

try {
  await client.getServer('non-existent');
} catch (error) {
  if (error instanceof LumeaApiError) {
    if (error.code === 404) {
      console.log('Server not found');
    } else if (error.code === 409) {
      console.log('Conflict:', error.message);
    } else {
      console.error(`API Error ${error.code}: ${error.message}`);
    }
  }
}
```

## Configuration Options

### HTTP Client Options

```typescript
const client = new LumeaClient({
  // Required: Base URL of the Lumea agent
  baseUrl: 'http://localhost:8080',

  // Optional: Request timeout in milliseconds (default: 30000)
  timeout: 60000,

  // Optional: Custom fetch implementation
  fetch: customFetch,

  // Optional: Additional headers
  headers: {
    'Authorization': 'Bearer token',
  },
});
```

### WebSocket Options

```typescript
const ws = createWebSocket('http://localhost:8080', {
  // Optional: Auto-reconnect on disconnect (default: true)
  reconnect: true,

  // Optional: Reconnect interval in ms (default: 1000)
  reconnectInterval: 2000,

  // Optional: Max reconnect attempts (default: 10)
  maxReconnectAttempts: 5,
});
```

## TypeScript Types

All types are fully exported:

```typescript
import type {
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
} from '@lumea/supervisor-sdk';
```

## License

MIT
