# FULL MOCK INTERVIEW — TCS Gen AI Engineer, 01 Aug 2026

**Ordered exactly as a TCS lateral day runs: TR → MR → HR.** Same day, same visit, long waits
between. Per `research/TCS_ROUND_STRUCTURE.md` there is **no separate aptitude test for laterals** —
coding happens *inside* the TR, on paper or verbally.

## HOW TO RUN THIS

1. **Stand up. Speak out loud.** Silent reading tests recognition; the interview tests production.
2. **Time yourself.** Targets are per question. Over 45 s on a rapid-fire = lecturing.
3. **Cover the model answer.** Say yours first, then compare.
4. **The output is a stall-list, not a score.** Write down every question where you stalled, hedged,
   or rambled. That list is the only thing you carry forward.
5. **Jul 30: Part 1 only (mock #1). Jul 31: all three parts (mock #2).**

Model answers are the *shape*, not a script. Numbers shown are verified and quotable. «YOUR PROJECT»
means substitute `permrag` — and the numbers must be true.

---
# PART 1 — TR (TECHNICAL ROUND) · target 45 min
*Senior engineer, possibly a generalist with a GenAI checklist. Observed mix (S1/S2/S3): ~40% GenAI
concepts, ~30% project deep-dive, ~30% Python/OOP + a small coding problem.*
**Open by handing over a CV copy unprompted.**

### TR-1. "Tell me about yourself." / "Explain your project." ⭐ **3/3 — EVERY SOURCE**
**85-95 seconds. Then stop.**
Use `TCS_MANAGERIAL_HR.md` §1 verbatim in structure: *who and how much → the AI angle → the stack →
why this role.* Pause half a beat after "six hundred tracked items." End on *"that's a systems
problem more than a model problem"* — it invites exactly the follow-up you want.
**Trap:** no chronological CV recital. Don't run past 95 s. Don't lead with the experience gap.

### TR-2. "Walk me through the GenAI project you've built." ⭐ **THE HIGH-VALUE ONE**
**3-4 min with room, 90 s compressed. Have both.**
> **Shape — this order is graded:**
> 1. **Problem in one sentence.** *"Enterprise document Q&A where the answer must respect who's
>    asking — a permission-aware RAG over 16 HR, finance, engineering, security and legal documents."*
> 2. **Architecture, drawn.** Two lanes, eight boxes.
> 3. **Three decisions, each with what it cost.** e.g. *"I put the authorisation predicate on the
>    chunk at ingest — a clearance lattice AND a role gate — so the filter is a cheap boolean over
>    metadata already sitting next to the vectors. That cost me re-indexing whenever the permission
>    model changes; it bought me pre-retrieval filtering instead of post-filtering."*
> 4. **One thing that broke, and how I found it.** «from build block P4»
> 5. **How I measured it.** *"40-question golden set, hand-built, each question tagged with a
>    principal and its expected source documents, plus rows that should abstain. Recall@5 was «X»."*
> 6. **What I'd do next with a month.**

**Trap:** most candidates stop after step 2. Steps 4 and 5 decide the round. **Volunteer step 5 even
if they don't ask** — volunteering measurement unprompted is the strongest single move available.

**Probe: "What chunk size did you actually run, and why that number?"** ← the 60-second bluff test
> **200 tokens with 30 overlap, 80 chunks over 16 documents, 384-dim normalised embeddings.** I
> started at 200 because Chroma's chunking evaluation found the popular 800/400 default among the
> worst performers and ~200 recursive the reliable baseline — then I ablated it against my own
> golden set rather than trusting their corpus matched mine.

### TR-3. "Design a RAG system. An employee asks a question over company documents." ⭐ **3/3**
**4-5 min. Ask questions for the first 60 seconds — do not start drawing.**
> *"Before I draw — roughly how many documents, what's the latency budget and is that
> time-to-first-token or full completion, and are these documents permissioned per user?"*
>
> Then the two lanes (`RAG_DEEP.md` §10): **Offline** — parse, structure-aware chunk ~512 tokens with
> light overlap, index small children and return parents, embed, build **both** a vector index (HNSW)
> and a BM25 index. **Online** — rewrite to standalone if conversational, dense and sparse **in
> parallel** for top-50, fuse with **reciprocal rank fusion**, rerank to top-3-5 with a cross-encoder,
> assemble strongest-chunk-first because of *lost in the middle*, generate at temperature 0 with a
> citation requirement and explicit permission to say "I don't know."
> **Then unprompted:** *"And I'd measure retrieval and generation separately, because when the answer
> is wrong I need to know whether the chunk wasn't retrieved or was retrieved and ignored."*

**The framing line that separates you:** *"the offline lane sets the ceiling — if the answer isn't in
a well-formed chunk, nothing online recovers it. Most teams over-invest in the online lane."*

**Probe: "These documents are permissioned. How?"** ← **your home turf, and you built it**
> "Pre-filter by ACL at the vector-search level, before ANN, derived from the caller's auth token,
> never from the request body. Post-filtering leaks the *existence* of documents and breaks top-k —
> you retrieve 100 and keep 2. For multi-tenancy I'd prefer physical separation, a namespace per
> tenant, over a filter, because a filter bug is a cross-tenant leak and that's the one failure that
> ends a contract. I built exactly this — two-dimensional, a clearance lattice **and** a role gate,
> because role-only forces you to over-grant or invent a near-duplicate role per exception, and
> clearance-only lets a cleared user read a department they have nothing to do with. That's the same
> lesson I learned shipping a field-level permission model across five personas on an IAM system."

### TR-4. "How do you decide chunk size?" — 2/3 · **30-40 s**
> "A tension, not a setting. Small chunks embed tightly so they match precisely but hand the model a
> fragment; large chunks keep context but the embedding averages several topics so it matches
> everything weakly. I start around 512 with 10-15% overlap and tune against a retrieval eval set.
> But the real move is to stop trading off — **decouple the unit you search from the unit you read**:
> index small children, return the parent."
*Probe: "What's overlap for?" → so a fact straddling a boundary appears whole somewhere. Heavy
overlap is a smell that the boundary strategy is wrong.*

### TR-5. "Which vector database, and why?" — 2/3 · **35-45 s**
> "On scale, filtering needs, operational burden and what's already in the stack — not feature lists.
> Under ~10M vectors **pgvector is the boring correct answer**: you inherit backups, RBAC,
> transactions, a team that can run it, and you can join vectors to business rows. I'd take a
> dedicated vector DB only when I can name what Postgres can't do — dimensions above 2,000, sustained
> high-QPS ANN at 100M+, or distributed sharding I don't want to build. And FAISS isn't a database at
> all, it's a library — no persistence, no filtering, no updates without a rebuild."
*Boring infrastructure is a documented HIRE signal. pgvector before Pinecone says you've shipped.*

### TR-6. "Cosine, dot product, Euclidean — which?" — **DESIGNATED BLUFF PROBE** · **25-35 s**
> "Cosine measures the angle only, ignoring magnitude — and magnitude in text embeddings mostly
> tracks document length and token frequency, which aren't relevance. **The part worth adding: if the
> vectors are already L2-normalised — which most modern embedding APIs return, and mine are — cosine,
> dot product and L2 rank identically, because they're monotonic transforms of each other.** So the
> choice matters for unnormalised vectors, and it matters for performance: dot product on
> pre-normalised vectors is a single fused op, which is what ANN indexes actually run."
**That normalised clause is the whole point of the question.**

### TR-7. "How does a vector database search fast?" · **30 s**
> "**HNSW** — a hierarchical navigable small-world graph, essentially a skip list generalised to
> vector space. Upper layers sparse for long jumps, lower layers dense for fine search, giving
> logarithmic-scaling search. Default in pgvector, Qdrant, Weaviate and Elasticsearch for good
> reason: best recall-versus-latency. You pay in memory for graph edges and in build time. The
> runtime dial is `ef_search` — recall against latency without re-indexing."
*Trap: naming a **vendor** when asked about a **mechanism** is a tell. Name the algorithm.*

### TR-8. "What is LangChain?" ⭐ **3/3 — JD-NAMED** · **40-50 s**
> "Four primitives: **Chains** — composing prompt, model and parser through the Runnable interface;
> **Tools** — functions the model can call, where the type hints are the schema and the docstring is
> the description the model actually reads; **Agents** — the model decides which tool and when to
> stop; **Memory** — conversation state. Plus retrievers and output parsers.
>
> The thing I'd flag is that this changed with LangChain 1.0. `LLMChain`, `ConversationBufferMemory`
> and friends moved out to `langchain-classic`, and v1 collapsed everything into a single agent
> abstraction, `create_agent`, **which returns a compiled LangGraph graph**. So in current LangChain
> 'memory' isn't a class you attach — it's a checkpointer for within-thread history and a Store for
> cross-thread facts."
**That second paragraph is probably the highest-scoring thing you can say about LangChain.**

### TR-9. "LangChain vs LangGraph vs LlamaIndex?" · **40 s**
> "They're not three of the same thing — that's the first thing I'd say. **LangChain** is the
> component layer. **LangGraph** is the orchestration runtime underneath — stateful graphs with
> cycles, checkpointing, HITL, time travel; same company, and `create_agent` literally returns a
> compiled LangGraph graph, though LangGraph runs standalone with no LangChain dependency.
> **LlamaIndex** started as the data framework and has added Workflows, which is event-driven steps
> rather than a declared graph. Document-heavy RAG where retrieval quality is the whole problem:
> LlamaIndex. Stateful control flow needing persistence, approvals, replay: LangGraph. They compose."
*Probe: "Which for our use case?" → **never answer without asking one question first.** "Depends where
the difficulty is — retrieval quality or control flow? Which is closer to what you're building?"*

### TR-10. "Parallel branches writing the same state key in LangGraph?" · **30 s**
> "It raises **`InvalidUpdateError`** — 'can receive only one value per step.' Without a reducer a
> state key is a `LastValue` channel accepting exactly one write **per super-step**, and parallel
> branches land in the same super-step. A hard failure, not a race — LangGraph refuses to silently
> pick a winner. Fix: an `Annotated` key with a reducer like `operator.add` or `add_messages`.
>
> **The more dangerous version is sequential.** Two nodes writing the same un-reduced key in
> *different* super-steps produce **no error at all** — the second silently clobbers the first. That's
> the bug that actually reaches production."
*Volunteering the sequential case is the single best move available in this topic.*

### TR-11. "Checkpointer vs Store?" · **30 s**
> "Checkpointer is within-thread, Store is cross-thread. The checkpointer is why the bot remembers
> you said 'my name is Devang' three messages ago in *this* chat; the Store is why it still knows in
> a **brand new** chat tomorrow. The checkpointer writes itself, storing full state snapshots keyed by
> `thread_id`; the Store I write deliberately, keyed by a namespace like `(user_id, 'memories')`, with
> optional semantic search. Without a checkpointer, `thread_id` is accepted and **silently ignored**."
*Probe: "So the checkpointer is your memory system?" → **Say no.** Short-term, within-thread only.
Then volunteer the Store. That correction is the answer.*

### TR-12. "How does function calling work? How does the model pick?" — S2 · **35-45 s**
> "The model doesn't call anything. It emits a structured token sequence naming a tool and a JSON
> argument object, based on the tool schemas and descriptions in its context. My runtime parses that,
> executes, and feeds the result back as a new message. So the **tool description is prompt-engineering
> surface area** — a vague docstring isn't a style problem, it's a bug, because that text is literally
> what the model reads to decide. And I validate arguments against the schema before executing,
> because malformed or partial arguments are a normal Tuesday, not an exception."

### TR-13. "How do you force JSON or CSV output?" — S2 · **30 s**
> "Ladder, weakest to strongest: prompt instruction, few-shot examples, an output parser with retry,
> then **constrained decoding or provider-native JSON schema mode** — provider-enforced rather than
> hoped for. Then validate and repair. In LangChain v1 that's `response_format` on `create_agent`,
> which picks `ProviderStrategy` where native structured output exists and falls back to
> `ToolStrategy` — emulating it through tool calling — where it doesn't. Plan for two failure modes:
> schema validation failure, and the model emitting *multiple* structured outputs when you expected one."

### TR-14. "Fine-tuning vs RAG?" — 2/3 · **HIGHEST-PROBABILITY CONCEPT Q** · **40-50 s**
> "They fix different failures, so first I diagnose: **knowledge gap or behaviour gap**? Knowledge gap
> — private, fresh, or changing data — that's RAG, because fine-tuning teaches form better than fact
> and goes stale the day the data changes. Behaviour gap — format, tone, domain idiom — prompting and
> few-shot first, fine-tune only if that plateaus and you have consistent labelled examples.
>
> The two decisive enterprise arguments for RAG: **citations** and **per-user access control**, and a
> fine-tuned model gives you neither — it can't say where it learned something and can't un-learn it
> for one user. In production they compose: RAG for facts, a light fine-tune for format. **Cheapest
> and most reversible first.**"
*Probe: "Why not fine-tune on the documents?" → can't cite, can't update incrementally, can't scope by
permission, and it interpolates between half-memorised facts — which is how you manufacture confident
hallucinations.*

### TR-15. "Temperature? Top-k vs top-p?" — S2, YOUR BAND · **SCREENING FILTER** · **30 s**
> "Temperature **divides the logits by T before the softmax** — below one sharpens toward
> deterministic, above one flattens, at zero it's effectively greedy. Top-k keeps the k
> highest-probability tokens and renormalises — a fixed cap. Top-p keeps the smallest set whose
> cumulative probability exceeds p, so it **adapts**: narrow when confident, wide when not. **The
> distinction that matters: temperature *reshapes* the distribution, top-k and top-p *truncate* it.**
> For a RAG answer, temperature 0 and top-p 1 — determinism is what makes the system evaluable."
*Probe: "Does temperature 0 stop hallucination?" → **No.** It removes variance, not error.*

### TR-16. "Why do LLMs hallucinate, and how do you reduce it?" — 2/3 · **40 s**
> "Mechanism first: the objective maximises the likelihood of the next token — it optimises
> **plausibility, never truth**. There's no truth term in the loss. So when the model lacks a fact it
> has no 'no result' state; it emits the most plausible continuation, and a fabricated citation looks
> identical to a real one to the loss function. RLHF made it worse by rewarding confident answers —
> we trained hedging out.
>
> Mitigation ladder, in order: **ground it** with retrieval and citations; **give it an exit** —
> models won't say 'I don't know' unless permitted; **constrain the output** with a schema; **verify
> after** against the retrieved context; **abstain** below a retrieval score threshold. A system that
> can say 'I don't know' is the strongest safety feature I can name in an enterprise context — and
> it's a path I actually built, with rows in my eval set that are *supposed* to abstain."
*Trap: a definition ("it makes things up") is the junior answer.*

### TR-17. "How do you know your RAG system works?" ⭐ **#1 HIRE/NO-HIRE SEPARATOR** · **50-60 s**
> "First I stop evaluating 'the RAG system' and evaluate **two systems: retrieval and generation,
> separately.** On retrieval, **context recall** — is the needed information even present, that's the
> ceiling — and **context precision**, is it ranked high. On generation, **faithfulness** — is every
> claim supported — and **answer relevance**. Because when an answer is wrong I need to know whether
> the chunk wasn't retrieved or was retrieved and ignored. Different bugs, different fixes.
>
> The framing I'd draw is the **RAG Triad**: context relevance, groundedness, answer relevance. Three
> edges; whichever fails tells you which stage to fix. **Ragas** is the standard framework and it's
> notably **reference-free**, so I can evaluate on production traffic, not just a golden set.
>
> Concretely — I hand-built a **40-question golden set** over my corpus, each question tagged with
> the asking principal and its expected source documents, plus rows that *should* abstain because the
> principal isn't authorised. Recall@5 was «X», and one chunk-size ablation moved it by «Y»."

**Going silent here is the single fatal no-hire signal. This answer, unprompted, is your strongest
single move all day.**

### TR-18. "LLM as a judge — what goes wrong?" · **40 s**
> "Position bias — prefers whichever came first, so swap order and average. Verbosity bias — longer
> scores higher regardless of quality. Self-preference — rates its own family higher, so use a
> different family as judge than as generator. Poor calibration — 1-10 scores cluster on 7 and 8 and
> aren't stable, so binary or three-point rubrics are far more reliable. And it's prompt-injectable
> through retrieved content, which is OWASP LLM01. So I treat the judge as **a model that needs its
> own eval**: hand-label 50-100 examples, measure judge-versus-human agreement, then trust it to
> scale. An unvalidated judge is a number that feels like measurement and isn't."

### TR-19. "10M documents, sub-2-second latency. Design it." · **4-5 min, clarify first**
> **Clarify (60 s, graded):** p50 or p99? Time-to-first-token or full completion? Permissioned?
> On-prem or cloud? State assumptions aloud.
>
> **Napkin math, out loud:** "10M docs at ~20 chunks each is **~200M chunks**; at 1024 dims × 4 bytes
> that's **~800 GB** raw plus HNSW graph overhead. That doesn't fit in one machine's RAM, so the
> architecture is decided by that number, not by preference. Two levers: **compress** — Matryoshka
> truncation plus product quantization, ~800 GB down to tens of GB, with full-precision rescoring on
> top candidates — or **shard**. I'd compress before sharding, because sharding adds fan-out and a
> slowest-shard tail-latency problem."
>
> **Latency table:** gateway 50 ms · query embed 30 ms · ANN + BM25 in parallel 100 ms · RRF 5 ms ·
> rerank 200 ms · assembly 15 ms · **LLM prefill to first token 500-800 ms.**
>
> **The reframe:** "Sub-two-seconds only means anything if we're measuring **time-to-first-token with
> streaming**. Generation owns roughly 70% of that budget. If it's full completion at 2 seconds, the
> honest answer is the fix isn't retrieval at all — it's a shorter answer or a faster model."
>
> **Close:** "And every stage after retrieval is optional under timeout. Rerank times out, I return
> fusion order. I degrade, I don't fail."

### TR-20. **CODING, on paper.** "Second largest without built-in functions. Provide test cases." — S3 verbatim
```python
def second_largest(nums):
    if nums is None:
        raise ValueError("input is None")
    largest = second = None
    for n in nums:
        if largest is None or n > largest:
            second = largest
            largest = n
        elif n != largest and (second is None or n > second):
            second = n
    return second        # None when there is no distinct second
```
**The five test cases — this is the actual question:**

| Input | Expected | Why it's here |
|---|---|---|
| `[]` | `None` | empty |
| `[5]` | `None` | single element |
| `[7,7,7]` | `None` | all duplicates — no *distinct* second |
| `[3,9]` | `3` | exactly two |
| `[-5,-2,-9]` | `-5` | negatives — catches an `int`/`0` sentinel bug |

> **Say while writing:** "One pass, O(n) time, O(1) space. The interesting part is the contract: does
> 'second largest' mean the second *distinct* value or the second *positional* value? I've assumed
> distinct, which is why `[7,7,7]` returns None rather than 7. If you want positional I drop the
> `n != largest` guard. I'd want that pinned down before shipping it."

**Trap:** the test cases are the graded part. Initialising to `0` or `-inf` is the classic bug and
the negatives case catches it. **Naming the ambiguity in the spec is worth more than the code.**

### TR-21. Python rapid-fire — S1's list · **20-30 s each**
- **Decorators** → "A function taking a function and returning a wrapped one; `@` is sugar for
  `f = decorator(f)`. Use `functools.wraps` to preserve name and docstring. I use them for
  cross-cutting concerns — timing, retry, auth — so the concern isn't copy-pasted everywhere."
- **Comprehension vs generator** → "A comprehension builds the whole list in memory; a generator
  yields lazily. Over a large file that's the difference between working and an OOM."
- **Threading vs multiprocessing** → "The GIL means one thread executes Python bytecode at a time,
  so threads help **I/O-bound** work and not CPU-bound. CPU-bound needs multiprocessing — separate
  interpreters, at the cost of IPC and pickling. For LLM work almost everything is I/O-bound on API
  calls, so async or threads are the right tool."
- **`classmethod` vs `staticmethod`** → "`classmethod` gets the class as first arg — alternative
  constructors, and it respects subclassing. `staticmethod` gets nothing; it's a namespaced function."
- **Tuples vs lists** → "Tuples are immutable, which makes them **hashable**, so they can be dict
  keys or set members. That's the practically important difference, not the syntax."
- **Inheritance vs composition** → "I default to composition — inheritance couples you to a parent's
  internals. Inheritance for genuine is-a relationships and interfaces."

### TR-22. "Anything that broke in production that you had to diagnose?" · **90 s**
*Answering "nothing" is a documented NO-HIRE signal.*
> `STAR_STORIES.md` S2: "I built the offline sync queue thinking about the network *dropping*, not
> about it being *ambiguous* — where the client doesn't know if the operation landed. A retry after
> that could apply twice, and in a warehouse that's real stock counted twice. Fix was
> client-generated operation IDs so the server recognises a replay. What actually changed was my
> model: I'd been thinking about offline as store-and-forward, and it's really **exactly-once
> delivery over an unreliable channel**. Those are the same primitives as production LLM engineering
> — flaky endpoints, 429s, partial responses, idempotency."
> **Then add the one from `permrag` this week.**

### TR-23. Closing the TR
> "Thank you — is there anything about my background you'd like me to go deeper on before we finish?"

This surfaces an unspoken objection while you can still address it. If the band concern is sitting
unsaid in their head, this is the question that lets it out — and you have a prepared answer.

---
# PART 2 — MR (MANAGERIAL) · target 25 min
*Senior manager, frequently the person who would own you on a project. They are asking one question:
**would I put this person in front of a client?***

**⚠️ MR IS NOT NON-TECHNICAL.** S1 shows LangChain, eval metrics and FT-vs-RAG all asked *in MR*.

**MR-1. "Walk me through your current project."** — the two-project version in
`TCS_MANAGERIAL_HR.md` §2, ending on: *"Both are systems where being quietly wrong is expensive.
Wrong inventory shows up at audit weeks later; wrong access permissions show up as an incident."*

**MR-2. "The role says 4-10 years. You have 2-3." ⭐ THE MR ROUND'S REAL QUESTION** · **90 s**
Use `EXPERIENCE_GAP_NARRATIVE.md` ⭐ THE ANSWER in full. Four beats: *literal number → density (601
items, 3 domains) → altitude (a framework other teams built on; a permission architecture across 5
personas) → the discipline is younger than the band, so the band is a proxy for judgment — test me on
that directly.* Then: **"If I fall short on it, that's a real answer and I'll take it."** Then stop.
**Trap:** don't add a fifth point, don't apologise, don't say "I know I'm underqualified but…".
*Probe: "What would you have learned in year four or five?"* ← the honesty test; claiming nothing loses
the room. Two things: **longevity with a system** you decided on four years ago, and **organisational
scale** — influencing across teams with no shared manager.

**MR-3. "Deadline you can't meet without cutting quality."** — the IAM lifecycle answer: **split scope
first, then negotiate.** Non-negotiable was the change-request validation; negotiable was breadth. Go
with a *specific proposal*, not a problem. Name the cost you accept: *"you look like the engineer who
pushes back — I'd rather carry that than ship something that fails on a security surface."*

**MR-4. "A technical disagreement."** — the icon-based i18n story. The load-bearing part: *"what
resolved it wasn't winning an argument — it was conceding the real weakness in my own position first."*

**MR-5. "Requirements change at the last minute."** — the Campaigns framework. *"My first reaction is
to absorb it; my second is to ask whether this class of change keeps happening — because if it does,
the real fix is that the system shouldn't require code for it."*

**MR-6. "Two urgent things, one of you."** — **"By blast radius and reversibility, not by who's
shouting."** *"Deferring silently is how the second item becomes an incident with your name on it."*

**MR-7. "Tell me about a mistake."** — the idempotency story (same as TR-22; reusing across rounds is
fine, contradicting yourself is not). Lead with what changed in your model, not the bug.

**MR-8. "How would you evaluate a GenAI system before a client sees it?"** ← technical, in MR
TR-17 compressed to 40 s, plus: *"the golden set exists before the demo, not after. What goes wrong on
an engagement is that quality regresses silently — nothing throws an exception when a RAG system gets
worse. So eval runs in CI on every prompt, chunking, model or index change, and every client complaint
becomes a permanent regression test."*

**MR-9. "Real-world challenges of GenAI in an enterprise?"** — S1 · **60 s**
> "Four, in the order they bite. **Grounding** — answer from the client's data, not the training set.
> **Permissions** — a RAG system that ignores ACLs is a data-leak incident, so filtering happens
> pre-retrieval and I'd prefer per-tenant physical separation over a filter. **Evaluation** — deciding
> whether the output is right is harder than generating it, and it degrades silently. And
> **containment** — you can't fully prevent prompt injection, so I design for blast radius: least
> privilege on tools, no irreversible action without human confirmation, and never the lethal trifecta
> of private data, untrusted content and an outbound channel in one agent."

**MR-10. "Have you led or mentored anyone?"** — at the right altitude, no invented reporting line:
*"I lead by artifact and demonstration. I introduced spec-driven development by running my own delivery
that way first, and when the defect pattern was visibly different, others picked it up. That's
influence without authority rather than formal leadership."*

**MR-11. "Why leave a product company for services?"** — *sharp, be ready.* **Range and proximity to
the problem.** *"For GenAI the model is roughly the same everywhere, and everything that decides
whether an implementation succeeds is the client's data, constraints and risk appetite."*

**MR-12. Your questions (ask 2-3, written on your notepad)**
1. "How much of this role is building GenAI systems for clients versus internal platform and
   accelerators — something like WisdomNext — that engagement teams reuse?"
2. "What does the evaluation story look like on a live engagement? I've found deciding *whether the
   output is right* is harder than generating it."
3. "Where do enterprise GenAI engagements stall — data readiness, guardrails and compliance, or
   pilot-to-production?"
**Never ask in MR:** leave policy, WFH, appraisal percentages, "how many rounds are left."

---
# PART 3 — HR ROUND · target 15 min
*Rarely eliminates someone who cleared TR+MR. The two ways to lose it: an unjustifiable CTC
expectation, and evident inflexibility on location.*

**HR-1. "Why are you looking for a change?"** — `TCS_MANAGERIAL_HR.md` §3. **Never say anything
negative about ElasticRun, your manager, or the work — HR is explicitly listening for it.** Frame as
direction, not escape.

**HR-2. "Notice period?"** — **«FILL — confirm your exact contractual notice before Aug 1. Do not
guess in the room.»** If 30 days: *"Thirty days, started the day I have a written offer — realistically
four to five weeks."* If 60/90: serve it properly, raise early release, mention buyout openness, commit
to a firm date. **Never promise a date you can't hold.**

**HR-3. "Salary expectations?"** — **Anchor 18. Range 16-18 fixed. Soft floor ~14. Know your walk-away.**
> "My current fixed is «X» lakhs. Based on GenAI-focused roles in India at my level I'm looking at
> sixteen to eighteen lakhs fixed — grounded in the breadth I bring on day one, three product domains
> and full-stack across mobile and web, and hands-on GenAI systems work rather than exposure to it.
> That said, I'm flexible on structure, and I care about the level and the project as much as the number."
**Do not** state below 16 first. **Do not** say "as per company standards." **Do not** invent a
competing offer. *If they say the band caps lower:* "Can I ask what the constraint is — the grade I'd
map to, or the range for the role? If it's the grade, I'd rather discuss the level than trade down."

**HR-4. "Flexible on location?"** — **Yes-with-preference, in that order.** A reflexive "Pune only" is a
documented rejection trigger. *"Yes, open to relocating for the right project. Pune-based so it's
smoothest and my preference, but not a condition."* *If pushed: "Yes, I'll go where the role is."*

**HR-5. "Why TCS?"** — three specifics (they check): **WisdomNext**, a GenAI aggregation platform with
evaluator bots and guardrails — a real recognition that model choice is a moving target and the durable
engineering is the layer around it. **Everest Group PEAK Matrix Leader, March 2026.** And **range** —
many industries, many data realities.

**HR-6. "Strength and weakness?"** — Strength: turning a vague requirement into a precise contract
before anything gets built. Weakness: **historically under-instrumented** — "I can tell you manual entry
dropped sharply because operators stopped falling back to it, but I can't quote the ratio, because I
didn't instrument capture-path selection from day one. I've started treating measurement as part of the
definition of done." *(Real, specific, already fixed — the strongest shape.)*

**HR-7. "Three to five years?"** — owning the design of an enterprise GenAI system end to end —
retrieval, guardrails, evaluation, and the judgment about what should and shouldn't be automated —
**in front of clients**, not only behind them.

**HR-8. "Shifts / on-call / travel?"** — Yes, with the expectation set explicitly rather than discovered.

**HR-9. "Education or employment gaps?"** — None. B.Tech VIT Pune 2020-2024, 9.3 CGPA; full-time intern
at ElasticRun from Aug 2023 through final year, converted to full-time July 2024.

**HR-10. Your questions for HR** — grade and progression for a lateral, what the first review looks
like; and whether there's structured time to go deep on new techniques or whether that happens inside
delivery.

---
## THE STALL-LIST — the actual output of this mock

| # | Question | Stalled / hedged / rambled | Fix |
|---|---|---|---|
| | | | |

**Rule:** anything on **both** the Jul 30 and Jul 31 lists goes on the revision card verbatim.
Anything on only one — say it aloud three times and move on. **Do not go looking for new material to
close a gap on Jul 31.** See `CUT_LIST.md`.

---
## THREE THINGS TO SAY WHEN YOU DON'T KNOW
Never bluff — a GenAI interviewer catches it in ~30 seconds and it poisons the rest of the round.
1. **"I haven't used that in production, but here's how I'd reason about it —"** then reason from the
   mechanism. Visible first-principles reasoning scores better than a memorised answer.
2. **"I know the shape of that but not the numbers — what I'd do is measure it."**
3. **"That's the part I'd want to validate before committing to it."**

Calibrated uncertainty reads as senior; false confidence reads as junior — doubly so in GenAI, where
confident wrongness is literally the failure mode you're being hired to prevent. **Use one deliberately
in every round.**
