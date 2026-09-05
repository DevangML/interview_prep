import mediaData from './canonicalMediaData.json';
import docsData from './languageDocsData.json';
import langMediaData from './languageMediaData.json';
import { getStageById } from './stages';


export interface CanonicalVideo {
  id: string;
  title: string;
  speaker: string;
  venueOrChannel: string;
  duration: string;
  badgeLabel?: string;
  keyTakeaway: string;
}

export interface LanguageDocs {
  name: string;
  authority: string;
  primarySpec: string;
  primaryUrl: string;
  handbook?: string;
  handbookUrl?: string;
  deepReference?: string;
  deepUrl?: string;
}

interface MediaStore {
  stages: Record<string, CanonicalVideo>;
  concepts: Record<string, CanonicalVideo>;
}

const typedMediaData = mediaData as unknown as MediaStore;
const typedDocsData = docsData as unknown as Record<string, LanguageDocs>;

const STAGE_ALIASES: Record<string, string> = {
  layer_silicon: 'layer_electronics',
  'layer-1': 'layer_electronics',
  silicon: 'layer_electronics',
  '1': 'layer_electronics',
  layer_isa: 'layer_coa',
  'layer-2': 'layer_coa',
  isa: 'layer_coa',
  microarchitecture: 'layer_coa',
  '2': 'layer_coa',
  layer_kernel: 'layer_os',
  'layer-3': 'layer_os',
  kernel: 'layer_os',
  os: 'layer_os',
  '3': 'layer_os',
  layer_compilation: 'layer_compilers',
  'layer-4': 'layer_compilers',
  compilation: 'layer_compilers',
  compiler: 'layer_compilers',
  '4': 'layer_compilers',
  layer_runtime: 'layer_compilers',
  'layer-5': 'layer_compilers',
  runtime: 'layer_compilers',
  '5': 'layer_compilers',
  layer_contracts: 'layer_oop',
  'layer-6': 'layer_oop',
  contracts: 'layer_oop',
  types: 'layer_oop',
  '6': 'layer_oop',
  layer_paradigms: 'layer_distributed',
  'layer-7': 'layer_distributed',
  paradigms: 'layer_distributed',
  '7': 'layer_distributed',
  layer_hci: 'layer_hci',
  'layer-8': 'layer_hci',
  hci: 'layer_hci',
  ergonomics: 'layer_hci',
  '8': 'layer_hci',
};

export function getStageVideo(stageId: string): CanonicalVideo | null {
  if (!stageId) return null;

  // 1. Direct match in media store
  if (typedMediaData.stages[stageId]) {
    return typedMediaData.stages[stageId];
  }

  // 2. Normalized alias match
  const norm = stageId.toLowerCase().trim();
  const alias = STAGE_ALIASES[norm] || STAGE_ALIASES[norm.replace(/[-_]/g, '')];
  if (alias && typedMediaData.stages[alias]) {
    return typedMediaData.stages[alias];
  }

  // 3. Fallback: inspect stages definition by ID or number
  const st = getStageById(stageId);
  if (st) {
    return (
      typedMediaData.stages[st.id] ||
      typedMediaData.stages[`layer-${st.number}`] ||
      null
    );
  }

  return null;
}

export function getConceptVideo(conceptId: string): CanonicalVideo | null {
  if (!conceptId) return null;
  // Direct match
  if (typedMediaData.concepts[conceptId]) {
    return typedMediaData.concepts[conceptId];
  }

  // Normalize concept ID variations
  const normalized = conceptId.toLowerCase().replace(/[^a-z0-9]/g, '_');
  for (const [key, val] of Object.entries(typedMediaData.concepts)) {
    const normKey = key.toLowerCase().replace(/[^a-z0-9]/g, '_');
    if (normalized.includes(normKey) || normKey.includes(normalized)) {
      return val;
    }
  }

  return null;
}

export function getLanguageDocs(langIdOrName: string): LanguageDocs | null {
  if (!langIdOrName) return null;
  const key = langIdOrName.toLowerCase().trim();

  // Direct match
  if (typedDocsData[key]) {
    return typedDocsData[key];
  }

  // Alias lookup
  const aliases: Record<string, string> = {
    'c++': 'cpp',
    'c#': 'csharp',
    'js': 'javascript',
    'ts': 'typescript',
    'smalltalk': 'pharo',
    'postgres': 'sql',
    'postgresql': 'sql',
  };

  const aliasKey = aliases[key];
  if (aliasKey && typedDocsData[aliasKey]) {
    return typedDocsData[aliasKey];
  }

  for (const [docKey, val] of Object.entries(typedDocsData)) {
    if (val.name.toLowerCase() === key || key.includes(docKey)) {
      return val;
    }
  }

  return null;
}

export function getLanguageVideo(langId: string): CanonicalVideo | null {
  if (!langId) return null;
  const key = langId.toLowerCase().trim();
  const dict = langMediaData as unknown as Record<string, CanonicalVideo>;
  if (dict[key]) return dict[key];

  const aliases: Record<string, string> = {
    js: 'javascript',
    ts: 'typescript',
    'c++': 'cpp',
    golang: 'go',
    py: 'python',
  };
  const aliasKey = aliases[key];
  if (aliasKey && dict[aliasKey]) return dict[aliasKey];

  return null;
}

