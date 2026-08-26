import React, { useState, lazy, Suspense } from 'react';
import { X, Bot, Clock, Trophy } from 'lucide-react';
import type { ProjectBlueprint } from '../../data/projects/types';
import { TIER_META } from '../../data/projects/types';
import { ALL_TOPICS } from '../../data/learn/extended/trackRegistry';
import { COVERAGE_BY_PROJECT } from '../../data/projects/coverage';
import PmBriefTab from './PmBriefTab';
import TechLeadTab from './TechLeadTab';

const ProjectConceptGraph = lazy(() => import('../graph/ProjectConceptGraph'));

interface ProjectDetailDrawerProps {
  project: ProjectBlueprint;
  onClose: () => void;
  onOpenAi?: (cmd?: string) => void;
}

export const ProjectDetailDrawer: React.FC<ProjectDetailDrawerProps> = ({ project, onClose, onOpenAi }) => {
  const [tab, setTab] = useState<'pm' | 'techlead' | 'coverage'>('pm');
  const used = COVERAGE_BY_PROJECT.get(project.id)?.edges.length ?? 0;

  return (
    <div className="flex flex-col h-full min-h-0 bg-[#0d0e12] text-gray-200 border-l border-white/10 overflow-hidden font-sans">
      {/* Header */}
      <header className="p-4 border-b border-white/10 bg-[#121318] shrink-0 space-y-2.5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 space-y-1.5">
            <div className="flex items-center gap-1.5 flex-wrap text-[10px] font-mono">
              <span className="px-2 py-0.5 rounded bg-amber-950/50 text-amber-300 border border-amber-500/30 uppercase tracking-wider font-bold">
                {TIER_META[project.tier].label}
              </span>
              <span className="px-2 py-0.5 rounded bg-cyan-950/40 text-cyan-300 border border-cyan-500/30 font-bold">
                {project.difficulty}
              </span>
              <span className="flex items-center gap-1 text-slate-400 font-medium">
                <Clock size={10} />{project.estimatedBuildTimeHours}h Timebox
              </span>
              <span className="flex items-center gap-1 text-emerald-400 font-medium">
                <Trophy size={10} />{project.xpBounty} XP
              </span>
            </div>
            <h2 className="text-base font-bold text-white tracking-tight leading-snug">{project.title}</h2>
            <p className="text-[11px] text-gray-400 leading-relaxed">{project.tagline}</p>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {onOpenAi && (
              <button
                onClick={() => onOpenAi('/audit')}
                title="Ask the Systems Architect (/audit)"
                className="p-1.5 rounded-lg bg-amber-500/15 text-amber-300 border border-amber-500/30 hover:bg-amber-500/25 transition cursor-pointer flex items-center gap-1 text-xs font-mono"
              >
                <Bot size={14} />
                <span className="text-[10px] font-bold">/audit</span>
              </button>
            )}
            <button onClick={onClose} aria-label="Close" className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 cursor-pointer">
              <X size={14} />
            </button>
          </div>
        </div>

        {/* 3-Role Navigation Tabs */}
        <nav className="flex gap-1.5 pt-0.5" role="tablist">
          {([
            { id: 'pm', label: '👔 PM Brief', meta: 'Product Goals & Scope' },
            { id: 'techlead', label: '🏗️ Tech Lead Directives', meta: 'System Design & Build Steps' },
            { id: 'coverage', label: '🕸️ Concept DAG', meta: `${used}/${ALL_TOPICS.length} concepts verified` },
          ] as const).map((t) => {
            const isActive = tab === t.id;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setTab(t.id)}
                className={`px-3 py-1.5 rounded-xl text-left transition cursor-pointer border ${
                  isActive
                    ? 'bg-amber-500/15 border-amber-500/40 text-amber-300 shadow-sm'
                    : 'border-transparent text-gray-400 hover:bg-white/5 hover:text-gray-200'
                }`}
              >
                <span className={`block text-[11px] font-bold ${isActive ? 'text-amber-300' : 'text-gray-300'}`}>
                  {t.label}
                </span>
                <span className="block text-[9px] font-mono text-gray-500">{t.meta}</span>
              </button>
            );
          })}
        </nav>
      </header>

      {/* Tab Panels */}
      {tab === 'pm' && (
        <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-4">
          <PmBriefTab project={project} onNavigateToBuild={() => setTab('techlead')} />
        </div>
      )}

      {tab === 'techlead' && (
        <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-4">
          <TechLeadTab project={project} />
        </div>
      )}

      {tab === 'coverage' && (
        <div className="flex-1 min-h-0 p-3">
          <Suspense fallback={<p className="text-xs text-gray-400 p-2">Building the coverage DAG…</p>}>
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
