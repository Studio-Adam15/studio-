import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Volume2,
  VolumeX,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  MessageCircle,
  Calculator,
  ExternalLink,
  Lock,
} from 'lucide-react';
import { Language } from '../types';
import {
  PORTFOLIO_VIDEOS,
  PORTFOLIO_DESIGNS,
  PORTFOLIO_WEBSITES,
  PortfolioItem,
} from '../data/portfolioData';
import { STUDIO_CONFIG } from '../data/brandingData';
import { useSmoothScroll } from './providers/SmoothScrollProvider';

interface PortfolioSectionProps {
  lang: Language;
  onOpenInquiry: (initialPackage?: string) => void;
  onBackHome: () => void;
  onGoToCalculator: () => void;
}

type CategoryKey = 'films' | 'social' | 'websites';
type ViewMode = 'all' | 'focus';

interface VideoCardProps {
  item: PortfolioItem;
  isAr: boolean;
  onOpen: (item: PortfolioItem) => void;
  featured?: boolean;
}

const VideoFilmCard: React.FC<VideoCardProps> = ({
  item,
  isAr,
  onOpen,
  featured = false,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const handleMouseEnter = () => {
    const video = videoRef.current;
    if (!video) return;
    video.play().then(() => setIsPlaying(true)).catch(() => {});
  };

  const handleMouseLeave = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    setIsPlaying(false);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !isMuted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onOpen(item)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen(item);
        }
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative rounded-2xl overflow-hidden bg-[#072625] border border-[#C9E5D3]/15 aspect-[9/16] cursor-pointer shadow-lg transition-all duration-500 hover:border-[#C9E5D3]/45 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9E5D3] ${
        featured ? 'w-full max-w-[340px] mx-auto lg:mx-0' : 'w-full'
      }`}
    >
      <video
        ref={videoRef}
        src={`${item.src}#t=0.8`}
        muted={isMuted}
        loop
        playsInline
        preload="metadata"
        className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
      />

      {/* Top Controls (Sound + Fullscreen) */}
      <div className="absolute top-3.5 inset-x-3.5 z-20 flex items-center justify-between gap-2 pointer-events-none">
        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? (isAr ? 'تشغيل الصوت' : 'Unmute film') : (isAr ? 'كتم الصوت' : 'Mute film')}
          className="pointer-events-auto w-10 h-10 rounded-full bg-[#0B393B]/70 hover:bg-[#0B393B] backdrop-blur-md text-[#F5F0E6] border border-[#C9E5D3]/25 flex items-center justify-center transition-colors cursor-pointer"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        <span
          className="w-10 h-10 rounded-full bg-[#0B393B]/70 group-hover:bg-[#C9E5D3] backdrop-blur-md text-[#F5F0E6] group-hover:text-[#0B393B] border border-[#C9E5D3]/25 flex items-center justify-center transition-colors"
          aria-hidden="true"
        >
          <Maximize2 className="w-4 h-4" />
        </span>
      </div>

      {/* Centered Play Button with Subtle Hover Animation */}
      <div
        className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${
          isPlaying ? 'opacity-0' : 'opacity-100'
        }`}
        aria-hidden="true"
      >
        <div className="w-14 h-14 rounded-full bg-[#F5F0E6]/95 text-[#0B393B] shadow-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-[#C9E5D3]">
          <Play className="w-5 h-5 fill-current ms-0.5" />
        </div>
      </div>

      {/* Bottom Contrast Scrim & Clean Metadata */}
      <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-[#062224]/95 via-[#062224]/70 to-transparent text-[#F5F0E6] text-start">
        <div className="text-[11px] font-bold text-[#C9E5D3] flex items-center gap-1.5 truncate">
          <span>{isAr ? item.clientAr : item.clientEn}</span>
          <span aria-hidden="true">·</span>
          <span>{isAr ? item.categoryAr : item.categoryEn}</span>
        </div>
        <h4 className="font-black text-base sm:text-lg leading-snug mt-1 text-white">
          {isAr ? item.titleAr : item.titleEn}
        </h4>
      </div>
    </div>
  );
};

interface SocialDesignCardProps {
  item: PortfolioItem;
  isAr: boolean;
  onOpen: (item: PortfolioItem) => void;
}

const SocialDesignCard: React.FC<SocialDesignCardProps> = ({ item, isAr, onOpen }) => {
  const isSquareLogo = item.aspect === '1/1';

  return (
    <article className="group flex flex-col">
      <div
        role="button"
        tabIndex={0}
        onClick={() => onOpen(item)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onOpen(item);
          }
        }}
        className={`relative rounded-2xl overflow-hidden border border-[#124E52]/12 cursor-pointer transition-all duration-500 hover:border-[#124E52]/35 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#124E52] ${
          isSquareLogo ? 'aspect-square bg-[#F7F1E3]' : 'aspect-[4/5] bg-[#EAE3D2]'
        }`}
      >
        <img
          src={item.src}
          alt={isAr ? item.titleAr : item.titleEn}
          loading="lazy"
          referrerPolicy="no-referrer"
          className={`w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] ${
            isSquareLogo ? 'object-contain p-6 sm:p-8' : 'object-cover'
          }`}
        />

        {/* Subtle Inspect Overlay Affordance */}
        <div className="absolute inset-0 bg-[#0B393B]/0 group-hover:bg-[#0B393B]/20 transition-colors duration-300 pointer-events-none flex items-end justify-end p-4">
          <span className="w-10 h-10 rounded-full bg-[#F5F0E6]/95 text-[#124E52] shadow-lg flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <Maximize2 className="w-4 h-4" />
          </span>
        </div>
      </div>

      {/* Clean Unboxed Editorial Caption Beneath Artwork (preserves 100% of artwork area) */}
      <div className="pt-3.5 px-1 text-start">
        <div className="text-xs font-bold text-[#124E52]/70 flex items-center gap-1.5 truncate">
          <span>{isAr ? item.clientAr : item.clientEn}</span>
          <span aria-hidden="true">·</span>
          <span>{isAr ? item.categoryAr : item.categoryEn}</span>
        </div>
        <h4 className="font-black text-base text-[#0B393B] mt-0.5 leading-snug group-hover:text-[#124E52] transition-colors">
          {isAr ? item.titleAr : item.titleEn}
        </h4>
      </div>
    </article>
  );
};

interface WebsiteShowcaseCardProps {
  site: PortfolioItem;
  indexNumber: string;
  isAr: boolean;
  reversed?: boolean;
  onInspect: (item: PortfolioItem) => void;
}

const WebsiteShowcaseCard: React.FC<WebsiteShowcaseCardProps> = ({
  site,
  indexNumber,
  isAr,
  reversed = false,
  onInspect,
}) => {
  const urlDisplay = site.websiteUrl?.replace(/^https?:\/\//, '') || '';

  return (
    <article className="bg-white/90 backdrop-blur-sm border border-[#124E52]/12 rounded-3xl p-5 sm:p-8 lg:p-10 shadow-xs">
      <div
        className={`grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 items-center ${
          reversed ? 'lg:[&>*:first-child]:order-2' : ''
        }`}
      >
        {/* Realistic Desktop Browser Mockup (Clickable to Open Live Website) */}
        <div className="lg:col-span-7">
          <a
            href={site.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-2xl overflow-hidden border border-[#124E52]/20 bg-[#0B393B] shadow-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#124E52]"
            aria-label={`${isAr ? 'زيارة موقع' : 'Visit website'} ${site.titleEn}`}
          >
            {/* Browser Top Chrome */}
            <div className="px-4 py-3 bg-[#0B393B] border-b border-[#C9E5D3]/15 flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C9E5D3]/35" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#C9E5D3]/25" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#C9E5D3]/15" />
              </div>

              <div
                dir="ltr"
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#124E52]/80 border border-[#C9E5D3]/15 text-[11px] sm:text-xs font-mono text-[#F5F0E6]/90 truncate max-w-[230px] sm:max-w-xs"
              >
                <Lock className="w-3 h-3 text-[#C9E5D3] shrink-0" />
                <span className="truncate">{urlDisplay}</span>
              </div>

              <span className="text-[#C9E5D3] opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0">
                <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* Webpage Screenshot Viewport (Preserves Exact 16:9 Ratio) */}
            <div className="relative aspect-[16/9] bg-[#F5F0E6] overflow-hidden">
              <img
                src={site.src}
                alt={`${isAr ? site.titleAr : site.titleEn} — ${urlDisplay}`}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-[#0B393B]/0 group-hover:bg-[#0B393B]/10 transition-colors duration-300 pointer-events-none" />
            </div>
          </a>
        </div>

        {/* Project Details & VISIT WEBSITE CTA */}
        <div className="lg:col-span-5 text-start flex flex-col justify-center">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#124E52]/70 mb-3 tabular-nums">
            <span>{indexNumber}</span>
            <span aria-hidden="true">·</span>
            <span>{site.year}</span>
            <span aria-hidden="true">·</span>
            <span className="font-sans">{isAr ? site.formatAr : site.formatEn}</span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-black text-[#0B393B] tracking-tight mb-2">
            {isAr ? site.titleAr : site.titleEn}
          </h3>

          <p className="text-xs sm:text-sm font-extrabold text-[#124E52] mb-4">
            {isAr ? site.clientAr : site.clientEn}
          </p>

          <p className="text-sm sm:text-base text-[#124E52]/80 font-semibold leading-relaxed mb-5">
            {isAr ? site.briefAr : site.briefEn}
          </p>

          {(site.deliverablesEn || site.deliverablesAr) && (
            <div className="text-xs font-bold text-[#124E52]/70 pb-6 mb-6 border-b border-[#124E52]/12">
              {isAr ? site.deliverablesAr : site.deliverablesEn}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={site.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#124E52] hover:bg-[#0B393B] text-[#F5F0E6] text-xs sm:text-sm font-black shadow-md hover:shadow-lg transition-all whitespace-nowrap shrink-0"
            >
              <span>{isAr ? 'زيارة الموقع' : 'VISIT WEBSITE'}</span>
              <ArrowUpRight className="w-4 h-4 text-[#C9E5D3]" />
            </a>

            <button
              type="button"
              onClick={() => onInspect(site)}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-[#F5F0E6] hover:bg-[#C9E5D3]/40 text-[#0B393B] border border-[#124E52]/20 text-xs sm:text-sm font-extrabold transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <Maximize2 className="w-4 h-4" />
              <span>{isAr ? 'تكبير المعاينة' : 'Expand View'}</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  lang,
  onOpenInquiry,
  onBackHome,
  onGoToCalculator,
}) => {
  const isAr = lang === 'ar';
  const { scrollTo } = useSmoothScroll();
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('films');
  const [viewMode, setViewMode] = useState<ViewMode>('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const visibleList: PortfolioItem[] =
    viewMode === 'all'
      ? [...PORTFOLIO_VIDEOS, ...PORTFOLIO_DESIGNS, ...PORTFOLIO_WEBSITES]
      : activeCategory === 'films'
      ? PORTFOLIO_VIDEOS
      : activeCategory === 'social'
      ? PORTFOLIO_DESIGNS
      : PORTFOLIO_WEBSITES;

  const categories: Array<{
    key: CategoryKey;
    num: string;
    labelEn: string;
    labelAr: string;
    count: number;
  }> = [
    {
      key: 'films',
      num: '01',
      labelEn: 'Advertising Films',
      labelAr: 'الأفلام الإعلانية',
      count: PORTFOLIO_VIDEOS.length,
    },
    {
      key: 'social',
      num: '02',
      labelEn: 'Social Media Design',
      labelAr: 'تصاميم السوشيال ميديا',
      count: PORTFOLIO_DESIGNS.length,
    },
    {
      key: 'websites',
      num: '03',
      labelEn: 'Website Design',
      labelAr: 'تصميم المواقع',
      count: PORTFOLIO_WEBSITES.length,
    },
  ];

  // Scroll-spy updates active chapter indicator while browsing all chapters
  useEffect(() => {
    if (viewMode !== 'all') return;

    const sectionIds: Array<{ id: string; key: CategoryKey }> = [
      { id: 'cat-films', key: 'films' },
      { id: 'cat-social', key: 'social' },
      { id: 'cat-websites', key: 'websites' },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const match = sectionIds.find((s) => s.id === entry.target.id);
            if (match) setActiveCategory(match.key);
          }
        }
      },
      { rootMargin: '-35% 0px -45% 0px', threshold: 0.05 }
    );

    sectionIds.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [viewMode]);

  const handleCategoryJump = (key: CategoryKey) => {
    setActiveCategory(key);
    if (viewMode === 'all') {
      const targetEl = document.getElementById(`cat-${key}`);
      if (targetEl) {
        scrollTo(targetEl, { offset: -92, duration: 0.95 });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = useCallback(() => {
    if (!selectedItem) return;
    const idx = visibleList.findIndex((x) => x.id === selectedItem.id);
    if (idx === -1) return;
    const prevIdx = (idx - 1 + visibleList.length) % visibleList.length;
    setSelectedItem(visibleList[prevIdx]);
  }, [selectedItem, visibleList]);

  const handleNext = useCallback(() => {
    if (!selectedItem) return;
    const idx = visibleList.findIndex((x) => x.id === selectedItem.id);
    if (idx === -1) return;
    const nextIdx = (idx + 1) % visibleList.length;
    setSelectedItem(visibleList[nextIdx]);
  }, [selectedItem, visibleList]);

  useEffect(() => {
    if (!selectedItem) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedItem(null);
      if (e.key === 'ArrowRight') isAr ? handlePrev() : handleNext();
      if (e.key === 'ArrowLeft') isAr ? handleNext() : handlePrev();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selectedItem, handlePrev, handleNext, isAr]);

  // Split videos: lead featured + editorial showcase rows
  const leadFilm = PORTFOLIO_VIDEOS[0];
  const remainingFilms = PORTFOLIO_VIDEOS.slice(1);

  // Split Social designs by Campaign Groups so related project work sits together
  const pizzeriaCampaign = PORTFOLIO_DESIGNS.filter((d) => d.campaignGroup === 'pizzeria');
  const foodBevCampaign = PORTFOLIO_DESIGNS.filter((d) => d.campaignGroup === 'food-bev');
  const luxuryBeautyCampaign = PORTFOLIO_DESIGNS.filter((d) => d.campaignGroup === 'luxury-beauty');

  const totalCount =
    PORTFOLIO_VIDEOS.length + PORTFOLIO_DESIGNS.length + PORTFOLIO_WEBSITES.length;

  const showFilms = viewMode === 'all' || activeCategory === 'films';
  const showSocial = viewMode === 'all' || activeCategory === 'social';
  const showWebsites = viewMode === 'all' || activeCategory === 'websites';

  return (
    <div id="portfolio" className="pt-8 pb-20 sm:pt-12 sm:pb-28 min-h-[80vh]">
      {/* Page Top Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-8 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBackHome}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#124E52]/15 hover:border-[#124E52] text-xs sm:text-sm font-extrabold text-[#0B393B] hover:bg-[#C9E5D3]/30 transition-all cursor-pointer whitespace-nowrap shrink-0"
          >
            {isAr ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            <span>{isAr ? 'العودة إلى الرئيسية' : 'Back to Home'}</span>
          </button>

          <div className="text-xs font-bold text-[#124E52]/70 whitespace-nowrap tabular-nums">
            <span>{STUDIO_CONFIG.instagramHandle}</span>
            <span aria-hidden="true"> · </span>
            <span>{totalCount} {isAr ? 'عملاً' : 'Selected Works'}</span>
          </div>
        </div>

        {/* Hero Editorial Intro */}
        <header className="max-w-4xl text-start mb-10 sm:mb-12">
          <div className="text-xs sm:text-sm font-extrabold text-[#124E52] tracking-wide mb-3">
            {isAr ? 'أعمال مختارة · STUDIO ADAM' : 'Selected Works · STUDIO ADAM'}
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-[#0B393B] tracking-tight leading-[1.08] mb-5 text-balance">
            {isAr
              ? 'أعمال تُصنع لتبقى في الذاكرة وتدفع العلامات للأمام.'
              : 'Creative Direction Crafted to Move Brands Forward.'}
          </h1>

          <p className="text-base sm:text-lg text-[#124E52]/75 font-semibold leading-relaxed max-w-2xl">
            {isAr
              ? 'ثلاثة مسارات متخصصة — أفلام إعلانية، حملات سوشيال ميديا، ومواقع رقمية — لكل مسار لغته البصرية ومساحته المستقلة.'
              : 'Three distinct creative disciplines — Advertising Films, Social Media Campaigns, and Website Design — each curated in its own editorial space.'}
          </p>
        </header>
      </div>

      {/* Sticky Top Category Jump & Mode Navigation */}
      <div className="sticky top-[72px] z-30 bg-[#F5F0E6]/92 backdrop-blur-xl border-y border-[#124E52]/12 mb-12 sm:mb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* 01 / 02 / 03 Direct Jump Links */}
          <nav
            aria-label={isAr ? 'أقسام الأعمال' : 'Portfolio categories'}
            className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-0.5 sm:pb-0"
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => handleCategoryJump(cat.key)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#124E52] text-[#F5F0E6] shadow-xs'
                      : 'bg-white/75 text-[#0B393B] border border-[#124E52]/12 hover:bg-white hover:border-[#124E52]/35'
                  }`}
                >
                  <span
                    className={`font-mono text-[11px] tabular-nums ${
                      isActive ? 'text-[#C9E5D3]' : 'text-[#124E52]/60'
                    }`}
                  >
                    {cat.num}
                  </span>
                  <span aria-hidden="true" className="opacity-40">—</span>
                  <span>{isAr ? cat.labelAr : cat.labelEn}</span>
                </button>
              );
            })}
          </nav>

          {/* View Mode Toggle: All Chapters vs Single Focused Chapter */}
          <div className="inline-flex items-center p-1 bg-white/80 border border-[#124E52]/12 rounded-full self-start sm:self-auto shrink-0">
            <button
              type="button"
              onClick={() => setViewMode('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-colors whitespace-nowrap cursor-pointer ${
                viewMode === 'all'
                  ? 'bg-[#0B393B] text-[#F5F0E6]'
                  : 'text-[#124E52]/75 hover:text-[#0B393B]'
              }`}
            >
              {isAr ? 'جميع الأقسام' : 'All Chapters'}
            </button>
            <button
              type="button"
              onClick={() => setViewMode('focus')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-colors whitespace-nowrap cursor-pointer ${
                viewMode === 'focus'
                  ? 'bg-[#0B393B] text-[#F5F0E6]'
                  : 'text-[#124E52]/75 hover:text-[#0B393B]'
              }`}
            >
              {isAr ? 'تركيز القسم المختار' : 'Focused View'}
            </button>
          </div>
        </div>
      </div>

      {/* Category Sections with Smooth Transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={viewMode === 'focus' ? activeCategory : 'all-chapters'}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-20 sm:space-y-28"
        >
          {/* ================================================================
              CATEGORY 01 — ADVERTISING FILMS (Dark Cinema Presentation)
              ================================================================ */}
          {showFilms && (
            <section id="cat-films" className="scroll-mt-32">
              <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="bg-[#0B393B] text-[#F5F0E6] rounded-3xl p-6 sm:p-10 lg:p-14 border border-[#C9E5D3]/15 shadow-2xl overflow-hidden relative dots-dark">
                  {/* Chapter Intro Header */}
                  <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 mb-10 border-b border-[#C9E5D3]/15 text-start">
                    <div className="max-w-2xl">
                      <div className="font-mono text-xs sm:text-sm font-bold text-[#C9E5D3] tracking-widest mb-3 tabular-nums">
                        {isAr ? 'القسم 01 · الإنتاج المرئي' : 'CATEGORY 01 · COMMERCIAL REELS'}
                      </div>
                      <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-3">
                        {isAr ? 'الأفلام الإعلانية' : 'Advertising Films'}
                      </h2>
                      <p className="text-base sm:text-xl font-bold text-[#C9E5D3]">
                        {isAr ? 'قصص تحرّك العلامات التجارية.' : 'Stories that move brands.'}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-[#F5F0E6]/75 font-semibold max-w-sm leading-relaxed">
                      {isAr
                        ? 'إخراج ومونتاج إعلانات UGC سينمائية عالية الاحتفاظ بالمشاهد — مرّر للمعاينة أو اضغط لفتح المشغّل الكامل.'
                        : 'Director-led commercial reels engineered for retention — hover any film to preview or click for full cinema playback.'}
                    </p>
                  </div>

                  {/* Editorial Row 1: Lead Featured Film + Director Notes */}
                  {leadFilm && (
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pb-12 mb-12 border-b border-[#C9E5D3]/15">
                      <div className="lg:col-span-5 flex justify-center lg:justify-start">
                        <VideoFilmCard
                          item={leadFilm}
                          isAr={isAr}
                          onOpen={setSelectedItem}
                          featured
                        />
                      </div>

                      <div className="lg:col-span-7 text-start">
                        <div className="text-xs font-mono font-bold text-[#C9E5D3] mb-3 tabular-nums">
                          {isAr ? 'العمل الرئيسي · 01' : 'LEAD FEATURE · FILM 01'}
                        </div>

                        <h3 className="text-2xl sm:text-4xl font-black text-white leading-tight mb-3">
                          {isAr ? leadFilm.titleAr : leadFilm.titleEn}
                        </h3>

                        <div className="text-sm font-bold text-[#C9E5D3]/90 flex items-center gap-2 mb-6">
                          <span>{isAr ? leadFilm.clientAr : leadFilm.clientEn}</span>
                          <span aria-hidden="true">·</span>
                          <span>{isAr ? leadFilm.categoryAr : leadFilm.categoryEn}</span>
                        </div>

                        <p className="text-sm sm:text-base text-[#F5F0E6]/85 font-semibold leading-relaxed max-w-xl mb-8">
                          {isAr ? leadFilm.briefAr : leadFilm.briefEn}
                        </p>

                        <div className="flex flex-wrap items-center gap-3">
                          <button
                            type="button"
                            onClick={() => setSelectedItem(leadFilm)}
                            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#C9E5D3] hover:bg-[#F5F0E6] text-[#0B393B] text-xs sm:text-sm font-black transition-colors cursor-pointer whitespace-nowrap"
                          >
                            <Play className="w-4 h-4 fill-current" />
                            <span>{isAr ? 'شاهد الفيلم كاملاً' : 'Watch Full Film'}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              onOpenInquiry(
                                isAr ? 'طلب فيلم إعلاني مشابه' : 'Custom Advertising Film Inquiry'
                              )
                            }
                            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-[#F5F0E6] border border-[#C9E5D3]/25 text-xs sm:text-sm font-extrabold transition-colors cursor-pointer whitespace-nowrap"
                          >
                            <span>{isAr ? 'اطلب فيلماً مشابهاً' : 'Commission Similar Film'}</span>
                            <ArrowUpRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Editorial Row 2 & 3: Remaining 6 Films in Balanced 3-Column Cinema Grid */}
                  <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {remainingFilms.map((film) => (
                      <VideoFilmCard
                        key={film.id}
                        item={film}
                        isAr={isAr}
                        onOpen={setSelectedItem}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ================================================================
              CATEGORY 02 — SOCIAL MEDIA DESIGN (Editorial Campaign Gallery)
              ================================================================ */}
          {showSocial && (
            <section id="cat-social" className="scroll-mt-32">
              <div className="max-w-6xl mx-auto px-4 sm:px-6">
                {/* Category Intro Header */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 mb-12 border-b border-[#124E52]/15 text-start">
                  <div className="max-w-2xl">
                    <div className="font-mono text-xs sm:text-sm font-bold text-[#124E52] tracking-widest mb-3 tabular-nums">
                      {isAr ? 'القسم 02 · الحملات البصرية' : 'CATEGORY 02 · CAMPAIGNS & VISUALS'}
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-black text-[#0B393B] tracking-tight mb-3">
                      {isAr ? 'تصاميم السوشيال ميديا' : 'Social Media Design'}
                    </h2>
                    <p className="text-base sm:text-xl font-bold text-[#124E52]">
                      {isAr
                        ? 'مرئيات تمنح العلامات حضوراً لافتاً.'
                        : 'Visuals that make brands stand out.'}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-[#124E52]/75 font-semibold max-w-sm leading-relaxed">
                    {isAr
                      ? 'تصاميم وحملات ثابتة منظّمة حسب المشروع والهوية — اضغط على أي تصميم لمعاينته بدقة كاملة.'
                      : 'Static campaigns grouped thoughtfully by brand and series — click any artwork to view at full resolution.'}
                  </p>
                </div>

                <div className="space-y-16">
                  {/* Campaign Sub-Group A: Artisan Pizzeria (2 works from same project side by side) */}
                  <div>
                    <div className="flex items-baseline justify-between gap-4 mb-6 text-start">
                      <div>
                        <span className="text-xs font-mono font-bold text-[#124E52]/60 block mb-1">
                          {isAr ? 'حملة 01 · مشروع مشترك' : 'CAMPAIGN 01 · CONNECTED SERIES'}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-black text-[#0B393B]">
                          {isAr ? 'حملة المخبز الإيطالي — Pizzeria Artisan' : 'Artisan Pizzeria Campaign'}
                        </h3>
                      </div>
                      <span className="text-xs font-bold text-[#124E52]/70 tabular-nums shrink-0">
                        {isAr ? 'تصميمان مترابطان' : '2 Campaign Pieces'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                      {pizzeriaCampaign.map((item) => (
                        <SocialDesignCard
                          key={item.id}
                          item={item}
                          isAr={isAr}
                          onOpen={setSelectedItem}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Campaign Sub-Group B: Food & Beverage Campaigns */}
                  <div className="pt-8 border-t border-[#124E52]/10">
                    <div className="flex items-baseline justify-between gap-4 mb-6 text-start">
                      <div>
                        <span className="text-xs font-mono font-bold text-[#124E52]/60 block mb-1">
                          {isAr ? 'حملة 02 · مطاعم ومشروبات' : 'CAMPAIGN 02 · CULINARY & BEVERAGE'}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-black text-[#0B393B]">
                          {isAr ? 'حملات الأغذية والمشروبات' : 'Food & Beverage Campaigns'}
                        </h3>
                      </div>
                      <span className="text-xs font-bold text-[#124E52]/70 tabular-nums shrink-0">
                        {foodBevCampaign.length} {isAr ? 'تصاميم' : 'Designs'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                      {foodBevCampaign.map((item) => (
                        <SocialDesignCard
                          key={item.id}
                          item={item}
                          isAr={isAr}
                          onOpen={setSelectedItem}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Campaign Sub-Group C: Luxury Fragrance & Skincare Campaigns */}
                  <div className="pt-8 border-t border-[#124E52]/10">
                    <div className="flex items-baseline justify-between gap-4 mb-6 text-start">
                      <div>
                        <span className="text-xs font-mono font-bold text-[#124E52]/60 block mb-1">
                          {isAr ? 'حملة 03 · الفخامة والعناية' : 'CAMPAIGN 03 · LUXURY & SKINCARE'}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-black text-[#0B393B]">
                          {isAr ? 'حملات العطور والعناية بالبشرة' : 'Fragrance & Skincare Campaigns'}
                        </h3>
                      </div>
                      <span className="text-xs font-bold text-[#124E52]/70 tabular-nums shrink-0">
                        {luxuryBeautyCampaign.length}{' '}
                        {isAr ? 'تصاميم' : 'Designs'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7 items-start">
                      {luxuryBeautyCampaign.map((item) => (
                        <SocialDesignCard
                          key={item.id}
                          item={item}
                          isAr={isAr}
                          onOpen={setSelectedItem}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ================================================================
              CATEGORY 03 — WEBSITE DESIGN (Realistic Desktop Browser Showcases)
              ================================================================ */}
          {showWebsites && (
            <section id="cat-websites" className="scroll-mt-32">
              <div className="max-w-6xl mx-auto px-4 sm:px-6">
                {/* Category Intro Header */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 mb-12 border-b border-[#124E52]/15 text-start">
                  <div className="max-w-2xl">
                    <div className="font-mono text-xs sm:text-sm font-bold text-[#124E52] tracking-widest mb-3 tabular-nums">
                      {isAr ? 'القسم 03 · التجارب الرقمية' : 'CATEGORY 03 · DIGITAL PLATFORMS'}
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-black text-[#0B393B] tracking-tight mb-3">
                      {isAr ? 'تصميم المواقع الإلكترونية' : 'Website Design'}
                    </h2>
                    <p className="text-base sm:text-xl font-bold text-[#124E52]">
                      {isAr
                        ? 'تجارب رقمية مصممة لهدف واضح.'
                        : 'Digital experiences built with purpose.'}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-[#124E52]/75 font-semibold max-w-sm leading-relaxed">
                    {isAr
                      ? 'مواقع إلكترونية حقيقية تجمع بين جمالية التصميم وسرعة الأداء — اضغط على أي مشروع لزيارة الموقع الحي.'
                      : 'Live client and studio flagship builds — click any browser showcase or Visit Website button to open the live experience.'}
                  </p>
                </div>

                {/* Premium Website Showcase Cards */}
                <div className="space-y-10 sm:space-y-12">
                  {PORTFOLIO_WEBSITES.map((site, index) => (
                    <WebsiteShowcaseCard
                      key={site.id}
                      site={site}
                      indexNumber={`0${index + 1}`}
                      isAr={isAr}
                      reversed={index % 2 === 1}
                      onInspect={setSelectedItem}
                    />
                  ))}
                </div>
              </div>
            </section>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Bottom Studio Commission Banner */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-20 sm:mt-24">
        <div className="relative bg-[#124E52] text-[#F5F0E6] rounded-3xl p-7 sm:p-11 dots-dark shadow-xl overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border border-[#C9E5D3]/15">
          <div className="relative z-10 text-start max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
              {isAr ? 'هل أنت مستعد لمشروعك القادم؟' : 'Ready to Build Your Brand Presence?'}
            </h3>
            <p className="text-xs sm:text-sm text-[#F5F0E6]/85 font-semibold leading-relaxed">
              {isAr
                ? 'سواء كنت تحتاج إلى فيلم إعلاني، حملة سوشيال ميديا متكاملة، أو موقع إلكتروني خاص بعلامتك — نبدأ معك من الفكرة إلى الأثر.'
                : 'From high-retention commercial films and social campaigns to bespoke web platforms — let’s turn your idea into lasting impact.'}
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() =>
                onOpenInquiry(isAr ? 'طلب مشروع متكامل' : 'Full Studio Project Inquiry')
              }
              className="px-6 py-3.5 rounded-full bg-[#C9E5D3] hover:bg-[#F5F0E6] text-[#0B393B] text-xs sm:text-sm font-black shadow-md transition-all cursor-pointer inline-flex items-center gap-2 whitespace-nowrap shrink-0"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{isAr ? 'ابدأ مشروعك الآن' : 'Start a Project'}</span>
            </button>

            <button
              type="button"
              onClick={onGoToCalculator}
              className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-[#F5F0E6] border border-[#C9E5D3]/30 text-xs sm:text-sm font-extrabold transition-all cursor-pointer inline-flex items-center gap-2 whitespace-nowrap shrink-0"
            >
              <Calculator className="w-4 h-4" />
              <span>{isAr ? 'احسب باقتك' : 'Package Calculator'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen Cinema & Artwork Lightbox */}
      {selectedItem && (
        <div
          data-lenis-prevent
          onClick={() => setSelectedItem(null)}
          className="fixed inset-0 z-[80] bg-[#062224]/92 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label={isAr ? selectedItem.titleAr : selectedItem.titleEn}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl bg-[#F5F0E6] text-[#0B393B] rounded-3xl border border-[#124E52]/20 shadow-2xl overflow-hidden flex flex-col lg:flex-row max-h-[92vh]"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedItem(null)}
              aria-label={isAr ? 'إغلاق' : 'Close'}
              className="absolute top-3.5 end-3.5 z-30 w-10 h-10 rounded-full bg-white/95 hover:bg-[#124E52] text-[#0B393B] hover:text-white border border-[#124E52]/15 flex items-center justify-center shadow-md transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Media Viewport */}
            <div className="relative flex-1 bg-[#0B393B] flex items-center justify-center min-h-[340px] lg:min-h-[540px] p-4 sm:p-6 overflow-hidden">
              {selectedItem.kind === 'video' ? (
                <video
                  key={selectedItem.id}
                  src={selectedItem.src}
                  controls
                  autoPlay
                  playsInline
                  loop
                  className="max-h-[65vh] lg:max-h-[82vh] w-auto max-w-full rounded-xl shadow-2xl"
                />
              ) : (
                <img
                  key={selectedItem.id}
                  src={selectedItem.src}
                  alt={isAr ? selectedItem.titleAr : selectedItem.titleEn}
                  referrerPolicy="no-referrer"
                  className="max-h-[65vh] lg:max-h-[82vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
                />
              )}

              {/* Prev / Next Navigation Buttons */}
              <button
                type="button"
                onClick={isAr ? handleNext : handlePrev}
                aria-label={isAr ? 'التالي' : 'Previous'}
                className="absolute start-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#F5F0E6]/95 hover:bg-white text-[#0B393B] flex items-center justify-center shadow-lg transition-transform hover:scale-105 cursor-pointer"
              >
                {isAr ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
              </button>

              <button
                type="button"
                onClick={isAr ? handlePrev : handleNext}
                aria-label={isAr ? 'السابق' : 'Next'}
                className="absolute end-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#F5F0E6]/95 hover:bg-white text-[#0B393B] flex items-center justify-center shadow-lg transition-transform hover:scale-105 cursor-pointer"
              >
                {isAr ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </button>
            </div>

            {/* Details Sidebar */}
            <div className="w-full lg:w-[340px] shrink-0 p-6 sm:p-8 flex flex-col justify-between bg-[#F5F0E6] border-t lg:border-t-0 lg:border-s border-[#124E52]/15 text-start overflow-y-auto">
              <div>
                <div className="text-xs font-extrabold text-[#124E52] mb-2">
                  {isAr ? selectedItem.formatAr : selectedItem.formatEn}
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-[#0B393B] leading-snug mb-2">
                  {isAr ? selectedItem.titleAr : selectedItem.titleEn}
                </h3>

                <div className="text-xs font-bold text-[#124E52]/70 flex items-center gap-1.5 mb-5 pb-4 border-b border-[#124E52]/15">
                  <span>{isAr ? selectedItem.clientAr : selectedItem.clientEn}</span>
                  <span aria-hidden="true">·</span>
                  <span>{isAr ? selectedItem.categoryAr : selectedItem.categoryEn}</span>
                </div>

                <p className="text-sm text-[#0B393B]/85 font-semibold leading-relaxed mb-6">
                  {isAr ? selectedItem.briefAr : selectedItem.briefEn}
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#124E52]/15">
                {selectedItem.websiteUrl && (
                  <a
                    href={selectedItem.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-5 rounded-full bg-[#C9E5D3] hover:bg-[#124E52] text-[#0B393B] hover:text-white text-sm font-black flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>{isAr ? 'زيارة الموقع' : 'VISIT WEBSITE'}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => {
                    const title = isAr ? selectedItem.titleAr : selectedItem.titleEn;
                    setSelectedItem(null);
                    onOpenInquiry(
                      isAr ? `طلب عمل مشابه: ${title}` : `Similar Project Request: ${title}`
                    );
                  }}
                  className="w-full py-3.5 px-5 rounded-full bg-[#124E52] hover:bg-[#0B393B] text-[#F5F0E6] text-sm font-black flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{isAr ? 'اطلب عملاً مشابهاً الآن' : 'Request Similar Work'}</span>
                </button>

                <div className="text-center text-xs font-bold text-[#124E52]/70">
                  {STUDIO_CONFIG.instagramHandle} · <span dir="ltr">{STUDIO_CONFIG.phoneFormatted}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
