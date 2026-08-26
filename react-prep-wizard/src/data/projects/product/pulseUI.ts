import type { ProjectBlueprint } from '../types';

export const pulseUIProject: ProjectBlueprint = {
  id: 'project-pulseui',
  title: 'PulseUI: Server-Driven UI (SDUI) Orchestrator & Micro-Frontend Hub',
  tagline: 'Enterprise SDUI and federated micro-app orchestrator streaming dynamic component trees with RSC & Subgrid.',
  realWorldAnalog: 'Airbnb Dynamic Layout / Uber Modular Marketplace',
  track: 'product',
  tier: 'flagship',
  difficulty: 'Staff',
  estimatedBuildTimeHours: 10,
  architecturePattern: 'Server-Driven UI (SDUI) BFF + Module Federation 2.0 + Hexagonal Shell',
  summary:
    'Build an enterprise Server-Driven UI orchestrator streaming backend layout ASTs and remote federated micro-apps with zero client crashes. Minimal scope (4 layout primitives, dynamic remote loader, action bus) with maximum architectural depth: Zod AST validation, Module Federation 2.0 with SRI, and CSS Subgrid multi-card alignment.',
  tags: ['SDUI', 'Micro-Frontends', 'Module Federation', 'RSC', 'CSS Subgrid', 'Enterprise'],
  xpBounty: 450,
  coreScopeBoundaries: {
    inScopeMinimal: [
      'Server-driven layout stream parsing 4 core primitives (Hero, Carousel, BentoGrid, ActionCard).',
      'Module Federation 2.0 dynamic remote loader with SRI validation.',
      'Declarative Command Bus for server actions (NAVIGATE, MODAL, MUTATE).',
      'CSS Subgrid multi-card baseline alignment with @container queries.'
    ],
    outOfScopeBloat: [
      'Visual drag-and-drop WYSIWYG page builders.',
      'Multi-cloud CDN deployment managers.',
      'End-user role RBAC administration portals.',
      'Full analytics reporting chart suites.'
    ]
  },
  stages: [
    {
      stageNumber: 1,
      stageName: 'Minimal Working Prototype',
      focus: 'Naïve Switch Statement & Dynamic Script Tag',
      codeSnippet: `// Stage 1: Naïve Switch & Unvetted Script Injection\nfunction NaiveSDUIRenderer({ layout }: { layout: any }) {\n  return (\n    <div>\n      {layout.components.map((c: any) => {\n        switch (c.type) {\n          case 'hero': return <Hero data={c.data} />;\n          case 'card': return <Card data={c.data} />;\n          default: return <div>Unknown: {c.type}</div>;\n        }\n      })}\n    </div>\n  );\n}`,
      failureModeOrInvariant: 'Backend introducing a new component type before client release crashes the parser. Unsandboxed script tags allow rogue micro-frontends to crash the entire host app.',
      architecturalLesson: 'Server-Driven UI requires recursive schema validation with graceful unknown node fallbacks, and micro-frontends require isolated error boundaries.'
    },
    {
      stageNumber: 2,
      stageName: 'The Production Breakdown',
      focus: 'Layout Shift (CLS) & Detached DOM Memory Leaks',
      codeSnippet: `// Stage 2: Asynchronous Remote Injection & Memory Leaks\nfunction loadRemote(url: string) {\n  const script = document.createElement('script');\n  script.src = url; // No SRI hash verification\n  document.head.appendChild(script);\n  // Detached DOM: Switching remotes fails to unmount old React roots\n}`,
      failureModeOrInvariant: 'Remote components loading asynchronously cause severe Cumulative Layout Shift (CLS). Unmounted micro-apps leak window listeners and detached DOM trees.',
      architecturalLesson: 'Micro-frontends must enforce strict layout sizing reservations and explicit teardown lifecycles.'
    },
    {
      stageNumber: 3,
      stageName: 'The Canonical Concept Evolution',
      focus: 'Recursive Zod AST Schema + Module Federation 2.0 with SRI + RSC',
      codeSnippet: `// Stage 3: Zod AST Validation + Sandboxed Remote Loader\nexport const SDUINodeSchema: z.ZodType<SDUINode> = z.lazy(() =>\n  z.discriminatedUnion('type', [\n    z.object({ type: z.literal('hero'), id: z.string(), title: z.string() }),\n    z.object({ type: z.literal('grid'), id: z.string(), children: z.array(SDUINodeSchema) }),\n    z.object({ type: z.literal('unknown'), id: z.string(), rawType: z.string() })\n  ])\n);\n\n// Sandboxed Error Boundary Wrapper\nexport function SDUISlot({ node }: { node: SDUINode }) {\n  return (\n    <ErrorBoundary fallback={<SDUIFallbackCard node={node} />}>\n      <Suspense fallback={<SDUISkeleton type={node.type} />}>\n        <DynamicFederatedComponent node={node} />\n      </Suspense>\n    </ErrorBoundary>\n  );\n}`,
      failureModeOrInvariant: 'Zero client crashes on unknown server types. Federated remotes are verified with cryptographic SRI hashes and isolated by ErrorBoundaries.',
      architecturalLesson: 'Type-safe AST contracts and dependency sandboxing enable bulletproof enterprise server-driven architectures.'
    },
    {
      stageNumber: 4,
      stageName: 'Production Hardening & Design Elegance',
      focus: 'CSS Subgrid Baseline Alignment, Container Queries & Telemetry',
      codeSnippet: `// Stage 4: CSS Subgrid Multi-Card Alignment\n// .sdui-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }\n// .sdui-card { display: grid; grid-template-rows: subgrid; grid-row: span 3; container-type: inline-size; }\n// @container (max-width: 320px) { .sdui-card-cta { flex-direction: column; } }\n\n// Impression Telemetry via navigator.sendBeacon\nfunction flushImpressions(queue: string[]) {\n  navigator.sendBeacon('/api/telemetry', JSON.stringify({ impressions: queue }));\n}`,
      failureModeOrInvariant: 'Card headers, bodies, and CTAs align perfectly across dynamic server columns. Telemetry flushes reliably on page unload.',
      architecturalLesson: 'Subgrid and container queries guarantee visual elegance for dynamically generated layouts.'
    }
  ],
  deliverables: [
  ],
  layers: [
    { layer: 'Presentation', components: ['Federated Shell', 'Dynamic SDUI Layout Parser', 'Subgrid Component Grid', 'Remote Error Boundary'], invariants: ['Remote crashes are isolated by ErrorBoundary wrappers without breaking parent layout.'] },
    { layer: 'Application', components: ['SDUI Component Registry', 'Declarative Action Dispatcher', 'Telemetry Impression Tracker'], invariants: ['All server-driven actions pass through a centralized command bus.'] },
    { layer: 'Domain', components: ['SDUINode Discriminated Union', 'SDUIAction Value Object', 'Layout Validator'], invariants: ['Zod runtime validation guarantees client contract safety before rendering.'] },
    { layer: 'Infrastructure', components: ['Module Federation 2.0 Loader', 'Edge RSC Streamer', 'CDN Edge Cache'], invariants: ['Shared singletons (React, QueryClient) deduplicated across remote micro-apps.'] }
  ],
  explicitTopics: [
    // Declared because the manifest claims them against a stage rather than a
    // deliverable — a stage anchor evidences nothing on its own.
    { category: 'Web Platform', topic: 'CORS, the same-origin policy, and preflight', subtopic: 'Stage 2', howCovered: 'Remotes load cross-origin, so crossorigin="anonymous" and the header set decide whether errors are even readable', conceptIds: ['web-cors'] },
    { category: 'CSS', topic: 'Placement, spanning, `grid-template-areas` and implicit tracks', subtopic: 'Stage 4', howCovered: 'Subgrid lets server-composed cards align their internal rows against the parent track list', conceptIds: ['css-grid-placement'] },
    { category: 'CSS', topic: 'Tracks, `fr`, `repeat`, `minmax`, `auto-fit` vs `auto-fill`', subtopic: 'Stage 4', howCovered: 'The page track list is auto-fit minmax, since the server decides how many cards arrive', conceptIds: ['css-grid-tracks'] },
    { category: 'CSS', topic: '`aspect-ratio`, the padding hack, writing modes and logical properties', subtopic: 'Stage 2', howCovered: 'Remote slots reserve their box before the remote loads, which is what removes the CLS spike', conceptIds: ['css-ratio-logical'] },
    { category: 'React Advanced', topic: 'Composition: children, render props, HOCs, compound components', subtopic: 'Stage 3', howCovered: 'The component registry maps a node type to a component, which is composition driven by data rather than JSX', conceptIds: ['react-composition'] },
    { category: 'React Core', topic: 'Fiber WorkLoop, Double-Buffering & Virtual DOM Reconciliation', subtopic: 'Stage 3', howCovered: 'Node ids become keys, so a reordered server layout preserves the state of the cards that stayed', conceptIds: ['react-rendering-model'] },
    { category: 'React Core', topic: 'State Batching, Updaters & Closure Capture Semantics', subtopic: 'Stage 3', howCovered: 'Host state and remote state are separated, because a remote unmount must not take host state with it', conceptIds: ['react-state'] },
    { category: 'React Core', topic: 'useEffect — dependencies, cleanup and when not to use it', subtopic: 'Stage 2', howCovered: 'Remote teardown is explicit: unmount the root, remove listeners, revoke the URL, or the detached tree leaks', conceptIds: ['react-effects'] },
    { category: 'React Core', topic: 'useRef, useContext, useReducer and custom hooks', subtopic: 'Stage 3', howCovered: 'Context carries the action dispatcher to arbitrary depth, since the tree shape is not known at build time', conceptIds: ['react-hooks-rest'] },
    { category: 'React Core', topic: 'Immutability in React — mutating vs copying methods', subtopic: 'Stage 3', howCovered: 'Layout trees are replaced rather than patched, so a diff can be computed against the previous payload', conceptIds: ['react-immutability'] },
    { category: 'JavaScript', topic: 'Object references, shallow copies and deep cloning', subtopic: 'Stage 3', howCovered: 'Node objects crossing the boundary are cloned, so a remote cannot mutate the host layout description', conceptIds: ['react-references-copying'] },
    { category: 'React Advanced', topic: 'memo, useMemo, useCallback, virtualization, profiling', subtopic: 'Stage 4', howCovered: 'Impression tracking and remote hydration are measured, since SDUI trades bundle size for payload size', conceptIds: ['react-perf'] },
    { category: 'React Core', topic: 'Class components and the lifecycle vocabulary', subtopic: 'Stage 3', howCovered: 'The slot boundary is a class, and getDerivedStateFromError is what turns a remote crash into a fallback card', conceptIds: ['react-class-lifecycle'] },
    { category: 'React 19', topic: 'Actions, `useActionState`, `useFormStatus`, `useOptimistic`', subtopic: 'Stage 3', howCovered: 'Server-described forms map to Actions, so a server can ship a working form without shipping its handler', conceptIds: ['r19-actions'] },
    { category: 'State Management', topic: 'Redux core: store, actions, reducers, pure functions, data flow', subtopic: 'Stage 3', howCovered: 'The command bus is a dispatcher over pure handlers, which is what makes server-driven actions auditable', conceptIds: ['redux-core'] },
    { category: 'State Management', topic: 'react-redux, middleware, thunks and Redux Toolkit', subtopic: 'Stage 3', howCovered: 'Host state uses createSlice, and remotes receive a scoped view rather than the whole store', conceptIds: ['redux-react-toolkit'] },
    { category: 'Tooling', topic: 'Flux — and why Mettl still asks about it', subtopic: 'Stage 3', howCovered: 'One dispatcher, many isolated remotes — Flux is the only shape that survives untrusted subscribers', conceptIds: ['tooling-flux'] },
    { category: 'State Management', topic: 'Context, Zustand, TanStack Query — choosing the right tool', subtopic: 'Stage 3', howCovered: 'Server state, host state and remote-local state get three different mechanisms, and the split is documented', conceptIds: ['state-alternatives'] },
    { category: 'Routing', topic: 'Routes, params, nested layouts, navigation and guards', subtopic: 'Stage 3', howCovered: 'NAVIGATE actions must delegate to the host router, since a remote cannot own the URL', conceptIds: ['router-core'] },
    { category: 'Architecture', topic: 'Front-end system design: components, data, states, failure', subtopic: 'Stage 1', howCovered: 'The contract between server and client is the design: what a node is, what happens to an unknown one', conceptIds: ['frontend-system-design'] },
    { category: 'Testing', topic: 'Testing Library, what to test, mocking and end-to-end', subtopic: 'Stage 3', howCovered: 'Contract tests assert that an unknown node type renders a fallback rather than throwing', conceptIds: ['testing-react'] },
    { category: 'Web Platform', topic: 'HTTP, status codes, methods and idempotency', subtopic: 'Stage 4', howCovered: 'Cache-Control with stale-while-revalidate on the layout endpoint is what makes edge-cached SDUI viable', conceptIds: ['web-http'] },
    { category: 'Web Platform', topic: 'Cookies, localStorage, sessionStorage, IndexedDB', subtopic: 'Stage 4', howCovered: 'The last layout is cached so a returning user sees structure before the network answers', conceptIds: ['web-storage'] },
    { category: 'Web Platform', topic: 'URL to pixels — the critical rendering path', subtopic: 'Stage 2', howCovered: 'Streaming HTML plus deferred remotes is a critical-path design, measured as TTFB against LCP', conceptIds: ['web-how-page-loads'] },
    { category: 'JavaScript', topic: 'Promises, async/await and cancellation', subtopic: 'Stage 2', howCovered: 'Remote loading is a promise chain with timeout and fallback, since a hung remote must not hang the slot', conceptIds: ['js-promises'] },
    { category: 'JavaScript', topic: 'The event loop, microtasks and macrotasks', subtopic: 'Stage 2', howCovered: 'Streamed chunks arrive across many tasks, so the host must render progressively rather than await the whole tree', conceptIds: ['js-event-loop'] },
    { category: 'JavaScript', topic: 'DOM APIs, events, bubbling and delegation', subtopic: 'Stage 3', howCovered: 'The cross-remote event bus uses structured CustomEvents, with capture and composedPath across shadow boundaries', conceptIds: ['js-dom-events'] },
    { category: 'JavaScript', topic: 'Scope, hoisting, TDZ and closures', subtopic: 'Stage 3', howCovered: 'Each slot closes over its own registry and abort handle, which is what makes two remotes independent', conceptIds: ['js-scope-closures'] },
    { category: 'JavaScript', topic: '`this`, call/apply/bind and arrow functions', subtopic: 'Stage 3', howCovered: 'The action dispatcher is handed to remotes as a bound function, or its receiver is lost at the boundary', conceptIds: ['js-this'] },
    { category: 'JavaScript', topic: 'Prototypes, the prototype chain and classes', subtopic: 'Stage 3', howCovered: 'Structured clone drops prototypes, so a class instance crossing the boundary arrives as a plain object', conceptIds: ['js-prototypes'] },
    { category: 'JavaScript', topic: 'Array and object transformations, immutability', subtopic: 'Stage 3', howCovered: 'The layout AST is walked and transformed immutably, which is what makes the previous tree diffable', conceptIds: ['js-arrays-objects'] },
    { category: 'JavaScript', topic: 'Polyfills, debounce, throttle, curry, deep clone', subtopic: 'Stage 4', howCovered: 'The impression tracker is a hand-written IntersectionObserver batcher with a sendBeacon flush', conceptIds: ['js-polyfills'] },
    { category: 'JavaScript', topic: 'Types, coercion and equality', subtopic: 'Stage 3', howCovered: 'Every server value arrives as JSON, so numbers, dates and booleans are converted once at the parse boundary', conceptIds: ['js-types-coercion'] },
    { category: 'JavaScript', topic: 'Sameness: `==`, `===`, `Object.is`, `NaN`, `+0`/`-0`', subtopic: 'Stage 3', howCovered: 'Deciding whether a node changed between payloads requires a stated sameness rule, not reference equality', conceptIds: ['js-equality-matrix'] },
    { category: 'JavaScript', topic: 'Handling undefined: `??`, `||`, `?.`, `??=`, default parameters', subtopic: 'Stage 3', howCovered: 'Optional node fields default with ??, since a server-sent 0 or empty string is meaningful data', conceptIds: ['js-defaulting-operators'] },
    { category: 'HTML', topic: 'Semantic elements and document outline', subtopic: 'Stage 3', howCovered: 'A node type maps to a real element, so server-driven UI does not degrade into nested divs', conceptIds: ['html-semantics'] },
    { category: 'HTML', topic: 'Forms, labels, validation and submission', subtopic: 'Stage 3', howCovered: 'Server-described forms are real forms with native validation attributes carried in the payload', conceptIds: ['html-forms'] },
    { category: 'Accessibility', topic: 'ARIA, keyboard navigation and focus management', subtopic: 'Stage 3', howCovered: 'Heading levels and landmarks must be computed from the tree, since the server does not know the surrounding context', conceptIds: ['a11y-core'] },
    { category: 'CSS', topic: 'Flex axes, direction, reverse, wrap and `order`', subtopic: 'Stage 4', howCovered: 'The Carousel primitive is a flex row with scroll snapping, one of the four primitives the host must render', conceptIds: ['css-flex-axes'] },
    { category: 'CSS', topic: '`flex` shorthand, `flex-basis` vs `width`, grow and shrink', subtopic: 'Stage 4', howCovered: 'ActionCard bodies grow so CTAs align, for content lengths the client never sees in advance', conceptIds: ['css-flex-sizing'] },
    { category: 'CSS', topic: 'align-self, auto margins and the alignment family', subtopic: 'Stage 4', howCovered: 'Auto margins pin card actions without the server needing to describe a spacer node', conceptIds: ['css-flex-align'] },
    { category: 'CSS', topic: 'Box model, display types, formatting contexts and `flow-root`', subtopic: 'Stage 4', howCovered: 'Each slot establishes a containment context so a remote cannot escape its box', conceptIds: ['css-box-display'] },
    { category: 'CSS', topic: 'static, relative, absolute, fixed, sticky, containing block, z-index', subtopic: 'Stage 4', howCovered: 'Server-described overlays need a host-owned stacking policy, or one remote covers another', conceptIds: ['css-positioning'] },
    { category: 'CSS', topic: 'Cascade, specificity, inheritance and `!important`', subtopic: 'Stage 4', howCovered: 'Cascade layers keep remote styles from outranking host styles regardless of how specific the remote gets', conceptIds: ['css-cascade'] },
    { category: 'CSS', topic: 'Selectors, combinators, pseudo-classes, pseudo-elements, attributes', subtopic: 'Stage 4', howCovered: 'Styling hangs off data attributes derived from the node type, so unknown types still style predictably', conceptIds: ['css-selectors'] },
    { category: 'CSS', topic: 'Focus states, `:focus-visible`, and styling interaction accessibly', subtopic: 'Stage 4', howCovered: 'Loading, degraded and interactive states are host-owned, since a failed remote cannot style itself', conceptIds: ['css-states'] },
    { category: 'CSS', topic: 'Units: px, rem, em, ch, %, viewport units, clamp and calc', subtopic: 'Stage 4', howCovered: 'The spacing scale is in rem and the server sends scale steps rather than pixels', conceptIds: ['css-units'] },
    { category: 'CSS', topic: 'Custom properties, design tokens, `color-mix`, nesting, `:has` layouts', subtopic: 'Stage 4', howCovered: 'The server sends token names, not colours, which is what stops a remote from repainting the host brand', conceptIds: ['css-tokens-modern'] },
    { category: 'React 19', topic: 'React Server Components, Actions & React Compiler (React Forget)', subtopic: 'Stage 2', howCovered: 'Server components and the compiler are the substance of a server-driven UI orchestrator', conceptIds: ['rd-react-rsc-compiler'] },
    { category: 'State Management', topic: 'Modern State Management: Zustand, Jotai, Context API & Redux', subtopic: 'Stage 3', howCovered: 'Federated state across micro-frontends is the hardest form of the roadmap state topic', conceptIds: ['rd-react-state-mgmt'] },
    { category: 'React 19', topic: 'RSC Streaming', subtopic: 'Server-Driven Layouts', howCovered: 'Streams layout payloads from backend BFF directly into Suspense boundaries.' , conceptIds: ['r19-use-rsc', 'react-errors-portals'] },
    { category: 'Architecture', topic: 'Micro-Frontends', subtopic: 'Module Federation 2.0', howCovered: 'Dynamically resolves independent remote micro-apps at runtime with shared dependencies.' , conceptIds: ['tooling-bundlers', 'js-modules'] },
    { category: 'CSS', topic: 'Modern CSS', subtopic: 'Subgrid & Container Queries', howCovered: 'Subgrid aligns server-composed cards; container queries adapt components to arbitrary slot widths.' , conceptIds: ['css-grid-align', 'css-media-container'] },
    { category: 'Security & Invariants', topic: 'Zero-Trust AST Validation', subtopic: 'Zod Runtime Sanitization', howCovered: 'Validates server payloads to prevent injection of unregistered UI components.' , conceptIds: ['ts-essentials', 'web-security'] }
  ],
  implicitFoundations: [
    { domain: 'Security & Invariants', title: 'CORS & Federated Scripts', mechanism: 'Access-Control-Allow-Origin: * and crossorigin="anonymous" script tags.', realWorldImpact: 'Prevents security tainting while loading third-party remotes.' },
    { domain: 'Internet & Protocols', title: 'Edge CDN Caching', mechanism: 'Cache-Control: s-maxage=60, stale-while-revalidate=86400 on SDUI endpoints.', realWorldImpact: 'Delivers sub-50ms TTFB for dynamic layouts cached at the edge.' },
    { domain: 'DOM & Browser Pipeline', title: 'MutationObserver Auditing', mechanism: 'MutationObserver monitors DOM mutations injected by remote scripts.', realWorldImpact: 'Prevents rogue remote scripts from polluting global styles.' },
    { domain: 'V8 Engine & Memory', title: 'Detached DOM Leaks', mechanism: 'Explicitly unmounts remote React roots and tears down window event listeners on MFE switch.', realWorldImpact: 'Eliminates memory growth when switching between federated micro-apps.' }
  ],
  frameworkVsManual: {
    frameworkHandled: ['Module Federation plugin for dependency sharing.', 'React Suspense and ErrorBoundary layout isolation.'],
    manualEngineeringRequired: ['Zero-trust dynamic component registry with Zod AST sanitization.', 'Declarative JSON action dispatcher.', 'Cross-MFE custom event bus with structured schema enforcement.']
  }
};
