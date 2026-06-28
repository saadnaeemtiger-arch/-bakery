import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../types';
import { translations } from '../data';
import { Instagram, Twitter, MessageCircle, X, Shield, FileText, RotateCcw } from 'lucide-react';

interface FooterProps {
  lang: Language;
}

export default function Footer({ lang }: FooterProps) {
  const t = translations[lang];
  const [modalType, setModalType] = useState<'privacy' | 'terms' | 'refund' | null>(null);

  const handleScrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/al_magharif', label: 'Instagram' },
    { icon: Twitter, href: 'https://twitter.com/al_magharif', label: 'Twitter / X' },
    { icon: MessageCircle, href: 'https://wa.me/966114567890', label: 'WhatsApp' }
  ];

  const legalContent = {
    privacy: {
      titleAr: 'سياسة الخصوصية والأمان',
      titleEn: 'Privacy & Security Policy',
      contentAr: [
        'في حلويات المغرف، نلتزم بحماية خصوصية بيانات عملائنا بأعلى درجات الأمان والسرية.',
        'نقوم بجمع البيانات الشخصية مثل الاسم ورقم الجوال والبريد الإلكتروني وعنوان التوصيل فقط لغرض معالجة وتوصيل طلبيات الحلويات والمخبوزات الخاصة بكم وتوفير الدعم اللازم عبر الواتساب والموقع الإلكتروني.',
        'نحن لا نقوم ببيع أو مشاركة أو تأجير أي بيانات شخصية لأي جهات خارجية أو أطراف تسويقية تحت أي ظرف.',
        'جميع بيانات المدفوعات والمعاملات المالية عبر البطاقات محمية بالكامل بتشفير SSL عالي الأمان ومتوافق مع المعايير البنكية الرسمية للمملكة العربية السعودية.'
      ],
      contentEn: [
        'At Al-Magharif Sweets, we are deeply committed to protecting our customers\' data privacy with the highest levels of security and confidentiality.',
        'We collect personal details such as names, phone numbers, email addresses, and delivery coordinates solely to prepare, fulfill, and deliver your premium sweet orders and provide support via WhatsApp.',
        'We never sell, rent, share, or lease customer details to third-party marketing companies under any circumstances.',
        'All online transactions are completely encrypted and protected utilizing bank-grade secure socket layers (SSL) complying with Saudi Arabian electronic payment protocols.'
      ]
    },
    terms: {
      titleAr: 'الشروط والأحكام والضيافة',
      titleEn: 'Terms of Service & Hospitality',
      contentAr: [
        'باستخدامك لموقع حلويات المغرف، فإنك توافق بالكامل على الشروط والأحكام المنصوص عليها هنا.',
        'جميع طلبيات الكعك المخصص والمناسبات الكبرى تتطلب دفع عربون أو حجز مسبق قبل 48 ساعة على الأقل من موعد الاستلام المحدد.',
        'الأسعار المعروضة على الموقع تشمل ضريبة القيمة المضافة المحددة رسمياً في المملكة العربية السعودية، ولا تشمل رسوم التوصيل لبعض المناطق البعيدة.',
        'نحتفظ بالحق في تعديل المكونات أو نكهات الكعك الموسمية بناءً على توفر المواد الخام الطبيعية الفاخرة لضمان نفس مستويات الجودة الفائقة.'
      ],
      contentEn: [
        'By accessing or utilizing the Al-Magharif Sweets portal, you declare absolute agreement to the binding terms set forth herein.',
        'All specialized custom celebration cakes and large-scale banquet setups require a minimum of 48 hours advanced booking and confirmation.',
        'All menu prices are displayed inclusive of official Saudi Arabian Value Added Tax (VAT), and exclude minor outer-region logistics delivery charges.',
        'We reserve the right to refine or substitute certain seasonal ingredients in our recipes based on the organic availability of raw premium goods, ensuring our standard of uncompromised taste.'
      ]
    },
    refund: {
      titleAr: 'سياسة الاستبدال والاسترجاع',
      titleEn: 'Refund & Exchange Policies',
      contentAr: [
        'نظراً للطبيعة الحساسة والصحية للمنتجات الغذائية والحلويات والمخبوزات الطازجة، لا يمكن استرجاع أو استبدال المنتجات بعد استلام العميل لها لضمان سلامة الجميع.',
        'في حال وجود أي تلف أو خطأ في نوعية الطلب المستلم مقارنة بطلبك الأصلي، يرجى التواصل معنا فوراً عبر الخط الساخن أو الواتساب خلال ساعة واحدة من الاستلام وسنقوم باستبدال الطلب مجاناً أو إعادة المجموع.',
        'لا يُسمح بإلغاء طلبيات الكعك المخصص بالكامل بعد مرور 12 ساعة على تاريخ تأكيد الطلب وبدء التحضير والتجهيز.'
      ],
      contentEn: [
        'Due to the perishable, fresh, and hygienic nature of pastry, bakery, and food items, we cannot accept standard returns or exchanges once the client accepts the delivery.',
        'Should there be any physical damage or error in the products delivered compared to your invoice, please contact our hotline or WhatsApp within 1 hour. We will instantly execute a priority replacement or initiate a refund.',
        'Cancellations for customized celebration cakes are strictly ineligible for refunds once baking or custom decoration has commenced (12 hours past the booking confirmation).'
      ]
    }
  };

  return (
    <>
      <footer className="bg-emerald-950 text-white border-t-2 border-gold-400 relative overflow-hidden">
        {/* Subtle geometric pattern */}
        <div className="absolute inset-0 islamic-pattern opacity-5 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            
            {/* Column 1: Brand & Narrative */}
            <div className={`col-span-1 md:col-span-5 flex flex-col items-start gap-4 ${
              lang === 'ar' ? 'md:order-3' : 'md:order-1'
            }`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-gold-400">
                  <svg className="w-6 h-6 text-gold-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="5" cy="18" r="3" stroke="currentColor" strokeWidth="2" />
                    <path d="M6 18C7.5 18 9 17.5 10.5 16.5C12 15.5 13 14 14.5 12C16 10 17.5 8.5 19 8" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-arabic font-extrabold text-lg sm:text-xl text-gold-300">
                    {lang === 'ar' ? 'حلويات المغرف' : 'Al-Magharif Sweets'}
                  </h3>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">{t.brandSub}</p>
                </div>
              </div>
              <p className="font-arabic text-xs text-gray-300 leading-relaxed max-w-sm text-right sm:text-start mt-2">
                {t.footerAbout}
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-3 mt-4">
                {socialLinks.map((social, idx) => {
                  const IconComp = social.icon;
                  return (
                    <a
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-gold-400 hover:bg-gold-500 hover:text-emerald-950 transition-all text-white/80 shadow-inner"
                      title={social.label}
                    >
                      <IconComp className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Column 2: Navigation Map */}
            <div className={`col-span-1 md:col-span-3 flex flex-col items-start gap-3 ${
              lang === 'ar' ? 'md:order-2' : 'md:order-2'
            }`}>
              <h4 className="font-arabic font-extrabold text-sm text-gold-300 uppercase tracking-wider pb-2 border-b border-white/10 w-full text-right sm:text-start">
                {lang === 'ar' ? 'خريطة الموقع' : 'Explore Pages'}
              </h4>
              <nav className="flex flex-col gap-2 font-arabic text-xs text-gray-300 text-right sm:text-start w-full">
                <a href="#home" onClick={() => handleScrollTo('#home')} className="hover:text-gold-400 transition-colors">{t.navHome}</a>
                <a href="#about" onClick={() => handleScrollTo('#about')} className="hover:text-gold-400 transition-colors">{t.navAbout}</a>
                <a href="#menu" onClick={() => handleScrollTo('#menu')} className="hover:text-gold-400 transition-colors">{t.navMenu}</a>
                <a href="#why-us" onClick={() => handleScrollTo('#why-us')} className="hover:text-gold-400 transition-colors">{t.navWhyUs}</a>
                <a href="#gallery" onClick={() => handleScrollTo('#gallery')} className="hover:text-gold-400 transition-colors">{t.navGallery}</a>
                <a href="#reviews" onClick={() => handleScrollTo('#reviews')} className="hover:text-gold-400 transition-colors">{t.navReviews}</a>
              </nav>
            </div>

            {/* Column 3: Legal Modals Map */}
            <div className={`col-span-1 md:col-span-4 flex flex-col items-start gap-3 ${
              lang === 'ar' ? 'md:order-1' : 'md:order-3'
            }`}>
              <h4 className="font-arabic font-extrabold text-sm text-gold-300 uppercase tracking-wider pb-2 border-b border-white/10 w-full text-right sm:text-start">
                {t.footerLegal}
              </h4>
              <div className="flex flex-col gap-2.5 font-arabic text-xs text-gray-300 text-right sm:text-start w-full">
                <button
                  onClick={() => setModalType('privacy')}
                  className="flex items-center gap-2 hover:text-gold-400 transition-colors text-right sm:text-start"
                >
                  <Shield className="w-3.5 h-3.5 text-gold-400" />
                  <span>{t.footerPrivacy}</span>
                </button>
                <button
                  onClick={() => setModalType('terms')}
                  className="flex items-center gap-2 hover:text-gold-400 transition-colors text-right sm:text-start"
                >
                  <FileText className="w-3.5 h-3.5 text-gold-400" />
                  <span>{t.footerTerms}</span>
                </button>
                <button
                  onClick={() => setModalType('refund')}
                  className="flex items-center gap-2 hover:text-gold-400 transition-colors text-right sm:text-start"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-gold-400" />
                  <span>{t.footerRefund}</span>
                </button>
              </div>
            </div>

          </div>

          {/* Golden Divider */}
          <div className="border-t border-white/10 my-12" />

          {/* Copyright Section */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 font-arabic text-center">
            <p className="order-2 sm:order-1">
              {t.footerRights}
            </p>
            <p className="order-1 sm:order-2 text-[10px] tracking-wider text-gold-400/80 font-mono">
              RIYADH, SAUDI ARABIA • EST. 2026
            </p>
          </div>
        </div>
      </footer>

      {/* Dynamic Legal Modals Overlay */}
      <AnimatePresence>
        {modalType && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-cream-100 border border-gold-400/60 rounded-3xl p-6 sm:p-10 max-w-2xl w-full shadow-2xl relative max-h-[85vh] overflow-y-auto"
            >
              {/* Close button */}
              <button
                onClick={() => setModalType(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-emerald-950 text-gold-300 hover:bg-gold-500 hover:text-emerald-950 transition-colors"
                title={t.close}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="font-arabic text-right">
                <h3 className="font-arabic-serif font-extrabold text-2xl text-emerald-950 border-r-4 border-gold-500 pr-3 pb-1 mb-6">
                  {lang === 'ar' ? legalContent[modalType].titleAr : legalContent[modalType].titleEn}
                </h3>

                <div className="space-y-4 text-sm sm:text-base text-gray-700 leading-relaxed">
                  {(lang === 'ar' ? legalContent[modalType].contentAr : legalContent[modalType].contentEn).map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                <div className="mt-8 pt-4 border-t border-gold-200/50 flex justify-end">
                  <button
                    onClick={() => setModalType(null)}
                    className="px-6 py-2.5 bg-emerald-950 text-white hover:bg-gold-500 hover:text-emerald-950 font-bold text-xs rounded-xl transition-colors"
                  >
                    {lang === 'ar' ? 'فهمت وموافق' : 'Acknowledge & Close'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
