import { useLayoutEffect, useMemo, useRef, useState } from 'react';

export interface PaletteAction {
  id: string;
  label: string;
  hint?: string;
  group: string;
  run: () => void;
}

interface Props {
  onClose: () => void;
  actions: PaletteAction[];
}

/** Mod-K over every action in the workbench. One keystroke, no navigation. */
export default function CommandPalette({ onClose, actions }: Props) {
  // Mounted only while open, so state starts fresh every time — no reset effect.
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => { inputRef.current?.focus(); }, []);

  const matches = useMemo(() => {
    const all = actions.filter(Boolean);
    const needle = q.trim().toLowerCase();
    if (!needle) return all.slice(0, 40);
    // Subsequence match, so "nxt" finds "next challenge".
    return all
      .filter((a) => {
        const hay = `${a.group} ${a.label}`.toLowerCase();
        let i = 0;
        for (const ch of needle) {
          i = hay.indexOf(ch, i);
          if (i === -1) return false;
          i++;
        }
        return true;
      })
      .slice(0, 40);
  }, [q, actions]);

  const choose = (a: PaletteAction | undefined) => {
    if (!a) return;
    onClose();
    a.run();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/40 flex items-start justify-center pt-[12vh]"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white rounded-xl shadow-2xl border border-slate-300 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => { setQ(e.target.value); setSel(0); }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') { e.preventDefault(); onClose(); }
            if (e.key === 'ArrowDown') { e.preventDefault(); setSel((s) => Math.min(s + 1, matches.length - 1)); }
            if (e.key === 'ArrowUp') { e.preventDefault(); setSel((s) => Math.max(s - 1, 0)); }
            if (e.key === 'Enter') { e.preventDefault(); choose(matches[sel]); }
          }}
          placeholder="Run a command…"
          className="w-full px-4 py-3 text-sm border-b border-slate-200 outline-none"
        />
        <ul className="max-h-80 overflow-auto py-1">
          {matches.length === 0 && (
            <li className="px-4 py-3 text-xs text-slate-400">no matching command</li>
          )}
          {matches.map((a, i) => (
            <li key={a.id}>
              <button
                onMouseEnter={() => setSel(i)}
                onClick={() => choose(a)}
                className={`w-full text-left px-4 py-2 flex items-baseline gap-2 text-sm ${
                  i === sel ? 'bg-sky-700 text-white' : 'hover:bg-slate-100'
                }`}
              >
                <span className={`text-[0.6rem] font-bold uppercase tracking-wider ${i === sel ? 'text-sky-200' : 'text-slate-400'}`}>
                  {a.group}
                </span>
                <span className="flex-1">{a.label}</span>
                {a.hint && (
                  <kbd className={`text-[0.6rem] font-mono px-1.5 py-0.5 rounded ${i === sel ? 'bg-sky-800 text-sky-100' : 'bg-slate-100 text-slate-500'}`}>
                    {a.hint}
                  </kbd>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
