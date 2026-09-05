import { useEffect } from 'react';
import { useMuseumStore } from '../store/useMuseumStore';
import { conceptsInStage, getStageById } from '../lib/stages';
import { groupByCluster } from '../lib/capabilities';
import { getStageVideo } from '../lib/canonicalMedia';
import { verifiedCells } from '../lib/langCells';
import { useMediaStore } from '../store/useMediaStore';
import { EmbeddedCinemaCard } from './EmbeddedCinemaCard';
import { HardwareBedrockRoom } from './HardwareBedrockRoom';
import { CausalDependencyBridge } from './CausalDependencyBridge';

export const StageRoom = ({ stageId }: { stageId: string }) => {
  const { programmingNodes, selectStage, selectConcept, goHome } = useMuseumStore();
  const { proposeVideo } = useMediaStore();
  const stage = getStageById(stageId);
  const items = conceptsInStage(programmingNodes, stageId);
  const clusters = groupByCluster(items);
  const stageVideo = getStageVideo(stageId);

  useEffect(() => {
    if (stageVideo && stage) {
      proposeVideo(stageVideo, `Layer ${stage.number}: ${stage.title}`);
    }
  }, [stageVideo, stage, proposeVideo]);

  if (!stage) {
    return (
      <div className="flex-1 min-h-0 p-6 flex items-center justify-center text-sm text-ink-2">
        <span>Unknown layer.</span>
        <button
          type="button"
          className="text-axis hover:underline cursor-pointer ml-2"
          onClick={() => selectStage(null)}
        >
          Return to continuum
        </button>
      </div>
    );
  }

  return (
    <div className="h-full flex-1 min-h-0 flex flex-col overflow-hidden font-chrome">
      <title>{stage.title} · Layer {stage.number} | CS Museum</title>
      <meta name="description" content={stage.description} />

      {/* Top Bar Navigation */}
      <div className="h-12 shrink-0 px-4 sm:px-6 border-b border-surface-border bg-surface-card/60 backdrop-blur-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goHome}
            className="animate-spring-press text-xs text-ink-2 hover:text-axis cursor-pointer font-medium flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-raised border border-surface-border hover:border-axis/30 transition-all shadow-xs"
            title="Return to Home (0)"
          >
            <span>🏠</span>
            <span>Home</span>
          </button>
          <span className="text-surface-border-strong">/</span>
          <button
            type="button"
            onClick={() => selectStage(null)}
            className="text-xs text-ink-3 hover:text-ink-1 cursor-pointer font-medium flex items-center gap-1.5"
          >
            <span>&larr;</span>
            <span>All 14 Pillars</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded border border-surface-border bg-surface-raised text-ink-3 font-semibold">
            Layer {stage.number} ({stage.layerTag})
          </span>
          <span className="text-xs font-bold text-ink-1 hidden sm:inline-block">{stage.title}</span>
        </div>
      </div>

      {/* Split-Pane Cockpit Body */}
      <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-3 sm:gap-4 p-3 sm:p-4 overflow-hidden">
        {/* Left Pane: Media & Causal Foundations */}
        <section className="lg:w-[48%] xl:w-[46%] flex flex-col min-h-0 rounded-2xl border border-surface-border bg-surface-card shadow-xs overflow-hidden">
          <div className="h-10 shrink-0 px-4 border-b border-surface-border bg-surface-raised/50 flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-ink-3">
              Media & Causal Foundations
            </span>
            <span className="text-[10px] font-mono text-axis font-semibold">
              {stage.subtitle}
            </span>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4 scrollbar-thin">
            <div>
              <h2 className="text-xl font-prose font-bold text-ink-1 mb-1">{stage.title}</h2>
              <p className="font-prose text-xs sm:text-sm text-ink-2 leading-relaxed">
                {stage.description}
              </p>
            </div>

            {/* Embedded Canonical Masterclass for this Computing Layer */}
            {stageVideo && (
              <EmbeddedCinemaCard
                video={stageVideo}
                levelLabel={`Layer ${stage.number} Masterclass`}
                defaultExpanded={true}
              />
            )}

            {/* Causal Dependency Bridge (Builds Upon & Empowers) */}
            <CausalDependencyBridge stageId={stage.id} />
          </div>
        </section>

        {/* Right Pane: Concepts & Clusters */}
        <section className="lg:w-[52%] xl:w-[54%] flex flex-col min-h-0 rounded-2xl border border-surface-border bg-surface-card shadow-xs overflow-hidden">
          <div className="h-10 shrink-0 px-4 border-b border-surface-border bg-surface-raised/50 flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-ink-3">
              Layer Concepts & Architectural Clusters
            </span>
            <span className="text-[10px] font-mono text-ink-3">
              {items.length} Invariants
            </span>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4 scrollbar-thin">
            {items.length === 0 ? (
              <HardwareBedrockRoom stageId={stageId} />
            ) : (
              clusters.map((cluster) => (
                <section key={cluster.clusterId} className="space-y-2">
                  <div>
                    <h4 className="text-sm font-chrome font-bold text-ink-1">{cluster.label}</h4>
                    <p className="text-xs text-ink-3 font-prose">{cluster.capability}</p>
                  </div>
                  <ul className="border border-surface-border rounded-xl overflow-hidden bg-surface-card divide-y divide-surface-border">
                    {cluster.items.map((c, idx) => {
                      const langs = c.details?.byLanguage || [];
                      return (
                        <li key={c.id}>
                          <button
                            type="button"
                            onClick={() => selectConcept(c.id)}
                            className="animate-spring-press w-full text-left px-4 py-3 hover:bg-surface-raised/70 transition-all cursor-pointer flex items-start justify-between gap-4 group"
                          >
                            <div className="min-w-0">
                              <div className="flex items-baseline gap-2">
                                <span className="text-[10px] font-mono text-ink-3 w-5 shrink-0 group-hover:text-axis font-bold">
                                  {idx + 1}
                                </span>
                                <span className="font-chrome font-semibold text-sm text-ink-1 group-hover:text-axis transition-colors">
                                  {c.label}
                                </span>
                              </div>
                              <p className="pl-7 mt-1 font-prose text-xs text-ink-2 line-clamp-2 leading-relaxed">
                                {c.details?.motivation || c.details?.definition}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 shrink-0 mt-1">
                              <span className="text-[10px] font-mono text-ink-3">
                                {verifiedCells(langs).length}/{langs.length} langs
                              </span>
                              <span className="text-ink-3 group-hover:text-axis group-hover:translate-x-0.5 transition-transform text-xs">
                                &rarr;
                              </span>
                            </div>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

