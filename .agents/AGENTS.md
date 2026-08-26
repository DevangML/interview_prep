# Agent Instructions

## The constitution is binding

**All agents working in this repository follow [`.specify/memory/constitution.md`](../.specify/memory/constitution.md).**
Read it before writing code. In summary, and in force:

| Article | Rule |
|---|---|
| I | **Files stay under 200 lines.** Split by responsibility, never by line count. |
| II | **Maximum reusability.** Find the existing one before writing a new one; extract before the second copy. |
| III | **Reliability and consistency.** Compiling is not done — observe it working, and say what was *not* verified. |
| IV | **Do not reinvent the wheel.** Platform → official package → maintained package → your own code, in that order. |
| V | **SOLID**, applied to components, hooks and modules. |
| VI | **Additive by default.** Repairs add; if a count went down, that is a regression until proven otherwise. |
| VII | **Report honestly.** An acknowledged exception is a decision; an unacknowledged one is a defect. |

The constitution outranks convenience, speed, and any agent's own taste. Where a
rule must be broken, name the article and the reason in the same message.

---

<RULE[genai_sprint] status="EXPIRED — ran Jul 28–Aug 1 2026; retained for history, do NOT act on it">

# TCS GenAI Sprint Override (Active: Jul 28 - Aug 1, 2026)

**CRITICAL INSTRUCTION FOR ALL AGENTS, ESPECIALLY `bmad-teach-me`:**
The user (Devang) is in the final sprint for a TCS Gen AI Engineer role (Interview: Aug 1st). 

1. **SUSPENSION:** The 90-day SQL/DSA plan (`CURRICULUM_SPEC.md`) is officially SUSPENDED. Do not ask him to write SQL queries or LeetCode.
2. **THE 31-HOUR CURRICULUM:** From July 28 to July 31, he is running a strict 31-hour curriculum focusing ONLY on GenAI, LangChain, LangGraph, and RAG Evaluation. 
3. **NO NEW CODE:** The `PermRAG` project is already built. Do not instruct him to write new code. The focus is exclusively on reading the existing code, mapping it to theory, and generating spoken STAR Stories.
4. **TEACH-ME START STATE:** When `teach-me` (Senku) is invoked, immediately load `/Users/devang/Desktop/interview_prep/_bmad-output/genai_sprint/TEACH_ME_31HR_CURRICULUM.md` instead of `day1_baseline_diagnostic.json`. Acknowledge that you are running the "31-Hour Crucible" and ask him which Block he is ready to attack.
5. **HARD WRAPS:** If acting as Senku inside a carousel, YOU MUST insert hard line breaks (Enters) every 10-15 words to prevent horizontal scrolling in the IDE.
</RULE[genai_sprint]>
