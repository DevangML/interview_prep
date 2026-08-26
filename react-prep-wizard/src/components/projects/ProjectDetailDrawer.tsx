import React, { useState } from 'react';
import type { ProjectBlueprint } from '../../data/projects/types';

interface ProjectDetailDrawerProps {
  project: ProjectBlueprint;
  onClose: () => void;
  onOpenAi?: () => void;
}

export const ProjectDetailDrawer: React.FC<ProjectDetailDrawerProps> = ({ project, onClose, onOpenAi }) => {
  const [activeTab, setActiveTab] = useState<'evolution' | 'scope' | 'architecture' | 'topics'>('evolution');
  const [stageIdx, setStageIdx] = useState<number>(0);
  const activeStage = project.stages[stageIdx];

  const getBadgeStyle = (num: number) => {
    switch (num) {
      case 1: return 'text-cyan-400 border-cyan-500/40 bg-cyan-950/30';
      case 2: return 'text-rose-400 border-rose-500/40 bg-rose-950/30';
      case 3: return 'text-emerald-400 border-emerald-500/40 bg-emerald-950/30';
      case 4: return 'text-purple-400 border-purple-500/40 bg-purple-950/30';
      default: return 'text-gray-400 border-gray-500/40 bg-gray-950/30';
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0d0e12] text-gray-200 border-l border-white/10 overflow-hidden font-sans">
      <div className="p-5 border-b border-white/10 bg-[#121318]">
        <div className="flex items-start justify-between gap-4 mb-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-xs font-mono font-medium text-cyan-400 bg-cyan-950/40 border border-cyan-500/30">
                {project.difficulty}
              </span>
              <span className="px-2 py-0.5 rounded text-xs font-mono font-medium text-amber-300 bg-amber-950/40 border border-amber-500/30">
                {project.tier}
              </span>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                ⚡ {project.estimatedBuildTimeHours}h
              </span>
              <span className="text-xs text-gray-400 font-mono">Analog: {project.realWorldAnalog}</span>
            </div>
            <h2 className="text-lg font-bold text-white tracking-tight">{project.title}</h2>
          </div>
          <div className="flex items-center gap-2">
            {onOpenAi && (
              <button
                onClick={onOpenAi}
                className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-medium hover:bg-amber-500/30 transition-colors"
              >
                🤖 AI Spar
              </button>
            )}
            <button onClick={onClose} className="p-1 rounded text-gray-400 hover:text-white hover:bg-white/5">✕</button>
          </div>
        </div>
        <p className="text-xs text-gray-300 leading-relaxed">{project.summary}</p>

        <div className="flex gap-1.5 mt-3 pt-2.5 border-t border-white/5 overflow-x-auto">
          {[
            { id: 'evolution', label: `🚀 ${project.stages.length}-Stage Evolution` },
            { id: 'scope', label: '🎯 Zero-Bloat Scope' },
            { id: 'architecture', label: '🏗️ Clean Architecture' },
            { id: 'topics', label: '📚 Canonical Concepts' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {activeTab === 'evolution' && (
          <div className="space-y-4">
            <div
              className="grid gap-1.5 bg-black/40 p-2 rounded-xl border border-white/5"
              style={{ gridTemplateColumns: `repeat(${project.stages.length}, minmax(0, 1fr))` }}
            >
              {project.stages.map((st, idx) => (
                <button
                  key={st.stageNumber}
                  onClick={() => setStageIdx(idx)}
                  className={`p-2 rounded-lg text-left transition-all border ${
                    stageIdx === idx ? `${getBadgeStyle(st.stageNumber)} font-semibold` : 'border-transparent text-gray-400 hover:bg-white/5'
                  }`}
                >
                  <div className="text-[9px] font-mono uppercase">Stage 0{st.stageNumber}</div>
                  <div className="text-xs font-medium truncate">{st.stageName.split(' ')[0]}</div>
                </button>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-[#14151c] border border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className={`px-2 py-0.5 rounded font-mono border ${getBadgeStyle(activeStage.stageNumber)}`}>
                  Stage {activeStage.stageNumber}: {activeStage.stageName}
                </span>
                <span className="text-gray-400 font-mono">Focus: {activeStage.focus}</span>
              </div>

              <div className={`p-3 rounded-lg border text-xs leading-relaxed ${
                activeStage.stageNumber <= 2 ? 'bg-rose-950/20 border-rose-500/30 text-rose-200' : 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
              }`}>
                <span className="font-semibold">{activeStage.stageNumber <= 2 ? '⚠️ Breakdown: ' : '✅ Fix: '}</span>
                {activeStage.failureModeOrInvariant}
              </div>

              <div>
                <div className="text-[10px] font-mono text-gray-400 uppercase mb-1">Code Pattern</div>
                <pre className="p-3 rounded-lg bg-black/80 text-cyan-300 font-mono text-[11px] overflow-x-auto border border-white/10">
                  <code>{activeStage.codeSnippet}</code>
                </pre>
              </div>

              <div className="p-2.5 bg-white/[0.03] rounded-lg border border-white/5 text-xs text-gray-300">
                <span className="text-cyan-400 font-semibold font-mono">Lesson: </span>{activeStage.architecturalLesson}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'scope' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-4 rounded-xl bg-emerald-950/10 border border-emerald-500/30 space-y-2">
              <h4 className="text-xs font-semibold text-emerald-300 font-mono">⚡ In-Scope Core (Build This)</h4>
              <ul className="space-y-1.5 text-xs text-gray-300">
                {project.coreScopeBoundaries.inScopeMinimal.map((item, i) => (
                  <li key={i} className="flex items-start gap-1.5"><span className="text-emerald-400">✔</span><span>{item}</span></li>
                ))}
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-rose-950/10 border border-rose-500/30 space-y-2">
              <h4 className="text-xs font-semibold text-rose-300 font-mono">⛔ Omitted Bloat (Skip)</h4>
              <ul className="space-y-1.5 text-xs text-gray-400">
                {project.coreScopeBoundaries.outOfScopeBloat.map((item, i) => (
                  <li key={i} className="flex items-start gap-1.5"><span className="text-rose-400">✕</span><span>{item}</span></li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'architecture' && (
          <div className="space-y-3">
            {project.layers.map((l, i) => (
              <div key={i} className="p-3 rounded-xl bg-[#14151c] border border-white/10 space-y-1.5">
                <div className="text-xs font-mono font-semibold text-cyan-400 uppercase">{l.layer} Layer</div>
                <div className="flex flex-wrap gap-1">
                  {l.components.map((c, j) => (
                    <span key={j} className="px-1.5 py-0.5 rounded text-[11px] bg-white/[0.04] text-gray-300 border border-white/5 font-mono">{c}</span>
                  ))}
                </div>
                <div className="text-xs text-gray-400 border-t border-white/5 pt-1.5 mt-1.5"><span className="font-semibold text-gray-300">Invariants: </span>{l.invariants.join(' ')}</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'topics' && (
          <div className="space-y-2">
            {project.explicitTopics.map((t, i) => (
              <div key={i} className="p-3 rounded-xl bg-[#14151c] border border-white/10 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-cyan-400 font-semibold">{t.topic}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-gray-400">{t.category}</span>
                </div>
                <p className="text-xs text-gray-300">{t.howCovered}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
