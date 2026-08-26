import type { LearnTopic } from '../types';

export const reactRoadmapTopicsPart2: LearnTopic[] = [
  {
    id: 'rd-react-data-fetching',
    area: 'Data & APIs',
    group: 'Server Cache',
    title: 'Server State, TanStack Query, SWR & Real-Time WebSockets',
    status: 'covered',
    minutes: 8,
    summary:
      'Server state is fundamentally different from client state: it is asynchronous, shared, and out-of-date. TanStack Query and WebSockets manage caching, deduplication, and streaming.',
    body: [
      '### 🔄 Stale-While-Revalidate & WebSockets',
      'TanStack Query serves cached data instantly (stale) while fetching fresh data in the background (revalidate), eliminating UI loading flickers.',
      '',
      '### 🛡️ Query Keys & Optimistic Mutations',
      '- **Query Keys**: Structured arrays (e.g. `["users", userId]`) act as unique cache hashes.',
      '- **Optimistic Mutations**: Update local cache immediately, revert automatically on server error, and invalidate keys upon success.',
      '- **Real-Time Transports**: Subscribing to WebSockets / SSE to push incremental delta updates directly into query caches.',
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
    id: 'rd-react-routing-forms',
    area: 'Routing',
    group: 'Routing & Forms',
    title: 'Routing, Enterprise Forms & Headless UI Systems',
    status: 'covered',
    minutes: 9,
    summary:
      'Client-side nested routing and high-performance form subscriptions. Uncontrolled inputs, Zod schema validation, and headless accessible primitives (Radix UI / React Aria).',
    body: [
      '### 🗺️ React Router v7 Nested Layouts',
      'Route loaders fetch data parallel to JS chunk downloading, eliminating waterfall loading screens. `<Outlet />` renders nested children within shared layout shells.',
      '',
      '### 📝 React Hook Form & Headless Primitives',
      '- **Uncontrolled Inputs**: Register DOM refs directly, mutating values without triggering React component re-renders.',
      '- **Headless Primitives**: Radix UI / React Aria provide 100% accessible behavior, focus traps, and keyboard navigation without prescriptive styles.',
    ],
    keyPoints: [
      'React Router loaders eliminate waterfall request cascades.',
      'React Hook Form isolates re-renders to only modified inputs.',
      'Headless UI primitives provide accessible ARIA semantics for custom design systems.',
    ],
    interview:
      'Why choose headless component primitives over CSS component libraries: "Headless primitives provide complete keyboard accessibility and focus management while allowing full design token styling freedom."',
    resources: [
      { label: 'roadmap.sh/react', url: 'https://roadmap.sh/react', kind: 'docs' },
    ],
  },
  {
    id: 'rd-react-testing',
    area: 'Testing',
    group: 'Quality Assurance',
    title: 'React Testing Pyramid: Vitest, React Testing Library & Playwright',
    status: 'covered',
    minutes: 8,
    summary:
      'Testing component behavior from the user perspective. RTL userEvent, role-based queries, MSW API mocking, and Playwright automated end-to-end regression testing.',
    body: [
      '### 🧪 React Testing Library Philosophy',
      'The more your tests resemble the way your software is used, the more confidence they can give you. Query by accessible role (`getByRole("button", { name: /submit/i })`) rather than CSS classes or test IDs.',
      '',
      '### 🎭 Playwright E2E Tests & MSW',
      'Mock Service Worker (MSW) intercepts network requests at the network level; Playwright tests cross-browser user journeys with real browser binaries.',
    ],
    keyPoints: [
      'Test behavior, not internal component implementation details.',
      'Use userEvent over fireEvent to simulate real browser pointer/keyboard events.',
      'Mock network boundaries with Mock Service Worker (MSW).',
    ],
    interview:
      'Why getByRole is preferred over getByTestId: "getByRole tests accessibility and ensures screen reader users can navigate the element properly."',
    resources: [
      { label: 'roadmap.sh/react', url: 'https://roadmap.sh/react', kind: 'docs' },
    ],
  },
  {
    id: 'rd-react-rsc-compiler',
    area: 'React 19',
    group: 'Modern Architecture',
    title: 'React Server Components, Actions & React Compiler (React Forget)',
    status: 'covered',
    minutes: 9,
    summary:
      'React Server Components (RSC) stream serialized Flight responses to client boundaries; Server Actions provide type-safe RPCs; React Compiler automates memoization.',
    body: [
      '### 🌐 The RSC Paradigm & Flight Protocol',
      'Server Components never ship JavaScript to the browser. They can access databases directly using standard async/await syntax and stream Flight JSON to client Suspense boundaries.',
      '',
      '### 🤖 React Compiler (React Forget)',
      'A build-time compiler that analyzes JavaScript semantics and automatically injects fine-grained memoization, eliminating manual `useMemo` and `useCallback` boilerplate.',
    ],
    keyPoints: [
      'Server components stream Flight JSON, not raw HTML; zero client bundle weight.',
      '"use client" defines the boundary where JavaScript hydration occurs.',
      'React Compiler automates memoization at build time.',
    ],
    interview:
      'Differentiate RSC from SSR: "SSR delivers HTML strings on initial load for SEO and FCP. RSC is a continuous component model where backend components stream without shipping JS."',
    resources: [
      { label: 'roadmap.sh/react', url: 'https://roadmap.sh/react', kind: 'docs' },
    ],
  },
];
