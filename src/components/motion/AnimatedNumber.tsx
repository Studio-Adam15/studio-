import React, { useEffect, useState } from 'react';

interface AnimatedNumberProps {
  value: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}

/**
 * AnimatedNumber
 * Smoothly interpolates numeric values using a spring-eased RAF loop.
 * Provides satisfying, tactile live feedback as sliders or options change.
 */
export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  className = '',
  prefix = '',
  suffix = '',
}) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const startValue = displayValue;
    const endValue = value;
    const duration = 280; // ms

    if (startValue === endValue) return;

    let frameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Smooth cubic out ease
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startValue + (endValue - startValue) * ease);
      
      setDisplayValue(current);

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      }
    };

    frameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [value, displayValue]);

  return (
    <span className={`inline-block tabular-nums font-mono ${className}`}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
};
