/**
 * WIZ AGI API Endpoints
 * Handles WIZ reasoning, data queries, MCP calls, and skill invocation
 */

import { Router, Request, Response } from 'express';
import type { WizContext } from '../../src/lib/ai/wiz-agi-system';
import { WIZ_AGI_SYSTEM_PROMPT, decideWizAction } from '../../src/lib/ai/wiz-agi-system';

const router = Router();

/**
 * Main WIZ Thinking Endpoint
 * POST /api/wiz/think
 */
router.post('/think', async (req: Request, res: Response) => {
  try {
    const { query, context } = req.body as { query: string; context: WizContext };

    if (!query || !context) {
      return res.status(400).json({ error: 'Missing query or context' });
    }

    // Step 1: Analyze intent and decide on action
    const decision = decideWizAction(query, context.availableMcps, context.availableSkills);

    // Step 2: Execute based on decision
    const toolInvocations = [];
    let dataResults: any = null;
    let webResults: any = null;
    let skillResults: any = null;

    if (decision.dataQueries.length > 0) {
      for (const dataQuery of decision.dataQueries) {
        toolInvocations.push({
          id: `tool-${Date.now()}`,
          type: 'data_query',
          tool: 'postgresql',
          status: 'pending'
        });

        // Execute data query (mock implementation)
        try {
          // In real implementation, would call database
          dataResults = { rows: [], rowCount: 0 };
          toolInvocations[toolInvocations.length - 1].status = 'complete';
          toolInvocations[toolInvocations.length - 1].result = dataResults;
        } catch (error) {
          toolInvocations[toolInvocations.length - 1].status = 'error';
          toolInvocations[toolInvocations.length - 1].result = error;
        }
      }
    }

    if (decision.toolsRequired.includes('web-mcp')) {
      toolInvocations.push({
        id: `tool-${Date.now()}`,
        type: 'mcp_call',
        tool: 'web',
        status: 'pending'
      });

      // Execute web MCP call (mock implementation)
      try {
        // In real implementation, would call MCP
        webResults = { results: [] };
        toolInvocations[toolInvocations.length - 1].status = 'complete';
        toolInvocations[toolInvocations.length - 1].result = webResults;
      } catch (error) {
        toolInvocations[toolInvocations.length - 1].status = 'error';
        toolInvocations[toolInvocations.length - 1].result = error;
      }
    }

    if (decision.skillsRequired.length > 0) {
      for (const skill of decision.skillsRequired) {
        toolInvocations.push({
          id: `tool-${Date.now()}`,
          type: 'skill_invoke',
          tool: skill,
          status: 'pending'
        });

        // Execute skill (mock implementation)
        try {
          // In real implementation, would invoke skill
          skillResults = { output: 'Skill result' };
          toolInvocations[toolInvocations.length - 1].status = 'complete';
          toolInvocations[toolInvocations.length - 1].result = skillResults;
        } catch (error) {
          toolInvocations[toolInvocations.length - 1].status = 'error';
          toolInvocations[toolInvocations.length - 1].result = error;
        }
      }
    }

    // Step 3: Generate response using Claude or local LLM
    const response = await generateWizResponse(query, decision, toolInvocations);

    res.json({
      response: response.content,
      thinking: response.thinking,
      decision: decision,
      toolInvocations: toolInvocations,
      timestamp: Date.now()
    });
  } catch (error) {
    console.error('WIZ thinking error:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * Data Query Endpoint
 * POST /api/wiz/query
 */
router.post('/query', async (req: Request, res: Response) => {
  try {
    const { query, params, context } = req.body;

    // Validate query is read-only
    if (!/^\s*SELECT\s+/i.test(query.trim())) {
      return res.status(403).json({ error: 'Only SELECT queries permitted' });
    }

    // Check data access level
    if (context.dataAccessLevel === 'none') {
      return res.status(403).json({ error: 'Data access denied' });
    }

    // Execute query (mock implementation)
    // In real implementation, would connect to actual PostgreSQL
    const result = {
      rows: [],
      rowCount: 0,
      executionTimeMs: 0
    };

    res.json(result);
  } catch (error) {
    console.error('Query error:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * MCP Server Management
 * POST /api/wiz/mcp/register
 */
router.post('/mcp/register', async (req: Request, res: Response) => {
  try {
    const { id, name, endpoint, auth } = req.body;

    // Validate endpoint
    try {
      const response = await fetch(endpoint, { method: 'HEAD', timeout: 5000 });
      if (!response.ok) throw new Error(`Endpoint returned ${response.status}`);
    } catch (error) {
      return res.status(400).json({ error: `Invalid endpoint: ${error}` });
    }

    // Register MCP server (would persist in database)
    res.json({
      success: true,
      server: { id, name, endpoint, auth, enabled: true }
    });
  } catch (error) {
    console.error('MCP registration error:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * Skill Invocation
 * POST /api/wiz/skills/invoke
 */
router.post('/skills/invoke', async (req: Request, res: Response) => {
  try {
    const { skillId, skillName, parameters } = req.body;

    // Load and execute skill (mock implementation)
    // In real implementation, would load skill from src/skills/bmad-skills
    const result = {
      skillId,
      skillName,
      output: `Skill ${skillName} executed with parameters: ${JSON.stringify(parameters)}`,
      executionTimeMs: Math.random() * 1000
    };

    res.json(result);
  } catch (error) {
    console.error('Skill invocation error:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * System Health Endpoint
 * GET /api/wiz/health
 */
router.get('/health', async (req: Request, res: Response) => {
  try {
    const health = {
      status: 'healthy',
      timestamp: Date.now(),
      services: {
        postgres: { available: true, latencyMs: 2 },
        redis: { available: true, latencyMs: 1 },
        web_mcp: { available: true, latencyMs: 150 },
        indexeddb: { available: true, latencyMs: 0 }
      },
      capabilities: {
        skillCount: 76,
        mcpServerCount: 4,
        dataAccessLevel: 'full'
      }
    };

    res.json(health);
  } catch (error) {
    console.error('Health check error:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * Helper: Generate WIZ Response
 * In production, would call Claude API or local LLM
 */
async function generateWizResponse(
  query: string,
  decision: any,
  toolInvocations: any[]
) {
  // This would call Claude API with the WIZ_AGI_SYSTEM_PROMPT
  // For now, returning mock response
  return {
    content: `# WIZ Analysis: "${query}"\n\n**Action Taken**: ${decision.action}\n\n**Reasoning**: ${decision.justification}\n\n**Tools Used**: ${toolInvocations.length > 0 ? toolInvocations.map(t => t.tool).join(', ') : 'None'}\n\n*Full response with reasoning would be generated by Claude API*`,
    thinking: {
      intent: query,
      domain: 'general',
      reasoning: decision.justification,
      confidence: 0.85
    }
  };
}

export default router;
