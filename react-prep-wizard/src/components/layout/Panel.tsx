import type { ReactNode } from 'react';

interface Props {
  title: string;
  children?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

export default function Panel({ title, children, actions, className = '' }: Props) {
  return (
    <section className={`bg-slate-900 border border-slate-800 rounded-2xl flex flex-col min-h-0 overflow-hidden text-slate-100 shadow-xl ${className}`}>
      <div className="px-3.5 py-2 border-b border-slate-800 bg-slate-950/90 backdrop-blur-md flex items-center gap-2 shrink-0">
        <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-slate-400">
          {title}
        </span>
        <span className="flex-1" />
        {actions}
      </div>
      <div className="flex-1 min-h-0 overflow-auto custom-scrollbar">
        {children}
      </div>
    </section>
  );
}
