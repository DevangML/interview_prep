import { useMuseumStore } from '../store/useMuseumStore';
import { conceptsInStage, getStageById } from '../lib/stages';
import { groupByCluster } from '../lib/capabilities';
import { getStageVideo } from '../lib/canonicalMedia';
import { verifiedCells } from '../lib/langCells';
import { EmbeddedCinemaCard } from './EmbeddedCinemaCard';

export const StageRoom = ({ stageId }: { stageId: string }) => {
  const { programmingNodes, selectStage, selectConcept } = useMuseumStore();
  const stage = getStageById(stageId);
  const items = conceptsInStage(programmingNodes, stageId);
  const clusters = groupByCluster(items);
  const stageVideo = getStageVideo(stageId);

  if (!stage) {
    return (
      <div className="max-w-[720px] mx-auto px-4 py-12 text-sm text-ink-2">
        Unknown layer.{' '}
        <button
          type="button"
          className="text-axis hover:underline cursor-pointer"
          onClick={() => selectStage(null)}
        >
          Return to continuum
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[760px] mx-auto px-4 sm:px-6 py-8 font-chrome space-y-6">
      <div>
        <button
          type="button"
          onClick={() => selectStage(null)}
          className="text-xs text-ink-3 hover:text-ink-1 cursor-pointer mb-4 font-medium flex items-center gap-1"
        >
          &larr; All layers
        </button>

        <p className="text-[11px] font-mono uppercase tracking-widest text-ink-3 font-semibold mb-1">
          Zoom 2 of 3 · Layer {stage.number} ({stage.layerTag})
        </p>
        <h2 className="text-2xl font-prose font-bold text-ink-1 mb-1">{stage.title}</h2>
        <p className="text-xs font-mono text-axis mb-2 font-semibold">{stage.subtitle}</p>
        <p className="font-prose text-sm text-ink-2 leading-relaxed max-w-[62ch]">
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

      {items.length === 0 ? (
        <div className="p-6 rounded-2xl border border-dashed border-surface-border bg-surface-card space-y-2">
          <p className="text-sm font-chrome font-bold text-ink-1">Physical Hardware Foundation</p>
          <p className="text-xs font-prose text-ink-2 leading-relaxed">
            This foundational hardware layer is connected directly through the downward Bedrock trace of higher-level concepts.
          </p>
        </div>
      ) : (
        <div className="space-y-6 pt-2">
          <div className="border-b border-surface-border pb-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-ink-3 font-bold">
              Layer Concepts & Architectural Clusters ({items.length})
            </h3>
          </div>
          {clusters.map((cluster) => (
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
                        className="w-full text-left px-4 py-3.5 hover:bg-surface-raised transition-colors cursor-pointer flex items-start justify-between gap-4"
                      >
                        <div className="min-w-0">
                          <div className="flex items-baseline gap-2">
                            <span className="text-[10px] font-mono text-ink-3 w-5 shrink-0">
                              {idx + 1}
                            </span>
                            <span className="font-chrome font-semibold text-sm text-ink-1">
                              {c.label}
                            </span>
                          </div>
                          <p className="pl-7 mt-1 font-prose text-xs text-ink-2 line-clamp-2 leading-relaxed">
                            {c.details?.motivation || c.details?.definition}
                          </p>
                        </div>
                        <span className="shrink-0 text-[10px] font-mono text-ink-3 mt-1">
                          {verifiedCells(langs).length}/{langs.length} langs
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
};
