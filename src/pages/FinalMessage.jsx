import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

import FloatingFlowers from '../components/FloatingFlowers';
import AmbientBackground from '../components/AmbientBackground';
import ConfettiEffect from '../components/ConfettiEffect';
import { useSound } from '../hooks/useSound';
import {
  pageVariants,
  containerVariants,
  fadeUpVariants,
  celebrationCard,
} from '../animations/variants';

// ─── FinalMessage: cinematic celebration ending ───────────────────────────────

// Animated sparkle dot decoration
function SparkleRow() {
  return (
    <div className="flex items-center justify-center gap-3 mb-7" aria-hidden="true">
      {['✦', '✧', '✦', '✧', '✦'].map((s, i) => (
        <motion.span
          key={i}
          style={{ color: '#c97db0', opacity: 0.5, fontSize: '0.6rem' }}
          animate={{ opacity: [0.28, 0.68, 0.28], scale: [0.88, 1.22, 0.88] }}
          transition={{ duration: 2.2, delay: i * 0.24, repeat: Infinity, ease: 'easeInOut' }}
        >
          {s}
        </motion.span>
      ))}
    </div>
  );
}

export default function FinalMessage() {
  const { playSparkle } = useSound();
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    if (!hasPlayedRef.current) {
      hasPlayedRef.current = true;
      setTimeout(() => playSparkle(), 700);
    }
  }, [playSparkle]);

  return (
    <motion.div
      className="page-wrapper bg-final-page relative flex flex-col items-center justify-center min-h-screen overflow-hidden px-4 py-14"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Effects */}
      <AmbientBackground variant="final" />
      <FloatingFlowers count={28} />
      <ConfettiEffect trigger={true} />

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center w-full"
        variants={containerVariants}
        initial="initial"
        animate="animate"
        style={{ maxWidth: '620px' }}
      >
        {/* Celebration emoji burst */}
        <motion.div
          variants={fadeUpVariants}
          className="mb-3 select-none"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 4.2rem)', lineHeight: 1 }}
        >
          🎊
        </motion.div>

        {/* Floating crown */}
        {/* <motion.div
          variants={fadeUpVariants}
          className="mb-4 crown-float select-none"
          style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)' }}
          aria-hidden="true"
        >
          👑
        </motion.div> */}

        {/* Main celebration card */}
        <motion.div
          variants={celebrationCard}
          className="polaroid rounded-3xl overflow-hidden w-full mb-9"
          style={{
            boxShadow:
              '0 4px 16px rgba(200,140,180,0.1), 0 24px 72px rgba(200,140,180,0.18), 0 2px 4px rgba(0,0,0,0.04)',
          }}
        >
          {/* Rainbow gradient strip */}
          <motion.div
            className="h-2.5"
            style={{
              background: 'linear-gradient(90deg, #ff85a1, #c77dff, #78d9b0, #f9c784, #ff85a1)',
              backgroundSize: '300% 100%',
            }}
            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="px-8 py-10 md:px-12 md:py-12 text-center">
            <SparkleRow />

            {/* Main heading */}
            <motion.h1
              variants={fadeUpVariants}
              className="font-display font-semibold mb-7"
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(1.95rem, 5.5vw, 3.1rem)',
                color: '#2a1535',
                lineHeight: 1.18,
                letterSpacing: '-0.015em',
              }}
            >
              No matter how grown up I become,
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #e84393 0%, #c23b8a 40%, #9b59ff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontStyle: 'italic',
                }}
              >
                I'll always be your little child, Mummy ❤️
              </span>
            </motion.h1>

            {/* Decorative flower divider */}
            <motion.div variants={fadeUpVariants} className="flex items-center gap-4 mb-8">
              <div
                className="flex-1 h-px"
                style={{ background: 'linear-gradient(to right, transparent, rgba(200,150,180,0.3))' }}
              />
              <div className="flex gap-2" aria-hidden="true">
                {['🌸', '🪷', '🌸'].map((f, i) => (
                  <motion.span
                    key={i}
                    style={{ fontSize: '0.95rem' }}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2.8, delay: i * 0.35, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    {f}
                  </motion.span>
                ))}
              </div>
              <div
                className="flex-1 h-px"
                style={{ background: 'linear-gradient(to left, transparent, rgba(200,150,180,0.3))' }}
              />
            </motion.div>

            {/* Emotional message paragraphs */}
            <motion.div variants={containerVariants} initial="initial" animate="animate">
              {[
                "Mummy ❤️",
                "You are the reason I know what unconditional love feels like.",
                "Thank you for every sleepless night, every sacrifice, every prayer, and every moment you chose my happiness over your own.I may not say it enough, but I notice everything you do for me.",
                "No matter how old I grow, I will always need your love, your hugs, and your presence in my life.",
              ].map((para, i) => (
                <motion.p
                  key={i}
                  variants={fadeUpVariants}
                  className="mb-4 font-light"
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: 'clamp(1rem, 2.5vw, 1.18rem)',
                    color: '#4a3040',
                    lineHeight: 1.82,
                    fontStyle: i === 2 ? 'italic' : 'normal',
                  }}
                >
                  {para}
                </motion.p>
              ))}

              {/* Highlighted closing quote */}
              <motion.div
                variants={fadeUpVariants}
                className="my-7 py-6 px-7 rounded-2xl"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(255,200,220,0.28), rgba(220,200,255,0.22), rgba(200,240,220,0.18))',
                  border: '1px solid rgba(255,180,210,0.28)',
                }}
              >
                <p
                  className="font-semibold"
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: 'clamp(1.15rem, 3vw, 1.48rem)',
                    color: '#2a1535',
                    lineHeight: 1.55,
                    fontStyle: 'italic',
                  }}
                >
                  &ldquo;I love you more than words, more than time, more than I will ever
                  be able to express. You are my queen. Forever and always.&rdquo; 👑❤️
                </p>
              </motion.div>

              <motion.p
                variants={fadeUpVariants}
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 'clamp(1rem, 2.3vw, 1.14rem)',
                  color: '#4a3040',
                  lineHeight: 1.78,
                }}
              >
                Thank you for every silent sacrifice, every prayer, and every little thing you do for me, Mummy 👑❤️
                You deserve all the happiness and love in the world 🌸
              </motion.p>
            </motion.div>

            {/* Signature */}
            <motion.div
              variants={fadeUpVariants}
              className="mt-9 pt-6 border-t"
              style={{ borderColor: 'rgba(200,150,180,0.2)' }}
            >
              <div className="flex items-center justify-center gap-2 mb-2.5">
                <Heart size={11} style={{ color: '#e84393', fill: '#e84393' }} />
                <span
                  className="text-xs tracking-widest uppercase font-medium"
                  style={{ color: '#9a5080', opacity: 0.65, letterSpacing: '0.22em', fontFamily: 'Inter, sans-serif' }}
                >
                  Crafted with love
                </span>
                <Heart size={11} style={{ color: '#e84393', fill: '#e84393' }} />
              </div>
              <p
                className="font-display font-light"
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '1.3rem',
                  color: '#7a4060',
                  fontStyle: 'italic',
                }}
              >
                — Your child, always ❤️
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Floating emoji celebration row */}
        {/* <motion.div
          variants={fadeUpVariants}
          className="flex items-center gap-3 md:gap-4 select-none flex-wrap justify-center"
          aria-hidden="true"
        >
          {['🎊', '🌸', '💝', '🪷', '✨', '💝', '🌸', '🎊'].map((e, i) => (
            <motion.span
              key={i}
              style={{ fontSize: 'clamp(1.1rem, 2.8vw, 1.7rem)' }}
              animate={{ y: [0, -9, 0], rotate: [0, i % 2 === 0 ? 12 : -12, 0] }}
              transition={{
                duration: 2.6 + i * 0.22,
                delay: i * 0.18,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {e}
            </motion.span>
          ))}
        </motion.div> */}
      </motion.div>
    </motion.div>
  );
}
