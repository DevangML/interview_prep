import React from 'react';
import type { LearnTopic } from '../../../data/learn';
import { p3Colors } from '../../../styles/themeTokens';

interface Props {
  topic: LearnTopic;
  x: number;
  y: number;
  isActive: boolean;
  isMastered: boolean;
  isRead: boolean;
  onSelect: (topic: LearnTopic) => void;
}

export function ConstellationNode({ topic, x, y, isActive, isMastered, isRead, onSelect }: Props) {
  const getFill = () => {
    if (isActive) return p3Colors.svg.brand;
    if (isMastered) return p3Colors.svg.success;
    if (isRead) return p3Colors.svg.accent;
    return p3Colors.svg.border;
  };

  const getStroke = () => {
    if (isActive) return p3Colors.svg.brandGlow;
    if (isMastered) return p3Colors.svg.successGlow;
    if (isRead) return p3Colors.svg.accentGlow;
    return p3Colors.svg.borderLight;
  };

  return (
    <g
      transform={`translate(${x}, ${y})`}
      onClick={() => onSelect(topic)}
      className="cursor-pointer group select-none"
    >
      <circle
        r={isActive ? 22 : isMastered ? 18 : 14}
        fill="transparent"
        stroke={getStroke()}
        strokeWidth={isActive ? 2 : 1}
        strokeOpacity={isActive ? 0.8 : isMastered ? 0.5 : 0.2}
        className={isActive ? 'animate-ping' : ''}
      />

      <circle
        r={isActive ? 16 : isMastered ? 14 : 11}
        fill={getFill()}
        stroke={getStroke()}
        strokeWidth={isActive ? 2.5 : 1.5}
        className="transition-transform duration-200 group-hover:scale-125"
      />

      <text
        y={4}
        textAnchor="middle"
        fontSize={isActive ? '11px' : '9px'}
        fill={p3Colors.svg.textBright}
        className="font-bold pointer-events-none"
      >
        {isMastered ? '✓' : isRead ? '●' : '○'}
      </text>

      <text
        y={28}
        textAnchor="middle"
        fontSize="10px"
        fontWeight={isActive ? 'bold' : '500'}
        fill={isActive ? p3Colors.svg.brandGlow : isMastered ? p3Colors.svg.successGlow : p3Colors.svg.textLight}
        className="pointer-events-none transition-colors group-hover:fill-white drop-shadow-sm"
      >
        {topic.title.length > 20 ? topic.title.slice(0, 18) + '…' : topic.title}
      </text>
    </g>
  );
}
