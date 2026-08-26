import React from 'react';
import { ROADMAP_TRACKS, type RoadmapTrackId } from '../../data/learn/extended/trackRegistry';
import { ExternalLink } from 'lucide-react';
import { playClickSound } from '../../lib/sound/soundEngine';

interface Props {
  activeTrackId: RoadmapTrackId;
  onSelectTrack: (trackId: RoadmapTrackId) => void;
}

export function TrackSelectorBar({ activeTrackId, onSelectTrack }: Props) {
  const activeTrack = ROADMAP_TRACKS.find(t => t.id === activeTrackId) || ROADMAP_TRACKS[0];

  return (
    <div className="p-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-2 flex-wrap shrink-0">
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        {ROADMAP_TRACKS.map((track) => {
          const isActive = track.id === activeTrackId;
          return (
            <button
              key={track.id}
              onClick={() => { playClickSound(); onSelectTrack(track.id); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer whitespace-nowrap border ${
                isActive
                  ? 'bg-sky-500/20 text-sky-300 border-sky-500/60 shadow-xs'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <span>{track.icon}</span>
              <span>{track.name}</span>
              <span className="text-[10px] font-mono opacity-70">({track.topics.length})</span>
            </button>
          );
        })}
      </div>

      {activeTrack.sourceUrl && (
        <a
          href={activeTrack.sourceUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="hidden md:flex items-center gap-1 text-[11px] font-mono text-sky-400 hover:underline shrink-0"
        >
          <span>Official Roadmap</span>
          <ExternalLink size={11} />
        </a>
      )}
    </div>
  );
}
