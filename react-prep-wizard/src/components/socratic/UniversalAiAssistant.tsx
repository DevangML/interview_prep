import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Sparkles,
  Send,
  RotateCcw,
  X,
  Compass,
  Code2,
  BookOpen,
  Zap,
  ExternalLink,
  CheckCircle2,
  Copy,
  Layers,
  Search,
  Cpu
} from 'lucide-react';
import { useAgentChat, type AgentContextType, type AgentPersona } from '../../hooks/useAgentChat';
import { FormattedMarkdown } from './FormattedMarkdown';
import type { ProjectBlueprint } from '../../data/projects/types';
import type { LiteratureReference } from '../../lib/ai/agentKnowledge';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  contextType: AgentContextType;
  roadmapContext?: {
    trackId?: string;
    trackName?: string;
    topicId?: string;
    topicTitle?: string;
    topicSummary?: string;
    area?: string;
    keyPoints?: string[];
  };
  projectContext?: {
    projectId?: string;
    projectTitle?: string;
    blueprint?: ProjectBlueprint;
  };
  sandboxContext?: {
    jsxCode?: string;
    cssCode?: string;
    error?: string | null;
    onApplyCode?: (jsx: string, css?: string) => void;
  };
  masteryContext?: {
    unitTitle?: string;
    taskDescription?: string;
    specs?: string[];
    userCode?: string;
  };
  chatWithMentor?: (params: any) => Promise<string | null>;
  isAiReady?: boolean;
}

export default function UniversalAiAssistant({
  isOpen,
  onClose,
  contextType,
  roadmapContext,
  projectContext,
  sandboxContext,
  masteryContext,
  chatWithMentor,
  isAiReady
}: Props) {
  const {
    messages,
    isTyping,
    activePersona,
    setActivePersona,
    sendMessage,
    triggerGamifiedDuel,
    searchLiterature,
    suggestProjectExtensions,
    auditProjectSyllabus,
    scaffoldSandboxTemplate,
    clearMessages
  } = useAgentChat({
    contextType,
    roadmapContext,
    projectContext,
    sandboxContext,
    masteryContext,
    chatWithMentor,
    isAiReady
  });

  const [inputVal, setInputVal] = useState('');
  const [selectedDuelAnswers, setSelectedDuelAnswers] = useState<Record<string, number>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

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

  const getContextBadge = () => {
    if (contextType === 'roadmap') {
      return {
        icon: BookOpen,
        title: roadmapContext?.topicTitle || 'Roadmap Track',
        subtitle: roadmapContext?.trackName || 'Core Curriculum',
        color: 'from-sky-500 to-indigo-500'
      };
    }
    if (contextType === 'project') {
      return {
        icon: Compass,
        title: projectContext?.projectTitle || 'Tier-1 System Architecture',
        subtitle: projectContext?.blueprint?.realWorldAnalog || 'Staff Blueprint',
        color: 'from-amber-500 to-orange-500'
      };
    }
    if (contextType === 'sandbox') {
      return {
        icon: Code2,
        title: 'Sandbox Lab & Compiler',
        subtitle: sandboxContext?.error ? 'Transpiler Error Active' : 'React 19 Execution',
        color: 'from-emerald-500 to-teal-500'
      };
    }
    return {
      icon: Sparkles,
      title: 'Interview Mastery Oracle',
      subtitle: 'Universal Socratic Substrate',
      color: 'from-purple-500 to-indigo-500'
    };
  };

  const badge = getContextBadge();
  const BadgeIcon = badge.icon;

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[480px] lg:w-[540px] z-50 bg-slate-900/98 backdrop-blur-xl border-l border-slate-800 shadow-2xl flex flex-col text-slate-100 transition-all animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="p-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${badge.color} flex items-center justify-center shrink-0 shadow-md`}>
            <BadgeIcon size={16} className="text-white" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-black text-xs tracking-tight text-white truncate">{badge.title}</span>
              <span className={`w-2 h-2 rounded-full ${isAiReady ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'} shrink-0`} />
            </div>
            <p className="text-[10px] text-slate-400 font-mono truncate">{badge.subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={clearMessages}
            title="Reset Chat Session"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition cursor-pointer"
          >
            <RotateCcw size={14} />
          </button>
          <button
            onClick={onClose}
            title="Close Assistant"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Persona Selection Bar */}
      <div className="p-2 bg-slate-950/60 border-b border-slate-800 flex items-center gap-1 overflow-x-auto no-scrollbar shrink-0">
        {[
          { id: 'tutor', label: '🎓 Socratic Tutor', icon: BookOpen },
          { id: 'architect', label: '🏛️ Systems Architect', icon: Layers },
          { id: 'copilot', label: '🛠️ Code Copilot', icon: Cpu },
          { id: 'duel', label: '🎮 Gamified Duel', icon: Zap },
          { id: 'search', label: '📚 Literature / RFCs', icon: Search }
        ].map((p) => {
          const isActive = activePersona === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setActivePersona(p.id as AgentPersona)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1 border ${
                isActive
                  ? 'bg-sky-600 text-white border-sky-400 shadow-xs'
                  : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <span>{p.label}</span>
            </button>
          );
        })}
      </div>

      {/* Contextual Quick Actions Row */}
      <div className="p-2 bg-slate-950/40 border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0 text-[11px]">
        {contextType === 'roadmap' && (
          <>
            <button
              onClick={triggerGamifiedDuel}
              className="px-2.5 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 font-bold transition flex items-center gap-1 shrink-0"
            >
              <Zap size={11} /> <span>⚡ Instant Duel</span>
            </button>
            <button
              onClick={() => searchLiterature(roadmapContext?.topicTitle || 'React 19')}
              className="px-2.5 py-1 rounded-lg bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/30 text-sky-300 font-bold transition flex items-center gap-1 shrink-0"
            >
              <Search size={11} /> <span>📚 Curated RFCs</span>
            </button>
            <button
              onClick={() => sendMessage(`What is the most common memory leak or V8 deoptimization trap in ${roadmapContext?.topicTitle}?`)}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition shrink-0"
            >
              <span>⚠️ V8 Trap</span>
            </button>
          </>
        )}

        {contextType === 'project' && (
          <>
            <button
              onClick={suggestProjectExtensions}
              className="px-2.5 py-1 rounded-lg bg-indigo-500/15 hover:bg-indigo-500/25 border border-indigo-500/30 text-indigo-300 font-bold transition flex items-center gap-1 shrink-0"
            >
              <Sparkles size={11} /> <span>💡 Extensions</span>
            </button>
            <button
              onClick={auditProjectSyllabus}
              className="px-2.5 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 font-bold transition flex items-center gap-1 shrink-0"
            >
              <CheckCircle2 size={11} /> <span>📊 Syllabus Audit</span>
            </button>
            <button
              onClick={() => sendMessage(`Run a Staff-level interview defense challenge against my architecture for ${projectContext?.blueprint?.title}. Catch any hand-waving!`)}
              className="px-2.5 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 font-bold transition flex items-center gap-1 shrink-0"
            >
              <Compass size={11} /> <span>🎯 Mock Defense</span>
            </button>
          </>
        )}

        {contextType === 'sandbox' && (
          <>
            {sandboxContext?.error && (
              <button
                onClick={() => sendMessage(`Debug and fix this compiler error: ${sandboxContext.error}`)}
                className="px-2.5 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 font-bold transition flex items-center gap-1 shrink-0"
              >
                <Cpu size={11} /> <span>🛠️ Fix Compiler Error</span>
              </button>
            )}
            <button
              onClick={() => scaffoldSandboxTemplate('counter-advanced')}
              className="px-2.5 py-1 rounded-lg bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/30 text-sky-300 font-bold transition flex items-center gap-1 shrink-0"
            >
              <Code2 size={11} /> <span>🚀 Insert React 19 State</span>
            </button>
            <button
              onClick={() => scaffoldSandboxTemplate('virtual-list')}
              className="px-2.5 py-1 rounded-lg bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-purple-300 font-bold transition flex items-center gap-1 shrink-0"
            >
              <Layers size={11} /> <span>📦 Virtual List Scaffold</span>
            </button>
          </>
        )}
      </div>

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          const isTool = msg.role === 'tool';

          return (
            <div key={msg.id} className={`flex items-start gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}>
              {!isUser && (
                <div className="w-6 h-6 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center shrink-0 mt-0.5 text-indigo-400">
                  <Bot size={13} />
                </div>
              )}

              <div className={`max-w-[92%] p-3.5 rounded-2xl text-xs ${
                isUser
                  ? 'bg-sky-600 text-white rounded-tr-xs shadow-md'
                  : isTool
                  ? 'bg-slate-950 border border-indigo-500/30 rounded-tl-xs shadow-md w-full'
                  : 'bg-slate-800/95 border border-slate-700/80 rounded-tl-xs shadow-md'
              }`}>
                {/* Content */}
                {isUser ? (
                  <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                ) : (
                  <div className="space-y-3">
                    <FormattedMarkdown text={msg.content} />

                    {/* Interactive Gamified Duel Card */}
                    {msg.toolType === 'duel' && msg.toolData && (
                      <div className="mt-3 p-3.5 rounded-xl bg-slate-900 border border-amber-500/40 space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-amber-300 font-bold font-mono text-[11px]">{msg.toolData.duelTitle}</span>
                          <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                            {msg.toolData.badge}
                          </span>
                        </div>

                        {msg.toolData.questions?.map((q: any, qIdx: number) => {
                          const userSelected = selectedDuelAnswers[`${msg.id}-${qIdx}`];
                          const hasAnswered = userSelected !== undefined;
                          const isCorrect = userSelected === q.correctIndex;

                          return (
                            <div key={qIdx} className="space-y-2 pt-2 border-t border-slate-800">
                              <p className="font-medium text-slate-200">{qIdx + 1}. {q.question}</p>
                              <div className="space-y-1.5">
                                {q.options.map((opt: string, optIdx: number) => {
                                  const isOptionSelected = userSelected === optIdx;
                                  return (
                                    <button
                                      key={optIdx}
                                      disabled={hasAnswered}
                                      onClick={() => setSelectedDuelAnswers(prev => ({ ...prev, [`${msg.id}-${qIdx}`]: optIdx }))}
                                      className={`w-full text-left p-2 rounded-lg text-[11px] transition cursor-pointer border flex items-center justify-between gap-2 ${
                                        hasAnswered
                                          ? optIdx === q.correctIndex
                                            ? 'bg-emerald-950/80 text-emerald-200 border-emerald-500/60'
                                            : isOptionSelected
                                            ? 'bg-rose-950/80 text-rose-200 border-rose-500/60'
                                            : 'bg-slate-950 text-slate-400 border-slate-800 opacity-60'
                                          : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-sky-500/50 hover:bg-slate-800'
                                      }`}
                                    >
                                      <span>{opt}</span>
                                      {hasAnswered && optIdx === q.correctIndex && <CheckCircle2 size={12} className="text-emerald-400 shrink-0" />}
                                    </button>
                                  );
                                })}
                              </div>

                              {hasAnswered && (
                                <div className={`p-2 rounded-lg text-[11px] ${isCorrect ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/60' : 'bg-rose-950/60 text-rose-300 border border-rose-800/60'}`}>
                                  <p className="font-bold">{isCorrect ? '🎯 Correct!' : '❌ Invariant Violation'}</p>
                                  <p className="text-slate-300 mt-1">{q.explanation}</p>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Verified Literature Cards */}
                    {msg.toolType === 'literature' && Array.isArray(msg.toolData) && (
                      <div className="mt-3 space-y-2">
                        {msg.toolData.map((lit: LiteratureReference) => (
                          <div key={lit.id} className="p-3 rounded-xl bg-slate-950 border border-sky-500/30 space-y-1.5">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-bold text-sky-300 text-xs">{lit.title}</span>
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-sky-950 text-sky-400 border border-sky-800">
                                {lit.category}
                              </span>
                            </div>
                            <p className="text-slate-300 text-[11px] leading-relaxed">{lit.summary}</p>
                            <div className="pt-1 flex items-center justify-between gap-2 text-[10px]">
                              <span className="text-slate-500">{lit.authorOrOrg}</span>
                              <a
                                href={lit.url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-sky-400 hover:text-sky-300 flex items-center gap-1 font-bold"
                              >
                                <span>Read Spec</span>
                                <ExternalLink size={10} />
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2.5 text-slate-400 text-xs pl-1">
            <div className="w-6 h-6 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center shrink-0 text-indigo-400">
              <Sparkles size={13} className="animate-spin" />
            </div>
            <div className="flex items-center gap-1.5 bg-slate-800/90 border border-slate-700/60 px-3 py-2 rounded-xl text-[11px] text-indigo-300">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.4s]" />
              <span className="ml-1 text-slate-400 font-mono">Running Chain-of-Verification (CoVe)...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Tray */}
      <div className="p-3 bg-slate-950 border-t border-slate-800 shrink-0 flex items-end gap-2">
        <textarea
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Ask the ${activePersona} anything... (Enter to send, Shift+Enter for newline)`}
          rows={2}
          className="flex-1 bg-slate-900 border border-slate-700/70 text-slate-100 text-xs rounded-xl px-3.5 py-2.5 outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500/50 resize-none max-h-28 transition placeholder:text-slate-500 custom-scrollbar"
        />
        <button
          onClick={handleSend}
          disabled={!inputVal.trim() || isTyping}
          className="p-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-40 text-white transition cursor-pointer shadow-md shrink-0 mb-0.5"
        >
          <Send size={15} />
        </button>
      </div>
    </div>
  );
}
