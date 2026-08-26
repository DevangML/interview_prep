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

export default function ReaderFooter({ prev, next, isRead, onGo, onToggleRead }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === 'ArrowRight' && next) { e.preventDefault(); onGo(next); }
      if (e.key === 'ArrowLeft' && prev) { e.preventDefault(); onGo(prev); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next, onGo]);

  return (
    <footer className="mt-12 pt-8 border-t border-slate-800 space-y-5 pb-12">
      <button
        onClick={onToggleRead}
        className={`w-full px-5 py-3.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-lg ${
          isRead
            ? 'bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 hover:bg-emerald-900'
            : 'bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white'
        }`}
      >
        <CheckCircle2 size={16} />
        <span>{isRead ? 'Lesson Mastered (Click to Reset)' : 'Mark as Mastered & Continue'}</span>
      </button>

      <nav className="grid grid-cols-1 sm:grid-cols-2 gap-3.5" aria-label="Topic navigation">
        {prev ? (
          <button
            onClick={() => onGo(prev)}
            className="group text-left p-4 rounded-2xl border border-slate-800 bg-slate-950/80 hover:border-sky-500/60 hover:bg-slate-900 transition cursor-pointer shadow-xs space-y-1"
          >
            <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 group-hover:text-sky-400">
              <ArrowLeft size={12} /> Previous Module
            </span>
            <span className="block text-xs sm:text-sm font-bold text-slate-200 group-hover:text-white line-clamp-1">{prev.title}</span>
            <span className="block text-[10px] text-slate-500">{prev.area}</span>
          </button>
        ) : <div />}

        {next ? (
          <button
            onClick={() => onGo(next)}
            className="group text-right p-4 rounded-2xl border border-slate-800 bg-slate-950/80 hover:border-sky-500/60 hover:bg-slate-900 transition cursor-pointer shadow-xs space-y-1"
          >
            <span className="flex items-center justify-end gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-sky-400 group-hover:text-sky-300">
              Up Next <ArrowRight size={12} />
            </span>
            <span className="block text-xs sm:text-sm font-bold text-slate-200 group-hover:text-white line-clamp-1">{next.title}</span>
            <span className="block text-[10px] text-slate-500">{next.area}</span>
          </button>
        ) : <div />}
      </nav>

      <p className="text-center text-[10px] text-slate-500 font-mono">
        Use <kbd className="px-1.5 py-0.5 bg-slate-900 border border-slate-700/80 rounded text-slate-300">←</kbd> and{' '}
        <kbd className="px-1.5 py-0.5 bg-slate-900 border border-slate-700/80 rounded text-slate-300">→</kbd> to navigate seamlessly
      </p>
    </footer>
  );
}
