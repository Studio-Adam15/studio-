import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface FadeInSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'none';
  amount?: number | 'some' | 'all';
}

/**
 * Reusable subtle fade-in scroll animation using Framer Motion.
 * Designed for minimalist aesthetics: gentle opacity and slight vertical rise
 * without jarring or distracting movements.
 */
export const FadeInSection: React.FC<FadeInSectionProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  amount = 0.02,
}) => {
  const initialY = direction === 'up' ? 12 : direction === 'down' ? -12 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: initialY }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{
        duration: 0.45,
        delay,
        ease: [0.22, 1, 0.36, 1], // Smooth cubic ease-out
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
