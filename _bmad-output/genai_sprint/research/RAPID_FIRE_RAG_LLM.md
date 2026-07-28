# RAPID FIRE — RAG & LLM (35 Q&A)

**Study budget: 1.0 hr for a first pass, then 15 min/day out loud.**

**How to drill this:** cover the answer, say yours **out loud and timed**, then compare. Target **20–40 seconds**. If you run past 45s you are lecturing — the interviewer stops listening and starts waiting. If you finish under 15s you sounded thin.

**Answer shape for every question:** `[Direct answer] → [Mechanism / why] → [One concrete consequence]`. Then stop. The silence invites the follow-up, and the follow-up is where you win.

Each item lists the **probe** the interviewer will use next. Prepare the probe answer too — that's where most candidates fall apart.

---

## A. LLM FUNDAMENTALS

**Q1. What is tokenization and why should an engineer care?**
> Models don't see text, they see token IDs from a fixed sub-word vocabulary, usually built with byte-pair encoding — start from bytes, greedily merge the most frequent adjacent pairs. Rule of thumb, about four characters per token in English, so a thousand tokens is roughly 750 words. It matters for three practical reasons: billing is per token, so non-English text literally costs more for the same meaning; character-level tasks like counting letters fail because the model never sees characters; and chunking has to be token-aware, because a chunk that exceeds the embedding model's limit gets silently truncated with no error.
*Probe: "Which of those have you actually hit?" → the silent truncation one; it's invisible until you measure recall.*

**Q2. Why does a bigger context window not remove the need for RAG?**
> Four reasons. Cost — you pay for every token on every call. Latency — prefill scales with input length, and attention is quadratic. Accuracy — the Lost in the Middle result shows models degrade on facts placed mid-context. And scale — ten million documents don't fit in any window. Long context makes retrieval more forgiving; it doesn't replace it.
*Probe: "So when does long context win?" → when the whole relevant corpus is small and the question genuinely needs everything at once, like reasoning over one long contract.*

**Q3. What's an embedding, and why cosine similarity?**
> A fixed-length dense vector where geometric closeness approximates semantic relatedness. Cosine measures the angle only, ignoring magnitude — and magnitude in text embeddings mostly tracks document length and token frequency, which aren't relevance. So cosine strips the thing you don't want to rank on. Worth adding: for normalised vectors, cosine, dot product and L2 all rank identically, so in practice the choice matters more for unnormalised vectors and for performance.
*Probe: "Then why do vector DBs offer dot product?" → it's a single fused op on pre-normalised vectors, so it's what ANN indexes actually run.*

**Q4. What does temperature do, mechanically?**
> It divides the logits by T before the softmax. Below one it sharpens the distribution toward deterministic; above one it flattens it toward random; at zero it's effectively greedy decoding. The important distinction is that temperature **reshapes** the distribution while top-k and top-p **truncate** it — that's why they're complementary.
*Probe: "Does temperature zero stop hallucination?" → No. It removes variance, not error. A confidently wrong model at zero is wrong reproducibly.*

**Q5. Top-k vs top-p?**
> Top-k keeps the k highest-probability tokens and renormalises — a fixed cap. Top-p, nucleus sampling, keeps the smallest set whose cumulative probability exceeds p — so it adapts. When the model is confident the nucleus is narrow; when it's uncertain the nucleus widens. That adaptivity is why top-p is generally preferred; fixed k lets junk in on sharp distributions and cuts good candidates on flat ones.
*Probe: "What do you set for a RAG answer?" → temperature 0, top-p 1. Determinism makes the system evaluable.*

**Q6. Explain attention to me like I'm an engineer, not a researcher.**
> Every token emits a query, a key, and a value. The query is what I'm looking for, keys are what each token offers, values are what it would contribute. You dot the query against all keys, softmax to get weights, and take the weighted sum of the values. The consequence is that any two tokens are **one hop apart** instead of N sequential steps, and the whole thing is a couple of large matrix multiplies — which parallelise on GPUs. That's the two things RNNs couldn't do.
*Probe: "Why divide by root d_k?" → dot products grow with dimension; without it the softmax saturates and gradients vanish. Numerical stability.*

**Q7. Encoder-only vs decoder-only — and which does RAG use?**
> Encoder-only models like BERT use bidirectional attention and are trained with masked language modelling — best for representing text, so embedding models and cross-encoder rerankers are encoder-style. Decoder-only models use causal masking so they can't see future tokens, trained on next-token prediction — required for generation. RAG uses **both**: an encoder to embed and rerank, a decoder to generate. Bidirectional context is better for representing; causal masking is required for generating.
*Probe: "Why can't the generator do the embedding?" → causal masking means each token only sees its prefix, so pooled representations are weaker than a bidirectional encoder's.*

**Q8. Why do LLMs hallucinate?**
> Because the training objective maximises the likelihood of the next token — it optimises **plausibility, never truth**. There's no truth term anywhere in the loss. So when the model lacks a fact it has no "no result" state to fall into; it emits the most plausible continuation. A fabricated citation looks identical to a real one to the loss function. RLHF makes it worse by rewarding confident, complete-sounding answers. It's the objective working as designed, not a bug that got in.
*Probe: "Why are fabrications so specific?" → interpolation. The model smooths between things it partially learned, so fake DOIs are correctly formatted and fake API methods follow the library's naming conventions.*

**Q9. Intrinsic vs extrinsic hallucination?**
> Intrinsic contradicts the provided source — in RAG that's the model ignoring the context you gave it. Extrinsic is unsupported by the source; it might even be true, just not grounded. That maps directly onto faithfulness as a metric, and it's why faithfulness and correctness are separate: an answer can be perfectly faithful to a retrieved chunk that is itself out of date.
*Probe: "Which is worse?" → intrinsic in a regulated domain, because you gave it the right answer and it still got it wrong — that's a system you can't trust even with perfect retrieval.*

**Q10. Fine-tuning vs RAG vs prompt engineering — pick one.**
> They fix different failures, so first I diagnose: is this a **knowledge gap** or a **behaviour gap**? Knowledge gap — private, fresh, or changing data — that's RAG, because fine-tuning teaches form better than fact and goes stale the day the data changes. Behaviour gap — wrong format, tone, or domain idiom — start with prompting and few-shot, and only fine-tune if that plateaus and you have consistent labelled examples. And the two decisive enterprise arguments for RAG: it gives you **citations** and **per-user access control**, and a fine-tuned model gives you neither. In production they compose — RAG for facts, a light fine-tune for format.
*Probe: "Why not fine-tune on the documents?" → can't cite, can't update incrementally, can't scope by permission, and the model interpolates between half-memorised facts, which manufactures confident hallucinations.*

**Q11. What is LoRA and why is it popular?**
> Full fine-tuning updates every weight, so you store a whole new model per task. LoRA freezes the base and injects a pair of low-rank matrices next to the attention weights — the update is approximated as B times A, with an inner rank like 8 or 16. The paper reports up to a ten-thousand-fold reduction in trainable parameters and about three times less GPU memory versus full fine-tuning of GPT-3. Two consequences that matter in production: adapters merge back into the weights so there's **zero inference latency penalty**, and adapters are megabytes, so you serve one base model with many hot-swappable adapters — one per client.
*Probe: "What's r and how do you pick it?" → the inner rank, i.e. the capacity of the update. Start low, raise if underfitting; higher r overfits on small datasets.*

**Q12. QLoRA in one line?**
> Quantize the frozen base model to 4-bit NF4, then train LoRA adapters on top in higher precision — plus double quantization and paged optimizers. It fine-tunes a 65B model on a single 48GB GPU while matching 16-bit fine-tuning quality. It's what made fine-tuning possible without a cluster.

**Q13. Quantization — what's the tradeoff?**
> Store weights at lower precision to cut memory and increase throughput; LLM inference is usually memory-bandwidth-bound, so moving fewer bytes per token directly buys speed. Roughly: a 7B model is 14 GB at FP16, 7 at INT8, 3.5 at 4-bit. 8-bit is close to lossless; 4-bit is a real but often acceptable drop — and importantly it's **not uniform**, it hurts reasoning and long-tail recall more than fluency. So the model can sound fine and be measurably worse, which means you re-run the task eval, not a benchmark.
*Probe: "PTQ vs QAT?" → post-training is fast and needs no retraining; quantization-aware training is better quality and much more expensive. Start with PTQ.*

---

## B. RAG CORE

**Q14. Walk me through a RAG pipeline.**
> Two lanes. Offline: parse, chunk, enrich with metadata, embed, and build both a vector index and a keyword index. Online: rewrite the query to standalone if it's conversational, run dense and sparse retrieval in parallel, fuse with reciprocal rank fusion, rerank with a cross-encoder down to the top three to five, assemble context with the strongest chunk first, and generate at temperature zero with citations. The framing I'd add is that the **offline lane sets the ceiling** — if the answer isn't in a well-formed chunk, nothing online recovers it — and most teams over-invest in the online lane.

**Q15. How do you choose chunk size?**
> It's a tension, not a setting: small chunks embed tightly so they match precisely but hand the model a fragment; large chunks keep context but their embedding averages several topics, so it matches everything weakly. I start at about 512 tokens with 10–15% overlap and tune against a retrieval eval set. But the real answer is to stop trading off — **decouple the unit you search from the unit you read**. Index small children, return the parent. Once you do that, chunk size stops hurting.
*Probe: "What's the overlap for?" → so a fact straddling a boundary appears whole somewhere. Heavy overlap is a smell that the boundary strategy is wrong.*

**Q16. Which chunking strategy would you default to?**
> Recursive character splitting — try paragraph, then line, then sentence, then word — because it respects natural boundaries and degrades gracefully. For structured corpora, which is most enterprise content, I'd go document-structure-aware and split on headers, keeping the header as both metadata and retrievable text. The highest-measured-value option is contextual chunking: have an LLM prepend a one-or-two-sentence blurb situating each chunk in its document. Anthropic measured that at a 35% reduction in retrieval failure, 49% with BM25 added, 67% with reranking on top.

**Q17. Dense vs sparse retrieval — why hybrid?**
> Dense embeddings capture meaning but are weak exactly where enterprise queries live: exact identifiers, error codes, part numbers, acronyms, negation and dates. BM25 nails those and is useless on paraphrase. Concretely, query "ORA-01555" — dense gives you documents *about* Oracle errors, BM25 gives you *that* error. They fail in complementary ways, so fusing them beats either.
*Probe: "How do you combine the scores?" → reciprocal rank fusion, because it's rank-based and sidesteps the fact that cosine scores and BM25 scores are on incomparable scales.*

**Q18. Why rerank? Isn't the vector search already ranking?**
> Retrieval uses a bi-encoder — query and document embedded independently, which is what makes it scalable, but the model never sees them together so it can't reason about their interaction. A cross-encoder takes the pair as one input with full cross-attention and scores relevance directly. Far more accurate, far too slow to run over a corpus. So it's two-stage: retrieve top-50 cheaply for **recall**, rerank to top-5 for **precision**. You can't rerank a document you never retrieved — recall first, precision second.
*Probe: "What does it cost?" → a model call on the critical path, tens to low hundreds of ms on 50 candidates. I'd cap candidates and set a timeout that falls back to fusion order.*

**Q19. What is MMR and when do you need it?**
> Maximal Marginal Relevance. Pure top-k returns near-duplicates — five chunks of the same paragraph, because they're all similar to the query and to each other. MMR greedily picks each next document to maximise relevance minus similarity to what's already selected, with a lambda controlling the balance. The diagnosis to watch for: if the context window is full and the answer still isn't in it, redundancy is usually why.

**Q20. What is HyDE and what problem does it solve?**
> Asymmetry. A short question and a long answer-document don't look alike in embedding space, so the query is a poor search key. HyDE has the LLM write a *hypothetical answer* first, embeds that, and retrieves real documents near it. The elegant part is that hallucinated specifics don't hurt — the encoder's dense bottleneck filters them out, and you're grounding on the retrieved real documents anyway.
*Probe: "The cost?" → an extra LLM call before retrieval, so it's a latency trade. I'd cache aggressively or use a small model.*

**Q21. CRAG vs Self-RAG?**
> Both add a feedback loop. CRAG bolts a lightweight **evaluator** onto retrieval that grades the retrieved documents as correct, ambiguous, or wrong — and on wrong it falls back to web search, plus a decompose-then-recompose step that strips irrelevant text. It works with any existing RAG stack. Self-RAG goes deeper: the model itself is trained to emit **reflection tokens**, so it decides *whether* to retrieve at all and then critiques its own output's support. CRAG is the one I can bolt on; Self-RAG needs a specially trained model.

**Q22. When would you use GraphRAG?**
> When the question is **global** rather than local — "what are the main themes across this corpus", "how do these entities relate" — which no single chunk can answer, so vector retrieval structurally can't work. GraphRAG extracts entities and relations, clusters them into hierarchical communities with Leiden, and has an LLM write bottom-up community summaries; global search answers over those summaries, local search starts at an entity and fans out. The cost is heavy — many LLM calls at index time — so I'd only justify it if global questions are a real part of the workload.

**Q23. How do you organise all the advanced RAG variants?**
> Three families. **Query-side** — HyDE, rewriting, decomposition — fix the query being a bad search key. **Index-side** — small-to-big, contextual retrieval, GraphRAG — fix the chunk being a bad retrieval unit. **Control-flow** — CRAG, Self-RAG, agentic — add a feedback loop so the system notices retrieval failed. I reach for index-side first because it costs nothing at inference time, and control-flow last because it spends my latency budget.

**Q24. HNSW vs IVF vs flat?**
> Flat is brute force — exact, 100% recall, linear time; correct under about 50 thousand vectors, where ANN is premature optimisation. IVF clusters into cells and probes the nearest few — modest memory, needs a training pass, recall tunable via nprobe. HNSW is a multi-layer proximity graph, essentially a skip list in vector space, giving logarithmic-scaling search — best recall-versus-latency, which is why it's the default nearly everywhere, but the graph edges cost real memory and it's slow to build. Beyond what fits in RAM, add product quantization.
*Probe: "How do you tune HNSW in production?" → ef_search. It's the runtime recall/latency dial and doesn't require re-indexing, unlike M or ef_construction.*

**Q25. Which vector database, and why?**
> I'd choose on scale, filtering needs, operational burden, and what's already in the stack — not on feature lists. For most enterprise RAG under about ten million vectors, **pgvector is the boring correct answer**: you inherit backups, RBAC, transactions, and a team that already knows how to run it, and you can join vectors to business rows. I'd only take a dedicated vector DB when I can name the specific thing Postgres can't do — dimensions above 2,000, sustained high-QPS ANN at a hundred million-plus, or distributed sharding I don't want to build. And FAISS isn't a database at all, it's a library — no persistence, no filtering, no updates without a rebuild.
*Probe: "Migration risk?" → low, because the vector index is a derived artifact. I keep text, metadata and vectors in object storage as the source of truth, so migrating is a re-index, not a data migration.*

**Q26. How do you handle multi-tenancy in a vector store?**
> Physical separation — a namespace or partition per tenant — in preference to filtering, because a filter bug is a cross-tenant data leak, and that's the one failure that ends a contract. Where I do filter, it's applied **pre-retrieval** and derived from the caller's auth token, never from the request body. And I'd note that pre-filtering can degrade HNSW to near-brute-force on a narrow filter, so it's a performance consideration too, not just a security one.

---

## C. EVALUATION & PRODUCTION

**Q27. How do you evaluate a RAG system?**
> The first thing I do is stop evaluating "the RAG system" and evaluate two: **retrieval and generation separately**. On retrieval, context recall — is the needed information present at all, that's the ceiling — and context precision, is it ranked high. On generation, faithfulness — is every claim supported by the context — and answer relevance. Because when an answer is wrong, I need to know whether the chunk wasn't retrieved or was retrieved and ignored. Those are completely different bugs with completely different fixes, and one end-to-end score can't tell them apart.

**Q28. What's the RAG Triad?**
> Three edges of a triangle: **context relevance** between query and retrieved chunks, **groundedness** between retrieved chunks and the answer, and **answer relevance** between query and answer. If all three pass, the answer is almost certainly good; whichever one fails tells you which stage to fix. It's the fastest diagnostic framing I know, and it's what TruLens and the DeepLearning.AI advanced RAG course standardised.

**Q29. What is RAGAS?**
> The standard open framework for RAG evaluation. Its distinguishing property is being **reference-free** — many of its metrics don't need ground-truth answers, so you can evaluate on live production traffic and not just a golden set. It ships context precision and recall, faithfulness, response relevancy, noise sensitivity, and agent metrics like tool-call accuracy and goal accuracy.

**Q30. LLM-as-judge — what are its failure modes?**
> Position bias, where it prefers whichever option came first — fix by swapping order and averaging. Verbosity bias, preferring longer answers regardless of quality. Self-preference, rating its own model family higher — so use a different family as judge than as generator. Poor calibration, where 1-to-10 scores cluster on 7 and 8 and aren't stable, so binary or three-point rubrics are far more reliable. And it's prompt-injectable through retrieved content. So I treat the judge as **a model that needs its own eval**: hand-label 50 to 100 examples, measure judge-versus-human agreement, and only then trust it to scale. An unvalidated judge is a number that feels like measurement and isn't.

**Q31. You have no labelled data. How do you build an eval set?**
> Bootstrap it. Generate synthetic question-answer pairs from the chunks with an LLM, hand-review a couple hundred into a golden set, then grow it from **production failures** — every user complaint becomes a permanent regression test. Then it runs in CI on every prompt, chunking, model, or index change. Without that, a RAG system gets silently worse on every deploy, because nothing throws an exception when quality drops.

**Q32. Name the top failure modes of production RAG.**
> Missing content — the fact isn't in the corpus, and no retrieval technique fixes an absent document. Silent chunk truncation past the embedding model's limit. Retrieved but not ranked into the top-k, which reranking fixes. Lost in the middle, where the answer is in the context and the model ignores it. Redundancy filling the window. Stale index. Query-document asymmetry on short questions. Conversational context loss on follow-ups. And the worst one, missing access control, where a user sees another tenant's data.
*Probe: "You inherit a RAG system with quality complaints — first move?" → Not tuning anything. Instrument the split: context recall and faithfulness on a 100-question golden set. That one measurement tells me whether I'm fixing retrieval or generation, and it takes an afternoon.*

**Q33. Design a RAG system over 10M documents at sub-2-second latency — where's the bottleneck?**
> First, the math: ten million docs at twenty chunks each is two hundred million chunks, which at 1024 dimensions is around 800 GB raw — so compression or sharding is forced, not chosen. I'd compress first with product quantization plus full-precision rescoring, because sharding buys a tail-latency problem. But the real answer is that **generation dominates the budget**, not retrieval — retrieval and reranking are maybe 400 milliseconds, prefill to first token is 500 to 800. So sub-two-seconds only means anything if we're measuring **time to first token with streaming**. If it's full completion, the fix isn't retrieval at all, it's a shorter answer or a faster model.
*Probe: "How do you protect p99?" → every stage after retrieval is optional under timeout. Rerank times out, I return fusion order. I degrade, I don't fail.*

**Q34. How do you cache in a RAG system, and what breaks?**
> Three layers. Embeddings, cached forever keyed by content hash plus model version, since they're deterministic. Exact prompt cache, cheap but low hit rate. And semantic cache, keyed on query embedding above a similarity threshold — much higher hit rate and the biggest single cost win, because real traffic is repetitive. What breaks is semantic caching in exactly the place embeddings are weak: negation and numbers. "Is X covered" and "is X **not** covered" can sit above a 0.95 threshold. So: a high threshold, tenant and permissions **inside the cache key**, TTL tied to index freshness, and never cache permission-scoped answers across users.

**Q35. Can you prevent prompt injection?**
> No, and I'd say so plainly — it's an open problem, because instructions and data share one channel, and you can't solve it with more AI. So I design for **containment rather than prevention**: least privilege on tools, no irreversible action without human confirmation, treat all model output as untrusted input downstream, and avoid the lethal trifecta — private data access, exposure to untrusted content, and an outbound communication channel — in the same agent. Break any one of those three and exfiltration stops being possible. Delimiters alone demonstrably don't work.

---

## D. THE FIVE THAT MOST OFTEN GO WRONG — DRILL THESE HARDEST

If you're short on time, these five are the ones where a weak answer costs the most:

1. **Q10** — fine-tune vs RAG vs prompting. *Highest probability question in the interview.*
2. **Q33** — the 10M-doc design. *Rehearse the napkin math until it's automatic.*
3. **Q27** — evaluation. *This is the seniority separator; almost nobody splits retrieval from generation unprompted.*
4. **Q18** — bi-encoder vs cross-encoder. *Tests whether you've built or only read.*
5. **Q8** — hallucination mechanism. *Everyone defines it; almost nobody explains the objective.*

---

## E. THE THREE THINGS TO SAY WHEN YOU DON'T KNOW

Never bluff — a GenAI interviewer will catch it, and it costs more than the answer was worth.

1. **"I haven't used that in production, but here's how I'd reason about it —"** then reason from the mechanism. Reasoning visibly from first principles scores better than a memorised answer.
2. **"I know the shape of that but not the numbers — what I'd do is measure it."** Naming the measurement is the engineering answer.
3. **"That's the part I'd want to validate before committing to it."** Calibrated uncertainty reads as senior; false confidence reads as junior. This is doubly true in GenAI, where confident wrongness is literally the failure mode you're being hired to prevent.

---
*Companion files: `LLM_FUNDAMENTALS.md`, `RAG_DEEP.md`, `GENAI_SYSTEM_DESIGN.md`, `BREAKABLE_EXPERIMENTS.md`.*
