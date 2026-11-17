import React, { useEffect, useRef, useState } from 'react';

/**
 * CursorAmbientGlow
 * Renders a buttery smooth, organic cursor spotlight that illuminates the dotted canvas.
 * Uses subpixel LERP interpolation to create a weightless luxury feel.
 */
export const CursorAmbientGlow: React.FC = () => {
  const glowRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on touch-only devices or reduced motion
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch || prefersReducedMotion) {
      return;
    }

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let rafId: number;
    let active = true;

    const onPointerMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const onPointerLeave = () => {
      setIsVisible(false);
    };

    const onPointerEnter = () => {
      setIsVisible(true);
    };

    const render = () => {
      // Smooth linear interpolation (LERP)
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }

      if (active) {
        rafId = requestAnimationFrame(render);
      }
    };

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    document.addEventListener('mouseleave', onPointerLeave);
    document.addEventListener('mouseenter', onPointerEnter);

    rafId = requestAnimationFrame(render);

    return () => {
      active = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onPointerMove);
      document.removeEventListener('mouseleave', onPointerLeave);
      document.removeEventListener('mouseenter', onPointerEnter);
    };
  }, [isVisible]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-1 overflow-hidden transition-opacity duration-700 select-none"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <div
        ref={glowRef}
        className="absolute top-0 left-0 w-[420px] h-[420px] rounded-full pointer-events-none will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(13, 79, 73, 0.12) 0%, rgba(13, 79, 73, 0.04) 45%, transparent 70%)',
          filter: 'blur(10px)',
        }}
      />
    </div>
  );
};
