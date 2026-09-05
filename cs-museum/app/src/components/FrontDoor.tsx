import { useState } from 'react';
import { useMuseumStore } from '../store/useMuseumStore';
import { PROGRAM_STAGES, getConceptCapability } from '../lib/stages';

export const FrontDoor = () => {
  const { programmingNodes, selectConcept } = useMuseumStore();
  const [activeStageId, setActiveStageId] = useState<string | null>(null);

  const concepts = programmingNodes.filter((n) => !n.isLayer);

  const filtered = concepts.filter((c) => {
    if (!activeStageId) return true;
    return getConceptCapability(c).stageId === activeStageId;
  });

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-8 font-chrome">
      {/* Header */}
      <div className="max-w-[70ch] mb-8">
        <h2 className="text-2xl sm:text-3xl font-prose font-bold text-ink-1 mb-2">
          The Anatomy of a Computer Program
        </h2>
        <p className="font-prose text-sm sm:text-base text-ink-2 leading-relaxed">
          Explore how programming languages transform thought into machine execution across
          <strong> {concepts.length} concepts</strong> in <strong>6 execution stages</strong>.
          Concepts are clustered by <strong>what concrete capability each provides for a computer program</strong>.
        </p>
      </div>

      {/* Stage 1..6 Stepper Bar */}
      <div className="mb-8">
        <div className="text-[11px] font-mono uppercase tracking-widest text-ink-3 mb-2 font-semibold">
          1. Select Program Execution Stage:
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {PROGRAM_STAGES.map((st) => {
            const isSelected = activeStageId === st.id;
            return (
              <button
                key={st.id}
                onClick={() => setActiveStageId(isSelected ? null : st.id)}
                className={`p-3 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-surface-raised border-axis text-ink-1 shadow-sm ring-1 ring-axis'
                    : 'bg-surface-card border-surface-border hover:border-surface-border-strong text-ink-2'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-ink-3 mb-1">
                    <span>STAGE {st.number}</span>
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: st.color }} />
                  </div>
                  <div className="font-bold text-xs text-ink-1 leading-snug">{st.title}</div>
                </div>
                <div className="text-[10px] text-ink-3 mt-2 font-mono">{st.subtitle}</div>
              </button>
            );
          })}
        </div>
        {activeStageId && (
          <div className="mt-2 flex items-center justify-between text-xs text-ink-3">
            <span>Showing capabilities in this stage ({filtered.length} concepts)</span>
            <button
              onClick={() => setActiveStageId(null)}
              className="text-axis hover:underline cursor-pointer font-medium"
            >
              Reset to all stages &times;
            </button>
          </div>
        )}
      </div>

      {/* Stage Capabilities & Concept Grid */}
      <div>
        <div className="text-[11px] font-mono uppercase tracking-widest text-ink-3 mb-3 font-semibold">
          2. What It Can Do For A Computer Program &rarr; Current Layer:
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((c) => {
            const cap = getConceptCapability(c);
            const langs = c.details?.byLanguage || [];
            const stage = PROGRAM_STAGES.find((s) => s.id === cap.stageId);

            return (
              <div
                key={c.id}
                onClick={() => selectConcept(c.id)}
                className="p-5 rounded-2xl border border-surface-border bg-surface-card hover:border-axis/50 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  {/* Stage & Capability Eyebrow */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md font-semibold"
                      style={{
                        backgroundColor: `${stage?.color || '#3b82f6'}15`,
                        color: stage?.color || '#3b82f6',
                      }}
                    >
                      {stage ? `Stage ${stage.number}: ${stage.subtitle}` : c.layerId}
                    </span>
                    <span className="text-[11px] font-mono text-ink-3">
                      {langs.length} languages
                    </span>
                  </div>

                  {/* Capability: What it does for a program */}
                  <div className="flex items-start gap-2 mb-2">
                    <span className="text-base leading-none">{cap.icon}</span>
                    <h4 className="font-chrome font-bold text-xs text-axis leading-snug">
                      {cap.capability}
                    </h4>
                  </div>

                  {/* Concept Title & Layer */}
                  <h3 className="font-chrome font-bold text-base text-ink-1 group-hover:text-axis transition-colors mb-1">
                    {c.label}
                  </h3>

                  <p className="font-prose text-xs text-ink-2 line-clamp-2 leading-relaxed mb-2">
                    {c.details?.definition || cap.whatItDoes}
                  </p>

                  <div className="text-[11px] font-mono text-ink-3">
                    <span className="text-ink-3/70">Problem: </span>
                    <span className="italic line-clamp-1">"{c.details?.motivation}"</span>
                  </div>
                </div>

                {/* Footer with Language Implementations & Price Hint */}
                <div className="mt-4 pt-3 border-t border-surface-border flex items-center justify-between text-xs">
                  <div className="flex -space-x-1 overflow-hidden">
                    {langs.slice(0, 4).map((l, i) => (
                      <span
                        key={i}
                        className="inline-block px-1.5 py-0.5 rounded text-[9px] font-artifact bg-surface-raised border border-surface-border text-ink-2"
                        title={l.lang}
                      >
                        {l.lang.split(' ')[0]}
                      </span>
                    ))}
                    {langs.length > 4 && (
                      <span className="inline-block px-1 py-0.5 rounded text-[9px] font-mono bg-surface-raised border border-surface-border text-ink-3">
                        +{langs.length - 4}
                      </span>
                    )}
                  </div>
                  <span className="text-axis text-xs font-semibold group-hover:translate-x-0.5 transition-transform">
                    Inspect Layer &rarr;
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
