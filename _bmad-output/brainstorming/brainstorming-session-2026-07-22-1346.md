---
stepsCompleted: [1, 2]
inputDocuments: []
session_topic: 'Fast teach-me interview prep on a small local model, with Ruflo offloading orchestration so answers stay snappy'
session_goals: 'Pick a low-latency model/stack for ask-mode teach-me only (no coding/build); keep Senku pedagogy strong enough for DSA/CS/HR interview prep without lag'
selected_approach: 'ai-recommended'
techniques_used: ['Constraint Mapping', 'Resource Constraints', 'Solution Matrix']
ideas_generated: []
context_file: ''
---

# Brainstorming Session Results

**Facilitator:** Devang
**Date:** 2026-07-22

## Session Overview

**Topic:** Fast `/teach-me` on a smaller local model — Ruflo handles routing/memory/hooks so the chat model stays light and snappy. System is locked: ask-mode teaching only, no coding/build work.

**Goals:**
- No lag / slow answers (drop 14b / 30b as daily drivers)
- Teach-me does its job well (Senku Socratic + interview prep)
- Prepare for interviews (DSA, core CS, aptitude, HR) in ask mode
- Use Ruflo where it can carry load without needing a big LLM

## Technique Selection

**Approach:** AI-Recommended Techniques
**Analysis Context:** Fast ask-mode teach-me with Ruflo assist; latency-first under no-coding lock

**Recommended Techniques:**
- **Constraint Mapping:** Separate real vs imagined limits on speed, quality, and what Ruflo can offload
- **Resource Constraints:** Design teach-me as if only a 7b-class model is allowed
- **Solution Matrix:** Score model × Ruflo role × interview task; pick daily driver

**AI Rationale:** Constraint-heavy practical problem → deep + structured sequence; converge to an actionable stack without building code

## Technical Research Verdict (2026-07-22)

**User override:** Leave YOLO ideation; ground A/B/C + model pick in benchmarks + teach-me skill constraints.

### Evidence
- Head-to-head (guIDE pipeline): Qwen2.5-Coder-7B ~82% overall vs DeepSeek-R1-Distill-14B ~80%; **54 vs 28 tok/s**; TTFT 220 vs 450 ms ([graysoft compare](https://graysoft.dev/models/compare/deepseek-r1-distill-qwen-14b-vs-qwen-2-5-coder-7b-instruct)).
- Apple Silicon: 7B Q4 typically ~1.5–2× generation throughput of 14B class; M-Pro class handles 7B with headroom ([SpecPicks](https://specpicks.com/reviews/run-qwen-locally-apple-silicon-vs-rtx-3060-2026)).
- Pedagogy: Stock 7B can match insight quality for classic interview DSA when forced into teaching format; gains are behavioral (Socratic / no-code-dump), not Hard-problem supremacy ([dsa-reasoning-coach-7b study](https://huggingface.co/MoistPotato/dsa-reasoning-coach-7b-lora)). Academia: LLMs = reasoning partners, not autonomous solvers ([Khan 2026](https://aabdllatif.github.io/assets/pdf/Khan2026BeyondAnswerEngines.pdf)).
- Local teach-me skill is token-heavy (4-block + carousel + HTML/CSS persona) → **output length dominates lag** as much as model size.

### Answers locked
1. **Daily model:** `qwen2.5-coder:7b` (not 14b/30b).
2. **Ruflo:** owns routing/session memory/OKF save-game writes; does **not** replace DSA reasoning.
3. **Agent:** Claude Code + teach-me; BMAD optional/off for ask-mode.
4. **4-block:** keep structure; **hard-cap tokens per block** (short pulse / short deconstruct / one verse / one question).
5. **Correctness net:** weekly/boss-fight escalate to `deepseek-r1:14b`; daily drills stay on 7b.
6. **`gpt-4o-mini:latest`:** verify digest — if identical to coder:7b, it is not a separate smarter model.
