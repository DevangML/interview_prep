export interface TopicBreakdown {
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

export interface FrameworkComparison {
  frameworkHandled: string[];
  manualEngineeringRequired: string[];
}

export interface ArchitectureLayer {
  layer: 'Presentation' | 'Application' | 'Domain' | 'Infrastructure';
  components: string[];
  invariants: string[];
}

export interface ProjectBlueprint {
  id: string;
  title: string;
  tagline: string;
  realWorldAnalog: string;
  difficulty: 'Senior' | 'Staff' | 'Principal';
  architecturePattern: string;
  summary: string;
  tags: string[];
  xpBounty: number;
  layers: ArchitectureLayer[];
  implementationSteps: Array<{
    step: number;
    title: string;
    description: string;
    codePattern?: string;
  }>;
  explicitTopics: TopicBreakdown[];
  implicitFoundations: ImplicitFoundation[];
  frameworkVsManual: FrameworkComparison;
}
