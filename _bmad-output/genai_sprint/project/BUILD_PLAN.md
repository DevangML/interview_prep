# BUILD PLAN — 12–16 hours, demoable at every checkpoint

**Interview: Sat 01 Aug 2026, 09:00, TCS Pune, offline.**
Available: Jul 28 / 29 / 30 / 31 at ~8–10 h/day ≈ 38 h total.
**This project gets 12–16 h. The other ~24 h belong to `SPRINT_RUNSHEET_4DAY.md`. Do not
let the build eat the revision.** A brilliant project you can't explain loses to a plain one
you can.

---

## THE NON-NEGOTIABLE RULE

**Every stage ends with something you can talk about, even if you never write another line.**
You may lose a day — to work, to travel, to being human. So the stages are ordered by
*talkability per hour*, not by architectural tidiness.

If you stop after **Stage 1 (3 h)** you have a working RAG system and can answer question 1.2.
If you stop after **Stage 2 (5 h)** you have the differentiator and the headline demo.
If you stop after **Stage 4 (9 h)** you have the #1 hire signal and you are, genuinely, done.
Stages 5–6 are the JD-named frameworks and are the best remaining hours if you have them.

**A reference implementation of every stage is already in this repo and it runs.** That is
insurance, not a substitute. The instruction for each stage is: *build it yourself from the
spec, open the reference only when stuck or to check.* You cannot narrate code you didn't
write, and the interview tests narration.

---

## SETUP — 10 minutes, do it before anything (already done once; verify it still works)

```fish
cd /Users/devang/Desktop/interview_prep/_bmad-output/genai_sprint/project
set -x HF_HUB_OFFLINE 1          # proves it runs with no network
../.venv/bin/python -m permrag.cli build
../.venv/bin/python -m permrag.cli demo
```

If `build` prints a manifest and `demo` prints two different answers to the same question,
the environment is good. The venv already has `sentence-transformers`, `torch`, `rank_bm25`,
`scikit-learn`, `langgraph 1.2.9`, `langchain-core 1.5.1`. Both embedding models are in the
HuggingFace cache. **Nothing needs installing and nothing needs the internet.**

---

# STAGE 1 — A RAG system that works · **3.0 h** · ⭐ THE FLOOR

**Ship criterion:** `cli ask "..."` returns a cited answer from the corpus.
**You can now answer:** "explain RAG end to end", "what chunk size and why", "what's an
embedding", "cosine vs dot product".

| Block | Time | Do | Reference |
|---|---|---|---|
| 1.1 | 0:20 | Run `scripts/make_corpus.py`. **Read three of the generated documents.** You must know this corpus by heart — every demo number comes out of it. | `corpus/` |
| 1.2 | 0:50 | Write the chunker. Front matter parse → split on `##` → recursive fallback → overlap → **assert the token ceiling**. Count tokens with `model.tokenizer`, not `len()`. | `chunking.py` |
| 1.3 | 0:30 | Write the embedder. Load `Snowflake/snowflake-arctic-embed-xs`. Apply the **query prefix to queries only**. `normalize_embeddings=True`. | `embedding.py` |
| 1.4 | 0:40 | Build the index: one numpy matrix + a chunk list + a manifest. Persist. Write the **embed-model guard** in `load_index` that refuses a mismatch. | `index.py` |
| 1.5 | 0:40 | Dense retrieval + a CLI. `vectors @ qvec`, argsort, top-k, print with citations. | `retrieve.py`, `cli.py` |

**BREAK IT (do not skip — 15 min, highest retention per minute in the stage):**
1. Set `chunk_tokens=8`. Rebuild. Watch the assert fire / chunks become useless fragments.
2. Rebuild with `paraphrase-multilingual-MiniLM-L12-v2` in the manifest, then query with
   arctic. Watch `load_index` refuse. **Then delete the guard and watch retrieval return
   plausible garbage with no error at all.** Put the guard back. *That* is the lesson: this
   failure is silent.
3. Drop `normalize_embeddings`. Watch scores stop being in [-1, 1].

**Checkpoint sentence, say it out loud:**
> "I built the offline lane — parse, structure-aware chunk, embed, index — and the online lane
> — embed the query, cosine search, top-k, assemble with citations. 16 documents, 80 chunks,
> mean 55 tokens, 384 dimensions, and the index is 123 KB."

---

# STAGE 2 — The differentiator · **2.0 h** · ⭐⭐ THE ONE THAT WINS

**Ship criterion:** the same question, two principals, two different answers. Live.
**You can now answer:** "how do you handle restricted vs unrestricted questions pre-retrieval"
— the question asked of the candidate at your exact band.

| Block | Time | Do |
|---|---|---|
| 2.1 | 0:25 | `principals.py`: 5 personas, `clearance` + `roles`, and `can_read`. Write the permission matrix on paper first — **persona × classification × department** — exactly like the IAM matrix. It is the test spec. |
| 2.2 | 0:20 | Inherit `classification` + `allowed_roles` from doc onto every chunk at ingest. Rebuild. |
| 2.3 | 0:40 | `Index.acl_mask(principal)` → boolean array. Then `acl_mode` in config with **three** values: `pre` (mask the candidate set before search), `post` (search all, filter after), `off`. All three must work. |
| 2.4 | 0:35 | Instrument it. Every result carries `n_authorised`, `n_searched`, `n_returned`, `starved_by`, `n_unauthorised_returned`. **You cannot demo what you don't count.** |

**BREAK IT:**
```fish
../.venv/bin/python -m permrag.cli ask "How many accounts were compromised in the credential stuffing incident?" --as priya --acl pre
../.venv/bin/python -m permrag.cli ask "How many accounts were compromised in the credential stuffing incident?" --as priya --acl off
```
Watch the restricted incident report appear in the second one. **Sit with that for thirty
seconds.** That is a real breach, on your laptop, that you caused with a config flag.

**Checkpoint sentence:**
> "The ACL is a boolean mask over chunk metadata and I apply it to the candidate set before
> the similarity search. Post-filtering leaks the existence and the relevance of documents the
> user can't read, and it starves top-k — you ask for 5, the filter removes 3, and you answer
> from 2 with nothing reporting that it happened."

---

# STAGE 3 — Hybrid, diversity, generation · **2.0 h**

**Ship criterion:** BM25 + RRF, an abstain path, and a generator that runs with no API key.
**You can now answer:** hybrid search, RRF, MMR, abstention, "what if you have no LLM budget".

| Block | Time | Do |
|---|---|---|
| 3.1 | 0:35 | BM25 over the **same chunk order** as the vectors, so one mask serves both. `_rrf` with k=60. |
| 3.2 | 0:20 | MMR. Implement it properly — `λ·rel − (1−λ)·max_sim_to_selected`. |
| 3.3 | 0:35 | `generate.py`: the `extractive` backend + the prompt with the three lines that matter (**answer only from context / cite / you are allowed to say you don't know**). Add `ollama` and `hf` behind the same signature. |
| 3.4 | 0:30 | The abstain gate, in `pipeline.py` **not** in the generator. Abstention is a retrieval decision. |

**BREAK IT:** run `cli probe 429`. Dense ranks an incident chunk first; BM25 ranks the rate-limit
doc first. **That is your live proof of why hybrid search exists**, and it is worth more than
any number you could quote.

**Checkpoint sentence:**
> "Dense embeddings are weak exactly where enterprise queries live — error codes, part numbers,
> ticket IDs. Here's `429`: dense puts an incident report first, BM25 nails it. I fuse with RRF
> because it's rank-based, so I never have to normalise a cosine score against a BM25 score."

---

# STAGE 4 — Evaluation · **2.0 h** · ⭐⭐ THE #1 HIRE SIGNAL

**Ship criterion:** `cli eval` prints retrieval, security, and abstention as three separate
blocks, plus a failure list.
**You can now answer:** the question the research calls *the fatal one to go silent on*.

| Block | Time | Do |
|---|---|---|
| 4.1 | 0:50 | Write the golden set **by hand, from the corpus, before running anything**. 40 rows: question, principal, expected docs, expect_abstain. It is a specification, not a recording. |
| 4.2 | 0:40 | `evaluate.py`: Recall@k, Precision@k, Hit@k, MRR — **and separately** leakage rate, starvation rate, abstention accuracy. |
| 4.3 | 0:30 | The ablation runner + `print_table`. Start with `ablate acl` and `ablate threshold`. |

**BREAK IT — and this is the best 10 minutes in the whole plan:**
Run `cli ablate threshold`. Two distributions **overlap** (should-answer min 0.506,
should-abstain max 0.616). There is no error-free threshold. You pick 0.60 because you measured
it, and you can defend picking 0.65 instead in a security product. *That* is what "I tuned it"
means.

**Checkpoint sentence — rehearse this one hardest:**
> "I don't evaluate 'the RAG system'. I evaluate three things separately: did the right chunk
> arrive, did only allowed chunks arrive, and did it shut up when it should have. Recall@5 is
> 1.0 and MRR is 0.964 — but the number I actually care about is leakage, and it's the only one
> with a target of exactly zero."

> **⚠️ IF YOU ONLY GET 9 HOURS, STOP HERE.** You have a working, permission-aware, measured RAG
> system and you can answer every Tier 1 question. Spend the remaining time on
> `SPRINT_RUNSHEET_4DAY.md` and the talk track. This is a real, defensible stopping point.

---

# STAGE 5 — LangGraph · **2.5 h** · JD-NAMED

**Ship criterion:** `cli graph "..." --as priya` cycles, escalates, interrupts, and resumes.

| Block | Time | Do |
|---|---|---|
| 5.1 | 0:40 | `RagState` TypedDict. Nodes: `authorize`, `retrieve`, `grade`, `rewrite`, `generate`, `deny`. Static edges + `add_conditional_edges`. |
| 5.2 | 0:30 | **The cycle:** `add_edge("rewrite", "retrieve")`. Bound it with `max_attempts` in state. |
| 5.3 | 0:40 | The reducer. `attempts: Annotated[list, operator.add]`. |
| 5.4 | 0:40 | `escalate` with `interrupt()`, `MemorySaver`, `thread_id`, and `Command(resume=...)`. Put the audit write **after** the interrupt and key it for idempotency. |

**BREAK IT — three experiments, each one a near-certain interview question:**
1. Delete `Annotated[..., operator.add]` from `attempts`. Run the two-attempt path. Watch the
   first attempt **silently vanish**. No error. This is `exp2_silent_clobber.py` in your own code.
2. Move the `AUDIT_LOG` write to **before** the `interrupt()`. Resume. Watch it fire twice for
   one approval. This is the bug that double-charges customers.
3. Compile with `checkpointer=None` and hit the interrupt. The *pause* works; the *resume*
   raises. A one-way door.

**Checkpoint sentence:**
> "LangChain chains are one-pass DAGs. LangGraph is a state machine, so it supports cycles —
> which is exactly what I needed: grade the context, and if it's weak, rewrite the query and go
> back to retrieve. Bounded at two attempts, because an unbounded agent loop is a runaway bill."

---

# STAGE 6 — LangChain LCEL + README · **1.5 h** · JD-NAMED

| Block | Time | Do |
|---|---|---|
| 6.1 | 0:50 | `chain.py` — the *same* pipeline in LCEL. `RunnableLambda`, `RunnablePassthrough.assign`, `\|`. Prove to yourself there is no way to express the cycle. |
| 6.2 | 0:40 | README + the hand-drawn architecture diagram. Draw it on paper, three times, the last time with the file closed. |

**Checkpoint sentence:**
> "I built the same pipeline three ways — plain Python, LCEL, and a LangGraph state machine.
> LCEL gave me composition and a uniform invoke/batch/stream interface. It could not give me a
> cycle. That's the whole difference and I found it by hitting it, not by reading it."

---

# STAGE 7 — Numbers + narration · **1.5 h** · ⭐ DO NOT SKIP THIS ONE

The bluff test — *"what chunk size did you actually use?"* — is survived here, not in Stage 1.

| Block | Time | Do |
|---|---|---|
| 7.1 | 0:30 | `cli ablate all`. Paste the real output into `DEMO_NUMBERS.md`. **Regenerate on the 31st** so the numbers are yours and current. |
| 7.2 | 0:40 | Rehearse `PROJECT_TALK_TRACK.md` — the 90-second version ×5 timed, the 5-minute version ×2, and draw the whiteboard diagram from memory. |
| 7.3 | 0:20 | Put the **six** headline numbers on the revision card (see `DEMO_NUMBERS.md` §0). |

---

## TOTAL AND THE CUT LIST

| Stage | Hours | Cumulative | Cut priority |
|---|---|---|---|
| 1 Working RAG | 3.0 | 3.0 | never |
| 2 ACL pre-filter | 2.0 | 5.0 | never |
| 3 Hybrid + generation | 2.0 | 7.0 | cut MMR (0:20) first |
| 4 Evaluation | 2.0 | 9.0 | never |
| 5 LangGraph | 2.5 | 11.5 | cut 5.4 HITL (0:40) if desperate |
| 6 LangChain + README | 1.5 | 13.0 | cut the README, never `chain.py` |
| 7 Numbers + narration | 1.5 | **14.5** | **never — this is where it converts** |

**Drop order if a day is lost:** MMR → the `hf` generator backend → HITL interrupt → the chunk
strategy ablation → the README. **Never drop Stage 7.** An unrehearsed project is a project
you cannot sell, and selling it is the entire point.

### Suggested day shape (project hours only — the rest is `SPRINT_RUNSHEET_4DAY.md`)

| Day | Project hours | Stages |
|---|---|---|
| Tue 28 Jul | 5.0 | 1 + 2 → **you have the differentiator by tonight** |
| Wed 29 Jul | 4.0 | 3 + 4 → **you have the hire signal by tonight** |
| Thu 30 Jul | 4.0 | 5 + 6 |
| Fri 31 Jul | 1.5 | 7 only. Regenerate numbers, rehearse, print. **No new code on the 31st.** |

New code on the 31st is a bug you'll be debugging in your head in the waiting room.
