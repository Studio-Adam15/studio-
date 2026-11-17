import React from 'react';
import { Language } from '../types';

interface TestimonialsSectionProps {
  lang: Language;
  onOpenInquiry: (initialPackage?: string) => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  lang,
}) => {
  const isAr = lang === 'ar';

  const reviews = [
    {
      id: 'rev1',
      stars: '★★★★★',
      textAr: '«الهوية اللي صمموها لنا غيّرت شكل محلك بالكامل — العملاء صاروا يسألون عن مصممنا.»',
      textEn: '"The brand identity they crafted transformed our store completely — customers constantly ask who designed our branding."',
      clientAr: 'محل عطور',
      clientEn: 'Perfume Boutique',
      initial: isAr ? 'ع' : 'P',
    },
    {
      id: 'rev2',
      stars: '★★★★★',
      textAr: '«البوستات والريلز ضاعفت تفاعل صفحتنا، والتسليم كان أسرع من المتوقع وبجودة خيالية.»',
      textEn: '"The ad posts and reels multiplied our page engagement, and turnaround was lightning-fast."',
      clientAr: 'كافيه وكوفي شوب',
      clientEn: 'Specialty Cafe',
      initial: isAr ? 'ك' : 'C',
    },
    {
      id: 'rev3',
      stars: '★★★★★',
      textAr: '«الموقع السريع مربوط بالواتساب جاب لنا طلبات وحجوزات مباشرة من أول أسبوع.»',
      textEn: '"The fast responsive landing page with WhatsApp chat brought us direct customer orders in the first week."',
      clientAr: 'متجر حلويات ومعجنات',
      clientEn: 'Artisan Bakery',
      initial: isAr ? 'ح' : 'B',
    },
  ];

  return (
    <section id="reviews" className="py-14 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="inline-block text-xs sm:text-sm font-extrabold text-[#0d4f49] bg-[#e7efe9] rounded-full px-4 py-1.5 mb-3">
            {isAr ? 'قسم النجاح وثقة العملاء' : 'Client Success Stories'}
          </span>

          <h2 className="text-2xl sm:text-4xl font-black text-[#0b423d] mb-2 tracking-tight">
            {isAr ? 'مشاعر حقيقية صُنعت من الصفر' : 'Real Businesses We Transformed'}
          </h2>
        </div>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white border border-[#dcd6c4] rounded-[28px] p-6 sm:p-7 flex flex-col justify-between shadow-sm card-hover"
            >
              <div>
                <div className="text-amber-500 text-base tracking-widest mb-3 select-none">
                  {rev.stars}
                </div>

                <p className="text-sm sm:text-base text-[#14352f] leading-relaxed font-bold mb-6">
                  {isAr ? rev.textAr : rev.textEn}
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-[#dcd6c4]">
                <div className="w-10 h-10 rounded-full bg-[#0d4f49] text-white flex items-center justify-center font-black text-sm shrink-0">
                  {rev.initial}
                </div>
                <div>
                  <b className="text-sm font-black text-[#0b423d] block leading-tight">
                    {isAr ? rev.clientAr : rev.clientEn}
                  </b>
                  <small className="text-xs font-bold text-[#5f7a72]">
                    {isAr ? 'عميل ستوديو آدم' : 'Studio Adam Client'}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
