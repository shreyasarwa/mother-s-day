import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import FloatingFlowers from '../components/FloatingFlowers';
import AmbientBackground from '../components/AmbientBackground';
import AnimatedButton from '../components/AnimatedButton';
import mom1 from '../data/mom1.jpeg';
import {
  pageVariants,
  containerVariants,
  fadeUpVariants,
  floatVariants,
} from '../animations/variants';

// ─── Home page — cinematic landing experience ─────────────────────────────────

export default function Home() {
  return (
    <motion.div
      className="page-wrapper bg-ambient relative flex flex-col items-center justify-center min-h-screen overflow-hidden"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Layered ambient background orbs */}
      <AmbientBackground variant="home" />

      {/* Floating flower particles */}
      <FloatingFlowers count={24} />

      {/* Subtle noise texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          opacity: 0.018,
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <motion.div
        className="relative flex flex-col items-center text-center px-6 py-12"
        variants={containerVariants}
        initial="initial"
        animate="animate"
        style={{ maxWidth: '660px', width: '100%', zIndex: 10 }}
      >
        {/* Eyebrow line */}
        <motion.div
          variants={fadeUpVariants}
          className="mb-5 flex items-center gap-3"
        >
          <div
            className="h-px w-12"
            style={{ background: 'linear-gradient(to right, transparent, rgba(200,120,160,0.4))' }}
          />
          <span
            className="text-xs tracking-[0.32em] uppercase font-medium"
            style={{ color: '#9a5080', opacity: 0.65, fontFamily: 'Inter, sans-serif' }}
          >
            A message crafted with love
          </span>
          <div
            className="h-px w-12"
            style={{ background: 'linear-gradient(to left, transparent, rgba(200,120,160,0.4))' }}
          />
        </motion.div>

        {/* Floating crown */}
        <motion.div
          variants={fadeUpVariants}
          className="crown-float mb-1 select-none"
          style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1 }}
          aria-hidden="true"
        >
          👑
        </motion.div>

        {/* Portrait circle */}
        <motion.div
          variants={fadeUpVariants}
          className="relative mb-7 mt-2"
        >
          {/* Outermost soft ambient glow */}
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              inset: '-28px',
              background:
                'radial-gradient(circle, rgba(255,140,170,0.22) 0%, rgba(255,100,150,0.08) 50%, transparent 75%)',
            }}
            animate={{ scale: [1, 1.12, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Middle rotating gradient ring */}
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              inset: '-8px',
              background:
                'conic-gradient(from 0deg, rgba(255,160,190,0.5), rgba(200,150,255,0.3), rgba(150,220,180,0.3), rgba(255,200,130,0.3), rgba(255,160,190,0.5))',
              opacity: 0.6,
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          />

          {/* White border ring */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              inset: '-4px',
              background: 'rgba(255,255,255,0.88)',
            }}
          />

          {/* Floating photo circle */}
          <motion.div
            className="relative rounded-full overflow-hidden image-glow"
            style={{
              width: 'clamp(170px, 32vw, 230px)',
              height: 'clamp(170px, 32vw, 230px)',
              border: '3px solid rgba(255,255,255,0.9)',
              boxShadow:
                '0 8px 32px rgba(255,140,170,0.28), 0 2px 8px rgba(0,0,0,0.08)',
              position: 'relative',
              zIndex: 2,
            }}
            variants={floatVariants}
            animate="animate"
          >
            <img
              src={mom1}
              alt="Mummy — the most beautiful person in the world"
              className="w-full h-full object-cover"
              style={{ display: 'block' }}
              loading="eager"
            />

            {/* Inner soft vignette overlay */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle at center, transparent 55%, rgba(255,180,200,0.18) 100%)',
              }}
            />
          </motion.div>
        </motion.div>

        {/* "You're a Queen 👑" */}
        <motion.div variants={fadeUpVariants} className="mb-3">
          <motion.p
            className="font-display font-light tracking-wide"
            style={{
              background:
                'linear-gradient(135deg, #c23b8a 0%, #9b59ff 50%, #e84393 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontFamily: 'Cormorant Garamond, serif',
              fontStyle: 'italic',
              fontSize: 'clamp(1.4rem, 3.5vw, 2.4rem)',
            }}
          >
            You&apos;re a Queen 👑
          </motion.p>
        </motion.div>

        {/* Main heading */}
        <motion.div variants={fadeUpVariants}>
          <h1
            className="font-display font-semibold mb-5"
            style={{
              color: '#2a1535',
              fontFamily: 'Cormorant Garamond, serif',
              letterSpacing: '-0.01em',
              lineHeight: 1.2,
              fontSize: 'clamp(1.9rem, 5.5vw, 3.8rem)',
            }}
          >
            Happy Mother&apos;s Day,
            <br />
            <span
              style={{
                background:
                  'linear-gradient(135deg, #e84393 0%, #c23b8a 50%, #9b59ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Mummy!!! ❤️🌍🪷✨
            </span>
          </h1>
        </motion.div>

        {/* Emotional subtitle */}
        <motion.div variants={fadeUpVariants} className="mb-9">
          <p
            className="font-light"
            style={{
              color: '#5a3550',
              fontFamily: 'Cormorant Garamond, serif',
              fontStyle: 'italic',
              maxWidth: '500px',
              lineHeight: 1.75,
              fontSize: 'clamp(1rem, 2vw, 1rem)',
            }}
          >
            You are the warmth behind every beautiful thing in my life.
            <br />I've prepared something special for you. Pop all the balloons on the next screen to uncover! 💕⬇️
          </p>
        </motion.div>

        {/* Glassmorphism card wrapper for button */}
        <motion.div variants={fadeUpVariants}>
          <div
            className="glass rounded-3xl px-8 py-7 mb-6 flex flex-col items-center gap-4"
            style={{
              boxShadow:
                '0 4px 32px rgba(200,120,180,0.1), 0 1px 4px rgba(200,120,180,0.06)',
              border: '1px solid rgba(255,255,255,0.55)',
            }}
          >
            <div className="flex items-center gap-2">
              <Sparkles size={13} style={{ color: '#c97db0', opacity: 0.7 }} />
              <span
                className="text-xs tracking-[0.26em] uppercase font-medium"
                style={{ color: '#9a5080', opacity: 0.68, fontFamily: 'Inter, sans-serif' }}
              >
                surprises inside
              </span>
              <Sparkles size={13} style={{ color: '#c97db0', opacity: 0.7 }} />
            </div>

            <AnimatedButton
              id="start-magic-btn"
              to="/balloons"
              className="text-base px-10 py-4"
            >
              Start The Magic ✨
            </AnimatedButton>
          </div>
        </motion.div>

        {/* Bottom signature hint */}
        <motion.div
          variants={fadeUpVariants}
          className="flex items-center gap-2"
        >
          <Heart size={10} style={{ color: '#e84393', fill: '#e84393', opacity: 0.55 }} />
          <p
            className="text-xs tracking-widest uppercase"
            style={{ color: '#9a7080', opacity: 0.5, letterSpacing: '0.22em', fontFamily: 'Inter, sans-serif' }}
          >
            From your child, always
          </p>
          <Heart size={10} style={{ color: '#e84393', fill: '#e84393', opacity: 0.55 }} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
