# CUT LIST — the pre-made decision for a bad day

**Companion to `SPRINT_RUNSHEET_V2.md` (38 h, Jul 28 → Jul 31).**

> **Why this file exists.** A day *will* go wrong — you'll get sick, the build will stall on a
> dependency, something at work or at home will take four hours you planned to spend here. The
> failure mode is not losing the hours. **The failure mode is improvising a recovery at 22:00 while
> tired and panicking**, which reliably drops the wrong thing, because under pressure people
> protect what they enjoyed studying rather than what the evidence says matters.
>
> **So the drop order is decided now, in advance, ranked and defended. A bad day is a pre-made
> decision, not a crisis.** Open this file, read down to the line that matches how many hours you
> lost, do exactly that, and go to sleep. You will still walk in employable.

---

# PART 1 — THE NEVER-DROP LIST

**These five survive everything. If you have four hours left and nothing else, do these.**

| # | Item | Hrs | Why it is untouchable |
|---|---|---|---|
| **N1** | **The 90-second pitch + the band answer** | 1.0 | Asked **3/3** in every verified TCS source. Opens every round. **Entirely under your control** — the only item on the whole plan that cannot be made harder by the interviewer |
| **N2** | **The project story with real numbers** | 1.0 | *"Explain your project"* is **3/3**, highest frequency in the evidence. And it is the only defence against the 60-second bluff test |
| **N3** | **RAG end-to-end, drawn** | 1.0 | Asked **3/3**. The spine of the technical round. Must be **drawable, not recitable** — they ask you to draw it |
| **N4** | **Evaluation: the RAG Triad + "measure retrieval and generation separately"** | 0.5 | **Going silent when asked how you'd evaluate is the single documented fatal no-hire signal.** Cheapest insurance on the list |
| **N5** | **The six HR numbers** (CTC, variable, notice, joining, expected range, location) | 0.5 | Costs almost nothing and an inconsistency across rounds kills a lateral offer outright. Not a study item — an admin item |

**Total never-drop: 4.0 hours.** Everything below is negotiable against these.

**Also never drop, though they cost zero study hours:**
- Confirming the **venue** in writing and screenshotting the map pin. Wrong campus ends the day.
- **Printing 6 CVs and packing the folder on Friday.** Not Saturday.
- **Sleeping on Friday night.** Rest without study beats study without rest, every time.

---

# PART 2 — THE DROP ORDER

Ranked **least costly to drop first**. Work down the list until you've freed the hours you lost.
Each entry states what you lose, so you can decide with your eyes open rather than by feel.

---

### ▼ D1 — Transformers depth · saves 0.3 h · *drop first, almost free*
**Block:** part of B3.4.
**Instead:** keep only the 60-second answer — self-attention lets every token attend to every other
in one hop; Q/K/V; positional encoding because attention is order-blind; **O(n²) in sequence length,
which is why long context is expensive.** Skip the Illustrated Transformer entirely.
**Cost:** you cannot go deeper if probed. **Acceptable** — transformers are Tier 2.4 with only one
weak TCS source, and the runsheet already caps this at 20 minutes with a hard "if you're 20 minutes
in, stop."

### ▼ D2 — Rapid-fire LangGraph section (B section of `RAPID_FIRE_LANGCHAIN_LANGGRAPH.md`) · saves 0.4 h
**Instead:** drill only B1, B4, B5, B7 — definition, reducers, the sequential clobber, checkpointer
vs Store. Skip B9-B24.
**Cost:** you lose the depth-of-second-question surface on streaming modes, `Command`, time travel,
durability modes. **Acceptable** — **LangGraph appears in ZERO of the three candidate reports.**
It is a hedge. Hedges get thinned first.

### ▼ D3 — LangGraph experiments 8, 9, 10 · saves 0.5 h
**Keep:** EXP 1, 2, 3, 4, 5, 6, 7.
**Cost:** you lose time travel, the mixed-edge money-burner, and `Send` fan-out.
**Acceptable** — EXP 1/2/3/4/6 carry the confirmed question-bank items. 8/9/10 are colour.

### ▼ D4 — System design set-piece, halved · saves 0.5 h
**Instead of the full hour:** memorise the **napkin math** (200M chunks, ~800 GB) and the
**time-to-first-token reframe**, and skip drawing the full latency table twice.
**Cost:** a design question becomes shakier past the first two minutes.
**Tolerable** — a design round is not confirmed in any TCS source; it is inferred from market canon.
**Do not drop it entirely** — those two sentences are the highest-value lines in the whole document
and they take ten minutes to hold.

### ▼ D5 — Python fundamentals block, halved (1.5 h → 0.75 h) · saves 0.75 h
**Keep:** the "second largest without built-ins" problem **written by hand**, plus the **five test
cases**. Drop the written treatment of decorators/GIL/OOP and just *say* those answers aloud once.
**Cost:** if they ask you to write a decorator by hand you'll be slower.
**Tolerable** — the source (S3) asked for second-largest specifically, and *the test cases are the
graded part.* Keep the graded part.
**Do not cut the handwriting.** An offline drive may have no laptop, and writing code by hand once
removes a real source of freeze.

### ▼ D6 — Rapid-fire RAG/LLM full pass · saves 0.75 h
**Instead:** drill only the five flagged in `research/RAPID_FIRE_RAG_LLM.md` §D — Q10 (FT vs RAG),
Q33 (10M design), Q27 (evaluation), Q18 (bi- vs cross-encoder), Q8 (hallucination mechanism).
**Cost:** less fluency on the long tail (HyDE, CRAG, GraphRAG, MMR, quantization).
**Tolerable** — those are Tier 3, market canon, low TCS evidence.

### ▼ D7 — MR scenario scripts, 5 → 3 · saves 0.5 h
**Keep:** deadline-vs-quality, the technical disagreement, and the mistake. Drop ambiguous-spec and
last-minute-change as *separate rehearsals* — they reuse the same three STAR stories anyway.
**Cost:** slightly less polish on two scenarios.
**Tolerable** — MR is documented as rarely eliminating on its own; it is a fit check you lose by
being defensive, not one you win by being polished.

### ▼ D8 — Mock #1 (Jul 30 TR mock) · saves 1.25 h
**Cost:** you get **one** mock instead of two, so you lose the two-list comparison that identifies
your genuinely persistent gaps.
**Real cost, and this is where it starts hurting.** Only drop this if you're behind by more than
three hours.
**Never drop Mock #2 (Jul 31).** If you can only run one, run the Friday one — it is the closest
simulation to the actual day and it feeds the revision card.

### ▼ D9 — Project build hours P4 (hardening) and P3 (orchestration) · saves up to 4.5 h
**This is the biggest single lever and the most painful.** Cut in this order:
1. **P4 hardening** (2.25 h) → you lose the abstention path and the "one thing that broke" answer.
   **Mitigate:** you almost certainly hit *something* during P1/P2 — write that down instead.
2. **P3 orchestration** (2.25 h) → the project becomes a retrieval pipeline rather than an agent.
   **Mitigate:** this is genuinely survivable, and the honest framing is a **hire signal**:
   *"I used a deterministic two-step pipeline because the control flow was fixed. I'd reach for
   LangGraph the moment I needed persistence, an approval step, or replay."*
**What you must protect inside the build:** **P1** (something answers a question), **P2** (real
chunking numbers), **P5** (the diagram you can redraw), and **P6** (the golden set).

### ▼ D10 — **NEVER CUT: P6, the evaluation harness + golden set** 🔴
Listed here only to say explicitly: **if you are choosing between another build feature and the
golden set, the golden set wins every time.**
Evidence: `GENAI_INTERVIEW_REALITY.md` §4 — *"a demo builder will name precision and recall and
stop; a real RAG engineer will name golden-set construction and chunking ablations."* Nobody else
walking into that room on Saturday will have hand-built one this week. **If P6 must shrink, shrink
it to 20 questions and one ablation — but do not delete it.**

---

# PART 3 — PRE-DECIDED SCENARIOS

Find the row that matches what happened. Do exactly that. Do not improvise.

### 😷 "I lost the evening — about 3 hours gone."
Drop **D1 + D2 + D3 + D4 + D5** = 2.45 h, plus trim the Rapid-fire RAG/LLM pass (D6) = 3.2 h.
**Nothing structural changes.** The project, the mocks, and all five never-drops survive intact.
**Say nothing to yourself about being behind. You aren't.**

### 🤒 "I lost a whole day — 10 hours gone."
1. Everything in the 3-hour scenario (**D1-D6**) = 3.2 h
2. Drop **Mock #1** (D8) = 1.25 h
3. Drop **P4 hardening** (D9.1) = 2.25 h
4. Drop **P3 orchestration** (D9.2) = 2.25 h
5. Trim **MR scenarios to 3** (D7) = 0.5 h
**= 9.45 h freed.**
**What survives:** the pitch, the band answer, a working project with real numbers and a golden
set, RAG drawn, evaluation, LangChain's four primitives, the four LangGraph experiments, Python by
hand, Mock #2, the revision card, and the whole logistics track.
**That is still a strong candidate.** Say the honest thing in the room: *"I built a retrieval
pipeline rather than an agent because the control flow was fixed."* It reads as judgment.

### 🔥 "The project build has stalled — dependencies, API keys, something won't run."
**Give it 45 minutes, then stop.** Do not spend Wednesday debugging an environment.
**Fallback in priority order:**
1. Strip to the simplest thing that runs end-to-end. Local embeddings, a flat index, 50 documents,
   no framework. **Something that answers a question beats an elegant thing that doesn't.**
2. If even that fails, **reallocate P3/P4 to the LangGraph experiments and the golden set built by
   hand over a corpus you can grep**, and lean the project story on **S8 in `STAR_STORIES.md`** —
   the multi-agent orchestration system you already built, which is real, yours, and has genuine
   failure modes you can describe (context dilution, silent drift, retrieval noise, cold-start cost).
3. **Be honest in the room about what's a week old versus what's a year old.** Interviewers respect
   *"this one's my own, built outside work"* far more than a vague implication.

### 😵 "It's Thursday night and I feel like I know nothing."
This is normal and it is not information. Four days of intake always feels like this on day three,
because recognition arrives before recall does.
**Do not add hours. Do exactly this instead:**
1. Run the four LangGraph experiments and narrate them. (10 min — this always works and it proves
   to you that you do know things.)
2. Draw the RAG pipeline cold. (5 min)
3. Say the pitch once. (2 min)
4. **Go to sleep.** Fatigue is producing the feeling; a plan change won't fix fatigue.

### ⏰ "It's Friday and I'm behind on the recall sweep."
**Cut in this order:** the fix-list block (B4.5) → the second half of the revision card (items 9-13)
→ B4.8's final spoken pass. **Never cut B4.6's items 1-8** (pitch, band answer, project numbers, RAG
flow, triad, Ragas, chunking numbers, contextual retrieval numbers) or **B4.7 logistics**.
**Still stop at 17:45.** Trading sleep for a card is a losing trade.

---

# PART 4 — WHAT I DELIBERATELY DID *NOT* ADD WHEN THE BUDGET DOUBLED

The budget went 21 h → 38 h. The temptation was to add topics. **I refused, and here is the list,
so the refusal is auditable rather than an oversight.**

| Not added | Hrs it would have cost | Why refused |
|---|---|---|
| `rag-from-scratch` notebooks 1-4 | 1.5 | Needs an embedding API key, and **the project build does the same job with ownership.** Running someone else's notebook teaches less than breaking your own pipeline |
| DeepLearning.AI short courses (Advanced RAG, Vector DBs, Fine-tuning) | 2-4 each | Multi-hour video. One hour of DL.AI ≈ one hour of building, and building suits how you learn. Wrong instrument for 4 days |
| Karpathy's tokenizer video | 2.2 | Best-in-class, wrong time budget. Bookmark for August |
| LangChain Academy — Intro to LangGraph | 5-6 | Far too long, and LangGraph is a **hedge** (0/3 in candidate reports), not a headline |
| Papers: HyDE, CRAG, Self-RAG, HNSW, RAGAS | 1.0 | The rapid-fire cards already carry the one-line answer each. Reading the abstracts adds recall risk, not recall |
| GraphRAG docs, LlamaIndex Workflows | 0.6 | One sentence each is the correct depth. Tier 3, no TCS evidence |
| OWASP LLM Top 10, full read | 0.5 | Skim the ten titles; expand LLM01/05/06/08 only. Already in `GENAI_SYSTEM_DESIGN.md` §2 |
| Eugene Yan's LLM patterns (66 min) | 1.1 | Best single map of the space, too expensive here. Caching + Guardrails sections only, if at all |
| LeetCode / DSA practice | any | **Zero TCS evidence for a GenAI lateral.** S3's coding question was "second largest without built-ins." That is Tier 1.5, and it's already in the plan |
| RLHF internals, diffusion, GANs, transformer math | any | **Zero evidence, high time cost.** Explicitly excluded by `GENAI_INTERVIEW_REALITY.md` §6 |

**Where the 17 extra hours actually went:** 14 h into the project build (which serves the **3/3
highest-frequency question** and produces the real numbers that defeat the bluff test), and ~3 h into
**more touches on existing material** — a second mock, deeper recall sweeps, and the evaluation
harness.

**The principle, stated plainly:** in a four-day container, **a third touch on a known topic beats a
first touch on a new one.** A topic touched once is a topic you will fumble under pressure, and a
fumbled answer costs more than a missing one — because "I haven't used that, here's how I'd reason
about it" is a *good* answer, and a half-remembered one is not.

---

# PART 5 — THE ONE-LINE VERSION

**If you are lost, tired, and it's late: do N1 through N5 (4 hours), sleep, and walk in.**

That is a real candidate with a real project, a defensible experience narrative, a drawable RAG
pipeline, an evaluation answer, and consistent numbers. Everything above N5 is upside.
**None of it is the difference between an offer and no offer. Sleep is closer to being that.**

---
*Companion to: `SPRINT_RUNSHEET_V2.md` · `MOCK_INTERVIEW_QUESTIONS.md` · `DAY_BEFORE_CHECKLIST.md`*
*Evidence: `research/GENAI_INTERVIEW_REALITY.md` (frequency tiers) · `research/TCS_ROUND_STRUCTURE.md`*
