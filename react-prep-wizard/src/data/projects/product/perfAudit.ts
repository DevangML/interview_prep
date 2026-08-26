import type { ProjectBlueprint } from '../types';

/** Working engineer — make it slow on purpose, measure, then fix what the numbers name. */
export const perfAuditProject: ProjectBlueprint = {
  id: 'inter-perf-audit',
  title: 'The Performance Autopsy: Measure Before You Memo',
  tagline: 'A deliberately slow gallery, a profile, and only the fixes the profile justified.',
  realWorldAnalog: 'The quarterly Core Web Vitals regression nobody wants to own',
  track: 'product',
  tier: 'foundation',
  difficulty: 'Senior',
  estimatedBuildTimeHours: 8,
  architecturePattern: 'Measured optimisation: profile, hypothesis, change, re-measure',
  prerequisites: ['inter-tested-library'],
  summary:
    'Take a 5,000-item image gallery that renders badly, profile it, and fix only what the measurements identify. Half the candidates who reach for useMemo cannot say what it cost or what it saved; this project requires a before-and-after number for every optimisation, and reverting any change that did not earn its place.',
  tags: ['Performance', 'Profiling', 'Web Vitals', 'Bundling', 'Senior'],
  xpBounty: 360,
  coreScopeBoundaries: {
    inScopeMinimal: [
      'A React Profiler trace and a Performance panel trace, before and after.',
      'List virtualisation, with the row count and frame time recorded either side.',
      'Route-level code splitting with a measured entry-bundle delta.',
      'LCP, CLS and INP measured on a throttled profile, not on your laptop.',
    ],
    outOfScopeBloat: [
      'A CDN or server infrastructure.',
      'Micro-benchmarks of individual functions.',
      'Optimising anything the profile did not flag.',
    ],
  },
  stages: [
    {
      stageNumber: 1,
      stageName: 'Optimising by vibes',
      focus: 'memo everywhere, no measurement',
      codeSnippet: `const Row = memo(({ item, onSelect }) => ...);\n\nfunction Gallery({ items }) {\n  // new function identity every render — memo on Row does nothing\n  return items.map(i => <Row key={i.id} item={i} onSelect={() => pick(i)} />);\n}\n\n<img src={url} />   {/* no width/height: every image shifts the layout */}`,
      failureModeOrInvariant:
        'memo compares props shallowly and the inline arrow is a new reference every render, so all 5,000 rows re-render anyway — now with an added comparison cost. Images without dimensions produce a CLS of 0.4.',
      architecturalLesson:
        'memo is a shallow prop comparison. It is defeated by any new object, array or function identity passed as a prop, which is most props.',
    },
    {
      stageNumber: 2,
      stageName: 'Profile first',
      focus: 'Reading a flame chart and naming the actual cost',
      codeSnippet: `// React Profiler: commit 412ms, 5,000 Row renders, 0 skipped\n// Performance panel: one 380ms long task, main thread blocked, INP 520ms\n\n// Hypothesis: the cost is rendering 5,000 DOM nodes, not comparing props.\n// Test: render only the visible window.\nconst rows = useVirtualizer({ count: items.length, estimateSize: () => 96 });\n// After: commit 8ms, 14 Row renders, INP 90ms`,
      failureModeOrInvariant:
        'Virtualisation cuts the commit from 412ms to 8ms; the memo wrappers, re-measured, save nothing and are removed. The number, not the instinct, decided which change stayed.',
      architecturalLesson:
        'Optimisation is a hypothesis with a measurement on either side. A change with no before-and-after number is a guess that also increased complexity.',
    },
    {
      stageNumber: 3,
      stageName: 'Loading, not just rendering',
      focus: 'Code splitting, image sizing, and the critical path',
      codeSnippet: `const Editor = lazy(() => import('./Editor'));   // 240kB off the entry\n\n<img src={u} width={320} height={180}\n     loading="lazy" decoding="async"\n     sizes="(max-width: 600px) 100vw, 320px" srcSet={...} />\n\n/* content-visibility lets the browser skip offscreen layout entirely */\n.gallery-section { content-visibility: auto; contain-intrinsic-size: 600px; }`,
      failureModeOrInvariant:
        'Entry bundle falls from 495kB to 69kB and LCP from 4.1s to 1.6s on a throttled profile. CLS goes to 0 because every image reserves its box before it loads.',
      architecturalLesson:
        'Rendering performance and loading performance are different problems with different tools. Web Vitals separate them for exactly that reason.',
    },
  ],
  deliverables: [
    { id: 'Measurement', title: 'Measurement', spec: 'A recorded React Profiler trace and Performance panel trace before and after each change, plus a PerformanceObserver set up and torn down in an effect.' },
    { id: 'Filters', title: 'Filters', spec: 'A filter form that works before hydration, with scroll and resize handlers throttled and rAF-batched, and a transition keeping input responsive.' },
    { id: 'Rows', title: 'Rows', spec: 'Row props narrowed to a primitive-heavy shape, with a zero-rated item proving ?? is required rather than ||.' },
    { id: 'Regression', title: 'Regression', spec: 'A budget test that fails the build when the entry bundle or the row render count regresses.' },
    { id: 'Gallery', title: 'Gallery', spec: 'An auto-fit grid where featured items span two tracks, with captions aligned across each row.' },
    { id: 'Row', title: 'Row', spec: 'A flex line whose intrinsic sizing cost is measured, using auto margins instead of a spacer element.' },
    { id: 'Toolbar', title: 'Toolbar', spec: 'Leading and trailing groups separated by auto margins, one fewer node per row at 5,000 rows.' },
    { id: 'Theme', title: 'Theme', spec: 'A theme switch driven by custom properties, with the style-recalculation cost measured against a stylesheet swap.' },
  ],
  layers: [
    {
      layer: 'Measurement',
      components: ['React Profiler trace', 'Performance panel trace', 'Lighthouse run', 'bundle analyser'],
      invariants: ['Every optimisation has a recorded before and after number.'],
    },
    {
      layer: 'Render',
      components: ['virtualiser', 'stable callback identities', 'justified memo boundaries'],
      invariants: ['No memo survives that did not change a measurement.'],
    },
    {
      layer: 'Load',
      components: ['route-level lazy imports', 'responsive images', 'content-visibility'],
      invariants: ['Every image reserves its space before it loads.'],
    },
  ],
  explicitTopics: [
    // Declared because the manifest claims them against a stage rather than a
    // deliverable — a stage anchor evidences nothing on its own.
    { category: 'React Core', topic: 'Fiber WorkLoop, Double-Buffering & Virtual DOM Reconciliation', subtopic: 'Stage 2', howCovered: 'The flame chart shows 5,000 Row renders and 0 skipped, which is the render model made literal', conceptIds: ['react-rendering-model'] },
    { category: 'JavaScript', topic: 'Object references, shallow copies and deep cloning', subtopic: 'Stage 1', howCovered: 'The inline arrow prop is a new reference each render, which is precisely what defeats memo', conceptIds: ['react-references-copying'] },
    { category: 'React Core', topic: 'Immutability in React — mutating vs copying methods', subtopic: 'Stage 2', howCovered: 'Structural sharing is what makes a shallow comparison a valid skip signal for a large list', conceptIds: ['react-immutability'] },
    { category: 'React Core', topic: 'State Batching, Updaters & Closure Capture Semantics', subtopic: 'Stage 2', howCovered: 'Selection state is moved out of the parent so a click no longer re-renders every row', conceptIds: ['react-state'] },
    { category: 'React Core', topic: 'useRef, useContext, useReducer and custom hooks', subtopic: 'Stage 2', howCovered: 'useRef holds scroll position without rendering, and useDeferredValue keeps the filter input responsive', conceptIds: ['react-hooks-rest'] },
    { category: 'React Advanced', topic: 'Composition: children, render props, HOCs, compound components', subtopic: 'Stage 2', howCovered: 'Rows are composed so the expensive cell can be swapped for a cheap one and the difference measured', conceptIds: ['react-composition'] },
    { category: 'React Advanced', topic: 'Error boundaries, portals, refs and imperative escape hatches', subtopic: 'Stage 2', howCovered: 'A boundary keeps a single broken image row from taking the gallery down mid-measurement', conceptIds: ['react-errors-portals'] },
    { category: 'React Core', topic: 'Class components and the lifecycle vocabulary', subtopic: 'Stage 1', howCovered: 'The legacy row is a PureComponent, which is the same shallow comparison as memo and fails the same way', conceptIds: ['react-class-lifecycle'] },
    { category: 'React 19', topic: '`use()`, Server Components, `createRoot` vs `hydrateRoot`', subtopic: 'Stage 3', howCovered: 'Moving the static gallery chrome to a server component is measured as an entry-bundle reduction', conceptIds: ['r19-use-rsc'] },
    { category: 'JavaScript', topic: 'Promises, async/await and cancellation', subtopic: 'Stage 3', howCovered: 'Image decode and lazy chunk loading are promises whose ordering decides what the user sees first', conceptIds: ['js-promises'] },
    { category: 'JavaScript', topic: 'Array and object transformations, immutability', subtopic: 'Stage 2', howCovered: 'Sorting and filtering 5,000 items is the allocation the profiler flags, then made lazy', conceptIds: ['js-arrays-objects'] },
    { category: 'JavaScript', topic: 'Scope, hoisting, TDZ and closures', subtopic: 'Stage 1', howCovered: 'Every row closure retains its item, which is why 5,000 handlers is a memory decision as well as a render one', conceptIds: ['js-scope-closures'] },
    { category: 'JavaScript', topic: 'DOM APIs, events, bubbling and delegation', subtopic: 'Stage 2', howCovered: 'Delegation replaces per-row handlers, and passive listeners are what stop scroll jank', conceptIds: ['js-dom-events'] },
    { category: 'JavaScript', topic: '`this`, call/apply/bind and arrow functions', subtopic: 'Stage 1', howCovered: 'The class row binds in its constructor, and the allocation that bind performs per instance is visible in the heap snapshot', conceptIds: ['js-this'] },
    { category: 'JavaScript', topic: 'ES modules, CommonJS and dynamic import', subtopic: 'Stage 3', howCovered: 'Static versus dynamic import is what makes a chunk splittable, and barrel files are shown to defeat it', conceptIds: ['js-modules'] },
    { category: 'JavaScript', topic: 'Sameness: `==`, `===`, `Object.is`, `NaN`, `+0`/`-0`', subtopic: 'Stage 1', howCovered: 'memo compares with Object.is, so which values are considered equal decides the entire bailout', conceptIds: ['js-equality-matrix'] },
    { category: 'Architecture', topic: 'Front-end system design: components, data, states, failure', subtopic: 'Stage 3', howCovered: 'A performance budget is agreed up front, which is what turns optimisation into a spec instead of a hobby', conceptIds: ['frontend-system-design'] },
    { category: 'Routing', topic: 'Routes, params, nested layouts, navigation and guards', subtopic: 'Stage 3', howCovered: 'Route-level splitting is where the largest bundle win comes from, so the route tree is the unit of optimisation', conceptIds: ['router-core'] },
    { category: 'State Management', topic: 'Redux core: store, actions, reducers, pure functions, data flow', subtopic: 'Stage 2', howCovered: 'A store subscription that re-renders every row is diagnosed, and the selector is the fix', conceptIds: ['redux-core'] },
    { category: 'State Management', topic: 'react-redux, middleware, thunks and Redux Toolkit', subtopic: 'Stage 2', howCovered: 'createSelector memoisation is measured, including the case where an inline argument defeats it', conceptIds: ['redux-react-toolkit'] },
    { category: 'State Management', topic: 'Context, Zustand, TanStack Query — choosing the right tool', subtopic: 'Stage 2', howCovered: 'Where state lives is a performance decision, and this project measures the difference rather than asserting it', conceptIds: ['state-alternatives'] },
    { category: 'Tooling', topic: 'Flux — and why Mettl still asks about it', subtopic: 'Stage 2', howCovered: 'Fan-out from one store to thousands of subscribers is the cost model the selector layer exists to control', conceptIds: ['tooling-flux'] },
    { category: 'Web Platform', topic: 'HTTP, status codes, methods and idempotency', subtopic: 'Stage 3', howCovered: 'Cache-Control, preload and priority hints move the LCP image earlier in the critical path', conceptIds: ['web-http'] },
    { category: 'Web Platform', topic: 'CORS, the same-origin policy, and preflight', subtopic: 'Stage 3', howCovered: 'crossorigin on the image and font requests decides whether timing data is even visible to the page', conceptIds: ['web-cors'] },
    { category: 'Web Platform', topic: 'Cookies, localStorage, sessionStorage, IndexedDB', subtopic: 'Stage 3', howCovered: 'The Cache API serves repeat visits, and the second-load LCP is measured separately from the first', conceptIds: ['web-storage'] },
    { category: 'Web Platform', topic: 'XSS, CSRF, clickjacking and CSP', subtopic: 'Stage 3', howCovered: 'A strict CSP is measured for its cost, since nonce-based scripts change how the parser is blocked', conceptIds: ['web-security'] },
    { category: 'HTML', topic: 'Semantic elements and document outline', subtopic: 'Stage 3', howCovered: 'The heading and landmark structure is what lets the browser and the reader both skip work', conceptIds: ['html-semantics'] },
    { category: 'Accessibility', topic: 'ARIA, keyboard navigation and focus management', subtopic: 'Stage 2', howCovered: 'Virtualisation breaks screen-reader navigation unless the list size is declared, which is asserted in a test', conceptIds: ['a11y-core'] },
    { category: 'CSS', topic: 'Box model, display types, formatting contexts and `flow-root`', subtopic: 'Stage 3', howCovered: 'content-visibility and contain give the browser permission to skip offscreen layout entirely', conceptIds: ['css-box-display'] },
    { category: 'CSS', topic: 'Cascade, specificity, inheritance and `!important`', subtopic: 'Stage 3', howCovered: 'Unused CSS is measured, and cascade layers let dead rules be removed without fear of specificity regressions', conceptIds: ['css-cascade'] },
    { category: 'CSS', topic: 'Selectors, combinators, pseudo-classes, pseudo-elements, attributes', subtopic: 'Stage 3', howCovered: 'Deep descendant selectors are measured in the recalculate-style pass, which is where selector cost is actually visible', conceptIds: ['css-selectors'] },
    { category: 'Performance', topic: 'Core Web Vitals Autopsy: INP, LoAF API & Main-Thread Scheduling', subtopic: 'Stage 1', howCovered: 'The audit is run against Web Vitals targets, which is the roadmap topic exactly', conceptIds: ['rd-perf-web-vitals'] },
    { category: 'Performance', topic: 'AVIF Formats, Font Metric Overrides & CLS Elimination', subtopic: 'Stage 2', howCovered: 'Layout thrash, image decode and paint cost are the rendering half of the performance track', conceptIds: ['rd-perf-rendering-media'] },
    { category: 'Performance', topic: 'Page Weight Budgets, TTFB, Brotli & Speculation Rules', subtopic: 'Stage 1', howCovered: 'Resource hints and critical-path ordering are the first fixes the audit reaches for', conceptIds: ['rd-perf-high-priority'] },
    { category: 'Performance', topic: 'HTTP/3 QUIC, Edge CDN Caching & Real User Monitoring (RUM)', subtopic: 'Stage 3', howCovered: 'Compression, caching headers and CDN behaviour are measured, not assumed', conceptIds: ['rd-perf-network-cdn'] },
    {
      category: 'React Advanced',
      topic: 'Performance',
      subtopic: 'memo, useMemo, useCallback, virtualization, profiling',
      howCovered: 'Each tool is applied, measured, and reverted if the measurement did not justify it.',
      conceptIds: ['react-perf'],
    },
    {
      category: 'Web Platform',
      topic: 'How a page becomes pixels',
      subtopic: 'Critical rendering path, LCP, CLS, INP',
      howCovered: 'All three vitals are measured on a throttled profile before and after each loading change.',
      conceptIds: ['web-how-page-loads'],
    },
    {
      category: 'Tooling',
      topic: 'Build',
      subtopic: 'Webpack, Vite, tree shaking and code splitting',
      howCovered: 'Route-level dynamic imports are introduced and the entry-bundle delta is read from the analyser.',
      conceptIds: ['tooling-bundlers'],
    },
    {
      category: 'CSS',
      topic: 'Responsive',
      subtopic: 'Media queries, container queries and responsive images',
      howCovered: 'srcSet and sizes are driven by the same breakpoints as the layout, and measured on a slow connection.',
      conceptIds: ['css-media-container', 'css-ratio-logical'],
    },
  ],
  implicitFoundations: [
    {
      domain: 'DOM & Browser Pipeline',
      title: 'Long tasks and the main thread',
      mechanism: 'Any task over 50ms blocks input handling until it yields.',
      realWorldImpact: 'Directly explains a poor INP score and why virtualisation improved responsiveness.',
      conceptIds: ['web-how-page-loads', 'js-event-loop'],
    },
    {
      domain: 'V8 Engine & Memory',
      title: 'Allocation pressure',
      mechanism: 'Objects allocated per render are collected in the young generation, pausing the main thread.',
      realWorldImpact: 'Explains why stable identities help beyond just satisfying memo.',
      conceptIds: ['react-perf'],
    },
  ],
  frameworkVsManual: {
    frameworkHandled: ['Virtualiser windowing maths', 'Bundler code splitting'],
    manualEngineeringRequired: [
      'Reading the flame chart and forming the hypothesis.',
      'Reverting every optimisation that did not move a number.',
    ],
  },
};
