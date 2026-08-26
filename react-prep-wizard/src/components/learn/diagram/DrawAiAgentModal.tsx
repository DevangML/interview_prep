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
  Code
} from 'lucide-react';
import type { LearnTopic } from '../../../data/learn';
import { useDrawAiAgent } from '../../../hooks/useDrawAiAgent';
import { FormattedMarkdown } from '../../socratic/FormattedMarkdown';

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
  const [slashIdx, setSlashIdx] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasAutoAudited = useRef(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAnalyzing]);

  // Auto-audit on modal open
  useEffect(() => {
    if (isOpen && !hasAutoAudited.current) {
      hasAutoAudited.current = true;
      auditDiagram();
    }
  }, [isOpen, auditDiagram]);

  if (!isOpen) return null;

  const matchingSkills = DRAW_SLASH_SKILLS.filter(s => {
    if (!inputVal.startsWith('/')) return false;
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="flex flex-col w-full max-w-4xl h-[88vh] bg-slate-900/98 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden font-sans">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white shadow-lg">
              <Sparkles size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-white tracking-tight">Draw AI Agent</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-sky-950 text-sky-300 border border-sky-800">
                  {topic.title}
                </span>
                {auditResult && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800">
                    Accuracy: {auditResult.accuracyScore}%
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400">Architectural Diagram Reviewer & Perfection Engine</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePopOutWindow}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1 transition cursor-pointer"
              title="Pop out in dedicated window"
            >
              <ExternalLink size={13} />
              <span>Pop Out</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Quick Slash Skills Bar */}
        <div className="px-4 py-2 bg-slate-950/70 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0 text-xs">
          <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider pr-1">
            <Terminal size={11} className="text-sky-400" />
            <span>Skills:</span>
          </div>
          {DRAW_SLASH_SKILLS.map((s) => (
            <button
              key={s.cmd}
              onClick={() => executeSkill(s.cmd)}
              disabled={isAnalyzing}
              className="shrink-0 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-sky-500/40 text-slate-300 hover:text-sky-300 font-mono text-[11px] flex items-center gap-1.5 transition cursor-pointer disabled:opacity-50"
            >
              <span>{s.icon}</span>
              <span className="font-bold">{s.cmd}</span>
            </button>
          ))}
        </div>

        {/* Chat & Analysis Feed */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[90%] rounded-2xl p-4 text-xs leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-md'
                    : 'bg-slate-950 border border-slate-800 text-slate-200 shadow-sm'
                }`}
              >
                <FormattedMarkdown text={msg.content} />
              </div>
            </div>
          ))}

          {isAnalyzing && (
            <div className="flex items-center gap-2 text-xs text-sky-400 bg-slate-950 p-3 rounded-2xl border border-sky-500/20 max-w-sm">
              <div className="w-3.5 h-3.5 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
              <span>Draw AI Agent auditing diagram against lesson invariants...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar with Slash Menu */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 relative">
          {slashOpen && matchingSkills.length > 0 && (
            <div className="absolute bottom-full left-4 right-4 mb-2 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-1.5 max-h-56 overflow-y-auto custom-scrollbar z-50">
              <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold border-b border-slate-800 mb-1">
                Select Diagram Skill (Tab/Enter)
              </div>
              {matchingSkills.map((s, idx) => (
                <button
                  key={s.cmd}
                  onClick={() => executeSkill(s.cmd)}
                  className={`w-full px-3 py-2 rounded-xl text-left flex items-center justify-between gap-2 transition cursor-pointer ${
                    idx === slashIdx ? 'bg-sky-600 text-white' : 'hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-sm">{s.icon}</span>
                    <div>
                      <span className="font-mono font-bold text-xs block">{s.cmd}</span>
                      <span className={`text-[11px] truncate block ${idx === slashIdx ? 'text-sky-100' : 'text-slate-400'}`}>
                        {s.desc}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono opacity-70 uppercase">{s.label}</span>
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2 bg-slate-900 rounded-2xl p-1.5 border border-slate-800 focus-within:border-sky-500/60 transition shadow-inner">
            <textarea
              value={inputVal}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Type / to invoke diagram skills (/audit, /concurrency, /staff, /innovate, /ux)..."
              rows={1}
              className="flex-1 bg-transparent px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none resize-none"
            />
            <button
              onClick={handleSend}
              disabled={!inputVal.trim() || isAnalyzing}
              className="p-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 disabled:opacity-40 text-white transition cursor-pointer shrink-0 shadow-md"
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
