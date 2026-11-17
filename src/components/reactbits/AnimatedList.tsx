import React, { useEffect, useId, useLayoutEffect, useRef, useState, CSSProperties, ReactNode } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  CodeIcon,
  FigmaIcon,
  File01Icon,
  FileZipIcon,
  Folder01Icon,
  Image01Icon,
  MusicNote01Icon,
  Note01Icon,
  Pdf01Icon,
  Presentation01Icon,
  Table01Icon,
  Video01Icon
} from '@hugeicons/core-free-icons';

import './AnimatedList.css';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const THEMES: Record<string, Record<string, string>> = {
  dark: {
    '--al-frame': 'rgba(13, 79, 73, 0.9)',
    '--al-frame-edge': 'rgba(255, 255, 255, 0.12)',
    '--al-frame-highlight': 'rgba(255, 255, 255, 0.08)',
    '--al-frame-shadow': '0 22px 44px -20px rgba(0, 0, 0, 0.8), 0 6px 16px -8px rgba(0, 0, 0, 0.5)',
    '--al-tile': 'linear-gradient(180deg, #124E52 0%, #0d4f49 100%)',
    '--al-tile-edge': 'rgba(255, 255, 255, 0.12)',
    '--al-tile-highlight': 'rgba(255, 255, 255, 0.15)',
    '--al-tile-shadow': '0 4px 10px -4px rgba(0, 0, 0, 0.4)',
    '--al-well': 'rgba(255, 255, 255, 0.1)',
    '--al-ink': '#f3efe4',
    '--al-muted': 'rgba(243, 239, 228, 0.7)',
    '--al-thumb': 'rgba(255, 255, 255, 0.2)',
    '--al-ring': '#bfe8c8',
    '--al-ring-fill': 'rgba(191, 232, 200, 0.08)',
    '--al-hover': 'brightness(1.08)',
    '--al-press': 'brightness(0.92)',
    '--al-active': 'brightness(1.12)'
  },
  light: {
    '--al-frame': 'rgba(243, 239, 228, 0.95)',
    '--al-frame-edge': 'rgba(220, 214, 196, 0.9)',
    '--al-frame-highlight': 'rgba(255, 255, 255, 0.95)',
    '--al-frame-shadow': '0 22px 44px -22px rgba(10, 63, 58, 0.15), 0 6px 16px -10px rgba(10, 63, 58, 0.1)',
    '--al-tile': 'linear-gradient(180deg, #ffffff 0%, #faf8f2 100%)',
    '--al-tile-edge': '#dcd6c4',
    '--al-tile-highlight': 'rgba(255, 255, 255, 1)',
    '--al-tile-shadow': '0 4px 10px -5px rgba(10, 63, 58, 0.08)',
    '--al-well': '#e7efe9',
    '--al-ink': '#0b423d',
    '--al-muted': '#5f7a72',
    '--al-thumb': '#dcd6c4',
    '--al-ring': '#0d4f49',
    '--al-ring-fill': 'rgba(13, 79, 73, 0.04)',
    '--al-hover': 'brightness(0.98)',
    '--al-press': 'brightness(0.94)',
    '--al-active': 'none'
  }
};

const glyph = (icon: any) => <HugeiconsIcon icon={icon} size={18} strokeWidth={1.8} />;

export interface AnimatedListItem {
  id?: string;
  icon?: ReactNode;
  image?: string;
  title: string;
  description?: string;
  meta?: string;
}

export const DEFAULT_ITEMS: AnimatedListItem[] = [
  { icon: glyph(Folder01Icon), title: 'Brand guidelines.pdf', description: 'Complete brand guide', meta: 'Included' },
  { icon: glyph(Image01Icon), title: 'Original Logo & Vectors', description: 'SVG, PNG, EPS (all platforms)', meta: 'Included' },
  { icon: glyph(Video01Icon), title: 'Viral Motion Reels', description: 'Short-form visual editing', meta: '3 JOD/reel' },
  { icon: glyph(Note01Icon), title: 'High-Impact Ad Posts', description: 'Scroll-stopping grid posts', meta: '1 JOD/post' },
  { icon: glyph(CodeIcon), title: 'Pro Web Experience', description: 'WhatsApp & Instagram connected', meta: '25 JOD' }
];

const HIDDEN: Record<string, { above: string; below: string }> = {
  pop: { above: 'translate3d(0, -12px, 0) scale(0.8)', below: 'translate3d(0, 12px, 0) scale(0.8)' },
  slide: { above: 'translate3d(0, -28px, 0) scale(0.98)', below: 'translate3d(0, 28px, 0) scale(0.98)' },
  fade: { above: 'translate3d(0, -4px, 0)', below: 'translate3d(0, 4px, 0)' }
};

const SPRING =
  'linear(0, 0.0603, 0.2033, 0.3821, 0.5633, 0.7258, 0.8584, 0.9574, 1.0242, 1.0634, 1.0809, 1.0828, 1.0747, 1.0613, 1.046, 1.0313, 1.0186, 1.0085, 1.0012, 0.9965, 0.994, 0.9931, 0.9933, 0.9941, 0.9953, 0.9966, 0.9978, 0.9988, 1)';

const size = (value: number | string) => (typeof value === 'number' ? `${value}px` : value);

export interface AnimatedListProps {
  items?: (string | AnimatedListItem)[];
  onItemSelect?: (item: string | AnimatedListItem, index: number) => void;
  renderItem?: (item: string | AnimatedListItem, index: number, selected: boolean) => ReactNode;
  initialSelectedIndex?: number;
  selectOnHover?: boolean;
  enableArrowNavigation?: boolean;
  loop?: boolean;
  animation?: 'pop' | 'slide' | 'fade' | 'none';
  animateOnce?: boolean;
  stagger?: number;
  showGradients?: boolean;
  fadeSize?: number;
  displayScrollbar?: boolean;
  frame?: boolean;
  theme?: 'dark' | 'light';
  accentColor?: string;
  radius?: number;
  gap?: number;
  width?: number | string;
  maxHeight?: number | string;
  className?: string;
  itemClassName?: string;
  style?: CSSProperties;
}

export const AnimatedList: React.FC<AnimatedListProps> = ({
  items = DEFAULT_ITEMS,
  onItemSelect,
  renderItem,
  initialSelectedIndex = -1,
  selectOnHover = true,
  enableArrowNavigation = true,
  loop = false,
  animation = 'pop',
  animateOnce = false,
  stagger = 0.05,
  showGradients = true,
  fadeSize = 56,
  displayScrollbar = true,
  frame = true,
  theme = 'light',
  accentColor,
  radius = 18,
  gap = 10,
  width = '100%',
  maxHeight = 440,
  className = '',
  itemClassName = '',
  style
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const engineRef = useRef<{
    place: (snap?: boolean) => void;
    syncRing: () => void;
    updateFades: () => void;
    sync: () => void;
  } | null>(null);
  const keyboardRef = useRef(false);
  const navigatingRef = useRef(false);
  const [selected, setSelected] = useState(initialSelectedIndex);

  const settings = {
    items,
    onItemSelect,
    selected,
    selectOnHover,
    enableArrowNavigation,
    loop,
    animation,
    animateOnce,
    stagger,
    showGradients,
    fadeSize
  };
  const settingsRef = useRef(settings);
  settingsRef.current = settings;

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const indicator = indicatorRef.current;
    const ring = ringRef.current;
    if (!root || !viewport || !track || !indicator || !ring) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const springEase = CSS.supports?.('transition-timing-function', 'linear(0, 1)')
      ? SPRING
      : 'cubic-bezier(0.34, 1.4, 0.64, 1)';
    const transition = `transform 620ms ${springEase}, opacity 300ms cubic-bezier(0.22, 1, 0.36, 1), filter 200ms ease`;
    const motion = { y: 0, h: 0, vy: 0, vh: 0, ty: 0, th: 0, ready: false };
    const fades = { top: '', bottom: '' };
    let boxes: ([number, number] | null)[] = [];
    let current: string | null = null;
    let entered = false;
    let engaged = false;
    let pointer = [0, 0];
    let raf = 0;
    let last = 0;

    const mode = () => {
      const chosen = settingsRef.current.animation;
      if (chosen === 'none' || !HIDDEN[chosen]) return 'none';
      return reduced ? 'fade' : chosen;
    };

    const apply = (element: HTMLElement, state: string) => {
      element.dataset.state = state;
      const pose = current && current !== 'none' && state !== 'in' ? HIDDEN[current][state as 'above' | 'below'] : '';
      element.style.transform = pose;
      element.style.opacity = pose ? '0' : '';
    };

    const syncRing = () => {
      const item = itemRefs.current[settingsRef.current.selected];
      if (!item) return;
      const state = item.dataset.state || 'in';
      if (state === ring.dataset.state) return;
      ring.style.transitionDelay = item.style.transitionDelay;
      apply(ring, state);
    };

    const write = () => {
      indicator.style.transform = `translate3d(0, ${motion.y.toFixed(2)}px, 0)`;
      indicator.style.height = `${motion.h.toFixed(2)}px`;
    };

    const frame = (now: number) => {
      raf = 0;
      const dt = Math.min(0.05, (now - last) / 1000 || 0);
      last = now;
      const omega = 30;
      const zeta = 0.78;
      const steps = Math.max(1, Math.ceil(dt / (1 / 240)));
      const h = dt / steps;
      for (let i = 0; i < steps; i++) {
        motion.vy += (omega * omega * (motion.ty - motion.y) - 2 * zeta * omega * motion.vy) * h;
        motion.vh += (omega * omega * (motion.th - motion.h) - 2 * zeta * omega * motion.vh) * h;
        motion.y += motion.vy * h;
        motion.h += motion.vh * h;
      }
      const moving =
        Math.abs(motion.ty - motion.y) > 0.05 ||
        Math.abs(motion.th - motion.h) > 0.05 ||
        Math.abs(motion.vy) + Math.abs(motion.vh) > 0.5;
      if (!moving) {
        motion.y = motion.ty;
        motion.h = motion.th;
        motion.vy = motion.vh = 0;
      }
      write();
      if (moving) raf = requestAnimationFrame(frame);
    };

    const place = (snap?: boolean) => {
      const item = itemRefs.current[settingsRef.current.selected];
      if (!item) {
        indicator.style.opacity = '0';
        motion.ready = false;
        return;
      }
      indicator.style.opacity = '1';
      motion.ty = item.offsetTop;
      motion.th = item.offsetHeight;
      if (snap || reduced || !motion.ready) {
        motion.y = motion.ty;
        motion.h = motion.th;
        motion.vy = motion.vh = 0;
        motion.ready = true;
        write();
        return;
      }
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };

    const updateFades = () => {
      const s = settingsRef.current;
      const span = Math.max(1, s.fadeSize);
      const { scrollTop, scrollHeight, clientHeight } = viewport;
      const top = s.showGradients ? Math.min(span, Math.max(0, scrollTop)) : 0;
      const bottom = s.showGradients ? Math.min(span, Math.max(0, scrollHeight - clientHeight - scrollTop)) : 0;
      const nextTop = `${top.toFixed(1)}px`;
      const nextBottom = `${bottom.toFixed(1)}px`;
      if (nextTop !== fades.top) {
        fades.top = nextTop;
        viewport.style.setProperty('--al-fade-top', nextTop);
      }
      if (nextBottom !== fades.bottom) {
        fades.bottom = nextBottom;
        viewport.style.setProperty('--al-fade-bottom', nextBottom);
      }
    };

    const measure = () => {
      const offset = track.offsetTop;
      boxes = itemRefs.current.map(item => (item ? [offset + item.offsetTop, item.offsetHeight] : null));
    };

    const reveal = (entrance: boolean) => {
      if (!entered) return;
      const s = settingsRef.current;
      const top = viewport.scrollTop;
      const view = viewport.clientHeight;
      let order = 0;
      itemRefs.current.forEach((item, index) => {
        const box = boxes[index];
        if (!item || !box) return;
        const start = box[0] - top;
        const overlap = Math.min(view, start + box[1]) - Math.max(0, start);
        const hidden =
          current !== 'none' && overlap < Math.min(box[1], view) * 0.5 && !(s.animateOnce && item.dataset.seen);
        const state = hidden ? (start + box[1] / 2 < view / 2 ? 'above' : 'below') : 'in';
        if (state === item.dataset.state) return;
        const delay = entrance && !hidden ? (order++ * Math.max(0, s.stagger)).toFixed(3) : '0';
        item.style.transitionDelay = delay !== '0' ? `${delay}s, ${delay}s, 0s` : '';
        if (!hidden) item.dataset.seen = 'true';
        apply(item, state);
      });
      syncRing();
    };

    const sync = () => {
      const s = settingsRef.current;
      itemRefs.current.length = s.items.length;
      const itemsList = itemRefs.current.filter(Boolean) as HTMLElement[];
      const next = mode();
      const changed = next !== current;
      const restyle = changed ? itemsList : itemsList.filter(item => !item.dataset.state);
      current = next;
      if (current === 'none') entered = true;
      if (restyle.length) {
        const elements = changed ? [...restyle, ring] : restyle;
        for (const element of elements) element.style.transition = 'none';
        for (const item of restyle) apply(item, current === 'none' ? 'in' : item.dataset.state || 'below');
        if (changed) {
          const selItem = itemRefs.current[s.selected];
          apply(ring, selItem?.dataset.state || 'in');
        }
        void root.offsetHeight;
        for (const element of elements) element.style.transition = transition;
      }
      measure();
      reveal(restyle.length > 0);
    };

    sync();

    const gate =
      typeof IntersectionObserver === 'undefined'
        ? null
        : new IntersectionObserver(
            (entries, observer) => {
              if (!entries.some(entry => entry.isIntersecting)) return;
              observer.disconnect();
              if (entered) return;
              entered = true;
              measure();
              reveal(true);
            },
            { rootMargin: '0px 0px -10% 0px' }
          );
    if (!entered) {
      if (gate) gate.observe(root);
      else {
        entered = true;
        reveal(true);
      }
    }

    const resizeObserver = new ResizeObserver(() => {
      place(true);
      updateFades();
      measure();
      reveal(false);
    });
    resizeObserver.observe(viewport);
    resizeObserver.observe(track);

    const onScroll = () => {
      updateFades();
      reveal(false);
    };

    const onKey = (event: KeyboardEvent) => {
      const s = settingsRef.current;
      if (!s.enableArrowNavigation || event.defaultPrevented) return;
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      const active = document.activeElement;
      const focused = active === viewport;
      const idle = !active || active === document.body || active === document.documentElement;
      if (!focused && !(engaged && idle)) return;
      const count = s.items.length;
      if (!count) return;
      const index = s.selected;
      let next: number | null = null;
      if (event.key === 'ArrowDown') next = index < 0 ? 0 : index + 1;
      else if (event.key === 'ArrowUp') next = index < 0 ? count - 1 : index - 1;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = count - 1;
      else if ((event.key === 'Enter' || (focused && event.key === ' ')) && index >= 0 && index < count) {
        event.preventDefault();
        s.onItemSelect?.(s.items[index], index);
        return;
      }
      if (next === null) return;
      event.preventDefault();
      next = s.loop ? (next + count) % count : Math.min(count - 1, Math.max(0, next));
      keyboardRef.current = true;
      navigatingRef.current = true;
      setSelected(next);
    };

    const onPointerMove = (event: PointerEvent) => {
      const moved = event.clientX !== pointer[0] || event.clientY !== pointer[1];
      pointer = [event.clientX, event.clientY];
      if (!navigatingRef.current || !moved) return;
      navigatingRef.current = false;
      const item = event.target instanceof Element ? event.target.closest('[data-index]') : null;
      if (item && root.contains(item) && settingsRef.current.selectOnHover) {
        setSelected(Number((item as HTMLElement).dataset.index));
      }
    };

    const onEnter = () => {
      engaged = true;
    };
    const onLeave = () => {
      engaged = false;
    };

    viewport.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('keydown', onKey);
    root.addEventListener('pointerenter', onEnter);
    root.addEventListener('pointerleave', onLeave);
    root.addEventListener('pointermove', onPointerMove);

    updateFades();
    place(true);
    syncRing();

    engineRef.current = { place, syncRing, updateFades, sync };

    return () => {
      cancelAnimationFrame(raf);
      gate?.disconnect();
      resizeObserver.disconnect();
      viewport.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', onKey);
      root.removeEventListener('pointerenter', onEnter);
      root.removeEventListener('pointerleave', onLeave);
      root.removeEventListener('pointermove', onPointerMove);
      engineRef.current = null;
    };
  }, []);

  useIsomorphicLayoutEffect(() => {
    engineRef.current?.sync();
  }, [items, animation]);

  useEffect(() => {
    const engine = engineRef.current;
    if (!engine) return;
    engine.place(false);
    engine.syncRing();
    if (!keyboardRef.current) return;
    keyboardRef.current = false;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const item = itemRefs.current[selected];
    if (!viewport || !track || !item) return;
    const top = track.offsetTop + item.offsetTop;
    const bottom = top + item.offsetHeight;
    const room = Math.max(0, (viewport.clientHeight - item.offsetHeight) / 2);
    const margin = Math.min(showGradients ? Math.max(12, fadeSize) : 12, room);
    if (top < viewport.scrollTop + margin) {
      viewport.scrollTo({ top: Math.max(0, top - margin), behavior: 'smooth' });
    } else if (bottom > viewport.scrollTop + viewport.clientHeight - margin) {
      viewport.scrollTo({ top: bottom - viewport.clientHeight + margin, behavior: 'smooth' });
    }
  }, [selected, fadeSize, showGradients]);

  const themeVars = THEMES[theme] || THEMES.light;

  return (
    <div
      ref={rootRef}
      className={`animated-list-root ${className}`.trim()}
      style={{
        ...themeVars,
        ...(accentColor ? { '--al-accent': accentColor } : {}),
        '--al-radius': `${radius}px`,
        maxWidth: size(width),
        width: '100%',
        ...style
      } as CSSProperties}
    >
      <div
        ref={viewportRef}
        tabIndex={0}
        className="animated-list-viewport"
        style={{
          maxHeight: size(maxHeight),
          padding: frame ? '12px' : '0',
          background: frame ? 'var(--al-frame)' : 'transparent',
          borderRadius: `${radius + 6}px`,
          border: frame ? '1px solid var(--al-frame-edge)' : 'none',
          boxShadow: frame ? 'var(--al-frame-shadow)' : 'none'
        }}
      >
        <div ref={trackRef} className="animated-list-track" style={{ gap: `${gap}px` }}>
          <div ref={indicatorRef} className="animated-list-indicator" />
          <div ref={ringRef} className="animated-list-ring" />
          {items.map((item, index) => {
            const isSelected = selected === index;
            const content = renderItem ? (
              renderItem(item, index, isSelected)
            ) : typeof item === 'string' ? (
              <span className="animated-list-title">{item}</span>
            ) : (
              <>
                {item.icon && <div className="animated-list-icon">{item.icon}</div>}
                <div className="animated-list-content">
                  <div className="animated-list-title">{item.title}</div>
                  {item.description && <div className="animated-list-description">{item.description}</div>}
                </div>
                {item.meta && <span className="animated-list-meta">{item.meta}</span>}
              </>
            );

            return (
              <div
                key={typeof item === 'string' ? item : item.id || item.title || index}
                ref={el => {
                  itemRefs.current[index] = el;
                }}
                data-index={index}
                onClick={() => {
                  setSelected(index);
                  onItemSelect?.(item, index);
                }}
                className={`animated-list-item ${itemClassName}`.trim()}
              >
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AnimatedList;
