import { useMediaStore } from '../store/useMediaStore';

export const HeaderMediaPill = () => {
  const { activeVideo, pinnedLabel, isDocked, toggleDock, closeMedia } = useMediaStore();

  if (!activeVideo) return null;

  return (
    <div className="flex items-center gap-2 px-3 py-1 rounded-xl border border-amber-500/40 bg-amber-500/10 text-xs font-chrome animate-fade-in shrink-0 shadow-xs">
      <span className="flex items-end gap-0.5 h-3.5" aria-hidden>
        <span className="w-0.5 h-3 bg-amber-400 rounded-full animate-pulse" />
        <span className="w-0.5 h-2 bg-amber-300 rounded-full animate-bounce" />
        <span className="w-0.5 h-3.5 bg-amber-400 rounded-full animate-pulse" />
      </span>
      <div className="hidden md:flex flex-col text-left">
        <span className="text-[9px] font-mono uppercase tracking-widest text-amber-400 font-bold leading-none">
          {pinnedLabel || 'Canonical Lecture'}
        </span>
        <span className="text-xs font-bold text-ink-1 line-clamp-1 max-w-[220px]" title={activeVideo.title}>
          {activeVideo.speaker}: {activeVideo.title}
        </span>
      </div>

      <div className="flex items-center gap-1.5 ml-1">
        <button
          type="button"
          onClick={toggleDock}
          className="animate-spring-press px-2 py-0.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-mono text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1"
          title={isDocked ? 'Expand to main theater view' : 'Dock to Picture-in-Picture (PiP)'}
          aria-label={isDocked ? 'Expand lecture' : 'Dock lecture to PiP'}
        >
          <span>{isDocked ? '⤢ Expand' : '◰ PiP'}</span>
        </button>
        <button
          type="button"
          onClick={closeMedia}
          className="p-1 rounded hover:bg-surface-raised text-ink-3 hover:text-ink-1 transition-colors cursor-pointer text-xs"
          title="Dismiss lecture"
          aria-label="Dismiss lecture"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
