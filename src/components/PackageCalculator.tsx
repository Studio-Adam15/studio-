import React, { useState } from 'react';
import {
  Calculator,
  Plus,
  Minus,
  MessageCircle,
  Globe,
  Sparkles,
  Layers,
  Video,
  Image as ImageIcon,
  Check,
} from 'lucide-react';
import { Language } from '../types';
import { STUDIO_CONFIG } from '../data/brandingData';
import { AnimatedNumber } from './motion/AnimatedNumber';

interface PackageCalculatorProps {
  lang: Language;
  onOpenInquiry: (customDetails: string) => void;
}

export const PackageCalculator: React.FC<PackageCalculatorProps> = ({
  lang,
  onOpenInquiry,
}) => {
  const isAr = lang === 'ar';

  // Selections state
  const [logoOption, setLogoOption] = useState<'none' | 'logo' | 'full'>('none');
  const [postsCount, setPostsCount] = useState<number>(10);
  const [videosCount, setVideosCount] = useState<number>(2);
  const [includeWebsite, setIncludeWebsite] = useState<boolean>(true);

  // Pricing logic in JOD
  const logoPrices = {
    none: 0,
    logo: 10,
    full: 20,
  };

  const postUnitPrice = 1; // 1 JOD per post
  const videoUnitPrice = 3; // 3 JOD per reel
  const websitePrice = 25; // 25 JOD for custom website

  const logoCost = logoPrices[logoOption];
  const postsCost = postsCount * postUnitPrice;
  const videosCost = videosCount * videoUnitPrice;
  const websiteCost = includeWebsite ? websitePrice : 0;

  // Bundle discount if customer orders Logo + 10+ posts + Website
  const hasOpeningBundleDiscount = logoOption !== 'none' && postsCount >= 10 && includeWebsite;
  const rawTotal = logoCost + postsCost + videosCost + websiteCost;
  const discountAmount = hasOpeningBundleDiscount ? 20 : 0;
  const totalCost = Math.max(25, rawTotal - discountAmount);

  const handleInquireCustom = () => {
    const logoName =
      logoOption === 'full'
        ? isAr
          ? 'هوية بصرية شاملة (+20 د.أ)'
          : 'Full Brand Identity (+20 JOD)'
        : logoOption === 'logo'
        ? isAr
          ? 'لوجو احترافي + ألوان (+10 د.أ)'
          : 'Pro Logo + Colors (+10 JOD)'
        : isAr
        ? 'لدي شعار جاهز (0 د.أ)'
        : 'I Have a Logo (0 JOD)';

    const summary = isAr
      ? `باقة مخصصة بحاسبة ستوديو آدم:
• الشعار: ${logoName}
• عدد البوستات: ${postsCount} بوست (${postsCost} د.أ)
• عدد الفيديوهات: ${videosCount} ريلز (${videosCost} د.أ)
• موقع إلكتروني: ${includeWebsite ? 'نعم (25 د.أ)' : 'لا'}
${discountAmount > 0 ? `• خصم باقة الافتتاح: -${discountAmount} د.أ\n` : ''}• التكلفة الإجمالية التقديرية: ${totalCost} دينار أردني`
      : `Custom Package from Studio Adam Calculator:
• Logo: ${logoName}
• Posts: ${postsCount} posts (${postsCost} JOD)
• Videos: ${videosCount} reels (${videosCost} JOD)
• Website: ${includeWebsite ? 'Yes (25 JOD)' : 'No'}
${discountAmount > 0 ? `• Opening Bundle Discount: -${discountAmount} JOD\n` : ''}• Estimated Total Cost: ${totalCost} JOD`;

    onOpenInquiry(summary);
  };

  return (
    <section id="calculator" className="py-14 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="inline-block text-xs sm:text-sm font-extrabold text-[#0d4f49] bg-[#e7efe9] rounded-full px-4 py-1.5 mb-3">
            {isAr ? 'حاسبة فورية بالدينار الأردني' : 'Instant Calculator in JOD'}
          </span>

          <h2 className="text-2xl sm:text-4xl font-black text-[#0b423d] mb-2 tracking-tight">
            {isAr ? 'ابنِ باقتك المخصصة بنفسك' : 'Build Your Custom Package'}
          </h2>

          <p className="text-sm sm:text-base text-[#5f7a72] font-semibold">
            {isAr
              ? 'اختر ما تحتاجه وشاهد السعر يتكوّن أمامك لحظة بلحظة.'
              : 'Choose what you need and watch the total update in real-time.'}
          </p>
        </div>

        {/* The White Rounded Calculator Box matching reference site */}
        <div className="bg-white border border-[#dcd6c4] rounded-[32px] p-5 sm:p-9 shadow-md">
          {/* Step 1: Logo & Brand Identity */}
          <div className="border border-[#dcd6c4] rounded-2xl p-5 sm:p-6 mb-5 bg-[#fbfaf5]">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#0d4f49] text-white font-black text-sm flex items-center justify-center shrink-0">
                  1
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-[#0b423d] leading-snug">
                    {isAr ? 'الشعار والهوية البصرية' : 'Logo & Brand Identity'}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5f7a72] font-bold mt-0.5">
                    {isAr ? 'أساس علامتك — اختر مستوى الهوية الذي تحتاجه' : 'The foundation — select your brand identity tier'}
                  </p>
                </div>
              </div>

              <div className="text-end shrink-0">
                <b className="text-xl font-black text-[#0d4f49] block tabular-nums leading-tight">
                  +{logoCost} {isAr ? 'د.أ' : 'JOD'}
                </b>
                <span className="text-xs font-bold text-[#5f7a72]">{isAr ? 'ثابت' : 'fixed'}</span>
              </div>
            </div>

            {/* 3 Logo Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setLogoOption('none')}
                className={`p-4 rounded-xl border text-start transition-all cursor-pointer ${
                  logoOption === 'none'
                    ? 'border-2 border-[#0d4f49] bg-[#e7efe9] text-[#0b423d]'
                    : 'border-[#dcd6c4] bg-white text-[#14352f] hover:border-[#0d4f49]'
                }`}
              >
                <div className="font-extrabold text-sm">{isAr ? 'لدي شعار جاهز' : 'I Have a Logo'}</div>
                <div className="text-xs font-bold text-[#5f7a72] mt-0.5">{isAr ? 'بدون تصميم شعار' : 'No logo design'}</div>
                <div className="font-black text-sm text-[#0d4f49] mt-2 tabular-nums">0 {isAr ? 'د.أ' : 'JOD'}</div>
              </button>

              <button
                type="button"
                onClick={() => setLogoOption('logo')}
                className={`p-4 rounded-xl border text-start transition-all cursor-pointer ${
                  logoOption === 'logo'
                    ? 'border-2 border-[#0d4f49] bg-[#e7efe9] text-[#0b423d]'
                    : 'border-[#dcd6c4] bg-white text-[#14352f] hover:border-[#0d4f49]'
                }`}
              >
                <div className="font-extrabold text-sm">{isAr ? 'لوجو احترافي + ألوان' : 'Pro Logo + Palette'}</div>
                <div className="text-xs font-bold text-[#5f7a72] mt-0.5">{isAr ? 'شعار أصلي معتمد' : 'Original approved logo'}</div>
                <div className="font-black text-sm text-[#0d4f49] mt-2 tabular-nums">+10 {isAr ? 'د.أ' : 'JOD'}</div>
              </button>

              <button
                type="button"
                onClick={() => setLogoOption('full')}
                className={`p-4 rounded-xl border text-start transition-all cursor-pointer ${
                  logoOption === 'full'
                    ? 'border-2 border-[#0d4f49] bg-[#e7efe9] text-[#0b423d]'
                    : 'border-[#dcd6c4] bg-white text-[#14352f] hover:border-[#0d4f49]'
                }`}
              >
                <div className="font-extrabold text-sm">{isAr ? 'هوية بصرية شاملة' : 'Full Identity Guide'}</div>
                <div className="text-xs font-bold text-[#5f7a72] mt-0.5">{isAr ? 'دليل خطوط ومقاسات' : 'Typography & applications'}</div>
                <div className="font-black text-sm text-[#0d4f49] mt-2 tabular-nums">+20 {isAr ? 'د.أ' : 'JOD'}</div>
              </button>
            </div>
          </div>

          {/* Step 2: Ad Posts */}
          <div className="border border-[#dcd6c4] rounded-2xl p-5 sm:p-6 mb-5 bg-[#fbfaf5]">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#0d4f49] text-white font-black text-sm flex items-center justify-center shrink-0">
                  2
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-[#0b423d] leading-snug">
                    {isAr ? 'عدد البوستات الإعلانية' : 'Number of Ad Posts'}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5f7a72] font-bold mt-0.5">
                    {isAr
                      ? 'تصاميم توقف التمرير وتوصل رسالتك على إنستغرام (1 د.أ / بوست)'
                      : 'Scroll-stopping graphics for your Instagram feed (1 JOD / post)'}
                  </p>
                </div>
              </div>

              <div className="text-end shrink-0">
                <b className="text-xl font-black text-[#0d4f49] block tabular-nums leading-tight">
                  <AnimatedNumber value={postsCount} /> {isAr ? 'بوست' : 'Posts'}
                </b>
                <span className="text-xs font-bold text-[#5f7a72] tabular-nums">
                  (<AnimatedNumber value={postsCost} /> {isAr ? 'د.أ' : 'JOD'})
                </span>
              </div>
            </div>

            {/* Stepper + Slider with dynamic smooth track */}
            <div className="flex items-center gap-3 sm:gap-4 my-3">
              <button
                type="button"
                onClick={() => setPostsCount((prev) => Math.max(0, prev - 1))}
                className="w-11 h-11 rounded-xl bg-[#ece7d8] hover:bg-[#e2dcc9] text-[#0b423d] font-black text-xl flex items-center justify-center transition-all cursor-pointer shrink-0 active:scale-95"
                aria-label="Decrease posts"
              >
                −
              </button>

              <input
                type="range"
                min="0"
                max="25"
                step="1"
                value={postsCount}
                onChange={(e) => setPostsCount(Number(e.target.value))}
                style={{
                  background: `linear-gradient(to ${isAr ? 'left' : 'right'}, #0d4f49 ${(postsCount / 25) * 100}%, #e4dfcf ${(postsCount / 25) * 100}%)`,
                  transition: 'background 0.15s ease',
                }}
                className="flex-1 accent-[#0d4f49] cursor-pointer h-2 rounded-full"
              />

              <button
                type="button"
                onClick={() => setPostsCount((prev) => Math.min(25, prev + 1))}
                className="w-11 h-11 rounded-xl bg-[#ece7d8] hover:bg-[#e2dcc9] text-[#0b423d] font-black text-xl flex items-center justify-center transition-all cursor-pointer shrink-0 active:scale-95"
                aria-label="Increase posts"
              >
                +
              </button>
            </div>

            {/* Quick Presets */}
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#dcd6c4] flex-wrap text-xs font-bold">
              <span className="text-[#5f7a72]">{isAr ? 'خيارات سريعة:' : 'Presets:'}</span>
              {[5, 10, 15, 20].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setPostsCount(preset)}
                  className={`px-3 py-1.5 rounded-xl font-black transition-all cursor-pointer ${
                    postsCount === preset
                      ? 'bg-[#0d4f49] text-white shadow-xs'
                      : 'bg-[#ece7d8] text-[#0b423d] hover:bg-[#e2dcc9]'
                  }`}
                >
                  <span dir="ltr" className="tabular-nums">{preset}</span> {isAr ? 'بوست' : 'posts'}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Videos & Reels */}
          <div className="border border-[#dcd6c4] rounded-2xl p-5 sm:p-6 mb-5 bg-[#fbfaf5]">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#0d4f49] text-white font-black text-sm flex items-center justify-center shrink-0">
                  3
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-[#0b423d] leading-snug">
                    {isAr ? 'عدد فيديوهات الريلز والموشن' : 'Number of Reels & Motion'}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5f7a72] font-bold mt-0.5">
                    {isAr
                      ? 'فيديوهات قصيرة جذابة ومونتاج عصري (3 د.أ / فيديو)'
                      : 'Engaging short-form video reels with modern pacing (3 JOD / reel)'}
                  </p>
                </div>
              </div>

              <div className="text-end shrink-0">
                <b className="text-xl font-black text-[#0d4f49] block tabular-nums leading-tight">
                  <AnimatedNumber value={videosCount} /> {isAr ? 'ريلز' : 'Reels'}
                </b>
                <span className="text-xs font-bold text-[#5f7a72] tabular-nums">
                  (<AnimatedNumber value={videosCost} /> {isAr ? 'د.أ' : 'JOD'})
                </span>
              </div>
            </div>

            {/* Stepper + Slider with dynamic smooth track */}
            <div className="flex items-center gap-3 sm:gap-4 my-3">
              <button
                type="button"
                onClick={() => setVideosCount((prev) => Math.max(0, prev - 1))}
                className="w-11 h-11 rounded-xl bg-[#ece7d8] hover:bg-[#e2dcc9] text-[#0b423d] font-black text-xl flex items-center justify-center transition-all cursor-pointer shrink-0 active:scale-95"
                aria-label="Decrease reels"
              >
                −
              </button>

              <input
                type="range"
                min="0"
                max="8"
                step="1"
                value={videosCount}
                onChange={(e) => setVideosCount(Number(e.target.value))}
                style={{
                  background: `linear-gradient(to ${isAr ? 'left' : 'right'}, #0d4f49 ${(videosCount / 8) * 100}%, #e4dfcf ${(videosCount / 8) * 100}%)`,
                  transition: 'background 0.15s ease',
                }}
                className="flex-1 accent-[#0d4f49] cursor-pointer h-2 rounded-full"
              />

              <button
                type="button"
                onClick={() => setVideosCount((prev) => Math.min(8, prev + 1))}
                className="w-11 h-11 rounded-xl bg-[#ece7d8] hover:bg-[#e2dcc9] text-[#0b423d] font-black text-xl flex items-center justify-center transition-all cursor-pointer shrink-0 active:scale-95"
                aria-label="Increase reels"
              >
                +
              </button>
            </div>

            {/* Quick Presets */}
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#dcd6c4] flex-wrap text-xs font-bold">
              <span className="text-[#5f7a72]">{isAr ? 'خيارات سريعة:' : 'Presets:'}</span>
              {[0, 2, 4, 6].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setVideosCount(preset)}
                  className={`px-3 py-1.5 rounded-xl font-black transition-all cursor-pointer ${
                    videosCount === preset
                      ? 'bg-[#0d4f49] text-white shadow-xs'
                      : 'bg-[#ece7d8] text-[#0b423d] hover:bg-[#e2dcc9]'
                  }`}
                >
                  <span dir="ltr" className="tabular-nums">{preset}</span> {isAr ? 'فيديو' : 'reels'}
                </button>
              ))}
            </div>
          </div>

          {/* Step 4: Pro Website Toggle */}
          <div className="border border-[#dcd6c4] rounded-2xl p-5 sm:p-6 mb-6 bg-[#fbfaf5]">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-full bg-[#0d4f49] text-white font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                  4
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-[#0b423d] leading-snug">
                    {isAr ? 'صنع موقع إلكتروني احترافي' : 'Professional Custom Website'}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5f7a72] font-bold mt-0.5 max-w-lg">
                    {isAr
                      ? 'موقع تعريفي سريع متوافق مع كافة الهواتف مع ربط فوري بأزرار المحادثة في واتساب وإنستغرام (قيمته 25 د.أ فقط)'
                      : 'Fast responsive landing page with instant WhatsApp & Instagram chat integration (Valued at only 25 JOD)'}
                  </p>
                  <span className="inline-block mt-2 text-xs font-black text-[#0d4f49]">
                    {includeWebsite
                      ? isAr
                        ? 'مشمول (25 د.أ)'
                        : 'Included (25 JOD)'
                      : isAr
                      ? 'غير مشمول (0 د.أ)'
                      : 'Excluded (0 JOD)'}
                  </span>
                </div>
              </div>

              {/* Toggle Switch */}
              <button
                type="button"
                onClick={() => setIncludeWebsite(!includeWebsite)}
                className={`w-14 h-8 rounded-full p-1 transition-colors cursor-pointer flex items-center shrink-0 ${
                  includeWebsite ? 'bg-[#0d4f49] justify-end' : 'bg-[#d8d2bf] justify-start'
                }`}
                aria-label="Toggle website"
              >
                <div className="w-6 h-6 rounded-full bg-white shadow-md" />
              </button>
            </div>
          </div>

          {/* Summary Box (Matching reference site) */}
          <div className="relative bg-[#0d4f49] text-white rounded-[28px] p-6 sm:p-8 dots-dark shadow-xl">
            {/* Top Badge */}
            <div className="absolute -top-3.5 end-6 z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#0b423d] text-xs font-black shadow-md border border-[#dcd6c4]">
                <Calculator className="w-3.5 h-3.5 text-[#0d4f49]" />
                <span>{isAr ? 'حساب فوري بالدينار الأردني' : 'Instant Estimate in JOD'}</span>
              </span>
            </div>

            <div className="flex items-baseline justify-between gap-4 mb-4">
              <h3 className="text-lg sm:text-xl font-black text-white">
                {isAr ? 'ملخص باقتك المخصصة' : 'Custom Package Summary'}
              </h3>
              <span className="text-xs font-bold text-white/80 tracking-widest font-mono">
                STUDIO ADAM
              </span>
            </div>

            {/* Itemized Rows */}
            <div className="border-t border-white/20 pt-2 space-y-2.5 text-xs sm:text-sm font-bold">
              <div className="flex justify-between items-center py-1 border-b border-white/10">
                <span>
                  {logoOption === 'full'
                    ? isAr
                      ? 'هوية بصرية شاملة'
                      : 'Full Brand Identity'
                    : logoOption === 'logo'
                    ? isAr
                      ? 'لوجو احترافي + ألوان'
                      : 'Pro Logo + Colors'
                    : isAr
                    ? 'لدي شعار جاهز'
                    : 'I Have a Logo'}
                </span>
                <span className="tabular-nums font-black">{logoCost} {isAr ? 'د.أ' : 'JOD'}</span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-white/10">
                <span>
                  <span dir="ltr" className="tabular-nums font-black">{postsCount}</span> {isAr ? 'بوستات إعلانية' : 'Ad Posts'}
                </span>
                <span className="tabular-nums font-black">{postsCost} {isAr ? 'د.أ' : 'JOD'}</span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-white/10">
                <span>
                  <span dir="ltr" className="tabular-nums font-black">{videosCount}</span> {isAr ? 'فيديوهات ريلز وموشن' : 'Reels Videos'}
                </span>
                <span className="tabular-nums font-black">{videosCost} {isAr ? 'د.أ' : 'JOD'}</span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-white/10">
                <span>{isAr ? 'صنع موقع إلكتروني احترافي' : 'Custom Website'}</span>
                <span className="tabular-nums font-black">{websiteCost} {isAr ? 'د.أ' : 'JOD'}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between items-center py-1 text-[#bfe8c8] font-black">
                  <span>{isAr ? 'خصم باقة الافتتاح الخاصة 🔥' : 'Opening Bundle Discount 🔥'}</span>
                  <span className="tabular-nums">-{discountAmount} {isAr ? 'د.أ' : 'JOD'}</span>
                </div>
              )}
            </div>

            {/* Total Row */}
            <div className="flex justify-between items-baseline pt-4 pb-2 font-black border-t border-white/20 mt-3">
              <span className="text-base sm:text-lg text-white">
                {isAr ? 'الإجمالي التقريبي' : 'Approximate Total'}
              </span>
              <span className="text-3xl sm:text-4xl text-white tabular-nums flex items-baseline gap-1">
                <AnimatedNumber value={totalCost} />
                <span className="text-xl sm:text-2xl font-bold">{isAr ? 'د.أ' : 'JOD'}</span>
              </span>
            </div>

            {/* Direct Booking CTA */}
            <button
              type="button"
              onClick={handleInquireCustom}
              className="w-full mt-4 py-3.5 px-6 rounded-full bg-white hover:bg-[#ece7d8] text-[#0b423d] text-sm sm:text-base font-black transition-all shadow-md hover:shadow-lg active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5 text-[#0d4f49]" />
              <span>{isAr ? 'احجز باقتك عبر واتساب' : 'Reserve Your Package via WhatsApp'}</span>
            </button>
          </div>

          <p className="text-center text-[#5f7a72] text-xs font-bold mt-4">
            {isAr
              ? 'الإجمالي تقديري — يعتمد السعر النهائي على تفاصيل مشروعك عند التواصل.'
              : 'Estimate only — final price confirmed upon reviewing your specific requirements.'}
          </p>
        </div>
      </div>
    </section>
  );
};
