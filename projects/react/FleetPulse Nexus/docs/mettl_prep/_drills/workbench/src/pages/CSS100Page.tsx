import { useEffect, useState, useMemo, useDeferredValue } from 'react';
import { useStore } from '../store';
import { CSS100 } from '../data/css100';
import { useCompiler } from '../hooks/useCompiler';
import { useFormatter } from '../hooks/useFormatter';
import { useTimer } from '../hooks/useTimer';
import Panel from '../components/layout/Panel';
import FileTabs from '../components/editor/FileTabs';
import CodeEditor from '../components/editor/CodeEditor';
import LivePreview from '../components/preview/LivePreview';
import CompareView from '../components/preview/CompareView';
import ChallengeList from '../components/challenge/ChallengeList';
import ChallengeBrief from '../components/challenge/ChallengeBrief';
import DiagramView from '../components/challenge/DiagramView';
import CSS100Toolbar from '../components/challenge/CSS100Toolbar';
import { Sparkles, RotateCcw, Eye, Columns3, Layers } from 'lucide-react';

export default function CSS100Page() {
  const {
    currentChallenge, pickChallenge, jsxCode, cssCode, activeTab,
    viewMode, hudActive, timerActive, timerLeft, solvedMap,
    setActiveTab, setViewMode, toggleHud, toggleTimer, tickTimer,
    updateJsx, updateCss, toggleSolved,
  } = useStore();

  const { compile } = useCompiler();
  const { formatCSS } = useFormatter();
  const [compiledJs, setCompiledJs] = useState<string>('');
  const [appCss, setAppCss] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // Pick initial challenge
  useEffect(() => {
    if (!currentChallenge && CSS100.items.length > 0) pickChallenge(CSS100.items[0]);
  }, [currentChallenge, pickChallenge]);

  useEffect(() => {
    fetch('/app.css').then((r) => r.text()).then(setAppCss).catch(() => {});
  }, []);

  useTimer(timerActive, timerLeft, tickTimer, () => {});

  const deferredJsx = useDeferredValue(jsxCode);
  useEffect(() => {
    if (!deferredJsx) return;
    compile(deferredJsx).then((res) => {
      setError(res.error || null);
      if (res.code) setCompiledJs(res.code);
    });
  }, [deferredJsx, compile]);

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

  const solvedCount = Object.values(solvedMap).filter(Boolean).length;
  const baseCss = currentChallenge?.useApp === false ? '' : appCss;
  const afterCss = (currentChallenge?.css || '').replace(/^.*TODO.*$/m, currentChallenge?.sol || '');

  const nav = (dir: 1 | -1) => {
    if (!currentChallenge) return;
    const idx = CSS100.items.findIndex((c) => c.id === currentChallenge.id);
    pickChallenge(CSS100.items[(idx + dir + CSS100.items.length) % CSS100.items.length]);
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-slate-100">
      <CSS100Toolbar
        solvedCount={solvedCount}
        totalCount={CSS100.items.length}
        timerActive={timerActive}
        timerLeft={timerLeft}
        currentChallenge={currentChallenge}
        isSolved={!!(currentChallenge && solvedMap[currentChallenge.id])}
        onPrev={() => nav(-1)}
        onNext={() => nav(1)}
        onToggleTimer={toggleTimer}
        onToggleSolved={() => currentChallenge && toggleSolved(currentChallenge.id)}
      />

      <main className="grid grid-cols-1 lg:grid-cols-[16rem_22rem_1fr] gap-2 p-2 flex-1 min-h-0">
        <Panel title="Questions" className="h-full">
          <ChallengeList items={CSS100.items} categories={CSS100.cats} />
        </Panel>

        <Panel title="Problem Brief" className="h-full">
          {currentChallenge && (
            <div className="flex flex-col gap-3">
              <ChallengeBrief challenge={currentChallenge} specResults={specResults} />
              <div className="p-3 border-t border-gray-100">
                <h4 className="text-[0.66rem] font-bold tracking-wider uppercase text-gray-500 mb-2">Visual Target Layout</h4>
                <DiagramView diagram={currentChallenge.dia} />
              </div>
            </div>
          )}
        </Panel>

        <div className="grid grid-rows-2 gap-2 h-full min-h-0">
          <Panel
            title="Editor"
            actions={
              <div className="flex items-center gap-1.5">
                <button onClick={() => formatCSS(cssCode).then(updateCss)} className="px-2 py-0.5 text-xs bg-white border border-gray-300 hover:bg-gray-50 rounded flex items-center gap-1">
                  <Sparkles size={11} /> format
                </button>
                <button onClick={() => { if (currentChallenge) { updateJsx(currentChallenge.jsx); updateCss(currentChallenge.css); } }} className="px-2 py-0.5 text-xs bg-white border border-gray-300 hover:bg-gray-50 rounded flex items-center gap-1">
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
                { key: 'app', label: 'app.css', readOnly: true },
              ]}
              active={activeTab}
              onSelect={(t) => setActiveTab(t as any)}
            />
            {activeTab === 'jsx' && <CodeEditor value={jsxCode} onChange={updateJsx} lang="jsx" autoFocus />}
            {activeTab === 'css' && <CodeEditor value={cssCode} onChange={updateCss} lang="css" />}
            {activeTab === 'app' && <CodeEditor value={appCss} lang="css" readOnly />}
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
              </div>
            }
            className="flex flex-col min-h-0 relative"
          >
            <div className="flex-1 min-h-0 relative p-1">
              {viewMode === 'live' ? (
                <LivePreview baseCSS={baseCss} userCSS={cssCode} jsCode={compiledJs} />
              ) : (
                <CompareView
                  baseCSS={baseCss}
                  beforeCSS={currentChallenge?.css || ''}
                  afterCSS={afterCss}
                  userCSS={cssCode}
                  jsCode={compiledJs}
                />
              )}

              {hudActive && currentChallenge && (
                <div className="absolute inset-0 pointer-events-none bg-slate-900/10 backdrop-blur-[0.5px] p-4 flex items-center justify-center">
                  <div className="bg-white/85 p-3 rounded-lg shadow-xl border border-slate-300 max-w-sm">
                    <DiagramView diagram={currentChallenge.dia} />
                  </div>
                </div>
              )}
            </div>

            {error && (
              <div className="px-3 py-1.5 bg-red-100 border-t border-red-200 text-red-800 text-xs font-mono shrink-0">
                Syntax Error: {error}
              </div>
            )}
          </Panel>
        </div>
      </main>
    </div>
  );
}
