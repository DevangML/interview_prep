/**
 * The join the app was missing: drill -> concept.
 *
 * Projects carry 1,255 verified concept edges. The 216 mastery units — the only
 * place the app *objectively measures you* — carried none, so the grader could
 * prove your code was wrong without ever being able to say what you don't know.
 * Completion was the only signal available, and completion is self-report with
 * extra steps.
 *
 * Tags are derived, not hand-listed, so they cannot rot silently: a CSS drill is
 * tagged from the properties it already declares in `use`, and everything else
 * from an explicit table. `scripts/checkUnitConcepts.ts` ratchets the result.
 */
import { CSS100 } from './css100';
import { MASTERY_UNITS } from './masteryStream';

/** CSS property or token, as it appears in a drill's `use` list -> concept ids. */
const PROPERTY_CONCEPTS: Record<string, string[]> = {
  // Box and flow
  display: ['css-box-display'], 'box-sizing': ['css-box-display'], width: ['css-box-display'],
  height: ['css-box-display'], 'min-height': ['css-box-display'], 'max-width': ['css-box-display'],
  'min-width': ['css-box-display'], 'min-inline-size': ['css-box-display'],
  margin: ['css-box-display'], 'margin-top': ['css-box-display'], 'margin-bottom': ['css-box-display'],
  'margin-left': ['css-box-display'], 'padding-top': ['css-box-display'],
  overflow: ['css-box-display'], 'aspect-ratio': ['css-ratio-logical'],
  'text-overflow': ['css-box-display'], 'white-space': ['css-box-display'],
  '-webkit-line-clamp': ['css-box-display'], '<table>': ['css-box-display'],
  'border-collapse': ['css-box-display'], 'width / height': ['css-box-display'],

  // Flex
  flex: ['css-flex-sizing'], 'flex-direction': ['css-flex-axes'], 'flex-wrap': ['css-flex-axes'],
  'flex-grow': ['css-flex-sizing'], 'flex-shrink': ['css-flex-sizing'], 'flex-basis': ['css-flex-sizing'],
  'flex-basis / flex-grow': ['css-flex-sizing'], 'flex-basis with a calc': ['css-flex-sizing'],
  order: ['css-flex-axes'], 'DOM order': ['css-flex-axes'],

  // Alignment, shared by flex and grid
  'justify-content': ['css-flex-align'], 'align-items': ['css-flex-align'],
  'align-self': ['css-flex-align'], 'align-content': ['css-flex-align'],
  'place-items': ['css-grid-align'], 'place-content': ['css-grid-align'], 'place-self': ['css-grid-align'],
  'justify-items': ['css-grid-align'], 'justify-self': ['css-grid-align'],
  gap: ['css-flex-align'], 'row-gap': ['css-flex-align'], 'column-gap': ['css-flex-align'],

  // Grid tracks
  'grid-template-columns': ['css-grid-tracks'], 'grid-template-rows': ['css-grid-tracks'],
  'grid-auto-rows': ['css-grid-tracks'], 'grid-auto-columns': ['css-grid-tracks'],
  fr: ['css-grid-tracks'], '1fr': ['css-grid-tracks'], 'repeat()': ['css-grid-tracks'],
  'minmax()': ['css-grid-tracks'], 'minmax(0, 1fr)': ['css-grid-tracks'],
  'minmax(12rem, 1fr)': ['css-grid-tracks'], 'auto-fit': ['css-grid-tracks'],
  'auto-fill': ['css-grid-tracks'], auto: ['css-grid-tracks'],
  'repeat(auto-fill, …)': ['css-grid-tracks'],
  'minmax(min(100%, 20rem), 1fr)': ['css-grid-tracks'],
  'repeat(auto-fit, minmax(min(100%, 14rem), 1fr))': ['css-grid-tracks'],
  'repeat(auto-fit, minmax(min(100%, 12rem), 1fr))': ['css-grid-tracks'],

  // Grid placement
  'grid-column': ['css-grid-placement'], 'grid-row': ['css-grid-placement'],
  'grid-area': ['css-grid-placement'], span: ['css-grid-placement'],
  'grid-auto-flow': ['css-grid-placement'], 'grid-template-areas': ['css-grid-placement'],
  'a dot in the area map': ['css-grid-placement'],

  // Positioning
  position: ['css-positioning'], top: ['css-positioning'], 'top / right': ['css-positioning'],
  inset: ['css-positioning'], 'inset-inline': ['css-positioning', 'css-ratio-logical'],
  'inset-block': ['css-positioning', 'css-ratio-logical'], 'z-index': ['css-positioning'],

  // Responsive
  '@container': ['css-media-container'], 'container-type': ['css-media-container'],
  'container-name': ['css-media-container'], container: ['css-media-container'],
  '@container <name> (…)': ['css-media-container'], cqi: ['css-media-container', 'css-units'],
  '@media': ['css-media-container'], '@media (width >= 48rem)': ['css-media-container'],
  '@media (width >= …)': ['css-media-container'], '@media (prefers-reduced-motion': ['css-media-container', 'a11y-core'],
  '@media (prefers-color-scheme': ['css-media-container', 'css-tokens-modern'],
  '@media (pointer': ['css-media-container'], '@media (hover': ['css-media-container'],

  // Units
  rem: ['css-units'], em: ['css-units'], ch: ['css-units'], '%': ['css-units'],
  dvh: ['css-units'], vw: ['css-units'], px: ['css-units'],
  'clamp()': ['css-units'], 'min()': ['css-units'], '--space': ['css-units', 'css-tokens-modern'],

  // State and motion
  outline: ['css-states', 'a11y-core'], 'outline-offset': ['css-states', 'a11y-core'],
  transition: ['css-states'], opacity: ['css-states'], 'box-shadow': ['css-states'],
  transform: ['css-states'],

  // Tokens and colour
  'custom properties': ['css-tokens-modern'], 'custom properties on a class': ['css-tokens-modern'],
  '--custom-property': ['css-tokens-modern'], 'var()': ['css-tokens-modern'],
  'var(--x, fallback)': ['css-tokens-modern'], 'var(--progress)': ['css-tokens-modern'],
  'primitive tokens': ['css-tokens-modern'], 'semantic tokens': ['css-tokens-modern'],
  components: ['css-tokens-modern'], 'color-mix()': ['css-tokens-modern'],
  'in oklab': ['css-tokens-modern'], 'color-mix() with white': ['css-tokens-modern'],
  'color-mix() with black': ['css-tokens-modern'], 'color-mix(… transparent)': ['css-tokens-modern'],
  currentColor: ['css-tokens-modern'], 'color-scheme': ['css-tokens-modern'],
  'linear-gradient': ['css-tokens-modern'],

  // Cascade and selectors
  '@layer': ['css-cascade'], 'low-specificity selectors': ['css-cascade', 'css-selectors'],
  inheritance: ['css-cascade'], 'base rules': ['css-cascade'],
  '+ (adjacent sibling)': ['css-selectors'], '.stack': ['css-selectors', 'css-cascade'],
};

/** Fallback by drill family, for units whose `use` list resolves to nothing. */
const PREFIX_CONCEPTS: Record<string, string[]> = {
  'css-BOX': ['css-box-display'], 'css-FLEX': ['css-flex-axes'], 'css-GRID': ['css-grid-tracks'],
  'css-TRK': ['css-grid-tracks'], 'css-PLC': ['css-grid-placement'], 'css-ARE': ['css-grid-placement'],
  'css-CQ': ['css-media-container'], 'css-POS': ['css-positioning'], 'css-INS': ['css-positioning'],
  'css-UNI': ['css-units'], 'css-MQ': ['css-media-container'], 'css-FOC': ['css-states', 'a11y-core'],
  'css-TOK': ['css-tokens-modern'], 'css-MIX': ['css-tokens-modern'],
  'css-PRM': ['css-media-container'], 'css-EXC': ['css-cascade'], 'css-ANT': ['css-cascade'],
  'css-XTRA': ['css-selectors'],
  'ladder-1': ['css-box-display'], 'ladder-2': ['css-flex-axes'], 'ladder-25': ['css-flex-align'],
  'ladder-26': ['css-grid-tracks'], 'ladder-3': ['css-grid-placement'],
  'ladder-35': ['css-positioning'], 'ladder-4': ['css-media-container'],
};

/** Everything that is not a CSS drill, tagged explicitly. */
const UNIT_CONCEPTS: Record<string, string[]> = {
  // JS core
  'js-primitives-vs-references': ['js-types-coercion', 'react-references-copying'],
  'js-shallow-vs-deep': ['react-references-copying', 'react-immutability'],
  'js-four-equalities': ['js-equality-matrix', 'js-types-coercion'],
  'js-event-loop': ['js-event-loop', 'js-promises'],
  'js-closures-stale-state': ['js-scope-closures', 'react-state'],
  'js-this-binding': ['js-this'],
  // JS traps
  'js-traps-hoisting': ['js-scope-closures'],
  'js-traps-this-binding': ['js-this'],
  'js-traps-event-loop': ['js-event-loop', 'js-promises'],
  'js-traps-loop-closures': ['js-scope-closures'],
  // JS practical
  'vanilla-debounce': ['js-polyfills', 'js-scope-closures', 'js-event-loop'],
  'polyfill-reduce': ['js-polyfills', 'js-arrays-objects'],
  // Async
  'rest-abort-controller': ['js-promises', 'web-http', 'rd-comm-rest'],
  // React core
  'react-infinite-loop': ['react-effects', 'react-rendering-model'],
  'react-context-rerenders': ['react-rendering-model', 'react-perf', 'state-alternatives'],
  'react-custom-use-debounce': ['react-hooks-rest', 'rd-react-hooks'],
  'react-memo-referential-equality': ['react-perf', 'react-references-copying'],
  'react-stale-closure-event': ['js-scope-closures', 'react-effects'],
  'react-usereducer-complex': ['react-state', 'rd-react-state-mgmt'],
  // React practical
  'build-counter': ['react-state', 'html-forms'],
  'build-search': ['react-state', 'js-arrays-objects'],
  'build-todo': ['react-state', 'react-immutability'],
  'build-pagination': ['react-state', 'js-arrays-objects'],
  'build-cloning': ['react-references-copying', 'react-immutability'],
  'build-rest_abort': ['js-promises', 'react-effects', 'rd-react-data-fetching'],
  'practical-search-grid': ['react-state', 'react-composition'],
  'practical-star-rating': ['react-state', 'a11y-core', 'css-states'],
  'practical-recursive-tree': ['react-composition', 'js-arrays-objects'],
  'practical-stopwatch-useref': ['react-hooks-rest', 'js-event-loop'],
  // Ecosystem
  'react-redux-flow': ['redux-core', 'redux-react-toolkit', 'tooling-flux'],
  'react-router-v6': ['router-core', 'rd-react-routing-forms'],
  'build-tooling-tree-shaking': ['tooling-bundlers', 'rd-fe-js-v8-packages'],
  // Behavioural — real concepts, just not technical ones
  'hr-pitch': ['frontend-system-design'], 'hr-conflict': ['frontend-system-design'],
  'hr-failure': ['frontend-system-design'], 'hr-project': ['frontend-system-design'],
  'hr-questions': ['frontend-system-design'], 'hr-gap': ['frontend-system-design'],
};

const CSS_USE_BY_SOURCE = new Map<string, string[]>(
  ((CSS100 as any).items as any[]).map((it) => [
    it.id,
    (it.use || []).map(([p]: [string]) => String(p).split(':')[0].trim()),
  ]),
);

function derive(unitId: string, sourceId?: string): string[] {
  const explicit = UNIT_CONCEPTS[unitId];
  if (explicit) return explicit;

  const out = new Set<string>();
  for (const prop of CSS_USE_BY_SOURCE.get(sourceId ?? '') ?? []) {
    for (const c of PROPERTY_CONCEPTS[prop] ?? []) out.add(c);
  }
  if (out.size) return [...out];

  // Fall back to the drill family. Longest prefix wins so 'ladder-35' beats 'ladder-3'.
  const prefix = Object.keys(PREFIX_CONCEPTS)
    .filter((p) => unitId.startsWith(p))
    .sort((a, b) => b.length - a.length)[0];
  return prefix ? PREFIX_CONCEPTS[prefix] : [];
}

/** unitId -> the concepts that unit provides evidence about. */
export const CONCEPTS_BY_UNIT: ReadonlyMap<string, string[]> = new Map(
  MASTERY_UNITS.map((u) => [u.id, derive(u.id, (u as any).sourceId)]),
);

/** conceptId -> every unit that can prove or disprove it. */
export const UNITS_BY_CONCEPT: ReadonlyMap<string, string[]> = (() => {
  const m = new Map<string, string[]>();
  for (const [unitId, concepts] of CONCEPTS_BY_UNIT)
    for (const c of concepts) m.set(c, [...(m.get(c) ?? []), unitId]);
  return m;
})();

export function conceptsForUnit(unitId: string): string[] {
  return CONCEPTS_BY_UNIT.get(unitId) ?? [];
}
