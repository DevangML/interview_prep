import { useState, useMemo } from 'react';
import { GraduationCap, AlertTriangle } from 'lucide-react';
import TopicNav from '../components/learn/TopicNav';
import TopicReader from '../components/learn/TopicReader';
import PaneBoundary from '../components/layout/PaneBoundary';
import { LEARN_TOPICS, TOPIC_BY_ID, learnCoverage } from '../data/learn';
import type { LearnTopic } from '../data/learn';

const READ_KEY = 'learn:read';

function loadRead(): Record<string, boolean> {
  try { return JSON.parse(localStorage.getItem(READ_KEY) || '{}'); } catch { return {}; }
}

/**
 * The reading library — the counterpart to the drill stream.
 *
 * The stream withholds method so recall has something to grip. This explains
 * the mechanism, because you cannot retrieve what was never encoded. Every
 * topic states whether the drills actually cover it, so reading is never
 * mistaken for having practised.
 */
export default function LearnPage() {
  const [activeId, setActiveId] = useState<string>(LEARN_TOPICS[0]?.id ?? '');
  const [read, setRead] = useState<Record<string, boolean>>(loadRead);

  const topic = TOPIC_BY_ID.get(activeId) ?? LEARN_TOPICS[0];
  // Neighbours follow the curriculum's own order, so "next" means the next
  // thing to read rather than the next thing in whatever filter is applied.
  const index = LEARN_TOPICS.findIndex((t) => t.id === topic.id);
  const prev = index > 0 ? LEARN_TOPICS[index - 1] : null;
  const next = index >= 0 && index < LEARN_TOPICS.length - 1 ? LEARN_TOPICS[index + 1] : null;
  const stats = useMemo(() => learnCoverage(), []);
  const readCount = useMemo(() => Object.values(read).filter(Boolean).length, [read]);

  const select = (t: LearnTopic) => {
    setActiveId(t.id);
    document.getElementById('learn-reader')?.scrollTo({ top: 0 });
  };

  const toggleRead = () => {
    const next = { ...read, [topic.id]: !read[topic.id] };
    setRead(next);
    try { localStorage.setItem(READ_KEY, JSON.stringify(next)); } catch { /* full */ }
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-slate-100">
      <div className="bg-slate-950 text-white px-4 py-2 flex items-center gap-3 shrink-0 text-xs border-b border-slate-800">
        <GraduationCap size={16} className="text-sky-400" />
        <span className="font-bold tracking-tight">The Library</span>
        <span className="text-slate-400 hidden md:inline">
          Read first · then drill · then defend
        </span>
        <span className="flex-1" />
        <span className="text-slate-400 tabular-nums hidden sm:inline">
          {stats.topics} topics · {stats.areas} areas · {Math.round(stats.minutes / 60)}h reading · {stats.resources} links
        </span>
        <span className="px-2 py-1 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 font-mono flex items-center gap-1.5">
          <AlertTriangle size={12} /> {stats.missing} not drilled
        </span>
        <span className="px-2 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono">
          {readCount}/{stats.topics} read
        </span>
      </div>

      <main className="grid grid-cols-1 lg:grid-cols-[20rem_1fr] gap-2 p-2 flex-1 min-h-0">
        <PaneBoundary name="The topic navigator">
          <TopicNav activeId={activeId} read={read} onSelect={select} />
        </PaneBoundary>

        <PaneBoundary name="The reader">
          <div
            id="learn-reader"
            className="h-full overflow-y-auto rounded-xl border border-slate-200 bg-white"
          >
            {topic && (
              <TopicReader
                topic={topic}
                isRead={!!read[topic.id]}
                onToggleRead={toggleRead}
                prev={prev}
                next={next}
                onGo={select}
              />
            )}
          </div>
        </PaneBoundary>
      </main>
    </div>
  );
}
