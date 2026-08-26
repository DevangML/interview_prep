import React from 'react';
import { Check, CornerDownLeft, Sparkles } from 'lucide-react';
import { haptic } from './HapticEngine';

export interface KeyboardAccessoryBarProps {
  onInsertText: (snippet: string) => void;
  onDone?: () => void;
  customSnippets?: { label: string; snippet: string }[];
  isVisible?: boolean;
}

const DEFAULT_SNIPPETS = [
  { label: 'const', snippet: 'const ' },
  { label: 'useState', snippet: 'const [state, setState] = useState();' },
  { label: 'useEffect', snippet: 'useEffect(() => {\n  \n}, []);' },
  { label: 'return', snippet: 'return (\n  \n);' },
  { label: '<div>', snippet: '<div></div>' },
  { label: '=>', snippet: ' => ' },
  { label: 'log', snippet: 'console.log();' },
  { label: '?', snippet: ' ? ' },
  { label: ':', snippet: ' : ' },
  { label: '&&', snippet: ' && ' },
];

export default function KeyboardAccessoryBar({
  onInsertText,
  onDone,
  customSnippets = DEFAULT_SNIPPETS,
  isVisible = true,
}: KeyboardAccessoryBarProps) {
  if (!isVisible) return null;

  return (
    <div className="bg-slate-900/95 backdrop-blur-md border-t border-slate-700/80 px-2 py-1.5 flex items-center justify-between gap-1.5 shadow-lg select-none z-30 shrink-0">
      {/* Scrollable Snippet Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar flex-1 py-0.5">
        {customSnippets.map((chip, idx) => (
          <button
            key={idx}
            type="button"
            onMouseDown={(e) => {
              // Prevent losing input focus
              e.preventDefault();
              haptic.selection();
              onInsertText(chip.snippet);
            }}
            className="px-2.5 py-1 rounded-lg bg-slate-800 active:bg-sky-600 text-sky-300 active:text-white border border-slate-700/60 font-mono text-xs font-bold whitespace-nowrap transition cursor-pointer"
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Done / Dismiss Button */}
      {onDone && (
        <button
          type="button"
          onClick={() => {
            haptic.impactLight();
            onDone();
          }}
          className="px-3 py-1 rounded-lg bg-sky-600 active:bg-sky-500 text-white font-sans text-xs font-bold flex items-center gap-1 shrink-0 transition cursor-pointer shadow-xs"
        >
          <Check size={13} />
          <span>Done</span>
        </button>
      )}
    </div>
  );
}
