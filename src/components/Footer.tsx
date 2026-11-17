import React from 'react';
import { ArrowUp, Instagram, Phone } from 'lucide-react';
import { Language } from '../types';
import { STUDIO_CONFIG } from '../data/brandingData';
import { DotMatrixGrid } from './motion/DotMatrixGrid';
import { AppPage } from './Navbar';
import { useSmoothScroll } from './providers/SmoothScrollProvider';

interface FooterProps {
  lang: Language;
  onNavigate: (page: AppPage, hash?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onNavigate }) => {
  const isAr = lang === 'ar';
  const { scrollTo } = useSmoothScroll();

  const scrollToTop = () => {
    scrollTo(0, { duration: 1.0 });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#124E52]/95 backdrop-blur-xl text-[#F5F0E6] border-t border-[#F5F0E6]/15 py-14 relative z-10 overflow-hidden">
      {/* Subtle Dot Matrix Backdrop */}
      <DotMatrixGrid
        className="absolute inset-0 pointer-events-none"
        theme="petrol"
        fade="radial"
        opacity={0.15}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#F5F0E6]/15">
          {/* Brand Mark wordmark */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('home');
            }}
            className="text-center md:text-start hover:opacity-90 transition-opacity"
          >
            <span className="text-2xl font-black tracking-wider text-[#F5F0E6] block leading-none">
              STUDIO ADAM
            </span>
            <span className="text-xs text-[#F5F0E6]/80 font-bold mt-1.5 block">
              {isAr ? STUDIO_CONFIG.sloganAr : 'From Idea to Impact'}
            </span>
          </a>

          {/* Clean Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#F5F0E6]/80 font-bold">
            <a
              href="/portfolio"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('portfolio');
              }}
              className="hover:text-white transition-colors whitespace-nowrap"
            >
              {isAr ? 'معرض الأعمال' : 'Portfolio'}
            </a>
            <a
              href="#brand-identity"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home', '#brand-identity');
              }}
              className="hover:text-white transition-colors whitespace-nowrap"
            >
              {isAr ? 'الهوية البصرية' : 'Brand Identity'}
            </a>
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home', '#services');
              }}
              className="hover:text-white transition-colors whitespace-nowrap"
            >
              {isAr ? 'خدماتنا' : 'Services'}
            </a>
            <a
              href="#packages"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home', '#packages');
              }}
              className="hover:text-white transition-colors whitespace-nowrap"
            >
              {isAr ? 'عرض الافتتاح' : 'Launch Offer'}
            </a>
            <a
              href="#reviews"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home', '#reviews');
              }}
              className="hover:text-white transition-colors whitespace-nowrap"
            >
              {isAr ? 'قصص النجاح' : 'Success Stories'}
            </a>
          </nav>

          {/* Socials & Top Action */}
          <div className="flex items-center gap-2.5 flex-wrap justify-center">
            <a
              href={STUDIO_CONFIG.telUrl}
              className="px-3.5 py-2 text-xs font-bold text-[#F5F0E6] bg-[#F5F0E6]/10 border border-[#F5F0E6]/20 rounded-lg hover:bg-[#F5F0E6]/20 transition-all flex items-center gap-1.5"
              title="اتصال مباشر"
            >
              <Phone className="w-3.5 h-3.5" />
              <span dir="ltr" className="font-mono tabular-nums">{STUDIO_CONFIG.phoneFormatted}</span>
            </a>

            <a
              href={STUDIO_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 text-xs font-bold text-[#F5F0E6] bg-[#F5F0E6]/10 border border-[#F5F0E6]/20 rounded-lg hover:bg-[#F5F0E6]/20 transition-all flex items-center gap-1.5"
              title="إنستغرام"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span dir="ltr">{STUDIO_CONFIG.instagramHandle}</span>
            </a>

            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 text-xs font-bold text-[#F5F0E6] bg-[#F5F0E6]/10 border border-[#F5F0E6]/20 rounded-lg hover:bg-[#F5F0E6]/20 transition-all cursor-pointer"
              title={isAr ? 'إلى الأعلى' : 'Back to top'}
              aria-label={isAr ? 'إلى الأعلى' : 'Back to top'}
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom copyright & details */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F5F0E6]/70">
          <p>
            {isAr
              ? '© 2026 ستوديو آدم. جميع الحقوق محفوظة — علامة إبداعية تحوّل الأفكار إلى أثر.'
              : '© 2026 STUDIO ADAM. All Rights Reserved — From Idea to Impact.'}
          </p>
          <div className="flex items-center gap-4 text-xs font-mono">
            <span>{isAr ? 'عمّان، الأردن' : 'Amman, Jordan'}</span>
            <span>·</span>
            <span dir="ltr" className="font-mono tabular-nums">078 513 1386</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
