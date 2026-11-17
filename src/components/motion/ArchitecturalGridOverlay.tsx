import React from 'react';

interface ArchitecturalGridOverlayProps {
  className?: string;
  theme?: 'light' | 'dark';
}

/**
 * ArchitecturalGridOverlay: Adds subtle Swiss precision grid crosshairs,
 * latitude/longitude coordinates, and fine architectural guide lines
 * that unite the entire website into a cohesive futuristic studio canvas.
 */
export const ArchitecturalGridOverlay: React.FC<ArchitecturalGridOverlayProps> = ({
  className = '',
  theme = 'light',
}) => {
  const isDark = theme === 'dark';
  const strokeColor = isDark ? 'rgba(245, 240, 230, 0.12)' : 'rgba(18, 78, 82, 0.12)';
  const textColor = isDark ? 'text-[#F5F0E6]/30' : 'text-[#124E52]/30';

  return (
    <div className={`pointer-events-none select-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {/* Outer Container Border Guides */}
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 relative border-x border-[#124E52]/[0.06]">
        {/* Top-Left Crosshair */}
        <div className="absolute -top-3 -left-3 w-6 h-6 flex items-center justify-center font-mono text-[10px] text-[#124E52]/25">
          +
        </div>
        {/* Top-Right Crosshair */}
        <div className="absolute -top-3 -right-3 w-6 h-6 flex items-center justify-center font-mono text-[10px] text-[#124E52]/25">
          +
        </div>
        {/* Bottom-Left Crosshair */}
        <div className="absolute -bottom-3 -left-3 w-6 h-6 flex items-center justify-center font-mono text-[10px] text-[#124E52]/25">
          +
        </div>
        {/* Bottom-Right Crosshair */}
        <div className="absolute -bottom-3 -right-3 w-6 h-6 flex items-center justify-center font-mono text-[10px] text-[#124E52]/25">
          +
        </div>

        {/* Subtle Side Metadata Stamped along vertical bounds */}
        <div className={`hidden xl:block absolute top-12 -left-12 -rotate-90 origin-top-left font-mono text-[8px] tracking-widest ${textColor}`}>
          COORD 31.95°N // 35.93°E · STUDIO ADAM
        </div>
        <div className={`hidden xl:block absolute bottom-12 -right-12 rotate-90 origin-bottom-right font-mono text-[8px] tracking-widest ${textColor}`}>
          GRID RES: 54PX · SYSTEM VER 2.4
        </div>
      </div>
    </div>
  );
};
