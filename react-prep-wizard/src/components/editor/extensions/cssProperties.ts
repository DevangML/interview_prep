/**
 * The single source of truth for "is this a real CSS property?".
 *
 * It replaces four separate hand-maintained lists — in the linter, the
 * autocomplete, the hover dictionary and the LSP shim — none of which contained
 * `box-sizing`. That is why the very first drill in the app, BOX-01, whose whole
 * subject is `box-sizing`, was told by its own editor that it had a typo.
 *
 * The fault was never a missing entry. It was **closed-world validation**: a
 * finite hand-written allowlist used to police a set that the CSS Working Group
 * grows every year. Adding `box-sizing` would fix today and re-break on
 * `text-wrap`, `field-sizing`, `anchor-name` or whatever ships next.
 *
 * So we stop maintaining a list and ask the only authority that is never out of
 * date: **the browser the code is running in.**
 */

/** Every property this browser implements, read from the engine itself. */
export const ALL_CSS_PROPERTIES: string[] = (() => {
  const names = new Set<string>();
  if (typeof document !== 'undefined') {
    const computed = getComputedStyle(document.documentElement);
    for (let i = 0; i < computed.length; i++) names.add(computed[i]);
  }
  // Computed style enumerates longhands; these shorthands are what people type.
  for (const shorthand of [
    'background', 'border', 'border-radius', 'margin', 'padding', 'font', 'flex',
    'grid', 'grid-area', 'grid-template', 'gap', 'inset', 'overflow', 'outline',
    'place-items', 'place-content', 'place-self', 'transition', 'animation',
    'list-style', 'text-decoration', 'columns', 'container', 'mask', 'box-sizing',
    'aspect-ratio', 'text-wrap', 'field-sizing', 'content-visibility',
  ]) names.add(shorthand);
  return [...names].sort();
})();

const KNOWN = new Set(ALL_CSS_PROPERTIES);

/**
 * True unless the browser itself does not recognise the property.
 *
 * Custom properties and vendor prefixes are always accepted: a `--token` is
 * author-defined by design, and a `-webkit-` prefix is deliberate, not a slip.
 */
export function isKnownCssProperty(raw: string): boolean {
  const name = raw.trim().toLowerCase();
  if (!name) return false;
  if (name.startsWith('--')) return true;
  if (/^-(webkit|moz|ms|o)-/.test(name)) return true;
  if (KNOWN.has(name)) return true;
  try {
    return CSS.supports(name, 'initial');
  } catch {
    // If the engine cannot answer, say nothing rather than accuse.
    return true;
  }
}
