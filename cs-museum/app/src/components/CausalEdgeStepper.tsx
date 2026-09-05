import { useMuseumStore } from '../store/useMuseumStore';
import { getConceptCausalEdges } from '../lib/causalTreeEngine';

interface CausalEdgeStepperProps {
  conceptId: string;
}

export const CausalEdgeStepper = ({ conceptId }: CausalEdgeStepperProps) => {
  const { programmingNodes, programmingEdges, selectConcept, activeLanguage } = useMuseumStore();

  const { downstream, upstream } = getConceptCausalEdges(
    conceptId,
    programmingNodes,
    programmingEdges
  );

  const prev = downstream[0];
  const next = upstream[0];

  if (!prev && !next) return null;

  return (
    <nav
      aria-label="Causal dependency chain"
      className="rounded-xl border border-surface-border bg-surface-card/90 backdrop-blur-xs p-2.5 flex items-center justify-between gap-3 text-xs font-chrome shadow-xs"
    >
      {/* Downstream Dependency (Depends On) */}
      <div className="flex-1 min-w-0">
        {prev ? (
          <button
            type="button"
            onClick={() => selectConcept(prev.conceptId, activeLanguage || undefined)}
            className="animate-spring-press text-left group cursor-pointer flex items-center gap-2 p-1.5 rounded-lg hover:bg-surface-raised transition-all w-full"
            title={`Builds upon: ${prev.relation}`}
          >
            <span className="w-5 h-5 rounded-md bg-cyan-500/10 text-cyan-400 font-mono font-bold text-[10px] flex items-center justify-center shrink-0 border border-cyan-500/20">
              ▼
            </span>
            <div className="min-w-0">
              <span className="text-[9px] font-mono text-ink-3 uppercase block leading-none">
                L{prev.stageNumber} ({prev.stageTag}) · Depends on
              </span>
              <span className="font-semibold text-xs text-ink-1 group-hover:text-axis transition-colors truncate block">
                {prev.conceptLabel}
              </span>
            </div>
          </button>
        ) : (
          <span className="text-[10px] font-mono text-ink-3/60 italic pl-2">
            Bedrock terminal invariant
          </span>
        )}
      </div>

      <div className="w-px h-6 bg-surface-border shrink-0" />

      {/* Upstream Superstructure (Empowers) */}
      <div className="flex-1 min-w-0 text-right">
        {next ? (
          <button
            type="button"
            onClick={() => selectConcept(next.conceptId, activeLanguage || undefined)}
            className="animate-spring-press text-right group cursor-pointer flex items-center justify-end gap-2 p-1.5 rounded-lg hover:bg-surface-raised transition-all w-full ml-auto"
            title={`Empowers: ${next.relation}`}
          >
            <div className="min-w-0 text-right">
              <span className="text-[9px] font-mono text-ink-3 uppercase block leading-none">
                Empowers · L{next.stageNumber} ({next.stageTag})
              </span>
              <span className="font-semibold text-xs text-ink-1 group-hover:text-axis transition-colors truncate block">
                {next.conceptLabel}
              </span>
            </div>
            <span className="w-5 h-5 rounded-md bg-purple-500/10 text-purple-400 font-mono font-bold text-[10px] flex items-center justify-center shrink-0 border border-purple-500/20">
              ▲
            </span>
          </button>
        ) : (
          <span className="text-[10px] font-mono text-ink-3/60 italic pr-2">
            Top-tier abstraction plane
          </span>
        )}
      </div>
    </nav>
  );
};
