import React, { useState, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Language } from './types';
import { Navbar, AppPage } from './components/Navbar';
import { Hero } from './components/Hero';
import { PortfolioPreviewSection } from './components/PortfolioPreviewSection';
import { PortfolioSection } from './components/PortfolioSection';
import { BrandIdentitySection } from './components/BrandIdentitySection';
import { ServicesSection } from './components/ServicesSection';
import { PackageCalculator } from './components/PackageCalculator';
import { BrandingPackages } from './components/BrandingPackages';
import { TestimonialsSection } from './components/TestimonialsSection';
import { Footer } from './components/Footer';
import { InquiryModal } from './components/InquiryModal';
import { FloatingContactButton } from './components/FloatingContactButton';
import { FadeInSection } from './components/FadeInSection';
import { CtaSection } from './components/CtaSection';
import { AnimatedContent } from './components/reactbits/AnimatedContent';
import { GradualBlur } from './components/reactbits/GradualBlur';
import { SmoothScrollProvider, useSmoothScroll } from './components/providers/SmoothScrollProvider';
import { CursorAmbientGlow } from './components/motion/CursorAmbientGlow';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function getInitialPage(): AppPage {
  if (typeof window === 'undefined') return 'home';
  const path = window.location.pathname;
  const hash = window.location.hash;
  if (path === '/portfolio' || path.startsWith('/portfolio/') || hash === '#portfolio-page') {
    return 'portfolio';
  }
  return 'home';
}

function AppContent() {
  const [lang, setLang] = useState<Language>('ar');
  const [currentPage, setCurrentPage] = useState<AppPage>(getInitialPage);
  const [pendingHash, setPendingHash] = useState<string | null>(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [initialPackage, setInitialPackage] = useState('');
  const { scrollTo } = useSmoothScroll();

  // Sync dir and lang on document element
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  // Listen to browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const nextPage = getInitialPage();
      setCurrentPage(nextPage);
      scrollTo(0, { immediate: true });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [scrollTo]);

  // Scroll to target section or top smoothly whenever page/hash changes
  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      if (currentPage === 'home' && pendingHash) {
        const targetEl = document.querySelector(pendingHash) as HTMLElement | null;
        if (targetEl) {
          scrollTo(targetEl, { offset: -30, duration: 1.0 });
        }
        setPendingHash(null);
      }
    });
    return () => cancelAnimationFrame(rafId);
  }, [currentPage, pendingHash, scrollTo]);

  const handleNavigate = useCallback((page: AppPage, hash?: string) => {
    if (page === 'portfolio') {
      if (window.location.pathname !== '/portfolio') {
        window.history.pushState({ page: 'portfolio' }, '', '/portfolio');
      }
      setPendingHash(null);
      setCurrentPage('portfolio');
      scrollTo(0, { immediate: true });
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }

    // Navigating to home (optionally with a section #hash)
    const targetUrl = hash ? `/${hash}` : '/';
    if (window.location.pathname !== '/' || window.location.hash !== (hash || '')) {
      window.history.pushState({ page: 'home' }, '', targetUrl);
    }

    if (currentPage !== 'home') {
      setPendingHash(hash || null);
      setCurrentPage('home');
      if (!hash) {
        scrollTo(0, { immediate: true });
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    } else if (hash) {
      const targetEl = document.querySelector(hash) as HTMLElement | null;
      if (targetEl) {
        scrollTo(targetEl, { offset: -30, duration: 1.1 });
      }
    } else {
      scrollTo(0, { duration: 0.9 });
    }
  }, [currentPage, scrollTo]);

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const handleOpenInquiry = (pkgName?: string) => {
    setInitialPackage(pkgName || (lang === 'ar' ? 'باقة انطلاقة (عرض الافتتاح)' : 'Launch Package (Opening Special)'));
    setIsInquiryOpen(true);
  };

  const handleCloseInquiry = () => {
    setIsInquiryOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F5F0E6] text-[#124E52] flex flex-col font-sans selection:bg-[#124E52] selection:text-[#F5F0E6] relative overflow-x-hidden">
        {/* Global Points / Dotted Canvas */}
        <div className="dots" aria-hidden="true" />

        {/* Ambient Cursor Spotlight illuminating points canvas smoothly */}
        <CursorAmbientGlow />

        {/* Top Bar with STUDIO ADAM logo, page links, and direct contacts */}
        <Navbar
          lang={lang}
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onToggleLang={handleToggleLang}
          onOpenInquiry={handleOpenInquiry}
        />

        {/* Main View Router: Separate Home vs Dedicated Portfolio Page */}
        <main className="flex-1 relative z-10">
          {currentPage === 'portfolio' ? (
            <PortfolioSection
              lang={lang}
              onOpenInquiry={handleOpenInquiry}
              onBackHome={() => handleNavigate('home')}
              onGoToCalculator={() => handleNavigate('home', '#calculator')}
            />
          ) : (
            <>
              {/* Hero Section */}
              <Hero
                lang={lang}
                onOpenInquiry={handleOpenInquiry}
              />

              {/* Compact Portfolio Preview (2 Featured Videos + View Full Portfolio Button) */}
              <AnimatedContent distance={40} direction="vertical" duration={0.8} threshold={0.05}>
                <PortfolioPreviewSection
                  lang={lang}
                  onOpenPortfolioPage={() => handleNavigate('portfolio')}
                />
              </AnimatedContent>

              {/* Brand Identity & Visual Language Section */}
              <AnimatedContent distance={40} direction="vertical" duration={0.8} threshold={0.1}>
                <BrandIdentitySection
                  lang={lang}
                  onOpenInquiry={handleOpenInquiry}
                />
              </AnimatedContent>

              {/* Core Services Section */}
              <AnimatedContent distance={40} direction="vertical" duration={0.8} threshold={0.1}>
                <ServicesSection
                  lang={lang}
                  onOpenInquiry={handleOpenInquiry}
                />
              </AnimatedContent>

              {/* Custom Package Calculator (Posts, Videos, Website, Logo) */}
              <AnimatedContent distance={40} direction="vertical" duration={0.8} threshold={0.1}>
                <PackageCalculator
                  lang={lang}
                  onOpenInquiry={handleOpenInquiry}
                />
              </AnimatedContent>

              {/* Packages featuring Opening Deal 'باقة انطلاقة' */}
              <AnimatedContent distance={40} direction="vertical" duration={0.8} threshold={0.1}>
                <BrandingPackages
                  lang={lang}
                  onSelectPackage={handleOpenInquiry}
                />
              </AnimatedContent>

              {/* Client Testimonials & Real Project Proof */}
              <AnimatedContent distance={40} direction="vertical" duration={0.8} threshold={0.1}>
                <TestimonialsSection
                  lang={lang}
                  onOpenInquiry={handleOpenInquiry}
                />
              </AnimatedContent>

              {/* Direct CTA Box */}
              <AnimatedContent distance={40} direction="vertical" duration={0.8} threshold={0.1}>
                <CtaSection lang={lang} />
              </AnimatedContent>
            </>
          )}
        </main>

        {/* Subtle Gradual Blur Edge at Viewport Bottom */}
        <GradualBlur
          position="bottom"
          height="3.5rem"
          strength={1}
          layers={5}
          curve="bezier"
          target="page"
          tint="rgba(243, 239, 228, 0.45)"
          autoHide={true}
          zIndex={20}
        />

        {/* Clean Minimal Footer */}
        <FadeInSection direction="none">
          <Footer lang={lang} onNavigate={handleNavigate} />
        </FadeInSection>

        {/* Floating Sticky Contact Us Button (WhatsApp Link) */}
        <FloatingContactButton lang={lang} />

        {/* Direct Booking Modal */}
        <InquiryModal
          isOpen={isInquiryOpen}
          onClose={handleCloseInquiry}
          lang={lang}
          initialPackage={initialPackage}
        />
      </div>
  );
}

export default function App() {
  return (
    <SmoothScrollProvider>
      <AppContent />
    </SmoothScrollProvider>
  );
}
