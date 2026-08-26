import type { ProjectBlueprint } from '../types';

/**
 * The build that punishes a div soup.
 *
 * A grid is where "just use divs" finally costs something: without table
 * semantics a screen reader cannot say which column a cell belongs to, and
 * without a stable comparator a sort silently reorders equal rows every time
 * it runs. Both bugs are invisible until someone depends on them.
 */
export const dataGridProject: ProjectBlueprint = {
  id: 'service-data-grid',
  title: 'Data Grid: Sorting, Windowing, And Saying Which Column',
  tagline: 'Five thousand rows, a stable sort, a sticky header, and semantics that survive.',
  realWorldAnalog: 'Admin tables, reports, and the "render 10k rows" interview prompt',
  track: 'service',
  tier: 'flagship',
  difficulty: 'Intermediate',
  estimatedBuildTimeHours: 12,
  architecturePattern: 'Table semantics · derived pipeline · windowed body',
  summary:
    'Sort, filter and page five thousand rows without the browser giving up. The three things interviewers probe are all traps: the sort must be stable or rows shuffle on every re-sort, the derived pipeline must be memoised at the right boundary or filtering re-sorts everything, and the whole thing must still announce which column a cell is in.',
  tags: ['React', 'Virtualization', 'Sorting', 'Tables', 'a11y', 'Machine coding'],
  xpBounty: 340,
  prerequisites: ['service-infinite-feed'],
  coreScopeBoundaries: {
    inScopeMinimal: [
      'Real table semantics: a header row, column scope, and a caption.',
      'Multi-column sort with an explicitly stable comparator.',
      'Filtering and sorting as a derived pipeline, memoised at a stated boundary.',
      'A windowed body that renders only visible rows while keeping the header fixed.',
      'Keyboard navigation across cells with a single tab stop into the grid.',
      'Sort state and filters encoded in the URL so a view can be shared.',
      'Column resize that persists, driven by pointer events.',
      'A measured before-and-after for the windowing change.',
    ],
    outOfScopeBloat: [
      'A grid library — AG Grid or TanStack Table removes the entire exercise.',
      'Cell editing, row grouping, or pivoting.',
      'Server-side sorting; the point is to feel five thousand rows on the client first.',
      'CSV export or print styling.',
    ],
  },
  stages: [
    {
      stageNumber: 1,
      stageName: 'The table that means something',
      focus: 'Semantics, scope, and a comparator that does not shuffle',
      codeSnippet: `<table>\n  <caption>Orders, sorted by date descending</caption>\n  <thead><tr><th scope="col" aria-sort="descending">Date</th>…</tr></thead>\n</table>\n\n// Stable: fall back to the original index so equal rows never swap.\nconst sorted = rows\n  .map((r, i) => [r, i] as const)\n  .sort((a, b) => cmp(a[0], b[0]) || a[1] - b[1])\n  .map(([r]) => r);`,
      failureModeOrInvariant:
        'Array.prototype.sort is only guaranteed stable for the same comparator — reorder by a column with many ties and equal rows visibly reshuffle each time the user toggles direction. Without scope and aria-sort, a screen reader reads a cell with no idea which column it belongs to.',
      architecturalLesson:
        'A sort with ties needs a tiebreaker you chose. If you did not choose one, the engine chose for you and will change its mind.',
    },
    {
      stageNumber: 2,
      stageName: 'The pipeline that does not redo itself',
      focus: 'Derived state, memo boundaries, and where the cost actually is',
      codeSnippet: `// Two boundaries, not one: typing in the filter must not re-sort 5,000 rows.\nconst filtered = useMemo(() => rows.filter(matches(query)), [rows, query]);\nconst sorted   = useMemo(() => stableSort(filtered, sortBy), [filtered, sortBy]);\nconst page     = useMemo(() => sorted.slice(off, off + size), [sorted, off, size]);`,
      failureModeOrInvariant:
        'One memo over the whole pipeline means every keystroke in the filter re-runs the sort. Zero memos means every unrelated re-render does. Both feel identical at a hundred rows and diverge violently at five thousand — which is why the row count in the prompt is never an accident.',
      architecturalLesson:
        'Memoise at the boundaries where inputs actually change. A memo is a claim about which inputs are stable, and a wrong claim costs more than none.',
    },
    {
      stageNumber: 3,
      stageName: 'The body that only renders what you can see',
      focus: 'Windowing with a fixed header, and keyboard reachability',
      codeSnippet: `// Rows are absolutely positioned inside a spacer of the full height.\n<div style={{ height: total }}>\n  {window.map(v => (\n    <div role="row" style={{ transform: \`translateY(\${v.start}px)\` }} key={v.key}>…</div>\n  ))}\n</div>\n\n// One tab stop in, arrows to move — not 5,000 tab stops.\n<div role="grid" onKeyDown={move} tabIndex={0} aria-rowcount={total}>`,
      failureModeOrInvariant:
        'Windowing a real table element fights the browser\'s own layout algorithm, so the grid roles come with an obligation to reimplement what the table gave you free. Leave every cell tabbable and a keyboard user needs five thousand presses to leave the grid.',
      architecturalLesson:
        'Windowing is a trade: you buy frame time and take on the semantics the element was providing. Say what you gave up, and put it back with roles.',
    },
  ],
  deliverables: [
    { id: 'Table semantics', title: 'Semantic table', spec: 'Caption, column scope and aria-sort on every sortable header, verified with the accessibility tree rather than by eye.' },
    { id: 'Stable sort', title: 'Stable comparator', spec: 'A multi-key comparator with an explicit index tiebreaker, unit tested against a dataset engineered to be full of ties.' },
    { id: 'Derived pipeline', title: 'Memoised pipeline', spec: 'Filter, sort and page are three separate memo boundaries chosen so typing in the filter never re-sorts.' },
    { id: 'Windowed body', title: 'Windowed rows', spec: 'Only visible rows render, the header stays fixed, and a before-and-after frame measurement is committed.' },
    { id: 'Grid keyboard', title: 'Grid keyboard model', spec: 'One tab stop into the grid with arrow-key cell movement, Home and End, and the active cell announced.' },
    { id: 'URL view state', title: 'Shareable view', spec: 'Sort column, direction, filters and page live in search params so a pasted link reproduces the exact view.' },
    { id: 'Column resize', title: 'Persisted column widths', spec: 'Pointer-driven resize handles that persist widths across reloads and never collapse a column below a minimum.' },
    { id: 'Test suite', title: 'Behavioural tests', spec: 'Tests prove the sort is stable across repeated toggles and that the grid is escapable with a single tab press.' },
  ],
  layers: [
    { layer: 'Semantics', components: ['table', 'caption', 'scope', 'aria-sort'], invariants: ['Every cell is associated with a column a screen reader can name.'] },
    { layer: 'Pipeline', components: ['filter', 'stable sort', 'pager', 'memo boundaries'], invariants: ['Equal rows never change relative order between renders.'] },
    { layer: 'Viewport', components: ['windowed body', 'sticky header', 'resize handles'], invariants: ['The grid has exactly one tab stop.'] },
  ],
  explicitTopics: [
    { category: 'HTML', topic: 'Tables', subtopic: 'Caption, scope, header association', howCovered: 'The grid begins as a real table so what windowing later costs is explicit and repaid with roles.', conceptIds: ['html-semantics'] },
    { category: 'JavaScript', topic: 'Sorting', subtopic: 'Stability and multi-key comparators', howCovered: 'A tiebreaker is chosen deliberately and tested against a dataset engineered to be full of ties.', conceptIds: ['js-arrays-objects', 'js-equality-matrix'] },
    { category: 'React', topic: 'Performance', subtopic: 'Memo boundaries and windowing', howCovered: 'Three memo boundaries are chosen by which inputs change, then windowing is measured before and after.', conceptIds: ['react-perf', 'react-rendering-model'] },
    { category: 'React', topic: 'State', subtopic: 'Derived versus stored', howCovered: 'Sorted rows are derived, never stored, so the two can never disagree.', conceptIds: ['react-state', 'react-hooks-rest', 'rd-react-hooks'] },
    { category: 'Routing', topic: 'View as URL', subtopic: 'Sort, filter and page in search params', howCovered: 'A pasted link reproduces the exact grid the sender was looking at.', conceptIds: ['router-core'] },
    { category: 'Accessibility', topic: 'Grid pattern', subtopic: 'One tab stop, arrow movement, aria-sort', howCovered: 'Roving focus replaces five thousand tab stops, and the active cell is announced with its column.', conceptIds: ['a11y-core'] },
    { category: 'CSS', topic: 'Grid', subtopic: 'Column tracks and sticky header', howCovered: 'Column widths are grid tracks driven by custom properties so resize is a variable change.', conceptIds: ['css-grid-tracks', 'css-grid-placement', 'css-grid-align'] },
    { category: 'CSS', topic: 'Positioning', subtopic: 'Sticky headers and containment', howCovered: 'The header sticks while the body windows, which requires the containment to be deliberate.', conceptIds: ['css-positioning', 'css-box-display'] },
    { category: 'JavaScript', topic: 'Pointer events', subtopic: 'Resize handles', howCovered: 'Column resize uses pointer capture so the drag survives leaving the handle.', conceptIds: ['js-dom-events'] },
    { category: 'JavaScript', topic: 'Rate limiting', subtopic: 'Throttled resize and scroll', howCovered: 'Resize and scroll work is frame-bound rather than event-bound, and the difference is measured.', conceptIds: ['js-polyfills'] },
    { category: 'TypeScript', topic: 'Modelling', subtopic: 'Generic column definitions', howCovered: 'A column is generic over the row type, so an accessor returning the wrong field is a compile error.', conceptIds: ['ts-essentials'] },
    { category: 'React', topic: 'Composition', subtopic: 'Column definitions as data', howCovered: 'Columns are declared as data with render functions, so adding one never edits the grid.', conceptIds: ['react-composition', 'rd-react-components'] },
    { category: 'React', topic: 'Effects', subtopic: 'Measurement and observers', howCovered: 'A ResizeObserver measures the viewport and is disconnected on unmount.', conceptIds: ['react-effects'] },
    { category: 'Performance', topic: 'Rendering cost', subtopic: 'Frames, not feelings', howCovered: 'Scroll frame time is recorded before and after windowing and committed to the repository.', conceptIds: ['rd-perf-rendering-media', 'rd-perf-web-vitals'] },
    { category: 'Testing', topic: 'Behavioural tests', subtopic: 'Stability and escapability', howCovered: 'Repeated sort toggles must not reorder equal rows, and one tab press must leave the grid.', conceptIds: ['testing-react', 'rd-react-testing'] },
  ],
  implicitFoundations: [
    { domain: 'Language Semantics', title: 'Comparing unlike values', mechanism: 'Comparators normalise nulls, numbers-as-strings and dates before comparing.', realWorldImpact: 'Default comparison sorts numbers lexicographically, so 10 lands before 9.', conceptIds: ['js-types-coercion', 'js-defaulting-operators'] },
    { domain: 'Language Semantics', title: 'Derivation never mutates', mechanism: 'Filter, sort and page each return new arrays over the source rows.', realWorldImpact: 'Sorting in place corrupts the original order the stable tiebreaker depends on.', conceptIds: ['react-immutability', 'react-references-copying'] },
    { domain: 'Language Semantics', title: 'Each handle owns its drag', mechanism: 'Every resize closes over its column id and start width.', realWorldImpact: 'A shared handle resizes whichever column was dragged last.', conceptIds: ['js-scope-closures'] },
    { domain: 'DOM & Browser Pipeline', title: 'Rows are transformed, not laid out', mechanism: 'Windowed rows translate within a full-height spacer.', realWorldImpact: 'Changing top on every row forces layout for the whole body each frame.', conceptIds: ['js-event-loop', 'js-promises'] },
    { domain: 'DOM & Browser Pipeline', title: 'A cell row is a flex line', mechanism: 'Cell content, sort indicator and resize handle share one axis.', realWorldImpact: 'A long cell value must not push the sort caret out of the header.', conceptIds: ['css-flex-axes', 'css-flex-sizing', 'css-flex-align'] },
    { domain: 'Tooling & Build', title: 'Column width is a variable', mechanism: 'Widths are custom properties, so resizing sets one variable rather than restyling cells.', realWorldImpact: 'Per-cell inline widths make a resize an O(rows) style write.', conceptIds: ['css-tokens-modern', 'css-cascade', 'css-selectors', 'css-units', 'css-states', 'rd-fe-modern-css'] },
    { domain: 'DOM & Browser Pipeline', title: 'Density responds to width', mechanism: 'The grid switches to a compact density from its own width.', realWorldImpact: 'The same grid is usable in a drawer and full screen.', conceptIds: ['css-media-container'] },
    { domain: 'V8 Engine & Memory', title: 'Widths outlive the session', mechanism: 'Column widths persist to localStorage keyed by grid id.', realWorldImpact: 'Users re-resize the same columns every visit otherwise.', conceptIds: ['web-storage'] },
    { domain: 'Internet & Protocols', title: 'Why five thousand is the client\'s problem', mechanism: 'The row budget at which server-side paging must take over is stated.', realWorldImpact: 'Shipping client-side sort over a million rows is the failure this threshold prevents.', conceptIds: ['web-http', 'state-alternatives', 'rd-react-data-fetching'] },
  ],
  frameworkVsManual: {
    frameworkHandled: ['Nothing. A grid library removes the sort, the pipeline and the windowing — which is the whole build.'],
    manualEngineeringRequired: [
      'The stable comparator and its tiebreaker.',
      'Where each memo boundary goes, and the argument for that placement.',
      'The semantics windowing takes away, put back with roles.',
      'The roving-focus model that gives the grid one tab stop.',
    ],
  },
};
