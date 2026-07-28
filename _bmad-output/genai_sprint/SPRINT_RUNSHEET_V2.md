# GEN AI SPRINT RUNSHEET **V2** — 38 HOURS TO TCS

**Interview:** Sat 01 Aug 2026 · 9:00 AM · TCS Pune · **OFFLINE** · Gen AI Engineer · band 4-10 YOE
**JD verbatim:** GenAI, AIML, LLM Modules, LangChain, LangGraph
**Written:** Tue 28 Jul 2026, 11:30 IST · **Budget: 38.0 hours, hard container**
**Supersedes:** `SPRINT_RUNSHEET_4DAY.md` (the 21-hour version, written when there was a day job).

> **What changed since V1.** (1) The budget **doubled** — full-time availability. (2) A **project
> build is now in scope**, 12-16 h, designed in parallel by `project-architect` at
> `project/` (it is already on disk — see below). That reorders everything, because
> *"explain your project"* is the **3/3 highest-frequency question** in the verified TCS evidence
> and it opens every round.

---

## ⚠️ FOUR HONEST STATEMENTS — read once

**1. Four days does not buy deep retention. It buys recognition plus fluent articulation.**
The spacing science this system runs on (SM2 at +1/+3/+7/+16 days) needs weeks; you have days. This
plan does **not** pretend to install long-term memory. It targets what actually decides a 45-minute
round: *can you recognise the question and say a correct, specific, structured answer out loud
without stalling.* Every topic gets **two touches minimum** — learn, then cold recall on a later day.
Two touches is thin. It is also the honest maximum this container holds, and it is the difference
between "I read about that" and "I can say that." **Jul 31 is recall only, zero new intake.**

**2. Doubling the hours does not double the retention. It buys a built artifact.** 38 h is not
"twice the material" — it is V1's interview-critical surface plus **14 h building a thing you will be
asked about in the first 90 seconds of every round.** More *topics* would have bought one touch each,
which is close to untaught. `CUT_LIST.md` Part 4 lists everything I refused to add, and why.

**3. You are not starting from zero.** You already do prompt engineering and agent orchestration in
real work (`STAR_STORIES.md` S7, S8). Your gap is *framework vocabulary* and *articulation under
pressure*, not concepts — so ~26 of these hours are **building, running, breaking and speaking**, and
only ~12 are reading.

**4. Most likely a services-firm generalist panel, and that favours you.** Per
`research/TCS_ROUND_STRUCTURE.md`, the TR panel at a services drive is often a generalist with a
GenAI checklist. Breadth plus clear explanation beats research depth.

> **Anti-panic clause.** If a day collapses, **do not improvise a recovery.** Open `CUT_LIST.md`.
> The drop order is already decided, ranked, and defended. You will still walk in employable.

---

## ⚠️ TWO THINGS THAT OVERRIDE THIS ENTIRE FILE

1. **Re-read the actual TCS invite email — first ten minutes, before B1.0.** Venue, gate, reporting
   time, EP/reference number, documents, pre-registration link. Sahyadri Park (Hinjewadi Ph 3) and
   Commerzone (Yerwada) are ~20 km apart; wrong campus ends the day. Then work the 7-item list at the
   top of `INTERVIEW_DAY_LOGISTICS.md` and **message Covenant today** — you wanted it in writing by
   Wednesday and it is now Tuesday.
2. **The SQL track is SUSPENDED until Aug 2.** `SQL_10DAY_DAILY_RUNSHEET.md` and `PROGRESS_TRACKER.md`
   both schedule work on Jul 28 – Aug 1 and collide with this sprint. Fixed external date beats
   internal gate. **This file is the only authority for Jul 28 – Aug 1.** Cost, stated honestly: ~6
   days of SQL spacing lost, window functions decayed; budget one extra re-learn day on Aug 2.

---

## THE BUDGET — where 38 hours goes

Weighting derives from `research/GENAI_INTERVIEW_REALITY.md` (three fetched first-person TCS
reports, S1/S2/S3, with **S2 at your exact 2-3 YOE band**).

| Block | Hrs | Evidence / why this weight |
|---|---|---|
| **Project build** | **14.0** | *"Explain your project"* is **3/3**, highest frequency, opens every round. Also the only way to survive the 60-second bluff test |
| Pitch · band answer · STAR · MR · HR | 4.0 | Tier 1.1, **3/3**. Fully under your control |
| RAG: pipeline, chunking, vector DBs, indexing | 3.0 | Tier 1.2/1.3/1.8, **3/3**. The spine of the TR |
| Evaluation (RAG triad, Ragas, judge failures) | 1.5 | Tier 1.6, **2/3**, and the **#1 hire/no-hire separator** |
| LangChain (four primitives, v1, comparison) | 2.0 | Tier 1.4, **3/3**, JD-named |
| LangGraph (10 experiments + vocabulary) | 2.0 | JD-named but **0/3 in candidate reports** — a hedge, not a headline. Capped deliberately |
| LLM fundamentals (FT-vs-RAG, decoding, hallucination, embeddings) | 1.5 | Tier 1.7/1.9/1.10 — screening filters. Cheap to hold, disqualifying to miss |
| Python fundamentals, **by hand** | 1.5 | Tier 1.5, **2/3**. Offline drive → likely paper/whiteboard |
| System design (10M docs, sub-2s) · logistics + documents | 2.0 | The recurring set-piece; logistics on Jul 31 |
| Recall sweeps · 2 mocks · revision card | 5.5 | Jul 31 is almost entirely this |
| **Total** | **38.0** | |

**Interleave rule, enforced below:** no project block exceeds 2.5 h, and **every project block is
bracketed by study blocks whose content that build exercises** — you build the retriever in the
afternoon and speak the chunking numbers that evening. Do not silo them; the interleaving is why
this holds in 4 days.

**Front-loaded by probability.** Today and Jul 29 carry the highest-likelihood material, so a lost
day is lost from the *cheapest* end.

**SETUP (once, 5 min):** `cd` to the sprint dir · `source .venv/bin/activate.fish` ·
`python -c "import langgraph; print(langgraph.__version__)"`. If it fails, recreate the venv and
`pip install langgraph`. **None of the 11 scripts in `research/experiments/` call an LLM — no API key
needed.** Verified on `langgraph 1.2.9` / `langchain-core 1.5.1`; if version drift changes an output,
**that is itself a finding** — note it, version awareness reads as experience.

---

## ⚙️ THE PROJECT — `permrag`, already on disk

`project-architect` has built a **permission-aware RAG** at `project/`. `BUILD_PLAN.md` will land
there and is the authority on *what* to build per block; **this file stays the authority on *when*
and *how long*.** Already on disk: `corpus/` (16 enterprise docs — HR, finance, engineering, security,
legal) · `permrag/` (chunking · embedding · index · retrieve · generate · chain · **graph** ·
**principals** · **evaluate**) · `data/golden.jsonl` (**40 hand-built questions** tagged with
`principal`, `expected_docs`, `expect_abstain`) · **and your real numbers, already measured** in
`index/manifest.json`: 16 docs → **80 chunks** · **200-token chunks, 30 overlap** ·
`snowflake-arctic-embed-xs`, **384 dims, normalised** · embed 0.86 s, **93 chunks/sec**.

**Why this is the right project:** it puts **pre-retrieval ACL filtering** at the centre — Tier 2.3
in the evidence, TCS's entire business shape, and **your home turf**. The `principals.py` model
(clearance lattice **AND** role gate) is the same permission architecture you shipped on IAM across
five personas. That bridge is your strongest differentiator, and now you can demo it rather than
assert it.

| Block | When | Hrs | Standing objective (BUILD_PLAN overrides specifics) |
|---|---|---|---|
| **P1** | Jul 28 aft | 2.5 | Run it end-to-end yourself. Understand every module. Break the ACL filter deliberately |
| **P2** | Jul 28 eve | 2.0 | Retrieval quality: chunk-size ablation, hybrid or rerank. **Record the delta** |
| **P3** | Jul 29 morn | 2.25 | The orchestration layer — `graph.py` / `chain.py`. Know which is which and why |
| **P4** | Jul 29 aft | 2.25 | Hardening: abstention, citations, the guardrail, a timeout path |
| **P5** | Jul 30 morn | 2.0 | **FEATURE FREEZE.** README + a diagram you can redraw from memory |
| **P6** | Jul 30 aft | 2.0 | **Evaluation harness against the 40-question golden set + one ablation** |
| **P7** | Jul 31 morn | 1.0 | **No code.** Rehearse the demo narrative ×3, timed |

**The non-negotiable output is not the code — it is a page of REAL NUMBERS.** Per
`GENAI_INTERVIEW_REALITY.md` §4, *"what chunk size did you actually run, and why that number?"*
cannot be survived with invented specifics and cannot be failed if the numbers are true. **You
already have five.** Add Recall@5, latency, and the ablation delta. Write them down as you go.

---

# ▸ DAY 1 — Tue 28 Jul · 12:00 → 23:05 · **9.8 h**
### *Two spines today: the project, and RAG. Both asked 3/3.*

**B1.0 · 12:00–12:20 (0.33) — Invite email, Covenant message, setup**
Re-read the TCS email. Send the 7 questions from `INTERVIEW_DAY_LOGISTICS.md`. Run setup.
→ **Deliverable:** venue + time + EP number screenshotted; venv confirmed.
→ **Trap:** this is the one block that can end Saturday regardless of preparation. Do it first.

**B1.1 · 12:20–13:20 (1.0) — 🎤 The pitch and the band answer, written verbatim**
*Refs: `TCS_MANAGERIAL_HR.md` §1 · `EXPERIENCE_GAP_NARRATIVE.md`*
Write the ~85-second opening **longhand, in your own words** — do not copy the file. Then the band
answer. Say **each aloud five times**, timing the pitch.
→ **Deliverable:** both on one page; pitch lands **80-95 seconds**.
→ **Traps:** *"just under three years, two full-time"* — **never round up.** TCS verifies against
payslips and Form 16; one inflated number kills the offer after you've resigned. And don't apologise
or oversell — both are documented no-hire tells.

**B1.2 · 13:20–14:20 (1.0) — ✏️ RAG pipeline, drawn not recited**
*Ref: `research/RAG_DEEP.md` §1, §2, §10*
Draw the two-lane pipeline on **paper three times**; third with the file closed. Read §10's
45-second answer aloud twice, then say it in your own words.
→ **Deliverable:** full pipeline drawn cold in **under 90 seconds**, two lanes named — *offline*
(parse → chunk → enrich → embed → index) vs *online* (rewrite → retrieve → fuse → rerank → assemble
→ generate → cite).
→ **Trap:** the evidence says they ask you to **draw** it. Recite-only gets caught the moment they
ask "where does the reranker sit?"

**🍽 14:20–14:50 — break. Eat. The afternoon is a build block.**

**B1.3 · 14:50–17:20 (2.5) — 🔨 PROJECT **P1** — run it, then break it**
Run the pipeline end-to-end. Read every module. Then **deliberately break the ACL filter** — flip it
to post-filtering and watch what leaks; run a query as a principal who shouldn't see the answer.
→ **Deliverable:** you can explain `principals.py` unprompted — *"two-dimensional: a clearance
lattice AND a role gate, both stored on the chunk at ingest, so the check is a cheap boolean over
metadata already sitting next to the vectors."* Plus what post-filtering broke.
→ **Trap:** don't gold-plate. The interview asks about **decisions and failures**, not code quality.

**B1.4 · 17:20–18:05 (0.75) — LangGraph: the four experiments that matter**
*Ref: `research/BREAKABLE_EXPERIMENTS.md` EXP 1, 1b, 2, 3, 3b, 4*
Run, in `research/experiments/`: `exp1_parallel_no_reducer` (→ `InvalidUpdateError`) ·
`exp1b_reducer_fix` (→ `['A','B']`) · `exp2_silent_clobber` (→ `'web result'` **silently gone**) ·
`exp3_no_checkpointer` (→ "I have seen 1 msgs" twice) · `exp3b_with_checkpointer` (→ "3 msgs", t2
isolated).
Read each traceback before fixing. Say each one-liner out loud, then the pair-up sentence: *"EXP 1
fails loudly because both writes land in the same super-step. EXP 2 is the same missing reducer
across two super-steps, so it isn't an error — it's silent data loss. That's the one that reaches
production."* Then draw the checkpointer-vs-Store table from memory.
→ **Deliverable:** four one-liners cold; the Store example memorised — *"the checkpointer is why the
bot remembers you said 'my name is Devang' three messages ago in **this** chat; the Store is why it
still knows tomorrow in a **brand new** chat."*
→ **Trap:** most candidates say "the second write overwrites" or "it's a race." **Both wrong.** It
raises. The unit is **one write per super-step** — say "super-step" out loud; it is the single word
that marks you as a user rather than a tutorial-watcher.
→ **Trap 2:** *"so the checkpointer is your memory system?"* — **say no.** Short-term, within-thread
only. Then volunteer the Store. That correction *is* the answer.

**B1.5 · 18:05–18:50 (0.75) — ⭐ Evaluation: the #1 hire/no-hire separator**
*Refs: `RAG_DEEP.md` §7 · hamel.dev/blog/posts/evals/ · docs.ragas.io/en/stable/concepts/metrics/available_metrics/*
Learn the **RAG Triad** (context relevance / faithfulness / answer relevance) and the four **Ragas**
metrics. Then write the L1 assertions **for `permrag`** — not a hypothetical.
→ **Deliverable:** 4-6 written L1 assertions (cites ≥1 source; never returns a chunk the principal
can't see; abstains below threshold; valid JSON; <400 tokens). Plus: *"faithfulness and context
recall together tell me whether a wrong answer was a retrieval failure or a generation failure."*
→ **Trap:** **going silent when asked how you'd evaluate is the single fatal no-hire signal.**
Volunteering measurement *unprompted* is the strongest single move available all day.

**🍽 18:50–19:35 — dinner.**

**B1.6 · 19:35–21:35 (2.0) — 🔨 PROJECT **P2** — retrieval quality**
Chunk-size ablation (you're at 200/30 — try 100 and 400), then hybrid or reranking. **One variable
at a time; record the number each time.**
→ **Deliverable:** a table in your build notes: chunk size → Recall@5. At minimum one before/after
pair you can quote out loud.
→ **Trap:** resist adding features. The next block gives you published numbers to compare yours
against, and that comparison is worth more than another feature.

**B1.7 · 21:35–22:35 (1.0) — Chunking, with the evidence**
*URLs: anthropic.com/news/contextual-retrieval · trychroma.com/research/evaluating-chunking*
*Deliberately read **after** P2, so the numbers land on top of an experience.*
→ **A:** three numbers — contextual embeddings **35%** fewer retrieval failures; **+BM25 → 49%**;
**+reranking → 67%**.
→ **B:** *"the popular default of 800 tokens with 400 overlap was among the worst performers in
Chroma's evaluation; ~200 recursive is the reliable baseline."* Strategies differ by up to **9%** in
recall. **You are already at 200 — say that you chose it from this evidence, then ablated it.**
→ **C:** compare your own P2 numbers to theirs, out loud, in one sentence.
→ **Trap:** answering "well, it depends on the content" is the losing answer. Cite the evidence,
then cite yourself.

**B1.8 · 22:35–23:05 (0.5) — Cold recall + log**
No notes: RAG pipeline drawn · the 4 LangGraph one-liners · the RAG triad · the 3 contextual-retrieval
numbers · the pitch once, timed. Write today's real project numbers on the build-notes page.

---

# ▸ DAY 2 — Wed 29 Jul · 09:00 → 21:20 · **10.1 h**
### *The JD-named frameworks, the agent layer, and Python on paper.*

**B2.1 · 09:00–09:30 (0.5) — 🔁 COLD RECALL (touch 2)**
No notes, out loud: 1) draw the RAG pipeline in 90 s — where does the reranker sit and why?
2) parallel un-reduced write — what happens **exactly**? 3) *sequential* un-reduced write — what
happens **exactly**? 4) checkpointer vs Store in one sentence with the example. 5) the RAG triad and
what each edge diagnoses.
→ **If you stall:** that is the forgetting curve behaving normally, not failure. Re-run the script
(60 s) and move on. Catching it today is exactly why this rep exists.

**B2.2 · 09:30–10:45 (1.25) — ⭐ LangChain: the four primitives + the v1 story**
*Ref: `research/LANGCHAIN_DEEP.md` §1, §2, §5, §6, comparison section*
→ **A — the four primitives, cold:** **Chains** (LCEL composition) · **Tools** (functions the LLM
may call) · **Agents** (LLM decides which tool and when to stop) · **Memory** (conversation state).
Plus retrievers and output parsers. *Asked 3/3.*
→ **B — the v1 paragraph, rehearsed:** chains and memory moved to `langchain-classic`; v1 collapsed
to **one** abstraction, `create_agent`, which **returns a compiled LangGraph graph**; "memory" is now
a checkpointer + a Store.
→ **C — the 40-second three-framework answer**, spoken twice. Lead with *"they're not three of the
same thing"* — component layer / orchestration runtime / data framework.
→ **Traps:** saying *"I'd use `LLMChain` with `ConversationBufferMemory` and an `AgentExecutor`"*
tells them you learned LangChain from 2023 blog posts — Deliverable B is probably the
highest-scoring thing you can say here. And do **not** claim LCEL is deprecated: it isn't, it's
narrowed, and the nuance is the point.

**B2.3 · 10:45–13:00 (2.25) — 🔨 PROJECT **P3** — the orchestration layer**
Work `graph.py` and `chain.py`. This is where the morning's vocabulary becomes something your hands
have done.
→ **Deliverable:** for your own project, name which primitive each piece is — this is a tool, this
is the state, this is the reducer, this is why there is (or isn't) a checkpointer here.
→ **Trap:** per `LANGGRAPH_DEEP.md` §13, **arguing against an agent for a simple task is a documented
HIRE signal.** Don't add a cycle to look impressive. Be able to say: *"the graph is there because I
need an abstention branch and a re-query path; the plain chain is the fallback when control flow is
fixed."* That scores higher than a gratuitous graph.

**🍽 13:00–13:45 — lunch.**

**B2.4 · 13:45–15:00 (1.25) — LangGraph experiments 5-10 + the seven words**
*Refs: `BREAKABLE_EXPERIMENTS.md` EXP 5-10 · `LANGGRAPH_DEEP.md` §1, §5, §8*
- **EXP 5** runaway cycle → `GraphRecursionError`. Say it carefully: *"classically 25 from
  langchain-core; LangGraph 1.x sets its own and raised it substantially — I'd check for my version."*
  **Precision plus version-awareness reads as experience; a confidently wrong number reads as memorised.**
- **EXP 6** interrupt re-runs the node **from the top** → side effect fires **twice** for one
  approval. *The bug that double-charges customers.* **Volunteer unprompted.**
- **EXP 7** interrupt without checkpointer → *pause* works, *resume* raises. A one-way door.
- **EXP 8** time travel — `get_state_history`, `next`, fork via `update_state`. Newest-first;
  `invoke(None, cfg)` = "resume, don't add input."
- **EXP 9** leftover `add_edge` beside a conditional edge → **both fire.** Not an error, just double spend.
- **EXP 10** `Send` fan-out. **EXP 10 is EXP 1 at scale** — delete the reducer and you get
  `InvalidUpdateError` with N writers.
→ **Deliverable: the seven words cold, under 20 seconds** — StateGraph · node · edge · conditional
edge · reducer · checkpointer · thread_id. Plus: *"LangChain chains are one-pass DAGs; LangGraph is
a state machine that supports **cycles**, so an agent can loop."*
→ **⚠️ Time discipline:** LangGraph is **JD-named but 0/3 in candidate reports.** A hedge, not a
headline. **If this runs past 15:00, stop.** Never trade RAG or evaluation hours for more LangGraph.

**B2.5 · 15:00–15:45 (0.75) — 🗣 Rapid-fire: LangChain & LangGraph**
*Ref: `RAPID_FIRE_LANGCHAIN_LANGGRAPH.md` — 32 Q&A, built today*
Cover the answer, say yours **out loud and timed**. Target **20-40 s**. Past 45 s you're lecturing;
under 15 s you sounded thin. Mark every fumble with a dot.

**☕ 15:45–16:00 — break.**

**B2.6 · 16:00–18:15 (2.25) — 🔨 PROJECT **P4** — hardening**
Failure paths. Abstention when top score is below threshold. Citations. One guardrail. A timeout
with graceful degradation on an optional stage.
→ **Deliverable:** you can name **one thing that broke** and how you diagnosed it. Per
`GENAI_INTERVIEW_REALITY.md` §4, *"cannot name a single thing that broke"* is an explicit NO-HIRE
signal. This block earns that answer.
→ **Trap:** *"a wrong answer given confidently is worse than no answer"* is a documented HIRE signal.
Your golden set already has `expect_abstain` rows — build the path so you can say it as something you
**did**, not something you'd do.

**🍽 18:15–19:00 — dinner.**

**B2.7 · 19:00–20:30 (1.5) — ✍️ Python fundamentals, written by hand on paper**
*Ref: `GENAI_INTERVIEW_REALITY.md` §1.5 (Tier 1, asked 2/3)*
**On paper, no editor:** decorators · list comprehensions · threading vs multiprocessing (GIL) ·
inheritance/polymorphism · `classmethod` vs `staticmethod` · tuples vs lists (and *why* immutability
makes tuples hashable → dict keys).
**Then, by hand, verbatim from source S3:** *"find the second largest number in a list without using
built-in functions — and provide test cases."*
→ **Deliverable:** the function plus **five written test cases**: empty · single element · all
duplicates · exactly two · negatives. Then run it and see which of your five your handwritten version
actually fails.
→ **Traps:** **the test cases are the actual question** — the algorithm is trivial; they're checking
whether you think about boundaries unprompted. And an offline drive may have **no laptop**, so
handwriting code once now removes a real source of freeze.

**B2.8 · 20:30–21:00 (0.5) — 🔁 Pitch rep 2 + project story v1**
Pitch ×3 timed. Band answer ×2. Then the new one: a **90-second project walkthrough** — problem →
architecture → one decision with a tradeoff → one thing that broke → how you'd measure it. Say it twice.

**B2.9 · 21:00–21:20 (0.33) — Log + seed the revision card**
Add: contextual-retrieval numbers, Chroma numbers, RAG triad, LangGraph seven words, **your project
numbers so far**.

---

# ▸ DAY 3 — Thu 30 Jul · 09:00 → 21:00 · **10.25 h**
### *Freeze the build. Add the set-pieces. First full mock.*

**B3.1 · 09:00–09:30 (0.5) — 🔁 COLD RECALL (touch 3)**
Cold: the four LangChain primitives · the v1 paragraph · the LangGraph seven words · EXP 5/6/9
one-liners · checkpointer-vs-Store redrawn · the 40-second three-framework comparison.

**B3.2 · 09:30–11:30 (2.0) — 🔨 PROJECT **P5** — FEATURE FREEZE**
Stop adding. Write the README, draw the architecture.
→ **Deliverable:** a diagram you can **redraw on a whiteboard from memory in 90 seconds**, and a
README stating three decisions and what each cost.
→ **Trap:** the day-3 temptation is one more feature. Resist. **Anything not done by 11:30 is cut** —
and saying so in the interview is scope discipline, a legitimate senior answer.

**B3.3 · 11:30–12:30 (1.0) — Fine-tune vs RAG vs prompting · decoding · hallucination**
*Ref: `research/LLM_FUNDAMENTALS.md` §1, §5, §7*
→ **A — the decision ladder:** the one-sentence taxonomy **first** (prompt = how it uses what it
knows; RAG = what it knows at inference; fine-tune = what it *is*), then *"knowledge gap or behaviour
gap?"*, then the escalation order — **cheapest and most reversible first**. Close with the two
enterprise clinchers: **RAG gives citations and per-user access control; fine-tuning gives neither.**
→ **B — decoding:** temperature **divides the logits before softmax** — it *reshapes*, it does not
truncate. Top-k truncates to k; top-p to the smallest set summing to p, so it **adapts**.
→ **C — hallucination as mechanism:** the objective maximises plausibility, never truth, and there is
**no abstain state**. Ladder: ground → give it an exit → constrain output → verify → abstain.
→ **Traps:** decoding was asked of **S2, your exact band** — a screening filter, right earns nothing
and wrong is disqualifying. And answering hallucination with a *definition* is the junior answer.

**B3.4 · 12:30–13:00 (0.5) — Embeddings, similarity, transformers **SKIM ONLY****
*Refs: `LLM_FUNDAMENTALS.md` §3, §4, §6 · jalammar.github.io/illustrated-transformer/*
→ **A:** *dot product is unnormalised so it rewards longer vectors; cosine is dot product on unit
vectors; **if embeddings are already L2-normalised the two rank identically.*** (Yours **are** —
`normalize: true` in the manifest. Say that.) Plus **lost in the middle** (Liu et al., arxiv
2307.03172) → strongest chunk first.
→ **B:** a confident **60-second** transformer answer. Every token attends to every other in one hop;
Q/K/V; positional encoding because attention is order-blind; **O(n²) — which is *why* long context is
expensive.**
→ **Traps:** the normalised-vectors clause is the designated *"does he know or did he memorise"*
probe. And transformers are Tier 2 — **if you're 20 minutes in, stop.**

**🍽 13:00–13:45 — lunch.**

**B3.5 · 13:45–15:45 (2.0) — 🔨⭐ PROJECT **P6** — EVALUATION HARNESS**
**The highest-value two hours in the sprint.**
Run `evaluate.py` against the **40-question golden set**. Measure Recall@5, abstention precision on
the `expect_abstain` rows, and a faithfulness spot-check on 10 answers. Then **one ablation** — chunk
size or k — re-run, quote the delta.
→ **Deliverable:** *"Recall@5 was X on a 40-question golden set with per-principal expected sources;
the abstain rows caught Y; changing chunk size from 200 to 400 moved recall by Z."*
→ **Trap:** `GENAI_INTERVIEW_REALITY.md` §4 — *"a demo builder will name precision and recall and
stop; a real RAG engineer will name golden-set construction and chunking ablations."* **This block is
that sentence, executed.** Nobody else in that room on Saturday will have done it this week.

**B3.6 · 15:45–16:45 (1.0) — SYSTEM DESIGN: 10M documents, sub-2s**
*Ref: `research/GENAI_SYSTEM_DESIGN.md` §1, §7*
Universal opening (clarify scale → latency → quality bar → constraints, **state assumptions aloud**),
then napkin math, then the latency table, then architecture. **Rehearse twice; second time closed-book.**
→ **A — napkin math aloud:** 10M docs × ~20 chunks = **~200M chunks**; 1024 dims × 4 bytes =
**~800 GB** plus graph overhead. *"That doesn't fit in one machine's RAM, so the architecture is
decided by that number, not by preference."*
→ **B — the reframe, the highest-value sentence available to you:** *"Sub-2-seconds is only
achievable if latency means **time-to-first-token with streaming**, not full completion. Generation
owns ~70% of the budget — optimising retrieval past a point is optimising the wrong term."*
→ **C:** two of the six senior sentences from §7, verbatim.
→ **Trap:** **never start drawing.** Sixty seconds of clarifying questions is graded and buys thinking
time. *"Is that p50 or p99, and time-to-first-token or full completion?"* **is** the seniority signal.

**☕ 16:45–17:00 — break.**

**B3.7 · 17:00–18:00 (1.0) — STAR stories + MR scenarios**
*Refs: `STAR_STORIES.md` · `TCS_MANAGERIAL_HR.md` §2*
Three stories, each aloud ×2 at ~2 minutes: (1) shipped end-to-end → **S2 Offline-First Sync** or
**S1 Campaigns**; (2) broke in production → **S2's idempotency answer**; (3) a defensible trade-off →
**S5 IAM Permissions** (which now also bridges straight into `permrag`). Then five MR scenarios:
deadline vs quality · teammate conflict · late requirement change · ambiguous spec · a mistake.
→ **Traps:** **MR is not non-technical** — S1 shows LangChain, eval metrics and FT-vs-RAG asked *in
MR*. And obey the NUMBERS RULE: only the eight evidence-backed figures are speakable (601 items ·
474+ WMS · 3 domains · 4+ apps · 5 personas · 1yr+ Campaigns life · 9.3 CGPA · 2 papers).

**B3.8 · 18:00–18:30 (0.5) — 💰 HR numbers, nailed down**
Current CTC (fixed + variable + bonus) · **exact contractual notice period** · earliest joining ·
expected range (anchor **18**, defensible **16-18** fixed, soft floor ~14) · location (**yes, with a
preference** — flat "Pune only" is a documented rejection trigger).
→ ⚠️ **Two items only you can close: your exact notice period and your current fixed CTC + variable
+ bonus. The salary script does not work until both are real. Close them today, not Friday.**

**🍽 18:30–19:15 — dinner.**

**B3.9 · 19:15–20:30 (1.25) — 🎤 FULL MOCK #1 — the TR, out loud, timed**
`MOCK_INTERVIEW_QUESTIONS.md` **Part 1 only**, in order.
→ **Trap:** **standing up and speaking**, not reading silently. Silent reading tests recognition; the
interview tests production.
→ **Deliverable:** a written list of every question where you **stalled, hedged, or rambled**. That
list — not a score — is the output.

**B3.10 · 20:30–21:00 (0.5) — Log + card update**
Add: project numbers, the napkin math, the six HR numbers.

---

# ▸ DAY 4 — Fri 31 Jul · 09:00 → 17:45 · **7.75 h** · **TAPER**
### *RECALL SWEEP. Zero new material. Deliberately not ambitious.*

**Why no new intake:** anything learned today gets one touch before the interview, which is close to
untaught. The marginal hour is worth more making Wednesday's material *retrievable* than adding
Friday's material *unretrievably*.

**B4.1 · 09:00–09:30 (0.5) — 🔁 LangGraph 4-experiment drill (touch 4)**
`exp1_parallel_no_reducer` · `exp2_silent_clobber` · `exp3_no_checkpointer` · `exp6_interrupt_rerun`.
Narrate each one-liner as it runs. **If you can narrate these four cold, you can hold the LangGraph
portion of this interview.**

**B4.2 · 09:30–10:15 (0.75) — 🔁 RAG · evaluation · system design, cold**
Draw the RAG pipeline. Draw the RAG triad triangle. Draw the latency table. Say the
time-to-first-token reframe and the split-the-diagnosis line. All from memory, out loud.

**B4.3 · 10:15–11:15 (1.0) — 🔨 **P7** PROJECT DEMO NARRATIVE — no code**
Rehearse ×3, timed: problem → architecture (drawn) → **three decisions with what each cost** → **one
thing that broke and how you found it** → **how you measured it, with real numbers** → what you'd do
next with a month.
→ **Deliverable:** 3-4 minutes with room, compressible to 90 seconds. **Both versions.**
→ **Trap:** **do not open a laptop.** Any change today is untested, and an untested change is a live
grenade in a demo. An offline drive may not even permit a laptop past security.

**☕ 11:15–11:30 — break.**

**B4.4 · 11:30–13:00 (1.5) — 🎤 FULL MOCK #2 — TR → MR → HR, end to end**
Standing, out loud, timed. → **Deliverable:** the second stall-list. Items on **both** lists go on
the revision card verbatim.

**🍽 13:00–13:45 — lunch.**

**B4.5 · 13:45–14:45 (1.0) — Fix list only**
**Only** items on both stall-lists. Re-read the source section, say it aloud three times, move on.
→ **Trap:** this is where the urge to open a new resource appears. Don't. Fixing four known gaps
beats discovering a fifth you cannot close.

**B4.6 · 14:45–15:45 (1.0) — Build the one-page revision card**
1 pitch verbatim · 2 band answer verbatim · **3 `permrag`: architecture in 8 boxes + your real
numbers** ← *most important line on the card* · 4 RAG flow, 10 boxes · 5 RAG Triad · 6 Ragas metrics ·
7 chunking numbers (800/400 worst; ~200 recursive; 9% spread) · 8 contextual retrieval 35/49/67 ·
9 LangChain four primitives + the `create_agent`/`langchain-classic` line · 10 LangGraph seven words +
four one-liners · 11 Anthropic's five patterns · 12 cosine vs dot product · 13 three STAR triggers ·
14 six HR numbers.
**Print it.** Per `TCS_ROUND_STRUCTURE.md` the waiting gaps run to hours. A real tactical edge.

**B4.7 · 15:45–16:45 (1.0) — Documents and logistics**
Work `DAY_BEFORE_CHECKLIST.md` end to end. Print 6 CVs **tonight, not Saturday morning.**

**B4.8 · 16:45–17:30 (0.75) — Final spoken pass**
Pitch · band answer · project story (both lengths) · six HR numbers · your 2-3 questions. Once each.
Standing. Then stop.

**B4.9 · 17:30–17:45 (0.25) — Stop. Log. Sleep early.**
Consolidation is a mechanism, not a comfort. **Nothing after 17:45 improves Saturday.**

---

# ▸ AUG 1 — morning · ~40 min · **ZERO NEW MATERIAL**
Full detail in `DAY_BEFORE_CHECKLIST.md` Part 2. In short: 0:10 four-experiment drill, narrated ·
0:15 revision card twice · 0:10 pitch, band answer, project story out loud standing · 0:05 documents
check. Leave. **Forbidden:** any new URL, file, or code change — new material competes for retrieval
with what you know, and a fresh gap at 7am becomes anxiety you carry into the room.

---

## RETENTION LADDER — every topic, minimum two touches

| Topic | Learn | Reps | Touches |
|---|---|---|---|
| **`permrag` project** | Jul 28 P1/P2 | Jul 29 P3/P4 · Jul 30 P5/P6 · mock · **Jul 31 P7 + mock + card** | 7 |
| Pitch + band answer | Jul 28 | Jul 29 · Jul 30 mock · Jul 31 ×2 · **Aug 1** | 6 |
| RAG pipeline | Jul 28 | Jul 29 recall · Jul 30 mock · **Jul 31** | 4 |
| Evaluation / RAG Triad | Jul 28 | **Jul 30 P6 (built it)** · mock · Jul 31 | 4 |
| LangGraph EXP 1/2/3/4 | Jul 28 | Jul 29 · Jul 30 · **Jul 31 drill** | 4 |
| LangChain primitives + v1 | Jul 29 | Jul 30 recall · mock · Jul 31 card | 4 |
| Chunking numbers | Jul 28 | Jul 30 mock · Jul 31 card | 3 |
| LangGraph EXP 5-10 | Jul 29 | Jul 30 recall · Jul 31 (4 of 6) | 3 |
| FT vs RAG · decoding · hallucination | Jul 30 | Jul 30 mock · Jul 31 mock | 3 |
| HR numbers | Jul 30 | Jul 31 ×2 | 3 |
| Python by hand · STAR + MR scenarios | Jul 29 / Jul 30 | Jul 31 mock | 2 |
| Embeddings · cosine · transformers · 10M-doc design | Jul 30 | Jul 31 mock + card | 2 |

**Nothing here is taught once.** That rule survived the compression from 30 days to 4 and the
expansion from 21 h to 38 h. The extra hours went into *depth of touch on the project*, not breadth
of new topics — `CUT_LIST.md` Part 4 lists what I refused to add and why.

---

## THE SIX THINGS THAT WIN THIS INTERVIEW

1. **The 90-second pitch.** Asked 3/3. Entirely in your control.
2. **The `permrag` walkthrough with real numbers.** Asked 3/3, opens every round, and the numbers are
   the only defence against the 60-second bluff test.
3. **Draw RAG end-to-end and name where each failure mode lives.** Asked 3/3.
4. **Volunteer evaluation before you're asked** — *"I hand-built a 40-question golden set with
   per-principal expected sources this week."* The #1 separator, answered with evidence.
5. **The four LangChain primitives, and the two LangGraph traps** (parallel write without a reducer;
   checkpointer vs Store). JD-named; almost nobody gets them exactly right.
6. **"Honestly, I don't know — here's how I'd find out."** Use it at least once. At the 4-10 band it
   reads more senior than a confident wrong answer, and in GenAI confident wrongness is literally the
   failure mode you're being hired to prevent.

---
*Companions: `MOCK_INTERVIEW_QUESTIONS.md` · `RAPID_FIRE_LANGCHAIN_LANGGRAPH.md` ·
`research/RAPID_FIRE_RAG_LLM.md` · `DAY_BEFORE_CHECKLIST.md` · `CUT_LIST.md` · `project/`*
*Evidence base: `research/` — every URL fetched and verified 27 Jul 2026.*
*Superseded: `SPRINT_RUNSHEET_4DAY.md` (21 h). Kept for reference; do not follow it.*
