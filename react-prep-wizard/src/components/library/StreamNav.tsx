import { useEffect, useMemo, useRef } from 'react';
import {
  Search, X, ChevronRight, ChevronsDownUp, ChevronsUpDown, CheckCircle2, Circle,
} from 'lucide-react';
import { useLibrary } from '../../hooks/useLibrary';
import type { FacetDef, SavedView } from '../../hooks/useLibrary';
import { MASTERY_UNITS, MASTERY_TRACKS, type MasteryUnit } from '../../data/masteryStream';
import { loadSchedule, statusOf, dueLabel } from '../../lib/schedule';

interface Props {
  activeId: string | null;
  solved: Record<string, boolean>;
  onSelect: (unit: MasteryUnit) => void;
}

const LEVELS: MasteryUnit['level'][] = ['Warm-up', 'Core', 'Advanced', 'Crucible'];
const REACT_TRACKS = ['js_core', 'js_traps', 'react_core', 'react_practical', 'react_ecosystem', 'async_apis'];

/**
 * The stream navigator.
 *
 * 244 units across 57 categories in one flat column is not a stream, it is a
 * wall. The data already carries the hierarchy the UI was throwing away —
 * track → category — so grouping is two levels, the top level is seven things
 * instead of fifty-seven, and every filter says how much it would show.
 *
 * Browsing lives here; ⌘K remains the surface for *acts*. Two patterns, two
 * intents (uxpatterns.dev), and neither borrows the other's job.
 */
export default function StreamNav({ activeId, solved, onSelect }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  // Read once per mount: a pass decays on a schedule of days, not seconds.
  const schedule = useMemo(() => loadSchedule(), []);
  const now = Date.now();

  const trackName = useMemo(
    () => new Map(MASTERY_TRACKS.map((t) => [t.id, `${t.icon} ${t.name}`])),
    [],
  );

  const facets = useMemo<FacetDef<MasteryUnit>[]>(() => [
    {
      id: 'level',
      label: 'level',
      options: LEVELS.map((l) => ({ value: l, label: l.toLowerCase(), test: (u: MasteryUnit) => u.level === l })),
    },
    {
      id: 'type',
      label: 'kind',
      options: [
        { value: 'css', label: 'css', test: (u) => u.practice.type === 'css' },
        { value: 'jsx', label: 'jsx', test: (u) => u.practice.type === 'jsx' },
        { value: 'js_snippet', label: 'js', test: (u) => u.practice.type === 'js_snippet' },
      ],
    },
    {
      id: 'progress',
      label: 'state',
      options: [
        { value: 'todo', label: 'unfinished', test: (u) => !solved[u.id] },
        { value: 'done', label: 'done', test: (u) => !!solved[u.id] },
      ],
    },
  ], [solved]);

  const views = useMemo<SavedView<MasteryUnit>[]>(() => [
    { id: 'react', label: 'react & js', hint: 'Everything that is not a CSS layout drill', test: (u) => REACT_TRACKS.includes(u.trackId) },
    { id: 'todo', label: 'unfinished', hint: 'Not yet marked complete', test: (u) => !solved[u.id] },
    { id: 'crucible', label: 'crucible', hint: 'The hardest tier', test: (u) => u.level === 'Crucible' },
    { id: 'due', label: 'due', hint: 'Passed once, and now decayed back into the queue', test: (u) => statusOf(schedule[u.id], now) === 'due' },
    { id: 'leech', label: 'leeches', hint: 'Failed three times or more — the gap that keeps reopening', test: (u) => statusOf(schedule[u.id], now) === 'leech' },
    { id: 'solvable', label: 'has solution', hint: 'Units whose solution differs from the starter — the rest teach by editing in place', test: (u) => u.practice.solutionCode !== u.practice.starterCode },
  ], [solved, schedule, now]);

  const lib = useLibrary<MasteryUnit>({
    items: MASTERY_UNITS,
    storageKey: 'mastery:nav',
    text: (u) => `${u.title} ${u.category} ${u.trackName} ${u.theory.hook} ${u.practice.specs.join(' ')}`,
    group: (u) => ({ key: u.trackId, label: trackName.get(u.trackId) ?? u.trackName }),
    subgroup: (u) => ({ key: u.category, label: u.category }),
    facets,
    views,
  });

  const counts = useMemo(() => {
    const out: Record<string, number> = {};
    for (const f of facets) for (const o of f.options) out[`${f.id}:${o.value}`] = MASTERY_UNITS.filter(o.test).length;
    for (const v of views) out[`view:${v.id}`] = MASTERY_UNITS.filter(v.test).length;
    return out;
  }, [facets, views]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === '/') {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="h-full flex flex-col rounded-xl overflow-hidden shadow-sm border border-slate-200 bg-slate-900 text-slate-200">
      <div className="p-2.5 border-b border-slate-800 bg-slate-950/60 backdrop-blur-md shrink-0 flex flex-col gap-1.5">
        <div className="relative">
          <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
          <input
            ref={inputRef}
            value={lib.query}
            onChange={(e) => lib.setQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Escape') { e.preventDefault(); lib.setQuery(''); } }}
            placeholder="Search 244 units, specs, concepts…"
            aria-label="Search the mastery stream"
            className="w-full bg-slate-900/60 border border-slate-700/60 text-slate-200 text-[11px] rounded-lg pl-8 pr-10 py-2
                       outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500/50 transition placeholder:text-slate-600"
          />
          <kbd className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] font-mono text-slate-600 pointer-events-none">⌘/</kbd>
        </div>

        <div className="flex flex-wrap gap-1">
          {lib.views.map((v) => (
            <button
              key={v.id}
              onClick={() => lib.toggleView(v.id)}
              title={v.hint}
              aria-pressed={lib.view === v.id}
              className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide border transition-colors
                ${lib.view === v.id
                  ? 'bg-sky-600 border-sky-500 text-white'
                  : 'bg-slate-900/60 border-slate-700/60 text-slate-400 hover:border-sky-600/60 hover:text-sky-300'}`}
            >
              {v.label}<span className="ml-1 opacity-60 tabular-nums">{counts[`view:${v.id}`]}</span>
            </button>
          ))}
        </div>

        {lib.facets.map((f) => (
          <div key={f.id} className="flex flex-wrap items-center gap-1">
            <span className="text-[8px] font-bold uppercase tracking-wider text-slate-600 w-7 shrink-0">{f.label}</span>
            {f.options.map((o) => {
              const on = lib.isSelected(f.id, o.value);
              return (
                <button
                  key={o.value}
                  onClick={() => lib.toggleFacet(f.id, o.value)}
                  aria-pressed={on}
                  className={`px-1.5 py-0.5 rounded-full text-[9px] font-semibold border transition-colors
                    ${on ? 'bg-slate-100 border-slate-100 text-slate-900' : 'bg-transparent border-slate-700/60 text-slate-400 hover:border-slate-500'}`}
                >
                  {o.label}<span className="ml-1 opacity-60 tabular-nums">{counts[`${f.id}:${o.value}`]}</span>
                </button>
              );
            })}
          </div>
        ))}

        <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
          <span aria-live="polite" className="tabular-nums font-semibold text-slate-400">
            {lib.matched === lib.total ? `${lib.total} units` : `${lib.matched} of ${lib.total}`}
          </span>
          {lib.isFiltered && (
            <button onClick={lib.clear} className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-300 hover:bg-amber-500/25 font-semibold">
              <X size={9} /> clear
            </button>
          )}
          <span className="flex-1" />
          <button onClick={() => lib.setAllCollapsed(lib.allGroupKeys, false)} title="Expand all tracks" className="p-0.5 hover:text-slate-200">
            <ChevronsUpDown size={11} />
          </button>
          <button onClick={() => lib.setAllCollapsed(lib.allGroupKeys, true)} title="Collapse all tracks" className="p-0.5 hover:text-slate-200">
            <ChevronsDownUp size={11} />
          </button>
        </div>
      </div>

      <div className={`flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1.5 transition-opacity ${lib.stale ? 'opacity-60' : ''}`}>
        {lib.groups.length === 0 && (
          <div className="text-center p-6">
            <p className="text-[11px] text-slate-500 mb-2" style={{ textWrap: 'balance' } as React.CSSProperties}>
              Nothing matches{lib.query.trim() && <> “<strong className="text-slate-300">{lib.query.trim()}</strong>”</>}.
            </p>
            <button onClick={lib.clear} className="px-2 py-1 text-[11px] font-semibold rounded bg-sky-600 text-white hover:bg-sky-500">
              Clear filters
            </button>
          </div>
        )}

        {lib.groups.map((g) => {
          const done = g.items.filter((u) => solved[u.id]).length;
          return (
            <details
              key={g.key}
              open={!g.collapsed}
              style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 2.5rem' }}
            >
              <summary
                onClick={(e) => { e.preventDefault(); lib.toggleCollapsed(g.key); }}
                className={`flex items-center gap-1.5 w-full p-2 rounded-lg text-[11px] font-semibold cursor-pointer select-none list-none transition-colors
                  ${g.collapsed ? 'text-slate-400 hover:bg-slate-800/50' : 'bg-slate-800/80 text-white'}`}
              >
                <ChevronRight size={12} className={`shrink-0 text-slate-500 transition-transform ${g.collapsed ? '' : 'rotate-90'}`} />
                <span className="truncate">{g.label}</span>
                <span className="ml-auto shrink-0 text-[9px] tabular-nums text-slate-500">
                  {done > 0 && <span className="text-emerald-500 mr-1">{done}✓</span>}
                  {g.items.length === g.total ? g.total : `${g.items.length}/${g.total}`}
                </span>
              </summary>

              <div className="pl-2 pt-1 space-y-1">
                {g.subgroups.map((sub) => (
                  <div key={sub.key}>
                    <p className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-600 truncate">
                      {sub.label}
                      <span className="ml-1 text-slate-700 tabular-nums">{sub.items.length}</span>
                    </p>
                    <div className="space-y-0.5">
                      {sub.items.map((u) => {
                        const isSelected = activeId === u.id;
                        const isDone = !!solved[u.id];
                        return (
                          <button
                            key={u.id}
                            onClick={() => onSelect(u)}
                            aria-current={isSelected}
                            title={dueLabel(schedule[u.id], now)}
                            className={`w-full text-left p-2 rounded-lg text-[11px] flex items-start gap-2 transition-all relative overflow-hidden group
                              ${isSelected
                                ? 'bg-sky-500/10 border border-sky-500/30 text-sky-100 shadow-[inset_2px_0_0_0_#0ea5e9]'
                                : 'hover:bg-slate-800/50 border border-transparent text-slate-400 hover:text-slate-300'}`}
                          >
                            <div className={`mt-0.5 shrink-0 ${isDone ? 'text-emerald-500' : isSelected ? 'text-sky-400' : 'text-slate-600 group-hover:text-slate-500'}`}>
                              {isDone ? <CheckCircle2 size={12} /> : <Circle size={12} />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className={`font-medium truncate ${isSelected ? 'text-white' : ''}`}>{u.title}</div>
                              <div className="flex items-center gap-1.5 text-[9px] opacity-70 mt-0.5">
                                <span className={`px-1 py-0.5 rounded ${isSelected ? 'bg-sky-500/20 text-sky-200' : 'bg-slate-800 text-slate-500'}`}>{u.level}</span>
                                <span>{u.xp} XP</span>
                                {u.practice.solutionCode === u.practice.starterCode && (
                                  <span className="text-amber-500/70" title="Teaches by editing in place — no separate solution in the source">edit-in-place</span>
                                )}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </details>
          );
        })}
      </div>
    </div>
  );
}
