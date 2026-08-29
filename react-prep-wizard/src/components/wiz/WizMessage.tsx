import React from 'react';
import { ChevronDown, Bot, User } from 'lucide-react';
import { FormattedMarkdown } from '../socratic/FormattedMarkdown';

interface WizMessageProps {
  message: {
    id: string;
    role: 'user' | 'assistant' | 'thinking';
    content: string;
    timestamp: number;
  };
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export function WizMessage({ message, isExpanded, onToggleExpand }: WizMessageProps) {
  const isUser = message.role === 'user';
  const isThinking = message.role === 'thinking';

  return (
    <div className={`flex items-start gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
          isThinking
            ? 'bg-purple-500/20 border border-purple-500/40'
            : 'bg-indigo-500/20 border border-indigo-500/40'
        }`}>
          {isThinking ? (
            <span className="text-xs text-purple-400">💭</span>
          ) : (
            <Bot size={14} className="text-indigo-400" />
          )}
        </div>
      )}

      <div className={`flex-1 max-w-md ${isUser ? 'bg-slate-700/50' : 'bg-transparent'} rounded-lg px-4 py-3 border ${
        isUser
          ? 'border-slate-600/30'
          : isThinking
          ? 'border-purple-500/20'
          : 'border-indigo-500/20'
      }`}>
        {isUser ? (
          <div className="text-sm text-slate-100">{message.content}</div>
        ) : (
          <>
            <FormattedMarkdown text={message.content} className="text-sm text-slate-100" />

            {message.content.length > 300 && (
              <button
                onClick={onToggleExpand}
                className="mt-2 text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition"
              >
                <ChevronDown
                  size={12}
                  className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                />
                {isExpanded ? 'Show less' : 'Show more'}
              </button>
            )}
          </>
        )}

        <div className="text-xs text-slate-500 mt-2 opacity-50">
          {new Date(message.timestamp).toLocaleTimeString()}
        </div>
      </div>

      {isUser && (
        <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0 mt-0.5">
          <User size={14} className="text-emerald-400" />
        </div>
      )}
    </div>
  );
}
