import { useState, useEffect, MouseEvent } from 'react';
import { Menu, X, ShoppingBag, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../types';
import { translations } from '../data';

interface HeaderProps {
  lang: Language;
  setLang: (lang: Language) => void;
  cartCount: number;
  onCartToggle: () => void;
}

export default function Header({ lang, setLang, cartCount, onCartToggle }: HeaderProps) {
  const [isSticky, setIsSticky] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: t.navHome },
    { href: '#about', label: t.navAbout },
    { href: '#menu', label: t.navMenu },
    { href: '#why-us', label: t.navWhyUs },
    { href: '#gallery', label: t.navGallery },
    { href: '#reviews', label: t.navReviews },
    { href: '#faq', label: t.navFaq },
    { href: '#contact', label: t.navContact },
  ];

  const handleScrollTo = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      const offset = 80; // height of header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header
        id="app-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isSticky
            ? 'bg-cream-50/95 backdrop-blur-md shadow-md py-3 border-b border-gold-200/50'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo & Emblem */}
          <a
            id="brand-logo-link"
            href="#home"
            onClick={(e) => handleScrollTo(e, '#home')}
            className="flex items-center gap-3 group"
          >
            {/* Custom SVG Logo Emblem: Beautiful Gold Ladle/Magharif & Star Geometry */}
            <div className="w-11 h-11 rounded-full bg-emerald-950 flex items-center justify-center border-2 border-gold-400 shadow-lg group-hover:scale-105 transition-transform duration-300">
              <svg className="w-7 h-7 text-gold-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L14.5 7H19.5L15.5 10.5L17 15.5L12 12.5L7 15.5L8.5 10.5L4.5 7H9.5L12 2Z" fill="currentColor" opacity="0.15" />
                <path d="M6 18C7.5 18 9 17.5 10.5 16.5C12 15.5 13 14 14.5 12C16 10 17.5 8.5 19 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <circle cx="5" cy="18" r="3" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M4 17C4 16.5 4.5 16 5 16C5.5 16 6 16.5 6 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M16 7L19 6L20 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className={`font-arabic font-extrabold text-xl sm:text-2xl tracking-wide transition-colors duration-300 ${
                isSticky ? 'text-emerald-950' : 'text-emerald-950'
              }`}>
                {lang === 'ar' ? 'حلويات المغرف' : 'Al-Magharif Sweets'}
              </span>
              <span className={`text-[9px] font-semibold tracking-wider uppercase ${
                isSticky ? 'text-gold-600' : 'text-gold-600'
              }`}>
                {t.brandSub}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav" className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className={`text-sm font-medium tracking-wide transition-all duration-300 relative py-1 hover:text-gold-500 font-arabic ${
                  isSticky ? 'text-gray-800' : 'text-emerald-950 font-bold'
                } group`}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-400 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Action Buttons: Language Switcher, Cart, Order Button, Mobile Menu */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Language Switcher */}
            <button
              id="lang-switcher-btn"
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className="p-2 rounded-full text-emerald-950 hover:bg-gold-100/50 hover:text-gold-600 transition-all duration-300 flex items-center gap-1.5 text-xs font-semibold"
              title={lang === 'ar' ? 'Switch to English' : 'التحويل للعربية'}
            >
              <Globe className="w-5 h-5 text-gold-500" />
              <span className="hidden sm:inline font-arabic uppercase">{lang === 'ar' ? 'English' : 'العربية'}</span>
            </button>

            {/* Shopping Cart Indicator */}
            <button
              id="cart-indicator-btn"
              onClick={onCartToggle}
              className="p-2.5 rounded-full text-emerald-950 hover:bg-gold-100/50 hover:text-gold-600 transition-all duration-300 relative group"
            >
              <ShoppingBag className="w-5 h-5 text-emerald-950 group-hover:scale-105 transition-transform" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 bg-gold-500 text-white font-mono text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-cream-50 shadow-md"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Quick WhatsApp Order Button */}
            <a
              id="header-quick-order-btn"
              href="#menu"
              onClick={(e) => handleScrollTo(e, '#menu')}
              className="hidden md:inline-flex items-center gap-2 bg-emerald-950 text-white hover:bg-gold-600 border border-gold-300 font-semibold text-xs px-5 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-arabic hover:text-emerald-950 transform hover:-translate-y-0.5"
            >
              <span>{t.orderNow}</span>
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full text-emerald-950 hover:bg-gold-100/50 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[68px] z-40 bg-cream-100 border-b border-gold-200 shadow-2xl lg:hidden py-6 px-4 flex flex-col gap-4 font-arabic"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className="px-4 py-2.5 text-base font-medium text-emerald-950 hover:bg-gold-100/50 hover:text-gold-600 rounded-xl transition-colors text-right"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <hr className="border-gold-200/50 my-2" />

            <div className="flex items-center justify-between px-4">
              <button
                id="mobile-drawer-lang-btn"
                onClick={() => {
                  setLang(lang === 'ar' ? 'en' : 'ar');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 text-emerald-950 font-bold"
              >
                <Globe className="w-5 h-5 text-gold-500" />
                <span>{lang === 'ar' ? 'English (EN)' : 'العربية (AR)'}</span>
              </button>

              <a
                id="mobile-drawer-order-btn"
                href="#menu"
                onClick={(e) => handleScrollTo(e, '#menu')}
                className="bg-emerald-950 text-white px-6 py-2 rounded-full text-sm font-semibold border border-gold-300 hover:bg-gold-500 hover:text-emerald-950 transition-colors"
              >
                {t.orderNow}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
