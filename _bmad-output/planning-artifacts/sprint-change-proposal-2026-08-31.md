# Sprint Change Proposal — Concepts as Structure, Not as Content

**Date:** 2026-08-31 · **Author:** Devang · **Scope classification: MAJOR** (fundamental replan)
**Trigger:** Direct rejection of the delivered direction by the product owner.

---

## Section 1 — Issue Summary

### Problem statement

> *"I actually wanted to make a real world project that will need all the concepts implemented live
> in order for that project to come alive — a real project, not a project that helps me learn
> concepts, but concepts as building blocks of that production grade real world project."*

**Issue type:** Misunderstanding of original requirements (analyst error, not a scope change).

### What was delivered vs what was asked

| | Delivered (The Proving Ground) | Required |
|---|---|---|
| What the app is *about* | The topics themselves | A real-world problem |
| Role of a concept | **Content** — a topic is a data row rendered on screen | **Structure** — a concept is load-bearing; remove it and a feature stops working |
| Failure mode if a concept is missing | A quiz has one fewer question | **The product breaks** |
| Interview answer to "why a closure here?" | "To hold the drill buffer" | "To keep the reconnect backoff private across a socket's lifetime" |
| Category | A study aid | A portfolio product |

### Where the reasoning went wrong

The innovation-strategy session (2026-08-31) correctly found that **~55% of the SecureCart
e-commerce build bought zero marginal coverage** — a catalog of 500 products exercises the same
`map`/`filter`/`sort` as a catalog of 5.

That finding was sound. **The inference drawn from it was not.**

- **Inferred:** therefore stop building a real product; build an instrument about the topics.
- **Correct:** therefore stop building a *CRUD* product, and choose a domain whose genuine
  requirements make the concepts unavoidable.

The error was optimising for *coverage density per hour* and treating "realness" as overhead.
Realness is the product requirement, not a cost centre.

### Evidence

- `SAVE_GAME_STATE.json` describes 55 challenges whose deliverables are **drills**, not features.
- `ARCHITECTURE.md` Part 0 states the thesis explicitly: *"build the instrument whose subject matter
  is the topics"* — the exact inversion of the requirement.
- `SYLLABUS.md` terminates 112 rows in `D` (a drill), i.e. the concept's home is a quiz entry.

---

## Section 2 — Impact Analysis

### What DIES

| Artifact | Disposition |
|---|---|
| The three-surface premise (Drills / Polyfills / Loop tabs) | **Dead.** This is the learning-tool concept. |
| `runner.js` as a sandboxed code executor | **Dead as a product feature.** No real product executes user code strings. |
| "Topics as data" (`data.js` as the specification) | **Dead as architecture.** Survives only as a checklist. |
| 55 challenges phrased as "author N drills" | **Dead.** Must be re-authored as product features. |
| The self-asserting coverage UI | **Dead.** A real product does not display its own syllabus. |

### What SURVIVES intact

| Artifact | Why it survives |
|---|---|
| **`SYLLABUS.md` — all 444 rows** | The *requirements ledger* is domain-independent. Rows re-terminate from `D` (drill) to `I:<file>` (implementation site). **This is the single most valuable asset and it does not change.** |
| **`POLYFILLS.md`** — 7 families, 5 invariants | Teaching material, unaffected by domain. |
| **The three altitudes** (SPOT IT / BUILD IT / SAY IT) | Assessment model, domain-independent. |
| **Theory-while-building protocol** + `teaches` bindings | The pedagogy is correct and was never the problem. Bindings re-point to features. |
| **`authorship: DEVANG_WRITES_ALL_CODE`** | Unchanged and now more important. |
| **The parallel vanilla→React build** | **Strengthened.** A real product makes the vanilla-vs-React diff far more meaningful than a quiz did. |
| **Layering invariants** (one DOM owner, one storage owner, no cycles) | Good architecture is good architecture. Carry forward. |
| **`REACT_DELTA.md` analysis + the mapping table** | Unaffected. |

### Impact by epic (quest)

| Quest | Fate |
|---|---|
| Q1 Runner Spike | **REMOVED** — the runner was the learning-tool core |
| Q2 Topics as Data | **REMOVED** — replaced by domain modelling |
| Q3 Shell / Q4 Specimen Sheet | **REFRAMED** — real UI, not a specimen sheet; CSS becomes product styling |
| Q5 Store | **KEPT, reframed** — real app state, not drill progress |
| Q6 UI | **KEPT, reframed** — real views |
| Q7 Coercion / Q8 Prototypes / Q9 Arrays / Q10 Polyfills | **KEPT as drills** — these are Tier-1 MCQ rows that legitimately have no home in any product's source. See §3 Honest Tension. |
| Q11 Loop instrument | **REFRAMED** — the event loop becomes real concurrency handling, not a visualiser |
| Q12 Memory/Ship | **KEPT** — leak lab becomes a real leak in a long-lived session |
| Q13–Q16 React/Redux | **KEPT, reframed** — same rows, now building real features |

### Timeline impact

**None to the OA.** The OA (~5 Sept) is MCQ; the project serves the technical round (~10 Sept) and
beyond. The standing recommendation is unchanged: **run the React MCQ track until the OA is sat.**
This replan targets the post-OA window and costs nothing this week.

---

## Section 3 — Recommended Approach

**Path: MVP Redefinition** (not adjustment, not rollback). The requirements ledger is retained;
the product it is realised in is replaced.

### Domain selection criteria

The domain is not cosmetic. It is chosen so that the concepts are **structurally unavoidable**.
A candidate domain must force, by its own requirements:

| Concept cluster | What forces it |
|---|---|
| Event loop, microtask ordering | Genuine concurrency: overlapping requests, ordering guarantees, optimistic updates + rollback |
| `Promise.all` / `allSettled` / `race` / `any` | **Multiple upstream sources with different failure semantics** — each combinator used where it is genuinely correct, not demonstratively |
| `AbortController`, race conditions | Cancellable in-flight work — search, navigation, filter changes |
| debounce / throttle / rAF | High-frequency input or high-frequency inbound data |
| Closures | Private, per-instance state with a lifetime (a connection, a retry budget) |
| Prototypes / classes / inheritance | A real entity hierarchy with shared behaviour and specialisation |
| Memory management | A **long-lived session** where leaks actually accumulate |
| Storage triad | Genuinely three different lifetimes: session token, user prefs, unsaved draft |
| CORS | Real cross-origin calls to third-party APIs |
| `IntersectionObserver`, virtualisation | Large datasets that cannot all be in the DOM |
| `Intl` | Real currency / date / locale formatting |
| Redux | Cross-cutting state with frequent updates from many sources |

### DECIDED — polyfills and the `kata/` folder

**A modern production project does not hand-write `Array.prototype.map`.** Pretending otherwise is
theatre an interviewer would spot in one question.

**Decision (Devang, 2026-08-31):** do not force them into the product and do not drop them. Give
them their own home.

```
repo/
├── src/          ← THE PRODUCT. No concept theatre. Every line earns its place.
└── kata/         ← Deliberate practice. In the repo, NOT in the build.
    ├── polyfills/      the 21, hand-written, with parity tests
    ├── quirks/         coercion, hoisting, TDZ, output-prediction
    └── README.md       "MCQ fundamentals practice — deliberately outside the product"
```

**Why this is the strongest available answer:**

1. **Zero contrivance.** No invented browser floor, no fake constraint. The product stays honest and
   the practice stays honest.
2. **It is a better interview story than either alternative.** *"The product doesn't need a `map`
   polyfill, so I didn't put one there. I keep fundamentals practice in `kata/` — separate, tested,
   not shipped."* That reads as engineering judgement, which is exactly what the question is probing.
3. **`kata/` is not excluded from the repo.** A reviewer sees deliberate practice alongside a real
   product. Both signals land.
4. **The build never imports it.** `kata/` is excluded from the bundle. Nothing in `src/` may depend
   on it — this is an architectural invariant, not a convention.

**Terminus semantics gain a third value:**

| Terminus | Meaning |
|---|---|
| `I:<file>` | Load-bearing in the product |
| `K:<file>` | Lives in `kata/` — no honest product home, memorised as deliberate practice |
| `OUT` | Prepared spoken answer only |

**`D` (a drill in a learning app) is retired entirely.** Every row that was `D` becomes either
`I:` or `K:`. The split must be argued row by row — a row landing in `K:` needs a one-line reason
why no real product would force it.

**Expected split:** ~21 polyfills + ~35 Tier-1 quirk rows (coercion, hoisting, TDZ,
output-prediction) → `K:`. Everything else — closures, event loop, promises, async, DOM, storage,
CORS, memory, `Intl`, observers, all React and all Redux — has a genuine home in a Live Ops Console
and becomes `I:`.

### Candidate domains

Three real products, scored on how hard they force the concept clusters.

| | **A · Live Ops Console** | **B · Offline-First Field App** | **C · Multi-Source Aggregator** |
|---|---|---|---|
| What it is | Real-time monitoring dashboard over live public feeds (transit / seismic / markets / air quality) | Data-capture app that works offline and syncs on reconnect | Unified search across several third-party APIs with one ranked result set |
| Concurrency | **Very high** — continuous inbound stream | Medium — burst sync | **High** — parallel fan-out |
| Promise combinators | High — feeds fail independently | Medium | **Very high** — `any`/`race`/`allSettled` all naturally correct |
| Cancellation | High — filter/zoom changes | Low | **Very high** — every keystroke cancels |
| debounce/throttle/rAF | **Very high** — genuine 60fps pressure | Low | High |
| Memory leaks | **Very high** — long-lived session, subscriptions | Medium | Medium |
| Storage triad | Medium | **Very high** — offline queue is the product | Medium |
| Entity hierarchy | High | High | Medium |
| Redux justification | **Very high** | High | Medium |
| Needs a server? | **No** — public feeds | **No** — local-first | **No** — public APIs |
| Enterprise credibility | **Very high** — looks like the internal tooling Accenture builds | High | Medium |

**DECIDED — A · Live Ops Console.** It forces the largest number of clusters at the highest
intensity, needs no backend, and is the shape of software a service-based employer recognises.
The concrete data feed (transit / seismic / markets / air quality) is still open and does **not**
affect the architecture — it is a brief-level choice, made in Step 1.

---

## Section 4 — Detailed Change Proposals

### 4.1 `ARCHITECTURE.md` — Part 0 thesis

**OLD**
> Build the instrument whose *subject matter is the topics*, so that implementation, content and
> proof are the same small codebase.

**NEW**
> Build a real product whose *requirements make the concepts unavoidable*. A concept is not a topic
> the app displays — it is structure the app is built from. Remove any one and a feature stops
> working.

**Rationale:** the delivered thesis is the precise inversion of the requirement.

### 4.2 `SYLLABUS.md` — terminus semantics

**OLD:** 112 rows terminate in `D` = a topic object in `src/data.js`.
**NEW:** rows terminate in `I:<file>` = the product file where the concept is load-bearing.
`D` is **retired**. Rows with no honest product home terminate in `K:<file>` under `kata/`.

**Rationale:** a terminus of "it's a quiz question" is exactly the failure being corrected.

### 4.3 `SAVE_GAME_STATE.json` — quests

Re-author all 55 challenges from *"author N drills about X"* to *"build feature Y, which cannot work
without X."* Quest `closes` arrays and the `teaches` bindings are **preserved row-for-row** — only
the deliverable changes. Q1 and Q2 are replaced by a domain-modelling and data-layer quest.

### 4.4 New artifact — `PRODUCT_BRIEF.md`

Real product definition: user, problem, feature list, non-functional requirements (browser floor,
bundle budget, frame budget, offline behaviour). **This is what was missing entirely** — the
Proving Ground had an architecture but never had a product.

### 4.5 `PARALLEL_BUILD.md`

Unchanged in structure, **strengthened in value**: the vanilla-vs-React diff over a real product is
a far better artifact than the same diff over a quiz.

---

## Section 5 — Implementation Handoff

**Scope: MAJOR** — fundamental replan. Routes to PM/Architect (a product brief must exist before
architecture is re-derived).

### Sequence

| # | Step | Owner | Gate |
|---|---|---|---|
| 0 | **Do nothing until the OA is sat** | Devang | OA ~5 Sept |
| 1 | Choose the concrete live feed | **Devang** | One sentence: who watches this dashboard and why |
| 2 | Write `PRODUCT_BRIEF.md` | PM | Real user, real problem, NFRs incl. browser floor |
| 3 | Re-derive `ARCHITECTURE.md` from the brief | Architect | Every concept cluster mapped to a feature that forces it |
| 4 | Re-terminate every `D` row to `I:` or `K:` | Architect | `D` fully retired; each `K:` carries a one-line justification |
| 5 | Re-author the 55 challenges as features | PO | Zero challenges phrased as "author drills" |
| 6 | Build | Devang | `authorship: DEVANG_WRITES_ALL_CODE` unchanged |

### Success criteria

1. Every retained row terminates in `I:` (a product file) or `K:` (with a one-line justification).
2. No feature exists solely to demonstrate a concept.
3. **The falsification test:** for each concept cluster, name the feature that breaks if it is
   removed. A cluster with no answer is not load-bearing and must be re-homed or moved to `K:`.
4. A stranger reading the README sees a product, not a syllabus.

### Decisions taken 2026-08-31

- **Domain: Live Ops Console.** Real-time monitoring over live public feeds. No backend.
- **Polyfills: `kata/` folder.** In the repo, outside the build, taught by the coach as deliberate
  practice. `D` terminus retired in favour of `I:` and `K:`.

### Still open

**The concrete live feed.** Transit positions, seismic events, market ticks, air quality — any of
them satisfies the architecture. It changes the product brief and the entity model, nothing else.
Not blocking until after the OA.
