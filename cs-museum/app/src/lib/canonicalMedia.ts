import mediaData from './canonicalMediaData.json';
import docsData from './languageDocsData.json';

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

export function getStageVideo(stageId: string): CanonicalVideo | null {
  if (!stageId) return null;
  return typedMediaData.stages[stageId] || null;
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
