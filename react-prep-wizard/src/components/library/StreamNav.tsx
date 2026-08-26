import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { useLibrary } from '../../hooks/useLibrary';
import type { FacetDef, SavedView } from '../../hooks/useLibrary';
import { MASTERY_UNITS, MASTERY_TRACKS, type MasteryUnit } from '../../data/masteryStream';
import { loadSchedule, statusOf } from '../../lib/schedule';
import { StreamFilterBar } from './StreamFilterBar';
import { StreamUnitItem } from './StreamUnitItem';

interface Props {
  activeId: string | null;
  solved: Record<string, boolean>;
  onSelect: (unit: MasteryUnit) => void;
}

const LEVELS: MasteryUnit['level'][] = ['Warm-up', 'Core', 'Advanced', 'Crucible'];
const REACT_TRACKS = ['js_core', 'js_traps', 'react_core', 'react_practical', 'react_ecosystem', 'async_apis'];

export default function StreamNav({ activeId, solved, onSelect }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const schedule = useMemo(() => loadSchedule(), []);
  const now = Date.now();
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});

  const trackName = useMemo(() => new Map(MASTERY_TRACKS.map((t) => [t.id, `${t.icon} ${t.name}`])), []);

  const facets = useMemo<FacetDef<MasteryUnit>[]>(() => [
    { id: 'level', label: 'level', options: LEVELS.map((l) => ({ value: l, label: l.toLowerCase(), test: (u: MasteryUnit) => u.level === l })) },
    { id: 'type', label: 'kind', options: [
      { value: 'css', label: 'css', test: (u) => u.practice.type === 'css' },
      { value: 'jsx', label: 'jsx', test: (u) => u.practice.type === 'jsx' },
      { value: 'js_snippet', label: 'js', test: (u) => u.practice.type === 'js_snippet' },
    ]},
    { id: 'progress', label: 'state', options: [
      { value: 'todo', label: 'unfinished', test: (u) => !solved[u.id] },
      { value: 'done', label: 'done', test: (u) => !solved[u.id] },
    ]},
  ], [solved]);

  const views = useMemo<SavedView<MasteryUnit>[]>(() => [
    { id: 'react', label: 'react & js', hint: 'React and JS units', test: (u) => REACT_TRACKS.includes(u.trackId) },
    { id: 'todo', label: 'unfinished', hint: 'Not yet completed', test: (u) => !solved[u.id] },
    { id: 'crucible', label: 'crucible', hint: 'Hardest tier', test: (u) => u.level === 'Crucible' },
    { id: 'due', label: 'due', hint: 'Decayed review', test: (u) => statusOf(schedule[u.id], now) === 'due' },
    { id: 'leech', label: 'leeches', hint: 'Failed 3+ times', test: (u) => statusOf(schedule[u.id], now) === 'leech' },
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

  const toggleGroup = (key: string) => setCollapsedGroups((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="h-full flex flex-col rounded-xl overflow-hidden shadow-sm border border-slate-200 bg-slate-900 text-slate-200">
      <StreamFilterBar
        query={lib.query}
        inputRef={inputRef}
        views={views}
        activeView={lib.activeView}
        facets={facets}
        activeFacets={lib.activeFacets}
        counts={counts}
        totalFiltered={lib.flatItems.length}
        totalUnits={MASTERY_UNITS.length}
        allExpanded={Object.keys(collapsedGroups).length === 0}
        onQueryChange={lib.setQuery}
        onSelectView={lib.selectView}
        onToggleFacet={lib.toggleFacet}
        onToggleAllExpanded={() => setCollapsedGroups((p) => Object.keys(p).length === 0 ? Object.fromEntries(lib.groups.map(g => [g.key, true])) : {})}
      />

      <div className="flex-1 min-h-0 overflow-y-auto p-2 space-y-3 custom-scrollbar">
        {lib.groups.map((group) => {
          const isCollapsed = collapsedGroups[group.key];
          return (
            <div key={group.key} className="space-y-1">
              <button
                onClick={() => toggleGroup(group.key)}
                className="w-full px-2 py-1 flex items-center justify-between text-xs font-bold text-slate-400 hover:text-slate-200 transition cursor-pointer"
              >
                <div className="flex items-center gap-1.5 truncate">
                  <ChevronRight size={13} className={`transition-transform duration-150 ${!isCollapsed ? 'rotate-90 text-sky-400' : ''}`} />
                  <span className="truncate">{group.label}</span>
                </div>
                <span className="text-[10px] font-mono opacity-60">({group.items.length})</span>
              </button>

              {!isCollapsed && (
                <div className="pl-2 space-y-0.5 border-l border-slate-800 ml-3.5">
                  {group.items.map((unit) => (
                    <StreamUnitItem
                      key={unit.id}
                      unit={unit}
                      isActive={unit.id === activeId}
                      isSolved={Boolean(solved[unit.id])}
                      schedule={schedule}
                      now={now}
                      onSelect={onSelect}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
