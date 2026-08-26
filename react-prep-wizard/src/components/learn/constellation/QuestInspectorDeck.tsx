import React from 'react';
import { Link } from 'react-router';
import { BookOpen, Swords, Flame, X, ArrowUpRight, Award, Lock, Zap } from 'lucide-react';
import type { LearnTopic } from '../../../data/learn';
import { TOPIC_BY_ID } from '../../../data/learn';

interface Props {
  topic: LearnTopic;
  isRead: boolean;
  isDuelPassed: boolean;
  onClose: () => void;
  onReadLesson: () => void;
  onSelectTopic: (topicId: string) => void;
}

export function QuestInspectorDeck({
  topic, isRead, isDuelPassed, onClose, onReadLesson, onSelectTopic
}: Props) {
  return (
    <div className="absolute bottom-4 right-4 max-w-md w-full bg-slate-900/95 border border-slate-700/80 rounded-2xl p-5 shadow-2xl backdrop-blur-md text-slate-200 space-y-4 animate-fadeIn z-20">
      <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-3">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            <span className="px-2 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-800">{topic.area}</span>
            <span className="text-slate-500">· {topic.minutes} min read</span>
            <span className="text-amber-400 font-mono flex items-center gap-1">
              <Award size={11} /> +50 XP
            </span>
          </div>
          <h3 className="text-base font-extrabold text-white leading-snug">{topic.title}</h3>
        </div>
        <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer">
          <X size={16} />
        </button>
      </div>

      <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800">
        {topic.summary}
      </p>

      {/* Prerequisites & Unlocks */}
      {(topic.prerequisites?.length || topic.unlocks?.length) ? (
        <div className="grid grid-cols-2 gap-2 text-[11px]">
          {topic.prerequisites && topic.prerequisites.length > 0 && (
            <div className="p-2 rounded-lg bg-slate-950 border border-slate-800/80 space-y-1">
              <span className="text-[10px] font-bold text-amber-400 flex items-center gap-1">
                <Lock size={10} /> Requires:
              </span>
              <div className="truncate text-sky-300 cursor-pointer hover:underline" onClick={() => onSelectTopic(topic.prerequisites![0])}>
                {TOPIC_BY_ID.get(topic.prerequisites[0])?.title || topic.prerequisites[0]}
              </div>
            </div>
          )}
          {topic.unlocks && topic.unlocks.length > 0 && (
            <div className="p-2 rounded-lg bg-slate-950 border border-slate-800/80 space-y-1">
              <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                <Zap size={10} /> Powers Up:
              </span>
              <div className="truncate text-emerald-300 cursor-pointer hover:underline" onClick={() => onSelectTopic(topic.unlocks![0])}>
                {TOPIC_BY_ID.get(topic.unlocks[0])?.title || topic.unlocks[0]}
              </div>
            </div>
          )}
        </div>
      ) : null}

      <div className="flex items-center gap-2 pt-1">
        <button
          onClick={onReadLesson}
          className="flex-1 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shadow-xs"
        >
          <BookOpen size={14} />
          <span>Read Lesson</span>
        </button>

        {topic.relatedUnitId && (
          <Link
            to={`/?unit=${encodeURIComponent(topic.relatedUnitId)}`}
            className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 transition shadow-xs"
          >
            <Flame size={14} className="fill-slate-950" />
            <span>Code Drill</span>
            <ArrowUpRight size={13} />
          </Link>
        )}
      </div>
    </div>
  );
}
