import { useState } from 'react';
import { useMuseumStore } from '../store/useMuseumStore';
import { PROGRAM_STAGES } from '../lib/stages';
import { resolveCausalTargetForLevel } from '../lib/causalNavigator';

export const ComputingElevator = () => {
  const {
    activeStageId,
    activeConceptId,
    langTrack,
    programmingNodes,
    programmingEdges,
    selectStage,
    selectConcept,
    goHome,
    activeLanguage,
  } = useMuseumStore();

  const [isOpen, setIsOpen] = useState(false);
  const activeStage = PROGRAM_STAGES.find((s) => s.id === activeStageId);
  const preferredLang = activeLanguage || langTrack;

  const handleLevelSelect = (stageId: string, stageNumber: number) => {
    const target = resolveCausalTargetForLevel(
      stageId,
      stageNumber,
      activeConceptId,
      preferredLang,
      programmingNodes,
      programmingEdges
    );

    if (target) {
      selectConcept(target.conceptId, preferredLang || undefined);
      setIsOpen(false);
      return;
    }

    selectStage(stageId);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-10 left-4 z-40 font-chrome">
      {!isOpen ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="animate-spring-card px-3 py-1.5 rounded-xl border border-surface-border bg-surface-card/95 backdrop-blur-md hover:border-axis/60 text-xs text-ink-2 hover:text-ink-1 transition-all shadow-xl flex items-center gap-2 cursor-pointer group"
          title="Open Continuum Elevator & Causal Level Traversal"
          aria-label="Open Continuum Elevator & Causal Level Traversal"
        >
          <span className="relative flex h-2 w-2">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ backgroundColor: activeStage?.color || '#3b82f6' }}
            />
            <span
              className="relative inline-flex rounded-full h-2 w-2 shadow-xs"
              style={{ backgroundColor: activeStage?.color || '#3b82f6' }}
            />
          </span>
          <span className="font-mono text-[11px] font-bold text-ink-1">
            {activeStage ? `L${activeStage.number}: ${activeStage.layerTag}` : '🛗 Elevator'}
          </span>
          <span className="text-[10px] font-mono text-axis font-semibold group-hover:translate-y-[-1px] transition-transform">
            ▲ Jump
          </span>
        </button>
      ) : (
        <div className="w-80 rounded-2xl border border-surface-border bg-[#090d16]/98 backdrop-blur-xl shadow-2xl p-3.5 space-y-2.5 animate-fade-in text-white font-chrome">
          {/* Header with Home and Close */}
          <div className="flex items-center justify-between pb-2 border-b border-surface-border/80">
            <div className="flex items-center gap-2">
              <span className="text-xs select-none">🛗</span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                14-Level Continuum Elevator
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => {
                  goHome();
                  setIsOpen(false);
                }}
                className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-raised/40 hover:bg-white/10 text-slate-300 hover:text-white cursor-pointer transition-colors"
                title="Return to Home"
              >
                🏠 Home
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-xs text-slate-400 hover:text-white p-1 rounded hover:bg-white/10 cursor-pointer transition-colors"
                title="Close elevator"
              >
                ✕
              </button>
            </div>
          </div>

          <p className="text-[10px] text-slate-400 font-mono">
            {activeConceptId
              ? 'Edge-guided jump: follows exact causal dependencies'
              : preferredLang
                ? `Language track: jumps to ${preferredLang} concept in each layer`
                : 'Select any layer to ride directly to that execution plane'}
          </p>

          <div className="space-y-1 max-h-80 overflow-y-auto pr-0.5 scrollbar-thin">
            {[...PROGRAM_STAGES].reverse().map((st) => {
              const isSelected = st.id === activeStageId;
              const target = resolveCausalTargetForLevel(
                st.id,
                st.number,
                activeConceptId,
                preferredLang,
                programmingNodes,
                programmingEdges
              );

              return (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => handleLevelSelect(st.id, st.number)}
                  className={`animate-spring-press w-full text-left px-2.5 py-1.5 rounded-xl text-xs transition-all flex items-center justify-between cursor-pointer group ${
                    isSelected
                      ? 'bg-amber-500/15 text-amber-300 font-bold border border-amber-500/40 shadow-sm'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white border border-transparent'
                  }`}
                >
                  <div className="min-w-0 pr-2">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: st.color }}
                        aria-hidden
                      />
                      <span className="font-mono text-[10px] text-slate-400">L{st.number}</span>
                      <span className="truncate text-xs font-medium">{st.title}</span>
                    </div>

                    {/* Edge hints */}
                    {target && (
                      <span
                        className={`text-[9px] font-mono block pl-3.5 truncate ${
                          target.direction === 'downstream'
                            ? 'text-cyan-400'
                            : target.direction === 'upstream'
                            ? 'text-purple-400'
                            : 'text-slate-400'
                        }`}
                      >
                        {target.direction === 'downstream'
                          ? `▼ Depends on: ${target.conceptLabel}`
                          : target.direction === 'upstream'
                          ? `▲ Empowers: ${target.conceptLabel}`
                          : `↳ ${target.conceptLabel}`}
                      </span>
                    )}
                  </div>

                  <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 shrink-0">
                    {st.layerTag}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
