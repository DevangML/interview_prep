# PROJECT TALK TRACK — PermRAG

**Serves the single highest-frequency question: "Explain your project" (3/3 across every TCS source, opens every round).**

---

## 0. THE PROVENANCE RULE — read this first, it protects everything else

**This is a personal project you built recently to explore permission-aware retrieval.
It is NOT production work you shipped at ElasticRun. Never let it blur into that.**

Say, plainly and early: *"This is something I built myself over the last few days."*

Three reasons this is the right call, not just the ethical one:

1. **It cannot be verified as production work, and TCS runs background checks.** A claim that
   collapses under BGV takes every other true claim down with it.
2. **A recent self-built project is a *stronger* signal in your situation, not weaker.** You are
   between roles. "I spent that time building this" is the single best answer to what you've been
   doing — it is recovery evidence you can put on a screen.
3. **The IAM experience underneath it IS real production work.** That's where the credibility comes
   from. The project is the bridge; the shipped IAM system is the foundation. Keep them distinct
   and both stay strong.

**The clean formulation:**
> *"The permission model here comes from IAM work I actually shipped — RBAC and field-level
> permissions across five personas. The project is me porting that model onto retrieval to see
> whether it held up. It did, and it produced some numbers I didn't expect."*

---

## 1. THE 90-SECOND VERSION

Use when asked "tell me about a project" early in the TR.

> "I built a RAG system called PermRAG that applies the access-control filter **before** the vector
> search rather than after it.
>
> The problem: in an enterprise, two people asking the same question should get different answers,
> because they're cleared to see different documents. Most RAG tutorials retrieve first and filter
> afterwards. That's secure, but I measured it and it starves 55% of legitimate queries — the top-k
> gets consumed by chunks the user can't see, they get stripped out, and the user ends up with
> nothing for a question they were entitled to ask.
>
> Filtering before the search fixes both failure modes. Zero leakage, zero starvation. With no ACL
> at all, 55% of queries leaked restricted content.
>
> The reason I went at this particular problem is that I've shipped IAM systems — RBAC, field-level
> permissions across five personas, approval workflows. This is that same permission model applied
> to retrieval instead of to a UI.
>
> It's 16 documents across 5 departments, 80 chunks, hybrid dense-plus-BM25 retrieval, a LangGraph
> flow with an abstention gate, and a 40-question eval set. Small corpus, but everything is measured
> — I can show you the ablation table."

**Then stop and let them ask.** The table is the hook; don't spend it all at once.

---

## 2. THE WHITEBOARD — draw this, don't recite it

Research says RAG must be **drawable, not recitable** (3/3 sources). Practise until it takes 60 seconds.

```
              ┌──────────────┐
   documents ─┤  chunking    │  structure-aware, ~200 tok, 30 overlap
              └──────┬───────┘
                     ▼
              ┌──────────────┐
              │  embedding   │  local sentence-transformers
              └──────┬───────┘
                     ▼
              ┌──────────────────────────────┐
              │  vector index + ACL metadata │  each chunk tagged with dept
              └──────┬───────────────────────┘
                     │
   user + principal ─┤
                     ▼
        ╔════════════════════════╗
        ║  ★ ACL FILTER (PRE)    ║  ◄── the whole point
        ║  restrict candidate set║
        ╚══════════┬═════════════╝
                   ▼
              ┌──────────────┐
              │ hybrid search│  dense + BM25, fused with RRF
              └──────┬───────┘
                     ▼
              ┌──────────────┐
              │  top-k = 5   │
              └──────┬───────┘
                     ▼
        ╔════════════════════════╗
        ║  ABSTENTION GATE 0.60  ║  ◄── hallucination guardrail
        ╚══════════┬═════════════╝
                   ├─ below → "I don't have grounds to answer that"
                   ▼
              ┌──────────────┐
              │  generation  │
              └──────────────┘
```

**While drawing, narrate the two starred boxes.** Those are the parts that aren't in a tutorial.

---

## 3. THE 5-MINUTE DEEP VERSION — the four beats

**Beat 1 — the problem is organisational, not technical.**
Same question, two people, different correct answers. HR can see compensation bands; engineering
cannot. RAG tutorials assume one flat corpus and one user. Enterprises are never that.

**Beat 2 — three designs, and I measured all three.**
Walk the headline table from `DEMO_NUMBERS.md`. No ACL: 55% leakage. Post-filter: no leakage but
55% starvation. Pre-filter: neither. **Land the line — "post-filtering is secure and useless;
pre-filtering is secure and useful."**

**Beat 3 — what that costs you.**
Pre-filtering means your vector store must support metadata filtering *inside* the ANN search.
That's a vector-DB selection criterion, not an implementation detail — and it's why "which vector
DB" is a real architectural question rather than a preference. Some support it natively; with
others you end up maintaining per-principal partitions, which trades index size for query speed.

**Beat 4 — where it's weak, volunteered.**
16 documents is a toy corpus. The ACL model is department-level, not row-level or
attribute-based. One eval case out of 40 still fails. And I haven't load-tested it — the latency
numbers are retrieval-only, not end-to-end.

**Beat 4 is the one that makes beats 1-3 believable.** Do not skip it to look stronger.

---

## 4. THE THREE ANSWERS THAT WIN THE ROOM

**"What chunk size did you use and why?"** *(the named bluff-test)*
> "200 tokens, 30 overlap — but the honest answer is the size barely mattered. With structure-aware
> chunking, precision was identical from 80 to 512 tokens, because sections are smaller than the cap
> anyway. What mattered was the strategy. When I forced naive fixed windows, precision fell from
> 0.71 to 0.21 at 320 tokens, because chunks started spanning three unrelated policies and the
> embedding became an average of things nobody asked about."

**"Did you use reranking / MMR?"**
> "I tried MMR and turned it off, because it cut precision from 0.71 to 0.44. MMR trades relevance
> for diversity, and on a department-partitioned corpus with no near-duplicates there's no
> redundancy to solve — so it just pulled in weaker chunks. It'd earn its place on a corpus with
> lots of near-identical passages. Mine isn't that."

**"How do you know it works?"**
> "40-question eval set, 28 answerable and 12 that should be refused. Recall@5 is 1.0, precision@5
> 0.714, MRR 0.96. Abstention accuracy 0.975 — one case out of 40 answers when it should refuse.
> The retrieved chunks were topically close enough to clear the threshold but didn't contain the
> answer. That's the classic failure: **similarity isn't sufficiency.** The fix is a groundedness
> check — a cross-encoder or LLM-as-judge second pass — rather than trusting retrieval score as a
> proxy for answerability."

---

## 5. "WHAT WOULD YOU DO AT 10 MILLION DOCUMENTS?"

*(Recurring system-design prompt. Answer in architecture, not adjectives.)*

> "Four things break, in this order.
>
> **The index.** A flat numpy array works at 80 chunks and nothing else. At 10M I need HNSW or IVF
> in a real vector store, and I accept approximate recall for sub-linear search.
>
> **The ACL filter.** Pre-filtering a candidate set is trivial at this scale and expensive at that
> one. Either the store does metadata filtering inside the ANN traversal — which is now the primary
> selection criterion — or I partition the index per principal-group and trade index size for query
> speed. If the permission model is high-cardinality, partitioning stops being viable and native
> filtered-ANN becomes mandatory.
>
> **Ingestion.** Chunking and embedding 10M docs is a batch pipeline with incremental reindexing,
> not a script. Permissions also change, so ACL metadata needs to be updatable without a full
> re-embed — meaning permissions live in a filterable metadata layer, never baked into the vector.
>
> **The latency budget.** Sub-2-second end-to-end is dominated by generation, not retrieval. So I'd
> budget backwards: ~200ms retrieval, ~100ms rerank, the rest for the model, plus semantic caching
> on repeated queries — carefully, because a cache that ignores the principal is an ACL bypass.
> That last one is the mistake I'd expect a team to actually make."

That final sentence is the seniority signal. It's the failure mode nobody mentions.

---

## 6. IF THEY ASK SOMETHING YOU DIDN'T DO

> "I didn't measure that. What I did measure was ___, and here's what it showed."

**This is a strong answer, not a weak one.** The research warns that interviewers bluff-test
deliberately. A candidate who names the edge of their own knowledge is trusted on everything
inside it. A candidate who improvises gets probed until they break.

---

## 7. RUNBOOK — you must be able to run this cold

From `_bmad-output/genai_sprint/project/`:

```bash
../.venv/bin/python -m permrag.cli eval        # the 40-question eval
../.venv/bin/python -m permrag.cli ablate      # every table in DEMO_NUMBERS.md
../.venv/bin/python -m permrag.cli demo        # walkthrough
../.venv/bin/python -m permrag.cli ask "..."   # single query
```

Flags that matter: `--acl {pre,post,off}` · `--chunk-tokens` · `--top-k` · `--mmr` · `--no-hybrid`

**Before Friday, do these three things:**
1. Run `ablate` yourself and watch the leakage number move when you flip `--acl off`. Seeing it is
   different from reading it.
2. Open `permrag/retrieve.py` and find the exact line where the ACL filter is applied. **If you
   can't point at it, you cannot claim the project.**
3. Break it on purpose — set `--top-k 10`, watch precision fall to 0.43, and understand why.

**The standard: you must be able to explain every line you'd be asked about.** Anything in the repo
you don't understand by Thursday night, either learn it or don't mention it.
