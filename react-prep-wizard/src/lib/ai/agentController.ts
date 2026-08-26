/**
 * Agent Controller Engine (ACE) & Routing Pipeline
 * Implements ARCHITECTURE.md Contract 1, 2, & 3:
 * - Intent, Risk & Task Decomposition
 * - Capability & Tool Authorization Matching
 * - Tool Permission Enforcement & Negative Denial Gates
 * - Orchestration Pattern Selection (Single, Sequential Handoff, Evaluator-Optimizer, Parallel Synthesis)
 * - Strict AgentResultEnvelope I/O Validation
 */

export type OrchestrationPattern = 
  | 'single_agent'       // Simple query (e.g. syntax lookup -> Tutor)
  | 'sequential_handoff' // Debug -> Explain -> Scale (Copilot -> Tutor -> Architect)
  | 'evaluator_optimizer'// Solution generation -> Strict Verification (Architect -> Judge)
  | 'parallel_synthesis';// Multi-perspective trade-off (Architect + Strategic Reviewer)

export type AgentSpecialist = 'learning' | 'engineering' | 'evaluation';
export type SpecialistMode = 'tutor' | 'copilot' | 'architect' | 'judge' | 'strategic_reviewer';

export interface ControllerPlan {
  intent: 'debugging' | 'conceptual_inquiry' | 'system_defense' | 'code_review' | 'strategic_positioning';
  riskLevel: 'low' | 'medium' | 'high';
  orchestrationPattern: OrchestrationPattern;
  activeSpecialist: AgentSpecialist;
  activeMode: SpecialistMode;
  authorizedTools: string[];
  stoppingCondition: string;
  tokenBudget: number;
}

export interface AgentResultEnvelope<T = any> {
  agentId: AgentSpecialist;
  mode: SpecialistMode;
  conclusion: string;
  claims: Array<{ statement: string; isNormative: boolean; sourceId?: string }>;
  evidence: Array<{
    type: 'ast_structure' | 'test_telemetry' | 'spec_contract' | 'memory_trace';
    payload: any;
    passed: boolean;
  }>;
  artifacts?: {
    codeDiff?: string;
    diagramSpec?: string;
    rubricScorecard?: Record<string, number>;
  };
  uncertainty: {
    confidenceEstimate: number; // 0.0 - 1.0
    assumptions: string[];
    unresolvedQuestions: string[];
  };
  handoff?: {
    recommendedNextAgent: AgentSpecialist;
    recommendedMode: SpecialistMode;
    handoffPrompt: string;
  };
  stopReason: 'objective_fulfilled' | 'requires_user_clarification' | 'failing_tests' | 'budget_exhausted';
}

export const AGENT_TOOL_PERMISSIONS: Record<SpecialistMode, string[]> = {
  tutor: ['read_memory', 'retrieve_knowledge', 'record_weakness'],
  strategic_reviewer: ['read_project_blueprint', 'retrieve_company_archetype'],
  copilot: ['read_code', 'compile_ast', 'run_sandboxed_tests', 'apply_minimal_diff'],
  architect: ['read_project', 'capacity_calculator', 'spof_analyzer', 'retrieve_rag'],
  judge: ['read_submission', 'execute_isolated_tests', 'read_normative_spec'],
};

export class AgentControllerEngine {
  /**
   * Plans the orchestration routing based on natural language intent and workspace context
   */
  public static plan(userQuery: string, currentContext: 'roadmap' | 'project' | 'sandbox' | 'mastery' | 'general' = 'general'): ControllerPlan {
    const q = userQuery.toLowerCase();

    // 1. Strategic Review & Reframing
    if (
      q.includes('staff') || q.includes('principal') || q.includes('narrative') || 
      q.includes('interview story') || q.includes('strategy') || q.includes('innovate') ||
      q.includes('reframe') || q.includes('position') || q.includes('incumbent') ||
      q.includes('over-engineer') || q.includes('career')
    ) {
      return {
        intent: 'strategic_positioning',
        riskLevel: 'medium',
        orchestrationPattern: 'single_agent',
        activeSpecialist: 'learning',
        activeMode: 'strategic_reviewer',
        authorizedTools: AGENT_TOOL_PERMISSIONS.strategic_reviewer,
        stoppingCondition: 'Actionable micro-experiment and asymmetric trade-off identified',
        tokenBudget: 3072,
      };
    }

    // 2. Code Submission Evaluation
    if (
      q.includes('evaluate') || q.includes('submit') || q.includes('grade') || 
      q.includes('judge') || q.includes('verdict') || q.includes('scorecard')
    ) {
      return {
        intent: 'code_review',
        riskLevel: 'medium',
        orchestrationPattern: 'single_agent',
        activeSpecialist: 'evaluation',
        activeMode: 'judge',
        authorizedTools: AGENT_TOOL_PERMISSIONS.judge,
        stoppingCondition: 'Observable tests and AST telemetry compiled',
        tokenBudget: 3072,
      };
    }

    // 3. High-Scale Architecture, Audits, Defenses, CRDTs & Distributed Systems
    if (
      q.includes('architect') || q.includes('scale') || q.includes('qps') || 
      q.includes('latency') || q.includes('audit') || q.includes('defend') ||
      q.includes('crdt') || q.includes('replication') || q.includes('failover') ||
      q.includes('spof') || q.includes('pub/sub') || q.includes('cluster') ||
      q.includes('partition') || currentContext === 'project'
    ) {
      return {
        intent: 'system_defense',
        riskLevel: 'high',
        orchestrationPattern: 'evaluator_optimizer',
        activeSpecialist: 'engineering',
        activeMode: 'architect',
        authorizedTools: AGENT_TOOL_PERMISSIONS.architect,
        stoppingCondition: 'All SPOFs analyzed and capacity equations verified',
        tokenBudget: 6144,
      };
    }

    // 4. Debugging, Concurrency & Reactive Errors
    if (
      q.includes('error') || q.includes('bug') || q.includes('race') || 
      q.includes('crash') || q.includes('deopt') || q.includes('stale') ||
      q.includes('rollback') || q.includes('rejection') || q.includes('failing') ||
      q.includes('uncaught') || q.includes('typeerror') || q.includes('cannot read') ||
      currentContext === 'sandbox'
    ) {
      return {
        intent: 'debugging',
        riskLevel: 'high',
        orchestrationPattern: 'sequential_handoff',
        activeSpecialist: 'engineering',
        activeMode: 'copilot',
        authorizedTools: AGENT_TOOL_PERMISSIONS.copilot,
        stoppingCondition: 'Root cause localized and minimal diff verified in sandbox',
        tokenBudget: 4096,
      };
    }

    // 5. Default Conceptual Socratic Invariant Inquiry (Tutor)
    return {
      intent: 'conceptual_inquiry',
      riskLevel: 'low',
      orchestrationPattern: 'single_agent',
      activeSpecialist: 'learning',
      activeMode: 'tutor',
      authorizedTools: AGENT_TOOL_PERMISSIONS.tutor,
      stoppingCondition: 'Mental model framed and Socratic challenge emitted',
      tokenBudget: 2048,
    };
  }

  /**
   * Enforces tool capability permissions and denies unauthorized tool invocations
   */
  public static authorizeToolExecution(mode: SpecialistMode, toolName: string): boolean {
    const allowed = AGENT_TOOL_PERMISSIONS[mode] || [];
    if (!allowed.includes(toolName)) {
      throw new Error(`SECURITY_VIOLATION: Mode '${mode}' is not authorized to execute tool '${toolName}'. Allowed: [${allowed.join(', ')}]`);
    }
    return true;
  }

  /**
   * Validates an agent result envelope to ensure structured contract conformity
   */
  public static validateEnvelope(envelope: any): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    if (!envelope) return { isValid: false, errors: ['Envelope is null or undefined'] };
    if (!envelope.agentId) errors.push('Missing agentId');
    if (!envelope.mode) errors.push('Missing mode');
    if (!envelope.conclusion) errors.push('Missing conclusion');
    if (!Array.isArray(envelope.claims)) errors.push('Claims must be an array');
    if (!Array.isArray(envelope.evidence)) errors.push('Evidence must be an array');
    if (!envelope.uncertainty || typeof envelope.uncertainty.confidenceEstimate !== 'number') {
      errors.push('Missing or invalid uncertainty confidenceEstimate');
    }
    return { isValid: errors.length === 0, errors };
  }
}
