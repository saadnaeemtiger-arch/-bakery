import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../types';
import { translations, faqs } from '../data';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQProps {
  lang: Language;
}

export default function FAQ({ lang }: FAQProps) {
  const t = translations[lang];
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 bg-cream-50 relative border-t border-gold-200/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-gold-600 font-bold uppercase tracking-widest text-xs font-arabic block mb-3">
            💬 {lang === 'ar' ? 'استفسارات شائعة' : 'FAQ'}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-emerald-950 tracking-tight font-arabic-serif mb-4">
            {t.faqTitle}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mb-6" />
          <p className="text-base sm:text-lg text-gray-600 font-arabic">
            {t.faqSub}
          </p>
        </div>

        {/* Accordions Container */}
        <div className="space-y-4 font-arabic">
          {faqs.map((faq, index) => {
            const isOpen = openId === faq.id;
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? 'bg-white border-gold-400 shadow-lg'
                    : 'bg-white/60 border-gold-200/50 hover:bg-white hover:border-gold-300'
                }`}
              >
                {/* Trigger Button */}
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className={`w-full px-6 py-5 flex items-center justify-between gap-4 font-extrabold text-base sm:text-lg text-emerald-950 transition-colors ${
                    lang === 'ar' ? 'text-right flex-row-reverse' : 'text-left'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-gold-500 flex-shrink-0" />
                    <span>{lang === 'ar' ? faq.questionAr : faq.questionEn}</span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gold-600 transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Body Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className={`px-6 pb-6 pt-2 text-sm sm:text-base text-gray-600 leading-relaxed border-t border-gold-100 ${
                        lang === 'ar' ? 'text-right' : 'text-left'
                      }`}>
                        {lang === 'ar' ? faq.answerAr : faq.answerEn}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
