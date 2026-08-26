/**
 * Synthesized Web Audio Sound Engine (Zero external MP3 dependencies).
 * Generates tactile audio micro-feedback using native AudioContext oscillators.
 */

let ctx: AudioContext | null = null;
let soundEnabled = true;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtx) ctx = new AudioCtx();
  }
  if (ctx && ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }
  return ctx;
}

export function toggleSound(enabled?: boolean): boolean {
  if (typeof enabled === 'boolean') soundEnabled = enabled;
  else soundEnabled = !soundEnabled;
  return soundEnabled;
}

export function isSoundEnabled(): boolean {
  return soundEnabled;
}

export function playClickSound() {
  if (!soundEnabled) return;
  const ac = getAudioContext();
  if (!ac) return;
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(800, ac.currentTime);
  osc.frequency.exponentialRampToValueAtTime(400, ac.currentTime + 0.04);
  gain.gain.setValueAtTime(0.08, ac.currentTime);
  gain.gain.linearRampToValueAtTime(0.001, ac.currentTime + 0.04);
  osc.connect(gain);
  gain.connect(ac.destination);
  osc.start();
  osc.stop(ac.currentTime + 0.04);
}

export function playSuccessSound(combo = 1) {
  if (!soundEnabled) return;
  const ac = getAudioContext();
  if (!ac) return;
  const baseFreq = 440 * Math.min(2, 1 + (combo - 1) * 0.15);
  [baseFreq, baseFreq * 1.25, baseFreq * 1.5].forEach((freq, idx) => {
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, ac.currentTime + idx * 0.06);
    gain.gain.setValueAtTime(0.12, ac.currentTime + idx * 0.06);
    gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + idx * 0.06 + 0.25);
    osc.connect(gain);
    gain.connect(ac.destination);
    osc.start(ac.currentTime + idx * 0.06);
    osc.stop(ac.currentTime + idx * 0.06 + 0.25);
  });
}

export function playErrorSound() {
  if (!soundEnabled) return;
  const ac = getAudioContext();
  if (!ac) return;
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(160, ac.currentTime);
  osc.frequency.linearRampToValueAtTime(90, ac.currentTime + 0.15);
  gain.gain.setValueAtTime(0.15, ac.currentTime);
  gain.gain.linearRampToValueAtTime(0.001, ac.currentTime + 0.15);
  osc.connect(gain);
  gain.connect(ac.destination);
  osc.start();
  osc.stop(ac.currentTime + 0.15);
}
