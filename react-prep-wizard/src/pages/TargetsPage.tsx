import { useState } from 'react';
import { TARGETS_DATA, type TargetArchetype } from '../data/targets';
import Panel from '../components/layout/Panel';
import CodeEditor from '../components/editor/CodeEditor';
import { Timer, CheckCircle, Clock } from 'lucide-react';

export default function TargetsPage() {
  const [cur, setCur] = useState<TargetArchetype>(TARGETS_DATA[0]);
  const [code, setCode] = useState<string>('/* Type the target layout from blank */\n');
  const [seconds, setSeconds] = useState(120);
  const [timerRunning, setTimerRunning] = useState(false);

  const handlePick = (t: TargetArchetype) => {
    setCur(t);
    setCode('/* Type the ' + t.title + ' layout from blank */\n');
    setTimerRunning(false);
    setSeconds(t.time.includes('90') ? 90 : t.time.includes('5') ? 300 : t.time.includes('4') ? 240 : t.time.includes('3') ? 180 : 120);
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-slate-100 p-2">
      <main className="grid grid-cols-1 lg:grid-cols-[16rem_1fr_1fr] gap-2 flex-1 min-h-0">
        {/* Targets List */}
        <Panel title="10 UI Archetypes" className="h-full">
          <div className="p-2 space-y-1">
            {TARGETS_DATA.map((t) => (
              <button
                key={t.id}
                onClick={() => handlePick(t)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-xs flex items-center justify-between transition-colors
                  ${cur.id === t.id ? 'bg-sky-700 text-white font-semibold' : 'hover:bg-slate-100 text-slate-700'}`}
              >
                <span>{t.id} · {t.title}</span>
                <span className={`text-[0.65rem] px-1.5 py-0.5 rounded font-mono font-bold ${cur.id === t.id ? 'bg-sky-800' : 'bg-emerald-100 text-emerald-800'}`}>{t.time}</span>
              </button>
            ))}
          </div>
        </Panel>

        {/* Target Demonstration & Rules */}
        <Panel title={`Target ${cur.id} · ${cur.title}`} className="h-full flex flex-col">
          <div className="p-4 space-y-4 text-xs overflow-y-auto">
            <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <span className="font-bold uppercase tracking-wider text-slate-500">Target Time</span>
              <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">{cur.time}</span>
            </div>

            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <div className="bg-slate-100 px-3 py-1.5 font-bold text-slate-600 text-[0.68rem] uppercase tracking-wider">Live Archetype Preview</div>
              <div className="p-4 bg-slate-50" dangerouslySetInnerHTML={{ __html: cur.html }} />
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <div className="font-bold uppercase tracking-wider text-amber-800 text-[0.68rem] mb-1.5">Mandatory Assessment Checks</div>
              <ul className="space-y-1 text-amber-900">
                {cur.checks.map((c, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <CheckCircle size={12} className="text-amber-600 shrink-0" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Panel>

        {/* Blank Recall Scratchpad */}
        <Panel
          title="Speed Recall Scratchpad"
          actions={
            <button
              onClick={() => setTimerRunning(!timerRunning)}
              className={`px-2 py-0.5 text-xs rounded font-semibold flex items-center gap-1 ${timerRunning ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-white'}`}
            >
              <Clock size={11} /> {timerRunning ? `${seconds}s` : 'Start Sprint'}
            </button>
          }
          className="h-full flex flex-col"
        >
          <CodeEditor value={code} onChange={setCode} lang="css" autoFocus />
        </Panel>
      </main>
    </div>
  );
}
