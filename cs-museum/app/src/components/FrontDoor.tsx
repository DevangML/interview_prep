import { useMuseumStore } from '../store/useMuseumStore';
import { PROGRAM_STAGES, conceptsInStage } from '../lib/stages';
import { DoorSwitch, LanguageDoor } from './LanguageDoor';
import { StageRoom } from './StageRoom';

export const FrontDoor = () => {
  const { programmingNodes, activeStageId, selectStage, door, langTrack } = useMuseumStore();

  if (door === 'languages' || langTrack) {
    return <LanguageDoor />;
  }

  if (activeStageId) {
    return <StageRoom stageId={activeStageId} />;
  }

  return (
    <div className="max-w-[960px] mx-auto px-4 sm:px-6 py-10 font-chrome">
      <DoorSwitch />
      <div className="max-w-[68ch] mb-10">
        <p className="text-[11px] font-mono uppercase tracking-widest text-ink-3 font-semibold mb-2">
          Zoom 1 of 3 · The Full Vertical Spine
        </p>
        <h2 className="text-2xl sm:text-3xl font-prose font-bold text-ink-1 mb-3">
          The Computing Continuum: Silicon &rarr; HCI
        </h2>
        <p className="font-prose text-sm sm:text-base text-ink-2 leading-relaxed">
          Eight ascending execution layers. From physical silicon and CPU registers up to language contracts, architectural models, and human cognitive ergonomics.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {PROGRAM_STAGES.map((st) => {
          const items = conceptsInStage(programmingNodes, st.id);
          const preview = items.slice(0, 3).map((c) => c.label);
          const empty = items.length === 0;

          return (
            <button
              key={st.id}
              type="button"
              onClick={() => selectStage(st.id)}
              className="text-left p-5 rounded-2xl border border-surface-border bg-surface-card hover:border-axis/50 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded border border-surface-border bg-surface-raised font-bold text-ink-3">
                  Layer {st.number} · {st.layerTag}
                </span>
                <span
                  className="w-2.5 h-2.5 rounded-full shadow-xs"
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
              <div className="flex items-center justify-between gap-3 text-[11px] font-mono text-ink-3 pt-2 border-t border-surface-border/60">
                <span>
                  {empty
                    ? 'Bedrock Layer'
                    : `${items.length} authored concept${items.length === 1 ? '' : 's'}`}
                </span>
                <span className="text-axis font-semibold group-hover:translate-x-0.5 transition-transform">
                  Explore Layer &rarr;
                </span>
              </div>
              {!empty && (
                <p className="mt-2 text-[11px] font-chrome text-ink-3 line-clamp-1">
                  {preview.join(' · ')}
                  {items.length > 3 ? ` · +${items.length - 3}` : ''}
                </p>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
