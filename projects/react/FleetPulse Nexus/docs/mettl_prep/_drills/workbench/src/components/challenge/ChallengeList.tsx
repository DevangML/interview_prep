import { useMemo } from 'react';
import type { Challenge, Category } from '../../types';
import { useStore } from '../../store';
import { statusOf, dueLabel } from '../../lib/schedule';
import type { Status } from '../../lib/schedule';
import { useNow } from '../../hooks/useNow';
import { useLibrary } from '../../hooks/useLibrary';
import type { FacetDef, SavedView } from '../../hooks/useLibrary';
import LibraryToolbar from '../library/LibraryToolbar';
import CollapsibleGroup from '../library/CollapsibleGroup';

interface Props {
  items: Challenge[];
  categories: Category[];
}

const DOT: Record<Status, string> = {
  untouched: 'bg-slate-300',
  due: 'bg-amber-500',
  held: 'bg-emerald-500',
  leech: 'bg-red-500',
};

/** Same rule the brief uses, kept in one place so the facet cannot drift from it. */
export function difficultyOf(id: string): 'easy' | 'medium' | 'hard' {
  if (id.startsWith('BOX-') || id.startsWith('PLC-') || id.startsWith('FLEX-01') || id.startsWith('FLEX-02')) return 'easy';
  if (id.startsWith('TRK-') || id.startsWith('CQ-') || id.startsWith('MIX-') || id.startsWith('AREA-') || id.startsWith('XTRA-')) return 'hard';
  return 'medium';
}

export default function ChallengeList({ items, categories }: Props) {
  // Selector-scoped: this list re-renders when the schedule or selection moves,
  // not on every telemetry keystroke the page records.
  const currentId = useStore((s) => s.currentChallenge?.id);
  const pickChallenge = useStore((s) => s.pickChallenge);
  const schedule = useStore((s) => s.schedule);
  const now = useNow();

  const catLabel = useMemo(
    () => new Map(categories.map((c) => [c.k, c.n])),
    [categories],
  );

  const facets = useMemo<FacetDef<Challenge>[]>(() => [
    {
      id: 'status',
      label: 'state',
      options: [
        { value: 'due', label: 'due', test: (c) => statusOf(schedule[c.id], now) === 'due' },
        { value: 'held', label: 'held', test: (c) => statusOf(schedule[c.id], now) === 'held' },
        { value: 'leech', label: 'leech', test: (c) => statusOf(schedule[c.id], now) === 'leech' },
        { value: 'untouched', label: 'new', test: (c) => statusOf(schedule[c.id], now) === 'untouched' },
      ],
    },
    {
      id: 'diff',
      label: 'level',
      options: [
        { value: 'easy', label: 'easy', test: (c) => difficultyOf(c.id) === 'easy' },
        { value: 'medium', label: 'medium', test: (c) => difficultyOf(c.id) === 'medium' },
        { value: 'hard', label: 'hard', test: (c) => difficultyOf(c.id) === 'hard' },
      ],
    },
  ], [schedule, now]);

  const views = useMemo<SavedView<Challenge>[]>(() => [
    { id: 'due', label: 'due', hint: 'Scheduled for review now', test: (c) => statusOf(schedule[c.id], now) === 'due' },
    { id: 'leech', label: 'leeches', hint: 'Failed three times or more — the gap that keeps reopening', test: (c) => statusOf(schedule[c.id], now) === 'leech' },
    { id: 'new', label: 'never tried', hint: 'No attempt recorded', test: (c) => !schedule[c.id] },
    { id: 'failed', label: 'failed last', hint: 'Last graded attempt did not pass', test: (c) => schedule[c.id]?.lastPass === false },
  ], [schedule, now]);

  const lib = useLibrary<Challenge>({
    items,
    storageKey: 'css100:library',
    // The tested properties are part of the haystack: "minmax" finds the drills
    // that teach minmax even when the title never says the word.
    text: (c) => `${c.id} ${c.title} ${c.cat} ${c.task} ${c.use.map(([p]) => p).join(' ')}`,
    group: (c) => ({ key: c.cat, label: catLabel.get(c.cat) ?? c.cat }),
    facets,
    views,
  });

  // Counts shown on the chips themselves — a filter should say what it would do.
  const counts = useMemo(() => {
    const out: Record<string, number> = {};
    for (const f of facets) {
      for (const o of f.options) out[`${f.id}:${o.value}`] = items.filter(o.test).length;
    }
    for (const v of views) out[`view:${v.id}`] = items.filter(v.test).length;
    return out;
  }, [facets, views, items]);

  return (
    <div className="flex flex-col h-full min-h-0">
      <LibraryToolbar
        query={lib.query}
        setQuery={lib.setQuery}
        matched={lib.matched}
        total={lib.total}
        isFiltered={lib.isFiltered}
        clear={lib.clear}
        facets={lib.facets}
        isSelected={lib.isSelected}
        toggleFacet={lib.toggleFacet}
        views={lib.views}
        view={lib.view}
        toggleView={lib.toggleView}
        counts={counts}
        onCollapseAll={() => lib.setAllCollapsed(lib.allGroupKeys, true)}
        onExpandAll={() => lib.setAllCollapsed(lib.allGroupKeys, false)}
        placeholder="Search 108 drills, or a property…"
      />

      <div className={`flex-1 min-h-0 overflow-auto p-2 transition-opacity ${lib.stale ? 'opacity-60' : ''}`}>
        {lib.groups.length === 0 && (
          // The exit is part of the empty state; a dead end is a design failure.
          <div className="px-2 py-6 text-center">
            <p className="text-xs text-slate-500 mb-2" style={{ textWrap: 'balance' } as React.CSSProperties}>
              Nothing matches{lib.query.trim() && <> “<strong>{lib.query.trim()}</strong>”</>}.
            </p>
            <button
              onClick={lib.clear}
              className="px-2 py-1 text-xs font-semibold rounded bg-sky-700 text-white hover:bg-sky-800"
            >
              Clear filters
            </button>
          </div>
        )}

        {lib.groups.map((g) => {
          const held = g.items.filter((i) => statusOf(schedule[i.id], now) === 'held').length;
          return (
            <CollapsibleGroup
              key={g.key}
              label={g.label}
              count={g.items.length}
              total={g.total}
              collapsed={g.collapsed}
              onToggle={() => lib.toggleCollapsed(g.key)}
              meta={held > 0 && <span className="ml-1.5 text-emerald-600 tabular-nums">{held}✓</span>}
            >
              {g.items.map((item) => {
                const st = statusOf(schedule[item.id], now);
                const active = currentId === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => pickChallenge(item)}
                    aria-current={active}
                    title={dueLabel(schedule[item.id], now)}
                    className={`flex gap-1.5 items-baseline w-full text-left border-0 px-2 py-1 rounded text-sm cursor-pointer transition-colors
                      ${active ? 'bg-sky-700 text-white' : 'hover:bg-blue-50'}
                      ${st === 'held' && !active ? 'text-emerald-700' : ''}
                      ${st === 'leech' && !active ? 'text-red-700' : ''}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 self-center ${DOT[st]}`} />
                    <span className="text-[0.62rem] font-bold font-mono text-slate-400 shrink-0">{item.id}</span>
                    <span className="text-[0.8rem] leading-tight">{item.title}</span>
                  </button>
                );
              })}
            </CollapsibleGroup>
          );
        })}
      </div>
    </div>
  );
}
