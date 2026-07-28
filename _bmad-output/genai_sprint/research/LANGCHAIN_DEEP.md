# LANGCHAIN — DEEP DIVE (+ the LangChain vs LangGraph vs LlamaIndex answer)

Sourced from `docs.langchain.com/oss/python/langchain/*`, verified 2026-07-27.
Verified package versions in a clean install: `langchain-core 1.5.1`, `langgraph 1.2.9`.

---

## 🔴 THE MOST IMPORTANT THING IN THIS FILE

**LangChain v1 deleted almost every abstraction you've read about in older tutorials.**

If you walk in and say "I'd use `LLMChain` with `ConversationBufferMemory` and an `AgentExecutor`," you have
told the interviewer you learned LangChain from 2023 blog posts. Those all still *work* — but they now live in
a separate legacy package.

**The official v1 statement:** v1.0 replaced all previous chains and agents with
> *"only one high level abstraction: an agent abstraction built on top of LangGraph."*

### What moved to `langchain-classic`
- Legacy chains — **`LLMChain`, `ConversationalRetrievalChain`**, etc.
- **Memory classes** — `ConversationBufferMemory`, `ConversationSummaryMemory`, and friends
- Retrievers and the indexing API
- The `hub` module
- Deprecated functionality and `langchain-community` re-exports

You must `pip install langchain-classic` and rewrite imports to keep using them.

### What replaced them
`create_agent` — *"the standard way to build agents in LangChain 1.0."* It supersedes both `AgentExecutor`
/ `initialize_agent` **and** `langgraph.prebuilt.create_react_agent`.

### How to say it in the room
> "I'd flag that the answer changed with LangChain 1.0. The old chain and memory abstractions were moved out to
> `langchain-classic`, and v1 collapsed everything into a single agent abstraction, `create_agent`, which is
> itself built on LangGraph. So in current LangChain, 'memory' isn't a `Memory` class you attach to a chain —
> it's a checkpointer for within-thread history and a Store for cross-thread facts."

**That one paragraph is probably the highest-scoring thing you can say about LangChain**, because it's the exact
place where a candidate who studied from tutorials and a candidate who's current diverge.

---

## 1. `create_agent` — the one abstraction

```python
from langchain.agents import create_agent

agent = create_agent(
    model="provider:model_name",      # or an initialized model instance
    tools=[...],
    system_prompt="...",
    middleware=[...],
    checkpointer=InMemorySaver(),
    store=store,
    response_format=MySchema,
    name="researcher",                # for embedding in multi-agent systems
)
```

**It returns a compiled LangGraph graph.** Say that sentence — it collapses the whole "how do LangChain and
LangGraph relate" question into one clause.

Parameters worth knowing:
- `model` — `"provider:model"` string or instance. Providers include OpenAI, Anthropic, Google, Ollama, Fireworks.
- `tools` — Python callables, LangChain tools, or tool dicts.
- `system_prompt` — str or `SystemMessage`; can be made dynamic via middleware.
- `middleware` — the v1 extension point (execution, context, planning, fault tolerance, guardrails, steering).
- `checkpointer` / `store` — passed straight through to LangGraph.
- `response_format` — Pydantic/TypedDict/dataclass/JSON schema for structured output.

**The agent loop:** model reads state → decides tool call or final answer → tools execute, results append to
state → repeat until the model stops or a stopping condition fires.

Invocation:
```python
result = agent.invoke(
    {"messages": [{"role": "user", "content": "query"}]},
    config={"configurable": {"thread_id": "id"}},
    context=Context(user_id="123"),
)
```

Because it's a LangGraph graph, you get persistence, streaming, HITL, and time travel **for free, without
writing any graph code.** That's the pitch.

---

## 2. LCEL and Runnables — the honest current status

**Be careful here, and be precise — this is a place to sound current rather than encyclopedic.**

LCEL (LangChain Expression Language) is the `|` pipe composition syntax over the **`Runnable`** interface:

```python
chain = prompt | model | StrOutputParser()
chain.invoke({"topic": "cats"})
```

Every Runnable gives you a uniform surface **for free**:

| Method | What |
|---|---|
| `invoke` / `ainvoke` | single input |
| `batch` / `abatch` | many inputs, parallelized |
| `stream` / `astream` | incremental output |
| `astream_events` | structured event stream over the whole chain |

Composition primitives:

| Primitive | Purpose |
|---|---|
| `RunnableSequence` | what `\|` builds |
| `RunnableParallel` (or a plain dict) | run branches concurrently, collect into a dict |
| `RunnablePassthrough` | forward input unchanged; `.assign()` adds keys |
| `RunnableLambda` | lift any function into a Runnable |

Config wrappers: `.with_config()`, `.with_retry()`, `.with_fallbacks()`, `.bind()`.

### The status, stated safely

Runnables are **still the core interface** — models, prompts, tools and retrievers are all Runnables, and
LangGraph nodes accept them. But **LCEL as the recommended way to build applications has been de-emphasized.**
Note the evidence: there is no longer an LCEL page under `docs.langchain.com/oss/python/langchain/`, and the v1
philosophy page says v1 replaced all chains with a single LangGraph-based agent abstraction.

### How to answer "do you use LCEL?"
> "I use Runnables constantly — models, prompts and tools all implement that interface, so I get batching,
> async and streaming uniformly. But I don't build *applications* as long LCEL pipes anymore. LangChain v1
> moved that way too: chains went to `langchain-classic`, and anything with branching, state or a loop belongs
> in LangGraph. My rule is LCEL for short, linear, stateless transforms — prompt-to-model-to-parser — and
> LangGraph the moment there's a cycle, a branch, persistence, or a human in the middle."

**Do not claim LCEL is deprecated.** It isn't. It's narrowed. The nuance is the point.

---

## 3. Tool calling

```python
from langchain.tools import tool

@tool
def search_database(query: str, limit: int = 10) -> str:
    """Search customer records matching the query.

    Args:
        query: Search terms to look for
        limit: Maximum results to return
    """
    return f"Found {limit} results for '{query}'"
```

**Rules that matter:**
- **Type hints are mandatory** — they *are* the input schema.
- **The docstring becomes the tool description** — it's the prompt the model reads to decide when to call it.
  A vague docstring is a bug, not a style issue. Say this; it's a real practitioner observation.
- Use `snake_case` names for provider compatibility.
- Complex schemas: `@tool(args_schema=MyPydanticModel)`.
- Reserved parameter names you may **not** use: `config`, `runtime`.

**Runtime injection** — `ToolRuntime` is injected automatically and hidden from the model:
```python
from langchain.tools import tool, ToolRuntime

@tool
def get_last_user_message(runtime: ToolRuntime) -> str:
    """Retrieve the most recent user message."""
    return runtime.state["messages"][-1].content
```
`ToolRuntime` exposes **state** (short-term), **context** (immutable per-run config), **store** (long-term),
**stream writer**, and execution info (thread id, run id, attempt number).

**Return options:**
- `str` — human-readable, model reads it
- `dict` / objects — structured
- list of content blocks — multimodal (text + image)
- **`Command`** — update graph state directly from a tool:
```python
return Command(update={"user_name": new_name,
                       "messages": [ToolMessage(content="...", tool_call_id=runtime.tool_call_id)]})
```
- `@tool(return_direct=True)` — return to the user immediately, skip another model turn.

**Error handling** is now middleware-based via `@wrap_tool_call`:
```python
from langchain.agents.middleware import wrap_tool_call

@wrap_tool_call
def handle_tool_errors(request, handler):
    try:
        return handler(request)
    except Exception as e:
        return ToolMessage(content=f"Tool error: {e}", tool_call_id=request.tool_call["id"])
```

---

## 4. Structured output

```python
agent = create_agent(model=..., tools=[...], response_format=MyPydanticModel)
```
The result lands in the **`'structured_response'`** key of final state.

**Two strategies — knowing both is a differentiator:**

| Strategy | Mechanism |
|---|---|
| `ProviderStrategy` | the provider's **native** structured-output feature |
| `ToolStrategy` | emulated via **tool calling** |

Pass a bare schema type and LangChain **auto-selects**: `ProviderStrategy` if the provider supports native
structured output (OpenAI, Anthropic, Gemini, xAI Grok), else falls back to `ToolStrategy`.

Accepted schema types: Pydantic `BaseModel` (returns a validated instance), dataclass (dict), `TypedDict`
(dict), raw JSON Schema (dict), and Union types (`ToolStrategy` only — model picks the branch).

`ProviderStrategy(schema=..., strict=True)` enforces stricter adherence where supported.

`ToolStrategy(schema=..., handle_errors=...)` controls retry: `True` (default, retry all), a `str` (custom
retry message), an exception type or tuple (retry only those), a callable, or `False` (propagate).

Common failure modes worth naming: **the model emits multiple structured outputs when one was expected**, and
**schema validation failure**. Both are what `handle_errors` exists for.

On the older non-agent path, the equivalent is `model.with_structured_output(MySchema)`.

---

## 5. Memory abstractions — the current story

**The old classes are legacy.** `ConversationBufferMemory`, `ConversationSummaryMemory`,
`ConversationBufferWindowMemory` → all in `langchain-classic`.

**The current model has two layers, both from LangGraph:**

| Need | Mechanism |
|---|---|
| Remember earlier turns in *this* conversation | **checkpointer**, thread-scoped |
| Remember facts about *this user* across conversations | **Store**, namespace-scoped, optional semantic search |

And the context-window problem the old `Memory` classes existed to solve is now handled explicitly:
**trimming, deleting (via `RemoveMessage`), or summarizing** messages in state.

> "The v1 answer is that memory stopped being a class you attach and became persistence you configure.
> Short-term is a checkpointer keyed by `thread_id`; long-term is a Store keyed by a namespace like
> `(user_id, 'memories')`. Summarization — which is what `ConversationSummaryMemory` did — is now just a node
> in the graph that rewrites the message list, which I prefer because I can see and test it."

---

## 6. Agents: LangChain vs LangGraph, and the migration story 🎯 likely probe

### The old world (pre-1.0)
`initialize_agent` / `AgentExecutor` — a **closed loop**. You supplied tools and a prompt; the executor ran
the think-act-observe cycle internally. You could not intervene mid-loop, inspect intermediate state, pause
for a human, or resume after a crash. `AgentType.ZERO_SHOT_REACT_DESCRIPTION` and friends are from this era.

### The transition
`langgraph.prebuilt.create_react_agent` — same convenience, but the loop was now a real graph, so
checkpointing/streaming/HITL became available.

### Current (1.0+)
**`langchain.agents.create_agent`** — supersedes both. Described as *"a simpler interface than
`langgraph.prebuilt.create_react_agent`"* while allowing more customization, via **middleware**.

### The migration answer
> "`AgentExecutor` was a black-box loop — you got an answer and a list of intermediate steps, and if it went
> wrong mid-run you started over. The migration path is `create_agent`, which returns a compiled LangGraph
> graph, so the same loop is now inspectable and interruptible: I can stream each step, pause for approval
> before a destructive tool, persist across a process restart, and replay a bad run from the checkpoint before
> it broke. Same ergonomics at the entry point, completely different debuggability. And if `create_agent`'s
> loop isn't the shape I need, I drop down and write the `StateGraph` myself — that's the escape hatch the old
> `AgentExecutor` never had."

**That last sentence — low floor, high ceiling — is the whole design philosophy in nine words.**

Migration guide: `https://docs.langchain.com/oss/python/migrate/langchain-v1`

---

## 7. Integrations that matter

**RAG building blocks:** document loaders → text splitters → embedding models → vector stores → retrievers.

- **Retriever** = the interface returning documents for an unstructured query. `vectorstore.as_retriever()`.
- **Vector stores** are pluggable behind one interface: `similarity_search`, `similarity_search_with_score`,
  `max_marginal_relevance_search`. Chroma/FAISS locally; pgvector, Pinecone, Weaviate, Qdrant, Milvus in prod.
- **Embeddings**: `init_embeddings("openai:text-embedding-3-small")`.
- **Output parsers**: `StrOutputParser`, `PydanticOutputParser`, `JsonOutputParser`. Note the honest caveat —
  **native structured output and tool calling have largely replaced parse-the-text parsers.** Use parsers when
  the model has no structured-output support.
- **MCP**: LangChain can consume Model Context Protocol servers as tool sources.
  (`docs.langchain.com/oss/python/langchain/mcp`) Worth one sentence — it signals you track the ecosystem.

### 🎯 The 2026 RAG answer they're probing for

Official docs now frame **retrieval as a tool inside an agent**, not a fixed pipeline:

> "Classic RAG is two fixed steps — always retrieve, then generate. The current pattern is **agentic RAG**:
> retrieval is a *tool*, and the agent decides **whether**, **when**, and **how** to retrieve, and can retrieve
> again after seeing the first results. It handles 'no retrieval needed' and multi-hop questions, which fixed
> 2-step RAG cannot. The tradeoff is latency and cost — extra model turns per query — so for a narrow,
> high-volume, well-understood workload I'd still take the deterministic 2-step pipeline."

Naming the tradeoff is what makes it an engineer's answer instead of a trend-follower's.

---

# 🔴 THE COMPARISON QUESTION — LangChain vs LangGraph vs LlamaIndex

**Near-certain. Prepare the 40-second version and the follow-up.**

### The framing that makes it easy

Most candidates treat these as three competitors. **They are not the same kind of thing.** Say that first — it
reframes the question and immediately reads as clearer thinking:

- **LangChain** — the **component/integration layer**. Standard interfaces over models, tools, embeddings,
  vector stores, plus one high-level agent abstraction (`create_agent`).
- **LangGraph** — the **orchestration/runtime layer**. Stateful graphs, cycles, persistence, HITL, streaming,
  time travel. Same company; `create_agent` is built on it. **Usable standalone — it has no hard LangChain
  dependency**, which is a genuinely good detail to drop.
- **LlamaIndex** — a **data framework**, historically strongest at ingestion → indexing → retrieval (RAG).
  It also ships **Workflows**, an *event-driven*, step-based orchestration model, so the two overlap now.

### The 40-second spoken answer

> "They're not really three of the same thing. LangChain is the component layer — standard interfaces over
> models, tools, vector stores, plus the `create_agent` abstraction. LangGraph is the orchestration runtime
> underneath it: stateful graphs with cycles, checkpointing, human-in-the-loop and time travel. They're the
> same company, and `create_agent` literally returns a compiled LangGraph graph. LlamaIndex started as the data
> framework — its ingestion, indexing and retrieval abstractions are still the most direct path for
> document-heavy RAG — and it's since added Workflows for orchestration, so they do overlap.
>
> The architectural difference on the orchestration side is real, though: LangGraph is a **graph/state-machine**
> model where you declare nodes and edges over a shared state object, and LlamaIndex Workflows is
> **event-driven** — steps are decorated with `@step`, they consume and emit typed `Event` objects, and control
> flow is ordinary Python rather than encoded into edges.
>
> How I'd choose: document-heavy RAG where retrieval quality is the whole problem, LlamaIndex. Complex stateful
> agent control flow where I need persistence, approvals and replay, LangGraph. And in practice they compose —
> LlamaIndex for the retrieval layer, exposed as a tool inside a LangGraph agent."

### Decision criteria table

| Signal | Reach for |
|---|---|
| Single LLM call, prompt + parse | **Neither** — plain SDK |
| Short linear transform, stateless | LangChain Runnables / LCEL |
| Need model-provider portability, standard tool interface | **LangChain** |
| Cycles, branching, retries with recovery | **LangGraph** |
| Must survive a process restart mid-run | **LangGraph** (checkpointer) |
| Human approval before a destructive action | **LangGraph** (`interrupt`) |
| Must replay/debug a bad production run | **LangGraph** (`get_state_history`) |
| Multi-agent with handoffs | **LangGraph** (`Command(graph=Command.PARENT)`) |
| Ingest 10k PDFs, chunk, index, tune retrieval | **LlamaIndex** |
| Advanced retrieval R&D (rerankers, recursive/auto retrievers, query engines) | **LlamaIndex** |
| Prefer event-driven steps over a declared graph | **LlamaIndex Workflows** |
| Team already deep in one of them, problem is simple | **the one they know** |

### The follow-up probes

**"Aren't LangChain and LangGraph the same thing?"**
> "Related, not the same. Same company, and LangGraph is the runtime under `create_agent`. But LangGraph is
> installable and usable on its own with no LangChain dependency — plenty of teams use it purely as an
> orchestration layer with direct provider SDKs."

**"Which would you pick for our use case?"** — *Never answer without asking one question first.*
> "Depends on where the difficulty is. If the hard part is retrieval quality over a big document corpus, I'd
> start with LlamaIndex. If the hard part is control flow — branching, approvals, recovering a long-running
> job — LangGraph. Can I ask which of those is closer to what you're building?"

**Turning it back is a strong move.** It shows you pick tools from requirements rather than preference, and it
gets the interviewer talking about their actual system.

**"What are the downsides of LangChain?"** — *Have a real answer; a defensive one costs you.*
> "The abstraction churn is real — v1 broke a lot and moved chains and memory to `langchain-classic`, so older
> code and most tutorials are stale. And the abstractions can hide what's actually in the prompt, which matters
> because context engineering is where agent reliability actually lives. That's exactly why v1 collapsed down
> to one agent abstraction with an escape hatch to raw LangGraph. If I only need one model provider and one
> prompt, I'd skip the framework entirely."

---

## Unfairly good resources

Verified reachable 2026-07-27.

| Resource | URL | Time | Why |
|---|---|---|---|
| **LangChain v1 release notes** | `https://docs.langchain.com/oss/python/releases/langchain-v1` | 20 min | 🔴 **Read this one.** The single highest-signal page for sounding current — what died, what replaced it. |
| **Migration guide to v1** | `https://docs.langchain.com/oss/python/migrate/langchain-v1` | 20 min | The `AgentExecutor` → `create_agent` story, concretely. |
| **Philosophy** | `https://docs.langchain.com/oss/python/langchain/philosophy` | 10 min | Short. Source of the "only one high level abstraction" line. |
| **Agents** | `https://docs.langchain.com/oss/python/langchain/agents` | 30 min | `create_agent` in full, middleware, the loop. |
| **Tools** | `https://docs.langchain.com/oss/python/langchain/tools` | 25 min | `@tool`, `ToolRuntime`, returning `Command`, error middleware. |
| **Structured output** | `https://docs.langchain.com/oss/python/langchain/structured-output` | 20 min | `ToolStrategy` vs `ProviderStrategy` — the differentiating detail. |
| **Retrieval** | `https://docs.langchain.com/oss/python/langchain/retrieval` | 25 min | The agentic-RAG framing. |
| **Multi-agent** | `https://docs.langchain.com/oss/python/langchain/multi-agent` | 25 min | Patterns with actual call/token cost comparisons — rare and quotable. |
| **Harrison Chase — agent frameworks** | `https://www.langchain.com/blog/how-to-think-about-agent-frameworks` | 30 min | Context engineering; where the "when not to use it" answer lives. |
| **Anthropic — Building Effective Agents** | `https://www.anthropic.com/engineering/building-effective-agents` | 25 min | Framework-neutral vocabulary. Read even if you read nothing else. |
| **LlamaIndex Workflows** | `https://developers.llamaindex.ai/python/framework/module_guides/workflow/` | 20 min | Enough to speak credibly about the event-driven contrast. Don't go deeper than this. |
| **API reference** | `https://reference.langchain.com/python/langchain/` | lookup | Signatures only. |

> ⚠️ **Broken-URL warning:** LlamaIndex moved `docs.llamaindex.ai` → `developers.llamaindex.ai`, and the
> LangChain blog moved `blog.langchain.com` → `www.langchain.com/blog`. Old links 301 but may break in tooling.
> The URLs in this table are the post-redirect destinations and were fetched successfully.

**If you only have 90 minutes for LangChain:** v1 release notes (20m) → philosophy (10m) → agents (30m) →
structured output (20m) → rehearse the comparison answer out loud (10m).
