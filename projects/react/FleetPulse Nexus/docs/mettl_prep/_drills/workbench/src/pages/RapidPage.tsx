import { useState, useEffect } from 'react';
import { RAPID } from '../data/rapid';
import { Flame, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { logActivity } from '../hooks/useApi';

export default function RapidPage() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);
  const [seconds, setSeconds] = useState(25);
  const [answered, setAnswered] = useState(false);

  const cur = RAPID[index % RAPID.length] as {
    t: string; topic: string; q: string; a?: string[]; c?: number; start?: string; why: string;
  };

  useEffect(() => {
    if (answered) return;
    const defaultTime = cur.t === 'code' ? 120 : 25;
    setSeconds(defaultTime);
    const interval = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clearInterval(interval);
          setAnswered(true);
          setStreak(0);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [index, answered, cur.t]);

  const handleSelect = (i: number) => {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    const isCorrect = i === cur.c;
    if (isCorrect) {
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      setBest(Math.max(best, nextStreak));
    } else {
      setStreak(0);
    }
    logActivity({ ev: 'rapid', q: cur.q, correct: isCorrect });
  };

  const handleNext = () => {
    setSelected(null);
    setAnswered(false);
    setIndex((i) => (i + 1) % RAPID.length);
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-slate-100 p-4 items-center justify-center">
      <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-xl shadow-lg p-6 flex flex-col gap-5">
        <div className="flex justify-between items-center text-xs pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sky-800 bg-sky-50 px-2.5 py-1 rounded-full uppercase tracking-wider text-[0.65rem]">{cur.topic || 'JS & React'}</span>
            <span className="text-slate-400 font-mono">Question {index + 1} / {RAPID.length}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
              <Flame size={13} /> {streak} Streak (Best: {best})
            </span>
            <span className="flex items-center gap-1 font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full font-mono">
              <Clock size={13} /> {seconds}s
            </span>
          </div>
        </div>

        <h2 className="text-base font-bold text-slate-900 leading-snug">{cur.q}</h2>

        {cur.start && (
          <pre className="p-3 bg-slate-900 text-slate-200 font-mono text-xs rounded-lg overflow-x-auto whitespace-pre-wrap">
            {cur.start}
          </pre>
        )}

        {cur.a && (
          <div className="grid gap-2.5">
            {cur.a.map((opt: string, i: number) => {
              const isChosen = selected === i;
              const isCorrect = i === cur.c;
              let bg = 'bg-white border-slate-200 hover:border-sky-500 hover:bg-sky-50/50';
              if (answered) {
                if (isCorrect) bg = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold';
                else if (isChosen) bg = 'bg-rose-50 border-rose-500 text-rose-950';
                else bg = 'bg-slate-50 border-slate-200 opacity-50';
              }
              return (
                <button
                  key={i}
                  disabled={answered}
                  onClick={() => handleSelect(i)}
                  className={`w-full text-left p-3 border rounded-lg text-xs flex items-center justify-between transition-all cursor-pointer ${bg}`}
                >
                  <span>{opt}</span>
                  {answered && isCorrect && <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />}
                  {answered && isChosen && !isCorrect && <XCircle size={15} className="text-rose-600 shrink-0" />}
                </button>
              );
            })}
          </div>
        )}

        {answered && (
          <div className="p-3.5 bg-sky-50 border-l-3 border-sky-600 rounded-r-lg text-xs text-sky-950 flex flex-col gap-2">
            <div className="font-bold uppercase tracking-wider text-[0.65rem] text-sky-800">Architectural Rationale</div>
            <p className="leading-relaxed">{cur.why}</p>
            <button
              onClick={handleNext}
              className="self-end bg-sky-700 hover:bg-sky-600 text-white font-semibold px-4 py-1.5 rounded-lg text-xs mt-1 transition-colors cursor-pointer"
            >
              Next Question →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
