import { RangeSetBuilder } from '@codemirror/state';
import { Decoration, EditorView, ViewPlugin } from '@codemirror/view';
import type { DecorationSet, ViewUpdate } from '@codemirror/view';

const LEVELS = 6;

const marks = Array.from({ length: LEVELS }, (_, i) =>
  Decoration.mark({ class: `cm-rbi cm-rbi-${i}` }),
);

/** Colour the leading indent of every visible line, one hue per depth level. */
function build(view: EditorView, unit: number): DecorationSet {
  const b = new RangeSetBuilder<Decoration>();
  for (const { from, to } of view.visibleRanges) {
    let pos = from;
    while (pos <= to) {
      const line = view.state.doc.lineAt(pos);
      const text = line.text;
      let ws = 0;
      while (ws < text.length && (text[ws] === ' ' || text[ws] === '\t')) ws++;
      for (let s = 0; s + unit <= ws; s += unit) {
        b.add(line.from + s, line.from + s + unit, marks[(s / unit) % LEVELS]);
      }
      if (line.to + 1 <= pos) break;
      pos = line.to + 1;
    }
  }
  return b.finish();
}

const theme = EditorView.baseTheme({
  '.cm-rbi': { borderLeft: '1px solid transparent' },
  '.cm-rbi-0': { borderLeftColor: '#38bdf8' },
  '.cm-rbi-1': { borderLeftColor: '#a78bfa' },
  '.cm-rbi-2': { borderLeftColor: '#f472b6' },
  '.cm-rbi-3': { borderLeftColor: '#fb923c' },
  '.cm-rbi-4': { borderLeftColor: '#34d399' },
  '.cm-rbi-5': { borderLeftColor: '#facc15' },
});

export function rainbowIndent(unit = 2) {
  return [
    ViewPlugin.fromClass(
      class {
        decorations: DecorationSet;
        constructor(view: EditorView) { this.decorations = build(view, unit); }
        update(u: ViewUpdate) {
          if (u.docChanged || u.viewportChanged) this.decorations = build(u.view, unit);
        }
      },
      { decorations: (v) => v.decorations },
    ),
    theme,
  ];
}
