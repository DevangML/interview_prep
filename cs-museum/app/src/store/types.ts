export interface Dependency {
  uses: string;
  how: string;
  forCase: string;
  confidence: string;
  nodeId?: string | null;
}

export interface Relation {
  id: string;
  label: string;
  why: string;
}

export interface MethodToolboxItem {
  name: string;
  signature: string;
  description: string;
  contract: string;
}

export interface ForwardChainStep {
  layerNumber: number;
  layerName: string;
  title: string;
  description: string;
  hardwareImpact?: string;
}

export interface MentalModel {
  coreMetaphor: string;
  cognitiveShift: string;
  antiPatternToUnlearn: string;
}

export interface LangTelemetry {
  runtimeOverhead: 'Zero-Cost' | 'Pointer Indirection' | 'GC Traced' | 'Dynamic Lookup';
  cacheLocality: 'Cache-Line Contiguous' | 'Pointer Chasing' | 'Mixed';
  cognitiveLoad: 'Low / Familiar' | 'Medium / Rule-Heavy' | 'High / Proof-Demanding';
}

export interface LangDeepSpec {
  syntaxPrimitives: string[];
  methodToolbox: MethodToolboxItem[];
  mechanicalLowering: {
    staticLowering: string;
    dynamicLowering?: string;
    memoryLayout: string;
    cacheImpact: string;
  };
  forwardChain: ForwardChainStep[];
  mentalModel: MentalModel;
  telemetry: LangTelemetry;
}

export type Coverage = 'verified' | 'partial' | 'unverified' | 'absent_by_design';

export interface LangImpl {
  lang: string;
  langId?: string | null;
  coverage?: Coverage;
  variant?: string | null;
  mechanism: string;
  why: string;
  useWhen: string;
  price: string;
  source?: string;
  authority?: number;
  confidence?: string;
  syntaxExample?: string | null;
  dependsOn?: string[];
  absentReason?: string | null;
  deepSpec?: LangDeepSpec;
}

export interface CatalogLanguage {
  id: string;
  label: string;
  family: string;
  runtimeKind: string;
  so2025_pct: number | null;
  jobRelevant: boolean;
  jobNote?: string | null;
  aliases: string[];
  clusterDefault: Record<string, Coverage>;
  absentReason?: string | null;
  docs?: string | null;
}

export interface LanguageCatalog {
  version: string;
  source: string;
  count: number;
  languages: CatalogLanguage[];
}

export interface ConceptDetails {
  definition: string;
  motivation: string;
  origin: string;
  first_principles: string;
  does?: string;
  outcome?: string;
  empowered_by?: Dependency[];
  empowers_note?: string;
  empowers?: string;
  inheritsFrom?: Relation[];
  specializesInto?: Relation[];
  byLanguage?: LangImpl[];
  traceDown?: string[];
  authored?: boolean;
}

export interface ConceptNode {
  id: string;
  label: string;
  isLayer: boolean;
  layerId?: string;
  position?: [number, number, number];
  shape?: string;
  color?: string;
  details?: ConceptDetails | null;
}

export interface ConceptEdge {
  id: string;
  source: string;
  target: string;
  type: string;
  label?: string;
}

export interface MuseumState {
  isLoading: boolean;
  error: string | null;
  programmingNodes: ConceptNode[];
  programmingEdges: ConceptEdge[];
  bedrockNodesMap: Map<string, ConceptNode>;
  languageCatalog: CatalogLanguage[];
  catalogSource: string;
  activeConceptId: string | null;
  activeStageId: string | null;
  activeLanguage: string | null;
  door: 'stages' | 'languages';
  langTrack: string | null;
  viewMode: 'read' | 'compare';
  commandPaletteOpen: boolean;

  init: () => Promise<void>;
  applyRouteState: (route: {
    conceptId: string | null;
    stageId: string | null;
    language: string | null;
    mode: 'read' | 'compare';
    door: 'stages' | 'languages';
    langTrack: string | null;
  }) => void;
  goHome: () => void;
  setDoor: (door: 'stages' | 'languages') => void;
  selectLangTrack: (id: string | null) => void;
  selectStage: (id: string | null) => void;
  selectConcept: (id: string | null, preferredLang?: string) => void;
  selectLanguage: (lang: string | null) => void;
  setViewMode: (mode: 'read' | 'compare') => void;
  setCommandPaletteOpen: (open: boolean) => void;
  getActiveConcept: () => ConceptNode | null;
  getStageTrack: () => ConceptNode[];
}

