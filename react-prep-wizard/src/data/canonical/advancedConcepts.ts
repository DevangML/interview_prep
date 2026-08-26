import type { CanonicalConcept } from './types';

export const advancedConcepts: CanonicalConcept[] = [
  {
    id: 'cc-react19-actions-rsc',
    pillar: 'React 19 & RSC',
    title: 'React Server Components (RSC), useActionState & useOptimistic',
    subtopics: ['Flight Protocol Streaming', '"use client" vs "use server"', 'useOptimistic (Immediate Rollback Trees)', 'useActionState', 'use() Hook for Promises & Context'],
    mechanismSummary: 'Server Components stream serialized JSX trees without shipping JS; useOptimistic and useActionState simplify asynchronous forms.',
    interviewSignificance: 'The current industry state-of-the-art for Next.js App Router and React 19 architecture.'
  },
  {
    id: 'cc-state-client-stores',
    pillar: 'State & Server Cache',
    title: 'Context API vs Zustand vs Jotai & Redux Selector Purity',
    subtopics: ['Context Re-render Cascades', 'Zustand Selectors', 'Jotai Primitive Atoms', 'Redux Purity & useSelector Bailout', 'useMemo Context Stabilization'],
    mechanismSummary: 'Context lacks granular selectors; Zustand provides minimal external stores with useSyncExternalStore; Jotai provides atomic dependency graphs.',
    interviewSignificance: 'Key architectural trade-off question in senior and staff frontend design rounds.'
  },
  {
    id: 'cc-state-server-cache',
    pillar: 'State & Server Cache',
    title: 'TanStack Query v5 & SWR: Query Keys, Deduplication & Mutations',
    subtopics: ['Stale-While-Revalidate', 'Hierarchical Query Keys', 'Optimistic Updates & Rollbacks', 'Garbage Collection Time (gcTime vs staleTime)', 'AbortController Cancellation'],
    mechanismSummary: 'Server state management library providing automated background revalidation, caching, deduplication, and optimistic mutations.',
    interviewSignificance: 'Replaces manual useEffect data fetching and redundant Redux API state slices.'
  },
  {
    id: 'cc-routing-forms-tooling',
    pillar: 'Routing, Forms & Tooling',
    title: 'React Router v7 (<Outlet />), React Hook Form + Zod & Module Federation',
    subtopics: ['Nested Route Layouts (<Outlet />)', 'Route Loaders & Actions', 'Uncontrolled Form Subscriptions', 'Zod Validation', 'Module Federation 2.0 Micro-Frontends'],
    mechanismSummary: 'Route loaders fetch data parallel to JS chunks; React Hook Form isolates re-renders to input nodes; Module Federation enables remote code sharing.',
    interviewSignificance: 'Covers modern enterprise application routing, validation, and micro-frontend architectures.'
  },
  {
    id: 'cc-perf-web-vitals',
    pillar: 'Performance & Web Vitals',
    title: 'Core Web Vitals (LCP, INP, CLS), LoAF API & Task Chunking',
    subtopics: ['LCP (< 2.5s)', 'INP (< 200ms)', 'CLS (< 0.1)', 'Long Animation Frames (LoAF) API', 'scheduler.yield() & postTask()', 'CSS Containment (contain: strict)'],
    mechanismSummary: 'Measures real-world user experience; INP breaks down input delay, processing, and presentation delay; scheduler.yield() yields main thread.',
    interviewSignificance: 'The gold standard for evaluating and diagnosing frontend application speed and responsiveness.'
  },
  {
    id: 'cc-perf-network-assets',
    pillar: 'Performance & Web Vitals',
    title: 'Brotli Compression, Speculation Rules, Font CLS & Modern Formats',
    subtopics: ['Page Weight Budgets (<500KB)', 'TTFB (<800ms)', 'Brotli (br) vs Gzip', 'Speculation Rules API', 'Font size-adjust Metric Overrides', 'AVIF / WebP & WOFF2'],
    mechanismSummary: 'Optimizes network transfer size, font layout shifting, and asset caching headers to minimize download and rendering latency.',
    interviewSignificance: 'Directly impacts Time to First Byte, First Contentful Paint, and Cumulative Layout Shift metrics.'
  },
  {
    id: 'cc-testing-qa-pyramid',
    pillar: 'Testing & QA',
    title: 'Vitest, React Testing Library, Mock Service Worker (MSW) & Playwright',
    subtopics: ['Testing Pyramid (Unit, Integration, E2E)', 'User-Centric Queries (getByRole)', 'userEvent vs fireEvent', 'API Mocking with MSW', 'Playwright Automated E2E'],
    mechanismSummary: 'Tests component behavior and accessibility from the user perspective rather than implementation details.',
    interviewSignificance: 'Essential for continuous integration quality gates and regression-free development.'
  }
];
