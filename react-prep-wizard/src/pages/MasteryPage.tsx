import { useState, useDeferredValue, useEffect, useMemo } from 'react';
import { PanelGroup, Panel as ResizablePanel, PanelResizeHandle } from 'react-resizable-panels';
import confetti from 'canvas-confetti';
import { MASTERY_UNITS, MASTERY_TRACKS, UNIT_INDEX } from '../data/masteryStream';
import StreamNav from '../components/library/StreamNav';
import { gradeUnit } from '../lib/unitGrader';
import { loadSchedule, saveSchedule, review as reviewOf } from '../lib/schedule';
import type { Schedule } from '../lib/schedule';
import PaneBoundary from '../components/layout/PaneBoundary';
import { briefingFor } from '../lib/briefing';
import type { GradeResult } from '../lib/grader';
import { useCompiler } from '../hooks/useCompiler';
import { useFormatter } from '../hooks/useFormatter';
import { useSocraticAi } from '../hooks/useSocraticAi';
import { anchorFindings } from '../lib/anchorFindings';
import type { AnchoredFinding } from '../lib/anchorFindings';
import AiChatPanel from '../components/socratic/AiChatPanel';
import type { SocraticEvaluationVerdict } from '../types';
import { MasteryHeader } from '../components/mastery/MasteryHeader';
import { TheoryPane } from '../components/mastery/TheoryPane';
import { CodeCruciblePane } from '../components/mastery/CodeCruciblePane';
import { LivePreviewPane } from '../components/mastery/LivePreviewPane';
import { InspectionHub } from '../components/mastery/InspectionHub';

function getJsxViewCode(unit: any): string {
  if (unit.reference) {
    const trimmed = unit.reference.trim();
    if (trimmed.startsWith('import ') || trimmed.startsWith('export default function')) return trimmed;
    return `import React from 'react';\nimport './styles.css';\n\nexport default function App() {\n  return (\n${trimmed.split('\n').map((l: string) => '    ' + l).join('\n')}\n  );\n}\n`;
  }
  if (unit.practice.type === 'css') {
    const base = unit.practice.baseHtml || '<div className="container">\n  {/* Layout */}\n</div>';
    return `import React from 'react';\nimport './styles.css';\n\nexport default function App() {\n  return (\n${base.replace(/class=/g, 'className=').split('\n').map((l: string) => '    ' + l).join('\n')}\n  );\n}\n`;
  }
  if (unit.practice.type === 'jsx') return unit.practice.starterCode || `import React from 'react';\n\nexport default function App() {\n  return <div>${unit.title}</div>;\n}`;
  return `import React from 'react';\n\nexport default function App() {\n  return (\n    <div className="p-4 font-mono text-sm bg-slate-900 text-slate-100 min-h-screen">\n      <h1 className="text-lg font-bold text-sky-400 mb-2">${unit.title}</h1>\n    </div>\n  );\n}\n`;
}

export default function MasteryPage() {
  const [activeUnitId, setActiveUnitId] = useState(() => localStorage.getItem('mastery:activeUnit') || MASTERY_UNITS[0].id);
  const [userCode, setUserCode] = useState(() => localStorage.getItem('mastery:code:' + (localStorage.getItem('mastery:activeUnit') || MASTERY_UNITS[0].id)) || MASTERY_UNITS[UNIT_INDEX.get(localStorage.getItem('mastery:activeUnit') || MASTERY_UNITS[0].id) ?? 0]?.practice.starterCode || '');
  const [activeEditorTab, setActiveEditorTab] = useState<'editor' | 'jsx_view'>('editor');
  const [compiledJs, setCompiledJs] = useState('');
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [solvedUnits, setSolvedUnits] = useState<Record<string, boolean>>(() => {
    try { return JSON.parse(localStorage.getItem('mastery:solved') || '{}'); } catch { return {}; }
  });
  const [isPortalOpen, setIsPortalOpen] = useState(() => localStorage.getItem('mastery:portalOpen') === 'true');
  const [isChatOpen, setIsChatOpen] = useState(() => localStorage.getItem('mastery:chatOpen') === 'true');
  const [verdict, setVerdict] = useState<GradeResult | null>(null);
  const [grading, setGrading] = useState(false);
  const [socraticVerdict, setSocraticVerdict] = useState<SocraticEvaluationVerdict | null>(null);
  const [isDisputing, setIsDisputing] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [aiFindings, setAiFindings] = useState<AnchoredFinding[]>([]);
  const [schedule, setSchedule] = useState<Schedule>(() => loadSchedule());

  const { compile } = useCompiler();
  const { formatCSS, formatJSX, formatJS } = useFormatter();
  const { hardwareProfile, isSupported, isReady, isLoading, progressPercent, isAnalyzing, activeModelId, initializeEngine, evaluateFailure, disputeEvaluation, chatWithMentor } = useSocraticAi();

  const activeUnitIndex = UNIT_INDEX.get(activeUnitId) ?? 0;
  const cur = MASTERY_UNITS[activeUnitIndex] || MASTERY_UNITS[0];
  const brief = useMemo(() => briefingFor(cur), [cur]);
  const hintStack = useMemo(() => [...brief.guidance, ...(cur.hints ?? [])], [brief, cur.hints]);
  const totalXP = useMemo(() => Object.keys(solvedUnits).reduce((acc, id) => acc + (MASTERY_UNITS[UNIT_INDEX.get(id) ?? 0]?.xp || 0), 0), [solvedUnits]);

  useEffect(() => { localStorage.setItem('mastery:activeUnit', activeUnitId); localStorage.setItem('mastery:code:' + activeUnitId, userCode); }, [activeUnitId, userCode]);
  useEffect(() => { const t = setInterval(() => setElapsed((n) => n + 1), 1000); return () => clearInterval(t); }, [activeUnitId]);

  const deferredCode = useDeferredValue(userCode);
  useEffect(() => {
    if (cur.practice.type === 'jsx') compile(deferredCode).then(r => r.code && setCompiledJs(r.code));
    else if (cur.practice.type === 'js_snippet' && cur.trackId !== 'behavioural') {
      setConsoleOutput([]);
      const mock = { log: (...a: any[]) => setConsoleOutput(p => [...p, a.map(x => typeof x === 'object' ? JSON.stringify(x, null, 2) : String(x)).join(' ')]), error: (...a: any[]) => setConsoleOutput(p => [...p, `[ERROR] ${a.join(' ')}`]), warn: (...a: any[]) => setConsoleOutput(p => [...p, `[WARN] ${a.join(' ')}`]) };
      try { new Function('console', deferredCode)(mock); } catch (e: any) { setConsoleOutput(p => [...p, `Error: ${e.message}`]); }
    }
  }, [deferredCode, compile, cur.practice.type, cur.trackId]);

  const handleSelectUnit = (u: any) => { setActiveUnitId(u.id); setUserCode(localStorage.getItem('mastery:code:' + u.id) || u.practice.starterCode); setVerdict(null); setSocraticVerdict(null); setAiFindings([]); setElapsed(0); };
  const handleFormat = async () => { const f = cur.practice.type === 'css' ? formatCSS : cur.practice.type === 'js_snippet' ? formatJS : formatJSX; const r = await f(userCode); if (r.code) setUserCode(r.code); };
  const recordReview = (id: string, pass: boolean, ov = false) => { const n = { ...schedule, [id]: reviewOf(schedule[id], pass, ov) }; saveSchedule(n); setSchedule(n); };

  const handleGrade = async () => {
    if (grading) return;
    setGrading(true); setVerdict(null); setSocraticVerdict(null);
    const res = await gradeUnit(cur, userCode, compile);
    setVerdict(res); setGrading(false); recordReview(cur.id, res.pass);
    if (res.pass) {
      const next = { ...solvedUnits, [cur.id]: true }; setSolvedUnits(next); localStorage.setItem('mastery:solved', JSON.stringify(next)); confetti({ particleCount: 60, spread: 70, origin: { y: 0.8 } });
    } else if (isReady) {
      const reason = res.error || res.checks.filter(c => !c.ok).map(c => `${c.label}: got ${c.actual}, expected ${c.expected}`).join('; ');
      evaluateFailure({ unitTitle: cur.title, taskDescription: cur.practice.task, specs: cur.practice.specs, userCode, solutionCode: cur.practice.solutionCode, tier1FailureReason: reason, runtimeLogs: consoleOutput, practiceType: cur.practice.type }).then(soc => {
        if (!soc) return;
        setSocraticVerdict(soc);
        const { anchored } = anchorFindings(userCode, soc.findings ?? []);
        setAiFindings(anchored);
      });
    }
  };

  const handleApplyAiSemanticPass = () => {
    if (!verdict) return;
    const passed = { ...verdict, pass: true, checks: verdict.checks.map(c => ({ ...c, ok: true })) };
    setVerdict(passed); recordReview(cur.id, true, true);
    const next = { ...solvedUnits, [cur.id]: true }; setSolvedUnits(next); localStorage.setItem('mastery:solved', JSON.stringify(next)); confetti({ particleCount: 70, spread: 80, origin: { y: 0.8 } });
  };

  const handleDisputeVerdict = async (arg: string) => {
    if (!verdict || !isReady) return;
    setIsDisputing(true);
    const reason = verdict.error || verdict.checks.filter(c => !c.ok).map(c => `${c.label}: got ${c.actual}, expected ${c.expected}`).join('; ');
    const appeal = await disputeEvaluation({ unitTitle: cur.title, taskDescription: cur.practice.task, specs: cur.practice.specs, userCode, solutionCode: cur.practice.solutionCode, tier1FailureReason: reason, userArgument: arg, previousVerdict: socraticVerdict, practiceType: cur.practice.type });
    if (appeal) { setSocraticVerdict(appeal); const { anchored } = anchorFindings(userCode, appeal.findings ?? []); setAiFindings(anchored); if (appeal.isSemanticPass) confetti({ particleCount: 70, spread: 80, origin: { y: 0.8 } }); }
    setIsDisputing(false);
  };

  const fullCssHtml = `<!doctype html><html><head><meta charset="utf-8"><style>*,*::before,*::after{box-sizing:border-box}body{margin:0;padding:16px;font:14px system-ui;color:#0f172a;background:#fff}</style><style>${cur.practice.baseCss || ''}</style><style>${deferredCode}</style></head><body>${cur.practice.baseHtml || ''}</body></html>`;

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-slate-100">
      <MasteryHeader hardwareProfile={hardwareProfile} isAiReady={isReady} isAiLoading={isLoading} isAiSupported={isSupported} aiPercent={progressPercent} activeModelId={activeModelId} isChatOpen={isChatOpen} totalXP={totalXP} unitCount={MASTERY_UNITS.length} trackCount={MASTERY_TRACKS.length} onToggleChat={() => setIsChatOpen(!isChatOpen)} onInitAi={initializeEngine} />
      <main className="p-2 flex-1 min-h-0 flex flex-col lg:flex-row gap-2">
        <PanelGroup direction="horizontal" className="h-full w-full gap-2">
          {!isPortalOpen && (
            <>
              <ResizablePanel defaultSize={20} minSize={15} order={1}>
                <PaneBoundary name="Stream navigator"><StreamNav activeId={cur.id} solved={solvedUnits} onSelect={handleSelectUnit} /></PaneBoundary>
              </ResizablePanel>
              <PanelResizeHandle className="w-1.5 flex-shrink-0 bg-transparent hover:bg-sky-400 transition-colors rounded-full cursor-col-resize z-10 hidden lg:block" />
              <ResizablePanel defaultSize={35} minSize={20} order={2}>
                <TheoryPane cur={cur} brief={brief} hintStack={hintStack} activeUnitIndex={activeUnitIndex} totalUnits={MASTERY_UNITS.length} onPrev={() => activeUnitIndex > 0 && handleSelectUnit(MASTERY_UNITS[activeUnitIndex - 1])} onNext={() => activeUnitIndex < MASTERY_UNITS.length - 1 && handleSelectUnit(MASTERY_UNITS[activeUnitIndex + 1])} />
              </ResizablePanel>
              <PanelResizeHandle className="w-1.5 flex-shrink-0 bg-transparent hover:bg-sky-400 transition-colors rounded-full cursor-col-resize z-10 hidden lg:block" />
            </>
          )}
          <ResizablePanel defaultSize={45} minSize={25} order={3} className={isPortalOpen ? "!flex-none w-0 h-0 overflow-visible" : ""}>
            <PaneBoundary name="Crucible">
              <PanelGroup direction={isPortalOpen ? "horizontal" : "vertical"} className={isPortalOpen ? "fixed inset-0 z-50 bg-slate-900 p-2 gap-2" : "h-full min-h-0 gap-2 w-full"}>
                <ResizablePanel defaultSize={55} minSize={20} order={isPortalOpen ? 2 : 1}>
                  <CodeCruciblePane cur={cur} userCode={userCode} activeEditorTab={activeEditorTab} isPortalOpen={isPortalOpen} isChatOpen={isChatOpen} isSolved={!!solvedUnits[cur.id]} grading={grading} elapsed={elapsed} aiFindings={aiFindings} jsxViewCode={getJsxViewCode(cur)} onCodeChange={setUserCode} onFormat={handleFormat} onGrade={handleGrade} onMarkComplete={() => { recordReview(cur.id, true, true); const next = { ...solvedUnits, [cur.id]: true }; setSolvedUnits(next); localStorage.setItem('mastery:solved', JSON.stringify(next)); confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } }); }} onToggleChat={() => setIsChatOpen(!isChatOpen)} onTogglePortal={() => setIsPortalOpen(!isPortalOpen)} onSelectTab={setActiveEditorTab} />
                </ResizablePanel>
                <PanelResizeHandle className={`flex-shrink-0 bg-transparent hover:bg-sky-400 transition-colors rounded-full z-10 ${isPortalOpen ? "w-1.5 cursor-col-resize" : "h-1.5 cursor-row-resize"}`} />
                <ResizablePanel defaultSize={45} minSize={20} order={isPortalOpen ? 1 : 2}>
                  <PanelGroup direction={isPortalOpen ? "vertical" : "horizontal"} className={`gap-2 h-full min-h-0 w-full ${isPortalOpen ? 'bg-slate-950 rounded-xl border border-slate-800 p-1' : ''}`}>
                    <ResizablePanel defaultSize={65} minSize={30} order={1}>
                      <LivePreviewPane cur={cur} compiledJs={compiledJs} fullCssHtml={fullCssHtml} consoleOutput={consoleOutput} isPortalOpen={isPortalOpen} />
                    </ResizablePanel>
                    {!isPortalOpen && (
                      <>
                        <PanelResizeHandle className="w-1.5 flex-shrink-0 bg-transparent hover:bg-sky-400 transition-colors rounded-full cursor-col-resize z-10 hidden md:block" />
                        <ResizablePanel defaultSize={35} minSize={20} order={2}>
                          <InspectionHub verdict={verdict} grading={grading} socraticVerdict={socraticVerdict} isAiAnalyzing={isAnalyzing} isAiReady={isReady} isAiLoading={isLoading} isAiSupported={isSupported} specs={cur.practice.specs} solutionCode={cur.practice.solutionCode} practiceType={cur.practice.type} isDisputing={isDisputing} onApplyOverride={handleApplyAiSemanticPass} onDispute={handleDisputeVerdict} onInitAi={initializeEngine} />
                        </ResizablePanel>
                      </>
                    )}
                  </PanelGroup>
                </ResizablePanel>
              </PanelGroup>
            </PaneBoundary>
          </ResizablePanel>
        </PanelGroup>
      </main>
      {isChatOpen && (
        <div className="fixed bottom-3 right-3 z-40 w-[440px] max-w-[95vw] h-[580px] max-h-[85vh] shadow-2xl rounded-xl border border-slate-700 overflow-hidden animate-fadeIn">
          <AiChatPanel unit={cur} userCode={userCode} onClose={() => setIsChatOpen(false)} chatWithMentor={chatWithMentor} isAiReady={isReady} isAiLoading={isLoading} aiPercent={progressPercent} activeModelId={activeModelId} />
        </div>
      )}
    </div>
  );
}