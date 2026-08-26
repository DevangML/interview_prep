import { BookOpen, Ban, MapPin } from 'lucide-react';
import type { LearnTopic } from '../../data/learn';
import type { ConceptEdge } from '../../data/projects/coverage';
import { EDGE_STYLE, EXEMPT_STYLE, areaColor } from './graphTheme';

interface Props {
  topic: LearnTopic;
  edge?: ConceptEdge;
  exemption?: { reason: string };
  drills: number;
  mcqs: number;
  onOpenTopic?: (id: string) => void;
}

/** The panel that answers "why does this project touch this concept?". */
export default function GraphDetail({ topic, edge, exemption, drills, mcqs, onOpenTopic }: Props) {
  const style = edge ? EDGE_STYLE[edge.kind] : null;
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/80 overflow-hidden">
      <div className="px-3 py-2 border-b border-slate-800 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full shrink-0" style={{ background: areaColor(topic.area) }} />
        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">{topic.area} · {topic.group}</span>
      </div>

      <div className="p-3 space-y-2.5">
        <h4 className="text-xs font-bold text-white leading-snug">{topic.title}</h4>

        {edge && style && (
          <div className="rounded-lg border p-2.5 space-y-1.5" style={{ borderColor: `${style.stroke}55`, background: `${style.stroke}12` }}>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: style.stroke }}>{style.label}</span>
              <span className="flex items-center gap-1 text-[10px] font-mono text-slate-400">
                <MapPin size={9} /> {edge.where}
              </span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-200">{edge.why}</p>
          </div>
        )}

        {exemption && (
          <div className="rounded-lg border border-slate-700 bg-slate-900/60 p-2.5 space-y-1.5">
            <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              <Ban size={10} /> {EXEMPT_STYLE.label}
            </span>
            <p className="text-[11px] leading-relaxed text-slate-300">{exemption.reason}</p>
          </div>
        )}

        <p className="text-[11px] leading-relaxed text-slate-400">{topic.summary}</p>

        <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 pt-0.5">
          <span>{topic.minutes} min read</span>
          <span>·</span>
          <span>{drills} drills</span>
          <span>·</span>
          <span>{mcqs} MCQs</span>
          <span>·</span>
          <span>{topic.resources.length} sources</span>
        </div>

        {onOpenTopic && (
          <button
            onClick={() => onOpenTopic(topic.id)}
            className="w-full mt-1 px-2.5 py-1.5 rounded-lg bg-sky-600/20 hover:bg-sky-600/30 border border-sky-500/40 text-sky-300 text-[11px] font-bold flex items-center justify-center gap-1.5 transition"
          >
            <BookOpen size={11} /> Read this concept
          </button>
        )}
      </div>
    </div>
  );
}
