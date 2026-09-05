import { PROGRAM_STAGES, conceptsInStage } from '../lib/stages';
import { getStageVideo } from '../lib/canonicalMedia';
import { useMuseumStore } from '../store/useMuseumStore';

export const ComputingStrata = () => {
  const { programmingNodes, selectStage } = useMuseumStore();

  // Stacked vertically from Layer 8 (HCI) at the top down to Layer 1 (Silicon) at the bottom
  const verticalStrata = [...PROGRAM_STAGES].reverse();

  return (
    <div className="space-y-3 font-chrome">
      <div className="flex items-center justify-between px-2 text-xs font-mono text-ink-3">
        <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-purple-400">
          <span>▲ Human-Computer Interface (Ergonomics)</span>
        </span>
        <span className="text-[11px] text-ink-3">
          14-Layer Canonical Computer Science Continuum
        </span>
        <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-cyan-400">
          <span>▼ Physical Silicon Bedrock</span>
        </span>
      </div>

      <div className="space-y-2 relative">
        {/* Subtle Central Lowering Spine Guide */}
        <div className="absolute top-4 bottom-4 left-6 w-0.5 bg-gradient-to-b from-purple-500/40 via-pink-500/40 via-indigo-500/40 to-cyan-500/40 pointer-events-none hidden sm:block" />

        {verticalStrata.map((st) => {
          const items = conceptsInStage(programmingNodes, st.id);
          const preview = items.slice(0, 3).map((c) => c.label);
          const empty = items.length === 0;
          const hasVideo = Boolean(getStageVideo(st.id));

          return (
            <button
              key={st.id}
              type="button"
              onClick={() => selectStage(st.id)}
              className="animate-spring-card w-full text-left p-4 sm:p-5 rounded-2xl border border-surface-border bg-surface-card hover:border-axis/60 hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              {/* Colored Stratum Boundary Indicator */}
              <div
                className="absolute left-0 top-0 bottom-0 w-1.5 transition-opacity opacity-80 group-hover:opacity-100"
                style={{ backgroundColor: st.color }}
              />

              <div className="flex items-start gap-3.5 sm:pl-3 min-w-0">
                <span
                  className="text-xs font-mono font-bold px-2 py-1 rounded-lg border border-surface-border bg-surface-raised shrink-0 mt-0.5 group-hover:border-axis transition-colors"
                  style={{ color: st.color }}
                >
                  L{st.number}
                </span>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-bold text-sm sm:text-base text-ink-1 group-hover:text-axis transition-colors truncate">
                      {st.title}
                    </h3>
                    <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded border border-surface-border bg-surface-raised text-ink-3">
                      {st.layerTag}
                    </span>
                    {hasVideo && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20 flex items-center gap-1">
                        <span>🎬</span>
                        <span>Lecture</span>
                      </span>
                    )}
                  </div>

                  <p className="font-prose text-xs text-ink-2 line-clamp-1 leading-relaxed">
                    {st.description}
                  </p>

                  {!empty && (
                    <p className="mt-1.5 text-[11px] font-mono text-ink-3/80 truncate">
                      {preview.join(' · ')}
                      {items.length > 3 ? ` · +${items.length - 3}` : ''}
                    </p>
                  )}
                </div>
              </div>

              {/* Right Telemetry & Enter Arrow */}
              <div className="flex items-center gap-4 shrink-0 sm:pl-4 self-end sm:self-center">
                <div className="text-right text-[11px] font-mono text-ink-3">
                  <span className="block font-bold text-ink-2">
                    {empty ? 'Bedrock Foundation' : `${items.length} concepts`}
                  </span>
                  <span className="text-[10px] text-ink-3">{st.subtitle}</span>
                </div>

                <div className="w-8 h-8 rounded-xl border border-surface-border bg-surface-raised flex items-center justify-center text-ink-3 group-hover:text-axis group-hover:border-axis group-hover:translate-x-1 transition-all">
                  &rarr;
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
