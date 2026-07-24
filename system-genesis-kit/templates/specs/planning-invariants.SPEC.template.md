---
id: SPEC-planning-invariants
companions:
  - planning-audit.md
---

> **Canonical contract (template).** Governs *scheduling & pedagogy invariants*, not lesson content. Any re-derived plan MUST satisfy every capability. GENESIS fills the learner specifics, writes to `<output_folder>/specs/planning-invariants.SPEC.md`, deletes this template.

# Curriculum Planning Invariants — {{GOAL_TYPE}} sprint

## Why
Naive planners list topics and schedule them as sequential blocks, gating each once — which parks the weakest, slowest-building, hardest-gated skill as a *late block* instead of a Day-1 habit, and schedules long-lead human-dependent items too late. The *generator* must be constrained so the mistake-class cannot recur on re-plan. Learner: {{USER_NAME}} — {{LEVEL}}, deadline {{DEADLINE}}, verified strengths {{STRENGTHS}}, hard gaps {{HARD_GATED}}.

## Capabilities
- **CAP-1 (cadence):** every skill tagged *continuous / sprint / long-lead*; scheduled by cadence, not list order. **Success:** no continuous skill appears as a single late block.
- **CAP-2 (runway):** weakest × slowest-building × hardest-gated skill starts Day 1. **Success:** no bottom-quartile, hard-gated skill starts after Week 2.
- **CAP-3 (spaced review):** every weak skill gets SM2 reviews after its first pass. **Success:** each core track has ≥1 post-sprint review + a pre-interview re-verification.
- **CAP-4 (achieve-and-maintain gates):** gates re-verified before interviews. **Success:** a gate-maintenance re-check covers every earlier gate.
- **CAP-5 (long-lead early):** referrals/interview scheduling start early, in parallel. **Success:** nurture ≤ early; a usable pitch exists soon; interviews pursued as gates clear.
- **CAP-6 (cover every weakness):** each stated weakness has a scheduled home. **Success:** none unscheduled.
- **CAP-7 (bridge + market):** system-design taught via Experience Bridge; effort weighted to what pays now. **Success:** bridge used; a differentiator track + any demand-gap track exist.
- **CAP-8 (buffer):** slack reserved for slippage. **Success:** ≥ ~1 light-load week-equivalent before the interview window.
- **CAP-9 (consistency):** pedagogy rules (okf, coach SKILL) don't contradict the schedule.
- **CAP-10 (adaptive):** the plan is wired to the daily log → RAG → rollover engine; gates and reviews recalibrate to measured velocity.

## Constraints
- Real deadline ({{DEADLINE}}) — fit AND leave buffer.
- Interviews hard-gate {{HARD_GATED}} regardless of real-world strength — no bridge substitute.
- Finite daily budget — continuous tracks stay small so several run in parallel.
- Coach flow stays curate-and-test, never lecture.

## Success signal
Running `planning-audit.md` against a re-derived plan yields **zero violations**.
