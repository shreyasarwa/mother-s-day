import { useCallback, useRef } from 'react';

// ─── useSound: lightweight programmatic sound synthesis ───────────────────────
// Uses Web Audio API to generate soft, realistic sounds without external files.

export function useSound() {
  const audioCtxRef = useRef(null);

  const getCtx = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtxRef.current;
  }, []);

  // Soft balloon pop — short burst of filtered noise
  const playPop = useCallback(() => {
    try {
      const ctx = getCtx();
      const now = ctx.currentTime;

      // Noise burst
      const bufferSize = ctx.sampleRate * 0.12;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 1.8);
      }

      const source = ctx.createBufferSource();
      source.buffer = buffer;

      // Band-pass filter for "pop" character
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 420;
      filter.Q.value = 0.7;

      // Gain envelope
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.45, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      source.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      source.start(now);
    } catch (e) {
      // Silent fail — audio is enhancement only
    }
  }, [getCtx]);

  // Gentle chime for modal open
  const playChime = useCallback(() => {
    try {
      const ctx = getCtx();
      const now = ctx.currentTime;

      const oscillator = ctx.createOscillator();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(880, now);
      oscillator.frequency.exponentialRampToValueAtTime(1200, now + 0.08);
      oscillator.frequency.exponentialRampToValueAtTime(880, now + 0.4);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

      oscillator.connect(gain);
      gain.connect(ctx.destination);
      oscillator.start(now);
      oscillator.stop(now + 0.6);
    } catch (e) {}
  }, [getCtx]);

  // Magical sparkle sound for final celebration
  const playSparkle = useCallback(() => {
    try {
      const ctx = getCtx();
      const notes = [1046, 1318, 1568, 2093];
      notes.forEach((freq, i) => {
        const now = ctx.currentTime + i * 0.08;
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = freq;

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.1, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.4);
      });
    } catch (e) {}
  }, [getCtx]);

  return { playPop, playChime, playSparkle };
}
