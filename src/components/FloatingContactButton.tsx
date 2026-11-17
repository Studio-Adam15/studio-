import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Language } from '../types';
import { STUDIO_CONFIG } from '../data/brandingData';

interface FloatingContactButtonProps {
  lang: Language;
}

export const FloatingContactButton: React.FC<FloatingContactButtonProps> = ({ lang }) => {
  const [isTooltipDismissed, setIsTooltipDismissed] = useState(false);
  const isAr = lang === 'ar';

  const defaultMessage = encodeURIComponent(
    isAr
      ? 'مرحباً ستوديو آدم، أود الاستفسار عن خدمات التصميم والهوية البصرية'
      : 'Hello Studio Adam, I would like to inquire about your design and branding services'
  );

  const whatsappDirectUrl = `${STUDIO_CONFIG.whatsappUrl}?text=${defaultMessage}`;

  return (
    <div
      className={`fixed bottom-6 z-50 flex items-center gap-3 ${
        isAr ? 'left-6 flex-row' : 'right-6 flex-row-reverse'
      }`}
      aria-label={isAr ? 'زر التواصل السريع عبر واتساب' : 'Quick WhatsApp Contact Button'}
    >
      {/* Tooltip / Prompt Banner */}
      {!isTooltipDismissed && (
        <div
          className={`hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white/85 backdrop-blur-xl border border-[#124E52]/20 shadow-xl text-[#124E52] animate-in fade-in slide-in-from-bottom-2 duration-300`}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-[#25D366] shrink-0 animate-pulse" />
          <div className="flex flex-col">
            <span className="text-xs font-black leading-tight text-[#124E52]">
              {isAr ? 'تواصل معنا مباشرة' : 'Contact Studio Adam'}
            </span>
            <span className="text-[10px] text-[#124E52]/70 leading-tight">
              {isAr ? 'واتساب متاح للرد الفوري' : 'Direct WhatsApp chat'}
            </span>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsTooltipDismissed(true);
            }}
            className="p-1 rounded-full text-[#124E52]/50 hover:text-[#124E52] hover:bg-[#F5F0E6] transition-colors ms-1"
            aria-label={isAr ? 'إغلاق الإشعار' : 'Dismiss notice'}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Floating WhatsApp Action Button */}
      <a
        href={whatsappDirectUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center gap-2.5 px-4 sm:px-5 py-3.5 rounded-full bg-[#124E52]/90 backdrop-blur-xl text-[#F5F0E6] border-2 border-[#F5F0E6]/80 shadow-2xl hover:bg-[#0c393c] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#124E52]/30"
        title={isAr ? 'تواصل معنا عبر واتساب' : 'Contact Us on WhatsApp'}
      >
        {/* Pulsing subtle presence indicator */}
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#25D366] border border-white"></span>
        </span>

        {/* WhatsApp Icon */}
        <div className="w-6 h-6 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-xs">
          <MessageCircle className="w-4 h-4 fill-white text-white" />
        </div>

        {/* Text Label */}
        <span className="text-sm font-black tracking-tight select-none">
          {isAr ? 'تواصل معنا' : 'Contact Us'}
        </span>
      </a>
    </div>
  );
};
