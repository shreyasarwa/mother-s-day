import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

// ─── ConfettiEffect: emotional confetti celebration ───────────────────────────

const COLORS = [
  '#ff85a1', '#ffb3c6', '#c77dff', '#e2afff',
  '#78d9b0', '#b5ead7', '#f9c784', '#ffdac1',
  '#a8d8ea', '#c3b1e1', '#ff9aa2', '#dceeff',
];

export default function ConfettiEffect({ trigger = false }) {
  const canvasRef = useRef(null);
  const myConfettiRef = useRef(null);
  const hasFireRef = useRef(false);

  useEffect(() => {
    if (!trigger || hasFireRef.current) return;
    hasFireRef.current = true;

    const canvas = document.createElement('canvas');
    canvas.id = 'confetti-canvas';
    document.body.appendChild(canvas);

    myConfettiRef.current = confetti.create(canvas, {
      resize: true,
      useWorker: true,
    });

    const fire = myConfettiRef.current;

    // Initial big burst
    fire({
      particleCount: 90,
      spread: 100,
      origin: { x: 0.5, y: 0.55 },
      colors: COLORS,
      scalar: 1.1,
      gravity: 0.85,
      ticks: 280,
    });

    // Side cannons
    setTimeout(() => {
      fire({
        particleCount: 50,
        angle: 60,
        spread: 60,
        origin: { x: 0, y: 0.7 },
        colors: COLORS,
        scalar: 1.0,
        ticks: 250,
      });
      fire({
        particleCount: 50,
        angle: 120,
        spread: 60,
        origin: { x: 1, y: 0.7 },
        colors: COLORS,
        scalar: 1.0,
        ticks: 250,
      });
    }, 350);

    // Gentle lingering petals
    const interval = setInterval(() => {
      fire({
        particleCount: 6,
        spread: 80,
        origin: { x: Math.random(), y: -0.05 },
        colors: COLORS,
        scalar: 0.8,
        gravity: 0.5,
        ticks: 350,
        shapes: ['circle'],
        drift: (Math.random() - 0.5) * 1.5,
      });
    }, 420);

    setTimeout(() => {
      clearInterval(interval);
      // Fade out canvas
      if (canvas && canvas.parentNode) {
        canvas.style.transition = 'opacity 1.2s ease';
        canvas.style.opacity = '0';
        setTimeout(() => {
          if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
          hasFireRef.current = false;
        }, 1300);
      }
    }, 7000);

    return () => clearInterval(interval);
  }, [trigger]);

  return null;
}
