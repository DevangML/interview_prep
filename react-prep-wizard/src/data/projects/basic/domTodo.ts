import type { ProjectBlueprint } from '../types';

/** Foundations — the DOM, events, closures and `this`, with no framework to hide behind. */
export const domTodoProject: ProjectBlueprint = {
  id: 'basic-dom-todo',
  title: 'Todo List Without React: Events, Closures and `this`',
  tagline: 'A hundred rows, one listener — and every classic loop-variable bug, met deliberately.',
  realWorldAnalog: 'Any admin table with row actions',
  tier: 'basic',
  difficulty: 'Beginner',
  estimatedBuildTimeHours: 4,
  architecturePattern: 'Plain DOM with a single delegated listener',
  summary:
    'Build a todo list in plain JavaScript with no framework. React hides the DOM well enough that most candidates cannot explain what it is hiding. Here you attach one listener for a hundred rows, watch `this` change meaning between a method and a callback, and hit the `var`-in-a-loop bug on purpose so it is never a surprise.',
  tags: ['JavaScript', 'DOM', 'Events', 'Closures', 'Beginner'],
  xpBounty: 140,
  coreScopeBoundaries: {
    inScopeMinimal: [
      'Add, toggle and delete items with one delegated click listener on the list.',
      'A counter built from a closure rather than a global.',
      'The same handler written as a method, an arrow, and a bound function.',
      'Explicit capture-vs-bubble demonstration with stopPropagation.',
    ],
    outOfScopeBloat: [
      'Any framework, including a virtual DOM toy.',
      'Persistence, drag reordering, or filters.',
      'A build step — this runs from a single HTML file.',
    ],
  },
  stages: [
    {
      stageNumber: 1,
      stageName: 'One listener per row',
      focus: 'var in a loop, a listener per element, and a lost `this`',
      codeSnippet: `for (var i = 0; i < todos.length; i++) {\n  var row = makeRow(todos[i]);\n  row.addEventListener('click', function () {\n    console.log('clicked', i);   // always todos.length\n    this.store.remove(i);        // 'this' is the element, not the store\n  });\n  list.appendChild(row);\n}`,
      failureModeOrInvariant:
        'Every row logs the same index, because `var` has one binding for the whole loop and the callbacks close over that one binding. `this` inside the listener is the DOM element. Adding a row after render attaches no listener at all.',
      architecturalLesson:
        'A closure captures a variable, not a value. `this` is decided by how a function is called, not where it is written.',
    },
    {
      stageNumber: 2,
      stageName: 'One listener, total',
      focus: 'Event delegation, block scope, explicit binding',
      codeSnippet: `list.addEventListener('click', (event) => {\n  const row = event.target.closest('[data-id]');\n  if (!row) return;\n  const { id } = row.dataset;\n  if (event.target.matches('.delete')) store.remove(id);\n});\n\n// A counter that owns its state without a global\nconst makeCounter = () => { let n = 0; return () => ++n; };`,
      failureModeOrInvariant:
        'One listener handles rows that do not exist yet, because the event bubbles up to a parent that is always present. Memory does not grow with row count. The arrow function has no own `this`, so it keeps the enclosing one.',
      architecturalLesson:
        'Delegation works because events bubble. Understanding the capture/target/bubble phases is what lets you place a listener once instead of N times.',
    },
  ],
  layers: [
    {
      layer: 'View',
      components: ['list container', 'row template', 'delegated listener'],
      invariants: ['Listener count stays at 1 regardless of item count.'],
    },
    {
      layer: 'State',
      components: ['closure-backed store', 'subscriber callback'],
      invariants: ['No state lives on window.'],
    },
  ],
  explicitTopics: [
    {
      category: 'JavaScript',
      topic: 'DOM',
      subtopic: 'DOM APIs, events, bubbling and delegation',
      howCovered: 'Rebuilds N listeners as one delegated listener and walks the capture/bubble phases in devtools.',
      conceptIds: ['js-dom-events'],
    },
    {
      category: 'JavaScript',
      topic: 'Execution',
      subtopic: 'Scope, hoisting, TDZ and closures',
      howCovered: 'The var-in-a-loop bug is reproduced, then fixed with let, then explained in terms of bindings.',
      conceptIds: ['js-scope-closures'],
    },
    {
      category: 'JavaScript',
      topic: 'Execution',
      subtopic: '`this`, call/apply/bind and arrow functions',
      howCovered: 'The same handler is written four ways and each call site is traced to the resulting `this`.',
      conceptIds: ['js-this'],
    },
  ],
  implicitFoundations: [
    {
      domain: 'V8 Engine & Memory',
      title: 'Closure retention',
      mechanism: 'A closure keeps its enclosing scope alive as long as the function is reachable.',
      realWorldImpact: 'A listener per row retains every row object; delegation is a memory decision as well as a code-size one.',
      conceptIds: ['js-scope-closures'],
    },
    {
      domain: 'Language Semantics',
      title: 'Execution contexts',
      mechanism: 'Each call creates a context with its own `this` binding resolved from the call form.',
      realWorldImpact: 'Explains why passing a method as a callback loses its receiver.',
      conceptIds: ['js-this'],
    },
  ],
  frameworkVsManual: {
    frameworkHandled: [],
    manualEngineeringRequired: [
      'Rendering, diffing and event wiring — all of it, by hand.',
      'Deciding where a listener belongs rather than attaching one per node.',
    ],
  },
};
