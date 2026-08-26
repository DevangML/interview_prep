import type { LearnTopic } from './types';

export const reactCoreTopics1: LearnTopic[] = [
  {
    id: 'react-rendering-model',
    area: 'React Core',
    group: 'Mental model',
    title: 'Fiber WorkLoop, Double-Buffering & Virtual DOM Reconciliation',
    status: 'covered',
    minutes: 9,
    summary:
      'Rendering is a pure calculation of UI trees. React builds a double-buffered `workInProgress` Fiber tree during the interruptible Render phase, diffs changes via heuristic algorithms, and commits synchronous DOM mutations.',
    prerequisites: ['js-execution-context', 'js-prototypes'],
    unlocks: ['react-state', 'react-effects', 'react19-compiler'],
    relatedUnitId: 'react-core-reconciliation',
    conceptDuel: [
      {
        q: 'Why does declaring a child component inside another component body cause form inputs to lose focus on every keystroke?',
        options: [
          'The child receives a new constructor reference each render, causing React to discard the Fiber and unmount the entire subtree.',
          'Event bubbling is interrupted by inner closures.',
          'Virtual DOM reconciliation skips inner declarations.',
          'The key prop is invalidated automatically.'
        ],
        correct: 0,
        explanation: 'When defined inside a parent, the component function has a fresh reference every render. React sees a different element type, discards the existing DOM node and Fiber, and mounts a brand new one.'
      },
      {
        q: 'What actually happens when you use array indexes as list keys during an item insertion at index 0?',
        options: [
          'React throws an unhandled reconciliation invariant error.',
          'Every row shifts its key, so React matches old DOM state to the wrong data item.',
          'React switches to synchronous full page re-rendering.',
          'The inserted item is ignored by the commit phase.'
        ],
        correct: 1,
        explanation: 'Index keys link component DOM state (like input values or focus) to position rather than data identity, corrupting row state when order changes.'
      }
    ],
    body: [
      '### ⚙️ The Two-Phase Engine: Render vs Commit',
      'A render is React **calling your component function** to get a description of the UI — a tree of Fiber nodes. Nothing has touched the real DOM yet. In Concurrent React, the **Render Phase is interruptible and asynchronous** — React can pause, yield to high-priority user input, or discard speculative renders entirely.',
      'The **Commit Phase is synchronous and non-interruptible**. React flips the pointer from the `current` Fiber tree to the `workInProgress` Fiber tree (Double Buffering) and applies the minimal set of real DOM mutations.',
      '',
      '### 🔍 The Heuristic Diffing Invariants',
      '- **Different Element Type (`div` → `span` or `ComponentA` → `ComponentB`)**: React unmounts the old subtree, destroys its state and DOM nodes, and mounts a new subtree from scratch.',
      '- **Same Element Type**: React keeps the underlying DOM node, updates only the changed attributes/props, and recurses down the children.',
      '- **Keys**: Keys must be stable, unique among siblings, and derived from permanent data identities (e.g. database IDs, UUIDs). Never use `Math.random()` or array index in dynamic lists.',
    ],
    keyPoints: [
      'Render describes; commit mutates. Render may be discarded and re-run under Concurrency.',
      'Fiber uses Double Buffering (`current` vs `workInProgress`) to prevent partial UI painting.',
      'Different element type discards the whole subtree — never define a component inside a component.',
      'Index keys corrupt row state on insertion, deletion, or reordering.',
    ],
    interview:
      'In Staff+ rounds, explain that Virtual DOM is not intrinsically faster than raw direct DOM manipulations, but it guarantees predictable O(N) heuristic updates while keeping UI deterministic as a pure projection of state.',
    pitfalls: [
      'Declaring a child component inside a parent component body — remounts every render.',
      'Using an array index as key in a list that can reorder, filter or insert.',
    ],
    resources: [
      { label: 'React — Preserving and resetting state', url: 'https://react.dev/learn/preserving-and-resetting-state', kind: 'docs' },
      { label: 'React — Render and commit', url: 'https://react.dev/learn/render-and-commit', kind: 'docs' },
    ],
  },
  {
    id: 'react-state',
    area: 'React Core',
    group: 'State',
    title: 'State Batching, Updaters & Closure Capture Semantics',
    status: 'covered',
    minutes: 8,
    summary:
      'State updates are asynchronous, automatically batched across all event loops in React 18+, and read from immutable lexical closures. Understanding update queues prevents the stale-closure bug class.',
    prerequisites: ['react-rendering-model', 'js-closures'],
    unlocks: ['react-effects', 'react-hooks-rest'],
    relatedUnitId: 'practical-todo-state',
    conceptDuel: [
      {
        q: 'In React 18+, what will be the resulting count after executing: setCount(count + 1); setCount(count + 1); setCount(c => c + 1); when starting from 0?',
        options: ['1', '2', '3', '0'],
        correct: 1,
        explanation: 'The first two calls read the closed-over count (0) and queue state = 1. The third updater reads the pending queue (1) and returns 2.'
      }
    ],
    body: [
      '### 📦 State as a Snapshot in Time',
      'Calling `setCount(count + 1)` does not mutate the `count` variable in your current execution frame. It queues a request for a future render. The `count` variable in the current lexical closure remains fixed at its snapshot value until the next render executes.',
      '',
      '### ⚡ Automatic Batching in React 18+',
      'React groups multiple state setters across promises, `setTimeout`, `fetch` callbacks, and native event handlers into a single re-render. If you need sequential state updates that depend on the latest pending value, always pass a **functional updater**: `setCount(prev => prev + 1)`.',
      '',
      '### 🚫 The Derived State Anti-Pattern',
      'Never copy props or state into another state variable if it can be computed during render. Redundant state introduces synchronization bugs and extra render passes.',
    ],
    keyPoints: [
      'The setter schedules a render; it does not mutate the local closure variable.',
      'Functional updaters (`prev => next`) chain through the internal update queue correctly.',
      'Never store what you can derive on the fly during render.',
    ],
    interview:
      'When asked about the three increments: "setCount(count + 1) three times yields 1, because all three read the same closed-over 0 snapshot. Using functional updaters yields 3."',
    code: `const [count, setCount] = useState(0);
// ❌ Stale snapshot: count stays 0 in this closure -> final count = 1
const wrong = () => { setCount(count + 1); setCount(count + 1); };
// ✅ Chained queue updaters -> final count = 2
const right = () => { setCount(c => c + 1); setCount(c => c + 1); };`,
    resources: [
      { label: 'React — Queueing state updates', url: 'https://react.dev/learn/queueing-a-series-of-state-updates', kind: 'docs' },
    ],
  },
];
