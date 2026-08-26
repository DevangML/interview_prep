import type { ProjectBlueprint } from '../types';

/** Foundations — the render model, state batching, and effects you can justify. */
export const reactCounterProject: ProjectBlueprint = {
  id: 'basic-react-first',
  title: 'First React App: What Actually Re-renders, and When',
  tagline: 'A counter, a clock and a list — and a render log that explains all three.',
  realWorldAnalog: 'The warm-up question in a React screen',
  tier: 'basic',
  difficulty: 'Junior',
  estimatedBuildTimeHours: 4,
  architecturePattern: 'Component tree with state lifted to its lowest common ancestor',
  prerequisites: ['basic-dom-todo'],
  summary:
    'Build three tiny components and instrument every render. Most candidates can write this app; far fewer can say why calling setCount twice in one handler increments by one, or why their interval prints a stale value. This project makes both visible on screen rather than in prose.',
  tags: ['React', 'State', 'Effects', 'Rendering', 'Junior'],
  xpBounty: 150,
  coreScopeBoundaries: {
    inScopeMinimal: [
      'The clock seeds from a fetched server timestamp, so first paint has no value yet.',
      'One panel written as a class, so the same widget can be compared across both eras.',
      'A counter demonstrating batching and the updater form.',
      'A clock whose interval is set up and torn down correctly.',
      'A render counter printed by each component on every commit.',
      'State lifted from a child to the shared parent, deliberately.',
    ],
    outOfScopeBloat: [
      'Any state library.',
      'Routing, styling systems, or data fetching.',
      'useMemo and useCallback — you have not measured anything yet.',
    ],
  },
  stages: [
    {
      stageNumber: 1,
      stageName: 'Reading state like a variable',
      focus: 'Double set, stale closures, and an effect with no cleanup',
      codeSnippet: `function Counter() {\n  const [count, setCount] = useState(0);\n\n  function handleClick() {\n    setCount(count + 1);\n    setCount(count + 1);   // still 1, not 2\n  }\n\n  useEffect(() => {\n    setInterval(() => setCount(count + 1), 1000); // never cleaned up\n  }, []);                                        // count frozen at 0\n}`,
      failureModeOrInvariant:
        'Two setCount calls produce one increment, because both read the same `count` captured by this render. The interval is never cleared, so every remount adds another one, and each keeps a `count` of 0 forever.',
      architecturalLesson:
        'State is a snapshot per render, not a mutable box. An effect closes over the render that created it.',
    },
    {
      stageNumber: 2,
      stageName: 'State as a snapshot',
      focus: 'Updater functions, cleanup, and honest dependency arrays',
      codeSnippet: `const handleClick = () => {\n  setCount(c => c + 1);\n  setCount(c => c + 1);   // 2 — each receives the pending value\n};\n\nuseEffect(() => {\n  const id = setInterval(() => setCount(c => c + 1), 1000);\n  return () => clearInterval(id);   // teardown is not optional\n}, []);                              // honest: the effect uses no props`,
      failureModeOrInvariant:
        'Both updates apply because each updater receives the queued value rather than the captured one. The interval count stays at exactly one across remounts, verifiable under StrictMode double-invocation.',
      architecturalLesson:
        'React batches updates and replays queued updaters against the latest state. Cleanup runs before every re-run and on unmount — that is what makes StrictMode double-mounting a useful check rather than a nuisance.',
    },
  ],
  layers: [
    {
      layer: 'Components',
      components: ['Counter', 'Clock', 'List', 'RenderBadge'],
      invariants: ['Every component logs its render count; no component renders without a state or prop change.'],
    },
    {
      layer: 'State',
      components: ['useState with updater form', 'lifted shared state'],
      invariants: ['State lives at the lowest common ancestor of its readers, and no lower.'],
    },
  ],
  explicitTopics: [
    {
      category: 'React Core',
      topic: 'Mental model',
      subtopic: 'Render, commit and reconciliation',
      howCovered: 'A render badge on each component makes the render/commit boundary observable during interaction.',
      conceptIds: ['react-rendering-model'],
    },
    {
      category: 'React Core',
      topic: 'State',
      subtopic: 'Batching, updaters and closure capture',
      howCovered: 'The double-set bug is reproduced and then fixed with the updater form, with both results logged.',
      conceptIds: ['react-state'],
    },
    {
      category: 'React Core',
      topic: 'Hooks',
      subtopic: 'useEffect dependencies, cleanup, and when not to use it',
      howCovered: 'The interval is written without cleanup, observed leaking under StrictMode, then corrected.',
      conceptIds: ['react-effects'],
    },
  ],
  implicitFoundations: [
    {
      domain: 'Language Semantics',
      title: 'Closures under React',
      mechanism: 'Each render creates fresh function objects closing over that render’s state and props.',
      realWorldImpact: 'The stale-closure bug in React is the same closure rule met in the vanilla todo project.',
      conceptIds: ['js-scope-closures', 'react-state'],
    },
    {
      domain: 'DOM & Browser Pipeline',
      title: 'Timers and the event loop',
      mechanism: 'setInterval enqueues a macrotask; React state updates flush as part of the ensuing work.',
      realWorldImpact: 'Explains why an uncleaned interval keeps a whole component tree alive.',
      conceptIds: ['js-event-loop'],
    },
  ],
  frameworkVsManual: {
    frameworkHandled: ['Re-rendering and DOM updates', 'Update batching'],
    manualEngineeringRequired: [
      'Choosing where state lives.',
      'Writing every cleanup function yourself.',
    ],
  },
};
