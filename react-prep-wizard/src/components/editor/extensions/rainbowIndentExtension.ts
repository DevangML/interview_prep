import { ViewPlugin, Decoration } from '@codemirror/view';
import type { EditorView, ViewUpdate, DecorationSet } from '@codemirror/view';

// Rainbow colors for indent levels (vibrant wide-gamut P3 / OKLCH compatible)
const RAINBOW_CLASSES = [
  'cm-indent-guide-1',
  'cm-indent-guide-2',
  'cm-indent-guide-3',
  'cm-indent-guide-4',
  'cm-indent-guide-5',
];

function buildIndentDecorations(view: EditorView): DecorationSet {
  const widgets: any[] = [];
  const tabSize = view.state.tabSize || 2;

  for (const { from, to } of view.visibleRanges) {
    let pos = from;
    while (pos <= to) {
      const line = view.state.doc.lineAt(pos);
      const text = line.text;
      const leadingSpaces = text.match(/^ +/);
      if (leadingSpaces) {
        const spaceCount = leadingSpaces[0].length;
        const levels = Math.floor(spaceCount / tabSize);

        for (let lvl = 0; lvl < levels; lvl++) {
          const colOffset = lvl * tabSize;
          const decoPos = line.from + colOffset;
          const cls = RAINBOW_CLASSES[lvl % RAINBOW_CLASSES.length];

          widgets.push(
            Decoration.mark({
              class: `cm-indent-guide ${cls}`,
            }).range(decoPos, decoPos + 1),
          );
        }
      }
      pos = line.to + 1;
    }
  }

  return Decoration.set(widgets, true);
}

export const rainbowIndentExtension = ViewPlugin.fromClass(
  class {
    decorations: DecorationSet;
    constructor(view: EditorView) {
      this.decorations = buildIndentDecorations(view);
    }
    update(update: ViewUpdate) {
      if (update.docChanged || update.viewportChanged) {
        this.decorations = buildIndentDecorations(update.view);
      }
    }
  },
  {
    decorations: (v) => v.decorations,
  },
);
