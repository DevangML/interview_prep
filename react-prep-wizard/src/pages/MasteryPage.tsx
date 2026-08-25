import { useState, useDeferredValue, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  MASTERY_UNITS,
  MASTERY_TRACKS,
  UNIT_INDEX,
  UNIT_BY_ID,
  type MasteryUnit,
} from '../data/masteryStream';
import StreamNav from '../components/library/StreamNav';
import DiagramView from '../components/challenge/DiagramView';
import { gradeUnit } from '../lib/unitGrader';
import { loadSchedule, saveSchedule, review as reviewOf, statusOf, dueLabel } from '../lib/schedule';
import type { Schedule } from '../lib/schedule';
import SpokenDefense from '../components/challenge/SpokenDefense';
import Briefing from '../components/challenge/Briefing';
import PaneBoundary from '../components/layout/PaneBoundary';
import { briefingFor } from '../lib/briefing';
import type { GradeResult } from '../lib/grader';
import type { Diagram } from '../types';
import {
  ArrowLeft, ArrowRight, Award, BookOpen, CheckCircle2, ChevronRight, ChevronDown,
  Circle, Gavel, Mic, Sparkles, Zap, Search,
  MonitorSmartphone, Wand2, X, Smartphone, Tablet, Monitor
} from 'lucide-react';

const TRACK_COUNT = MASTERY_TRACKS.length;
import Panel from '../components/layout/Panel';
import CodeEditor from '../components/editor/CodeEditor';
import FileTabs from '../components/editor/FileTabs';
import SandboxFrame from '../components/preview/SandboxFrame';
import ResponsiveViewer from '../components/preview/ResponsiveViewer';
import { useCompiler } from '../hooks/useCompiler';
import { useFormatter } from '../hooks/useFormatter';

function getJsxViewCode(unit: MasteryUnit): string {
  if (unit.reference) {
    const trimmed = unit.reference.trim();
    if (trimmed.startsWith('import ') || trimmed.startsWith('export default function')) {
      return trimmed;
    }
    const indented = trimmed.split('\n').map((l) => '    ' + l).join('\n');
    return `import React from 'react';\nimport './styles.css';\n\nexport default function App() {\n  return (\n${indented}\n  );\n}\n`;
  }

  if (unit.practice.type === 'css') {
    const base = unit.practice.baseHtml || '<div className="container">\n  {/* Layout elements */}\n</div>';
    const formatted = base.replace(/class=/g, 'className=');
    const indented = formatted.split('\n').map((l) => '    ' + l).join('\n');
    return `import React from 'react';\nimport './styles.css';\n\nexport default function App() {\n  return (\n${indented}\n  );\n}\n`;
  }

  if (unit.practice.type === 'jsx') {
    return unit.practice.starterCode || `import React from 'react';\n\nexport default function App() {\n  return <div>${unit.title}</div>;\n}`;
  }

  if (unit.practice.type === 'js_snippet') {
    return `import React from 'react';\n\n// Integration & Harness for: ${unit.title}\nexport default function App() {\n  return (\n    <div className="p-4 font-mono text-sm bg-slate-900 text-slate-100 min-h-screen">\n      <h1 className="text-lg font-bold text-sky-400 mb-2">${unit.title}</h1>\n      <p className="text-xs text-slate-400 mb-4">${unit.theory.hook}</p>\n    </div>\n  );\n}\n`;
  }

  return `import React from 'react';\n\nexport default function App() {\n  return (\n    <div className="p-4">\n      <h2>${unit.title}</h2>\n    </div>\n  );\n}\n`;
}

export default function MasteryPage() {
  // Selection is keyed by unit id, not by index into MASTERY_UNITS. Index-keying
  // silently selects the wrong unit the moment the list is filtered or reordered
  // — and the list is now filtered by four facets and two grouping levels.
  const [activeUnitId, setActiveUnitId] = useState<string>(() => {
    return localStorage.getItem('mastery:activeUnit') || MASTERY_UNITS[0].id;
  });
  const [userCode, setUserCode] = useState<string>(() => {
    const savedUnitId = localStorage.getItem('mastery:activeUnit') || MASTERY_UNITS[0].id;
    const savedCode = localStorage.getItem('mastery:code:' + savedUnitId);
    if (savedCode) return savedCode;
    const idx = UNIT_INDEX.get(savedUnitId) ?? 0;
    return MASTERY_UNITS[idx]?.practice.starterCode || MASTERY_UNITS[0].practice.starterCode;
  });
  const [activeEditorTab, setActiveEditorTab] = useState<'editor' | 'jsx_view'>(() => {
    return (localStorage.getItem('mastery:activeTab') as 'editor' | 'jsx_view') || 'editor';
  });
  const [compiledJs, setCompiledJs] = useState<string>('');
  const [mcqAnswer, setMcqAnswer] = useState<number | null>(null);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [solvedUnits, setSolvedUnits] = useState<Record<string, boolean>>(() => {
    try {
      return JSON.parse(localStorage.getItem('mastery:solved') || '{}');
    } catch {
      return {};
    }
  });

  const { compile } = useCompiler();
  const { formatCSS, formatJSX } = useFormatter();
  const [isPortalOpen, setIsPortalOpen] = useState(() => localStorage.getItem('mastery:portalOpen') === 'true');
  
  const activeUnitIndex = UNIT_INDEX.get(activeUnitId) ?? 0;
  const cur = MASTERY_UNITS[activeUnitIndex] || MASTERY_UNITS[0];

  useEffect(() => {
    localStorage.setItem('mastery:activeUnit', activeUnitId);
  }, [activeUnitId]);

  useEffect(() => {
    localStorage.setItem('mastery:code:' + activeUnitId, userCode);
  }, [activeUnitId, userCode]);

  useEffect(() => {
    localStorage.setItem('mastery:activeTab', activeEditorTab);
  }, [activeEditorTab]);

  useEffect(() => {
    localStorage.setItem('mastery:portalOpen', String(isPortalOpen));
  }, [isPortalOpen]);

  const handleFormat = async () => {
    if (cur.practice.type === 'css') {
      const { code } = await formatCSS(userCode);
      if (code) setUserCode(code);
    } else if (cur.practice.type === 'jsx') {
      const { code } = await formatJSX(userCode);
      if (code) setUserCode(code);
    }
  };

  const handleCodeChange = (val: string) => {
    setUserCode(val);
  };
  const isSolved = !!solvedUnits[cur.id];
  const [showHint, setShowHint] = useState(0);
  const brief = useMemo(() => briefingFor(cur), [cur]);
  /** Diagnosis and method stripped from the question reappear here — spent, not given. */
  const hintStack = useMemo(
    () => [...brief.guidance, ...(cur.hints ?? [])],
    [brief, cur.hints],
  );
  const [verdict, setVerdict] = useState<GradeResult | null>(null);
  const [grading, setGrading] = useState(false);
  /** Seconds on the current unit. The OA is timed; untimed practice trains the wrong reflex. */
  const [elapsed, setElapsed] = useState(0);
  /**
   * Spaced repetition, finally connected. `mastery:solved` stays exactly as it
   * was so nothing already earned is lost — but a pass is now a lease on the
   * +1/+3/+7/+16/+35-day ladder the learning spec has always specified, not a
   * permanent tick.
   */
  const [schedule, setSchedule] = useState<Schedule>(() => loadSchedule());

  const recordReview = (id: string, pass: boolean, overridden = false) => {
    const next = { ...schedule, [id]: reviewOf(schedule[id], pass, overridden) };
    saveSchedule(next);
    setSchedule(next);
  };

  const handleSelectUnit = (unit: MasteryUnit) => {
    setActiveUnitId(unit.id);
    const saved = localStorage.getItem('mastery:code:' + unit.id);
    setUserCode(saved || unit.practice.starterCode);
    setActiveEditorTab('editor');
    setMcqAnswer(null);
    setConsoleOutput([]);
    setShowHint(0);
    setVerdict(null);
    setElapsed(0);
  };

  /**
   * The verdict. Renders the learner's code and the reference side by side and
   * compares what the browser computed — geometry and styles for CSS, the
   * rendered tree for JSX, the console output for a snippet.
   */
  const handleGrade = async () => {
    if (grading) return;
    setGrading(true);
    setVerdict(null);
    const result = await gradeUnit(cur, userCode, compile);
    setVerdict(result);
    setGrading(false);
    recordReview(cur.id, result.pass);
    if (result.pass) {
      const next = { ...solvedUnits, [cur.id]: true };
      setSolvedUnits(next);
      localStorage.setItem('mastery:solved', JSON.stringify(next));
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.8 } });
    }
  };

  useEffect(() => {
    const t = setInterval(() => setElapsed((n) => n + 1), 1000);
    return () => clearInterval(t);
  }, [activeUnitId]);

  const deferredCode = useDeferredValue(userCode);

  useEffect(() => {
    if (cur.practice.type === 'jsx') {
      compile(deferredCode).then((res) => {
        if (res.code) setCompiledJs(res.code);
      });
    } else if (cur.practice.type === 'js_snippet' && cur.trackId !== 'behavioural') {
      setConsoleOutput([]); 
      const mockConsole = {
        log: (...args: any[]) => {
          const msg = args.map(a => 
            typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)
          ).join(' ');
          setConsoleOutput(prev => [...prev, msg]);
        },
        error: (...args: any[]) => {
          const msg = args.map(a => String(a)).join(' ');
          setConsoleOutput(prev => [...prev, `[ERROR] ${msg}`]);
        },
        warn: (...args: any[]) => {
          const msg = args.map(a => String(a)).join(' ');
          setConsoleOutput(prev => [...prev, `[WARN] ${msg}`]);
        }
      };

      try {
        // eslint-disable-next-line no-new-func
        const fn = new Function('console', deferredCode);
        fn(mockConsole);
      } catch (err: any) {
        setConsoleOutput(prev => [...prev, `Error: ${err.message}`]);
      }
    }
  }, [deferredCode, compile, cur.practice.type]);

  const handleMarkComplete = () => {
    recordReview(cur.id, true, true);
    const next = { ...solvedUnits, [cur.id]: true };
    setSolvedUnits(next);
    localStorage.setItem('mastery:solved', JSON.stringify(next));

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
    });
  };

  const handleNext = () => {
    if (activeUnitIndex < MASTERY_UNITS.length - 1) {
      handleSelectUnit(MASTERY_UNITS[activeUnitIndex + 1]);
    }
  };

  const handlePrev = () => {
    if (activeUnitIndex > 0) {
      handleSelectUnit(MASTERY_UNITS[activeUnitIndex - 1]);
    }
  };

  const totalXP = Object.keys(solvedUnits).reduce((acc, id) => {
    return acc + (UNIT_BY_ID.get(id)?.xp || 0);
  }, 0);

  /**
   * Built from the deferred code, not the live buffer. `srcDoc` reloads the
   * whole document on every change, so keying it to each keystroke tore the
   * preview down mid-interaction — and a hover drill you cannot hover is not a
   * drill. Deferring lets typing settle before the frame is replaced.
   */
  const fullCssHtml = `<!doctype html><html><head><meta charset="utf-8">
<style>*,*::before,*::after{box-sizing:border-box}body{margin:0;padding:16px;font:14px system-ui;color:#0f172a;background:#ffffff}</style>
<style>${cur.practice.baseCss || ''}</style>
<style>${deferredCode}</style>
</head><body>${cur.practice.baseHtml || ''}</body></html>`;

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-slate-100">
      {/* Top Mastery Header */}
      <div className="bg-slate-950 text-white px-4 py-2 flex items-center justify-between gap-4 shrink-0 text-xs border-b border-slate-800">
        <div className="flex items-center gap-3">
          <Sparkles size={16} className="text-sky-400" />
          <span className="font-bold tracking-tight text-slate-100">Unified Interview Mastery Engine</span>
          <span className="text-slate-400 hidden md:inline">· Theory ↔ Code ↔ Defense</span>
        </div>

        {/* Track filtering moved into the stream navigator, where the counts
            live. The header keeps the one number that is not a filter. */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-slate-500 hidden lg:inline">{MASTERY_UNITS.length} units · {TRACK_COUNT} tracks</span>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-300 font-mono text-[11px]">
            <Award size={13} className="text-amber-400" />
            <span>{totalXP} XP</span>
          </div>
        </div>
      </div>

      {/* Main 3-Pane Unified Cockpit */}
      <main className="grid grid-cols-1 lg:grid-cols-[18rem_1fr_1.1fr] xl:grid-cols-[20rem_1fr_1.1fr] gap-2 p-2 flex-1 min-h-0">
        
        {/* Left: the stream navigator — search, facets, two-level grouping */}
        {!isPortalOpen && (
        <PaneBoundary name="The stream navigator">
          <StreamNav
            activeId={cur.id}
            solved={solvedUnits}
            onSelect={handleSelectUnit}
          />
        </PaneBoundary>
        )}

        {/* Center: Theory, Spoken Defense, MCQ */}
        {!isPortalOpen && (
        <Panel title={`Theory: ${cur.trackName}`} className="h-full flex flex-col border-slate-200 shadow-sm">
          <PaneBoundary name="The brief">
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-sky-50 text-sky-700 text-[10px] font-bold uppercase tracking-wider rounded mb-3">
                {cur.category}
              </div>
              <h1 className="text-2xl font-extrabold text-slate-900 mb-3 leading-tight tracking-tight">
                {cur.title}
              </h1>
            </div>

            {/* GIVEN → EXPECTED → DONE WHEN. No diagnosis, no method, no
                property names: an exam question states the material and the
                outcome, and says nothing about how. */}
            <Briefing briefing={brief} />

            {/* The explanation used to sit here, open, above the editor — so the
                answer was absorbed before the attempt. It is now a deliberate
                reveal, and revealing it is recorded. */}
            <details
              className="group border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs"
              onToggle={(e) => {
                if ((e.currentTarget as HTMLDetailsElement).open) setShowHint((n) => Math.max(n, 1));
              }}
            >
              <summary className="px-4 py-2.5 cursor-pointer list-none flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-500 hover:text-slate-800">
                <BookOpen size={13} className="text-sky-500" />
                Under the hood — reveals the mechanism
              </summary>
              <div className="px-4 pb-4 text-[14px] text-slate-600 leading-relaxed space-y-2">
                {cur.theory.deepDive}
              </div>
            </details>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm uppercase tracking-wide">
                <Mic size={16} className="text-purple-500" />
                <h3>Spoken Defense Pitch</h3>
              </div>
              <SpokenDefense pitch={cur.theory.interviewPitch} unitId={cur.id} />
            </div>

            {/* Restored context — the diagram, the hints, the why and the check.
                All four were carried by the source data and dropped by the
                original port; they are the difference between a task and a
                lesson. Hints reveal one at a time so the answer is not spent
                in a single click. */}
            {(!!cur.diagram || hintStack.length > 0 || cur.why || cur.verify || cur.takeaway) && (
              <div className="mt-6 space-y-3">
                {!!cur.diagram && (
                  <details className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm" open>
                    <summary className="px-4 py-2.5 cursor-pointer text-[11px] font-bold uppercase tracking-wider text-slate-500 hover:text-slate-800 list-none flex items-center gap-1.5">
                      <ChevronRight size={12} className="transition-transform [details[open]_&]:rotate-90" />
                      Target layout
                    </summary>
                    <div className="px-4 pb-4">
                      <DiagramView diagram={cur.diagram as Diagram} />
                    </div>
                  </details>
                )}

                {cur.takeaway && (
                  <div className="text-[13px] text-emerald-900 bg-emerald-50 border border-emerald-200 p-3 rounded-xl leading-relaxed">
                    <strong className="font-bold">Takeaway · </strong>{cur.takeaway}
                  </div>
                )}

                {hintStack.length > 0 && (
                  <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen size={14} className="text-sky-500" />
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        Hints
                        <span className="ml-1.5 text-slate-400 font-mono">{showHint}/{hintStack.length}</span>
                      </h4>
                    </div>
                    <ol className="space-y-1.5 mb-2">
                      {hintStack.slice(0, showHint).map((h, i) => (
                        <li key={i} className="text-[13px] text-slate-600 leading-relaxed pl-4 border-l-2 border-sky-200">
                          {h}
                        </li>
                      ))}
                    </ol>
                    {showHint < hintStack.length && (
                      <button
                        onClick={() => setShowHint((n) => n + 1)}
                        className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200"
                      >
                        {showHint === 0 ? 'Reveal a hint' : 'Next hint'}
                      </button>
                    )}
                  </div>
                )}

                {cur.verify && (
                  <div className="text-[13px] text-sky-900 bg-sky-50 border border-sky-200 p-3 rounded-xl leading-relaxed">
                    <strong className="font-bold">How to check · </strong>{cur.verify}
                  </div>
                )}

                {cur.why && (
                  <div className="text-[13px] text-slate-600 bg-slate-50 border border-slate-200 p-3 rounded-xl leading-relaxed">
                    <strong className="font-bold text-slate-800">Why it matters · </strong>{cur.why}
                  </div>
                )}
              </div>
            )}

            {/* Rapid Edge-Case MCQ */}
            {cur.theory.mcq && (
              <div className="mt-6 bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Zap size={16} className="text-amber-500" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Rapid Concept Check</span>
                </div>
                <p className="text-[14px] font-semibold text-slate-800 mb-4 leading-snug">{cur.theory.mcq.q}</p>
                <div className="space-y-2">
                  {cur.theory.mcq.options.map((opt, i) => {
                    const isSelected = mcqAnswer === i;
                    const isCorrect = i === cur.theory.mcq!.correct;
                    const showResult = mcqAnswer !== null;

                    let btnStyle = 'border-slate-200 hover:bg-slate-50 text-slate-700';
                    if (showResult) {
                      if (isCorrect) btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-800 font-medium shadow-xs';
                      else if (isSelected) btnStyle = 'border-rose-500 bg-rose-50 text-rose-800 font-medium shadow-xs';
                      else btnStyle = 'border-slate-200 opacity-40';
                    }

                    return (
                      <button
                        key={i}
                        onClick={() => setMcqAnswer(i)}
                        disabled={showResult}
                        className={`w-full text-left px-4 py-2.5 rounded-xl border text-[13px] transition-all ${btnStyle}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {mcqAnswer !== null && (
                  <div className="mt-3 pt-3 border-t border-slate-100 flex gap-2">
                    <div className="shrink-0 mt-0.5">
                      {mcqAnswer === cur.theory.mcq.correct ? 
                        <CheckCircle2 size={16} className="text-emerald-500" /> : 
                        <Circle size={16} className="text-rose-400" />}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      <span className="font-semibold text-slate-700">Why?</span> {cur.theory.mcq.why}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Stepper Navigation */}
            <div className="pt-6 mt-4 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={handlePrev}
                disabled={activeUnitIndex === 0}
                className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 text-xs font-semibold text-slate-700 flex items-center gap-2 shadow-xs transition-colors"
              >
                <ArrowLeft size={14} />
                <span>Previous Drill</span>
              </button>
              <button
                onClick={handleNext}
                disabled={activeUnitIndex === MASTERY_UNITS.length - 1}
                className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-40 text-xs font-semibold text-white flex items-center gap-2 shadow-sm transition-colors"
              >
                <span>Next Drill</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
          </PaneBoundary>
        </Panel>
        )}

        {/* Right: Code Crucible, Live Preview & Specs */}
        <PaneBoundary name="The crucible">
        <div className={
            isPortalOpen
              ? "fixed inset-0 z-50 bg-slate-900 p-2 gap-2 flex flex-col lg:flex-row-reverse"
              : "grid grid-rows-[1.2fr_1fr] gap-2 h-full min-h-0"
          }>
          {/* Editor Panel */}
          <Panel
            title={`Code Crucible (${cur.practice.type.toUpperCase()})`}
            actions={
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPortalOpen(!isPortalOpen)}
                  title="Open Responsive Preview Portal"
                  className="px-2.5 py-1.5 text-xs rounded-lg font-semibold transition-all flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200"
                >
                  {isPortalOpen ? <><X size={14} /> Close Portal</> : <><MonitorSmartphone size={14} /> Responsive</>}
                </button>
                <button
                  onClick={handleFormat}
                  title="Format Code (Shift-Alt-F)"
                  className="px-2.5 py-1.5 text-xs rounded-lg font-semibold transition-all flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200"
                >
                  <Wand2 size={14} /> Format
                </button>
                {/* The OA is timed. A clock that is always running is the cheapest
                    way to stop practising at a pace the exam will not allow. */}
                <span
                  className={`font-mono text-[11px] tabular-nums px-2 py-1 rounded-lg border
                    ${elapsed > 300
                      ? 'bg-red-50 border-red-200 text-red-700'
                      : 'bg-slate-100 border-slate-200 text-slate-500'}`}
                  title="Time on this unit"
                >
                  {String(Math.floor(elapsed / 60)).padStart(2, '0')}:{String(elapsed % 60).padStart(2, '0')}
                </span>

                <button
                  onClick={handleGrade}
                  disabled={grading}
                  className="px-3 py-1.5 text-xs rounded-lg font-bold flex items-center gap-2 shadow-sm
                             bg-amber-500 hover:bg-amber-400 text-amber-950 border-b-2 border-amber-700 disabled:opacity-50"
                >
                  <Gavel size={14} /> {grading ? 'Grading…' : 'Grade'}
                </button>

                {/* Kept because a grader can be wrong — but it is now an override,
                    not the primary verdict, and it is labelled as one. */}
                <button
                  onClick={handleMarkComplete}
                  title="Override: record this as passed without grading"
                  className={`px-2.5 py-1.5 text-xs rounded-lg font-semibold transition-all flex items-center gap-1.5
                    ${isSolved
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-500 border border-slate-200'}`}
                >
                  {isSolved ? <CheckCircle2 size={14} /> : <Sparkles size={13} />}
                  {isSolved ? 'Mastered' : 'override'}
                </button>
              </div>
            }
            className={`h-full flex flex-col border-slate-200 shadow-sm ${isPortalOpen ? 'md:w-[450px] lg:w-[500px] xl:w-[600px] shrink-0' : ''}`}
          >
            <div className="flex flex-col h-full min-h-0">
              <FileTabs
                tabs={[
                  {
                    key: 'editor',
                    label: cur.practice.type === 'css' ? 'styles.css' : cur.practice.type === 'jsx' ? 'App.jsx' : cur.trackId === 'behavioural' ? 'story.md' : 'solution.js',
                  },
                  {
                    key: 'jsx_view',
                    label: 'App.jsx (view)',
                    readOnly: true,
                  },
                ]}
                active={activeEditorTab}
                onSelect={(k) => setActiveEditorTab(k as 'editor' | 'jsx_view')}
              />
              <div className="flex-1 min-h-0 relative">
                {activeEditorTab === 'editor' ? (
                  <CodeEditor
                    value={userCode}
                    onChange={handleCodeChange}
                    onFormat={handleFormat}
                    lang={cur.practice.type === 'css' ? 'css' : 'jsx'}
                    className="h-full"
                  />
                ) : (
                  <div className="h-full relative">
                    <div className="absolute top-2 right-3 z-10 text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold border border-slate-700 pointer-events-none opacity-85">
                      Read-Only JSX Reference
                    </div>
                    <CodeEditor
                      value={getJsxViewCode(cur)}
                      readOnly={true}
                      lang="jsx"
                      className="h-full"
                    />
                  </div>
                )}
              </div>
            </div>
          </Panel>

          {/* Live Preview & Spec Checklist */}
          <div className={`gap-2 h-full min-h-0 flex-1 ${isPortalOpen ? 'flex flex-col bg-slate-950 rounded-xl border border-slate-800' : 'grid grid-cols-1 md:grid-cols-[1fr_12rem]'}`}>
            <Panel
              title={cur.trackId === 'behavioural' ? 'Rehearsal' : cur.practice.type === 'js_snippet' ? 'Console Output' : 'Live Preview'}
              
              className="h-full flex flex-col border-slate-200 shadow-sm"
            >
              {/* A STAR story is not a program. The editor is a writing pad here,
                  and nothing is executed. */}
              {cur.trackId === 'behavioural' ? (
                <div className="p-4 text-[12px] text-slate-600 leading-relaxed space-y-2">
                  <p className="font-semibold text-slate-800">Write it, then say it.</p>
                  <p>
                    Fill the scaffold in the editor, then use <strong>Record your answer</strong> above.
                    An answer you have never said out loud is not an answer you have.
                  </p>
                  <p className="text-slate-500">
                    Nothing is executed here, and no audio leaves the browser.
                  </p>
                </div>
              ) : cur.practice.type === 'css' ? (
                isPortalOpen ? (
                  <ResponsiveViewer>
                    <iframe
                      title="css-preview"
                      srcDoc={fullCssHtml}
                      sandbox="allow-scripts allow-same-origin"
                      className="w-full h-full border-0 bg-white"
                    />
                  </ResponsiveViewer>
                ) : (
                  <div className="w-full h-full bg-white">
                    <iframe
                      title="css-preview"
                      srcDoc={fullCssHtml}
                      sandbox="allow-scripts allow-same-origin"
                      className="w-full h-full border-0"
                    />
                  </div>
                )
              ) : cur.practice.type === 'js_snippet' ? (
                <div className="w-full h-full bg-[#0d1117] text-[#56d364] font-mono text-[12px] p-4 overflow-y-auto whitespace-pre-wrap shadow-inner leading-relaxed">
                  {consoleOutput.length === 0 ? <span className="text-slate-600 italic">Waiting for console output...</span> : null}
                  {consoleOutput.map((log, i) => (
                    <div key={i} className="mb-1.5 flex gap-2">
                      <span className="text-[#8b949e] select-none">{'>'}</span>
                      <span className={log.startsWith('[ERROR]') ? 'text-[#f85149]' : log.startsWith('[WARN]') ? 'text-[#d29922]' : 'text-[#e6edf3]'}>{log}</span>
                    </div>
                  ))}
                </div>
              ) : (
                isPortalOpen ? (
                  <ResponsiveViewer>
                    <SandboxFrame
                      baseCSS=""
                      userCSS=""
                      jsCode={compiledJs}
                      className="h-full w-full bg-white"
                    />
                  </ResponsiveViewer>
                ) : (
                  <div className="w-full h-full bg-white">
                    <SandboxFrame
                      baseCSS=""
                      userCSS=""
                      jsCode={compiledJs}
                      className="h-full w-full bg-white"
                    />
                  </div>
                )
              )}
            </Panel>

            {!isPortalOpen && (
            <Panel
              title={verdict ? (verdict.pass ? 'Verdict · PASS' : 'Verdict · FAIL') : 'Spec Checklist'}
              className={`h-full flex flex-col shadow-sm ${
                verdict ? (verdict.pass ? 'border-emerald-300 bg-emerald-50/40' : 'border-red-300 bg-red-50/40') : 'border-slate-200 bg-slate-50/50'
              }`}
            >
              <div className="p-3 space-y-2 overflow-y-auto text-xs">
                {grading && <p className="text-slate-500 italic">rendering yours and the reference…</p>}

                {!verdict && brief.criteria.map((spec, i) => (
                  <div key={i} className="flex items-start gap-2 text-slate-700 bg-white p-2 rounded-lg border border-slate-200 shadow-xs">
                    <CheckCircle2 size={14} className="text-sky-500 mt-0.5 shrink-0" />
                    <span className="text-[11px] font-medium leading-snug">{spec}</span>
                  </div>
                ))}

                {verdict?.error && (
                  <p className="text-[11px] font-mono text-red-800 bg-white p-2 rounded-lg border border-red-200 leading-relaxed">
                    {verdict.error}
                  </p>
                )}

                {/* A verdict has to say WHY or it will not be trusted, and an
                    untrusted sensor is worse than none. */}
                {verdict && verdict.checks.filter((c) => !c.ok).slice(0, 12).map((c, i) => (
                  <div key={i} className="bg-white p-2 rounded-lg border border-red-200 font-mono text-[10px] leading-relaxed">
                    <span className="text-red-700">{c.label}</span>
                    <div className="text-slate-600">
                      got <strong className="text-red-800">{c.actual || '(empty)'}</strong>,
                      expected <strong className="text-emerald-800">{c.expected || '(empty)'}</strong>
                    </div>
                  </div>
                ))}

                {verdict?.pass && (
                  <p className="text-[11px] text-emerald-800 bg-white p-2 rounded-lg border border-emerald-200">
                    Computed output matches the reference on every check.
                  </p>
                )}

                {verdict && !verdict.pass && (
                  <div className="mt-4 pt-3 border-t border-red-200/50">
                    <h4 className="font-bold text-red-900 mb-2 flex items-center gap-1.5">
                      <Wand2 size={13} /> Reference Solution
                    </h4>
                    <div className="h-64 rounded bg-white overflow-hidden border border-red-200 shadow-sm flex flex-col">
                      <CodeEditor 
                        value={cur.practice.solutionCode} 
                        readOnly={true} 
                        lang={cur.practice.type === 'css' ? 'css' : 'jsx'} 
                        className="h-full"
                      />
                    </div>
                  </div>
                )}
              </div>
            </Panel>
          )}
          </div>
        </div>
        </PaneBoundary>
      </main>
    </div>
  );
}
