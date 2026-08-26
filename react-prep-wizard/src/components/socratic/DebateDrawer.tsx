import { useState } from 'react';
import { Scale, MessageSquare, Send, RefreshCw, ChevronUp, ChevronDown } from 'lucide-react';

interface Props {
  initialPrompt?: string;
  onDispute: (userArgument: string) => Promise<void>;
  isDisputing: boolean;
}

export function DebateDrawer({ initialPrompt = '', onDispute, isDisputing }: Props) {
  const [showDebateBox, setShowDebateBox] = useState(false);
  const [userArgument, setUserArgument] = useState(initialPrompt);

  const quickOptions = [
    'My code satisfies all specifications via an alternative valid algorithm.',
    'The automated test check is brittle or made an assumption not required by the prompt.',
    'My approach avoids unintended side effects and handles the contract correctly.',
  ];

  const handleSend = async () => {
    if (!userArgument.trim() || isDisputing) return;
    await onDispute(userArgument.trim());
  };

  return (
    <div className="pt-2 border-t border-indigo-100/70">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowDebateBox(!showDebateBox)}
          className="px-2.5 py-1 rounded-md bg-indigo-100/70 hover:bg-indigo-200/80 text-indigo-900 font-semibold text-[11px] transition flex items-center gap-1.5 cursor-pointer"
        >
          <Scale size={13} className="text-indigo-600" />
          <span>{showDebateBox ? 'Close Debate / Dispute Court' : '⚖️ Challenge AI Verdict / Debate Case'}</span>
          {showDebateBox ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </button>
        <span className="text-[10px] text-slate-500 italic">
          Debate whether you actually erred or if the test is brittle
        </span>
      </div>

      {showDebateBox && (
        <div className="mt-2.5 p-3 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 space-y-2.5 animate-fadeIn">
          <div className="flex items-center gap-2 text-sky-400 font-semibold text-[11px]">
            <MessageSquare size={13} />
            <span>Present Your Counter-Argument to the Appellate Judge:</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {quickOptions.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => setUserArgument(chip)}
                className="px-2 py-0.5 rounded text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600/80 transition cursor-pointer text-left"
              >
                {chip}
              </button>
            ))}
          </div>

          <textarea
            value={userArgument}
            onChange={(e) => setUserArgument(e.target.value)}
            placeholder="Explain why your code is correct or why the test diagnosis made an invalid assumption..."
            rows={2}
            className="w-full p-2 rounded bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:ring-1 focus:ring-sky-400 focus:outline-none placeholder:text-slate-500 resize-none font-mono"
          />

          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] text-slate-400">
              The AI will review your argument against the specs with complete impartiality.
            </span>
            <button
              onClick={handleSend}
              disabled={!userArgument.trim() || isDisputing}
              className="px-3 py-1.5 rounded-md bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white font-semibold text-[11px] shadow-xs transition flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              {isDisputing ? (
                <>
                  <RefreshCw size={12} className="animate-spin" />
                  <span>Arbitrating Appeal...</span>
                </>
              ) : (
                <>
                  <Send size={12} />
                  <span>Submit Appeal to Judge</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
