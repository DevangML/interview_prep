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
  covered: 'bg-emerald-500',
  partial: 'bg-amber-500',
  missing: 'bg-rose-500',
};

/**
 * The reading navigator.
 *
 * Built on `useLibrary` rather than a second filtering implementation — the
 * same engine that drives the drill stream, given a different config. Article
 * II: one list engine, many surfaces.
 */
export default function TopicNav({ activeId, read, onSelect }: Props) {
  const facets = useMemo<FacetDef<LearnTopic>[]>(() => [
    {
      id: 'status',
      label: 'drilled',
      options: [
        { value: 'covered', label: 'covered', test: (t) => t.status === 'covered' },
        { value: 'partial', label: 'thin', test: (t) => t.status === 'partial' },
        { value: 'missing', label: 'not drilled', test: (t) => t.status === 'missing' },
      ],
    },
    {
      id: 'read',
      label: 'state',
      options: [
        { value: 'unread', label: 'unread', test: (t) => !read[t.id] },
        { value: 'done', label: 'read', test: (t) => !!read[t.id] },
      ],
    },
  ], [read]);

  const views = useMemo<SavedView<LearnTopic>[]>(() => [
    { id: 'gaps', label: 'gaps', hint: 'On the syllabus for interviews, absent from your drills', test: (t) => t.status === 'missing' },
    { id: 'unread', label: 'unread', hint: 'Not yet marked read', test: (t) => !read[t.id] },
    { id: 'short', label: 'under 7 min', hint: 'Fits in a coffee break', test: (t) => t.minutes < 7 },
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

  const matched = lib.flatItems.length;

  const ordered = useMemo(
    () => [...lib.groups].sort((a, b) => AREA_ORDER.indexOf(a.key as never) - AREA_ORDER.indexOf(b.key as never)),
    [lib.groups],
  );

  return (
    <div className="h-full flex flex-col rounded-xl overflow-hidden border border-slate-200 bg-white">
      <div className="p-2.5 border-b border-slate-200 bg-slate-50/70 shrink-0 flex flex-col gap-1.5">
        <div className="relative">
          <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            value={lib.query}
            onChange={(e) => lib.setQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Escape') lib.setQuery(''); }}
            placeholder={`Search ${LEARN_TOPICS.length} topics…`}
            aria-label="Search the reading library"
            className="w-full pl-7 pr-2 py-1.5 text-xs bg-white border border-slate-300 rounded-md outline-none
                       focus:border-sky-600 focus:ring-2 focus:ring-sky-100"
          />
        </div>

        <div className="flex flex-wrap gap-1">
          {views.map((v) => (
            <button
              key={v.id} onClick={() => lib.selectView(lib.activeView === v.id ? null : v.id)} title={v.hint}
              aria-pressed={lib.activeView === v.id}
              className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide border
                ${lib.activeView === v.id ? 'bg-sky-700 border-sky-700 text-white' : 'bg-white border-slate-300 text-slate-600 hover:border-sky-500'}`}
            >
              {v.label}<span className="ml-1 opacity-60 tabular-nums">{counts[`view:${v.id}`]}</span>
            </button>
          ))}
        </div>

        {facets.map((f) => (
          <div key={f.id} className="flex flex-wrap items-center gap-1">
            <span className="text-[8px] font-bold uppercase tracking-wider text-slate-400 w-9 shrink-0">{f.label}</span>
            {f.options.map((o) => (
              <button
                key={o.value} onClick={() => lib.toggleFacet(f.id, o.value)}
                aria-pressed={(lib.activeFacets[f.id] ?? []).includes(o.value)}
                className={`px-1.5 py-0.5 rounded-full text-[9px] font-semibold border
                  ${(lib.activeFacets[f.id] ?? []).includes(o.value) ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-400'}`}
              >
                {o.label}<span className="ml-1 opacity-60 tabular-nums">{counts[`${f.id}:${o.value}`]}</span>
              </button>
            ))}
          </div>
        ))}

        <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
          <span aria-live="polite" className="tabular-nums font-semibold">
            {matched === lib.totalItems ? `${lib.totalItems} topics` : `${matched} of ${lib.totalItems}`}
          </span>
          {lib.isFiltered && (
            <button onClick={lib.clear} className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold">
              <X size={9} /> clear
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {ordered.length === 0 && (
          <div className="text-center p-6">
            <p className="text-xs text-slate-500 mb-2">
              Nothing matches{lib.query.trim() && <> “<strong>{lib.query.trim()}</strong>”</>}.
            </p>
            <button onClick={lib.clear} className="px-2 py-1 text-xs font-semibold rounded bg-sky-700 text-white">Clear filters</button>
          </div>
        )}

        {ordered.map((g) => (
          <details key={g.key} open={!g.collapsed} style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 2.5rem' }}>
            <summary
              onClick={(e) => { e.preventDefault(); lib.toggleCollapsed(g.key); }}
              className="flex items-center gap-1.5 p-2 rounded-lg text-[11px] font-bold cursor-pointer list-none
                         text-slate-700 hover:bg-slate-100"
            >
              <ChevronRight size={12} className={`shrink-0 text-slate-400 transition-transform ${g.collapsed ? '' : 'rotate-90'}`} />
              <span className="truncate">{g.label}</span>
              <span className="ml-auto text-[9px] tabular-nums text-slate-400">
                {g.items.length === g.total ? g.total : `${g.items.length}/${g.total}`}
              </span>
            </summary>

            <div className="pl-2 pt-1 space-y-1">
              {g.subgroups.map((sub) => (
                <div key={sub.key}>
                  <p className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-400 truncate">{sub.label}</p>
                  {sub.items.map((t) => (
                    <button
                      key={t.id} onClick={() => onSelect(t)} aria-current={activeId === t.id}
                      className={`w-full text-left p-2 rounded-lg text-[11px] flex items-start gap-2 border transition-colors
                        ${activeId === t.id ? 'bg-sky-50 border-sky-300 text-sky-900' : 'border-transparent hover:bg-slate-50 text-slate-600'}`}
                    >
                      <span className={`mt-1 w-1.5 h-1.5 rounded-full shrink-0 ${STATUS_DOT[t.status]}`}
                            title={`Drill coverage: ${t.status}`} />
                      <span className="flex-1 min-w-0">
                        <span className={`block truncate ${read[t.id] ? 'line-through opacity-60' : 'font-medium'}`}>{t.title}</span>
                        <span className="flex items-center gap-1 text-[9px] text-slate-400 mt-0.5">
                          <BookOpen size={9} /> {t.minutes} min · {t.resources.length} links
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
