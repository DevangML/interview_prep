import { useState } from 'react';
import { useMuseumStore } from '../store/useMuseumStore';
import { useMediaStore } from '../store/useMediaStore';
import { coverageOf, verifiedCells } from '../lib/langCells';
import { getConceptVideo } from '../lib/canonicalMedia';
import { EmbeddedCinemaCard } from './EmbeddedCinemaCard';

export const SpecSheetMatrix = () => {
  const { getActiveConcept, selectLanguage, setViewMode, goHome } = useMuseumStore();
  const { pinVideo } = useMediaStore();
  const concept = getActiveConcept();
  const [showAll, setShowAll] = useState(false);
  const [showCinema, setShowCinema] = useState(false);

  if (!concept || !concept.details) return null;

  const { label, details } = concept;
  const all = details.byLanguage || [];
  const langs = showAll ? all : verifiedCells(all);
  const video = getConceptVideo(concept.id);

  if (langs.length === 0) {
    return (
      <div className="max-w-[720px] mx-auto px-4 sm:px-6 py-8">
        <p className="text-sm text-ink-3">No language comparison matrix available for this concept.</p>
      </div>
    );
  }

  const rows = [
    { key: 'mechanism', title: 'Mechanism' },
    { key: 'why', title: 'Design Rationale (Why)' },
    { key: 'useWhen', title: 'When to Use' },
    { key: 'price', title: 'Trade-Off (Price Paid)' },
  ] as const;

  return (
    <div className="max-w-[960px] mx-auto px-4 sm:px-6 py-6 font-chrome space-y-4">
      <div className="flex items-center justify-between mb-2 flex-wrap gap-3">
        <div>
          <h3 className="text-base font-semibold text-ink-1">
            Spec Sheet Matrix: {label}
          </h3>
          <p className="text-xs text-ink-3 mt-0.5">
            {verifiedCells(all).length} verified · {all.length} job-catalog languages
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={goHome}
            className="animate-spring-press text-xs text-ink-2 hover:text-axis cursor-pointer font-medium flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-raised border border-surface-border hover:border-axis/30 transition-all shadow-xs"
            title="Return to Home (0)"
          >
            <span>🏠</span>
            <span>Home</span>
          </button>
          {video && (
            <button
              type="button"
              onClick={() => {
                setShowCinema(!showCinema);
                pinVideo(video, `Concept: ${label}`);
              }}
              className="text-xs font-mono px-2.5 py-1 rounded-lg border border-surface-border bg-surface-card hover:border-axis/50 text-ink-2 hover:text-ink-1 cursor-pointer flex items-center gap-1.5"
            >
              <span>🎬</span>
              <span>{showCinema ? 'Hide Masterclass' : 'Watch Masterclass'}</span>
            </button>
          )}
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="text-xs font-chrome text-ink-2 hover:text-ink-1 cursor-pointer"
          >
            {showAll ? 'Verified only' : 'Show full catalog'}
          </button>
          <button
            type="button"
            onClick={() => setViewMode('read')}
            className="text-xs font-chrome text-axis hover:underline cursor-pointer"
          >
            &larr; Return to Field Manual
          </button>
        </div>
      </div>

      {showCinema && video && (
        <EmbeddedCinemaCard
          video={video}
          levelLabel="Canonical Concept Masterclass"
          defaultExpanded={true}
        />
      )}

      {/* Responsive Matrix: scrollable with sticky row headers */}
      <div className="overflow-x-auto border border-surface-border rounded-xl bg-surface-card shadow-xs">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-surface-border bg-surface-raised/80">
              <th className="p-3 text-[11px] font-mono uppercase tracking-wider text-ink-3 w-40 sticky left-0 bg-surface-raised z-10 border-r border-surface-border">
                Property
              </th>
              {langs.map((l) => (
                <th key={l.langId || l.lang} className="p-3 text-xs font-artifact font-bold text-ink-1 border-r border-surface-border last:border-r-0 min-w-[200px]">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span>{l.lang}</span>
                      {coverageOf(l) !== 'verified' && (
                        <span className="text-[9px] font-mono px-1 py-0.2 rounded border border-surface-border text-ink-3">
                          {coverageOf(l)}
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        selectLanguage(l.langId || l.lang);
                        setViewMode('read');
                      }}
                      className="text-[10px] font-normal text-axis hover:underline cursor-pointer"
                      title={`Study ${l.lang} in Field Manual`}
                    >
                      Read &rarr;
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-border text-xs">
            {rows.map((row) => (
              <tr key={row.key} className="hover:bg-surface-raised/30 transition-colors">
                <td className="p-3 font-mono font-semibold text-ink-3 text-[11px] uppercase tracking-wider sticky left-0 bg-surface-card z-10 border-r border-surface-border">
                  {row.title}
                </td>
                {langs.map((l) => {
                  const val = l[row.key];
                  const isPrice = row.key === 'price';
                  return (
                    <td
                      key={l.langId || l.lang}
                      className={`p-3 align-top border-r border-surface-border last:border-r-0 font-prose leading-relaxed ${
                        isPrice ? 'text-price bg-price/5' : 'text-ink-2'
                      }`}
                    >
                      {val || <span className="text-ink-3 italic">Not recorded</span>}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
