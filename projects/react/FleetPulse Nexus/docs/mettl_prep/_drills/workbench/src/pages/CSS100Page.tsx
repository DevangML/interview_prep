import { useEffect, useState, useMemo, useDeferredValue, useCallback, useRef } from 'react';
import type { EditorView } from '@codemirror/view';
import { useStore } from '../store';
import { CSS100 } from '../data/css100';
import { useCompiler } from '../hooks/useCompiler';
import { useFormatter } from '../hooks/useFormatter';
import { useTimer } from '../hooks/useTimer';
import { grade as runGrader } from '../lib/grader';
import { auditReferenceSolutions } from '../lib/audit';
import { counts as scheduleCounts, pickNext, dueLabel, statusOf } from '../lib/schedule';
import { EMMET_COMMANDS } from '../lib/emmetCommands';
import { useNow } from '../hooks/useNow';
import type { AuditReport } from '../lib/audit';
import { logActivity } from '../hooks/useApi';
import Panel from '../components/layout/Panel';
import FileTabs from '../components/editor/FileTabs';
import CodeEditor from '../components/editor/CodeEditor';
import LivePreview from '../components/preview/LivePreview';
import CompareView from '../components/preview/CompareView';
import ChallengeList from '../components/challenge/ChallengeList';
import ChallengeBrief from '../components/challenge/ChallengeBrief';
import DiagramView from '../components/challenge/DiagramView';
import CSS100Toolbar from '../components/challenge/CSS100Toolbar';
import GradeReport from '../components/challenge/GradeReport';
import CommandPalette from '../components/shared/CommandPalette';
import type { PaletteAction } from '../components/shared/CommandPalette';
import { Sparkles, RotateCcw, Eye, Columns3, Layers } from 'lucide-react';

export default function CSS100Page() {
  /* Selector-scoped subscriptions. Destructuring the whole store made every
     telemetry keystroke re-render the page and its 108-row list — invisible
     until search-as-you-type existed, and fatal once it did. */
  const currentChallenge = useStore((s) => s.currentChallenge);
  const pickChallenge = useStore((s) => s.pickChallenge);
  const jsxCode = useStore((s) => s.jsxCode);
  const cssCode = useStore((s) => s.cssCode);
  const activeTab = useStore((s) => s.activeTab);
  const viewMode = useStore((s) => s.viewMode);
  const hudActive = useStore((s) => s.hudActive);
  const timerActive = useStore((s) => s.timerActive);
  const timerLeft = useStore((s) => s.timerLeft);
  const schedule = useStore((s) => s.schedule);
  const setActiveTab = useStore((s) => s.setActiveTab);
  const setViewMode = useStore((s) => s.setViewMode);
  const toggleHud = useStore((s) => s.toggleHud);
  const toggleTimer = useStore((s) => s.toggleTimer);
  const tickTimer = useStore((s) => s.tickTimer);
  const updateJsx = useStore((s) => s.updateJsx);
  const updateCss = useStore((s) => s.updateCss);
  const recordReview = useStore((s) => s.recordReview);
  const mode = useStore((s) => s.mode);
  const setMode = useStore((s) => s.setMode);
  const attempt = useStore((s) => s.attempt);
  const noteKeystroke = useStore((s) => s.noteKeystroke);
  const noteHint = useStore((s) => s.noteHint);
  const noteReveal = useStore((s) => s.noteReveal);
  const gradeResult = useStore((s) => s.gradeResult);
  const setGradeResult = useStore((s) => s.setGradeResult);
  const grading = useStore((s) => s.grading);
  const setGrading = useStore((s) => s.setGrading);
  const paletteOpen = useStore((s) => s.paletteOpen);
  const setPaletteOpen = useStore((s) => s.setPaletteOpen);

  const { compile } = useCompiler();
  const { formatCSS, formatJSX } = useFormatter();
  const [compiledJs, setCompiledJs] = useState<string>('');
  const [refJs, setRefJs] = useState<string>('');
  const [appCss, setAppCss] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [formatError, setFormatError] = useState<string | null>(null);
  const [audit, setAudit] = useState<AuditReport | null>(null);
  const [auditProgress, setAuditProgress] = useState<string | null>(null);
  const viewRef = useRef<EditorView | null>(null);

  const exam = mode === 'exam';

  useEffect(() => {
    if (!currentChallenge && CSS100.items.length > 0) pickChallenge(CSS100.items[0]);
  }, [currentChallenge, pickChallenge]);

  useEffect(() => {
    fetch('/app.css').then((r) => r.text()).then(setAppCss).catch(() => {});
  }, []);

  useTimer(timerActive, timerLeft, tickTimer, () => {});

  const deferredJsx = useDeferredValue(jsxCode);
  useEffect(() => {
    let live = true;
    compile(deferredJsx).then((res) => {
      if (!live) return;
      setError(res.error || null);
      setCompiledJs(res.error ? '' : (res.code || ''));
    });
    return () => { live = false; };
  }, [deferredJsx, compile]);

  /* Reference markup — Before/After must render the target even while the
     user's own component.jsx is still an empty TODO fragment. */
  const referenceJsx = useMemo(() => {
    if (!currentChallenge) return '';
    const { jsx, markup } = currentChallenge;
    if (!markup) return jsx;
    return jsx.replace(/<>[\s\S]*?<\/>/, markup.trim());
  }, [currentChallenge]);

  useEffect(() => {
    let live = true;
    compile(referenceJsx).then((res) => {
      if (live) setRefJs(res.error ? '' : (res.code || ''));
    });
    return () => { live = false; };
  }, [referenceJsx, compile]);

  const specResults = useMemo(() => {
    if (!currentChallenge) return [];
    return currentChallenge.use.map(([raw]) => {
      const trimmed = raw.trim();
      let pass = false;
      if (trimmed.includes(':')) {
        const [prop, val] = trimmed.split(':').map((s) => s.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
        pass = new RegExp(`${prop}\\s*:\\s*[^;}]*${val}`, 'i').test(cssCode);
      } else {
        const clean = trimmed.replace(/[:()]/g, '').trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        pass = new RegExp(`(^|[\\s;:{,])${clean}`, 'i').test(cssCode);
      }
      return { prop: raw, pass };
    });
  }, [currentChallenge, cssCode]);

  const now = useNow();
  const ids = useMemo(() => CSS100.items.map((c) => c.id), []);
  const queue = scheduleCounts(ids, schedule, now);
  const baseCss = currentChallenge?.useApp === false ? '' : appCss;
  const afterCss = (currentChallenge?.css || '').replace(/^.*TODO.*$/m, currentChallenge?.sol || '');

  /** The verdict. Renders reference and attempt and compares what the browser computed. */
  const doGrade = useCallback(async () => {
    if (!currentChallenge || grading) return;
    setGrading(true);
    setGradeResult(null);
    const result = await runGrader({
      baseCSS: baseCss,
      referenceCSS: afterCss,
      referenceJs: refJs,
      attemptCSS: cssCode,
      attemptJs: compiledJs,
      props: currentChallenge.use.map(([p]) => p),
    });
    setGradeResult(result);
    setGrading(false);
    recordReview(currentChallenge.id, result.pass);
    logActivity({
      ev: 'graded',
      id: currentChallenge.id,
      mode,
      pass: result.pass,
      failures: result.checks.filter((c) => !c.ok).length,
      ms: attempt ? Date.now() - attempt.startedAt : null,
      ms_to_first_key: attempt?.firstKeyAt ? attempt.firstKeyAt - attempt.startedAt : null,
      keystrokes: attempt?.keystrokes ?? 0,
      hints: attempt?.hintsUsed ?? 0,
      revealed: attempt?.solutionRevealed ?? false,
    });
  }, [currentChallenge, grading, baseCss, afterCss, refJs, cssCode, compiledJs,
      mode, attempt, setGradeResult, setGrading, recordReview]);

  /** One answer to "what now": leeches, then longest overdue, then new material. */
  const goNextDue = useCallback(() => {
    const id = pickNext(ids, schedule, now);
    const item = CSS100.items.find((c) => c.id === id);
    if (item) pickChallenge(item);
  }, [ids, schedule, now, pickChallenge]);

  /** Calibration: every unsolved baseline must fail. Whatever passes is a blind spot. */
  const runAudit = useCallback(async () => {
    setAudit(null);
    setAuditProgress('0 / ' + CSS100.items.length);
    const report = await auditReferenceSolutions(
      CSS100.items, compile, appCss,
      (done, total) => setAuditProgress(`${done} / ${total}`),
    );
    setAuditProgress(null);
    setAudit(report);
    const blind = report.rows.filter((r) => !r.discriminates && r.gradeable);
    logActivity({
      ev: 'grader_audit',
      total: report.total,
      discriminating: report.discriminating,
      blind: blind.map((r) => r.id),
    });
    console.table(blind.map((r) => ({ id: r.id, title: r.title, why: r.error || r.detail })));
  }, [compile, appCss]);

  const formatActive = useCallback(() => {
    const run = activeTab === 'css'
      ? formatCSS(cssCode).then((r) => { updateCss(r.code); return r; })
      : activeTab === 'jsx'
        ? formatJSX(jsxCode).then((r) => { updateJsx(r.code); return r; })
        : null;
    if (!run) return;
    run.then((r) => setFormatError(r.error ? `format failed — ${r.error}` : null));
  }, [activeTab, cssCode, jsxCode, formatCSS, formatJSX, updateCss, updateJsx]);

  const nav = useCallback((dir: 1 | -1) => {
    if (!currentChallenge) return;
    const idx = CSS100.items.findIndex((c) => c.id === currentChallenge.id);
    pickChallenge(CSS100.items[(idx + dir + CSS100.items.length) % CSS100.items.length]);
  }, [currentChallenge, pickChallenge]);

  const resetBuffers = useCallback(() => {
    if (!currentChallenge) return;
    updateJsx(currentChallenge.jsx);
    updateCss(currentChallenge.css);
  }, [currentChallenge, updateJsx, updateCss]);

  /* ── Command palette ── */
  const actions: PaletteAction[] = useMemo(() => [
    { id: 'grade', group: 'run', label: 'Grade this attempt', hint: '⌘⏎', run: doGrade },
    { id: 'audit', group: 'run', label: 'Audit: calibrate the grader against every drill', run: runAudit },
    { id: 'nextdue', group: 'nav', label: 'Next due drill (leeches first, then longest overdue)', run: goNextDue },
    { id: 'exam', group: 'mode', label: 'Switch to EXAM mode (strip every assist)', run: () => setMode('exam') },
    { id: 'practice', group: 'mode', label: 'Switch to PRACTICE mode', run: () => setMode('practice') },
    { id: 'next', group: 'nav', label: 'Next challenge', run: () => nav(1) },
    { id: 'prev', group: 'nav', label: 'Previous challenge', run: () => nav(-1) },
    { id: 'format', group: 'edit', label: 'Format current file', hint: '⌥⇧F', run: formatActive },
    { id: 'reset', group: 'edit', label: 'Reset both files to the drill baseline', run: resetBuffers },
    { id: 'jsx', group: 'edit', label: 'Open component.jsx', run: () => setActiveTab('jsx') },
    { id: 'css', group: 'edit', label: 'Open styles.css', run: () => setActiveTab('css') },
    { id: 'live', group: 'view', label: 'Result: live preview', run: () => setViewMode('live') },
    { id: 'compare', group: 'view', label: 'Result: before vs after vs mine', run: () => setViewMode('compare') },
    { id: 'hud', group: 'view', label: 'Toggle HUD target overlay', run: toggleHud },
    { id: 'timer', group: 'run', label: 'Toggle 75-second sprint', run: toggleTimer },
    // Emmet is only useful in Practice; in Exam the whole plugin is unloaded.
    ...(exam ? [] : EMMET_COMMANDS.map((c) => ({
      id: `emmet-${c.id}`,
      group: 'emmet',
      label: c.label,
      hint: c.hint,
      run: () => {
        const view = viewRef.current;
        if (!view) return;
        view.focus();
        c.run(view);
      },
    }))),
    ...CSS100.items.map((c) => ({
      id: `go-${c.id}`,
      group: c.cat,
      label: `${c.id} — ${c.title}`,
      run: () => pickChallenge(c),
    })),
  ], [exam, doGrade, runAudit, goNextDue, setMode, nav, formatActive, resetBuffers,
      setActiveTab, setViewMode, toggleHud, toggleTimer, pickChallenge]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key.toLowerCase() === 'k') { e.preventDefault(); setPaletteOpen(!paletteOpen); }
      if (mod && e.key === 'Enter') { e.preventDefault(); doGrade(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [paletteOpen, setPaletteOpen, doGrade]);

  return (
    <div className={`flex flex-col flex-1 min-h-0 ${exam ? 'bg-red-50' : 'bg-slate-100'}`}>
      <CSS100Toolbar
        queue={queue}
        totalCount={CSS100.items.length}
        timerActive={timerActive}
        timerLeft={timerLeft}
        currentChallenge={currentChallenge}
        status={currentChallenge ? statusOf(schedule[currentChallenge.id], now) : 'untouched'}
        dueLabel={currentChallenge ? dueLabel(schedule[currentChallenge.id], now) : ''}
        mode={mode}
        grading={grading}
        onPrev={() => nav(-1)}
        onNext={() => nav(1)}
        onToggleTimer={toggleTimer}
        onOverride={() => {
          if (!currentChallenge) return;
          recordReview(currentChallenge.id, true, true);
          // A run of these is the signal that the grader is wrong, so it is logged.
          logActivity({ ev: 'review_override', id: currentChallenge.id, mode });
        }}
        onNextDue={goNextDue}
        onSetMode={setMode}
        onGrade={doGrade}
        onOpenPalette={() => setPaletteOpen(true)}
      />

      <main className="grid grid-cols-1 lg:grid-cols-[16rem_22rem_1fr] gap-2 p-2 flex-1 min-h-0">
        <Panel title="Questions" className="h-full" bodyClassName="flex-1 min-h-0 flex flex-col">
          <ChallengeList items={CSS100.items} categories={CSS100.cats} />
        </Panel>

        <Panel title={exam ? 'Problem Brief · sealed' : 'Problem Brief'} className="h-full">
          {currentChallenge && (
            <div className="flex flex-col gap-3">
              <ChallengeBrief
                challenge={currentChallenge}
                specResults={specResults}
                hideAssists={exam}
                onHint={noteHint}
                onReveal={noteReveal}
              />
              {!exam && (
                <div className="p-3 border-t border-gray-100">
                  <h4 className="text-[0.66rem] font-bold tracking-wider uppercase text-gray-500 mb-2">Visual Target Layout</h4>
                  <DiagramView diagram={currentChallenge.dia} />
                </div>
              )}
            </div>
          )}
        </Panel>

        <div className="grid grid-rows-2 gap-2 h-full min-h-0">
          <Panel
            title={exam ? 'Editor · exam' : 'Editor'}
            actions={
              <div className="flex items-center gap-1.5">
                {!exam && (
                  <button onClick={formatActive} className="px-2 py-0.5 text-xs bg-white border border-gray-300 hover:bg-gray-50 rounded flex items-center gap-1">
                    <Sparkles size={11} /> format
                  </button>
                )}
                <button onClick={resetBuffers} className="px-2 py-0.5 text-xs bg-white border border-gray-300 hover:bg-gray-50 rounded flex items-center gap-1">
                  <RotateCcw size={11} /> reset
                </button>
              </div>
            }
            className="flex flex-col min-h-0"
          >
            <FileTabs
              tabs={[
                { key: 'jsx', label: 'component.jsx' },
                { key: 'css', label: 'styles.css' },
                ...(exam ? [] : [{ key: 'app', label: 'app.css', readOnly: true }]),
              ]}
              active={activeTab}
              onSelect={(t) => setActiveTab(t as 'jsx' | 'css' | 'app')}
            />
            {activeTab === 'jsx' && (
              <CodeEditor value={jsxCode} onChange={updateJsx} lang="jsx" autoFocus
                mode={mode} onFormat={formatActive} onKeystroke={noteKeystroke}
                onEditorReady={(v) => { viewRef.current = v; }} />
            )}
            {activeTab === 'css' && (
              <CodeEditor value={cssCode} onChange={updateCss} lang="css"
                mode={mode} onFormat={formatActive} onKeystroke={noteKeystroke}
                onEditorReady={(v) => { viewRef.current = v; }} />
            )}
            {activeTab === 'app' && <CodeEditor value={appCss} lang="css" readOnly mode={mode} />}
          </Panel>

          <Panel
            title="Result"
            actions={
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setViewMode('live')}
                  className={`px-2 py-0.5 text-xs rounded font-semibold flex items-center gap-1 ${viewMode === 'live' ? 'bg-sky-700 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                >
                  <Eye size={12} /> Live
                </button>
                {!exam && (
                  <>
                    <button
                      onClick={() => setViewMode('compare')}
                      className={`px-2 py-0.5 text-xs rounded font-semibold flex items-center gap-1 ${viewMode === 'compare' ? 'bg-sky-700 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                    >
                      <Columns3 size={12} /> Before vs After
                    </button>
                    <button
                      onClick={toggleHud}
                      className={`px-2 py-0.5 text-xs rounded font-semibold flex items-center gap-1 ${hudActive ? 'bg-emerald-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                    >
                      <Layers size={12} /> HUD Diff
                    </button>
                  </>
                )}
              </div>
            }
            className="flex flex-col min-h-0 relative"
          >
            <div className="flex-1 min-h-0 relative p-1 flex flex-col">
              {viewMode === 'live' || exam ? (
                <LivePreview baseCSS={baseCss} userCSS={cssCode} jsCode={compiledJs} />
              ) : (
                <CompareView
                  baseCSS={baseCss}
                  beforeCSS={currentChallenge?.css || ''}
                  afterCSS={afterCss}
                  userCSS={cssCode}
                  jsCode={compiledJs}
                  referenceJsCode={refJs}
                />
              )}

              {hudActive && !exam && currentChallenge && (
                <div className="absolute inset-0 pointer-events-none bg-slate-900/10 backdrop-blur-[0.5px] p-4 flex items-center justify-center">
                  <div className="bg-white/85 p-3 rounded-lg shadow-xl border border-slate-300 max-w-sm">
                    <DiagramView diagram={currentChallenge.dia} />
                  </div>
                </div>
              )}
            </div>

            {auditProgress && (
              <div className="px-3 py-1.5 bg-slate-100 border-t border-slate-200 text-slate-600 text-xs font-mono shrink-0">
                calibrating grader… {auditProgress}
              </div>
            )}
            {audit && (
              <div className="px-3 py-2 bg-slate-900 text-slate-100 text-xs font-mono shrink-0 max-h-40 overflow-auto">
                <p className="font-bold mb-1">
                  Grader calibration — {audit.discriminating}/{audit.gradeable} gradeable drills discriminate
                  {' '}({audit.total - audit.gradeable} are read-and-predict, nothing to type)
                </p>
                {audit.rows.filter((r) => !r.discriminates && r.gradeable).slice(0, 24).map((r) => (
                  <p key={r.id} className="text-amber-300">
                    {r.id} — {r.error || r.detail}
                  </p>
                ))}
                <button onClick={() => setAudit(null)} className="mt-1 underline text-slate-400">dismiss</button>
              </div>
            )}

            <GradeReport
              result={gradeResult}
              grading={grading}
              nextDue={currentChallenge ? dueLabel(schedule[currentChallenge.id], now) : ''}
            />

            {error && (
              <div className="px-3 py-1.5 bg-red-100 border-t border-red-200 text-red-800 text-xs font-mono shrink-0">
                Syntax Error: {error}
              </div>
            )}
            {formatError && (
              <div className="px-3 py-1.5 bg-amber-100 border-t border-amber-200 text-amber-900 text-xs font-mono shrink-0">
                {formatError}
              </div>
            )}
          </Panel>
        </div>
      </main>

      {paletteOpen && <CommandPalette onClose={() => setPaletteOpen(false)} actions={actions} />}
    </div>
  );
}
