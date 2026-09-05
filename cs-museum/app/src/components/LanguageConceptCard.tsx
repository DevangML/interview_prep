import type { ConceptNode, LangImpl, Coverage } from '../store/types';

interface LanguageConceptCardProps {
  concept: ConceptNode;
  langId: string;
  cell: LangImpl | undefined;
  cov: Coverage;
  onSelect: (conceptId: string) => void;
  onCompare: (conceptId: string) => void;
}

export const LanguageConceptCard = ({
  concept,
  cell,
  cov,
  onSelect,
  onCompare,
}: LanguageConceptCardProps) => {
  const isVerified = cov === 'verified' || cov === 'partial';
  const isAbsent = cov === 'absent_by_design';

  return (
    <div className="rounded-xl border border-surface-border bg-surface-card p-4 space-y-3 hover:border-axis/50 transition-all shadow-xs">
      {/* Card Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-chrome font-bold text-sm text-ink-1">{concept.label}</h4>
            {concept.layerId && (
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-surface-raised border border-surface-border text-ink-3">
                {concept.layerId.replace('layer_', '')}
              </span>
            )}
          </div>
          <p className="font-prose text-xs text-ink-3 line-clamp-1 mt-0.5">
            {concept.details?.motivation || concept.details?.definition}
          </p>
        </div>

        <span
          className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border shrink-0 font-semibold ${
            isVerified
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
              : isAbsent
                ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                : 'bg-surface-raised text-ink-3 border-surface-border'
          }`}
        >
          {cov.replaceAll('_', ' ')}
        </span>
      </div>

      {/* Mechanism & Trade-offs */}
      {cell && (
        <div className="space-y-2 text-xs font-prose pt-1 border-t border-surface-border/60">
          {cell.mechanism && (
            <div>
              <span className="font-mono text-[10px] uppercase font-bold text-ink-3 block mb-0.5">
                Mechanism
              </span>
              <p className="text-ink-1 leading-relaxed">{cell.mechanism}</p>
            </div>
          )}

          {cell.why && (
            <div>
              <span className="font-mono text-[10px] uppercase font-bold text-ink-3 block mb-0.5">
                Design Rationale (Why)
              </span>
              <p className="text-ink-2 leading-relaxed">{cell.why}</p>
            </div>
          )}

          {cell.price && (
            <div>
              <span className="font-mono text-[10px] uppercase font-bold text-pink-400 block mb-0.5">
                Price Paid (Trade-Off)
              </span>
              <p className="text-pink-300 leading-relaxed bg-pink-500/5 p-2 rounded-lg border border-pink-500/20">
                {cell.price}
              </p>
            </div>
          )}

          {cell.absentReason && (
            <p className="text-ink-3 italic text-[11px]">
              Omitted by design: {cell.absentReason}
            </p>
          )}

          {cell.syntaxExample && (
            <div className="mt-2 p-2.5 rounded-lg bg-[#0d1117] text-emerald-400 font-mono text-[11px] overflow-x-auto border border-surface-border/40">
              <code>{cell.syntaxExample}</code>
            </div>
          )}
        </div>
      )}

      {/* Action Strip */}
      <div className="flex items-center justify-between pt-2 border-t border-surface-border text-xs font-mono">
        <button
          type="button"
          onClick={() => onSelect(concept.id)}
          className="text-axis hover:underline cursor-pointer flex items-center gap-1 font-semibold"
        >
          <span>Study in Field Manual</span>
          <span>&rarr;</span>
        </button>

        <button
          type="button"
          onClick={() => onCompare(concept.id)}
          className="text-ink-3 hover:text-ink-1 cursor-pointer"
        >
          Compare in Matrix ⊞
        </button>
      </div>
    </div>
  );
};
