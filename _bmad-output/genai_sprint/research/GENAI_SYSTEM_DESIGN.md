# GENAI SYSTEM DESIGN — THE FOUR RECURRING PROMPTS

**Study budget: 2.0 hrs** | **Priority: §1 (10M docs, sub-2s) is the highest-probability design question in 2026 GenAI interviews. Rehearse it until you can draw it in 5 minutes.**

## THE UNIVERSAL OPENING (use on every design question)

Never start drawing. Spend 60 seconds here — it is graded:

1. **Clarify scale:** corpus size, growth rate, QPS, peak vs average, concurrent users.
2. **Clarify latency:** p50 or p99? Time-to-first-token or full response? *(Ask this. It changes the architecture and shows you've shipped.)*
3. **Clarify quality bar:** what does wrong cost? Legal/medical answers need abstention; internal search doesn't.
4. **Clarify constraints:** data residency, on-prem vs cloud, PII, budget, existing stack.
5. **State assumptions out loud** and write them in the corner of the board.

Then: **requirements → high-level diagram → deep-dive the bottleneck → tradeoffs → what I'd measure.**

---

# §1. DESIGN A RAG PIPELINE OVER 10M DOCUMENTS AT SUB-2-SECOND LATENCY

## Step 1 — Do the napkin math out loud. This alone puts you ahead.

> "10M documents at, say, 20 chunks each is **~200M chunks**. At 1024 dimensions × 4 bytes that's **~800 GB of raw vectors**, plus HNSW graph overhead on top. That does not fit in one machine's RAM, so **the architecture is decided by that number, not by preference**: I either shard, or I compress, or both."

**The two levers, stated as a choice:**
- **Compress:** dimension reduction (Matryoshka truncation 1024 → 256) and/or **product quantization**. Combined, ~800 GB → tens of GB. Costs recall — so I'd use a two-stage retrieve: PQ for cheap candidate generation, then rescore candidates against full-precision vectors.
- **Shard:** partition by tenant / domain / time. Query routes to the right shard(s), scatter-gather if needed.

Say: "**I'd reach for compression before sharding**, because sharding adds a fan-out and a slowest-shard tail-latency problem, and PQ + rescoring usually gets me there without it."

## Step 2 — The latency budget. Draw it as a table; this is the part interviewers grade hardest.

| Stage | Budget | Notes |
|---|---|---|
| Network / auth / gateway | 50 ms | |
| Query rewrite (optional) | 100 ms | **Cut first under pressure** — small model or skip |
| Query embedding | 30 ms | Small model, co-located, batched |
| ANN retrieve (top-100) + BM25 | 100 ms | Parallel, not sequential |
| Fusion (RRF) | 5 ms | |
| Cross-encoder rerank 100 → 5 | 200 ms | Cap candidates; hard timeout with fallback |
| Context assembly | 15 ms | |
| **LLM prefill → first token** | **500–800 ms** | **The dominant term. Everything else is noise next to it.** |
| **Total to first token** | **~1.0–1.3 s** | Fits the budget |

**Then deliver the key insight:**
> "Sub-2-seconds is only achievable if 'latency' means **time-to-first-token with streaming**, not full completion. A 500-token answer takes several seconds to finish generating no matter what I do to retrieval. So the first thing I'd pin down is which one we're measuring — and if it's full completion at 2s, the honest answer is that I have to shorten the answer or use a smaller/faster generation model, because retrieval isn't the bottleneck."

**That reframe is the highest-value sentence in this entire document.** Most candidates optimise retrieval and never notice that generation owns ~70% of the budget.

## Step 3 — The architecture

```
                       ┌──────────── OFFLINE (Spark/Ray batch + CDC stream) ────────────┐
  Sources (S3/SharePoint/DB)                                                            │
      → Parse (layout-aware; tables separately)                                         │
      → Structure-aware chunk (~512 tok, parent/child)                                  │
      → Contextual enrichment (LLM blurb; prompt-cached)                                │
      → Embed (batched GPU, 1024-d, Matryoshka-truncatable)                             │
      → Write: Object store (source of truth: text+meta+vectors)                         │
               Vector index (HNSW+PQ, sharded)  +  BM25 index  +  Doc store (parents)   │
                       └────────────────────────────────────────────────────────────────┘

  ONLINE
  Client ─▶ API GW (auth, rate limit, tenant) ─▶ Orchestrator
             │
             ├─▶ ① Semantic cache lookup ──── HIT ──▶ stream cached answer (~50 ms) 🎯
             │
             ├─▶ ② Guardrail: injection / PII / policy (parallel, fail-fast)
             │
             ├─▶ ③ Query embed  ──┬─▶ ANN (HNSW+PQ, pre-filtered by ACL) top-100
             │                     └─▶ BM25 top-100          [PARALLEL]
             │                        ↓ RRF fuse
             ├─▶ ④ Cross-encoder rerank → top-5 → fetch PARENT chunks from doc store
             │
             ├─▶ ⑤ Assemble (best chunk first/last), generate @ T=0, STREAM
             │
             └─▶ ⑥ Post-guardrail on stream + log trace → eval store
```

## Step 4 — Bottlenecks, named in order

1. **Generation (largest).** Fixes: stream; cap `max_tokens`; smaller/distilled model; speculative decoding; **prompt caching on the static system prompt**; continuous batching (vLLM) for throughput.
2. **Cross-encoder rerank.** Fixes: cap candidates at 50; batch; a smaller reranker; ColBERT-style late interaction; timeout → fall back to fusion order.
3. **ANN at 200M vectors.** Fixes: PQ + rescoring; shard + parallel fan-out; tune `ef_search` as the runtime recall/latency dial; keep the index in RAM (**disk-backed ANN destroys p99**).
4. **Tail latency (p99).** Fixes: hedged requests, per-stage timeouts with graceful degradation, circuit breakers. Say: "**Every stage after retrieval must be optional.** If rerank times out I return fusion order; if retrieval times out I tell the user I couldn't reach the knowledge base. I never let a slow optional stage hold the response."
5. **Cold cache / bursty load.** Fixes: pre-warm, autoscale on queue depth not CPU, admission control.

## Step 5 — Tradeoffs to volunteer

| Choice | Buy | Pay |
|---|---|---|
| PQ compression | 10–20× memory | Recall (mitigate: rescore full-precision top candidates) |
| Skip reranking | ~200 ms | Meaningful precision loss — usually the wrong trade |
| Larger k | Recall | Rerank cost + context noise |
| Semantic cache | Huge latency + cost win on repeat traffic | Risk of serving a stale/near-miss answer |
| Streaming | Perceived latency | Post-hoc guardrails get harder (see §4) |
| Sharding | Scale | Fan-out tail latency, rebalancing complexity |

## Follow-up probes and how to answer

- *"How do you keep the index fresh?"* → CDC/event-driven incremental re-index at document granularity, not full rebuilds. Object store is the source of truth so the index is **derived and disposable**. Blue/green index swap behind an alias for embedding-model changes. Surface `last_updated` in citations.
- *"You change embedding models — now what?"* → "**You must re-embed the entire corpus** — vectors from different models aren't comparable. So: build the new index in parallel, shadow-evaluate on the golden set, then atomically flip the alias. Never mix. This is why I keep raw text and metadata in object storage — the vectors are rebuildable, the source data is not."
- *"Multi-tenant isolation?"* → Physical separation (namespace/partition per tenant) over filter-based, because a filter bug is a cross-tenant leak. ACL filtering applied **pre-retrieval**, derived from the caller's token, never from the request body.
- *"How do you know it's working?"* → Golden set in CI (context recall/precision, faithfulness, answer relevance) + production monitoring on the RAG triad via sampled LLM-judge + user feedback as ground-truth drip.
- *"Cost at 1M queries/day?"* → See §5 and do the arithmetic out loud.

---

# §2. ENTERPRISE GUARDRAILS / CONTENT SAFETY ARCHITECTURE

**Opening frame:** "Guardrails are **defence in depth on both sides of the model** — input and output — and they must be **separate from the model**, because you can't ask a model to reliably police itself when the attack is delivered through the same channel as its instructions."

```
INPUT                                  OUTPUT
 ├─ AuthN/Z, rate limit, quota          ├─ PII / secret leakage scan
 ├─ PII detect + redact/tokenize        ├─ Toxicity / policy classifier
 ├─ Prompt-injection classifier         ├─ Groundedness check vs retrieved context
 ├─ Topic / off-domain router           ├─ Schema / format validation
 ├─ Jailbreak heuristics + denylist     ├─ Citation verification (do quotes exist?)
 └─ Input length / cost cap             └─ Action authorisation (before any tool fires)
                     ↓                        ↑
              [ LLM + retrieval, least privilege ]
                     └── full audit trail, immutable ──┘
```

**Anchor to OWASP Top 10 for LLM Applications (2025).** Naming this framework is a strong enterprise signal for TCS:
`LLM01` Prompt Injection · `LLM02` Sensitive Information Disclosure · `LLM03` Supply Chain · `LLM04` Data and Model Poisoning · `LLM05` Improper Output Handling · `LLM06` Excessive Agency · `LLM07` System Prompt Leakage · `LLM08` Vector and Embedding Weaknesses · `LLM09` Misinformation · `LLM10` Unbounded Consumption.

**Three you should be able to expand:**
- **LLM05 Improper Output Handling** — "Treat model output as **untrusted user input**. If it reaches a shell, SQL, `eval`, or a browser, you have RCE or XSS. Never interpolate model output into a query — parameterise, or validate against a schema/allowlist first." Classic, and most candidates miss it.
- **LLM06 Excessive Agency** — "Bound the blast radius: least-privilege tool scopes, human-in-the-loop for irreversible actions, and no tool that can both read private data and write to the outside world."
- **LLM08 Vector and Embedding Weaknesses** — "Poisoned documents in the index become poisoned retrievals; and embeddings are partially invertible, so a vector store is **sensitive data**, encrypted and access-controlled like a database."

**Layered strategy, cheapest first:** deterministic rules (regex, denylist, schema) → small fast classifiers → LLM-based judge → human review. "Run the cheap deterministic layers first and in parallel so guardrails don't dominate the latency budget. Guardrails that add a second get switched off by the product team — that's a real failure mode."

**Tradeoff to state:** "Every guardrail has a false-positive rate, and false positives are **visible and infuriating** while false negatives are invisible. So I'd instrument both, tune thresholds per risk tier, and log every block for review — an unreviewed blocklist drifts into a support problem."

**Probe: "Can you fully prevent prompt injection?"** → **Answer honestly, it scores well:** "No. It's an open problem — the field's consensus, and Simon Willison's position, is that you can't solve it with more AI, because instructions and data share one channel. So I design for **containment, not prevention**: least privilege, no privileged action without human confirmation, and avoid the 'lethal trifecta' — private data access, exposure to untrusted content, and an external communication channel — in the same agent. Break any one of those three and exfiltration stops being possible."

---

# §3. MULTI-AGENT ORCHESTRATION SYSTEM

**Open by pushing back — this is a maturity signal:**
> "First I'd ask whether it needs to be multi-agent. Multi-agent multiplies latency, cost, and failure modes, and a single well-prompted model with good tools beats a badly-coordinated swarm most of the time. It earns its keep when you have **genuinely parallel subtasks**, **specialised toolsets or permissions that shouldn't be merged**, or **long tasks needing context isolation**."

## Reference architecture

```
                    ┌── ORCHESTRATOR / SUPERVISOR ──┐
                    │  plan · route · aggregate      │
                    │  budget: steps, tokens, wall   │
                    └───┬──────────┬──────────┬──────┘
                        ▼          ▼          ▼
                   Agent A     Agent B     Agent C     (specialised: tools + prompt + permissions)
                        │          │          │
                        └──── Shared state store ────┘  (blackboard: task graph, artifacts, messages)
                                   │
                        Tool layer (typed, validated, least-privilege, idempotent)
                                   │
                        Observability: per-agent traces, token/cost, step counts
```

## Topologies — know when each applies

| Pattern | Shape | Use when |
|---|---|---|
| **Supervisor / hierarchical** | Central planner delegates | **Default.** Predictable, debuggable, easy to bound |
| **Pipeline / sequential** | A → B → C | Clear stage dependencies (research → draft → review) |
| **Fan-out / map-reduce** | Parallel workers → aggregator | Independent subtasks — **the real latency win** |
| **Mesh / debate** | Peers exchange | Quality via disagreement; expensive |
| **Reflection** | Actor + critic loop | Quality-critical output; bound the iterations |

## The engineering concerns — this is what separates you from someone who's read a framework README

1. **Termination.** "Every loop needs a **hard bound**: max steps, max tokens, max wall-clock, and a no-progress detector. Unbounded agent loops are the #1 production incident — OWASP calls it **Unbounded Consumption**."
2. **State & context.** Shared blackboard vs message passing. "Agents shouldn't inherit each other's full transcript — that's how you blow the context window and confuse them. Pass **artifacts**, not conversations."
3. **Error handling.** Retries with backoff, compensating actions, and a **checkpoint after each completed step** so a failure at step 7 doesn't rerun steps 1–6.
4. **Determinism & replay.** Log every LLM call with prompt, params, seed, and response so runs can be replayed for debugging. "Non-reproducible agent bugs are unfixable bugs."
5. **Cost control.** Per-run budget enforced by the orchestrator; kill-switch; route simple sub-tasks to a cheap model, hard ones to the expensive one.
6. **Evaluation.** Trajectory-level, not just final answer: tool-call accuracy, goal accuracy, step efficiency. RAGAS ships exactly these agent metrics.

**Probes:**
- *"How do agents share memory?"* → Short-term = the run's shared state/blackboard. Long-term = vector store keyed by user/session. Explicit **hand-off artifacts** rather than dumping transcripts.
- *"Two agents disagree?"* → Supervisor arbitrates with a tie-break rule, or escalate to a stronger model, or surface to a human. Never let agents negotiate unbounded — that's a token bonfire.
- *"How do you debug?"* → Distributed tracing with a span per agent step (OpenTelemetry semantics), full prompt/response capture, and a replay harness.
- *"Latency?"* → "Multi-agent is only latency-neutral if the fan-out is genuinely parallel. Sequential chains **add** latency at every hop, so I'd parallelise aggressively and stream partial results so the user sees progress."

---

# §4. LLMOPS PIPELINE: VERSIONING, EVALUATION, MONITORING, ROLLBACK

**Opening frame — this is the single best sentence in this section:**
> "The mental shift is that in an LLM system the **prompt, the model version, the retrieval index, and the eval set are all deployable artifacts** that can break production independently. Traditional CI/CD versions code. LLMOps has to version all five and be able to roll any one of them back on its own."

## What gets versioned

| Artifact | Versioned how | Rollback |
|---|---|---|
| **Prompts** | In git, templated, semver'd. **Never hardcoded in application code** | Revert + redeploy, or flip a registry pointer |
| **Model + params** | Pinned model ID, temperature, top-p, max_tokens in config. **Never `latest`** | Config flip |
| **Embedding model** | Pinned; index tagged with the embedding model version | **Requires full re-index** — blue/green with alias flip |
| **Retrieval index** | Immutable, dated snapshots behind an alias | Repoint alias — seconds |
| **Eval set** | In git, grows from production failures | n/a |
| **Fine-tuned adapters** | Model registry (MLflow/W&B), lineage to training data | Serve previous adapter |

## The CI/CD flow

```
PR (prompt / model / chunking / index change)
  → unit tests + schema validation
  → OFFLINE EVAL on golden set  ──fail── block merge
     (context recall, context precision, faithfulness, answer relevance,
      cost/query, p95 latency, safety pass-rate)
  → deploy to staging → shadow traffic (run new alongside old, compare, serve old)
  → CANARY 5% with automatic rollback on metric regression
  → progressive 25% → 50% → 100%
  → continuous production monitoring → failures feed back into golden set
```

**Say:** "The non-negotiable is the **quality gate in CI**. Without it, a one-word prompt change ships a regression and nothing throws an exception — quality degrades silently. That's the defining operational difference between ML systems and normal software."

## Monitoring — three layers

1. **System:** latency p50/p95/p99 (split TTFT vs total), error rate, throughput, token usage, **cost per query**, cache hit rate.
2. **Quality:** sampled LLM-judge on the RAG triad, retrieval score distributions, **abstention rate**, citation coverage. Watch for **drift** — query distribution shifting away from corpus coverage is an early warning that precedes complaints.
3. **User:** thumbs up/down, regeneration rate, escalation-to-human rate, task completion. "Implicit signals like **regeneration rate** are more honest than explicit ratings — people rarely click thumbs-down, they just retry."

**Tracing:** every request emits a trace — query, retrieved chunk IDs and scores, rendered prompt, model version, response, cost, latency per stage. LangSmith / Langfuse / Arize Phoenix / OpenTelemetry GenAI conventions. "Without chunk-level trace capture you cannot debug a bad answer after the fact, and 'we can't reproduce it' is where RAG quality work goes to die."

## Rollback

"Rollback must be **decoupled per artifact and fast**. Prompt and model rollbacks are config flips — seconds. Index rollback is an **alias repoint**, which is why indexes are immutable and dated. The dangerous one is the embedding model, because it forces a full re-index; that's precisely why I build the new index in parallel and keep the old one live until the new one passes eval. Feature-flag every risky change so rollback never requires a deploy."

**Probes:**
- *"How do you A/B test prompts?"* → Deterministic hash-bucket on user ID for stable assignment; measure product metrics (task completion, escalation rate) not just judge scores; run long enough for significance — LLM output variance is high, so underpowered tests are the norm and the trap.
- *"Provider deprecates your model?"* → "That's why the model ID is config and there's an abstraction layer over providers. I'd run the golden set against the replacement, expect prompt regressions because prompts don't transfer cleanly across model families, and budget re-tuning time. **Prompts are model-specific artifacts** — teams that don't believe this get hurt on every upgrade."

---

# §5. PRODUCTION CONCERNS — CROSS-CUTTING

## Cost modelling

**Do the arithmetic out loud; nobody else will.**
> "Cost per query = (input tokens × input price) + (output tokens × output price) + embedding + rerank + infra. In RAG, **input dominates** — 5 chunks × 500 tokens is 2,500 tokens of context against maybe 300 tokens out. At 1M queries/day the input side is the whole bill."

**Levers, in order of impact:**
1. **Semantic + exact caching** — biggest single win on real traffic, which is heavily repetitive.
2. **Prompt caching** on the static system prompt / few-shot block — providers discount cached prefix tokens substantially.
3. **Model routing** — cheap model for easy queries, escalate on low confidence. "The cheapest token is the one you don't send to the expensive model."
4. **Fewer/tighter chunks** — reranking to top-3 instead of stuffing top-20 cuts cost *and* improves quality. Rare alignment; point it out.
5. **Cap `max_tokens`** — unbounded output is unbounded cost.
6. **Batch** anything offline.

## Caching — know both kinds and their failure modes

| | Exact cache | Semantic cache |
|---|---|---|
| Key | Hash of the normalised prompt | Embedding of the query, similarity ≥ threshold |
| Hit rate | Low (queries vary) | Much higher |
| Risk | Low | **Serving the wrong answer to a similar-but-different question** |

**The failure mode to volunteer:** "Semantic caching is dangerous exactly where embeddings are weak — negation and numbers. 'Is X covered?' and 'Is X **not** covered?' can sit above a 0.95 similarity threshold. So: a **high** threshold, include user/tenant/permissions **in the cache key**, TTL tied to index freshness, and never cache personalised or permission-scoped answers across users." That last clause is a security answer disguised as a caching answer.

Also cache: embeddings (deterministic per model — cache forever, keyed by content hash + model version) and reranker scores per (query, doc) pair.

## Latency budget & streaming UX

- **Stream always.** TTFT is the number the user feels; total time is the number your dashboard shows. Streaming turns a 4-second answer into a 700 ms one perceptually.
- **Show retrieval progress** ("searching 3 sources…") — filled wait time feels shorter.
- **Render citations as they stream**, not at the end.
- **Everything after retrieval is optional under timeout.** Degrade, don't fail.
- **Post-hoc output guardrails conflict with streaming** — you can't unsay a streamed token. Resolutions: buffer small windows and scan, run classifiers on the stream, or accept that high-risk domains don't stream. Naming this conflict unprompted is a strong signal.

## PII handling

Detect → classify → **redact or tokenize before the model sees it** → detokenize on the way out if needed. Never log raw prompts containing PII (log hashes/IDs). Data residency matters for Indian BFSI/government work — say it; it's TCS's client base. Retention policy on traces. **Right-to-be-forgotten is genuinely hard**: you must delete from source, vector index, doc store, caches, *and* trace logs — "which is another reason I keep a durable mapping from source document to every derived chunk ID."

## Prompt injection — defences that actually help

Prevention is unsolved; these reduce blast radius:
- **Least privilege on tools**; no privileged action without human confirmation.
- **Avoid the lethal trifecta** in one agent: private data + untrusted content + external communication.
- **Dual-LLM pattern** — a privileged planner that never sees untrusted content, and a quarantined worker that does but has no privileges.
- **Treat all model output as untrusted input** downstream (OWASP LLM05).
- **Structural separation** of instructions and data, injection classifiers, and canary/instruction-integrity checks — helpful, not sufficient.
- **Delimiters alone do not work.** Say this explicitly; claiming they do is a red flag to an informed interviewer.

## Observability checklist (name these)

Trace ID per request · per-stage latency · retrieved chunk IDs + scores · rendered prompt + model version · token counts and cost · guardrail decisions · user feedback · sampled quality scores. Standardise on OpenTelemetry GenAI conventions so it lands in the platform you already run.

---

# §6. RESOURCES — VERIFIED

| Resource | Time | Covers |
|---|---|---|
| [OWASP Top 10 for LLM Applications (2025)](https://genai.owasp.org/llm-top-10/) | **30 min** | §2 entirely. The framework to name in an enterprise interview. Read all ten titles + expand LLM01/05/06/08. |
| [Simon Willison — prompt injection series](https://simonwillison.net/series/prompt-injection/) | **30 min** (skim the series index + "lethal trifecta") | §5 injection defences. The authoritative practitioner voice; source of "you can't solve AI security with more AI". |
| [Introducing Contextual Retrieval — Anthropic](https://www.anthropic.com/news/contextual-retrieval) | **25 min** | §1 offline pipeline, with real numbers and a cost note on prompt caching. |
| [LLM-Powered Autonomous Agents — Lilian Weng](https://lilianweng.github.io/posts/2023-06-23-agent/) | **40 min** | §3 entirely — planning, memory, tool use, and the honest limitations section (finite context, long-horizon planning, reliability). The most-cited agents writeup. |
| [GraphRAG docs — Microsoft](https://microsoft.github.io/graphrag/) | **15 min** | Indexing pipeline as a real system: TextUnits → entity extraction → Leiden communities → summaries; global vs local vs DRIFT search. |
| [Vector Indexes — Pinecone](https://www.pinecone.io/learn/series/faiss/vector-indexes/) | **30 min** | §1 index sizing/tradeoff numbers. |
| [Lost in the Middle](https://arxiv.org/abs/2307.03172) | **15 min** | Justifies context ordering in §1 step 3. |
| [pgvector README](https://github.com/pgvector/pgvector) | **15 min** | Concrete limits to cite when arguing Postgres vs dedicated vector DB. |

---

# §7. THE SIX SENTENCES THAT MAKE YOU SOUND SENIOR

Deploy one per design question. Each is a genuine insight, not a slogan.

1. **"Is that p50 or p99, and is it time-to-first-token or full completion?"** — asked *before* designing.
2. **"Generation owns most of the latency budget. Optimising retrieval past a point is optimising the wrong term."**
3. **"Every stage after retrieval must be optional under timeout — I degrade rather than fail."**
4. **"The vector index is a derived, disposable artifact. Object storage holds the source of truth, so any index change is a rebuild, not a migration."**
5. **"I'd measure retrieval and generation separately, because 'the answer was wrong' has two completely different root causes and one fix each."**
6. **"You can't prevent prompt injection, so I design for containment — least privilege and no single agent holding private data, untrusted input, and an outbound channel at once."**

---
*Next: `RAPID_FIRE_RAG_LLM.md` — 35 spoken answers at 20–40 seconds each, with the follow-up probe for every one.*
