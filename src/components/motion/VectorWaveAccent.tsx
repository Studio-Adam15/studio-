import React from 'react';
import { motion } from 'framer-motion';

interface VectorWaveAccentProps {
  className?: string;
  variant?: 'hero' | 'wave' | 'pulse' | 'compact' | 'flow';
  color?: string;
  secondaryColor?: string;
  interactive?: boolean;
}

/**
 * Kinetic Vector Waves & Animated Waveform Lines inspired by Saleem (lp-ecg / lp-draw).
 * Renders smooth flowing mathematical curves, animated dashes, and pulsing node anchors
 * with Studio Adam's deep petrol teal (#124E52) & ivory palette.
 */
export const VectorWaveAccent: React.FC<VectorWaveAccentProps> = ({
  className = 'w-full h-24',
  variant = 'hero',
  color = '#124E52',
  secondaryColor = 'rgba(18, 78, 82, 0.25)',
  interactive = true,
}) => {
  if (variant === 'pulse') {
    // Architectural Pulse Wave (Heartbeat / Tech pulse line)
    return (
      <div className={`relative overflow-hidden select-none pointer-events-none ${className}`}>
        <svg
          viewBox="0 0 800 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          {/* Subtle guide baseline */}
          <line
            x1="0"
            y1="60"
            x2="800"
            y2="60"
            stroke={secondaryColor}
            strokeWidth="1"
            strokeDasharray="4 6"
          />

          {/* Flowing animated pulse path */}
          <motion.path
            d="M0 60 L240 60 L260 40 L280 80 L300 20 L320 95 L340 50 L360 65 L380 60 L800 60"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0.2, pathOffset: 0 }}
            animate={{
              pathOffset: [0, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          {/* Node points along the pulse */}
          <circle cx="300" cy="20" r="3.5" fill={color} />
          <circle cx="320" cy="95" r="2.5" fill={color} />
        </svg>
      </div>
    );
  }

  if (variant === 'compact') {
    // Compact micro-wave for badges or card headers
    return (
      <div className={`relative overflow-hidden select-none pointer-events-none ${className}`}>
        <svg
          viewBox="0 0 160 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <motion.path
            d="M2 18 C30 6, 50 30, 80 18 C110 6, 130 30, 158 18"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
          />
          <motion.circle
            cx="80"
            cy="18"
            r="3"
            fill={color}
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
      </div>
    );
  }

  if (variant === 'flow') {
    // Flowing undulating wave divider
    return (
      <div className={`relative overflow-hidden select-none pointer-events-none ${className}`}>
        <svg
          viewBox="0 0 1200 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={color} stopOpacity="0" />
              <stop offset="30%" stopColor={color} stopOpacity="0.8" />
              <stop offset="70%" stopColor={color} stopOpacity="0.8" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Primary Harmonic Curve */}
          <path
            d="M0 60 C300 15, 450 105, 750 45 C950 5, 1100 80, 1200 60"
            stroke="url(#waveGradient)"
            strokeWidth="2"
            fill="none"
            className="animate-lp-wave"
          />

          {/* Secondary Ghost Line */}
          <path
            d="M0 60 C250 85, 520 30, 800 80 C1000 110, 1150 45, 1200 60"
            stroke={secondaryColor}
            strokeWidth="1.5"
            strokeDasharray="6 8"
            fill="none"
            className="animate-lp-dash opacity-70"
          />
        </svg>
      </div>
    );
  }

  // Default: 'hero' dynamic multi-layered vector wave
  return (
    <div className={`relative overflow-hidden select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 1000 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="heroWaveGradient1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={color} stopOpacity="0.05" />
            <stop offset="35%" stopColor={color} stopOpacity="0.45" />
            <stop offset="65%" stopColor={color} stopOpacity="0.45" />
            <stop offset="100%" stopColor={color} stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="heroWaveGradient2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={color} stopOpacity="0" />
            <stop offset="50%" stopColor={color} stopOpacity="0.7" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Ambient Grid Lines */}
        <line x1="100" y1="0" x2="100" y2="200" stroke={secondaryColor} strokeWidth="1" strokeDasharray="3 6" />
        <line x1="300" y1="0" x2="300" y2="200" stroke={secondaryColor} strokeWidth="1" strokeDasharray="3 6" />
        <line x1="500" y1="0" x2="500" y2="200" stroke={secondaryColor} strokeWidth="1" strokeDasharray="3 6" />
        <line x1="700" y1="0" x2="700" y2="200" stroke={secondaryColor} strokeWidth="1" strokeDasharray="3 6" />
        <line x1="900" y1="0" x2="900" y2="200" stroke={secondaryColor} strokeWidth="1" strokeDasharray="3 6" />

        {/* Background Wide Kinetic Ribbon */}
        <path
          d="M0 130 C200 40, 400 170, 600 90 C800 20, 920 150, 1000 100"
          stroke="url(#heroWaveGradient1)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          className="animate-lp-wave"
        />

        {/* Crisp Forefront Wave with Moving Dash Offset */}
        <path
          d="M0 100 C250 170, 450 30, 700 140 C850 190, 950 70, 1000 110"
          stroke="url(#heroWaveGradient2)"
          strokeWidth="2.5"
          strokeDasharray="16 12"
          strokeLinecap="round"
          fill="none"
          className="animate-lp-dash"
        />

        {/* Floating Kinetic Coordinate Nodes */}
        <motion.g
          animate={{
            x: [0, 8, 0],
            y: [0, -12, 0],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        >
          <circle cx="320" cy="98" r="4.5" fill={color} opacity="0.8" />
          <circle cx="320" cy="98" r="8" stroke={color} strokeWidth="1" opacity="0.4" />
        </motion.g>

        <motion.g
          animate={{
            x: [0, -10, 0],
            y: [0, 10, 0],
          }}
          transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          <circle cx="680" cy="115" r="4.5" fill={color} opacity="0.8" />
          <circle cx="680" cy="115" r="9" stroke={color} strokeWidth="1" opacity="0.4" />
        </motion.g>
      </svg>
    </div>
  );
};
