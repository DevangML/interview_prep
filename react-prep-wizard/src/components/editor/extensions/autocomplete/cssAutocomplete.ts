import type { CompletionContext, CompletionResult, Completion } from '@codemirror/autocomplete';
import { completeFromList } from '@codemirror/autocomplete';
import { CSS_SNIPPETS } from './snippets';
import { ALL_CSS_PROPERTIES } from '../cssProperties';

/**
 * Suggestions come from the browser's own property list, not a hand-written
 * one — the same fix as the linter. The curated names are kept only to *boost*
 * what a layout drill actually reaches for, so the common answer stays at the
 * top of a list that is now complete rather than short.
 */
const PRIORITY = new Set([
  'display', 'position', 'box-sizing', 'justify-content', 'align-items',
  'flex-direction', 'flex-wrap', 'flex', 'gap', 'grid-template-columns',
  'grid-template-rows', 'grid-template-areas', 'place-items', 'place-content',
  'margin', 'padding', 'width', 'height', 'max-width', 'min-height',
  'background', 'color', 'border', 'border-radius', 'font-size', 'line-height',
  'overflow', 'z-index', 'opacity', 'transform', 'transition', 'aspect-ratio',
  'inset', 'container-type', 'object-fit',
]);

const CSS_PROPERTIES: Completion[] = ALL_CSS_PROPERTIES.map((p) => ({
  label: p,
  type: 'property',
  boost: PRIORITY.has(p) ? 2 : 0,
}));

const CSS_VALUES: Record<string, string[]> = {
  display: ['flex', 'grid', 'inline-flex', 'inline-grid', 'block', 'inline-block', 'none', 'contents', 'flow-root'],
  position: ['relative', 'absolute', 'fixed', 'sticky', 'static'],
  'justify-content': ['center', 'space-between', 'space-around', 'space-evenly', 'flex-start', 'flex-end', 'stretch'],
  'align-items': ['center', 'flex-start', 'flex-end', 'stretch', 'baseline'],
  'align-self': ['auto', 'center', 'flex-start', 'flex-end', 'stretch', 'baseline'],
  'justify-self': ['auto', 'center', 'flex-start', 'flex-end', 'stretch'],
  'flex-direction': ['row', 'column', 'row-reverse', 'column-reverse'],
  'flex-wrap': ['wrap', 'nowrap', 'wrap-reverse'],
  'object-fit': ['cover', 'contain', 'fill', 'scale-down', 'none'],
  overflow: ['hidden', 'auto', 'scroll', 'visible', 'clip'],
  cursor: ['pointer', 'default', 'not-allowed', 'grab', 'grabbing', 'text', 'move'],
};

const CSS_UNITS = ['px', 'rem', '%', 'fr', 'em', 'vh', 'vw', 'ms', 's', 'deg'];

export function cssCompletionSource(context: CompletionContext): CompletionResult | null {
  const lineText = context.state.doc.lineAt(context.pos).text;
  const beforeCursor = lineText.slice(0, context.pos - context.state.doc.lineAt(context.pos).from);

  // 1. Unit completion after digits (e.g. 10|)
  const numMatch = beforeCursor.match(/(\d+)([a-zA-Z%]*)$/);
  if (numMatch && numMatch[2] !== undefined) {
    return {
      from: context.pos - numMatch[2].length,
      options: CSS_UNITS.map((u) => ({ label: u, type: 'unit', boost: 3 })),
    };
  }

  // 2. Property Value completion (after :)
  const colonIndex = beforeCursor.lastIndexOf(':');
  if (colonIndex !== -1 && !beforeCursor.slice(colonIndex).includes(';')) {
    const propMatch = beforeCursor.slice(0, colonIndex).match(/([a-zA-Z-]+)\s*$/);
    const propName = propMatch ? propMatch[1].trim().toLowerCase() : '';
    const values = CSS_VALUES[propName] || [];
    const valPrefix = beforeCursor.slice(colonIndex + 1).trimStart();
    const valStart = context.pos - valPrefix.length;

    return {
      from: valStart,
      options: values.map((v) => ({ label: v, type: 'keyword', apply: v + ';', boost: 2 })),
      validFor: /^[a-zA-Z-]*$/,
    };
  }

  // 3. Property Name & Snippet completion
  const word = context.matchBefore(/[a-zA-Z0-9_:-]*/);
  if (!word && !context.explicit) return null;

  return {
    from: word ? word.from : context.pos,
    options: [...CSS_PROPERTIES, ...CSS_SNIPPETS],
    validFor: /^[a-zA-Z0-9_:-]*$/,
  };
}
