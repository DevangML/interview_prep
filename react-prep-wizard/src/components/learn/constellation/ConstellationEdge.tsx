import React from 'react';
import { p3Colors } from '../../../styles/themeTokens';

interface Props {
  source: { x: number; y: number };
  target: { x: number; y: number };
  isMastered: boolean;
}

export function ConstellationEdge({ source, target, isMastered }: Props) {
  const midX = (source.x + target.x) / 2;
  const pathD = `M ${source.x} ${source.y} C ${midX} ${source.y}, ${midX} ${target.y}, ${target.x} ${target.y}`;

  return (
    <g className="transition-all duration-300">
      <path
        d={pathD}
        fill="none"
        stroke={isMastered ? p3Colors.svg.success : p3Colors.svg.border}
        strokeWidth={isMastered ? 3 : 1.5}
        strokeOpacity={isMastered ? 0.4 : 0.6}
      />
      <path
        d={pathD}
        fill="none"
        stroke={isMastered ? p3Colors.svg.successGlow : p3Colors.svg.borderLight}
        strokeWidth={isMastered ? 2 : 1}
        strokeDasharray={isMastered ? '6 4' : 'none'}
        className={isMastered ? 'animate-pulse' : ''}
      />
    </g>
  );
}
