import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../types';
import { translations, galleryItems } from '../data';
import { ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryProps {
  lang: Language;
}

export default function Gallery({ lang }: GalleryProps) {
  const t = translations[lang];
  const [filter, setFilter] = useState<'all' | 'sweets' | 'cakes' | 'gifts' | 'bakery'>('all');
  const [activePhoto, setActivePhoto] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: t.catAll },
    { id: 'sweets', label: t.catTraditional },
    { id: 'cakes', label: t.catBakery },
    { id: 'gifts', label: t.catGifts }
  ];

  const filteredItems = galleryItems.filter(
    (item) => filter === 'all' || item.category === filter
  );

  const handleNextPhoto = () => {
    if (activePhoto === null) return;
    setActivePhoto((activePhoto + 1) % filteredItems.length);
  };

  const handlePrevPhoto = () => {
    if (activePhoto === null) return;
    setActivePhoto((activePhoto - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <section id="gallery" className="py-24 bg-cream-50 relative border-t border-gold-200/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-gold-600 font-bold uppercase tracking-widest text-xs font-arabic block mb-3">
            📸 {lang === 'ar' ? 'معرض الصور الفاخر' : 'Luxury Gallery'}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-emerald-950 tracking-tight font-arabic-serif mb-4">
            {t.galleryTitle}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mb-6" />
          <p className="text-base sm:text-lg text-gray-600 font-arabic">
            {t.gallerySub}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setFilter(cat.id as any);
                setActivePhoto(null);
              }}
              className={`px-6 py-2.5 rounded-full font-arabic text-xs sm:text-sm font-semibold border transition-all duration-300 ${
                filter === cat.id
                  ? 'bg-emerald-950 text-white border-gold-400 shadow-md'
                  : 'bg-white text-gray-700 border-gold-200/50 hover:bg-gold-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Photos Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative bg-white border border-gold-200/40 rounded-2xl overflow-hidden shadow-md aspect-square cursor-pointer"
                onClick={() => setActivePhoto(index)}
              >
                <img
                  src={item.image}
                  alt={lang === 'ar' ? item.titleAr : item.titleEn}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Dark Hover Overlay */}
                <div className="absolute inset-0 bg-emerald-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-gold-400 text-emerald-950 flex items-center justify-center mb-4 transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                  <h4 className="font-arabic font-extrabold text-white text-base sm:text-lg mb-2">
                    {lang === 'ar' ? item.titleAr : item.titleEn}
                  </h4>
                  <span className="text-gold-300 text-xs font-semibold uppercase tracking-widest">
                    {item.category === 'sweets' ? t.catTraditional : item.category === 'cakes' ? t.catBakery : t.catGifts}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Lightbox Modal with Zoom Controls */}
      <AnimatePresence>
        {activePhoto !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-md"
          >
            {/* Close Button */}
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              title={t.close}
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={handlePrevPhoto}
              className="absolute left-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50"
              title="Previous Image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNextPhoto}
              className="absolute right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50"
              title="Next Image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Lightbox Content Card */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-w-4xl w-full flex flex-col items-center gap-4"
            >
              <div className="max-h-[70vh] rounded-2xl overflow-hidden border border-gold-400/50 shadow-2xl bg-black">
                <img
                  src={filteredItems[activePhoto].image}
                  alt={lang === 'ar' ? filteredItems[activePhoto].titleAr : filteredItems[activePhoto].titleEn}
                  className="max-h-[70vh] object-contain w-auto mx-auto"
                />
              </div>
              
              <div className="text-center font-arabic text-white max-w-xl">
                <h3 className="text-lg sm:text-xl font-bold mb-1">
                  {lang === 'ar' ? filteredItems[activePhoto].titleAr : filteredItems[activePhoto].titleEn}
                </h3>
                <p className="text-gold-300 text-xs font-semibold uppercase tracking-wider">
                  {filteredItems[activePhoto].category === 'sweets' ? t.catTraditional : filteredItems[activePhoto].category === 'cakes' ? t.catBakery : t.catGifts}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
