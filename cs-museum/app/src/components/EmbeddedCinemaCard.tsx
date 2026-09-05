import { useState } from 'react';
import type { CanonicalVideo } from '../lib/canonicalMedia';
import { useMediaStore } from '../store/useMediaStore';

interface EmbeddedCinemaCardProps {
  video: CanonicalVideo;
  levelLabel?: string;
  defaultExpanded?: boolean;
}

export const EmbeddedCinemaCard = ({
  video,
  levelLabel = 'Canonical Masterclass',
  defaultExpanded = true,
}: EmbeddedCinemaCardProps) => {
  const [isOpen, setIsOpen] = useState(defaultExpanded);
  const { activeVideo, pinVideo, setDocked, isDocked, closeMedia } = useMediaStore();

  const isCurrentActive = activeVideo?.id === video.id;
  const isAnotherActive = activeVideo && activeVideo.id !== video.id;

  const handleStartPlay = () => {
    pinVideo(video, levelLabel);
    setDocked(true);
  };

  const handleExpandTheater = () => {
    if (!isCurrentActive) {
      pinVideo(video, levelLabel);
    }
    setDocked(false);
  };

  return (
    <section
      aria-label={video.title}
      className="rounded-2xl border border-surface-border bg-surface-card overflow-hidden shadow-sm transition-all"
    >
      {/* Cinema Header */}
      <div className="p-4 sm:p-5 flex items-center justify-between gap-3 flex-wrap border-b border-surface-border/80 bg-surface-raised/40">
        <div className="space-y-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded border border-amber-500/30 bg-amber-500/10 text-amber-400 font-bold flex items-center gap-1">
              <span>👑</span>
              <span>{levelLabel}</span>
            </span>
            {isCurrentActive && (
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Now Playing</span>
              </span>
            )}
            <span className="text-[10px] font-mono text-ink-3 px-1.5 py-0.5 rounded bg-surface-card border border-surface-border">
              ⏱ {video.duration}
            </span>
          </div>
          <h3 className="font-chrome font-bold text-sm sm:text-base text-ink-1 line-clamp-1">
            {video.title}
          </h3>
          <p className="text-xs font-mono text-axis font-semibold">
            {video.speaker} · <span className="text-ink-3">{video.venueOrChannel}</span>
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {!isCurrentActive ? (
            <button
              type="button"
              onClick={handleStartPlay}
              className="text-xs font-mono px-3 py-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 transition-all cursor-pointer flex items-center gap-1 font-semibold"
              title="Stream lecture in persistent Picture-in-Picture dock"
            >
              <span>▶ Stream in PiP</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleExpandTheater}
              className="text-xs font-mono px-3 py-1.5 rounded-lg border border-surface-border bg-surface-raised hover:border-axis/50 text-ink-2 hover:text-ink-1 transition-all cursor-pointer flex items-center gap-1"
              title="Expand to Theater mode"
            >
              <span>⤢ Theater</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="text-xs font-mono px-3 py-1.5 rounded-lg border border-surface-border hover:border-axis/50 bg-surface-card text-ink-2 hover:text-ink-1 transition-all cursor-pointer"
          >
            {isOpen ? 'Minimize ▴' : 'Details ▾'}
          </button>
        </div>
      </div>

      {/* Expanded Control & Takeaway Area */}
      {isOpen && (
        <div className="p-4 sm:p-5 space-y-4 bg-black/20">
          {isCurrentActive ? (
            <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-950/20 flex items-center justify-between gap-4 flex-wrap">
              <div className="space-y-1">
                <p className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Streaming Live in Ambient Cinema
                </p>
                <p className="text-xs text-ink-3 font-prose">
                  Audio & video remain active in the PiP dock as you navigate layers and study code.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleExpandTheater}
                  className="text-xs font-mono px-3 py-1.5 rounded-lg bg-surface-card border border-surface-border hover:border-axis/50 text-ink-1 cursor-pointer"
                >
                  {isDocked ? '⤢ Theater View' : '◰ Dock to PiP'}
                </button>
                <button
                  type="button"
                  onClick={closeMedia}
                  className="text-xs font-mono px-2.5 py-1.5 rounded-lg bg-surface-card border border-surface-border hover:text-rose-400 text-ink-3 cursor-pointer"
                  title="Stop playback"
                >
                  ✕ Stop
                </button>
              </div>
            </div>
          ) : isAnotherActive ? (
            <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-950/20 flex items-center justify-between gap-4 flex-wrap">
              <div className="space-y-1">
                <p className="text-xs font-mono text-amber-400 font-semibold">
                  Currently playing another lecture in PiP:
                </p>
                <p className="text-xs font-mono text-ink-2 truncate max-w-md">
                  🎙 {activeVideo.speaker}: {activeVideo.title}
                </p>
              </div>
              <button
                type="button"
                onClick={handleStartPlay}
                className="text-xs font-mono px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold cursor-pointer transition-all shadow"
              >
                ▶ Switch to this lecture
              </button>
            </div>
          ) : (
            <div className="relative w-full aspect-[21/9] sm:aspect-[24/9] rounded-xl overflow-hidden border border-surface-border bg-gradient-to-r from-black via-surface-card to-black p-6 flex flex-col items-center justify-center text-center shadow-inner">
              <button
                type="button"
                onClick={handleStartPlay}
                className="w-14 h-14 rounded-full bg-axis/20 border-2 border-axis flex items-center justify-center mb-2.5 hover:scale-105 transition-transform cursor-pointer shadow-lg shadow-axis/20"
                aria-label="Stream lecture"
              >
                <svg className="w-5 h-5 text-axis translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
              <h4 className="font-chrome font-bold text-sm text-white max-w-[50ch] mb-1">
                {video.title}
              </h4>
              <p className="text-xs font-mono text-ink-3 mb-3">
                {video.speaker} · {video.venueOrChannel} ({video.duration})
              </p>
              <button
                type="button"
                onClick={handleStartPlay}
                className="text-xs font-chrome font-semibold px-4 py-1.5 rounded-xl bg-axis text-white hover:brightness-110 transition-all cursor-pointer shadow"
              >
                Stream in PiP Dock
              </button>
            </div>
          )}

          {/* Key Conceptual Takeaway */}
          <div className="p-3.5 rounded-xl border border-surface-border bg-surface-card flex items-start gap-3">
            <span className="text-base shrink-0 select-none">💡</span>
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                Foundational Mental Insight
              </span>
              <p className="font-prose text-xs text-ink-2 leading-relaxed">
                {video.keyTakeaway}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
