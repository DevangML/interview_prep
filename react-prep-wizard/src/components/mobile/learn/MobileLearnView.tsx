import React, { useState } from 'react';
import { BookOpen, List, ArrowLeft, ArrowRight, Bot, CheckCircle2, Sparkles, Zap, Flame, Search } from 'lucide-react';
import type { RoadmapTrackId } from '../../../data/learn/extended/types';
import type { LearnTopic } from '../../../data/learn';
import { ROADMAP_TRACKS } from '../../../data/learn/extended/trackRegistry';
import TopicReader from '../../learn/TopicReader';

interface Props {
  activeTrackId: RoadmapTrackId;
  onSelectTrack: (trackId: RoadmapTrackId) => void;
  topics: LearnTopic[];
  activeTopic: LearnTopic;
  read: Record<string, boolean>;
  duels: Record<string, boolean>;
  comboStreak: number;
  onSelectTopic: (topic: LearnTopic) => void;
  onToggleRead: () => void;
  onPassDuel: (topicId: string, earnedXp: number, wasCorrect: boolean) => void;
  prevTopic: LearnTopic | null;
  nextTopic: LearnTopic | null;
  onOpenAi: (cmd?: string) => void;
  chatWithMentor?: (params: any) => Promise<string | null>;
  isAiReady?: boolean;
}

export default function MobileLearnView({
  activeTrackId,
  onSelectTrack,
  topics,
  activeTopic,
  read,
  duels,
  comboStreak,
  onSelectTopic,
  onToggleRead,
  onPassDuel,
  prevTopic,
  nextTopic,
  onOpenAi,
  chatWithMentor,
  isAiReady
}: Props) {
  const [mobileTab, setMobileTab] = useState<'index' | 'reader'>('reader');
  const [search, setSearch] = useState('');

  const readCount = Object.values(read).filter(Boolean).length;
  const filteredTopics = topics.filter(t =>
    search.trim() === '' ||
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.area.toLowerCase().includes(search.toLowerCase()) ||
    t.group.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Top Track Selector Bar */}
      <div className="bg-slate-900 border-b border-slate-800 px-3 py-2 shrink-0 space-y-2">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {ROADMAP_TRACKS.map((t) => {
            const isActive = t.id === activeTrackId;
            return (
              <button
                key={t.id}
                onClick={() => onSelectTrack(t.id)}
                className={`shrink-0 px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                  isActive
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>{t.icon}</span>
                <span>{t.name}</span>
              </button>
            );
          })}
        </div>

        {/* Segmented View Switch */}
        <div className="flex items-center justify-between gap-2 pt-0.5">
          <div className="flex bg-slate-950 p-0.5 rounded-xl border border-slate-800 w-full">
            <button
              onClick={() => setMobileTab('index')}
              className={`flex-1 py-1 px-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                mobileTab === 'index'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <List size={13} />
              <span>Topics Index ({topics.length})</span>
            </button>
            <button
              onClick={() => setMobileTab('reader')}
              className={`flex-1 py-1 px-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                mobileTab === 'reader'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen size={13} />
              <span className="truncate max-w-[130px]">{activeTopic.title}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar">
        {mobileTab === 'index' ? (
          <div className="p-3 space-y-3">
            {/* Search Input */}
            <div className="relative">
              <Search size={14} className="absolute left-3 top-2.5 text-slate-500" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search topics by name, area, or tag..."
                className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500/50"
              />
            </div>

            {/* Topics List */}
            <div className="space-y-1.5">
              {filteredTopics.map((t, i) => {
                const isCurrent = t.id === activeTopic.id;
                const isRead = Boolean(read[t.id]);
                const isDuel = Boolean(duels[t.id]);

                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      onSelectTopic(t);
                      setMobileTab('reader');
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition cursor-pointer flex items-center justify-between gap-2.5 ${
                      isCurrent
                        ? 'bg-sky-950/60 border-sky-500/50 text-white shadow-sm'
                        : 'bg-slate-900/70 border-slate-800/80 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="min-w-0 space-y-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] font-mono text-slate-500">#{i + 1}</span>
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-slate-800 text-sky-300">
                          {t.area}
                        </span>
                        {isRead && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center gap-0.5">
                            <CheckCircle2 size={9} /> Read
                          </span>
                        )}
                        {isDuel && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-amber-950 text-amber-300 border border-amber-800 flex items-center gap-0.5">
                            <Zap size={9} /> Duel
                          </span>
                        )}
                      </div>
                      <h4 className="text-xs font-bold tracking-tight text-white leading-snug">{t.title}</h4>
                      <p className="text-[11px] text-slate-400 line-clamp-1">{t.summary}</p>
                    </div>

                    <ArrowRight size={14} className="text-slate-500 shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="p-2">
            <TopicReader
              topic={activeTopic}
              isRead={Boolean(read[activeTopic.id])}
              isDuelPassed={Boolean(duels[activeTopic.id])}
              comboStreak={comboStreak}
              onToggleRead={onToggleRead}
              onPassDuel={onPassDuel}
              prev={prevTopic}
              next={nextTopic}
              onGo={(t) => {
                onSelectTopic(t);
              }}
              onOpenAi={onOpenAi}
              chatWithMentor={chatWithMentor}
              isAiReady={isAiReady}
            />
          </div>
        )}
      </div>
    </div>
  );
}
