# Lumea Dev Server Supervisor

A resilient, efficient, and observable system for managing multiple Next.js development servers.

## Features

- **Process Supervision**: Robust process lifecycle management with start/stop/restart
- **Automatic Restart**: Configurable restart policies with exponential backoff
- **Resource Monitoring**: Real-time CPU, memory, and file descriptor tracking
- **Log Management**: Ring buffer for in-memory logs + file rotation
- **Resource Policies**: Node-wide and per-server resource limits
- **cgroups v2 Support**: Process isolation on Linux
- **HTTP API**: RESTful API for server management
- **WebSocket Streaming**: Real-time events, logs, and metrics

## Quick Start

### Build

```bash
# Download dependencies
make deps

# Build the agent
make build
```

### Run Locally

```bash
make run
```

The agent will start on `http://localhost:8080`.

### Install as Service

```bash
sudo make install
sudo systemctl enable --now lumea-agent
```

## API Reference

### Server Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/v1/servers` | Create a new server |
| GET | `/v1/servers` | List all servers |
| GET | `/v1/servers/{id}` | Get server details |
| PUT | `/v1/servers/{id}` | Update server config |
| DELETE | `/v1/servers/{id}` | Delete a server |

### Lifecycle

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/v1/servers/{id}/start` | Start a server |
| POST | `/v1/servers/{id}/stop` | Stop a server |
| POST | `/v1/servers/{id}/restart` | Restart a server |

### Logs & Metrics

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/v1/servers/{id}/logs?tail=200` | Get recent logs |
| GET | `/v1/servers/{id}/metrics` | Get server metrics |
| GET | `/v1/node/metrics` | Get node metrics |

### WebSocket Streams

| Endpoint | Description |
|----------|-------------|
| `WS /v1/ws/events` | Server event stream |
| `WS /v1/ws/servers/{id}/logs` | Log stream for a server |
| `WS /v1/ws/metrics?intervalMs=1000` | Metrics stream |

## Usage Examples

### Create a Server

```bash
curl -X POST http://localhost:8080/v1/servers \
  -H "Content-Type: application/json" \
  -d '{
    "id": "my-app",
    "workspaceDir": "/home/user/my-nextjs-app",
    "command": "bun",
    "args": ["run", "dev"],
    "port": 3000,
    "restartPolicy": {
      "mode": "on-failure",
      "maxRetries": 5,
      "windowSec": 300
    }
  }'
```

### Start a Server

```bash
curl -X POST http://localhost:8080/v1/servers/my-app/start
```

### Get Server Status

```bash
curl http://localhost:8080/v1/servers/my-app
```

### Stream Logs (WebSocket)

```javascript
const ws = new WebSocket('ws://localhost:8080/v1/ws/servers/my-app/logs?tail=100');
ws.onmessage = (event) => {
  console.log(JSON.parse(event.data));
};
```

## Configuration

### Command Line Flags

| Flag | Default | Description |
|------|---------|-------------|
| `--listen` | `:8080` | HTTP server address |
| `--state` | `/var/lib/lumea/servers.json` | State persistence path |
| `--log-dir` | `/var/log/lumea` | Log directory |
| `--max-mem` | `85` | Max memory % before eviction |
| `--max-cpu` | `90` | Max CPU % threshold |
| `--max-servers` | `10` | Max running servers |

### Restart Policies

- `never`: Never restart on exit
- `on-failure`: Restart only on non-zero exit
- `always`: Always restart regardless of exit code

### Backoff Configuration

```json
{
  "backoff": {
    "initialMs": 1000,
    "maxMs": 60000,
    "multiplier": 2.0,
    "jitterPct": 0.1
  }
}
```

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    lumea-agent                          │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │  HTTP API   │  │  WebSocket  │  │   Events    │     │
│  │  handlers   │  │    hub      │  │    bus      │     │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘     │
│         │                │                │             │
│  ┌──────┴────────────────┴────────────────┴──────┐     │
│  │                  Supervisor                    │     │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐       │     │
│  │  │ Process │  │ Restart │  │ Metrics │       │     │
│  │  │ Manager │  │ Policy  │  │ Collect │       │     │
│  │  └─────────┘  └─────────┘  └─────────┘       │     │
│  └──────────────────────────────────────────────┘     │
│                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │    Store    │  │   Logger    │  │  cgroups    │     │
│  │  (memory)   │  │ (ringbuf)   │  │    v2       │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
└─────────────────────────────────────────────────────────┘
```

## State Machine

```
stopped
  └─ start → starting
starting
  ├─ process alive → running
  └─ exit → crashed
running
  ├─ stop → stopping → stopped
  ├─ crash → crashed
  └─ resource fail → restarting
crashed
  ├─ policy allows → backing_off → starting
  └─ crash loop → stopped
```

## Development

```bash
# Format code
make fmt

# Run linter
make lint

# Run tests
make test

# Run tests with coverage
make test-coverage
```

## License

MIT
