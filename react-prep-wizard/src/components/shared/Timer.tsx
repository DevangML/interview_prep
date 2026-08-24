interface Props {
  seconds: number;
  active: boolean;
}

export default function Timer({ seconds, active }: Props) {
  if (!active) return null;

  const bg = seconds <= 15 ? 'bg-red-700' : seconds <= 30 ? 'bg-amber-600' : 'bg-slate-800';

  return (
    <span className={`${bg} text-white text-xs font-bold font-mono px-2 py-1 rounded tabular-nums`}>
      {seconds <= 0 ? '⏰ Time up!' : `${seconds}s`}
    </span>
  );
}
