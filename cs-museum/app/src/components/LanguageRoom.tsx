import { useState, useEffect } from 'react';
import { useMuseumStore } from '../store/useMuseumStore';
import { useMediaStore } from '../store/useMediaStore';
import { coverageOf } from '../lib/langCells';
import { getLanguageDocs, getLanguageVideo } from '../lib/canonicalMedia';
import { LanguageRuntimePanel } from './LanguageRuntimePanel';
import { LanguageConceptCard } from './LanguageConceptCard';

export const LanguageRoom = ({ langId }: { langId: string }) => {
  const { languageCatalog, programmingNodes, selectLangTrack, selectConcept, setViewMode, goHome } =
    useMuseumStore();
  const { proposeVideo } = useMediaStore();

  const [activeFilter, setActiveFilter] = useState<'verified' | 'absent' | 'all'>('verified');
  const [search, setSearch] = useState('');

  const meta = languageCatalog.find((l) => l.id === langId);
  const video = getLanguageVideo(langId);
  const docs = getLanguageDocs(langId);
  const concepts = programmingNodes.filter((n) => !n.isLayer);

  useEffect(() => {
    if (video && meta) {
      proposeVideo(video, `${meta.label} Runtime Masterclass`);
    }
  }, [video, meta, proposeVideo]);

  const itemsWithCell = concepts.map((c) => {
    const cell = (c.details?.byLanguage || []).find(
      (x) => x.langId === langId || x.lang?.toLowerCase() === langId.toLowerCase()
    );
    const cov = coverageOf(cell);
    return { concept: c, cell, cov };
  });

  const verifiedCount = itemsWithCell.filter((i) => i.cov === 'verified' || i.cov === 'partial').length;
  const absentCount = itemsWithCell.filter((i) => i.cov === 'absent_by_design').length;

  const filteredItems = itemsWithCell.filter(({ concept, cell, cov }) => {
    if (activeFilter === 'verified' && cov !== 'verified' && cov !== 'partial') return false;
    if (activeFilter === 'absent' && cov !== 'absent_by_design') return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchLabel = concept.label.toLowerCase().includes(q);
      const matchMech = cell?.mechanism?.toLowerCase().includes(q);
      const matchWhy = cell?.why?.toLowerCase().includes(q);
      return matchLabel || matchMech || matchWhy;
    }
    return true;
  });

  const handleSelectConcept = (conceptId: string) => {
    selectConcept(conceptId, langId);
  };

  const handleCompareConcept = (conceptId: string) => {
    selectConcept(conceptId, langId);
    setViewMode('compare');
  };

  return (
    <div className="h-full flex-1 min-h-0 flex flex-col overflow-hidden font-chrome">
      <title>{meta?.label || langId} · 2026 Runtime Studio | CS Museum</title>

      {/* Top Bar Navigation */}
      <div className="h-12 shrink-0 px-4 sm:px-6 border-b border-surface-border bg-surface-card/60 backdrop-blur-xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <button
            type="button"
            onClick={goHome}
            className="animate-spring-press text-xs text-ink-2 hover:text-axis cursor-pointer font-medium flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-raised border border-surface-border hover:border-axis/30 transition-all shrink-0 shadow-xs"
            title="Return to Home (0)"
          >
            <span>🏠</span>
            <span>Home</span>
          </button>
          <span className="text-surface-border-strong hidden sm:inline">/</span>
          <button
            type="button"
            onClick={() => selectLangTrack(null)}
            className="text-xs text-ink-3 hover:text-ink-1 cursor-pointer font-medium flex items-center gap-1 shrink-0"
          >
            <span>&larr;</span>
            <span className="hidden sm:inline">All Job Languages</span>
          </button>
          <span className="text-surface-border-strong hidden sm:inline">|</span>
          <div className="flex items-center gap-2 truncate">
            <h2 className="text-base font-bold text-ink-1 truncate">{meta?.label || langId}</h2>
            {meta?.family && (
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-surface-raised border border-surface-border text-ink-3 hidden md:inline-block">
                {meta.family}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {meta?.so2025_pct != null && (
            <span className="text-[11px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              {meta.so2025_pct}% SO ’25
            </span>
          )}
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            {verifiedCount} Verified
          </span>
        </div>
      </div>

      {/* Split-Pane Cockpit Body */}
      <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-3 sm:gap-4 p-3 sm:p-4 overflow-hidden">
        {/* Left Pane: Runtime Profile & Canonical Media */}
        <LanguageRuntimePanel meta={meta} video={video} docs={docs} />

        {/* Right Pane: Invariant Implementations */}
        <section className="lg:w-[54%] xl:w-[56%] flex flex-col min-h-0 rounded-2xl border border-surface-border bg-surface-card shadow-xs overflow-hidden">
          {/* Segmented Filter Sub-bar */}
          <div className="h-11 shrink-0 px-3 border-b border-surface-border bg-surface-raised/50 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-1 text-xs">
              <button
                type="button"
                onClick={() => setActiveFilter('verified')}
                className={`animate-spring-press px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                  activeFilter === 'verified'
                    ? 'bg-axis text-white shadow-xs'
                    : 'text-ink-3 hover:text-ink-1 hover:bg-surface-raised'
                }`}
              >
                Verified ({verifiedCount})
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('absent')}
                className={`animate-spring-press px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                  activeFilter === 'absent'
                    ? 'bg-axis text-white shadow-xs'
                    : 'text-ink-3 hover:text-ink-1 hover:bg-surface-raised'
                }`}
              >
                Absent by Design ({absentCount})
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className={`animate-spring-press px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                  activeFilter === 'all'
                    ? 'bg-axis text-white shadow-xs'
                    : 'text-ink-3 hover:text-ink-1 hover:bg-surface-raised'
                }`}
              >
                All ({itemsWithCell.length})
              </button>
            </div>

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search concepts..."
              className="px-2 py-0.5 rounded-lg border border-surface-border bg-surface-card text-xs font-chrome text-ink-1 focus:outline-axis w-36"
            />
          </div>


          <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3 scrollbar-thin">
            {filteredItems.length === 0 ? (
              <div className="p-8 text-center text-xs font-mono text-ink-3">
                No invariant records match the current filter.
              </div>
            ) : (
              filteredItems.map(({ concept, cell, cov }) => (
                <LanguageConceptCard
                  key={concept.id}
                  concept={concept}
                  langId={langId}
                  cell={cell}
                  cov={cov}
                  onSelect={handleSelectConcept}
                  onCompare={handleCompareConcept}
                />
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
