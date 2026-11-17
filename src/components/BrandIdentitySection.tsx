import React from 'react';
import { Sparkles, Layers, Compass, Eye } from 'lucide-react';
import { Language } from '../types';
import { STUDIO_CONFIG } from '../data/brandingData';
import { DotMatrixGrid } from './motion/DotMatrixGrid';
import { ScrollReveal } from './reactbits/ScrollReveal';
import { AnimatedList } from './reactbits/AnimatedList';

interface BrandIdentitySectionProps {
  lang: Language;
  onOpenInquiry: (initialPackage?: string) => void;
}

export const BrandIdentitySection: React.FC<BrandIdentitySectionProps> = ({
  lang,
  onOpenInquiry,
}) => {
  const isAr = lang === 'ar';

  const colorPillars = [
    {
      name: 'Deep Petrol Teal',
      hex: '#124E52',
      bgClass: 'bg-[#124E52]',
      textClass: 'text-[#F5F0E6]',
      borderClass: 'border border-[#124E52]',
      roleAr: 'اللون الأساسي للهوية',
      roleEn: 'Primary Brand Color',
      descAr: 'يرمز إلى الاحترافية والعمق والثقة، ويمنح العلامة التجارية طابعاً معمارياً مهيباً بعيداً عن الألوان التقليدية المكررة.',
      descEn: 'Symbolizes professionalism, depth, and trust, establishing an authoritative architectural visual signature.',
    },
    {
      name: 'Warm Ivory',
      hex: '#F5F0E6',
      bgClass: 'bg-[#F5F0E6]',
      textClass: 'text-[#124E52]',
      borderClass: 'border-2 border-[#124E52]/20',
      roleAr: 'اللون الأساسي للخلفيات',
      roleEn: 'Primary Canvas Color',
      descAr: 'اللون الأساسي للخلفيات والمساحات الفسيحة. يضيف الهدوء والأناقة، ويبرز الخطوط والتكوينات الهندسية والنصوص بوضوح مريح للعين.',
      descEn: 'Primary foundation for backgrounds and open space. Delivers quiet poise and frames typography with effortless legibility.',
    },
  ];

  const designPillars = [
    {
      titleAr: 'البساطة الحديثة',
      titleEn: 'Modern Simplicity',
      descAr: 'تصاميم نقية تتخلص من الفوضى والتعقيد الزائد وتركّز على جوهر الفكرة وقوتها.',
      descEn: 'Pure designs cutting through visual noise to magnify the core idea.',
      icon: Sparkles,
    },
    {
      titleAr: 'التوازن البصري',
      titleEn: 'Visual Balance',
      descAr: 'تناسق محكم بين الكتل والأوزان لراحة العين وثبات الصورة الذهنية لدى العملاء.',
      descEn: 'Harmonious weight distribution engineered for immediate recall.',
      icon: Layers,
    },
    {
      titleAr: 'التكوينات الهندسية',
      titleEn: 'Geometric Precision',
      descAr: 'بناء بصري قائم على الهندسة الدقيقة والخطوط الصريحة والنسب المتناسقة.',
      descEn: 'Structured grids, calculated geometry, and authoritative typography.',
      icon: Compass,
    },
    {
      titleAr: 'قوة المساحات الفارغة',
      titleEn: 'Negative Space Mastery',
      descAr: 'توظيف المساحة السلبية بذكاء لتتنفس العناصر ولإبراز الرسالة الأساسية.',
      descEn: 'Intelligent negative space giving every graphic component authority.',
      icon: Eye,
    },
  ];

  return (
    <section id="brand-identity" className="relative py-20 bg-[#F5F0E6]/85 backdrop-blur-[2px] text-[#124E52] border-b border-[#124E52]/10 overflow-hidden">
      {/* Saleem Dot Matrix Backdrop */}
      <DotMatrixGrid
        className="absolute inset-0 pointer-events-none"
        fade="radial"
        opacity={0.35}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-bold text-[#124E52]/70 mb-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#124E52]" />
            <span>{isAr ? 'الهوية البصرية واللونية' : 'Visual & Color Identity'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#124E52] tracking-tight mb-4">
            {isAr
              ? 'الألوان والهوية: فلسفة التصميم المعماري النقي'
              : 'Color & System: Pure Architectural Design Philosophy'}
          </h2>

          <p className="text-sm sm:text-base text-[#124E52]/80 leading-relaxed">
            {isAr
              ? 'تعتمد هوية ستوديو آدم على لونين رئيسيين متكاملين: البيترول تيل الداكن (#124E52) مع الأوف وايت العاجي (#F5F0E6)، لإنشاء حضور فخم ومميز يدوم في ذاكرة الجمهور.'
              : 'Studio Adam’s identity is anchored by two complementary colors: Deep Petrol Teal (#124E52) and Warm Ivory (#F5F0E6), creating an authoritative, timeless presence.'}
          </p>
        </div>

        {/* 2 Main Colors Showcase with Interactive Bento Card Hover */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {colorPillars.map((color, idx) => (
            <div
              key={color.hex}
              className={`rounded-3xl p-7 flex flex-col justify-between ${
                idx === 0 ? 'card-hover-dark' : 'card-hover'
              } ${color.bgClass} ${color.textClass} ${color.borderClass} shadow-sm relative overflow-hidden`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold tracking-wider uppercase opacity-80">
                    {isAr ? color.roleAr : color.roleEn}
                  </span>
                  <span className="font-mono text-sm font-bold opacity-90 dir-ltr bg-black/10 px-2.5 py-0.5 rounded-full">
                    {color.hex}
                  </span>
                </div>

                <h3 className="text-2xl font-black mb-3">
                  {color.name}
                </h3>

                <p className="text-xs sm:text-sm leading-relaxed opacity-90 mb-6">
                  {isAr ? color.descAr : color.descEn}
                </p>
              </div>

              <div className="pt-4 border-t border-current/15 flex items-center justify-between text-xs font-bold opacity-80">
                <span>{isAr ? 'الاستخدام: ركيزة أساسية' : 'Application: Core Pillar'}</span>
                <span>STUDIO ADAM</span>
              </div>
            </div>
          ))}
        </div>

        {/* Studio Slogan Reveal with React Bits ScrollReveal */}
        <div className="my-10 text-center">
          <ScrollReveal
            mode="enter"
            effect="rise"
            duration={0.9}
            highlightColor="#0d4f49"
            containerClassName="my-4"
            textClassName="text-2xl sm:text-4xl font-black text-[#0b423d] tracking-tight leading-snug"
          >
            {isAr ? STUDIO_CONFIG.sloganAr : STUDIO_CONFIG.sloganEn}
          </ScrollReveal>
          <p className="text-xs sm:text-sm text-[#5f7a72] font-bold max-w-lg mx-auto">
            {isAr
              ? 'مخرجات متكاملة تُسلَّم لك بجودة استثنائية وجاهزة للنشر الفوري'
              : 'End-to-end deliverables designed for instant market authority'}
          </p>
        </div>

        {/* Studio Adam Deliverables Interactive Checklist using React Bits AnimatedList */}
        <div className="mb-14 max-w-xl mx-auto">
          <AnimatedList
            theme="light"
            animation="pop"
            radius={20}
            gap={10}
            stagger={0.06}
            items={[
              {
                title: isAr ? 'الشعار الأصلي وملفات المتجه' : 'Original Logo & Vector Files',
                description: isAr ? 'SVG, PNG, PDF بدقة فائقة لكافة المنصات' : 'SVG, PNG, PDF ready for every touchpoint',
                meta: isAr ? 'مشمول' : 'Included'
              },
              {
                title: isAr ? 'دليل الهوية البصرية الشامل' : 'Brand Identity Guidelines',
                description: isAr ? 'تنسيق الخطوط، الألوان، وقواعد الاستخدام' : 'Typography, colors, and design standards',
                meta: isAr ? 'مشمول' : 'Included'
              },
              {
                title: isAr ? 'بوستات إعلانية توقف التمرير' : 'Scroll-Stopping Ad Posts',
                description: isAr ? 'تصاميم مخصصة للهواتف والإنستغرام' : 'Engineered for high CTR on Instagram',
                meta: isAr ? '1 د.أ / بوست' : '1 JOD / post'
              },
              {
                title: isAr ? 'ريلز وموشن جرافيك عصري' : 'Modern Motion & Reels',
                description: isAr ? 'فيديوهات قصيرة جذابة ومونتاج حديث' : 'Engaging short-form video storytelling',
                meta: isAr ? '3 د.أ / فيديو' : '3 JOD / reel'
              },
              {
                title: isAr ? 'موقع إلكتروني احترافي سريع' : 'Custom Pro Landing Page',
                description: isAr ? 'ربط فوري بالواتساب وإنستغرام للهواتف' : 'Instant WhatsApp & Instagram inquiry flow',
                meta: isAr ? '25 د.أ فقط' : '25 JOD only'
              }
            ]}
          />
        </div>

        {/* 4 Design Pillars with interactive hover */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {designPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.titleEn}
                className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-[#124E52]/15 shadow-2xs flex flex-col justify-between card-hover transition-all"
              >
                <div>
                  <div className="w-9 h-9 rounded-xl bg-[#124E52] text-[#F5F0E6] flex items-center justify-center mb-4">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-black text-[#124E52] mb-1.5">
                    {isAr ? pillar.titleAr : pillar.titleEn}
                  </h4>
                  <p className="text-xs text-[#124E52]/75 leading-relaxed">
                    {isAr ? pillar.descAr : pillar.descEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
