---
stepsCompleted:
  - "step-01-validate-prerequisites"
  - "step-02-design-epics"
  - "step-03-create-stories"
  - "step-04-final-validation"
inputDocuments:
  - "vision.md"
  - "_bmad-output/planning-artifacts/product-brief.md"
  - "_bmad-output/planning-artifacts/okf-memory-technical-research.md"
  - "_bmad-output/planning-artifacts/senku-teach-me-persona-spec.md"
  - "_bmad-output/planning-artifacts/interview-prep-system-prfaq.md"
  - "_bmad-output/planning-artifacts/interview-prep-system-prfaq-distillate.md"
---

# Interview Prep Ecosystem - Epics & User Stories Breakdown

## Overview

This document provides the canonical, production-ready **Epics and User Stories Breakdown** for the **Interview Prep Ecosystem**, constructed by Product Manager John using the `bmad-create-epics-and-stories` methodology.

Designed specifically for **Devang**—a senior frontend and AI context engineer facing a strict 90-day window following job loss—this system transforms raw interview preparation into a stateful, RPG-style learning engine. It integrates three core technical pillars:
1. **HD-OKF Stateful Memory Engine (`okf_engine.py`)**: Differential Merkle-pruned state tracking that functions like a video game save-file across every conversation turn.
2. **Senku Ishigami × Biblical Grace Teach-Me Orchestrator**: A dual-persona mentor combining Dr. STONE scientific first-principles deduction with scripture-backed emotional resilience.
3. **BMad Multi-Skill Context Enrichment Dispatcher**: Automated pipeline routing across all upstream BMad skills (`bmad-code-review`, `bmad-review-edge-case-hunter`, `bmad-party-mode`, `bmad-cis-*`).
4. **90-Day Diagnostic Assessment & Spaced Repetition Tracker**: Baseline diagnostic engine paired with SuperMemo SM-2 curve tracking to prune knowledge decay.

---

## Requirements Inventory

### Functional Requirements

* **FR1: Hierarchical OKF Schema & AST Initialization**: Initialize and validate an Open Knowledge Format (OKF) tree-structured AST (JSON/YAML) with schemas for `candidate_profile`, `weaknesses_matrix`, `subject_progress`, `active_mindset_state`, and `savegame_checkpoints`.
* **FR2: HD-OKF Lazy Sub-Tree Hydration**: Implement intent classification and path-based sub-tree extraction (`classify_and_hydrate`) to keep prompt context injection strictly under 600 tokens per interaction turn.
* **FR3: Per-Turn RFC 6902 JSON Patching & Merkle Hashing**: Extract JSON Patch blocks from agent responses, apply state updates atomically, compute SHA256 Merkle root hashes, and log rolling turn deltas.
* **FR4: Checkpoint Save-Game Compaction & Restoration**: Auto-compact rolling deltas into snapshot checkpoints every 10 turns (or via `/checkpoint`) and enable sub-5ms state restoration from save files (`okf_state.json`).
* **FR5: Senku Socratic Interrogation Persona**: Execute Senku Ishigami system prompt enforcing scientific deconstruction, 4-tier ZPD difficulty scaling (Atomic Spark to Boss Interrogation), and counterfactual probing ("10 billion percent").
* **FR6: Divine Grace & Scripture Encouragement Trigger**: Monitor cognitive metrics (frustration threshold >0.70, failure streak >=2) to activate Biblical grace sub-agent (2 Timothy 1:7, Isaiah 40:29-31, Philippians 4:13) and inject comforting scripture anchors.
* **FR7: Dual-Persona Response Synthesizer**: Format every orchestrator turn into the mandatory 4-Block framework: (1) Scientific Pulse 🔬, (2) First-Principles Deconstruction 💡, (3) Divine Anchor 🕊️, (4) Micro-Experiment Challenge ⚡.
* **FR8: Dynamic BMad Skill Context Dispatcher**: Route active study topics to specific BMad skills (`bmad-code-review`, `bmad-review-edge-case-hunter`, `bmad-cis-*`, `bmad-forge-idea`) based on session intent without LLM prompt bloat.
* **FR9: Multi-Agent Party Mode Mock Interview Panel**: Assemble multi-persona mock interview panels (Strict Hiring Manager, Systems Architect, HR Director, Senku) via `bmad-party-mode` for realistic trial rounds.
* **FR10: 90-Day Diagnostic Assessment Engine**: Execute a 90-minute multi-domain baseline diagnostic covering DSA, Quantitative Math, System Design, and Behavioral HR storytelling, writing initial state to `okf_state_day1.json`.
* **FR11: SuperMemo SM-2 Spaced Repetition & Decay Engine**: Calculate topic retention decay based on Ebbinghaus curve algorithms and automatically queue active weakness reviews when recall probability drops below 70%.
* **FR12: Progress Dashboard & Save-Game Analytics**: Expose candidate progress metrics, active weaknesses, mastery percentages, and checkpoint history in human-readable markdown and JSON reports.

### Non-Functional Requirements

* **NFR1: Token Budget Constraint**: Hydrated memory injection into prompt window must not exceed 600 tokens per interaction turn (>= 90% reduction vs monolithic history dumps).
* **NFR2: Ultra-Low Latency Execution**: Per-turn state hydration and RFC 6902 delta patching must complete in < 50 ms in Python, keeping total orchestrator latency < 1.0 second.
* **NFR3: Deterministic Zero-Loss Recall**: State tracking across 90 days / 100+ turns must achieve >= 99% recall precision via JSONPath routing and Merkle root integrity checks.
* **NFR4: Crash-Resilient Storage**: Persistent save files (`okf_state.json`, Frappe `OKF Memory Store`) must handle unexpected process termination gracefully without file corruption.
* **NFR5: Single-Day Implementation Feasibility**: All modules, Python scripts (`okf_engine.py`), prompt specifications, and pipeline dispatchers must be modular and deployable in a single development session.

### Additional Requirements (Architecture & Frappe/MCP Stack)

* **AR1: Python REPL Engine (`okf_engine.py`)**: Standard standalone Python 3 script capable of running CLI save-game operations and being imported into Frappe / Liberoid.
* **AR2: Frappe DocType Integration**: `OKF Memory Store` and `OKF SaveGame Checkpoint` DocTypes for site16.local / Liberoid execution namespace.
* **AR3: MCP Ruflo & AgentDB Memory Bridge**: Synchronization hooks between local OKF save-games and external MCP memory namespaces (`ruflo/memory_store`, `agentdb`).

### UX Design Requirements

* **UX-DR1: 4-Block Markdown UI Rendering**: Distinct markdown container formatting for Scientific Pulse 🔬, First-Principles Deconstruction 💡, Divine Anchor 🕊️, and Micro-Experiment ⚡ blocks.
* **UX-DR2: Emotional State Indicator & Grace Badges**: Visual indicators when candidate enters Grace Mode (e.g., ✝️ *A Moment of Encouragement* badge).

---

## FR Coverage Map

| Requirement ID | Mapped Epic & User Story | Summary Description |
|---|---|---|
| **FR1** | **Story 1.1** | Hierarchical OKF Schema & AST Data Model Initialization |
| **FR2** | **Story 1.2** | HD-OKF Intent Classifier & Sub-Tree Hydration Engine |
| **FR3** | **Story 1.3** | RFC 6902 Delta Patching, Merkle Hashing & Stateful Store Engine |
| **FR4** | **Story 1.4** | Save-Game Checkpoint Compaction & Restoration System |
| **FR5** | **Story 2.1** | Senku Ishigami Scientific Catalyst & Socratic Prompt Engine |
| **FR6** | **Story 2.2** | Divine Grace & Biblical Encouragement Sub-Agent Trigger System |
| **FR7** | **Story 2.3** | 4-Block Markdown Response Synthesizer & ZPD Scaler |
| **AR2** | **Story 2.4** | Liberoid / Frappe Orchestrator Execution Integration |
| **FR8** | **Story 3.1** | Context Enrichment Router & Skill Dispatcher Core |
| **AR3** | **Story 3.2** | Adversarial Code & Edge-Case Review Pipeline |
| **FR9** | **Story 3.3** | BMad Party Mode Multi-Agent Mock Interview Panel Integration |
| **FR10** | **Story 4.1** | Baseline 90-Day Multi-Domain Diagnostic Assessment Session |
| **FR11** | **Story 4.2** | SuperMemo SM-2 Spaced Repetition Decay & Review Scheduler |
| **FR12** | **Story 4.3** | Save-Game State Analytics & Candidate Mastery Dashboard Generator |

---

## Epic List

* **Epic 1: HD-OKF Stateful Memory Engine & Save-Game Scripting (`okf_engine.py`)**
  * *Goal*: Build the foundational hierarchical Open Knowledge Format (OKF) memory engine with differential sub-tree hydration, RFC 6902 patching, Merkle tree hashing, and sub-5ms save-game restoration.
  * *FRs Covered*: FR1, FR2, FR3, FR4 (NFR1, NFR2, NFR3, NFR4, AR1)

* **Epic 2: Senku Ishigami × Biblical Grace Teach-Me Orchestrator Prompt & Pipeline**
  * *Goal*: Construct the dual-persona AI orchestrator combining Senku Ishigami's 10-billion-percent scientific rigor with scripture-backed emotional resilience and 4-Block markdown synthesis.
  * *FRs Covered*: FR5, FR6, FR7 (AR2, UX-DR1, UX-DR2)

* **Epic 3: BMad Multi-Skill Context Enrichment Dispatcher**
  * *Goal*: Connect the Teach-Me orchestrator to the complete BMad skill ecosystem for adversarial code review, edge-case hunting, and multi-agent party mode mock panels.
  * *FRs Covered*: FR8, FR9 (AR3)

* **Epic 4: 90-Day Diagnostic Assessment & Spaced Repetition Tracker**
  * *Goal*: Implement the baseline 90-day multi-domain diagnostic assessment, SuperMemo SM-2 retention decay tracking, and automated candidate progress dashboards.
  * *FRs Covered*: FR10, FR11, FR12

---

## Epic 1: HD-OKF Stateful Memory Engine & Save-Game Scripting (`okf_engine.py`)

### Story 1.1: Core OKF Schema Definition & AST Data Model Initialization

As a **Candidate (Devang)**,  
I want **a standardized, hierarchical Open Knowledge Format (OKF) AST schema (`okf_schema.json`)**,  
So that **my entire preparation state, skill mastery matrix, active weaknesses, and save-game checkpoints can be stored deterministically without context corruption**.

**Acceptance Criteria:**

**Given** the need for a persistent candidate state data model  
**When** `okf_engine.py --init` is executed  
**Then** it creates a valid JSON file at `_bmad-output/planning-artifacts/okf_schema.json` conforming to the OKF v1.0 specification  
**And** the generated schema contains top-level keys `metadata`, `candidate_profile`, `weaknesses_matrix`, `subject_progress`, `active_mindset_state`, and `savegame_checkpoints`  
**And** `candidate_profile` includes `identity` ("Devang", 90-day horizon), `superpowers`, and `vulnerabilities`  
**And** `subject_progress` initializes sub-trees for `dsa`, `math`, `system_design`, and `hr` with `mastery_percentage` and topic retention scores  
**And** running schema validation against `okf_schema.json` returns zero validation errors.

---

### Story 1.2: HD-OKF Intent Classifier & Sub-Tree Hydration Engine

As an **AI Agent Orchestrator**,  
I want **to lazily classify user prompt intent and extract only the relevant OKF sub-tree paths (`classify_and_hydrate`)**,  
So that **the injected memory context remains strictly under 600 tokens per interaction turn while retaining complete domain awareness**.

**Acceptance Criteria:**

**Given** an initialized OKF master state tree in `okf_engine.py`  
**When** `classify_and_hydrate(prompt)` is invoked with a DSA-related prompt (e.g., "Let's solve Dynamic Programming table initialization")  
**Then** the intent classifier maps the prompt to paths `subject_progress.dsa`, `weaknesses_matrix.dsa`, and `active_mindset_state`  
**And** all unrelated branches (`subject_progress.math`, `subject_progress.hr`, `weaknesses_matrix.system_design`) are pruned from the returned payload  
**And** the total token size of the hydrated JSON payload is measured and verified to be <= 600 tokens  
**And** execution of the classification and hydration logic completes in < 15 milliseconds.

---

### Story 1.3: RFC 6902 Delta Patching, Merkle Hashing & Stateful Store Engine

As an **AI System**,  
I want **to process turn-by-turn RFC 6902 JSON patch updates and compute SHA256 Merkle root hashes in `okf_engine.py`**,  
So that **every conversation turn atomically mutates the master state file with guaranteed cryptographic integrity**.

**Acceptance Criteria:**

**Given** a valid JSON patch array returned from an agent response (e.g., `[{"op": "replace", "path": "/subject_progress/dsa/mastery_percentage", "value": 45.0}]`)  
**When** `apply_delta_patch(json_patch)` is called on `HDOKFMemoryEngine`  
**Then** the master state tree in memory and on disk (`okf_state.json`) is updated with the exact new values  
**And** the rolling turn counter `current_turn_index` is incremented by 1  
**And** a new 16-character SHA256 Merkle root hash is computed and assigned to `metadata.active_checkpoint_hash`  
**And** if an invalid JSON patch path or operation is passed, the engine rolls back atomically to the previous valid state and logs an error without crashing.

---

### Story 1.4: Save-Game Checkpoint Compaction & Restoration System

As a **Candidate**,  
I want **automated save-game compaction every 10 turns and sub-5ms checkpoint restoration via CLI or `/checkpoint` command**,  
So that **I can instantly load or roll back my learning progression state like a video game save file**.

**Acceptance Criteria:**

**Given** continuous conversation turns running through `okf_engine.py`  
**When** `current_turn_index` reaches a multiple of 10 or the user triggers `/checkpoint label="Post DP Drill"`  
**Then** the engine merges all rolling deltas into a full snapshot file in `_bmad-output/planning-artifacts/checkpoints/`  
**And** when `okf_engine.py --restore <checkpoint_hash>` is executed  
**Then** the system restores the exact master state and Merkle hash from that checkpoint in < 5 milliseconds  
**And** output status confirms: `"Save-Game restored successfully at Turn N (Hash: XXXX)"`.

---

## Epic 2: Senku Ishigami × Biblical Grace Teach-Me Orchestrator Prompt & Pipeline

### Story 2.1: Senku Ishigami Scientific Catalyst & Socratic Prompt Engine

As a **Candidate**,  
I want **the Senku Ishigami system prompt persona enforcing scientific first-principles deduction and 10-billion-percent rigor**,  
So that **I am forced to understand atomic CS/DSA concepts and solve micro-experiments rather than relying on passive code generation**.

**Acceptance Criteria:**

**Given** a technical question or coding prompt submitted to the orchestrator  
**When** the Senku Teach-Me Agent processes the input  
**Then** the agent responds using Senku's analytical tone, catchphrases ("10 billion percent", "Kukuku", "Get excited!"), and Socratic interrogation  
**And** the agent refuses to provide full solution code upfront, instead breaking the problem into an Atomic Construction Tree  
**And** the response demands the user analyze memory pointer layouts, hardware limits, or mathematical invariants  
**And** the prompt dynamically adjusts difficulty across 4 ZPD tiers (Atomic Spark, Crafting Component, Systemic Synthesis, Boss Interrogation) based on response accuracy.

---

### Story 2.2: Divine Grace & Biblical Encouragement Sub-Agent Trigger System

As a **Candidate experiencing high anxiety or failure streaks**,  
I want **an automated Divine Grace trigger that injects comforting Bible verses and anti-burnout encouragement**,  
So that **my imposter syndrome and performance stress are quieted before technical instruction resumes**.

**Acceptance Criteria:**

**Given** candidate cognitive metrics where `frustration_score` exceeds 0.70 OR `failure_streak_count` reaches >= 2  
**When** the orchestrator evaluates the current turn state  
**Then** it automatically activates the `Jesus Encouragement Sub-Agent`  
**And** the sub-agent selects a relevant scriptural anchor (e.g., 2 Timothy 1:7 for anxiety, Isaiah 40:29-31 for fatigue, Philippians 4:13 for difficulty)  
**And** the message delivers peaceful, empowering spiritual encouragement without diminishing technical standards  
**And** the mindset state in OKF memory sets `active_grace_mode: true` and resets the frustration accumulator.

---

### Story 2.3: 4-Block Markdown Response Synthesizer & ZPD Scaler

As a **Candidate**,  
I want **every turn response formatted cleanly into the mandatory 4-Block markdown layout**,  
So that **I can easily digest scientific concepts, spiritual anchors, and actionable coding challenges visually**.

**Acceptance Criteria:**

**Given** an agent turn ready for output generation  
**When** the response text is constructed  
**Then** it strictly adheres to the 4-Block markdown structure:
  1. `### 🔬 1. Scientific Pulse`
  2. `### 💡 2. First-Principles Deconstruction`
  3. `### 🕊️ 3. Divine Anchor`
  4. `### ⚡ 4. The Micro-Experiment Challenge`  
**And** Block 4 contains exactly ONE crisp, testable coding or logic question for immediate response  
**And** at the end of the payload, a hidden or compact RFC 6902 JSON patch block is attached for memory commit  
**And** markdown block styling renders cleanly across standard preview tools and terminal output.

---

### Story 2.4: Liberoid / Frappe Orchestrator Execution Integration

As a **System Administrator / Developer**,  
I want **the Senku Teach-Me Orchestrator wired into Frappe site16.local and Liberoid execution namespace (`orchestration_code`)**,  
So that **the orchestrator can be invoked via HTTP API (`api_chat_prepare`) or curl with full state persistence**.

**Acceptance Criteria:**

**Given** Frappe bench running at `http://localhost:8015` with site `site16.local`  
**When** a POST request is sent to `/mcp` or `api_chat_prepare` with `orchestrator_name: "Senku Teach-Me Agent Orchestrator"`  
**Then** `orchestration_code` executes `api_get_hydrated_okf_context`, runs the Senku agent, checks Jesus trigger conditions, and calls `api_commit_okf_delta`  
**And** the API returns JSON-RPC response containing `content` (4-Block markdown), `turn_index`, and updated `checkpoint_hash`  
**And** the operation completes with HTTP status 200 without permission or path errors when using Administrator headers.

---

## Epic 3: BMad Multi-Skill Context Enrichment Dispatcher

### Story 3.1: Context Enrichment Router & Skill Dispatcher Core

As a **Teach-Me Orchestrator**,  
I want **an automated BMad skill dispatcher (`bmad_dispatcher.py`)**,  
So that **specialized upstream BMad skills are dynamically loaded into session context based on study topic intent**.

**Acceptance Criteria:**

**Given** an active study session in DSA, System Design, or Behavioral HR  
**When** the candidate initiates a topic (e.g., "Review system design for distributed caching")  
**Then** `bmad_dispatcher.py` inspects installed skills in `.agents/skills/`  
**And** it selects and loads context from `bmad-architecture`, `bmad-technical-research`, or `bmad-cis-innovation-strategy`  
**And** the enriched context is injected as supplementary facts into the agent execution space  
**And** total context expansion is bounded to prevent LLM prompt overflow.

---

### Story 3.2: Adversarial Code & Edge-Case Review Pipeline

As a **Candidate submitting code solutions**,  
I want **`bmad-code-review` and `bmad-review-edge-case-hunter` automatically dispatched against my code snippets**,  
So that **hidden time/space complexity bugs, off-by-one errors, and boundary condition failures are exposed immediately**.

**Acceptance Criteria:**

**Given** a Python or C++ code solution submitted by the candidate during a Micro-Experiment  
**When** the solution is flagged for verification  
**Then** the orchestrator triggers parallel review passes using `bmad-review-edge-case-hunter` and `bmad-code-review`  
**And** the reviewer agents test boundary conditions: empty array, single element, negative numbers, integer overflow, and recursion depth limits  
**And** discovered vulnerabilities are formatted as Senku counterfactual probes ("What happens when an adversary passes an empty array?")  
**And** any identified pattern bugs are logged to `weaknesses_matrix.dsa.error_patterns` in OKF memory.

---

### Story 3.3: BMad Party Mode Multi-Agent Mock Interview Panel Integration

As a **Candidate preparing for real-world interviews**,  
I want **to trigger `/partymode` to launch a 4-persona mock interview panel (Strict Hiring Manager, Systems Architect, HR Director, Senku)**,  
So that **I can practice high-pressure technical and behavioral interviews under simulated real-world conditions**.

**Acceptance Criteria:**

**Given** candidate request to run a mock interview simulation  
**When** `bmad-party-mode` is dispatched by the orchestrator  
**Then** it initializes 4 distinct agent personas:
  1. *Strict Hiring Manager* (Focus: Production readiness, execution speed)
  2. *Systems Architect* (Focus: Trade-offs, scalability, failure modes)
  3. *HR Director* (Focus: STAR behavioral format, team fit)
  4. *Senku Ishigami* (Focus: First-principles algorithmic correctness)  
**And** the agents ask sequential, round-robin interview questions  
**And** at the end of 20 minutes, the panel outputs a consolidated score matrix and saves detailed feedback to `okf_state.json`.

---

## Epic 4: 90-Day Diagnostic Assessment & Spaced Repetition Tracker

### Story 4.1: Baseline 90-Day Multi-Domain Diagnostic Assessment Session

As a **Candidate starting Day 1 of preparation**,  
I want **a 90-minute structured diagnostic assessment covering DSA, Quantitative Math, System Design, and HR Storytelling**,  
So that **my baseline skill levels and active weaknesses are accurately measured and written to `okf_state_day1.json`**.

**Acceptance Criteria:**

**Given** Day 1 initialization of the preparation program  
**When** `okf_engine.py --run-diagnostic` is executed  
**Then** the orchestrator guides the candidate through 4 diagnostic modules:
  - 3 DSA coding problems (Easy, Medium, Hard)
  - 3 Quantitative Math / Aptitude numerical questions
  - 1 System Design architectural scenario (Distributed Cache)
  - 1 STAR behavioral career story pitch  
**And** candidate responses are evaluated and scored objectively  
**And** the initial master state file `okf_state_day1.json` is generated with populated `mastery_percentage` scores and baseline `weaknesses_matrix`  
**And** summary report displays initial radar chart data and Day 2 recommended agenda.

---

### Story 4.2: SuperMemo SM-2 Spaced Repetition Decay & Dynamic Review Scheduler

As a **Candidate**,  
I want **an automated spaced-repetition scheduler using the SuperMemo SM-2 algorithm**,  
So that **topics with declining recall scores are re-injected into my daily warm-up drills before memory decay occurs**.

**Acceptance Criteria:**

**Given** topic mastery records stored in `subject_progress` with `last_reviewed` timestamps and `retention_score`  
**When** `okf_engine.py --calculate-decay` runs during daily startup  
**Then** the engine applies the Ebbinghaus forgetting curve formula:  
  $$R = e^{-\frac{t}{S}}$$  
  where $t$ is days elapsed and $S$ is stability factor derived from SM-2 interval calculations  
**And** any topic whose calculated recall probability drops below 70% ($R < 0.70$) is automatically appended to `daily_review_queue`  
**And** Senku initiates the session with a 5-minute warm-up drill targeting the highest-decay topic.

---

### Story 4.3: Save-Game State Analytics & Candidate Mastery Dashboard Generator

As a **Candidate**,  
I want **a CLI and Markdown dashboard generator (`okf_engine.py --dashboard`)**,  
So that **I can view visual progress metrics, mastery growth curves, active weaknesses, and save-game checkpoint history at any time**.

**Acceptance Criteria:**

**Given** an active OKF master state file containing turn history and topic scores  
**When** `okf_engine.py --dashboard` is executed  
**Then** it generates `_bmad-output/planning-artifacts/candidate_dashboard.md`  
**And** the dashboard renders:
  - **Overall Readiness Index**: Weighted score across DSA (40%), System Design (30%), Math (15%), HR (15%)
  - **Active Weaknesses List**: Severity, error patterns, and recommended remediations
  - **90-Day Countdown & Trajectory**: Target date vs days remaining vs solved problem count
  - **Save-Game Checkpoint Log**: Table of recent snapshots with turn index, Merkle hash, and timestamps  
**And** terminal output displays a clean ASCII summary of top priorities for the day.

---

## Final Validation & Readiness Summary

All 4 Epics and 14 User Stories have been validated against the `bmad-create-epics-and-stories` methodology:
1. **Requirements Coverage**: 100% of Functional Requirements (FR1-FR12), Non-Functional Requirements (NFR1-NFR5), Additional Requirements (AR1-AR3), and UX Design Requirements (UX-DR1-UX-DR2) are fully mapped.
2. **Single-Day Implementation Feasibility**: Epics are strictly modular, allowing incremental construction from memory schema (`okf_engine.py`) to orchestrator prompts, BMad pipelines, and diagnostic trackers.
3. **Zero Forward Dependencies**: Every story relies strictly on prior stories or standalone inputs, ensuring clean execution by subagents.
