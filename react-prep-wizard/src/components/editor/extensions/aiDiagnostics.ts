import { StateEffect, StateField, RangeSetBuilder } from '@codemirror/state';
import { Decoration, EditorView, hoverTooltip, gutter, GutterMarker } from '@codemirror/view';
import type { Tooltip } from '@codemirror/view';
import type { AnchoredFinding } from '../../../lib/anchorFindings';
import { renderFindingTooltip } from './diagnostics/tooltipRenderer';

export const setAiFindings = StateEffect.define<AnchoredFinding[]>();
export const clearAiFindings = StateEffect.define<null>();

const revealed = new Map<number, number>();

export const aiFindingsField = StateField.define<AnchoredFinding[]>({
  create: () => [],
  update(value, tr) {
    for (const e of tr.effects) {
      if (e.is(setAiFindings)) { revealed.clear(); return e.value; }
      if (e.is(clearAiFindings)) { revealed.clear(); return []; }
    }
    if (tr.docChanged && value.length) { revealed.clear(); return []; }
    return value;
  },
});

const SEVERITY_CLASS: Record<AnchoredFinding['severity'], string> = {
  bug: 'cm-ai-bug',
  smell: 'cm-ai-smell',
  missing: 'cm-ai-missing',
};

class FindingGutterMarker extends GutterMarker {
  constructor(private severity: AnchoredFinding['severity']) { super(); }
  toDOM() {
    const el = document.createElement('span');
    el.className = `cm-ai-gutter cm-ai-gutter-${this.severity}`;
    el.textContent = this.severity === 'missing' ? '+' : '!';
    el.title = 'AI finding — hover the highlighted code';
    return el;
  }
}

const decorations = EditorView.decorations.compute([aiFindingsField], (state) => {
  const findings = state.field(aiFindingsField);
  if (findings.length === 0) return Decoration.none;

  const builder = new RangeSetBuilder<Decoration>();
  const entries: { from: number; to: number; deco: Decoration }[] = [];

  for (const f of findings) {
    const startLine = state.doc.lineAt(Math.min(f.from, state.doc.length));
    entries.push({
      from: startLine.from,
      to: startLine.from,
      deco: Decoration.line({ class: `cm-ai-line ${SEVERITY_CLASS[f.severity]}-line` }),
    });
    if (f.to > f.from) {
      entries.push({
        from: f.from,
        to: Math.min(f.to, state.doc.length),
        deco: Decoration.mark({ class: `cm-ai-mark ${SEVERITY_CLASS[f.severity]}` }),
      });
    }
  }

  entries.sort((a, b) => a.from - b.from || (a.to - a.from) - (b.to - b.from));
  for (const e of entries) builder.add(e.from, e.to, e.deco);
  return builder.finish();
});

const findingGutter = gutter({
  class: 'cm-ai-gutter-lane',
  lineMarker(view, line) {
    const findings = view.state.field(aiFindingsField, false) ?? [];
    for (const f of findings) {
      if (f.from >= line.from && f.from <= line.to) return new FindingGutterMarker(f.severity);
    }
    return null;
  },
  initialSpacer: () => new FindingGutterMarker('bug'),
});

const findingTooltip = hoverTooltip((view, pos): Tooltip | null => {
  const findings = view.state.field(aiFindingsField, false) ?? [];
  for (let i = 0; i < findings.length; i++) {
    const f = findings[i];
    if (pos >= f.from && pos <= f.to) {
      return {
        pos: f.from,
        end: f.to,
        above: true,
        create() {
          return { dom: renderFindingTooltip(f, i, revealed) };
        },
      };
    }
  }
  return null;
});

export function aiDiagnosticsExtension() {
  return [aiFindingsField, decorations, findingGutter, findingTooltip];
}
