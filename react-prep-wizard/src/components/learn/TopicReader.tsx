import React from 'react';
import { BookOpen, Target, AlertTriangle, Key, ExternalLink, Sparkles, Brain, Zap } from 'lucide-react';
import type { LearnTopic, CoverageStatus } from '../../data/learn';
import ReaderFooter from './ReaderFooter';
import { TopicConnectionsCard } from './TopicConnectionsCard';
import { KnowledgeDuelCard } from './KnowledgeDuelCard';
import { TradeOffMatrixCard } from './TradeOffMatrixCard';
import { FormattedMarkdown, formatInlineMarkdown } from '../socratic/FormattedMarkdown';
import TopicDiagramSection from './diagram/TopicDiagramSection';

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
  onOpenAi?: (prompt?: string) => void;
  chatWithMentor?: (params: any) => Promise<string | null>;
  isAiReady?: boolean;
}

const STATUS_COPY: Record<CoverageStatus, { label: string; cls: string }> = {
  covered: { label: 'Drilled', cls: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40' },
  partial: { label: 'Thinly drilled', cls: 'bg-amber-950/80 text-amber-300 border-amber-500/40' },
  missing: { label: 'Not drilled', cls: 'bg-rose-950/80 text-rose-300 border-rose-500/40' },
};

export default function TopicReader({
  topic, isRead, isDuelPassed, comboStreak, onToggleRead, onPassDuel, prev, next, onGo, onOpenAi,
  chatWithMentor, isAiReady
}: Props) {
  const status = STATUS_COPY[topic.status];

  return (
    <article className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 space-y-6 text-slate-200 break-words min-w-0 font-sans">
      <header className="space-y-4">
        {/* Top Metadata Row with Zero Horizontal Scroll */}
        <div className="flex items-center justify-between gap-2.5 flex-wrap min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider min-w-0">
            <span className="px-2.5 py-0.5 rounded-lg bg-sky-950 text-sky-300 border border-sky-800/80">{topic.area}</span>
            <span className="text-slate-400 font-sans">{topic.group}</span>
            <span className="text-slate-500">· {topic.minutes} min read</span>
            <span className={`px-2 py-0.5 rounded-lg border ${status.cls}`}>{status.label}</span>
          </div>

          {onOpenAi && (
            <button
              onClick={() => onOpenAi('/breakdown')}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition cursor-pointer shrink-0"
            >
              <Sparkles size={13} />
              <span>Ask AI Tutor</span>
            </button>
          )}
        </div>

        {/* Big Responsive Title */}
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white leading-snug break-words">
          {topic.title}
        </h1>

        {/* Summary Card with Crisp Legible Typography */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm min-w-0 break-words text-xs sm:text-[13px] leading-relaxed text-slate-200">
          <FormattedMarkdown text={topic.summary} />
        </div>

        {/* AI Quick Actions Bar - Wrap Safe Grid */}
        {onOpenAi && (
          <div className="flex items-center gap-2 flex-wrap pt-1 text-xs">
            <button
              onClick={() => onOpenAi('/breakdown')}
              className="px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-sky-300 transition cursor-pointer flex items-center gap-1.5 font-mono text-[11px]"
            >
              <span>🧠</span>
              <span className="font-bold">/breakdown</span>
            </button>
            <button
              onClick={() => onOpenAi('/duel')}
              className="px-2.5 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 transition cursor-pointer flex items-center gap-1.5 font-mono text-[11px] font-bold"
            >
              <span>⚡</span>
              <span>/duel</span>
            </button>
            <button
              onClick={() => onOpenAi('/rfcs')}
              className="px-2.5 py-1.5 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/30 text-sky-300 transition cursor-pointer flex items-center gap-1.5 font-mono text-[11px] font-bold"
            >
              <span>📚</span>
              <span>/rfcs</span>
            </button>
            <button
              onClick={() => onOpenAi('/innovate')}
              className="px-2.5 py-1.5 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-purple-300 transition cursor-pointer flex items-center gap-1.5 font-mono text-[11px] font-bold"
            >
              <span>🔮</span>
              <span>/innovate</span>
            </button>
            <button
              onClick={() => onOpenAi('/ux')}
              className="px-2.5 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 transition cursor-pointer flex items-center gap-1.5 font-mono text-[11px] font-bold"
            >
              <span>🎨</span>
              <span>/ux</span>
            </button>
          </div>
        )}
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

      {/* Core Lesson Narrative with Enhanced Legibility */}
      <section className="space-y-4 min-w-0 text-[13px] sm:text-sm lg:text-[14px] leading-relaxed text-slate-200">
        {topic.body.map((para, i) => (
          <FormattedMarkdown key={i} text={para} />
        ))}
      </section>

      {topic.code && (
        <pre className="text-xs sm:text-[13px] leading-relaxed bg-slate-950 text-sky-300 border border-slate-800 rounded-2xl p-4 overflow-x-auto font-mono custom-scrollbar whitespace-pre-wrap break-all max-w-full shadow-inner">
          <code>{topic.code}</code>
        </pre>
      )}

      <TopicDiagramSection
        topic={topic}
        chatWithMentor={chatWithMentor}
        isAiReady={isAiReady}
      />

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

      {/* Worth Memorising Invariants */}
      <section className="rounded-2xl border border-slate-800 bg-slate-950/80 overflow-hidden min-w-0 shadow-sm">
        <h2 className="flex items-center gap-2 px-4 py-3 bg-slate-900/90 border-b border-slate-800 text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
          <Key size={14} /> Worth Memorising Invariants
        </h2>
        <ul className="p-4 sm:p-5 space-y-2.5 text-xs sm:text-[13px]">
          {topic.keyPoints.map((k, i) => (
            <li key={i} className="leading-relaxed text-slate-300 flex items-start gap-2.5 min-w-0 break-words">
              <span className="text-amber-400 font-bold select-none mt-0.5 shrink-0">▪</span>
              <span className="min-w-0 flex-1 break-words" dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(k) }} />
            </li>
          ))}
        </ul>
      </section>

      {/* FAANG Technical Defense */}
      <section className="rounded-2xl border border-sky-500/30 bg-sky-950/20 p-4 sm:p-5 space-y-2 min-w-0 shadow-sm">
        <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-400 font-mono">
          <Target size={14} /> How It Is Tested in FAANG Technical Rounds
        </h2>
        <div className="text-xs sm:text-[13px] leading-relaxed text-slate-300 min-w-0 break-words">
          <FormattedMarkdown text={topic.interview} />
        </div>
      </section>

      {/* Pitfalls & Traps */}
      {topic.pitfalls && topic.pitfalls.length > 0 && (
        <section className="rounded-2xl border border-rose-500/30 bg-rose-950/20 p-4 sm:p-5 space-y-2 min-w-0 shadow-sm">
          <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-400 font-mono">
            <AlertTriangle size={14} /> Candidate Pitfalls & Common Traps
          </h2>
          <ul className="space-y-2 text-xs sm:text-[13px]">
            {topic.pitfalls.map((p, i) => (
              <li key={i} className="leading-relaxed text-rose-200 flex items-start gap-2.5 min-w-0 break-words">
                <span className="select-none text-rose-400 font-bold mt-0.5 shrink-0">✗</span>
                <span className="min-w-0 flex-1 break-words" dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(p) }} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Deep Dive Resources */}
      <section className="rounded-2xl border border-slate-800 bg-slate-950/80 overflow-hidden shadow-sm">
        <h2 className="flex items-center gap-2 px-4 py-3 bg-slate-900/90 border-b border-slate-800 text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
          <BookOpen size={14} className="text-sky-400" /> Deep Dive Resources
        </h2>
        <ul className="divide-y divide-slate-800/80">
          {topic.resources.map((r) => (
            <li key={r.url}>
              <a href={r.url} target="_blank" rel="noreferrer noopener" className="flex items-start gap-3 px-4 sm:px-5 py-3.5 hover:bg-slate-900/60 group transition">
                <ExternalLink size={14} className="mt-0.5 shrink-0 text-slate-500 group-hover:text-sky-400" />
                <span className="flex-1 min-w-0">
                  <span className="block text-xs sm:text-[13px] font-semibold text-sky-400 group-hover:underline">{r.label}</span>
                  {r.note && <span className="block text-xs text-slate-400 mt-0.5">{r.note}</span>}
                </span>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 shrink-0 mt-0.5">{r.kind}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <ReaderFooter prev={prev} next={next} isRead={isRead} onGo={onGo} onToggleRead={onToggleRead} />
    </article>
  );
}
