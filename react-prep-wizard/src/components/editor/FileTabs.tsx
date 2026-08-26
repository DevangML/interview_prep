import React from 'react';

interface Tab {
  key: string;
  label: string;
  readOnly?: boolean;
}

interface Props {
  tabs: Tab[];
  active: string;
  onSelect: (key: string) => void;
  actions?: React.ReactNode;
}

export default function FileTabs({ tabs, active, onSelect, actions }: Props) {
  return (
    // role="tablist"/"tab" rather than bare buttons: `aria-selected` is only a
    // valid attribute on tab-like roles, and without it axe flags every tab.
    <div
      role="tablist"
      className="px-3 py-1.5 border-b border-slate-800 bg-slate-950/90 flex items-center gap-1.5 shrink-0 flex-wrap"
    >
      {tabs.map((t) => (
        <button
          key={t.key}
          onClick={() => onSelect(t.key)}
          role="tab"
          aria-selected={t.key === active}
          className={`px-3 py-1 rounded-lg text-xs font-semibold font-mono transition cursor-pointer flex items-center gap-1 ${
            t.key === active
              ? 'bg-sky-700 text-white shadow-xs'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
          }`}
        >
          <span>{t.label}</span>
          {t.readOnly && <span className="text-[10px] px-1 py-0.2 rounded bg-slate-800 text-slate-400 font-sans">ro</span>}
        </button>
      ))}
      <span className="flex-1" />
      {actions}
    </div>
  );
}
