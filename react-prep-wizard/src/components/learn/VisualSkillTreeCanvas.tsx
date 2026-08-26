import React, { useState, useMemo } from 'react';
import type { LearnTopic } from '../../data/learn';
import { ConstellationNode } from './constellation/ConstellationNode';
import { ConstellationEdge } from './constellation/ConstellationEdge';
import { QuestInspectorDeck } from './constellation/QuestInspectorDeck';
import { playClickSound } from '../../lib/sound/soundEngine';

interface Props {
  topics: LearnTopic[];
  activeId: string;
  read: Record<string, boolean>;
  duels: Record<string, boolean>;
  onSelect: (topic: LearnTopic) => void;
  onReadLesson?: () => void;
}

export function VisualSkillTreeCanvas({
  topics, activeId, read, duels, onSelect, onReadLesson
}: Props) {
  const [selectedArea, setSelectedArea] = useState<string>('All');
  const [inspectorOpen, setInspectorOpen] = useState(true);

  const areas = useMemo(() => ['All', ...Array.from(new Set(topics.map((t) => t.area)))], [topics]);
  const filteredTopics = useMemo(() => {
    if (selectedArea === 'All') return topics;
    return topics.filter((t) => t.area === selectedArea);
  }, [topics, selectedArea]);

  const activeTopic = useMemo(() => topics.find((t) => t.id === activeId) || topics[0], [topics, activeId]);

  // Stage clusters and coordinate mapping
  const areaList = useMemo(() => Array.from(new Set(filteredTopics.map((t) => t.area))), [filteredTopics]);
  const colWidth = 240;
  const rowHeight = 100;
  const svgWidth = Math.max(900, (areaList.length + 1) * colWidth);
  const svgHeight = 650;

  const nodeCoords = useMemo(() => {
    const map = new Map<string, { x: number; y: number; topic: LearnTopic }>();
    areaList.forEach((area, colIdx) => {
      const areaTopics = filteredTopics.filter((t) => t.area === area);
      areaTopics.forEach((topic, rowIdx) => {
        const x = (colIdx + 1) * colWidth - 80;
        const y = (rowIdx + 1) * rowHeight + 20;
        map.set(topic.id, { x, y, topic });
      });
    });
    return map;
  }, [filteredTopics, areaList, colWidth, rowHeight]);

  const handleSelectNode = (topic: LearnTopic) => {
    playClickSound();
    onSelect(topic);
    setInspectorOpen(true);
  };

  return (
    <div className="w-full h-full min-h-[580px] bg-slate-950 rounded-xl border border-slate-800 relative overflow-hidden flex flex-col select-none">
      {/* Track Pathway Filter Strip */}
      <div className="p-3 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md flex items-center justify-between gap-2 z-10">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {areas.slice(0, 6).map((area) => (
            <button
              key={area}
              onClick={() => { playClickSound(); setSelectedArea(area); }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer whitespace-nowrap border ${
                selectedArea === area
                  ? 'bg-sky-500/20 text-sky-300 border-sky-500/40 shadow-xs'
                  : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {area === 'All' ? '🌟 All Constellations' : area}
            </button>
          ))}
        </div>
        <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">
          {filteredTopics.length} Nodes in Orbit
        </span>
      </div>

      {/* HiDPI Vector SVG Star Map */}
      <div className="flex-1 min-h-0 overflow-auto custom-scrollbar p-6 bg-radial from-slate-900 to-slate-950">
        <svg width={svgWidth} height={svgHeight} className="min-w-full">
          {/* Stage Cluster Background Bands */}
          {areaList.map((area, colIdx) => {
            const x = (colIdx + 1) * colWidth - 80;
            return (
              <g key={area}>
                <rect x={x - 100} y={10} width={200} height={svgHeight - 20} rx={16} fill="#0f172a" fillOpacity={0.3} stroke="#1e293b" strokeDasharray="4 4" />
                <text x={x} y={35} textAnchor="middle" fill="#64748b" fontSize="11px" fontWeight="bold" letterSpacing="0.05em" className="uppercase">
                  {area}
                </text>
              </g>
            );
          })}

          {/* Edges */}
          {filteredTopics.map((topic) => {
            const src = nodeCoords.get(topic.id);
            if (!src || !topic.unlocks) return null;
            return topic.unlocks.map((tId) => {
              const tgt = nodeCoords.get(tId);
              if (!tgt) return null;
              const isMastered = Boolean(duels[topic.id] || read[topic.id]);
              return <ConstellationEdge key={`${topic.id}-${tId}`} source={src} target={tgt} isMastered={isMastered} />;
            });
          })}

          {/* Nodes */}
          {Array.from(nodeCoords.values()).map(({ x, y, topic }) => (
            <ConstellationNode
              key={topic.id}
              topic={topic}
              x={x}
              y={y}
              isActive={topic.id === activeId}
              isMastered={Boolean(duels[topic.id])}
              isRead={Boolean(read[topic.id])}
              onSelect={handleSelectNode}
            />
          ))}
        </svg>
      </div>

      {/* Floating Quest Inspector Deck */}
      {inspectorOpen && activeTopic && (
        <QuestInspectorDeck
          topic={activeTopic}
          isRead={Boolean(read[activeTopic.id])}
          isDuelPassed={Boolean(duels[activeTopic.id])}
          onClose={() => setInspectorOpen(false)}
          onReadLesson={() => { if (onReadLesson) onReadLesson(); }}
          onSelectTopic={(id) => {
            const t = topics.find((item) => item.id === id);
            if (t) handleSelectNode(t);
          }}
        />
      )}
    </div>
  );
}
