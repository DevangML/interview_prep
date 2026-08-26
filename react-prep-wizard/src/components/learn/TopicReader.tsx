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
  covered: { label: 'Drilled', cls: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40' },
  partial: { label: 'Thinly drilled', cls: 'bg-amber-950/80 text-amber-300 border-amber-500/40' },
  missing: { label: 'Not drilled', cls: 'bg-rose-950/80 text-rose-300 border-rose-500/40' },
};

export default function TopicReader({
  topic, isRead, isDuelPassed, comboStreak, onToggleRead, onPassDuel, prev, next, onGo
}: Props) {
  const status = STATUS_COPY[topic.status];

  return (
    <article className="max-w-[76ch] mx-auto px-6 py-8 space-y-6 text-slate-200">
      <header className="space-y-3.5">
        <div className="flex items-center gap-1.5 flex-wrap text-[10px] font-mono font-bold uppercase tracking-wider">
          <span className="px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800/80">{topic.area}</span>
          <span className="text-slate-400 font-sans">{topic.group}</span>
          <span className="text-slate-500">· {topic.minutes} min read</span>
          <span className={`px-2 py-0.5 rounded border ${status.cls}`}>{status.label}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-snug">
          {topic.title}
        </h1>

        <p className="text-xs sm:text-sm leading-relaxed text-slate-300 bg-slate-950/80 border border-slate-800 rounded-xl p-4">
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
          <p key={i} className="text-xs sm:text-sm leading-relaxed text-slate-300">
            {para}
          </p>
        ))}
      </section>

      {topic.code && (
        <pre className="text-xs leading-relaxed bg-slate-950 text-sky-300 border border-slate-800 rounded-xl p-4 overflow-x-auto font-mono">
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

      <section className="rounded-xl border border-slate-800 bg-slate-950/60 overflow-hidden">
        <h2 className="flex items-center gap-2 px-4 py-2.5 bg-slate-950 border-b border-slate-800 text-[11px] font-bold uppercase tracking-wider text-amber-400">
          <Key size={13} /> Worth Memorising Invariants
        </h2>
        <ul className="p-4 space-y-2 text-xs">
          {topic.keyPoints.map((k, i) => (
            <li key={i} className="leading-relaxed text-slate-300 flex gap-2">
              <span className="text-amber-400 font-bold select-none">▪</span><span>{k}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-sky-500/30 bg-sky-950/20 p-4 space-y-1.5">
        <h2 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-sky-400">
          <Target size={13} /> How It Is Tested in FAANG Technical Rounds
        </h2>
        <p className="text-xs leading-relaxed text-slate-300">{topic.interview}</p>
      </section>

      {topic.pitfalls && topic.pitfalls.length > 0 && (
        <section className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-4 space-y-1.5">
          <h2 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-rose-400">
            <AlertTriangle size={13} /> Candidate Pitfalls & Common Traps
          </h2>
          <ul className="space-y-1.5 text-xs">
            {topic.pitfalls.map((p, i) => (
              <li key={i} className="leading-relaxed text-rose-200 flex gap-2">
                <span className="select-none text-rose-400 font-bold">✗</span><span>{p}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="rounded-xl border border-slate-800 bg-slate-950/60 overflow-hidden">
        <h2 className="flex items-center gap-2 px-4 py-2.5 bg-slate-950 border-b border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          <BookOpen size={13} className="text-sky-400" /> Deep Dive Resources
        </h2>
        <ul className="divide-y divide-slate-800/80">
          {topic.resources.map((r) => (
            <li key={r.url}>
              <a href={r.url} target="_blank" rel="noreferrer noopener" className="flex items-start gap-2.5 px-4 py-3 hover:bg-slate-900/60 group transition">
                <ExternalLink size={13} className="mt-0.5 shrink-0 text-slate-500 group-hover:text-sky-400" />
                <span className="flex-1 min-w-0">
                  <span className="block text-xs font-semibold text-sky-400 group-hover:underline">{r.label}</span>
                  {r.note && <span className="block text-[11px] text-slate-400 mt-0.5">{r.note}</span>}
                </span>
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-500 shrink-0 mt-0.5">{r.kind}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <ReaderFooter prev={prev} next={next} isRead={isRead} onGo={onGo} onToggleRead={onToggleRead} />
    </article>
  );
}
