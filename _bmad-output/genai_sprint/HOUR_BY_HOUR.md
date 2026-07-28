# ⏱ HOUR-BY-HOUR — every waking minute, Tue 28 → Sat 1 Aug

**Supersedes the schedule in `SPRINT_RUNSHEET_V2.md`'s patch. Same content, tighter packing.**

## THE SHAPE

```
TONIGHT  ▁▁      2.5h   light — it's already night, sleep is the asset
WED      ████████ 11h   HEAVY — front-loaded, the biggest intake day
THU      ████████ 11h   HEAVY — mocks + set-pieces
FRI      ███      6h    TAPER — recall only, zero new material
SAT      ▁        0.7h  revision card, then go
                 ─────
                  31h
```

## THE TWO RULES THAT MAKE 11-HOUR DAYS SURVIVABLE

1. **Mornings = new intake. Evenings = your mouth.** Cognition is highest early, so new concepts go there. Evenings are spoken reps — mocks, STAR stories, talk track. Speaking is retrieval practice, drains far less than intake, and is literally what the TR tests. This is how the day extends without the quality collapsing.
2. **The last 30 minutes before sleep is a consolidation slot.** Whatever you review last gets preferential consolidation overnight. It is reserved, every night, for the **project talk track and the 8 numbers.** Never spend it on something new.

**Non-negotiables:** 7h sleep minimum · eat at the marked times · every break involves standing up and leaving the desk.

---

# ▸ TONIGHT — Tue 28 · 2.5h · **deliberately light**

| Time | Block | Type |
|---|---|---|
| 20:30–20:45 | Re-read the TCS invite email. Check venue thread. | admin |
| 20:45–21:30 | **Pitch + band answer** — longhand, then aloud ×5, timed 80–95s | speak |
| 21:30–22:45 | **🧠 GENAI FUNDAMENTALS — taught as real interview questions.** Tokens · context windows · embeddings & similarity metrics · temperature/top-k/top-p · hallucination mechanism · **fine-tune vs RAG vs prompting**. Q&A format, answers spoken aloud. | intake+speak |
| 22:45 | **Stop. Phone down. Sleep by 23:15.** | — |

**Nothing heavy tonight on purpose.** Wednesday is an 11-hour day and it starts at 07:30. Trading sleep for two more hours tonight costs you four tomorrow.

---

# ▸ WED 29 — 11h · **the heaviest day**

**Wake 07:00.**

| Time | Block | Type |
|---|---|---|
| 07:30–09:30 | **LangChain — the four primitives** (chains, tools, agents, memory). 3/3 evidence. → 1 STAR story | 🧠 intake |
| 09:30–09:45 | ☕ walk, outside if possible | — |
| 09:45–11:45 | **`permrag` code walkthrough — every module.** `chunking` → `embedding` → `index` → `retrieve` → `chain` → `graph` → `evaluate`. You must be able to explain any line. | 🧠 intake |
| 11:45–12:45 | 🍽 **lunch — away from the screen** | — |
| 12:45–14:15 | **Evaluation** — RAG triad, Ragas, groundedness vs relevance, LLM-as-judge failure modes. *The #1 hire/no-hire separator.* → 1 STAR story | 🧠 intake |
| 14:15–14:30 | ☕ stand, stretch | — |
| 14:30–16:00 | **Python by hand — ON PAPER.** decorators · comprehensions · threading vs multiprocessing · classmethod vs staticmethod · **"2nd largest without built-ins, WITH test cases."** No IDE. | ✍️ practice |
| 16:00–16:30 | ☕ walk | — |
| 16:30–18:00 | **Vector DBs + distance metrics** — cosine vs dot vs Euclidean, HNSW vs IVF vs flat, selection criteria. → 1 STAR story | 🧠 intake |
| 18:00–19:00 | 🍽 **dinner** | — |
| 19:00–21:00 | **🎤 SPOKEN MOCK #1** — technical round only. **Log every stall.** | 🗣 retrieval |
| 21:00–22:00 | **STAR stories aloud** — the 3 core ones, no notes | 🗣 retrieval |
| 22:00–22:30 | 🌙 **Consolidation slot** — project talk track + the 8 numbers | 🗣 retrieval |
| 23:00 | **Sleep.** | — |

---

# ▸ THU 30 — 11h · **set-pieces and pressure**

**Wake 07:00.**

| Time | Block | Type |
|---|---|---|
| 07:30–09:00 | **LangGraph — HARD CAP 90 MIN.** State, reducers, checkpointer vs Store, HITL. Run `exp1`, `exp1b`, `exp2`, `exp3`, `exp3b`. *0/3 in candidate reports — this is a JD hedge, not a headline. Do not overrun.* | 🧠 intake |
| 09:00–09:15 | ☕ | — |
| 09:15–11:15 | **System design — 10M docs.** Index choice, ACL at scale, ingestion, latency budget, **semantic caching as an ACL bypass** (the seniority line). Draw it 3×. | 🧠 intake |
| 11:15–12:15 | 🍽 **lunch** | — |
| 12:15–13:45 | **Rapid-fire — both banks.** RAG/LLM + LangChain/LangGraph. Aloud, 20–40s per answer. | 🗣 retrieval |
| 13:45–14:00 | ☕ | — |
| 14:00–16:00 | **🎤 SPOKEN MOCK #2 — full day simulation.** TR → MR → HR, back to back, no pausing. | 🗣 retrieval |
| 16:00–16:30 | ☕ walk | — |
| 16:30–17:30 | **Build the REVISION CARD** — one printed page: 8 numbers · RAG triad · LangChain's 4 primitives · pre/post/off ACL table · pitch skeleton | ✍️ synthesis |
| 17:30–18:30 | 🍽 **dinner** | — |
| 18:30–20:30 | **Drill the stalls** from both mocks. Only what you fumbled. | 🗣 retrieval |
| 20:30–21:30 | **Project talk track — 90s, 5min, and the whiteboard drawn cold** | 🗣 retrieval |
| 21:30–22:00 | 🌙 **Consolidation slot** — revision card, read aloud | 🗣 retrieval |
| 22:30 | **Sleep.** | — |

---

# ▸ FRI 31 — 6h · **TAPER. Zero new material.**

**This day is deliberately unambitious. Cramming Friday damages Saturday.**

| Time | Block |
|---|---|
| 08:00–09:30 | Revision card — recall cold, fill every gap |
| 09:30–10:00 | ☕ walk |
| 10:00–11:00 | Pitch + band answer + notice-period line — final reps, timed |
| 11:00–12:00 | Rapid-fire sweep — both banks, fast |
| 12:00–13:00 | 🍽 lunch |
| 13:00–14:00 | **Light mock** — opening + 3 questions only. Confidence rep, not a stress test. |
| 14:00–15:30 | **Logistics.** Print revision card + CVs. Documents laid out in order. Route checked, departure time fixed. Formals out. Bag packed. |
| 15:30 | **🛑 STOP STUDYING.** |
| 15:30–22:00 | Walk. Eat properly. No screens after 21:00. |
| 22:00 | **Sleep.** Alarm ×2. |

---

# ▸ SAT 1 AUG — interview 09:00

| Time | |
|---|---|
| **05:30** | Wake. Eat a real breakfast. |
| 06:00–06:40 | **Revision card + pitch aloud. That is all.** |
| 06:40 | Bag, documents, phone charged, water |
| **07:00** | **Leave.** Aim to arrive 08:15 — 45 min buffer for Pune traffic. |
| In transit | Revision card once. Then put it away and look out of the window. |

**No new material. No "one last thing." Nothing hard.** If a fact isn't in your head by Saturday morning it isn't going in — and hunting it will only shake confidence you need intact.

---

## IF A DAY COLLAPSES

Cut in this order: LangGraph beyond 90 min → vector-DB depth → system design → rapid-fire.

**Never cut:** the project talk track · RAG drawn · the pitch · one full spoken mock. Those are 3/3 items and the ones you fully control.
