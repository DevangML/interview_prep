import type { EdgeKind } from '../../data/projects/coverage';
import { EDGE_STYLE, EXEMPT_STYLE } from './graphTheme';

interface Props {
  counts: Record<EdgeKind, number> & { exempt: number };
  active: Set<string>;
  onToggle: (kind: string) => void;
}

const KINDS: EdgeKind[] = ['explicit', 'implicit', 'counterexample'];

/** Legend and filter in one control — clicking a row hides that edge kind. */
export default function GraphLegend({ counts, active, onToggle }: Props) {
  const row = (key: string, stroke: string, dash: string | undefined, label: string, blurb: string, n: number) => {
    const on = active.has(key);
    return (
      <button
        key={key}
        onClick={() => onToggle(key)}
        title={blurb}
        className={`w-full flex items-start gap-2 px-2 py-1.5 rounded-lg text-left transition ${
          on ? 'bg-slate-800/70' : 'opacity-40 hover:opacity-70'
        }`}
      >
        <svg width="22" height="12" className="mt-0.5 shrink-0" aria-hidden>
          <line x1="1" y1="6" x2="21" y2="6" stroke={stroke} strokeWidth="2" strokeDasharray={dash} strokeLinecap="round" />
        </svg>
        <span className="min-w-0 flex-1">
          <span className="block text-[11px] font-bold text-slate-200 leading-tight">{label}</span>
          <span className="block text-[10px] text-slate-400 leading-snug">{blurb}</span>
        </span>
        <span className="text-[10px] font-mono text-slate-400 shrink-0 mt-0.5">{n}</span>
      </button>
    );
  };

  return (
    <div className="space-y-0.5">
      {KINDS.map((k) => row(k, EDGE_STYLE[k].stroke, EDGE_STYLE[k].dash, EDGE_STYLE[k].label, EDGE_STYLE[k].blurb, counts[k]))}
      {row('exempt', EXEMPT_STYLE.stroke, '3 3', EXEMPT_STYLE.label, EXEMPT_STYLE.blurb, counts.exempt)}
    </div>
  );
}
