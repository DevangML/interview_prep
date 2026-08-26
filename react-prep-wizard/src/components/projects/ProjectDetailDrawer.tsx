import React, { useState, lazy, Suspense } from 'react';
import { X, Bot, Clock, Trophy } from 'lucide-react';
import type { ProjectBlueprint } from '../../data/projects/types';
import { TIER_META } from '../../data/projects/types';
import { ALL_TOPICS } from '../../data/learn/extended/trackRegistry';
import { COVERAGE_BY_PROJECT } from '../../data/projects/coverage';
import BuildTab from './BuildTab';

const ProjectConceptGraph = lazy(() => import('../graph/ProjectConceptGraph'));

interface ProjectDetailDrawerProps {
  project: ProjectBlueprint;
  onClose: () => void;
  onOpenAi?: () => void;
}

/**
 * Two tabs, not five.
 *
 * The previous five split one question — what do I build, and what does it
 * teach me — across four reference screens the reader had to reassemble. Build
 * is the spine; Coverage is the proof. Everything else folds inside Build.
 */
export const ProjectDetailDrawer: React.FC<ProjectDetailDrawerProps> = ({ project, onClose, onOpenAi }) => {
  const [tab, setTab] = useState<'build' | 'coverage'>('build');
  const used = COVERAGE_BY_PROJECT.get(project.id)?.edges.length ?? 0;

  return (
    <div className="flex flex-col h-full min-h-0 bg-[#0d0e12] text-gray-200 border-l border-white/10 overflow-hidden font-sans">
      <header className="p-4 border-b border-white/10 bg-[#121318] shrink-0 space-y-2.5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 space-y-1.5">
            <div className="flex items-center gap-1.5 flex-wrap text-[10px] font-mono">
              <span className="px-2 py-0.5 rounded bg-amber-950/50 text-amber-300 border border-amber-500/30 uppercase tracking-wider">
                {TIER_META[project.tier].label}
              </span>
              <span className="px-2 py-0.5 rounded bg-cyan-950/40 text-cyan-300 border border-cyan-500/30">
                {project.difficulty}
              </span>
              <span className="flex items-center gap-1 text-slate-400"><Clock size={10} />{project.estimatedBuildTimeHours}h</span>
              <span className="flex items-center gap-1 text-slate-400"><Trophy size={10} />{project.xpBounty} XP</span>
            </div>
            <h2 className="text-base font-bold text-white tracking-tight leading-snug">{project.title}</h2>
            <p className="text-[11px] text-gray-400 leading-relaxed">{project.tagline}</p>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {onOpenAi && (
              <button
                onClick={onOpenAi}
                title="Ask the architect"
                className="p-1.5 rounded-lg bg-amber-500/15 text-amber-300 border border-amber-500/30 hover:bg-amber-500/25 transition"
              >
                <Bot size={14} />
              </button>
            )}
            <button onClick={onClose} aria-label="Close" className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5">
              <X size={14} />
            </button>
          </div>
        </div>

        <nav className="flex gap-1 pt-0.5" role="tablist">
          {([
            { id: 'build', label: 'Build', meta: `${project.stages.length} steps · ${project.deliverables.length} artefacts` },
            { id: 'coverage', label: 'Covers', meta: `${used}/${ALL_TOPICS.length} concepts` },
          ] as const).map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={`px-3 py-1.5 rounded-lg text-left transition ${
                tab === t.id
                  ? 'bg-cyan-500/15 border border-cyan-500/40'
                  : 'border border-transparent hover:bg-white/5'
              }`}
            >
              <span className={`block text-[11px] font-bold ${tab === t.id ? 'text-cyan-300' : 'text-gray-400'}`}>
                {t.label}
              </span>
              <span className="block text-[9px] font-mono text-gray-500">{t.meta}</span>
            </button>
          ))}
        </nav>
      </header>

      {/* One scroll owner per tab: Build scrolls its column, Coverage never does. */}
      {tab === 'build' ? (
        <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-4">
          <p className="text-[11px] leading-relaxed text-gray-400 mb-4">{project.summary}</p>
          <BuildTab project={project} />
        </div>
      ) : (
        <div className="flex-1 min-h-0 p-3">
          <Suspense fallback={<p className="text-xs text-gray-400 p-2">Building the graph…</p>}>
            <ProjectConceptGraph
              projectId={project.id}
              projectTitle={project.title}
              tier={project.tier}
            />
          </Suspense>
        </div>
      )}
    </div>
  );
};
