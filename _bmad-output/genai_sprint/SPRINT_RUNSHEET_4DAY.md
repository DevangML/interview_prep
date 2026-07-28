> # ⛔ SUPERSEDED — DO NOT FOLLOW THIS FILE
>
> **This is the 21-hour version, written 27 Jul 2026 when Devang still had a day-job constraint.**
> Two things have since changed and both invalidate the schedule below:
> 1. The budget **doubled to ~38 hours** (full-time availability, Jul 28 noon → Jul 31).
> 2. A **project build (12-16 h) is now in scope** — and *"explain your project"* is the **3/3
>    highest-frequency question** in the verified evidence, which reorders the entire plan.
>
> ## 👉 **The live plan is [`SPRINT_RUNSHEET_V2.md`](./SPRINT_RUNSHEET_V2.md).**
>
> This file is retained for reference only — its evidence weighting, traps, and retention-ladder
> reasoning all carried forward into V2. Its **dates and hour allocations are wrong.** If the two
> files disagree about any day between Jul 28 and Aug 1, **V2 wins.**
>
> Companions also rebuilt for V2: `MOCK_INTERVIEW_QUESTIONS.md` · `CUT_LIST.md` ·
> `DAY_BEFORE_CHECKLIST.md` · `RAPID_FIRE_LANGCHAIN_LANGGRAPH.md`.

---

# GEN AI SPRINT RUNSHEET — 4.5 DAYS TO TCS ~~(21 h)~~ · **SUPERSEDED**

**Interview:** 01 Aug 2026 · TCS Pune · **OFFLINE** · Gen AI Engineer · JD band 4-10 YOE
**JD verbatim:** GenAI, AIML, LLM Modules, LangChain, LangGraph
**Written:** 27 Jul 2026 · **Budget: 21.0 hours, hard cap**

---

## ⚠️ READ THIS FIRST — THREE HONEST STATEMENTS

**1. Four days does not buy deep retention. It buys recognition plus fluent articulation.**
The spacing science this system runs on (SM2 ladders at +1/+3/+7/+16 days) needs weeks. You have
days. So this plan does **not** pretend to install long-term memory. It targets the thing that
actually decides a 45-minute technical round: *can you recognise the question and say a correct,
specific, structured answer out loud without stalling.* Every topic here gets a **minimum of two
touches** — learn, then a cold-recall rep on a later day — because two touches is the most this
container can honestly hold. Jul 31 is a **full recall sweep, not new intake**.

**2. You are not starting from zero, and the plan is built on that.**
You already do prompt engineering and agentic workflows in real work. Your gap is *framework
vocabulary* and *articulation under pressure* — not concepts. That is why ~11 of these 21 hours
are spent **running, breaking and speaking**, and only ~8 reading. You do not need to learn what
an agent is. You need to be able to say "orchestrator-workers, implemented as a LangGraph
conditional edge fanning out with `Send`" without hesitating.

**3. This is a services-firm generalist panel, most likely, and that favours you.**
Per `research/TCS_ROUND_STRUCTURE.md`: the TR panel at a services drive is often a generalist
working from a GenAI checklist. Breadth plus clear explanation beats research depth. You are not
being asked to out-research an ML PhD.

> **Anti-panic clause.** If a day collapses — work runs late, you get sick, you just cannot focus —
> **do not improvise a recovery.** Open `CUT_LIST.md`. The drop order is already decided, ranked,
> and defended. A bad day is a pre-made decision, not a crisis. You will still walk in employable.

---

## ⚠️ CALENDAR SUPERSESSION — resolve this before you start

`_bmad-output/SQL_10DAY_DAILY_RUNSHEET.md` schedules SQL Days 4-9 on **Jul 27 – Aug 1**, and
`PROGRESS_TRACKER.md` schedules SQL Day 2 on **Jul 27**. Those days now collide head-on with this
sprint. Archive protocol §7.4 forbids two documents disagreeing about the same day.

**Resolution: the SQL track is SUSPENDED for Jul 27 – Aug 1 and resumes Aug 2.**
SQL Gate 1 (Aug 2-3) slips by however many days you need. The interview is a fixed external date;
the gate is an internal one. Fixed dates win. *This file is the only authority for Jul 27 – Aug 1.*

**Cost of the suspension, stated honestly:** you lose ~5 days of SQL spacing. Window functions were
last touched Jul 26. They will have decayed by Aug 2. Budget one extra re-learn day when you
resume. That is the price, and it is worth paying.

---

## THE BUDGET — where 21 hours goes, and why

Weighting is derived from the frequency evidence in `research/GENAI_INTERVIEW_REALITY.md`
(three fetched first-person TCS reports, S1/S2/S3, with S2 at Devang's exact 2-3 YOE band).

| Block | Hrs | Why this weight |
|---|---|---|
| LangGraph — run + break 10 experiments | 3.5 | **JD-named.** Two traps are near-certain. Zero candidate reports cover it → highest asymmetry: cheap to own, expensive to fumble |
| RAG end-to-end + chunking + eval | 5.0 | Tier 1.2/1.3/1.8, asked **3/3** sources. The spine of the round |
| Pitch, band answer, STAR, MR/HR | 4.0 | Tier 1.1, asked **3/3**. Opens every round and is the one thing fully under your control |
| LLM fundamentals + system design | 3.0 | FT-vs-RAG and the 10M-doc design are the two recurring set-pieces |
| Python fundamentals, by hand | 1.0 | Tier 1.5. Cheap points, humiliating to miss |
| Recall sweep + mock + card + logistics | 4.5 | Jul 31 entire. No new intake |
| **Total** | **21.0** | |

**Front-loaded by probability.** Tonight and Jul 28 carry the highest-likelihood material —
LangGraph traps, the pitch, the RAG spine — so that if one evening is lost, it is lost from the
*cheapest* end of the plan, not the most expensive.

---

## SETUP — do this once, before anything else (2 minutes)

```bash
cd /Users/devang/Desktop/interview_prep/_bmad-output/genai_sprint/research/experiments
python3 -m venv lgvenv
source lgvenv/bin/activate.fish     # you are on fish
pip install langgraph
```

**None of the 10 experiments call an LLM. No API key needed.** Verified on
`langgraph 1.2.9` / `langgraph-checkpoint 4.1.1` / `langchain-core 1.5.1` / Python 3.14.
If a version drift changes an output, *that is itself a finding* — note the difference; version
awareness reads as experience.

---

# ▸ NIGHT 0 — Sun 27 Jul · 3.0 h
### *Break something in the first fifteen minutes.*

**Why this order:** the pitch is asked 3/3 and needs the most repetitions, so it starts tonight
and gets a rep every single day. The LangGraph traps go first because they are the JD's named
framework and the two most probable specific questions in the whole interview.

### B0.1 · 0:15 — Setup + your first break
- Run setup above, then: `python exp1_parallel_no_reducer.py`
- **Do:** read the traceback. Do not fix it yet. Sit with it for thirty seconds.
- **Deliverable:** you can state the exact error class — `InvalidUpdateError` — from memory.
- **Trap:** most candidates say "the second write overwrites the first" or "it's a race condition."
  **Both are wrong.** It raises. LangGraph refuses to silently pick a winner.

### B0.2 · 0:35 — LangGraph traps, part 1: the reducer pair
Ref: `research/BREAKABLE_EXPERIMENTS.md` EXP 1, 1b, 2
- `python exp1b_reducer_fix.py` → `{'result': ['A', 'B']}`
- `python exp2_silent_clobber.py` → `{'findings': ['docs result']}` — **`'web result'` is gone, no error**
- **Do:** say both one-liners out loud. Then say the pair-up sentence: *"EXP 1 fails loudly because
  both writes land in the same super-step. EXP 2 is the same missing reducer across two
  super-steps, so it's not an error — it's silent data loss. That's the one that reaches production."*
- **Deliverable:** both one-liners spoken cold, no notes.
- **Trap:** the unit is **one write per super-step**, not per graph. Say "super-step" out loud —
  it is the single word that marks you as a user rather than a tutorial-watcher.

### B0.3 · 0:30 — LangGraph traps, part 2: checkpointer vs Store
Ref: `BREAKABLE_EXPERIMENTS.md` EXP 3, 3b, 4
- `python exp3_no_checkpointer.py` → `turn2: I have seen 1 msgs` — **the `thread_id` you passed was
  silently ignored**
- `python exp3b_with_checkpointer.py` → `turn2: I have seen 3 msgs`, and thread `t2` isolated
- **Do:** draw the checkpointer-vs-Store table on paper from the file, then close the file and
  redraw it from memory.
- **Deliverable:** the memorised concrete example — *"the checkpointer is why the bot remembers you
  said 'my name is Devang' three messages ago in **this** chat; the Store is why it still knows your
  name when you open a **brand new** chat tomorrow."*
- **Trap:** if the interviewer says *"so the checkpointer is your memory system?"* — **say no.** It is
  short-term, within-thread memory only. Then volunteer the Store. That correction is the answer.

### B0.4 · 0:25 — Anthropic: Building Effective Agents
URL: https://www.anthropic.com/engineering/building-effective-agents
- **Do:** read (~10 min), then write the five pattern names on an index card: prompt chaining,
  routing, parallelization, orchestrator-workers, evaluator-optimizer. Next to each, write the
  LangGraph construct that implements it.
- **Deliverable:** the card, in your handwriting.
- **Trap:** the thesis is *"build the right system, not the most sophisticated one."* Arguing
  **against** an agent for a simple task is a documented HIRE signal. Reaching for multi-agent
  when one retrieval call would do is a documented NO-HIRE signal.

### B0.5 · 1:00 — The pitch and the band answer, written verbatim
Refs: `STAR_STORIES.md`, `EXPERIENCE_GAP_NARRATIVE.md`, `TCS_MANAGERIAL_HR.md` (opening self-intro)
- **Do:** write the ~85-second opening out longhand, in your own words. Then the band answer
  ("you have 2-3, we asked for 4+"). Then say each aloud **five times**, timing the pitch.
- **Deliverable:** both written on one page; pitch lands at 80-95 seconds.
- **Trap:** *"just under three years, two full-time"* — **never round up.** TCS runs background
  verification against payslips and Form 16. One inflated number and the offer dies at
  verification, after you've resigned. Name the gap in one clause, then move to evidence.
- **Trap 2:** do not apologise for the gap. Both apologising and overselling are no-hire tells.

### B0.6 · 0:15 — Close out
- Log the day. Note anything that felt shaky — it goes on tomorrow's recall rep.

---

# ▸ DAY 1 — Mon 28 Jul · 4.5 h
### *RAG is asked 3/3. Today is the spine.*

### B1.1 · 0:20 — COLD RECALL (LangGraph touch 2) 🔁
No notes. No scrolling. Say out loud:
1. Two parallel branches write the same un-reduced key. What happens, exactly?
2. Two *sequential* nodes write the same un-reduced key. What happens, exactly?
3. Checkpointer vs Store, in one sentence with a concrete example.
- **Deliverable:** three answers, cold, under 90 seconds total.
- **If you stall:** that is the forgetting curve behaving normally, not a failure. Re-run the
  script — 60 seconds — and move on. Catching it today is exactly why this rep exists.

### B1.2 · 0:45 — The RAG pipeline, drawn not recited
Ref: `research/RAG_DEEP.md` §1 and §10
- **Do:** draw the pipeline on paper **three times**. Third time with the file closed. Then read
  §10's 45-second answer aloud twice, then say it in your own words once.
- **Deliverable:** the full pipeline drawn cold in under 90 seconds, and the two-lane framing —
  *offline* (parse → chunk → embed → index) vs *online* (rewrite → retrieve → fuse → rerank →
  assemble → generate → cite).
- **Trap:** interviewers ask you to **draw** it, not recite it. If you can only recite, you get
  caught the moment they ask "where does the reranker sit?"

### B1.3 · 1:00 — HANDS-ON: break retrieval
URL: https://github.com/langchain-ai/rag-from-scratch
**Notebooks 1-4 only.** (5-18 are cut — see `CUT_LIST.md`.)
> ⚠️ **Precondition:** this needs an embedding API key. **Check before you start.** If you do not
> have one, do not burn the hour hunting — skip straight to B1.4 and B1.5 and take the numbers
> secondhand. You lose the felt experience, not the answer.

Three breaks, in order:
1. Chunk size **50**, then **4000**. Watch retrieval quality collapse at *both* ends.
   *Why:* too small → no context to answer from. Too large → the embedding is an average of many
   topics, so it matches nothing precisely.
2. Ask a question whose answer **spans a chunk boundary**. Watch it fail. Add overlap. Watch it work.
3. Change the embedding model **without re-indexing**. Watch retrieval return garbage.
- **Deliverable:** you can say *"I've seen this"* about all three, and explain #3's mechanism:
  query and document vectors now live in different spaces.
- **Trap:** #3 is a Tier-2 question in its own right — *"you change embedding models, now what?"*
  The answer is **you must re-embed the entire corpus**, built in parallel and swapped atomically
  behind an alias. Never mix.

### B1.4 · 0:20 — Contextual Retrieval, for the numbers
URL: https://www.anthropic.com/news/contextual-retrieval
- **Deliverable:** three numbers memorised — contextual embeddings alone **35%** fewer retrieval
  failures; **+ BM25 → 49%**; **+ reranking → 67%**.
- **Trap:** specific numbers from a named primary source are the strongest anti-bluff signal
  available to you. Every candidate says "I'd use RAG." Almost none can cite an ablation.

### B1.5 · 0:25 — Chroma chunking research
URL: https://www.trychroma.com/research/evaluating-chunking
*Deliberately read **after** B1.3, so the numbers land on top of an experience.*
- **Deliverable:** the sentence — *"the popular default of 800 tokens with 400 overlap was among
  the worst performers in Chroma's evaluation; I'd start at ~200 tokens recursive and run an
  ablation against a golden set."* Plus: strategies differ by up to **9%** in recall.
- **Trap:** chunking is where interviewers separate demo-builders from engineers. Treating it as a
  theory question ("well, it depends on the content") is the losing answer. Cite the evidence.

### B1.6 · 0:40 — Evaluation — the #1 hire/no-hire separator
Refs: `RAG_DEEP.md` §7, §8 · https://hamel.dev/blog/posts/evals/ ·
https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/
- **Do:** learn the **RAG Triad** (context relevance / faithfulness / answer relevance) and the four
  **Ragas** metrics (faithfulness, context precision, context recall, response relevancy). Then
  write down what *your own* L1 assertions would be for a support chatbot.
- **Deliverable:** 4-6 written L1 assertions, e.g. no PII in output; always cites ≥1 source;
  response < 400 tokens; valid JSON. Plus the diagnostic line: *"faithfulness and context recall
  together tell me whether a wrong answer was a retrieval failure or a generation failure."*
- **Trap:** **going silent when asked how you'd evaluate it is the single fatal no-hire signal.**
  Volunteer measurement unprompted — nobody asks, and saying it anyway is the strongest single
  move available to you all day.

### B1.7 · 0:30 — Pitch rep 2 🔁
- Aloud ×3, timed. Then the band answer ×2.
- **Deliverable:** pitch at 80-95 s without reading.

### B1.8 · 0:20 — Log + seed the revision card
- Start the card. Add: the three contextual-retrieval numbers, the Chroma numbers, the RAG triad.

---

# ▸ DAY 2 — Tue 29 Jul · 4.5 h
### *Finish LangGraph. Add the agent vocabulary. Write Python by hand.*

### B2.1 · 0:20 — COLD RECALL (RAG touch 2) 🔁
- Draw the RAG pipeline from memory in 90 seconds. Say the three retrieval numbers. Say the
  chunking default and why 800/400 is wrong.

### B2.2 · 1:15 — LangGraph experiments 5-10
Ref: `BREAKABLE_EXPERIMENTS.md`. Run each; say each one-liner aloud.
- **EXP 5** runaway cycle → `GraphRecursionError`. **Precision detail almost nobody has:** the
  famous "default is 25" is *langchain-core's* constant; LangGraph 1.x sets its own
  (`10007`, verified in `langgraph/_internal/_config.py`). Say it as *"the classic default was 25
  from langchain-core; LangGraph 1.x raised its own — I'd check for the version I'm on."*
  **Precision plus an admission of version-dependence reads as experience. A confidently wrong
  number reads as a memorised fact.**
- **EXP 6** interrupt re-runs the node from the top → side effect fires **twice** for one approval.
  *This is the bug that double-charges customers.* Rule: side effects go **after** the interrupt,
  or are made idempotent. **Volunteer this one unprompted** — it surprises people who have shipped HITL.
- **EXP 7** interrupt with no checkpointer → the *pause* works, the *resume* raises. A one-way door.
  Being able to say **when** it fails is the signal.
- **EXP 8** time travel — `get_state_history`, `next`, fork via `update_state`. History is
  newest-first; `invoke(None, fork_config)` means "resume, don't add input."
- **EXP 9** a leftover `add_edge` next to a conditional edge → **both fire.** The router chose
  `cheap`; `expensive` ran anyway. Not an error — just double the LLM spend.
- **EXP 10** `Send` fan-out. Tie it back: **EXP 10 is EXP 1 at scale.** Delete the reducer here and
  you get `InvalidUpdateError` with N writers instead of 2.
- **Deliverable:** all six one-liners spoken. EXP 6 and EXP 9 said cold.

### B2.3 · 0:30 — LangGraph docs, now that you've broken it
URL: https://docs.langchain.com/oss/python/langgraph/graph-api
- **Do:** read for vocabulary, not concepts — you already have the concepts from the experiments.
- **Deliverable: the seven words, cold.** StateGraph · node · edge · conditional edge · reducer ·
  checkpointer · thread_id. Plus the one-line "why LangGraph over LangChain": *LangChain chains are
  one-pass DAGs; LangGraph is a state machine that supports **cycles**, so an agent can loop —
  act, observe, decide, act again.*

### B2.4 · 0:35 — Lilian Weng: LLM Powered Autonomous Agents
URL: https://lilianweng.github.io/posts/2023-06-23-agent/
- **Read the memory section twice.** Skim the case studies.
- **Deliverable:** the three-layer agent decomposition (planning / memory / tool use), and the
  answer to *"how does a vector DB actually search fast?"* → **HNSW**, an approximate-nearest-
  neighbour multi-layer proximity graph — not "I'd use Pinecone."
- **Trap:** naming a vendor when asked about a mechanism is a tell. Name the algorithm.

### B2.5 · 0:25 — OpenAI: A Practical Guide to Building Agents
URL: https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf
**Pages 4-7 and the Guardrails chapter at p24 only.** (Full 34pp is cut.)
- **Deliverable:** the when-**NOT**-to criteria — agents suit complex judgment, unmaintainable
  rulesets, heavy unstructured data; *"otherwise, a deterministic solution may suffice."* Plus the
  guardrails vocabulary: input filter, output filter, PII redaction, topic restriction.

### B2.6 · 1:00 — Python fundamentals, **written by hand on paper**
Ref: `GENAI_INTERVIEW_REALITY.md` §1.5 (Tier 1, asked 2/3)
- **Do, on paper, no editor:** decorators · list comprehensions · threading vs multiprocessing
  (GIL) · inheritance/polymorphism · `classmethod` vs `staticmethod` · tuples vs lists.
- **Then, by hand:** *"find the second largest number in a list without using built-in functions —
  and provide test cases."* (verbatim from source S3)
- **Deliverable:** the function plus **five** written test cases: empty list · single element ·
  all duplicates · exactly two elements · negatives.
- **Trap:** **the test cases are the actual question.** The algorithm is trivial; they are checking
  whether you think about boundaries unprompted. Write them *before* you're asked.
- **Trap 2:** an offline drive may have **no laptop**. Whiteboard or paper is the likely medium.
  Handwriting code once now removes a real source of freeze on the day.

### B2.7 · 0:20 — Pitch rep 3 + log 🔁

---

# ▸ DAY 3 — Wed 30 Jul · 4.5 h
### *The two set-pieces: fine-tune-vs-RAG, and the 10M-doc design.*

### B3.1 · 0:20 — COLD RECALL (LangGraph touch 3) 🔁
- EXP 5, 6, 9 one-liners cold. Checkpointer-vs-Store table redrawn from memory.
- The seven LangGraph words, in order, in under 20 seconds.

### B3.2 · 0:50 — Fine-tuning vs RAG vs prompting + decoding + hallucination
Ref: `research/LLM_FUNDAMENTALS.md` §1, §5, §7
- **Deliverable A — the decision ladder, spoken:** prompting first, then RAG, then fine-tuning, and
  the criterion for each. The one-sentence taxonomy comes *first*, before any detail.
- **Deliverable B — temperature / top-k / top-p:** temperature **divides the logits before softmax**
  — it *reshapes* the distribution, it does not truncate it. Top-k truncates to k tokens; top-p
  truncates to the smallest set summing to p.
- **Deliverable C — hallucination mechanism, not definition:** the training objective maximises
  plausibility, never truth, and there is **no abstain state**. Mitigation: grounding + citation
  requirement + an explicit permission to say "I don't know" + a score threshold for abstention.
- **Trap:** temperature/top-k/top-p is a **screening filter** — asked of S2, the candidate at your
  exact band. Getting it right earns you nothing. Getting it wrong is disqualifying.
- **Trap 2:** answering hallucination with a *definition* ("it makes things up") is the junior
  answer. Lead with the mechanism.

### B3.3 · 0:25 — Embeddings, similarity, context windows
Ref: `LLM_FUNDAMENTALS.md` §3, §4
- **Deliverable:** the cosine-vs-dot-product line — *dot product is unnormalised, so it rewards
  longer vectors; cosine is dot product on unit vectors; **if embeddings are already L2-normalised,
  the two rank identically.*** Plus **lost in the middle** (Liu et al., https://arxiv.org/abs/2307.03172)
  → why you put the strongest chunk first.
- **Trap:** this is a designated *"does he actually know or did he memorise"* probe. The
  "identical ranking on normalised vectors" clause is the part that proves it.

### B3.4 · 0:20 — Transformers — **SKIM ONLY**
URL: https://jalammar.github.io/illustrated-transformer/
- **Deliverable:** a confident **60-second** answer. Self-attention lets each token attend to every
  other, producing context-aware representations; Q/K/V; positional encoding exists because
  attention is order-blind; it is **O(n²) in sequence length — which is *why* long context is expensive.**
- **Trap:** do not spend an hour here. Transformer internals are Tier 2. You need one confident
  minute, not depth. **If you find yourself 30 minutes in, stop.**

### B3.5 · 1:00 — SYSTEM DESIGN: 10M documents, sub-2-second latency
Ref: `research/GENAI_SYSTEM_DESIGN.md` §1 and §7
- **Do:** the universal opening (clarify scale → latency → quality bar → constraints, *state
  assumptions out loud*). Then the napkin math. Then draw the latency table. Then the architecture.
  **Rehearse twice; the second time with the file closed.**
- **Deliverable A — the napkin math, out loud:** 10M docs × ~20 chunks = **~200M chunks**; at
  1024 dims × 4 bytes = **~800 GB** of raw vectors plus graph overhead. *"That does not fit in one
  machine's RAM, so the architecture is decided by that number, not by preference."*
- **Deliverable B — the reframe, which is the highest-value sentence available to you:**
  *"Sub-2-seconds is only achievable if latency means **time-to-first-token with streaming**, not
  full completion. Generation owns ~70% of the budget — optimising retrieval past a point is
  optimising the wrong term."*
- **Deliverable C:** two of the six senior sentences, memorised verbatim (§7).
- **Trap:** **never start drawing.** Sixty seconds of clarifying questions is graded, and it buys
  you thinking time. Asking *"is that p50 or p99, and is it time-to-first-token or full
  completion?"* before designing is itself the seniority signal.

### B3.6 · 0:45 — STAR stories + managerial scenarios
Refs: `STAR_STORIES.md`, `TCS_MANAGERIAL_HR.md`
- **Do:** pick **three** stories — (1) something you shipped end-to-end and who used it,
  (2) something that broke in production and how you diagnosed it, (3) a decision with a trade-off
  you can defend from both sides. Say each aloud ×2, timed to ~2 minutes.
- **Then five MR scenarios** from `TCS_MANAGERIAL_HR.md`: deadline vs quality · conflict with a
  teammate · last-minute requirement change · working from an ambiguous spec · a mistake you made.
- **Deliverable:** three stories at ~2 min each, plus five scenario answers, spoken not read.
- **Trap:** **the MR round is not non-technical.** Source S1 shows LangChain, eval metrics and
  fine-tune-vs-RAG all asked *in MR*. Do not mentally switch off after the TR.
- **Trap 2:** obey the NUMBERS RULE in `STAR_STORIES.md`. Only the eight evidence-backed figures
  are speakable. Everything else stays a «FILL» until you verify it. The 60-second bluff test —
  *"which chunk size did you actually run?"* — cannot be survived with invented specifics, and real
  small numbers beat impressive vagueness.

### B3.7 · 0:30 — HR numbers, nailed down
Ref: `TCS_MANAGERIAL_HR.md`
- **Do:** write down, precisely: current CTC (fixed + variable + any bonus) · **your exact
  contractual notice period** · earliest joining date · expected range (anchor 18, defensible
  16-18 fixed, soft floor ~14) · location answer (**yes, with a preference** — a flat "Pune only"
  is a documented rejection trigger).
- **Deliverable:** all six numbers on the revision card.
- ⚠️ **Two open items flagged by story-architect that only you can close: your exact contractual
  notice period, and your current fixed CTC + variable + bonus.** The salary script does not work
  until both are real. **Do this today, not on Jul 31.**

### B3.8 · 0:20 — Log + card update

---

# ▸ DAY 4 — Thu 31 Jul · 4.5 h
### *RECALL SWEEP. Zero new material. This day is deliberately not ambitious.*

**Why no new intake:** anything learned today gets exactly one touch before the interview, which
is close to untaught. The marginal hour is worth more spent making Tuesday's material retrievable
than adding Thursday's material unretrievably.

### B4.1 · 0:30 — The 4-experiment LangGraph drill (touch 4) 🔁
```bash
python exp1_parallel_no_reducer.py     # InvalidUpdateError
python exp2_silent_clobber.py          # silent data loss
python exp3_no_checkpointer.py         # "I have seen 1 msgs" twice
python exp6_interrupt_rerun.py         # side effect fires twice
```
- Narrate each one-liner as it runs. **If you can narrate these four cold, you can hold the
  LangGraph portion of this interview.**

### B4.2 · 0:30 — RAG + system design, cold (touch 3) 🔁
- Draw the RAG pipeline. Draw the latency table. Say the time-to-first-token reframe.
- Say the split-the-diagnosis line: retrieval failure vs generation failure, measured separately.

### B4.3 · 0:45 — Spoken gap sweep
URL: https://github.com/amitshekhariitbhu/ai-engineering-interview-questions
- **Sections: "Must Know" + RAG + Agents + LLMOps only.** Do not read all 15.
- **Method:** read a question → **answer it out loud** → only click through on the ones you fumble.
- **Deliverable:** anything you cannot answer aloud in 60 seconds gets **two lines** on the revision
  card. Anything you can, skip entirely.

### B4.4 · 1:00 — FULL MOCK, out loud, timed
Use `MOCK_INTERVIEW_QUESTIONS.md`, in order, as a real TR would run it.
- **Deliverable:** a written list of every question where you stalled, hedged, or rambled. That
  list — not the score — is the output of this block.
- **Trap:** do this **standing up and speaking**, not reading silently. Silent reading tests
  recognition; the interview tests production. They are different skills and only one is being examined.

### B4.5 · 0:45 — Build the one-page revision card
Twelve items, spec at the end of `research/RESOURCES_TIER_S.md`:
1. The 90-second pitch, word for word
2. The band answer, word for word
3. RAG flow — 10 boxes, hand-drawn
4. RAG Triad — context relevance / faithfulness / answer relevance
5. Ragas — faithfulness, context precision, context recall, response relevancy
6. Chunking numbers — 800/400 among the worst; ~200 recursive; 9% recall spread
7. Contextual retrieval — 35% / 49% / 67%
8. LangGraph seven words — StateGraph, node, edge, conditional edge, reducer, checkpointer, thread_id
9. Anthropic's five patterns
10. Your own 3-4 real production numbers
11. Cosine vs dot product, one line
12. Three STAR stories — three words each, as triggers only
**Plus:** the four LangGraph one-liners, and your six HR numbers.
- **Print it.** This is what you read in the waiting gaps at the venue, and per
  `TCS_ROUND_STRUCTURE.md` those gaps run to hours. It is a real tactical edge.

### B4.6 · 0:45 — Documents and logistics
Work `DAY_BEFORE_CHECKLIST.md` end to end. Print 6 CVs. Clothes out. Bag packed.

### B4.7 · 0:15 — Stop early. Sleep.
Consolidation is a mechanism, not a comfort. An extra hour awake tonight actively costs you
retrieval speed tomorrow.

---

# ▸ AUG 1 — Interview morning · ~45 min · **ZERO NEW MATERIAL**

**Why zero.** New material on the morning of does two harmful things and no useful ones: it
competes for retrieval with what you already know, and — worse — a fresh gap discovered at 7am
becomes anxiety you carry into the room. Nothing you could learn in 45 minutes will be asked in a
way that a shaky first exposure survives. The morning's only job is **making retrieval fast and
your voice warm.**

1. **0:10** — Run the four-experiment drill. Narrate. (Reference, not learning.)
2. **0:15** — Read the revision card twice, top to bottom.
3. **0:10** — Say the pitch aloud once, and the band answer once. Out loud, standing.
4. **0:10** — Documents check against `DAY_BEFORE_CHECKLIST.md`. Leave.

**Explicitly dropped from the morning:** the techinterview.org read that the resource feed
suggested for the drive in. It is new material and this plan forbids new material today. Read it
Aug 2, out of curiosity, if you like.

---

## RETENTION LADDER — every topic, minimum two touches

| Topic | Learn | Reps | Total touches |
|---|---|---|---|
| **LangGraph reducers (EXP 1/2)** | Jul 27 | Jul 28 · Jul 30 · **Jul 31** | 4 |
| **Checkpointer vs Store (EXP 3/4)** | Jul 27 | Jul 28 · Jul 30 · **Jul 31** | 4 |
| Pitch + band answer | Jul 27 | Jul 28 · Jul 29 · Jul 31 · **Aug 1** | 5 |
| RAG pipeline | Jul 28 | Jul 29 · **Jul 31** | 3 |
| Chunking numbers | Jul 28 | Jul 31 (card) | 2 |
| Evaluation / RAG Triad | Jul 28 | Jul 31 (mock + card) | 2 |
| LangGraph EXP 5-10 | Jul 29 | Jul 30 · Jul 31 (4 of 6) | 3 |
| Python by hand | Jul 29 | Jul 31 (mock) | 2 |
| FT vs RAG · decoding · hallucination | Jul 30 | Jul 31 (mock + sweep) | 2 |
| 10M-doc design | Jul 30 | **Jul 31** | 2 |
| STAR + MR scenarios | Jul 30 | Jul 31 (mock) | 2 |

**Nothing on this plan is taught once.** That rule survived the compression from 30 days to 4.
Two touches is thin — it is also the honest maximum this container holds, and it is what makes
the difference between "I read about that" and "I can say that."

---

## THE FIVE THINGS THAT WIN THIS INTERVIEW

If everything else falls apart, these five are the plan:

1. **The 90-second pitch.** Asked 3/3. Entirely in your control.
2. **Draw RAG end-to-end and name where each failure mode lives.** Asked 3/3.
3. **Volunteer evaluation before you're asked.** The #1 documented hire/no-hire separator.
4. **The two LangGraph traps** — parallel write without a reducer; checkpointer vs Store.
   JD-named, near-certain, and almost nobody gets them exactly right.
5. **Real numbers from your own shipped work.** The 60-second bluff test cannot be faked, and it
   cannot be failed if the numbers are true.

---

## ONE ACTION THAT OVERRIDES THIS ENTIRE FILE

**Re-read the actual TCS invite email.** Venue, gate, reporting time, EP/reference number,
required documents, and whether there is a pre-registration link. Sahyadri Park (Hinjewadi Ph 3)
and Commerzone (Yerwada) are ~20 km apart. Every logistical inference in this sprint is
subordinate to that email. **Do it tonight, in the first five minutes, before B0.1.**

---

*Companions: `MOCK_INTERVIEW_QUESTIONS.md` · `DAY_BEFORE_CHECKLIST.md` · `CUT_LIST.md`*
*Evidence base: `research/` — every URL here was fetched and verified 27 Jul 2026.*
