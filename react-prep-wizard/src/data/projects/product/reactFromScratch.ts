import type { ProjectBlueprint } from '../types';

/** The dare — build the framework, so nothing about it is magic afterwards. */
export const reactFromScratchProject: ProjectBlueprint = {
  id: 'adv-react-from-scratch',
  title: 'Apex Core — Fiber Reconciler & Hook Dispatcher Engine',
  tagline: 'A working renderer with interruptible rendering and a real hook dispatcher, in one repo.',
  realWorldAnalog: 'React’s own reconciler package',
  track: 'product',
  tier: 'flagship',
  difficulty: 'Principal',
  estimatedBuildTimeHours: 24,
  architecturePattern: 'Fiber linked list + work loop + double buffering + hook slot array',
  prerequisites: ['inter-perf-audit', 'inter-utility-belt'],
  summary:
    'Implement a renderer: JSX to elements, elements to a fiber tree, a work loop that yields to the browser, a commit phase, and hooks backed by a per-fiber slot array. Once you have written the dispatcher, every hook rule stops being a rule you memorised and becomes an obvious consequence of an array and an index.',
  tags: ['React internals', 'Fiber', 'Reconciliation', 'Scheduling', 'Principal'],
  xpBounty: 560,
  coreScopeBoundaries: {
    inScopeMinimal: [
      'createElement, a fiber tree, and a work loop driven by a deadline.',
      'Reconciliation by type and key, with placement, update and deletion effects.',
      'useState and useEffect backed by a hook slot array on the fiber.',
      'A commit phase separated from render, with double buffering.',
    ],
    outOfScopeBloat: [
      'Concurrent lanes, transitions and Suspense — name them, do not build them.',
      'Server rendering or hydration.',
      'Matching React’s API surface beyond the four exports above.',
    ],
  },
  stages: [
    {
      stageNumber: 1,
      stageName: 'Recursive render',
      focus: 'Straight recursion into the DOM',
      codeSnippet: `function render(element, container) {\n  const dom = document.createElement(element.type);\n  element.props.children.forEach(c => render(c, dom));  // cannot be paused\n  container.appendChild(dom);                            // mutates as it goes\n}`,
      failureModeOrInvariant:
        'A 10,000-node tree blocks the main thread for the entire traversal, so no input is handled until it finishes. Because the DOM is mutated during traversal, an error halfway leaves a half-built UI on screen.',
      architecturalLesson:
        'Recursion cannot be interrupted — the call stack is the traversal state. Making rendering pausable requires the traversal state to live in a data structure you control.',
    },
    {
      stageNumber: 2,
      stageName: 'The fiber loop',
      focus: 'A linked list, a unit of work, and yielding to the browser',
      codeSnippet: `function workLoop(deadline) {\n  while (nextUnitOfWork && deadline.timeRemaining() > 1) {\n    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);  // one fiber at a time\n  }\n  if (!nextUnitOfWork && wipRoot) commitRoot();          // commit is atomic\n  requestIdleCallback(workLoop);\n}\n\n// child -> sibling -> return: the traversal is data, so it can be resumed\nfiber.child; fiber.sibling; fiber.return;`,
      failureModeOrInvariant:
        'Rendering yields between fibers, so typing stays responsive during a large update. Nothing reaches the DOM until the whole tree is ready, so a partial tree is never visible.',
      architecturalLesson:
        'The render phase is pure and interruptible; the commit phase is synchronous and cannot be. That split is the reason effects run when they do.',
    },
    {
      stageNumber: 3,
      stageName: 'Reconciliation and keys',
      focus: 'Diffing by type and key, alternate fibers, double buffering',
      codeSnippet: `if (sameType) {\n  newFiber = { ...element, dom: oldFiber.dom, alternate: oldFiber, effectTag: 'UPDATE' };\n} else if (element) {\n  newFiber = { ...element, dom: null, effectTag: 'PLACEMENT' };\n} else {\n  oldFiber.effectTag = 'DELETION';\n}\n// Index keys: reorder the list and state follows position, not identity.`,
      failureModeOrInvariant:
        'With index keys, reordering a list of inputs leaves the typed values attached to the wrong rows — the fiber matched by position, so state stayed with position. With stable keys the state follows the item.',
      architecturalLesson:
        'The key is what tells the reconciler that two fibers across renders are the same thing. Every "why is my list state wrong" bug is this one sentence.',
    },
    {
      stageNumber: 4,
      stageName: 'The hook dispatcher',
      focus: 'A slot array indexed by call order',
      codeSnippet: `let wipFiber = null, hookIndex = 0;\n\nfunction useState(initial) {\n  const old = wipFiber.alternate?.hooks?.[hookIndex];\n  const hook = { state: old ? old.state : initial, queue: [] };\n  (old?.queue ?? []).forEach(a => { hook.state = a(hook.state); });  // updaters replay\n  wipFiber.hooks[hookIndex++] = hook;                                // ORDER is the identity\n  return [hook.state, action => { hook.queue.push(action); scheduleRoot(); }];\n}`,
      failureModeOrInvariant:
        'A hook inside an `if` shifts every subsequent index, so useState(2) reads the slot belonging to useEffect. The state does not just go wrong — it becomes a different hook’s state.',
      architecturalLesson:
        'The rules of hooks are not a style guide. Call order is the only identity a hook has, and this is why `use()` — which is not slot-backed — is the one hook allowed to be conditional.',
    },
  ],
  deliverables: [
    { id: 'Class support', title: 'Class support', spec: 'Class components detected via prototype.isReactComponent, invoked with new, with didMount, didUpdate and willUnmount implemented as commit-phase effects.' },
    { id: 'Commit phase', title: 'Commit phase', spec: 'A synchronous commit walking the effect list, with synthetic events delegated at the root.' },
    { id: 'Package', title: 'Package', spec: 'Renderer, reconciler and DOM host config as separate modules, with fiber and element types as exhaustive unions.' },
    { id: 'Suspense', title: 'Suspense', spec: 'A thrown promise caught by the nearest boundary and retried on resolve.' },
    { id: 'Scheduler', title: 'Scheduler', spec: 'A priority queue yielding via MessageChannel rather than relying on requestIdleCallback.' },
    { id: 'Suite', title: 'Suite', spec: 'A test proving state follows keys and not positions when a keyed list is reordered.' },
    { id: 'JSX', title: 'JSX', spec: 'The JSX transform configured to your own pragma, so JSX is visibly a function call.' },
    { id: 'Demo app', title: 'Demo app', spec: 'A routed demo application with a store, a grid layout and data fetching, running entirely on the custom renderer.' },
    { id: 'Boundaries', title: 'Boundaries', spec: 'Error boundaries and portals implemented, with the portal container proving stacking follows DOM position.' },
    { id: 'Host config', title: 'Host config', spec: 'Attribute-versus-property handling, boolean attributes, controlled inputs preserving cursor position, camelCase style conversion, the unitless-property list, custom properties bypassing the transform, and dangerouslySetInnerHTML.' },
    { id: 'Portals', title: 'Portals', spec: 'A portal rendering into a different container, with its stacking context demonstrated.' },
  ],
  layers: [
    {
      layer: 'Elements',
      components: ['createElement', 'JSX pragma', 'TEXT_ELEMENT'],
      invariants: ['An element is an immutable description; it holds no DOM node.'],
    },
    {
      layer: 'Render phase',
      components: ['fiber node', 'work loop', 'reconcileChildren', 'effect tags'],
      invariants: ['The render phase performs no DOM mutation and may be abandoned at any point.'],
    },
    {
      layer: 'Commit phase',
      components: ['commitRoot', 'effect list walk', 'alternate pointer swap'],
      invariants: ['Commit is synchronous and applies the whole tree or none of it.'],
    },
    {
      layer: 'Hooks',
      components: ['dispatcher', 'per-fiber hook array', 'update queue'],
      invariants: ['Hook order is identical on every render of a given fiber.'],
    },
  ],
  explicitTopics: [
    // Declared because the manifest claims them against a stage rather than a
    // deliverable — a stage anchor evidences nothing on its own.
    { category: 'React Core', topic: 'Immutability in React — mutating vs copying methods', subtopic: 'Stage 3', howCovered: 'Elements are immutable descriptions and fibers are mutable instances, and conflating them breaks reconciliation', conceptIds: ['react-immutability'] },
    { category: 'JavaScript', topic: 'Object references, shallow copies and deep cloning', subtopic: 'Stage 3', howCovered: 'Double buffering reuses the previous tree, so identity across renders is the mechanism, not an optimisation', conceptIds: ['react-references-copying'] },
    { category: 'JavaScript', topic: 'Scope, hoisting, TDZ and closures', subtopic: 'Stage 4', howCovered: 'The dispatcher closes over the work-in-progress fiber, which is exactly why hooks cannot be called outside a render', conceptIds: ['js-scope-closures'] },
    { category: 'JavaScript', topic: 'Array and object transformations, immutability', subtopic: 'Stage 3', howCovered: 'Children are normalised, flattened and keyed, which is where most hand-written renderers quietly get it wrong', conceptIds: ['js-arrays-objects'] },
    { category: 'JavaScript', topic: 'Sameness: `==`, `===`, `Object.is`, `NaN`, `+0`/`-0`', subtopic: 'Stage 3', howCovered: 'The bailout compares with Object.is, so implementing it settles NaN and -0 permanently', conceptIds: ['js-equality-matrix'] },
    { category: 'JavaScript', topic: 'Types, coercion and equality', subtopic: 'Stage 1', howCovered: 'Deciding what renders — 0, false, null, undefined, an array — is a coercion policy you have to write down', conceptIds: ['js-types-coercion'] },
    { category: 'JavaScript', topic: 'Handling undefined: `??`, `||`, `?.`, `??=`, default parameters', subtopic: 'Stage 1', howCovered: 'defaultProps semantics differ from ?? in exactly the null-versus-undefined case, and both are implemented', conceptIds: ['js-defaulting-operators'] },
    { category: 'React Core', topic: 'JSX Compilation, Props vs State & Component Lifecycle', subtopic: 'Stage 1', howCovered: 'Writing the renderer is the only way to learn what a component actually is', conceptIds: ['rd-react-components'] },
    { category: 'React Core', topic: 'Complete Hooks Hierarchy: State, Effects, Context & Custom Hooks', subtopic: 'Stage 3', howCovered: 'Hooks are re-implemented as a linked list on the fiber, which is what the rules of hooks protect', conceptIds: ['rd-react-hooks'] },
    { category: 'React 19', topic: 'React Server Components, Actions & React Compiler (React Forget)', subtopic: 'Stage 4', howCovered: 'The compiler and server components are rebuilt in miniature to show what they buy', conceptIds: ['rd-react-rsc-compiler'] },
    {
      category: 'React Core',
      topic: 'Mental model',
      subtopic: 'Fiber, the work loop, double buffering and reconciliation',
      howCovered: 'The fiber tree, the yielding work loop and the alternate-pointer swap are all implemented by hand.',
      conceptIds: ['react-rendering-model'],
    },
    {
      category: 'React Core',
      topic: 'State',
      subtopic: 'Batching, updaters and closure capture',
      howCovered: 'The update queue is built, showing directly why an updater sees the pending value and a variable does not.',
      conceptIds: ['react-state'],
    },
    {
      category: 'React Core',
      topic: 'Hooks',
      subtopic: 'The dispatcher, slot arrays and the rules of hooks',
      howCovered: 'useState and useEffect are implemented on an index-addressed array, deriving the rules rather than citing them.',
      conceptIds: ['react-effects', 'react-hooks-rest'],
    },
    {
      category: 'React 19',
      topic: 'Server & rendering',
      subtopic: 'Why use() may be called conditionally',
      howCovered: 'With the slot array built, the exception for use() follows from it not being slot-backed.',
      conceptIds: ['r19-use-rsc'],
    },
    {
      category: 'React Advanced',
      topic: 'Performance',
      subtopic: 'Why memo works and what it compares',
      howCovered: 'A bailout is added to the reconciler, making the shallow prop comparison something you wrote.',
      conceptIds: ['react-perf'],
    },
  ],
  implicitFoundations: [
    {
      domain: 'DOM & Browser Pipeline',
      title: 'Cooperative scheduling',
      mechanism: 'requestIdleCallback and the 5ms frame budget let long work yield between units.',
      realWorldImpact: 'This is the mechanism concurrent React generalises into lanes and priorities.',
      conceptIds: ['js-event-loop', 'web-how-page-loads'],
    },
    {
      domain: 'V8 Engine & Memory',
      title: 'Double buffering',
      mechanism: 'Two fiber trees alternate; the previous tree is reused rather than reallocated.',
      realWorldImpact: 'Keeps allocation flat across renders, which is why React does not thrash the young generation.',
      conceptIds: ['react-rendering-model'],
    },
    {
      domain: 'Tooling & Build',
      title: 'The JSX transform',
      mechanism: 'Babel or the automatic runtime rewrites JSX into createElement or jsx() calls.',
      realWorldImpact: 'Makes clear that JSX is syntax over a function call, not a template language.',
      conceptIds: ['tooling-bundlers', 'js-modules'],
    },
  ],
  frameworkVsManual: {
    frameworkHandled: ['The JSX transform, configured to your own pragma'],
    manualEngineeringRequired: [
      'The reconciler, the scheduler, the commit phase and the hook dispatcher.',
      'A test proving state follows keys and not positions.',
    ],
  },
};
