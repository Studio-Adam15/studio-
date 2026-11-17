import React from 'react';
import { motion } from 'framer-motion';

interface GlassyMotionFlowProps {
  className?: string;
  variant?: 'hero-flow' | 'section-divider' | 'ambient-ribbon' | 'card-accent';
  color?: string;
  glowColor?: string;
  interactive?: boolean;
}

/**
 * GlassyMotionFlow: An extraordinary futuristic liquid-glass motion graphic.
 * Renders undulating multi-layered chromatic glass ribbons, optical refraction filters,
 * specular edge lighting, and floating light refractions inspired by high-end digital studios
 * (Active Theory, Locomotive, Awwwards Site of the Year).
 */
export const GlassyMotionFlow: React.FC<GlassyMotionFlowProps> = ({
  className = 'w-full h-48',
  variant = 'hero-flow',
  color = '#124E52',
  glowColor = '#2DD4BF',
}) => {
  const isReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (variant === 'section-divider') {
    return (
      <div className={`relative overflow-hidden pointer-events-none select-none ${className}`}>
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="glassDividerGrad1" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor={color} stopOpacity="0" />
              <stop offset="20%" stopColor={color} stopOpacity="0.4" />
              <stop offset="50%" stopColor={glowColor} stopOpacity="0.8" />
              <stop offset="80%" stopColor={color} stopOpacity="0.4" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
            <linearGradient id="glassDividerGrad2" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#F5F0E6" stopOpacity="0" />
              <stop offset="35%" stopColor="#F5F0E6" stopOpacity="0.6" />
              <stop offset="65%" stopColor={glowColor} stopOpacity="0.5" />
              <stop offset="100%" stopColor="#F5F0E6" stopOpacity="0" />
            </linearGradient>
            <filter id="glassDividerGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Glowing Ambient Glass Light Wave */}
          <path
            d="M0 60 C360 10, 720 110, 1080 30 C1260 -10, 1380 70, 1440 60"
            stroke="url(#glassDividerGrad1)"
            strokeWidth="3"
            filter="url(#glassDividerGlow)"
            fill="none"
          />

          {/* Thin Specular Refractive Spine */}
          <motion.path
            d="M0 60 C360 10, 720 110, 1080 30 C1260 -10, 1380 70, 1440 60"
            stroke="url(#glassDividerGrad2)"
            strokeWidth="1.5"
            strokeDasharray="16 24"
            fill="none"
            animate={isReduced ? {} : { strokeDashoffset: [0, -320] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          />

          {/* Floating Refractive Glass Nodes */}
          <circle cx="540" cy="55" r="4" fill={color} opacity="0.75" />
          <circle cx="540" cy="55" r="8" stroke={glowColor} strokeWidth="1" opacity="0.4" />
          <circle cx="980" cy="45" r="3.5" fill={glowColor} opacity="0.9" />
        </svg>
      </div>
    );
  }

  if (variant === 'ambient-ribbon') {
    return (
      <div className={`relative overflow-hidden pointer-events-none select-none ${className}`}>
        <svg
          viewBox="0 0 1000 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={color} stopOpacity="0.05" />
              <stop offset="50%" stopColor={glowColor} stopOpacity="0.4" />
              <stop offset="100%" stopColor={color} stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <motion.path
            d="M-50 80 Q 250 150, 500 80 T 1050 80"
            stroke="url(#ribbonGrad)"
            strokeWidth="40"
            strokeLinecap="round"
            fill="none"
            style={{ filter: 'blur(16px)' }}
            animate={isReduced ? {} : { y: [-6, 6, -6] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
      </div>
    );
  }

  // Default: 'hero-flow' - The Masterpiece Futuristic Glassy Motion Graphic
  return (
    <div className={`relative select-none pointer-events-none overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 900 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Glass Refractive Prism Gradient */}
          <linearGradient id="glassFlowRibbon" x1="0%" y1="20%" x2="100%" y2="80%">
            <stop offset="0%" stopColor={color} stopOpacity="0.1" />
            <stop offset="25%" stopColor={color} stopOpacity="0.65" />
            <stop offset="50%" stopColor="#2DD4BF" stopOpacity="0.85" />
            <stop offset="75%" stopColor="#F5F0E6" stopOpacity="0.7" />
            <stop offset="100%" stopColor={color} stopOpacity="0.15" />
          </linearGradient>

          {/* Specular White Rim Highlight */}
          <linearGradient id="glassSpecularHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="65%" stopColor="#2DD4BF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          {/* Deep Refractive Caustic Shadow */}
          <linearGradient id="glassCausticShadow" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>

          {/* Optical Glass Distortion Filter */}
          <filter id="futuristicGlassOptic" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feSpecularLighting
              in="blur"
              surfaceScale="2"
              specularConstant="1.2"
              specularExponent="20"
              lightingColor="#FFFFFF"
              result="specular"
            >
              <fePointLight x="450" y="80" z="220" />
            </feSpecularLighting>
            <feComposite in="SourceGraphic" in2="specular" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
          </filter>
        </defs>

        {/* Ambient Glass Caustic Glow Field */}
        <motion.path
          d="M 60 210 C 220 70, 420 310, 640 140 C 760 40, 840 180, 880 150"
          stroke="url(#glassCausticShadow)"
          strokeWidth="36"
          strokeLinecap="round"
          fill="none"
          style={{ filter: 'blur(22px)' }}
          animate={isReduced ? {} : { y: [-8, 8, -8] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Primary Liquid Glass Ribbon */}
        <motion.path
          d="M 40 190 C 200 60, 400 290, 620 120 C 740 30, 820 160, 860 140"
          stroke="url(#glassFlowRibbon)"
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
          filter="url(#futuristicGlassOptic)"
          animate={isReduced ? {} : {
            d: [
              "M 40 190 C 200 60, 400 290, 620 120 C 740 30, 820 160, 860 140",
              "M 40 180 C 220 80, 380 270, 640 140 C 750 45, 830 150, 860 140",
              "M 40 190 C 200 60, 400 290, 620 120 C 740 30, 820 160, 860 140",
            ]
          }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Precision Laser Core / Specular Glass Spine */}
        <motion.path
          d="M 40 190 C 200 60, 400 290, 620 120 C 740 30, 820 160, 860 140"
          stroke="url(#glassSpecularHighlight)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="30 20"
          fill="none"
          animate={isReduced ? {} : { strokeDashoffset: [0, -400] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        />

        {/* Harmonic Secondary Refractive Ribbon */}
        <motion.path
          d="M 80 230 C 260 110, 450 250, 670 170 C 770 130, 820 80, 870 100"
          stroke={color}
          strokeWidth="1.5"
          strokeOpacity="0.4"
          strokeDasharray="6 8"
          fill="none"
          animate={isReduced ? {} : { strokeDashoffset: [0, 200] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />

        {/* Orbiting Chromatic Optical Nodes */}
        <motion.g
          animate={isReduced ? {} : {
            x: [0, 14, 0],
            y: [0, -12, 0],
          }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Glass Node 1 */}
          <circle cx="310" cy="180" r="16" fill="rgba(255,255,255,0.25)" style={{ backdropFilter: 'blur(4px)' }} />
          <circle cx="310" cy="180" r="16" stroke="rgba(255,255,255,0.7)" strokeWidth="1" />
          <circle cx="310" cy="180" r="5" fill="#2DD4BF" />
          <circle cx="310" cy="180" r="2.5" fill="#FFFFFF" />
        </motion.g>

        <motion.g
          animate={isReduced ? {} : {
            x: [0, -16, 0],
            y: [0, 14, 0],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        >
          {/* Glass Node 2 */}
          <circle cx="610" cy="122" r="12" fill="rgba(18,78,82,0.35)" />
          <circle cx="610" cy="122" r="12" stroke="rgba(45,212,191,0.6)" strokeWidth="1" />
          <circle cx="610" cy="122" r="4" fill="#F5F0E6" />
        </motion.g>

        {/* Subtle Tech Coordinates HUD Stamp */}
        <g opacity="0.45" className="font-mono text-[9px] fill-[#124E52]">
          <text x="60" y="270">COORD: 31.95°N / 35.93°E</text>
          <text x="60" y="285">FLOW // REFRACTION OPTICS 2.0</text>
          <line x1="60" y1="295" x2="210" y2="295" stroke={color} strokeWidth="0.75" strokeDasharray="3 3" />
        </g>
      </svg>
    </div>
  );
};
