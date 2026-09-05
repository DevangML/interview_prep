import { useState } from 'react';
import type { CanonicalVideo } from '../lib/canonicalMedia';

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
  const [isPlaying, setIsPlaying] = useState(false);

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
            {video.badgeLabel && (
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border border-surface-border bg-surface-card text-ink-3">
                {video.badgeLabel}
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

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="text-xs font-mono px-3 py-1.5 rounded-lg border border-surface-border hover:border-axis/50 bg-surface-card text-ink-2 hover:text-ink-1 transition-all cursor-pointer shrink-0"
        >
          {isOpen ? 'Minimize Cinema ▴' : 'Watch Masterclass ▾'}
        </button>
      </div>

      {/* Responsive 16:9 Video Canvas */}
      {isOpen && (
        <div className="p-4 sm:p-5 space-y-4 bg-black/20">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-surface-border bg-black shadow-inner">
            {!isPlaying ? (
              <div
                className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-t from-black via-black/80 to-surface-card/60"
                onClick={() => setIsPlaying(true)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setIsPlaying(true)}
                aria-label="Play video lecture"
              >
                <div className="w-16 h-16 rounded-full bg-axis/20 border-2 border-axis flex items-center justify-center mb-3 group hover:scale-105 transition-transform cursor-pointer shadow-lg shadow-axis/20">
                  <svg className="w-6 h-6 text-axis translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="font-chrome font-bold text-sm sm:text-base text-white mb-1 max-w-[50ch]">
                  {video.title}
                </p>
                <p className="text-xs font-mono text-ink-3 mb-3">
                  Canonical Lecture by {video.speaker} ({video.venueOrChannel})
                </p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPlaying(true);
                  }}
                  className="text-xs font-chrome font-semibold px-4 py-2 rounded-xl bg-axis text-white hover:brightness-110 transition-all cursor-pointer shadow-md"
                >
                  Stream Lecture In-App ({video.duration})
                </button>
              </div>
            ) : (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
                title={video.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            )}
          </div>

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
