# The Parallel Build — One Problem, Two Implementations

**Addendum to `ARCHITECTURE.md`** · 2026-08-31
**Verdict up front: this is the right project. It is the wrong week.** Read Part 5 before starting anything.

---

> ## ⚠️ SUPERSEDED as a build plan — 2026-08-31
>
> This document prescribes **vanilla-first, then React**. The project is now **React-first**
> (Live Ops Console). Do not build from Part 1 or Part 5.
>
> **Still valid and worth reading:** **Part 2** — the vanilla↔React mapping table, which is a
> genuine OA mnemonic — and **Part 4**'s arithmetic on why building does not produce MCQ recall.
> Everything else is history.


## Part 0 — Why the idea is better than the one it replaces

Building the same app twice sounds like doubling the work. It isn't — and the reason is already
sitting in the architecture.

Look at the invariant I wrote for cleanliness:

> **`ui.js` is the *only* module that touches the DOM. Nothing else queries or mutates it.**

That was written to keep the layering honest. But it is *also* the exact seam where React swaps
in. Everything below that line is framework-agnostic and shared; everything above it is the
implementation under comparison.

**The architecture supports the dual build with zero modification.** That is not luck — it is what
one-directional layering buys you, and it is a genuinely strong thing to be able to say in a room.

### What the second implementation actually produces

Not a second app. **A diff.** And the diff is the most valuable artifact in this entire campaign:

> *"I built the same thing twice — once with no framework, once with React. Here is the line-by-line
> cost of every abstraction React gives you, measured on identical requirements."*

No candidate has that. Most cannot even articulate what React does, because they have never built
the thing it replaces.

---

## Part 1 — The parallel architecture

```
proving-ground/
├── core/                    ← SHARED · zero framework · ~50% of the intellectual work
│   ├── data.js                 topics as data — the specification
│   ├── runner.js               run(code, expectation) → result
│   └── recorder.js             event-loop instrumentation → Event[]
│
├── vanilla/                 ← IMPLEMENTATION A
│   ├── store.js                closure store + observers
│   ├── render.js               manual DOM: create, diff, patch, key-match
│   ├── ui.js                   template cloning + delegation
│   └── main.js
│
├── react/                   ← IMPLEMENTATION B
│   ├── hooks/useStore.js       the same state, as a hook
│   ├── hooks/useRunner.js      the same runner, as a hook
│   ├── components/…            Drills · Polyfills · Loop
│   └── App.jsx
│
├── DIFF.md                  ← THE ARTIFACT — the comparison, line-counted
└── index.html               ← both mount points, toggled by hash
```

### The split, honestly costed

| Layer | Shared? | Why |
|---|---|---|
| `data.js` | **100% shared** | Pure data. Both implementations import the same file. |
| `runner.js` | **100% shared** | A pure function. It never knew a UI existed — that was the contract. |
| `recorder.js` | **100% shared** | Returns `Event[]`. Rendering was always separate. |
| State | **Diverges** | Closure store vs `useReducer`. **This is a teaching seam.** |
| Rendering | **Diverges** | Manual diff/patch vs reconciliation. **This is the main teaching seam.** |
| Routing | **Diverges** | `hashchange` vs React Router. |

**Roughly half the work is written once.** The half that diverges is *precisely* the half that
teaches you what React is for.

---

## Part 2 — The mapping table

**This table is the most useful thing in this document, and it pays off this week even if you never
write a line of the parallel build.** Every React abstraction you must memorise for the OA has a
vanilla counterpart you would have hand-written. Learn the pairing and the React surface stops
being arbitrary vocabulary.

| You hand-write in vanilla | React gives you | What React actually costs you |
|---|---|---|
| Closure store + manual re-render call | `useState` | Re-render is implicit — you lose the ability to see when it happens |
| Observer list + `notify()` | Re-render on state change | Cannot opt a subscriber out without `memo` |
| Manual teardown function | `useEffect` cleanup | Runs on *every* dep change, not only unmount |
| Dirty-flag / manual diff before repaint | Reconciliation | You no longer control *when* — only *what* |
| Matching list items by id before patching | The `key` prop | Same algorithm; React just names it |
| Manual "did this change?" check | `Object.is` deps comparison | Shallow only — you must know that |
| Caching a computed value in a closure | `useMemo` | Cache is per-component-instance, not global |
| Stable function reference in a closure | `useCallback` | Needed *because* re-renders recreate functions |
| A mutable variable in module scope | `useRef` | Per-instance, and does not trigger a render |
| Passing a value down through 4 function calls | `useContext` | Every consumer re-renders on change |
| `try/catch` around your render call | Error boundary | **Class-only** — no hook equivalent |
| A `switch` over an action type | `useReducer` / Redux | Same reducer you already wrote, plus DevTools |
| `document.createElement` + `append` | JSX | A build step becomes mandatory |
| Manual `hashchange` listener | React Router | Route matching, params and nesting for free |
| Your own `requestAnimationFrame` batching | Automatic batching (React 18) | Behaviour changed between 17 and 18 — know which |
| Guarding a fetch with a version counter | `AbortController` + cleanup | Same race condition; React just makes the cleanup slot obvious |

> **Use this table for the OA.** When a question asks what `useCallback` is for, the answer you
> reach for is *"stable reference across re-renders"* — because you know what an unstable one
> breaks. That is faster and more durable than memorising a definition.

---

## Part 3 — Where React genuinely wins

Your instinct was right: the React version should not be a like-for-like port. It should do things
that are *painful* in vanilla, because that contrast is the argument.

| Feature | Why React makes it cheap | Vanilla cost |
|---|---|---|
| **Time-travel through a loop recording** | `useReducer` + an action log; Redux DevTools gives scrubbing free | Hand-rolled undo stack + full re-render |
| **Non-blocking filter over 444 topics** | `useTransition` keeps input responsive | Manual debounce + chunked rendering |
| **Per-drill error isolation** | Error boundary catches a thrown drill without killing the page | `try/catch` around every render path, by hand |
| **Lazy-loaded surfaces** | `React.lazy` + `Suspense` | Manual dynamic `import()` + loading state machine |
| **Theme without drilling** | `useContext` | Pass through every layer, or a global |
| **Derived drill stats** | `useMemo` | Manual cache + invalidation logic |

**And the showpiece:** a fourth tab — **`/diff`** — that renders the comparison table *from the
project's own two implementations*, with line counts computed at build time. The app teaches
React-versus-vanilla using itself as the evidence.

That is the demo you open in a technical round.

---

## Part 4 — What this does NOT do

Brutal honesty, because this is where the plan could hurt you.

**Building in React does not produce MCQ recall.**

You can build a flawless React app with hooks and never once encounter:

- `getSnapshotBeforeUpdate` or the class lifecycle order
- Flux's **dispatcher** — the thing that distinguishes Flux from Redux
- Webpack loader evaluation order (right-to-left)
- `UNSAFE_componentWillReceiveProps`
- `getDerivedStateFromError` vs `componentDidCatch`
- Redux middleware's `store => next => action` signature

**81% of the React OA surface is vocabulary that building does not teach.** A project teaches you
*understanding*; an MCQ tests *recognition*. They are different faculties and only one of them is
on the exam in five days.

### The arithmetic

| | Hours |
|---|---|
| Shared core (`data`, `runner`, `recorder`) | ~10 |
| Vanilla store + render + UI | ~12 |
| React store + components | ~8 |
| `DIFF.md` + the `/diff` tab | ~3 |
| **Parallel build total** | **~33** |
| React OA-exclusive study (separate, non-overlapping) | ~26 |
| **Combined** | **~59** |

**Available before ~5 Sept: 15–21 hours.**

You are not short by a little. You are short by two-thirds.

---

## Part 5 — The phasing

| Phase | When | What | Why |
|---|---|---|---|
| **0 — OA survival** | Now → OA | **React MCQ track only.** No building at all. Use the Part 2 table as a mnemonic layer. | The gate tests recognition. Building does not produce it. |
| **1 — Shared core** | Post-OA week 1 | `data.js`, `runner.js`, `recorder.js` | Framework-agnostic. Pure JS. The hardest and most transferable work. |
| **2 — Vanilla half** | Post-OA week 2 | Store, manual render, UI | You must build the thing React replaces *before* React means anything. |
| **3 — React half** | Post-OA week 3 | Hooks, components, the React-exclusive wins | Now every abstraction lands on a memory of having hand-written it. |
| **4 — The diff** | Post-OA week 3 | `DIFF.md` + `/diff` tab | The artifact. The story. The interview opener. |

**Order is not negotiable: vanilla before React.** Building the React half first teaches you an API.
Building it second teaches you *why the API exists* — and that is the difference between a candidate
who uses React and one who can defend a choice about it.

---

## Part 6 — The one thing to take from this today

Do not build anything this week.

But **read the Part 2 table before each React study block.** It converts arbitrary vocabulary into
a pairing you can derive under pressure — which is exactly what you need at 80 seconds per question
with an OA five days out.

The parallel build is the strongest project in this entire campaign. It is worth waiting eleven days for.
