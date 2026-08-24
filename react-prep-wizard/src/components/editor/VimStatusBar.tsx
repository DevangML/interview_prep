import { useStore } from '../../store';

export default function VimStatusBar() {
  const vimMode = useStore((s) => s.vimMode);
  if (!vimMode) return null;

  return (
    <div className="flex items-center justify-between px-3 py-1 bg-slate-950 border-t border-slate-800 text-[11px] font-mono text-slate-400 shrink-0">
      <div className="flex items-center gap-2">
        <span className="px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 font-bold border border-purple-800">
          VIM
        </span>
        <span id="cm-vim-status" className="text-slate-200">-- NORMAL --</span>
      </div>
      <div className="text-[10px] text-slate-500">
        <kbd className="bg-slate-900 px-1 rounded text-slate-400">:w</kbd> format & save | <kbd className="bg-slate-900 px-1 rounded text-slate-400">jk</kbd> esc
      </div>
    </div>
  );
}
