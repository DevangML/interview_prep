import type { ConceptNode } from '../store/types';

interface Props {
  prevConcept: ConceptNode | null;
  nextConcept: ConceptNode | null;
  onSelect: (id: string) => void;
}

export const StageConceptNav = ({ prevConcept, nextConcept, onSelect }: Props) => {
  return (
    <div className="pt-6 mt-2 flex items-center justify-between gap-3 border-t border-surface-border font-chrome">
      {prevConcept ? (
        <button
          type="button"
          onClick={() => onSelect(prevConcept.id)}
          className="px-3 py-2 rounded-lg border border-surface-border bg-surface-card hover:border-axis text-xs font-semibold text-ink-1 cursor-pointer transition-colors"
        >
          &larr; {prevConcept.label}
        </button>
      ) : (
        <span className="text-xs text-ink-3">Start of stage</span>
      )}
      {nextConcept ? (
        <button
          type="button"
          onClick={() => onSelect(nextConcept.id)}
          className="px-3 py-2 rounded-lg border border-surface-border bg-surface-card hover:border-axis text-xs font-semibold text-ink-1 cursor-pointer transition-colors"
        >
          {nextConcept.label} &rarr;
        </button>
      ) : (
        <span className="text-xs text-ink-3">End of stage</span>
      )}
    </div>
  );
};
