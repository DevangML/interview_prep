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
  for (const node of bedrockData.nodes || []) {
    bedrockMap.set(node.id, node);
  }

  return {
    nodes: progData.nodes || [],
    edges: progData.edges || [],
    bedrockMap,
    catalog,
  };
}
