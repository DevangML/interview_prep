import { useEffect } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import type { LearnTopic } from '../../data/learn';

interface Props {
  prev: LearnTopic | null;
  next: LearnTopic | null;
  isRead: boolean;
  onGo: (topic: LearnTopic) => void;
  onToggleRead: () => void;
}

/**
 * Continuous reading.
 *
 * Without this the reader was a dead end: finish a topic and the only way on
 * was to hunt the sidebar. Prev/next plus arrow keys turns 65 separate pages
 * into something you can actually sit and read through.
 */
export default function ReaderFooter({ prev, next, isRead, onGo, onToggleRead }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      // Never hijack arrows while someone is typing in the search field.
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === 'ArrowRight' && next) { e.preventDefault(); onGo(next); }
      if (e.key === 'ArrowLeft' && prev) { e.preventDefault(); onGo(prev); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next, onGo]);

  return (
    <footer className="mt-10 pt-6 border-t border-slate-200 space-y-4 pb-10">
      <button
        onClick={onToggleRead}
        className={`w-full px-4 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors
          ${isRead
            ? 'bg-emerald-600 text-white hover:bg-emerald-700'
            : 'bg-slate-900 text-white hover:bg-slate-800'}`}
      >
        <CheckCircle2 size={16} />
        {isRead ? 'Read — click to unmark' : 'Mark as read and continue'}
      </button>

      <nav className="grid grid-cols-2 gap-3" aria-label="Topic navigation">
        {prev ? (
          <button
            onClick={() => onGo(prev)}
            className="group text-left p-3 rounded-xl border border-slate-200 hover:border-sky-400 hover:bg-sky-50/50 transition-colors"
          >
            <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-sky-600">
              <ArrowLeft size={11} /> Previous
            </span>
            <span className="block text-[13px] font-semibold text-slate-800 mt-1 line-clamp-2">{prev.title}</span>
            <span className="block text-[10px] text-slate-400 mt-0.5">{prev.area}</span>
          </button>
        ) : <span />}

        {next ? (
          <button
            onClick={() => onGo(next)}
            className="group text-right p-3 rounded-xl border border-slate-200 hover:border-sky-400 hover:bg-sky-50/50 transition-colors"
          >
            <span className="flex items-center justify-end gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-sky-600">
              Next <ArrowRight size={11} />
            </span>
            <span className="block text-[13px] font-semibold text-slate-800 mt-1 line-clamp-2">{next.title}</span>
            <span className="block text-[10px] text-slate-400 mt-0.5">{next.area}</span>
          </button>
        ) : <span />}
      </nav>

      <p className="text-center text-[10px] text-slate-400">
        Use <kbd className="px-1 py-0.5 bg-slate-100 rounded font-mono">←</kbd> and{' '}
        <kbd className="px-1 py-0.5 bg-slate-100 rounded font-mono">→</kbd> to move between topics
      </p>
    </footer>
  );
}
