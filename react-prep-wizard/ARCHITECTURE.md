# 🏛️ React Prep Wizard — Technical Architecture Specification

**Document Status**: ARCHITECTURAL SPINE LOCKED (v2.3 — Multi-Agent Controller & Interface Specification)  
**Target Application**: `react-prep-wizard` (Socratic AI Assistant, Live Sandbox, Cloud Sync)  
**Author**: Winston, System Architect (`bmad-agent-architect`)  
**Date**: August 26, 2026

---

## 1. Architectural Topology & Agent Controller Engine (ACE)

```
                               ┌────────────────────────────────────────────────────────┐
                               │                    USER INTERACTION                    │
                               │      (Natural Language, Code Change, Action, Slash)    │
                               └───────────────────────────┬────────────────────────────┘
                                                           │
                                                           ▼
                               ┌────────────────────────────────────────────────────────┐
                               │          INTELLIGENT AGENT CONTROLLER (ACE)            │
                               │  1. Intent, Risk & Task Decomposition                  │
                               │  2. Capability & Tool Authorization Matching           │
                               │  3. Orchestration Pattern Selection (Single/Chain/Eval)│
                               │  4. Bounded Context Slicing & Stopping Condition       │
                               └─────────────┬─────────────┬─────────────┬──────────────┘
                                             │             │             │
                    ┌────────────────────────┘             │             └────────────────────────┐
                    ▼                                      ▼                                      ▼
    ┌──────────────────────────────┐       ┌──────────────────────────────┐       ┌──────────────────────────────┐
    │     1. LEARNING AGENT        │       │    2. ENGINEERING AGENT      │       │    3. EVALUATION AGENT       │
    │  (Pedagogical & Strategic)   │       │   (Implementation & System)  │       │    (Verification & Audit)    │
    ├──────────────────────────────┤       ├──────────────────────────────┤       ├──────────────────────────────┤
    │ • Socratic Tutor Mode        │       │ • Real-time Copilot Mode     │       │ • Adjudicator Judge Mode     │
    │ • Strategic Reviewer Mode    │       │ • Systems Architect Mode     │       │ • Syllabus & Spec Auditor    │
    │ (Allowed Tools: Memory, RAG) │       │ (Allowed Tools: AST, Sandbox)│       │ (Allowed Tools: Test, Specs) │
    └──────────────┬───────────────┘       └──────────────┬───────────────┘       └──────────────┬───────────────┘
                   │                                      │                                      │
                   └──────────────────────────────┬───────┴──────────────────────────────────────┘
                                                  ▼
                               ┌────────────────────────────────────────────────────────┐
                               │              UNIFIED AGENT RESULT ENVELOPE             │
                               │  - Conclusion, Claims & Evidence Stack                 │
                               │  - Artifacts, Uncertainty & Confidence Estimate        │
                               │  - Explicit Next Recommended Action / Handoff Signal   │
                               └──────────────────────────┬─────────────────────────────┘
                                                          │
                                                          ▼
                               ┌────────────────────────────────────────────────────────┐
                               │               COGNITIVE SUBSTRATE LAYER                │
                               │  • Task-Aware Context  • Epistemic Memory with RRF RAG │
                               │  • Blast-Radius Sandbox• Gated Mastery & Delta Sync    │
                               └────────────────────────────────────────────────────────┘
```

---

## 2. Binding Subsystem Contracts

### 2.1 Contract 1: Agent Controller Plan (`src/lib/ai/agentController.ts`)
```typescript
export type OrchestrationPattern = 
  | 'single_agent'       // Simple query (e.g. syntax lookup -> Tutor)
  | 'sequential_handoff' // Debug -> Explain -> Scale (Copilot -> Tutor -> Architect)
  | 'evaluator_optimizer'// Solution generation -> Strict Verification (Architect -> Judge)
  | 'parallel_synthesis';// Multi-perspective trade-off (Architect + Strategic Reviewer)

export interface ControllerPlan {
  intent: 'debugging' | 'conceptual_inquiry' | 'system_defense' | 'code_review' | 'strategic_positioning';
  riskLevel: 'low' | 'medium' | 'high';
  orchestrationPattern: OrchestrationPattern;
  activeSpecialist: 'learning' | 'engineering' | 'evaluation';
  activeMode: 'tutor' | 'copilot' | 'architect' | 'judge' | 'strategic_reviewer';
  authorizedTools: string[];
  stoppingCondition: string;
  tokenBudget: number;
}
```

### 2.2 Contract 2: Universal Inter-Agent Result Envelope
```typescript
export interface AgentResultEnvelope<T = any> {
  agentId: 'learning' | 'engineering' | 'evaluation';
  mode: 'tutor' | 'copilot' | 'architect' | 'judge' | 'strategic_reviewer';
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
    recommendedNextAgent: 'learning' | 'engineering' | 'evaluation';
    recommendedMode: 'tutor' | 'copilot' | 'architect' | 'judge';
    handoffPrompt: string;
  };
  stopReason: 'objective_fulfilled' | 'requires_user_clarification' | 'failing_tests' | 'budget_exhausted';
}
```

### 2.3 Contract 3: Capability & Tool Authorization Boundaries
```typescript
export const AGENT_TOOL_PERMISSIONS = {
  learning_tutor: ['read_memory', 'retrieve_knowledge', 'record_weakness'],
  learning_strategic: ['read_project_blueprint', 'retrieve_company_archetype'],
  engineering_copilot: ['read_code', 'compile_ast', 'run_sandboxed_tests', 'apply_minimal_diff'],
  engineering_architect: ['read_project', 'capacity_calculator', 'spof_analyzer', 'retrieve_rag'],
  evaluation_judge: ['read_submission', 'execute_isolated_tests', 'read_normative_spec'],
} as const;
```

### 2.4 Contract 4: Blast-Radius Sandboxed Execution Boundary (`src/lib/sandbox/`)
```typescript
export interface SandboxExecutionConfig {
  workerType: 'null_origin_webworker';
  cpuWatchdogTimeoutMs: 2500;
  memoryCeilingBytes: 33554432; // 32MB
  networkDisabled: true;
  ambientCredentialsExposed: false;
  maxPayloadSizeBytes: 1048576; // 1MB
}
```

### 2.5 Contract 5: Multi-Stage Sequential Handoff Protocol
```
[Copilot Resolves Bug] ──(Handoff)──> [Tutor Socratic Invariant Probe] ──(Handoff)──> [Architect Scale Defense] ──(Handoff)──> [Judge Audit & Memory Store]
```

### 2.6 Contract 6: Data Integrity & Conflict-Free Delta Sync (`backend/app/routers/cognitive.py`)
- Scoped atomic IndexedDB transactions with per-field LWW (`val`, `ts`, `devId`, `rev`).
- Sync API: `GET /api/cognitive/sync?updated_after={ts}&cursor={id}`.

---

## 3. Prioritized Implementation Roadmap

- **P0**: Hardened Sandboxed Worker + Pilot Benchmark Harness ($N=30$) + Atomic IndexedDB Delta Sync.
- **P1**: Task-Aware Context Allocator + Typed Epistemic Memory (`validUntil`, `lastConfirmedAt`) + Agent Controller Engine (ACE) with `AgentResultEnvelope`.
- **P2**: Hybrid BM25 + Vector Retrieval with RRF + Gated Mastery Hurdle + Socratic Ladder.
- **P3**: Held-Out Isomorphic Mutation Generator + Selective Forgetting + Evidence-Driven Appellate Review.
