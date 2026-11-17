'use client';

import React, { ReactNode, CSSProperties, useId } from 'react';
import './GlassSurface.css';

export interface GlassSurfaceProps {
  children?: ReactNode;
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  borderWidth?: number;
  brightness?: number;
  opacity?: number;
  blur?: number;
  displace?: number;
  backgroundOpacity?: number;
  saturation?: number;
  distortionScale?: number;
  redOffset?: number;
  greenOffset?: number;
  blueOffset?: number;
  xChannel?: 'R' | 'G' | 'B';
  yChannel?: 'R' | 'G' | 'B';
  mixBlendMode?: string;
  refraction?: boolean;
  renderer?: 'auto' | 'svg' | 'webgl';
  theme?: 'light' | 'dark';
  className?: string;
  style?: CSSProperties;
}

export const GlassSurface: React.FC<GlassSurfaceProps> = ({
  children,
  width = 'auto',
  height = 'auto',
  borderRadius = 20,
  blur = 6,
  backgroundOpacity = 0.55,
  saturation = 1.2,
  theme = 'light',
  className = '',
  style = {},
}) => {
  const uniqueId = useId().replace(/:/g, '-');
  const isDark = theme === 'dark';

  const containerStyle: CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    borderRadius: `${borderRadius}px`,
    backdropFilter: `blur(${blur}px) saturate(${saturation * 100}%)`,
    WebkitBackdropFilter: `blur(${blur}px) saturate(${saturation * 100}%)`,
    backgroundColor: isDark
      ? `rgba(18, 78, 82, ${Math.max(0.3, backgroundOpacity)})`
      : `rgba(255, 255, 255, ${Math.max(0.15, backgroundOpacity)})`,
    ...style,
  };

  return (
    <div
      className={`glass-surface-container ${isDark ? 'glass-surface-dark' : ''} ${className}`}
      style={containerStyle}
    >
      <div className="glass-surface-shine" />
      <div className="glass-surface-content">{children}</div>
    </div>
  );
};

export default GlassSurface;
