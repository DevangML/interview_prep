import { useMediaStore } from '../store/useMediaStore';

export const AmbientCinemaDock = () => {
  const {
    activeVideo,
    pinnedLabel,
    isDocked,
    isMinimized,
    toggleDock,
    toggleMinimize,
    closeMedia,
  } = useMediaStore();

  if (!activeVideo) return null;

  const iframeSrc = `https://www.youtube-nocookie.com/embed/${activeVideo.id}?autoplay=1&rel=0`;

  // Mode A: Floating Picture-in-Picture (PiP) HUD
  if (isDocked) {
    return (
      <aside
        aria-label="Picture in Picture Lecture"
        className="fixed bottom-10 right-4 z-50 w-80 sm:w-[380px] rounded-2xl border border-amber-500/40 bg-[#090d16]/95 backdrop-blur-md shadow-2xl overflow-hidden font-chrome transition-all animate-fade-in"
      >
        {/* PiP Header Bar */}
        <div className="px-3.5 py-2 flex items-center justify-between border-b border-surface-border/80 bg-surface-raised/60">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" aria-hidden />
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold truncate">
              {pinnedLabel || 'Masterclass'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={toggleMinimize}
              className="animate-spring-press p-1.5 rounded-lg hover:bg-surface-raised text-ink-3 hover:text-ink-1 text-xs cursor-pointer"
              title={isMinimized ? 'Expand video' : 'Minimize to bar'}
              aria-label={isMinimized ? 'Expand video' : 'Minimize to bar'}
            >
              {isMinimized ? '▴' : '▾'}
            </button>
            <button
              type="button"
              onClick={toggleDock}
              className="animate-spring-press p-1.5 rounded-lg hover:bg-surface-raised text-ink-3 hover:text-ink-1 text-xs cursor-pointer font-bold"
              title="Expand to theater mode"
              aria-label="Expand to theater mode"
            >
              ⤢
            </button>
            <button
              type="button"
              onClick={closeMedia}
              className="animate-spring-press p-1.5 rounded-lg hover:bg-surface-raised text-ink-3 hover:text-rose-400 text-xs cursor-pointer"
              title="Close lecture"
              aria-label="Close lecture"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Video Canvas or Minimized Bar */}
        {!isMinimized ? (
          <div className="p-3 space-y-2 bg-black/40">
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-surface-border bg-black shadow-inner">
              <iframe
                src={iframeSrc}
                title={activeVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <div className="flex items-center justify-between gap-2 text-[11px] font-mono text-ink-3">
              <span className="truncate font-semibold text-ink-2">{activeVideo.speaker}</span>
              <span className="shrink-0 text-amber-400/80">⏱ {activeVideo.duration}</span>
            </div>
          </div>
        ) : (
          <div
            onClick={toggleMinimize}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && toggleMinimize()}
            className="p-2.5 flex items-center justify-between gap-2 cursor-pointer hover:bg-surface-raised/40 transition-colors"
          >
            <span className="text-xs font-mono text-ink-2 truncate">
              🎙 {activeVideo.speaker}: {activeVideo.title}
            </span>
            <span className="text-[10px] font-mono text-amber-400 font-bold shrink-0">
              Restore ▴
            </span>
          </div>
        )}
      </aside>
    );
  }

  // Mode B: Immersive Theater Overlay
  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 font-chrome animate-fade-in">
      <div className="max-w-4xl w-full rounded-2xl border border-surface-border bg-surface-card overflow-hidden shadow-2xl space-y-4 p-5 sm:p-6">
        <div className="flex items-center justify-between gap-4 border-b border-surface-border pb-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded border border-amber-500/30 bg-amber-500/10 text-amber-400 font-bold">
                👑 {pinnedLabel || 'Canonical Masterclass'}
              </span>
              <span className="text-xs font-mono text-ink-3">⏱ {activeVideo.duration}</span>
            </div>
            <h3 className="font-bold text-base sm:text-lg text-ink-1 line-clamp-1">
              {activeVideo.title}
            </h3>
            <p className="text-xs font-mono text-axis font-semibold">
              {activeVideo.speaker} · <span className="text-ink-3">{activeVideo.venueOrChannel}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleDock}
              className="text-xs font-mono px-3 py-1.5 rounded-lg border border-amber-500/40 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>◰ Dock to PiP</span>
            </button>
            <button
              type="button"
              onClick={closeMedia}
              className="p-1.5 rounded-lg border border-surface-border text-ink-3 hover:text-ink-1 hover:bg-surface-raised cursor-pointer"
              title="Close theater"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-surface-border bg-black shadow-inner">
          <iframe
            src={iframeSrc}
            title={activeVideo.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        <div className="p-3.5 rounded-xl border border-surface-border bg-surface-raised/40 flex items-start gap-3">
          <span className="text-lg select-none">💡</span>
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
              Foundational Mental Insight
            </span>
            <p className="font-prose text-xs sm:text-sm text-ink-2 leading-relaxed">
              {activeVideo.keyTakeaway}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
