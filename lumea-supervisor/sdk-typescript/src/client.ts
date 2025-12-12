/**
 * Lumea Dev Server Supervisor - HTTP Client
 */

import type {
  LumeaClientOptions,
  Server,
  CreateServerRequest,
  UpdateServerRequest,
  LogEntry,
  ProcessMetrics,
  NodeMetrics,
  HealthResponse,
  ApiError,
} from './types';

/** Default client options */
const DEFAULT_OPTIONS: Partial<LumeaClientOptions> = {
  timeout: 30000,
};

/**
 * Lumea API Error
 */
export class LumeaApiError extends Error {
  public readonly code: number;
  public readonly response?: Response;

  constructor(message: string, code: number, response?: Response) {
    super(message);
    this.name = 'LumeaApiError';
    this.code = code;
    this.response = response;
  }
}

/**
 * HTTP Client for Lumea Dev Server Supervisor
 */
export class LumeaClient {
  private readonly baseUrl: string;
  private readonly timeout: number;
  private readonly customFetch: typeof fetch;
  private readonly headers: Record<string, string>;

  constructor(options: LumeaClientOptions) {
    const opts = { ...DEFAULT_OPTIONS, ...options };

    this.baseUrl = opts.baseUrl.replace(/\/$/, '');
    this.timeout = opts.timeout ?? 30000;
    this.customFetch = opts.fetch ?? fetch;
    this.headers = {
      'Content-Type': 'application/json',
      ...opts.headers,
    };
  }

  // ===========================================================================
  // Private Methods
  // ===========================================================================

  private async request<T>(
    method: string,
    path: string,
    body?: unknown,
    queryParams?: Record<string, string | number>
  ): Promise<T> {
    const url = new URL(`${this.baseUrl}${path}`);

    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.set(key, String(value));
        }
      });
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await this.customFetch(url.toString(), {
        method,
        headers: this.headers,
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}`;
        try {
          const errorBody = await response.json() as ApiError;
          errorMessage = errorBody.message || errorMessage;
        } catch {
          // Ignore JSON parse errors
        }
        throw new LumeaApiError(errorMessage, response.status, response);
      }

      // Handle 204 No Content
      if (response.status === 204) {
        return undefined as T;
      }

      return response.json() as Promise<T>;
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof LumeaApiError) {
        throw error;
      }

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new LumeaApiError('Request timeout', 408);
        }
        throw new LumeaApiError(error.message, 0);
      }

      throw new LumeaApiError('Unknown error', 0);
    }
  }

  // ===========================================================================
  // Health
  // ===========================================================================

  /**
   * Check agent health
   */
  async health(): Promise<HealthResponse> {
    return this.request<HealthResponse>('GET', '/health');
  }

  // ===========================================================================
  // Server Management
  // ===========================================================================

  /**
   * List all servers
   */
  async listServers(): Promise<Server[]> {
    return this.request<Server[]>('GET', '/v1/servers');
  }

  /**
   * Get a server by ID
   */
  async getServer(id: string): Promise<Server> {
    return this.request<Server>('GET', `/v1/servers/${encodeURIComponent(id)}`);
  }

  /**
   * Create a new server
   */
  async createServer(request: CreateServerRequest): Promise<Server> {
    return this.request<Server>('POST', '/v1/servers', request);
  }

  /**
   * Update an existing server
   */
  async updateServer(id: string, request: UpdateServerRequest): Promise<Server> {
    return this.request<Server>('PUT', `/v1/servers/${encodeURIComponent(id)}`, request);
  }

  /**
   * Delete a server
   */
  async deleteServer(id: string): Promise<void> {
    return this.request<void>('DELETE', `/v1/servers/${encodeURIComponent(id)}`);
  }

  // ===========================================================================
  // Lifecycle
  // ===========================================================================

  /**
   * Start a server
   */
  async startServer(id: string): Promise<Server> {
    return this.request<Server>('POST', `/v1/servers/${encodeURIComponent(id)}/start`);
  }

  /**
   * Stop a server
   * @param id Server ID
   * @param timeout Graceful shutdown timeout in seconds
   */
  async stopServer(id: string, timeout?: number): Promise<Server> {
    const params = timeout !== undefined ? { timeout } : undefined;
    return this.request<Server>(
      'POST',
      `/v1/servers/${encodeURIComponent(id)}/stop`,
      undefined,
      params
    );
  }

  /**
   * Restart a server
   */
  async restartServer(id: string): Promise<Server> {
    return this.request<Server>('POST', `/v1/servers/${encodeURIComponent(id)}/restart`);
  }

  // ===========================================================================
  // Logs
  // ===========================================================================

  /**
   * Get server logs
   * @param id Server ID
   * @param tail Number of log entries to retrieve (default: 200)
   */
  async getServerLogs(id: string, tail?: number): Promise<LogEntry[]> {
    const params = tail !== undefined ? { tail } : undefined;
    return this.request<LogEntry[]>(
      'GET',
      `/v1/servers/${encodeURIComponent(id)}/logs`,
      undefined,
      params
    );
  }

  // ===========================================================================
  // Metrics
  // ===========================================================================

  /**
   * Get server metrics
   */
  async getServerMetrics(id: string): Promise<ProcessMetrics> {
    return this.request<ProcessMetrics>(
      'GET',
      `/v1/servers/${encodeURIComponent(id)}/metrics`
    );
  }

  /**
   * Get node metrics
   */
  async getNodeMetrics(): Promise<NodeMetrics> {
    return this.request<NodeMetrics>('GET', '/v1/node/metrics');
  }

  // ===========================================================================
  // Convenience Methods
  // ===========================================================================

  /**
   * Wait for a server to reach a specific status
   * @param id Server ID
   * @param status Target status
   * @param timeoutMs Maximum wait time in milliseconds
   * @param pollIntervalMs Poll interval in milliseconds
   */
  async waitForStatus(
    id: string,
    status: Server['runtime']['status'],
    timeoutMs: number = 30000,
    pollIntervalMs: number = 500
  ): Promise<Server> {
    const startTime = Date.now();

    while (Date.now() - startTime < timeoutMs) {
      const server = await this.getServer(id);

      if (server.runtime.status === status) {
        return server;
      }

      await new Promise(resolve => setTimeout(resolve, pollIntervalMs));
    }

    throw new LumeaApiError(
      `Timeout waiting for server ${id} to reach status ${status}`,
      408
    );
  }

  /**
   * Check if a server is running
   */
  async isRunning(id: string): Promise<boolean> {
    try {
      const server = await this.getServer(id);
      return server.runtime.status === 'running';
    } catch (error) {
      if (error instanceof LumeaApiError && error.code === 404) {
        return false;
      }
      throw error;
    }
  }

  /**
   * Get all running servers
   */
  async getRunningServers(): Promise<Server[]> {
    const servers = await this.listServers();
    return servers.filter(s => s.runtime.status === 'running');
  }

  /**
   * Create and start a server in one operation
   */
  async createAndStart(request: CreateServerRequest): Promise<Server> {
    const server = await this.createServer(request);
    return this.startServer(server.spec.id);
  }

  /**
   * Stop and delete a server in one operation
   */
  async stopAndDelete(id: string, timeout?: number): Promise<void> {
    try {
      await this.stopServer(id, timeout);
    } catch (error) {
      // Ignore error if server is not running
      if (!(error instanceof LumeaApiError && error.code === 409)) {
        throw error;
      }
    }
    await this.deleteServer(id);
  }
}
