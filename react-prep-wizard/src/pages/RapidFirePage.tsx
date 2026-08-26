import { useState, useEffect } from 'react';
import { RAPID_FIRE_DB, RapidQuestion, buildMettlPaper, METTL_PAPER } from '../data/rapidFireDb';
import { Timer } from 'lucide-react';
import PaneBoundary from '../components/layout/PaneBoundary';
import { RapidFireLobby } from '../components/rapidfire/RapidFireLobby';
import { RapidFireCard } from '../components/rapidfire/RapidFireCard';

export default function RapidFirePage() {
  const [isActive, setIsActive] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [pool, setPool] = useState<RapidQuestion[]>([]);
  const [examMode, setExamMode] = useState(false);

  const makePool = (full: boolean): RapidQuestion[] =>
    full ? (buildMettlPaper() as RapidQuestion[]) : [...RAPID_FIRE_DB].sort(() => 0.5 - Math.random()).slice(0, 10);

  useEffect(() => { setPool(makePool(false)); }, []);

  const perQuestionSeconds = examMode ? Math.floor((METTL_PAPER.minutes * 60) / METTL_PAPER.questions) : 60;

  useEffect(() => {
    // ReturnType<typeof setInterval> rather than NodeJS.Timeout: this runs in the
    // browser, and @types/node is not a dependency of this app.
    let timer: ReturnType<typeof setInterval> | undefined;
    if (isActive && !showResult && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0 && !showResult) {
      setSelectedAnswer(-1);
      setShowResult(true);
    }
    return () => {
      if (timer !== undefined) clearInterval(timer);
    };
  }, [isActive, showResult, timeLeft]);

  const startRun = (full = examMode) => {
    setExamMode(full);
    setPool(makePool(full));
    setIsActive(true);
    setCurrentIndex(0);
    setScore(0);
    setTimeLeft(full ? Math.floor((METTL_PAPER.minutes * 60) / METTL_PAPER.questions) : 60);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleSelect = (idx: number) => {
    if (showResult) return;
    setSelectedAnswer(idx);
    setShowResult(true);
    if (idx === pool[currentIndex].correct) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (currentIndex === pool.length - 1) {
      setIsActive(false);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(perQuestionSeconds);
    }
  };

  if (pool.length === 0) return <div>Loading...</div>;

  if (!isActive) {
    return (
      <RapidFireLobby
        isFinished={currentIndex === pool.length - 1 && showResult}
        score={score}
        total={pool.length}
        examMode={examMode}
        onStartRun={startRun}
      />
    );
  }

  const curQ = pool[currentIndex];

  return (
    <PaneBoundary name="Rapid Fire Cockpit">
      <div className="h-full flex flex-col bg-slate-950 text-slate-100 overflow-y-auto">
        <div className="border-b border-slate-800 bg-slate-900/60 p-4 shrink-0 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-bold text-sm text-white">Question {currentIndex + 1} of {pool.length}</span>
            <span className="px-2 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-800 text-xs font-mono font-bold">
              {curQ.category} · {curQ.difficulty || 'Core'}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 font-mono text-xs bg-slate-800 px-3 py-1 rounded-lg border border-slate-700">
              <Timer size={14} className={timeLeft <= 10 ? 'text-rose-400 animate-pulse' : 'text-slate-400'} />
              <span className={timeLeft <= 10 ? 'text-rose-400 font-bold' : 'text-slate-300'}>{timeLeft}s</span>
            </div>
            <div className="font-mono text-xs bg-amber-500/10 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-lg">
              Score: {score}
            </div>
          </div>
        </div>

        <div className="flex-1 p-6 max-w-3xl w-full mx-auto flex flex-col justify-center">
          <RapidFireCard
            question={curQ}
            selectedAnswer={selectedAnswer}
            showResult={showResult}
            onSelect={handleSelect}
            onNext={handleNext}
          />
        </div>
      </div>
    </PaneBoundary>
  );
}
