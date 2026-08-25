import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface Props {
  /** Named so the message says which pane died, not just "something broke". */
  name: string;
  children: ReactNode;
}

interface State {
  error: Error | null;
}

/**
 * The app had no error boundary anywhere — the only occurrence of the phrase in
 * the entire codebase was inside a quiz question *about* error boundaries.
 *
 * The consequence was total: one bad unit, one malformed diagram, one throw in
 * a render, and the whole page went black — the editor, the progress, the
 * unsaved answer, all of it. In a study tool that is not a crash, it is lost
 * work.
 *
 * Boundaries are per pane on purpose. If the preview dies, the brief and the
 * editor keep working, and the failure stays the size of the thing that failed.
 */
export default class PaneBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(`[${this.props.name}]`, error, info.componentStack);
  }

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    return (
      <div className="h-full w-full flex flex-col items-center justify-center gap-3 p-6 text-center bg-red-50/60 border border-red-200 rounded-xl">
        <AlertTriangle size={22} className="text-red-500" />
        <div>
          <p className="text-sm font-bold text-red-900">{this.props.name} stopped</p>
          <p className="text-[11px] text-red-700/80 font-mono mt-1 max-w-sm break-words">
            {error.message}
          </p>
        </div>
        <button
          onClick={() => this.setState({ error: null })}
          className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-red-300 text-red-800 hover:bg-red-50 flex items-center gap-1.5"
        >
          <RotateCcw size={12} /> Retry this pane
        </button>
        <p className="text-[10px] text-red-700/60">
          The rest of the page is still live — your code and progress are intact.
        </p>
      </div>
    );
  }
}
