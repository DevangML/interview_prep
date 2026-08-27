/**
 * Domain Decomposition Engine
 * Breaks complex queries into isolated domain tasks for parallel execution
 * No model reasoning needed—just orchestration + synthesis
 */

export interface Domain {
  id: string;
  name: string; // 'research', 'architecture', 'security', 'performance', etc.
  description: string;
  subTask: string; // The isolated question for this domain
  requiredSkills: string[];
  requiredTools: string[];
  dataNeeded: string[];
  expectedOutput: string;
  timeout: number; // milliseconds
  priority?: number; // 0.0-1.0, higher = run first
}

export interface DomainResult {
  domainId: string;
  domainName: string;
  output: string;
  findings: string[];
  confidence: number; // 0.0-1.0
  evidence: string[]; // What sources confirmed this
  executionTimeMs: number;
  toolsUsed: string[];
  errors?: string[];
}

export interface DecomposedQuery {
  originalQuery: string;
  domains: Domain[];
  executionModel: 'parallel' | 'sequential' | 'hierarchical';
  synthesisStrategy: string;
  estimatedTimeMs: number;
}

/**
 * Domain Taxonomy — All possible domains WIZ can decompose into
 */
export const domainTaxonomy: Record<string, Partial<Domain>> = {
  'research': {
    description: 'Gather information from web, literature, data',
    requiredSkills: ['research-web-search', 'research-literature-review'],
    requiredTools: ['web-mcp', 'database'],
    timeout: 3000,
    priority: 0.9
  },

  'architecture': {
    description: 'System design, patterns, scalability analysis',
    requiredSkills: ['design-system-architecture', 'review-architecture'],
    requiredTools: ['database', 'data-query'],
    timeout: 3000,
    priority: 0.9
  },

  'performance': {
    description: 'Latency, throughput, optimization analysis',
    requiredSkills: ['review-performance'],
    requiredTools: ['benchmark-data', 'math'],
    timeout: 2500,
    priority: 0.8
  },

  'security': {
    description: 'Vulnerability analysis, threat modeling, compliance',
    requiredSkills: ['review-security'],
    requiredTools: ['threat-model', 'cve-database'],
    timeout: 2500,
    priority: 0.8
  },

  'implementation': {
    description: 'Complexity assessment, feasibility, gotchas',
    requiredSkills: ['review-code-quality'],
    requiredTools: ['code-examples', 'database'],
    timeout: 2500,
    priority: 0.7
  },

  'cost': {
    description: 'Infrastructure costs, resource usage, ROI',
    requiredSkills: [],
    requiredTools: ['cost-calculator', 'data-query'],
    timeout: 1500,
    priority: 0.6
  },

  'testing': {
    description: 'Test strategy, coverage, edge cases',
    requiredSkills: ['review-testability'],
    requiredTools: ['test-data', 'database'],
    timeout: 2000,
    priority: 0.7
  },

  'learning': {
    description: 'Educational perspective, explanation, analogy',
    requiredSkills: ['teach-concept-breakdown', 'teach-by-example'],
    requiredTools: ['knowledge-base'],
    timeout: 2000,
    priority: 0.6
  },

  'comparison': {
    description: 'Compare alternatives, tradeoffs, pros/cons',
    requiredSkills: ['teach-compare-contrast'],
    requiredTools: ['knowledge-base', 'database'],
    timeout: 2500,
    priority: 0.7
  },

  'strategy': {
    description: 'Strategic considerations, business impact, positioning',
    requiredSkills: ['strategy-interview-prep', 'strategy-career-pivot'],
    requiredTools: ['market-data', 'database'],
    timeout: 2500,
    priority: 0.6
  }
};

/**
 * Query Decomposer — Breaks queries into domain tasks
 */
export class QueryDecomposer {
  /**
   * Analyze query and determine which domains are relevant
   */
  static decompose(query: string): DecomposedQuery {
    const lowerQuery = query.toLowerCase();

    // Determine relevant domains based on query keywords
    const selectedDomains: string[] = [];

    // Research signals
    if (/latest|new|recent|trend|what|current|update/i.test(lowerQuery)) {
      selectedDomains.push('research');
    }

    // Architecture signals
    if (/design|architect|scale|pattern|system|structure|build/i.test(lowerQuery)) {
      selectedDomains.push('architecture');
    }

    // Performance signals
    if (/fast|slow|latency|throughput|qps|optimization|bottleneck|profile/i.test(lowerQuery)) {
      selectedDomains.push('performance');
    }

    // Security signals
    if (/security|vulnerability|risk|attack|threat|compliance|breach|unsafe/i.test(lowerQuery)) {
      selectedDomains.push('security');
    }

    // Implementation signals
    if (/implement|build|code|how to|feasible|effort|complexity|hard/i.test(lowerQuery)) {
      selectedDomains.push('implementation');
    }

    // Cost signals
    if (/cost|budget|expensive|roi|price|infrastructure|money/i.test(lowerQuery)) {
      selectedDomains.push('cost');
    }

    // Testing signals
    if (/test|coverage|edge case|qa|quality|verify|validate/i.test(lowerQuery)) {
      selectedDomains.push('testing');
    }

    // Learning/explanation signals
    if (/explain|teach|understand|why|how does|what is|learn/i.test(lowerQuery)) {
      selectedDomains.push('learning');
    }

    // Comparison signals
    if (/compare|vs|versus|difference|tradeoff|better|worse|choose/i.test(lowerQuery)) {
      selectedDomains.push('comparison');
    }

    // Strategy signals
    if (/strategy|career|interview|prepare|position|market|business|goal/i.test(lowerQuery)) {
      selectedDomains.push('strategy');
    }

    // If no domains detected, default to research + learning
    if (selectedDomains.length === 0) {
      selectedDomains.push('research', 'learning');
    }

    // Remove duplicates and sort by priority
    const uniqueDomains = [...new Set(selectedDomains)];
    const domains = uniqueDomains
      .map(id => this.createDomain(id))
      .filter(Boolean)
      .sort((a, b) => (b.priority || 0.5) - (a.priority || 0.5));

    // Estimate total execution time (parallel = max domain timeout)
    const estimatedTimeMs = Math.max(...domains.map(d => d.timeout));

    return {
      originalQuery: query,
      domains,
      executionModel: 'parallel',
      synthesisStrategy: 'combine all findings into coherent recommendation',
      estimatedTimeMs
    };
  }

  /**
   * Create a domain instance from taxonomy
   */
  private static createDomain(domainId: string): Domain {
    const template = domainTaxonomy[domainId];
    if (!template) return null as any;

    return {
      id: domainId,
      name: domainId.charAt(0).toUpperCase() + domainId.slice(1),
      description: template.description || '',
      subTask: this.generateSubTask(domainId),
      requiredSkills: template.requiredSkills || [],
      requiredTools: template.requiredTools || [],
      dataNeeded: template.dataNeeded || [],
      expectedOutput: `${domainId} analysis`,
      timeout: template.timeout || 2500,
      priority: template.priority
    };
  }

  /**
   * Generate the specific sub-task for this domain
   */
  private static generateSubTask(domainId: string, context?: string): string {
    const subTasks: Record<string, string> = {
      research: 'Gather and synthesize relevant information from available sources',
      architecture: 'Analyze system design patterns, scalability, and architectural tradeoffs',
      performance: 'Identify bottlenecks and estimate performance characteristics',
      security: 'Assess security risks and compliance implications',
      implementation: 'Evaluate implementation complexity and practical gotchas',
      cost: 'Calculate infrastructure costs and resource requirements',
      testing: 'Design comprehensive test strategy and identify edge cases',
      learning: 'Explain clearly as if teaching someone new to the topic',
      comparison: 'Compare alternatives and highlight tradeoffs',
      strategy: 'Analyze strategic implications and business impact'
    };

    return subTasks[domainId] || `Analyze ${domainId} aspect`;
  }
}

/**
 * Domain Task Executor — Runs domain tasks (stub for actual execution)
 */
export class DomainExecutor {
  /**
   * Execute a single domain task
   * In actual implementation, this would call skills, tools, data sources
   */
  static async executeDomain(domain: Domain, query: string): Promise<DomainResult> {
    const startTime = Date.now();

    try {
      // Stub: In real implementation, this would:
      // 1. Invoke required skills
      // 2. Call required tools
      // 3. Query required data
      // 4. Synthesize findings

      const output = `[${domain.name} Analysis]\n${domain.subTask}\n\n(Placeholder: would execute ${domain.requiredSkills.length} skills, use ${domain.requiredTools.length} tools)`;

      const executionTimeMs = Date.now() - startTime;

      return {
        domainId: domain.id,
        domainName: domain.name,
        output,
        findings: [`Finding from ${domain.name} domain`],
        confidence: 0.75,
        evidence: domain.requiredTools,
        executionTimeMs,
        toolsUsed: domain.requiredTools
      };
    } catch (error) {
      return {
        domainId: domain.id,
        domainName: domain.name,
        output: '',
        findings: [],
        confidence: 0,
        evidence: [],
        executionTimeMs: Date.now() - startTime,
        toolsUsed: [],
        errors: [error instanceof Error ? error.message : 'Unknown error']
      };
    }
  }

  /**
   * Execute all domains in parallel
   */
  static async executeAllDomains(
    domains: Domain[],
    query: string
  ): Promise<DomainResult[]> {
    const promises = domains.map(domain => this.executeDomain(domain, query));
    return Promise.all(promises);
  }
}

/**
 * Result Synthesizer — Combines domain results into coherent answer
 */
export class ResultSynthesizer {
  /**
   * Synthesize domain results into a coherent answer
   * This is where the model is used (lightweight synthesis, not heavy reasoning)
   */
  static synthesize(query: string, results: DomainResult[]): {
    synthesisPrompt: string;
    activityTrace: string;
  } {
    // Build activity trace showing what happened
    const activityTrace = `
WIZ ACTIVITY TRACE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Query: ${query}

Domains Analyzed (in parallel):
${results
  .map(
    r => `
✓ ${r.domainName}
  Confidence: ${(r.confidence * 100).toFixed(0)}%
  Evidence: ${r.evidence.join(', ')}
  Time: ${r.executionTimeMs}ms
`
  )
  .join('\n')}

Total execution time: ${Math.max(...results.map(r => r.executionTimeMs))}ms (parallel)
`;

    // Build synthesis prompt for the model
    // Note: This is lightweight—model just combines findings, doesn't reason
    const synthesisPrompt = `You have domain expert findings for the query: "${query}"

${results
  .map(
    r => `
${r.domainName} (${(r.confidence * 100).toFixed(0)}% confident):
${r.output}

Key findings:
${r.findings.map(f => `- ${f}`).join('\n')}
`
  )
  .join('\n')}

Based ONLY on these domain findings above, provide a coherent, concise recommendation:
1. What should the user do? (one sentence)
2. Why? (based on the domain findings above)
3. Key tradeoffs (synthesize from architecture, performance, security, implementation domains)

Do NOT reason from scratch. ONLY synthesize the findings above.`;

    return { synthesisPrompt, activityTrace };
  }
}
