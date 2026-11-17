import React from 'react';
import { PenTool, Megaphone, Video, Globe, Sparkles, Layers, ArrowUpRight } from 'lucide-react';
import { Language } from '../types';

interface ServicesSectionProps {
  lang: Language;
  onOpenInquiry: (serviceName?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  lang,
  onOpenInquiry,
}) => {
  const isAr = lang === 'ar';

  const services = [
    {
      id: 'logo',
      titleAr: 'تصميم الشعارات',
      titleEn: 'Logo Design',
      descAr: 'شعار أصلي معتمد بنماذج متعددة واستخدامات أفقية وعامودية تناسب كافة الاستخدامات.',
      descEn: 'Original, approved logo marks with versatile horizontal and vertical lockups.',
      icon: PenTool,
    },
    {
      id: 'branding',
      titleAr: 'الهوية البصرية',
      titleEn: 'Visual Identity',
      descAr: 'بناء هوية بصرية متناسقة الألوان والخطوط تمنح مشروعك حضوراً ثابتاً ومهيباً في السوق.',
      descEn: 'Cohesive color systems, typography, and graphic assets giving your business an authoritative presence.',
      icon: Layers,
    },
    {
      id: 'social',
      titleAr: 'بوستات وريلز السوشيال',
      titleEn: 'Social Posts & Reels',
      descAr: 'تصاميم ومونتاج احترافي يوقف التمرير ويضاعف تفاعل صفحتك على إنستغرام.',
      descEn: 'Scroll-stopping graphic designs and high-impact reels crafted for viral reach and engagement.',
      icon: Video,
    },
    {
      id: 'websites',
      titleAr: 'مواقع إلكترونية احترافية',
      titleEn: 'Custom Websites',
      descAr: 'مواقع سريعة متوافقة مع الهواتف تحوّل الزوار إلى اتصالات وطلبات مباشرة عبر واتساب.',
      descEn: 'Ultra-fast responsive websites engineered to turn visitors into direct inquiries via WhatsApp.',
      icon: Globe,
      specialTag: isAr ? 'عرض خاص: 25 د.أ' : 'Special Deal: 25 JOD',
    },
  ];

  return (
    <section id="services" className="py-14 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="inline-block text-xs sm:text-sm font-extrabold text-[#0d4f49] bg-[#e7efe9] rounded-full px-4 py-1.5 mb-3">
            {isAr ? 'خدماتنا' : 'Our Services'}
          </span>

          <h2 className="text-2xl sm:text-4xl font-black text-[#0b423d] mb-2 tracking-tight">
            {isAr
              ? 'الهوية، والمحتوى، والموقع — تحت سقف واحد'
              : 'Identity, Content, and Web — Under One Roof'}
          </h2>

          <p className="text-sm sm:text-base text-[#5f7a72] font-semibold">
            {isAr
              ? 'كل ما يحتاجه محلك ليظهر احترافياً على الإنترنت.'
              : 'Everything your local business needs to establish an authoritative digital presence.'}
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((srv) => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.id}
                className="bg-white border border-[#dcd6c4] rounded-[26px] p-7 flex flex-col justify-between shadow-sm card-hover"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#0d4f49] text-white flex items-center justify-center shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>

                    {srv.specialTag && (
                      <span className="text-xs font-black px-3 py-1 bg-[#e7efe9] text-[#0d4f49] rounded-full border border-[#0d4f49]/20">
                        {srv.specialTag}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-black text-[#0b423d] mb-2">
                    {isAr ? srv.titleAr : srv.titleEn}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#5f7a72] leading-relaxed font-semibold mb-6">
                    {isAr ? srv.descAr : srv.descEn}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#dcd6c4] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => onOpenInquiry(isAr ? srv.titleAr : srv.titleEn)}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-black text-[#0d4f49] hover:text-[#0a3f3a] cursor-pointer"
                  >
                    <span>{isAr ? 'اطلب الخدمة الآن' : 'Request Service'}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  <span className="text-xs font-mono font-bold text-[#5f7a72]">
                    STUDIO ADAM
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
