import React, { useState } from 'react';
import { Instagram, Globe, Phone, Menu, X } from 'lucide-react';
import { Language } from '../types';
import { STUDIO_CONFIG } from '../data/brandingData';

export type AppPage = 'home' | 'portfolio';

interface NavbarProps {
  lang: Language;
  currentPage: AppPage;
  onNavigate: (page: AppPage, hash?: string) => void;
  onToggleLang: () => void;
  onOpenInquiry: (initialPackage?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  currentPage,
  onNavigate,
  onToggleLang,
  onOpenInquiry,
}) => {
  const isAr = lang === 'ar';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks: Array<{
    id: string;
    page: AppPage;
    hash?: string;
    label: string;
  }> = [
    { id: 'portfolio', page: 'portfolio', label: isAr ? 'معرض الأعمال' : 'Portfolio' },
    { id: 'pricing', page: 'home', hash: '#pricing', label: isAr ? 'عرض الافتتاح' : 'Launch Offer' },
    { id: 'packages', page: 'home', hash: '#packages', label: isAr ? 'الباقات' : 'Packages' },
    { id: 'calculator', page: 'home', hash: '#calculator', label: isAr ? 'الحاسبة' : 'Calculator' },
    { id: 'services', page: 'home', hash: '#services', label: isAr ? 'خدماتنا' : 'Services' },
    { id: 'reviews', page: 'home', hash: '#reviews', label: isAr ? 'آراء العملاء' : 'Reviews' },
  ];

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    page: AppPage,
    hash?: string
  ) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    onNavigate(page, hash);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#f3efe4]/90 backdrop-blur-md border-b border-[#dcd6c4] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4">
        {/* Brand */}
        <a
          href="/"
          onClick={(e) => handleLinkClick(e, 'home')}
          className="flex flex-col text-start leading-tight hover:opacity-90 transition-opacity shrink-0"
        >
          <span className="font-black text-xl sm:text-2xl text-[#0b423d] tracking-tight whitespace-nowrap">
            STUDIO ADAM
          </span>
          <span className="text-[11px] sm:text-xs font-bold text-[#5f7a72] mt-0.5 whitespace-nowrap">
            {isAr ? 'استوديو آدم · الهوية والتصميم' : 'Studio Adam · Branding & Design'}
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-sm font-bold text-[#14352f]/80">
          {navLinks.map((link) => {
            const isActivePortfolio = link.page === 'portfolio' && currentPage === 'portfolio';
            return (
              <a
                key={link.id}
                href={link.page === 'portfolio' ? '/portfolio' : link.hash || '/'}
                onClick={(e) => handleLinkClick(e, link.page, link.hash)}
                className={`transition-colors py-1 whitespace-nowrap shrink-0 ${
                  isActivePortfolio
                    ? 'text-[#0d4f49] font-black border-b-2 border-[#0d4f49]'
                    : 'hover:text-[#0d4f49] hover:border-b-2 hover:border-[#0d4f49]'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Direct Phone Link */}
          <a
            href={STUDIO_CONFIG.telUrl}
            className="hidden xl:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-[#0d4f49] bg-white border border-[#dcd6c4] rounded-full hover:bg-[#ece7d8] transition-all whitespace-nowrap shrink-0"
            title={isAr ? 'اتصال مباشر' : 'Direct Call'}
          >
            <Phone className="w-3.5 h-3.5" />
            <span dir="ltr" className="font-mono tabular-nums">{STUDIO_CONFIG.phoneFormatted}</span>
          </a>

          {/* Instagram Handle */}
          <a
            href={STUDIO_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-[#0d4f49] bg-white border border-[#dcd6c4] rounded-full hover:bg-[#ece7d8] transition-all whitespace-nowrap shrink-0"
            title="Instagram"
          >
            <Instagram className="w-3.5 h-3.5" />
            <span dir="ltr">{STUDIO_CONFIG.instagramHandle}</span>
          </a>

          {/* Language Toggle */}
          <button
            onClick={onToggleLang}
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-extrabold text-[#0d4f49] bg-white border border-[#0d4f49] rounded-full hover:bg-[#e7efe9] transition-colors cursor-pointer whitespace-nowrap shrink-0"
            aria-label="Switch language"
          >
            <span>{isAr ? 'EN' : 'عربي'}</span>
            <Globe className="w-3.5 h-3.5" />
          </button>

          {/* Primary CTA Button */}
          <button
            type="button"
            onClick={() => onOpenInquiry(isAr ? 'باقة انطلاقة (عرض الافتتاح)' : 'Launch Package')}
            className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-full bg-[#0d4f49] hover:bg-[#0a3f3a] text-white text-xs sm:text-sm font-black transition-all shadow-sm hover:shadow-md active:scale-95 cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>{isAr ? 'احجز الآن' : 'Book Now'}</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-[#0d4f49] hover:bg-[#ece7d8] transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[#dcd6c4] bg-[#f3efe4] px-4 py-5 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => {
              const isActivePortfolio = link.page === 'portfolio' && currentPage === 'portfolio';
              return (
                <a
                  key={link.id}
                  href={link.page === 'portfolio' ? '/portfolio' : link.hash || '/'}
                  onClick={(e) => handleLinkClick(e, link.page, link.hash)}
                  className={`px-3 py-2 text-xs font-bold border rounded-xl transition-colors text-center ${
                    isActivePortfolio
                      ? 'bg-[#0d4f49] text-white border-[#0d4f49]'
                      : 'text-[#14352f] bg-white border-[#dcd6c4] hover:bg-[#ece7d8]'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-[#dcd6c4] text-xs font-bold">
            <a
              href={STUDIO_CONFIG.telUrl}
              className="flex items-center gap-1.5 text-[#0d4f49]"
            >
              <Phone className="w-3.5 h-3.5" />
              <span dir="ltr">{STUDIO_CONFIG.phoneFormatted}</span>
            </a>

            <a
              href={STUDIO_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#0d4f49]"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span dir="ltr">{STUDIO_CONFIG.instagramHandle}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
