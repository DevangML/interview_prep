# PROJECT SPEC — PermRAG: Permission-Aware Retrieval

**For:** Devang Manjramkar · TCS Pune, Gen AI Engineer · 01 Aug 2026
**Status:** built, running, measured. Everything in `DEMO_NUMBERS.md` came out of this repo.
**Budget:** 12–16 hours. Staged so every stage is demoable on its own.

---

## 0. THE ONE-LINE VERSION

> An enterprise RAG system where **the permission filter is applied to the candidate set
> before the vector search**, so a user can only ever retrieve chunks they are cleared to
> read — and the difference between doing that pre-retrieval and post-retrieval is a
> measured table in the repo, not an opinion.

---

## 1. WHY THIS PROJECT, FOR THIS ROLE

This was not chosen because it is interesting. It was chosen because the research says it is
the single highest-leverage artefact available, on four independent grounds.

**1. "Explain your project" is asked 3/3 across every TCS source and opens every round.**
(`research/GENAI_INTERVIEW_REALITY.md` §1.1.) It is the most-asked question and the one most
fully under Devang's control. A project built *for this role* converts the most-asked
question into the strongest answer.

**2. The exact question was asked of the candidate at Devang's exact experience band.**
Source S2 — TCS GenAI/ML, 2–3 YOE — was asked *"managing restricted vs unrestricted questions
pre-retrieval."* That is this project, verbatim. It is Tier 2.3 in the research, marked **[V]**.

**3. It is the one thing a pure-ML candidate cannot do.** Devang shipped IAM: RBAC and
field-level permissions across five personas, approval workflows with default-deny, bulk
destructive operations gated on a validated change request (`STAR_STORIES.md` S5, S6). The
research names this **"his single strongest differentiator for TCS specifically"** (§5, Bridge 2).
This project is the bridge made concrete: the same permission model, ported onto retrieval.

**4. It teaches the whole syllabus as a side effect.** Building it forces chunking,
embeddings, similarity, vector search, hybrid retrieval, reranking, LangChain composition, a
LangGraph state machine with a cycle and human-in-the-loop, and evaluation. That is the entire
Tier 1 list. **Building it IS studying** — which is why it fits in a 4-day sprint alongside
revision instead of competing with it.

### Validation of the brief (asked for explicitly)

The brief proposed ACL-filtered RAG and asked me to check it against the evidence rather than
accept it. **The evidence supports it and I am committing to it.** Four corroborating hits:

| Source | Evidence |
|---|---|
| `GENAI_INTERVIEW_REALITY.md` §2.3 **[V]** | S2 asked it directly; "metadata filtering at the vector-search level (filter by user's ACL before ANN search, not after)" |
| `RAG_DEEP.md` §3 probe | "Pre or post filtering?" is a listed interviewer probe with a full model answer |
| `RAG_DEEP.md` §8 failure #12 | "No access control … **The one failure that ends a contract.**" |
| `GENAI_INTERVIEW_REALITY.md` §5 Bridge 2 | maps IAM experience onto pre-retrieval ACL explicitly |

**One correction to the brief.** ACL alone answers *one* question well. The research says RAG
end-to-end (§1.2), vector DBs and similarity (§1.3), chunking (§1.8), LangChain (§1.4), and
evaluation (§1.6) are each asked independently and more often. So ACL is the **spine and the
differentiator**, but the project deliberately carries the full standard RAG surface as well —
otherwise it wins the rare question and loses the common ones.

---

## 2. WHAT IT IS

A retrieval-augmented QA system over a 16-document synthetic enterprise knowledge base
(HR, Finance, Engineering, Security, Legal), served to **five principals** with different
roles and clearances. The same question asked by two people returns two different answers
from one index — because they searched two different candidate sets.

Runs entirely offline on a Mac. **No paid API. No API key. No network at query time.**
Local embeddings via `sentence-transformers` (already cached), local BM25, local generation.

### The permission model

```
visible(chunk, principal)  ==
      principal.clearance_level >= chunk.classification_level     # lattice gate
  AND principal.roles ∩ chunk.allowed_roles ≠ ∅                    # role gate
```

Two dimensions, both required. This is the thing Devang actually learned shipping IAM: a
role-only model forces you to either over-grant or spawn a near-duplicate role per exception;
a clearance-only model lets a cleared user read a department they have nothing to do with.

Both dimensions live **on the chunk**, inherited from the document at ingest time, so the check
is a cheap boolean over metadata sitting next to the vectors.

*(Golden question **g35** exists purely to prove both gates are load-bearing: Neha has the
`finance` role, which IS in `allowed_roles` for the Acme MSA — but her clearance is
`confidential` and the MSA is `restricted`, so she is denied. **Role membership is not
authorisation.**)*

---

## 3. ARCHITECTURE

```
OFFLINE / INGEST                                  (rebuild: ~0.9 s end to end)
  corpus/*.md
    │  front matter carries doc_id, department, classification, allowed_roles
    ├─> parse            front matter + markdown headings
    ├─> CHUNK            structure-aware (split on `##`), recursive fallback
    │                    (\n\n → \n → ". " → " "), token-counted with the
    │                    EMBEDDING MODEL'S OWN tokenizer, ceiling ASSERTED
    ├─> inherit ACL      every chunk carries its document's classification + roles
    ├─> EMBED            snowflake-arctic-embed-xs, 384-d, L2-normalised
    └─> INDEX            flat numpy matrix (exact) + BM25 sparse, SAME row order
                         → index/vectors.npy + chunks.json + manifest.json

ONLINE / QUERY                                    (p50 6.1 ms retrieval)
  (question, principal)
    ├─> ACL MASK         boolean array over chunk metadata          [0.02 ms]
    ├─> ★ PRE-FILTER     candidates = flatnonzero(mask)   ← THE WHOLE POINT
    ├─> EMBED QUERY      with the asymmetric query prefix           [5–15 ms]
    ├─> DENSE            cosine over candidates (normalised → dot product)
    ├─> SPARSE           BM25 over the SAME candidates
    ├─> FUSE             Reciprocal Rank Fusion, k=60 (rank-based, no normalisation)
    ├─> [MMR]            off by default — measured, it hurt precision here
    ├─> ABSTAIN GATE     top score < 0.60 → "I don't have authorised information"
    ├─> ASSEMBLE         strongest chunk FIRST (lost-in-the-middle), with citations
    └─> GENERATE         pluggable: extractive (default) | ollama | hf
```

### Three control planes over the same data plane — deliberately

| File | What it is | Why it exists |
|---|---|---|
| `pipeline.py` | plain Python, ~40 lines | proves I know what the framework is doing |
| `chain.py` | the same pipeline as **LangChain LCEL** | `RunnableLambda`, `RunnablePassthrough.assign`, `\|` |
| `graph.py` | the same pipeline as a **LangGraph** state machine | adds a cycle, a bounded retry, HITL, a checkpointer |

This is the point of the whole design: **"what's the difference between LangChain and LangGraph"
is answered by pointing at two implementations of the same pipeline in my own repo.** LCEL has
no `|` that means "go back"; the moment I needed *grade → rewrite → retrieve → grade again*,
LCEL stopped being the right tool.

### The LangGraph flow

```
START → authorize ──(0 authorised chunks)──> deny → END
             │
             └──> retrieve → grade ──(good)──────────> generate → END
                     ↑          │
                     │   (weak, attempts<2)
                     └── rewrite ←┘                      [THE CYCLE]
                                │
                          (weak, attempts≥2) → escalate ──interrupt()──> END
                                                  ↑                        │
                                             human approves ───────────────┘
```

Four things in `graph.py` are deliberate interview surface:

1. **Reducer.** `attempts: Annotated[list, operator.add]` — appends. With the default reducer
   (replace) the earlier attempts vanish with no error. Silent data loss is the version that
   reaches production.
2. **Bounded cycle.** `max_attempts` in state, checked by the router. An unbounded agent loop is
   a `GraphRecursionError` in dev and a runaway bill in prod.
3. **Checkpointer + `thread_id`.** State persisted every super-step; that is what makes the
   escalation resumable from the exact saved state.
4. **Side effect placed AFTER the `interrupt`, and keyed for idempotency.** On resume LangGraph
   re-runs the node *from the top*. Anything with a side effect before the interrupt fires twice
   for one approval. This is the bug that double-charges customers.

Also: `hits` is stored in state as **plain dicts, not dataclasses**, because state crosses a
msgpack boundary every super-step. Dataclasses work with `MemorySaver` and break the day you
swap in the SQLite or Postgres checkpointer.

---

## 4. COMPONENT → INTERVIEW QUESTION MAP

The column that matters. Every row is a question from the research, and the file that answers it.

| # | Question (source tier) | Component | What he says |
|---|---|---|---|
| 1.1 | "Explain your project" **3/3** | the whole thing | 90-sec / 5-min versions in `PROJECT_TALK_TRACK.md` |
| 1.2 | RAG architecture end-to-end **3/3** | `pipeline.py` + the ASCII diagram | draws two lanes, offline vs online, unprompted |
| 1.3 | Vector DBs + similarity **2/3** | `index.py`, `retrieve.py` | flat is exact and correct **under 50k**; pgvector is the boring right answer at scale; cosine == dot product on L2-normalised vectors |
| 1.4 | LangChain, its primitives **3/3** | `chain.py` | Runnables, LCEL composition, `.assign`, and why it can't cycle |
| 1.6 | **Evaluation — the #1 hire/no-hire separator 2/3** | `evaluate.py` | retrieval / security / abstention measured **separately**; 40-question golden set; five ablation tables |
| 1.7 | Hallucination **2/3** | abstain gate + `SYSTEM_PROMPT` | model has no abstain state → give it one explicitly, plus a relevance floor chosen by sweep |
| 1.8 | Chunking **2/3** | `chunking.py`, `ablate strategy` | structure-first; `chunk_tokens` is a **ceiling not a target**; naive fixed@320 collapsed precision@5 from 0.714 → 0.207 |
| 2.1 | Function/tool calling | `graph.py` router | the router IS the "which node next" decision, made explicit |
| **2.3** | **Restricted vs unrestricted pre-retrieval [V, his band]** | **`retrieve.py` `acl_mode`** | **the headline. pre vs post vs off, measured** |
| 2.6 | Embeddings, model choice | `embedding.py` | asymmetric query prefix; model name is in the manifest and `load_index` **refuses** a mismatch |
| 3.x | Hybrid search + RRF | `retrieve.py` `_rrf` | RRF is rank-based so it sidesteps score normalisation entirely |
| 3.x | Reranker vs bi-encoder | honest gap | "I did not build one. Here is exactly where it plugs in and what it would fix" — see `g15` |
| 3.x | Lost in the middle | `build_context` | strongest chunk placed first, on purpose |
| 3.x | Guardrails | `authorize` node + abstain | default-deny; the pre-filter IS the input guardrail |
| LG | LangGraph: state, nodes, edges, reducers, checkpointer, HITL | `graph.py` | all seven vocabulary words, in his own running code |
| MR | Ownership, tradeoffs, "where were you wrong" | the `g35` story | *his eval harness found a bug in his own golden set* |

---

## 5. THE ORIGINAL OBSERVATION

Nobody expects this one and it is genuinely his:

> **In a permission-aware RAG system, chunk size is a security parameter, not just a quality
> parameter.**
>
> If a document mixes classifications across sections — and real enterprise documents do, an
> incident report has a public summary and a restricted forensics section — then a large chunk
> straddles the boundary. You then have exactly two options: classify the chunk at the maximum
> of its parts and over-deny, or leak. My structure-aware splitter cuts on headings, which is
> also the granularity at which classification is authored, so the two align. The naive
> fixed-window splitter at 320 tokens collapsed my corpus from 80 chunks to 16 — every one of
> those 16 spans multiple headings. That is a retrieval-quality regression **and** an
> access-control hazard from the same config change.

---

## 6. SCOPE — WHAT IS DELIBERATELY NOT IN IT

Stated as choices, because "I didn't have time" and "I decided not to" sound very different.

| Not built | Why | What he says if asked |
|---|---|---|
| Cross-encoder reranker | biggest quality-per-effort win, but the corpus is 80 chunks and recall@5 is already 1.0 | "It fixes `g15` — a topically adjacent authorised document answering the wrong question. A similarity floor can't tell 'about payments' from 'about *vendor* payments'; a cross-encoder can. That's my next commit." |
| A real vector DB | 80 chunks. ANN would make recall approximate for zero latency gain | "Under ~50k vectors flat is exact and fast. **pgvector** is where I'd go first — one database, real transactions, and row-level security I could push the ACL *into*." |
| LLM-as-judge / RAGAS faithfulness | needs a capable model; extractive generation is faithful by construction | "Faithfulness is 1.0 by construction with an extractive generator — which is deliberate, because it makes every wrong answer a *retrieval* bug while I'm tuning the retriever." |
| Multi-tenant namespaces | one tenant | "For multi-tenancy I'd want **physical separation** — namespace per tenant — not a filter, because a filter bug is a cross-tenant leak." |
| Streaming, caching, auth server | not what's being examined | — |

---

## 7. FILE MAP

```
project/
├── PROJECT_SPEC.md          ← this file
├── BUILD_PLAN.md            hour-by-hour, demoable at every checkpoint
├── PROJECT_TALK_TRACK.md    90-second / 5-minute / whiteboard / tradeoffs / 10M docs
├── DEMO_NUMBERS.md          every real measured number, with the command that made it
├── README.md                run it in 60 seconds
├── corpus/                  16 generated .md docs with ACL front matter
├── data/golden.jsonl        40 hand-written golden questions
├── scripts/make_corpus.py   the corpus generator
└── permrag/
    ├── config.py            every knob, with the measurement that set it
    ├── principals.py        5 personas + the two-dimensional authorisation predicate
    ├── chunking.py          front matter, structure-aware split, token ceiling assert
    ├── embedding.py         local model, asymmetric prefix, L2 normalisation
    ├── index.py             build/save/load, manifest, ACL mask, embed-model guard
    ├── retrieve.py          ★ pre/post/off filtering, dense+BM25, RRF, MMR
    ├── generate.py          extractive | ollama | hf, all offline-capable
    ├── pipeline.py          plain-Python end to end + abstain gate
    ├── chain.py             the LangChain LCEL twin
    ├── graph.py             the LangGraph state machine with cycle + HITL
    ├── evaluate.py          golden set, metrics, 6 ablations
    └── cli.py               build | ask | demo | probe | eval | ablate | graph | chain
```
