import { useState, useEffect } from 'react';
import { RAPID_FIRE_DB, RapidQuestion, buildMettlPaper, METTL_PAPER } from '../data/rapidFireDb';
import { Timer, Zap, CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import PaneBoundary from '../components/layout/PaneBoundary';

export default function RapidFirePage() {
  const [isActive, setIsActive] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  
  // Shuffle pool on mount
  const [pool, setPool] = useState<RapidQuestion[]>([]);
  /**
   * Sprint = 10 questions, 60s each, drawn from anywhere — a warm-up.
   * Full paper = 36 questions in 50 minutes, sampled to the competency mix
   * Mercer | Mettl publishes for the 2–5 year React test. 83 seconds per
   * question, which is the actual constraint the exam imposes.
   */
  const [examMode, setExamMode] = useState(false);

  const makePool = (full: boolean): RapidQuestion[] =>
    full
      ? (buildMettlPaper() as RapidQuestion[])
      : [...RAPID_FIRE_DB].sort(() => 0.5 - Math.random()).slice(0, 10);

  useEffect(() => {
    setPool(makePool(false));
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && !showResult && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0 && !showResult) {
      handleTimeOut();
    }
    return () => clearInterval(timer);
  }, [isActive, showResult, timeLeft]);

  const startRun = (full = examMode) => {
    setExamMode(full);
    setPool(makePool(full));
    setIsActive(true);
    setCurrentIndex(0);
    setScore(0);
    // 50 minutes over 36 questions is 83 seconds each — the real pace.
    setTimeLeft(full ? Math.floor((METTL_PAPER.minutes * 60) / METTL_PAPER.questions) : 60);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const perQuestionSeconds = examMode
    ? Math.floor((METTL_PAPER.minutes * 60) / METTL_PAPER.questions)
    : 60;

  const handleTimeOut = () => {
    setSelectedAnswer(-1); // -1 means timeout
    setShowResult(true);
  };

  const handleSelect = (idx: number) => {
    if (showResult) return;
    setSelectedAnswer(idx);
    setShowResult(true);
    if (idx === pool[currentIndex].correct) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex === pool.length - 1) {
      setIsActive(false);
    } else {
      setCurrentIndex(i => i + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(perQuestionSeconds);
    }
  };

  if (pool.length === 0) return <div>Loading...</div>;

  if (!isActive && currentIndex === 0 && score === 0) {
    return (
      <div className="h-full flex items-center justify-center bg-slate-950 p-6">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center shadow-2xl">
          <div className="w-20 h-20 bg-amber-500/20 text-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(245,158,11,0.2)]">
            <Zap size={40} />
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-4">Rapid Fire OA</h1>
          <p className="text-slate-400 mb-6 leading-relaxed">
            Output-prediction and concept recall in the Mettl format. Pick a warm-up,
            or sit the real thing — <strong className="text-slate-200">{METTL_PAPER.questions} questions
            in {METTL_PAPER.minutes} minutes</strong>, sampled to the competency mix Mercer&nbsp;|&nbsp;Mettl
            publishes for the 2–5 year React paper.
          </p>
          <div className="grid gap-2">
            <button
              onClick={() => startRun(true)}
              className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold rounded-xl text-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Full paper · {METTL_PAPER.questions} Q · 83s each
            </button>
            <button
              onClick={() => startRun(false)}
              className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl transition-all"
            >
              Sprint · 10 Q · 60s each
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!isActive && currentIndex === pool.length - 1) {
    return (
      <div className="h-full flex items-center justify-center bg-slate-950 p-6">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center shadow-2xl">
          <div className="text-6xl mb-6">{score >= 8 ? '🏆' : '💀'}</div>
          <h1 className="text-3xl font-extrabold text-white mb-2">Crucible Complete</h1>
          <p className="text-xl text-slate-300 mb-2">
            Score: <span className="font-bold text-amber-400">{score}</span> / {pool.length}
          </p>
          <p className="text-xs text-slate-500 mb-8">
            {examMode ? 'Full paper — blueprint mix' : 'Sprint — mixed draw'}
          </p>
          <button
            onClick={() => startRun(examMode)}
            className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all"
          >
            <RotateCcw size={20} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const cur = pool[currentIndex];

  return (
    <PaneBoundary name="Rapid Fire OA">
      <div className="h-full flex flex-col bg-slate-50">
        {/* Header */}
        <header className="shrink-0 h-16 border-b border-slate-200 bg-white flex items-center justify-between px-6 shadow-sm z-10">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-slate-800 font-bold">
              <Zap size={20} className="text-amber-500" />
              <span>OA Simulator</span>
            </div>
            <div className="h-4 w-px bg-slate-200"></div>
            <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{cur.category}</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-sm font-bold text-slate-400">
              {currentIndex + 1} / {pool.length}
            </div>
            <div className={`flex items-center gap-2 font-mono text-lg font-bold px-4 py-1.5 rounded-lg border
              ${timeLeft <= 10 ? 'text-rose-600 border-rose-200 bg-rose-50 animate-pulse' : 'text-slate-700 border-slate-200 bg-slate-50'}`}>
              <Timer size={18} />
              {timeLeft}s
            </div>
          </div>
        </header>

        {/* Main Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10 flex justify-center">
          <div className="max-w-3xl w-full space-y-6">
            
            <h2 className="text-2xl font-extrabold text-slate-900 leading-snug">{cur.question}</h2>

            {cur.codeSnippet && (
              <div className="rounded-xl overflow-hidden shadow-sm border border-slate-200 bg-white">
                <CodeMirror
                  value={cur.codeSnippet}
                  readOnly={true}
                  extensions={[javascript({ jsx: true })]}
                  theme="light"
                  basicSetup={{
                    lineNumbers: false,
                    foldGutter: false,
                    highlightActiveLine: false
                  }}
                />
              </div>
            )}

            <div className="grid gap-3 pt-4">
              {cur.options.map((opt, i) => {
                const isSelected = selectedAnswer === i;
                const isCorrect = i === cur.correct;
                
                let btnClass = "border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:bg-sky-50";
                let icon = null;

                if (showResult) {
                  if (isCorrect) {
                    btnClass = "border-emerald-500 bg-emerald-50 text-emerald-900 font-bold shadow-sm";
                    icon = <CheckCircle2 size={20} className="text-emerald-500" />;
                  } else if (isSelected) {
                    btnClass = "border-rose-500 bg-rose-50 text-rose-900 font-bold shadow-sm";
                    icon = <XCircle size={20} className="text-rose-500" />;
                  } else {
                    btnClass = "border-slate-200 bg-white opacity-50";
                  }
                }

                return (
                  <button
                    key={i}
                    disabled={showResult}
                    onClick={() => handleSelect(i)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between group \${btnClass}`}
                  >
                    <span className="text-[15px] font-medium font-mono">{opt}</span>
                    {icon && <span>{icon}</span>}
                  </button>
                );
              })}
            </div>

            {showResult && (
              <div className="mt-8 p-6 bg-slate-900 rounded-2xl shadow-xl text-slate-300 animate-in fade-in slide-in-from-bottom-4">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 mt-1">
                    {selectedAnswer === cur.correct ? 
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center"><CheckCircle2 size={18} /></div> :
                      <div className="w-8 h-8 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center"><XCircle size={18} /></div>
                    }
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1 text-lg">
                      {selectedAnswer === cur.correct ? "Correct!" : (selectedAnswer === -1 ? "Time's Up!" : "Incorrect")}
                    </h3>
                    <p className="text-[15px] leading-relaxed mb-6">{cur.explanation}</p>
                    
                    <button 
                      onClick={handleNext}
                      className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold rounded-lg flex items-center gap-2 transition-all"
                    >
                      Next Question
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>
    </PaneBoundary>
  );
}
