import React, { useRef, useState } from 'react';
import {
  Play,
  Volume2,
  VolumeX,
  ArrowUpRight,
  Layers,
  Film,
  Image as ImageIcon,
} from 'lucide-react';
import { Language } from '../types';
import { PORTFOLIO_VIDEOS, PortfolioItem } from '../data/portfolioData';

interface PortfolioPreviewSectionProps {
  lang: Language;
  onOpenPortfolioPage: () => void;
}

interface PreviewVideoCardProps {
  item: PortfolioItem;
  isAr: boolean;
  onOpenPortfolioPage: () => void;
}

const PreviewVideoCard: React.FC<PreviewVideoCardProps> = ({
  item,
  isAr,
  onOpenPortfolioPage,
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

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
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
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={togglePlay}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpenPortfolioPage();
        }
      }}
      className="group relative rounded-[24px] overflow-hidden bg-[#0a3f3a] border border-[#dcd6c4] aspect-[9/16] cursor-pointer shadow-md card-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d4f49]"
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

      {/* Top Sound Control */}
      <div className="absolute top-3 inset-x-3 z-20 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? (isAr ? 'تشغيل الصوت' : 'Unmute video') : (isAr ? 'كتم الصوت' : 'Mute video')}
          className="w-9 h-9 rounded-full bg-black/45 hover:bg-black/75 backdrop-blur-md text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenPortfolioPage();
          }}
          aria-label={isAr ? 'عرض كل الأعمال' : 'View full portfolio'}
          className="px-3 py-1.5 rounded-full bg-black/50 hover:bg-[#0d4f49] backdrop-blur-md text-white border border-white/20 text-[11px] font-extrabold inline-flex items-center gap-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          <span>{isAr ? 'عرض الكل' : 'View All'}</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Center Play Indicator */}
      <div
        className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${
          isPlaying ? 'opacity-0' : 'opacity-100'
        }`}
        aria-hidden="true"
      >
        <div className="w-12 h-12 rounded-full bg-white/90 text-[#0b423d] shadow-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
          <Play className="w-5 h-5 fill-[#0b423d] ms-0.5" />
        </div>
      </div>

      {/* Bottom Contrast Scrim */}
      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#072623]/95 via-[#072623]/65 to-transparent text-white text-start">
        <div className="text-[11px] font-bold text-[#bfe8c8] flex items-center gap-1.5 truncate">
          <span>{isAr ? item.clientAr : item.clientEn}</span>
          <span aria-hidden="true">·</span>
          <span>{isAr ? item.categoryAr : item.categoryEn}</span>
        </div>
        <h4 className="font-black text-sm sm:text-base leading-snug mt-0.5 text-white">
          {isAr ? item.titleAr : item.titleEn}
        </h4>
      </div>
    </div>
  );
};

export const PortfolioPreviewSection: React.FC<PortfolioPreviewSectionProps> = ({
  lang,
  onOpenPortfolioPage,
}) => {
  const isAr = lang === 'ar';
  const featuredVideos = PORTFOLIO_VIDEOS.slice(0, 2);

  return (
    <section id="portfolio" className="py-14 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-white/90 backdrop-blur-md border border-[#dcd6c4] rounded-[32px] p-6 sm:p-10 lg:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Editorial Copy + Primary "عرض الأعمال" CTA */}
            <div className="lg:col-span-5 text-start flex flex-col justify-center">
              <div className="text-xs sm:text-sm font-extrabold text-[#0d4f49] mb-2.5">
                {isAr ? 'معرض الأعمال · إعلانات وتصاميم حقيقية' : 'Portfolio · Real Reels & Designs'}
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-[#0b423d] leading-tight mb-4 tracking-tight">
                {isAr
                  ? 'شاهد جودة أعمالنا على أرض الواقع'
                  : 'See Our Work in Action'}
              </h2>

              <p className="text-sm sm:text-base text-[#5f7a72] font-semibold leading-relaxed mb-6">
                {isAr
                  ? 'هذه لمحة سريعة من أحدث إعلانات الـ UGC. انتقل إلى صفحة معرض الأعمال المستقلة لمشاهدة الفيديوهات السبعة الكاملة وتصاميم السوشيال ميديا.'
                  : 'Here is a quick glimpse of our latest UGC commercials. Open the dedicated Portfolio page to explore all 7 ad reels and 8 social media designs.'}
              </p>

              {/* Unboxed Portfolio Summary */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm font-extrabold text-[#14352f] pb-6 mb-6 border-b border-[#dcd6c4]">
                <span className="inline-flex items-center gap-1.5">
                  <Film className="w-4 h-4 text-[#0d4f49]" />
                  <span className="tabular-nums">{isAr ? '7 فيديوهات UGC' : '7 UGC Reels'}</span>
                </span>
                <span aria-hidden="true" className="text-[#5f7a72]">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-[#0d4f49]" />
                  <span className="tabular-nums">{isAr ? '8 تصاميم سوشيال' : '8 Social Designs'}</span>
                </span>
              </div>

              <div>
                <button
                  type="button"
                  onClick={onOpenPortfolioPage}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-[#0d4f49] hover:bg-[#0a3f3a] text-white text-sm sm:text-base font-black shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Layers className="w-4 h-4" />
                  <span>{isAr ? 'عرض الأعمال (15 عمل)' : 'View Portfolio (15 Works)'}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 2 Featured UGC Video Previews */}
            <div className="lg:col-span-7 grid grid-cols-2 gap-4 sm:gap-5">
              {featuredVideos.map((video) => (
                <PreviewVideoCard
                  key={video.id}
                  item={video}
                  isAr={isAr}
                  onOpenPortfolioPage={onOpenPortfolioPage}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
