import React, { useState, useRef, useEffect } from 'react';
import { Bot, Sparkles, Send, RotateCcw, X } from 'lucide-react';
import type { MasteryUnit } from '../../data/masteryStream';
import { useAiChat } from '../../hooks/useAiChat';
import { FormattedMarkdown } from './FormattedMarkdown';
import { QuickPromptsRow } from './QuickPromptsRow';

interface Props {
  unit: MasteryUnit;
  userCode: string;
  onClose: () => void;
  chatWithMentor: (params: {
    unitTitle: string;
    category: string;
    trackName: string;
    taskDescription: string;
    specs: string[];
    userCode: string;
    practiceType?: string;
    messages: Array<{ role: 'user' | 'assistant'; content: string }>;
  }) => Promise<string | null>;
  isAiReady?: boolean;
  isAiLoading?: boolean;
  aiPercent?: number;
  activeModelId?: string;
}

export default function AiChatPanel({
  unit,
  userCode,
  onClose,
  chatWithMentor,
  isAiReady
}: Props) {
  const { messages, isTyping, sendMessage, sendQuickPrompt, clearMessages } = useAiChat({
    unit,
    userCode,
    chatWithMentor,
    isAiReady,
  });

  const [inputVal, setInputVal] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputVal.trim() || isTyping) return;
    sendMessage(inputVal);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl text-slate-100">
      {/* Header */}
      <div className="p-3 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-indigo-500 to-sky-500 flex items-center justify-center shrink-0 shadow-xs">
            <Bot size={14} className="text-white" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-xs tracking-tight text-white truncate">AI Problem Mentor</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
            </div>
            <p className="text-[10px] text-slate-400 truncate">{unit.title} · <span className="text-sky-400 font-medium">{unit.trackName}</span></p>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button onClick={clearMessages} title="Clear Chat History" className="p-1 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition cursor-pointer">
            <RotateCcw size={13} />
          </button>
          <button onClick={onClose} title="Close Mentor Chat" className="p-1 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition cursor-pointer">
            <X size={14} />
          </button>
        </div>
      </div>

      <QuickPromptsRow onSelectPrompt={sendQuickPrompt} disabled={isTyping} />

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div key={msg.id} className={`flex items-start gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
              {!isUser && (
                <div className="w-5 h-5 rounded-md bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center shrink-0 mt-0.5 text-indigo-400">
                  <Bot size={11} />
                </div>
              )}
              <div className={`max-w-[88%] p-2.5 rounded-xl text-xs ${isUser ? 'bg-sky-600 text-white rounded-tr-xs shadow-xs' : 'bg-slate-800/90 border border-slate-700/80 rounded-tl-xs shadow-xs'}`}>
                {isUser ? <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p> : <FormattedMarkdown text={msg.content} />}
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2 text-slate-400 text-xs pl-1">
            <div className="w-5 h-5 rounded-md bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center shrink-0 text-indigo-400">
              <Sparkles size={11} className="animate-spin" />
            </div>
            <div className="flex items-center gap-1 bg-slate-800/80 border border-slate-700/60 px-2.5 py-1.5 rounded-lg text-[11px] text-indigo-300">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.4s]" />
              <span className="ml-1 text-slate-400">Analyzing code & specs...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-2.5 bg-slate-950/90 border-t border-slate-800 shrink-0 flex items-end gap-2">
        <textarea
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question or debate a diagnosis (Enter to send)..."
          rows={1}
          className="flex-1 bg-slate-900 border border-slate-700/70 text-slate-100 text-xs rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500/50 resize-none max-h-24 transition placeholder:text-slate-500"
        />
        <button
          onClick={handleSend}
          disabled={!inputVal.trim() || isTyping}
          className="p-2 rounded-lg bg-sky-600 hover:bg-sky-500 disabled:opacity-40 text-white transition cursor-pointer shadow-xs shrink-0"
        >
          <Send size={13} />
        </button>
      </div>
    </div>
  );
}
