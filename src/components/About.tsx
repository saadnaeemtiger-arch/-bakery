import { motion } from 'motion/react';
import { Language } from '../types';
import { translations } from '../data';
import { Sparkles, Award, Heart } from 'lucide-react';

interface AboutProps {
  lang: Language;
}

export default function About({ lang }: AboutProps) {
  const t = translations[lang];

  return (
    <section id="about" className="py-24 bg-cream-50 overflow-hidden relative border-t border-gold-200/40">
      {/* Decorative Golden Star SVG */}
      <div className="absolute top-12 right-12 w-32 h-32 text-gold-500/5 pointer-events-none">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M12 2L14.5 7H19.5L15.5 10.5L17 15.5L12 12.5L7 15.5L8.5 10.5L4.5 7H9.5L12 2Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-gold-600 font-bold uppercase tracking-widest text-xs font-arabic block mb-3">
            ✨ {t.aboutBadge}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-emerald-950 tracking-tight font-arabic-serif mb-4">
            {t.aboutTitle}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mb-6" />
          <p className="text-base sm:text-lg text-gray-600 font-arabic italic">
            "{t.aboutSub}"
          </p>
        </div>

        {/* Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Beautiful Double Photography Layout */}
          <div className="col-span-1 lg:col-span-5 relative">
            <div className="grid grid-cols-2 gap-4">
              
              {/* Image 1: Baking Craft */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-2xl overflow-hidden aspect-[3/4] shadow-xl border border-gold-300/40 relative group"
              >
                <img
                  src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80"
                  alt="Fresh Dough & Flour"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-emerald-950/20" />
              </motion.div>

              {/* Image 2: Finished Sweet Platters */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="rounded-2xl overflow-hidden aspect-[3/4] shadow-xl border border-gold-300/40 mt-8 relative group"
              >
                <img
                  src="https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=400&q=80"
                  alt="Assorted Baklava Tray"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-emerald-950/20" />
              </motion.div>

            </div>

            {/* Floating Experience Emblem */}
            <div className={`absolute bottom-6 -right-4 bg-emerald-950 border-2 border-gold-400 text-white p-5 rounded-2xl shadow-2xl flex items-center gap-4 max-w-xs ${
              lang === 'ar' ? 'text-right' : 'text-left'
            }`}>
              <div className="w-12 h-12 rounded-full bg-gold-400 text-emerald-950 flex items-center justify-center font-bold text-lg flex-shrink-0">
                ★
              </div>
              <div>
                <p className="text-xs text-gold-300 uppercase font-semibold font-mono tracking-wider">
                  {lang === 'ar' ? 'وصفات متوارثة' : 'Heritage Recipes'}
                </p>
                <p className="font-arabic font-bold text-sm text-cream-100 mt-1">
                  {lang === 'ar' ? 'مخبوزة يومياً بأيدي محترفة' : 'Daily baked with ultimate craft'}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Narrative & Selling Highlights */}
          <div className="col-span-1 lg:col-span-7 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6 text-gray-700 leading-relaxed font-arabic"
            >
              <p className="text-lg text-emerald-950 font-semibold border-r-4 border-gold-500 pr-4 pl-4 font-arabic-serif">
                {lang === 'ar' 
                  ? 'نسعى دائماً لنكون الاسم الأكثر موثوقية وفخامة في عالم الحلويات العربية والمناسبات الخاصة.' 
                  : 'We always strive to be the most trusted and luxurious name in the world of Arabic sweets and special occasions.'}
              </p>
              
              <p className="text-sm sm:text-base">
                {t.aboutText1}
              </p>

              <p className="text-sm sm:text-base text-gray-600">
                {t.aboutText2}
              </p>

              {/* Sub-features icons grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 mt-6 border-t border-gold-200/50">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold-100 flex items-center justify-center text-gold-600 flex-shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-emerald-950 text-sm">{lang === 'ar' ? 'نقاء المذاق' : 'Pure Taste'}</h4>
                    <p className="text-xs text-gray-500 mt-1">{lang === 'ar' ? 'مكونات ممتازة 100%' : '100% premium ingredients'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold-100 flex items-center justify-center text-gold-600 flex-shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-emerald-950 text-sm">{lang === 'ar' ? 'إتقان وجودة' : 'Mastery Craft'}</h4>
                    <p className="text-xs text-gray-500 mt-1">{lang === 'ar' ? 'بأيدي خبراء عراقة' : 'By expert master chefs'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold-100 flex items-center justify-center text-gold-600 flex-shrink-0">
                    <Heart className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-emerald-950 text-sm">{lang === 'ar' ? 'حفاوة وضيافة' : 'Warm Hospitality'}</h4>
                    <p className="text-xs text-gray-500 mt-1">{lang === 'ar' ? 'لتبييض وجوهكم دوماً' : 'Perfect for your events'}</p>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
