import type { LearnTopic } from './types';

export const reactCoreTopics1: LearnTopic[] = [
  {
    id: 'react-rendering-model',
    area: 'React Core',
    group: 'Mental model',
    title: 'Rendering, reconciliation, keys and the virtual DOM',
    status: 'partial',
    minutes: 8,
    summary:
      'Almost every React bug and every React interview question resolves to one sentence: rendering is a pure function of props and state, and React decides what changed by comparing trees.',
    prerequisites: ['js-execution-context', 'js-prototypes'],
    unlocks: ['react-state', 'react-effects', 'react19-compiler'],
    relatedUnitId: 'react-core-reconciliation',
    conceptDuel: [
      {
        q: 'Why does declaring a child component inside another component body cause form inputs to lose focus on every keystroke?',
        options: [
          'The child receives a new type reference each render, causing React to unmount the entire subtree.',
          'Event bubbling is interrupted by inner closures.',
          'Virtual DOM reconciliation skips inner declarations.',
          'The key prop is invalidated automatically.'
        ],
        correct: 0,
        explanation: 'When defined inside a parent, the component function has a fresh reference every render. React sees a different element type, discards the existing DOM node, and mounts a brand new one.'
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
      'A render is React **calling your component function** to get a description of the UI — a tree of plain objects, the "virtual DOM". Nothing has touched the real DOM yet. React then **reconciles**: it diffs the new tree against the previous one and produces the minimal list of real DOM mutations, which it applies in the **commit** phase.',
      'The diff uses two heuristics. **Different element type ⇒ discard the subtree and rebuild** — which is why a component defined *inside* another component remounts on every render. **Same type ⇒ keep the DOM node, update the changed props, recurse.**',
      '**Keys** identify children across renders in a list. Keys must be stable, unique among siblings, and derived from data. They are not passed as props.',
    ],
    keyPoints: [
      'Render describes; commit mutates. Render may be discarded and re-run.',
      'Different element type discards the whole subtree — never define a component inside a component.',
      'Index keys corrupt row state on insertion or reorder.',
    ],
    interview:
      '"Why do we need keys?" is asked constantly: without stable keys, state attaches to the wrong row. "Is virtual DOM faster than real DOM?" is a trap — "no, it is faster than naive full re-rendering and easier to get right".',
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
    title: 'State, batching, updaters and derived values',
    status: 'covered',
    minutes: 7,
    summary:
      'State updates are asynchronous, batched, and read from a closure — three facts that together explain the most common React confusion of all.',
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
      'Calling a setter does not change the variable you are holding; it schedules a re-render. The `count` in the current closure keeps its old value for the rest of that render.',
      '**Batching**: React groups multiple updates into a single re-render. Since React 18 this is automatic everywhere.',
      '**Derived state is an anti-pattern.** If a value can be computed from props or state, compute it during render.',
    ],
    keyPoints: [
      'The setter schedules; it does not assign. The current render keeps the old value.',
      'Use the functional updater whenever the next value depends on the previous.',
      'Never store what you can derive.',
    ],
    interview:
      'The three-increments question is near-universal. Answer "1" for three direct calls, explain closures, then offer functional updaters.',
    code: `const [count, setCount] = useState(0);
const wrong = () => { setCount(count + 1); setCount(count + 1); };
const right = () => { setCount(c => c + 1); setCount(c => c + 1); };`,
    resources: [
      { label: 'React — Queueing state updates', url: 'https://react.dev/learn/queueing-a-series-of-state-updates', kind: 'docs' },
    ],
  },
];
