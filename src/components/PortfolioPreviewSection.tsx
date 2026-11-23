import React, { useRef, useState } from 'react';
import {
  Play,
  Volume2,
  VolumeX,
  ArrowUpRight,
  Layers,
  Film,
  Image as ImageIcon,
  Monitor,
} from 'lucide-react';
import { Language } from '../types';
import {
  PORTFOLIO_VIDEOS,
  PORTFOLIO_DESIGNS,
  PORTFOLIO_WEBSITES,
  PortfolioItem,
} from '../data/portfolioData';

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
      className="group relative rounded-2xl overflow-hidden bg-[#0B393B] border border-[#124E52]/15 aspect-[9/16] cursor-pointer shadow-md card-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#124E52]"
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
          className="w-9 h-9 rounded-full bg-[#0B393B]/70 hover:bg-[#0B393B] backdrop-blur-md text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer"
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
          className="px-3 py-1.5 rounded-full bg-[#0B393B]/75 hover:bg-[#124E52] backdrop-blur-md text-white border border-white/20 text-[11px] font-extrabold inline-flex items-center gap-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          <span>{isAr ? 'المعرض' : 'Selected Works'}</span>
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
        <div className="w-12 h-12 rounded-full bg-[#F5F0E6]/95 text-[#124E52] shadow-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
          <Play className="w-5 h-5 fill-[#124E52] ms-0.5" />
        </div>
      </div>

      {/* Bottom Contrast Scrim */}
      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#0B393B]/95 via-[#0B393B]/65 to-transparent text-white text-start">
        <div className="text-[11px] font-bold text-[#C9E5D3] flex items-center gap-1.5 truncate">
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
  const totalCount =
    PORTFOLIO_VIDEOS.length + PORTFOLIO_DESIGNS.length + PORTFOLIO_WEBSITES.length;

  return (
    <section id="portfolio" className="py-14 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-white/90 backdrop-blur-md border border-[#124E52]/15 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Editorial Copy + Primary "عرض الأعمال" CTA */}
            <div className="lg:col-span-5 text-start flex flex-col justify-center">
              <div className="text-xs sm:text-sm font-extrabold text-[#124E52] mb-2.5">
                {isAr ? 'معرض الأعمال المختارة · STUDIO ADAM' : 'Selected Works · STUDIO ADAM'}
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-[#0B393B] leading-tight mb-4 tracking-tight text-balance">
                {isAr
                  ? 'شاهد جودة أعمالنا على أرض الواقع'
                  : 'Crafted Visual Stories Across Film, Social & Web'}
              </h2>

              <p className="text-sm sm:text-base text-[#124E52]/75 font-semibold leading-relaxed mb-6">
                {isAr
                  ? 'استكشف معرض الأعمال المستقل المصنّف إلى ثلاثة أقسام احترافية: الأفلام الإعلانية، تصاميم السوشيال ميديا، وتصاميم المواقع الإلكترونية.'
                  : 'Explore our dedicated agency showcase organized across three specialized disciplines: Advertising Films, Social Media Design, and Website Design.'}
              </p>

              {/* Unboxed Portfolio Summary */}
              <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2 text-xs font-extrabold text-[#124E52] pb-6 mb-6 border-b border-[#124E52]/15">
                <span className="inline-flex items-center gap-1.5">
                  <Film className="w-3.5 h-3.5 text-[#124E52]" />
                  <span className="tabular-nums">
                    {isAr ? `${PORTFOLIO_VIDEOS.length} أفلام` : `${PORTFOLIO_VIDEOS.length} Films`}
                  </span>
                </span>
                <span aria-hidden="true" className="text-[#124E52]/40">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-[#124E52]" />
                  <span className="tabular-nums">
                    {isAr ? `${PORTFOLIO_DESIGNS.length} تصاميم` : `${PORTFOLIO_DESIGNS.length} Designs`}
                  </span>
                </span>
                <span aria-hidden="true" className="text-[#124E52]/40">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <Monitor className="w-3.5 h-3.5 text-[#124E52]" />
                  <span className="tabular-nums">
                    {isAr ? `${PORTFOLIO_WEBSITES.length} مواقع` : `${PORTFOLIO_WEBSITES.length} Websites`}
                  </span>
                </span>
              </div>

              <div>
                <button
                  type="button"
                  onClick={onOpenPortfolioPage}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-[#124E52] hover:bg-[#0B393B] text-[#F5F0E6] text-sm sm:text-base font-black shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Layers className="w-4 h-4 text-[#C9E5D3]" />
                  <span>
                    {isAr ? `عرض الأعمال (${totalCount} عملاً)` : `Explore Selected Works (${totalCount})`}
                  </span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 2 Featured Film Previews */}
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
