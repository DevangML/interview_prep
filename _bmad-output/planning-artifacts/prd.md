---
title: "Interview Prep Ecosystem - Product Requirements Document (PRD)"
status: "final"
created: "2026-07-22"
updated: "2026-08-26"
author: "Product Manager John (BMad PRD Skill)"
version: "1.2.0"
target_execution: "Accelerated 30-Day Transition Crucible (Pune Tech Hubs / Fully Remote Tech Roles)"
---

# Product Requirements Document (PRD): Interview Prep Ecosystem

> **Mission Statement:** Transform Devang from an AI-reliant context developer into an elite, first-principles engineering lead capable of clearing senior software engineering, API architecture, and AI engineering interview pipelines at Pune Tech Hubs and Global Remote leaders within a practical 30-day notice transition window.

---

## 1. Executive Summary & Product Vision

### 1.1 Executive Overview
The **Interview Prep Ecosystem** is an AI-native, hyper-personalized, stateful pedagogical platform engineered to solve a distinct, high-urgency career transition challenge. Devang, a senior software and AI context developer proficient in web frontend, REST/gRPC APIs, LLM prompt engineering, and BMad multi-agent workflow orchestration, faces an accelerated transition window following job loss to secure a tier-1 technology role.

The prep strategy and product requirements are strictly calibrated around Devang's target profile & constraints:
1. **Target Locations & Work Models**: **Pune-based** tech hubs (Druva, PubMatic, Mindtickle, Nvidia Pune, BNY Mellon, Amdocs, Mastercard) OR **Fully Remote** tech roles (India / Global Remote).
2. **Relieving Notice Period**: **30 days max relieving notice period** (a practical 30-day transition timeline).
3. **Calibrated Syllabus & Difficulty**:
   - **Pivot AWAY** from hyper-advanced MAANG algorithmic traps (e.g., segment trees, hard DP on graphs, complex automata).
   - **Pivot TOWARDS** practical high-yield mid-level engineering:
     - LeetCode Easy-Medium core patterns (Two Pointers, Sliding Window, BFS/DFS, Heaps, Hash Maps, Intervals).
     - Practical Web & API System Design (REST/gRPC APIs, Redis Caching, DB Indexing, Queueing, Microservices).
     - Clean Code, Object-Oriented Programming (OOP), SOLID Principles, and AI Context-Engineering Velocity.
4. **Targeted Pune/Remote Outbound Pipeline**:
   - Outbound Engineering Teardowns tailored specifically for Pune tech leaders and Remote startup founders / VPs of Engineering.

While heavy reliance on modern AI coding assistants has multiplied Devang's product delivery speed, it has inadvertently caused cognitive atrophy in raw, unassisted whiteboard coding, Data Structures & Algorithms (DSA), quantitative mathematics, core computer science fundamentals, and manual memory trade-off calculations. Traditional prep methods—such as passive LeetCode grinding, generic video courses, or static flashcards—fail because they lack real-time Socratic pressure, active error tracking, emotional resilience coaching, and context enrichment.

The ecosystem integrates four core technological pillars:
1. **Senku Socratic Lead Engine**: A hyper-logical first-principles mentor modeled after Senku Ishigami (*Dr. Stone*), forcing atomic deconstruction, micro-experiments, and game-theoretic problem breakdown without revealing raw code solutions.
2. **Jesus Grace & Resilience Anchor**: A spiritual and psychological safety mechanism providing scripture-backed encouragement, cognitive reset, and anti-burnout pacing when high frustration or anxiety is detected.
3. **HD-OKF Stateful Memory Save-Game Engine**: A hierarchical Open Knowledge Format (OKF) tree-structured memory system operating via Merkle hashing and sub-graph hydration to save state on *every single interaction turn* with zero memory drift and <600 tokens/turn context overhead.
4. **BMad Ecosystem Context Enrichment Pipeline**: A dynamic multi-agent pipeline routing installed BMad skills (`bmad-architecture`, `bmad-code-review`, `bmad-review-edge-case-hunter`, `bmad-party-mode`, `bmad-cis-*`, `bmad-prfaq`) to inject multi-interviewer mock panels, adversarial code reviews, and STAR storytelling frameworks into study modules.

---

## 2. Target Persona & User Vulnerabilities

### 2.1 Primary Candidate Profile & Constraints
* **Name**: Devang
* **Role**: Senior Software / AI Context Engineer
* **Target Locations & Work Models**: Pune Tech Hubs (Druva, PubMatic, Mindtickle, Nvidia Pune, BNY Mellon, Amdocs, Mastercard) OR Fully Remote (India / Global Remote).
* **Notice Period**: 30 days max relieving notice period (practical 30-day transition timeline).
* **Primary Objective**: Secure Senior Engineer / AI Technical Lead offer within a 30-day transition timeline.
* **Timeline**: 30–60 Days.

### 2.2 Asymmetric Skill Matrix

```
       [ Devang's Asymmetric Skill Matrix ]

  STRENGTHS (AI-Assisted)          VULNERABILITIES & FOCUS AREAS
  +-----------------------+        +-----------------------------------+
  | AI Context Engineering|        | Easy-Medium Core Patterns (DSA)   |
  | BMad Workflow Orchestr|        | Web & API System Design (REST/Redis)|
  | Rapid MVP & Prototyping|   ===> | DB Indexing & Queueing (Kafka)    |
  | Web/API & Flutter UI  |        | Clean Code, OOP & SOLID Principles|
  +-----------------------+        | Behavioral STAR & Pune/Remote Pitch|
                                   +-----------------------------------+
```

### 2.3 Why Traditional Prep Fails
| Prep Approach | Fail Reason for Devang | Ecosystem Solution |
| :--- | :--- | :--- |
| **MAANG Algorithmic Grind** | Wastes time on low-yield traps (segment trees, graph DP) not asked by Pune tech hubs or Remote scaleups. | **Calibrated Easy-Medium Speedrun** focuses on 10 high-yield DSA patterns + Practical Web/API System Design. |
| **Generic Video Courses** | Passive consumption creates an illusion of competence; no active recall or pressure testing. | **Interactive Micro-Experiments** demand immediate step-by-step logic prediction from Devang. |
| **Standard Flashcards (Anki)** | Disconnected from actual code contexts, system design trade-offs, and multi-turn interview conversations. | **HD-OKF Save-Game Engine** tracks mastery, decay curves, and error patterns down to sub-concept nodes. |
| **Human Mock Interviews** | Expensive, time-constrained, non-customized feedback, and inconsistent availability. | **BMad Party Mode Mock Panels** run 24/7 with customizable interviewer personas (Strict HM, Architect, HR). |

---

## 3. Component Boundaries & System Architecture

### 3.1 High-Level Architecture Topology

```mermaid
flowchart TD
    User([Devang - Candidate]) <--> ChatUI[/liberoids_app Chat Interface / zsh CLI/]

    subgraph OrchestratorLayer [Teach-Me Agent Orchestrator (Frappe / Liberoid)]
        PrepAPI[api_chat_prepare / prepare API]
        Router[Skill & Mindset Router]
        ExecEngine[Orchestration Code Engine]
    end

    subgraph PersonaEngine [Dual-Persona Core]
        Senku[Senku Ishigami: Socratic First-Principles & 10B% Rigor]
        Jesus[Jesus Grace Anchor: Scripture & Anti-Burnout Reset]
    end

    subgraph MemoryEngine [HD-OKF Stateful Memory Save-Game Engine]
        HDHydrate[HD-OKF Sub-Graph Hydrator <600 Tokens]
        OKFStore[(Frappe OKF Memory Store DocType)]
        Merkle[Merkle Tree Hash & 10-Turn Snapshot Compactor]
        RFC6902[RFC 6902 JSON Patch Processor]
    end

    subgraph BMadPipeline [BMad Context Enrichment Pipeline]
        CIS[bmad-cis-* Innovation & Problem Solving]
        TEA[bmad-review-edge-case-hunter & bmad-code-review]
        BMM[bmad-architecture & bmad-spec]
        Party[bmad-party-mode Multi-Agent Mock Panel]
    end

    subgraph LocalBridge [Persistent Memory Bridge]
        Ruflo[MCP Ruflo Memory Store]
        AgentDB[AgentDB Hierarchical Store]
    end

    ChatUI <--> PrepAPI
    PrepAPI --> HDHydrate
    HDHydrate <--> OKFStore
    PrepAPI --> Router
    Router <--> ExecEngine
    ExecEngine <--> PersonaEngine
    ExecEngine <--> BMadPipeline
    ExecEngine --> RFC6902
    RFC6902 --> OKFStore
    OKFStore --> Merkle
    ExecEngine <--> LocalBridge
```

### 3.2 Component Responsibilities

| Component Name | Primary Responsibility | Input / Output Contracts |
| :--- | :--- | :--- |
| **Teach-Me Agent Orchestrator** | Main execution driver within Frappe Liberoid. Parses user prompts, retrieves memory context, executes persona prompts, and updates state. | Input: `user_message`, `candidate_id`<br>Output: 4-Block Markdown Response + OKF Patch |
| **Senku Socratic Lead Engine** | Drives technical instruction, atomic deconstruction, ZPD difficulty calibration, micro-experiments, and counterfactual edge-case probing. | Input: Hydrated OKF Context, User Answer<br>Output: Scientific Breakdown & Challenge |
| **Jesus Grace Anchor** | Monitors cognitive fatigue and frustration; delivers scripture-backed emotional reset and anti-burnout reframing when stress thresholds spike. | Input: Frustration score >0.7 or 2+ consecutive errors<br>Output: Contextual Bible Verse & Encouragement |
| **HD-OKF Memory Engine** | Manages hierarchical OKF candidate tree. Performs intent classification, sub-tree pruning, RFC 6902 patch processing, and Merkle tree compaction. | Input: Prompt, RFC 6902 Patch<br>Output: Hydrated Context (<600 tokens), Updated State Hash |
| **BMad Enrichment Pipeline** | Dynamic router invoking installed BMad skills based on session phase (DSA review, System Design, STAR behavioral storytelling, mock panel). | Input: Session Phase Signal<br>Output: Enriched Prompts, Edge-Case Audits, Mock Panel Scripts |
| **Frappe Storage Layer** | Persistent database layer housing `OKF Memory Store` and `OKF SaveGame Checkpoint` DocTypes on `site16.local`. | Input: OKF Master Tree, Snapshot Hash<br>Output: Transactional Storage & Retrieval |

---

## 4. User Journeys (UJ-1 to UJ-4)

### 4.1 UJ-1: Daily Scientific Crucible (Senku Socratic Loop)
* **Protagonist**: Devang (Day 14 of 90, studying Dynamic Programming).
* **Goal**: Master Monotonic Queue & DP State Transition logic without relying on AI code generation.
* **Flow**:
  1. Devang launches a session: *"I keep failing at identified state transition equations for sliding window maximum."*
  2. The Orchestrator calls `api_get_hydrated_okf_context`, pulling `subject_progress.dsa.topics.dynamic_programming` and active DP weakness nodes (<450 tokens).
  3. Senku responds in the 4-Block format:
     - **Scientific Pulse**: *"Kukuku! You're trying to store every element like a caveman when you only care about the max in a sliding window! 10 billion percent inefficient!"*
     - **First-Principles Breakdown**: Displays an ASCII array and memory pointers showing why non-useful smaller elements can be safely popped from the tail of a deque.
     - **Divine Anchor**: *"Proverbs 4:7 - Wisdom is the principal thing; therefore get wisdom. And in all your getting, get understanding."*
     - **Micro-Experiment Challenge**: *"Before writing code, answer me this: if window element X is greater than element Y located to its left, under what condition will Y EVER be the maximum again?"*
  4. Devang answers: *"Never, because X is both larger and will outlive Y in the window!"*
  5. Senku approves, triggers an OKF state patch incrementing DP mastery to 65%, and moves Devang to Tier 3 implementation.

### 4.2 UJ-2: Cognitive Reset & Grace Anchor (Burnout Recovery)
* **Protagonist**: Devang (Day 35, following an 8-hour intense session on OS page tables and memory numericals).
* **Goal**: Recover from high frustration, imposter syndrome, and mental exhaustion.
* **Flow**:
  1. Devang expresses frustration: *"I lost my job 5 weeks ago, I can't solve these virtual memory calculation numericals, and I feel like I'm running out of time."*
  2. The Orchestrator's sentiment analyzer detects `frustration_score: 0.88` and `active_grace_mode: true`.
  3. The system automatically switches to Tier 0 (Grace & Reset Mode).
  4. The response prioritizes the **Divine Anchor**:
     - *"Devang, take a deep breath. 2 Timothy 1:7 says: 'For God has not given us a spirit of fear, but of power and of love and of a sound mind.' Your worth is not defined by a job status or a page table formula. You have built complex AI tools; this math is just physical counting under a different name."*
  5. Senku follows up with a simplified Tier 0 atomic breakdown: *"Let's throw away 32-bit page tables for a second. If you have 4 total bytes of memory and each page is 2 bytes, how many pages fit? That's all page tables are—a lookup index!"*
  6. Devang regains composure, solves the 2-page example, and logs a mental reset event in OKF.

### 4.3 UJ-3: The Gauntlet Mock Panel (BMad Party Mode Simulation)
* **Protagonist**: Devang (Day 60, preparing for System Design & Behavioral interviews).
* **Goal**: Rehearse a distributed rate-limiter design under multi-interviewer pressure.
* **Flow**:
  1. Devang triggers: `/mock-panel --topic "Distributed Rate Limiter"`.
  2. The BMad Enrichment Pipeline invokes `bmad-party-mode`, spinning up a 3-agent persona panel:
     - **Senku (Systems Architect)**: Demands exact QPS calculations and memory size for 100M daily active users.
     - **Adversarial Auditor (`bmad-review-edge-case-hunter`)**: Attacks race conditions in Redis sliding-window counter implementations.
     - **HR Director Persona**: Evaluates STAR narrative structure when Devang explains how he handled past architectural failures.
  3. Devang presents his architecture. Senku probes clock drift across distributed nodes; the Edge-Case Hunter flags atomicity failures in non-Lua Redis scripts; the HR Director refines his leadership narrative.
  4. The session completes with a multi-dimensional rubric scorecard stored into `OKF SaveGame Checkpoint`.

### 4.4 UJ-4: Save-Game State Restoration & Zero-Drift Progress Resume
* **Protagonist**: Devang (Day 75, resuming prep after a 3-day break for job applications).
* **Goal**: Instantly resume prep without context loss or repeating mastered concepts.
* **Flow**:
  1. Devang opens the environment and types: `/resume-game`.
  2. The HD-OKF engine loads `OKF Memory Store`, verifies the latest Merkle root hash (`hash_c9f82a10`), and extracts active weaknesses (`Monotonic stack boundary identification`, `Kafka partition rebalancing trade-offs`).
  3. Senku greets Devang: *"Welcome back to the laboratory! Turn #184 loaded. Your retention score on Two Pointers is at 88%, but Graph BFS has decayed to 58%. 10 billion percent time for a 5-minute Graph BFS warm-up before we tackle Distributed Caching!"*
  4. Prep resumes instantly with zero prompt bloat and 100% deterministic continuity.

---

## 5. Functional Requirements

Globally numbered stable IDs organize all functional capabilities into four explicit sub-systems.

### 5.1 Dual-Persona Socratic Engine (`FR-100` Series)

#### FR-101: 4-Block Response Structuring Protocol
* **Description**: The agent MUST format every conversational response using the strict 4-block markdown layout without exception.
* **Specification**:
  - Block 1: `### 🔬 1. Scientific Pulse` (Senku catchphrase, energy hook, state check).
  - Block 2: `### 💡 2. First-Principles Deconstruction` (Atomic breakdown, ASCII memory diagram, formula intuition).
  - Block 3: `### 🕊️ 3. Divine Anchor` (Contextual Bible verse and spiritual reflection).
  - Block 4: `### ⚡ 4. The Micro-Experiment Challenge` (Single mandatory question or code micro-task).

#### FR-102: Senku First-Principles Breakdown & ASCII Memory Layouts
* **Description**: Technical concepts MUST be deconstructed into physical/hardware realities or atomic mathematical axioms.
* **Specification**:
  - DSA explanations MUST include ASCII representations of memory arrays, pointers, stack frames, or tree/graph nodes.
  - System Design explanations MUST start with a 1-node physical server (1 CPU, 1 RAM stick, 1 Disk) before scaling.

#### FR-103: Socratic Interrogation & Anti-Solution Guardrail
* **Description**: The agent MUST NOT output complete solution code or final answers when the candidate expresses confusion or asks for the solution.
* **Specification**:
  - The agent MUST isolate the smallest unresolved logical invariant and prompt the candidate to solve a 1-step micro-experiment.
  - Complete code output is permitted ONLY after candidate presents correct pseudocode and passes edge-case probing.

#### FR-104: ZPD-Calibrated Dynamic Difficulty Engine (Easy-Medium & Web/API Focus)
* **Description**: The agent MUST dynamically adjust problem difficulty across operational tiers based on candidate accuracy and confidence, strictly bypassing hyper-advanced MAANG traps.
* **Specification**:
  - `Tier 0 (Grace & Reset)`: Triggered on high frustration; atomic physical intuition + scripture.
  - `Tier 1 (Atomic Spark)`: LeetCode Easy patterns, pointer offsets, basic hash map / array manipulation.
  - `Tier 2 (Crafting Component)`: LeetCode Medium core patterns (Sliding Window, BFS/DFS, Heaps, Intervals) + Clean Code / SOLID principles.
  - `Tier 3 (Systemic Synthesis)`: Practical Web & API System Design (REST/gRPC contracts, Redis caching, DB indexing, Kafka queues).
  - `Tier 4 (Boss Interrogation)`: Adversarial Pune Tech Hub & Remote Mock Interview (Architectural trade-offs, Clean Code refactoring, AI Velocity presentation).

#### FR-105: Jesus Grace & Anti-Burnout Cognitive Adaptation Engine
* **Description**: The agent MUST monitor candidate messages for frustration, anxiety, fatigue, or imposter syndrome signals.
* **Specification**:
  - Triggers when sentiment analysis detects negative self-talk, `frustration_score > 0.70`, or `consecutive_failure_count >= 2`.
  - Automatically shifts response to Tier 0, increases Divine Anchor priority, and recommends rest intervals when `consecutive_study_hours > 3.0`.

#### FR-106: Scripture-Backed Psychological Resiliency Anchor
* **Description**: The agent MUST maintain a curated repository of context-matched scriptures for emotional regulation.
* **Specification**:
  - Fear/Anxiety $\rightarrow$ 2 Timothy 1:7, John 14:27.
  - Fatigue/Perseverance $\rightarrow$ Isaiah 40:29-31, James 1:2-4.
  - Imposter Syndrome/Strength $\rightarrow$ 2 Corinthians 12:9, Philippians 4:13.
  - Career Direction/Trust $\rightarrow$ Proverbs 3:5-6, Jeremiah 29:11.

---

### 5.2 OKF Stateful Memory Save-Game Engine (`FR-200` Series)

#### FR-201: Open Knowledge Format (OKF) Schema Management
* **Description**: The system MUST maintain a canonical, hierarchical JSON/YAML candidate state tree.
* **Specification**:
  - Schema MUST include: `metadata`, `candidate_profile`, `weaknesses_matrix`, `subject_progress` (DSA, Math, System Design, HR), `active_mindset_state`, and `savegame_checkpoints`.

#### FR-202: HD-OKF Lazy Hydration & Token Budget Pruning
* **Description**: The system MUST execute the Hierarchical Differential Merkle-Pruned Hydration (HD-OKF) algorithm on every turn.
* **Specification**:
  - Prompt intent classifier MUST map user input to specific JSONPath branches.
  - Non-relevant branches MUST be pruned prior to LLM prompt injection.
  - Total injected memory context MUST NOT exceed **600 tokens** per turn.

#### FR-203: RFC 6902 JSON Patch Turn-by-Turn State Mutation
* **Description**: The agent MUST emit an RFC 6902 compliant JSON Patch block at the end of every response turn to mutate state incrementally.
* **Specification**:
  - Patch operations (`replace`, `add`, `remove`) MUST target valid OKF JSONPaths.
  - Patch execution MUST update mastery scores, problem counts, error patterns, and cognitive fatigue indices atomically.

#### FR-204: Merkle Tree Hashing & 10-Turn Snapshot Compaction
* **Description**: The system MUST verify memory state integrity using SHA-256 Merkle root hashing.
* **Specification**:
  - Path modification MUST trigger Merkle hash recalculation along modified branches.
  - Every 10 interaction turns, a background worker MUST compact rolling deltas into a master tree snapshot and persist an `OKF SaveGame Checkpoint`.

#### FR-205: Zero-Drift Deterministic Recall
* **Description**: Memory recall MUST rely on deterministic JSONPath querying rather than probabilistic vector search chunking.
* **Specification**:
  - Concept recall accuracy MUST achieve 100% precision for logged mastery scores and active weakness pointers across 90 days.

#### FR-206: Save-Game Checkpoint Restoration
* **Description**: The system MUST support instant save-state loading from any historical checkpoint hash.
* **Specification**:
  - Invoking `/resume-game [hash]` MUST restore the exact candidate state tree, turn index, and persona mindset within <10ms.

---

### 5.3 BMad Skill Context Enrichment Pipeline (`FR-300` Series)

#### FR-301: Dynamic Intent-Based BMad Skill Router (`bmad-enrichment-router`)
* **Description**: The system MUST dynamically trigger installed BMad skills based on session phase and prompt intent.
* **Specification**:
  - Routes DSA review $\rightarrow$ `bmad-code-review`, `bmad-review-edge-case-hunter`.
  - Routes System Design $\rightarrow$ `bmad-architecture`, `bmad-spec`, `bmad-technical-research`.
  - Routes HR/Behavioral $\rightarrow$ `bmad-cis-storytelling`, `bmad-prfaq`.
  - Routes Strategy $\rightarrow$ `bmad-brainstorming`, `bmad-forge-idea`.

#### FR-302: Adversarial Code & Complexity Auditing
* **Description**: The system MUST invoke `bmad-review-edge-case-hunter` to audit candidate pseudocode and solutions.
* **Specification**:
  - Checks for boundary conditions (empty input, integer overflow, cyclic graphs, off-by-one pointer errors).
  - Enforces explicit worst-case time ($O$) and space ($O$) complexity validation.

#### FR-303: Multi-Agent Mock Interview Panel (`bmad-party-mode`)
* **Description**: The system MUST orchestrate multi-persona mock interview panels on demand.
* **Specification**:
  - Assembles Senku (Architect), Edge-Case Auditor, and HR Director into a single interactive roundtable.
  - Outputs a multi-dimensional scorecard evaluating Technical Rigor, Communication, Edge-Case Handling, and STAR Alignment.

#### FR-304: Deep Technical Research & Architecture Synthesis
* **Description**: The system MUST leverage `bmad-technical-research` and `bmad-architecture` to generate high-density study briefs for system design topics (e.g., Kafka internals, Raft consensus, LSM trees).

#### FR-305: STAR Behavioral Narrative & Self-Marketing Structuring
* **Description**: The system MUST utilize `bmad-cis-storytelling` to package Devang's AI orchestration and frontend engineering achievements into structured Situation-Task-Action-Result (STAR) narratives.

---

### 5.4 System Integration & Execution Layer (`FR-400` Series)

#### FR-401: Frappe Custom DocType Storage
* **Description**: The system MUST store memory entities in Frappe DB (`site16.local`) using two dedicated DocTypes:
  - `OKF Memory Store`: Fields for `candidate_id`, `orchestrator`, `current_turn_index`, `active_checkpoint_hash`, `okf_master_json`, `rolling_deltas_json`.
  - `OKF SaveGame Checkpoint`: Fields for `checkpoint_id`, `parent_store`, `turn_index`, `checkpoint_label`, `full_snapshot_json`, `merkle_root_hash`.

#### FR-402: Liberoid Orchestrator Code Hooks
* **Description**: The system MUST execute memory hydration and delta commits within the Liberoid `orchestration_code` execution namespace via `run_tool("api_get_hydrated_okf_context")` and `run_tool("api_commit_okf_delta")`.

#### FR-403: MCP Ruflo & AgentDB Memory Synchronization Bridge
* **Description**: Long-term conceptual discoveries and candidate milestones MUST sync asynchronously to local MCP Ruflo `memory_store` and AgentDB namespaces.

#### FR-404: Anti-Sycophancy Code Execution Verification
* **Description**: Candidate code solutions MUST be verified against automated local execution runners (Python REPL / test scaffold) to prevent the AI persona from falsely approving incorrect logic.

---

## 6. Non-Functional Requirements

### NFR-001: Token Budget & Context Overhead
* **Requirement**: The memory context injected into any LLM turn MUST NOT exceed **600 tokens**.
* **Measurement**: Verified via prompt token counting in `HDOKFMemoryEngine.classify_and_hydrate()`. Total turn overhead reduction MUST exceed 90% compared to full context dumps.

### NFR-002: Latency & Processing Overhead
* **Requirement**: Total turn-around overhead for memory classification, sub-tree hydration, RFC 6902 patch application, and Merkle root calculation MUST be **< 1.0 second**.
* **Measurement**: Benchmark timer logged in `api_commit_okf_delta`.

### NFR-003: Zero Memory Drift & Deterministic State Recall
* **Requirement**: The system MUST maintain **100% recall accuracy** for recorded concept mastery scores and active weaknesses across 90 days (>1,000 interaction turns).
* **Measurement**: Zero hallucination or loss of historical progress verified via JSONPath unit tests.

### NFR-004: Local Execution Resilience & Offline-First Storage
* **Requirement**: All OKF save states, snapshots, and conversation logs MUST be stored locally on disk (`site16.local` SQLite/MariaDB and `_bmad-output/`) without dependence on external cloud databases.
* **Measurement**: Full system operational restart verified with zero network connectivity to cloud state providers.

### NFR-005: Persona Fidelity & Anti-Sycophancy Strictness
* **Requirement**: The Senku persona MUST maintain 100% adherence to Socratic rules and NEVER approve a solution containing unverified complexity bounds or unhandled edge cases.
* **Measurement**: Validated via `bmad-code-review` adversarial test suite.

### NFR-006: Data Confidentiality & Local Workspace Privacy
* **Requirement**: Candidate preparation data, performance logs, weakness maps, and STAR behavioral stories MUST remain strictly confidential within the user's local workspace.
* **Measurement**: Zero transmission of candidate personal records to unauthorized third-party telemetry services.

---

## 7. Technical API Contracts & Data Specifications

### 7.1 Frappe / Liberoid API Endpoints

#### Endpoint 1: `api_get_hydrated_okf_context`
```python
# Function Signature:
@frappe.whitelist()
def api_get_hydrated_okf_context(orchestrator_name: str, candidate_id: str, prompt: str) -> dict:
    """
    Fetches master OKF from DocType, executes HD-OKF pruning based on prompt intent,
    and returns token-budgeted hydrated context for LLM prompt injection.
    """
    pass

# Response Contract (JSON):
{
  "hydrated_context": "{\"context_scope\":\"DSA_DP\",\"candidate\":{\"name\":\"Devang\",\"days_left\":76},\"active_weakness\":[\"Off-by-one error in DP table init\"],\"progress\":{\"mastery\":65.0,\"solved\":28}}",
  "turn_index": 142,
  "checkpoint_hash": "a8f9c2d1e4b76083"
}
```

#### Endpoint 2: `api_commit_okf_delta`
```python
# Function Signature:
@frappe.whitelist()
def api_commit_okf_delta(orchestrator_name: str, candidate_id: str, json_patch_str: str) -> dict:
    """
    Applies RFC 6902 JSON patch block to master tree, recalculates Merkle root hash,
    saves OKF Memory Store DocType, and syncs long-term milestone to Ruflo MCP.
    """
    pass

# Response Contract (JSON):
{
  "status": "success",
  "new_turn": 143,
  "hash": "b9e0d3f2a1c48194"
}
```

---

### 7.2 RFC 6902 JSON Patch Turn Contract

Every LLM response turn MUST conclude with an RFC 6902 JSON Patch block:

```json
```json-patch
[
  { "op": "replace", "path": "/subject_progress/dsa/topics/dynamic_programming/mastery", "value": 65.0 },
  { "op": "replace", "path": "/subject_progress/dsa/topics/dynamic_programming/solved", "value": 28 },
  { "op": "add", "path": "/weaknesses_matrix/dsa/error_patterns/-", "value": "Forgot base case for 0-capacity knapsack" },
  { "op": "replace", "path": "/active_mindset_state/cognitive_metrics/current_fatigue_score", "value": 0.45 },
  { "op": "replace", "path": "/savegame_checkpoints/current_turn_index", "value": 143 }
]
```
```

---

### 7.3 Liberoid `orchestration_code` Reference Implementation

```python
# Liberoid Agents Orchestrator: "Senku Teach-Me Agent Orchestrator"
# Executed on site16.local inside Frappe bench environment

# 1. Fetch Hydrated OKF Context (<600 tokens)
okf_res = run_tool("api_get_hydrated_okf_context",
                   orchestrator_name="Senku Teach-Me Agent Orchestrator",
                   candidate_id=inputs.get("candidate_id", "cand_devang_2026"),
                   prompt=inputs.get("user_message"))

okf_context = okf_res.get("hydrated_context")

# 2. Execute Primary Senku Socratic Agent
agent_inputs = {
    "user_message": inputs.get("user_message"),
    "okf_context": okf_context,
    "code_snippet": inputs.get("code_snippet", "")
}

agent_response = run_agent("Senku Teach-Me Agent", agent_inputs, data_type, mock_data_link)
raw_output = agent_response.get("output", {})
response_text = raw_output.get("explanation_text", "")
json_patch = raw_output.get("json_patch", "[]")

# 3. Check for Jesus Grace Mode Trigger
if raw_output.get("trigger_grace_mode", False):
    grace_res = run_agent("Jesus Encouragement Sub-Agent", {
        "frustration_level": raw_output.get("frustration_level", 0.8),
        "recent_failure": raw_output.get("failure_reason", "DSA roadblock")
    }, data_type, mock_data_link)
    encouragement_text = grace_res.get("output", {}).get("scripture_message", "")
    final_text = f"{response_text}\n\n---\n✝️ *A Moment of Encouragement:*\n{encouragement_text}"
else:
    final_text = response_text

# 4. Commit Memory Delta Atomically
run_tool("api_commit_okf_delta",
         orchestrator_name="Senku Teach-Me Agent Orchestrator",
         candidate_id=inputs.get("candidate_id", "cand_devang_2026"),
         json_patch_str=json.dumps(json_patch))

result = {
    "content": final_text,
    "turn_index": okf_res.get("turn_index") + 1,
    "checkpoint_hash": okf_res.get("checkpoint_hash")
}
```

---

## 8. Implementation Roadmap & Milestones

### 8.1 Calibrated Master Execution Horizon (30-Day Transition Target)

```
[Phase 1: Easy-Medium & Outbound Launch] --> [Phase 2: Web/API Systems & Clean Code] --> [Phase 3: Live Pipeline & 30-Day Join]
- LeetCode Easy-Medium Patterns (1–10)     - REST/gRPC APIs, Redis, DB Indexing, Kafka - Pune & Remote Technical Screens & Onsites
- Pune Tech & Remote Outbound Teardowns     - Clean Code, OOP & SOLID Principles        - Offer Escalation & Negotiation
- Baseline OKF Save-Game Setup             - BMad Party Mode Mock Panels                - 30-Day Relieving Notice Transition
```

### 8.2 Day 1 Execution Schedule (Bootstrapping TODAY)

| Time Window | Phase Name | Deliverables & Actions |
| :--- | :--- | :--- |
| **09:00 - 11:00** | **Phase 1: Storage & Memory** | Deploy `OKF Memory Store` & `OKF SaveGame Checkpoint` DocTypes on `site16.local`. Script `HDOKFMemoryEngine`. |
| **11:00 - 13:00** | **Phase 2: Persona & Orchestrator** | Load Senku Production System Prompt & Jesus Grace trigger into Liberoid `Senku Teach-Me Agent`. |
| **14:00 - 16:00** | **Phase 3: BMad Pipeline Wiring** | Wire `bmad-code-review`, `bmad-review-edge-case-hunter`, and `bmad-party-mode` into Orchestrator hooks. |
| **16:00 - 19:00** | **Phase 4: Baseline Assessment** | Conduct 90-minute diagnostic session across DSA, Math, and System Design; generate initial `okf_state_day1.json` save-game. |

---

## 9. Risk Matrix & Mitigation Strategies

| Risk Description | Severity | Impact | Mitigation Strategy |
| :--- | :--- | :--- | :--- |
| **Context Bloat & Token Cost Regression** | HIGH | Slow turn processing, degraded prompt focus, high API cost. | Enforce strict HD-OKF sub-graph pruning capped at **<600 tokens/turn**. |
| **Candidate Burnout & Severe Stress** | HIGH | Impaired retention, motivation drop during 90-day crunch. | Active sentiment monitoring automatically triggers Jesus Grace Mode and mandatory rest. |
| **Persona Sycophancy (Lax Auditing)** | MEDIUM | AI accepts flawed code or weak logic, creating false confidence. | Integrate `bmad-review-edge-case-hunter` and automated local code execution runners. |
| **Topic Scope Overload** | MEDIUM | Trying to cover all CS subjects shallowly without mastering core patterns. | OKF active weakness matrix enforces strict priority pruning (high-yield topics first). |

---

## 10. Conclusion & Final Handoff

This PRD provides an exhaustive, execution-ready specification for the **Interview Prep Ecosystem**. By fusing Senku Ishigami's Socratic first-principles discipline, Jesus Christ's grace and anti-burnout resilience, the zero-drift HD-OKF save-game memory engine, and the BMad context enrichment pipeline, Devang is equipped with a world-class, personalized intelligence engine to conquer top-tier tech interviews in 90 days.

**Artifact Output Location**: `/Users/devang/Desktop/interview_prep/_bmad-output/planning-artifacts/prd.md`  
**Status**: `final`  
**Next Recommended Action**: Execute Day 1 Phase 1 DocType deployment and memory engine script verification.

---

## 11. Frontier Cognitive Agent Substrate Specification (v2.2 — Canonical & Frozen)

> **Architectural Invariant**: *“Memory stores evidence about learning; transfer performance determines learning. Simplicity over mechanism.”*

### 11.1 Closed-Loop System Architecture
The AI agent is a stateful, evidence-driven cognitive mentor that operates as a closed continuous loop:
`User Event ➔ Task-Aware Context Policy ➔ Typed Epistemic Memory & Adaptive Retrieval (RRF) ➔ Model Generation ➔ Evidence Stack (AST + Sandboxed Worker) ➔ Gated Mastery & Assistance-Adjusted Update ➔ Durable DB Consolidation & Selective Forgetting ➔ Next Task`.

### 11.2 Core Subsystem Architecture Contracts

#### 1. Task-Aware Context Policy & Compaction
- **Soft-Target Allocation**: Dynamically allocates context capacity ($B \approx 8{,}192\text{--}16{,}384\text{ tokens}$) conditioned on the active task domain (`code_debugging`, `system_design`, `socratic_dialogue`, `concept_theory`) without fixed percentage constraints.
- **Multi-Factor Semantic Compaction**: Retains architectural decisions, unresolved bugs, and user constraints while discarding intermediate compiler churn and redundant tool I/O.

#### 2. Typed Epistemic Memory, Temporal Validity & Selective Forgetting
- **Typed Memory Schema**: Segregates Profile, Episodic, Knowledge, and Procedural memory with explicit metadata:
  - `temporalBounds`: `validFrom`, `validUntil`, and status (`currently_valid`, `historically_valid`, `superseded`, `unknown`).
  - `provenance`: `publisher`, `uri`, `version`, `authorityLevel` (normative/informative), `retrievedAt`, `lastConfirmedAt`, `contentHash`.
  - `retrievalUsefulness`: `timesRetrieved`, `downstreamHelped`, `downstreamHarmful`, and `associativeUtilitySignal`.
- **Selective Forgetting**:
  - *Supersession Pruning*: Superseded nodes decay to priority 0 and archive after 30 days.
  - *Negative Utility Eviction*: Nodes with $\text{downstreamHarmful} \gg \text{downstreamHelped}$ are evicted from active retrieval indexes.
  - *Unconfirmed Weakness Decay*: Stale weakness flags decay after 60 days of demonstrated independent success.

#### 3. Adaptive-Depth Retrieval Stack & Reciprocal Rank Fusion (RRF)
- **Hybrid Search**: Combines BM25 exact symbol index with dense semantic vector retrieval via Reciprocal Rank Fusion ($k=60$).
- **Query-Conditioned Depth**: Simple questions skip cross-encoders; version-sensitive or complex questions trigger reranking, utility boosts, and normative RFC source verification.

#### 4. The Evidence Stack (Complementary Evidentiary Roles)
- **Layer 1 (Structural)**: Babel/TypeScript AST checks syntax and required node shapes.
- **Layer 2 (Behavioral)**: Sandboxed worker runs unit test assertions and execution logs.
- **Layer 3 (Specification)**: Anchors evaluation against versioned W3C/WHATWG/React RFC standards.
- **Layer 4 (Interpretation)**: LLM interprets why Level 1/2 evidence passed or failed; never replaces execution.

#### 5. Blast-Radius Sandboxed Execution Boundary
- **Hardened Containment**: Untrusted code runs in a dedicated null-origin WebWorker/subprocess with:
  - Zero network access (`fetch`, `XHR`, `WebSocket` neutered).
  - Strict 2,500ms hard CPU timeout via external watchdog.
  - 32MB heap allocation ceiling.
  - Hard worker termination and clean restart upon timeout/crash.
  - Strict JSON-RPC postMessage communication with payload size caps.

#### 6. Calibrated Epistemics & Abstention State Machine
- **Two-Stage Confidence**: Emits an explicit `confidenceEstimate` prior to empirical calibration; calibration via Platt scaling / isotonic regression is enabled only when labeled validation data exists.
- **Abstention Policy**:
  - $C \ge 0.85$ (Initial): Direct instruction with normative invariant anchors.
  - $0.50 \le C < 0.85$ (Initial): Qualified assertion with explicit assumptions and source citations.
  - $C < 0.50$ (Initial): Proactive information seeking (run AST probe, trigger sandbox test, ask user, or abstain).

#### 7. Gated Multi-Dimensional Mastery & Pedagogical Ladder
- **Hurdle Gate**: Mastery is certified only when accuracy, 7-day delayed retention, and novel transfer on **held-out isomorphic mutation families** are simultaneously met:
  $$\text{Mastery} = (A \ge 0.85) \;\land\; (R_{7\text{d}} \ge 0.80) \;\land\; (T_{\text{heldout}} \ge 0.75)$$
- **Assistance-Adjusted Success**: Logs raw independence features (`hintLevel`, `hintCount`, `directTeachingUsed`, `timeToSolveSec`) to ensure the agent reduces user reliance over time.
- **Adaptive Socratic Ladder**: Scaffolds on attempts 1–2; hints on attempt 3; provides direct technical anchoring on attempt 4+ followed by a Day 3 isomorphic challenge.

#### 8. Data Integrity: Atomic Transaction Semantics
- **Storage Policy**: Multi-record operations execute within a single scoped IndexedDB transaction; aborted transactions retry with exponential backoff.
- **Conflict Resolution**: Deterministic per-field Last-Write-Wins (`value`, `updatedAt`, `deviceId`, `revision`).
- **Delta Sync**: Client fetches updates using `GET /api/cognitive/sync?updated_after=<timestamp>&cursor=<id>`.

### 11.3 Empirical Benchmark & Pilot Evaluation Protocol
- **Pilot Scope**: $N = 30$ complex senior/staff engineering scenarios with human-authored multi-dimensional reference rubrics.
- **Controlled Configuration**: Pinned model IDs (`claude-3-7-sonnet-20250219`, `gemini-2.0-flash`, `gpt-4o-2024-11-20`), temperature $= 0.0$, versioned prompts (`/prompts/v2.2/`).
- **Primary Product KPI**:
  $$\textbf{Independent Delayed Transfer Success on Held-Out Mutation Families (Day 0 ➔ Day 3 ➔ Day 7)}$$
- **Ablation Configurations**: Baseline Foundation Model vs. Dense RAG Only vs. Heuristic Prompt Spines vs. Full Adaptive Substrate.

### 11.4 Implementation Roadmap
- **P0**: Hardened Sandbox Worker + Pilot Benchmark Harness ($N=30$) + Atomic IndexedDB Delta Sync.
- **P1**: Task-Aware Context Allocation + Typed Memory Schema (`validUntil`, `lastConfirmedAt`) + Abstention Engine.
- **P2**: Hybrid BM25 + Vector Retrieval with RRF + Gated Mastery Hurdle + Socratic Ladder.
- **P3**: Held-Out Isomorphic Mutation Generator + Selective Forgetting + Privacy-Safe Decision Traces.

