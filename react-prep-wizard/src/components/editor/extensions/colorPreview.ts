import { ViewPlugin, Decoration, WidgetType } from '@codemirror/view';
import type { EditorView, ViewUpdate, DecorationSet } from '@codemirror/view';

class ColorWidget extends WidgetType {
  constructor(readonly color: string) {
    super();
  }
  toDOM() {
    const wrap = document.createElement('span');
    wrap.className = 'cm-color-swatch-wrap';
    wrap.style.display = 'inline-block';
    wrap.style.verticalAlign = 'middle';
    wrap.style.marginRight = '4px';
    wrap.style.width = '12px';
    wrap.style.height = '12px';
    wrap.style.borderRadius = '3px';
    wrap.style.border = '1px solid rgba(0,0,0,0.2)';
    wrap.style.backgroundColor = this.color;
    wrap.style.boxShadow = '0 0 2px rgba(0,0,0,0.3)';
    return wrap;
  }
  ignoreEvent() {
    return true;
  }
}

const COLOR_RE = /#(?:[0-9a-fA-F]{3,4}){1,2}\b|rgba?\([^)]+\)|hsla?\([^)]+\)|oklch\([^)]+\)|color\(display-p3[^)]+\)/g;

function buildColorDecorations(view: EditorView): DecorationSet {
  const widgets: any[] = [];
  for (const { from, to } of view.visibleRanges) {
    const text = view.state.doc.sliceString(from, to);
    COLOR_RE.lastIndex = 0;
    let match;
    while ((match = COLOR_RE.exec(text)) !== null) {
      const matchFrom = from + match.index;
      const colorStr = match[0];
      widgets.push(
        Decoration.widget({
          widget: new ColorWidget(colorStr),
          side: -1,
        }).range(matchFrom),
      );
    }
  }
  return Decoration.set(widgets, true);
}

export const colorPreviewExtension = ViewPlugin.fromClass(
  class {
    decorations: DecorationSet;
    constructor(view: EditorView) {
      this.decorations = buildColorDecorations(view);
    }
    update(update: ViewUpdate) {
      if (update.docChanged || update.viewportChanged) {
        this.decorations = buildColorDecorations(update.view);
      }
    }
  },
  {
    decorations: (v) => v.decorations,
  },
);
