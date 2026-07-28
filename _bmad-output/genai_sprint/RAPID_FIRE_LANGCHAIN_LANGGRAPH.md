# RAPID FIRE — LANGCHAIN & LANGGRAPH (32 Q&A)

**The missing companion to `research/RAPID_FIRE_RAG_LLM.md`.** Sourced entirely from
`research/LANGCHAIN_DEEP.md` and `research/LANGGRAPH_DEEP.md`, both verified against
`langchain-core 1.5.1` / `langgraph 1.2.9` on 27 Jul 2026.

**Study budget: 45 min for a first pass (Jul 29 B2.5), then 10 min out loud on Jul 30 and Jul 31.**

**How to drill:** cover the answer, say yours **out loud and timed**. Target **20-40 seconds**.
Past 45s you are lecturing — the interviewer stops listening and starts waiting. Under 15s you
sounded thin.

**Answer shape:** `[Direct answer] → [Mechanism / why] → [One concrete consequence]`. Then stop.
The silence invites the follow-up, and the follow-up is where you win.

> ⚠️ **Calibration, stated once so you spend your time correctly.** LangChain is asked **3/3** in
> the verified TCS sources. **LangGraph is JD-named but appears in ZERO candidate reports.** So
> Section A (LangChain) is the one you must own cold. Section B (LangGraph) is a **hedge** — enough
> to sound like someone who has built with it, not a research investment. If you only have 20
> minutes, drill A1-A6 and B1, B4, B5, B7.

---

## A. LANGCHAIN — 3/3, JD-NAMED, DRILL THESE HARDEST

**A1. What is LangChain?** ⭐
> "It's the component and integration layer for LLM applications — standard interfaces over models,
> prompts, tools, embeddings, vector stores and retrievers, so I can swap a provider without
> rewriting my application. Four primitives people usually mean: **chains** for composition,
> **tools** for functions the model can call, **agents** where the model decides which tool and when
> to stop, and **memory** for conversation state. On top of that, since v1, exactly one high-level
> abstraction: `create_agent`."
*Probe: "Why use it at all instead of the provider SDK?" → portability and a standard tool
interface. If I only need one provider and one prompt, I'd skip the framework — the abstraction
isn't free.*

**A2. What changed in LangChain 1.0?** ⭐ **THE HIGHEST-SCORING ANSWER IN THIS FILE**
> "v1 deleted almost every abstraction the old tutorials teach. Legacy chains — `LLMChain`,
> `ConversationalRetrievalChain` — and all the memory classes like `ConversationBufferMemory` moved
> out to a separate package, `langchain-classic`. v1 collapsed everything into **one high-level
> abstraction: an agent abstraction built on LangGraph**, `create_agent`. So in current LangChain,
> memory isn't a class you attach to a chain — it's a **checkpointer** for within-thread history and
> a **Store** for cross-thread facts."
*This is exactly where a candidate who learned from 2023 blog posts and a candidate who's current
diverge. Say it unprompted if LangChain comes up at all.*

**A3. What are the four LangChain primitives?** — asked 3/3
> "**Chains** — composing prompt, model and parser through the Runnable interface, so I get invoke,
> batch, stream and async uniformly. **Tools** — Python functions exposed to the model, where the
> type hints *are* the input schema and the docstring *is* the description the model reads.
> **Agents** — the loop where the model decides which tool to call and when it's done. **Memory** —
> conversation state, which in v1 means persistence you configure rather than a class you attach.
> Plus retrievers and output parsers as the RAG building blocks."

**A4. What is `create_agent` and what does it return?**
> "It's the standard way to build agents in LangChain 1.0, superseding both `AgentExecutor` and
> `langgraph.prebuilt.create_react_agent`. You give it a model, tools, a system prompt, optionally
> middleware, a checkpointer, a store, and a `response_format`. **The key fact is that it returns a
> compiled LangGraph graph** — so you get persistence, streaming, human-in-the-loop and time travel
> for free without writing any graph code."
*Probe: "And if that loop isn't the shape you need?" → I drop down and write the `StateGraph`
myself. Low floor, high ceiling — that's the escape hatch `AgentExecutor` never had.*

**A5. Is LCEL dead?**
> "No — narrowed, not deprecated, and I'd be careful with the distinction. Runnables are still the
> core interface: models, prompts, tools and retrievers all implement it, and LangGraph nodes accept
> them. What's de-emphasised is building *applications* as long LCEL pipes. My rule is LCEL for
> short, linear, stateless transforms — prompt to model to parser — and LangGraph the moment there's
> a cycle, a branch, persistence, or a human in the middle."
*Trap: claiming LCEL is deprecated is factually wrong and an informed interviewer will correct you.*

**A6. How do you define a tool, and what actually makes it work?**
> "Decorate a function with `@tool`. **The type hints are the input schema and the docstring is the
> tool description** — and that description is literally the prompt the model reads to decide when
> to call it. So a vague docstring isn't a style problem, it's a bug. Practical rules: snake_case
> names for provider compatibility, `args_schema` with a Pydantic model for complex inputs, and
> `config` and `runtime` are reserved parameter names you can't use."
*Probe: "How does the model actually pick?" → it doesn't call anything — it emits a structured token
sequence naming a tool and JSON args, based on the schemas in context. My runtime parses, executes,
and feeds the result back as a new message.*

**A7. How do you get structured output?**
> "`response_format` on `create_agent` with a Pydantic model, TypedDict, dataclass or raw JSON
> schema; the result lands in the `structured_response` key. LangChain auto-selects between two
> strategies: **`ProviderStrategy`**, using the provider's native structured-output feature where it
> exists — OpenAI, Anthropic, Gemini, Grok — and **`ToolStrategy`**, emulating it through tool
> calling where it doesn't. Knowing both exist matters because the failure modes differ, and
> `ToolStrategy`'s `handle_errors` is what you tune when the model emits multiple structured outputs
> or fails validation."

**A8. Where did memory go?**
> "Out to `langchain-classic`, and it was replaced rather than ported. The current model has two
> layers, both from LangGraph: a **checkpointer**, thread-scoped, for 'what did we say earlier in
> *this* conversation', and a **Store**, namespace-scoped like `(user_id, 'memories')`, for 'what do
> I know about *this user* across conversations'. And the context-window problem the old Memory
> classes existed to solve is now explicit: trim, delete via `RemoveMessage`, or summarise the
> message list in a node — which I prefer, because I can see and test it."

**A9. What's the migration story from `AgentExecutor`?**
> "`AgentExecutor` was a **black-box loop** — you got an answer and a list of intermediate steps,
> and if it went wrong mid-run you started over. `create_agent` returns a compiled graph, so the
> same loop is now inspectable and interruptible: stream each step, pause for approval before a
> destructive tool, persist across a process restart, replay a bad run from the checkpoint before it
> broke. Same ergonomics at the entry point, completely different debuggability."

**A10. What are the downsides of LangChain?** — *a defensive answer costs you*
> "Two real ones. The **abstraction churn** — v1 broke a lot, moved chains and memory to
> `langchain-classic`, so most existing code and nearly all tutorials are stale. And the
> abstractions can **hide what's actually in the prompt**, which matters because context engineering
> is where agent reliability lives. That's exactly why v1 collapsed to one abstraction with an
> escape hatch. If I only needed one provider and one prompt, I'd skip the framework."

**A11. LangChain vs LangGraph vs LlamaIndex?** ⭐ near-certain
> "They're not three of the same thing — that's the first thing I'd say. **LangChain** is the
> component layer. **LangGraph** is the orchestration runtime underneath it — stateful graphs with
> cycles, checkpointing, HITL, time travel. Same company, and `create_agent` literally returns a
> compiled LangGraph graph, though LangGraph is usable standalone with no LangChain dependency.
> **LlamaIndex** started as the data framework — ingestion, indexing, retrieval — and has added
> Workflows, which is **event-driven** steps rather than a declared graph. Document-heavy RAG where
> retrieval quality is the whole problem: LlamaIndex. Stateful control flow needing persistence,
> approvals and replay: LangGraph. In practice they compose."
*Probe: "Which for our use case?" → **never answer without asking one question first.** "Depends
where the difficulty is — retrieval quality or control flow? Which is closer to what you're
building?" Turning it back shows you pick tools from requirements, not preference.*

**A12. What's "agentic RAG" and when would you not use it?**
> "Classic RAG is two fixed steps — always retrieve, then generate. Agentic RAG makes **retrieval a
> tool**, so the agent decides *whether*, *when* and *how* to retrieve, and can retrieve again after
> seeing the first results. It handles 'no retrieval needed' and multi-hop questions, which fixed
> two-step RAG structurally cannot. The tradeoff is latency and cost — extra model turns per query —
> so for a narrow, high-volume, well-understood workload I'd still take the deterministic pipeline."
*Naming the tradeoff is what makes it an engineer's answer instead of a trend-follower's.*

**A13. Do you know MCP?**
> "Model Context Protocol — a standard for exposing tools and context to a model, and LangChain can
> consume MCP servers as a tool source. The value is that a tool becomes a server anyone can consume
> rather than a function embedded in one app." *One sentence is enough; it signals you track the
> ecosystem without pretending to depth you don't have.*

---

## B. LANGGRAPH — JD-NAMED, HEDGE-LEVEL DEPTH

**B1. What is LangGraph, in 30 seconds?** ⭐
> "A low-level orchestration framework for stateful, multi-step LLM applications. You model the
> application as a graph: a shared state object, nodes that are just Python functions returning
> partial state updates, and edges — including conditional edges and **cycles** — that decide what
> runs next. The value isn't the graph notation; it's what comes with it: persistence via
> checkpointers, human-in-the-loop, streaming, time-travel debugging, crash recovery. LangChain's
> own framing is that it's an orchestration framework with agent abstractions built on top, not an
> agent abstraction itself."

**B2. Why LangGraph over LangChain?**
> "LangChain chains are one-pass DAGs. LangGraph is a **state machine that supports cycles**, so an
> agent can loop — act, observe, decide, act again. That's the headline. Everything else follows
> from the fact that state is persisted at each step rather than living in a call stack."

**B3. What's the execution model?** — *the mental model everything else falls out of*
> "It's modelled on Google's **Pregel** — bulk synchronous parallel. Execution proceeds in
> **super-steps**, discrete ticks. A node with multiple outgoing edges makes all destinations run in
> parallel **within one super-step**; sequential nodes occupy separate super-steps. A checkpoint is
> written **per super-step**, not per node. Three consequences you can derive from that: reducer
> conflicts are scoped per super-step, `recursion_limit` counts super-steps rather than node calls,
> and time-travel granularity is the super-step."
*Saying "super-step" out loud is the single word that marks you as a user rather than a
tutorial-watcher.*

**B4. What is a reducer, and what happens without one?** ⭐ **CONFIRMED QUESTION-BANK ITEM**
> "A reducer is a binary function — current value on the left, the node's update on the right —
> that decides how a partial update merges into state. Without one, the channel is `LastValue` and
> the update **overwrites**. So two **parallel** branches writing the same un-reduced key raise
> **`InvalidUpdateError`**: 'can receive only one value per step.' It's a hard failure, not a race —
> LangGraph refuses to silently pick a winner. You attach one with `Annotated`, like
> `Annotated[list, operator.add]`."
*Probe: "Is the order guaranteed?" → No, and I wouldn't rely on it. **A reducer must be safe to
apply in any order.** If order matters I write tagged entries and sort downstream, or make the
reducer itself order-independent — a dict merge or a set union.*

**B5. And if the two nodes are sequential instead of parallel?** ⭐ **VOLUNTEER THIS**
> "Then there's **no error at all** — each node gets its own super-step, so the missing reducer
> isn't a concurrent write, it's a silent overwrite. The first node's data is simply gone. That's
> the version that actually reaches production, and it's why I'd say the `InvalidUpdateError` is
> the *lucky* case."
*Answering B4 and then volunteering B5 unprompted is the strongest single move available in this
topic — it shows you understand the model rather than having memorised one error message.*

**B6. What's `add_messages` and why not just `operator.add`?**
> "It's the reducer for message lists, and it isn't a plain append. It appends new messages,
> **deduplicates and updates by message `id`** — same id replaces rather than duplicates —
> deserialises dicts into proper Message objects, and supports deletion via `RemoveMessage`. Plain
> concatenation gives you none of that, so a retried node would duplicate the whole turn.
> `MessagesState` is the prebuilt class with exactly that one key."

**B7. Checkpointer vs Store?** ⭐ **CONFIRMED INTERVIEW QUESTION**
> "Checkpointer is **within-thread**, Store is **cross-thread**. Concretely: the checkpointer is why
> the bot remembers you said 'my name is Devang' three messages ago in *this* chat; the Store is why
> it still knows tomorrow in a **brand new** chat. The checkpointer writes itself automatically,
> storing full state snapshots keyed by `thread_id`; the Store I write to deliberately, keyed by a
> namespace tuple like `(user_id, 'memories')`, with optional semantic search. They're not
> alternatives — I almost always compile with both."
*Probe: "So the checkpointer is your memory system?" → **Say no.** Short-term, within-thread only.
Then volunteer the Store. That correction is the answer.*
*Probe: "Could you just use one very long thread instead?" → It breaks two ways: the context window
grows without bound, and the memory is trapped in that conversation — nothing is queryable by user
across sessions.*

**B8. What happens if you pass a `thread_id` with no checkpointer?**
> "It's **accepted and silently ignored**. No warning, no error — the graph is just stateless per
> invocation and turn two has no memory of turn one. That's a nasty one because it looks like it's
> working. The checkpointer is what makes `thread_id` *mean* anything, and it's the prerequisite for
> memory, human-in-the-loop, time travel and crash recovery — all four are the same underlying
> feature: persisted state."

**B9. What are the checkpointer durability modes?**
> "`exit` persists only when execution finishes — fastest, no mid-run recovery. `async` persists
> asynchronously during the next step — good balance, small crash window. `sync` persists before the
> next step starts — maximum durability, slowest. It's a real dial: if I'm latency-sensitive and the
> work is cheap to redo, `exit`; if a step is expensive or has side effects, `sync`."

**B10. What backends does the checkpointer have?**
> "`InMemorySaver` bundled for development, `SqliteSaver` and `PostgresSaver` in separate packages
> with async variants, plus community ones like CosmosDB. In production it's Postgres — for the same
> boring reason I'd pick pgvector: it's already there, backed up and access-controlled."

**B11. Conditional edges — what's the trap?**
> "A conditional edge **adds to** normal edges from that node, it doesn't replace them. The docs warn
> about it explicitly. So a leftover `add_edge` sitting next to your router means **both fire, in
> parallel, in the same super-step** — the router chose the cheap path and the expensive path ran
> anyway. It's not an error, it's just double the LLM spend, and nothing tells you."

**B12. Cycles — what stops them?**
> "A conditional edge routing to `END` is the exit. Without one you hit `GraphRecursionError` — it
> doesn't hang, it raises. But the limit counts **super-steps**, so it's a safety net, not a design
> tool. The real fix is an explicit iteration counter in state that the router checks. I'd never
> rely on the recursion limit as my exit condition."
*On the number: "the classic default was 25 from langchain-core; LangGraph 1.x sets its own and
raised it substantially — I'd check for the version I'm on." **Precision plus an admission of
version-dependence reads as experience; a confidently wrong number reads as a memorised fact.***

**B13. What is `Send`?**
> "Runtime-sized fan-out — map-reduce. You return a list of `Send` objects from a conditional edge,
> one per item, and each launches the node with its **own private state**, not the shared graph
> state. Use it when the number of parallel branches isn't known until runtime. All N land in the
> same super-step, which is **exactly why the collecting key must have a reducer** — `Send` fan-out
> is the parallel-write problem at scale. Delete the reducer and you get `InvalidUpdateError` with N
> writers instead of two."

**B14. What is `Command`?**
> "A single return that **updates state and routes** at once: `Command(update={...},
> goto='next_node')`. You must annotate the return type with the possible destinations — that's how
> the graph builds its edges. And `graph=Command.PARENT` navigates to a node in the parent graph,
> which is the **handoff primitive** for multi-agent systems."
*Probe: "`Command` or a conditional edge?" → `Command` when the routing decision and the state update
come from the same computation — an LLM decided both. Conditional edge when routing is a pure
function of already-committed state.*

**B15. How does human-in-the-loop work?**
> "`interrupt()` inside a node pauses execution and surfaces a payload to the caller; the
> checkpointer holds the state; you resume with `Command(resume=value)` and that value becomes
> `interrupt()`'s return. Four canonical patterns: approve/reject, edit state, review a tool call,
> and provide missing input."
*Probe: "There's also `interrupt_before`?" → Static breakpoints, and the docs position them as
**debugging tools, explicitly not recommended for production HITL**. Most tutorials teach the static
form, which is why knowing the distinction is worth saying.*

**B16. The interrupt gotcha nobody expects** ⭐ **VOLUNTEER THIS UNPROMPTED**
> "On resume, LangGraph **re-executes the whole node from the top** — it does not resume at the line
> where `interrupt()` was called. So anything *before* the interrupt runs twice. If that line was
> 'charge the customer's card', you've just double-billed for one approval. The rule is: side
> effects go **after** the interrupt, or you make them idempotent with an idempotency key."
*Probe: "Why is it implemented that way?" → the unit of replay is the node, not the line. State is
persisted at super-step boundaries and a Python function's mid-execution stack isn't serialisable,
so re-running from a known checkpoint is the only recoverable option. Which is why the docs tell you
to write idempotent nodes generally, not just around interrupts.*

**B17. `interrupt()` with no checkpointer?**
> "The **pause works** — the interrupt surfaces in the `__interrupt__` key. The **resume raises**:
> 'cannot use `Command(resume=...)` without checkpointer'. It's a one-way door: a pause you can never
> come back from. And it fails at resume time, not at compile time — being able to say *when* it
> fails is the signal."

**B18. How does time travel work?**
> "`get_state_history` returns every checkpoint as a `StateSnapshot` with `values`, `next` and a
> `config` carrying its `checkpoint_id` — **newest first**. `next` tells you which nodes were *about*
> to run, which is how you pick a rewind point rather than by index. Pass that config back into
> `invoke` with `None` as input and it replays from there. Call `update_state` first and you
> **fork** — same thread, new branch, original checkpoints still reachable by id."
*Probe: "What's the catch?" → replay **re-executes** downstream nodes, so LLM calls and API requests
fire again — they aren't cached. And interrupts re-trigger.*

**B19. What are the streaming modes?**
> "Seven, but the two that matter: **`messages`** streams LLM tokens with metadata — that's what you
> send to the end user — and **`updates`** streams the state delta per node, which is how you show
> progress like 'searching…' or 'summarising…'. They answer different product questions. Also
> `values` for full state per step, `custom` for your own writer, plus `checkpoints`, `tasks`,
> `debug`. You can combine them in a list."

**B20. Multi-agent patterns in LangGraph?**
> "The primitive is a handoff: `Command(goto=..., graph=Command.PARENT)`. Each agent is typically a
> compiled graph used as a node in a parent graph. The patterns are single agent, **supervisor** —
> central LLM routes to specialists, my default because it's predictable and easy to bound —
> supervisor-as-tools where specialists are exposed as tools, network, hierarchical, and handoffs.
> The senior framing is that **the architecture choice is really a context-engineering choice** —
> it's deciding what each agent is allowed to see. Supervisor-as-tools keeps each specialist's
> context clean because results come back as tool observations; handoffs let context accumulate,
> which is cheaper on repeats and degrades on long multi-domain chains. I'd start with a single
> agent and split only when a specific context or tool-count problem forces it."

**B21. When is LangGraph the WRONG choice?** 🎯 **SENIORITY SIGNAL — VOLUNTEER IT**
> "Six cases. A single LLM call — that's a prompt template and an SDK call. A fixed linear pipeline
> with no branching, retries or human step — that's a Python function. Hard real-time, because
> checkpointing and the super-step loop add overhead. A team that doesn't know it on a simple
> problem — the graph model is a real onboarding cost. Pure retrieval with no control flow, where
> LlamaIndex is more direct. And when you're already on a platform-native orchestrator like Bedrock
> Agents and don't need portability.
>
> The flip side that makes it credible: **the moment I need any one of persistence across restarts,
> a human approval step, streaming partial progress, retries with recovery, or the ability to replay
> a bad run — I'd rather adopt LangGraph than hand-roll those five things. They're individually easy
> and collectively a project.**"
*Arguing **against** the framework is a documented HIRE signal. Reaching for a multi-agent system
where one retrieval call would do is a documented NO-HIRE signal.*

**B22. What state schema types can you use?**
> "`TypedDict` is the default and what I'd reach for. A dataclass if I want default values. A
> Pydantic `BaseModel` if I want recursive runtime validation — but the docs are explicit that it's
> less performant than the other two, so I'd only pay that where untrusted data enters state. And
> you can declare separate input, output and internal schemas, so nodes can pass private data that
> never appears in the public contract."

**B23. What does a node actually return?**
> "A **partial** dict, not full state — keys you omit are untouched. It can take up to three args:
> `state`, a `RunnableConfig` carrying `thread_id` and tracing metadata, and a `Runtime` exposing
> context, the store, and execution metadata. **And nodes should be idempotent** — the docs say so
> explicitly, because on resume the affected node runs again from the start of its function. They
> recommend idempotency keys, upserts, or read-before-write checks."

**B24. What's the Functional API?**
> "`@entrypoint` and `@task` — you get checkpointing, HITL and streaming with ordinary Python control
> flow, `if`/`for`/`while`, instead of declaring a graph. If my control flow is naturally imperative
> I'd use it; I reach for `StateGraph` when I actually want the graph to be inspectable and
> visualisable." *One line is enough — just know it exists.*

**B25. Have you built with LangGraph?** — *the honesty question*
> Answer truthfully at the altitude that's true. If your project used it, say what for and what the
> state shape was. If it didn't: *"Not in client production. I've built with it and — more usefully
> — I've broken it deliberately: parallel writes without reducers, interrupts without checkpointers,
> conditional edges mixed with normal edges. I'd rather tell you the failure modes I've actually seen
> than claim years I don't have."* **That is a strong answer.** Never bluff here — a panel that uses
> it daily detects it in 30 seconds.

---

## C. THE PATTERN VOCABULARY (Anthropic's five, + the LangGraph construct for each)

Asked as *"explain agentic architectures."* Naming the pattern **and** the construct is the most
senior-sounding move available to you on this topic.

| Pattern | What it is | LangGraph construct |
|---|---|---|
| **Prompt chaining** | Decompose into fixed sequential steps, optionally with a gate | plain `add_edge` sequence |
| **Routing** | Classify the input, dispatch to a specialised path | `add_conditional_edges` with a router fn |
| **Parallelization** | Sectioning (split the work) or voting (same work, N times) | multiple edges from one node + a reducer |
| **Orchestrator-workers** | A central LLM decomposes, workers execute, orchestrator synthesises | conditional edge returning `Send(...)` fan-out |
| **Evaluator-optimizer** | Generate → critique → regenerate until good enough | a **cycle** with a conditional edge to `END` |

**The thesis to quote:** *"build the right system, not the most sophisticated one."*
**And the criteria for when an agent is the wrong tool** (OpenAI's guide): agents suit complex
judgment, unmaintainable rulesets, and heavy unstructured data — *"otherwise, a deterministic
solution may suffice."*

---

## D. THE SIX THAT MOST OFTEN GO WRONG — DRILL THESE HARDEST

If you are short on time, these six carry the most weight per minute:

1. **A2** — what changed in LangChain 1.0. *The single highest-scoring thing you can say here.*
2. **A3** — the four primitives. *Asked 3/3. Missing it is disqualifying, not merely weak.*
3. **B4 + B5** — reducers, parallel *and* sequential. *Volunteering B5 is the whole game.*
4. **B7** — checkpointer vs Store. *Confirmed question, and the "so it's your memory system?" probe
   is a trap you must refuse.*
5. **A11** — the three-framework comparison. *Near-certain, and "they're not three of the same
   thing" reframes it in your favour immediately.*
6. **B21** — when LangGraph is wrong. *Nobody volunteers this, and it is a documented hire signal.*

---

## E. TWO SENTENCES TO CARRY

1. *"`create_agent` returns a compiled LangGraph graph."* — collapses the whole "how do they relate"
   question into nine words.
2. *"Low floor, high ceiling — `create_agent` when the default loop is the right shape, drop to
   `StateGraph` when it isn't."* — the design philosophy in one line.

---
*Companion: `research/RAPID_FIRE_RAG_LLM.md` (35 Q&A on RAG and LLM fundamentals).*
*Sources: `research/LANGCHAIN_DEEP.md` · `research/LANGGRAPH_DEEP.md` ·
`research/BREAKABLE_EXPERIMENTS.md` — all verified by execution, 27 Jul 2026.*
