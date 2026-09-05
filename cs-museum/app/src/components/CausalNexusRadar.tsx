import { useState } from 'react';
import { PROGRAM_STAGES } from '../lib/stages';
import { getStageCausality } from '../lib/csDependencies';
import { useMuseumStore } from '../store/useMuseumStore';

export const CausalNexusRadar = () => {
  const { selectStage } = useMuseumStore();
  const [activeStageId, setActiveStageId] = useState<string>('layer_os');

  const stage = PROGRAM_STAGES.find((s) => s.id === activeStageId) || PROGRAM_STAGES[4];
  const causality = getStageCausality(stage.id);

  return (
    <section className="rounded-2xl border border-surface-border bg-surface-card p-5 space-y-4 font-chrome shadow-xs">
      <div className="flex items-center justify-between pb-3 border-b border-surface-border flex-wrap gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 font-bold border border-cyan-500/20">
              Causal Continuum Radar
            </span>
            <span className="text-xs text-ink-3 font-mono">14 Ascending Pillars</span>
          </div>
          <h3 className="font-bold text-base text-ink-1 mt-1">
            Topological Dependencies & Upward Empowerment
          </h3>
        </div>

        <button
          type="button"
          onClick={() => selectStage(stage.id)}
          className="animate-spring-press text-xs font-mono px-3 py-1.5 rounded-lg bg-axis text-white font-semibold cursor-pointer shadow-xs"
        >
          Enter L{stage.number} Room &rarr;
        </button>
      </div>

      {/* Layer Selector Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
        {[...PROGRAM_STAGES].reverse().map((st) => {
          const isActive = st.id === stage.id;
          return (
            <button
              key={st.id}
              type="button"
              onClick={() => setActiveStageId(st.id)}
              className={`animate-spring-press px-2.5 py-1 rounded-lg text-xs font-mono shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'bg-surface-raised border border-axis text-axis font-bold shadow-xs'
                  : 'text-ink-3 hover:text-ink-1 hover:bg-surface-raised border border-surface-border'
              }`}
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: st.color }}
              />
              <span>L{st.number}</span>
            </button>
          );
        })}
      </div>

      {/* Active Layer Banner */}
      <div className="p-4 rounded-xl border border-surface-border bg-surface-raised/50 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: stage.color }}
            />
            <h4 className="font-bold text-sm text-ink-1">
              Layer {stage.number}: {stage.title}
            </h4>
          </div>
          <span className="text-[10px] font-mono text-ink-3 uppercase">{stage.layerTag}</span>
        </div>
        <p className="font-prose text-xs text-ink-2 leading-relaxed">{stage.description}</p>
      </div>

      {/* Causal Dual Columns: Downstream Foundations vs Upstream Superstructures */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
        {/* Downstream Foundations */}
        <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-3 space-y-2">
          <div className="flex items-center gap-1.5 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
            <span>▼</span>
            <span>Builds Upon Foundations ({causality.buildsUpon.length})</span>
          </div>

          {causality.buildsUpon.length === 0 ? (
            <p className="text-[11px] font-mono text-ink-3 italic">
              Terminal bedrock foundation (Silicon & digital physics).
            </p>
          ) : (
            <div className="space-y-1.5">
              {causality.buildsUpon.map((link) => (
                <button
                  key={link.targetId}
                  type="button"
                  onClick={() => setActiveStageId(link.targetId)}
                  className="animate-spring-press w-full text-left p-2 rounded-lg bg-surface-card/80 border border-surface-border hover:border-cyan-400/50 cursor-pointer transition-all text-xs"
                >
                  <div className="font-semibold text-ink-1 flex items-center justify-between">
                    <span>{link.targetLabel}</span>
                    <span className="text-[9px] font-mono text-cyan-400">Jump ↴</span>
                  </div>
                  <p className="font-prose text-[11px] text-ink-3 mt-0.5 line-clamp-2">
                    {link.relationship}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Upstream Superstructures */}
        <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-3 space-y-2">
          <div className="flex items-center gap-1.5 text-purple-400 font-mono text-xs font-bold uppercase tracking-wider">
            <span>▲</span>
            <span>Empowers Superstructures ({causality.empowers.length})</span>
          </div>

          {causality.empowers.length === 0 ? (
            <p className="text-[11px] font-mono text-ink-3 italic">
              Terminal superstructure apex (Human-computer interface).
            </p>
          ) : (
            <div className="space-y-1.5">
              {causality.empowers.map((link) => (
                <button
                  key={link.targetId}
                  type="button"
                  onClick={() => setActiveStageId(link.targetId)}
                  className="animate-spring-press w-full text-left p-2 rounded-lg bg-surface-card/80 border border-surface-border hover:border-purple-400/50 cursor-pointer transition-all text-xs"
                >
                  <div className="font-semibold text-ink-1 flex items-center justify-between">
                    <span>{link.targetLabel}</span>
                    <span className="text-[9px] font-mono text-purple-400">Jump ↴</span>
                  </div>
                  <p className="font-prose text-[11px] text-ink-3 mt-0.5 line-clamp-2">
                    {link.relationship}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
