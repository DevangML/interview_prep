import type { LearnTopic } from '../types';

export const reactRoadmapTopicsPart1: LearnTopic[] = [
  {
    id: 'rd-react-components',
    area: 'React Core',
    group: 'Fundamentals',
    title: 'JSX Compilation, Props vs State & Component Lifecycle',
    status: 'covered',
    minutes: 8,
    summary:
      'The foundational core of React. JSX compiles to createElement / _jsx calls; unidirectional data flow establishes state as an immutable snapshot in time.',
    body: [
      '### ⚙️ JSX Transform & React Elements',
      'JSX is syntactic sugar for `_jsx(type, props, key)`. Every JSX tag produces a plain immutable JavaScript object (a React Element) describing what DOM nodes to create.',
      '',
      '### 📦 Props vs State Contract',
      '- **Props**: Immutable inputs passed downward from parents. Components must never mutate their own props.',
      '- **State**: Local memory held inside the component. Triggered updates schedule a new render pass without mutating the current closure snapshot.',
      '- **Component Composition**: Prefer accepting `children` and slots over passing dozens of boolean configuration props.',
    ],
    keyPoints: [
      'JSX transforms into _jsx() object trees; it is not runtime HTML.',
      'Props are read-only; state updates schedule asynchronous render passes.',
      'Use compound components and children slots for clean composition.',
    ],
    interview:
      'Explain that React elements are lightweight plain objects, which allows React to cheaply create and diff trees before committing real DOM mutations.',
    resources: [
      { label: 'roadmap.sh/react', url: 'https://roadmap.sh/react', kind: 'docs' },
    ],
  },
  {
    id: 'rd-react-hooks',
    area: 'React Core',
    group: 'Hooks Hierarchy',
    title: 'Complete Hooks Hierarchy: State, Effects, Context & Custom Hooks',
    status: 'covered',
    minutes: 9,
    summary:
      'Hooks encapsulate stateful logic without class hierarchies. Rules of hooks ensure deterministic call-order index mapping across fiber render passes.',
    body: [
      '### 🪝 The Rules of Hooks & Fiber Linked Lists',
      'Hooks rely on call order consistency. React maintains an internal singly-linked list of hook cells on each Fiber node (`workInProgress.memoizedState`). Never call hooks inside loops, conditions, or nested functions.',
      '',
      '### 🔍 Key Hook Signatures',
      '- **`useEffect` vs `useLayoutEffect`**: `useEffect` runs asynchronously after browser paint. `useLayoutEffect` runs synchronously after DOM mutations but before paint.',
      '- **`useMemo` & `useCallback`**: Preserve referential equality for expensive calculations and callback props.',
      '- **`useTransition` & `useDeferredValue`**: Mark updates as non-urgent transitions to keep user inputs responsive.',
      '- **`useId`**: Generates unique, deterministic, hydration-safe IDs for accessible form inputs.',
    ],
    keyPoints: [
      'Hooks are stored as a singly linked list on the Fiber node.',
      'useLayoutEffect fires synchronously before browser paint.',
      'useTransition marks state updates as interruptible low-priority tasks.',
    ],
    interview:
      'Why can hooks not be called inside if conditions? "Because React tracks hooks by call index along a linked list on the fiber node. Branching disrupts index alignment."',
    resources: [
      { label: 'roadmap.sh/react', url: 'https://roadmap.sh/react', kind: 'docs' },
    ],
  },
  {
    id: 'rd-react-state-mgmt',
    area: 'State Management',
    group: 'Global State',
    title: 'Modern State Management: Zustand, Jotai, Context API & Redux',
    status: 'covered',
    minutes: 8,
    summary:
      'Selecting state libraries based on update frequency and reactivity models. Context for low-frequency global settings; Zustand/Jotai for granular selector-based subscriptions.',
    body: [
      '### ⚖️ Context API vs External Stores',
      'The Context API is a dependency injection system, not an optimized state container. Any context update re-renders all subscribing consumers unless split into granular slices.',
      '',
      '### 🐻 Zustand & Jotai Atomic Architecture',
      '- **Zustand**: Minimal store outside the React tree. Components subscribe via selectors (`useStore(s => s.user)`), re-rendering only when their selected slice changes.',
      '- **Jotai**: Bottom-up atomic state graph. Atoms represent tiny state cells composed with derived getters/setters.',
      '- **Redux Toolkit**: Centralized unidirectional action-dispatch store with immutable Immer updates.',
    ],
    keyPoints: [
      'Context API re-renders all consumers on reference changes; no built-in selectors.',
      'Zustand utilizes useSyncExternalStore for tear-free concurrent subscriptions.',
      'Jotai models state as composable bottom-up dependency graphs.',
    ],
    interview:
      'When to choose Zustand over Context: "Zustand provides selector-based subscriptions preventing unnecessary subtree re-renders for high-velocity state changes."',
    resources: [
      { label: 'roadmap.sh/react', url: 'https://roadmap.sh/react', kind: 'docs' },
    ],
  },
];
