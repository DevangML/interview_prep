import type { MasteryUnit } from './types';
import { jsTrapsCoreUnits } from './jsTrapsCore';
import { jsTrapsAdvancedUnits } from './jsTrapsAdvanced';

export const jsTrapsUnits: MasteryUnit[] = [
  ...jsTrapsCoreUnits,
  ...jsTrapsAdvancedUnits,
];
