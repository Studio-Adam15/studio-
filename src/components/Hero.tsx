import React from 'react';
import { Zap, Calculator, Check, MessageCircle, Sparkles, ArrowDown } from 'lucide-react';
import { Language } from '../types';
import { STUDIO_CONFIG } from '../data/brandingData';
import { AnimatedContent } from './reactbits/AnimatedContent';

interface HeroProps {
  lang: Language;
  onOpenInquiry: (initialPackage?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onOpenInquiry }) => {
  const isAr = lang === 'ar';

  return (
    <div className="relative">
      {/* 1. Arched Hero Band (Matching ktrwny-ahtrafy-mthl-hdha.oni.build) */}
      <section className="relative pt-6 sm:pt-10">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          {/* Floating Chip 1 (Top / Side) */}
          <div className="hidden lg:flex absolute top-12 end-12 z-20 bg-white text-[#0b423d] rounded-2xl px-4 py-2.5 shadow-lg border border-[#dcd6c4] items-center gap-3 animate-floaty-1 select-none">
            <div className="w-9 h-9 rounded-xl bg-[#e7efe9] flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 text-[#0d4f49] fill-[#0d4f49]" />
            </div>
            <div className="flex flex-col text-start leading-tight">
              <span className="font-extrabold text-xs sm:text-sm text-[#0b423d]">
                {isAr ? 'تسليم سريع' : 'Fast Delivery'}
              </span>
              <span className="text-[11px] font-bold text-[#5f7a72] mt-0.5">
                {isAr ? 'خلال 2 إلى 4 أيام عمل' : '2-4 business days'}
              </span>
            </div>
          </div>

          {/* Floating Chip 2 (Bottom / Side) */}
          <div className="hidden lg:flex absolute bottom-12 start-12 z-20 bg-white text-[#0b423d] rounded-2xl px-4 py-2.5 shadow-lg border border-[#dcd6c4] items-center gap-3 animate-floaty-2 select-none">
            <div className="w-9 h-9 rounded-xl bg-[#e7efe9] flex items-center justify-center shrink-0">
              <Calculator className="w-5 h-5 text-[#0d4f49]" />
            </div>
            <div className="flex flex-col text-start leading-tight">
              <span className="font-extrabold text-xs sm:text-sm text-[#0b423d]">
                {isAr ? 'حساب فوري' : 'Instant Estimate'}
              </span>
              <span className="text-[11px] font-bold text-[#5f7a72] mt-0.5">
                {isAr ? 'بالدينار الأردني' : 'In Jordanian Dinar (JOD)'}
              </span>
            </div>
          </div>

          {/* The Curved Teal Band */}
          <div className="relative bg-[#0d4f49] text-white rounded-3xl sm:rounded-[44px] px-6 py-16 sm:py-24 text-center overflow-hidden dots-dark shadow-xl">
            {/* Ambient Radial Spotlight inside band */}
            <div
              className="absolute -top-32 left-1/2 -translate-x-1/2 w-[620px] h-[620px] rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 65%)',
              }}
              aria-hidden="true"
            />

            <AnimatedContent
              distance={40}
              direction="vertical"
              duration={0.85}
              ease="power3.out"
              trigger="mount"
              className="relative z-10 max-w-2xl mx-auto flex flex-col items-center"
            >
              {/* Live Status Pill Chip */}
              <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/12 border border-white/20 text-white text-xs sm:text-sm font-bold mb-6">
                <span className="w-2 h-2 rounded-full bg-[#25d366] animate-blink shrink-0" />
                <span>{isAr ? 'حساب فوري بالدينار الأردني' : 'Instant Pricing in JOD'}</span>
              </span>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.3] sm:leading-[1.25] mb-5">
                {isAr ? (
                  <>
                    هويتك البصرية تبدأ{' '}
                    <span className="text-[#bfe8c8]">من هنا</span>
                  </>
                ) : (
                  <>
                    Your Visual Identity Starts{' '}
                    <span className="text-[#bfe8c8]">Here</span>
                  </>
                )}
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-lg text-white/90 leading-relaxed font-semibold max-w-xl mb-8">
                {isAr
                  ? 'شعارات، هوية بصرية، بوستات وريلز، ومواقع إلكترونية — تصميم يحوّل فكرتك إلى علامة يشاركها الناس.'
                  : 'Logos, brand identity, social posts & reels, and websites — design that transforms your idea into a memorable brand.'}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center gap-3.5">
                <a
                  href="#pricing"
                  className="px-6 py-3 rounded-full bg-white hover:bg-[#ece7d8] text-[#0b423d] text-sm sm:text-base font-extrabold shadow-md hover:shadow-lg transition-all active:scale-95"
                >
                  {isAr ? 'اكتشف الباقات' : 'Explore Packages'}
                </a>

                <a
                  href="#calculator"
                  className="px-6 py-3 rounded-full bg-white/14 hover:bg-white/20 text-white border border-white/30 text-sm sm:text-base font-extrabold transition-all active:scale-95"
                >
                  {isAr ? 'احسب باقتك' : 'Calculate Custom'}
                </a>
              </div>
            </AnimatedContent>
          </div>
        </div>
      </section>

      {/* 2. Flagship Launch Offer ('باقة انطلاقة') matching ktrwny-ahtrafy-mthl-hdha.oni.build */}
      <section id="pricing" className="pt-10 pb-8 sm:pt-14 sm:pb-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <AnimatedContent
            distance={50}
            direction="vertical"
            duration={0.8}
            ease="power3.out"
            threshold={0.1}
          >
            <div className="relative bg-[#0d4f49] text-white rounded-[32px] p-6 sm:p-9 shadow-xl dots-dark border border-[#0d4f49] card-hover-dark">
            {/* Tag Badge */}
            <div className="flex justify-start mb-3">
              <span className="inline-block px-3.5 py-1 rounded-full bg-white/15 text-white text-xs font-extrabold border border-white/20">
                {isAr ? 'عرض الافتتاح' : 'Launch Offer'}
              </span>
            </div>

            {/* Plan Title & Subtitle */}
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
              {isAr ? 'باقة انطلاقة' : 'Launch Package'}
            </h3>

            <p className="text-xs sm:text-sm text-white/85 font-semibold mb-6">
              {isAr
                ? 'كل اللي يحتاجه محلك عشان يبدأ على السوشيال ميديا بقوة'
                : 'Everything your business needs to launch with authority on social media'}
            </p>

            {/* Feature List with Mint Checkmarks */}
            <ul className="space-y-3 pt-4 border-t border-white/20 mb-6">
              <li className="flex items-start gap-3 text-xs sm:text-sm font-bold text-white">
                <Check className="w-5 h-5 text-[#bfe8c8] shrink-0 mt-0.5" strokeWidth={3} />
                <span>{isAr ? 'لوجو احترافي مع هوية لونية متكاملة' : 'Professional Logo & Complete Color System'}</span>
              </li>

              <li className="flex items-start gap-3 text-xs sm:text-sm font-bold text-white">
                <Check className="w-5 h-5 text-[#bfe8c8] shrink-0 mt-0.5" strokeWidth={3} />
                <span>{isAr ? '10 بوستات إعلانية جاهزة للنشر' : '10 Ready-to-Publish Promotional Posts'}</span>
              </li>

              <li className="flex items-start gap-3 text-xs sm:text-sm font-bold text-white">
                <Check className="w-5 h-5 text-[#bfe8c8] shrink-0 mt-0.5" strokeWidth={3} />
                <span>{isAr ? 'صنع موقع إلكتروني احترافي (مشمول مجاناً في العرض)' : 'Custom Pro Website (Included Free in Launch Offer)'}</span>
              </li>
            </ul>

            {/* Price Row */}
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-4xl sm:text-5xl font-black text-white tabular-nums">
                {isAr ? '25 دينار' : '25 JOD'}
              </span>
              <span className="text-base sm:text-lg font-bold text-white/80">
                {isAr ? 'فقط' : 'only'}
              </span>
            </div>

            <p className="text-xs sm:text-sm font-bold text-white/75 mb-6">
              {isAr ? 'سعر خاص لأول 5 عملاء — الكمية محدودة' : 'Special rate for the first 5 clients — Limited quantity'}
            </p>

            {/* Action Button */}
            <button
              onClick={() => onOpenInquiry(isAr ? 'باقة انطلاقة (عرض الافتتاح)' : 'Launch Package (Opening Deal)')}
              className="w-full py-3.5 px-6 rounded-full bg-white hover:bg-[#ece7d8] text-[#0b423d] text-sm sm:text-base font-black transition-all shadow-md hover:shadow-lg active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5 text-[#0d4f49]" />
              <span>{isAr ? 'راسلنا دايركت واحجز مكانك' : 'Message Us Directly to Reserve'}</span>
            </button>

            {/* Footline */}
            <div className="mt-4 text-center text-xs text-white/70 font-mono font-bold tracking-wide">
              Studio Adam · <span dir="ltr">078 513 1386</span> · {STUDIO_CONFIG.instagramHandle}
            </div>
          </div>
        </AnimatedContent>
      </div>
    </section>
  </div>
  );
};
