import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  List,
  ArrowRight,
  CheckCircle2,
  Zap,
  Search,
  Check,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import type { RoadmapTrackId } from '../../../data/learn/extended/types';
import type { LearnTopic } from '../../../data/learn';
import { ROADMAP_TRACKS } from '../../../data/learn/extended/trackRegistry';
import TopicReader from '../../learn/TopicReader';
import StickyFilterChips from '../common/StickyFilterChips';
import SwipeableCard from '../common/SwipeableCard';
import { haptic } from '../common/HapticEngine';

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
  isAiReady,
}: Props) {
  const [mobileTab, setMobileTab] = useState<'index' | 'reader'>('reader');
  const [search, setSearch] = useState('');

  const trackOptions = useMemo(
    () =>
      ROADMAP_TRACKS.map((t) => ({
        id: t.id,
        label: t.name,
        icon: <span>{t.icon}</span>,
      })),
    []
  );

  const filteredTopics = useMemo(() => {
    return topics.filter(
      (t) =>
        search.trim() === '' ||
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.area.toLowerCase().includes(search.toLowerCase()) ||
        t.group.toLowerCase().includes(search.toLowerCase())
    );
  }, [topics, search]);

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Top Track Carousel */}
      <div className="bg-slate-900 border-b border-slate-800 px-3 py-2 shrink-0 space-y-2 select-none">
        <StickyFilterChips
          options={trackOptions}
          selectedId={activeTrackId}
          onSelect={(id) => {
            if (id) {
              haptic.selection();
              onSelectTrack(id as RoadmapTrackId);
            }
          }}
          allLabel="Tracks"
        />

        {/* Segmented View Switch */}
        <div className="flex bg-slate-950 p-0.5 rounded-xl border border-slate-800 w-full">
          <button
            onClick={() => {
              haptic.selection();
              setMobileTab('index');
            }}
            className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
              mobileTab === 'index'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <List size={13} />
            <span>Topics ({topics.length})</span>
          </button>
          <button
            onClick={() => {
              haptic.selection();
              setMobileTab('reader');
            }}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
              mobileTab === 'reader'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen size={13} />
            <span>📖 Lesson Reader</span>
          </button>
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
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search topics by name, area, or keyword..."
                className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500/50"
              />
            </div>

            {/* Topics Swipeable Feed */}
            <div className="space-y-2">
              {filteredTopics.map((t, i) => {
                const isCurrent = t.id === activeTopic.id;
                const isRead = Boolean(read[t.id]);
                const isDuel = Boolean(duels[t.id]);

                return (
                  <SwipeableCard
                    key={t.id}
                    leftActionLabel={isRead ? 'Unread' : 'Mark Read'}
                    rightActionLabel="Study"
                    onSwipeRight={() => {
                      if (!isRead) onToggleRead();
                    }}
                    onSwipeLeft={() => {
                      onSelectTopic(t);
                      setMobileTab('reader');
                    }}
                    onClick={() => {
                      haptic.selection();
                      onSelectTopic(t);
                      setMobileTab('reader');
                    }}
                    className={`p-3 transition cursor-pointer flex items-center justify-between gap-2.5 ${
                      isCurrent
                        ? 'bg-sky-950/60 border-sky-500/60 shadow-xs'
                        : 'bg-slate-900/80 hover:bg-slate-800'
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
                      <h4 className="text-xs font-bold tracking-tight text-white leading-snug">
                        {t.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 line-clamp-1">{t.summary}</p>
                    </div>

                    <ArrowRight size={14} className="text-slate-500 shrink-0" />
                  </SwipeableCard>
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
                haptic.selection();
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
