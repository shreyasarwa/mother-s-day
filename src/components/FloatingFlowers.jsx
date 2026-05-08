import { useMemo } from 'react';
import { motion } from 'framer-motion';

// ─── FloatingFlowers: ambient floating particles ───────────────────────────────
// Uses deterministic "random" values (seeded via index) for SSR-safety and
// consistent rendering without re-creating particles on every render.

const FLOWER_SYMBOLS = [
  '🌸', '🌺', '🌷', '🌹', '🌼', '🪷', '💮',
  '✨', '💫', '⋆', '✿', '❀', '🌸', '🪷',
];

// Seeded pseudo-random for consistent particle properties
function seededRand(seed, min, max) {
  const x = Math.sin(seed + 1) * 10000;
  const r = x - Math.floor(x);
  return r * (max - min) + min;
}

function createParticle(id) {
  return {
    id,
    symbol: FLOWER_SYMBOLS[Math.floor(seededRand(id * 7, 0, FLOWER_SYMBOLS.length))],
    x: seededRand(id * 3, 2, 97),
    startY: seededRand(id * 5, 108, 145),
    endY: seededRand(id * 9, -22, -4),
    size: seededRand(id * 11, 0.6, 1.35),
    opacity: seededRand(id * 13, 0.24, 0.6),
    duration: seededRand(id * 17, 15, 28),
    delay: seededRand(id * 19, 0, 20),
    xDrift: seededRand(id * 23, -7, 7),
    rotate: seededRand(id * 29, -45, 45),
  };
}

export default function FloatingFlowers({ count = 18 }) {
  const particles = useMemo(
    () => Array.from({ length: count }, (_, i) => createParticle(i)),
    [count]
  );

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute select-none"
          style={{
            left: `${p.x}%`,
            fontSize: `${p.size}rem`,
            willChange: 'transform, opacity',
          }}
          animate={{
            y: [`${p.startY}vh`, `${p.endY}vh`],
            x: [
              `${p.x}%`,
              `${p.x + p.xDrift}%`,
              `${p.x - p.xDrift * 0.6}%`,
              `${p.x}%`,
            ],
            rotate: [0, p.rotate, -p.rotate * 0.6, 0],
            opacity: [0, p.opacity, p.opacity * 0.85, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
            times: [0, 0.12, 0.88, 1],
          }}
        >
          {p.symbol}
        </motion.div>
      ))}
    </div>
  );
}
