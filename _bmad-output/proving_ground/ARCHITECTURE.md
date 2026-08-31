# The Proving Ground — System Architecture

**Author:** Devang · **Date:** 2026-08-31 · **Status:** Build spec, pre-implementation
**Supersedes:** `SecureCart` blueprint (archived — see `innovation-strategy-2026-08-31.md` §Options)


> ⚠️ **DIRECTION CORRECTED 2026-08-31.** The learning-tool premise is superseded — the project is now a real product (**Live Ops Console**) where concepts are load-bearing structure, not content. Rows re-terminate `D` → `I:` (product file) or `K:` (kata/ practice). See `_bmad-output/planning-artifacts/sprint-change-proposal-2026-08-31.md`.

> **This document contains no implementation.** It defines contracts, data shapes, invariants
> and the *reason each design decision exists*. Every function body is yours to write.
> Where you see a signature, that is the boundary — the inside is the exercise.

---

## Part 0 — WHY, WHAT, HOW

### WHY this product exists

Three courses produced ~70% coverage. The missing 30% is not missing *material* — it is
**unexercised** material: topics you can define but have never *chosen under constraint*,
quirks you have read but never been *bitten by*, and the seams between topics where interview
questions actually live.

An e-commerce app was rejected because ~55% of its build buys zero marginal coverage: a catalog
of 500 products exercises exactly the same `map`/`filter`/`sort` as a catalog of 5. Domain
scaffolding is cost without learning.

**The design thesis:**

> Build the instrument whose *subject matter is the topics*, so that implementation, content
> and proof are the same small codebase.

This produces an alignment that does not exist in an app project: **every hard problem in this
build is simultaneously a top-tier interview topic.** To build the event-loop drill you must
instrument the event loop. To grade a `map` polyfill you must implement parity testing against
native. Effort and coverage stop trading against each other. **You cannot build this badly and
have it still work.**

### WHAT it is

A single-page, zero-dependency vanilla tool with three surfaces:

| Surface | The user does | You had to build |
|---|---|---|
| **Drills** | Predicts a snippet's output, runs it, gets graded | Sandboxed execution, `console` capture, async result awaiting, diffing |
| **Polyfills** | Writes a polyfill, sees it parity-tested against native | Test harness, deep-equality, sparse-array/`thisArg`/`NaN` probes |
| **Loop** | Watches call stack / microtask / macrotask execute live | Timer + promise instrumentation, ordered event recording, replay |

Topics are **data**, not features. Coverage becomes an assertion the program makes about itself,
computed at runtime and displayed on screen.

### HOW it stays minimal

Six source files. One shared mechanism serves all three surfaces. The minimalism is not
discipline — it is *structural*, and it comes from a single decision (Part 2, The Runner Contract).

---

## Part 1 — System Architecture

### File layout

```
proving-ground/
├── index.html          semantic shell · <template>s · <dialog> · 3 tab regions
├── style.css           ONE specimen sheet — each property once, commented with its topic
├── README.md           live link · 90-second demo path · coverage claim
├── ARCHITECTURE.md     this document
├── NOTES.md            40 output-prediction snippets drawn from your own source
└── src/
    ├── data.js         every topic as data — THE SPECIFICATION
    ├── runner.js       sandbox · console capture · parity · instrumentation
    ├── store.js        closure state · observers · localStorage · cross-tab
    ├── ui.js           <template> cloning · delegation · one render path
    ├── loop.js         event-loop recorder + replay
    └── main.js         bootstrap · hash router · wiring
```

### Dependency graph — strictly one-directional

```
                 ┌──────────┐
                 │ data.js  │  imports NOTHING
                 └────┬─────┘
                      │
                 ┌────▼─────┐        ┌──────────┐
                 │runner.js │◄───────│ loop.js  │
                 └────┬─────┘        └────┬─────┘
                      │                   │
                 ┌────▼─────┐             │
                 │ store.js │             │
                 └────┬─────┘             │
                      │                   │
                 ┌────▼─────┐             │
                 │  ui.js   │◄────────────┘
                 └────┬─────┘
                      │
                 ┌────▼─────┐
                 │ main.js  │  imported by NOTHING
                 └──────────┘
```

**Invariants — violate any of these and the architecture is broken:**

1. No module imports a module below it in the graph. No cycles, ever.
2. `data.js` imports nothing and contains no logic — pure data.
3. `main.js` is imported by nothing — it is the only entry point.
4. `runner.js` knows nothing about drills, topics, UI or storage.
5. `ui.js` is the *only* module that touches the DOM. Nothing else queries or mutates it.
6. `store.js` is the *only* module that touches `localStorage`.

> **Why these invariants matter for interviews:** "How did you keep it clean?" is a real question,
> and "no cycles, one DOM owner, one storage owner" is a real answer. Layering is the single most
> transferable architecture concept you will be asked about, and this is the smallest honest
> demonstration of it.

### The layer contract

| Layer | Owns | Never does |
|---|---|---|
| `data.js` | Topic definitions | Any behaviour |
| `runner.js` | Executing untrusted code safely | Know what a "drill" is |
| `store.js` | Progress state + persistence | Touch the DOM |
| `ui.js` | Rendering + event handling | Execute code or persist |
| `loop.js` | Recording execution order | Render (it returns data) |
| `main.js` | Wiring + routing | Contain business logic |

---

## Part 2 — THE RUNNER CONTRACT (the load-bearing decision)

Everything minimal about this project descends from one rule.

### The contract

```
run(code: string, expectation?: any) → {
  output:   string[],      // captured console lines, in order
  value:    any,           // completion value, if any
  error:    Error | null,  // thrown error, if any
  passed:   boolean | null,// null when no expectation given
  timeline: Event[]        // ordered execution record (see loop.js)
}
```

**`runner.js` exports this one pure function and nothing else.**

It does not know what a drill is. It does not know what a polyfill is. It does not know a UI
exists. Every feature is a *caller*.

### Why this single decision produces the whole architecture

1. **It collapses three features into one mechanism.** Drill grading, polyfill parity testing,
   and loop instrumentation are the same operation with different callers. Three high-value
   capabilities, one piece of machinery — this is where ~60% of the SecureCart build disappeared.

2. **It makes the codebase resistant to sprawl.** The failure mode that kills this project is
   special-casing: `if (drill.id === 'x') …` inside the runner. Once the runner is *pure*, a
   drill that needs a branch is a drill that must be **reshaped**, not accommodated. The rule
   defends itself.

3. **It is the interview answer.** "How do you keep a system from rotting?" → "I gave the core a
   contract narrow enough that violating it was obviously wrong."

### The purity metric

Track it every session: **number of drills requiring a runner branch. Target: zero.**
If it rises above zero, the *data model* is wrong, not the runner. Fix the data model.

### CASES — what the runner must survive

| Input | Must produce |
|---|---|
| Syntactically invalid code | `error` populated, no crash, UI still responsive |
| Infinite loop (`while(true)`) | **Cannot be caught in vanilla JS on the main thread.** See Part 8. |
| Code that throws synchronously | `error` set, `output` retains lines logged *before* the throw |
| Code that rejects asynchronously | `error` set only if awaited; otherwise surfaces via `unhandledrejection` |
| Code that logs nothing | `output: []`, not `null`, not `undefined` |
| Code returning `undefined` vs logging `undefined` | Must be distinguishable |
| Code that redefines `console.log` itself | Your restore must not clobber the user's — restore in `finally` |
| Code that never terminates its async work | Needs a timeout; unresolved promises must not hang the UI |
| Nested execution (a drill that calls `run`) | Guard against re-entrancy corrupting capture state |

---

## Part 3 — FEATURE SPECIFICATIONS

Each feature below states **what it does in design**, then **why it exists** as numbered points —
each point naming the concept it forces you to learn — then its **contract** and its **cases**.

---

### F1 — `data.js` · Topics as data

**What it does.** Exports a flat array of topic objects. No logic, no imports. This file *is* the
coverage specification: what the app can teach is exactly what this array contains.

**Shape:**

```
{
  id:       'js.coercion.plus-operator',   // stable, dotted, sortable
  tier:     1,                              // 1–4, drives ordering and OA priority
  area:     'js' | 'css' | 'html',
  title:    'The + operator with mixed operands',
  code:     '…',                            // the snippet to execute
  expects:  '…',                            // expected console output
  explain:  '…',                            // shown AFTER the attempt, never before
  trap:     '…',                            // the specific misconception being hunted
  cases:    [ { when: '…', then: '…' } ]    // invalid/edge variations
}
```

**Why this exists — the concepts it forces:**

1. **Data/behaviour separation.** The single most reusable architectural idea you own after this
   build. Adding a topic costs one object literal, not one feature.
2. **The open/closed principle, concretely.** The app is closed for modification, open for
   extension. You will be asked about SOLID; this is your example.
3. **Coverage becomes countable.** `data.length` and a `tier` histogram are computed at runtime.
   The coverage claim stops being aspirational and becomes an *assertion the program makes*.
4. **Serialisability.** Topics are pure JSON-safe values, which forces you to confront what JSON
   cannot represent — functions, `undefined`, `Date`, `Symbol`, circular refs. That confrontation
   is itself three interview topics.
5. **ESM named exports.** `data.js` importing nothing is the cleanest possible demonstration of
   a leaf module and makes tree-shaking discussion concrete.

**Cases to handle:** duplicate `id` (must fail loudly at boot, not silently overwrite) · missing
`expects` (drill is display-only, not gradable) · a `code` string containing backticks or `${}`
(template-literal escaping) · empty `cases` array vs missing key.

---

### F2 — `runner.js` · Sandboxed execution

**What it does.** Takes a code string, executes it in a constructed function scope, captures
everything it logs and everything it throws, and returns a structured result. Restores all
patched globals unconditionally.

**Why this exists — the concepts it forces:**

1. **`new Function` vs `eval`.** Why `Function` does not get the enclosing lexical scope and
   `eval` does. This is a genuine interview question and most candidates cannot answer it.
2. **Closures under pressure.** Your capture buffer lives in a closure that the patched
   `console.log` writes into. This is the purest possible closure demonstration — and it is load-
   bearing, not a toy counter.
3. **Higher-order functions.** You are replacing a function with a function that wraps it.
4. **`try` / `catch` / `finally`.** The restore *must* be in `finally`, or one thrown drill
   permanently breaks every subsequent drill. You will feel this bug. That is the point.
5. **`this` binding.** The patched `console.log` must be applied with the right receiver, or
   native `console` methods that depend on it break.
6. **Rest/spread.** Capturing arbitrary log arguments requires `(...args)`.
7. **Type coercion, deliberately.** Turning `args` into a display string forces you to decide
   how `undefined`, `null`, `NaN`, `-0`, `Symbol`, functions and circular objects stringify —
   which is the coercion syllabus, encountered as a real problem instead of a quiz.
8. **Error objects.** `name`, `message`, `stack`, and why `instanceof Error` can fail across
   realms.
9. **Async completion.** Deciding whether a result is a thenable, and awaiting it without
   assuming it is a native `Promise`, is the thenable-assimilation topic.

**Contract:** as Part 2. **One export. No named exceptions.**

**Cases:** see the Part 2 table. Additionally — a drill that logs *inside* a `setTimeout` (capture
must still be patched when the timer fires, which is a genuine ordering problem you must solve).

---

### F3 — `store.js` · Progress state

**What it does.** A closure factory returning a state object. Holds per-topic mastery, observers,
persistence to `localStorage`, and cross-tab synchronisation.

**Why this exists — the concepts it forces:**

1. **Closures for encapsulation.** Private state with no `this`, no `class`, and no way for a
   caller to reach the internals. The counterpoint to `class` in the same codebase.
2. **The observer pattern.** `subscribe(fn)` returning an *unsubscribe closure* is the highest-
   density teaching moment in the project — a closure that captures a closure.
3. **Reference vs value semantics.** `snapshot()` must return a **copy**. Returning the internal
   array directly is the bug; write it that way first, watch a caller mutate your state, then fix
   it. This is the lesson that finally makes reference semantics permanent.
4. **Shallow vs deep copy.** The snapshot copy forces the question of how deep to go, and where
   spread stops being enough.
5. **`localStorage` API + its synchronous, string-only nature.** Serialisation boundaries.
6. **The `storage` event.** Fires in *other* tabs, not the one that wrote. Cross-tab sync is
   impossible to fake and immediately impressive in a demo.
7. **`JSON.parse` / `stringify` limits.** `undefined`, functions and `Date` do not survive.
8. **Defensive parsing.** Corrupt or absent `localStorage` must not brick the app — this is
   input validation at a system boundary.
9. **Spaced repetition (SM2).** Optional, but it makes the tool genuinely useful and exercises
   date arithmetic and pure-function scheduling.

**Contract:**

```
createStore() → {
  get(topicId)          → TopicProgress
  record(topicId, pass) → void          // updates mastery, persists, notifies
  snapshot()            → TopicProgress[]   // a COPY
  coverage()            → { total, attempted, passed, byTier }
  subscribe(fn)         → unsubscribe
  hydrate(next)         → void          // used by the cross-tab listener
}
```

**Cases:** `localStorage` disabled (private browsing) → must degrade to in-memory, not throw ·
quota exceeded · corrupt JSON in storage · a `storage` event from an unrelated key · unsubscribe
called twice · subscribe called during a notify (mutating the observer array mid-iteration).

---

### F4 — `ui.js` · Rendering

**What it does.** The only module that touches the DOM. Clones `<template>` content, renders
lists, and installs a small number of delegated listeners.

**Why this exists — the concepts it forces:**

1. **`<template>` cloning vs `innerHTML`.** Cloning is XSS-safe by construction. You will be asked
   why `innerHTML` is dangerous; here you *chose* the safe path and can say why.
2. **`textContent` vs `innerHTML`.** Drill code is untrusted user-adjacent text.
3. **Event delegation.** One listener per list, not one per row. `closest()` + `dataset` to
   identify the target. This is the scalability answer.
4. **Capture vs bubble.** One listener must run in the capture phase to justify the option.
5. **`stopPropagation` vs `preventDefault`.** The modal backdrop needs one; a form needs the other.
6. **`DocumentFragment` batching.** Rendering many rows must cause one reflow, not N.
7. **Live vs static collections.** `getElementsByClassName` updates as the DOM changes;
   `querySelectorAll` does not. Use both once, deliberately, and know which surprised you.
8. **`dataset` and `data-*`.** The delegation payload channel.
9. **`<dialog>`.** Native modal semantics, `showModal()`, backdrop, `Escape` handling for free.
10. **Focus management.** Opening a dialog moves focus in; closing returns it to the trigger.
11. **`aria-live`.** Grading results must be announced to a screen reader.
12. **Reflow vs repaint.** Measure it in DevTools and record the number in `README.md`.

**Contract:** exports render functions that take data and a root node, plus one `bindEvents(root, handlers)`.
It receives handlers — it never imports `store` or `runner` directly.

> **Why handlers are injected:** it keeps `ui.js` free of upward dependencies and makes the module
> testable in isolation. This is dependency inversion, and it is worth being able to name.

**Cases:** rendering an empty list · a topic whose `code` contains HTML-special characters ·
re-rendering while a dialog is open · a delegated click on a child element rather than the row ·
rapid re-render dropping focus.

---

### F5 — `loop.js` · The event-loop instrument (showpiece)

**What it does.** Temporarily wraps `setTimeout` and `Promise.prototype.then`, records the *order*
in which callbacks actually execute, and returns a timeline the UI replays as three lanes:
call stack → microtask queue → macrotask queue.

**Why this exists — the concepts it forces:**

1. **The event loop, mechanically.** You cannot instrument what you do not understand. This
   single feature converts the most-asked async topic from memorised to owned.
2. **Microtask vs macrotask ordering.** Your recorder will *prove* that all microtasks drain
   before the next macrotask — because you will see it in your own data.
3. **Monkey-patching and restoration.** Same `finally` discipline as the runner, higher stakes:
   a leaked `setTimeout` patch corrupts the whole page.
4. **Promise internals.** Wrapping `then` requires knowing that `then` returns a *new* promise and
   that handlers are always async even when the promise is already settled.
5. **`queueMicrotask` and `requestAnimationFrame`.** Where rendering sits in the cycle.
6. **Closures over recording state.** Again, load-bearing.
7. **CSS animation for replay.** Only `transform` and `opacity` — this is where you demonstrate
   compositing awareness and measure it.
8. **`prefers-reduced-motion`.** The replay must degrade to a static ordered list.

**Contract:**

```
record(fn) → Promise<Event[]>       // patches, runs fn, unpatches in finally, returns timeline
Event = { kind: 'sync'|'micro'|'macro', label: string, at: number }
```

**Cases:** nested timers · a promise chained inside a timer · a timer scheduled inside a microtask ·
`setTimeout(fn, 0)` vs `setTimeout(fn, 1)` (they differ) · code that never settles · patch left
installed because an exception escaped (this is the bug you must build then fix).

**Downgrade path:** if instrumentation exceeds budget, ship a *static* animated diagram driven by
hand-authored timeline data. The recording is the valuable part; the animation is polish.

---

### F6 — `main.js` · Bootstrap and routing

**What it does.** Reads `data.js`, creates the store, wires handlers into `ui.js`, installs a hash
router for the three tabs, and registers global error handlers.

**Why this exists — the concepts it forces:**

1. **Composition root.** All wiring in one place; every other module stays ignorant of its
   collaborators. Nameable, defensible, senior-sounding — and true.
2. **Hash routing / History API.** `hashchange` handling and why SPAs need it.
3. **Module load order and ESM strictness.** Modules are strict-mode and deferred by default.
4. **`window.onerror` and `unhandledrejection`.** The global safety net, and why a rejected
   promise with no `.catch` is a different failure from a thrown error.
5. **Boot-time validation.** Duplicate topic IDs must fail loudly here. Validate at boundaries.

**Cases:** unknown hash route · direct load into a deep hash · `data.js` failing validation ·
`localStorage` unavailable at boot.

---

### F7 — `style.css` · The specimen sheet

**What it does.** One stylesheet, target **under 200 lines**. Every required CSS topic appears
**exactly once**, deliberately, with a comment naming the topic it covers.

> This is not a design system and must never become one. It is a *specimen sheet* — a demonstration
> of command over the language. This is more honest than production polish, and it is exactly what
> the minimalism constraint demands. The moment you are choosing colours for aesthetics rather than
> coverage, **stop**.

**Structure:**

```
@layer reset, tokens, layout, components, state;
```

**Why the layer order exists:** it makes the cascade *explicit* rather than emergent, which means
you can answer specificity questions by pointing at a decision rather than guessing. `@layer` also
lets low-specificity utilities beat high-specificity component rules — the exact problem
`!important` is usually abused to solve.

**Mandatory specimens** (each once, each commented):

`box-sizing` reset · custom properties · `:root` + `prefers-color-scheme` + `[data-theme]` three-state
theming · Grid (`repeat`/`minmax`/`auto-fit`) · Flexbox (`grow`/`shrink`/`basis`) · `gap` ·
one container query · `:has()` · `:is()` · `:not()` · `:nth-child()` · `::before` · `::after` ·
`::placeholder` · `::selection` · `:focus-visible` · attribute selector · `position: sticky` ·
one stacking-context demo · `clamp()` · logical properties · `aspect-ratio` · `overflow-x: auto` ·
one `@keyframes` · one `transition` · `transform` · `prefers-reduced-motion` · `@media print` ·
`tabular-nums` · `text-wrap: balance` · one deliberate `!important` **with a comment justifying it**.

**Cases:** theme in all three states (system/light/dark) · a colour defined *only* inside a media
query (the classic unreadable-page bug — build it, see it, fix it) · specificity collision between
two layers · print output with no colour.

---

### F8 — `index.html` · The shell

**Why it exists — the concepts it forces:** semantic landmarks · one `h1` per view · `<template>` ·
`<dialog>` · `<details>`/`<summary>` · `data-*` · `defer` vs `async` vs `type="module"` · meta/viewport/OG ·
ARIA roles · `aria-live` · skip link · label/`for` association · `fieldset`/`legend` · input types ·
native validation attributes · `autocomplete` tokens · character escaping.

**The settings form** (one small form, not a domain) carries `FormData`, `Object.fromEntries`, the
Constraint Validation API (`setCustomValidity`, `checkValidity`), `:invalid` styling, and the
`submit`/`input`/`change`/`invalid` event set. **This is the deliberate mitigation for the app-shaped
topics the e-commerce framing was carrying.** One form, not a checkout.

---

## Part 4 — Build order and why it is this order

| # | Stage | Produces | Why here |
|---|---|---|---|
| 1 | **Runner spike** | `runner.js` + 10 seed drills | Validates the load-bearing hypothesis before anything depends on it |
| 2 | **Data model** | `data.js` shape + 30 topics | Everything downstream bends around this; getting it wrong late is expensive |
| 3 | **Shell + specimen sheet** | `index.html`, `style.css` | HTML/CSS coverage banked early and never revisited |
| 4 | **Store** | `store.js` | Needed before the UI can show progress |
| 5 | **UI + Drills surface** | `ui.js` | First end-to-end vertical slice — the app becomes real |
| 6 | **Polyfills surface** | polyfill drills in `data.js` | Reuses the runner; no new machinery |
| 7 | **Loop surface** | `loop.js` | Hardest; do it once the runner is proven stable |
| 8 | **Forms, a11y, memory lab** | settings form, teardown | Sweeps the remaining topics |
| 9 | **Docs + deploy** | README, NOTES, Pages | The legibility layer — without it the depth is invisible |

**Gate between 1 and 2:** all ten seed drills execute with **zero runner special-casing**. If that
fails twice, the data model is wrong — reshape it before continuing.

---

## Part 5 — The learning protocol (non-negotiable)

**Write the wrong version first.**

For every trap in the syllabus: write the broken version, run it, watch it fail, *then* fix it.

Reading that `sort()` compares strings teaches nothing. Watching your own price list return
`10` before `9` teaches permanently. This is the single practice that converts 70% into 100%,
and it is why this project is built at all rather than read about.

**Three altitudes per topic — a topic is CLOSED only when all three pass:**

| Altitude | Demand | Serves |
|---|---|---|
| **SPOT IT** | Recognise the answer in ~80 seconds | Mettl OA |
| **BUILD IT** | Blank file, on the clock, every case handled | OA + technical round |
| **SAY IT** | Spoken aloud, ≤90 seconds, no notes | Technical round |

Closing at BUILD IT passes the OA and dies in the interview. **Never close at BUILD IT.**

---

## Part 6 — Coverage accounting

The app computes its own coverage from `data.js` at runtime and renders it. That number is the
claim, and clicking any topic executes it — **the proof is one click deep**.

`SYLLABUS.md` is the authoritative topic list. Every entry there must terminate in either:

- a **topic object** in `data.js`, **or**
- an **implementation site** in the source (with the file named), **or**
- an explicit **OUT** row with the blocker stated.

Nothing is allowed to be merely "mentioned". A topic with no terminus is an open gap.

---

## Part 7 — Interview surface

| Question | Your answer lives in |
|---|---|
| "Walk me through the architecture" | Part 1 — the one-directional graph |
| "How did you keep it clean?" | Part 2 — the runner contract |
| "Explain the event loop" | You *instrumented* it — open the Loop tab |
| "Why no framework?" | Every abstraction here is one you wrote |
| "What's the hardest bug you hit?" | The `finally` restore, or the leaked timer patch |
| "How do you know it works?" | Polyfill parity tests against native |
| "Why a drill tool, not an app?" | The coverage argument — and it is a *strategy* answer, not a technical one |

---

## Part 8 — Honest limits

| Limit | Why | What you say instead |
|---|---|---|
| Infinite loops cannot be interrupted | The main thread is blocked; only a Web Worker could kill it | "That's a genuine limitation of same-thread execution — a Worker with `terminate()` is the fix, and I scoped Workers out." |
| The sandbox is **not** a security boundary | `new Function` shares the realm; an iframe with `sandbox` would be stronger | Never claim it is secure. Knowing the difference is the signal. |
| No real backend | Static hosting by design | Zero dependencies is the honest claim, and it is the stronger one. |
| Service Worker | Stretch only — Pages does serve HTTPS | "Scoped out; no offline requirement." |
| Generators, Proxy, Workers, IndexedDB, Canvas | Deliberately out of scope | Know the one-sentence version of each. |

---

## Appendix — Decision log

| Decision | Rejected alternative | Reason |
|---|---|---|
| Drill tool | E-commerce app | ~55% of the app build bought zero coverage |
| Topics as data | Topics as features | Coverage becomes countable and cheap to extend |
| One pure runner | Per-surface executors | Collapses three features into one mechanism |
| `<template>` cloning | `innerHTML` templating | XSS-safe by construction; better interview answer |
| Closure store | `class` store | Deliberate contrast — both models exist in one codebase |
| Specimen sheet | Design system | The constraint demanded it; it is also more honest |
| Six files | Thirty | Cognitive carrying cost — you must defend every line under questioning |
