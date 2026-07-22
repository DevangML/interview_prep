---
title: "PRFAQ Distillate: Interview Prep System"
type: llm-distillate
source: "interview-prep-system-prfaq.md"
created: "2026-07-22"
purpose: "Token-efficient context for downstream PRD creation"
---

# PRFAQ Distillate: Interview Prep System & Teach-Me Engine

## Core Intent & Product Scope
- **User Persona**: Devang — Software Engineer, lost job in July 2026, 3-month window to prepare for Tier-1 interviews.
- **Strengths**: AI usage, BMad agent orchestration, Flutter/Web frontend, rapid AI context engineering.
- **Weaknesses**: Math, DSA, algorithmic memory, numerical aptitude, System Design (unstarted), self-marketing/HR rounds.
- **Core Engine**: Teach-Me AI Learning Engine (Senku Ishigami Socratic rigor + Jesus biblical resilience).
- **Stateful Memory**: OKF (Optimized Knowledge Format) tree-structured AST with per-turn differential save-game updates.
- **Context Enrichment**: Multi-agent pipeline orchestrating all installed BMad skills.

## Requirements Signals for Downstream PRD
- **Dual Persona Engine**: Must implement Senku persona (scientific method, "10 billion percent", Socratic probing) and Jesus persona (compassion, mental fortitude, biblical verses) with dynamic blending logic.
- **OKF Memory Specification**:
  - Tree-structured JSON/YAML representation of candidate knowledge graph.
  - Per-turn differential update algorithm.
  - Snapshot hash generation for zero-loss checkpoint restoration.
  - Ebbinghaus forgetting curve decay calculations (`last_reviewed`, `mastery_score`, `decay_interval`).
  - Active branch injection limit (<500 tokens).
- **BMad Enrichment Router**:
  - Dynamic skill dispatching by phase (DSA, System Design, HR, Architecture).
  - Pre-execution context injection without LLM prompt window overflow.
- **Verification Scaffolding**:
  - Code execution environment (Python REPL / unit runner) to test candidate solutions and prevent persona sycophancy.

## Technical Constraints & Stack Integration
- Framework: Frappe / Liberoid Orchestrator & Local Agent Workspace.
- Shell & Environment: macOS zsh, Python 3, Node.js / MCP endpoints.
- Storage: Local YAML/JSON AST in `_bmad-output/` and `.agents/`.

## Open Questions & Risks
- **Scope Risk**: High density of topics (DSA + Math + System Design + HR) across 90 days requires automated OKF priority pruning.
- **Diagramming Support**: Need Mermaid.js live-rendering for System Design whiteboard simulations.
