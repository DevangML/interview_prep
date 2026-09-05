import type { ConceptNode } from '../store/useMuseumStore';
import { useMuseumStore } from '../store/useMuseumStore';

interface UnverifiedStateProps {
  concept: ConceptNode;
  requestedLanguage: string | null;
}

export const UnverifiedState = ({ concept, requestedLanguage }: UnverifiedStateProps) => {
  const { selectLanguage } = useMuseumStore();
  const availableLangs = concept.details?.byLanguage?.map((l) => l.lang) || [];

  return (
    <div className="p-6 sm:p-8 rounded-2xl border-2 border-dashed border-coverage-unverified/50 bg-coverage-unverified/5 my-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-3 h-3 rounded-full border-2 border-coverage-unverified inline-block" />
        <span className="text-xs font-mono uppercase tracking-widest font-bold text-coverage-unverified">
          Unverified Language Implementation
        </span>
      </div>

      <h3 className="font-chrome font-semibold text-base text-ink-1 mb-2">
        {requestedLanguage ? `"${requestedLanguage}"` : 'This Language'} implementation is unverified in this release.
      </h3>

      <p className="font-prose text-sm text-ink-2 leading-relaxed mb-6">
        Per the release completeness contract (11 first-class, 21 partial, 5,168 unknown cells),
        we do not generate or hallucinate synthetic filler. What is known about the underlying concept
        is presented above, while this language's exact syntax and mechanics remain in the research frontier.
      </p>

      {availableLangs.length > 0 && (
        <div className="pt-4 border-t border-surface-border">
          <div className="text-xs font-chrome text-ink-3 uppercase tracking-wider mb-2 font-semibold">
            Pivot to verified implementations for "{concept.label}":
          </div>
          <div className="flex flex-wrap gap-2">
            {availableLangs.map((lang) => (
              <button
                key={lang}
                onClick={() => selectLanguage(lang)}
                className="px-3 py-1.5 rounded-lg text-xs font-artifact bg-surface-card border border-surface-border hover:border-axis text-ink-1 transition-all cursor-pointer font-medium"
              >
                {lang} &rarr;
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
