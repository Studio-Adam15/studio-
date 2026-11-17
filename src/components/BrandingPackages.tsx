import React from 'react';
import { Clock, Check, MessageCircle, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { PACKAGES_DATA } from '../data/brandingData';

interface BrandingPackagesProps {
  lang: Language;
  onSelectPackage: (packageName: string) => void;
}

export const BrandingPackages: React.FC<BrandingPackagesProps> = ({
  lang,
  onSelectPackage,
}) => {
  const isAr = lang === 'ar';

  return (
    <section id="packages" className="py-14 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="inline-block text-xs sm:text-sm font-extrabold text-[#0d4f49] bg-[#e7efe9] rounded-full px-4 py-1.5 mb-3">
            {isAr ? 'الباقات' : 'Packages'}
          </span>

          <h2 className="text-2xl sm:text-4xl font-black text-[#0b423d] mb-2 tracking-tight">
            {isAr
              ? 'اختر الباقة اللي تناسب مرحلتك'
              : 'Choose the Package for Your Stage'}
          </h2>

          <p className="text-sm sm:text-base text-[#5f7a72] font-semibold">
            {isAr
              ? 'أسعار واضحة بالدينار الأردني، بلا مصاريف مفاجئة.'
              : 'Clear pricing in Jordanian Dinar (JOD), no hidden costs.'}
          </p>
        </div>

        {/* 3 Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {PACKAGES_DATA.map((pkg) => {
            const price = isAr ? `${pkg.priceJod} دينار` : `${pkg.priceJod} JOD`;
            const name = isAr ? pkg.name : pkg.nameEn;
            const subtitle = isAr ? pkg.subtitle : pkg.subtitleEn;
            const timeline = isAr ? pkg.timeline : pkg.timelineEn;
            const features = isAr ? pkg.features : pkg.featuresEn;
            const isFeatured = pkg.popular;

            return (
              <div
                key={pkg.id}
                className={`rounded-[28px] p-6 sm:p-8 flex flex-col justify-between border transition-all relative ${
                  isFeatured
                    ? 'bg-[#0d4f49] text-white border-[#0d4f49] shadow-xl dots-dark card-hover-dark'
                    : 'bg-white text-[#14352f] border-[#dcd6c4] shadow-sm card-hover'
                }`}
              >
                {/* Popular Pill */}
                {isFeatured && (
                  <div className="absolute -top-3.5 start-6 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#0d4f49] text-xs font-black shadow-md border border-[#dcd6c4]">
                      <Sparkles className="w-3.5 h-3.5 text-[#0d4f49]" />
                      <span>{isAr ? 'العرض الأكثر طلباً' : 'Most Popular Deal'}</span>
                    </span>
                  </div>
                )}

                <div>
                  {/* Title & Subtitle */}
                  <h3 className={`text-xl sm:text-2xl font-black mb-1.5 ${isFeatured ? 'text-white' : 'text-[#0b423d]'}`}>
                    {name}
                  </h3>

                  <p className={`text-xs sm:text-sm font-semibold mb-4 ${isFeatured ? 'text-white/80' : 'text-[#5f7a72]'}`}>
                    {subtitle}
                  </p>

                  {/* Delivery Timeline Badge */}
                  <div className="mb-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                        isFeatured
                          ? 'bg-white/14 text-white'
                          : 'bg-[#e7efe9] text-[#0d4f49]'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>{timeline}</span>
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1.5">
                      <span className={`text-3xl sm:text-4xl font-black tabular-nums ${isFeatured ? 'text-white' : 'text-[#0b423d]'}`}>
                        {price}
                      </span>
                    </div>
                    <span className={`text-xs font-bold block mt-0.5 ${isFeatured ? 'text-white/70' : 'text-[#5f7a72]'}`}>
                      {isAr ? 'تكلفة شاملة لكامل المخرجات' : 'All-inclusive project price'}
                    </span>
                  </div>

                  {/* Features List */}
                  <ul className={`space-y-3 pt-4 border-t mb-8 ${isFeatured ? 'border-white/20' : 'border-[#dcd6c4]'}`}>
                    {features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm font-bold">
                        <Check
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            isFeatured ? 'text-[#bfe8c8]' : 'text-[#0d4f49]'
                          }`}
                          strokeWidth={2.5}
                        />
                        <span className={isFeatured ? 'text-white/95' : 'text-[#14352f]'}>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Direct Action Button */}
                <button
                  type="button"
                  onClick={() => onSelectPackage(name)}
                  className={`w-full py-3 px-5 rounded-full text-sm font-black transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm ${
                    isFeatured
                      ? 'bg-white hover:bg-[#ece7d8] text-[#0b423d] shadow-md hover:shadow-lg active:scale-98'
                      : 'bg-[#0d4f49] hover:bg-[#0a3f3a] text-white hover:shadow-md active:scale-98'
                  }`}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{isAr ? 'اختر هذه الباقة' : 'Select This Package'}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
