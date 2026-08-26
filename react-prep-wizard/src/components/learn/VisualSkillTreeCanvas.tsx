import { useRef, useEffect } from 'react';
import type { LearnTopic } from '../../data/learn';
import { playClickSound } from '../../lib/sound/soundEngine';

interface Props {
  topics: LearnTopic[];
  activeId: string;
  read: Record<string, boolean>;
  duels: Record<string, boolean>;
  onSelect: (topic: LearnTopic) => void;
}

export function VisualSkillTreeCanvas({ topics, activeId, read, duels, onSelect }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Group topics into columns/tiers based on area or DAG depth
  const areas = Array.from(new Set(topics.map((t) => t.area)));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    // Calculate grid positions
    const nodeCoords = new Map<string, { x: number; y: number; topic: LearnTopic }>();
    const colWidth = width / (areas.length + 1);

    areas.forEach((area, colIdx) => {
      const areaTopics = topics.filter((t) => t.area === area);
      const rowHeight = height / (areaTopics.length + 1);
      areaTopics.forEach((topic, rowIdx) => {
        const x = (colIdx + 1) * colWidth;
        const y = (rowIdx + 1) * rowHeight;
        nodeCoords.set(topic.id, { x, y, topic });
      });
    });

    // Draw connecting edges
    topics.forEach((topic) => {
      const source = nodeCoords.get(topic.id);
      if (!source || !topic.unlocks) return;

      topic.unlocks.forEach((targetId) => {
        const target = nodeCoords.get(targetId);
        if (!target) return;

        const isMastered = Boolean(duels[topic.id] || read[topic.id]);
        ctx.beginPath();
        ctx.moveTo(source.x, source.y);
        ctx.bezierCurveTo(
          (source.x + target.x) / 2, source.y,
          (source.x + target.x) / 2, target.y,
          target.x, target.y
        );
        ctx.strokeStyle = isMastered ? '#10b981' : '#334155';
        ctx.lineWidth = isMastered ? 2.5 : 1.2;
        if (isMastered) {
          ctx.shadowColor = '#10b981';
          ctx.shadowBlur = 8;
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.stroke();
      });
    });

    // Draw nodes
    nodeCoords.forEach(({ x, y, topic }) => {
      const isActive = topic.id === activeId;
      const isMastered = Boolean(duels[topic.id]);
      const isRead = Boolean(read[topic.id]);

      ctx.shadowBlur = isActive ? 15 : isMastered ? 10 : 0;
      ctx.shadowColor = isActive ? '#38bdf8' : isMastered ? '#10b981' : 'transparent';

      ctx.beginPath();
      ctx.arc(x, y, isActive ? 14 : 10, 0, Math.PI * 2);
      ctx.fillStyle = isActive ? '#0284c7' : isMastered ? '#059669' : isRead ? '#4f46e5' : '#1e293b';
      ctx.fill();
      ctx.strokeStyle = isActive ? '#bae6fd' : '#475569';
      ctx.lineWidth = isActive ? 3 : 1.5;
      ctx.stroke();

      // Node label
      ctx.shadowBlur = 0;
      ctx.fillStyle = isActive ? '#38bdf8' : isMastered ? '#34d399' : '#94a3b8';
      ctx.font = `${isActive ? 'bold 11px' : '9px'} system-ui, sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText(topic.title.slice(0, 18) + (topic.title.length > 18 ? '…' : ''), x, y + 22);
    });
  }, [topics, activeId, read, duels, areas]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = (e.clientX - rect.left) * (canvas.width / rect.width);
    const clickY = (e.clientY - rect.top) * (canvas.height / rect.height);

    const colWidth = canvas.width / (areas.length + 1);
    areas.forEach((area, colIdx) => {
      const areaTopics = topics.filter((t) => t.area === area);
      const rowHeight = canvas.height / (areaTopics.length + 1);
      areaTopics.forEach((topic, rowIdx) => {
        const x = (colIdx + 1) * colWidth;
        const y = (rowIdx + 1) * rowHeight;
        const dist = Math.hypot(clickX - x, clickY - y);
        if (dist <= 20) {
          playClickSound();
          onSelect(topic);
        }
      });
    });
  };

  return (
    <div className="w-full h-full min-h-[480px] bg-slate-950 rounded-xl border border-slate-800 relative overflow-hidden flex items-center justify-center p-4">
      <div className="absolute top-3 left-4 text-xs font-mono text-slate-400 flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
        <span>Topological Skill Graph DAG (Click any node to inspect)</span>
      </div>
      <canvas
        ref={canvasRef}
        width={1000}
        height={600}
        onClick={handleCanvasClick}
        className="w-full h-full max-h-[600px] cursor-pointer"
      />
    </div>
  );
}
