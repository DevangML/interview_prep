import { useEffect, useState } from 'react';
import { useMuseumStore } from '../store/useMuseumStore';
import { SiblingPivotLink } from './SiblingPivotLink';
import { PriceTag } from './PriceTag';
import { EvidenceEnvelope } from './EvidenceEnvelope';
import { BedrockTrace } from './BedrockTrace';
import { UnverifiedState } from './UnverifiedState';

export const FieldManualReader = () => {
  const {
    getActiveConcept,
    activeLanguage,
    selectLanguage,
    programmingNodes,
    selectConcept,
  } = useMuseumStore();

  const concept = getActiveConcept();
  const [fadeState, setFadeState] = useState<'in' | 'out'>('in');

  useEffect(() => {
    // 150ms cross-fade on pivot
    setFadeState('out');
    const timer = setTimeout(() => setFadeState('in'), 150);
    return () => clearTimeout(timer);
  }, [activeLanguage, concept?.id]);

  if (!concept || !concept.details) return null;

  const { details } = concept;
  const byLangList = details.byLanguage || [];
  const currentLangImpl = byLangList.find((l) => l.lang === activeLanguage);
  const availableLangs = byLangList.map((l) => l.lang);

  // Find next concept in sequence
  const currentIdx = programmingNodes.findIndex((n) => n.id === concept.id);
  const nextConcept = currentIdx >= 0 && currentIdx < programmingNodes.length - 1
    ? programmingNodes[currentIdx + 1]
    : null;

  return (
    <article
      className="max-w-[1240px] mx-auto px-4 sm:px-6 py-6 font-chrome"
      aria-live="polite"
      aria-atomic="true"
    >
      {/* Sibling Pivot Bar */}
      <SiblingPivotLink
        languages={availableLangs}
        activeLanguage={activeLanguage}
        onSelect={(lang) => selectLanguage(lang)}
      />

      <div
        className={`transition-opacity duration-150 ${
          fadeState === 'in' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {!currentLangImpl ? (
          <UnverifiedState concept={concept} requestedLanguage={activeLanguage} />
        ) : (
          <div className="space-y-6">
            {/* Header & Definition */}
            <div className="max-w-[68ch]">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-artifact text-xs uppercase px-2 py-0.5 rounded-md bg-surface-raised border border-surface-border font-semibold text-ink-2">
                  {currentLangImpl.lang}
                </span>
                <span className="text-xs text-ink-3">Concrete Implementation</span>
              </div>
              <p className="font-prose text-base sm:text-lg text-ink-1 leading-relaxed">
                {details.definition}
              </p>
            </div>

            {/* The Mechanism */}
            <div className="p-6 rounded-2xl border border-surface-border bg-surface-card max-w-[68ch]">
              <h3 className="text-xs font-mono uppercase tracking-widest text-ink-3 font-bold mb-2">
                Mechanism ({currentLangImpl.lang})
              </h3>
              <p className="font-prose text-sm sm:text-base text-ink-1 leading-relaxed">
                {currentLangImpl.mechanism}
              </p>
            </div>

            {/* Why and When to Use */}
            <div className="grid sm:grid-cols-2 gap-4 max-w-[68ch]">
              <div className="p-4 rounded-xl border border-surface-border bg-surface-card">
                <span className="text-[10px] font-mono uppercase tracking-widest text-ink-3 block mb-1 font-bold">
                  Why this mechanism?
                </span>
                <p className="font-prose text-xs sm:text-sm text-ink-2 leading-relaxed">
                  {currentLangImpl.why}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-surface-border bg-surface-card">
                <span className="text-[10px] font-mono uppercase tracking-widest text-coverage-verified block mb-1 font-bold">
                  When to use
                </span>
                <p className="font-prose text-xs sm:text-sm text-ink-2 leading-relaxed">
                  {currentLangImpl.useWhen}
                </p>
              </div>
            </div>

            {/* Price Tag Callout */}
            <div className="max-w-[68ch]">
              <PriceTag price={currentLangImpl.price} />
            </div>

            {/* Next Action in Track */}
            {nextConcept && (
              <div className="pt-4 border-t border-surface-border max-w-[68ch] flex items-center justify-between">
                <span className="text-xs text-ink-3">Next in sequence:</span>
                <button
                  onClick={() => selectConcept(nextConcept.id)}
                  className="px-4 py-2 rounded-lg bg-surface-card border border-surface-border hover:border-axis text-xs font-chrome font-semibold text-ink-1 transition-all cursor-pointer"
                >
                  {nextConcept.label} &rarr;
                </button>
              </div>
            )}
          </div>
        )}

        {/* Downward Trace to Bedrock & Hardware */}
        <BedrockTrace
          empoweredBy={details.empowered_by}
          traceDown={details.traceDown}
          empowersNote={details.empowers_note || details.empowers}
        />

        {/* Contractual Evidence Envelope */}
        <EvidenceEnvelope details={details} currentLangImpl={currentLangImpl} />
      </div>
    </article>
  );
};
