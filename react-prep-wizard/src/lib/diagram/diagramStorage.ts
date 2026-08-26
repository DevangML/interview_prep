import type { TopicDiagramState, DiagramSourceType } from './diagramTypes';
import { extractGoogleDriveId } from './diagramUtils';
import { getDefaultDiagramForTopic } from './diagramTemplates';

const STORAGE_PREFIX = 'learn:diagram:';
const BROADCAST_CHANNEL_NAME = 'learn-diagram-sync';

let channel: BroadcastChannel | null = null;
try {
  if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
    channel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
  }
} catch {
  // BroadcastChannel unavailable in sandbox or older envs
}

export async function fetchGoogleDriveXml(gdriveId: string): Promise<string | null> {
  try {
    const res = await fetch(`/api/diagram/fetch-gdrive?file_id=${encodeURIComponent(gdriveId)}`);
    if (res.ok) {
      const data = await res.json();
      if (data.ok && data.xml) {
        return data.xml;
      }
    }
  } catch (err) {
    console.warn('Failed to fetch GDrive XML via API proxy:', err);
  }
  return null;
}

export function loadTopicDiagram(topicId: string, topicTitle: string): TopicDiagramState {
  const defaultXml = getDefaultDiagramForTopic(topicId, topicTitle);
  if (typeof window === 'undefined') {
    return {
      topicId,
      sourceType: 'template',
      xmlData: defaultXml,
      title: topicTitle,
      lastUpdated: Date.now(),
      isCustomized: false
    };
  }

  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${topicId}`);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.isCustomized && (parsed.rawUrl || parsed.xmlData)) {
        return {
          ...parsed,
          xmlData: parsed.xmlData || defaultXml
        };
      }
    }
  } catch (e) {
    console.warn(`Failed to read stored diagram for ${topicId}`, e);
  }

  return {
    topicId,
    sourceType: 'template',
    xmlData: defaultXml,
    title: topicTitle,
    lastUpdated: Date.now(),
    isCustomized: false
  };
}

export function saveTopicDiagram(state: TopicDiagramState): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(`${STORAGE_PREFIX}${state.topicId}`, JSON.stringify(state));
    channel?.postMessage({ type: 'DIAGRAM_SAVED', topicId: state.topicId, timestamp: state.lastUpdated });
  } catch (e) {
    console.error(`Failed to save diagram for topic ${state.topicId}`, e);
  }
}

export function attachDiagramLink(
  topicId: string,
  topicTitle: string,
  inputUrl: string,
  explicitXml?: string
): TopicDiagramState {
  const gdriveId = extractGoogleDriveId(inputUrl);
  let sourceType: DiagramSourceType = 'drawio_url';
  let xmlData = explicitXml || getDefaultDiagramForTopic(topicId, topicTitle);

  if (gdriveId) {
    sourceType = 'gdrive';
  } else if (
    inputUrl.startsWith('<mxfile') ||
    inputUrl.startsWith('<mxGraphModel') ||
    inputUrl.includes('<mxCell')
  ) {
    sourceType = 'xml';
    xmlData = inputUrl;
  }

  const updated: TopicDiagramState = {
    topicId,
    title: topicTitle,
    sourceType,
    rawUrl: inputUrl,
    gdriveFileId: gdriveId || undefined,
    xmlData,
    lastUpdated: Date.now(),
    isCustomized: true
  };

  saveTopicDiagram(updated);
  return updated;
}

export function subscribeToDiagramSync(onSync: (topicId: string) => void): () => void {
  if (!channel) return () => {};

  const handleMessage = (event: MessageEvent) => {
    if (event.data?.type === 'DIAGRAM_SAVED' && event.data?.topicId) {
      onSync(event.data.topicId);
    }
  };

  channel.addEventListener('message', handleMessage);
  return () => {
    channel?.removeEventListener('message', handleMessage);
  };
}
