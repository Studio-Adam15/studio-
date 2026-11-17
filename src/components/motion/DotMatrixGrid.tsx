import React from 'react';

interface DotMatrixGridProps {
  className?: string;
  theme?: 'light' | 'dark' | 'petrol';
  fade?: 'radial' | 'top' | 'full' | 'none';
  opacity?: number;
}

/**
 * High-precision architectural dot matrix background canvas
 * Inspired by Saleem's `.lp-dots` grid pattern.
 */
export const DotMatrixGrid: React.FC<DotMatrixGridProps> = ({
  className = 'absolute inset-0 pointer-events-none',
  theme = 'light',
  fade = 'radial',
  opacity = 0.65,
}) => {
  const dotPatternClass =
    theme === 'dark' || theme === 'petrol'
      ? 'bg-dot-matrix-light'
      : 'bg-dot-matrix';

  const maskClass =
    fade === 'radial'
      ? 'mask-radial-fade'
      : fade === 'top'
      ? 'mask-top-fade'
      : '';

  return (
    <div
      className={`${className} ${dotPatternClass} ${maskClass}`}
      style={{ opacity }}
      aria-hidden="true"
    />
  );
};
