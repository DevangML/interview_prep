import type { Challenge } from '../../types';

function esc(s: string) { return s; }

function getDifficulty(id: string) {
  if (id.startsWith('BOX-') || id.startsWith('PLC-') || id.startsWith('FLEX-01') || id.startsWith('FLEX-02'))
    return { name: 'Easy', cls: 'bg-green-100 text-green-700' };
  if (id.startsWith('TRK-') || id.startsWith('CQ-') || id.startsWith('MIX-') || id.startsWith('AREA-') || id.startsWith('XTRA-'))
    return { name: 'Hard', cls: 'bg-red-100 text-red-700' };
  return { name: 'Medium', cls: 'bg-amber-100 text-amber-700' };
}

interface Props {
  challenge: Challenge;
  specResults?: { prop: string; pass: boolean }[];
}

export default function ChallengeBrief({ challenge: c, specResults }: Props) {
  const diff = getDifficulty(c.id);

  return (
    <div className="p-4 overflow-auto text-sm">
      {/* Header */}
      <div className="mb-3 pb-2 border-b border-gray-200">
        <h2 className="text-base font-bold mb-1">
          <span className="text-xs font-mono text-slate-400 mr-1">{c.id}</span>
          {c.title}
        </h2>
        <div className="flex gap-1.5 flex-wrap">
          <span className={`text-[0.62rem] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full ${diff.cls}`}>
            {diff.name}
          </span>
          <span className="text-[0.62rem] font-semibold font-mono bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
            {c.cat.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Task */}
      <p className="text-gray-600 mb-3 leading-relaxed">{esc(c.task)}</p>

      {/* Goal */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-3">
        <h4 className="text-[0.66rem] font-bold tracking-wider uppercase text-gray-500 mb-1">
          Target Objective
        </h4>
        <p className="text-gray-800 text-[0.82rem]">{esc(c.goal)}</p>
        {c.verify && (
          <p className="mt-2 text-[0.82rem] bg-blue-50 border-l-2 border-sky-600 pl-2 py-1 rounded-r">
            <strong>How to check:</strong> {esc(c.verify)}
          </p>
        )}
      </div>

      {/* Constraints */}
      <h4 className="text-[0.66rem] font-bold tracking-wider uppercase text-gray-500 mb-1.5">
        Constraints & Required Properties
      </h4>
      <ul className="space-y-1 mb-3">
        {c.use.map(([prop, desc], i) => (
          <li key={i} className="grid grid-cols-[auto_1fr] gap-2 items-baseline bg-gray-50 border border-gray-100 px-2 py-1.5 rounded text-[0.82rem]">
            <code className="font-bold font-mono text-sky-800">{prop}</code>
            <span className="text-gray-600">{desc}</span>
          </li>
        ))}
      </ul>

      {/* Spec checks */}
      {specResults && specResults.length > 0 && (
        <div className="mb-3">
          <h4 className="text-[0.66rem] font-bold tracking-wider uppercase text-gray-500 mb-1">
            Automated Test Cases
          </h4>
          <ul className="space-y-0.5">
            {specResults.map((r, i) => (
              <li key={i} className={`text-xs font-mono px-2 py-1 rounded ${r.pass ? 'text-emerald-700 bg-emerald-50' : 'text-gray-500 bg-gray-50'}`}>
                {r.pass ? '✓' : '○'} <code>{r.prop}</code> {r.pass ? 'matched' : 'needed'}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Hints */}
      <HintSection hints={c.hints} sol={c.sol} markup={c.markup || ''} />
    </div>
  );
}

function HintSection({ hints, sol, markup }: { hints: string[]; sol: string; markup: string }) {
  return (
    <div className="mt-4">
      <h4 className="text-[0.66rem] font-bold tracking-wider uppercase text-gray-500 mb-1.5">
        Hints & Reference Solution
      </h4>
      {hints.map((h, i) => (
        <details key={i} className="mb-1 border border-gray-200 rounded-lg overflow-hidden">
          <summary className="px-3 py-1.5 bg-white text-xs font-semibold cursor-pointer hover:bg-gray-50 text-sky-700">
            Hint {i + 1}
          </summary>
          <p className="px-3 py-2 text-xs text-gray-700 bg-gray-50 border-t border-gray-200">
            {h}
          </p>
        </details>
      ))}
      <details className="mt-1 border border-gray-200 rounded-lg overflow-hidden">
        <summary className="px-3 py-1.5 bg-white text-xs font-semibold cursor-pointer hover:bg-gray-50">
          Show Reference Solution
        </summary>
        <pre className="px-3 py-2 text-xs bg-slate-900 text-slate-200 font-mono leading-relaxed whitespace-pre-wrap overflow-x-auto border-t border-gray-200">
          {`component.jsx\n\n${markup.replace(/^\s{4}/gm, '')}\n\nstyles.css\n\n${sol}`}
        </pre>
      </details>
    </div>
  );
}
