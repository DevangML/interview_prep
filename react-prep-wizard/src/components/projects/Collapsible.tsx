import { useState, type ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';

interface Props {
  title: string;
  count?: number | string;
  hint?: string;
  defaultOpen?: boolean;
  children: ReactNode;
}

/** Progressive disclosure: the header is always readable, the detail is opt-in. */
export default function Collapsible({ title, count, hint, defaultOpen = false, children }: Props) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section className="rounded-xl border border-slate-800 bg-slate-950/60 overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full px-3 py-2.5 flex items-center gap-2 text-left hover:bg-slate-900/60 transition"
      >
        <ChevronRight
          size={13}
          className={`shrink-0 text-slate-500 transition-transform duration-150 ${open ? 'rotate-90 text-sky-400' : ''}`}
        />
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">{title}</span>
        {count !== undefined && (
          <span className="text-[10px] font-mono text-slate-400">{count}</span>
        )}
        {hint && <span className="ml-auto text-[10px] text-slate-500 truncate">{hint}</span>}
      </button>
      {open && <div className="px-3 pb-3 pt-0.5">{children}</div>}
    </section>
  );
}
