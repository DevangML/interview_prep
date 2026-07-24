# 🌱 System Genesis Kit
### A self-contained forge for building an adaptive, self-healing interview-prep coach — for anyone.

This folder is a **portable kit**. Drop it into a fresh Claude Code or Gemini/Antigravity project, open **`GENESIS_PROMPT.md`**, and paste it to the agent. GENESIS will:

1. **Ingest** every template + spec in this kit (understand the whole machine first-principles).
2. **Interview you** through a fun, gamified "character-creation" flow (who you are, your mentor/persona, your goal + companies, internship+PPO vs placement, hours + weekend concessions, learning style — no redundant questions).
3. **Orchestrate a BMad subagent pipeline** (researcher → strategist → architect → builder → reviewer) that does real research + build work.
4. **Generate your system from scratch** by filling the templates into live files.
5. **Delete the templates** and harden the result into a clean, one-of-one system.
6. **Become the coach you chose** and run the self-healing daily loop.

## What's inside
```
GENESIS_PROMPT.md              ← paste this to start. The creator prompt.
README.md                      ← you are here
bmad-framework/                ← BMad FULLY REALISED — install verbatim, never edit (13M)
  _bmad/                        · framework core (bmm · bmb · cis · core · custom · tea · scripts)
  .agents/                      · canonical BMad skills library (76 skills) + hooks.json
  .gemini/                      · Gemini/Antigravity settings
reference/
  MASTER_INJECTOR_v6.md        ← the architectural spine (principles GENESIS builds on)
templates/                     ← everything GENESIS fills, then deletes
  okf_state.template.json       · the stateful brain (config, curriculum, adaptive engine)
  ADAPTIVE_LEARNING_SYSTEM.template.md  · the self-healing control loop + retention science
  DAILY_LOG.template.md         · the 6-field daily sense-organ
  CURRICULUM_SPEC.template.md   · pedagogy + curriculum-order first principles
  CYCLE_PLAN.template.md        · phased cycle skeleton + fallback splits
  PROGRESS_TRACKER.template.md  · weekly + gate tracking
  assessment_gates.template.json· achieve-and-maintain gates
  MEMORY.template.md            · cross-session index
  skills/teach-me/SKILL.template.md   · the coach persona skill (persona + faith configurable)
  specs/planning-invariants.SPEC.template.md · CAPs the plan must satisfy
  specs/planning-audit.template.md           · the reviewer's checklist
  config/                       · optional .claude / .gemini / _bmad config templates
```

## First principles (why this exists)
- **Curate, don't lecture** — the coach scouts the best resources and tests; it doesn't re-explain what a great video already teaches.
- **No-assumptions** — mastery is UNVERIFIED until a test proves it.
- **Layered proficiency** — score depth, not "syntax works", weighted by the *researched* interview reality.
- **Experience Bridge + market weighting** — teach theory via shipped work; lean into what pays now; hard-gate skills stay ground-up.
- **Cadence-aware planning** — weakest × slowest × hardest-gated starts Day 1; spaced reviews; achieve-and-maintain gates; buffer.
- **Self-healing engine** — daily log → RAG → adapt → rollover; nothing gets it by surprise.
- **Configurable everything** — persona, encouragement mode (scriptural / secular / minimal), hours, goal — nothing hardcoded.

## Two layers, on purpose
- **`bmad-framework/` = stable, immutable.** BMad does not change and need not be changed — it's bundled verbatim and installed drop-in (copy `_bmad/`, skill-sync `.agents/skills/`, copy `.gemini/`). GENESIS only *configures* it (user-scoped values), never edits it.
- **`templates/` = per-user, ephemeral.** These are filled from your interview, become your live system, then get deleted. This is the layer that's one-of-one.

## Requirements
- Claude (Claude Code / claude.ai) or Gemini (Antigravity). No third-party swarm/daemon.
- **BMad is bundled** (`bmad-framework/`) — GENESIS installs it, then invokes its skills (analyst, innovation-strategist, architect, check-implementation-readiness) through the build pipeline. Nothing to install separately.

## Re-forging for someone else
GENESIS deletes templates after building. To keep the kit reusable, tell it to **archive** to `.forged/` instead of deleting, or keep a pristine copy of this folder before running.
