export type DiagramSourceType = 'gdrive' | 'drawio_url' | 'xml' | 'template';

export interface TopicDiagramState {
  topicId: string;
  sourceType: DiagramSourceType;
  rawUrl?: string;
  gdriveFileId?: string;
  xmlData: string;
  title: string;
  lastUpdated: number;
  isCustomized: boolean;
}

export interface ParsedDiagramNode {
  id: string;
  label: string;
  type: string;
  isContainer?: boolean;
}

export interface ParsedDiagramEdge {
  id: string;
  source?: string;
  target?: string;
  label?: string;
}

export interface DiagramAst {
  nodes: ParsedDiagramNode[];
  edges: ParsedDiagramEdge[];
  rawXml: string;
  summary: string;
}

export interface DrawAiAuditResult {
  accuracyScore: number; // 0 - 100
  title: string;
  diagnosis: string[];
  missingElements: string[];
  suggestedFixes: string[];
  recommendedXml?: string;
  mermaidBlueprint?: string;
}

export interface DrawAiMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  auditResult?: DrawAiAuditResult;
  suggestedXml?: string;
}
