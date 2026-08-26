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
