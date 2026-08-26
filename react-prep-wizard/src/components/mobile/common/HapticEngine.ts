/**
 * Web Audio & Vibration API Haptic Synthesizer
 * Provides tactile and audio micro-feedback for mobile interactions.
 */

class HapticEngine {
  private audioCtx: AudioContext | null = null;

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  // Light tick for selection / tab switches / wheel ticks
  public selection() {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(8);
    }
    this.playTone(880, 0.03, 0.05, 'triangle');
  }

  // Light impact on touch down
  public impactLight() {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(12);
    }
    this.playTone(440, 0.04, 0.08, 'sine');
  }

  // Medium impact on threshold crossing (swipe action / modal snap)
  public impactMedium() {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([15, 20, 15]);
    }
    this.playTone(320, 0.06, 0.12, 'triangle');
  }

  // Success chime on solution pass / task complete
  public success() {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([10, 40, 20, 40, 30]);
    }
    this.playArpeggio([523.25, 659.25, 783.99, 1046.5], 0.06);
  }

  // Error feedback on test fail
  public error() {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([40, 40, 40]);
    }
    this.playTone(180, 0.12, 0.15, 'sawtooth');
  }

  private playTone(freq: number, duration: number, gainVal: number, type: OscillatorType) {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio context error ignored
    }
  }

  private playArpeggio(notes: number[], noteDuration: number) {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      notes.forEach((freq, idx) => {
        const startTime = ctx.currentTime + idx * noteDuration;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0.08, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + noteDuration * 1.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + noteDuration * 1.5);
      });
    } catch {
      // Audio error ignored
    }
  }
}

export const haptic = new HapticEngine();
