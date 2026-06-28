import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShoppingCart, Check, Star } from 'lucide-react';
import { Language, Product, CartItem } from '../types';
import { translations, products } from '../data';

interface MenuProps {
  lang: Language;
  cartItems: CartItem[];
  onAddToCart: (product: Product) => void;
}

export default function Menu({ lang, cartItems, onAddToCart }: MenuProps) {
  const t = translations[lang];
  const [filter, setFilter] = useState<'all' | 'traditional' | 'bakery' | 'chocolates' | 'gifts'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: t.catAll },
    { id: 'traditional', label: t.catTraditional },
    { id: 'bakery', label: t.catBakery },
    { id: 'chocolates', label: t.catChocolates },
    { id: 'gifts', label: t.catGifts },
  ];

  // Filtering + Searching logic
  const filteredProducts = products.filter((p) => {
    const matchesCategory = filter === 'all' || p.category === filter;
    
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      query === '' ||
      p.nameAr.toLowerCase().includes(query) ||
      p.nameEn.toLowerCase().includes(query) ||
      p.descriptionAr.toLowerCase().includes(query) ||
      p.descriptionEn.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  const getCartQty = (productId: string) => {
    const item = cartItems.find((ci) => ci.product.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <section id="menu" className="py-24 bg-cream-50 relative overflow-hidden border-t border-gold-200/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-gold-600 font-bold uppercase tracking-widest text-xs font-arabic block mb-3">
            ✨ {lang === 'ar' ? 'تشكيلة المغرف الخاصة' : 'Our Selection'}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-emerald-950 tracking-tight font-arabic-serif mb-4">
            {t.menuTitle}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mb-6" />
          <p className="text-base sm:text-lg text-gray-600 font-arabic">
            {t.menuSub}
          </p>
        </div>

        {/* Categories Bar & Live Search Panel */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          
          {/* Categories Horizontal Scroller */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full md:w-auto scrollbar-none justify-start md:justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id as any)}
                className={`px-5 py-2.5 rounded-full font-arabic text-xs sm:text-sm font-semibold transition-all flex-shrink-0 border ${
                  filter === cat.id
                    ? 'bg-emerald-950 text-white border-gold-400 shadow-md'
                    : 'bg-white text-gray-700 border-gold-200/50 hover:bg-gold-50 hover:text-emerald-950'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className={`absolute top-1/2 -translate-y-1/2 text-gold-500 w-5 h-5 ${
              lang === 'ar' ? 'left-4' : 'right-4'
            }`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className={`w-full py-3 border border-gold-200 rounded-full focus:outline-none focus:border-gold-500 bg-white font-arabic text-xs sm:text-sm shadow-inner ${
                lang === 'ar' ? 'pl-11 pr-5 text-right' : 'pr-11 pl-5 text-left'
              }`}
            />
          </div>

        </div>

        {/* Dynamic Product Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((p) => {
              const qtyInCart = getCartQty(p.id);
              
              return (
                <motion.div
                  layout
                  key={p.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white border border-gold-200/40 rounded-3xl overflow-hidden shadow-md hover:shadow-xl hover:border-gold-400/80 transition-all duration-300 group flex flex-col justify-between"
                >
                  
                  {/* Card Thumbnail Area */}
                  <div className="relative aspect-square overflow-hidden bg-gold-50/20">
                    <img
                      src={p.image}
                      alt={lang === 'ar' ? p.nameAr : p.nameEn}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Dark gradient shadow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/20 to-transparent" />

                    {/* Best Seller badge indicator */}
                    {p.isPopular && (
                      <span className={`absolute top-4 bg-gold-400 text-emerald-950 font-bold font-arabic text-[9px] sm:text-xs px-3 py-1 rounded-full shadow-md z-10 border border-white ${
                        lang === 'ar' ? 'right-4' : 'left-4'
                      }`}>
                        🔥 {t.popular}
                      </span>
                    )}

                    {/* Quick Add floating circle */}
                    <button
                      onClick={() => onAddToCart(p)}
                      className={`absolute bottom-4 p-3 bg-white hover:bg-gold-400 text-emerald-950 rounded-full shadow-lg hover:scale-105 transition-all z-10 border border-gold-200 ${
                        lang === 'ar' ? 'left-4' : 'right-4'
                      }`}
                      title={t.addToCart}
                    >
                      {qtyInCart > 0 ? (
                        <Check className="w-5 h-5 text-emerald-800 font-extrabold" />
                      ) : (
                        <ShoppingCart className="w-5 h-5 text-emerald-950" />
                      )}
                    </button>
                  </div>

                  {/* Card Body Area */}
                  <div className={`p-6 flex-1 flex flex-col justify-between ${
                    lang === 'ar' ? 'text-right' : 'text-left'
                  }`}>
                    <div>
                      {/* Rating details */}
                      <div className={`flex items-center gap-1 mb-2 ${
                        lang === 'ar' ? 'justify-start' : 'justify-start'
                      }`}>
                        <Star className="w-4 h-4 text-gold-400 fill-gold-400" />
                        <span className="text-xs font-bold text-gray-500 font-mono">{p.rating}</span>
                      </div>

                      {/* Name */}
                      <h3 className="font-arabic font-extrabold text-emerald-950 text-base sm:text-lg mb-2 group-hover:text-gold-600 transition-colors">
                        {lang === 'ar' ? p.nameAr : p.nameEn}
                      </h3>

                      {/* Appetizing description */}
                      <p className="font-arabic text-xs text-gray-600 leading-relaxed mb-4 line-clamp-3">
                        {lang === 'ar' ? p.descriptionAr : p.descriptionEn}
                      </p>
                    </div>

                    {/* Action trigger footer */}
                    <div className="pt-4 border-t border-gold-200/30 flex items-center justify-between">
                      <span className="text-lg font-extrabold text-emerald-950 font-mono gold-gradient-text">
                        {p.price} {t.currency}
                      </span>

                      <button
                        onClick={() => onAddToCart(p)}
                        className={`px-4 py-2 text-xs font-bold rounded-full transition-all flex items-center gap-1.5 font-arabic ${
                          qtyInCart > 0
                            ? 'bg-emerald-950 text-white border border-gold-400'
                            : 'bg-gold-50 text-gold-700 border border-gold-300 hover:bg-gold-400 hover:text-emerald-950'
                        }`}
                      >
                        {qtyInCart > 0 ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>
                              {t.addedToCart} ({qtyInCart})
                            </span>
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-3.5 h-3.5" />
                            <span>{t.addToCart}</span>
                          </>
                        )}
                      </button>
                    </div>

                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty Search Fallback */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 text-gray-500 font-arabic">
            <p className="text-lg font-semibold">{lang === 'ar' ? 'لم يتم العثور على حلويات تطابق بحثك!' : 'No treats found matching your search!'}</p>
            <p className="text-xs text-gray-400 mt-2">{lang === 'ar' ? 'حاول البحث عن كلمات أخرى مثل بقلاوة، كنافة، كيك...' : 'Try looking up simple words like Baklava, Cake, Kunafa...'}</p>
          </div>
        )}

      </div>
    </section>
  );
}
