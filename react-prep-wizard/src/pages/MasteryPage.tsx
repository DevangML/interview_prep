import { useState, useDeferredValue, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  MASTERY_UNITS,
  MASTERY_TRACKS,
  type MasteryUnit,
} from '../data/masteryStream';
import Panel from '../components/layout/Panel';
import CodeEditor from '../components/editor/CodeEditor';
import SandboxFrame from '../components/preview/SandboxFrame';
import { useCompiler } from '../hooks/useCompiler';
import {
  CheckCircle2,
  Circle,
  Sparkles,
  BookOpen,
  Mic,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ChevronDown,
  Award,
  Zap,
  Search,
} from 'lucide-react';

export default function MasteryPage() {
  const [activeUnitIndex, setActiveUnitIndex] = useState(0);
  const [selectedTrack, setSelectedTrack] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Expanded Categories State (Default to opening the category of the first item)
  const [expandedCats, setExpandedCats] = useState<Record<string, boolean>>(() => {
    if (MASTERY_UNITS.length > 0) {
      return { [MASTERY_UNITS[0].category]: true };
    }
    return {};
  });

  const [userCode, setUserCode] = useState<string>(MASTERY_UNITS[0].practice.starterCode);
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
  const cur = MASTERY_UNITS[activeUnitIndex] || MASTERY_UNITS[0];
  const isSolved = !!solvedUnits[cur.id];

  const handleSelectUnit = (index: number) => {
    setActiveUnitIndex(index);
    setUserCode(MASTERY_UNITS[index].practice.starterCode);
    setMcqAnswer(null);
    setConsoleOutput([]);
    // Auto-expand its category if not already
    setExpandedCats(prev => ({ ...prev, [MASTERY_UNITS[index].category]: true }));
  };

  const deferredCode = useDeferredValue(userCode);

  useEffect(() => {
    if (cur.practice.type === 'jsx') {
      compile(deferredCode).then((res) => {
        if (res.code) setCompiledJs(res.code);
      });
    } else if (cur.practice.type === 'js_snippet') {
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
      handleSelectUnit(activeUnitIndex + 1);
    }
  };

  const handlePrev = () => {
    if (activeUnitIndex > 0) {
      handleSelectUnit(activeUnitIndex - 1);
    }
  };

  const toggleCat = (cat: string) => {
    setExpandedCats(prev => ({ ...prev, [cat]: !prev[cat] }));
  };

  // Memoized Search & Grouping for Performance
  const groupedUnits = useMemo(() => {
    const query = searchQuery.toLowerCase();
    
    // 1. Filter by Track & Search Query
    const filtered = MASTERY_UNITS.filter(u => {
      const matchTrack = selectedTrack === 'all' || u.trackId === selectedTrack;
      const matchSearch = 
        u.title.toLowerCase().includes(query) || 
        u.theory.hook.toLowerCase().includes(query) || 
        u.category.toLowerCase().includes(query);
      return matchTrack && matchSearch;
    });

    // 2. Group by Category
    const groups: Record<string, MasteryUnit[]> = {};
    filtered.forEach(u => {
      if (!groups[u.category]) groups[u.category] = [];
      groups[u.category].push(u);
    });

    return groups;
  }, [searchQuery, selectedTrack]);

  const totalXP = Object.keys(solvedUnits).reduce((acc, id) => {
    const u = MASTERY_UNITS.find((x) => x.id === id);
    return acc + (u?.xp || 0);
  }, 0);

  const fullCssHtml = `<!doctype html><html><head><meta charset="utf-8">
<style>*,*::before,*::after{box-sizing:border-box}body{margin:0;padding:16px;font:14px system-ui;color:#0f172a;background:#ffffff}</style>
<style>${userCode}</style>
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

        {/* Track Filter Pills & XP Badge */}
        <div className="flex items-center gap-2 overflow-x-auto">
          <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800 shrink-0">
            <button
              onClick={() => setSelectedTrack('all')}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${selectedTrack === 'all' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
            >
              All Tracks
            </button>
            {MASTERY_TRACKS.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTrack(t.id)}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors whitespace-nowrap ${selectedTrack === t.id ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
              >
                {t.icon} {t.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-300 font-mono text-[11px] shrink-0">
            <Award size={13} className="text-amber-400" />
            <span>{totalXP} XP</span>
          </div>
        </div>
      </div>

      {/* Main 3-Pane Unified Cockpit */}
      <main className="grid grid-cols-1 lg:grid-cols-[18rem_1fr_1.1fr] xl:grid-cols-[20rem_1fr_1.1fr] gap-2 p-2 flex-1 min-h-0">
        
        {/* Left: Deep-Dark Master Stream (Mindfuck Dribbble Vibe) */}
        <div className="h-full flex flex-col rounded-xl overflow-hidden shadow-sm border border-slate-200 bg-slate-900 text-slate-200">
          <div className="p-3 border-b border-slate-800 bg-slate-950/50 backdrop-blur-md sticky top-0 z-10">
            <div className="relative">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search drills, concepts, tracks..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  // Auto-expand all when searching
                  if (e.target.value.trim() !== '') {
                    const allCats = Object.keys(groupedUnits).reduce((acc, cat) => ({...acc, [cat]: true}), {});
                    setExpandedCats(allCats);
                  }
                }}
                className="w-full bg-slate-900/50 border border-slate-700/50 text-slate-200 text-[11px] rounded-lg pl-8 pr-3 py-2 outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/50 transition-all placeholder:text-slate-600"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-2">
            {Object.keys(groupedUnits).length === 0 && (
              <div className="text-center p-4 text-xs text-slate-500">
                No challenges found matching your search.
              </div>
            )}
            
            {Object.entries(groupedUnits).map(([categoryName, units]) => {
              const isExpanded = !!expandedCats[categoryName];
              const solvedCount = units.filter(u => solvedUnits[u.id]).length;
              const isCategoryComplete = solvedCount === units.length && units.length > 0;
              
              return (
                <div key={categoryName} className="flex flex-col gap-0.5">
                  <button 
                    onClick={() => toggleCat(categoryName)}
                    className={`flex items-center justify-between w-full p-2 rounded-lg text-xs font-semibold transition-colors ${isExpanded ? 'bg-slate-800/80 text-white' : 'hover:bg-slate-800/50 text-slate-400'}`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      {isCategoryComplete ? <CheckCircle2 size={12} className="text-emerald-500" /> : <div className="w-3" />}
                      <span className="truncate">{categoryName}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-[10px] ${isCategoryComplete ? 'text-emerald-500/80' : 'text-slate-500'}`}>
                        {solvedCount}/{units.length}
                      </span>
                      {isExpanded ? <ChevronDown size={14} className="text-slate-500" /> : <ChevronRight size={14} className="text-slate-600" />}
                    </div>
                  </button>
                  
                  {isExpanded && (
                    <div className="pl-3 py-1 space-y-0.5">
                      {units.map((u) => {
                        const originalIdx = MASTERY_UNITS.indexOf(u);
                        const isSelected = originalIdx === activeUnitIndex;
                        const isDone = !!solvedUnits[u.id];

                        return (
                          <button
                            key={u.id}
                            onClick={() => handleSelectUnit(originalIdx)}
                            className={`w-full text-left p-2 rounded-lg text-xs flex items-start gap-2.5 transition-all relative overflow-hidden group
                              ${isSelected 
                                ? 'bg-sky-500/10 border border-sky-500/30 text-sky-100 shadow-[inset_2px_0_0_0_#0ea5e9]' 
                                : 'hover:bg-slate-800/50 border border-transparent text-slate-400 hover:text-slate-300'
                              }
                            `}
                          >
                            {isSelected && (
                              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-sky-500/10 to-transparent pointer-events-none" />
                            )}
                            <div className={`mt-0.5 shrink-0 transition-colors duration-300 ${isDone ? 'text-emerald-500' : isSelected ? 'text-sky-400' : 'text-slate-600 group-hover:text-slate-500'}`}>
                              {isDone ? <CheckCircle2 size={13} /> : <Circle size={13} />}
                            </div>
                            <div className="flex-1 min-w-0 relative z-10">
                              <div className={`font-medium truncate mb-0.5 ${isSelected ? 'text-white' : ''}`}>
                                {u.title}
                              </div>
                              <div className="flex items-center gap-1.5 text-[9px] opacity-70">
                                <span className={`px-1.5 py-0.5 rounded capitalize ${isSelected ? 'bg-sky-500/20 text-sky-200' : 'bg-slate-800 text-slate-500'}`}>{u.level}</span>
                                <span>·</span>
                                <span>{u.xp} XP</span>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Center: Theory, Spoken Defense, MCQ */}
        <Panel title={`Theory: ${cur.trackName}`} className="h-full flex flex-col border-slate-200 shadow-sm">
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-sky-50 text-sky-700 text-[10px] font-bold uppercase tracking-wider rounded mb-3">
                {cur.category}
              </div>
              <h1 className="text-2xl font-extrabold text-slate-900 mb-3 leading-tight tracking-tight">
                {cur.title}
              </h1>
              <p className="text-slate-700 text-[15px] font-medium leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-xs">
                {cur.theory.hook}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm uppercase tracking-wide">
                <BookOpen size={16} className="text-sky-500" />
                <h3>Under the Hood</h3>
              </div>
              <div className="text-[14px] text-slate-600 leading-relaxed space-y-2">
                {cur.theory.deepDive}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm uppercase tracking-wide">
                <Mic size={16} className="text-purple-500" />
                <h3>Spoken Defense Pitch</h3>
              </div>
              <div className="text-[14px] text-purple-900 bg-purple-50/50 border border-purple-100/80 p-4 rounded-xl italic leading-relaxed shadow-xs relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-purple-400" />
                "{cur.theory.interviewPitch}"
              </div>
            </div>

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
        </Panel>

        {/* Right: Code Crucible, Live Preview & Specs */}
        <div className="grid grid-rows-[1.2fr_1fr] gap-2 h-full min-h-0">
          {/* Editor Panel */}
          <Panel
            title={`Code Crucible (${cur.practice.type.toUpperCase()})`}
            actions={
              <button
                onClick={handleMarkComplete}
                className={`px-3 py-1.5 text-xs rounded-lg font-bold transition-all flex items-center gap-2 shadow-sm
                  ${isSolved
                    ? 'bg-emerald-500 hover:bg-emerald-600 text-white border-b-2 border-emerald-700'
                    : 'bg-slate-900 hover:bg-slate-800 text-white border-b-2 border-slate-950'}`}
              >
                {isSolved ? <CheckCircle2 size={14} /> : <Sparkles size={14} />}
                {isSolved ? 'Mastered ✓' : 'Mark Solved'}
              </button>
            }
            className="h-full flex flex-col border-slate-200 shadow-sm"
          >
            <CodeEditor
              value={userCode}
              onChange={setUserCode}
              lang={cur.practice.type === 'css' ? 'css' : ('jsx')}
              className="h-full"
            />
          </Panel>

          {/* Live Preview & Spec Checklist */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_12rem] gap-2 h-full min-h-0">
            <Panel title={cur.practice.type === 'js_snippet' ? "Console Output" : "Live Preview"} className="h-full flex flex-col border-slate-200 shadow-sm">
              {cur.practice.type === 'css' ? (
                <iframe
                  title="css-preview"
                  srcDoc={fullCssHtml}
                  sandbox="allow-scripts allow-same-origin"
                  className="w-full h-full border-0 bg-white"
                />
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
                <SandboxFrame
                  baseCSS=""
                  userCSS=""
                  jsCode={compiledJs}
                  className="h-full w-full bg-white"
                />
              )}
            </Panel>

            <Panel title="Spec Checklist" className="h-full flex flex-col border-slate-200 shadow-sm bg-slate-50/50">
              <div className="p-3 space-y-2.5 overflow-y-auto text-xs">
                {cur.practice.specs.map((spec, i) => (
                  <div key={i} className="flex items-start gap-2 text-slate-700 bg-white p-2 rounded-lg border border-slate-200 shadow-xs">
                    <CheckCircle2 size={14} className="text-sky-500 mt-0.5 shrink-0" />
                    <span className="text-[11px] font-medium leading-snug">{spec}</span>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        </div>
      </main>
    </div>
  );
}
