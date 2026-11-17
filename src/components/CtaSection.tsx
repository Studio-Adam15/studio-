import React from 'react';
import { MessageCircle, Instagram } from 'lucide-react';
import { Language } from '../types';
import { STUDIO_CONFIG } from '../data/brandingData';

interface CtaSectionProps {
  lang: Language;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  return (
    <section id="contact" className="py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="relative bg-[#0d4f49] text-white rounded-[36px] px-6 py-12 sm:px-12 sm:py-16 text-center dots-dark shadow-xl overflow-hidden card-hover-dark">
          <div className="relative z-10 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-black text-white mb-3 tracking-tight">
              {isAr ? 'جاهز تبني هويتك؟' : 'Ready to Build Your Brand?'}
            </h2>

            <p className="text-sm sm:text-base text-white/85 font-semibold mb-8 leading-relaxed">
              {isAr
                ? 'راسلنا الآن على واتساب أو تابعنا على إنستغرام — نرد عليك ونبدأ بفكرتك فوراً.'
                : 'Message us directly on WhatsApp or follow us on Instagram — we reply promptly to bring your vision to life.'}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3.5">
              <a
                href={STUDIO_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full bg-white hover:bg-[#ece7d8] text-[#0b423d] text-sm sm:text-base font-black shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5 text-[#0d4f49]" />
                <span>{isAr ? 'تواصل معنا على واتساب' : 'Chat on WhatsApp'}</span>
              </a>

              <a
                href={STUDIO_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full bg-white/14 hover:bg-white/22 text-white border border-white/30 text-sm sm:text-base font-extrabold transition-all active:scale-95 flex items-center gap-2"
              >
                <Instagram className="w-4 h-4 text-white" />
                <span dir="ltr">{STUDIO_CONFIG.instagramHandle}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
