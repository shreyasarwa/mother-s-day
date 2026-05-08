import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Balloon: individual balloon with pop animation & cursor physics ───────────

// SVG balloon — teardrop shape with radial gradient, highlight, and string
function BalloonSVG({ colors, size = 120 }) {
  // Stable ID using a ref so it doesn't regenerate on every render
  const uid = useRef(`b${Math.random().toString(36).slice(2, 6)}`).current;

  return (
    <svg
      width={size}
      height={size * 1.48}
      viewBox="0 0 100 148"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {/* Main body gradient — slightly off-center for realism */}
        <radialGradient id={`bg-${uid}`} cx="36%" cy="30%" r="64%">
          <stop offset="0%" stopColor={colors.shine} />
          <stop offset="42%" stopColor={colors.top} />
          <stop offset="100%" stopColor={colors.middle} />
        </radialGradient>

        {/* Specular highlight */}
        <radialGradient id={`shine-${uid}`} cx="28%" cy="26%" r="32%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.72)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>

        {/* Secondary subtle highlight (lower right) */}
        <radialGradient id={`shine2-${uid}`} cx="72%" cy="72%" r="25%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>

        {/* Drop shadow filter */}
        <filter id={`shadow-${uid}`} x="-20%" y="-10%" width="150%" height="150%">
          <feDropShadow
            dx="2"
            dy="6"
            stdDeviation="5"
            floodColor={colors.middle}
            floodOpacity="0.28"
          />
        </filter>
      </defs>

      {/* Balloon body */}
      <ellipse
        cx="50"
        cy="52"
        rx="43"
        ry="49"
        fill={`url(#bg-${uid})`}
        filter={`url(#shadow-${uid})`}
      />

      {/* Specular highlights */}
      <ellipse cx="36" cy="35" rx="14" ry="17" fill={`url(#shine-${uid})`} />
      <ellipse cx="64" cy="68" rx="10" ry="12" fill={`url(#shine2-${uid})`} />

      {/* Knot at bottom */}
      <path
        d="M46 99 Q50 107 54 99 Z"
        fill={colors.middle}
        opacity="0.88"
      />

      {/* Wavy string */}
      <path
        d="M50 108 Q42 118 50 128 Q58 138 50 147"
        stroke={`${colors.middle}99`}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Pop burst particles — tiny colored dots explode outward
function PopBurst({ colors }) {
  const particles = Array.from({ length: 12 }, (_, i) => {
    const angle = (i / 12) * 360;
    const dist = 32 + (i % 3) * 14;
    return {
      id: i,
      x: Math.cos((angle * Math.PI) / 180) * dist,
      y: Math.sin((angle * Math.PI) / 180) * dist,
      size: 3.5 + (i % 4) * 2,
    };
  });

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 10 }}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            top: '50%',
            left: '50%',
            marginTop: -p.size / 2,
            marginLeft: -p.size / 2,
            background: `radial-gradient(circle, ${colors.shine}, ${colors.top})`,
          }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{ x: p.x, y: p.y, opacity: 0, scale: 0.2 }}
          transition={{ duration: 0.4, ease: [0.15, 0, 0.85, 1] }}
        />
      ))}
    </div>
  );
}

export default function Balloon({ data, index, onPop, physicsRef }) {
  const [popped, setPopped] = useState(false);
  const [popping, setPopping] = useState(false);
  const [hovered, setHovered] = useState(false);
  const balloonRef = useRef(null);

  // Register with physics engine for cursor repulsion
  const setRef = (el) => {
    balloonRef.current = el;
    if (physicsRef && el) {
      physicsRef(data.id - 1, el);
    }
  };

  // Organic float parameters — derived from id for consistent randomness
  const floatDuration = 4.2 + (data.id * 1.31) % 3.8;
  const floatDelay = (data.id * 0.57) % 3.0;
  const floatAmp = 13 + (data.id * 2.9) % 13;
  const swayAmp = 2.5 + (data.id * 0.95) % 3.8;

  // Balloon size — slight variation for organic feel
  const size = 96 + (data.id % 4) * 9;

  const handlePop = () => {
    if (popped || popping) return;
    setPopping(true);

    setTimeout(() => {
      setPopped(true);
      onPop(data);
    }, 240);
  };

  if (popped) return null;

  return (
    <motion.div
      ref={setRef}
      id={`balloon-${data.id}`}
      className="absolute cursor-pointer select-none"
      style={{ willChange: 'transform' }}
      initial={{ opacity: 0, scale: 0.25, y: 80 }}
      animate={
        popping
          ? { scale: 1.4, opacity: 0 }
          : {
              opacity: 1,
              scale: 1,
              y: [0, -floatAmp, 0],
              rotate: [-swayAmp, swayAmp, -swayAmp],
            }
      }
      transition={
        popping
          ? { duration: 0.24, ease: 'easeOut' }
          : {
              opacity: { duration: 0.55, delay: index * 0.1 },
              scale: {
                duration: 0.65,
                type: 'spring',
                stiffness: 180,
                damping: 18,
                delay: index * 0.1,
              },
              y: {
                duration: floatDuration,
                delay: floatDelay,
                repeat: Infinity,
                ease: 'easeInOut',
              },
              rotate: {
                duration: floatDuration * 1.25,
                delay: floatDelay + 0.3,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }
      }
      whileHover={!popping ? { scale: 1.1, filter: 'brightness(1.07)' } : {}}
      onClick={handlePop}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      aria-label={`Balloon ${data.id} — click to pop and discover a surprise`}
    >
      {/* Hover glow ring */}
      <AnimatePresence>
        {hovered && !popping && (
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              inset: '-8px',
              boxShadow: `0 0 28px ${data.colors.middle}55, 0 0 56px ${data.colors.middle}22`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          />
        )}
      </AnimatePresence>

      {/* Pop burst particles */}
      <AnimatePresence>
        {popping && <PopBurst colors={data.colors} />}
      </AnimatePresence>

      <BalloonSVG colors={data.colors} size={size} />

      {/* Emoji label — centered on balloon body */}
      <motion.div
        className="absolute"
        style={{
          bottom: '52%',
          left: '50%',
          transform: 'translate(-50%, 50%)',
          fontSize: `${0.9 + (data.id % 3) * 0.2}rem`,
          pointerEvents: 'none',
          filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.12))',
        }}
        animate={{ scale: hovered ? 1.25 : 1 }}
        transition={{ type: 'spring', stiffness: 320, damping: 20 }}
      >
        {data.label}
      </motion.div>
    </motion.div>
  );
}
