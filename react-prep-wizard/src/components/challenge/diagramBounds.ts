import type { Diagram } from '../../types';

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
  (d.note || []).forEach((n) => {
    const w = d.w || 320;
    const max = Math.max(8, Math.floor((w - n[0]) / 5.0));
    const words = String(n[2]).split(' ');
    let line = '';
    const lines: string[] = [];
    words.forEach((word) => {
      if ((line + ' ' + word).trim().length > max) { lines.push(line.trim()); line = word; }
      else line += ' ' + word;
    });
    if (line.trim()) lines.push(line.trim());
    let maxLineLen = 0;
    lines.forEach((l) => { if (l.length > maxLineLen) maxLineLen = l.length; });
    minX = Math.min(minX, n[0]);
    maxX = Math.max(maxX, n[0] + maxLineLen * 6.0 + 8);
    minY = Math.min(minY, n[1] - 4);
    maxY = Math.max(maxY, n[1] + (lines.length - 1) * 11 + 14);
  });

  const vx = minX < 0 ? minX : 0;
  const vy = minY < 0 ? minY : 0;
  const vw = Math.ceil(maxX - vx) + pad;
  const vh = Math.ceil(maxY - vy) + pad;
  return { vx, vy, vw, vh };
}
