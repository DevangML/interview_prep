import React from 'react';
import { Search, X, ChevronsDownUp, ChevronsUpDown } from 'lucide-react';
import type { SavedView, FacetDef } from '../../hooks/useLibrary';
import type { MasteryUnit } from '../../data/masteryStream';

interface Props {
  query: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  views: SavedView<MasteryUnit>[];
  activeView: string | null;
  facets: FacetDef<MasteryUnit>[];
  activeFacets: Record<string, string[]>;
  counts: Record<string, number>;
  totalFiltered: number;
  totalUnits: number;
  allExpanded: boolean;
  onQueryChange: (q: string) => void;
  onSelectView: (v: string | null) => void;
  onToggleFacet: (fId: string, val: string) => void;
  onToggleAllExpanded: () => void;
}

export function StreamFilterBar({
  query, inputRef, views, activeView, facets, activeFacets, counts,
  totalFiltered, totalUnits, allExpanded, onQueryChange, onSelectView, onToggleFacet, onToggleAllExpanded
}: Props) {
  return (
    <div className="p-2.5 border-b border-slate-800 bg-slate-950/60 backdrop-blur-md shrink-0 flex flex-col gap-1.5">
      <div className="relative">
        <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search 244 units, specs, concepts…"
          className="w-full bg-slate-900/60 border border-slate-700/60 text-slate-200 text-[11px] rounded-lg pl-8 pr-10 py-2 outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500/50 transition placeholder:text-slate-600"
        />
        {query && (
          <button onClick={() => onQueryChange('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
            <X size={12} />
          </button>
        )}
      </div>

      <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5 text-[10px]">
        {views.map((v) => {
          const isActive = activeView === v.id;
          return (
            <button
              key={v.id}
              onClick={() => onSelectView(isActive ? null : v.id)}
              className={`px-2 py-0.5 rounded-md font-medium whitespace-nowrap border transition cursor-pointer flex items-center gap-1 ${
                isActive
                  ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                  : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <span>{v.label}</span>
              <span className="text-[9px] opacity-60">({counts[`view:${v.id}`] ?? 0})</span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between text-[10px] text-slate-500 pt-0.5">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {facets.map((f) => (
            <div key={f.id} className="flex items-center gap-0.5">
              {f.options.map((opt) => {
                const isSelected = activeFacets[f.id]?.includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    onClick={() => onToggleFacet(f.id, opt.value)}
                    className={`px-1.5 py-0.2 rounded text-[9px] border transition cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-500/30 text-indigo-200 border-indigo-500/40 font-semibold'
                        : 'bg-slate-950 text-slate-500 border-slate-800/80 hover:text-slate-300'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-1.5 shrink-0 pl-1">
          <span className="font-mono text-[9px]">{totalFiltered}/{totalUnits}</span>
          <button onClick={onToggleAllExpanded} className="text-slate-400 hover:text-slate-200 p-0.5 cursor-pointer">
            {allExpanded ? <ChevronsDownUp size={12} /> : <ChevronsUpDown size={12} />}
          </button>
        </div>
      </div>
    </div>
  );
}
