import { useMuseumStore } from '../store/useMuseumStore';
import { useMediaStore } from '../store/useMediaStore';
import { getStageVideo } from '../lib/canonicalMedia';

export const GrandSplashHero = () => {
  const { selectStage, setCommandPaletteOpen, programmingNodes, languageCatalog } = useMuseumStore();
  const { pinVideo, isPlaying } = useMediaStore();

  const handleLaunchSilicon = () => {
    selectStage('layer_silicon');
  };

  const handleStartDemoVideo = () => {
    const siliconVideo = getStageVideo('layer_silicon');
    if (siliconVideo) {
      pinVideo(siliconVideo, 'Layer 1: Silicon Foundation');
    }
  };

  return (
    <header className="relative rounded-3xl border border-amber-500/30 bg-gradient-to-b from-[#0f172a]/95 via-[#090d16]/90 to-surface-card p-6 sm:p-10 shadow-2xl overflow-hidden mb-10 transition-all font-chrome">
      {/* Radiant Background Cones */}
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-6 max-w-3xl">
        {/* Beacon Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-400 text-xs font-mono font-semibold shadow-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
          </span>
          <span>The Living Museum of Computing</span>
          <span className="text-ink-3 hidden sm:inline">· Bedrock to HCI</span>
        </div>

        {/* Grand Headline */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-5xl font-prose font-bold tracking-tight text-white leading-tight">
            From Silicon to Cognition:{' '}
            <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-sky-400 bg-clip-text text-transparent">
              The 14 Grand Pillars
            </span>
          </h1>
          <p className="font-prose text-sm sm:text-base text-slate-300 leading-relaxed max-w-[65ch]">
            Dismantle the fragmented trivia of conventional tech education. Master computer systems across 14 canonical pillars—from Digital Logic, COA, TOC, and DSA, to OS, Networking, DBMS, OOP, and Distributed Systems.
          </p>
        </div>

        {/* Live Museum Telemetry Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
          <div className="p-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
              Vertical Continuum
            </span>
            <span className="font-chrome font-bold text-lg text-white">14 Core Pillars</span>
            <span className="text-[10px] font-mono text-slate-400 block">Bedrock &rarr; HCI</span>
          </div>
          <div className="p-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400 font-bold block">
              Canonical Media
            </span>
            <span className="font-chrome font-bold text-lg text-white">18 Masterclasses</span>
            <span className="text-[10px] font-mono text-slate-400 block">Streaming in PiP</span>
          </div>
          <div className="p-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
              System Invariants
            </span>
            <span className="font-chrome font-bold text-lg text-white">{programmingNodes.length} Concepts</span>
            <span className="text-[10px] font-mono text-slate-400 block">Evidence grounded</span>
          </div>
          <div className="p-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 font-bold block">
              Cross-Paradigm
            </span>
            <span className="font-chrome font-bold text-lg text-white">{languageCatalog.length} Languages</span>
            <span className="text-[10px] font-mono text-slate-400 block">Compiler lowerings</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 flex-wrap pt-2">
          <button
            type="button"
            onClick={handleLaunchSilicon}
            className="animate-spring-press px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs shadow-lg shadow-amber-500/20 cursor-pointer flex items-center gap-2 transition-all"
          >
            <span>🚀 Enter Bedrock: Layer 1 Silicon</span>
            <span>&rarr;</span>
          </button>

          <button
            type="button"
            onClick={handleStartDemoVideo}
            className="animate-spring-press px-4 py-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs cursor-pointer flex items-center gap-2 transition-all"
          >
            <span>{isPlaying ? '🎧 Lecture Active in PiP' : '▶ Play Ben Eater Lecture'}</span>
          </button>

          <button
            type="button"
            onClick={() => setCommandPaletteOpen(true)}
            className="animate-spring-press px-3.5 py-2.5 rounded-xl border border-white/10 hover:border-white/20 text-slate-400 hover:text-white text-xs font-mono cursor-pointer flex items-center gap-1.5 transition-all"
          >
            <span>Search</span>
            <kbd className="text-[10px] px-1 py-0.5 rounded bg-black/40 border border-white/10">⌘K</kbd>
          </button>
        </div>
      </div>
    </header>
  );
};
