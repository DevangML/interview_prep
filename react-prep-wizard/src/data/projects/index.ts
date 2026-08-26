import { hyperCanvasProject } from './hyperCanvas';
import { quantumTradeProject } from './quantumTrade';
import { chronosGraphProject } from './chronosGraph';
import { pulseUIProject } from './pulseUI';
import type { ProjectBlueprint } from './types';

export * from './types';

export const PROJECT_BLUEPRINTS: ProjectBlueprint[] = [
  hyperCanvasProject,
  quantumTradeProject,
  chronosGraphProject,
  pulseUIProject,
];

export const PROJECT_BY_ID = new Map<string, ProjectBlueprint>(
  PROJECT_BLUEPRINTS.map((p) => [p.id, p])
);
