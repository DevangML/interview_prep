# 🧙 React Prep Wizard — Product Requirements Document (PRD)

**Document Status**: LOCKED & CANONICAL (v2.3 — Master Orchestration & Multi-Agent Architecture)  
**Target Application**: `react-prep-wizard` (Desktop Web & Mobile Socratic AI Crucible)  
**Author**: Product Manager John (`bmad-agent-pm`)  
**Technical Architecture**: Winston (`bmad-agent-architect`)  
**Date**: August 26, 2026

---

## 1. Executive Summary & Vision

The **React Prep Wizard AI Agent Subsystem** is an offline-first, evidence-driven multi-specialist cognitive substrate built directly into `react-prep-wizard`. It transitions candidates from passive code copiers into first-principles engineers capable of clearing Staff/Principal frontend and distributed systems interviews.

### Core Value Proposition
- **Intelligent Orchestration Engine**: Replaces brittle string switching with task decomposition, capability matching, and bounded multi-agent handoffs.
- **Evidence-First Verification Stack**: Evaluates code through deterministic AST parsing and sandboxed WebWorker test execution; LLMs synthesize telemetry rather than replacing execution.
- **Continuous Adaptive Learning**: Tracks user accuracy, delayed retention, and novel isomorphic transfer across held-out mutation families.
- **Cross-Device Permanence**: Backed by local IndexedDB (`PrepWizardCognitiveDB`) with bi-directional delta synchronization to PostgreSQL/SQLite (`/api/cognitive/sync`).

---

## 2. Top-Level Architectural Shift: From "Chatbot Switch" to "Intelligent Controller"

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

## 3. Core Controller Specifications & Interface Contracts

### 3.1 The Agent Controller Engine (ACE) Routing Pipeline
Replaces brittle `if (msg.startsWith('/'))` string matching with an **Intent, Risk & Capability Analyzer**:

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

#### Deterministic Routing Matrix
| User Intent | Auto-Inferred Pattern | Primary Specialist | Secondary / Handoff | Stopping Condition |
|---|---|---|---|---|
| *"Why is this code throwing an unhandled race error?"* | `sequential_handoff` | **Engineering (Copilot)** | **Learning (Tutor)** | Invariant verified & mental model explained |
| *"Audit my distributed queue design for 100k QPS."* | `evaluator_optimizer` | **Engineering (Architect)** | **Evaluation (Judge)** | Zero undetected SPOFs & verified capacity math |
| *"Evaluate my code submission."* | `single_agent` | **Evaluation (Judge)** | None | Observable test & AST results compiled |
| *"How can I reframe this project into a Staff narrative?"* | `single_agent` | **Learning (Strategic)** | None | Reversible experiment & trade-off table emitted |

---

### 3.2 The Universal Inter-Agent Result Envelope
Every agent mode emits a strictly validated JSON interface, preventing fragile prose-to-prose communication:

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

---

### 3.3 Capability & Tool Authorization Boundaries
To prevent prompt pollution and privilege escalation, agents are bound to explicit capability matrices:

```
┌───────────────────────────┬────────────────────────────────────────────────────────────────────────┐
│ Agent / Mode              │ Authorized Capability & Tool Permissions                               │
├───────────────────────────┼────────────────────────────────────────────────────────────────────────┤
│ **Learning: Tutor**       │ `read_memory`, `retrieve_knowledge`, `record_weakness`                 │
│                           │ 🚫 *Prohibited from modifying workspace code or executing compilers*    │
├───────────────────────────┼────────────────────────────────────────────────────────────────────────┤
│ **Learning: Strategic**   │ `read_project_blueprint`, `retrieve_company_archetype`                 │
│                           │ 🚫 *Prohibited from running sandboxed execution or altering tests*     │
├───────────────────────────┼────────────────────────────────────────────────────────────────────────┤
│ **Engineering: Copilot**  │ `read_code`, `compile_ast`, `run_sandboxed_tests`, `apply_minimal_diff`│
│                           │ 🚫 *Prohibited from changing grading rubrics or syllabus state*        │
├───────────────────────────┼────────────────────────────────────────────────────────────────────────┤
│ **Engineering: Architect**│ `read_project`, `capacity_calculator`, `spof_analyzer`, `retrieve_rag` │
│                           │ 🚫 *Prohibited from direct DOM manipulation or auto-passing tests*     │
├───────────────────────────┼────────────────────────────────────────────────────────────────────────┤
│ **Evaluation: Judge**     │ `read_submission`, `execute_isolated_tests`, `read_normative_spec`    │
│                           │ 🚫 *Prohibited from emitting solution code or altering invariants*     │
└───────────────────────────┴────────────────────────────────────────────────────────────────────────┘
```

---

### 3.4 Redefined Strategic Reviewer (Eliminating "Oracle Theater")
Replaced ungrounded "Oracle 10x Winning Move" with an **Evidence-Driven Strategic Reviewer**:

```typescript
export interface StrategicReviewResult {
  currentAssumptions: string[];
  identifiedOverEngineering: Array<{ component: string; cognitiveCost: string }>;
  asymmetricAlternative: {
    designPattern: string;
    expectedUpside: string;
    implementationCost: 'Low' | 'Medium' | 'High';
    reversibility: 'One-Way Door' | 'Two-Way Door';
  };
  recommendedMicroExperiment: string;
}
```

---

### 3.5 Evidence-Triggered Appellate Review (Fixing the Judge Dispute Loop)
An appeal in the Judge Chamber never triggers an LLM opinion loop. Instead, it triggers **Active Evidence Acquisition**:

```
[Candidate Disputation in DebateDrawer]
                   │
                   ▼ (Extract Specific Disputed Invariant)
"Dispute Claim: My closure implementation is race-free because of monotonic timestamps."
                   │
                   ▼ (Active Evidence Acquisition)
[Evidence Engine Generates Targeted Adversarial Test Case: `test_timestamp_drift_under_load`]
                   │
                   ▼ (Execute in Sandboxed Worker)
Results: Passed (100% concurrency safety under 10k out-of-order calls)
                   │
                   ▼ (Judge Re-evaluates Observable Evidence)
[Judge Issues Revised Verdict Based on Executable Proof, Not Argumentation]
```

---

## 4. Flagship Workflow: The End-to-End Interview Handoff Cycle

The true power of this architecture is the **Multi-Stage Sequential Handoff**:

```
[Candidate Injects Bug / Starts Task]
                   │
                   ▼
┌────────────────────────────────────────────────────────┐
│ 1. ENGINEERING COPILOT                                 │
│ • Localizes root cause via Babel AST & runtime error   │
│ • Applies minimal diff fix                             │
└──────────────────┬─────────────────────────────────────┘
                   │ [Handoff: "Bug resolved; candidate needs conceptual grounding"]
                   ▼
┌────────────────────────────────────────────────────────┐
│ 2. SOCRATIC LEARNING TUTOR                             │
│ • "You stabilized the effect. Now explain why the      │
│    original race condition occurred at the event loop."│
└──────────────────┬─────────────────────────────────────┘
                   │ [Handoff: "Candidate explained mechanism; needs scale stress-test"]
                   ▼
┌────────────────────────────────────────────────────────┐
│ 3. SYSTEMS ARCHITECT                                   │
│ • "Now defend how this cancellation model behaves      │
│    when 50,000 requests hit your Redis rate limiter."  │
└──────────────────┬─────────────────────────────────────┘
                   │ [Handoff: "Candidate proposed architecture; requires validation"]
                   ▼
┌────────────────────────────────────────────────────────┐
│ 4. EVALUATION JUDGE                                    │
│ • Audits CAP trade-offs and runs capacity validation   │
│ • Commits verified mastery to Epistemic Memory         │
└────────────────────────────────────────────────────────┘
```

---

## 5. Per-Agent Evaluation Metrics Matrix

```
┌─────────────────────────┬────────────────────────────────────────────────────────────────────────┐
│ Agent / Mode            │ Isolated Evaluation Metrics & Acceptance Criteria                      │
├─────────────────────────┼────────────────────────────────────────────────────────────────────────┤
│ **Learning: Tutor**     │ • Downstream Transfer Rate ($T_{\text{heldout}} \ge 0.75$)             │
│                         │ • Assistance Reduction Slope (Decreasing hints over time)              │
├─────────────────────────┼────────────────────────────────────────────────────────────────────────┤
│ **Learning: Strategic** │ • Strategic Grounding Accuracy (Trade-off realism vs. industry docs)   │
│                         │ • Actionable Experiment Quality (Expert rubric score $\ge 4.5/5$)      │
├─────────────────────────┼────────────────────────────────────────────────────────────────────────┤
│ **Engineering: Copilot**│ • Bug Localization Accuracy ($\ge 90\%$)                               │
│                         │ • Minimal Diff Ratio ($< 15\%$ lines changed per fix)                  │
│                         │ • Zero Regression Rate on Existing Test Suites                         │
├─────────────────────────┼────────────────────────────────────────────────────────────────────────┤
│ **Engineering: Arch**   │ • Capacity Math Accuracy ($100\%$ formula correctness)                 │
│                         │ • SPOF Identification Recall ($\ge 95\%$)                              │
├─────────────────────────┼────────────────────────────────────────────────────────────────────────┤
│ **Evaluation: Judge**   │ • False-Negative Adjudication Rate ($< 2.0\%$)                         │
│                         │ • Disputation Evidence Acquisition Success ($\ge 95\%$)                │
└─────────────────────────┴────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Implementation Roadmap

- **P0 (Foundations & Safety)**: Hardened Sandbox WebWorker + Benchmark Harness ($N=30$) + Atomic IndexedDB Delta Sync.
- **P1 (Memory & Context)**: Task-Aware Context Allocator + Typed Epistemic Memory (`validUntil`, `lastConfirmedAt`) + Agent Controller Engine (ACE) with `AgentResultEnvelope`.
- **P2 (Retrieval & Pedagogy)**: Hybrid BM25/Dense RRF Retrieval + Gated Mastery Hurdle + Adaptive Socratic Ladder.
- **P3 (Tooling & Pruning)**: Held-Out Isomorphic Mutation Generator + Selective Forgetting + Evidence-Driven Appellate Review.
