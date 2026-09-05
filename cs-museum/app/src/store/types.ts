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

export interface LangImpl {
  lang: string;
  mechanism: string;
  why: string;
  useWhen: string;
  price: string;
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
