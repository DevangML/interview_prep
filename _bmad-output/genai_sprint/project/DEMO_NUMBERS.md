# DEMO NUMBERS — PermRAG

**Measured 28 Jul 2026 from this repo.** Every number below was produced by
`python -m permrag.cli eval` and `python -m permrag.cli ablate`, run from `project/`.
Nothing here is estimated. If asked "did you measure that?", the answer is yes, and you can rerun it.

**Corpus:** 16 documents, 5 departments (eng, fin, hr, legal, sec), 80 chunks, mean 54.6 tokens/chunk.
**Eval set:** 40 questions — 28 answerable, 12 that should be refused.
**Embeddings:** local sentence-transformers. **Retrieval:** hybrid dense + BM25 via RRF, top-k 5.

---

## 1. THE HEADLINE TABLE — pre vs post vs no ACL

This is the money slide. It is the measured answer to *"restricted vs unrestricted questions pre-retrieval."*

| ACL mode | leaked chunks | leaked queries | leakage rate | starved queries | starvation rate | precision@5 | abstain acc | p50 ms |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| **pre** (filter before ANN) | **0** | **0** | **0%** | **0** | **0%** | 0.714 | 0.975 | 4.41 |
| **post** (filter after ANN) | 0 | 0 | 0% | **22** | **55%** | 0.747 | 0.975 | 5.83 |
| **off** (no ACL) | **68** | **22** | **55%** | 0 | 0% | 0.671 | 0.700 | 5.55 |

**What each row means, in one sentence each:**

- **off** — 55% of queries returned content the user was not cleared to read. In an enterprise
  this is the failure that ends a contract, not a bug you fix next sprint.
- **post** — filtering after the vector search leaks nothing, but **starves 55% of queries**:
  the top-k was consumed by chunks the user cannot see, they get filtered out, and the user is
  left with an empty or thin context for a question they were fully entitled to ask.
- **pre** — filter the candidate set *before* the ANN search and you get **neither failure**:
  zero leakage and zero starvation, because top-k is drawn from the authorised set to begin with.

**The line to say out loud:** *"Post-filtering is secure and useless. Pre-filtering is secure and
useful. The cost is that your vector store has to support metadata filtering inside the search,
which is a selection criterion for the vector DB, not an afterthought."*

---

## 2. RETRIEVAL MIX — and the one where I was wrong

| variant | recall@5 | precision@5 | hit@5 | MRR | p50 ms |
|---|---:|---:|---:|---:|---:|
| dense only | 1.0 | 0.707 | 1.0 | 0.964 | 3.37 |
| dense + MMR | 1.0 | **0.429** | 1.0 | 0.958 | 3.50 |
| **hybrid (RRF)** ✅ | 1.0 | **0.714** | 1.0 | 0.964 | 3.48 |
| hybrid + MMR | 1.0 | 0.443 | 1.0 | 0.958 | 3.78 |

**MMR cut precision almost in half — 0.714 → 0.443.** It is off by default *because it was measured
and it lost*, not because it was skipped.

**Why:** MMR trades relevance for diversity. On a small, well-separated, department-partitioned
corpus there is no redundancy problem to solve, so diversity pressure only pulls in weaker chunks.
MMR earns its keep when the corpus has many near-duplicate passages. This one doesn't.

**This is your strongest credibility moment.** "I tried it, measured it, it hurt, I turned it off,
and here is the reason" is a senior answer. Volunteer it.

---

## 3. CHUNKING — structure-aware vs naive fixed windows

| strategy | chunk_tokens | n_chunks | mean tok | max tok | precision@5 | abstain acc |
|---|---:|---:|---:|---:|---:|---:|
| structure | 128 / 200 / 320 | 80 | 54.6 | 96 | **0.714** | 0.975 |
| fixed | 128 | 71 | 76.9 | 124 | 0.700 | 0.975 |
| fixed | 200 | 48 | 108.6 | 198 | **0.543** | 0.875 |
| fixed | 320 | 16 | 251.3 | 289 | **0.207** | 0.850 |

**Fixed-window chunking degrades hard as the window grows — precision 0.700 → 0.543 → 0.207.**
Structure-aware chunking is *flat* across every size, because it splits on document structure and
never produces a chunk larger than its natural section.

**The answer to "what chunk size did you use and why":**
> *"200 tokens with 30 overlap — but the honest answer is that with structure-aware chunking the
> size barely mattered: precision was identical from 80 to 512 tokens because sections are smaller
> than the cap anyway. What mattered was the strategy, not the number. When I forced naive fixed
> windows, precision fell from 0.71 to 0.21 at 320 tokens, because one chunk started spanning three
> unrelated policies and the embedding became an average of things nobody asked about."*

That answer is un-bluffable and it is the exact bluff-test the research warned about.

---

## 4. TOP-K SWEEP — the precision/recall tradeoff, measured

| top_k | recall | precision | hit | MRR |
|---:|---:|---:|---:|---:|
| 1 | 0.911 | **0.929** | 0.929 | 0.929 |
| 3 | 1.0 | 0.798 | 1.0 | 0.964 |
| **5** ✅ | 1.0 | 0.714 | 1.0 | 0.964 |
| 10 | 1.0 | **0.432** | 1.0 | 0.964 |

**k=3 is arguably the better operating point** — full recall at higher precision. k=5 was kept for
headroom on multi-hop questions. Say that; it shows you read your own table rather than defaulting.

At k=10 more than half the context is noise, which costs tokens, costs latency, and gives the
model more room to ground an answer in something irrelevant.

---

## 5. ABSTENTION — the guardrail, tuned

| threshold | correct abstain | correct answer | missed abstain | over-abstain | accuracy |
|---:|---:|---:|---:|---:|---:|
| 0.30 | 0/12 | 28/28 | 12 | 0 | 0.700 |
| 0.50 | 5/12 | 28/28 | 7 | 0 | 0.825 |
| 0.55 | 8/12 | 28/28 | 4 | 0 | 0.900 |
| **0.60** ✅ | **11/12** | **28/28** | 1 | 0 | **0.975** |
| 0.65 | 12/12 | 25/28 | 0 | 3 | 0.925 |
| 0.70 | 12/12 | 14/28 | 0 | 14 | 0.650 |

**0.60 is the knee of the curve.** Below it the system answers questions it has no grounds for.
Above it, it starts refusing questions it *could* have answered — at 0.70 it refuses half the
answerable set.

**The framing:** *"This is a hallucination guardrail with a tunable cost. The threshold is a
business decision, not a technical one — in a legal or medical context I'd push it to 0.65 and
accept the over-abstention, because a wrong confident answer costs more than a refusal."*

---

## 6. LATENCY

| | ms |
|---|---:|
| p50 | **8.01** |
| p95 | **17.71** |
| mean | 15.58 |

Retrieval only, local embeddings, no LLM generation call. Be explicit about that scope — quoting a
retrieval latency as if it were end-to-end is exactly the sloppiness an interviewer probes for.
End-to-end is dominated by the generation call, typically 100× this.

---

## 7. THE ONE FAILING CASE — lead with this

```
g15  ANSWERED WHEN IT SHOULD ABSTAIN   ['fin-expense-policy', 'sec-phishing-guidance']
```

**1 of 40. Abstention accuracy 0.975.**

The retrieved chunks were *topically* close enough to clear the 0.60 threshold, but did not
actually contain the answer. This is the classic RAG failure: **similarity is not sufficiency.**
A chunk can be about the right subject and still not answer the question.

**How you'd fix it, if asked:** add a second-stage groundedness check — a cross-encoder or an
LLM-as-judge pass asking "does this context actually contain the answer?" — instead of relying on
retrieval score alone as a proxy for answerability. That is a real, named next step, not a hedge.

**Say this unprompted.** A candidate who volunteers their failure case and its fix reads as
someone who has actually operated a system. A candidate whose project has no known failures reads
as someone who did not look.

---

## 8. THE EIGHT NUMBERS TO MEMORISE

If you remember nothing else from this file:

1. **55%** — leakage rate with no ACL
2. **55%** — starvation rate with post-filtering
3. **0 and 0** — leakage and starvation with pre-filtering
4. **0.714 → 0.443** — precision when MMR was enabled (measured, so it's off)
5. **0.71 → 0.21** — precision collapse with naive fixed 320-token chunks
6. **0.60** — abstention threshold, tuned to 0.975 accuracy
7. **1 of 40** — the failing case, and you know why
8. **16 docs / 80 chunks / 5 departments** — the honest scale of the corpus

**Never round these up. Never invent a ninth.** If asked something you didn't measure, say
"I didn't measure that" — it costs nothing and protects everything else you said.
