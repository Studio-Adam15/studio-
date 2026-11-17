import React from 'react';
import { Instagram, ArrowUpRight, Sparkles, Layers, Globe, Video, Image as ImageIcon } from 'lucide-react';
import { Language } from '../types';
import { STUDIO_CONFIG } from '../data/brandingData';

interface OfficialPostsShowcaseProps {
  lang: Language;
  onOpenInquiry: (initialPackage?: string) => void;
}

export const OfficialPostsShowcase: React.FC<OfficialPostsShowcaseProps> = ({
  lang,
  onOpenInquiry,
}) => {
  const isAr = lang === 'ar';

  const works = [
    {
      id: 'brand-identity',
      titleAr: 'هوية بصرية — نموذج',
      titleEn: 'Visual Identity — Concept',
      subAr: 'شعار ودليل استخدام متكامل',
      subEn: 'Logo system & style guide',
      bgClass: 'from-[#0d4f49] to-[#1b7a6e]',
      icon: Layers,
    },
    {
      id: 'website-showcase',
      titleAr: 'موقع تعريفي — نموذج',
      titleEn: 'Landing Page — Showcase',
      subAr: 'تصميم سريع متوافق مع كافة الهواتف',
      subEn: 'Fast mobile-responsive design',
      bgClass: 'from-[#14544c] to-[#2a9d8f]',
      icon: Globe,
    },
    {
      id: 'motion-reels',
      titleAr: 'ريلز وموشن — نموذج',
      titleEn: 'Reels & Motion — Showcase',
      subAr: 'فيديو قصير سريع الانتشار',
      subEn: 'Viral short-form visual storytelling',
      bgClass: 'from-[#0a3f3a] to-[#155e55]',
      icon: Video,
    },
    {
      id: 'social-campaign',
      titleAr: 'حملة سوشيال — نموذج',
      titleEn: 'Social Campaign — Grid',
      subAr: 'بوستات إعلانية توقف التمرير',
      subEn: 'Scroll-stopping promotional posts',
      bgClass: 'from-[#116158] to-[#25a08f]',
      icon: ImageIcon,
    },
  ];

  return (
    <section id="works" className="py-14 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="inline-block text-xs sm:text-sm font-extrabold text-[#0d4f49] bg-[#e7efe9] rounded-full px-4 py-1.5 mb-3">
              {isAr ? 'أعمالنا' : 'Our Work'}
            </span>

            <h2 className="text-2xl sm:text-4xl font-black text-[#0b423d] mb-2 tracking-tight">
              {isAr ? 'نماذج من أسلوبنا' : 'Showcase of Our Aesthetic'}
            </h2>

            <p className="text-sm sm:text-base text-[#5f7a72] font-semibold max-w-xl">
              {isAr
                ? 'مشاعر حقيقية صُنعت من الصفر — تصفّح نماذج أعمالنا وتواصل معنا لبدء مشروعك.'
                : 'Authentic visual executions crafted from scratch — explore our work and reserve your slot.'}
            </p>
          </div>

          <a
            href={STUDIO_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#dcd6c4] text-xs sm:text-sm font-extrabold text-[#0d4f49] hover:bg-[#ece7d8] transition-all shadow-xs self-start md:self-end shrink-0"
          >
            <Instagram className="w-4 h-4 text-[#0d4f49]" />
            <span>{isAr ? `تابعنا على ${STUDIO_CONFIG.instagramHandle}` : `Follow on ${STUDIO_CONFIG.instagramHandle}`}</span>
          </a>
        </div>

        {/* 4 Works Grid matching reference site */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {works.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => onOpenInquiry(isAr ? item.titleAr : item.titleEn)}
                className="group relative rounded-[26px] overflow-hidden border border-[#dcd6c4] aspect-4/3 cursor-pointer shadow-sm card-hover flex flex-col justify-between"
              >
                {/* Background Gradient Artwork */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.bgClass} flex items-center justify-center p-6 transition-transform duration-300 group-hover:scale-105`}>
                  <Icon className="w-16 h-16 text-white/90 drop-shadow-sm" strokeWidth={1.5} />
                </div>

                {/* Bottom Tag Scrim */}
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 text-white bg-gradient-to-t from-[#0a3f3a]/95 via-[#0a3f3a]/60 to-transparent">
                  <div className="font-black text-sm sm:text-base leading-snug">
                    {isAr ? item.titleAr : item.titleEn}
                  </div>
                  <div className="text-[11px] font-bold text-white/80 mt-0.5">
                    {isAr ? item.subAr : item.subEn}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
