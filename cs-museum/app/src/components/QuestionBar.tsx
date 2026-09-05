import { useMuseumStore } from '../store/useMuseumStore';
import { PROGRAM_STAGES, getConceptCapability } from '../lib/stages';

export const QuestionBar = () => {
  const {
    getActiveConcept,
    selectConcept,
    viewMode,
    setViewMode,
  } = useMuseumStore();

  const concept = getActiveConcept();
  if (!concept || !concept.details) return null;

  const { label, details } = concept;
  const motivation = details.motivation || details.definition;
  const cap = getConceptCapability(concept);
  const stage = PROGRAM_STAGES.find((s) => s.id === cap.stageId);

  return (
    <div className="w-full bg-surface-card border-b border-surface-border sticky top-0 z-30 shadow-sm transition-colors duration-200">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-4">
        {/* Navigation & Context Row */}
        <div className="flex items-center justify-between gap-4 mb-2 flex-wrap">
          <div className="flex items-center gap-2 text-xs font-chrome flex-wrap">
            <button
              onClick={() => selectConcept(null)}
              className="text-ink-3 hover:text-ink-1 transition-colors flex items-center gap-1 cursor-pointer font-medium"
              aria-label="Back to stages overview"
            >
              <span>&larr;</span> Program Stages
            </button>
            <span className="text-surface-border-strong">/</span>
            {stage && (
              <>
                <span className="font-mono text-ink-3 font-semibold text-[11px]">
                  Stage {stage.number}: {stage.title}
                </span>
                <span className="text-surface-border-strong">/</span>
              </>
            )}
            <span className="font-semibold text-axis text-xs">
              {cap.capability}
            </span>
            <span className="text-surface-border-strong">/</span>
            <span className="font-bold text-ink-1">{label}</span>
          </div>

          {/* Mode Switcher */}
          <div className="inline-flex rounded-lg border border-surface-border p-0.5 bg-surface-raised text-xs font-chrome shrink-0">
            <button
              onClick={() => setViewMode('read')}
              className={`px-3 py-1 rounded-md font-medium transition-all cursor-pointer ${
                viewMode === 'read'
                  ? 'bg-surface-card text-ink-1 shadow-xs'
                  : 'text-ink-3 hover:text-ink-1'
              }`}
            >
              Field Manual
            </button>
            <button
              onClick={() => setViewMode('compare')}
              className={`px-3 py-1 rounded-md font-medium transition-all cursor-pointer ${
                viewMode === 'compare'
                  ? 'bg-surface-card text-ink-1 shadow-xs'
                  : 'text-ink-3 hover:text-ink-1'
              }`}
            >
              Spec Sheet (Compare)
            </button>
          </div>
        </div>

        {/* The Core Question / Pivot Anchor - strict reserved height for zero layout shift */}
        <div className="min-h-[3.5rem] flex flex-col justify-center border-l-3 border-axis pl-4 py-1">
          <div className="text-[11px] font-mono uppercase tracking-wider text-axis font-bold">
            Problem Faced in this Program Stage
          </div>
          <h2
            className="text-lg sm:text-xl font-prose font-semibold text-ink-1 leading-snug line-clamp-2"
            title={motivation}
          >
            "{motivation}"
          </h2>
        </div>
      </div>
    </div>
  );
};
