import type { ProjectBlueprint } from '../types';

/** Working engineer — the machine-coding round: implement the library, don't import it. */
export const utilityBeltProject: ProjectBlueprint = {
  id: 'inter-utility-belt',
  title: 'The Utility Belt: Implement Lodash, Badly, Then Correctly',
  tagline: 'debounce, throttle, curry, deepClone, Promise.all, and a bind that handles `new`.',
  realWorldAnalog: 'The 45-minute machine-coding round',
  track: 'service',
  tier: 'flagship',
  difficulty: 'Intermediate',
  estimatedBuildTimeHours: 7,
  architecturePattern: 'A published-shaped module with tests for the edge cases',
  prerequisites: ['basic-dom-todo', 'basic-equality-lab'],
  summary:
    'Implement the functions interviewers ask you to implement live: debounce with leading and trailing options, throttle, curry, deep clone with cycles, a bind that survives `new`, and Promise.all/allSettled/race from scratch. Each one is a closure, a `this` rule or a microtask rule that you can then explain rather than recall.',
  tags: ['JavaScript', 'Machine coding', 'Closures', 'Promises', 'Intermediate'],
  xpBounty: 300,
  coreScopeBoundaries: {
    inScopeMinimal: [
      'debounce (leading/trailing/maxWait) and throttle, with cancel and flush.',
      'curry supporting placeholders and variadic arity.',
      'deepClone handling cycles, Map, Set, Date and RegExp.',
      'myBind, myCall, myApply — including the `new` case — and Promise combinators.',
    ],
    outOfScopeBloat: [
      'A full lodash surface.',
      'Publishing to npm.',
      'A build pipeline; one ESM module with tests is the deliverable.',
    ],
  },
  stages: [
    {
      stageNumber: 1,
      stageName: 'The version that passes the demo',
      focus: 'Naive implementations that break on the second question',
      codeSnippet: `function debounce(fn, ms) {\n  let t;\n  return function () {\n    clearTimeout(t);\n    t = setTimeout(fn, ms);      // loses 'this' and the arguments\n  };\n}\n\nfunction deepClone(o) {\n  return JSON.parse(JSON.stringify(o)); // drops undefined, Dates become strings,\n}                                       // functions vanish, cycles throw`,
      failureModeOrInvariant:
        'debounce drops the receiver and every argument, so a debounced method call fails. The JSON clone silently corrupts Dates, undefined, Map, Set and NaN, and throws outright on a cycle.',
      architecturalLesson:
        'These are the follow-up questions, not gotchas. The interviewer asks "what about `this`?" because that is where the understanding is.',
    },
    {
      stageNumber: 2,
      stageName: 'Correct under the follow-ups',
      focus: 'Preserved receiver and arguments, cycle-safe cloning, spec-shaped combinators',
      codeSnippet: `function debounce(fn, ms, { leading = false, trailing = true } = {}) {\n  let t, lastArgs, lastThis;\n  const invoke = () => { fn.apply(lastThis, lastArgs); };\n  const debounced = function (...args) {\n    lastArgs = args; lastThis = this;          // receiver preserved\n    if (leading && !t) invoke();\n    clearTimeout(t);\n    t = setTimeout(() => { t = null; if (trailing) invoke(); }, ms);\n  };\n  debounced.cancel = () => { clearTimeout(t); t = null; };\n  return debounced;\n}\n\nconst deepClone = (v, seen = new WeakMap()) => { /* cycles via seen */ };`,
      failureModeOrInvariant:
        'The debounced function forwards `this` and every argument, supports cancel, and does not fire a trailing call after cancel. deepClone terminates on a self-referencing object because a WeakMap remembers what it has already copied.',
      architecturalLesson:
        'A WeakMap is the right cycle registry precisely because it does not retain its keys — the clone does not leak the source graph.',
    },
    {
      stageNumber: 3,
      stageName: 'Promise combinators from the algorithm',
      focus: 'all, allSettled, race, any — and why ordering is preserved',
      codeSnippet: `function all(iterable) {\n  return new Promise((resolve, reject) => {\n    const out = []; let pending = 0, i = 0;\n    for (const p of iterable) {\n      const idx = i++; pending++;\n      Promise.resolve(p).then(v => {\n        out[idx] = v;                 // index, not push — order preserved\n        if (--pending === 0) resolve(out);\n      }, reject);                     // first rejection wins\n    }\n    if (i === 0) resolve([]);         // empty iterable resolves immediately\n  });\n}`,
      failureModeOrInvariant:
        'Using push instead of an index returns results in completion order, which is the single most common bug in this exercise. Forgetting the empty-iterable case leaves the promise pending forever.',
      architecturalLesson:
        'Writing the combinator makes the microtask queue concrete: every .then callback is a microtask, and they drain before the next timer fires.',
    },
  ],
  deliverables: [
    { id: 'Options', title: 'Options', spec: 'Every utility takes an options object defaulted with ??, so a deliberate 0 wait or false flag survives.' },
    { id: 'Package', title: 'Package', spec: 'Named ESM exports with sideEffects: false, built for ESM and CJS, with an analyser report proving unused exports are shaken out.' },
    { id: 'Playground', title: 'Playground', spec: 'A routed REPL app where each utility has its own URL, the input is a search param, and a timing timeline renders as absolutely positioned markers on a relative track.' },
    { id: 'Suite', title: 'Suite', spec: 'One test per interviewer follow-up question, using fake timers for every timing utility.' },
    { id: 'Docs', title: 'Docs', spec: 'A documentation page per utility as a server component, laid out on a grid, shipping no JavaScript of its own.' },
  ],
  layers: [
    {
      layer: 'Timing',
      components: ['debounce', 'throttle', 'rate limiter'],
      invariants: ['Every timing utility exposes cancel; none leaks a pending timer.'],
    },
    {
      layer: 'Functional',
      components: ['curry', 'compose', 'myBind/myCall/myApply'],
      invariants: ['Receiver and arity are preserved through every wrapper.'],
    },
    {
      layer: 'Async',
      components: ['all', 'allSettled', 'race', 'any', 'promisify'],
      invariants: ['Result order matches input order regardless of settle order.'],
    },
  ],
  explicitTopics: [
    {
      category: 'JavaScript',
      topic: 'Machine coding',
      subtopic: 'Polyfills, debounce, throttle, curry, deep clone',
      howCovered: 'Each utility is written naively, broken by a follow-up question, then rewritten correctly.',
      conceptIds: ['js-polyfills'],
    },
    {
      category: 'JavaScript',
      topic: 'Execution',
      subtopic: '`this`, call/apply/bind and arrow functions',
      howCovered: 'myBind is implemented including the `new` case, which forces the receiver rules into the open.',
      conceptIds: ['js-this'],
    },
    {
      category: 'JavaScript',
      topic: 'Async',
      subtopic: 'Promises, combinators and the microtask queue',
      howCovered: 'All four combinators are implemented from the specification algorithm rather than recalled.',
      conceptIds: ['js-promises', 'js-event-loop'],
    },
    {
      category: 'JavaScript',
      topic: 'Data',
      subtopic: 'References, shallow copies and deep cloning',
      howCovered: 'deepClone is built to survive cycles, Maps, Sets and Dates, then compared against structuredClone.',
      conceptIds: ['react-references-copying', 'js-arrays-objects'],
    },
  ],
  implicitFoundations: [
    {
      domain: 'V8 Engine & Memory',
      title: 'Weak references',
      mechanism: 'WeakMap keys do not prevent collection, unlike Map keys.',
      realWorldImpact: 'A Map-based clone registry keeps the entire source graph alive for the process lifetime.',
      conceptIds: ['js-arrays-objects'],
    },
    {
      domain: 'Tooling & Build',
      title: 'Module boundaries',
      mechanism: 'Named ESM exports are statically analysable and therefore tree-shakeable.',
      realWorldImpact: 'Explains why lodash-es shrinks a bundle where lodash does not.',
      conceptIds: ['js-modules', 'tooling-bundlers'],
    },
  ],
  frameworkVsManual: {
    frameworkHandled: [],
    manualEngineeringRequired: [
      'Every utility, plus a test for each edge case the follow-up question would raise.',
    ],
  },
};
