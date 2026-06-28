import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../types';
import { translations } from '../data';
import { Phone, Mail, MapPin, Clock, MessageCircle, CheckCircle, Send, ZoomIn, ZoomOut } from 'lucide-react';

interface ContactProps {
  lang: Language;
}

export default function Contact({ lang }: ContactProps) {
  const t = translations[lang];
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [msg, setMsg] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [mapZoom, setMapZoom] = useState(1);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !msg) return;

    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setName('');
      setEmail('');
      setPhone('');
      setMsg('');
    }, 5000);
  };

  const mapLocations = [
    { nameAr: 'برج الفيصلية', nameEn: 'Al Faisaliah Tower', x: '18%', y: '32%', size: 'md' },
    { nameAr: 'برج المملكة', nameEn: 'Kingdom Centre', x: '22%', y: '15%', size: 'lg' },
    { nameAr: 'مكتبة الملك فهد', nameEn: 'King Fahd Library', x: '45%', y: '42%', size: 'sm' },
    { nameAr: 'حلويات المغرف (السليمانية)', nameEn: 'Al-Magharif Sweets (Sulimaniyah)', x: '58%', y: '50%', isMain: true },
    { nameAr: 'شارع التحلية', nameEn: 'Tahlia Street', x: '55%', y: '35%', size: 'sm' },
    { nameAr: 'طريق الأمير محمد بن عبدالعزيز', nameEn: 'Prince Muhammad Road', x: '35%', y: '50%', size: 'sm' }
  ];

  return (
    <section id="contact" className="py-24 bg-cream-100 relative overflow-hidden border-t border-gold-200/40">
      <div className="absolute inset-0 islamic-pattern z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold-200/20 blur-[130px] rounded-full z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-gold-600 font-bold uppercase tracking-widest text-xs font-arabic block mb-3">
            📍 {lang === 'ar' ? 'فروعنا وتواصلنا' : 'Locate Us'}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-emerald-950 tracking-tight font-arabic-serif mb-4">
            {t.contactTitle}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mb-6" />
          <p className="text-base sm:text-lg text-gray-600 font-arabic">
            {t.contactSub}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Direct info, Quick WhatsApp and Visual Interactive Map */}
          <div className="col-span-1 lg:col-span-6 flex flex-col justify-between gap-8">
            <div className={`space-y-6 font-arabic ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
              <h3 className="font-arabic font-extrabold text-xl sm:text-2xl text-emerald-950 border-r-4 border-gold-500 pr-3 pl-3">
                {t.contactInfoTitle}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Location Card */}
                <div className="bg-white border border-gold-200/50 p-5 rounded-2xl flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-full bg-gold-100 text-gold-600 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-emerald-950 text-sm">{t.addressLabel}</h4>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">{t.addressValue}</p>
                  </div>
                </div>

                {/* Telephone Card */}
                <div className="bg-white border border-gold-200/50 p-5 rounded-2xl flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-full bg-gold-100 text-gold-600 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-emerald-950 text-sm">{t.phoneLabel}</h4>
                    <p className="text-xs text-gray-600 mt-1 font-mono">+966 11 456 7890</p>
                  </div>
                </div>

                {/* Email Card */}
                <div className="bg-white border border-gold-200/50 p-5 rounded-2xl flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-full bg-gold-100 text-gold-600 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-emerald-950 text-sm">{t.emailLabel}</h4>
                    <p className="text-xs text-gray-600 mt-1 font-mono">hospitality@al-magharif.com</p>
                  </div>
                </div>

                {/* Hours Card */}
                <div className="bg-white border border-gold-200/50 p-5 rounded-2xl flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-full bg-gold-100 text-gold-600 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-emerald-950 text-sm">{t.hoursLabel}</h4>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">{t.hoursValue}</p>
                  </div>
                </div>

              </div>

              {/* Quick WhatsApp Live button */}
              <a
                href="https://wa.me/966114567890?text=Hello%20Al-Magharif%20Sweets"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 text-white font-bold text-sm px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:bg-green-500 transition-all duration-300 w-full justify-center border border-gold-200"
              >
                <MessageCircle className="w-5 h-5 text-white" />
                <span>{t.whatsappQuickBtn}</span>
              </a>
            </div>

            {/* Interactive Vector Map of Riyadh, Suleimania Area */}
            <div className="bg-emerald-950 border border-gold-400 rounded-3xl p-5 shadow-lg relative overflow-hidden h-72">
              <div className="absolute inset-0 bg-emerald-950 islamic-pattern opacity-10" />
              
              {/* Map Title Overlay */}
              <div className="absolute top-4 left-4 z-20 bg-emerald-900/95 border border-gold-400 px-3 py-1 rounded-full flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
                <span className="text-[10px] text-white font-semibold uppercase tracking-wider">{t.mapPlaceholder}</span>
              </div>

              {/* Map Controls */}
              <div className="absolute top-4 right-4 z-20 flex flex-col gap-1">
                <button
                  onClick={() => setMapZoom(prev => Math.min(prev + 0.25, 2))}
                  className="p-1.5 bg-emerald-900 border border-gold-300 text-white hover:bg-gold-500 hover:text-emerald-950 rounded-lg transition-colors"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setMapZoom(prev => Math.max(prev - 0.25, 0.75))}
                  className="p-1.5 bg-emerald-900 border border-gold-300 text-white hover:bg-gold-500 hover:text-emerald-950 rounded-lg transition-colors"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Outer map scale canvas */}
              <div
                className="w-full h-full relative origin-center transition-transform duration-500"
                style={{ transform: `scale(${mapZoom})` }}
              >
                {/* Styled Roads */}
                <div className="absolute inset-x-0 top-1/2 h-10 bg-emerald-900/40 border-y border-emerald-800" />
                <div className="absolute inset-y-0 left-1/3 w-10 bg-emerald-900/40 border-x border-emerald-800" />
                <div className="absolute inset-y-0 right-1/4 w-8 bg-emerald-900/40 border-x border-emerald-800" />

                {/* Map Pins / Highlights */}
                {mapLocations.map((loc, i) => (
                  <div
                    key={i}
                    style={{ left: loc.x, top: loc.y }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 z-10"
                  >
                    {loc.isMain ? (
                      <>
                        <motion.div
                          animate={{ scale: [1, 1.25, 1] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="w-6 h-6 rounded-full bg-gold-400 flex items-center justify-center text-emerald-950 font-bold border-2 border-white shadow-lg cursor-pointer"
                        >
                          📌
                        </motion.div>
                        <span className="bg-gold-400 text-emerald-950 text-[10px] font-extrabold px-2 py-0.5 rounded-md whitespace-nowrap border border-white font-arabic">
                          {lang === 'ar' ? loc.nameAr : loc.nameEn}
                        </span>
                      </>
                    ) : (
                      <>
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-800 border border-emerald-700" />
                        <span className="text-[8px] text-gray-400 font-medium whitespace-nowrap font-arabic">
                          {lang === 'ar' ? loc.nameAr : loc.nameEn}
                        </span>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Premium Contact Message Form */}
          <div className="col-span-1 lg:col-span-6">
            <div className="bg-white border border-gold-300/60 rounded-3xl p-6 sm:p-10 shadow-xl h-full flex flex-col justify-center relative overflow-hidden">
              
              <AnimatePresence>
                {isSent ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-white z-20 flex flex-col items-center justify-center text-center p-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                      <CheckCircle className="w-10 h-10" />
                    </div>
                    <h3 className="font-arabic font-extrabold text-2xl text-emerald-950 mb-3">
                      {lang === 'ar' ? 'تم استلام رسالتك!' : 'Message Received!'}
                    </h3>
                    <p className="font-arabic text-sm text-gray-600 max-w-sm leading-relaxed mb-6">
                      {t.contactFormSuccess}
                    </p>
                    <button
                      onClick={() => setIsSent(false)}
                      className="px-6 py-2.5 border border-gold-400 text-gold-600 hover:bg-gold-50 font-arabic text-xs font-semibold rounded-full transition-colors"
                    >
                      {lang === 'ar' ? 'رجوع للنموذج' : 'Back to form'}
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5 font-arabic text-right">
                    
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-gray-700">{t.contactFormName}</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={lang === 'ar' ? 'أدخل اسمك الكريم' : 'e.g., John Doe'}
                        className="px-4 py-3 border border-gold-200 rounded-xl focus:outline-none focus:border-gold-500 bg-cream-50/50"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-gray-700">{t.contactFormEmail}</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="johndoe@gmail.com"
                          className="px-4 py-3 border border-gold-200 rounded-xl focus:outline-none focus:border-gold-500 bg-cream-50/50"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-gray-700">{t.contactFormPhone}</label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+966 50 123 4567"
                          className="px-4 py-3 border border-gold-200 rounded-xl focus:outline-none focus:border-gold-500 bg-cream-50/50"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-gray-700">{t.contactFormMsg}</label>
                      <textarea
                        required
                        rows={5}
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)}
                        placeholder={lang === 'ar' ? 'اكتب تفاصيل طلبك الكبرى أو موضوع استفسارك هنا وسنتواصل معك فورا...' : 'Tell us how we can help you with your sweet occasion...'}
                        className="px-4 py-3 border border-gold-200 rounded-xl focus:outline-none focus:border-gold-500 bg-cream-50/50"
                      />
                    </div>

                    <div className="flex justify-end pt-3">
                      <button
                        type="submit"
                        className="w-full sm:w-auto px-8 py-3.5 bg-emerald-950 text-white hover:bg-gold-500 font-bold text-sm rounded-xl transition-all shadow-md hover:text-emerald-950 flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
                      >
                        <Send className="w-4 h-4" />
                        <span>{t.contactFormSubmit}</span>
                      </button>
                    </div>

                  </form>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
