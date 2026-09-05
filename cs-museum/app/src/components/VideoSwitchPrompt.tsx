import { useMediaStore } from '../store/useMediaStore';

export const VideoSwitchPrompt = () => {
  const {
    pendingPrompt,
    activeVideo,
    confirmVideoSwitch,
    dismissPrompt,
  } = useMediaStore();

  if (!pendingPrompt || !activeVideo) return null;

  return (
    <aside
      aria-label="Lecture switch proposal"
      className="fixed top-16 right-4 sm:right-6 z-50 max-w-md w-[calc(100vw-2rem)] sm:w-[400px] rounded-2xl border border-amber-500/50 bg-[#090d16]/95 backdrop-blur-xl shadow-2xl overflow-hidden font-chrome p-4 sm:p-5 space-y-3.5 transition-all animate-fade-in"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
          </span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
            Lecture Available For This Level
          </span>
        </div>
        <button
          type="button"
          onClick={dismissPrompt}
          className="text-ink-3 hover:text-ink-1 text-xs p-1 rounded hover:bg-surface-raised cursor-pointer transition-colors"
          title="Continue current lecture"
          aria-label="Dismiss and continue current lecture"
        >
          ✕
        </button>
      </div>

      <div className="space-y-1">
        <h4 className="font-chrome font-bold text-sm text-ink-1 leading-snug line-clamp-2">
          {pendingPrompt.video.title}
        </h4>
        <p className="text-xs font-mono text-axis font-semibold">
          {pendingPrompt.video.speaker} · <span className="text-ink-3">{pendingPrompt.video.duration}</span>
        </p>
        <p className="text-[11px] font-mono text-ink-3">
          Level: <span className="text-amber-300 font-medium">{pendingPrompt.label}</span>
        </p>
      </div>

      <div className="p-2.5 rounded-xl border border-surface-border/80 bg-surface-raised/40 text-[11px] font-mono text-ink-3 space-y-0.5">
        <span className="text-ink-3/80">Currently playing in PiP:</span>
        <p className="text-ink-2 font-semibold truncate">
          {activeVideo.speaker}: {activeVideo.title}
        </p>
      </div>

      <div className="flex items-center gap-2 pt-1">
        <button
          type="button"
          onClick={confirmVideoSwitch}
          className="animate-spring-press flex-1 py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs transition-all cursor-pointer text-center shadow-md flex items-center justify-center gap-1.5"
        >
          <span>▶ Play This Video</span>
        </button>
        <button
          type="button"
          onClick={dismissPrompt}
          className="animate-spring-press flex-1 py-2 px-3 rounded-xl border border-surface-border bg-surface-card hover:bg-surface-raised text-ink-2 hover:text-ink-1 font-semibold text-xs transition-all cursor-pointer text-center"
        >
          Continue Current
        </button>
      </div>
    </aside>
  );
};
