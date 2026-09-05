import { useMuseumStore } from '../store/useMuseumStore';
import { getStageCausality } from '../lib/csDependencies';
import { getStageById } from '../lib/stages';

interface Props {
  stageId: string;
}

export const CausalDependencyBridge = ({ stageId }: Props) => {
  const { selectStage } = useMuseumStore();
  const causality = getStageCausality(stageId);
  const currentStage = getStageById(stageId);

  if (causality.buildsUpon.length === 0 && causality.empowers.length === 0) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-surface-border bg-surface-card p-5 space-y-4 font-chrome shadow-xs">
      <div className="flex items-center justify-between pb-2 border-b border-surface-border">
        <div>
          <h3 className="text-sm font-bold text-ink-1">
            Causal Dependency Continuum
          </h3>
          <p className="text-xs text-ink-3 font-prose">
            Computer science is a continuous chain: abstractions build upon physical foundations and empower superstructures.
          </p>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-surface-raised border border-surface-border text-ink-3 font-bold">
          {currentStage?.layerTag || 'STAGE'}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 1. Builds Upon (Foundations Below) */}
        <div className="p-4 rounded-xl border border-surface-border/80 bg-surface-raised/40 space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
            <span>&darr;</span>
            <span>Builds Upon Below ({causality.buildsUpon.length})</span>
          </div>

          {causality.buildsUpon.length === 0 ? (
            <p className="text-xs text-ink-3 font-prose italic">
              Absolute Physical Bedrock — no lower software or architectural layer.
            </p>
          ) : (
            <div className="space-y-2">
              {causality.buildsUpon.map((link) => (
                <button
                  key={link.targetId}
                  type="button"
                  onClick={() => selectStage(link.targetId)}
                  className="animate-spring-press w-full text-left p-3 rounded-lg border border-surface-border bg-surface-card hover:border-axis/60 hover:bg-surface-raised transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-ink-1 group-hover:text-axis transition-colors">
                      {link.targetLabel}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-surface-raised text-ink-3">
                      {link.layerTag}
                    </span>
                  </div>
                  <p className="text-[11px] text-ink-2 font-prose leading-relaxed">
                    {link.relationship}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 2. Empowers (Abstractions Above) */}
        <div className="p-4 rounded-xl border border-surface-border/80 bg-surface-raised/40 space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-400 uppercase tracking-wider">
            <span>&uarr;</span>
            <span>Empowers Above ({causality.empowers.length})</span>
          </div>

          {causality.empowers.length === 0 ? (
            <p className="text-xs text-ink-3 font-prose italic">
              Highest Human Plane — no higher abstraction layer in the computing stack.
            </p>
          ) : (
            <div className="space-y-2">
              {causality.empowers.map((link) => (
                <button
                  key={link.targetId}
                  type="button"
                  onClick={() => selectStage(link.targetId)}
                  className="animate-spring-press w-full text-left p-3 rounded-lg border border-surface-border bg-surface-card hover:border-axis/60 hover:bg-surface-raised transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-ink-1 group-hover:text-axis transition-colors">
                      {link.targetLabel}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-surface-raised text-ink-3">
                      {link.layerTag}
                    </span>
                  </div>
                  <p className="text-[11px] text-ink-2 font-prose leading-relaxed">
                    {link.relationship}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
