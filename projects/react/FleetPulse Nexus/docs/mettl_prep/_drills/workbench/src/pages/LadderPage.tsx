import { useState, useMemo } from 'react';
import { LADDER_DATA, type LadderLesson } from '../data/ladder';
import { useLibrary } from '../hooks/useLibrary';
import type { FacetDef, SavedView } from '../hooks/useLibrary';
import LibraryToolbar from '../components/library/LibraryToolbar';
import CollapsibleGroup from '../components/library/CollapsibleGroup';
import Panel from '../components/layout/Panel';
import CodeEditor from '../components/editor/CodeEditor';
import { CheckSquare, Square, ChevronRight } from 'lucide-react';
import { submitLesson } from '../hooks/useApi';

const STAGES = [
  { id: 1, name: 'Atoms & Box Model' },
  { id: 2, name: 'Flexbox Architecture' },
  { id: 3, name: 'Grid Masterclass' },
  { id: 4, name: 'Track Sizing & MinMax' },
  { id: 5, name: 'Responsive & Media' },
  { id: 6, name: 'Container Queries' },
  { id: 7, name: 'Reactivity & State' },
  { id: 8, name: 'Composition Patterns' },
  { id: 9, name: 'Mettl Boss Battles' },
];

export default function LadderPage() {
  const [activeStage, setActiveStage] = useState(1);
  const [cur, setCur] = useState<LadderLesson>(LADDER_DATA.lessons[0]);
  const [userCss, setUserCss] = useState(LADDER_DATA.lessons[0].css);
  const [solvedMap, setSolvedMap] = useState<Record<string, boolean>>(() => {
    try { return JSON.parse(localStorage.getItem('drills:ladder:done') || '{}'); } catch { return {}; }
  });

  const lessonKey = (l: LadderLesson): string => (l.key as string) || l.title;
  const stageName = (n: number) => STAGES.find((s) => s.id === n)?.name ?? `Stage ${n}`;

  /* Searching used to be impossible here: one stage visible at a time and no
     text field, so a lesson you half-remembered was unreachable without
     clicking through nine stages. Search spans all 70; the stage buttons stay
     as a coarse filter, because they are also how the curriculum is taught. */
  const facets = useMemo<FacetDef<LadderLesson>[]>(() => [
    {
      id: 'done',
      label: 'state',
      options: [
        { value: 'done', label: 'done', test: (l) => !!solvedMap[lessonKey(l)] },
        { value: 'todo', label: 'to do', test: (l) => !solvedMap[lessonKey(l)] },
      ],
    },
  ], [solvedMap]);

  const views = useMemo<SavedView<LadderLesson>[]>(() => [
    { id: 'stage', label: `stage ${activeStage} only`, hint: 'Just the stage selected above', test: (l) => l.stage === activeStage },
    { id: 'todo', label: 'unfinished', hint: 'Every lesson not yet marked done, across all stages', test: (l) => !solvedMap[lessonKey(l)] },
  ], [activeStage, solvedMap]);

  const lib = useLibrary<LadderLesson>({
    items: LADDER_DATA.lessons,
    storageKey: 'ladder:library',
    text: (l) => `${l.title} ${l.teach || ''} ${l.task || ''} ${l.why || ''}`,
    group: (l) => ({ key: String(l.stage), label: `${l.stage}. ${stageName(l.stage)}` }),
    facets,
    views,
  });

  const counts = useMemo(() => {
    const out: Record<string, number> = {};
    for (const f of facets) for (const o of f.options) out[`${f.id}:${o.value}`] = LADDER_DATA.lessons.filter(o.test).length;
    for (const v of views) out[`view:${v.id}`] = LADDER_DATA.lessons.filter(v.test).length;
    return out;
  }, [facets, views]);

  const handlePick = (l: LadderLesson) => {
    setCur(l);
    setUserCss(l.css);
  };

  const currentKey = cur.key || cur.title;

  const toggleSolved = async (key: string) => {
    const nextDone = !solvedMap[key];
    const next = { ...solvedMap, [key]: nextDone };
    setSolvedMap(next);
    localStorage.setItem('drills:ladder:done', JSON.stringify(next));
    await submitLesson({ key, done: nextDone, stage: String(cur.stage), title: cur.title });
  };

  const fullHtml = `<!doctype html><html><head><meta charset="utf-8">
<style>*,*::before,*::after{box-sizing:border-box}body{margin:0;padding:12px;font:14px system-ui}</style>
<style>${cur.base || ''}</style>
<style>${userCss}</style>
</head><body>${cur.html || ''}</body></html>`;

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-slate-100">
      <div className="bg-slate-900 text-white px-4 py-2 flex items-center gap-1.5 overflow-x-auto shrink-0 text-xs">
        <span className="font-bold text-slate-400 mr-2 uppercase tracking-wider text-[0.65rem]">Stages:</span>
        {STAGES.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveStage(s.id)}
            className={`px-3 py-1 rounded-md font-semibold whitespace-nowrap transition-colors
              ${activeStage === s.id ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
          >
            {s.id}. {s.name}
          </button>
        ))}
      </div>

      <main className="grid grid-cols-1 lg:grid-cols-[17rem_20rem_1fr] gap-2 p-2 flex-1 min-h-0">
        <Panel title="Lessons" className="h-full" bodyClassName="flex-1 min-h-0 flex flex-col">
          <LibraryToolbar
            query={lib.query} setQuery={lib.setQuery}
            matched={lib.matched} total={lib.total}
            isFiltered={lib.isFiltered} clear={lib.clear}
            facets={lib.facets} isSelected={lib.isSelected} toggleFacet={lib.toggleFacet}
            views={lib.views} view={lib.view} toggleView={lib.toggleView}
            counts={counts}
            onCollapseAll={() => lib.setAllCollapsed(lib.allGroupKeys, true)}
            onExpandAll={() => lib.setAllCollapsed(lib.allGroupKeys, false)}
            placeholder="Search 70 lessons…"
          />
          <div className={`flex-1 min-h-0 overflow-auto p-2 transition-opacity ${lib.stale ? 'opacity-60' : ''}`}>
            {lib.groups.length === 0 && (
              <div className="px-2 py-6 text-center">
                <p className="text-xs text-slate-500 mb-2">
                  Nothing matches{lib.query.trim() && <> “<strong>{lib.query.trim()}</strong>”</>}.
                </p>
                <button onClick={lib.clear} className="px-2 py-1 text-xs font-semibold rounded bg-sky-700 text-white hover:bg-sky-800">
                  Clear filters
                </button>
              </div>
            )}
            {lib.groups.map((g) => {
              const done = g.items.filter((l) => solvedMap[lessonKey(l)]).length;
              return (
                <CollapsibleGroup
                  key={g.key}
                  label={g.label}
                  count={g.items.length}
                  total={g.total}
                  collapsed={g.collapsed}
                  onToggle={() => lib.toggleCollapsed(g.key)}
                  meta={done > 0 && <span className="ml-1.5 text-emerald-600 tabular-nums">{done}✓</span>}
                >
                  {g.items.map((l) => {
                    const k = lessonKey(l);
                    const active = (cur.key || cur.title) === k;
                    return (
                      <button
                        key={k}
                        onClick={() => handlePick(l)}
                        aria-current={active}
                        className={`w-full text-left px-2 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors
                          ${active ? 'bg-sky-700 text-white font-semibold' : 'hover:bg-slate-100 text-slate-700'}`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          {solvedMap[k]
                            ? <CheckSquare size={13} className={active ? 'text-white' : 'text-emerald-600'} />
                            : <Square size={13} className="shrink-0 opacity-50" />}
                          <span className="truncate">{l.title}</span>
                        </div>
                        <ChevronRight size={12} className="opacity-60 shrink-0" />
                      </button>
                    );
                  })}
                </CollapsibleGroup>
              );
            })}
          </div>
        </Panel>

        <Panel
          title={cur.title}
          actions={
            <button
              onClick={() => toggleSolved(currentKey)}
              className={`px-2.5 py-0.5 text-xs rounded font-semibold transition-colors ${solvedMap[currentKey] ? 'bg-emerald-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-white'}`}
            >
              {solvedMap[currentKey] ? 'Completed ✓' : 'Mark Done'}
            </button>
          }
          className="h-full flex flex-col"
        >
          <div className="p-4 space-y-4 text-xs">
            <div className="bg-sky-50 border border-sky-200 rounded-lg p-3 text-sky-950 leading-relaxed" dangerouslySetInnerHTML={{ __html: cur.teach }} />
            {cur.task && <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-amber-950 leading-relaxed" dangerouslySetInnerHTML={{ __html: cur.task }} />}
            {cur.why && (
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-700 italic">
                <strong>Why this matters:</strong> {cur.why}
              </div>
            )}
          </div>
        </Panel>

        <div className="grid grid-rows-2 gap-2 h-full min-h-0">
          <Panel title="Interactive CSS Editor" className="h-full flex flex-col">
            <CodeEditor value={userCss} onChange={setUserCss} lang="css" autoFocus />
          </Panel>
          <Panel title="Rendered Target Preview" className="h-full flex flex-col">
            <iframe srcDoc={fullHtml} title="ladder-preview" sandbox="allow-scripts" className="w-full h-full border-0 bg-white" />
          </Panel>
        </div>
      </main>
    </div>
  );
}
