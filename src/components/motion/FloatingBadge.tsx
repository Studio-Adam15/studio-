import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { GlassSurface } from '../GlassSurface';

interface FloatingBadgeProps {
  children?: ReactNode;
  icon?: ReactNode;
  text: string;
  subtext?: string;
  className?: string;
  theme?: 'light' | 'petrol';
  delay?: number;
  duration?: number;
  amplitude?: number;
  glow?: boolean;
  onClick?: () => void;
}

/**
 * Interactive Floating Badge inspired by Saleem & React Bits GlassSurface.
 * Has smooth spring hovering, subtle organic physics bobbing, and frosted glass refraction.
 */
export const FloatingBadge: React.FC<FloatingBadgeProps> = ({
  children,
  icon,
  text,
  subtext,
  className = '',
  theme = 'light',
  delay = 0,
  duration = 5,
  amplitude = 7,
  glow = false,
  onClick,
}) => {
  const isPetrol = theme === 'petrol';

  const glowStyles = glow
    ? isPetrol
      ? 'animate-lp-glow-light'
      : 'animate-lp-glow'
    : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        scale: 1.03,
        y: -2,
        transition: { duration: 0.18, ease: 'easeOut' },
      }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`inline-block select-none cursor-pointer ${glowStyles}`}
    >
      <GlassSurface
        borderRadius={18}
        blur={6}
        theme={isPetrol ? 'dark' : 'light'}
        backgroundOpacity={isPetrol ? 0.9 : 0.75}
        className={`px-3.5 py-2 inline-flex items-center gap-2.5 transition-colors border ${
          isPetrol
            ? 'border-[#F5F0E6]/30 text-[#F5F0E6]'
            : 'border-[#124E52]/20 text-[#124E52]'
        } ${className}`}
      >
        {/* Icon or Status Indicator */}
        {icon ? (
          <span className="shrink-0">{icon}</span>
        ) : (
          <span
            className={`w-2 h-2 rounded-full shrink-0 ${
              isPetrol ? 'bg-[#F5F0E6] shadow-xs' : 'bg-[#124E52]'
            }`}
          />
        )}

        {/* Text Hierarchy */}
        <div className="flex flex-col text-start leading-tight">
          <span className="text-xs font-black tracking-tight">
            <bdi>{text}</bdi>
          </span>
          {subtext && (
            <span
              className={`text-[10px] font-medium mt-0.5 ${
                isPetrol ? 'text-[#F5F0E6]/75' : 'text-[#124E52]/65'
              }`}
            >
              <bdi>{subtext}</bdi>
            </span>
          )}
        </div>

        {children}
      </GlassSurface>
    </motion.div>
  );
};
