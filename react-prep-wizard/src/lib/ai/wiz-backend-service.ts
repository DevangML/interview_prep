/**
 * WIZ Backend Service
 * Handles all data access, MCP orchestration, and skill invocation
 * Implements read-only data layer with real-time MCP access
 */

import type { WizContext, WizDecision } from './wiz-agi-system';

export interface DataQueryResult {
  success: boolean;
  data?: any[];
  error?: string;
  executionTimeMs: number;
  rowsAffected: number;
}

export interface McpServerConfig {
  id: string;
  name: string;
  type: 'web' | 'database' | 'service' | 'custom';
  endpoint: string;
  auth?: {
    type: 'bearer' | 'api-key' | 'oauth2';
    token?: string;
  };
  enabled: boolean;
  rateLimit?: number;
  timeout?: number;
}

export interface SkillInvocation {
  skillId: string;
  skillName: string;
  parameters: Record<string, any>;
  timeout: number;
}

export interface SkillResult {
  skillId: string;
  success: boolean;
  result?: any;
  error?: string;
  executionTimeMs: number;
}

export interface WizBackendServiceConfig {
  postgresUrl: string;
  redisUrl: string;
  indexedDbName: string;
  mcpRegistryUrl: string;
  skillsBasePath: string;
}

/**
 * WIZ Backend Service — Orchestrates all external data/tool access
 */
export class WizBackendService {
  private config: WizBackendServiceConfig;
  private mcpServers: Map<string, McpServerConfig> = new Map();
  private skillCache: Map<string, any> = new Map();
  private requestCache: Map<string, DataQueryResult> = new Map();

  constructor(config: WizBackendServiceConfig) {
    this.config = config;
    this.initializeMcpServers();
    this.preloadSkills();
  }

  /**
   * Initialize built-in MCP servers
   */
  private initializeMcpServers() {
    // Web MCP for real-time data access
    this.mcpServers.set('web', {
      id: 'web',
      name: 'Web MCP',
      type: 'web',
      endpoint: 'https://api.mcp.example.com/web',
      enabled: true,
      rateLimit: 100,
      timeout: 30000
    });

    // PostgreSQL MCP (read-only)
    this.mcpServers.set('postgres', {
      id: 'postgres',
      name: 'PostgreSQL (Read-Only)',
      type: 'database',
      endpoint: this.config.postgresUrl,
      enabled: true,
      timeout: 10000
    });

    // Redis MCP (cache layer)
    this.mcpServers.set('redis', {
      id: 'redis',
      name: 'Redis Cache',
      type: 'database',
      endpoint: this.config.redisUrl,
      enabled: true,
      timeout: 5000
    });

    // IndexedDB (client-side)
    this.mcpServers.set('indexeddb', {
      id: 'indexeddb',
      name: 'IndexedDB (Client)',
      type: 'database',
      endpoint: 'local',
      enabled: true,
      timeout: 5000
    });
  }

  /**
   * Preload available skills from disk
   */
  private preloadSkills() {
    // Load skill metadata from skills directory
    // This would normally read from the skills folder and cache metadata
    const skills = [
      { id: 'bmad-breakdown', name: 'Socratic Breakdown', category: 'teaching' },
      { id: 'bmad-architect', name: 'System Architect', category: 'design' },
      { id: 'bmad-research', name: 'Technical Research', category: 'research' },
      // ... load all 76 skills
    ];

    skills.forEach(skill => {
      this.skillCache.set(skill.id, skill);
    });
  }

  /**
   * Execute a read-only data query against PostgreSQL
   * Supports safe, parameterized queries only
   */
  async queryData(
    query: string,
    params: any[] = [],
    context: WizContext
  ): Promise<DataQueryResult> {
    const cacheKey = `${query}:${JSON.stringify(params)}`;

    // Check cache first
    if (this.requestCache.has(cacheKey)) {
      return this.requestCache.get(cacheKey)!;
    }

    try {
      // Validate query is read-only (no INSERT, UPDATE, DELETE, DROP, etc.)
      if (!/^\s*SELECT\s+/i.test(query.trim())) {
        throw new Error('Only SELECT queries are permitted (read-only access)');
      }

      const startTime = performance.now();

      // Call backend API to execute query
      const response = await fetch('/api/wiz/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          params,
          context: {
            userId: context.userId,
            dataAccessLevel: context.dataAccessLevel
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Query failed: ${response.statusText}`);
      }

      const result = await response.json();
      const executionTimeMs = performance.now() - startTime;

      const queryResult: DataQueryResult = {
        success: true,
        data: result.rows || [],
        executionTimeMs,
        rowsAffected: result.rowCount || 0
      };

      // Cache successful query
      this.requestCache.set(cacheKey, queryResult);
      return queryResult;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        executionTimeMs: 0,
        rowsAffected: 0
      };
    }
  }

  /**
   * Get all available MCP servers
   */
  listMcpServers(): McpServerConfig[] {
    return Array.from(this.mcpServers.values());
  }

  /**
   * Add a new MCP server dynamically
   */
  async addMcpServer(
    id: string,
    name: string,
    endpoint: string,
    auth?: any
  ): Promise<boolean> {
    try {
      // Validate endpoint is reachable
      const response = await fetch(endpoint, { method: 'HEAD', signal: AbortSignal.timeout(5000) });

      if (!response.ok) {
        throw new Error(`Endpoint unreachable: ${response.status}`);
      }

      const server: McpServerConfig = {
        id,
        name,
        type: 'custom',
        endpoint,
        auth,
        enabled: true,
        timeout: 30000
      };

      this.mcpServers.set(id, server);

      // Persist to backend
      await fetch('/api/wiz/mcp/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(server)
      });

      return true;
    } catch (error) {
      console.error(`Failed to add MCP server: ${error}`);
      return false;
    }
  }

  /**
   * Call an MCP server endpoint
   */
  async callMcpServer(
    serverId: string,
    method: string,
    params: Record<string, any> = {}
  ): Promise<any> {
    const server = this.mcpServers.get(serverId);
    if (!server) {
      throw new Error(`MCP server not found: ${serverId}`);
    }

    if (!server.enabled) {
      throw new Error(`MCP server disabled: ${serverId}`);
    }

    try {
      const response = await fetch(`${server.endpoint}/${method}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(server.auth?.token && { 'Authorization': `Bearer ${server.auth.token}` })
        },
        body: JSON.stringify(params)
      });

      if (!response.ok) {
        throw new Error(`MCP call failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      throw new Error(`MCP call error (${serverId}/${method}): ${error}`);
    }
  }

  /**
   * Invoke a BMad skill
   */
  async invokeSkill(invocation: SkillInvocation): Promise<SkillResult> {
    const skill = this.skillCache.get(invocation.skillId);
    if (!skill) {
      return {
        skillId: invocation.skillId,
        success: false,
        error: `Skill not found: ${invocation.skillId}`,
        executionTimeMs: 0
      };
    }

    try {
      const startTime = performance.now();

      const response = await fetch('/api/wiz/skills/invoke', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          skillId: invocation.skillId,
          skillName: invocation.skillName,
          parameters: invocation.parameters
        })
      });

      if (!response.ok) {
        throw new Error(`Skill invocation failed: ${response.statusText}`);
      }

      const result = await response.json();
      const executionTimeMs = performance.now() - startTime;

      return {
        skillId: invocation.skillId,
        success: true,
        result: result.output,
        executionTimeMs
      };
    } catch (error) {
      return {
        skillId: invocation.skillId,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        executionTimeMs: 0
      };
    }
  }

  /**
   * Search across all available data sources
   */
  async universalSearch(
    query: string,
    context: WizContext
  ): Promise<{
    dataResults: any[];
    webResults: any[];
    skillMatches: any[];
  }> {
    const [dataResults, webResults, skillMatches] = await Promise.all([
      this.queryData(
        `SELECT * FROM knowledge_graph WHERE content ~* $1 LIMIT 10`,
        [query],
        context
      ),
      this.callMcpServer('web', 'search', { q: query, limit: 10 }),
      this.searchSkills(query)
    ]);

    return {
      dataResults: dataResults.data || [],
      webResults: webResults?.results || [],
      skillMatches: skillMatches
    };
  }

  /**
   * Search available skills
   */
  private searchSkills(query: string): any[] {
    const matches: any[] = [];
    const lowerQuery = query.toLowerCase();

    this.skillCache.forEach((skill) => {
      if (
        skill.name.toLowerCase().includes(lowerQuery) ||
        skill.category.toLowerCase().includes(lowerQuery)
      ) {
        matches.push(skill);
      }
    });

    return matches;
  }

  /**
   * Get system health and available resources
   */
  async getSystemHealth(): Promise<{
    status: 'healthy' | 'degraded' | 'error';
    services: Record<string, { available: boolean; latencyMs: number }>;
    capabilities: {
      skillCount: number;
      mcpServerCount: number;
      cacheSize: number;
    };
  }> {
    const services: Record<string, { available: boolean; latencyMs: number }> = {};

    // Check each service health
    for (const [id, server] of this.mcpServers) {
      const start = performance.now();
      try {
        await fetch(server.endpoint, { method: 'HEAD', signal: AbortSignal.timeout(5000) });
        services[id] = { available: true, latencyMs: performance.now() - start };
      } catch {
        services[id] = { available: false, latencyMs: -1 };
      }
    }

    const availableCount = Object.values(services).filter(s => s.available).length;
    const status = availableCount === this.mcpServers.size ? 'healthy' : availableCount > 0 ? 'degraded' : 'error';

    return {
      status,
      services,
      capabilities: {
        skillCount: this.skillCache.size,
        mcpServerCount: this.mcpServers.size,
        cacheSize: this.requestCache.size
      }
    };
  }
}

// Global instance
let wizBackendServiceInstance: WizBackendService | null = null;

export function initializeWizBackend(config: WizBackendServiceConfig): WizBackendService {
  if (!wizBackendServiceInstance) {
    wizBackendServiceInstance = new WizBackendService(config);
  }
  return wizBackendServiceInstance;
}

export function getWizBackend(): WizBackendService {
  if (!wizBackendServiceInstance) {
    throw new Error('WIZ backend not initialized. Call initializeWizBackend first.');
  }
  return wizBackendServiceInstance;
}
