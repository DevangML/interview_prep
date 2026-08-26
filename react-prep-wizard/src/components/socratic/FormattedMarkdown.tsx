import React, { useState } from 'react';
import { Copy, Check, Lightbulb, AlertTriangle, Info } from 'lucide-react';

interface Props {
  text: string;
  className?: string;
}

export function FormattedMarkdown({ text, className = '' }: Props) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyCode = (codeText: string, idx: number) => {
    navigator.clipboard.writeText(codeText);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const parts = text.split(/(```[\s\S]*?```)/g);

  const formatInline = (raw: string): string => {
    return raw
      .replace(/\*\*\*(.*?)\*\*\*/g, '<strong class="text-amber-300 font-extrabold">$1</strong>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="text-sky-300 italic">$1</em>')
      .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded-md bg-slate-950 border border-slate-700/80 text-sky-300 font-mono text-[11px]">$1</code>');
  };

  return (
    <div className={`space-y-3 leading-relaxed text-slate-300 text-xs sm:text-[13px] ${className}`}>
      {parts.map((part, idx) => {
        if (part.startsWith('```') && part.endsWith('```')) {
          const firstLineEnd = part.indexOf('\n');
          const lang = firstLineEnd !== -1 ? part.slice(3, firstLineEnd).trim() : '';
          const codeContent = firstLineEnd !== -1 ? part.slice(firstLineEnd + 1, -3) : part.slice(3, -3);
          const isCopied = copiedIndex === idx;

          return (
            <div key={idx} className="my-3 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 font-mono text-xs shadow-md">
              <div className="flex items-center justify-between px-3.5 py-1.5 bg-slate-900 border-b border-slate-800 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                <span className="text-sky-400">{lang || 'code'}</span>
                <button
                  onClick={() => copyCode(codeContent, idx)}
                  className="flex items-center gap-1.5 hover:text-slate-200 cursor-pointer transition text-slate-400"
                >
                  {isCopied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  <span>{isCopied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="p-4 overflow-x-auto text-sky-200 leading-relaxed custom-scrollbar font-mono text-xs whitespace-pre-wrap">{codeContent}</pre>
            </div>
          );
        }

        const lines = part.split('\n');
        return (
          <div key={idx} className="space-y-2">
            {lines.map((line, lIdx) => {
              const trimmed = line.trim();
              if (!trimmed) return null;

              if (trimmed.startsWith('# ')) {
                return <h2 key={lIdx} className="text-xl sm:text-2xl font-black text-white mt-4 mb-2 tracking-tight">{trimmed.slice(2)}</h2>;
              }
              if (trimmed.startsWith('## ')) {
                return <h3 key={lIdx} className="text-base sm:text-lg font-extrabold text-sky-300 mt-3 mb-1.5 tracking-tight">{trimmed.slice(3)}</h3>;
              }
              if (trimmed.startsWith('### ')) {
                return <h4 key={lIdx} className="text-sm font-bold text-amber-300 mt-2.5 mb-1">{trimmed.slice(4)}</h4>;
              }
              if (trimmed.startsWith('> ')) {
                return (
                  <div key={lIdx} className="p-3 my-2 rounded-xl bg-sky-950/30 border-l-4 border-sky-500 text-sky-200 text-xs flex items-start gap-2">
                    <Info size={14} className="text-sky-400 mt-0.5 shrink-0" />
                    <div dangerouslySetInnerHTML={{ __html: formatInline(trimmed.slice(2)) }} />
                  </div>
                );
              }
              if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
                return (
                  <div key={lIdx} className="flex items-start gap-2 pl-2">
                    <span className="text-sky-400 font-bold select-none text-xs mt-0.5">▪</span>
                    <span className="flex-1" dangerouslySetInnerHTML={{ __html: formatInline(trimmed.slice(2)) }} />
                  </div>
                );
              }

              return (
                <p key={lIdx} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInline(line) }} />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
