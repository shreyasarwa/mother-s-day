import { useEffect, useRef, useCallback } from 'react';

// ─── useBalloonPhysics: smooth spring-based cursor repulsion ──────────────────
// Balloons gently drift away from the cursor for a tactile, organic feel.
// Uses requestAnimationFrame with spring physics for smooth 60fps motion.

const REPULSE_RADIUS = 130;
const REPULSE_STRENGTH = 0.75;
const DAMPING = 0.86;
const RETURN_STRENGTH = 0.035;

export function useBalloonPhysics(count = 8) {
  const positionsRef = useRef([]);
  const velocitiesRef = useRef([]);
  const rafRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const elementsRef = useRef([]);
  const activeRef = useRef(true);

  const registerElement = useCallback((id, el) => {
    elementsRef.current[id] = el;
  }, []);

  useEffect(() => {
    // Initialize physics state
    for (let i = 0; i < count; i++) {
      positionsRef.current[i] = { x: 0, y: 0 };
      velocitiesRef.current[i] = { x: 0, y: 0 };
    }

    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    // Touch support — also react to touch position
    const onTouchMove = (e) => {
      if (e.touches[0]) {
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchEnd = () => {
      // Gradually return mouse to off-screen after touch
      setTimeout(() => {
        mouseRef.current = { x: -9999, y: -9999 };
      }, 800);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    const tick = () => {
      if (!activeRef.current) return;

      elementsRef.current.forEach((el, i) => {
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = cx - mouseRef.current.x;
        const dy = cy - mouseRef.current.y;
        const dist = Math.hypot(dx, dy);

        // Apply repulsion force if cursor is close enough
        if (dist < REPULSE_RADIUS && dist > 1) {
          const force = ((REPULSE_RADIUS - dist) / REPULSE_RADIUS) * REPULSE_STRENGTH;
          velocitiesRef.current[i].x += (dx / dist) * force * 4.5;
          velocitiesRef.current[i].y += (dy / dist) * force * 4.5;
        }

        // Spring return to origin
        velocitiesRef.current[i].x -= positionsRef.current[i].x * RETURN_STRENGTH;
        velocitiesRef.current[i].y -= positionsRef.current[i].y * RETURN_STRENGTH;

        // Apply damping
        velocitiesRef.current[i].x *= DAMPING;
        velocitiesRef.current[i].y *= DAMPING;

        // Clamp max displacement to avoid balloons going off screen
        positionsRef.current[i].x = Math.max(-60, Math.min(60,
          positionsRef.current[i].x + velocitiesRef.current[i].x
        ));
        positionsRef.current[i].y = Math.max(-50, Math.min(50,
          positionsRef.current[i].y + velocitiesRef.current[i].y
        ));

        // Apply via direct style manipulation (avoids React re-renders)
        const px = positionsRef.current[i].x;
        const py = positionsRef.current[i].y;

        // Only update DOM if movement is meaningful (saves GPU)
        if (Math.abs(px) > 0.3 || Math.abs(py) > 0.3) {
          el.style.transform = `translate(${px.toFixed(2)}px, ${py.toFixed(2)}px)`;
        }
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      activeRef.current = false;
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [count]);

  return { registerElement };
}
