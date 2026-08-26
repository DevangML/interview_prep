import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  X,
  Send,
  ExternalLink,
  Terminal,
  Layers,
  Zap,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  ArrowRight,
  Code,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import type { LearnTopic } from '../../../data/learn';
import { useDrawAiAgent } from '../../../hooks/useDrawAiAgent';
import { FormattedMarkdown } from '../../socratic/FormattedMarkdown';
import { NeuralBotAvatar } from '../../socratic/NeuralBotAvatar';
import { CognitiveThinkingSequence } from '../../socratic/CognitiveThinkingSequence';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  topic: LearnTopic;
  xmlData: string;
  onApplyXml: (newXml: string) => void;
  chatWithMentor?: (params: any) => Promise<string | null>;
  isAiReady?: boolean;
}

const DRAW_SLASH_SKILLS = [
  { cmd: '/audit', label: 'Deep Diagram Audit', desc: 'Scan nodes & edges against topic invariants', icon: '📊' },
  { cmd: '/concurrency', label: 'Missing Concurrency', desc: 'Detect race conditions & double-buffering', icon: '⚡' },
  { cmd: '/staff', label: 'Staff-Level Invariants', desc: 'FAANG Principal interview defense checks', icon: '🎯' },
  { cmd: '/innovate', label: 'Disruption Oracle', desc: 'Victor persona architectural reframe', icon: '🔮' },
  { cmd: '/ux', label: 'Interaction Boundaries', desc: 'Component boundaries & accessibility tree', icon: '🎨' },
];

export default function DrawAiAgentModal({
  isOpen,
  onClose,
  topic,
  xmlData,
  onApplyXml,
  chatWithMentor,
  isAiReady
}: Props) {
  const {
    messages,
    isAnalyzing,
    auditResult,
    auditDiagram,
    askDrawAi
  } = useDrawAiAgent({
    topic,
    xmlData,
    onApplyXml,
    chatWithMentor,
    isAiReady
  });

  const [inputVal, setInputVal] = useState('');
  const [slashOpen, setSlashOpen] = useState(false);
  const [skillsMenuOpen, setSkillsMenuOpen] = useState(false);
  const [slashIdx, setSlashIdx] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasAutoAudited = useRef(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAnalyzing]);

  // Auto-audit on modal open with realistic pacing
  useEffect(() => {
    if (isOpen && !hasAutoAudited.current) {
      hasAutoAudited.current = true;
      const t = setTimeout(() => {
        auditDiagram();
      }, 400);
      return () => clearTimeout(t);
    }
  }, [isOpen, auditDiagram]);

  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsClosing(false);
    } else if (shouldRender) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
        setIsClosing(false);
      }, 240);
      return () => clearTimeout(timer);
    }
  }, [isOpen, shouldRender]);

  const handleClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 220);
  };

  if (!shouldRender) return null;

  const matchingSkills = DRAW_SLASH_SKILLS.filter(s => {
    if (!inputVal.startsWith('/')) return true;
    const q = inputVal.slice(1).toLowerCase();
    return s.cmd.includes(q) || s.label.toLowerCase().includes(q);
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setInputVal(val);
    if (val.startsWith('/') && !val.includes(' ')) {
      setSlashOpen(true);
      setSlashIdx(0);
    } else {
      setSlashOpen(false);
    }
  };

  const executeSkill = (cmd: string) => {
    setSlashOpen(false);
    setSkillsMenuOpen(false);
    setInputVal('');
    if (cmd === '/audit') auditDiagram();
    else if (cmd === '/concurrency') askDrawAi(`What concurrency, double-buffering, or race condition flows are missing from my ${topic.title} diagram?`);
    else if (cmd === '/staff') askDrawAi(`How can I elevate this diagram to Staff/Principal Engineer interview standards?`);
    else if (cmd === '/innovate') askDrawAi(`Run a Disruptive Innovation Oracle review on this ${topic.title} architecture diagram.`);
    else if (cmd === '/ux') askDrawAi(`Analyze the component interaction and accessibility boundaries in this diagram.`);
    else askDrawAi(cmd);
  };

  const handleSend = () => {
    if (!inputVal.trim() || isAnalyzing) return;
    const text = inputVal.trim();
    setInputVal('');
    setSlashOpen(false);
    if (text.startsWith('/')) {
      executeSkill(text);
    } else {
      askDrawAi(text);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (slashOpen && matchingSkills.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSlashIdx(prev => (prev + 1) % matchingSkills.length);
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSlashIdx(prev => (prev - 1 + matchingSkills.length) % matchingSkills.length);
        return;
      }
      if (e.key === 'Enter' || e.key === 'Tab') {
        e.preventDefault();
        executeSkill(matchingSkills[slashIdx].cmd);
        return;
      }
      if (e.key === 'Escape') {
        setSlashOpen(false);
        return;
      }
    }

    if (e.key === 'Escape') {
      handleClose();
      return;
    }

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handlePopOutWindow = () => {
    const popout = window.open('', '_blank', 'width=840,height=800,resizable=yes,scrollbars=yes');
    if (popout) {
      popout.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Draw AI Agent — ${topic.title}</title>
            <script src="https://cdn.tailwindcss.com"></script>
          </head>
          <body class="bg-slate-950 text-slate-100 p-6 font-sans">
            <div class="max-w-3xl mx-auto space-y-4">
              <header class="border-b border-slate-800 pb-3">
                <span class="text-xs font-mono uppercase text-sky-400 font-bold">Draw AI Agent Workspace</span>
                <h1 class="text-xl font-bold text-white">${topic.title}</h1>
                <p class="text-xs text-slate-400">${topic.area} · ${topic.group}</p>
              </header>
              <div class="p-4 bg-slate-900 border border-slate-800 rounded-xl text-xs space-y-2">
                <h2 class="font-bold text-amber-400 font-mono uppercase tracking-wider">Lesson Invariants Required:</h2>
                <ul class="list-disc pl-5 space-y-1 text-slate-300">
                  ${topic.keyPoints.map(k => `<li>${k}</li>`).join('')}
                </ul>
              </div>
              <div class="p-4 bg-sky-950/40 border border-sky-800/60 rounded-xl text-xs space-y-2">
                <h2 class="font-bold text-sky-400 font-mono uppercase tracking-wider">FAANG Defense Scenario:</h2>
                <p class="text-slate-300">${topic.interview}</p>
              </div>
            </div>
          </body>
        </html>
      `);
    }
  };

  return (
    <div
      onClick={handleClose}
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-2xl cursor-pointer ${
        isClosing ? 'animate-ai-backdrop-out' : 'animate-ai-backdrop-in'
      }`}
    >
      <div
        onClick={e => e.stopPropagation()}
        className={`flex flex-col w-full max-w-4xl h-[90vh] bg-slate-950/98 border border-sky-500/30 ring-1 ring-white/10 rounded-[28px] shadow-[0_0_60px_rgba(2,132,199,0.25),0_25px_50px_-12px_rgba(0,0,0,0.8)] overflow-hidden font-sans cursor-default ${
          isClosing ? 'animate-ai-zoom-out' : 'animate-ai-zoom-in'
        }`}
      >
        {/* Animated Iridescent Shimmer Line */}
        <div className="h-1 w-full ai-shimmer-rainbow shrink-0" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800/80 flex-wrap gap-3 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <NeuralBotAvatar
              state={isAnalyzing ? 'thinking' : 'idle'}
              size="md"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap min-w-0">
                <h2 className="text-sm font-bold text-white tracking-tight truncate">Draw AI Architect</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-sky-950 text-sky-300 border border-sky-800 truncate">
                  {topic.title}
                </span>
                {auditResult && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800 shrink-0">
                    Accuracy: {auditResult.accuracyScore}%
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400 truncate mt-0.5">Architectural Diagram Reviewer & Perfection Engine</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => setSkillsMenuOpen(prev => !prev)}
              className={`p-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1 transition cursor-pointer border ${
                skillsMenuOpen
                  ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border-slate-800'
              }`}
              title="Toggle Skills"
            >
              <Terminal size={13} />
              <span className="hidden sm:inline">Skills</span>
              {skillsMenuOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>
            <button
              onClick={handlePopOutWindow}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1 transition cursor-pointer"
              title="Pop out in dedicated window"
            >
              <ExternalLink size={13} />
              <span className="hidden sm:inline">Pop Out</span>
            </button>
            <button
              onClick={handleClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Expandable Wrap-Safe Skills Grid */}
        {skillsMenuOpen && (
          <div className="p-3 bg-slate-950/95 border-b border-slate-800 shrink-0 animate-in fade-in-50 duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {DRAW_SLASH_SKILLS.map((s) => (
                <button
                  key={s.cmd}
                  onClick={() => executeSkill(s.cmd)}
                  disabled={isAnalyzing}
                  className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-sky-500/40 text-left transition cursor-pointer flex items-start gap-2.5 min-w-0"
                >
                  <span className="text-base shrink-0 mt-0.5">{s.icon}</span>
                  <div className="min-w-0 flex-1">
                    <span className="font-mono text-xs font-bold text-sky-300 block truncate">{s.cmd} — {s.label}</span>
                    <span className="text-[11px] text-slate-400 leading-tight block line-clamp-1 mt-0.5">{s.desc}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat & Analysis Feed */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 custom-scrollbar min-w-0">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex flex-col min-w-0 ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-in fade-in-50 duration-200`}
            >
              <div
                className={`max-w-[92%] rounded-2xl p-3.5 sm:p-4 text-xs leading-relaxed min-w-0 break-words overflow-hidden ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-md'
                    : 'bg-slate-950 border border-slate-800 text-slate-200 shadow-sm'
                }`}
              >
                <FormattedMarkdown text={msg.content} />

                {/* Audit Result Display */}
                {msg.auditResult && (
                  <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-3 min-w-0">
                    <div className="grid grid-cols-2 gap-2 text-center text-xs">
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                        <span className="text-[10px] text-slate-400 block font-mono">Missing Nodes</span>
                        <span className="font-bold text-rose-400 text-sm">
                          {msg.auditResult.missingElements.length}
                        </span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                        <span className="text-[10px] text-slate-400 block font-mono">Accuracy Score</span>
                        <span className="font-bold text-sky-400 text-sm">
                          {msg.auditResult.accuracyScore}%
                        </span>
                      </div>
                    </div>

                    {msg.auditResult.suggestedFixes.length > 0 && (
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5 font-mono">
                          <Lightbulb size={13} />
                          <span>Suggested Diagram Invariant Fixes:</span>
                        </span>
                        <div className="space-y-1.5">
                          {msg.auditResult.suggestedFixes.map((fix: string, i: number) => (
                            <div key={i} className="p-2.5 rounded-lg bg-amber-950/20 border border-amber-500/30 text-[11px] text-amber-200 flex items-start gap-2 min-w-0 break-words">
                              <span className="text-amber-400 font-bold select-none mt-0.5 shrink-0">▪</span>
                              <span className="flex-1 break-words">{fix}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Cognitive Thinking Stream */}
          {isAnalyzing && (
            <div className="flex items-start gap-2.5 min-w-0">
              <NeuralBotAvatar state="thinking" size="sm" className="mt-1 shrink-0" />
              <CognitiveThinkingSequence
                contextName={topic.title}
                commandName="Diagram Invariant Synthesis"
              />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Floating Slash Autocomplete */}
        {slashOpen && (
          <div className="p-2 border-t border-slate-800 bg-slate-950/95 animate-in slide-in-from-bottom-2 duration-150 shrink-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {matchingSkills.map((s, idx) => (
                <button
                  key={s.cmd}
                  onClick={() => executeSkill(s.cmd)}
                  className={`p-2 rounded-xl text-left transition cursor-pointer border flex items-start gap-2 min-w-0 ${
                    slashIdx === idx
                      ? 'bg-sky-950/90 border-sky-500/60 ring-1 ring-sky-500/40 text-white'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span className="text-base shrink-0">{s.icon}</span>
                  <div className="min-w-0 flex-1">
                    <span className="font-mono text-xs font-bold text-sky-300 block truncate">{s.cmd}</span>
                    <span className="text-[10px] text-slate-400 truncate block">{s.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Bar */}
        <div className="p-3.5 bg-slate-950 border-t border-slate-800 shrink-0 space-y-2">
          <div className="relative flex items-end gap-2 bg-slate-900/90 rounded-2xl border border-slate-800 focus-within:border-sky-500/60 focus-within:ring-1 focus-within:ring-sky-500/40 p-2 transition">
            <textarea
              value={inputVal}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask Draw AI Agent or type '/' for skills..."
              className="flex-1 bg-transparent border-none text-xs text-slate-100 placeholder-slate-500 focus:outline-none resize-none max-h-24 min-h-[36px] custom-scrollbar leading-relaxed"
              rows={1}
            />
            <button
              onClick={handleSend}
              disabled={!inputVal.trim() || isAnalyzing}
              className="p-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 disabled:opacity-30 text-white transition cursor-pointer shrink-0 shadow-md"
              title="Send Message"
            >
              <Send size={13} />
            </button>
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 px-1">
            <span>Type <code className="text-sky-400">/</code> for diagram skills</span>
            <span>↵ Send · ⇧↵ New line</span>
          </div>
        </div>
      </div>
    </div>
  );
}
