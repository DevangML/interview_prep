import { useState } from 'react';
import { LADDER_DATA, type LadderLesson } from '../data/ladder';
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

  const stageLessons = LADDER_DATA.lessons.filter((l) => l.stage === activeStage);

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
        <Panel title={`Stage ${activeStage} Lessons (${stageLessons.length})`} className="h-full">
          <div className="p-2 space-y-1">
            {stageLessons.map((l, i) => {
              const k = l.key || l.title || String(i);
              return (
                <button
                  key={k}
                  onClick={() => handlePick(l)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between transition-colors
                    ${(cur.key || cur.title) === k ? 'bg-sky-700 text-white font-semibold' : 'hover:bg-slate-100 text-slate-700'}`}
                >
                  <div className="flex items-center gap-2 truncate">
                    {solvedMap[k] ? <CheckSquare size={13} className={(cur.key || cur.title) === k ? 'text-white' : 'text-emerald-600'} /> : <Square size={13} />}
                    <span className="truncate">{l.title}</span>
                  </div>
                  <ChevronRight size={12} className="opacity-60" />
                </button>
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
