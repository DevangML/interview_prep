
interface SiblingPivotLinkProps {
  languages: string[];
  activeLanguage: string | null;
  onSelect: (lang: string) => void;
}

export const SiblingPivotLink = ({
  languages,
  activeLanguage,
  onSelect,
}: SiblingPivotLinkProps) => {
  if (languages.length <= 1) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 py-3 border-b border-surface-border mb-6">
      <span className="text-xs font-chrome text-ink-3 uppercase tracking-wider font-semibold mr-1">
        Cross-Language Siblings:
      </span>
      {languages.map((lang) => {
        const isSelected = lang === activeLanguage;
        return (
          <button
            key={lang}
            onClick={() => onSelect(lang)}
            className={`px-3 py-1 rounded-full text-xs font-artifact transition-all cursor-pointer border ${
              isSelected
                ? 'bg-surface-raised text-ink-1 border-surface-border-strong font-bold shadow-xs'
                : 'bg-surface-card text-ink-2 border-surface-border hover:border-surface-border-strong hover:text-ink-1'
            }`}
            aria-pressed={isSelected}
            aria-label={`Pivot to ${lang} implementation`}
          >
            {lang}
          </button>
        );
      })}
    </div>
  );
};
