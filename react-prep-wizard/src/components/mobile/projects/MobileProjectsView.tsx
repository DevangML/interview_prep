import React, { useState, lazy, Suspense } from 'react';
import {
  Search,
  Filter,
  ArrowRight,
  ArrowLeft,
  Bot,
  Clock,
  Trophy,
  X,
  Layers,
  Sparkles,
  Cpu
} from 'lucide-react';
import type { ProjectBlueprint, ProjectTrack, ProjectTier } from '../../../data/projects/types';
import { TIER_META, TRACK_META } from '../../../data/projects/types';
import { COVERAGE_BY_PROJECT } from '../../../data/projects/coverage';
import { ALL_TOPICS } from '../../../data/learn/extended/trackRegistry';
import PmBriefTab from '../../projects/PmBriefTab';
import TechLeadTab from '../../projects/TechLeadTab';

const ProjectConceptGraph = lazy(() => import('../../graph/ProjectConceptGraph'));

interface Props {
  projects: ProjectBlueprint[];
  activeProject: ProjectBlueprint | null;
  onSelectProject: (p: ProjectBlueprint | null) => void;
  onOpenAi: (cmd?: string) => void;
}

export default function MobileProjectsView({
  projects,
  activeProject,
  onSelectProject,
  onOpenAi
}: Props) {
  const [search, setSearch] = useState('');
  const [selectedTrack, setSelectedTrack] = useState<ProjectTrack | null>(null);
  const [selectedTier, setSelectedTier] = useState<ProjectTier | null>(null);
  const [activeTab, setActiveTab] = useState<'pm' | 'techlead' | 'coverage'>('pm');

  const filteredProjects = projects.filter((p) => {
    const matchSearch =
      search.trim() === '' ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.realWorldAnalog.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchTrack = !selectedTrack || p.track === selectedTrack;
    const matchTier = !selectedTier || p.tier === selectedTier;
    return matchSearch && matchTrack && matchTier;
  });

  const usedCoverage = activeProject ? (COVERAGE_BY_PROJECT.get(activeProject.id)?.edges.length ?? 0) : 0;

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Top Search & Filter Bar */}
      <div className="bg-slate-900 border-b border-slate-800 p-3 shrink-0 space-y-2.5">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-2.5 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search 22 masterclass projects..."
              className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
            />
          </div>

          <button
            onClick={() => onOpenAi('/audit')}
            className="px-2.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs flex items-center gap-1 shrink-0 cursor-pointer shadow-md"
            title="AI Architecture Sparring"
          >
            <Cpu size={13} />
            <span>/audit</span>
          </button>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
          <button
            onClick={() => setSelectedTrack(null)}
            className={`shrink-0 px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
              !selectedTrack ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
            }`}
          >
            All Tracks ({projects.length})
          </button>
          {(['product', 'service'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTrack(selectedTrack === t ? null : t)}
              className={`shrink-0 px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                selectedTrack === t ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {TRACK_META[t].label}
            </button>
          ))}
          {(['foundation', 'flagship'] as const).map((tier) => (
            <button
              key={tier}
              onClick={() => setSelectedTier(selectedTier === tier ? null : tier)}
              className={`shrink-0 px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                selectedTier === tier ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {TIER_META[tier].label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects List Feed */}
      <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-3 space-y-2.5">
        {filteredProjects.map((p) => {
          const isSelected = activeProject?.id === p.id;
          const edgesCount = COVERAGE_BY_PROJECT.get(p.id)?.edges.length ?? 0;

          return (
            <div
              key={p.id}
              onClick={() => onSelectProject(p)}
              className={`p-3.5 rounded-2xl border transition cursor-pointer flex flex-col gap-2.5 ${
                isSelected
                  ? 'bg-amber-950/30 border-amber-500/60 shadow-lg'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap text-[10px] font-mono">
                    <span className="px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-500/30 font-bold">
                      {TIER_META[p.tier].label}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-cyan-950/40 text-cyan-300 border border-cyan-500/30">
                      {p.difficulty}
                    </span>
                    <span className="text-slate-400 flex items-center gap-0.5 font-sans">
                      <Clock size={10} />{p.estimatedBuildTimeHours}h
                    </span>
                    <span className="text-emerald-400 flex items-center gap-0.5 font-sans font-bold">
                      <Trophy size={10} />{p.xpBounty} XP
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white tracking-tight leading-snug">{p.title}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{p.tagline}</p>
                </div>

                <div className="p-2 rounded-xl bg-slate-800/80 text-amber-400 shrink-0">
                  <ArrowRight size={14} />
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-800/80 text-[11px] text-slate-500 font-mono">
                <span className="truncate">Analogue: {p.realWorldAnalog}</span>
                <span className="text-sky-400 font-bold shrink-0">{edgesCount} concepts</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Fullscreen Mobile Project Detail Modal / Sheet */}
      {activeProject && (
        <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col font-sans animate-in slide-in-from-bottom duration-200">
          {/* Header */}
          <div className="bg-slate-900 border-b border-slate-800 p-3 shrink-0 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <button
                onClick={() => onSelectProject(null)}
                className="px-2.5 py-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white flex items-center gap-1 text-xs font-bold transition cursor-pointer"
              >
                <ArrowLeft size={14} />
                <span>All Projects</span>
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => onOpenAi('/audit')}
                  className="px-2.5 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold flex items-center gap-1 cursor-pointer"
                  title="Ask Architect (/audit)"
                >
                  <Bot size={13} />
                  <span>/audit</span>
                </button>

                <button
                  onClick={() => onSelectProject(null)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-white bg-slate-800 cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            <div className="space-y-1 pt-1">
              <div className="flex items-center gap-1.5 text-[10px] font-mono flex-wrap">
                <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/30 uppercase font-bold">
                  {TIER_META[activeProject.tier].label}
                </span>
                <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                  {activeProject.difficulty}
                </span>
                <span className="text-slate-400 flex items-center gap-1 font-sans">
                  <Clock size={10} />{activeProject.estimatedBuildTimeHours}h
                </span>
                <span className="text-emerald-400 flex items-center gap-1 font-sans font-bold">
                  <Trophy size={10} />{activeProject.xpBounty} XP
                </span>
              </div>
              <h2 className="text-base font-bold text-white tracking-tight leading-snug">{activeProject.title}</h2>
              <p className="text-xs text-slate-400 leading-relaxed">{activeProject.tagline}</p>
            </div>

            {/* 3-Role Tab Navigation */}
            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 gap-1 pt-1">
              {([
                { id: 'pm', label: '👔 PM Brief' },
                { id: 'techlead', label: '🏗️ Tech Lead' },
                { id: 'coverage', label: `🕸️ DAG (${usedCoverage})` },
              ] as const).map((t) => {
                const isActive = activeTab === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition flex items-center justify-center cursor-pointer ${
                      isActive
                        ? 'bg-amber-500 text-slate-950 shadow-xs'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-3">
            {activeTab === 'pm' && (
              <PmBriefTab project={activeProject} onNavigateToBuild={() => setActiveTab('techlead')} />
            )}

            {activeTab === 'techlead' && (
              <TechLeadTab project={activeProject} />
            )}

            {activeTab === 'coverage' && (
              <div className="h-full min-h-[350px]">
                <Suspense fallback={<p className="text-xs text-slate-400 p-2">Building DAG...</p>}>
                  <ProjectConceptGraph
                    projectId={activeProject.id}
                    projectTitle={activeProject.title}
                    tier={activeProject.tier}
                  />
                </Suspense>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
