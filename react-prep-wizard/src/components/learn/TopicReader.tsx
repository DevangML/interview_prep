import React from 'react';
import { BookOpen, Target, AlertTriangle, Key, ExternalLink } from 'lucide-react';
import type { LearnTopic, CoverageStatus } from '../../data/learn';
import ReaderFooter from './ReaderFooter';
import { TopicConnectionsCard } from './TopicConnectionsCard';
import { KnowledgeDuelCard } from './KnowledgeDuelCard';
import { TradeOffMatrixCard } from './TradeOffMatrixCard';

interface Props {
  topic: LearnTopic;
  isRead: boolean;
  isDuelPassed: boolean;
  comboStreak: number;
  onToggleRead: () => void;
  onPassDuel: (topicId: string, earnedXp: number, wasCorrect: boolean) => void;
  prev: LearnTopic | null;
  next: LearnTopic | null;
  onGo: (topic: LearnTopic) => void;
}

const STATUS_COPY: Record<CoverageStatus, { label: string; cls: string }> = {
  covered: { label: 'Drilled', cls: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  partial: { label: 'Thinly drilled', cls: 'bg-amber-100 text-amber-800 border-amber-200' },
  missing: { label: 'Not drilled', cls: 'bg-rose-100 text-rose-800 border-rose-200' },
};

export default function TopicReader({
  topic, isRead, isDuelPassed, comboStreak, onToggleRead, onPassDuel, prev, next, onGo
}: Props) {
  const status = STATUS_COPY[topic.status];

  return (
    <article className="max-w-[72ch] mx-auto px-6 py-6 space-y-6">
      <header className="space-y-3">
        <div className="flex items-center gap-2 flex-wrap text-[10px] font-bold uppercase tracking-wider">
          <span className="px-2 py-1 rounded bg-sky-50 text-sky-700">{topic.area}</span>
          <span className="text-slate-400">{topic.group}</span>
          <span className="text-slate-400">· {topic.minutes} min read</span>
          <span className={`px-2 py-1 rounded border ${status.cls}`}>{status.label}</span>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900" style={{ textWrap: 'balance' } as React.CSSProperties}>
          {topic.title}
        </h1>

        <p className="text-[15px] leading-relaxed text-slate-700 bg-slate-50 border border-slate-200 rounded-xl p-4">
          {topic.summary}
        </p>
      </header>

      <TopicConnectionsCard
        prerequisites={topic.prerequisites}
        unlocks={topic.unlocks}
        relatedUnitId={topic.relatedUnitId}
        onSelectTopic={(id) => {
          const t = prev?.id === id ? prev : next?.id === id ? next : null;
          if (t) onGo(t);
        }}
      />

      <section className="space-y-4">
        {topic.body.map((para, i) => (
          <p key={i} className="text-[15px] leading-[1.75] text-slate-800" style={{ textWrap: 'pretty' } as React.CSSProperties}>
            {para}
          </p>
        ))}
      </section>

      {topic.code && (
        <pre className="text-[12.5px] leading-relaxed bg-slate-900 text-slate-100 rounded-xl p-4 overflow-x-auto font-mono">
          <code>{topic.code}</code>
        </pre>
      )}

      <TradeOffMatrixCard
        systemImpact="In high-throughput systems, unnecessary virtual DOM reconciliations incur GC pauses and main-thread blocking. Optimize tree diffing depth."
        tradeOffs={[
          { dimension: 'Reconciliation', gain: 'O(N) heuristic tree diffing', sacrifice: 'Strict identical tag-type assumption' },
          { dimension: 'State Batching', gain: 'Single render for multiple updates', sacrifice: 'Asynchronous variable reads in closures' }
        ]}
      />

      {topic.conceptDuel && (
        <KnowledgeDuelCard
          topicId={topic.id}
          questions={topic.conceptDuel}
          isPassed={isDuelPassed}
          comboStreak={comboStreak}
          onPassDuel={onPassDuel}
        />
      )}

      <section className="rounded-xl border border-slate-200 overflow-hidden">
        <h2 className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-600">
          <Key size={13} className="text-amber-500" /> Worth memorising
        </h2>
        <ul className="p-4 space-y-2">
          {topic.keyPoints.map((k, i) => (
            <li key={i} className="text-[14px] leading-relaxed text-slate-700 flex gap-2">
              <span className="text-amber-500 select-none">▪</span><span>{k}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-sky-200 bg-sky-50/50 p-4">
        <h2 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-sky-800 mb-2">
          <Target size={13} /> How it is actually asked
        </h2>
        <p className="text-[14px] leading-relaxed text-sky-950">{topic.interview}</p>
      </section>

      {topic.pitfalls && topic.pitfalls.length > 0 && (
        <section className="rounded-xl border border-rose-200 bg-rose-50/50 p-4">
          <h2 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-rose-800 mb-2">
            <AlertTriangle size={13} /> Where people get it wrong
          </h2>
          <ul className="space-y-1.5">
            {topic.pitfalls.map((p, i) => (
              <li key={i} className="text-[14px] leading-relaxed text-rose-950 flex gap-2">
                <span className="select-none text-rose-500 font-bold">✗</span><span>{p}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="rounded-xl border border-slate-200 overflow-hidden">
        <h2 className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-600">
          <BookOpen size={13} className="text-sky-500" /> Read further
        </h2>
        <ul className="divide-y divide-slate-100">
          {topic.resources.map((r) => (
            <li key={r.url}>
              <a href={r.url} target="_blank" rel="noreferrer noopener" className="flex items-start gap-2 px-4 py-3 hover:bg-sky-50/60 group">
                <ExternalLink size={13} className="mt-0.5 shrink-0 text-slate-400 group-hover:text-sky-600" />
                <span className="flex-1 min-w-0">
                  <span className="block text-[14px] font-semibold text-sky-800 group-hover:underline">{r.label}</span>
                  {r.note && <span className="block text-[12px] text-slate-500 mt-0.5">{r.note}</span>}
                </span>
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 shrink-0 mt-1">{r.kind}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <ReaderFooter prev={prev} next={next} isRead={isRead} onGo={onGo} onToggleRead={onToggleRead} />
    </article>
  );
}
