import { Link } from 'react-router';
import { GitFork, Lock, Zap, ArrowUpRight, Flame } from 'lucide-react';
import { TOPIC_BY_ID } from '../../data/learn';

interface Props {
  prerequisites?: string[];
  unlocks?: string[];
  relatedUnitId?: string;
  onSelectTopic: (topicId: string) => void;
}

export function TopicConnectionsCard({ prerequisites, unlocks, relatedUnitId, onSelectTopic }: Props) {
  const hasConnections = (prerequisites && prerequisites.length > 0) || (unlocks && unlocks.length > 0) || relatedUnitId;

  if (!hasConnections) return null;

  return (
    <div className="rounded-xl border border-sky-500/20 bg-sky-950/20 p-4 space-y-3.5 text-xs text-slate-200">
      <div className="flex items-center justify-between border-b border-sky-500/20 pb-2">
        <div className="flex items-center gap-1.5 font-bold text-sky-400">
          <GitFork size={15} />
          <span>Knowledge Constellation Connections</span>
        </div>
        {relatedUnitId && (
          <Link
            to={`/?unit=${encodeURIComponent(relatedUnitId)}`}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[10px] shadow-xs transition"
          >
            <Flame size={11} className="fill-slate-950" />
            <span>Jump to Code Crucible Drill</span>
            <ArrowUpRight size={11} />
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
        {prerequisites && prerequisites.length > 0 && (
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <Lock size={11} className="text-amber-400" />
              Prerequisite Foundations
            </span>
            <div className="flex flex-wrap gap-1.5">
              {prerequisites.map((pId) => {
                const target = TOPIC_BY_ID.get(pId);
                return (
                  <button
                    key={pId}
                    onClick={() => onSelectTopic(pId)}
                    className="px-2 py-1 rounded-md bg-slate-900 hover:bg-slate-800 border border-slate-700 text-[11px] text-sky-300 font-medium transition cursor-pointer text-left truncate max-w-full"
                  >
                    ← {target ? target.title : pId}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {unlocks && unlocks.length > 0 && (
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <Zap size={11} className="text-emerald-400" />
              Powers & Downstream Unlocks
            </span>
            <div className="flex flex-wrap gap-1.5">
              {unlocks.map((uId) => {
                const target = TOPIC_BY_ID.get(uId);
                return (
                  <button
                    key={uId}
                    onClick={() => onSelectTopic(uId)}
                    className="px-2 py-1 rounded-md bg-slate-900 hover:bg-slate-800 border border-slate-700 text-[11px] text-emerald-300 font-medium transition cursor-pointer text-left truncate max-w-full"
                  >
                    → {target ? target.title : uId}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
