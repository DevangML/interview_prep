import { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { ALL_TOPICS } from '../../data/learn/extended/trackRegistry';
import { buildClusters } from '../../data/projects/graph';
import { PROJECT_BY_ID } from '../../data/projects';
import { COVERAGE_BY_PROJECT } from '../../data/projects/coverage';
import type { ConceptEdge, EdgeKind } from '../../data/projects/coverage';
import { layoutRadial } from '../../lib/conceptGraphLayout';
import ConceptGraphCanvas from './ConceptGraphCanvas';
import GraphLegend from './GraphLegend';
import GraphDetail from './GraphDetail';

interface Props {
  projectId: string;
  projectTitle: string;
  tier: string;
  onOpenTopic?: (id: string) => void;
}

const SIZE = 760;

/** "Stages 1-3" and "Stage 2 — card" both point at a real, buildable thing. */
function resolveAnchor(map: Map<string, { id: string; title: string; spec: string }>, where?: string) {
  if (!where) return undefined;
  const base = where.split(' — ')[0].trim();
  return map.get(base) ?? map.get(base.replace(/^Stages (\d+).*/, 'Stage $1'));
}
const ALL_KINDS = ['explicit', 'implicit', 'counterexample', 'exempt'];

/**
 * Every concept in the curriculum, clustered by area, with an edge to this
 * project wherever it is used and a stated reason wherever it is not. There is
 * no third state: the build fails if a concept would be missing from here.
 */
export default function ProjectConceptGraph({ projectId, projectTitle, tier, onOpenTopic }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [visible, setVisible] = useState<Set<string>>(new Set(ALL_KINDS));

  const clusters = useMemo(() => buildClusters(), []);
  const layout = useMemo(() => layoutRadial(clusters, SIZE), [clusters]);
  const topics = useMemo(() => new Map(ALL_TOPICS.map((t) => [t.id, t])), []);
  const titles = useMemo(() => new Map(ALL_TOPICS.map((t) => [t.id, t.title])), []);

  /** Anchors resolve to a deliverable or to a stage — both are things you build. */
  const anchors = useMemo(() => {
    const p = PROJECT_BY_ID.get(projectId);
    const map = new Map((p?.deliverables ?? []).map((d) => [d.id, d]));
    for (const st of p?.stages ?? []) {
      map.set(`Stage ${st.stageNumber}`, {
        id: `Stage ${st.stageNumber}`,
        title: st.stageName,
        spec: st.focus,
      });
    }
    return map;
  }, [projectId]);

  const { edges, exemptions, counts } = useMemo(() => {
    const cov = COVERAGE_BY_PROJECT.get(projectId);
    const edges = new Map<string, ConceptEdge>((cov?.edges ?? []).map((e) => [e.conceptId, e]));
    const exemptions = new Map<string, { reason: string }>();
    for (const x of cov?.exemptions ?? []) for (const id of x.conceptIds) exemptions.set(id, { reason: x.reason });
    const counts = { explicit: 0, implicit: 0, counterexample: 0, exempt: exemptions.size } as Record<EdgeKind, number> & { exempt: number };
    for (const e of edges.values()) counts[e.kind]++;
    return { edges, exemptions, counts };
  }, [projectId]);

  const matched = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    return new Set(
      ALL_TOPICS.filter((t) =>
        `${t.title} ${t.area} ${t.group}`.toLowerCase().includes(q) ||
        (edges.get(t.id)?.why ?? '').toLowerCase().includes(q) ||
        (edges.get(t.id)?.where ?? '').toLowerCase().includes(q),
      ).map((t) => t.id),
    );
  }, [query, edges]);

  const toggle = (kind: string) =>
    setVisible((prev) => {
      const next = new Set(prev);
      if (next.has(kind)) next.delete(kind); else next.add(kind);
      return next;
    });

  const topic = selected ? topics.get(selected) : undefined;
  const used = edges.size;

  return (
    /* Two independent scroll regions on wide screens, one on narrow. The graph
       box never grows past its column, so it cannot push the page sideways. */
    /* Two independent scroll regions on wide screens, one on narrow. Explicit
       row sizing so the graph column has a height to fill rather than deriving
       one from its own contents. */
    <div className="h-full min-h-0 overflow-y-auto xl:overflow-hidden custom-scrollbar
                    grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_16rem]
                    grid-rows-[minmax(22rem,auto)_auto] xl:grid-rows-1 gap-3">
      <div className="min-w-0 min-h-0 rounded-xl border border-slate-800 bg-slate-950/60 p-1
                      grid place-items-center overflow-auto custom-scrollbar">
        <ConceptGraphCanvas
          layout={layout}
          edges={edges}
          exemptions={exemptions}
          titles={titles}
          visible={visible}
          matched={matched}
          selected={selected}
          projectLabel={projectTitle}
          onSelect={setSelected}
        />
      </div>

      <div className="min-w-0 min-h-0 space-y-2.5 xl:overflow-y-auto custom-scrollbar xl:pr-0.5">
        <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3 space-y-2">
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Concept coverage</span>
            <span className="text-sm font-black text-white font-mono">{used}<span className="text-slate-500 text-xs">/{ALL_TOPICS.length}</span></span>
          </div>
          <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden flex">
            <span className="h-full bg-sky-400" style={{ width: `${(counts.explicit / ALL_TOPICS.length) * 100}%` }} />
            <span className="h-full bg-emerald-400" style={{ width: `${(counts.implicit / ALL_TOPICS.length) * 100}%` }} />
            <span className="h-full bg-amber-400" style={{ width: `${(counts.counterexample / ALL_TOPICS.length) * 100}%` }} />
          </div>
          <p className="text-[10px] leading-snug text-slate-400">
            {counts.exempt === 0
              ? 'No exemptions — every concept in the curriculum is claimed by this build.'
              : `${counts.exempt} concepts are out of scope for this build, each with a stated reason.`}
          </p>
        </div>

        <div className="relative">
          <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none z-10" />
          <input
            value={query}
            onChange={(ev) => setQuery(ev.target.value)}
            placeholder="Search concepts and reasons..."
            className="w-full pl-7.5 pr-7 py-1.5 text-[11px] rounded-lg border border-slate-800 bg-slate-900 text-slate-200 placeholder-slate-500 outline-none focus:border-sky-500"
            style={{ paddingLeft: '1.85rem' }}
          />
          {query && (
            <button onClick={() => setQuery('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200">
              <X size={11} />
            </button>
          )}
        </div>

        <GraphLegend counts={counts} active={visible} onToggle={toggle} />

        {topic ? (
          <GraphDetail
            topic={topic}
            edge={edges.get(topic.id)}
            exemption={exemptions.get(topic.id)}
            anchor={resolveAnchor(anchors, edges.get(topic.id)?.where)}
            onOpenTopic={onOpenTopic}
          />
        ) : (
          <p className="text-[10px] leading-relaxed text-slate-500 px-2 py-3 rounded-xl border border-dashed border-slate-800">
            Click any node to see why this project uses that concept — or the reason it deliberately does not.
          </p>
        )}
      </div>
    </div>
  );
}
