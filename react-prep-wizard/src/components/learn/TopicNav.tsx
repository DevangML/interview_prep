import { useMemo } from 'react';
import { Search, X, ChevronRight, BookOpen } from 'lucide-react';
import { useLibrary } from '../../hooks/useLibrary';
import type { FacetDef, SavedView } from '../../hooks/useLibrary';
import { LEARN_TOPICS, AREA_ORDER } from '../../data/learn';
import type { LearnTopic, CoverageStatus } from '../../data/learn';

interface Props {
  activeId: string | null;
  read: Record<string, boolean>;
  onSelect: (topic: LearnTopic) => void;
}

const STATUS_DOT: Record<CoverageStatus, string> = {
  covered: 'bg-emerald-400',
  partial: 'bg-amber-400',
  missing: 'bg-rose-400',
};

export default function TopicNav({ activeId, read, onSelect }: Props) {
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
    items: LEARN_TOPICS,
    storageKey: 'learn:nav',
    text: (t) => `${t.title} ${t.area} ${t.group} ${t.summary} ${t.keyPoints.join(' ')}`,
    group: (t) => ({ key: t.area, label: t.area }),
    subgroup: (t) => ({ key: t.group, label: t.group }),
    facets,
    views,
  });

  const counts = useMemo(() => {
    const out: Record<string, number> = {};
    for (const f of facets) for (const o of f.options) out[`${f.id}:${o.value}`] = LEARN_TOPICS.filter(o.test).length;
    for (const v of views) out[`view:${v.id}`] = LEARN_TOPICS.filter(v.test).length;
    return out;
  }, [facets, views]);

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
            onKeyDown={(e) => { if (e.key === 'Escape') lib.setQuery(''); }}
            placeholder={`Search ${LEARN_TOPICS.length} topics…`}
            aria-label="Search the reading library"
            className="w-full pl-7 pr-2 py-1.5 text-xs bg-slate-900 border border-slate-700/80 rounded-lg outline-none focus:border-sky-500 text-slate-200 placeholder-slate-500"
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {views.map((v) => (
            <button
              key={v.id} onClick={() => lib.selectView(lib.activeView === v.id ? null : v.id)} title={v.hint}
              className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide border cursor-pointer transition ${
                lib.activeView === v.id ? 'bg-sky-600 border-sky-500 text-white shadow-xs' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {v.label} <span className="ml-1 opacity-70 tabular-nums">{counts[`view:${v.id}`]}</span>
            </button>
          ))}
        </div>

        {facets.map((f) => (
          <div key={f.id} className="flex flex-wrap items-center gap-1.5 text-[10px]">
            <span className="font-mono font-bold text-slate-500 w-10 shrink-0">{f.label}</span>
            {f.options.map((o) => (
              <button
                key={o.value} onClick={() => lib.toggleFacet(f.id, o.value)}
                className={`px-2 py-0.5 rounded-full text-[9px] font-semibold border cursor-pointer transition ${
                  (lib.activeFacets[f.id] ?? []).includes(o.value) ? 'bg-sky-500/20 border-sky-500/50 text-sky-300' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {o.label} <span className="ml-0.5 opacity-60 tabular-nums">{counts[`${f.id}:${o.value}`]}</span>
              </button>
            ))}
          </div>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
        {ordered.map((g) => (
          <details key={g.key} open={!g.collapsed} className="space-y-0.5">
            <summary
              onClick={(e) => { e.preventDefault(); lib.toggleCollapsed(g.key); }}
              className="flex items-center gap-1.5 p-2 rounded-lg text-xs font-bold cursor-pointer list-none text-slate-300 hover:bg-slate-800/60"
            >
              <ChevronRight size={12} className={`shrink-0 text-slate-500 transition-transform ${g.collapsed ? '' : 'rotate-90 text-sky-400'}`} />
              <span className="truncate">{g.label}</span>
              <span className="ml-auto text-[10px] font-mono text-slate-500">{g.items.length}</span>
            </summary>

            <div className="pl-2.5 pt-0.5 space-y-0.5 border-l border-slate-800/80 ml-3">
              {g.subgroups.map((sub) => (
                <div key={sub.key} className="space-y-0.5">
                  <p className="px-2 py-0.5 text-[9px] font-mono font-bold uppercase text-slate-500 truncate">{sub.label}</p>
                  {sub.items.map((t) => (
                    <button
                      key={t.id} onClick={() => onSelect(t)} aria-current={activeId === t.id}
                      className={`w-full text-left p-2 rounded-lg text-[11px] flex items-start gap-2 border transition cursor-pointer ${
                        activeId === t.id ? 'bg-sky-500/20 border-sky-500/40 text-sky-200 font-semibold shadow-xs' : 'border-transparent hover:bg-slate-800/60 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${STATUS_DOT[t.status]}`} />
                      <span className="flex-1 min-w-0">
                        <span className={`block truncate ${read[t.id] ? 'line-through opacity-50' : ''}`}>{t.title}</span>
                        <span className="flex items-center gap-1 text-[9px] text-slate-500 mt-0.5 font-mono">
                          <BookOpen size={9} /> {t.minutes}m · {t.resources.length} resources
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
