import type { DiagramAst, ParsedDiagramEdge, ParsedDiagramNode } from './diagramTypes';

/**
 * Extracts Google Drive File ID from multiple link variants:
 * - https://drive.google.com/file/d/1Gqr4_E4MBM9njW8r4ZzuP1Lzkf19vi9q/view?usp=sharing
 * - https://drive.google.com/open?id=1Gqr4_E4MBM9njW8r4ZzuP1Lzkf19vi9q
 * - https://docs.google.com/drawings/d/1Gqr4_E4MBM9njW8r4ZzuP1Lzkf19vi9q/edit
 * - https://drive.google.com/uc?id=1Gqr4_E4MBM9njW8r4ZzuP1Lzkf19vi9q
 */
export function extractGoogleDriveId(url: string): string | null {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();

  // Pattern 1: /d/{id}/ or /d/{id}
  const match1 = trimmed.match(/\/d\/([a-zA-Z0-9_-]{20,})/);
  if (match1 && match1[1]) return match1[1];

  // Pattern 2: id={id}
  const match2 = trimmed.match(/[?&]id=([a-zA-Z0-9_-]{20,})/);
  if (match2 && match2[1]) return match2[1];

  // Pattern 3: direct ID string if user pasted just the ID
  if (/^[a-zA-Z0-9_-]{25,50}$/.test(trimmed)) {
    return trimmed;
  }

  return null;
}

/**
 * Builds Google Drive embeddable preview URL
 */
export function buildGoogleDrivePreviewUrl(gdriveId: string): string {
  return `https://drive.google.com/file/d/${gdriveId}/preview`;
}

/**
 * Builds direct diagrams.net Google Drive link
 */
export function buildDrawIoGoogleDriveUrl(gdriveId: string): string {
  return `https://app.diagrams.net/#G${gdriveId}`;
}

/**
 * Normalizes user input link or creates embeddable Draw.io URL with GDrive hash anchor.
 */
export function buildDrawIoEmbedUrl(options?: {
  xmlData?: string;
  gdriveId?: string;
  rawUrl?: string;
  ui?: 'min' | 'atlas' | 'sketch';
  darkMode?: boolean;
}): string {
  const base = 'https://embed.diagrams.net/';
  const params = new URLSearchParams({
    embed: '1',
    ui: options?.ui || 'min',
    spin: '1',
    proto: 'json',
    saveAndExit: '0',
    noExitBtn: '1',
    dark: options?.darkMode !== false ? '1' : '0'
  });

  const hash = options?.gdriveId ? `#G${options.gdriveId}` : '';
  return `${base}?${params.toString()}${hash}`;
}

/**
 * Safe parser for Draw.io XML to extract nodes, edges, labels and structural connections
 */
export function parseDrawIoXml(xml: string): DiagramAst {
  const nodes: ParsedDiagramNode[] = [];
  const edges: ParsedDiagramEdge[] = [];

  if (!xml || typeof xml !== 'string' || !xml.includes('<')) {
    return { nodes, edges, rawXml: xml || '', summary: 'Empty or uninitialized diagram' };
  }

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, 'text/xml');

    // Parse mxCell elements
    const cells = doc.querySelectorAll('mxCell');
    cells.forEach((cell, index) => {
      const id = cell.getAttribute('id') || `cell-${index}`;
      const value = cell.getAttribute('value') || '';
      const isEdge = cell.getAttribute('edge') === '1';
      const isVertex = cell.getAttribute('vertex') === '1';
      const source = cell.getAttribute('source') || undefined;
      const target = cell.getAttribute('target') || undefined;
      const style = cell.getAttribute('style') || '';

      // Clean HTML / entity escaped labels
      const cleanLabel = value
        .replace(/<[^>]*>/g, ' ')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .trim();

      if (isEdge) {
        edges.push({
          id,
          source,
          target,
          label: cleanLabel || undefined
        });
      } else if (isVertex && cleanLabel.length > 0) {
        let type = 'process';
        if (style.includes('ellipse') || style.includes('circle')) type = 'event_or_state';
        else if (style.includes('rhombus') || style.includes('diamond')) type = 'decision';
        else if (style.includes('cylinder') || style.includes('storage')) type = 'data_store';
        else if (style.includes('swimlane') || style.includes('group')) type = 'boundary';

        nodes.push({
          id,
          label: cleanLabel,
          type,
          isContainer: style.includes('swimlane') || style.includes('group')
        });
      }
    });

    const summary = `${nodes.length} component nodes, ${edges.length} connections`;
    return { nodes, edges, rawXml: xml, summary };
  } catch (err) {
    console.warn('Failed to parse Draw.io XML structure:', err);
    return { nodes, edges, rawXml: xml, summary: 'Custom user diagram' };
  }
}
