import type { LearnTopic } from './types';

/** Data handling, modules, the DOM, and the machine-coding set. */
export const jsDataTopics: LearnTopic[] = [
  {
    id: 'js-arrays-objects',
    area: 'JavaScript',
    group: 'Data',
    title: 'Array and object transformations, immutability',
    status: 'partial',
    minutes: 7,
    summary:
      'React re-renders on reference change, so the difference between a method that mutates and one that returns a copy is not a style question — it decides whether your UI updates.',
    body: [
      'Mutating array methods: `push`, `pop`, `shift`, `unshift`, `splice`, `sort`, `reverse`, `fill`, `copyWithin`. Non-mutating: `map`, `filter`, `slice`, `concat`, `flat`, `flatMap`, and the spread form. `sort` and `reverse` mutating in place is the trap — `items.sort()` reorders your state array directly, so React sees the same reference and skips the render.',
      'ES2023 added copying counterparts that solve exactly that: `toSorted`, `toReversed`, `toSpliced`, and `with(index, value)`. `[...items].sort()` remains the widely-supported idiom.',
      'Spread is a **shallow** copy: `{...obj}` copies top-level keys, but nested objects are still shared references. Mutating `copy.nested.x` mutates the original. `structuredClone(obj)` is the modern deep copy — it handles `Date`, `Map`, `Set`, `ArrayBuffer` and cycles, all of which `JSON.parse(JSON.stringify(obj))` destroys or throws on.',
      'Know the reducers and searchers by behaviour: `reduce` folds to any shape, `find`/`findIndex` return the first match, `some`/`every` short-circuit, `includes` finds `NaN` where `indexOf` cannot (because it uses SameValueZero).',
      '`Map` versus object: `Map` keeps insertion order, allows any key type including objects, has a real `size`, and is faster for frequent additions and deletions. Objects are better for fixed-shape records and JSON. `Set` gives uniqueness by SameValueZero, which is why `[...new Set(arr)]` is the idiomatic dedupe.',
    ],
    keyPoints: [
      '`sort` and `reverse` mutate. `toSorted` and `toReversed` do not.',
      'Spread is shallow; `structuredClone` is deep and preserves Dates, Maps and cycles.',
      '`includes` finds `NaN`; `indexOf` does not.',
      'React compares references — mutating state in place produces no re-render.',
    ],
    interview:
      'The shallow-copy question is near-universal: spread an object with a nested object, mutate the nested value, ask what the original shows. Answer 99, then name shallow copy and offer `structuredClone` as the fix.',
    code: `const a = { x: 1, nested: { y: 2 } };
const b = { ...a };
b.nested.y = 99;
a.nested.y;                 // 99 — shared reference

const c = structuredClone(a);
c.nested.y = 7;
a.nested.y;                 // 99 — genuinely independent`,
    resources: [
      { label: 'MDN — Array', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array', kind: 'docs', note: 'Each method page states whether it mutates. Worth checking rather than guessing.' },
      { label: 'MDN — structuredClone', url: 'https://developer.mozilla.org/en-US/docs/Web/API/structuredClone', kind: 'docs' },
      { label: 'MDN — Map vs Object', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#objects_vs._maps', kind: 'docs' },
    ],
  },
  {
    id: 'js-modules',
    area: 'JavaScript',
    group: 'Modules',
    title: 'ES modules, CommonJS and dynamic import',
    status: 'partial',
    minutes: 5,
    summary:
      'Named on the Mettl competency list under ECMAScript, and the foundation of every bundler question about code splitting and tree shaking.',
    body: [
      'ES module `import`/`export` is **static**: the dependency graph is known before execution, which is what makes tree shaking and hoisting possible. Bindings are **live views**, not copies — if the exporting module reassigns, importers see the new value. Modules are always strict mode, execute once and are cached, and their top-level `this` is `undefined`.',
      'CommonJS (`require`/`module.exports`) is dynamic: `require` runs at call time, can be conditional, and returns a copy of the exports object at that moment. This dynamism is precisely why CommonJS resists tree shaking.',
      '`import()` is the dynamic form: it returns a promise, may appear anywhere including inside a condition, and is the mechanism behind `React.lazy` and route-level code splitting. Every "how do you reduce bundle size" answer starts here.',
      'Default versus named exports: named exports are better for tree shaking and refactoring tools; a default export is a single anonymous value the importer may rename freely, which is convenient and slightly worse for consistency. Circular imports resolve to partially-initialised modules rather than errors, which produces confusing `undefined` values at import time.',
    ],
    keyPoints: [
      'ESM is static and hoisted; CommonJS is dynamic and runs at call time.',
      'ESM bindings are live; CommonJS exports are a snapshot copy.',
      '`import()` is the async form and the basis of code splitting.',
      'Tree shaking requires static analysis, which is why ESM enables it and CJS mostly does not.',
    ],
    interview:
      'Asked as "how does tree shaking work" or "how would you reduce this bundle". Connect static ESM analysis → dead-code elimination → `import()` for route splitting → measurable chunk sizes. That chain is the complete answer.',
    resources: [
      { label: 'MDN — JavaScript modules', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules', kind: 'docs' },
      { label: 'MDN — Dynamic import()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import', kind: 'docs' },
    ],
  },
  {
    id: 'js-dom-events',
    area: 'JavaScript',
    group: 'DOM',
    title: 'DOM APIs, events, bubbling and delegation',
    status: 'partial',
    minutes: 7,
    summary:
      'React abstracts the DOM but interviews still test it — and vanilla machine-coding rounds test it directly.',
    body: [
      'An event travels in three phases: **capture** from the window down to the target, **target**, then **bubble** back up. `addEventListener(type, fn)` listens on the bubble phase by default; passing `{capture: true}` moves it to the way down. Not everything bubbles — `focus`, `blur`, `load` and `scroll` (on elements) do not, which is why `focusin`/`focusout` exist as bubbling alternatives.',
      '**Delegation** exploits bubbling: attach one listener to a container and read `event.target` to find what was actually clicked. It is how you handle a list of a thousand rows with one listener instead of a thousand, and how you handle elements that do not exist yet. `event.target` is what was clicked; `event.currentTarget` is what the handler is attached to — a distinction interviewers like.',
      '`preventDefault()` cancels the browser\'s default action (following a link, submitting a form). `stopPropagation()` halts further travel through the tree. They are independent, and using the second where you meant the first is a frequent bug that breaks other listeners.',
      'Useful listener options: `{once: true}` auto-removes after the first call, `{passive: true}` promises not to call `preventDefault` so the browser need not block scrolling, and `{signal}` accepts an `AbortController` signal so a group of listeners can be removed in one call.',
      'The observers replace polling and are worth naming: `IntersectionObserver` (visibility — lazy loading, infinite scroll), `ResizeObserver` (element size — container-driven layout), `MutationObserver` (DOM changes). Each is asynchronous and far cheaper than a scroll handler measuring positions.',
    ],
    keyPoints: [
      'Capture goes down, bubble comes up; listeners default to bubble.',
      '`event.target` is what was hit; `currentTarget` is what is listening.',
      '`preventDefault` ≠ `stopPropagation`.',
      'Delegation: one listener on a parent handles unlimited and future children.',
    ],
    interview:
      '"Implement event delegation" is a standard vanilla task, as is "make an infinite-scroll list" — where the expected answer is `IntersectionObserver`, not a scroll handler doing arithmetic.',
    code: `list.addEventListener('click', (e) => {
  const row = e.target.closest('[data-id]');   // handles clicks on nested spans too
  if (!row || !list.contains(row)) return;
  select(row.dataset.id);
});`,
    resources: [
      { label: 'MDN — Event bubbling and capture', url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Event_bubbling', kind: 'docs' },
      { label: 'MDN — IntersectionObserver', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API', kind: 'docs' },
      { label: 'MDN — EventTarget.addEventListener options', url: 'https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#options', kind: 'docs' },
    ],
  },
  {
    id: 'js-polyfills',
    area: 'JavaScript',
    group: 'Machine coding',
    title: 'Polyfills, debounce, throttle, curry, deep clone',
    status: 'covered',
    minutes: 7,
    summary:
      'The standard vanilla machine-coding set. Each is small, each has a trap, and being able to write them from blank is the point.',
    body: [
      '**debounce** delays invocation until the input has been quiet for a delay — right for search-as-you-type and resize handling. **throttle** guarantees at most one call per interval — right for scroll and mousemove. Confusing the two is the classic error: debounce may never fire during continuous activity, throttle always fires at a steady rate.',
      'Writing `Array.prototype.map` by hand tests whether you remember the callback receives `(value, index, array)`, that the callback\'s `this` can be set by a second argument, and that holes in sparse arrays are skipped.',
      '`call`, `apply` and `bind` polyfills test whether you understand implicit binding: attach the function as a temporary property of the context object, invoke it, delete it. `bind` additionally must support partial application and behave correctly when the bound function is used with `new`.',
      'Deep clone by hand must handle nested objects and arrays, cycles (keep a `WeakMap` of seen objects), and special types — and the honest interview answer is to write it, then say `structuredClone` does this natively now.',
      '`Promise.all` by hand is a favourite: resolve with results **in input order** (not completion order), reject immediately on the first rejection, and handle the empty-array case by resolving immediately.',
    ],
    keyPoints: [
      'Debounce waits for quiet; throttle enforces a rate.',
      'A hand-written `Promise.all` must preserve input order and handle `[]`.',
      'Deep clone needs a `WeakMap` to survive cycles.',
      '`bind` must still work when the result is called with `new`.',
    ],
    interview:
      'Very common as the 20-minute coding portion. Narrate the trap as you write — "results must be in input order, so I index into a pre-sized array rather than pushing" — because that sentence is what is being assessed.',
    code: `function debounce(fn, delay) {
  let t;
  return function (...args) {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), delay);
  };
}

function throttle(fn, interval) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last >= interval) { last = now; fn.apply(this, args); }
  };
}`,
    resources: [
      { label: 'GreatFrontEnd — JavaScript coding questions', url: 'https://www.greatfrontend.com/questions/js', kind: 'practice', note: 'The polyfill set with test cases, which is how you should practise them.' },
      { label: 'MDN — Function.prototype.apply', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply', kind: 'docs' },
    ],
  },
];
