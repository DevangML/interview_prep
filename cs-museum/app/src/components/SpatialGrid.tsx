import { PROGRAM_STAGES, conceptsInStage } from '../lib/stages';
import { getStageVideo } from '../lib/canonicalMedia';
import { useMuseumStore } from '../store/useMuseumStore';

export const SpatialGrid = () => {
  const { programmingNodes, selectStage } = useMuseumStore();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-chrome">
      {PROGRAM_STAGES.map((st) => {
        const items = conceptsInStage(programmingNodes, st.id);
        const preview = items.slice(0, 3).map((c) => c.label);
        const empty = items.length === 0;
        const hasVideo = Boolean(getStageVideo(st.id));

        return (
          <button
            key={st.id}
            type="button"
            onClick={() => selectStage(st.id)}
            className="animate-spring-card text-left p-5 rounded-2xl border border-surface-border bg-surface-card hover:border-axis/60 hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between relative overflow-hidden"
          >
            {/* Subtle Layer Accent Line */}
            <div
              className="absolute top-0 left-0 right-0 h-1 transition-opacity opacity-80 group-hover:opacity-100"
              style={{ backgroundColor: st.color }}
            />

            <div>
              <div className="flex items-center justify-between mb-3 pt-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded border border-surface-border bg-surface-raised font-bold text-ink-3">
                    Layer {st.number} · {st.layerTag}
                  </span>
                  {hasVideo && (
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border border-amber-500/30 bg-amber-500/10 text-amber-400 font-bold flex items-center gap-1">
                      <span>🎬</span>
                      <span className="hidden sm:inline">Lecture</span>
                    </span>
                  )}
                </div>
                <span
                  className="w-2.5 h-2.5 rounded-full shadow-sm"
                  style={{ backgroundColor: st.color }}
                  aria-hidden
                />
              </div>

              <h3 className="font-chrome font-bold text-base text-ink-1 mb-0.5 group-hover:text-axis transition-colors">
                {st.title}
              </h3>
              <p className="text-[11px] font-mono text-ink-3 mb-2 font-semibold">
                {st.subtitle}
              </p>
              <p className="font-prose text-xs text-ink-2 leading-relaxed mb-4">
                {st.description}
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between gap-3 text-[11px] font-mono text-ink-3 pt-3 border-t border-surface-border/60">
                <span>
                  {empty
                    ? 'Bedrock Foundation'
                    : `${items.length} authored concept${items.length === 1 ? '' : 's'}`}
                </span>
                <span className="text-axis font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  <span>Enter Layer</span>
                  <span>&rarr;</span>
                </span>
              </div>
              {!empty && (
                <p className="mt-2 text-[11px] font-mono text-ink-3/80 line-clamp-1">
                  {preview.join(' · ')}
                  {items.length > 3 ? ` · +${items.length - 3}` : ''}
                </p>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
};
