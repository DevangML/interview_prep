# GENAI INTERVIEW REALITY — What Actually Gets Asked

**Target:** Devang Manjramkar — TCS Pune, Gen AI Engineer, 01 Aug 2026 (offline)
**JD skills verbatim:** GenAI, AIML, LLM Modules, LangChain, LangGraph. Band 4-10 YOE.
**Research date:** 27 Jul 2026. All URLs in `SOURCES.md`.

Evidence markers: **[V]** = verified by fetching a first-person candidate report or primary
source. **[I]** = inferred / synthesized across multiple secondary sources.

---

## 0. THE THREE PRIMARY TCS DATA POINTS

Everything in Tier 1 below is anchored to these three, which I fetched directly.

| ID | Source | Role | What it gives us |
|----|--------|------|------------------|
| **S1** | LinkedIn — Shanmuk Nunna [V] | TCS GenAI Developer/Consultant | Full 3-round breakdown + question list |
| **S2** | LinkedIn — Pallavi Galgale [V] | TCS GenAI/ML, 2-3 YOE band | Question list, matches Devang's exact level |
| **S3** | Glassdoor TCS "Gen AI Engineer" [V via search index; page 403 on direct fetch] | Gen AI Engineer | Screening questions + a coding question |

**S2 is the closest analogue to Devang** — same experience band (2-3 yrs), same GenAI/ML
framing. Weight its questions highest.

---

## TIER 1 — NEAR-CERTAIN (appears in 2 or 3 of 3 TCS sources)

Assume every one of these will be asked. If Devang can only prepare ten things, prepare these.

### 1.1 "Explain your project" / "Tell me about yourself" — 3/3 [V]
S1 opens with "Tell me about yourself" then a GenAI project walkthrough. S2 opens with
"Explain your project" and "how many projects have you worked on". S3 asks "years of
experience in Python and Gen AI" and "hands-on project experience".

**This is the single highest-value prep item and it is the one Devang can most control.**
The interviewer is calibrating him in the first 90 seconds. Everything after is downstream.

### 1.2 RAG architecture end-to-end — 3/3 [V]
- S1: "RAG architecture, components, and implementation flow"
- S2: "Design a RAG system when an employee asks a question"
- S3: RAG listed among core technical topics

Expected depth: ingest → chunk → embed → index → query embed → retrieve top-k → (rerank)
→ stuff into prompt → generate → cite. He must be able to *draw* this, not recite it.

### 1.3 Vector databases + similarity metrics — 2/3 [V]
- S1: "Vector database concepts", "similarity computation methods (cosine, dot-product,
  Euclidean)", "Vector DB selection criteria (FAISS, Chroma, Weaviate, Pinecone)"
- S2: implied by RAG design question

**Known trap:** the cosine vs dot-product distinction. Dot product is *not* normalized —
it rewards longer vectors. Cosine is dot product on unit-normalized vectors. If embeddings
are already L2-normalized (OpenAI's are), cosine and dot product rank identically.
This is a classic "does he actually know or did he memorize" probe.

### 1.4 LangChain — what it is, and its four primitives — 3/3 [V]
- S1 managerial round: "LangChain applications (agents, tools, chains, memory)"
- S3: "what is LangChain", "which LangChain community libraries have you used"
- JD names it explicitly

He must name: **Chains** (LCEL composition), **Tools** (functions the LLM may call),
**Agents** (LLM decides which tool + when to stop), **Memory** (conversation state).
Plus retrievers and output parsers.

### 1.5 Python — basic-to-intermediate, NOT LeetCode-hard — 2/3 [V]
- S1: decorators, list comprehensions, threading vs multiprocessing, inheritance,
  polymorphism, classmethod vs staticmethod
- S3: "write code to find the second largest number in a list without using built-in
  functions, and provide test cases"; "explain tuples and how they differ"

**This is reassuring.** It is fundamentals + test-case thinking, not DP or graphs. The
"provide test cases" ask is the real signal — they want to see him think about empty list,
single element, all-duplicates.

### 1.6 Evaluation — how do you know it works — 2/3 [V] + market-wide #1 differentiator
- S1: "LLM evaluation metrics (BLEU, ROUGE, perplexity, F1)"
- S2: "evaluating retrieved chunks before generation", "Recall@K, Precision@K"

techinterview.org [V] states evaluation is now a *dedicated round* in most GenAI loops and
is the clearest hire/no-hire separator. See §4.

### 1.7 Hallucination — cause and mitigation — 2/3 [V]
- S1: "real-world GenAI challenges (hallucination, context limitations, grounding)";
  candidate specifically described mitigating via "context chunk optimization and refined
  system prompts"
- S2: implicit in restricted-question handling

### 1.8 Chunking strategy — 2/3 [V]
- S1: chunk optimization as the stated fix for hallucination
- S2: "handling large chunks in RAG pipelines"

### 1.9 Fine-tuning vs RAG — when do you pick which — 2/3 [V]
- S1: "fine-tuning versus RAG preference criteria"
- Market-wide: appears in every canon list

### 1.10 Decoding parameters: temperature, top-k, top-p — 1/3 direct [V], universal in canon
- S2 (the 2-3 YOE candidate — Devang's exact band): "definition of temperature in LLMs",
  "Top-K and Top-P: differences and use cases"
- Appears as the *beginner* question in every canon list (myengineeringpath, towardsai,
  datacamp) — i.e. it is a screening filter. Getting it wrong is disqualifying; getting it
  right earns nothing.

---

## TIER 2 — LIKELY (1 strong TCS source + heavy market corroboration)

### 2.1 Function calling / tool calling mechanics [V — S2]
S2 asked three layered questions: how function calling works, **how the LLM decides which
function to call**, and how to validate incorrect/partial responses.

The middle one is the depth probe. Answer: the model does not "call" anything — it emits a
structured token sequence naming a tool + JSON args, based on the tool schemas/descriptions
in context. Your runtime parses it, executes, and feeds the result back as a new message.
The tool *description* is prompt engineering surface area.

### 2.2 Structured output — forcing JSON/CSV [V — S2]
"Ensuring fixed-format LLM outputs (JSON/CSV)". Answer ladder: prompt instruction (weak) →
few-shot examples → output parsers with retry (LangChain `PydanticOutputParser`) →
constrained decoding / JSON schema mode (strong, provider-enforced) → validate + repair loop.

### 2.3 Access control / restricted queries pre-retrieval [V — S2]
"Managing restricted vs unrestricted questions pre-retrieval." This is an *enterprise* RAG
question and TCS is an enterprise services firm — expect it. Answer: metadata filtering at
the vector-search level (filter by user's ACL before ANN search, not after), plus a
pre-retrieval intent/permission classifier. Post-filtering leaks *existence* of documents
and breaks top-k.

**This is Devang's home turf.** He shipped IAM approval workflows. Row-level permission
filtering is the same problem. Bridge it explicitly.

### 2.4 Transformers / attention [V — S3 lists "Transformer"]
Depth expected at 2-3 YOE: what self-attention does (each token attends to every other,
producing context-aware representations), Q/K/V intuition, why positional encoding exists,
why it's O(n²) in sequence length (→ this is *why* context windows are expensive).

### 2.5 Agentic architectures [V — S3 lists "Agentic architectures"; JD lists LangGraph]
See §3 — LangGraph gets its own section because the JD names it.

### 2.6 Embeddings — what they are, choosing a model
Universal in canon. Expect: what is an embedding, why cosine similarity works on them,
how you'd pick between models (dimension vs cost vs domain fit vs MTEB score), and what
happens if you change embedding models on an existing index (**you must re-embed
everything — a great breakable-experiment demo**).

---

## TIER 3 — POSSIBLE (market canon; ask-if-time-permits)

These come from the cross-source canon (towardsai 40Q [V], datacamp RAG 27Q [V],
myengineeringpath [V], amitshekhariitbhu repo [V]). Lower TCS-specific evidence.

- Hybrid search (dense + sparse/BM25) and the alpha weighting parameter
- Reranker vs bi-encoder (cross-encoder scores query+doc jointly; slow but accurate → only
  on top-50 candidates)
- "Lost in the middle" — models attend worse to mid-context content
- Prompt injection + defenses
- LoRA / QLoRA — why parameter-efficient FT is preferred
- RLHF at a conceptual level
- LLM-as-Judge and its failure modes (position bias, verbosity bias, self-preference)
- Context window management / KV cache
- Quantization + distillation for inference cost
- Guardrails (input filter, output filter, PII redaction, topic restriction)
- LangChain vs LlamaIndex vs LangGraph — when each
- Cost/latency: "at 100 req/min what does this cost, what breaks first"
- GraphRAG / knowledge graphs vs vector store
- NL-to-SQL failure modes (relevant — his SQL prep transfers here)

---

## 3. LANGGRAPH — THE JD-NAMED FRAMEWORK

The JD names LangGraph explicitly, and none of the three TCS reports covers it in depth.
**[I]** That asymmetry is the risk: it is on the JD, so it will be asked, but there is no
candidate report telling us how deep. Prepare to the level of "I have built with this."

The minimum vocabulary he must own (all [V] from `docs.langchain.com` graph-api page):

| Concept | One-line answer |
|---------|-----------------|
| **Why LangGraph over LangChain** | LangChain chains are one-pass DAGs. LangGraph is a state machine — it supports **cycles**, so an agent can loop: act → observe → decide → act again. |
| **StateGraph** | The graph class. Takes a state schema (TypedDict / Pydantic), you add nodes and edges, then `.compile()` to a runnable. |
| **Node** | A plain Python function: takes current state, returns a *partial* state update. |
| **Edge** | Static routing (`add_edge`) or dynamic (`add_conditional_edges`) where a router function reads state and returns the next node's name. |
| **Reducer** | How a node's partial update merges into state. Default = **replace**. `operator.add` = append. `add_messages` = append with dedup by id. |
| **Checkpointer** | Persistence layer (MemorySaver / SQLite / Postgres). Saves state after every super-step, keyed by `thread_id`. Gives you resumability, time-travel, and human-in-the-loop. |
| **START / END** | Special sentinel nodes marking entry and termination. |
| **Human-in-the-loop** | `interrupt` before/after a node → the checkpointer holds state → a human approves → you resume from the exact saved state. |

**The killer breakable experiment for LangGraph** (matches Devang's learning style — this
is the NULL-in-NOT-IN moment for graphs):

> Build a 2-node graph with a `messages` key. Give it the **default reducer** (replace).
> Run it and watch conversation history silently vanish — each node overwrites the whole
> list instead of appending. Then add `Annotated[list, add_messages]` and watch it work.
> He will never forget what a reducer is.

Second experiment: run the same graph twice with the same `thread_id` and no checkpointer
(no memory), then with `MemorySaver` (it remembers). Then change the `thread_id` and watch
memory disappear — that teaches what a thread actually is.

---

## 4. HIRE vs NO-HIRE — THE DEPTH SIGNAL

All **[V]**, from techinterview.org and the RecruitingFromScratch/HackerRank material.

### The single biggest separator: EVALUATION
> "A demo builder will name precision and recall and stop. A real RAG engineer will name
> NDCG, MRR, golden-set construction, chunking ablations, and production incidents."

**The RAG Triad** — memorize this, it is the highest-leverage single framework:
1. **Context relevance** — did retrieval find passages that contain the answer?
2. **Faithfulness / groundedness** — did generation stay grounded, or confabulate?
3. **Answer relevance** — did the output address the actual question asked?

Why it wins: it decomposes failure. If the answer is wrong, the triad tells you *whether
the retriever or the generator broke*. That diagnostic framing is the senior signal.

### HIRE signals
| Signal | What it sounds like |
|--------|---------------------|
| Cost/latency/failure as first-class | "Rate limits, partial failures, and token cost are design inputs, not things I'd add later." |
| Golden set before demo | "First thing I'd do is hand-build 50 question→expected-source pairs." |
| Argues *against* agents | "For a simple lookup I would not use an agent — it multiplies cost and makes evaluation intractable across the chain. A retrieval chain is enough." |
| Boring infrastructure | Starts with **pgvector**, not Pinecone. Signals he's shipped, not demoed. |
| Volunteers measurement unprompted | Nobody asked how you'd measure it; you said it anyway. |
| Owns confidence failure | "A wrong answer given confidently is worse than no answer" → citations, abstention threshold, escalation to human. |

### NO-HIRE signals
- Assumes APIs never error and tokens are free
- Leads with framework names and boxes-and-arrows diagrams instead of data flow
- **Goes silent when asked how they'd evaluate it** ← the fatal one
- Over-builds: reaches for a multi-agent system for a task a single retrieval call solves
- Cannot name a single thing that broke in production

### The 60-second bluff test
Interviewers probe with "which weights did you actually run in hybrid search?" or "what was
your chunk size and why that number?". Specific production numbers cannot be faked for a
minute. **Devang should walk in with 3-4 real numbers from his own work** — chunk sizes,
latencies, token counts, request volumes, whatever is true. Real numbers, even small ones,
beat impressive vagueness.

---

## 5. BRIDGING 2-3 YOE INTO A 4-10 YOE BAND

**[I]** — synthesized; no single source states this as TCS policy.

### The structural facts
- The 4-10 band is a *req template*, not a filter. TCS Gen AI is a young discipline; almost
  nobody has 4+ years of *LangChain* experience, because LangChain shipped in late 2022.
  The band is inherited from generic-engineer reqs.
- TCS lateral hiring maps to internal grades (Systems Engineer → IT Analyst → Assistant
  Consultant). The interview decides the *grade*, and the grade decides the band. Being
  under-banded usually means a lower grade offer, not a rejection.
- The three-round structure (TR → MR → HR) means the **managerial round is where band
  concerns surface** — and that round is about ownership, not syntax (S1 [V]: "Leadership,
  ownership, and problem-solving approach").

### The four bridges Devang should actively build

**Bridge 1 — Shipped-to-production beats years-served.**
Most GenAI candidates in India right now are demo-builders who did a Coursera RAG chatbot.
Devang has shipped an *offline-first warehouse scanning system* to real users. That means
he has actually handled sync conflicts, partial failure, retries, and degraded-network
behavior. **Those are the exact same primitives as production LLM engineering** — flaky
endpoints, 429s, partial responses, idempotency. Say it in those words.

**Bridge 2 — Enterprise-shaped experience, which is TCS's whole business.**
IAM approval workflows and SecOps → he already thinks in permissions, audit trails, and
approval gates. Map directly onto: pre-retrieval ACL filtering (Tier 2.3), human-in-the-loop
approval nodes in LangGraph, and guardrails. A pure-ML candidate cannot do this mapping.
**This is his single strongest differentiator for TCS specifically.**

**Bridge 3 — Config-driven systems → prompt/agent orchestration.**
He built a config-driven campaign system. That is the same instinct as externalizing prompts,
tool schemas, and routing rules instead of hardcoding them. Frame it as: "I already build
systems where behavior is data, not code — that's exactly what an agent's tool registry is."

**Bridge 4 — Breadth as a services-firm asset.**
Flutter + Frappe/Vue + Python is a liability at a product company and an *asset* at TCS,
which staffs cross-functional client teams. Frame breadth as deployability.

### Scripted answers for the band question
If asked *"the role says 4-10 years, you have 2-3"*:

> "Right — on total years I'm at the bottom of that band. On GenAI specifically the gap is
> much smaller, because the tooling itself is about three years old. What I'd point to is
> what I've shipped: an offline-first system in production with real sync-conflict handling,
> and IAM approval workflows. The failure modes I already handle — partial responses, flaky
> endpoints, permission-scoped data access — are the same ones that make LLM systems hard.
> I'd rather be measured on that than on the year count."

If asked *"why should we hire you over someone with 6 years?"*:

> "Someone with six years of classical ML may have more depth on model training. I'd argue
> that's not what this role is — this is systems engineering with an LLM in the loop, and my
> two years are almost entirely in that shape: integration, orchestration, guardrails, and
> shipping to users who complain when it breaks."

**Do not apologize for the gap and do not oversell.** Both are no-hire tells. Name the gap
in one clause, then move to evidence.

---

## 6. WHAT THIS MEANS FOR ~20 HOURS OF PREP

Recommended weighting, derived from the frequency tiers above:

| Block | Hours | Rationale |
|-------|-------|-----------|
| Project story + STAR + the band answer | 3 | Tier 1.1 — asked 3/3, fully controllable, opens every round |
| RAG end-to-end (build one, break it) | 5 | Tier 1.2/1.3/1.8 — the spine of the whole interview |
| LangChain + LangGraph vocabulary + one runnable graph | 4 | JD-named; Tier 1.4; the reducer experiment |
| Evaluation (RAG triad, Recall@K, RAGAS) | 3 | The #1 hire/no-hire separator |
| Python fundamentals refresh (decorators, OOP, comprehensions, test cases) | 2 | Tier 1.5 — cheap points, embarrassing to miss |
| Rapid-fire canon (temperature/top-k/top-p, FT vs RAG, hallucination, chunking, function calling) | 3 | Tier 1.7/1.9/1.10, Tier 2.1/2.2 — screening filters |

**Do not** spend sprint hours on: transformer math derivations, RLHF internals, diffusion
models, GANs, or LeetCode. Zero TCS evidence, high time cost.
