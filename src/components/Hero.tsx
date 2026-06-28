import { MouseEvent } from 'react';
import { motion } from 'motion/react';
import { Language } from '../types';
import { translations } from '../data';
import { ChevronRight, ChevronLeft, ArrowRight, ArrowLeft } from 'lucide-react';

interface HeroProps {
  lang: Language;
}

export default function Hero({ lang }: HeroProps) {
  const t = translations[lang];

  const handleScrollToMenu = (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.querySelector('#menu');
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

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-cream-100"
    >
      {/* Islamic Background Pattern Overlay */}
      <div className="absolute inset-0 islamic-pattern z-0" />

      {/* Radiant Gradient Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-200/20 blur-[150px] rounded-full z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Hero Copy (Text Elements) */}
        <div className={`col-span-1 lg:col-span-7 flex flex-col justify-center text-center lg:text-start ${
          lang === 'ar' ? 'lg:order-1' : 'lg:order-1'
        }`}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-emerald-950/10 self-center lg:self-start px-4 py-1.5 rounded-full text-emerald-950 font-bold text-xs tracking-wider mb-6 border border-gold-300/30"
          >
            <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
            <span className="font-arabic">{lang === 'ar' ? 'افتتاح فاخر جديد' : 'Luxurious New Opening'}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-emerald-950 leading-[1.2] font-arabic-serif mb-6"
          >
            {lang === 'ar' ? (
              <>
                حلويات عربية أصيلة <br />
                <span className="gold-gradient-text">تُصنع بحب وإتقان</span>
              </>
            ) : (
              <>
                Authentic Arabic Sweets <br />
                <span className="gold-gradient-text">Crafted with Love</span>
              </>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-arabic mb-8"
          >
            {t.heroSub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <button
              onClick={handleScrollToMenu}
              className="w-full sm:w-auto px-8 py-4 bg-emerald-950 text-white hover:bg-gold-500 font-bold text-sm rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 font-arabic hover:text-emerald-950 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 border border-gold-400"
            >
              <span>{t.viewMenu}</span>
              {lang === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>
            <button
              onClick={handleScrollToMenu}
              className="w-full sm:w-auto px-8 py-4 bg-transparent text-emerald-950 hover:bg-gold-100 border-2 border-gold-400/80 font-bold text-sm rounded-full transition-all duration-300 font-arabic flex items-center justify-center gap-2 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
            >
              <span>{t.orderNow}</span>
            </button>
          </motion.div>

          {/* Quick Metrics */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="grid grid-cols-3 gap-4 pt-10 border-t border-gold-300/30 mt-10 max-w-lg mx-auto lg:mx-0"
          >
            <div className="text-center lg:text-right">
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-950 font-mono gold-gradient-text">100%</p>
              <p className="text-[10px] sm:text-xs font-semibold text-gray-600 uppercase font-arabic mt-1">
                {lang === 'ar' ? 'مكونات طبيعية' : 'Natural Ingredients'}
              </p>
            </div>
            <div className="text-center border-x border-gold-300/30">
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-950 font-mono gold-gradient-text">40+</p>
              <p className="text-[10px] sm:text-xs font-semibold text-gray-600 uppercase font-arabic mt-1">
                {lang === 'ar' ? 'نوع من الحلويات' : 'Varieties of Sweets'}
              </p>
            </div>
            <div className="text-center lg:text-left">
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-950 font-mono gold-gradient-text">Fresh</p>
              <p className="text-[10px] sm:text-xs font-semibold text-gray-600 uppercase font-arabic mt-1">
                {lang === 'ar' ? 'يُخبز يومياً' : 'Baked Fresh Daily'}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Hero Showcase (Interactive Luxury Collage) */}
        <div className="col-span-1 lg:col-span-5 relative flex items-center justify-center lg:order-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-full max-w-[420px] aspect-square"
          >
            {/* Elegant Outer Gold Frame Border */}
            <div className="absolute inset-0 border-2 border-gold-400/40 rounded-3xl transform rotate-3 scale-[1.02] z-0" />
            <div className="absolute inset-0 border-2 border-emerald-950/20 rounded-3xl transform -rotate-3 scale-[0.98] z-0" />

            {/* Central Main Sweet Image with Gold-Leaf Border */}
            <div className="absolute inset-0 bg-white rounded-3xl shadow-2xl overflow-hidden border border-gold-300/50 p-3 z-10">
              <div className="relative w-full h-full rounded-2xl overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80"
                  alt="Al-Magharif Royal Arabic Sweets"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                
                {/* Embedded Floating Tag */}
                <div className={`absolute bottom-6 left-6 right-6 bg-cream-50/95 backdrop-blur shadow-xl border border-gold-400 p-4 rounded-2xl flex items-center justify-between ${
                  lang === 'ar' ? 'text-right' : 'text-left'
                }`}>
                  <div>
                    <h3 className="font-arabic font-extrabold text-emerald-950 text-sm sm:text-base">
                      {lang === 'ar' ? 'بقلاوة فستق حلبي ملكية' : 'Royal Pistachio Baklava'}
                    </h3>
                    <p className="text-gold-600 font-mono text-xs font-bold mt-1">
                      120 {t.currency} / {lang === 'ar' ? 'كجم' : 'Kg'}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-emerald-950 text-gold-300 flex items-center justify-center font-bold shadow-md">
                    ★
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Card 1: Warm Golden Kunafa */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute -top-6 -right-6 w-32 sm:w-40 aspect-square bg-white border border-gold-300/60 p-2 rounded-2xl shadow-xl z-20 hidden sm:block"
            >
              <div className="w-full h-full rounded-xl overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=300&q=80"
                  alt="Fresh Kunafa"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-emerald-950/10" />
                <span className="absolute bottom-2 left-2 bg-emerald-950/90 text-gold-300 px-2 py-0.5 rounded text-[9px] font-arabic font-bold">
                  {lang === 'ar' ? 'كنافة ساخنة' : 'Hot Kunafa'}
                </span>
              </div>
            </motion.div>

            {/* Floating Card 2: Luxury Gift Box */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 4, delay: 2, ease: 'easeInOut' }}
              className="absolute -bottom-6 -left-6 w-32 sm:w-40 aspect-square bg-white border border-gold-300/60 p-2 rounded-2xl shadow-xl z-20 hidden sm:block"
            >
              <div className="w-full h-full rounded-xl overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=300&q=80"
                  alt="Corporate Gifting Box"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-emerald-950/10" />
                <span className="absolute bottom-2 left-2 bg-emerald-950/90 text-gold-300 px-2 py-0.5 rounded text-[9px] font-arabic font-bold">
                  {lang === 'ar' ? 'صناديق ملكية' : 'VIP Gift Boxes'}
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
