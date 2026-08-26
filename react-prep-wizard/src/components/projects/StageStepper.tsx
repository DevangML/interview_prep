import type { PedagogicalStage } from '../../data/projects/types';
import { AlertTriangle, Lightbulb } from 'lucide-react';

interface Props {
  stages: PedagogicalStage[];
  index: number;
  onSelect: (i: number) => void;
}

const TONE = [
  'text-cyan-300 border-cyan-500/50 bg-cyan-950/40',
  'text-rose-300 border-rose-500/50 bg-rose-950/40',
  'text-emerald-300 border-emerald-500/50 bg-emerald-950/40',
  'text-violet-300 border-violet-500/50 bg-violet-950/40',
];

/**
 * The stages are a narrative, so they read as a path rather than a tab row:
 * the naive version, the failure it produces, then the version that holds.
 */
export default function StageStepper({ stages, index, onSelect }: Props) {
  const stage = stages[index];
  const tone = TONE[index % TONE.length];

  return (
    <div className="space-y-3">
      <ol className="flex items-stretch gap-1 overflow-x-auto custom-scrollbar pb-1">
        {stages.map((st, i) => (
          <li key={st.stageNumber} className="flex-1 min-w-[7.5rem]">
            <button
              onClick={() => onSelect(i)}
              aria-current={i === index ? 'step' : undefined}
              className={`w-full h-full p-2 rounded-lg border text-left transition ${
                i === index ? TONE[i % TONE.length] : 'border-transparent text-slate-400 hover:bg-white/5'
              }`}
            >
              <span className="block text-[9px] font-mono uppercase tracking-wider opacity-70">
                Step {st.stageNumber}
              </span>
              <span className="block text-[11px] font-semibold leading-tight mt-0.5 line-clamp-2">
                {st.stageName}
              </span>
            </button>
          </li>
        ))}
      </ol>

      <div className={`rounded-xl border p-3 space-y-3 ${tone.replace(/text-\S+/, 'text-slate-200')}`}>
        <p className="text-[11px] font-mono uppercase tracking-wider opacity-70">{stage.focus}</p>

        <pre className="text-[11px] leading-relaxed bg-slate-950/80 border border-white/10 rounded-lg p-3 overflow-x-auto custom-scrollbar font-mono text-sky-200">
          <code>{stage.codeSnippet}</code>
        </pre>

        <div className="space-y-2">
          <p className="flex gap-2 text-[11px] leading-relaxed text-rose-200">
            <AlertTriangle size={13} className="mt-px shrink-0 text-rose-400" />
            <span>{stage.failureModeOrInvariant}</span>
          </p>
          <p className="flex gap-2 text-[11px] leading-relaxed text-slate-300">
            <Lightbulb size={13} className="mt-px shrink-0 text-amber-400" />
            <span>{stage.architecturalLesson}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
