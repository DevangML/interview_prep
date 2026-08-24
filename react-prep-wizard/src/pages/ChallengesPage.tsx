import { useState, useEffect, useDeferredValue } from 'react';
import { CHALLENGES } from '../data/challenges';
import { useCompiler } from '../hooks/useCompiler';
import Panel from '../components/layout/Panel';
import CodeEditor from '../components/editor/CodeEditor';
import SandboxFrame from '../components/preview/SandboxFrame';
import { CheckSquare, Square, RotateCcw, Lightbulb } from 'lucide-react';

export default function ChallengesPage() {
  const [cur, setCur] = useState(CHALLENGES[0]);
  const [code, setCode] = useState(CHALLENGES[0].start);
  const [appCss, setAppCss] = useState('');
  const [compiledJs, setCompiledJs] = useState('');
  const [solvedMap, setSolvedMap] = useState<Record<string, boolean>>(() => {
    try { return JSON.parse(localStorage.getItem('drills:ch:done') || '{}'); } catch { return {}; }
  });
  const { compile } = useCompiler();

  useEffect(() => {
    fetch('/app.css').then((r) => r.text()).then(setAppCss).catch(() => {});
  }, []);

  const deferredCode = useDeferredValue(code);
  useEffect(() => {
    compile(deferredCode).then((res) => {
      if (res.code) setCompiledJs(res.code);
    });
  }, [deferredCode, compile]);

  const handlePick = (c: typeof CHALLENGES[0]) => {
    setCur(c);
    setCode(c.start);
  };

  const toggleSolved = (id: string) => {
    const next = { ...solvedMap, [id]: !solvedMap[id] };
    setSolvedMap(next);
    localStorage.setItem('drills:ch:done', JSON.stringify(next));
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-slate-100">
      <main className="grid grid-cols-1 lg:grid-cols-[16rem_22rem_1fr] gap-2 p-2 flex-1 min-h-0">
        {/* Challenge List */}
        <Panel title="6 Practice Drills" className="h-full">
          <div className="p-2 space-y-1">
            {CHALLENGES.map((c) => (
              <button
                key={c.id}
                onClick={() => handlePick(c)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-xs flex items-center justify-between transition-colors
                  ${cur.id === c.id ? 'bg-sky-700 text-white font-semibold' : 'hover:bg-slate-100 text-slate-700'}`}
              >
                <div className="flex items-center gap-2">
                  {solvedMap[c.id] ? <CheckSquare size={13} className={cur.id === c.id ? 'text-white' : 'text-emerald-600'} /> : <Square size={13} />}
                  <span>{c.title}</span>
                </div>
                <span className={`text-[0.65rem] px-1.5 py-0.5 rounded font-mono ${cur.id === c.id ? 'bg-sky-800' : 'bg-slate-200 text-slate-600'}`}>{c.level}</span>
              </button>
            ))}
          </div>
        </Panel>

        {/* Challenge Brief */}
        <Panel
          title={cur.title}
          actions={
            <button
              onClick={() => toggleSolved(cur.id)}
              className={`px-2.5 py-0.5 text-xs rounded font-semibold transition-colors ${solvedMap[cur.id] ? 'bg-emerald-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-white'}`}
            >
              {solvedMap[cur.id] ? 'Solved ✓' : 'Mark Solved'}
            </button>
          }
          className="h-full flex flex-col"
        >
          <div className="p-4 space-y-4 text-xs">
            <div>
              <span className="text-[0.65rem] font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full mb-1 inline-block">
                Level: {cur.level} · {cur.time}
              </span>
              <p className="text-slate-600 leading-relaxed mt-2">{cur.brief}</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
              <div className="font-bold uppercase tracking-wider text-slate-500 mb-2">Requirements</div>
              <ul className="space-y-1.5 text-slate-700">
                {cur.req.map((r, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-sky-600 font-bold">•</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="font-bold uppercase tracking-wider text-slate-500 mb-2">Tiered Hints</div>
              <div className="space-y-1.5">
                {cur.hints.map((h, i) => (
                  <details key={i} className="border border-slate-200 rounded-lg overflow-hidden">
                    <summary className="px-3 py-1.5 bg-white text-xs font-semibold cursor-pointer text-sky-700 flex items-center gap-1.5">
                      <Lightbulb size={12} /> Hint #{i + 1}
                    </summary>
                    <p className="p-2.5 bg-slate-50 text-slate-600 border-t border-slate-200">{h}</p>
                  </details>
                ))}
              </div>
            </div>

            <details className="border border-slate-200 rounded-lg overflow-hidden">
              <summary className="px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold cursor-pointer">
                Reveal Reference Solution
              </summary>
              <pre className="p-3 bg-slate-950 text-slate-200 font-mono text-[0.75rem] overflow-x-auto whitespace-pre-wrap">
                {cur.sol}
              </pre>
            </details>
          </div>
        </Panel>

        {/* Code Editor & Live Preview */}
        <div className="grid grid-rows-2 gap-2 h-full min-h-0">
          <Panel
            title="React Code"
            actions={
              <button
                onClick={() => setCode(cur.start)}
                className="px-2 py-0.5 text-xs bg-white border border-gray-300 hover:bg-gray-50 rounded flex items-center gap-1"
              >
                <RotateCcw size={11} /> Reset
              </button>
            }
            className="h-full flex flex-col"
          >
            <CodeEditor value={code} onChange={setCode} lang="jsx" autoFocus />
          </Panel>
          <Panel title="Live Preview" className="h-full flex flex-col">
            <SandboxFrame baseCSS={appCss} userCSS="" jsCode={compiledJs} />
          </Panel>
        </div>
      </main>
    </div>
  );
}
