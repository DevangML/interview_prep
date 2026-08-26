import type { LearnTopic } from './types';

export const reactCoreTopics2: LearnTopic[] = [
  {
    id: 'react-effects',
    area: 'React Core',
    group: 'Hooks',
    title: 'useEffect — dependencies, cleanup and when not to use it',
    status: 'covered',
    minutes: 9,
    summary:
      'The most misused hook in React. Most effects in most codebases should not exist, and official guidance advises computing during render.',
    prerequisites: ['react-state', 'js-async'],
    unlocks: ['react-hooks-rest', 'react19-actions'],
    relatedUnitId: 'practical-stopwatch-useref',
    conceptDuel: [
      {
        q: 'When does the cleanup function returned inside a useEffect callback run?',
        options: [
          'Only when the component unmounts.',
          'Before the next effect execution AND when the component unmounts.',
          'Synchronously before the DOM commits.',
          'Immediately after state setters are called.'
        ],
        correct: 1,
        explanation: 'Effect cleanups execute before every subsequent effect re-run (with old closure values) and finally on unmount.'
      }
    ],
    body: [
      'An effect synchronises your component with an **external system** — a subscription, network request, DOM measurement, or timer.',
      '**Cleanup runs before the next effect and on unmount**, not only on unmount.',
      '`useLayoutEffect` runs synchronously after DOM mutation and **before paint** — correct for measuring layout without flicker.',
    ],
    keyPoints: [
      'Effects synchronise with external systems. Rendering data is not an external system.',
      'Cleanup runs between effects, not just at unmount.',
      '`useLayoutEffect` blocks paint; use it only for measurement.',
    ],
    interview:
      'Expect "what does the dependency array do", "why does an inline object in deps loop forever", and "when would you NOT use an effect".',
    resources: [
      { label: 'React — Synchronising with effects', url: 'https://react.dev/learn/synchronizing-with-effects', kind: 'docs' },
    ],
  },
  {
    id: 'react-hooks-rest',
    area: 'React Core',
    group: 'Hooks',
    title: 'useRef, useContext, useReducer and custom hooks',
    status: 'partial',
    minutes: 8,
    summary:
      'The rest of the core hook set, plus the rule that governs all of them and the one place that rule now bends.',
    prerequisites: ['react-effects'],
    unlocks: ['react19-use-hook', 'state-management-patterns'],
    relatedUnitId: 'practical-stopwatch-useref',
    conceptDuel: [
      {
        q: 'If two different components invoke the same custom hook `useCounter()`, how is state shared between them?',
        options: [
          'They share a single global counter state singleton.',
          'They get completely independent state allocations tied to their individual render call sites.',
          'State is shared only if they share the same parent fiber node.',
          'Custom hooks cannot hold useState.'
        ],
        correct: 1,
        explanation: 'Custom hooks share stateful logic, never state itself. Each component invocation gets independent hook slots.'
      }
    ],
    body: [
      '**Rules of hooks**: call them at the top level, never inside conditions or loops. React matches hooks by call order.',
      '**useRef** is a stable mutable box that survives renders and is invisible to rendering: updating `.current` triggers no re-render.',
      '**useContext** reads nearest provider. Every consumer re-renders when value reference changes.',
    ],
    keyPoints: [
      'Hooks are matched by call order — that is why the rules exist.',
      'A ref change never re-renders. That is the feature.',
      'Custom hooks share logic, not state.',
    ],
    interview:
      '"Difference between state and ref", "why cannot hooks be conditional", and "do custom hooks share state" (answer: no).',
    resources: [
      { label: 'React — Rules of hooks', url: 'https://react.dev/reference/rules/rules-of-hooks', kind: 'docs' },
    ],
  },
  {
    id: 'react-class-lifecycle',
    area: 'React Core',
    group: 'Legacy',
    title: 'Class components and the lifecycle vocabulary',
    status: 'missing',
    minutes: 6,
    summary:
      'On the Mettl competency list as "Lifecycle Application", and unavoidable in legacy systems.',
    prerequisites: ['react-rendering-model'],
    unlocks: ['react-effects'],
    body: [
      'Mounting: `constructor` → `getDerivedStateFromProps` → `render` → `componentDidMount`.',
      'Updating: `shouldComponentUpdate` → `render` → `componentDidUpdate`.',
      'Unmounting: `componentWillUnmount` (clears listeners, timers, requests).',
    ],
    keyPoints: [
      '`componentDidMount` = after first commit, DOM available.',
      '`shouldComponentUpdate` skips render; `PureComponent` implements it shallowly.',
    ],
    interview:
      'Mettl standard: "which lifecycle for API call" (`componentDidMount`) and "map lifecycles to hooks".',
    resources: [
      { label: 'React lifecycle methods diagram', url: 'https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/', kind: 'practice' },
    ],
  },
];
