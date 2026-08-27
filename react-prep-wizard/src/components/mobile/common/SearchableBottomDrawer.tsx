import React, { useState, useMemo } from 'react';
import { Search, Check, X } from 'lucide-react';
import BottomSheetModal from './BottomSheetModal';
import { haptic } from './HapticEngine';

export interface SelectOption {
  id: string;
  label: string;
  description?: string;
  group?: string;
  badge?: string;
  icon?: React.ReactNode;
}

export interface SearchableBottomDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  options: SelectOption[];
  selectedId?: string;
  onSelect: (option: SelectOption) => void;
  placeholder?: string;
}

export default function SearchableBottomDrawer({
  isOpen,
  onClose,
  title,
  options,
  selectedId,
  onSelect,
  placeholder = 'Search options...',
}: SearchableBottomDrawerProps) {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search.trim()) return options;
    const q = search.toLowerCase();
    return options.filter(
      (o) =>
        o.label.toLowerCase().includes(q) ||
        (o.description && o.description.toLowerCase().includes(q)) ||
        (o.group && o.group.toLowerCase().includes(q))
    );
  }, [options, search]);

  return (
    <BottomSheetModal isOpen={isOpen} onClose={onClose} title={title} initialDetent="full">
      <div className="space-y-3 pb-6">
        {/* Search Bar */}
        <div className="relative">
          <Search size={14} className="absolute left-3 top-2.5 text-slate-500 z-10 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-9 pr-8 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500/50"
            autoFocus
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-2.5 top-2.5 text-slate-500 hover:text-white"
            >
              <X size={13} />
            </button>
          )}
        </div>

        {/* Options List */}
        <div className="space-y-1">
          {filtered.length === 0 ? (
            <p className="text-center py-6 text-xs text-slate-500">No matching options found</p>
          ) : (
            filtered.map((opt) => {
              const isSelected = selectedId === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    haptic.selection();
                    onSelect(opt);
                    onClose();
                  }}
                  className={`w-full text-left p-3 rounded-xl border transition flex items-center justify-between gap-3 cursor-pointer ${
                    isSelected
                      ? 'bg-sky-950/60 border-sky-500/60 text-white shadow-xs'
                      : 'bg-slate-950/40 border-slate-800/80 text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {opt.icon && <span className="text-sm shrink-0">{opt.icon}</span>}
                    <div className="min-w-0 space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-white truncate">{opt.label}</span>
                        {opt.badge && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-sky-400 font-mono">
                            {opt.badge}
                          </span>
                        )}
                      </div>
                      {opt.description && (
                        <p className="text-[11px] text-slate-400 truncate">{opt.description}</p>
                      )}
                    </div>
                  </div>

                  {isSelected && (
                    <div className="p-1 rounded-full bg-sky-600 text-white shrink-0">
                      <Check size={12} />
                    </div>
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>
    </BottomSheetModal>
  );
}
