export interface PedagogicalStage {
  stageNumber: 1 | 2 | 3 | 4;
  stageName:
    | 'Minimal Working Prototype'
    | 'The Production Breakdown'
    | 'The Canonical Concept Evolution'
    | 'Production Hardening & Design Elegance';
  focus: string;
  codeSnippet: string;
  failureModeOrInvariant: string;
  architecturalLesson: string;
}

export interface ExplicitTopicCoverage {
  category: string;
  topic: string;
  subtopic: string;
  howCovered: string;
}

export interface ImplicitFoundation {
  domain: 'Internet & Protocols' | 'V8 Engine & Memory' | 'DOM & Browser Pipeline' | 'Security & Invariants';
  title: string;
  mechanism: string;
  realWorldImpact: string;
}

export interface ProjectBlueprint {
  id: string;
  title: string;
  tagline: string;
  realWorldAnalog: string;
  difficulty: 'Senior' | 'Staff' | 'Principal';
  estimatedBuildTimeHours: number;
  architecturePattern: string;
  summary: string;
  tags: string[];
  xpBounty: number;
  coreScopeBoundaries: {
    inScopeMinimal: string[];
    outOfScopeBloat: string[];
  };
  stages: [PedagogicalStage, PedagogicalStage, PedagogicalStage, PedagogicalStage];
  layers: Array<{ layer: string; components: string[]; invariants: string[] }>;
  explicitTopics: ExplicitTopicCoverage[];
  implicitFoundations: ImplicitFoundation[];
  frameworkVsManual: {
    frameworkHandled: string[];
    manualEngineeringRequired: string[];
  };
}
