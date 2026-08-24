import type { CompletionContext, CompletionResult, Completion } from '@codemirror/autocomplete';
import { snippet } from '@codemirror/autocomplete';

const CSS_PROPERTIES: Completion[] = [
  { label: 'display', type: 'property', info: 'Defines how the element behaves in layout.' },
  { label: 'flex-direction', type: 'property', info: 'Direction of flex items (row, column).' },
  { label: 'justify-content', type: 'property', info: 'Aligns items along main axis.' },
  { label: 'align-items', type: 'property', info: 'Aligns items along cross axis.' },
  { label: 'align-content', type: 'property', info: 'Aligns grid/flex tracks.' },
  { label: 'flex-wrap', type: 'property', info: 'Whether flex items wrap onto multiple lines.' },
  { label: 'flex', type: 'property', info: 'Shorthand for flex-grow, flex-shrink, and flex-basis.' },
  { label: 'grid-template-columns', type: 'property', info: 'Defines column track sizes in grid.' },
  { label: 'grid-template-rows', type: 'property', info: 'Defines row track sizes in grid.' },
  { label: 'grid-column', type: 'property', info: 'Grid item column placement (e.g. 1 / -1).' },
  { label: 'grid-row', type: 'property', info: 'Grid item row placement.' },
  { label: 'place-items', type: 'property', info: 'Shorthand for align-items + justify-items.' },
  { label: 'gap', type: 'property', info: 'Spacing between flex/grid items.' },
  { label: 'row-gap', type: 'property', info: 'Spacing between rows.' },
  { label: 'column-gap', type: 'property', info: 'Spacing between columns.' },
  { label: 'position', type: 'property', info: 'Positioning method (relative, absolute, fixed, sticky).' },
  { label: 'top', type: 'property', info: 'Top offset for positioned elements.' },
  { label: 'right', type: 'property', info: 'Right offset.' },
  { label: 'bottom', type: 'property', info: 'Bottom offset.' },
  { label: 'left', type: 'property', info: 'Left offset.' },
  { label: 'inset', type: 'property', info: 'Shorthand for top, right, bottom, left.' },
  { label: 'z-index', type: 'property', info: 'Stack order of positioned element.' },
  { label: 'width', type: 'property', info: 'Element width.' },
  { label: 'min-width', type: 'property', info: 'Minimum width.' },
  { label: 'max-width', type: 'property', info: 'Maximum width.' },
  { label: 'height', type: 'property', info: 'Element height.' },
  { label: 'min-height', type: 'property', info: 'Minimum height.' },
  { label: 'max-height', type: 'property', info: 'Maximum height.' },
  { label: 'margin', type: 'property', info: 'Outer spacing around element.' },
  { label: 'padding', type: 'property', info: 'Inner spacing inside element.' },
  { label: 'background', type: 'property', info: 'Background color/image shorthand.' },
  { label: 'background-color', type: 'property', info: 'Background color.' },
  { label: 'color', type: 'property', info: 'Foreground text color.' },
  { label: 'font-size', type: 'property', info: 'Font size (px, rem, em).' },
  { label: 'font-weight', type: 'property', info: 'Font thickness (bold, 400, 600, 700).' },
  { label: 'border', type: 'property', info: 'Border shorthand: width style color.' },
  { label: 'border-radius', type: 'property', info: 'Corner rounding (px, rem, %).' },
  { label: 'box-shadow', type: 'property', info: 'Drop shadow on element.' },
  { label: 'transform', type: 'property', info: '2D/3D transformation (translate, scale, rotate).' },
  { label: 'transition', type: 'property', info: 'Smooth CSS state change transition.' },
  { label: 'overflow', type: 'property', info: 'Clipping behavior (hidden, auto, scroll).' },
  { label: 'cursor', type: 'property', info: 'Mouse cursor style (pointer, default).' },
];

const CSS_SNIPPETS: Completion[] = [
  { label: 'flex-center', type: 'snippet', detail: 'CSS Flex Center', apply: snippet('display: flex;\njustify-content: center;\nalign-items: center;') },
  { label: 'grid-center', type: 'snippet', detail: 'CSS Grid Center', apply: snippet('display: grid;\nplace-items: center;') },
  { label: 'grid-2col', type: 'snippet', detail: 'Grid 2 Columns', apply: snippet('display: grid;\ngrid-template-columns: repeat(2, 1fr);\ngap: ${1:16px};') },
  { label: 'grid-3col', type: 'snippet', detail: 'Grid 3 Columns', apply: snippet('display: grid;\ngrid-template-columns: repeat(3, 1fr);\ngap: ${1:16px};') },
  { label: 'grid-auto-fit', type: 'snippet', detail: 'Responsive Grid', apply: snippet('display: grid;\ngrid-template-columns: repeat(auto-fit, minmax(${1:200px}, 1fr));\ngap: ${2:16px};') },
  { label: 'abs-center', type: 'snippet', detail: 'Absolute Center', apply: snippet('position: absolute;\ntop: 50%;\nleft: 50%;\ntransform: translate(-50%, -50%);') },
  { label: 'inset-0', type: 'snippet', detail: 'Absolute Fill', apply: snippet('position: absolute;\ninset: 0;') },
  { label: 'd:f', type: 'snippet', detail: 'display: flex', apply: snippet('display: flex;') },
  { label: 'd:g', type: 'snippet', detail: 'display: grid', apply: snippet('display: grid;') },
  { label: 'd:b', type: 'snippet', detail: 'display: block', apply: snippet('display: block;') },
  { label: 'd:n', type: 'snippet', detail: 'display: none', apply: snippet('display: none;') },
  { label: 'pos:a', type: 'snippet', detail: 'position: absolute', apply: snippet('position: absolute;') },
  { label: 'pos:r', type: 'snippet', detail: 'position: relative', apply: snippet('position: relative;') },
  { label: 'pos:f', type: 'snippet', detail: 'position: fixed', apply: snippet('position: fixed;') },
  { label: 'pos:s', type: 'snippet', detail: 'position: sticky;\ntop: ${1:0};', apply: snippet('position: sticky;\ntop: ${1:0};') },
  { label: 'j:c', type: 'snippet', detail: 'justify-content: center', apply: snippet('justify-content: center;') },
  { label: 'j:sb', type: 'snippet', detail: 'justify-content: space-between', apply: snippet('justify-content: space-between;') },
  { label: 'a:c', type: 'snippet', detail: 'align-items: center', apply: snippet('align-items: center;') },
  { label: 'f-col', type: 'snippet', detail: 'flex-direction: column', apply: snippet('flex-direction: column;') },
  { label: 'f-row', type: 'snippet', detail: 'flex-direction: row', apply: snippet('flex-direction: row;') },
  { label: 'p0', type: 'snippet', detail: 'padding: 0', apply: snippet('padding: 0;') },
  { label: 'm0-auto', type: 'snippet', detail: 'margin: 0 auto', apply: snippet('margin: 0 auto;') },
];

const VALUE_MAP: Record<string, string[]> = {
  display: ['flex', 'grid', 'inline-flex', 'inline-grid', 'block', 'inline-block', 'none', 'contents', 'flow-root'],
  position: ['relative', 'absolute', 'fixed', 'sticky', 'static'],
  'justify-content': ['center', 'space-between', 'space-around', 'space-evenly', 'flex-start', 'flex-end', 'stretch'],
  'align-items': ['center', 'flex-start', 'flex-end', 'stretch', 'baseline'],
  'flex-direction': ['row', 'column', 'row-reverse', 'column-reverse'],
  'flex-wrap': ['wrap', 'nowrap', 'wrap-reverse'],
  overflow: ['hidden', 'auto', 'scroll', 'visible'],
  cursor: ['pointer', 'default', 'not-allowed', 'grab', 'move'],
};

export function cssLspSource(context: CompletionContext): CompletionResult | null {
  const line = context.state.doc.lineAt(context.pos);
  const textBefore = line.text.slice(0, context.pos - line.from);

  // Check if after a colon: e.g. "display: "
  const colonMatch = textBefore.match(/([a-zA-Z-]+)\s*:\s*([^;]*)$/);
  if (colonMatch) {
    const prop = colonMatch[1].toLowerCase();
    const valPrefix = colonMatch[2].trim();
    const values = VALUE_MAP[prop];
    if (values) {
      const from = context.pos - valPrefix.length;
      return {
        from,
        options: values.map((v) => ({ label: v, type: 'keyword', apply: v + ';' })),
        validFor: /^[a-zA-Z-]*$/,
      };
    }
  }

  // Property / Snippet match
  const word = context.matchBefore(/[a-zA-Z0-9_:-]*/);
  if (!word || (word.from === word.to && !context.explicit)) return null;

  return {
    from: word.from,
    options: [...CSS_PROPERTIES, ...CSS_SNIPPETS],
    validFor: /^[a-zA-Z0-9_:-]*$/,
  };
}
