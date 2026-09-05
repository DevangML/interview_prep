import { useEffect } from 'react';
import type { ConceptNode } from '../store/types';
import { getConceptVideo } from '../lib/canonicalMedia';
import { verifiedCells } from '../lib/langCells';
import { useMediaStore } from '../store/useMediaStore';
import { EmbeddedCinemaCard } from './EmbeddedCinemaCard';

interface ConceptAbstractViewProps {
  concept: ConceptNode;
  onSelectLanguage: (lang: string) => void;
}

export const ConceptAbstractView = ({
  concept,
  onSelectLanguage,
}: ConceptAbstractViewProps) => {
  const { details } = concept;
  const { proposeVideo } = useMediaStore();
  const conceptVideo = getConceptVideo(concept.id);
  const byLangList = details?.byLanguage || [];
  const verified = verifiedCells(byLangList);

  useEffect(() => {
    if (conceptVideo) {
      proposeVideo(conceptVideo, `Concept: ${concept.label}`);
    }
  }, [conceptVideo, concept.label, proposeVideo]);

  if (!details) return null;

  return (
    <div className="space-y-6">
      {/* Overarching Problem & Definition */}
      <div className="p-5 rounded-2xl border border-surface-border bg-surface-card space-y-2">
        <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block">
          Language-Agnostic Computer Science Abstract
        </span>
        <h3 className="font-prose text-lg sm:text-xl font-bold text-ink-1 leading-snug">
          {concept.label}
        </h3>
        <p className="font-prose text-sm sm:text-base text-ink-2 leading-relaxed">
          {details.does || details.definition}
        </p>
        {details.motivation && (
          <p className="font-prose text-xs text-ink-3 pt-2 border-t border-surface-border leading-relaxed">
            <strong className="text-ink-2">Underlying Problem:</strong> {details.motivation}
          </p>
        )}
      </div>

      {/* Embedded Canonical YouTube Video Masterclass */}
      {conceptVideo && (
        <EmbeddedCinemaCard
          video={conceptVideo}
          levelLabel="Canonical Concept Masterclass"
          defaultExpanded={true}
        />
      )}

      {/* Cross-Language Implementations Grid */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between border-b border-surface-border pb-2">
          <h4 className="text-xs font-mono uppercase tracking-wider text-ink-3 font-bold">
            Verified Language Implementations ({verified.length})
          </h4>
          <span className="text-[10px] font-mono text-ink-3">
            Select a language to study its compiler lowering
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {verified.map((l) => (
            <button
              key={l.langId || l.lang}
              type="button"
              onClick={() => onSelectLanguage(l.langId || l.lang)}
              className="animate-spring-card p-4 rounded-xl border border-surface-border bg-surface-card hover:border-axis/60 hover:shadow-lg transition-all text-left group cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-1 mb-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-ink-1 group-hover:text-axis transition-colors">
                    {l.lang}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-raised border border-surface-border text-coverage-verified font-semibold">
                    {l.coverage || 'verified'}
                  </span>
                </div>
                <p className="text-xs font-prose text-ink-2 line-clamp-2 leading-relaxed">
                  {l.mechanism}
                </p>
              </div>
              <div className="text-[11px] font-mono text-axis font-semibold flex items-center justify-between pt-2 border-t border-surface-border/60">
                <span>View compiler lowering</span>
                <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
