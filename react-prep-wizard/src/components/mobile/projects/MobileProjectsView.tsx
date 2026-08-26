import React, { useState, lazy, Suspense, useMemo } from 'react';
import {
  Search,
  ArrowRight,
  ArrowLeft,
  Bot,
  Clock,
  Trophy,
  X,
  Cpu,
  Layers,
  Sparkles,
} from 'lucide-react';
import type { ProjectBlueprint, ProjectTrack, ProjectTier } from '../../../data/projects/types';
import { TIER_META, TRACK_META } from '../../../data/projects/types';
import { COVERAGE_BY_PROJECT } from '../../../data/projects/coverage';
import PmBriefTab from '../../projects/PmBriefTab';
import TechLeadTab from '../../projects/TechLeadTab';
import StickyFilterChips from '../common/StickyFilterChips';
import SwipeableCard from '../common/SwipeableCard';
import BottomSheetModal from '../common/BottomSheetModal';
import { haptic } from '../common/HapticEngine';

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
  onOpenAi,
}: Props) {
  const [search, setSearch] = useState('');
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'pm' | 'techlead' | 'coverage'>('pm');

  const filterOptions = useMemo(
    () => [
      { id: 'track:product', label: 'Product Track', count: projects.filter((p) => p.track === 'product').length },
      { id: 'track:service', label: 'Service Track', count: projects.filter((p) => p.track === 'service').length },
      { id: 'tier:foundation', label: 'Foundation', count: projects.filter((p) => p.tier === 'foundation').length },
      { id: 'tier:flagship', label: 'Flagship', count: projects.filter((p) => p.tier === 'flagship').length },
    ],
    [projects]
  );

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchSearch =
        search.trim() === '' ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.realWorldAnalog.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

      let matchFilter = true;
      if (selectedTrack) {
        if (selectedTrack === 'track:product') matchFilter = p.track === 'product';
        if (selectedTrack === 'track:service') matchFilter = p.track === 'service';
        if (selectedTrack === 'tier:foundation') matchFilter = p.tier === 'foundation';
        if (selectedTrack === 'tier:flagship') matchFilter = p.tier === 'flagship';
      }

      return matchSearch && matchFilter;
    });
  }, [projects, search, selectedTrack]);

  const usedCoverage = activeProject ? COVERAGE_BY_PROJECT.get(activeProject.id)?.edges.length ?? 0 : 0;

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Top Search & Filter Bar */}
      <div className="bg-slate-900 border-b border-slate-800 p-3 shrink-0 space-y-2 select-none">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-2.5 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search 22 Tier-1 projects..."
              className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
            />
          </div>

          <button
            onClick={() => {
              haptic.impactMedium();
              onOpenAi('/audit');
            }}
            className="px-3 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs flex items-center gap-1 shrink-0 cursor-pointer shadow-md active:scale-95 transition"
            title="AI Architecture Sparring"
          >
            <Cpu size={13} />
            <span>/audit</span>
          </button>
        </div>

        {/* Filter Chips Carousel */}
        <StickyFilterChips
          options={filterOptions}
          selectedId={selectedTrack}
          onSelect={(id) => setSelectedTrack(id)}
          allLabel="All Projects"
          totalCount={projects.length}
        />
      </div>

      {/* Projects List Feed */}
      <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-3 space-y-2.5">
        {filteredProjects.map((p) => {
          const isSelected = activeProject?.id === p.id;
          const edgesCount = COVERAGE_BY_PROJECT.get(p.id)?.edges.length ?? 0;

          return (
            <SwipeableCard
              key={p.id}
              leftActionLabel="Open"
              rightActionLabel="Architect"
              onSwipeRight={() => {
                onSelectProject(p);
                setActiveTab('pm');
              }}
              onSwipeLeft={() => {
                onSelectProject(p);
                setActiveTab('techlead');
              }}
              onClick={() => {
                haptic.selection();
                onSelectProject(p);
              }}
              className={`p-3.5 flex flex-col gap-2.5 transition cursor-pointer ${
                isSelected
                  ? 'bg-amber-950/30 border-amber-500/60 shadow-lg'
                  : 'bg-slate-900/80 hover:border-slate-700'
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
                      <Clock size={10} />
                      {p.estimatedBuildTimeHours}h
                    </span>
                    <span className="text-emerald-400 flex items-center gap-0.5 font-sans font-bold">
                      <Trophy size={10} />
                      {p.xpBounty} XP
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
            </SwipeableCard>
          );
        })}
      </div>

      {/* Spring Bottom Sheet Project Detail Modal */}
      {activeProject && (
        <BottomSheetModal
          isOpen={Boolean(activeProject)}
          onClose={() => onSelectProject(null)}
          title={activeProject.title}
          subtitle={`${TIER_META[activeProject.tier].label} • ${activeProject.difficulty}`}
          initialDetent="full"
        >
          <div className="space-y-3 pb-6">
            {/* 3-Role Tab Navigation */}
            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 gap-1 select-none sticky top-0 z-20 backdrop-blur-md">
              {[
                { id: 'pm' as const, label: '👔 PM Brief' },
                { id: 'techlead' as const, label: '🏗️ Tech Lead' },
                { id: 'coverage' as const, label: `🕸️ DAG (${usedCoverage})` },
              ].map((t) => {
                const isActive = activeTab === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      haptic.selection();
                      setActiveTab(t.id);
                    }}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition flex items-center justify-center cursor-pointer ${
                      isActive ? 'bg-amber-500 text-slate-950 shadow-xs' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Contents */}
            <div>
              {activeTab === 'pm' && (
                <PmBriefTab project={activeProject} onNavigateToBuild={() => setActiveTab('techlead')} />
              )}

              {activeTab === 'techlead' && <TechLeadTab project={activeProject} />}

              {activeTab === 'coverage' && (
                <div className="h-full min-h-[350px]">
                  <Suspense fallback={<p className="text-xs text-slate-400 p-2">Building Concept DAG...</p>}>
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
        </BottomSheetModal>
      )}
    </div>
  );
}
