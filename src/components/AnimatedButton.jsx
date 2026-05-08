import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// ─── AnimatedButton: premium CTA with flowing shimmer ────────────────────────
export default function AnimatedButton({ children, to, onClick, className = '', id }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) onClick();
    if (to) {
      setTimeout(() => navigate(to), 140);
    }
  };

  return (
    <motion.button
      id={id}
      className={`btn-magic relative px-8 py-4 text-base font-medium tracking-wide ${className}`}
      onClick={handleClick}
      whileHover={{ scale: 1.04, y: -3 }}
      whileTap={{ scale: 0.97, y: 0 }}
      transition={{ type: 'spring', stiffness: 340, damping: 22 }}
    >
      {/* Shimmer sweep effect */}
      <span
        className="absolute inset-0 rounded-full overflow-hidden pointer-events-none"
        aria-hidden="true"
        style={{ display: 'block' }}
      >
        <motion.span
          className="absolute top-0 h-full"
          style={{
            width: '45%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)',
          }}
          animate={{ left: ['-50%', '140%'] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'linear', delay: 0.8 }}
        />
      </span>

      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
