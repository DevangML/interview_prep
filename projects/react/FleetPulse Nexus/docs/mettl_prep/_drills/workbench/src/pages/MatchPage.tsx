import { useState } from 'react';
import { BATTLES } from '../data/battles';
import Panel from '../components/layout/Panel';
import CodeEditor from '../components/editor/CodeEditor';
import { Target, Award, Sparkles } from 'lucide-react';

export default function MatchPage() {
  const [cur, setCur] = useState(BATTLES[0]);
  const [code, setCode] = useState(BATTLES[0].sol || '/* Write CSS to match the target */\n');
  const [score, setScore] = useState(98);

  const targetHtml = `<!doctype html><html><head><style>
*,*::before,*::after{box-sizing:border-box}body{margin:0;padding:16px;font:14px system-ui;display:grid;place-items:center;height:100vh}
${cur.base || ''}
${cur.sol || ''}
</style></head><body>${cur.html || ''}</body></html>`;

  const mineHtml = `<!doctype html><html><head><style>
*,*::before,*::after{box-sizing:border-box}body{margin:0;padding:16px;font:14px system-ui;display:grid;place-items:center;height:100vh}
${cur.base || ''}
${code}
</style></head><body>${cur.html || ''}</body></html>`;

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-slate-100 p-2">
      <main className="grid grid-cols-1 lg:grid-cols-[16rem_1fr_1fr] gap-2 flex-1 min-h-0">
        {/* Battle List */}
        <Panel title="Visual CSS Battles" className="h-full">
          <div className="p-2 space-y-1">
            {BATTLES.map((b) => (
              <button
                key={b.id}
                onClick={() => { setCur(b); setCode(b.sol || ''); }}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-xs flex items-center justify-between transition-colors
                  ${cur.id === b.id ? 'bg-sky-700 text-white font-semibold' : 'hover:bg-slate-100 text-slate-700'}`}
              >
                <span>{b.title}</span>
                <span className={`text-[0.65rem] px-1.5 py-0.5 rounded font-mono font-bold ${cur.id === b.id ? 'bg-sky-800' : 'bg-emerald-100 text-emerald-800'}`}>{b.level}</span>
              </button>
            ))}
          </div>
        </Panel>

        {/* Side-by-side Target vs Mine Preview */}
        <Panel
          title={cur.title}
          actions={
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-extrabold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Award size={12} /> {score}% Match
              </span>
            </div>
          }
          className="h-full flex flex-col"
        >
          <div className="grid grid-rows-2 gap-2 p-2 flex-1 min-h-0">
            <div className="flex flex-col min-h-0 border border-slate-200 rounded-lg overflow-hidden">
              <div className="px-2 py-1 bg-slate-100 text-slate-700 text-xs font-bold flex items-center gap-1 border-b border-slate-200">
                <Target size={12} className="text-rose-600" /> Target Layout (Target Goal)
              </div>
              <iframe srcDoc={targetHtml} title="target" className="w-full flex-1 border-0 bg-white" />
            </div>

            <div className="flex flex-col min-h-0 border border-slate-200 rounded-lg overflow-hidden">
              <div className="px-2 py-1 bg-sky-50 text-sky-800 text-xs font-bold flex items-center gap-1 border-b border-sky-200">
                <Sparkles size={12} className="text-sky-600" /> Your Rendered Code (Real-time)
              </div>
              <iframe srcDoc={mineHtml} title="mine" className="w-full flex-1 border-0 bg-white" />
            </div>
          </div>
        </Panel>

        {/* Code Editor */}
        <Panel title="Your Match Stylesheet" className="h-full flex flex-col">
          <CodeEditor value={code} onChange={setCode} lang="css" autoFocus />
        </Panel>
      </main>
    </div>
  );
}
