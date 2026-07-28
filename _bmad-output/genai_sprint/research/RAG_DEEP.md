# RAG — DEEP DIVE

**Study budget: 2.5 hrs** | **Priority order: §2 chunking → §7 evaluation → §8 failure modes → the rest.** Evaluation is the seniority separator: most candidates can describe a pipeline, almost none can describe how they'd know it works.

---

## §1. THE PIPELINE — THE 60-SECOND WHITEBOARD

Draw two lanes. Interviewers reward candidates who separate **offline** from **online** unprompted, because it's the difference between having built one and having read about one.

```
OFFLINE / INGEST (batch, minutes–hours, runs on document change)
  Source → Parse → Clean → CHUNK → Enrich (metadata, context) → EMBED → INDEX
                                                                   ↘ BM25/keyword index

ONLINE / QUERY (per request, target < 2s end-to-end)
  Query → [Rewrite / expand / route] → EMBED
        → RETRIEVE (dense top-k ∥ sparse top-k) → FUSE
        → RERANK (cross-encoder, top-k → top-n)
        → ASSEMBLE CONTEXT (dedupe, order, budget)
        → GENERATE (with citations) → [Verify / guardrail] → Stream
```

**Say the framing line:** "The offline lane determines the *ceiling* on quality — if the right answer isn't in a well-formed chunk, no amount of clever retrieval recovers it. The online lane determines how close you get to that ceiling. Most teams over-invest in the online lane."

**Stage-by-stage, one line each:**

| Stage | Decision that matters | Most common mistake |
|---|---|---|
| Parse | PDF/table/image extraction quality | Treating PDF text extraction as solved. Tables become word soup. |
| Chunk | Size, overlap, boundary strategy | Fixed-size character splitting that cuts mid-sentence and mid-table |
| Enrich | Metadata for filtering + contextual prefix | No metadata → can't filter by tenant/date/permission |
| Embed | Model choice, **same model for query and doc** | Re-indexing with a new embedding model and forgetting to re-embed everything |
| Index | HNSW/IVF/flat, metric, filters | Metric mismatch between index and query |
| Retrieve | k, hybrid weighting, filters | k too small; dense-only |
| Rerank | Cross-encoder, top-n | Skipping it — biggest single quality win per unit effort |
| Assemble | Order, dedupe, token budget | Ignoring "lost in the middle"; stuffing 20 chunks |
| Generate | Temperature 0, citation format, abstain instruction | No permission to say "I don't know" |

---

## §2. CHUNKING — WHERE MOST RAG SYSTEMS ARE ACTUALLY LOST

**Frame it as a tension, not a setting:** "Chunk size trades **retrieval precision** against **generation context**. Small chunks embed into a tight, specific vector — great for matching — but hand the model a fragment with no context. Large chunks preserve context but their embedding is an average of several topics, so it matches everything weakly and nothing strongly. That averaging effect is the core problem."

### The strategies, and when each wins

| Strategy | How | Wins when | Loses when |
|---|---|---|---|
| **Fixed-size** (by token) | Split every N tokens with overlap | Homogeneous prose; you need a fast baseline | Cuts mid-sentence, mid-table, mid-code-block |
| **Recursive character** | Try separators in priority order: `\n\n` → `\n` → `. ` → ` ` | **The right default.** Respects natural boundaries, falls back gracefully | Still blind to document semantics |
| **Document-structure-aware** | Split on Markdown headers, HTML tags, code AST, PDF sections | **Structured corpora — the usual enterprise case.** Headers become metadata *and* retrievable context | Requires reliable parsing; garbage-in from bad PDFs |
| **Semantic** | Embed sentences, cut where consecutive-sentence similarity drops | Unstructured narrative where topics shift without markup | Expensive (embed everything twice); often not better than recursive |
| **Contextual (LLM-augmented)** | Prepend an LLM-written 1–2 sentence "where this sits in the document" blurb before embedding | **Best measured results.** Anthropic reports top-20 retrieval failure down **35%** with contextual embeddings, **49%** with contextual BM25 too, **67%** adding reranking | LLM call per chunk at index time — cost. Prompt caching makes it viable. |

**The sizing answer (give a range with reasoning, never a bare number):**
> "I start at **512 tokens with ~10–15% overlap** and treat it as a hypothesis, not a setting. Then I tune against a retrieval eval set, because the right size depends on the corpus: dense technical docs and code want smaller, narrative and policy documents want larger. The hard constraint is the embedding model's max input — chunks past it get **silently truncated**, and that's invisible until you measure recall."

**On overlap:** "Overlap exists so a fact straddling a boundary appears whole in at least one chunk. The cost is index bloat and duplicate results, so I dedupe post-retrieval. 10–20% is the usual band; heavy overlap is a smell that the boundary strategy is wrong."

**The move that resolves the tension — say this, it's the senior answer:**
> "The real fix is to **decouple the unit you search from the unit you read**. Embed small for precision, return large for context. That's small-to-big / parent-document retrieval: index child chunks, but hand the parent to the LLM. Sentence-window retrieval is the same idea — index single sentences, return the sentence plus its neighbours. Once you do that, chunk size stops being a painful compromise."

Prove it to yourself: `BREAKABLE_EXPERIMENTS.md` Exp 1 and Exp 3.

---

## §3. VECTOR DATABASES — SELECTION CRITERIA, NOT A FEATURE TABLE

**Open by rejecting the feature comparison:** "I'd choose on four axes — **scale, filtering needs, operational burden, and what's already in the stack** — not on feature lists, because at typical enterprise scale most of them work."

| | What it actually is | Pick it when | Don't when |
|---|---|---|---|
| **FAISS** | A **library**, not a database. Meta's ANN toolkit. No persistence, no filtering, no server, no updates without rebuild | Research, benchmarking, embedded/offline, or as the engine inside your own service | You need CRUD, metadata filters, multi-tenancy, or an ops story |
| **Chroma** | Dev-first embedded/server vector store | Prototyping, small corpora, local demos, notebooks | Production at scale or heavy concurrency |
| **pgvector** | Postgres extension. HNSW + IVFFlat, six distance operators (`<->` L2, `<=>` cosine, `<#>` inner product, plus L1/Hamming/Jaccard) | **You already run Postgres and are under ~10M vectors.** One database, real transactions, joins between vectors and business rows, existing backup/DR/RBAC — the enterprise-friendly answer | You exceed **2,000 dimensions** (limit for standard `vector`) or need very high-QPS ANN at 100M+ scale |
| **Pinecone** | Managed, serverless | You want zero ops and predictable scaling, and can accept vendor lock-in + per-query pricing | Data residency/on-prem is mandatory (common in Indian BFSI/gov work — say this) |
| **Weaviate** | Open-source, GraphQL, built-in hybrid search + module ecosystem | You want native hybrid (BM25 + dense) and self-hosting | You want minimal moving parts |
| **Qdrant / Milvus** | Rust / distributed C++ purpose-built engines | Strong metadata filtering (Qdrant), or billion-scale distributed (Milvus) | Small corpus — overkill |
| **Elasticsearch / OpenSearch** | Mature search engine with vector support | You already run it and want lexical + vector in one place | You need best-in-class pure ANN |

**The line that ends the question:**
> "For most enterprise RAG under ~10M vectors, **pgvector is the boring correct answer** — you inherit backups, RBAC, transactions, and a team that already knows how to run it. I'd only take on a dedicated vector database when I can name the specific thing Postgres can't do for me: dimensionality above 2,000, sustained high-QPS ANN at 100M+ vectors, or distributed sharding I don't want to build."

**Probe: "How would you migrate?"** → "Embeddings are the expensive artefact, not the store. I'd persist raw text + metadata + vectors in object storage as the source of truth so any index is rebuildable, and treat the vector DB as a **derived, disposable** index. Then migration is a re-index, not a data migration."

**Probe: "Metadata filtering — pre or post?"** → "**Pre-filter** restricts the candidate set before ANN search — correct results, but it can wreck HNSW graph connectivity and degrade to brute force on a narrow filter. **Post-filter** searches then filters — fast, but if your filter is selective you can retrieve 100 and keep 2. Good engines do filtered-HNSW with the filter evaluated during traversal. For **multi-tenancy I'd prefer physical separation — namespace or partition per tenant** — over relying on a filter, because a filter bug is a cross-tenant data leak."

---

## §4. INDEXING: FLAT vs IVF vs HNSW

The framing: **ANN trades recall for latency and memory. You choose where on that curve to sit.**

| | Mechanism | Recall | Latency | Memory | Build |
|---|---|---|---|---|---|
| **Flat (brute force)** | Compare query to every vector | **100% — exact** | O(N), linear | Vectors only | Instant |
| **IVF** | k-means partitions into `nlist` cells; search `nprobe` nearest cells | Tunable, ~0.7–0.95 | Fast | Modest | Needs a **training pass** on sample data |
| **HNSW** | Multi-layer proximity graph; greedy descent from sparse top layer to dense bottom | **Highest, ~0.95+** | **Fastest** | **Highest — graph edges cost significant extra RAM** | Slowest to build |

**Say:** "HNSW is a hierarchical navigable small-world graph — a skip-list generalised to vector space. Upper layers are sparse for long jumps, lower layers dense for fine search, giving **logarithmic-scaling** search (Malkov & Yashunin). It's the default in pgvector, Qdrant, Weaviate, and Elasticsearch for good reason: best recall-vs-latency. You pay in memory and build time."

**Knobs to name:**
- HNSW: `M` (edges per node — higher = better recall, more memory), `ef_construction` (build quality), `ef_search` (**runtime** recall/latency dial — the one you tune in prod without re-indexing).
- IVF: `nlist` (number of cells), `nprobe` (**runtime** recall/latency dial).
- **Product Quantization (PQ)** — orthogonal, composable: compress each vector into sub-quantized codes. `IVF-PQ` / `HNSW-PQ` cut memory dramatically at a recall cost. This is how you fit 100M+ vectors in RAM.

**The decision rule to state:**
> "Under ~50k vectors, use **flat** — it's exact and fast enough, and ANN is premature optimisation. Up to tens of millions, **HNSW** if the RAM fits. Beyond that, or when RAM is the binding constraint, **IVF-PQ or HNSW-PQ**, and then I'd hold recall fixed and measure the memory saving rather than the other way round."

**The trap most candidates fall into:** treating ANN recall as free. Say: "ANN recall loss is silent — you don't get an error, you get a slightly worse answer. So I'd always keep a small **flat/exact ground-truth index over a sample** and measure ANN recall against it as a monitored metric, not a one-time benchmark."

---

## §5. HYBRID SEARCH, RERANKING, MMR

### Hybrid = dense + sparse

**Why:** "Dense embeddings capture meaning but are weak exactly where enterprise queries live: **exact identifiers, error codes, part numbers, acronyms, rare proper nouns, negation, dates**. BM25 nails those and is useless on paraphrase. They fail in complementary ways, so combining them beats either."

**Concrete:** query `ORA-01555` — a dense retriever returns "documents about Oracle errors"; BM25 returns *that error*. Use a real example like this; it lands far better than the abstract claim.

**BM25 in one line:** "TF-IDF with term-frequency saturation and document-length normalisation."

**How to fuse — know both:**
- **Reciprocal Rank Fusion (RRF):** `score = Σ 1/(k + rank_i)`, k typically 60. **Rank-based, so no score normalisation needed** — this is why it's the practical default. Dense cosine scores and BM25 scores live on incomparable scales.
- **Weighted score fusion:** normalise both, `α·dense + (1−α)·sparse`. Tunable, but the normalisation is fragile across query types.

Say: "I default to RRF because it sidesteps the score-normalisation problem entirely."

### Reranking with cross-encoders — the biggest quality-per-effort win

**The mechanism, stated precisely:**
> "Retrieval uses a **bi-encoder**: query and document are embedded *independently*, so document vectors can be precomputed and searched at scale — but the model never sees the query and document together, so it can't reason about their interaction. A **cross-encoder** takes the concatenated pair as one input and outputs a relevance score with full cross-attention between them. Far more accurate, and far too slow to run over a corpus — it's O(N) model forward passes."

**So the pattern is two-stage:** "Retrieve **top-50 to top-100** cheaply with the bi-encoder for **recall**, then rerank down to **top-3 to top-5** with the cross-encoder for **precision**. Recall first, precision second — you can't rerank a document you never retrieved."

That last sentence is the whole architecture. Anthropic's numbers back it: adding reranking took retrieval failure from 2.9% → **1.9%**.

**Options:** Cohere Rerank (managed, 100+ languages, `top_n` parameter), open-source `bge-reranker` / `mxbai-rerank`, or a listwise LLM reranker (best quality, worst latency). Note **ColBERT / late interaction** as the middle ground — token-level embeddings, cheaper than a cross-encoder, better than a bi-encoder.

**Cost honesty:** "Reranking adds a model call on the critical path — typically tens to low hundreds of ms for a hosted reranker on 50 candidates. In a 2-second budget that's affordable; I'd cap candidates and set an aggressive timeout with fallback to unreranked order."

### MMR — Maximal Marginal Relevance

**What:** "Pure top-k similarity returns **near-duplicates** — five chunks of the same paragraph, because they're all similar to the query and to each other. MMR greedily selects each next document to maximise `λ·relevance(q,d) − (1−λ)·max similarity(d, already-selected)`. λ=1 is pure relevance, λ=0 is pure diversity; ~0.5–0.7 in practice."

**When it matters:** near-duplicate corpora (versioned docs, boilerplate contracts, repeated policy text) and multi-aspect questions needing coverage rather than depth. **Say this diagnosis:** "If my context window is full and the answer still isn't in it, redundancy is usually why — MMR is the fix, and it's cheap."

---

## §6. ADVANCED RAG VARIANTS

Know the **problem each one solves**. Listing names without problems reads as flashcard knowledge.

| Variant | Problem it solves | Mechanism | Cost |
|---|---|---|---|
| **HyDE** (*Precise Zero-Shot Dense Retrieval without Relevance Labels*) | **Asymmetry** — a short question and a long answer-document don't look alike in embedding space | LLM writes a *hypothetical answer* to the query, embed **that** instead of the query, retrieve real docs near it. The encoder's "dense bottleneck" filters out the hallucinated specifics | +1 LLM call before retrieval (latency) |
| **Query rewriting / decomposition** | Conversational queries ("what about the second one?"), multi-hop questions | Rewrite to standalone; split compound questions into sub-queries; retrieve per sub-query | +1 LLM call; parallelisable |
| **Parent-document / small-to-big** | Chunk-size tension (§2) | Index small children, return the large parent | Storage only — **no latency cost. Best effort-to-value ratio here.** |
| **Sentence-window** | Same, finer grained | Index single sentences, return sentence ± k neighbours | Negligible |
| **Auto-merging** | Fragmented retrieval | Hierarchical chunks; if enough siblings retrieved, return the merged parent | Index complexity |
| **Contextual retrieval** (Anthropic) | Chunks lose document context | LLM prepends a situating blurb before embedding | LLM call per chunk at index time; mitigate with prompt caching |
| **CRAG** (Corrective RAG) | **Retrieval returns garbage and the system proceeds anyway** | A lightweight **evaluator** grades retrieved docs → confident / ambiguous / wrong. On wrong, **fall back to web search**; a decompose-then-recompose step strips irrelevant text | Evaluator call + conditional fallback |
| **Self-RAG** | Retrieving when unnecessary; not checking own output | Model trained to emit **reflection tokens** — decides *whether* to retrieve, then critiques relevance and its own support. Reported to beat ChatGPT and retrieval-augmented Llama2-chat on open-domain QA and fact verification | Requires a specially trained model |
| **GraphRAG** (Microsoft) | **"What are the main themes across this corpus?"** — global questions no single chunk answers | Extract entities/relations → **Leiden** hierarchical clustering into communities → LLM writes bottom-up **community summaries**. **Global search** answers over summaries; **local search** starts at an entity and fans out to neighbours | Expensive indexing (many LLM calls). Justify it only for global/thematic questions |
| **Agentic RAG** | Fixed one-shot pipelines can't adapt | LLM as controller: choose the source, retrieve, judge sufficiency, re-query, loop | Unbounded latency and cost. **Always bound the loop.** |

**The synthesis line to deliver:**
> "I'd read these as three families. **Query-side** — HyDE, rewriting, decomposition — fix the query being a bad search key. **Index-side** — small-to-big, contextual retrieval, GraphRAG — fix the chunk being a bad retrieval unit. **Control-flow** — CRAG, Self-RAG, agentic — add a feedback loop so the system can notice retrieval failed. I'd reach for index-side first because it's the cheapest at inference time, and control-flow last because it's the one that costs you your latency budget."

That taxonomy is the answer that separates you. Almost nobody organises these.

---

## §7. EVALUATION — THE SENIORITY SEPARATOR

**Open with the decomposition. This is the point.**
> "The first thing I do is stop evaluating 'the RAG system' and evaluate **two systems**: retrieval and generation. If the answer is wrong, I need to know whether the right chunk wasn't retrieved, or was retrieved and ignored. Those have completely different fixes, and a single end-to-end score can't distinguish them."

### Retrieval metrics (does the right context arrive?)

- **Context Recall** — of the information needed to answer, how much is present in retrieved context. **The ceiling metric.** If recall is low, nothing downstream can save you.
- **Context Precision** — are the relevant chunks ranked high (signal-to-noise). Low precision → the model gets distracted; this is what reranking fixes.
- **Hit Rate @ k / Recall @ k** — is a relevant doc in the top k. The cheap, fast dial for tuning k.
- **MRR / NDCG** — rank-sensitive classical IR metrics. Name them to show IR grounding.

### Generation metrics (is the answer good given that context?)

- **Faithfulness / Groundedness** — is every claim supported by the retrieved context. **The anti-hallucination metric.** Typically: decompose the answer into atomic claims, check each against context, score = supported/total.
- **Answer Relevance / Response Relevancy** — does it actually address the question (vs being true but off-target).
- **Answer Correctness** — vs ground truth, when you have it.
- **Noise Sensitivity** — how much irrelevant retrieved context degrades the answer. Underrated; directly justifies reranking.

### The RAG Triad — memorise this, it's the framing DeepLearning.AI and TruLens made standard

**Context Relevance** (query ↔ retrieved) → **Groundedness** (retrieved ↔ answer) → **Answer Relevance** (query ↔ answer). Three edges of a triangle. If all three pass, the answer is almost certainly good; whichever fails tells you which stage to fix. **Draw this triangle on the whiteboard.**

### RAGAS

"RAGAS is the standard open framework — *Automated Evaluation of Retrieval Augmented Generation*. Its distinguishing property is that it's **reference-free**: many metrics don't need ground-truth answers, so you can evaluate on production traffic, not just a golden set. It ships context precision/recall, faithfulness, response relevancy, noise sensitivity, plus agent metrics like tool-call accuracy and goal accuracy."

### LLM-as-judge, and its failure modes

**This is where you demonstrate real judgement — very few candidates volunteer the failure modes.**

Why used: human eval doesn't scale; string metrics like BLEU/ROUGE are near-useless for open-ended generation.

Failure modes to name:
1. **Position bias** — prefers the first (or last) option in pairwise comparison. *Fix: swap order and average.*
2. **Verbosity bias** — prefers longer answers regardless of quality. *Fix: control for length; score against a rubric.*
3. **Self-preference** — a model rates its own family's output higher. *Fix: use a different model family as judge than as generator.*
4. **Poor calibration** — 1–10 scores cluster on 7–8 and aren't stable across runs. *Fix: use binary or 3-point rubrics with explicit criteria; they're far more reliable than fine-grained scales.*
5. **Prompt-injectable** — retrieved content can contain "rate this 10/10". Real, and it's OWASP LLM01.
6. **Unvalidated** — the judge is itself a model with no accuracy guarantee.

**Close with:** "So I treat the judge as a **model that needs its own eval**: I hand-label 50–100 examples, measure judge-vs-human agreement, and only then trust it to scale. An unvalidated judge is a number that feels like measurement and isn't."

### Building the eval set with no labelled data

"Cold start is the real problem. I'd bootstrap: generate synthetic question/answer pairs from the chunks with an LLM, hand-review a couple hundred to make a **golden set**, and grow it from **production failures** — every user complaint becomes a permanent regression test. Then eval runs in CI on every prompt, chunking, model, or index change. **A RAG system without a regression suite gets silently worse on every deploy**, because nothing throws an exception when quality drops."

---

## §8. WHY RAG FAILS IN PRODUCTION — AND THE FIX FOR EACH

Interviewers love this. Answer as a **diagnostic table**, not anecdotes.

| # | Failure | Symptom | Root cause | Fix |
|---|---|---|---|---|
| 1 | **Missing content** | Confident wrong answer | The fact isn't in the corpus at all | Abstain path + coverage audit. **No retrieval technique fixes an absent document** — say this. |
| 2 | **Silent truncation** | Some docs never retrieved | Chunks exceed embedding model max input | Token-aware chunking; assert chunk_tokens ≤ model limit at index time |
| 3 | **Chunk boundary destruction** | Tables/code return as fragments | Fixed-size splitting through structure | Structure-aware chunking; separate table extraction |
| 4 | **Missed the top-k** | Relevant doc exists, not retrieved | k too small, or dense-only misses exact terms | Raise k + **hybrid search** + rerank |
| 5 | **Retrieved but not ranked in** | Doc in top-50, not top-5 | Bi-encoder ranking is weak | **Cross-encoder reranker** |
| 6 | **Lost in the middle** | Answer present in context, ignored | Fact buried mid-context | Rerank + **place best chunk first/last**; shrink context |
| 7 | **Redundancy** | Context full of the same paragraph | Near-duplicate corpus | **MMR** + dedupe by hash/similarity |
| 8 | **Stale index** | Answers from last quarter's policy | No incremental re-index on document change | CDC/event-driven re-index; TTL; **surface `last_updated` in the citation** |
| 9 | **Query–document asymmetry** | Short questions retrieve badly | Question ≠ answer in embedding space | **HyDE**, query rewriting, or an instruction-tuned asymmetric embedding model |
| 10 | **Conversational context loss** | "What about the second one?" retrieves nothing | Follow-up embedded without history | **Query rewriting to standalone** before retrieval |
| 11 | **Wrong-format extraction** | Numbers/tables wrong | PDF parsing mangled layout | Layout-aware parsing; store tables as structured rows, not prose |
| 12 | **No access control** | User sees another tenant's data | Filtering applied after retrieval, or not at all | **Pre-filter by permission at query time; prefer per-tenant namespaces.** The one failure that ends a contract. |
| 13 | **Ignores context** | Contradicts the source | Weak prompt, model prior overrides context | Explicit "answer only from context"; citation requirement; faithfulness eval |
| 14 | **Won't abstain** | Fabricates when nothing relevant found | No permission or threshold to refuse | Score threshold → "insufficient information"; make abstention an allowed output |
| 15 | **Silent quality regression** | Gradual complaints, no alert | No eval in CI; embedding model or LLM version changed | Golden set in CI + production monitoring on the RAG triad |

**Closing line for this section:** "If I inherited a RAG system with quality complaints, my first move isn't tuning anything — it's **instrumenting the split**: measure context recall and faithfulness separately on a 100-question golden set. That one measurement tells me whether I'm fixing retrieval or fixing generation, and it takes an afternoon."

---

## §9. RESOURCES — VERIFIED, TIME-BUDGETED

All fetched and confirmed live 27 Jul 2026.

### Tier 1 — do these (≈2.0 hrs, highest value)

| Resource | Time | Why |
|---|---|---|
| [Introducing Contextual Retrieval — Anthropic](https://www.anthropic.com/news/contextual-retrieval) | **25 min** | The single best short practitioner writeup on RAG. Real ablation numbers (35% / 49% / 67% failure reduction), covers chunking, hybrid, reranking in one piece. **Quote these numbers in the interview.** |
| [Building and Evaluating Advanced RAG — DeepLearning.AI (Jerry Liu, Anupam Datta)](https://www.deeplearning.ai/short-courses/building-evaluating-advanced-rag/) | **2 hr 5 min** | Sentence-window + auto-merging retrieval **and the RAG Triad** with code. Directly covers §6 and §7 — the two hardest sections. If you do one course, do this one. |
| [Chunking Strategies — Pinecone](https://www.pinecone.io/learn/chunking-strategies/) | **20 min** | Fixed / content-aware / structure / semantic / contextual, with size guidance and the chunk-expansion trick. Maps 1:1 to §2. |
| [RAGAS — Available Metrics docs](https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/) | **20 min** | Official metric definitions. Skim all names, read context precision/recall + faithfulness + noise sensitivity closely. |
| **`BREAKABLE_EXPERIMENTS.md` Exp 1, 2, 3** | **45 min** | Chunk size wrecking retrieval; counter-intuitive similarity; confident nonsense from bad chunks. **Highest retention per minute in this whole sprint.** |

### Tier 2 — strong second pass (≈1.5 hrs)

| Resource | Time | Why |
|---|---|---|
| [Advanced Retrieval for AI with Chroma — DeepLearning.AI (Anton Troynikov)](https://www.deeplearning.ai/short-courses/advanced-retrieval-for-ai/) | **1 hr 2 min** | Query expansion, **cross-encoder reranking**, embedding adapters, and explicitly *when vector search fails*. Covers §5. |
| [Vector Indexes — Pinecone (FAISS series)](https://www.pinecone.io/learn/series/faiss/vector-indexes/) | **30 min** | Flat vs LSH vs IVF vs HNSW with concrete recall/speed/memory numbers. Covers §4. |
| [Building Applications with Vector Databases — DeepLearning.AI (Tim Tully)](https://www.deeplearning.ai/short-courses/building-applications-vector-databases/) | **1 hr 23 min** | Six applied builds including hybrid search. Good if vector DBs still feel abstract. |

### Tier 3 — papers, abstract + method section only

| Paper | Time | Read for |
|---|---|---|
| [HyDE — Precise Zero-Shot Dense Retrieval](https://arxiv.org/abs/2212.10496) | 12 min | The asymmetry insight and the "dense bottleneck filters hallucinated details" argument |
| [CRAG — Corrective RAG](https://arxiv.org/abs/2401.15884) | 12 min | Retrieval evaluator + web-search fallback + decompose-then-recompose |
| [Self-RAG](https://arxiv.org/abs/2310.11511) | 12 min | Reflection tokens; adaptive retrieve-or-not |
| [HNSW — Malkov & Yashunin](https://arxiv.org/abs/1603.09320) | 12 min | Multi-layer proximity graph, logarithmic scaling claim |
| [RAGAS paper](https://arxiv.org/abs/2309.15217) | 10 min | The reference-free evaluation argument |
| [GraphRAG docs — Microsoft](https://microsoft.github.io/graphrag/) | 15 min | Leiden communities, bottom-up summaries, global vs local vs DRIFT search |
| [pgvector README](https://github.com/pgvector/pgvector) | 15 min | HNSW/IVFFlat, six distance operators, the 2,000-dim limit |

**Excluded on purpose:** "Top 10 Vector Databases 2026" comparison posts and RAG listicles. They're vendor-influenced and teach feature tables instead of selection criteria — which is exactly the wrong instinct in an interview.

---

## §10. THE 45-SECOND RAG PIPELINE ANSWER (rehearse verbatim)

> "RAG has two lanes. **Offline**, I parse documents, chunk them — structure-aware, roughly 512 tokens with light overlap, and I'd index small chunks but return their parents so I don't have to trade retrieval precision against generation context. I embed those, and I build both a vector index — HNSW — and a BM25 index.
>
> **Online**, I rewrite the query to be standalone if it's conversational, run dense and sparse retrieval in parallel for maybe the top 50, fuse with reciprocal rank fusion, then rerank down to the top 3–5 with a cross-encoder. That two-stage shape is deliberate: **recall first, precision second.** I assemble the context with the strongest chunk first because of the lost-in-the-middle effect, generate at temperature zero with a citation requirement and explicit permission to say 'I don't know'.
>
> And I'd measure retrieval and generation **separately** — context recall and precision on one side, faithfulness and answer relevance on the other — because when the answer is wrong I need to know whether the chunk wasn't retrieved or was retrieved and ignored. Those are different bugs."

---
*Next: `GENAI_SYSTEM_DESIGN.md` — the four recurring design prompts, with bottlenecks and the probes that follow.*
