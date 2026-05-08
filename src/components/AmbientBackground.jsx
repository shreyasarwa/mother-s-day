import { motion } from 'framer-motion';

// ─── AmbientBackground: layered animated gradient orbs for cinematic depth ────

const configs = {
  home: [
    {
      style: {
        width: '720px',
        height: '720px',
        top: '-220px',
        left: '-160px',
      },
      bg: 'radial-gradient(circle, rgba(255,200,225,0.38) 0%, rgba(255,170,210,0.12) 55%, transparent 100%)',
      duration: 19,
      delay: 0,
      xRange: [0, 22, -14, 0],
      yRange: [0, -18, 12, 0],
    },
    {
      style: {
        width: '620px',
        height: '620px',
        bottom: '-120px',
        right: '-130px',
      },
      bg: 'radial-gradient(circle, rgba(195,240,215,0.32) 0%, rgba(160,220,190,0.1) 55%, transparent 100%)',
      duration: 24,
      delay: 6,
      xRange: [0, -18, 14, 0],
      yRange: [0, 14, -10, 0],
    },
    {
      style: {
        width: '520px',
        height: '520px',
        top: '28%',
        left: '38%',
      },
      bg: 'radial-gradient(circle, rgba(220,200,255,0.25) 0%, rgba(200,175,255,0.07) 60%, transparent 100%)',
      duration: 28,
      delay: 12,
      xRange: [0, 14, -10, 0],
      yRange: [0, -12, 8, 0],
    },
    {
      style: {
        width: '380px',
        height: '380px',
        top: '10%',
        right: '8%',
      },
      bg: 'radial-gradient(circle, rgba(255,240,170,0.22) 0%, transparent 70%)',
      duration: 32,
      delay: 4,
      xRange: [0, 10, -8, 0],
      yRange: [0, 8, -6, 0],
    },
  ],
  balloons: [
    {
      style: {
        width: '820px',
        height: '820px',
        top: '-280px',
        left: '5%',
      },
      bg: 'radial-gradient(circle, rgba(255,205,225,0.32) 0%, transparent 68%)',
      duration: 21,
      delay: 0,
      xRange: [0, 20, -12, 0],
      yRange: [0, -15, 10, 0],
    },
    {
      style: {
        width: '640px',
        height: '640px',
        bottom: '-160px',
        right: '2%',
      },
      bg: 'radial-gradient(circle, rgba(200,245,220,0.32) 0%, transparent 68%)',
      duration: 26,
      delay: 8,
      xRange: [0, -16, 12, 0],
      yRange: [0, 12, -8, 0],
    },
    {
      style: {
        width: '440px',
        height: '440px',
        top: '40%',
        left: '40%',
      },
      bg: 'radial-gradient(circle, rgba(225,210,255,0.22) 0%, transparent 70%)',
      duration: 30,
      delay: 14,
      xRange: [0, 12, -10, 0],
      yRange: [0, -10, 7, 0],
    },
  ],
  final: [
    {
      style: {
        width: '960px',
        height: '960px',
        top: '-340px',
        left: '50%',
        marginLeft: '-480px',
      },
      bg: 'radial-gradient(circle, rgba(255,185,210,0.42) 0%, rgba(255,155,185,0.12) 48%, transparent 78%)',
      duration: 17,
      delay: 0,
      xRange: [0, 16, -10, 0],
      yRange: [0, -12, 8, 0],
    },
    {
      style: {
        width: '540px',
        height: '540px',
        bottom: '-120px',
        left: '-110px',
      },
      bg: 'radial-gradient(circle, rgba(198,245,218,0.38) 0%, transparent 68%)',
      duration: 23,
      delay: 7,
      xRange: [0, 18, -12, 0],
      yRange: [0, 14, -9, 0],
    },
    {
      style: {
        width: '460px',
        height: '460px',
        bottom: '-80px',
        right: '-90px',
      },
      bg: 'radial-gradient(circle, rgba(225,200,255,0.32) 0%, transparent 70%)',
      duration: 27,
      delay: 12,
      xRange: [0, -14, 10, 0],
      yRange: [0, 10, -7, 0],
    },
  ],
};

export default function AmbientBackground({ variant = 'home' }) {
  const orbs = configs[variant] || configs.home;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            background: orb.bg,
            ...orb.style,
          }}
          animate={{
            scale: [1, 1.11, 0.94, 1],
            x: orb.xRange,
            y: orb.yRange,
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: 'easeInOut',
            times: [0, 0.33, 0.66, 1],
          }}
        />
      ))}
    </div>
  );
}
