import React from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { haptic } from './HapticEngine';

export interface FilterChipOption {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

export interface StickyFilterChipsProps {
  options: FilterChipOption[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onOpenAllFilters?: () => void;
  allLabel?: string;
  totalCount?: number;
}

export default function StickyFilterChips({
  options,
  selectedId,
  onSelect,
  onOpenAllFilters,
  allLabel = 'All',
  totalCount,
}: StickyFilterChipsProps) {
  return (
    <div className="flex flex-wrap items-center gap-1.5 py-1 select-none min-w-0">
      {onOpenAllFilters && (
        <button
          type="button"
          onClick={() => {
            haptic.impactLight();
            onOpenAllFilters();
          }}
          className="p-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 shrink-0 transition cursor-pointer flex items-center justify-center"
          title="All Filters"
        >
          <SlidersHorizontal size={13} />
        </button>
      )}

      {/* All Option */}
      <button
        type="button"
        onClick={() => {
          haptic.selection();
          onSelect(null);
        }}
        className={`px-2.5 py-1 rounded-xl font-bold text-xs transition flex items-center gap-1 cursor-pointer border ${
          selectedId === null
            ? 'bg-sky-600 border-sky-500 text-white shadow-xs'
            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
        }`}
      >
        <span>{allLabel}</span>
        {totalCount !== undefined && (
          <span className="text-[10px] opacity-80 font-mono">({totalCount})</span>
        )}
      </button>

      {/* Filter Options */}
      {options.map((opt) => {
        const isActive = selectedId === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => {
              haptic.selection();
              onSelect(isActive ? null : opt.id);
            }}
            className={`px-2.5 py-1 rounded-xl font-bold text-xs transition flex items-center gap-1.5 cursor-pointer border min-w-0 truncate ${
              isActive
                ? 'bg-sky-600 border-sky-500 text-white shadow-xs'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {opt.icon && <span className="shrink-0">{opt.icon}</span>}
            <span className="truncate">{opt.label}</span>
            {opt.count !== undefined && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {opt.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
