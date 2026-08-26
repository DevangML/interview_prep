import type { MasteryUnit } from '../masteryStream';
import { behaviouralStarUnits } from './behaviouralStar';
import { behaviouralStoriesUnits } from './behaviouralStories';

export const behaviouralUnits: MasteryUnit[] = [
  ...behaviouralStarUnits,
  ...behaviouralStoriesUnits,
];
