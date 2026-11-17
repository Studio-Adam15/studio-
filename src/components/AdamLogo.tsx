import React, { useState } from 'react';
import studioLogoLight from '../assets/images/studio_adam_light_logo_1791655238670.jpg';
import studioLogoDark from '../assets/images/studio_adam_dark_logo_1791655226020.jpg';

export interface AdamLogoProps {
  className?: string;
  withText?: boolean;
  lightText?: boolean;
  mode?: 'light' | 'dark';
  animated?: boolean;
  variant?: 'artwork' | 'vector' | 'badge' | 'cinematic';
  onClick?: () => void;
}

// Both Official Studio Adam Logos (Dark background & Warm ivory light background)
export const STUDIO_ADAM_LOGOS = {
  light: studioLogoLight,
  dark: studioLogoDark,
  lightFallback: '/logo-light.jpg',
  darkFallback: '/logo-dark.jpg',
};

/**
 * STUDIO ADAM Official Brand Logos
 * Focused on the 2 brand colors:
 * 1. Deep Petrol Teal (#124E52) background version
 * 2. Warm Ivory (#F5F0E6) background version
 */
export const AdamLogo: React.FC<AdamLogoProps> = ({
  className = 'w-9 h-9',
  withText = false,
  lightText = false,
  mode,
  animated = false,
  variant = 'artwork',
  onClick,
}) => {
  const [imageFailed, setImageFailed] = useState(false);
  const [fallbackAttempted, setFallbackAttempted] = useState(false);

  const isDarkMode = mode ? mode === 'dark' : lightText;
  const primaryColor = isDarkMode ? '#F5F0E6' : '#124E52';
  const defaultSrc = isDarkMode ? STUDIO_ADAM_LOGOS.dark : STUDIO_ADAM_LOGOS.light;
  const fallbackSrc = isDarkMode ? STUDIO_ADAM_LOGOS.darkFallback : STUDIO_ADAM_LOGOS.lightFallback;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!fallbackAttempted) {
      setFallbackAttempted(true);
      e.currentTarget.src = fallbackSrc;
    } else {
      setImageFailed(true);
    }
  };

  // High-Precision Architectural Vector Monogram (Zero-lag SVG fallback in #124E52 / #F5F0E6)
  const vectorSvg = (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full select-none"
    >
      {/* Structural Line-Art */}
      <path
        d="M 50 16 L 70 78 L 59 78 L 49 52"
        stroke={primaryColor}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 50 16 L 36 46"
        stroke={primaryColor}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 44 36 C 34 36 28 42 28 50 C 28 58 36 62 46 67 C 52 70 54 74 50 78 C 46 81 38 80 34 76"
        stroke={primaryColor}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 44 54 L 72 54"
        stroke={primaryColor}
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );

  // High-Resolution Official Logo Artwork Image
  const artworkImage = imageFailed ? (
    vectorSvg
  ) : (
    <div className="w-full h-full relative rounded-xl overflow-hidden shrink-0 flex items-center justify-center bg-transparent">
      <img
        src={defaultSrc}
        alt="STUDIO ADAM Official Logo"
        loading="eager"
        decoding="async"
        referrerPolicy="no-referrer"
        onError={handleImageError}
        className="w-full h-full object-contain rounded-xl select-none"
      />
    </div>
  );

  // Badge Variant: High-end framed emblem in #124E52 and #F5F0E6
  const badgeContent = (
    <div
      className={`relative w-full h-full p-0.5 rounded-xl border flex items-center justify-center ${
        lightText ? 'border-[#F5F0E6]/30 bg-[#124E52]' : 'border-[#124E52]/20 bg-[#F5F0E6]'
      }`}
    >
      <div className="w-full h-full rounded-[9px] overflow-hidden p-0.5 flex items-center justify-center">
        {artworkImage}
      </div>
    </div>
  );

  // Cinematic / Card Variant
  const cinematicContent = (
    <div
      className={`relative w-full h-full rounded-2xl overflow-hidden border p-1 flex items-center justify-center ${
        lightText ? 'border-[#F5F0E6]/25 bg-[#124E52]' : 'border-[#124E52]/20 bg-[#F5F0E6]'
      }`}
    >
      {artworkImage}
    </div>
  );

  let renderedContent = artworkImage;
  if (variant === 'vector') renderedContent = vectorSvg;
  else if (variant === 'badge') renderedContent = badgeContent;
  else if (variant === 'cinematic') renderedContent = cinematicContent;

  const animationClasses = animated
    ? 'transition-transform duration-200 ease-out hover:scale-105 active:scale-95'
    : '';

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 select-none ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div
        className={`relative ${className} shrink-0 aspect-square flex items-center justify-center ${animationClasses}`}
      >
        {renderedContent}
      </div>

      {withText && (
        <div className="flex flex-col">
          <span
            className={`font-black tracking-wider text-base leading-none ${
              lightText ? 'text-[#F5F0E6]' : 'text-[#124E52]'
            }`}
          >
            STUDIO ADAM
          </span>
          <span
            className={`text-[10px] tracking-widest uppercase mt-1 font-bold ${
              lightText ? 'text-[#F5F0E6]/80' : 'text-[#124E52]/70'
            }`}
          >
            ستوديو آدم
          </span>
        </div>
      )}
    </div>
  );
};
