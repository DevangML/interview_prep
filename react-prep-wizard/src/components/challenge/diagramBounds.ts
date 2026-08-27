import type { Diagram } from '../../types';

/** Note typography, shared by the measurer and the renderer so they agree. */
export const NOTE_FONT = 10;
export const NOTE_LINE = 11;

function wrapNote(text: string, maxChars: number): string[] {
  const words = String(text).split(' ');
  const lines: string[] = [];
  let line = '';
  for (const word of words) {
    if ((line + ' ' + word).trim().length > maxChars) { lines.push(line.trim()); line = word; }
    else line += ' ' + word;
  }
  if (line.trim()) lines.push(line.trim());
  return lines.length ? lines : [''];
}

/** Lowest drawn edge of everything that is not a note. */
function contentBottom(d: Diagram): number {
  let bottom = 0;
  if (d.frame) bottom = Math.max(bottom, d.frame[1] + d.frame[3]);
  (d.box || []).forEach((b) => { if (b.length >= 4) bottom = Math.max(bottom, b[1] + b[3]); });
  (d.track || []).forEach((a) => { bottom = Math.max(bottom, a[1] + 16); });
  (d.arrow || []).forEach((a) => { bottom = Math.max(bottom, Math.max(a[1], a[3])); });
  (d.gap || []).forEach((g) => {
    bottom = Math.max(bottom, g[4] !== 0 ? g[1] + 8 : g[1] + g[2]);
  });
  return bottom;
}

export interface NoteLayout { x: number; y: number; lines: string[] }

/**
 * Place the notes.
 *
 * Two things were wrong. The measurer wrapped note text into lines while the
 * renderer drew it as one unwrapped `<text>`, so a long note ran straight out of
 * the diagram. And an authored baseline is only a baseline — text ascends from
 * it — so a note sitting a few pixels under the frame was actually drawn through
 * the frame's border, which is the strikethrough effect on GRID-08.
 *
 * An authored position is honoured whenever it genuinely clears the drawing;
 * otherwise the note drops below it. Notes then stack rather than overprint.
 */
export function layoutNotes(d: Diagram): NoteLayout[] {
  const width = d.w || 320;
  let cursor = contentBottom(d) + NOTE_LINE;
  return (d.note || []).map((n) => {
    const maxChars = Math.max(8, Math.floor((width - n[0]) / 5.0));
    const lines = wrapNote(String(n[2]), maxChars);
    const y = Math.max(n[1], cursor);
    cursor = y + lines.length * NOTE_LINE;
    return { x: n[0], y, lines };
  });
}

export function getBounds(d: Diagram) {
  let minX = 0, minY = 0, maxX = d.w || 320, maxY = d.h || 170;
  const pad = 8;

  if (d.frame) {
    minX = Math.min(minX, d.frame[0] - 2);
    minY = Math.min(minY, d.frame[1] - 2);
    maxX = Math.max(maxX, d.frame[0] + d.frame[2] + 4);
    maxY = Math.max(maxY, d.frame[1] + d.frame[3] + 4);
  }
  (d.box || []).forEach((b) => {
    if (b.length >= 4) {
      minX = Math.min(minX, b[0] - 2);
      minY = Math.min(minY, b[1] - 2);
      maxX = Math.max(maxX, b[0] + b[2] + 4);
      maxY = Math.max(maxY, b[1] + b[3] + 4);
    }
  });
  (d.gap || []).forEach((g) => {
    const isHoriz = g[4] !== 0;
    const lab = String(g[3] || '');
    if (isHoriz) {
      minX = Math.min(minX, g[0] - 4);
      maxX = Math.max(maxX, g[0] + g[2] + 4);
      minY = Math.min(minY, g[1] - 12);
      maxY = Math.max(maxY, g[1] + 8);
    } else {
      minX = Math.min(minX, g[0] - 4);
      maxX = Math.max(maxX, g[0] + 8 + lab.length * 6.5);
      minY = Math.min(minY, g[1] - 4);
      maxY = Math.max(maxY, g[1] + g[2] + 4);
    }
  });
  (d.arrow || []).forEach((a) => {
    minX = Math.min(minX, Math.min(a[0], a[2]) - 4);
    maxX = Math.max(maxX, Math.max(a[0], a[2]) + 12);
    minY = Math.min(minY, Math.min(a[1], a[3]) - 12);
    maxY = Math.max(maxY, Math.max(a[1], a[3]) + 6);
  });
  (d.track || []).forEach((a) => {
    minX = Math.min(minX, a[0] - 2);
    maxX = Math.max(maxX, a[0] + a[2] + 4);
    minY = Math.min(minY, a[1] - 2);
    maxY = Math.max(maxY, a[1] + 16);
  });
  // Measure exactly what the renderer will draw, from the same layout pass.
  layoutNotes(d).forEach((n) => {
    const longest = n.lines.reduce((m, l) => Math.max(m, l.length), 0);
    minX = Math.min(minX, n.x);
    maxX = Math.max(maxX, n.x + longest * 6.0 + 8);
    minY = Math.min(minY, n.y - NOTE_FONT - 2);
    maxY = Math.max(maxY, n.y + (n.lines.length - 1) * NOTE_LINE + 6);
  });

  const vx = minX < 0 ? minX : 0;
  const vy = minY < 0 ? minY : 0;
  const vw = Math.ceil(maxX - vx) + pad;
  const vh = Math.ceil(maxY - vy) + pad;
  return { vx, vy, vw, vh };
}
