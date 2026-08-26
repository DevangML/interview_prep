import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface Props {
  text: string;
}

export function FormattedMarkdown({ text }: Props) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyCode = (codeText: string, idx: number) => {
    navigator.clipboard.writeText(codeText);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const parts = text.split(/(```[\s\S]*?```)/g);

  return (
    <div className="space-y-2 text-xs leading-relaxed text-slate-200">
      {parts.map((part, idx) => {
        if (part.startsWith('```') && part.endsWith('```')) {
          const firstLineEnd = part.indexOf('\n');
          const lang = firstLineEnd !== -1 ? part.slice(3, firstLineEnd).trim() : '';
          const codeContent = firstLineEnd !== -1 ? part.slice(firstLineEnd + 1, -3) : part.slice(3, -3);
          const isCopied = copiedIndex === idx;

          return (
            <div key={idx} className="my-2 rounded-lg overflow-hidden border border-slate-700/80 bg-slate-950 font-mono text-[11px]">
              <div className="flex items-center justify-between px-3 py-1 bg-slate-900 border-b border-slate-800 text-[10px] text-slate-400">
                <span>{lang || 'code'}</span>
                <button
                  onClick={() => copyCode(codeContent, idx)}
                  className="flex items-center gap-1 hover:text-slate-200 cursor-pointer transition-colors"
                >
                  {isCopied ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                  <span>{isCopied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="p-3 overflow-x-auto text-sky-200 whitespace-pre-wrap">{codeContent}</pre>
            </div>
          );
        }

        const lines = part.split('\n');
        return (
          <div key={idx} className="space-y-1">
            {lines.map((line, lIdx) => {
              if (line.startsWith('### ')) return <h4 key={lIdx} className="font-bold text-sky-400 text-xs mt-2 mb-1">{line.slice(4)}</h4>;
              if (line.startsWith('## ')) return <h3 key={lIdx} className="font-extrabold text-white text-xs mt-2 mb-1">{line.slice(3)}</h3>;
              if (line.startsWith('# ')) return <h2 key={lIdx} className="font-extrabold text-white text-sm mt-2 mb-1">{line.slice(2)}</h2>;
              if (!line.trim()) return <div key={lIdx} className="h-1" />;

              const formattedLine = line
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 rounded bg-slate-800 text-sky-300 font-mono text-[10px]">$1</code>');

              return <p key={lIdx} className="text-slate-300" dangerouslySetInnerHTML={{ __html: formattedLine }} />;
            })}
          </div>
        );
      })}
    </div>
  );
}
