import type { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';

interface Props {
  label: string;
  /** Items shown after filtering. */
  count: number;
  /** Items in this group overall — context for what the filter is hiding. */
  total: number;
  collapsed: boolean;
  onToggle: () => void;
  /** Small right-aligned summary, e.g. "3/7 held". */
  meta?: ReactNode;
  children: ReactNode;
}

/**
 * A group that can be shut and stays shut. Native <details>/<summary> keeps the
 * keyboard and screen-reader behaviour for free; `content-visibility: auto`
 * lets the browser skip laying out sections that are off screen, which is why
 * a 108-row list needs no virtualiser.
 */
export default function CollapsibleGroup({
  label, count, total, collapsed, onToggle, meta, children,
}: Props) {
  return (
    <details
      open={!collapsed}
      className="mb-1.5 group"
      style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 3rem' }}
    >
      <summary
        onClick={(e) => { e.preventDefault(); onToggle(); }}
        className="sticky top-0 z-[5] flex items-center gap-1 px-1 py-1 cursor-pointer select-none
                   bg-slate-50/95 backdrop-blur rounded text-[0.64rem] font-bold uppercase
                   tracking-wider text-gray-600 hover:text-slate-900 list-none"
      >
        <ChevronRight
          size={11}
          className={`shrink-0 transition-transform ${collapsed ? '' : 'rotate-90'}`}
        />
        <span className="truncate">{label}</span>
        <span className="ml-auto tabular-nums text-slate-400 font-mono">
          {count === total ? total : `${count}/${total}`}
        </span>
        {meta}
      </summary>
      <div className="pt-0.5">{children}</div>
    </details>
  );
}
