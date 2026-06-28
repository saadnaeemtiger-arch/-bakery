import { motion } from 'motion/react';
import { Language } from '../types';
import { translations } from '../data';
import { Award, Clock, Star, Gift, CheckCircle, Heart } from 'lucide-react';

interface WhyChooseUsProps {
  lang: Language;
}

export default function WhyChooseUs({ lang }: WhyChooseUsProps) {
  const t = translations[lang];

  const features = [
    {
      icon: Award,
      title: t.why1Title,
      desc: t.why1Desc,
    },
    {
      icon: Clock,
      title: t.why2Title,
      desc: t.why2Desc,
    },
    {
      icon: Star,
      title: t.why3Title,
      desc: t.why3Desc,
    },
    {
      icon: Gift,
      title: t.why4Title,
      desc: t.why4Desc,
    },
    {
      icon: CheckCircle,
      title: t.why5Title,
      desc: t.why5Desc,
    },
    {
      icon: Heart,
      title: t.why6Title,
      desc: t.why6Desc,
    },
  ];

  return (
    <section id="why-us" className="py-24 bg-cream-100 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 islamic-pattern z-0" />
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[400px] h-[400px] bg-gold-200/20 blur-[120px] rounded-full z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-gold-600 font-bold uppercase tracking-widest text-xs font-arabic block mb-3">
            👑 {lang === 'ar' ? 'فلسفتنا في الضيافة' : 'Our Philosophy'}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-emerald-950 tracking-tight font-arabic-serif mb-4">
            {t.whyTitle}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mb-6" />
          <p className="text-base sm:text-lg text-gray-600 font-arabic">
            {t.whySub}
          </p>
        </div>

        {/* Features Bento/Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, index) => {
            const IconComponent = feat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="bg-white/80 backdrop-blur border border-gold-200/50 hover:border-gold-400 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col items-start hover:-translate-y-1"
              >
                {/* Icon Circle */}
                <div className="w-14 h-14 rounded-2xl bg-emerald-950 text-gold-300 flex items-center justify-center mb-6 group-hover:bg-gold-500 group-hover:text-emerald-950 transition-colors duration-300 shadow-lg">
                  <IconComponent className="w-6 h-6" />
                </div>

                {/* Content */}
                <h3 className="font-arabic font-extrabold text-lg sm:text-xl text-emerald-950 mb-3 group-hover:text-gold-600 transition-colors">
                  {feat.title}
                </h3>
                
                <p className="font-arabic text-sm text-gray-600 leading-relaxed">
                  {feat.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Quality Banner Footer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-16 bg-emerald-950 border border-gold-300 p-8 sm:p-10 rounded-3xl text-center shadow-xl max-w-4xl mx-auto"
        >
          <h3 className="text-xl sm:text-2xl font-bold font-arabic text-gold-300 mb-3">
            {lang === 'ar' ? 'حلويات طازجة ومضمونة 100٪ لمناسبتكم القادمة' : '100% Guaranteed Fresh Sweets for Your Upcoming Event'}
          </h3>
          <p className="text-cream-100 text-xs sm:text-sm font-arabic max-w-2xl mx-auto mb-6 leading-relaxed">
            {lang === 'ar'
              ? 'نهتم بأدق التفاصيل من المطبخ للباب. جميع حلوياتنا تُشحن في ظروف وصناديق مناسبة ومغلفة حرارياً لتصل دافئة وبكامل رونقها ونكهتها الغنية.'
              : 'We care about the finest details from our bakery to your doorstep. All our sweets are transported in custom thermal containers, ensuring they arrive warm and fully flavorful.'}
          </p>
          <a
            href="#menu"
            className="inline-flex items-center gap-2 bg-gold-400 text-emerald-950 hover:bg-gold-300 font-bold text-xs sm:text-sm px-6 py-3 rounded-full shadow-md transition-colors font-arabic"
          >
            {t.viewMenu}
          </a>
        </motion.div>

      </div>
    </section>
  );
}
