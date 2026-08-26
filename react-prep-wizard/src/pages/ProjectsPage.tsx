import { useState, useMemo, useEffect } from 'react';
import { Search, Compass, Sparkles, Filter, X, Bot, Cpu } from 'lucide-react';
import {
  PROJECT_BLUEPRINTS, TRACK_ORDER, TRACK_META, TIER_ORDER, TIER_META,
  type ProjectBlueprint, type ProjectTier, type ProjectTrack,
} from '../data/projects';
import { ProjectCard } from '../components/projects/ProjectCard';
import { ProjectDetailDrawer } from '../components/projects/ProjectDetailDrawer';
import PaneBoundary from '../components/layout/PaneBoundary';
import UniversalAiAssistant from '../components/socratic/UniversalAiAssistant';
import { useSocraticAi } from '../hooks/useSocraticAi';
import { useIsMobile } from '../hooks/useMediaQuery';
import MobileProjectsView from '../components/mobile/projects/MobileProjectsView';
import { NeuralMindTrigger } from '../components/socratic/NeuralMindTrigger';

export default function ProjectsPage() {
  const isMobile = useIsMobile();
  const [search, setSearch] = useState('');
  const [selectedTrack, setSelectedTrack] = useState<ProjectTrack | null>(null);
  const [selectedTier, setSelectedTier] = useState<ProjectTier | null>(null);
  const [activeProject, setActiveProject] = useState<ProjectBlueprint | null>(PROJECT_BLUEPRINTS[0]);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const [pendingCommand, setPendingCommand] = useState<string | null>(null);

  const { isReady, chatWithMentor } = useSocraticAi();

  const handleOpenAi = (cmd?: string) => {
    setPendingCommand(cmd || null);
    setIsAiAssistantOpen(true);
  };

  useEffect(() => {
    const handleToggle = () => setIsAiAssistantOpen(prev => !prev);
    window.addEventListener('toggle-universal-ai', handleToggle);
    return () => window.removeEventListener('toggle-universal-ai', handleToggle);
  }, []);

  const filteredProjects = useMemo(() => {
    return PROJECT_BLUEPRINTS.filter((p) => {
      const matchSearch =
        search.trim() === '' ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.realWorldAnalog.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      const matchTrack = !selectedTrack || p.track === selectedTrack;
      const matchTier = !selectedTier || p.tier === selectedTier;
      return matchSearch && matchTrack && matchTier;
    });
  }, [search, selectedTrack, selectedTier]);

  const trackCounts = useMemo(
    () => Object.fromEntries(
      TRACK_ORDER.map((t) => [t, PROJECT_BLUEPRINTS.filter((p) => p.track === t).length]),
    ),
    [],
  );
  /** Tier counts follow the selected track, so the numbers describe what is on screen. */
  const tierCounts = useMemo(
    () => Object.fromEntries(
      TIER_ORDER.map((t) => [
        t,
        PROJECT_BLUEPRINTS.filter((p) => p.tier === t && (!selectedTrack || p.track === selectedTrack)).length,
      ]),
    ),
    [selectedTrack],
  );

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-slate-950 text-slate-100 relative">
      {isMobile ? (
        <MobileProjectsView
          projects={PROJECT_BLUEPRINTS}
          activeProject={activeProject}
          onSelectProject={setActiveProject}
          onOpenAi={handleOpenAi}
        />
      ) : (
        <>
          <div className="p-3 border-b border-slate-800 bg-slate-950/90 shrink-0 flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center shadow-xs">
                <Compass size={16} className="text-slate-950 font-bold" />
              </div>
              <div>
                <h1 className="text-sm font-black tracking-tight text-white flex items-center gap-2">
                  <span>💡 The Build Track</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-amber-500/15 text-amber-300 border border-amber-500/30">
                    {PROJECT_BLUEPRINTS.length} projects · two tracks
                  </span>
                </h1>
                <p className="text-[11px] text-slate-400">
                  {selectedTrack
                    ? TRACK_META[selectedTrack].audience
                    : 'Two rooms to win: the timed service-company round, and the repository a product team reads.'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => handleOpenAi('/audit')}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md transition cursor-pointer"
              >
                <Cpu size={13} />
                <span>AI Architecture Sparring (/audit)</span>
              </button>

              <div className="relative">
                <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search architecture..."
                  className="pl-7 pr-3 py-1 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/50 w-48"
                />
              </div>
            </div>
          </div>

          <div className="px-3 py-2 border-b border-slate-800 bg-slate-900/60 shrink-0 flex items-center justify-between gap-3 flex-wrap text-xs">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-mono uppercase text-slate-500 mr-1 flex items-center gap-1">
                <Filter size={11} /> Track:
              </span>
              <button
                onClick={() => setSelectedTrack(null)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  !selectedTrack ? 'bg-amber-500 text-slate-950 shadow-xs' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                All tracks <span className="font-mono opacity-70">{PROJECT_BLUEPRINTS.length}</span>
              </button>
              {TRACK_ORDER.map((track) => {
                const active = selectedTrack === track;
                return (
                  <button
                    key={track}
                    onClick={() => setSelectedTrack(active ? null : track)}
                    title={TRACK_META[track].audience}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                      active ? 'bg-amber-500 text-slate-950 shadow-xs' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {TRACK_META[track].label} <span className="font-mono opacity-70">{trackCounts[track]}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-mono uppercase text-slate-500 mr-1">Tier:</span>
              <button
                onClick={() => setSelectedTier(null)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  !selectedTier ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                All tiers
              </button>
              {TIER_ORDER.map((tier) => {
                const active = selectedTier === tier;
                return (
                  <button
                    key={tier}
                    onClick={() => setSelectedTier(active ? null : tier)}
                    title={TIER_META[tier].blurb}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                      active ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {TIER_META[tier].label} <span className="font-mono opacity-70">{tierCounts[tier]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <main className="flex-1 min-h-0 p-3 grid grid-cols-1 lg:grid-cols-12 gap-3 overflow-hidden">
            <div className={`h-full min-h-0 overflow-y-auto space-y-3 custom-scrollbar ${activeProject ? 'lg:col-span-5 xl:col-span-4' : 'lg:col-span-12'}`}>
              <div className="grid grid-cols-1 gap-3">
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    isSelected={activeProject?.id === project.id}
                    onSelect={() => setActiveProject(project)}
                  />
                ))}
              </div>
            </div>

            {activeProject && (
              <div className="lg:col-span-7 xl:col-span-8 h-full min-h-0 overflow-hidden">
                <PaneBoundary name="Project Architecture Blueprint">
                  <ProjectDetailDrawer
                    project={activeProject}
                    onClose={() => setActiveProject(null)}
                    onOpenAi={(cmd) => handleOpenAi(cmd || '/audit')}
                  />
                </PaneBoundary>
              </div>
            )}
          </main>

          {/* Ambient Neural Mind Trigger (Desktop) */}
          <NeuralMindTrigger
            isOpen={isAiAssistantOpen}
            onToggle={() => handleOpenAi('/audit')}
            isAiReady={isReady}
            badgeLabel="Systems Architect Oracle"
            contextType="project"
          />
        </>
      )}

      {/* Universal AI Assistant Drawer */}
      <UniversalAiAssistant
        isOpen={isAiAssistantOpen}
        onClose={() => {
          setIsAiAssistantOpen(false);
          setPendingCommand(null);
        }}
        initialCommand={pendingCommand}
        contextType="project"
        projectContext={{
          projectId: activeProject?.id,
          projectTitle: activeProject?.title,
          blueprint: activeProject ?? undefined
        }}
        chatWithMentor={chatWithMentor}
        isAiReady={isReady}
      />
    </div>
  );
}

