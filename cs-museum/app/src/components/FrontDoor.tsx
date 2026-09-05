import { useState } from 'react';
import { useMuseumStore } from '../store/useMuseumStore';
import { DoorSwitch, LanguageCatalogGrid, LanguageRoom } from './LanguageDoor';
import { StageRoom } from './StageRoom';
import { XRayProbe } from './XRayProbe';
import { CausalNexusRadar } from './CausalNexusRadar';
import { ComputingStrata } from './ComputingStrata';
import { SpatialGrid } from './SpatialGrid';

export const FrontDoor = () => {
  const { activeStageId, door, langTrack, languageCatalog, goHome } = useMuseumStore();
  const [viewMode, setViewMode] = useState<'strata' | 'grid'>('strata');
  const [studioTab, setStudioTab] = useState<'xray' | 'nexus'>('xray');

  if (langTrack) {
    return <LanguageRoom langId={langTrack} />;
  }

  if (activeStageId) {
    return <StageRoom stageId={activeStageId} />;
  }

  return (
    <div className="h-full flex-1 min-h-0 flex flex-col overflow-hidden animate-fade-in font-chrome">
      <title>Concept Atlas · The Living Museum of Computing</title>
      <meta
        name="description"
        content="14 canonical execution pillars from Silicon to HCI: COA, TOC, DSA, OS, Networks, DBMS, OOP, and Distributed Systems."
      />

      {/* Top Cockpit Control Sub-bar */}
      <div className="h-12 shrink-0 px-4 sm:px-6 border-b border-surface-border bg-surface-card/60 backdrop-blur-xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <button
            type="button"
            onClick={goHome}
            className="text-xs font-bold text-ink-1 hover:text-axis flex items-center gap-1.5 cursor-pointer"
            title="Return to Home"
          >
            <span>🏠</span>
            <span>Home</span>
          </button>
          <span className="text-surface-border-strong">/</span>
          <h2 className="text-sm font-bold text-ink-1 truncate">
            {door === 'languages' ? 'Job Languages (2026)' : 'The Computer Science Continuum'}
          </h2>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-surface-raised border border-surface-border text-ink-3 hidden md:inline-block">
            {door === 'languages' ? `${languageCatalog.length} Languages` : '14 Ascending Pillars'}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {door === 'stages' && (
            <div className="flex items-center p-0.5 rounded-lg bg-surface-raised border border-surface-border text-xs">
              <button
                type="button"
                onClick={() => setViewMode('strata')}
                className={`animate-spring-press px-2 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer flex items-center gap-1 ${
                  viewMode === 'strata' ? 'bg-axis text-white shadow-xs' : 'text-ink-3 hover:text-ink-1'
                }`}
                title="Strata Stack View"
              >
                <span>≡</span>
                <span className="hidden sm:inline">Strata</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`animate-spring-press px-2 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer flex items-center gap-1 ${
                  viewMode === 'grid' ? 'bg-axis text-white shadow-xs' : 'text-ink-3 hover:text-ink-1'
                }`}
                title="Spatial Grid View"
              >
                <span>⊞</span>
                <span className="hidden sm:inline">Grid</span>
              </button>
            </div>
          )}
          <DoorSwitch />
        </div>
      </div>

      {/* Cockpit Dual-Pane Studio Body */}
      <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-3 sm:gap-4 p-3 sm:p-4 overflow-hidden">
        {/* Left Studio Pane: The 14 Pillars Strata / Language Grid */}
        <section className="lg:w-[48%] xl:w-[46%] flex flex-col min-h-0 rounded-2xl border border-surface-border bg-surface-card shadow-xs overflow-hidden">
          <div className="h-10 shrink-0 px-4 border-b border-surface-border bg-surface-raised/50 flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-ink-3">
              {door === 'languages' ? 'Job Language Catalog' : 'Architectural Strata'}
            </span>
            <span className="text-[10px] font-mono text-ink-3">
              {door === 'languages' ? `${languageCatalog.length} runtimes` : 'Silicon &rarr; HCI'}
            </span>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto p-3 sm:p-4 scrollbar-thin space-y-3">
            {door === 'languages' ? (
              <LanguageCatalogGrid />
            ) : viewMode === 'strata' ? (
              <ComputingStrata />
            ) : (
              <SpatialGrid />
            )}
          </div>
        </section>

        {/* Right Studio Pane: Tabbed Discovery Cockpit */}
        <section className="lg:w-[52%] xl:w-[54%] flex flex-col min-h-0 rounded-2xl border border-surface-border bg-surface-card shadow-xs overflow-hidden">
          {/* Segmented Cockpit Tabs */}
          <div className="h-10 shrink-0 px-3 border-b border-surface-border bg-surface-raised/50 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setStudioTab('xray')}
                className={`animate-spring-press px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  studioTab === 'xray'
                    ? 'bg-axis text-white shadow-xs'
                    : 'text-ink-3 hover:text-ink-1 hover:bg-surface-raised'
                }`}
              >
                <span>🔬</span>
                <span>Live X-Ray Lab</span>
              </button>
              <button
                type="button"
                onClick={() => setStudioTab('nexus')}
                className={`animate-spring-press px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  studioTab === 'nexus'
                    ? 'bg-axis text-white shadow-xs'
                    : 'text-ink-3 hover:text-ink-1 hover:bg-surface-raised'
                }`}
              >
                <span>🧭</span>
                <span>Causal Continuum Radar</span>
              </button>
            </div>

            <span className="text-[10px] font-mono text-ink-3 hidden sm:inline-block">
              Interactive Instruments
            </span>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto p-4 scrollbar-thin">
            {studioTab === 'xray' && <XRayProbe />}
            {studioTab === 'nexus' && <CausalNexusRadar />}
          </div>
        </section>
      </div>
    </div>
  );
};


