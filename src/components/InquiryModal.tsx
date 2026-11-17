import React, { useState, useEffect } from 'react';
import { X, MessageCircle, Instagram, Check, Phone } from 'lucide-react';
import { Language } from '../types';
import { STUDIO_CONFIG } from '../data/brandingData';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  initialPackage?: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  lang,
  initialPackage = '',
}) => {
  const isAr = lang === 'ar';
  const defaultPkg = isAr ? 'باقة انطلاقة (عرض الافتتاح)' : 'Launch Package (Opening Special)';

  const presetOptions = [
    {
      value: isAr ? 'باقة انطلاقة (عرض الافتتاح)' : 'Launch Package (Opening Special)',
      label: isAr ? 'باقة انطلاقة (عرض الافتتاح - 25 دينار أردني)' : 'Launch Package (Opening Special - 25 JOD)',
    },
    {
      value: isAr ? 'باقة الهوية المتكاملة' : 'Complete Identity Package',
      label: isAr ? 'باقة الهوية المتكاملة (45 دينار أردني)' : 'Complete Identity Package (45 JOD)',
    },
    {
      value: isAr ? 'باقة الحضور الرقمي الشامل' : 'Full Digital Presence',
      label: isAr ? 'باقة الحضور الرقمي الشامل (65 دينار أردني)' : 'Full Digital Presence (65 JOD)',
    },
    {
      value: isAr ? 'صنع موقع إلكتروني احترافي' : 'Custom Websites',
      label: isAr ? 'صنع موقع إلكتروني احترافي (25 دينار أردني)' : 'Custom Website (25 JOD)',
    },
    {
      value: isAr ? 'لوجوهات وهوية بصرية فقط' : 'Logos & Identity Only',
      label: isAr ? 'لوجوهات وهوية بصرية' : 'Logos & Identity Only',
    },
    {
      value: isAr ? 'بوستات إعلانية فقط' : 'Ad Posts Only',
      label: isAr ? 'بوستات إعلانية (1 د.أ / بوست)' : 'Ad Posts (1 JOD / post)',
    },
    {
      value: isAr ? 'فيديوهات قصيرة وموشن فقط' : 'Reels & Motion Only',
      label: isAr ? 'فيديوهات قصيرة وموشن (3 د.أ / فيديو)' : 'Reels & Motion (3 JOD / reel)',
    },
  ];

  const [shopName, setShopName] = useState('');
  const [handle, setHandle] = useState('');
  const [selectedService, setSelectedService] = useState(initialPackage || defaultPkg);
  const [notes, setNotes] = useState('');
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Reset submission status & sync selected package whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      setGeneratedUrl('');
      setSelectedService(initialPackage || defaultPkg);
    }
  }, [isOpen, initialPackage, defaultPkg]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isPresetValue = presetOptions.some((opt) => opt.value === selectedService);
  const customSelectLabel = selectedService.includes('\n')
    ? selectedService.split('\n')[0].replace(/[:：]\s*$/, '')
    : selectedService;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const brief = isAr
      ? `مرحباً ستوديو آدم، أود حجز مكان في باقة تصميم:
• اسم المحل / المشروع: ${shopName || 'مشروع جديد'}
• حساب الإنستغرام: ${handle || 'قيد الإنشاء'}
• الخدمة المطلوبة: ${selectedService}
• تفاصيل إضافية: ${notes || 'لا يوجد'}`
      : `Hello Studio Adam, I'd like to book a design package:
• Shop / Business: ${shopName || 'New Brand'}
• Instagram Handle: ${handle || 'Under creation'}
• Selected Package: ${selectedService}
• Details: ${notes || 'None'}`;

    const waUrl = `${STUDIO_CONFIG.whatsappUrl}?text=${encodeURIComponent(brief)}`;
    setGeneratedUrl(waUrl);
    setIsSubmitted(true);
    setTimeout(() => {
      window.location.href = waUrl;
    }, 1200);
  };

  return (
    <div
      data-lenis-prevent
      onClick={onClose}
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={isAr ? 'احجز مكانك في ستوديو آدم' : 'Book Your Spot at Studio Adam'}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-white rounded-3xl border border-[#124E52]/15 p-6 sm:p-8 shadow-2xl overflow-hidden my-auto"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label={isAr ? 'إغلاق' : 'Close'}
          className="absolute top-4 end-4 w-9 h-9 rounded-full bg-[#F5F0E6] hover:bg-[#eae3d5] text-[#124E52] flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center">
            <div className="w-14 h-14 rounded-full bg-[#124E52] text-[#F5F0E6] flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-[#124E52] mb-2">
              {isAr ? 'تم تجهيز بيانات طلبك بنجاح!' : 'Your Brief is Ready!'}
            </h3>
            <p className="text-xs text-[#124E52]/75 mb-6">
              {isAr
                ? 'جاري تحويلك إلى محادثة واتساب ستوديو آدم لمتابعة التفاصيل فوراً.'
                : 'Redirecting to Studio Adam WhatsApp...'}
            </p>

            <a
              href={generatedUrl || STUDIO_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] text-white font-bold text-xs hover:bg-[#20ba59] transition-all shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{isAr ? 'فتح المحادثة على واتساب الآن' : 'Open WhatsApp Now'}</span>
            </a>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-black tracking-wider text-[#124E52]">STUDIO ADAM</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#124E52] tracking-tight">
                {isAr ? 'احجز مكانك في ستوديو آدم' : 'Book Your Spot at Studio Adam'}
              </h2>
              <p className="text-xs text-[#124E52]/70 mt-1">
                {isAr
                  ? 'أرسل لنا بيانات محلك وسنتواصل معك فوراً لتجهيز انطلاقتك على السوشيال ميديا.'
                  : 'Submit your business details for prompt direct onboarding.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#124E52] mb-1.5">
                  {isAr ? 'اسم محلك أو مشروعك:' : 'Shop / Business Name:'}
                </label>
                <input
                  type="text"
                  required
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  placeholder={isAr ? 'مثال: متجر ريماس، مقهى أروما' : 'e.g. Remas Store'}
                  className="w-full px-3.5 py-2.5 bg-[#F5F0E6]/50 border border-[#124E52]/15 rounded-xl text-xs text-[#124E52] focus:outline-none focus:border-[#124E52] focus:ring-1 focus:ring-[#124E52]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#124E52] mb-1.5">
                  {isAr ? 'حساب الإنستغرام (إن وجد):' : 'Current Instagram Handle:'}
                </label>
                <input
                  type="text"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  placeholder="@yourhandle"
                  className="w-full px-3.5 py-2.5 bg-[#F5F0E6]/50 border border-[#124E52]/15 rounded-xl text-xs text-[#124E52] focus:outline-none focus:border-[#124E52] focus:ring-1 focus:ring-[#124E52] dir-ltr text-start"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#124E52] mb-1.5">
                  {isAr ? 'الباقة أو الخدمة المطلوبة:' : 'Requested Service / Package:'}
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F5F0E6]/50 border border-[#124E52]/15 rounded-xl text-xs text-[#124E52] focus:outline-none focus:border-[#124E52] cursor-pointer"
                >
                  {!isPresetValue && selectedService && (
                    <option value={selectedService}>{customSelectLabel}</option>
                  )}
                  {presetOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>

                {selectedService.includes('\n') && (
                  <pre className="mt-2 p-3 rounded-xl bg-[#F5F0E6]/70 border border-[#124E52]/15 text-[11px] font-sans font-bold text-[#14352f] whitespace-pre-wrap leading-relaxed">
                    {selectedService}
                  </pre>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#124E52] mb-1.5">
                  {isAr ? 'ملاحظات إضافية عن مجالك:' : 'Additional Notes / Vision:'}
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={isAr ? 'أخبرنا عن فكرة محلك وموعد الإطلاق المفضل...' : 'Tell us about your products or goals...'}
                  className="w-full px-3.5 py-2.5 bg-[#F5F0E6]/50 border border-[#124E52]/15 rounded-xl text-xs text-[#124E52] focus:outline-none focus:border-[#124E52] focus:ring-1 focus:ring-[#124E52] resize-none"
                />
              </div>

              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 text-xs font-black text-[#F5F0E6] bg-[#124E52] rounded-xl hover:bg-[#0e3e41] active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{isAr ? 'إرسال ومتابعة عبر واتساب مباشرة' : 'Proceed via WhatsApp'}</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={STUDIO_CONFIG.telUrl}
                    className="py-2.5 px-3 text-xs font-bold text-[#124E52] bg-white border border-[#124E52]/15 rounded-xl hover:bg-[#F5F0E6] transition-all flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#124E52]" />
                    <span dir="ltr" className="font-mono tabular-nums">{STUDIO_CONFIG.phoneFormatted}</span>
                  </a>

                  <a
                    href={STUDIO_CONFIG.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 text-xs font-bold text-[#124E52] bg-[#F5F0E6]/50 border border-[#124E52]/15 rounded-xl hover:bg-[#F5F0E6] transition-all flex items-center justify-center gap-1.5"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                    <span dir="ltr">{STUDIO_CONFIG.instagramHandle}</span>
                  </a>
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
