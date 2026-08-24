interface Props {
  label: string;
  value: number;
  max: number;
  className?: string;
}

export default function ProgressBar({ label, value, max, className = '' }: Props) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className={className}>
      <div className="flex justify-between text-xs font-semibold text-gray-500 mb-0.5">
        <span>{label}</span>
        <span className="tabular-nums">{value} / {max}</span>
      </div>
      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-sky-600 to-sky-300 rounded-full transition-[width] duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
