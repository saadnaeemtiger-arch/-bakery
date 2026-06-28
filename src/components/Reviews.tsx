import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, Review } from '../types';
import { translations, reviews as initialReviews } from '../data';
import { Star, MessageSquarePlus, CheckCircle, User } from 'lucide-react';

interface ReviewsProps {
  lang: Language;
}

export default function Reviews({ lang }: ReviewsProps) {
  const t = translations[lang];
  const [reviewsList, setReviewsList] = useState<Review[]>(initialReviews);
  const [showForm, setShowForm] = useState(false);
  
  // Form states
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !text) return;

    const newReview: Review = {
      id: `custom-review-${Date.now()}`,
      nameAr: name,
      nameEn: name,
      rating: rating,
      textAr: text,
      textEn: text,
      dateAr: 'الآن',
      dateEn: 'Just now',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      isCustom: true
    };

    setReviewsList([newReview, ...reviewsList]);
    setIsSuccess(true);
    
    // reset form
    setName('');
    setRating(5);
    setText('');

    setTimeout(() => {
      setIsSuccess(false);
      setShowForm(false);
    }, 4000);
  };

  return (
    <section id="reviews" className="py-24 bg-cream-100 relative overflow-hidden border-t border-gold-200/40">
      <div className="absolute inset-0 islamic-pattern z-0" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[300px] h-[300px] bg-gold-200/10 blur-[100px] rounded-full z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16">
          <div className="text-center md:text-right max-w-2xl">
            <span className="text-gold-600 font-bold uppercase tracking-widest text-xs font-arabic block mb-3">
              ❤️ {lang === 'ar' ? 'آراء شركاء نجاحنا' : 'Testimonials'}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-emerald-950 tracking-tight font-arabic-serif mb-4">
              {t.reviewTitle}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent md:mx-0 mb-6" />
            <p className="text-base sm:text-lg text-gray-600 font-arabic">
              {t.reviewSub}
            </p>
          </div>

          <button
            onClick={() => {
              setShowForm(!showForm);
              setIsSuccess(false);
            }}
            className="flex items-center gap-2 bg-emerald-950 text-white hover:bg-gold-500 border border-gold-300 px-6 py-3.5 rounded-full font-bold text-sm transition-all duration-300 font-arabic shadow-lg hover:text-emerald-950 transform hover:-translate-y-0.5"
          >
            <MessageSquarePlus className="w-5 h-5 text-gold-300" />
            <span>{t.reviewSubmitBtn}</span>
          </button>
        </div>

        {/* Dynamic Reviews Form Panel */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white border border-gold-300/60 rounded-3xl p-6 sm:p-10 shadow-xl max-w-3xl mx-auto mb-16 overflow-hidden"
            >
              {isSuccess ? (
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-6"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h3 className="font-arabic font-extrabold text-xl text-emerald-950 mb-2">
                    {lang === 'ar' ? 'شكراً لتقييمك الكريم!' : 'Thank you for your review!'}
                  </h3>
                  <p className="font-arabic text-sm text-gray-600 max-w-md leading-relaxed">
                    {t.reviewSuccess}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 font-arabic text-right">
                  <h3 className="font-arabic font-extrabold text-lg sm:text-xl text-emerald-950 border-r-4 border-gold-500 pr-3">
                    {t.reviewFormTitle}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-gray-700">{t.reviewFormName}</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={lang === 'ar' ? 'مثال: فهد عبد الله' : 'e.g., Jane Doe'}
                        className="px-4 py-3 border border-gold-200 rounded-xl focus:outline-none focus:border-gold-500 bg-cream-50/50"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-gray-700">{t.reviewFormRating}</label>
                      <div className="flex items-center gap-1.5 py-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className="p-1 hover:scale-110 transition-transform"
                          >
                            <Star
                              className={`w-7 h-7 ${
                                star <= rating ? 'text-gold-400 fill-gold-400' : 'text-gray-300'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-gray-700">{t.reviewFormText}</label>
                    <textarea
                      required
                      rows={4}
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder={lang === 'ar' ? 'اكتب انطباعك عن جودة حلوياتنا وتغليفها هنا...' : 'Write your experience here...'}
                      className="px-4 py-3 border border-gold-200 rounded-xl focus:outline-none focus:border-gold-500 bg-cream-50/50"
                    />
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-3 bg-emerald-950 text-white hover:bg-gold-500 font-bold text-sm rounded-xl transition-all shadow-md hover:text-emerald-950"
                    >
                      {t.reviewFormSubmit}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Testimonials List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviewsList.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border border-gold-200/50 p-8 rounded-2xl shadow-md hover:shadow-xl hover:border-gold-400/80 transition-all duration-300 relative group flex flex-col justify-between"
            >
              {/* Top Quote Icon Accent */}
              <div className="absolute top-6 right-6 text-gold-200 font-serif text-6xl leading-none pointer-events-none group-hover:text-gold-300 select-none opacity-40">
                ”
              </div>

              <div>
                {/* Stars */}
                <div className="flex items-center gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating ? 'text-gold-400 fill-gold-400' : 'text-gray-200'
                      }`}
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="font-arabic text-sm text-gray-700 leading-relaxed mb-6 font-medium italic">
                  "{lang === 'ar' ? review.textAr : review.textEn}"
                </p>
              </div>

              {/* Author Info */}
              <div className={`flex items-center gap-3 pt-6 border-t border-gold-200/40 ${
                lang === 'ar' ? 'flex-row-reverse' : 'flex-row'
              }`}>
                <div className="w-10 h-10 rounded-full overflow-hidden border border-gold-300 bg-gold-50 flex items-center justify-center flex-shrink-0">
                  {review.isCustom ? (
                    <User className="w-5 h-5 text-gold-600" />
                  ) : (
                    <img
                      src={review.avatar}
                      alt={lang === 'ar' ? review.nameAr : review.nameEn}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                  <h4 className="font-arabic font-extrabold text-sm text-emerald-950">
                    {lang === 'ar' ? review.nameAr : review.nameEn}
                  </h4>
                  <p className="text-[10px] text-gray-500 font-medium font-mono">
                    {lang === 'ar' ? review.dateAr : review.dateEn}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
