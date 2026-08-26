import type { ProjectBlueprint } from '../types';

/**
 * Drag and drop without a drag-and-drop library.
 *
 * The HTML5 drag events are a trap: they do not fire on touch, they cannot be
 * styled during the drag, and they are unusable from a keyboard. Building this
 * on pointer events instead forces you to own the hit testing, the reorder
 * arithmetic and — the part everyone forgets — a keyboard path to the same
 * result.
 */
export const kanbanProject: ProjectBlueprint = {
  id: 'service-kanban',
  title: 'Kanban: Reordering Without A Drag Library',
  tagline: 'Pointer events, an immutable reorder, and a keyboard path to the same move.',
  realWorldAnalog: 'Trello, Jira boards, and every "build a board" interview prompt',
  track: 'service',
  tier: 'flagship',
  difficulty: 'Intermediate',
  estimatedBuildTimeHours: 12,
  architecturePattern: 'Pointer-event drag · pure reorder reducer · optimistic persist',
  summary:
    'A board with columns and cards you can drag between them. The interviewer will ask three things in order: does it work on a phone, can you do it without a mouse, and what happens if the save fails. Answering all three means owning the pointer model, keeping the reorder a pure function, and having a rollback — none of which a drag library teaches you.',
  tags: ['React', 'Pointer events', 'Immutability', 'a11y', 'Machine coding'],
  xpBounty: 320,
  prerequisites: ['service-typeahead'],
  coreScopeBoundaries: {
    inScopeMinimal: [
      'Columns and cards, with cards movable within and between columns.',
      'Pointer events, so the same code path serves mouse, touch and pen.',
      'A pure reducer for every board mutation, testable with no DOM at all.',
      'A keyboard path: pick up, move, drop, cancel — announced at each step.',
      'Optimistic persistence with rollback to the exact prior board on failure.',
      'A drag preview that follows the pointer without re-rendering the board.',
      'Board state that survives a reload.',
      'An auto-scroll when dragging near a column edge, throttled to a frame.',
    ],
    outOfScopeBloat: [
      'A drag-and-drop library — that is the entire exercise.',
      'Multi-select drag, swimlanes, or nested boards.',
      'Real-time collaboration or presence.',
      'Card detail views beyond a title and a label.',
    ],
  },
  stages: [
    {
      stageNumber: 1,
      stageName: 'The board as data',
      focus: 'A pure reorder function before any pixels move',
      codeSnippet: `// Every move is one pure function. No DOM, no event, fully testable.\nfunction moveCard(board: Board, from: Loc, to: Loc): Board {\n  const src = [...board.columns[from.col].cards];\n  const [card] = src.splice(from.index, 1);\n  const dst = from.col === to.col ? src : [...board.columns[to.col].cards];\n  dst.splice(to.index, 0, card);\n  return { ...board, columns: { ...board.columns,\n    [from.col]: { ...board.columns[from.col], cards: src },\n    [to.col]:   { ...board.columns[to.col],   cards: dst } } };\n}`,
      failureModeOrInvariant:
        'Splice the original array and the "previous board" you kept for rollback has already changed — the undo restores the state you were trying to escape. Same-column moves are the case everyone gets wrong: removing before inserting shifts every index after the removal point by one.',
      architecturalLesson:
        'Write the state transition as a pure function first. If reordering needs a DOM event to be testable, the logic is in the wrong place.',
    },
    {
      stageNumber: 2,
      stageName: 'The pointer model',
      focus: 'Pointer capture, hit testing and a preview that does not re-render the board',
      codeSnippet: `function onPointerDown(e: React.PointerEvent) {\n  (e.target as Element).setPointerCapture(e.pointerId); // keep events after leaving the element\n  dragRef.current = { id, startX: e.clientX, startY: e.clientY };\n}\n\n// The preview is transform-only: no layout, no board re-render.\nfunction onPointerMove(e: React.PointerEvent) {\n  if (!dragRef.current) return;\n  previewRef.current!.style.transform =\n    \`translate3d(\${e.clientX - startX}px, \${e.clientY - startY}px, 0)\`;\n}`,
      failureModeOrInvariant:
        'Without pointer capture the drag dies the moment the pointer leaves the card. Driving the preview through React state re-renders the whole board on every pointer move — sixty times a second — and the drag stutters on exactly the low-end devices where it matters.',
      architecturalLesson:
        'A drag is a gesture, not a state change. Keep it out of React state until it commits; only the drop is a board mutation.',
    },
    {
      stageNumber: 3,
      stageName: 'The move you can make without a mouse',
      focus: 'A keyboard grab model, announcements, and rollback',
      codeSnippet: `// Space picks up, arrows move, Space drops, Escape cancels.\nif (key === ' ') grabbed ? commit() : grab();\nif (key === 'Escape' && grabbed) cancel();          // must restore the original position\n\n<p role="status" aria-live="polite">\n  {grabbed ? \`\${card.title}, grabbed. Column \${col + 1}, position \${i + 1} of \${n}.\` : ''}\n</p>`,
      failureModeOrInvariant:
        'A board that only responds to a pointer is unusable for keyboard and screen-reader users, and the interviewer checks. Announcing position without the total ("position 3") tells a blind user nothing about whether they can keep going. Cancelling must restore the exact original index, not merely drop the card back into the column.',
      architecturalLesson:
        'Drag and drop is a two-step commit — grab, then place. Once modelled that way, the keyboard path and the pointer path share one reducer and one announcement policy.',
    },
  ],
  deliverables: [
    { id: 'Board reducer', title: 'Pure board reducer', spec: 'Every mutation is a pure function over board state, unit tested with no DOM, including the same-column index-shift case.' },
    { id: 'Pointer drag', title: 'Pointer-event drag', spec: 'Pointer capture, hit testing against column rects and a transform-only preview that never re-renders the board.' },
    { id: 'Keyboard drag', title: 'Keyboard grab model', spec: 'Space grabs and drops, arrows move, Escape restores the exact original index, with each step announced politely.' },
    { id: 'Optimistic save', title: 'Optimistic persistence', spec: 'The move applies immediately and rolls back to a snapshot taken before the mutation when the save rejects.' },
    { id: 'Auto scroll', title: 'Edge auto-scroll', spec: 'Dragging near a column edge scrolls it, driven by requestAnimationFrame rather than a pointer-move handler.' },
    { id: 'Board persistence', title: 'Durable board', spec: 'Board state survives a reload, written on commit rather than on every pointer movement.' },
    { id: 'Token theme', title: 'Token-driven styling', spec: 'Column, card and drop-target styling all read custom properties, with drag state expressed as a data attribute.' },
    { id: 'Test suite', title: 'Behavioural tests', spec: 'Tests cover the reducer exhaustively and prove the keyboard path produces the same board as the equivalent pointer drag.' },
  ],
  layers: [
    { layer: 'Model', components: ['board reducer', 'location type', 'snapshot'], invariants: ['Every mutation returns a new board; nothing is spliced in place.'] },
    { layer: 'Gesture', components: ['pointer capture', 'hit test', 'preview', 'auto-scroll'], invariants: ['Pointer movement never touches React state.'] },
    { layer: 'Access', components: ['grab model', 'live region', 'focus return'], invariants: ['Every pointer move has an equivalent keyboard move.'] },
  ],
  explicitTopics: [
    { category: 'JavaScript', topic: 'Pointer events', subtopic: 'Capture, hit testing, unified input', howCovered: 'One code path serves mouse, touch and pen, with setPointerCapture keeping the gesture alive.', conceptIds: ['js-dom-events'] },
    { category: 'React', topic: 'State', subtopic: 'What must not be state', howCovered: 'The in-progress drag lives in refs, because sixty re-renders a second is the bug.', conceptIds: ['react-state', 'react-hooks-rest', 'rd-react-hooks'] },
    { category: 'React', topic: 'Immutability', subtopic: 'Reorder without mutation', howCovered: 'The reducer copies both affected columns, which is what makes the rollback snapshot trustworthy.', conceptIds: ['react-immutability', 'react-references-copying'] },
    { category: 'JavaScript', topic: 'Arrays', subtopic: 'Splice arithmetic and index shift', howCovered: 'The same-column move is derived carefully, because remove-then-insert shifts every later index.', conceptIds: ['js-arrays-objects'] },
    { category: 'State', topic: 'Reducers', subtopic: 'Pure transitions over a board', howCovered: 'Board mutations are a reducer, which is the purest available argument for why reducers are pure.', conceptIds: ['redux-core', 'rd-react-state-mgmt'] },
    { category: 'React', topic: 'Effects', subtopic: 'Window listeners and teardown', howCovered: 'Pointer move and up are bound for the duration of a drag and removed on commit or cancel.', conceptIds: ['react-effects'] },
    { category: 'TypeScript', topic: 'Modelling', subtopic: 'Location as a union', howCovered: 'A card location is a typed pair, so a move to a column that does not exist is a compile error.', conceptIds: ['ts-essentials'] },
    { category: 'Accessibility', topic: 'Keyboard drag', subtopic: 'Grab model and announcements', howCovered: 'Space, arrows and Escape reproduce every pointer move, announced with position and total.', conceptIds: ['a11y-core'] },
    { category: 'CSS', topic: 'Grid', subtopic: 'Board columns and card stacks', howCovered: 'Columns are grid tracks that scroll independently while the board scrolls horizontally.', conceptIds: ['css-grid-tracks', 'css-grid-placement'] },
    { category: 'React', topic: 'Rendering', subtopic: 'Keys and drag identity', howCovered: 'Card ids as keys keep the dragged node mounted across a reorder rather than remounting it.', conceptIds: ['react-rendering-model', 'react-perf'] },
    { category: 'Web', topic: 'Storage and persistence', subtopic: 'When to write', howCovered: 'The board persists on commit, never on pointer move, with the reason measured.', conceptIds: ['web-storage'] },
    { category: 'JavaScript', topic: 'Async', subtopic: 'Optimistic save and rollback', howCovered: 'A rejected save restores a snapshot taken before the mutation was applied.', conceptIds: ['js-promises', 'web-http'] },
    { category: 'HTML', topic: 'Semantics', subtopic: 'Lists, headings and regions', howCovered: 'Columns are labelled regions containing lists, so the board has a structure without CSS.', conceptIds: ['html-semantics'] },
    { category: 'React', topic: 'Composition', subtopic: 'One reducer, two input paths', howCovered: 'Pointer and keyboard are two adapters over the same commit, which is why they cannot diverge.', conceptIds: ['react-composition', 'rd-react-components'] },
    { category: 'Testing', topic: 'Behavioural tests', subtopic: 'Reducer plus equivalence', howCovered: 'The keyboard path is asserted to produce the same board as the equivalent pointer drag.', conceptIds: ['testing-react', 'rd-react-testing'] },
  ],
  implicitFoundations: [
    { domain: 'Language Semantics', title: 'The gesture owns its origin', mechanism: 'Each drag closes over its start point and pointer id.', realWorldImpact: 'A second finger otherwise hijacks the first finger\'s drag.', conceptIds: ['js-scope-closures', 'js-types-coercion', 'js-defaulting-operators'] },
    { domain: 'Language Semantics', title: 'Identity across a reorder', mechanism: 'Cards are compared by id, never by object identity or index.', realWorldImpact: 'Index comparison breaks the moment two cards share a title.', conceptIds: ['js-equality-matrix'] },
    { domain: 'DOM & Browser Pipeline', title: 'Frame-bound work', mechanism: 'Auto-scroll and preview updates run on requestAnimationFrame, not per pointer event.', realWorldImpact: 'Pointer events fire faster than frames, so unthrottled work is wasted and janky.', conceptIds: ['js-polyfills'] },
    { domain: 'DOM & Browser Pipeline', title: 'The preview is a layer', mechanism: 'Transform-only movement keeps the drag off the layout and paint path.', realWorldImpact: 'Animating left/top forces layout on every frame of every drag.', conceptIds: ['css-positioning', 'css-box-display'] },
    { domain: 'DOM & Browser Pipeline', title: 'A card is a flex line', mechanism: 'Handle, title and label chip lay out on one axis with a held basis.', realWorldImpact: 'A long card title must not push the label chip out of the card.', conceptIds: ['css-flex-axes', 'css-flex-sizing', 'css-flex-align', 'css-grid-align'] },
    { domain: 'Tooling & Build', title: 'Drag state is data', mechanism: 'Dragging, drop-target and grabbed states are data attributes read by CSS.', realWorldImpact: 'Toggling class names from JavaScript scatters the visual contract across two languages.', conceptIds: ['css-tokens-modern', 'css-cascade', 'css-selectors', 'css-units', 'css-states', 'rd-fe-modern-css'] },
    { domain: 'DOM & Browser Pipeline', title: 'Columns size to themselves', mechanism: 'A column responds to its own width rather than the viewport.', realWorldImpact: 'The same column component works in a narrow panel and a full board.', conceptIds: ['css-media-container'] },
    { domain: 'Language Semantics', title: 'Choosing the store', mechanism: 'A local reducer is chosen over a global store, with the threshold stated.', realWorldImpact: 'Reaching for Redux at this size is the cargo cult the interview is probing for.', conceptIds: ['state-alternatives'] },
  ],
  frameworkVsManual: {
    frameworkHandled: ['Nothing. Using dnd-kit or react-beautiful-dnd removes every lesson in this build.'],
    manualEngineeringRequired: [
      'The reorder arithmetic, including the same-column index shift.',
      'Pointer capture, hit testing and a preview that stays off the React render path.',
      'The keyboard grab model and its announcement policy.',
      'The snapshot that makes rollback truthful.',
    ],
  },
};
