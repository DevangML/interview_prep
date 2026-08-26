import React from 'react';
import { Search, X, ChevronsDownUp, ChevronsUpDown } from 'lucide-react';
import type { SavedView } from '../../hooks/useLibrary';
import type { MasteryUnit } from '../../data/masteryStream';

interface Props {
  query: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  views: SavedView<MasteryUnit>[];
  activeView: string | null;
  counts: Record<string, number>;
  totalFiltered: number;
  totalUnits: number;
  allExpanded: boolean;
  onQueryChange: (q: string) => void;
  onSelectView: (v: string | null) => void;
  onToggleAllExpanded: () => void;
}

export function StreamFilterBar({
  query, inputRef, views, activeView, counts,
  totalFiltered, totalUnits, allExpanded, onQueryChange, onSelectView, onToggleAllExpanded
}: Props) {
  return (
    <div className="p-3 border-b border-slate-800 bg-slate-950 shrink-0 flex flex-col gap-2">
      <div className="relative">
        <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search units, specs, concepts… (⌘/)"
          className="w-full bg-slate-900 border border-slate-700/80 text-slate-200 text-xs rounded-lg pl-8 pr-8 py-1.5 outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition placeholder:text-slate-500"
        />
        {query && (
          <button onClick={() => onQueryChange('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 cursor-pointer">
            <X size={12} />
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-1.5 text-xs">
        <div className="flex flex-wrap items-center gap-1">
          <button
            onClick={() => onSelectView(null)}
            className={`px-2 py-0.5 rounded-md font-semibold text-[10px] transition cursor-pointer border ${
              activeView === null
                ? 'bg-sky-500/20 text-sky-300 border-sky-500/50'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            All ({totalUnits})
          </button>

          {views.slice(0, 3).map((v) => {
            const isActive = activeView === v.id;
            return (
              <button
                key={v.id}
                onClick={() => onSelectView(isActive ? null : v.id)}
                className={`px-2 py-0.5 rounded-md font-semibold text-[10px] border transition cursor-pointer flex items-center gap-1 ${
                  isActive
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <span>{v.label}</span>
                <span className="opacity-60 text-[9px] tabular-nums">({counts[`view:${v.id}`] ?? 0})</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-1.5 shrink-0 ml-auto">
          <span className="font-mono text-[10px] text-slate-500 tabular-nums">{totalFiltered}</span>
          <button onClick={onToggleAllExpanded} className="text-slate-400 hover:text-slate-200 p-0.5 cursor-pointer" title="Toggle Expand All">
            {allExpanded ? <ChevronsDownUp size={13} /> : <ChevronsUpDown size={13} />}
          </button>
        </div>
      </div>
    </div>
  );
}
