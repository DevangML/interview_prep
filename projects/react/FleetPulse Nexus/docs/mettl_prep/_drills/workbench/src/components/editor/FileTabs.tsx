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
    <div className="px-3 py-1.5 border-b border-gray-200 bg-gray-50/60 flex items-center gap-1 shrink-0">
      {tabs.map((t) => (
        <button
          key={t.key}
          onClick={() => onSelect(t.key)}
          aria-selected={t.key === active}
          className={`px-2.5 py-1 rounded text-xs font-semibold font-mono transition-colors
            ${t.key === active
              ? 'bg-sky-700 text-white'
              : 'text-gray-500 hover:bg-gray-100'}`}
        >
          {t.label}
          {t.readOnly && <span className="ml-1 text-[0.6rem] opacity-70">ro</span>}
        </button>
      ))}
      <span className="flex-1" />
      {actions}
    </div>
  );
}
