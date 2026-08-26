import { useMemo } from 'react';
import { Search, X, ChevronRight } from 'lucide-react';
import { useLibrary } from '../../hooks/useLibrary';
import type { FacetDef, SavedView } from '../../hooks/useLibrary';
import { LEARN_TOPICS, AREA_ORDER } from '../../data/learn';
import type { LearnTopic, CoverageStatus } from '../../data/learn';

interface Props {
  activeId: string | null;
  read: Record<string, boolean>;
  topics?: LearnTopic[];
  onSelect: (topic: LearnTopic) => void;
}

const STATUS_DOT: Record<CoverageStatus, string> = {
  covered: 'bg-emerald-400',
  partial: 'bg-amber-400',
  missing: 'bg-rose-400',
};

export default function TopicNav({ activeId, read, topics = LEARN_TOPICS, onSelect }: Props) {
  const facets = useMemo<FacetDef<LearnTopic>[]>(() => [
    {
      id: 'status',
      label: 'Drilled',
      options: [
        { value: 'covered', label: 'covered', test: (t) => t.status === 'covered' },
        { value: 'partial', label: 'thin', test: (t) => t.status === 'partial' },
        { value: 'missing', label: 'uncovered', test: (t) => t.status === 'missing' },
      ],
    },
    {
      id: 'read',
      label: 'State',
      options: [
        { value: 'unread', label: 'unread', test: (t) => !read[t.id] },
        { value: 'done', label: 'read', test: (t) => !!read[t.id] },
      ],
    },
  ], [read]);

  const views = useMemo<SavedView<LearnTopic>[]>(() => [
    { id: 'gaps', label: '🎯 Gaps', hint: 'Absent from drills', test: (t) => t.status === 'missing' },
    { id: 'unread', label: '📖 Unread', hint: 'Not yet marked read', test: (t) => !read[t.id] },
    { id: 'short', label: '⚡ <7 Min', hint: 'Quick read', test: (t) => t.minutes < 7 },
  ], [read]);

  const lib = useLibrary<LearnTopic>({
    items: topics,
    storageKey: 'learn:nav',
    text: (t) => `${t.title} ${t.area} ${t.group} ${t.summary} ${t.keyPoints.join(' ')}`,
    group: (t) => ({ key: t.area, label: t.area }),
    subgroup: (t) => ({ key: t.group, label: t.group }),
    facets,
    views,
  });

  const counts = useMemo(() => {
    const out: Record<string, number> = {};
    for (const f of facets) for (const o of f.options) out[`${f.id}:${o.value}`] = topics.filter(o.test).length;
    for (const v of views) out[`view:${v.id}`] = topics.filter(v.test).length;
    return out;
  }, [facets, views, topics]);

  const ordered = useMemo(
    () => [...lib.groups].sort((a, b) => AREA_ORDER.indexOf(a.key as never) - AREA_ORDER.indexOf(b.key as never)),
    [lib.groups],
  );

  return (
    <div className="h-full flex flex-col rounded-xl overflow-hidden border border-slate-800 bg-slate-900 text-slate-200">
      <div className="p-3 border-b border-slate-800 bg-slate-950/80 shrink-0 flex flex-col gap-2">
        <div className="relative">
          <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
          <input
            value={lib.query}
            onChange={(e) => lib.setQuery(e.target.value)}
            placeholder={`Search ${topics.length} topics...`}
            className="w-full pl-8 pr-7 py-1.5 text-xs rounded-lg border border-slate-700/80 bg-slate-900 text-slate-200 placeholder-slate-500 outline-none focus:border-sky-400"
          />
          {lib.query && (
            <button onClick={() => lib.setQuery('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200">
              <X size={12} />
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {views.map((v) => {
            const active = lib.activeView === v.id;
            return (
              <button
                key={v.id}
                onClick={() => lib.selectView(active ? null : v.id)}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition ${
                  active ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40' : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
                }`}
              >
                {v.label} <span className="text-[9px] opacity-70 font-mono">{counts[`view:${v.id}`] ?? 0}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
        {ordered.map((group) => {
          const isExpanded = !group.collapsed;
          return (
            <div key={group.key} className="rounded-lg overflow-hidden">
              <button
                onClick={() => lib.toggleCollapsed(group.key)}
                className="w-full px-2.5 py-1.5 flex items-center justify-between text-xs font-bold text-slate-300 hover:bg-slate-800/60 rounded-md transition"
              >
                <span className="flex items-center gap-1.5">
                  <ChevronRight size={12} className={`transition-transform duration-150 text-slate-500 ${isExpanded ? 'rotate-90 text-sky-400' : ''}`} />
                  <span>{group.label}</span>
                </span>
                <span className="text-[10px] font-mono text-slate-500">{group.total}</span>
              </button>

              {isExpanded && (
                <div className="pl-4 pr-1 py-1 space-y-0.5">
                  {group.items.map((t) => {
                    const isSelected = t.id === activeId;
                    const isRead = Boolean(read[t.id]);
                    return (
                      <button
                        key={t.id}
                        onClick={() => onSelect(t)}
                        className={`w-full px-2.5 py-1.5 rounded-lg text-left text-xs transition flex items-center justify-between gap-2 ${
                          isSelected
                            ? 'bg-sky-600 text-white font-bold shadow-xs'
                            : 'text-slate-300 hover:bg-slate-800/70'
                        }`}
                      >
                        <span className="flex items-center gap-2 truncate">
                          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${STATUS_DOT[t.status]}`} />
                          <span className="truncate">{t.title}</span>
                        </span>
                        {isRead && <span className="text-[9px] opacity-70 font-mono shrink-0">✓</span>}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
