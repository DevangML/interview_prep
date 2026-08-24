import { useEffect, useState, useDeferredValue } from 'react';
import { fetchCampaign, submitChallenge, logActivity } from '../hooks/useApi';
import type { CampaignState, Quest, QuestChallenge } from '../types';
import { useCompiler } from '../hooks/useCompiler';
import Panel from '../components/layout/Panel';
import CodeEditor from '../components/editor/CodeEditor';
import SandboxFrame from '../components/preview/SandboxFrame';
import ProgressBar from '../components/shared/ProgressBar';
import { CheckSquare, Square, Lock, Play, RotateCcw, Lightbulb } from 'lucide-react';

export default function ArenaPage() {
  const [campaign, setCampaign] = useState<CampaignState | null>(null);
  const [activeQuest, setActiveQuest] = useState<Quest | null>(null);
  const [activeChallenge, setActiveChallenge] = useState<QuestChallenge | null>(null);
  const [code, setCode] = useState<string>('import React, { useState } from "react";\n\nexport default function App() {\n  return <div>Hello Arena</div>;\n}');
  const [appCss, setAppCss] = useState<string>('');
  const [compiledJs, setCompiledJs] = useState<string>('');
  const [hintsOpen, setHintsOpen] = useState<boolean[]>([]);
  const { compile } = useCompiler();

  useEffect(() => {
    fetchCampaign().then((st) => {
      setCampaign(st);
      const q = st.active_campaign.quests[0];
      if (q) {
        setActiveQuest(q);
        const c = q.challenges?.[0];
        if (c) setActiveChallenge(c);
      }
    }).catch(() => {});
    fetch('/app.css').then((r) => r.text()).then(setAppCss).catch(() => {});
  }, []);

  const deferredCode = useDeferredValue(code);
  useEffect(() => {
    compile(deferredCode).then((res) => {
      if (res.code) setCompiledJs(res.code);
    });
  }, [deferredCode, compile]);

  const p = campaign?.active_campaign?.progression;
  const quests = campaign?.active_campaign?.quests || [];

  const handleToggleDone = async () => {
    if (!activeChallenge) return;
    const nextDone = !activeChallenge.done;
    const res = await submitChallenge({ id: activeChallenge.id, done: nextDone, code });
    if (res.ok) {
      setCampaign((prev) => {
        if (!prev) return prev;
        const copy = JSON.parse(JSON.stringify(prev));
        for (const q of copy.active_campaign.quests) {
          for (const c of q.challenges || []) {
            if (c.id === activeChallenge.id) c.done = nextDone;
          }
        }
        if (res.progression) copy.active_campaign.progression = res.progression;
        return copy;
      });
      setActiveChallenge((prev) => (prev ? { ...prev, done: nextDone } : null));
    }
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-slate-100">
      <div className="bg-slate-900 text-white px-4 py-2 flex items-center justify-between text-xs shrink-0">
        <div className="flex items-center gap-3">
          <span className="font-bold">Campaign Rank: {p?.rank || 'Novice'}</span>
          <ProgressBar label="" value={p?.xp || 0} max={p?.xp_total || 1000} className="w-36" />
          <span className="text-slate-400 font-mono">{p?.xp || 0} / {p?.xp_total || 1000} XP</span>
        </div>
        <div className="text-slate-400 font-mono">
          {p?.challenges_cleared || 0} / {p?.challenges_total || 0} quests cleared
        </div>
      </div>

      <main className="grid grid-cols-1 lg:grid-cols-[18rem_1fr_1fr] gap-2 p-2 flex-1 min-h-0">
        {/* Quest Navigation */}
        <Panel title="Campaign Quests" className="h-full">
          <div className="p-2 space-y-4">
            {quests.map((q) => (
              <div key={q.id} className="border border-slate-200 rounded-lg overflow-hidden bg-white">
                <div className="px-3 py-2 bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-800 flex justify-between">
                  <span>{q.id} · {q.title}</span>
                  <span className="text-sky-600 font-mono">+{q.xp} XP</span>
                </div>
                <div className="divide-y divide-slate-100">
                  {(q.challenges || []).map((c) => (
                    <button
                      key={c.id}
                      disabled={!c.playable}
                      onClick={() => { setActiveQuest(q); setActiveChallenge(c); }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2 transition-colors
                        ${activeChallenge?.id === c.id ? 'bg-sky-50 text-sky-800 font-semibold' : 'hover:bg-slate-50 text-slate-700'}
                        ${!c.playable ? 'opacity-40 cursor-not-allowed' : ''}`}
                    >
                      {!c.playable ? <Lock size={12} /> : c.done ? <CheckSquare size={13} className="text-emerald-600" /> : <Square size={13} />}
                      <span className="truncate">{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Panel>

        {/* Challenge Brief & Requirements */}
        <Panel
          title={activeChallenge ? activeChallenge.name : 'Select a Challenge'}
          actions={
            activeChallenge && (
              <button
                onClick={handleToggleDone}
                className={`px-2.5 py-0.5 text-xs rounded font-semibold transition-colors ${activeChallenge.done ? 'bg-emerald-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-white'}`}
              >
                {activeChallenge.done ? 'Cleared ✓' : 'Mark Cleared'}
              </button>
            )
          }
          className="h-full flex flex-col"
        >
          <div className="p-4 space-y-4 text-xs">
            <div>
              <h3 className="font-bold text-slate-800 text-sm mb-1">{activeChallenge?.name}</h3>
              <p className="text-slate-600 leading-relaxed">
                Implement the required React component fulfilling all edge-case constraints and accessibility patterns.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
              <div className="font-bold uppercase tracking-wider text-slate-500 mb-2">Target Objectives</div>
              <ul className="space-y-1.5 text-slate-700">
                <li className="flex items-center gap-2">✓ Controlled inputs with synchronous validation state</li>
                <li className="flex items-center gap-2">✓ Cleanup timers/subscriptions inside useEffect</li>
                <li className="flex items-center gap-2">✓ Responsive layout with full keyboard navigation</li>
              </ul>
            </div>

            <div>
              <div className="font-bold uppercase tracking-wider text-slate-500 mb-2">Hints & Defense Questions</div>
              <div className="space-y-1.5">
                {['How does this prevent unnecessary re-renders?', 'What happens on rapid user typing?'].map((h, i) => (
                  <details key={i} className="border border-slate-200 rounded-lg overflow-hidden">
                    <summary className="px-3 py-1.5 bg-white text-xs font-semibold cursor-pointer text-sky-700 flex items-center gap-1.5">
                      <Lightbulb size={12} /> Interview Talking Point #{i + 1}
                    </summary>
                    <p className="p-2.5 bg-slate-50 text-slate-600 border-t border-slate-200">{h}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </Panel>

        {/* Code Editor & Live Preview */}
        <div className="grid grid-rows-2 gap-2 h-full min-h-0">
          <Panel title="Component Code" className="h-full flex flex-col">
            <CodeEditor value={code} onChange={setCode} lang="jsx" autoFocus />
          </Panel>
          <Panel title="Live Sandbox Preview" className="h-full flex flex-col">
            <SandboxFrame baseCSS={appCss} userCSS="" jsCode={compiledJs} />
          </Panel>
        </div>
      </main>
    </div>
  );
}
