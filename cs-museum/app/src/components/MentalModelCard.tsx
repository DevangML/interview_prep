import type { MentalModel } from '../store/types';

interface Props {
  mentalModel: MentalModel;
  language: string;
}

export const MentalModelCard = ({ mentalModel, language }: Props) => {
  if (!mentalModel) return null;

  return (
    <div className="rounded-2xl border border-purple-500/30 bg-purple-500/5 p-5 space-y-4 font-chrome">
      <div className="flex items-center gap-2">
        <span className="text-base">🧠</span>
        <div>
          <h4 className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold">
            Mental Model Shift · Thinking in {language}
          </h4>
          <p className="text-xs text-ink-2 mt-0.5">
            Internalize the conceptual paradigm to write idiomatic code.
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-3 text-xs">
        <div className="animate-spring-card p-3.5 rounded-xl border border-surface-border bg-surface-card space-y-1 hover:border-cyan-500/40">
          <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block">
            Core Metaphor
          </span>
          <p className="font-prose text-xs text-ink-1 leading-relaxed">
            {mentalModel.coreMetaphor}
          </p>
        </div>

        <div className="animate-spring-card p-3.5 rounded-xl border border-surface-border bg-surface-card space-y-1 hover:border-emerald-500/40">
          <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
            Cognitive Shift
          </span>
          <p className="font-prose text-xs text-ink-1 leading-relaxed">
            {mentalModel.cognitiveShift}
          </p>
        </div>

        <div className="animate-spring-card p-3.5 rounded-xl border border-surface-border bg-surface-card space-y-1 hover:border-pink-500/40">
          <span className="text-[10px] font-mono uppercase tracking-wider text-pink-400 font-bold block">
            Anti-Pattern to Unlearn
          </span>
          <p className="font-prose text-xs text-ink-1 leading-relaxed">
            {mentalModel.antiPatternToUnlearn}
          </p>
        </div>
      </div>
    </div>
  );
};
