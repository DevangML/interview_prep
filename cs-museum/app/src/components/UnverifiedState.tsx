import type { ConceptNode } from '../store/useMuseumStore';
import { useMuseumStore } from '../store/useMuseumStore';
import { coverageOf, verifiedCells } from '../lib/langCells';

interface UnverifiedStateProps {
  concept: ConceptNode;
  requestedLanguage: string | null;
}

export const UnverifiedState = ({ concept, requestedLanguage }: UnverifiedStateProps) => {
  const { selectLanguage } = useMuseumStore();
  const cells = concept.details?.byLanguage || [];
  const current = cells.find(
    (c) => c.langId === requestedLanguage || c.lang === requestedLanguage,
  );
  const cov = coverageOf(current);
  const readable = verifiedCells(cells);
  const absent = cov === 'absent_by_design';

  return (
    <div className="p-6 sm:p-8 rounded-2xl border-2 border-dashed border-coverage-unverified/50 bg-coverage-unverified/5 my-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-3 h-3 rounded-full border-2 border-coverage-unverified inline-block" />
        <span className="text-xs font-mono uppercase tracking-widest font-bold text-coverage-unverified">
          {absent ? 'Absent by design' : 'Unverified language cell'}
        </span>
      </div>

      <h3 className="font-chrome font-semibold text-base text-ink-1 mb-2">
        {requestedLanguage ? `${requestedLanguage}` : 'This language'}{' '}
        {absent ? 'does not implement this concept' : 'is not authored for this concept yet'}
      </h3>

      <p className="font-prose text-sm text-ink-2 leading-relaxed mb-6">
        {absent
          ? current?.absentReason ||
            'This language has no heap, thread, or type mechanism here. The gap is a fact of the language, not missing research.'
          : 'The 2026 job catalog includes this language so it is visible. We do not generate filler. Add a cell at corpus/authored/cells/<langId>/<conceptId>.json to verify it.'}
      </p>

      {readable.length > 0 && (
        <div className="pt-4 border-t border-surface-border">
          <div className="text-xs font-chrome text-ink-3 uppercase tracking-wider mb-2 font-semibold">
            Pivot to verified implementations
          </div>
          <div className="flex flex-wrap gap-2">
            {readable.map((cell) => (
              <button
                key={`${cell.langId}:${cell.variant || ''}`}
                type="button"
                onClick={() => selectLanguage(cell.langId || cell.lang)}
                className="px-3 py-1.5 rounded-lg text-xs font-artifact bg-surface-card border border-surface-border hover:border-axis text-ink-1 cursor-pointer font-medium"
              >
                {cell.lang} →
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
