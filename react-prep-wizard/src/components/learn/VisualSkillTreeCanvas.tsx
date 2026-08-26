import { useState, useMemo } from 'react';
import { Link } from 'react-router';
import { BookOpen, Flame, CheckCircle2, Lock, Zap, ArrowUpRight, Award, Compass, Search } from 'lucide-react';
import type { LearnTopic } from '../../data/learn';
import { TOPIC_BY_ID } from '../../data/learn';
import { playClickSound } from '../../lib/sound/soundEngine';

interface Props {
  topics: LearnTopic[];
  activeId: string;
  read: Record<string, boolean>;
  duels: Record<string, boolean>;
  onSelect: (topic: LearnTopic) => void;
  onReadLesson?: () => void;
}

export function VisualSkillTreeCanvas({
  topics, activeId, read, duels, onSelect, onReadLesson
}: Props) {
  const [selectedArea, setSelectedArea] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const areas = useMemo(() => ['All', ...Array.from(new Set(topics.map((t) => t.area)))], [topics]);

  const filteredTopics = useMemo(() => {
    return topics.filter((t) => {
      const matchArea = selectedArea === 'All' || t.area === selectedArea;
      const matchQuery = !searchQuery.trim() || 
        `${t.title} ${t.area} ${t.group} ${t.summary}`.toLowerCase().includes(searchQuery.toLowerCase());
      return matchArea && matchQuery;
    });
  }, [topics, selectedArea, searchQuery]);

  return (
    <div className="w-full h-full min-h-[580px] bg-slate-950 rounded-2xl border border-slate-800 flex flex-col overflow-hidden text-slate-200 shadow-xl">
      {/* Search & Area Filter Bar */}
      <div className="p-3.5 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md flex items-center justify-between gap-3 flex-wrap z-10 shrink-0">
        <div className="flex items-center gap-1.5 flex-wrap">
          {areas.slice(0, 7).map((area) => (
            <button
              key={area}
              onClick={() => { playClickSound(); setSelectedArea(area); }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer border ${
                selectedArea === area
                  ? 'bg-sky-500/20 text-sky-300 border-sky-500/50 shadow-xs'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {area === 'All' ? '🌟 All Domains' : area}
            </button>
          ))}
        </div>

        <div className="relative min-w-[200px] max-w-xs flex-1">
          <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search constellation nodes..."
            className="w-full bg-slate-950 border border-slate-700/80 rounded-lg pl-8 pr-3 py-1 text-xs text-slate-200 placeholder-slate-500 outline-none focus:border-sky-500"
          />
        </div>
      </div>

      {/* Grid of Quest Nodes */}
      <div className="flex-1 min-h-0 overflow-y-auto p-4 custom-scrollbar bg-slate-950">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
          {filteredTopics.map((topic) => {
            const isSelected = topic.id === activeId;
            const isRead = Boolean(read[topic.id]);
            const isMastered = Boolean(duels[topic.id]);

            return (
              <div
                key={topic.id}
                onClick={() => { playClickSound(); onSelect(topic); }}
                className={`group p-4 rounded-2xl border transition-all duration-150 cursor-pointer flex flex-col justify-between space-y-3 relative ${
                  isSelected
                    ? 'bg-slate-900 border-sky-500/80 ring-1 ring-sky-500/50 shadow-lg shadow-sky-500/10'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider">
                      <span className="px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800/80">{topic.area}</span>
                      <span className="text-slate-500">· {topic.minutes}m</span>
                    </div>

                    <div className="flex items-center gap-1">
                      {isMastered ? (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold flex items-center gap-1">
                          <CheckCircle2 size={11} /> Mastered
                        </span>
                      ) : isRead ? (
                        <span className="px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/40 text-[10px] font-bold">
                          Read
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-[10px] font-bold flex items-center gap-1">
                          <Award size={10} /> +50 XP
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className={`text-sm font-extrabold leading-snug transition-colors ${isSelected ? 'text-sky-300' : 'text-white group-hover:text-sky-200'}`}>
                    {topic.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {topic.summary}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(topic);
                      if (onReadLesson) onReadLesson();
                    }}
                    className="flex-1 py-1.5 px-2.5 rounded-xl bg-slate-800 hover:bg-sky-600 text-slate-200 hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <BookOpen size={13} />
                    <span>Read Lesson</span>
                  </button>

                  {topic.relatedUnitId && (
                    <Link
                      to={`/?unit=${encodeURIComponent(topic.relatedUnitId)}`}
                      onClick={(e) => e.stopPropagation()}
                      className="py-1.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1 transition shadow-xs"
                    >
                      <Flame size={13} className="fill-slate-950" />
                      <span>Drill</span>
                      <ArrowUpRight size={12} />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
