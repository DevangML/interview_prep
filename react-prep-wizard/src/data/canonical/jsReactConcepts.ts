import type { CanonicalConcept } from './types';

export const jsReactConcepts: CanonicalConcept[] = [
  {
    id: 'cc-js-event-loop-pacing',
    pillar: 'JavaScript & V8 Runtime',
    title: 'Event Loop, Microtasks (Promises) & Macrotask Queue Pacing',
    subtopics: ['Call Stack', 'Microtask Queue (queueMicrotask, Promise.then)', 'Macrotask Queue (setTimeout, I/O)', 'requestAnimationFrame (RAF)', 'Microtask Starvation'],
    mechanismSummary: 'Microtasks drain completely after every task before rendering; long synchronous blocks starve RAF and freeze UI frames.',
    interviewSignificance: 'Underpins async execution order, state batching, and 120 FPS rendering framerates.'
  },
  {
    id: 'cc-js-memory-v8-closures',
    pillar: 'JavaScript & V8 Runtime',
    title: 'Closures, V8 Hidden Classes & Generational Garbage Collection',
    subtopics: ['Closure Retainer Graphs', 'Hidden Classes & Inline Caching (IC)', 'Young Generation (Nursery) vs Old Generation (Mark-Sweep)', 'Memory Leak Pitfalls'],
    mechanismSummary: 'V8 optimizes monomorphic property access via Hidden Classes; generational GC collects short-lived objects via Scavenger cycles.',
    interviewSignificance: 'Crucial for zero-allocation high-frequency rendering and diagnosing memory leaks in long-lived SPAs.'
  },
  {
    id: 'cc-js-polyfills-hof',
    pillar: 'JavaScript & V8 Runtime',
    title: 'Polyfill Engineering (reduce) & Higher-Order Functions (debounce)',
    subtopics: ['Array.prototype.reduce Polyfill', 'Dynamic Context (thisArg)', 'Empty Array TypeError', 'Debounce & Throttle HOFs', 'Lexical timerId Binding'],
    mechanismSummary: 'Polyfills augment prototypes with sound specifications; HOFs encapsulate closure state across asynchronous timer ticks.',
    interviewSignificance: 'Standard live-coding interview assessment of deep JavaScript language mastery.'
  },
  {
    id: 'cc-ts-invariants-generics',
    pillar: 'TypeScript Invariants',
    title: 'Discriminated Unions, Generics, Narrowing & Template Literals',
    subtopics: ['Discriminated Unions', 'Generic Constraints (<T extends object>)', 'Type Guards (is, in)', 'Conditional Types', 'Satisfies Operator'],
    mechanismSummary: 'Compile-time type system enforcing exhaustiveness checking, type narrowing, and sound API contracts.',
    interviewSignificance: 'Ensures bulletproof state machines and type-safe server-client communication.'
  },
  {
    id: 'cc-react-fiber-reconciliation',
    pillar: 'React Core & Fiber',
    title: 'Fiber WorkLoop, Double-Buffering & Reconciliation Diffing',
    subtopics: ['Fiber Nodes (child, sibling, return)', 'current vs workInProgress Trees', 'Heuristic O(N) Diffing', 'Keys Invariant (Index vs ID)', 'Commit Phase Mutations'],
    mechanismSummary: 'React alternates between current and workInProgress Fiber trees; reconciles virtual nodes to minimize real DOM mutations.',
    interviewSignificance: 'The core mental model explaining how React renders, schedules, and applies DOM updates.'
  },
  {
    id: 'cc-react-composition-events',
    pillar: 'React Core & Fiber',
    title: 'Component Composition, Lifting State & Root Synthetic Event Delegation',
    subtopics: ['Compound Components', 'Children & Slots Composition', 'Unidirectional Data Flow', 'Root Event Delegation (createRoot container)'],
    mechanismSummary: 'React attaches a single listener per event type at the root container and dispatches pooled SyntheticEvents.',
    interviewSignificance: 'Guides scalable component API design and explains event propagation differences.'
  },
  {
    id: 'cc-hooks-complete-hierarchy',
    pillar: 'Hooks Hierarchy',
    title: 'Complete 15-Hook Hierarchy: State, Effects, Context & Refs',
    subtopics: ['useState & useReducer', 'useEffect vs useLayoutEffect vs useInsertionEffect', 'useRef & useImperativeHandle', 'useMemo & useCallback', 'useId'],
    mechanismSummary: 'Hooks store state cells in a singly-linked list on Fiber.memoizedState; useLayoutEffect runs synchronously before browser paint.',
    interviewSignificance: 'Explains rules of hooks, prevents visual flicker in DOM measurement, and eliminates re-render cascades.'
  },
  {
    id: 'cc-hooks-concurrency-transitions',
    pillar: 'Hooks Hierarchy',
    title: 'Concurrent Transitions: useTransition, useDeferredValue & useSyncExternalStore',
    subtopics: ['Concurrent Interruptible Transitions', 'Lagged Value Deferral', 'Tear-Free Subscriptions', 'getSnapshot & getServerSnapshot'],
    mechanismSummary: 'Transitions mark state updates as non-urgent; useSyncExternalStore ensures tear-free reads from stores outside React.',
    interviewSignificance: 'The modern React concurrent architecture for responsive search inputs and high-frequency stores.'
  }
];
