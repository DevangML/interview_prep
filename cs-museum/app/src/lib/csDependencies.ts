import causalityData from './csDependenciesData.json';

export interface CausalLink {
  targetId: string;
  targetLabel: string;
  layerTag: string;
  relationship: string;
}

export interface LayerCausality {
  buildsUpon: CausalLink[];
  empowers: CausalLink[];
}

export const STAGE_CAUSALITY = causalityData as Record<string, LayerCausality>;

export function getStageCausality(stageId: string): LayerCausality {
  return (
    STAGE_CAUSALITY[stageId] || {
      buildsUpon: [],
      empowers: [],
    }
  );
}
