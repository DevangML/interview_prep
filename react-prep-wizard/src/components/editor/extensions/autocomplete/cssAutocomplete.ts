import type { CompletionContext, CompletionResult, Completion } from '@codemirror/autocomplete';
import { completeFromList } from '@codemirror/autocomplete';
import { CSS_SNIPPETS } from './snippets';

const CSS_PROPERTIES: Completion[] = [
  'display', 'position', 'justify-content', 'align-items', 'flex-direction',
  'flex-wrap', 'flex-grow', 'flex-shrink', 'flex-basis', 'flex', 'gap',
  'row-gap', 'column-gap', 'grid-template-columns', 'grid-template-rows',
  'grid-template-areas', 'grid-auto-flow', 'grid-auto-columns', 'grid-auto-rows',
  'grid-column', 'grid-row', 'place-items', 'place-content', 'align-self',
  'justify-self', 'padding', 'padding-top', 'padding-right', 'padding-bottom',
  'padding-left', 'margin', 'margin-top', 'margin-right', 'margin-bottom',
  'margin-left', 'width', 'height', 'max-width', 'min-width', 'max-height',
  'min-height', 'background', 'background-color', 'background-image',
  'border', 'border-radius', 'border-color', 'border-width', 'box-shadow',
  'color', 'font-size', 'font-weight', 'line-height', 'font-family',
  'z-index', 'opacity', 'overflow', 'overflow-x', 'overflow-y', 'cursor',
  'transform', 'transition', 'animation', 'aspect-ratio', 'backdrop-filter',
  'pointer-events', 'user-select', 'object-fit', 'object-position'
].map((p) => ({ label: p, type: 'property', boost: 2 }));

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
