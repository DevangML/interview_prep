import { StateEffect, StateField, RangeSetBuilder } from '@codemirror/state';
import { Decoration, EditorView, hoverTooltip, gutter, GutterMarker } from '@codemirror/view';
import type { DecorationSet, Tooltip } from '@codemirror/view';
import type { AnchoredFinding } from '../../../lib/anchorFindings';

/**
 * The AI's verdict, rendered where the mistake is.
 *
 * The Socratic engine already produced three levels of hint; they were printed
 * in a side panel, which means the reader had to carry a sentence like "the
 * deviation is in your second assignment" back to the code and re-find it by
 * eye. The knowledge was there and the *location* was thrown away.
 *
 * Here the finding is a range in the document: the line is tinted, the exact
 * span underlined, the gutter marked, and hovering opens the hints **one at a
 * time**. Progressive on purpose — the same rule the briefing follows. A hint
 * you are given teaches nothing; a hint you decide to spend does.
 */

export const setAiFindings = StateEffect.define<AnchoredFinding[]>();
export const clearAiFindings = StateEffect.define<null>();

/** How many hint levels the reader has opened, per finding index. */
const revealed = new Map<number, number>();

export const aiFindingsField = StateField.define<AnchoredFinding[]>({
  create: () => [],
  update(value, tr) {
    for (const e of tr.effects) {
      if (e.is(setAiFindings)) { revealed.clear(); return e.value; }
      if (e.is(clearAiFindings)) { revealed.clear(); return []; }
    }
    // An edit invalidates the coordinates: the reader is fixing it, so the
    // marks go rather than drift onto text they no longer describe.
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
  // Line decorations must be added in document order alongside the marks.
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

/**
 * Renders the hint stack into an existing container.
 *
 * In place, deliberately: CodeMirror creates a hover tooltip's DOM once per
 * hover and caches it, so asking the view to re-render (an empty dispatch) does
 * nothing — the reveal button appeared to do nothing at all. The tooltip owns
 * its own DOM, so the tooltip updates its own DOM.
 */
function renderTooltip(dom: HTMLElement, f: AnchoredFinding, index: number): void {
  const level = revealed.get(index) ?? 1;
  dom.textContent = '';
  dom.className = 'cm-ai-tooltip';

  const badge = f.severity === 'bug' ? 'Defect' : f.severity === 'missing' ? 'Missing' : 'Smell';
  const steps: { label: string; text: string }[] = [
    { label: 'Concept', text: f.concept },
    { label: 'Where to look', text: f.hint },
    { label: 'How to fix it', text: f.fix },
  ];

  const header = document.createElement('div');
  header.className = 'cm-ai-tooltip-head';
  header.textContent = `${badge} · line ${f.line}${f.endLine !== f.line ? `–${f.endLine}` : ''} · hint ${level}/${steps.length}`;
  dom.appendChild(header);

  for (const step of steps.slice(0, level)) {
    const row = document.createElement('div');
    row.className = 'cm-ai-tooltip-step';
    const label = document.createElement('span');
    label.className = 'cm-ai-tooltip-label';
    label.textContent = step.label;
    const body = document.createElement('p');
    body.textContent = step.text;
    row.append(label, body);
    dom.appendChild(row);
  }

  if (level < steps.length) {
    const more = document.createElement('button');
    more.className = 'cm-ai-tooltip-more';
    more.textContent = level === 1 ? 'Show me where to look' : 'Show me how to fix it';
    more.onmousedown = (e) => {
      e.preventDefault();
      e.stopPropagation();
      revealed.set(index, level + 1);
      renderTooltip(dom, f, index);
    };
    dom.appendChild(more);
  } else {
    const note = document.createElement('p');
    note.className = 'cm-ai-tooltip-note';
    note.textContent =
      f.strategy === 'exact'
        ? 'Located by exact match in your code.'
        : `Located by ${f.strategy} match — the span may be approximate.`;
    dom.appendChild(note);
  }
}

const findingTooltip = hoverTooltip((view, pos): Tooltip | null => {
  const findings = view.state.field(aiFindingsField, false) ?? [];
  const index = findings.findIndex((f) => pos >= f.from && pos <= f.to);
  if (index === -1) return null;
  const f = findings[index];
  return {
    pos: f.from,
    end: f.to,
    above: true,
    create: () => {
      const dom = document.createElement('div');
      renderTooltip(dom, f, index);
      return { dom };
    },
  };
}, { hoverTime: 80 });

const theme = EditorView.baseTheme({
  '.cm-ai-line': { transition: 'background-color 120ms ease' },
  '.cm-ai-bug-line': { backgroundColor: 'rgba(239,68,68,0.10)' },
  '.cm-ai-smell-line': { backgroundColor: 'rgba(245,158,11,0.10)' },
  '.cm-ai-missing-line': { backgroundColor: 'rgba(14,165,233,0.10)' },

  '.cm-ai-mark': { borderRadius: '2px', cursor: 'help' },
  '.cm-ai-bug': { backgroundColor: 'rgba(239,68,68,0.22)', boxShadow: 'inset 0 -2px 0 0 #ef4444' },
  '.cm-ai-smell': { backgroundColor: 'rgba(245,158,11,0.22)', boxShadow: 'inset 0 -2px 0 0 #f59e0b' },
  '.cm-ai-missing': { backgroundColor: 'rgba(14,165,233,0.20)', boxShadow: 'inset 0 -2px 0 0 #0ea5e9' },

  '.cm-ai-gutter-lane': { width: '1.1em' },
  '.cm-ai-gutter': {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    width: '100%', fontWeight: '700', fontSize: '11px', lineHeight: '1',
  },
  '.cm-ai-gutter-bug': { color: '#ef4444' },
  '.cm-ai-gutter-smell': { color: '#f59e0b' },
  '.cm-ai-gutter-missing': { color: '#0ea5e9' },

  '.cm-ai-tooltip': {
    maxWidth: '22rem', padding: '10px 12px', borderRadius: '10px',
    background: '#0f172a', color: '#e2e8f0',
    boxShadow: '0 10px 30px rgba(2,6,23,0.35)', border: '1px solid #1e293b',
    font: '12px/1.5 ui-sans-serif, system-ui',
  },
  '.cm-ai-tooltip-head': {
    fontSize: '10px', fontWeight: '700', letterSpacing: '0.06em',
    textTransform: 'uppercase', color: '#94a3b8', marginBottom: '6px',
  },
  '.cm-ai-tooltip-step': { marginBottom: '8px' },
  '.cm-ai-tooltip-label': {
    display: 'block', fontSize: '9px', fontWeight: '700', letterSpacing: '0.08em',
    textTransform: 'uppercase', color: '#38bdf8', marginBottom: '2px',
  },
  '.cm-ai-tooltip-step p': { margin: '0' },
  '.cm-ai-tooltip-more': {
    marginTop: '2px', padding: '4px 8px', borderRadius: '6px', cursor: 'pointer',
    background: '#1e293b', color: '#e2e8f0', border: '1px solid #334155',
    font: '600 11px ui-sans-serif, system-ui',
  },
  '.cm-ai-tooltip-note': { margin: '2px 0 0', fontSize: '10px', color: '#64748b' },
});

export function aiDiagnostics() {
  return [aiFindingsField, decorations, findingGutter, findingTooltip, theme];
}
