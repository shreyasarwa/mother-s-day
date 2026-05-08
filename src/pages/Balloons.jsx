import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Gift, Star } from 'lucide-react';

import Balloon from '../components/Balloon';
import MessageModal from '../components/MessageModal';
import FloatingFlowers from '../components/FloatingFlowers';
import AmbientBackground from '../components/AmbientBackground';
import { useBalloonPhysics } from '../hooks/useBalloonPhysics';
import { useSound } from '../hooks/useSound';
import { balloonData } from '../data/balloons';
import { pageVariants, fadeUpVariants, containerVariants } from '../animations/variants';

// ─── Balloon positions: responsive grid with organic offsets ──────────────────
// Desktop: 4 columns over 2 rows; Mobile: 2 columns over 4 rows.
// Seeded offsets create a handcrafted, non-uniform feel.
function getBalloonPositions(count, isMobile) {
  if (isMobile) {
    // Mobile: 2 columns, 4 rows, tighter layout
    const cols = 2;
    const rows = Math.ceil(count / cols);
    return Array.from({ length: count }, (_, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const baseX = col === 0 ? 22 : 72;
      const baseY = 12 + (row / Math.max(rows - 1, 1)) * 68;
      const ox = Math.sin(i * 3.1) * 5;
      const oy = Math.cos(i * 2.3) * 4;
      return {
        left: `${Math.max(10, Math.min(88, baseX + ox))}%`,
        top: `${Math.max(6, Math.min(86, baseY + oy))}%`,
      };
    });
  }

  // Desktop: organic 4-column grid
  const preset = [
    { left: 11, top: 18 },
    { left: 31, top: 12 },
    { left: 54, top: 16 },
    { left: 77, top: 11 },
    { left: 18, top: 55 },
    { left: 41, top: 60 },
    { left: 64, top: 52 },
    { left: 85, top: 57 },
  ];

  return preset.slice(0, count).map((pos, i) => ({
    left: `${pos.left + Math.sin(i * 2.6) * 2.8}%`,
    top: `${pos.top + Math.cos(i * 1.9) * 2.2}%`,
  }));
}

export default function Balloons() {
  const [poppedIds, setPoppedIds] = useState(new Set());
  const [activeModal, setActiveModal] = useState(null);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640);
  const navigate = useNavigate();
  const { playPop, playChime } = useSound();
  const { registerElement } = useBalloonPhysics(balloonData.length);
  const containerRef = useRef(null);

  // Responsive detection
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    const onChange = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const remaining = balloonData.length - poppedIds.size;
  const positions = useMemo(
    () => getBalloonPositions(balloonData.length, isMobile),
    [isMobile]
  );

  const handlePop = useCallback(
    (balloon) => {
      playPop();
      setPoppedIds((prev) => new Set([...prev, balloon.id]));

      // Show modal after pop animation completes
      setTimeout(() => {
        playChime();
        setActiveModal(balloon);
      }, 300);
    },
    [playPop, playChime]
  );

  const handleCloseModal = useCallback(() => {
    setActiveModal(null);
  }, []);

  // Navigate to final page once all popped and modal closed
  useEffect(() => {
    if (poppedIds.size >= balloonData.length && !activeModal) {
      const timer = setTimeout(() => navigate('/final'), 750);
      return () => clearTimeout(timer);
    }
  }, [poppedIds.size, activeModal, navigate]);

  return (
    <motion.div
      className="page-wrapper bg-balloon-page relative overflow-hidden"
      style={{ minHeight: '100vh' }}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <AmbientBackground variant="balloons" />
      <FloatingFlowers count={14} />

      {/* Header */}
      <motion.div
        className="relative z-10 text-center pt-9 pb-2 px-5"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        <motion.h1
          variants={fadeUpVariants}
          className="font-display font-semibold mb-3"
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(1.6rem, 4.5vw, 2.9rem)',
            color: '#2a1535',
            letterSpacing: '-0.01em',
            lineHeight: 1.2,
          }}
        >
          Pop the balloons, Mummy!!! 🎈
        </motion.h1>

        {/* Animated surprise counter */}
        <motion.div variants={fadeUpVariants} className="flex justify-center mb-1">
          <div className="counter-badge inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full">
            <Gift size={13} style={{ color: '#c97db0' }} />
            <AnimatePresence mode="wait">
              <motion.span
                key={remaining}
                className="font-medium text-sm tracking-wide"
                style={{ color: '#7a4060', fontFamily: 'Inter, sans-serif' }}
                initial={{ opacity: 0, y: -10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.8 }}
                transition={{ type: 'spring', stiffness: 320, damping: 22 }}
              >
                {remaining === 0
                  ? '🎉 All memories opened!'
                  : `${remaining} surprise${remaining !== 1 ? 's' : ''} remaining`}
              </motion.span>
            </AnimatePresence>
            <Star size={11} style={{ color: '#c97db0', fill: '#c97db0', opacity: 0.72 }} />
          </div>
        </motion.div>

        {/* Hint text */}
        {/* <motion.p
          variants={fadeUpVariants}
          className="text-xs tracking-widest uppercase"
          style={{
            color: '#9a6070',
            opacity: 0.42,
            letterSpacing: '0.22em',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          Tap each balloon to reveal a memory
        </motion.p> */}
      </motion.div>

      {/* Balloon field */}
      <div
        ref={containerRef}
        className="relative z-10"
        style={{
          height: isMobile ? 'calc(100vh - 150px)' : 'calc(100vh - 140px)',
          minHeight: isMobile ? '580px' : '540px',
        }}
        aria-label="Balloon field — tap each balloon to discover a surprise memory"
      >
        {balloonData.map((balloon, index) => {
          if (poppedIds.has(balloon.id)) return null;
          return (
            <div
              key={balloon.id}
              style={{
                position: 'absolute',
                left: positions[index].left,
                top: positions[index].top,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <Balloon
                data={balloon}
                index={index}
                onPop={handlePop}
                physicsRef={registerElement}
              />
            </div>
          );
        })}
      </div>

      {/* Memory modal */}
      <AnimatePresence>
        {activeModal && (
          <MessageModal
            key={`modal-${activeModal.id}`}
            balloon={activeModal}
            onClose={handleCloseModal}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
