import type { ConceptNode, ConceptEdge, LanguageCatalog } from '../store/types';

export interface MuseumPayload {
  nodes: ConceptNode[];
  edges: ConceptEdge[];
  bedrockMap: Map<string, ConceptNode>;
  catalog: LanguageCatalog;
}

export async function fetchMuseumData(): Promise<MuseumPayload> {
  const [progRes, bedrockRes, langRes] = await Promise.all([
    fetch('/data/programming_tower.json'),
    fetch('/data/tower.json'),
    fetch('/data/languages.json'),
  ]);

  const progData = await progRes.json();
  const bedrockData = await bedrockRes.json();
  let catalog: LanguageCatalog = { version: '', source: '', count: 0, languages: [] };
  if (langRes.ok) catalog = await langRes.json();

  const bedrockMap = new Map<string, ConceptNode>();
  const nodeMap = new Map<string, ConceptNode>();

  // 1. Index all bedrock nodes into bedrockMap
  for (const node of bedrockData.nodes || []) {
    bedrockMap.set(node.id, node);
    // Include non-layer foundational CS nodes into the primary concept registry
    if (!node.isLayer) {
      nodeMap.set(node.id, node);
    }
  }

  // 2. Overlay authored programming concepts (has deep language specs)
  for (const node of progData.nodes || []) {
    if (!node.isLayer) {
      nodeMap.set(node.id, node);
    }
  }

  // 3. Merge dependency edges from both graphs
  const edgeMap = new Map<string, ConceptEdge>();
  for (const edge of bedrockData.edges || []) {
    edgeMap.set(`${edge.source}->${edge.target}`, edge);
  }
  for (const edge of progData.edges || []) {
    edgeMap.set(`${edge.source}->${edge.target}`, edge);
  }

  return {
    nodes: Array.from(nodeMap.values()),
    edges: Array.from(edgeMap.values()),
    bedrockMap,
    catalog,
  };
}
