import type { LangImpl } from '../store/types';
import { coverageOf } from '../lib/langCells';

interface SiblingPivotLinkProps {
  cells: LangImpl[];
  activeLanguage: string | null;
  onSelect: (lang: string | null) => void;
}

export const SiblingPivotLink = ({
  cells,
  activeLanguage,
  onSelect,
}: SiblingPivotLinkProps) => {
  const readable = cells.filter((c) => {
    const cov = coverageOf(c);
    return cov === 'verified' || cov === 'partial';
  });
  const rest = cells.length - readable.length;

  return (
    <div className="py-3 border-b border-surface-border mb-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-chrome text-ink-3 uppercase tracking-wider font-semibold mr-1">
          Study Level:
        </span>

        {/* Language-Agnostic Concept Abstract & Masterclass Button */}
        <button
          type="button"
          onClick={() => onSelect(null)}
          className={`px-3 py-1 rounded-full text-xs font-artifact transition-all cursor-pointer border flex items-center gap-1.5 ${
            activeLanguage === null
              ? 'bg-amber-500/10 text-amber-400 border-amber-500/40 font-bold shadow-xs'
              : 'bg-surface-card text-ink-2 border-surface-border hover:border-surface-border-strong hover:text-ink-1'
          }`}
          aria-pressed={activeLanguage === null}
          aria-label="View canonical concept abstract and video masterclass"
        >
          <span>💎</span>
          <span>Concept Abstract & Lecture</span>
        </button>

        {readable.map((cell) => {
          const key = cell.langId || cell.lang;
          const isSelected = key === activeLanguage || cell.lang === activeLanguage;
          return (
            <button
              key={`${key}:${cell.variant || ''}`}
              type="button"
              onClick={() => onSelect(cell.langId || cell.lang)}
              className={`px-3 py-1 rounded-full text-xs font-artifact transition-all cursor-pointer border ${
                isSelected
                  ? 'bg-surface-raised text-ink-1 border-surface-border-strong font-bold shadow-xs'
                  : 'bg-surface-card text-ink-2 border-surface-border hover:border-surface-border-strong hover:text-ink-1'
              }`}
              aria-pressed={isSelected}
              aria-label={`Pivot to ${cell.lang} implementation`}
            >
              {cell.lang}
            </button>
          );
        })}
      </div>
      {rest > 0 && (
        <p className="text-[11px] font-mono text-ink-3 mt-2">
          +{rest} more job-catalog languages on Compare (unverified or absent-by-design — not hidden).
        </p>
      )}
    </div>
  );
};
