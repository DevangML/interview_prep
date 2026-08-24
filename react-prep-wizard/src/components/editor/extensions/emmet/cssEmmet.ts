import type { EditorView } from '@codemirror/view';

const CSS_SHORT_MAP: Record<string, string> = {
  'd:f': 'display: flex;',
  'd:if': 'display: inline-flex;',
  'd:g': 'display: grid;',
  'd:b': 'display: block;',
  'd:ib': 'display: inline-block;',
  'd:n': 'display: none;',
  'pos:a': 'position: absolute;',
  'pos:r': 'position: relative;',
  'pos:f': 'position: fixed;',
  'pos:s': 'position: sticky;',
  'bgc': 'background-color: ',
  'c': 'color: ',
  'cur:p': 'cursor: pointer;',
  'jc:c': 'justify-content: center;',
  'jc:sb': 'justify-content: space-between;',
  'jc:sa': 'justify-content: space-around;',
  'jc:se': 'justify-content: space-evenly;',
  'jc:fs': 'justify-content: flex-start;',
  'jc:fe': 'justify-content: flex-end;',
  'ai:c': 'align-items: center;',
  'ai:fs': 'align-items: flex-start;',
  'ai:fe': 'align-items: flex-end;',
  'ai:s': 'align-items: stretch;',
  'fd:c': 'flex-direction: column;',
  'fd:r': 'flex-direction: row;',
  'fw:w': 'flex-wrap: wrap;',
  'ov:h': 'overflow: hidden;',
  'ov:a': 'overflow: auto;',
  'z': 'z-index: ',
  'bdr': 'border-radius: ',
};

export function expandCssEmmet(view: EditorView): boolean {
  const { state } = view;
  const { from, to } = state.selection.main;
  if (from !== to || state.readOnly) return false;

  const line = state.doc.lineAt(from);
  const textBefore = line.text.slice(0, from - line.from);

  // 1. Direct Map matching (e.g. d:f, pos:a, jc:sb, bgc)
  const tokenMatch = textBefore.match(/(?:^|\s)([\w:-]+)$/);
  if (tokenMatch) {
    const raw = tokenMatch[1];
    if (CSS_SHORT_MAP[raw]) {
      const expansion = CSS_SHORT_MAP[raw];
      const startPos = from - raw.length;
      view.dispatch({
        changes: { from: startPos, to: from, insert: expansion },
        selection: { anchor: startPos + expansion.length },
        userEvent: 'emmet.css',
      });
      return true;
    }

    // 2. Numeric / Unit expansions: p10 -> padding: 10px;, m0-auto -> margin: 0 auto;
    const propPrefix = raw.match(/^([a-z]+)/)?.[1];
    const rest = raw.slice(propPrefix?.length || 0);

    const prefixMap: Record<string, string> = {
      p: 'padding', m: 'margin', w: 'width', h: 'height',
      maw: 'max-width', mah: 'max-height', miw: 'min-width', mih: 'min-height',
      fz: 'font-size', lh: 'line-height', bdr: 'border-radius', g: 'gap',
      t: 'top', b: 'bottom', l: 'left', r: 'right', op: 'opacity',
    };

    if (propPrefix && prefixMap[propPrefix] && rest.length > 0) {
      const prop = prefixMap[propPrefix];
      const val = rest
        .replace(/(\d+)p\b/g, '$1%')
        .replace(/(\d+)(?=[a-z%-])/g, '$1')
        .replace(/-auto\b/g, ' auto')
        .replace(/-/g, ' ')
        .replace(/(\b\d+\b)(?![%a-z])/g, (n) => (n === '0' && prop !== 'opacity' ? '0' : `${n}px`));
      const expansion = `${prop}: ${val};`;
      const startPos = from - raw.length;
      view.dispatch({
        changes: { from: startPos, to: from, insert: expansion },
        selection: { anchor: startPos + expansion.length },
        userEvent: 'emmet.css',
      });
      return true;
    }
  }

  return false;
}
