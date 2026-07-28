# LLM FUNDAMENTALS — TCS Gen AI Engineer, 01 Aug 2026

**Owner:** Devang | **Study budget for this file: 2.0 hrs** | **Priority: read §1 (decision framework) FIRST — it is the highest-probability question in the interview.**

How to use this: the **bolded one-liners are what you say out loud**. The prose under them is what you say if probed. Do not memorise the prose; memorise the one-liners and the numbers.

---

## §1. FINE-TUNING vs RAG vs PROMPT ENGINEERING — THE DECISION FRAMEWORK

This is the near-certain question. Answer it in this shape: **taxonomy → decision rule → tradeoff table → "in my experience".**

### The one-sentence taxonomy (say this first)

> "They solve three different problems. Prompt engineering changes **how the model uses what it already knows**. RAG changes **what the model knows at inference time**. Fine-tuning changes **what the model is** — its behaviour, format, and style. So the first question I ask isn't 'which is better', it's 'is my failure a knowledge failure or a behaviour failure?'"

That distinction — **knowledge gap vs behaviour gap** — is the whole framework. Interviewers grade on whether you have it.

### The decision rule (memorise this ladder)

```
Start: model output is wrong. Diagnose the failure.
│
├─ Wrong because the model DOESN'T KNOW the fact?
│   (private data, post-cutoff data, org-specific data, data that changes)
│   → RAG.  Fine-tuning will NOT reliably fix this — it teaches
│     form better than it teaches fact, and it goes stale the
│     day your data changes.
│
├─ Wrong because the model KNOWS but MISBEHAVES?
│   (wrong tone, wrong format, ignores schema, too verbose,
│    doesn't follow domain conventions, wrong classification style)
│   → Prompt engineering first (few-shot + structured output).
│     Fine-tune ONLY if prompting plateaus AND you have
│     ~1k+ good labelled examples AND the behaviour is stable.
│
├─ Wrong because it's TOO SLOW or TOO EXPENSIVE at the quality you have?
│   → Distil / fine-tune a small model on the big model's outputs.
│     This is the legitimate cost-driven reason to fine-tune:
│     you're buying back the tokens your long prompt was spending.
│
└─ Wrong because it needs to DO things (query a DB, call an API)?
    → Tool use / agent, not any of the three.
```

**Escalation order in practice: prompt → prompt + few-shot → RAG → RAG + prompt tuning → fine-tune.** Always cheapest-and-most-reversible first. Say that phrase — "cheapest and most reversible first" — it signals engineering judgement, not paper knowledge.

### The tradeoff table (know the shape, not exact figures)

| | Prompt engineering | RAG | Fine-tuning (PEFT/LoRA) |
|---|---|---|---|
| **Fixes** | Behaviour, format, reasoning style | Knowledge, freshness, provenance | Behaviour, style, domain idiom, cost/latency via smaller model |
| **Time to first result** | Minutes | Days | Weeks (data collection dominates) |
| **Upfront cost** | ~0 | Engineering + infra (embed + vector store) | GPU + labelling; LoRA makes GPU cheap, labelling stays expensive |
| **Marginal cost per query** | Higher — long prompts are tokens you pay for **every call** | Higher — retrieved context inflates input tokens | Lower — knowledge is in weights, prompt gets short |
| **Latency** | Prompt length adds prefill time | +retrieval hop (typically tens to low hundreds of ms) | Fastest at inference; no extra hop |
| **Update a fact** | Edit prompt, instant | Re-index one document, minutes | Retrain. This is the killer. |
| **Provenance / citation** | None | **Native — you can cite the source chunk** | None. Weights don't cite. |
| **Access control** | N/A | **Natural — filter by user permissions at retrieval** | **Impossible — a fine-tuned model can leak to anyone who queries it** |
| **Hallucination** | Reduces somewhat | Reduces most (grounding) | Can *increase* if you fine-tune on facts it half-learns |
| **Maintenance burden** | Prompt sprawl, regression on model upgrade | Pipeline + index freshness + eval | Retrain cadence, versioning, model-upgrade lock-in |

### The three lines that win this question

1. **"Fine-tuning teaches form, RAG supplies facts."** Compress the whole thing.
2. **"RAG gives me citations and per-user access control. Fine-tuning gives me neither — a fine-tuned model can't tell you where it learned something and can't un-learn it for one user."** This is the enterprise-grade answer TCS wants.
3. **"They compose."** The mature production answer is RAG *for* knowledge + light fine-tune *for* the domain's output format. Not either/or. Say this if asked "which would you pick" — refusing the false binary reads as senior.

### Follow-up probes you will get

- *"Why not just fine-tune on the documents?"* → Because you can't cite, can't update incrementally, can't enforce per-user access, and the model interpolates between facts it partially memorised — which is exactly how you manufacture confident hallucinations. Fine-tuning on facts is the classic mistake.
- *"Context windows are 200k+ now. Why RAG at all?"* → Four reasons: **cost** (you pay for every token every call), **latency** (prefill scales with input), **"lost in the middle"** (Liu et al., TACL 2023 — accuracy dips for facts placed mid-context), and **corpus size** (10M documents don't fit in any window). Long context is a *complement* to retrieval, not a replacement — it lets you retrieve more generously, not stop retrieving.
- *"When would you actually fine-tune?"* → Three real cases: (a) a rigid output format prompting can't hold, (b) a domain idiom/tone that's expensive to describe but cheap to demonstrate, (c) distilling a big model into a small one to cut cost/latency at fixed quality.
- *"How much data do you need?"* → Order of magnitude: hundreds of examples for LoRA-style style/format adaptation, thousands+ for real capability change. Quality and consistency beat volume — 500 clean, consistent examples beat 5,000 noisy ones.

---

## §2. TOKENIZATION

**Say:** "Models don't see characters or words — they see token IDs from a fixed vocabulary, usually built with byte-pair encoding. BPE starts from bytes and greedily merges the most frequent adjacent pairs until the vocab is full. Everything weird about LLMs traces back to this."

**Rules of thumb to have ready:**
- English: **~4 characters per token**, ~0.75 words per token → **1,000 tokens ≈ 750 words**.
- Code, JSON, and non-Latin scripts tokenize **much worse** — Hindi/Devanagari or Chinese can cost several times more tokens for the same meaning. Direct cost and context consequence for an Indian-market product.
- Whitespace matters: `" hello"` and `"hello"` are different tokens.

**Why an interviewer cares (the "so what"):**
- **Cost is billed per token, not per word** — and multilingual users cost more for the same content.
- **Character-level tasks fail** (counting letters, reversing strings, some arithmetic) because the model never sees characters.
- **Chunking must be token-aware.** If you chunk by characters and your embedding model caps at 512 tokens, some chunks silently truncate — you have indexed content that is invisible to retrieval and you will never see an error. This is the #1 silent RAG bug.

**Trap answer to avoid:** saying "tokens are words." Say "sub-word units."

---

## §3. CONTEXT WINDOWS — AND WHY LIMITS BITE

**Say:** "The context window is the maximum number of tokens across prompt plus output that the model can attend over in one call. Practically, it's shared budget: system prompt + retrieved chunks + chat history + the answer all compete for it."

Four ways it bites in production — this is the practitioner answer:

1. **Cost scales with input on every single call.** A 20k-token prompt used 100k times/day is a real budget line.
2. **Latency:** time-to-first-token is dominated by **prefill**, which grows with input length. Self-attention is O(n²) in sequence length, so doubling context more than doubles prefill work. Decode is then roughly linear per output token and memory-bandwidth-bound on the KV cache.
3. **"Lost in the middle"** (Liu et al., 2023): performance is highest when the relevant fact sits at the **start or end** of context and **degrades in the middle**. Engineering consequence: after reranking, **put the best chunk first or last, not buried**. Mentioning this specific paper is a strong seniority signal.
4. **Multi-turn eviction:** long chats silently drop the earliest turns (or a summariser rewrites them), so the model "forgets" a constraint the user set 30 turns ago. Fix: pin critical state outside the transcript and re-inject it.

**KV cache** is worth one sentence: "Generated tokens cache their keys and values so each new token doesn't recompute attention over the whole prefix. That's why the *first* token is slow and the rest stream fast — and why KV cache size, not parameters, often dominates serving memory at long context."

---

## §4. EMBEDDINGS

**Say:** "An embedding is a fixed-length dense vector where geometric closeness approximates semantic relatedness. We embed the query and the documents into the same space and retrieve nearest neighbours."

### Similarity metrics — and why cosine

- **Cosine similarity** = the cosine of the angle; measures **direction only**, ignores magnitude. Range −1 to 1 (in practice most text embedding models produce mostly positive values).
- **Dot product** = cosine × both magnitudes; direction *and* magnitude.
- **Euclidean (L2)** = straight-line distance.

**Why cosine is the default — the real answer:** vector magnitude in text embeddings correlates with things you don't want to rank on, chiefly **document length and token frequency**. A long document isn't more relevant for being long. Cosine strips magnitude out and keeps only the semantic direction.

**The senior addendum:** "For **normalised** vectors — which most modern embedding APIs return — cosine, dot product, and L2 rank identically, because they're monotonic transforms of one another. So the choice mostly matters for unnormalised vectors, and it matters for *performance*: dot product on pre-normalised vectors is a single fused operation and is what ANN indexes actually run." Saying this shows you've implemented, not just read.

**Trap:** never mix metrics — if you index with cosine and query with L2 on unnormalised vectors, retrieval quietly degrades with no error.

### Dimensionality

- Typical: 384 (small/fast), 768, 1024, 1536, 3072.
- Higher dims → more expressive, but **linearly more memory and slower search**. 10M vectors × 1536 dims × 4 bytes ≈ **61 GB raw** — that's an architecture decision, not a detail. Compute this out loud in system design; it lands.
- **Matryoshka embeddings** (used by OpenAI's v3 models and others) are trained so prefixes of the vector remain useful — you can truncate 3072 → 512 and lose modest quality. Great "I'd cut memory 6× before I'd shard" answer.
- pgvector caps standard `vector` at **2,000 dimensions** (4,000 for half-precision) — a concrete constraint worth naming if you propose Postgres.

### The thing people get wrong

**Semantic similarity ≠ relevance.** "How do I cancel my subscription?" and "How do I renew my subscription?" are extremely close in embedding space and opposite in intent. Embeddings capture **topical** similarity; they are weak on negation, numbers, dates, IDs, and exact codes. This is the entire argument for hybrid search and reranking — see `RAG_DEEP.md` §5, and *see it break* in `BREAKABLE_EXPERIMENTS.md` Exp 2.

---

## §5. SAMPLING: TEMPERATURE, TOP-P, TOP-K

The model's final layer emits **logits** over the whole vocabulary → softmax → probability distribution → sample one token → repeat. All three knobs modify that distribution or restrict the candidate set.

| Knob | What it does mechanically | Effect | Where it fails |
|---|---|---|---|
| **Temperature T** | Divides logits by T *before* softmax | T<1 sharpens (more deterministic), T>1 flattens (more random), T→0 ≈ greedy | High T eventually samples incoherent tokens; T=0 loops and repeats |
| **Top-k** | Keeps the k highest-probability tokens, renormalises | Hard cap on candidates | **Fixed k doesn't adapt.** On a sharp distribution it lets in junk; on a flat one it cuts good options |
| **Top-p (nucleus)** | Keeps the smallest set whose cumulative probability ≥ p | **Adaptive** — narrow when the model is confident, wide when it isn't | Still degenerates into repetition in long generations |

**The key clarification most candidates miss — say this:** "Temperature **reshapes** the distribution; top-k and top-p **truncate** it. That's why they're complementary and why tuning both at once is confusing — I usually fix top-p at 1.0 and move temperature, or fix temperature at 1.0 and move top-p, rather than both."

**Practical settings to state with confidence:**
- Extraction, classification, structured JSON, SQL generation, **RAG answers**: **temperature 0** (or near). Determinism and reproducibility beat variety; it also makes evaluation possible.
- Creative writing, brainstorming, synthetic data generation: 0.7–1.0.
- **Temperature 0 is not fully deterministic in practice** — batched GPU floating-point reduction order varies, and MoE routing can shift with batch composition. Saying this is a genuine practitioner tell.
- **Temperature does not reduce hallucination.** It reduces *variance*. A confidently wrong model at T=0 is wrong every time, reproducibly. Great trap to defuse before they set it.

---

## §6. TRANSFORMERS — AT ENGINEER DEPTH

Do not attempt researcher depth. Deliver this ~60-second structure.

**1. The problem with RNNs.** "RNNs process tokens sequentially, so training can't parallelise across the sequence, and information from token 1 has to survive hundreds of sequential steps to influence token 500 — gradients vanish. LSTMs mitigated it, didn't solve it."

**2. What attention does.** "Self-attention lets every token look directly at every other token in one step. Each token emits a **query**, a **key**, and a **value**. The query is 'what am I looking for', keys are 'what do I offer', values are 'what I'd contribute'. You dot the query against all keys, softmax to get weights, and take the weighted sum of values. So the path length between any two tokens is **one hop instead of N**, and the whole thing is a couple of big matmuls — which GPUs love."

**3. Why the √d_k scaling.** "Dot products of high-dimensional vectors grow with dimension; without dividing by √d_k the softmax saturates and gradients vanish. It's a numerical-stability fix." One line, high credibility.

**4. Multi-head.** "Instead of one attention function, run several in parallel on projected subspaces. Different heads specialise — some track syntax, some track coreference. It's ensembling inside the layer."

**5. Positional encoding.** "Attention is permutation-invariant — it has no inherent notion of order — so position must be injected. Original paper used sinusoidal; modern models mostly use **RoPE** (rotary), which encodes *relative* position and extrapolates better to longer sequences."

**6. Encoder vs decoder — the part interviewers actually probe.**

| | Encoder-only | Decoder-only | Encoder–decoder |
|---|---|---|---|
| Attention | **Bidirectional** | **Causal / masked** (can't see future) | Bidirectional encode, causal decode + cross-attention |
| Objective | Masked LM | Next-token prediction | Seq2seq |
| Examples | BERT, most **embedding models** | GPT, Llama, Claude, Mistral | T5, BART |
| Use | Classification, **embeddings**, reranking | Generation | Translation, summarization |

**Tie it to your job:** "This is directly why RAG uses both: my embedding model and my cross-encoder reranker are encoder-style bidirectional models, and my generator is decoder-only. Bidirectional context is better for *representing* text; causal masking is required for *generating* it." That sentence connects two sections of the interview and is worth rehearsing.

**7. Why it beat RNNs, in one line:** "Parallel training + constant path length between any two positions. It traded O(n) sequential steps for O(n²) parallel compute — and parallel compute is the thing we can buy."

**Cost caveat to volunteer:** "The catch is that self-attention is quadratic in sequence length, which is exactly why long context is expensive and why FlashAttention, sliding-window, and grouped-query attention exist."

---

## §7. HALLUCINATION — MECHANISM, NOT DEFINITION

Anyone can define it. Explain the **mechanism**:

> "An LLM is trained to maximise the likelihood of the next token given the prefix. It is optimising **plausibility**, never **truth** — there is no truth term anywhere in the objective. So when the model lacks the fact, it doesn't have a 'no result' state to fall into; it emits the most statistically plausible continuation. A fabricated citation looks exactly like a real citation to the loss function. Hallucination isn't a bug that got in — it's the objective working as designed."

**Contributing causes — name three:**
1. **Knowledge gaps:** the fact was never in training data, or appeared too rarely to be memorised (long tail), or is post-cutoff.
2. **Training incentives:** RLHF rewards helpful, confident, complete-sounding answers. Human raters reward confidence. We literally trained hedging out of the model.
3. **Interpolation:** the model smooths between things it partially learned — which is why fabricated content is so *specific*. Fake DOIs are correctly formatted. Fake API methods follow the library's naming conventions. That's interpolation in a learned manifold.

**Taxonomy that shows depth:**
- **Intrinsic** — contradicts the provided source. In RAG this is the model ignoring the context you gave it.
- **Extrinsic** — unsupported by the source; may even be true, but not grounded.

Say: "In RAG the metric for intrinsic hallucination is **faithfulness/groundedness**, and it's separate from correctness. A RAG answer can be perfectly faithful to a retrieved chunk that is itself out of date. Faithfulness measures the generator; correctness measures the whole system."

**Mitigation ladder (ordered — order is the point):**
1. **Ground it** — RAG with citations at sentence/claim level.
2. **Give it an exit** — explicitly instruct "if the context doesn't contain the answer, say you don't know." Models will not refuse unless permitted to.
3. **Constrain the output** — JSON schema / structured outputs eliminate an entire class of fabrication.
4. **Verify after** — NLI-style entailment check, or a second-pass LLM judge that checks each claim against the retrieved context.
5. **Abstain** — route to human or return "insufficient information" when retrieval scores are below threshold. **A system that can say "I don't know" is the single strongest safety feature you can name in an enterprise interview.**

---

## §8. PEFT / LoRA — CONVERSATIONAL LEVEL

**LoRA in one breath:** "Full fine-tuning updates every weight, so you store a whole new model per task. LoRA freezes the base weights and injects a pair of small low-rank matrices, A and B, next to the attention weights. The weight update ΔW is approximated as B·A, where the inner rank r is tiny — 8, 16, 64. You train only A and B. The paper reports up to a **10,000× reduction in trainable parameters and ~3× less GPU memory** vs full fine-tuning of GPT-3 175B."

**Why it works:** the intrinsic dimensionality of task adaptation is low — you don't need full-rank updates to specialise a model.

**Three consequences worth volunteering:**
1. **Zero inference latency penalty** — B·A can be merged back into W after training. Adapters are only separate at training time.
2. **Adapters are megabytes, not gigabytes** — so you can serve **one base model with many hot-swappable adapters**, one per client or per task. In a services company like TCS, that's *the* multi-tenant story. Say it.
3. **Key knobs:** `r` (capacity — higher r, more capacity, more overfit risk), `alpha` (scaling; effective scale is alpha/r), and which modules you target (attention projections are the usual choice).

**QLoRA in one line:** "Quantize the frozen base to **4-bit NF4**, then train LoRA adapters on top in higher precision. Adds double quantization and paged optimizers. The paper fine-tunes a **65B model on a single 48GB GPU** while matching 16-bit fine-tuning quality. It's what made fine-tuning accessible without a cluster."

**Also name-drop, briefly:** prefix/prompt tuning (learn soft prompt vectors, leave the model alone), adapters (bottleneck layers), and DoRA. Knowing LoRA is *one member of a PEFT family* is the seniority marker.

---

## §9. QUANTIZATION BASICS

**Say:** "Quantization stores weights (and sometimes activations) at lower numeric precision — FP16/BF16 → INT8 → 4-bit — to cut memory and increase throughput. LLM inference is usually **memory-bandwidth-bound**, not compute-bound, so moving fewer bytes per token directly buys speed."

**Napkin math to have ready — use it in system design:**
> "Roughly, params × bytes-per-param. A 7B model is ~14 GB at FP16, ~7 GB at INT8, ~3.5 GB at 4-bit. That's the difference between needing an A100 and fitting on a consumer GPU. Then add KV cache on top, which scales with batch size × context length."

**Distinctions that matter:**
- **PTQ (post-training quantization)** — quantize an already-trained model. Fast, no retraining. GPTQ, AWQ.
- **QAT (quantization-aware training)** — simulate quantization during training. Better quality, much more expensive.
- **Weight-only vs weight+activation** — weight-only (common for LLMs) is easier and safer; activations have outliers that wreck naive quantization.
- **NF4** — the information-theoretically motivated 4-bit type from QLoRA, designed for normally-distributed weights.

**The honest tradeoff:** "8-bit is usually near-lossless. 4-bit is a real but often acceptable quality drop, and it's **not uniform** — it hurts reasoning and long-tail factual recall more than it hurts fluency, so a model can *sound* fine and be measurably worse. I'd always re-run the task eval after quantizing rather than trusting a benchmark number."

---

## §10. RESOURCES — VERIFIED, TIME-BUDGETED

Every link below was fetched and confirmed live on 27 Jul 2026. Ordered by value-per-minute for a 4-day sprint.

### Tier 1 — do these (total ≈ 2.0 hrs)

| Resource | Time | Why |
|---|---|---|
| [The Illustrated Transformer — Jay Alammar](https://jalammar.github.io/illustrated-transformer/) | **20 min** | The canonical visual explanation of Q/K/V, multi-head, positional encoding. Used in Stanford/MIT/CMU courses. Gets you to §6 depth by itself. |
| [How to generate text — Hugging Face blog](https://huggingface.co/blog/how-to-generate) | **20 min** | Greedy / beam / temperature / top-k / top-p with the **failure mode of each**. Directly maps to §5. |
| [Lost in the Middle (Liu et al., TACL 2023)](https://arxiv.org/abs/2307.03172) | **15 min** (abstract + figures) | One citation that makes your context-window answer sound senior. Read abstract + the position-vs-accuracy curve. |
| [LoRA paper (Hu et al.)](https://arxiv.org/abs/2106.09685) | **15 min** (abstract + §4) | Source of the 10,000× / 3× numbers. Quote them. |
| [QLoRA paper (Dettmers et al.)](https://arxiv.org/abs/2305.14314) | **10 min** (abstract) | NF4, double quantization, paged optimizers, 65B on one 48GB GPU. |
| [HF Generation strategies docs](https://huggingface.co/docs/transformers/en/generation_strategies) | **15 min** | Official, code-level. Reinforces §5 with the actual API surface. |
| **`BREAKABLE_EXPERIMENTS.md` Exp 1 + 2** | **25 min** | Tokenizer surprises and embedding counter-intuition, run locally. Retention >> reading. |

### Tier 2 — if time allows (pick one, ~1.2 hrs)

| Resource | Time | Why |
|---|---|---|
| [Finetuning Large Language Models — DeepLearning.AI (Sharon Zhou)](https://www.deeplearning.ai/short-courses/finetuning-large-language-models/) | **1 hr 35 min** | 9 lessons, 6 code examples. Explicitly covers *finetuning vs prompt engineering* — i.e. §1, with code. |
| [Quantization Fundamentals — DeepLearning.AI (HF: Belkada, Sun)](https://www.deeplearning.ai/short-courses/quantization-fundamentals-with-hugging-face/) | **1 hr 14 min** | Linear quantization + BF16 downcasting, hands-on. Covers §9 properly. |
| [Let's build the GPT Tokenizer — Karpathy](https://www.youtube.com/watch?v=zduSFxRajkE) | **2 hr 13 min** | Definitive on tokenization. **Only if you have the time** — watch at 1.5× and stop at the BPE implementation (~first 50 min) for interview purposes. |

### Tier 3 — reference only, do not read cover-to-cover
- [Attention Is All You Need](https://arxiv.org/abs/1706.03762) — cite it, don't study it. Alammar's post is strictly better for interview prep.
- [OWASP Top 10 for LLM Applications](https://genai.owasp.org/llm-top-10/) — covered in `GENAI_SYSTEM_DESIGN.md` §4; skim the ten titles only.

**Explicitly excluded:** every "Top 20 LLM Interview Questions" listicle and Medium aggregator. They teach vocabulary without mechanism, and mechanism is what gets probed.

---

## §11. 90-SECOND SELF-CHECK BEFORE THE INTERVIEW

Answer out loud. If you stumble, re-read that section.

1. Failure is "model doesn't know our refund policy." RAG or fine-tune? Why? *(RAG — knowledge gap, needs citations, needs per-user access control, policy changes.)*
2. Why cosine and not dot product? *(Magnitude tracks length/frequency, not relevance. And on normalised vectors they rank identically.)*
3. What does temperature actually do to the logits? *(Divides them before softmax — reshapes, doesn't truncate.)*
4. Why did transformers beat RNNs? *(Parallel training + constant path length between any two tokens.)*
5. Why do models hallucinate? *(The objective maximises plausibility, never truth. No abstain state.)*
6. What is r in LoRA and why does zero inference latency follow? *(Inner rank of ΔW≈B·A; mergeable back into W.)*
7. A 7B model at 4-bit — how much memory for weights? *(~3.5 GB, plus KV cache.)*
8. Name the paper that says fact position in context matters. *(Lost in the Middle, Liu et al.)*

---
*Next: `RAG_DEEP.md` — the pipeline, chunking, vector DBs, indexing, advanced variants, evaluation, and production failure modes.*
