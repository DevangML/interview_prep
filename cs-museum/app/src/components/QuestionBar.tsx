import { useMuseumStore } from '../store/useMuseumStore';
import { getStageById } from '../lib/stages';
import { getConceptVideo } from '../lib/canonicalMedia';
import { CausalEdgeStepper } from './CausalEdgeStepper';

export const QuestionBar = () => {
  const {
    getActiveConcept,
    activeStageId,
    activeLanguage,
    selectLanguage,
    goHome,
    selectConcept,
    viewMode,
    setViewMode,
    getStageTrack,
  } = useMuseumStore();

  const concept = getActiveConcept();
  if (!concept || !concept.details) return null;

  const { label, details } = concept;
  const motivation = details.motivation || details.definition;
  const stage = getStageById(activeStageId || '');
  const track = getStageTrack();
  const pos = track.findIndex((n) => n.id === concept.id);
  const positionLabel =
    pos >= 0 && track.length > 0 ? `${pos + 1} of ${track.length}` : null;
  const hasVideo = Boolean(getConceptVideo(concept.id));

  return (
    <div className="w-full bg-surface-card border-b border-surface-border shrink-0 z-20 shadow-xs transition-colors duration-200">
      <div className="max-w-[760px] mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between gap-4 mb-2 flex-wrap">
          <nav className="flex items-center gap-2 text-xs font-chrome flex-wrap" aria-label="Breadcrumb">
            <button
              type="button"
              onClick={goHome}
              className="text-ink-2 hover:text-axis transition-colors cursor-pointer font-medium flex items-center gap-1 px-2 py-0.5 rounded bg-surface-raised border border-surface-border hover:border-axis/30 shadow-xs"
              title="Return to Home (0)"
            >
              <span>🏠</span>
              <span>Home</span>
            </button>
            <span className="text-surface-border-strong">/</span>
            {stage && (
              <>
                <button
                  type="button"
                  onClick={() => selectConcept(null)}
                  className="text-ink-3 hover:text-ink-1 cursor-pointer font-medium"
                >
                  Stage {stage.number}: {stage.title}
                </button>
                <span className="text-surface-border-strong">/</span>
              </>
            )}
            <span className="font-bold text-ink-1">{label}</span>
            {positionLabel && (
              <span className="font-mono text-[10px] text-ink-3">{positionLabel}</span>
            )}
          </nav>

          <div className="inline-flex rounded-xl border border-surface-border p-1 bg-surface-raised text-xs font-chrome shrink-0 shadow-xs">
            {hasVideo && (
              <button
                type="button"
                onClick={() => {
                  setViewMode('read');
                  selectLanguage(null);
                }}
                className={`animate-spring-press px-3 py-1 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeLanguage === null && viewMode === 'read'
                    ? 'bg-amber-500 text-black font-bold shadow-xs'
                    : 'text-ink-3 hover:text-ink-1 hover:bg-surface-card'
                }`}
                title="Watch canonical masterclass lecture"
              >
                <span>🎬</span>
                <span>Masterclass</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => setViewMode('read')}
              className={`animate-spring-press px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                viewMode === 'read' && (activeLanguage !== null || !hasVideo)
                  ? 'bg-surface-card text-ink-1 font-bold shadow-xs'
                  : 'text-ink-3 hover:text-ink-1 hover:bg-surface-card'
              }`}
            >
              Field Manual
            </button>
            <button
              type="button"
              onClick={() => setViewMode('compare')}
              className={`animate-spring-press px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                viewMode === 'compare'
                  ? 'bg-surface-card text-ink-1 font-bold shadow-xs'
                  : 'text-ink-3 hover:text-ink-1 hover:bg-surface-card'
              }`}
            >
              Spec Sheet
            </button>
          </div>
        </div>

        <div className="min-h-[3.5rem] flex flex-col justify-center border-l-3 border-axis pl-4 py-1">
          <div className="text-[11px] font-mono uppercase tracking-wider text-axis font-bold">
            The problem this concept answers
          </div>
          <h2
            className="text-lg sm:text-xl font-prose font-semibold text-ink-1 leading-snug line-clamp-2"
            title={motivation}
          >
            {motivation}
          </h2>
        </div>

        {/* Causal Edge Navigation (Depends On / Empowers) */}
        <div className="mt-3">
          <CausalEdgeStepper conceptId={concept.id} />
        </div>
      </div>
    </div>
  );
};
