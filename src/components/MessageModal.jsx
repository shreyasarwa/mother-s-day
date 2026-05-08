import { AnimatePresence, motion } from 'framer-motion';
import { X, Heart } from 'lucide-react';
import { useEffect, useCallback, useState } from 'react';
import { modalVariants } from '../animations/variants';

// ─── MessageModal: cinematic polaroid / scrapbook memory card ─────────────────

export default function MessageModal({ balloon, onClose }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  // Close on Escape key
  const handleKey = useCallback(
    (e) => { if (e.key === 'Escape') onClose(); },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [handleKey]);

  if (!balloon) return null;

  // Subtle natural rotation — different for each balloon, handcrafted feel
  const rotation = ((balloon.id % 5) - 2) * 1.4;

  return (
    <AnimatePresence>
      {/* Cinematic backdrop */}
      <motion.div
        key="backdrop"
        className="modal-backdrop flex items-center justify-center p-4 py-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.38, ease: 'easeInOut' }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label="Memory card"
      >
        {/* Scrapbook tape decoration — top of card */}
        <motion.div
          className="absolute pointer-events-none"
          style={{
            top: 'calc(50% - 260px)',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 110,
          }}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.25, duration: 0.35 }}
        >
          <div
            style={{
              width: '64px',
              height: '22px',
              background: 'rgba(255,245,220,0.75)',
              borderRadius: '3px',
              transform: `rotate(${rotation * 0.6}deg)`,
              boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
              border: '1px solid rgba(220,200,160,0.4)',
            }}
          />
        </motion.div>

        {/* Card — stop propagation so clicks inside don't close */}
        <motion.div
          key="card"
          variants={modalVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
          style={{
            rotate: rotation,
            maxWidth: '440px',
            width: '100%',
            zIndex: 105,
          }}
          className="polaroid rounded-2xl overflow-hidden relative"
        >
          {/* Top gradient color strip — balloon's unique color */}
          <div
            className="h-2.5 w-full"
            style={{
              background: `linear-gradient(90deg, ${balloon.colors.top}, ${balloon.colors.middle}, ${balloon.colors.top})`,
              backgroundSize: '200% 100%',
            }}
          />

          <div className="p-5 pb-7">
            {/* Image area */}
            <div
              className="w-full rounded-xl overflow-hidden mb-5 relative"
              style={{
                aspectRatio: '4/3',
                background: `linear-gradient(135deg, ${balloon.colors.shine}66, ${balloon.colors.top}44)`,
              }}
            >
              {balloon.image ? (
                <>
                  {/* Blur placeholder while loading */}
                  {!imgLoaded && (
                    <div
                      className="absolute inset-0 flex flex-col items-center justify-center gap-2"
                      style={{
                        background: `linear-gradient(135deg, ${balloon.colors.shine}88, ${balloon.colors.top}55)`,
                      }}
                    >
                      <motion.span
                        style={{ fontSize: '2.5rem' }}
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        {balloon.label}
                      </motion.span>
                    </div>
                  )}
                  <motion.img
                    src={balloon.image}
                    alt={balloon.title}
                    className="w-full h-full object-cover"
                    style={{
                      display: 'block',
                      opacity: imgLoaded ? 1 : 0,
                      transition: 'opacity 0.5s ease',
                    }}
                    onLoad={() => setImgLoaded(true)}
                  />
                </>
              ) : (
                /* Fallback placeholder */
                <div
                  className="w-full h-full flex flex-col items-center justify-center gap-3"
                  style={{
                    background: `linear-gradient(135deg, ${balloon.colors.shine}88, ${balloon.colors.top}55, ${balloon.colors.middle}33)`,
                  }}
                >
                  <span style={{ fontSize: '3.5rem' }}>{balloon.label}</span>
                  <span
                    className="text-xs tracking-widest uppercase font-medium opacity-60"
                    style={{ color: balloon.colors.middle }}
                  >
                    A treasured moment
                  </span>
                </div>
              )}

              {/* Soft vignette over image */}
              <div
                className="absolute inset-0 pointer-events-none rounded-xl"
                style={{
                  background:
                    'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.08) 100%)',
                }}
              />

              {/* Scrapbook corner tapes */}
              <div
                className="absolute top-1.5 left-1.5 w-6 h-6 pointer-events-none"
                style={{
                  background: 'rgba(255,245,220,0.5)',
                  clipPath: 'polygon(0 0, 100% 0, 0 100%)',
                  borderRadius: '2px',
                }}
              />
              <div
                className="absolute top-1.5 right-1.5 w-6 h-6 pointer-events-none"
                style={{
                  background: 'rgba(255,245,220,0.5)',
                  clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
                  borderRadius: '2px',
                }}
              />
            </div>

            {/* Title */}
            <h3
              className="font-display text-xl font-semibold mb-3 text-center"
              style={{
                color: '#2a1a2e',
                lineHeight: 1.3,
                fontFamily: 'Cormorant Garamond, serif',
                letterSpacing: '0.01em',
              }}
            >
              {balloon.title}
            </h3>

            {/* Decorative divider */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className="flex-1 h-px"
                style={{
                  background: `linear-gradient(to right, transparent, ${balloon.colors.middle}55)`,
                }}
              />
              <Heart
                size={11}
                style={{ color: balloon.colors.middle, fill: balloon.colors.middle }}
              />
              <div
                className="flex-1 h-px"
                style={{
                  background: `linear-gradient(to left, transparent, ${balloon.colors.middle}55)`,
                }}
              />
            </div>

            {/* Message */}
            <p
              className="leading-relaxed text-center font-light"
              style={{
                color: '#4a3040',
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(0.98rem, 2.2vw, 1.08rem)',
                lineHeight: 1.8,
              }}
            >
              {balloon.message}
            </p>

            {/* Bottom note */}
            <p
              className="text-center mt-5 text-xs tracking-widest uppercase opacity-40 font-medium"
              style={{
                letterSpacing: '0.22em',
                color: '#7a5060',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              With all my love ❤️
            </p>
          </div>

          {/* Close button */}
          <motion.button
            id={`close-modal-${balloon.id}`}
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
            style={{
              background: 'rgba(255,255,255,0.65)',
              border: '1px solid rgba(200,150,170,0.3)',
              backdropFilter: 'blur(8px)',
            }}
            whileHover={{ scale: 1.15, background: 'rgba(255,255,255,0.85)' }}
            whileTap={{ scale: 0.9 }}
            aria-label="Close memory card"
          >
            <X size={13} strokeWidth={2.5} style={{ color: '#7a5060' }} />
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
