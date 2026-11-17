import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Play,
  Volume2,
  VolumeX,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Film,
  Image as ImageIcon,
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  MessageCircle,
  Calculator,
} from 'lucide-react';
import { Language } from '../types';
import {
  PORTFOLIO_VIDEOS,
  PORTFOLIO_DESIGNS,
  PortfolioItem,
} from '../data/portfolioData';
import { STUDIO_CONFIG } from '../data/brandingData';

interface PortfolioSectionProps {
  lang: Language;
  onOpenInquiry: (initialPackage?: string) => void;
  onBackHome: () => void;
  onGoToCalculator: () => void;
}

type FilterTab = 'all' | 'videos' | 'designs';

interface VideoCardProps {
  item: PortfolioItem;
  isAr: boolean;
  onOpen: (item: PortfolioItem) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ item, isAr, onOpen }) => {
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
      className="group relative rounded-[24px] overflow-hidden bg-[#0a3f3a] border border-[#dcd6c4] aspect-[9/16] cursor-pointer shadow-sm card-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d4f49]"
    >
      <video
        ref={videoRef}
        src={`${item.src}#t=0.8`}
        muted={isMuted}
        loop
        playsInline
        preload="metadata"
        className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
      />

      {/* Top Controls (Sound + Expand) */}
      <div className="absolute top-3 inset-x-3 z-20 flex items-center justify-between gap-2 pointer-events-none">
        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? (isAr ? 'تشغيل الصوت' : 'Unmute video') : (isAr ? 'كتم الصوت' : 'Mute video')}
          className="pointer-events-auto w-9 h-9 rounded-full bg-black/45 hover:bg-black/70 backdrop-blur-md text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        <span
          className="w-9 h-9 rounded-full bg-black/45 group-hover:bg-[#0d4f49] backdrop-blur-md text-white border border-white/20 flex items-center justify-center transition-colors"
          aria-hidden="true"
        >
          <Maximize2 className="w-4 h-4" />
        </span>
      </div>

      {/* Center Play Indicator (fades gently when playing on hover) */}
      <div
        className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${
          isPlaying ? 'opacity-0' : 'opacity-100'
        }`}
        aria-hidden="true"
      >
        <div className="w-13 h-13 rounded-full bg-white/90 text-[#0b423d] shadow-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
          <Play className="w-5 h-5 fill-[#0b423d] ms-0.5" />
        </div>
      </div>

      {/* Bottom Contrast Scrim & Clean Metadata */}
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 bg-gradient-to-t from-[#072623]/95 via-[#072623]/65 to-transparent text-white text-start">
        <div className="text-[11px] font-bold text-[#bfe8c8] flex items-center gap-1.5 truncate">
          <span>{isAr ? item.clientAr : item.clientEn}</span>
          <span aria-hidden="true">·</span>
          <span>{isAr ? item.categoryAr : item.categoryEn}</span>
        </div>
        <h4 className="font-black text-sm sm:text-base leading-snug mt-1 text-white">
          {isAr ? item.titleAr : item.titleEn}
        </h4>
      </div>
    </div>
  );
};

interface DesignCardProps {
  item: PortfolioItem;
  isAr: boolean;
  onOpen: (item: PortfolioItem) => void;
}

const DesignCard: React.FC<DesignCardProps> = ({ item, isAr, onOpen }) => {
  const isSquareLogo = item.aspect === '1/1';

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
      className="group relative rounded-[24px] overflow-hidden bg-[#f8f3e8] border border-[#dcd6c4] aspect-[4/5] cursor-pointer shadow-sm card-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d4f49]"
    >
      <img
        src={item.src}
        alt={isAr ? item.titleAr : item.titleEn}
        loading="lazy"
        referrerPolicy="no-referrer"
        className={`w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] ${
          isSquareLogo ? 'object-contain bg-[#f7f0df] p-5' : 'object-cover'
        }`}
      />

      {/* Top-end Expand Icon */}
      <div className="absolute top-3 end-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <span className="w-9 h-9 rounded-full bg-black/50 backdrop-blur-md text-white border border-white/20 flex items-center justify-center">
          <Maximize2 className="w-4 h-4" />
        </span>
      </div>

      {/* Bottom Scrim Overlay */}
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 bg-gradient-to-t from-[#072623]/95 via-[#072623]/70 to-transparent text-white text-start">
        <div className="text-[11px] font-bold text-[#bfe8c8] flex items-center gap-1.5 truncate">
          <span>{isAr ? item.clientAr : item.clientEn}</span>
          <span aria-hidden="true">·</span>
          <span>{isAr ? item.categoryAr : item.categoryEn}</span>
        </div>
        <h4 className="font-black text-sm sm:text-base leading-snug mt-1 text-white">
          {isAr ? item.titleAr : item.titleEn}
        </h4>
      </div>
    </div>
  );
};

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  lang,
  onOpenInquiry,
  onBackHome,
  onGoToCalculator,
}) => {
  const isAr = lang === 'ar';
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const visibleList: PortfolioItem[] =
    activeTab === 'videos'
      ? PORTFOLIO_VIDEOS
      : activeTab === 'designs'
      ? PORTFOLIO_DESIGNS
      : [...PORTFOLIO_VIDEOS, ...PORTFOLIO_DESIGNS];

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

  const showVideos = activeTab === 'all' || activeTab === 'videos';
  const showDesigns = activeTab === 'all' || activeTab === 'designs';

  return (
    <section id="portfolio" className="pt-8 pb-16 sm:pt-12 sm:pb-24 min-h-[75vh]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Back Navigation Bar */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBackHome}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#dcd6c4] hover:border-[#0d4f49] text-xs sm:text-sm font-extrabold text-[#0b423d] hover:bg-[#ece7d8] transition-all cursor-pointer whitespace-nowrap shrink-0 shadow-2xs"
          >
            {isAr ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            <span>{isAr ? 'العودة إلى الرئيسية' : 'Back to Home'}</span>
          </button>

          <span className="text-xs font-bold text-[#5f7a72] whitespace-nowrap">
            {STUDIO_CONFIG.instagramHandle} · <span dir="ltr">15 {isAr ? 'عملاً' : 'Works'}</span>
          </span>
        </div>

        {/* Section Header + Interactive Filter Segmented Control */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="max-w-2xl text-start">
            <div className="text-xs sm:text-sm font-extrabold text-[#0d4f49] mb-2">
              {isAr ? 'معرض الأعمال الكامل' : 'Complete Portfolio'}
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-[#0b423d] mb-3 tracking-tight">
              {isAr
                ? 'إعلانات UGC وتصاميم سوشيال ميديا'
                : 'UGC Ad Reels & Social Media Design'}
            </h1>

            <p className="text-sm sm:text-base text-[#5f7a72] font-semibold leading-relaxed">
              {isAr
                ? 'أعمال إعلانية وبصرية حقيقية مصممة لرفع المبيعات وجذب الانتباه من الثانية الأولى — اضغط على أي عمل للمشاهدة بالحجم الكامل.'
                : 'Real commercial reels and high-converting social designs crafted to capture attention from frame one — click any work to preview.'}
            </p>
          </div>

          {/* Interactive Segmented Filter Tabs */}
          <div
            role="tablist"
            aria-label={isAr ? 'تصفية معرض الأعمال' : 'Filter portfolio'}
            className="inline-flex flex-wrap items-center gap-1.5 p-1.5 bg-white border border-[#dcd6c4] rounded-full shadow-xs self-start lg:self-end shrink-0"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'all'}
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#0d4f49] text-white shadow-xs'
                  : 'text-[#5f7a72] hover:text-[#0b423d] hover:bg-[#f3efe4]'
              }`}
            >
              {isAr ? 'الكل (15)' : 'All Works (15)'}
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'videos'}
              onClick={() => setActiveTab('videos')}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'videos'
                  ? 'bg-[#0d4f49] text-white shadow-xs'
                  : 'text-[#5f7a72] hover:text-[#0b423d] hover:bg-[#f3efe4]'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>{isAr ? 'فيديوهات UGC (7)' : 'UGC Ads (7)'}</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'designs'}
              onClick={() => setActiveTab('designs')}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'designs'
                  ? 'bg-[#0d4f49] text-white shadow-xs'
                  : 'text-[#5f7a72] hover:text-[#0b423d] hover:bg-[#f3efe4]'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>{isAr ? 'تصاميم السوشيال (8)' : 'Social Designs (8)'}</span>
            </button>
          </div>
        </div>

        {/* 1. UGC Ad Videos Subsection */}
        {showVideos && (
          <div className={showDesigns ? 'mb-14 sm:mb-16' : ''}>
            <div className="flex items-center justify-between gap-4 pb-3 mb-6 border-b border-[#dcd6c4]">
              <div className="flex items-center gap-2.5">
                <Film className="w-5 h-5 text-[#0d4f49]" />
                <h3 className="text-lg sm:text-xl font-black text-[#0b423d]">
                  {isAr ? 'فيديوهات الإعلانات والريلز (UGC)' : 'UGC Commercial Reels'}
                </h3>
              </div>
              <span className="text-xs font-bold text-[#5f7a72] tabular-nums">
                {isAr ? '7 أعمال · مرّر للمعاينة' : '7 reels · Hover to preview'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {PORTFOLIO_VIDEOS.map((video) => (
                <VideoCard
                  key={video.id}
                  item={video}
                  isAr={isAr}
                  onOpen={setSelectedItem}
                />
              ))}

              {/* 8th Symmetrical Studio Commission Card */}
              <div
                onClick={() =>
                  onOpenInquiry(
                    isAr ? 'إنتاج فيديو إعلاني UGC مخصص' : 'Custom UGC Commercial Video'
                  )
                }
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onOpenInquiry(
                      isAr ? 'إنتاج فيديو إعلاني UGC مخصص' : 'Custom UGC Commercial Video'
                    );
                  }
                }}
                className="relative rounded-[24px] overflow-hidden bg-[#0d4f49] text-white border border-[#0d4f49] aspect-[9/16] p-6 sm:p-7 flex flex-col justify-between cursor-pointer dots-dark shadow-md card-hover-dark text-start"
              >
                <div className="relative z-10">
                  <span className="text-xs font-extrabold text-[#bfe8c8] block mb-2">
                    {isAr ? 'إنتاج مخصص · 3 د.أ / فيديو' : 'Custom Production · 3 JOD / reel'}
                  </span>
                  <h4 className="text-2xl font-black leading-snug text-white mb-3">
                    {isAr ? 'إعلان مشروعك القادم يبدأ هنا' : 'Your Brand Reel Starts Here'}
                  </h4>
                  <p className="text-xs sm:text-sm text-white/80 font-semibold leading-relaxed">
                    {isAr
                      ? 'فيديوهات UGC وموشن عالية التحويل تبرز منتجك بأفضل إضاءة ومونتاج خلال أيام.'
                      : 'High-converting UGC product commercials and motion edits delivered within days.'}
                  </p>
                </div>

                <div className="relative z-10 space-y-3">
                  <div className="text-xs font-mono font-bold text-white/70 border-t border-white/15 pt-3">
                    {STUDIO_CONFIG.instagramHandle}
                  </div>
                  <div className="w-full py-3 px-4 rounded-full bg-white text-[#0b423d] text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-sm">
                    <span>{isAr ? 'اطلب إعلانك الآن' : 'Book Your Ad Reel'}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. Social Media Designs Subsection */}
        {showDesigns && (
          <div>
            <div className="flex items-center justify-between gap-4 pb-3 mb-6 border-b border-[#dcd6c4]">
              <div className="flex items-center gap-2.5">
                <ImageIcon className="w-5 h-5 text-[#0d4f49]" />
                <h3 className="text-lg sm:text-xl font-black text-[#0b423d]">
                  {isAr
                    ? 'تصاميم السوشيال ميديا والهوية البصرية'
                    : 'Social Media & Brand Designs'}
                </h3>
              </div>
              <span className="text-xs font-bold text-[#5f7a72] tabular-nums">
                {isAr ? '8 تصاميم · اضغط للتكبير' : '8 works · Click to inspect'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {PORTFOLIO_DESIGNS.map((design) => (
                <DesignCard
                  key={design.id}
                  item={design}
                  isAr={isAr}
                  onOpen={setSelectedItem}
                />
              ))}
            </div>
          </div>
        )}

        {/* Bottom Commission CTA Strip */}
        <div className="mt-14 sm:mt-16 relative bg-[#0d4f49] text-white rounded-[32px] p-7 sm:p-10 dots-dark shadow-xl overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="relative z-10 text-start max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
              {isAr ? 'عجبك الأسلوب؟ لنصنع حملتك القادمة' : 'Like What You See? Let’s Build Yours'}
            </h3>
            <p className="text-xs sm:text-sm text-white/80 font-semibold leading-relaxed">
              {isAr
                ? 'احجز بوستات سوشيال ميديا بـ 1 د.أ للتصميم أو ريلز UGC بـ 3 د.أ للفيديو، أو احسب باقتك المخصصة فوراً.'
                : 'Book scroll-stopping social posts from 1 JOD, UGC reels from 3 JOD, or calculate your custom bundle.'}
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() =>
                onOpenInquiry(isAr ? 'طلب حملة إعلانية وتصاميم' : 'Ad Reels & Social Design Campaign')
              }
              className="px-6 py-3.5 rounded-full bg-white hover:bg-[#ece7d8] text-[#0b423d] text-xs sm:text-sm font-black shadow-md transition-all cursor-pointer inline-flex items-center gap-2 whitespace-nowrap shrink-0"
            >
              <MessageCircle className="w-4 h-4 text-[#0d4f49]" />
              <span>{isAr ? 'اطلب عملاً الآن' : 'Request Work Now'}</span>
            </button>

            <button
              type="button"
              onClick={onGoToCalculator}
              className="px-6 py-3.5 rounded-full bg-white/14 hover:bg-white/22 text-white border border-white/30 text-xs sm:text-sm font-extrabold transition-all cursor-pointer inline-flex items-center gap-2 whitespace-nowrap shrink-0"
            >
              <Calculator className="w-4 h-4" />
              <span>{isAr ? 'احسب باقتك' : 'Package Calculator'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {selectedItem && (
        <div
          data-lenis-prevent
          onClick={() => setSelectedItem(null)}
          className="fixed inset-0 z-[80] bg-[#072623]/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label={isAr ? selectedItem.titleAr : selectedItem.titleEn}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl bg-[#f3efe4] text-[#0b423d] rounded-[28px] border border-[#dcd6c4] shadow-2xl overflow-hidden flex flex-col lg:flex-row max-h-[92vh]"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedItem(null)}
              aria-label={isAr ? 'إغلاق' : 'Close'}
              className="absolute top-3.5 end-3.5 z-30 w-10 h-10 rounded-full bg-white/95 hover:bg-[#0d4f49] text-[#0b423d] hover:text-white border border-[#dcd6c4] flex items-center justify-center shadow-md transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Media Viewport */}
            <div className="relative flex-1 bg-[#082c29] flex items-center justify-center min-h-[340px] lg:min-h-[540px] p-4 sm:p-6 overflow-hidden">
              {selectedItem.kind === 'video' ? (
                <video
                  key={selectedItem.id}
                  src={selectedItem.src}
                  controls
                  autoPlay
                  playsInline
                  loop
                  className="max-h-[65vh] lg:max-h-[82vh] w-auto max-w-full rounded-2xl shadow-2xl"
                />
              ) : (
                <img
                  key={selectedItem.id}
                  src={selectedItem.src}
                  alt={isAr ? selectedItem.titleAr : selectedItem.titleEn}
                  referrerPolicy="no-referrer"
                  className="max-h-[65vh] lg:max-h-[82vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl"
                />
              )}

              {/* Prev / Next Navigation Buttons */}
              <button
                type="button"
                onClick={isAr ? handleNext : handlePrev}
                aria-label={isAr ? 'التالي' : 'Previous'}
                className="absolute start-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#0b423d] flex items-center justify-center shadow-lg transition-transform hover:scale-105 cursor-pointer"
              >
                {isAr ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
              </button>

              <button
                type="button"
                onClick={isAr ? handlePrev : handleNext}
                aria-label={isAr ? 'السابق' : 'Next'}
                className="absolute end-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#0b423d] flex items-center justify-center shadow-lg transition-transform hover:scale-105 cursor-pointer"
              >
                {isAr ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </button>
            </div>

            {/* Details Sidebar */}
            <div className="w-full lg:w-[340px] shrink-0 p-6 sm:p-8 flex flex-col justify-between bg-[#f3efe4] border-t lg:border-t-0 lg:border-s border-[#dcd6c4] text-start overflow-y-auto">
              <div>
                <div className="text-xs font-extrabold text-[#0d4f49] mb-2">
                  {isAr ? selectedItem.formatAr : selectedItem.formatEn}
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-[#0b423d] leading-snug mb-2">
                  {isAr ? selectedItem.titleAr : selectedItem.titleEn}
                </h3>

                <div className="text-xs font-bold text-[#5f7a72] flex items-center gap-1.5 mb-5 pb-4 border-b border-[#dcd6c4]">
                  <span>{isAr ? selectedItem.clientAr : selectedItem.clientEn}</span>
                  <span aria-hidden="true">·</span>
                  <span>{isAr ? selectedItem.categoryAr : selectedItem.categoryEn}</span>
                </div>

                <p className="text-sm text-[#14352f] font-semibold leading-relaxed mb-6">
                  {isAr ? selectedItem.briefAr : selectedItem.briefEn}
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#dcd6c4]">
                <button
                  type="button"
                  onClick={() => {
                    const title = isAr ? selectedItem.titleAr : selectedItem.titleEn;
                    setSelectedItem(null);
                    onOpenInquiry(
                      isAr ? `طلب عمل مشابه: ${title}` : `Similar Project Request: ${title}`
                    );
                  }}
                  className="w-full py-3.5 px-5 rounded-full bg-[#0d4f49] hover:bg-[#0a3f3a] text-white text-sm font-black flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{isAr ? 'اطلب عملاً مشابهاً الآن' : 'Request Similar Work'}</span>
                </button>

                <div className="text-center text-xs font-bold text-[#5f7a72]">
                  {STUDIO_CONFIG.instagramHandle} · <span dir="ltr">{STUDIO_CONFIG.phoneFormatted}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
