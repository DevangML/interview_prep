# RESOURCES — TIER S / A / B, TIME-BOXED AND VERIFIED

**Budget:** ~20 hours total, 27-31 Jul 2026. Interview 01 Aug.
**Every URL below was fetched.** Status in `SOURCES.md`. VERIFIED = I retrieved and read
the content. BOT-BLOCKED = the resource exists but WebFetch got 403/redirect-loop.

**Selection rule applied:** primary sources, runnable artifacts, and practitioner writeups
that people in the field actually cite. Excluded: SEO listicles, Medium reposts of docs,
paid courses, and anything that takes longer to consume than it is worth.

**Total Tier-S consumption time: ~6h 40m.** That leaves ~13 hours for building, breaking,
and rehearsing — which is where the retention actually happens.

---

# TIER S — DO THESE. RANKED.

Read in this order. This ordering is deliberate: #1 and #2 pay off in *every single round*.

---

## S1. Anthropic — "Building Effective Agents"
**URL:** https://www.anthropic.com/engineering/building-effective-agents — **VERIFIED**
**Time: 25 min** (8-10 min read + 15 min to write the five pattern names on a card)

**Teaches:** The workflow-vs-agent distinction, and five named workflow patterns — Prompt
Chaining, Routing, Parallelization (sectioning/voting), Orchestrator-Workers,
Evaluator-Optimizer — plus the autonomous-agent loop.

**Why it beats the alternatives:** This is *the* canonical agent taxonomy. It is written by a
frontier lab from real deployments, it is short, and it is the vocabulary interviewers
themselves absorbed. Every "explain agentic architecture" answer becomes structured instead
of hand-wavy. And its core thesis — **"build the right system, not the most sophisticated
one"** — is verbatim the HIRE signal from §4 of `GENAI_INTERVIEW_REALITY.md`: strong
candidates argue *against* agents for simple tasks.

**Interview payoff:** JD says "LangGraph". LangGraph *is* how you implement these patterns.
Naming the pattern, then naming the LangGraph construct, is the single most senior-sounding
move available to him.

**Rank-1 justification:** highest interview-value per minute of anything on this list.

---

## S2. Hamel Husain — "Your AI Product Needs Evals"
**URL:** https://hamel.dev/blog/posts/evals/ — **VERIFIED**
**Time: 30 min** (12-15 min read + 15 min notes)

**Teaches:** The three-level eval hierarchy — L1 unit-test assertions, L2 human + LLM-as-judge
with trace logging, L3 A/B testing in production. Plus the eval **flywheel**: evals →
debugging → fine-tuning data, all reusing the same infrastructure.

**Why it beats the alternatives:** Evaluation is documented as **the #1 hire/no-hire
separator** for GenAI roles, and this is the most-cited practitioner piece on it. It is not
a metrics glossary — it is a *system*, which is why it survives follow-up questions. DataCamp
and similar lists give you metric names; this gives you a position you can defend.

**Interview payoff:** Both TCS reports asked about evaluation. Combine this with the **RAG
Triad** (context relevance / faithfulness / answer relevance) and he can answer "how do you
know it works" for 3 minutes without repeating himself.

**Do this specific thing:** write down what his *own* L1 assertions would be for a support
chatbot (no PII in output, always cites ≥1 source, response < 400 tokens, valid JSON). That
concreteness is the bluff-test-proof answer.

---

## S3. LangGraph Graph API docs — the JD-named framework
**URL:** https://docs.langchain.com/oss/python/langgraph/graph-api — **VERIFIED**
**Quickstart:** https://docs.langchain.com/oss/python/langgraph/quickstart — **VERIFIED**
**Time: 90 min** (30 min read + 60 min running and breaking the quickstart)

**Teaches:** StateGraph, nodes as plain functions returning partial state, static vs
conditional edges, **reducers** (default = replace; `operator.add`; `add_messages` with
dedup), the `Command` primitive, START/END, node caching, checkpointing at compile time.
The quickstart builds a calculator agent (add/multiply/divide tools) via both Graph API and
Functional API.

**Why it beats the alternatives:** The JD names LangGraph. Every blog comparison
("LangChain vs LangGraph") is downstream of this page and drops the reducer semantics, which
is exactly where the interesting question lives. Go to the source.

**THE BREAKABLE EXPERIMENT — do this, it is the NULL-in-NOT-IN of LangGraph:**
> Build a 2-node graph with a `messages: list` state key using the **default reducer**.
> Run it. Watch conversation history silently vanish — each node *replaces* the whole list.
> Then change to `Annotated[list, add_messages]`. Watch it append.
>
> Second break: run twice with the same `thread_id` and no checkpointer → no memory.
> Add `MemorySaver` → memory. Change the `thread_id` → memory gone.

Ninety minutes here converts "I've read about LangGraph" into "I've built with LangGraph,"
which is a categorically different interview answer. **Highest-leverage hands-on hour of
the sprint.**

---

## S4. LangChain — `rag-from-scratch` notebooks
**URL:** https://github.com/langchain-ai/rag-from-scratch — **VERIFIED** (9k stars, 2.1k forks)
**Time: 120 min** (run notebooks 1-9; skim 10-18)

**Teaches:** RAG built up in stages — indexing, retrieval, generation, then progressively
advanced techniques across 5 notebooks (grouped 1-4, 5-9, 10-11, 12-14, 15-18). Has an
official companion YouTube playlist.

**Why it beats the alternatives:** It is **first-party LangChain**, it is *runnable*, and it
is incremental rather than one monolithic app. Devang learns from breaking things — this
gives him something to break every 15 minutes. A blog post about RAG cannot do that.

**Breakable experiments to run inside it:**
1. Set chunk size to **50 tokens**, then **4000 tokens**. Watch retrieval quality collapse at
   both ends and be able to say *why* (too small = no context to answer from; too large =
   embedding is an average of many topics, so it matches nothing precisely).
2. Ask a question whose answer spans a chunk boundary. Watch it fail. Add overlap. Watch it
   work. **That is the chunking answer, earned rather than memorized.**
3. Change the embedding model without re-indexing. Watch retrieval return garbage — because
   query and document vectors now live in different spaces. This makes "you must re-embed
   the whole corpus" a thing he has *seen*, not a thing he read.

**Rank justification:** RAG is Tier-1 in all three TCS sources. This is the cheapest path
from "can describe RAG" to "has broken RAG."

---

## S5. Anthropic — "Introducing Contextual Retrieval"
**URL:** https://www.anthropic.com/news/contextual-retrieval — **VERIFIED**
**Time: 20 min**

**Teaches:** Prepending LLM-generated context to each chunk before embedding. With hard
numbers: **contextual embeddings alone → 35% fewer retrieval failures; + BM25 → 49%;
+ reranking → 67%.** Cookbook code is linked.

**Why it beats the alternatives:** This is the highest-value 20 minutes on this list measured
in *interview differentiation*. Every candidate says "I'd use RAG." Almost none can say
"naive chunking loses the context a chunk sits in — Anthropic measured a 49% reduction in
retrieval failure by prepending chunk-level context and combining with BM25." **Specific
numbers from a named primary source are the strongest possible anti-bluff signal**, and it
simultaneously covers chunking, hybrid search, and reranking — three separate canon topics
in one artifact.

---

## S6. Chroma Research — "Evaluating Chunking Strategies for Retrieval"
**URL:** https://research.trychroma.com/evaluating-chunking → redirects to
https://www.trychroma.com/research/evaluating-chunking — **VERIFIED (use the second URL)**
**Code:** https://github.com/brandonstarxel/chunking_evaluation
**Time: 25 min** (read findings + skim methodology; skip the full paper)

**Teaches:** An actual controlled experiment across RecursiveCharacterTextSplitter,
TokenTextSplitter, Kamradt semantic chunkers, ClusterSemanticChunker, LLMSemanticChunker.
Findings: **strategies differ by up to 9% in recall**; LLMSemanticChunker wins recall;
ClusterSemanticChunker at 200 tokens wins precision/IoU; **OpenAI's default of 800 tokens
with 400 overlap was among the worst performers**; RecursiveCharacterTextSplitter at 200
tokens, no overlap, is the reliable practical default. Full codebase released.

**Why it beats the alternatives:** Chunking is where interviewers separate the demo-builders.
The reported failure mode is candidates treating chunking as a theory question. This is the
one piece of *evidence* in the space. Being able to say **"the popular default of 800/400 was
among the worst performers in Chroma's evaluation; I'd start at ~200 tokens recursive and
run an ablation against a golden set"** is a complete, senior, unbluffable answer.

**Pairs with S4 experiment #1** — read this *after* breaking chunk sizes himself, so the
numbers land on top of an experience rather than replacing one.

---

## S7. Lilian Weng — "LLM Powered Autonomous Agents"
**URL:** https://lilianweng.github.io/posts/2023-06-23-agent/ — **VERIFIED**
**Time: 35 min** (31 min stated read; skim the case-study section)

**Teaches:** The canonical agent decomposition — **Planning** (CoT, Tree of Thoughts, ReAct,
Reflexion), **Memory** (short-term = in-context; long-term = external vector store;
retrieval via LSH/ANNOY/HNSW/FAISS/ScaNN), **Tool Use** (LLM as router to specialized modules).

**Why it beats the alternatives:** This is the most-cited agent reference in the field, and it
delivers **two Tier-2 topics in one artifact**: agent memory (asked as its own question in the
canon) *and* ANN algorithms (HNSW — which is how he answers "how does a vector DB actually
search fast?" instead of just naming Pinecone).

**Read the memory section twice.** "What is agent memory and why does it matter" is a
standalone senior-level canon question, and this is the cleanest three-layer answer available.

---

## S8. amitshekhariitbhu — `ai-engineering-interview-questions`
**URL:** https://github.com/amitshekhariitbhu/ai-engineering-interview-questions — **VERIFIED**
**Time: 60 min** (skim the "Must Know" section + RAG + Agents + LLMOps; do NOT read all 15)

**Teaches:** 15 categories — Must Know (LLM/RAG/MCP/Agent/Fine-tuning/Quantization), LLM
Fundamentals, Prompt Engineering, RAG, Agents, Fine-Tuning, Vector DBs, AI System Design,
LLMOps, Evaluation, Safety, Multimodal, Infrastructure, Coding, Behavioral.

**Why it beats the alternatives:** It is free, Apache-2.0, GitHub-hosted (so it is
community-corrected rather than SEO-optimized), and it is scoped to exactly the role title.
Answers are mostly linked out rather than inline — which is a **feature** for a 4-day sprint:
use it as a **gap-detection checklist**, not a textbook. Read a question, answer it out loud,
and only click through on the ones he fumbles.

**Use it on Jul 31 as the final sweep.** Anything he can't answer aloud in 60 seconds gets a
2-line note on the revision card. Anything he can, skip.

---

## S9. OpenAI — "A Practical Guide to Building Agents" (PDF)
**URL:** https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf
— **VERIFIED** (34 pages; I opened it and confirmed contents)
**Time: 40 min**

**Contents confirmed from the PDF itself:** What is an agent (p4) · When should you build an
agent (p5) · Agent design foundations (p7) · **Guardrails (p24)** · Conclusion (p32).

**Teaches:** A crisp agent definition — *"Agents are systems that independently accomplish
tasks on your behalf"* — and, critically, the **when-NOT-to** criteria: agents suit complex
judgment, unmaintainable rulesets, and heavy unstructured data; *"otherwise, a deterministic
solution may suffice."* Plus single-vs-multi-agent orchestration and a full guardrails chapter.

**Why it beats the alternatives:** Complements S1 rather than duplicating it. S1 gives the
pattern taxonomy; this gives the **decision framework and the guardrails vocabulary**.
Guardrails is a standalone canon question ("design guardrails for a customer-facing
assistant") and this is the best free primary treatment of it. The p5-p6 "when should you
build an agent" table is directly reusable as an interview answer.

---

## S10. Ragas — Available Metrics documentation
**URL:** https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/ — **VERIFIED**
**Time: 25 min**

**Teaches:** The four core RAG metrics and what each isolates — **Faithfulness** (is the
answer grounded in retrieved context?), **Context Precision** (are retrieved docs relevant?),
**Context Recall** (did we retrieve everything needed?), **Response Relevancy** (does the
answer address the question?). Notes these are LLM-judged.

**Why it beats the alternatives:** Ragas is *the* named framework practitioners cite, and its
metric set maps one-to-one onto the **RAG Triad**. Naming the framework converts an abstract
answer into a concrete one. It also directly answers S2's actual question — "how do you
evaluate retrieved chunks before generation" → context precision and context recall,
plus Recall@K / Precision@K.

**Say this in the room:** *"Faithfulness and context recall together tell me whether a wrong
answer was a retrieval failure or a generation failure — that's the diagnostic I care about."*
That sentence is a hire signal.

---

# TIER A — HIGH VALUE, ONLY IF TIME REMAINS

## A1. Chip Huyen — "Agents"
https://huyenchip.com/2025/01/07/agents.html — **VERIFIED** · **20 min**
Tool taxonomy (knowledge augmentation / capability extension / write actions), planning
control flows (sequential, parallel, conditional, loop), and — the valuable part — an explicit
**agent failure-mode list**: invalid tool calls, wrong parameters, goal violations, reflection
errors (agent wrongly believes it's done), tool output errors, step/cost/time inefficiency.
**Why:** failure modes are what interviewers probe for. Read this if S1+S9 leave time.

## A2. Pinecone — Hybrid Search guide
https://docs.pinecone.io/guides/search/hybrid-search — **VERIFIED** · **15 min**
Dense vs sparse scoring ranges, the alpha blend `combined = alpha*dense + (1-alpha)*sparse`,
and when hybrid beats pure vector (domain jargon, SKUs, exact numbers, mixed query types).
Notes alpha ≈ 0.75 as a dense-leaning default. **Why:** "what is hybrid search and when does
it beat pure vector" is Tier-3 canon, and *knowing the alpha parameter by name* is precisely
the kind of production detail that survives the 60-second bluff test.

## A3. Anthropic Cookbook
https://github.com/anthropics/anthropic-cookbook — **VERIFIED** (50.4k stars) · **30 min**
Runnable notebooks: RAG, tool use (calculator, SQL, customer service), sub-agents, automated
evals, JSON mode, prompt caching, contextual retrieval, agent patterns.
**Why:** this is the runnable companion to S1 and S5. If he wants to *execute* an eval rather
than read about one, it's here.

## A4. Eugene Yan — "Patterns for Building LLM-Based Systems & Products"
https://eugeneyan.com/writing/llm-patterns/ — **VERIFIED** · **66 min stated — SKIM ONLY, 20 min**
Seven patterns: Evals, RAG, Fine-tuning, Caching, Guardrails, Defensive UX, Collect Feedback.
**Why:** the best single map of the whole space — but at 66 minutes it is too expensive to
read fully in a 20-hour sprint. **Read the section headers and the Caching + Guardrails
sections only.** Caching is a strong latency/cost answer and it is under-covered elsewhere.

## A5. Prompt Engineering Guide
https://www.promptingguide.ai/ — **VERIFIED, free** · **30 min for core techniques only**
Zero-shot, few-shot, chain-of-thought, ReAct, prompt injection, plus a prompt hub.
**Why:** covers the prompt-engineering canon block in one place. Devang already does prompt
engineering in practice — this supplies the *vocabulary* he's missing, which is his actual
stated gap. **Read only the "Techniques" section; skip Research and Applications.**

## A6. Anthropic — Prompt Engineering Interactive Tutorial
https://github.com/anthropics/prompt-eng-interactive-tutorial — **VERIFIED** · **45 min for ch. 4-8**
9 chapters + appendix, with an Example Playground. Chapters 4-8 are the interview-relevant
ones: separating data from instructions, output formatting, chain-of-thought, examples,
**avoiding hallucinations**. Appendix covers chaining, tool use, search & retrieval.
**Why:** interactive rather than passive — fits his learn-by-breaking style. Skip ch. 1-3
(too basic for him).

## A7. Jay Alammar — "The Illustrated Transformer"
https://jalammar.github.io/illustrated-transformer/ — **VERIFIED** · **15 min skim / 30 min full**
Encoder-decoder stack, self-attention, multi-head attention, positional encoding.
**Why:** the canonical visual transformer explainer. **Skim only.** Transformer internals are
Tier 2.4 — he needs a confident 60-second answer, not depth. Do not spend an hour here.

---

# TIER B — REFERENCE / USE IF A SPECIFIC GAP APPEARS

| Resource | URL | Status | Use for |
|---|---|---|---|
| techinterview.org — What GenAI interviews test | https://www.techinterview.org/post/3233476396/what-genai-engineer-interviews-test/ | VERIFIED | The hire/no-hire framing + RAG Triad. **15 min. Read this one on the drive in.** |
| MyEngineeringPath — 8 free GenAI questions w/ answers | https://myengineeringpath.dev/genai-engineer/interview-questions/ | VERIFIED | Model answers for temperature, sub-2s RAG, ReAct loop, 10M-doc RAG, guardrails, hallucination, agent memory, LLMOps |
| MyEngineeringPath — GenAI system design framework | https://myengineeringpath.dev/genai-engineer/system-design-interview/ | VERIFIED | The 6-step 40-min framework + 3 worked examples. Use if a design round appears |
| Towards AI — 40 GenAI questions with answers | https://towardsai.com/p/machine-learning/40-generative-ai-interview-questions-that-actually-get-asked-in-2026-with-answers | VERIFIED | Broadest categorized bank found. 10 sections. Use as a checklist, not a read |
| DataCamp — 30 RAG interview questions | https://www.datacamp.com/blog/rag-interview-questions | VERIFIED | RAG-only bank, tiered basic/intermediate/advanced |
| LangChain `rag-from-scratch` YouTube playlist | linked from the repo README | VERIFIED (repo) | Video companion to S4 if the notebooks stall |
| Karpathy — "Deep Dive into LLMs like ChatGPT" | https://www.youtube.com/watch?v=7xTGNNLPyMI | VERIFIED (via X announcement) | **3h31m — DO NOT WATCH IN THIS SPRINT.** Best-in-class, wrong time budget. Bookmark for after |

---

# EXPLICITLY EXCLUDED, AND WHY

| Excluded | Reason |
|---|---|
| Udemy "LangChain Interview Questions" | Paid, unverifiable quality, cannot finish in 4 days |
| Coursera / Packt LangChain-LangGraph specializations | Multi-week format. Wrong instrument for a 4-day sprint |
| "250 LangGraph Interview Questions" (rpabotsworld) | Volume-farmed SEO content. 250 questions is not a study plan, it is noise |
| Most Medium "Top N GenAI questions" posts | Paywalled and/or reposts of the docs. Go to the docs |
| DeepLearning.AI short courses (LangChain for LLM App Dev; AI Agents in LangGraph) | Genuinely good and ~1h each, **but** they teach *building*, and 1 hour of DL.AI video ≈ 1 hour of running S3/S4 hands-on, which suits his break-it learning style far better. **Fallback only if hands-on setup fails.** URLs: deeplearning.ai/courses/langchain and deeplearning.ai/courses/ai-agents-in-langgraph |
| Glassdoor TCS Gen AI Engineer page | **BOT-BLOCKED (403).** Content recovered via search index only — see `SOURCES.md` |
| InterviewBit / Credo / NovelVista / Amquest GenAI lists | SEO listicles. Recycled content, no primary sourcing |

---

# THE 20-HOUR SEQUENCE

| When | Hours | Do |
|---|---|---|
| **Tonight, Jul 27** | 3.0 | **S1** (25m) → **S2** (30m) → **S5** (20m) → **S10** (25m) → then draft the project story + band answer (60m). *Rationale: the four highest-value reads are all short, and the story needs the most rehearsal repetitions.* |
| **Jul 28** | 5.0 | **S4** (2h, run + break all three experiments) → **S6** (25m, read *after* breaking chunk sizes) → **S3** part 1: read Graph API docs (30m) → rehearse project story aloud x3 (30m) → buffer |
| **Jul 29** | 5.0 | **S3** part 2: run the quickstart + the reducer break + the thread_id break (90m) → **S7** (35m) → **S9** (40m) → Python fundamentals: decorators, comprehensions, threading vs multiprocessing, OOP, classmethod vs staticmethod, "2nd largest without built-ins" **written by hand** (90m) |
| **Jul 30** | 4.0 | **S8** as a spoken gap-sweep (60m) → patch the top 5 gaps from Tier A (90m) → 3 STAR stories for the MR round (60m) → CTC/notice/relocation numbers (30m) |
| **Jul 31** | 3.0 | Full mock out loud, all Tier-1 questions (90m) → build the **one-page revision card** (45m) → print CVs, assemble documents (45m). **Sleep early.** |
| **Aug 1, in transit** | — | Tier B: techinterview.org (15m) + the revision card only. **No new material on the day.** |

---

# THE ONE-PAGE REVISION CARD — what must be on it

Build this on Jul 31. It is what he reads in the waiting gaps at the venue.

1. **60-second pitch** — written out, word for word
2. **The band answer** — written out, word for word
3. **RAG flow** — 10 boxes, drawn by hand
4. **RAG Triad** — context relevance / faithfulness / answer relevance
5. **Ragas metrics** — faithfulness, context precision, context recall, response relevancy
6. **Chunking numbers** — Chroma: 800/400 default was among the worst; ~200 recursive is the
   solid default; up to 9% recall spread between strategies
7. **Contextual retrieval numbers** — 35% / 49% / 67% failure reduction
8. **LangGraph seven words** — StateGraph, node, edge, conditional edge, reducer,
   checkpointer, thread_id
9. **Anthropic's five patterns** — chaining, routing, parallelization, orchestrator-workers,
   evaluator-optimizer
10. **His own 3-4 real production numbers** — from the warehouse system and IAM workflows
11. **Cosine vs dot product** — one line: dot product is unnormalized; cosine is dot product
    on unit vectors; identical ranking if embeddings are already L2-normalized
12. **3 STAR stories** — three words each, as memory triggers only
