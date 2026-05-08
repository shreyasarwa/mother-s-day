// ─── Shared Framer Motion animation variants ───────────────────────────────

// Page-level transitions
export const pageVariants = {
  initial: {
    opacity: 0,
    y: 16,
    filter: 'blur(8px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.85,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.12,
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    filter: 'blur(6px)',
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

// Stagger container
export const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

// Cinematic fade up — children
export const fadeUpVariants = {
  initial: { opacity: 0, y: 28, filter: 'blur(4px)' },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.75,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Soft fade in
export const fadeInVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.8, ease: 'easeInOut' },
  },
};

// Scale pop — for balloon pop
export const scalePop = {
  initial: { scale: 0, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 320,
      damping: 22,
    },
  },
  exit: {
    scale: 1.35,
    opacity: 0,
    transition: { duration: 0.22, ease: 'easeOut' },
  },
};

// Modal spring entrance
export const modalVariants = {
  initial: {
    opacity: 0,
    scale: 0.82,
    y: 24,
    filter: 'blur(8px)',
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 280,
      damping: 26,
      mass: 0.9,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.88,
    y: 16,
    filter: 'blur(6px)',
    transition: {
      duration: 0.32,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

// Floating image
export const floatVariants = {
  animate: {
    y: [0, -16, 0],
    transition: {
      duration: 5.5,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'loop',
    },
  },
};

// Stagger children — fast
export const staggerFast = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
};

// Balloon entrance
export const balloonEntrance = {
  initial: { opacity: 0, scale: 0.4, y: 40 },
  animate: (i) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20,
      delay: i * 0.09,
    },
  }),
};

// Celebration card
export const celebrationCard = {
  initial: { opacity: 0, scale: 0.7, rotate: -2 },
  animate: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 180,
      damping: 22,
      delay: 0.3,
    },
  },
};
