import type { LearnTopic } from '../types';

export const reactRoadmapTopics: LearnTopic[] = [
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
      'JSX is not HTML; it is syntactic sugar for `_jsx(type, props, key)`. Every JSX tag produces a plain immutable JavaScript object (a React Element) describing what DOM nodes to create.',
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
      '- **`useEffect` vs `useLayoutEffect`**: `useEffect` runs asynchronously after browser paint. `useLayoutEffect` runs synchronously after DOM mutations but before paint (ideal for DOM layout measurements).',
      '- **`useMemo` & `useCallback`**: Preserve referential equality for expensive calculations and callback props.',
      '- **Custom Hooks**: Extract stateful orchestration into reusable functions starting with `use`.',
    ],
    keyPoints: [
      'Hooks are stored as a singly linked list on the Fiber node.',
      'useLayoutEffect fires synchronously before browser paint.',
      'Custom hooks share stateful logic, not stateful data instances.',
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
    title: 'Modern State Management: Zustand, Jotai & Context API',
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
  {
    id: 'rd-react-data-fetching',
    area: 'Data & APIs',
    group: 'Server Cache',
    title: 'Server State & Caching: TanStack Query & SWR',
    status: 'covered',
    minutes: 8,
    summary:
      'Server state is fundamentally different from client state: it is asynchronous, shared, and out-of-date. TanStack Query manages caching, deduplication, and background refetching.',
    body: [
      '### 🔄 Stale-While-Revalidate Protocol',
      'TanStack Query serves cached data instantly (stale) while fetching fresh data in the background (revalidate), eliminating UI loading flickers.',
      '',
      '### 🛡️ Query Keys & Cache Invalidation',
      '- **Query Keys**: Structured arrays (e.g. `["users", userId]`) act as unique cache hashes.',
      '- **Optimistic Mutations**: Update local cache immediately, revert automatically on server error, and invalidate keys upon success.',
    ],
    keyPoints: [
      'Server state requires caching, deduplication, and expiration policies.',
      'TanStack Query eliminates manual useEffect loading/error boilerplate.',
      'Optimistic updates require rollback snapshots on mutation failure.',
    ],
    interview:
      'Why avoid putting API data in Redux/Zustand: "Server cache requires expiration, deduplication, polling, and refetch on window focus which TanStack Query manages natively."',
    resources: [
      { label: 'roadmap.sh/react', url: 'https://roadmap.sh/react', kind: 'docs' },
    ],
  },
  {
    id: 'rd-react-rsc-next',
    area: 'React 19',
    group: 'Modern Architecture',
    title: 'React Server Components, Frameworks & Zero-Bundle Architecture',
    status: 'covered',
    minutes: 9,
    summary:
      'React Server Components (RSC) execute on the server and stream serialized Flight responses to client boundaries. Zero client JS bundle size for backend data components.',
    body: [
      '### 🌐 The RSC Paradigm',
      'Server Components never ship JavaScript to the browser. They can access databases and backend filesystems directly using standard async/await syntax.',
      '',
      '### 🧩 Client Boundaries',
      '- `"use client"` declares an interactive boundary capable of handling state, effects, and DOM listeners.',
      '- Server Components can pass JSX elements as `children` into Client Components without converting the server subtree into client bundle code.',
    ],
    keyPoints: [
      'Server components stream Flight JSON, not raw HTML; zero client bundle weight.',
      '"use client" defines the boundary where JavaScript hydration occurs.',
      'Server actions ("use server") provide type-safe RPC endpoints.',
    ],
    interview:
      'Differentiate RSC from SSR: "SSR delivers HTML strings on initial load for SEO and FCP. RSC is a continuous component model where backend components stream without shipping JS."',
    resources: [
      { label: 'roadmap.sh/react', url: 'https://roadmap.sh/react', kind: 'docs' },
    ],
  },
];
