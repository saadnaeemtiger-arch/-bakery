import { useState } from 'react';
import { motion } from 'motion/react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { Language, CartItem } from '../types';
import { translations } from '../data';

interface CartSidebarProps {
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQty: (productId: string, action: 'add' | 'remove') => void;
  onRemoveItem: (productId: string) => void;
}

export default function CartSidebar({
  lang,
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
}: CartSidebarProps) {
  const t = translations[lang];
  const [giftMsg, setGiftMsg] = useState('');

  if (!isOpen) return null;

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const generateWhatsAppLink = () => {
    const phoneNum = '966114567890'; // Boutique Riyadh Store Hotline
    let text = '';
    
    if (lang === 'ar') {
      text += `*طلب جديد من موقع حلويات المغرف* 🧁\n\n`;
      text += `*تفاصيل المنتجات:*\n`;
      cartItems.forEach((item) => {
        text += `• ${item.product.nameAr} (الكمية: ${item.quantity}) - ${item.product.price * item.quantity} ريال\n`;
      });
      if (giftMsg.trim()) {
        text += `\n*رسالة إهداء:* 🎁\n"${giftMsg.trim()}"\n`;
      }
      text += `\n*المجموع الإجمالي:* ${totalPrice} ريال\n\n`;
      text += `شكراً لاختياركم حلويات المغرف! يرجى تأكيد الطلب وموقع التوصيل الخاص بكم.`;
    } else {
      text += `*New Order from Al-Magharif Sweets Website* 🧁\n\n`;
      text += `*Product Details:*\n`;
      cartItems.forEach((item) => {
        text += `• ${item.product.nameEn} (Qty: ${item.quantity}) - ${item.product.price * item.quantity} SAR\n`;
      });
      if (giftMsg.trim()) {
        text += `\n*Gift Card Message:* 🎁\n"${giftMsg.trim()}"\n`;
      }
      text += `\n*Grand Total:* ${totalPrice} SAR\n\n`;
      text += `Thank you for choosing Al-Magharif Sweets! Please confirm the order and dispatch coordinates.`;
    }
    
    return `https://wa.me/${phoneNum}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Dark Overlay backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Cart Drawer Panel */}
      <motion.div
        initial={{ x: lang === 'ar' ? '-100%' : '100%' }}
        animate={{ x: 0 }}
        exit={{ x: lang === 'ar' ? '-100%' : '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={`relative w-full max-w-md h-full bg-cream-50 shadow-2xl flex flex-col z-10 border-l border-gold-200 ${
          lang === 'ar' ? 'mr-auto left-0' : 'ml-auto right-0'
        }`}
      >
        {/* Cart Drawer Header */}
        <div className="p-6 border-b border-gold-200/50 flex items-center justify-between bg-emerald-950 text-white rounded-t-none">
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-gold-300 hover:text-white transition-colors"
            title={t.close}
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2">
            <span className="font-arabic font-extrabold text-lg sm:text-xl text-gold-300">{t.cartTitle}</span>
            <ShoppingBag className="w-5 h-5 text-gold-300" />
          </div>
        </div>

        {/* Cart Items List Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 font-arabic text-gray-500">
              <div className="w-16 h-16 rounded-full bg-gold-100 text-gold-600 flex items-center justify-center mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="text-sm font-semibold leading-relaxed">
                {t.cartEmpty}
              </p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.product.id}
                className={`bg-white border border-gold-200/40 p-4 rounded-2xl flex gap-4 shadow-sm hover:shadow-md transition-shadow ${
                  lang === 'ar' ? 'flex-row-reverse text-right' : 'flex-row text-left'
                }`}
              >
                {/* Product Thumbnail */}
                <div className="w-20 h-20 rounded-xl overflow-hidden border border-gold-200 flex-shrink-0">
                  <img
                    src={item.product.image}
                    alt={lang === 'ar' ? item.product.nameAr : item.product.nameEn}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info and controls */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-arabic font-extrabold text-sm sm:text-base text-emerald-950">
                      {lang === 'ar' ? item.product.nameAr : item.product.nameEn}
                    </h4>
                    <p className="text-gold-600 font-mono text-xs font-bold mt-1">
                      {item.product.price} {t.currency}
                    </p>
                  </div>

                  {/* Qty actions & Trash */}
                  <div className={`flex items-center justify-between mt-2 ${
                    lang === 'ar' ? 'flex-row-reverse' : 'flex-row'
                  }`}>
                    <div className="flex items-center border border-gold-300 rounded-lg overflow-hidden bg-cream-50">
                      <button
                        onClick={() => onUpdateQty(item.product.id, 'remove')}
                        className="px-2 py-1 text-emerald-950 hover:bg-gold-200 hover:text-emerald-950 transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 py-1 font-mono text-xs font-bold text-emerald-950 bg-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQty(item.product.id, 'add')}
                        className="px-2 py-1 text-emerald-950 hover:bg-gold-200 hover:text-emerald-950 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="p-1.5 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                      title="Remove Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Drawer Footer with order actions */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-gold-200/50 bg-white font-arabic">
            {/* Gift Message Card */}
            <div className="mb-6 flex flex-col gap-2 text-right">
              <label className="text-xs font-extrabold text-emerald-950 flex items-center justify-end gap-1.5">
                <span>{t.cartGiftLabel}</span>
                <span>🎁</span>
              </label>
              <textarea
                rows={2}
                value={giftMsg}
                onChange={(e) => setGiftMsg(e.target.value)}
                placeholder={t.cartGiftPlaceholder}
                className="w-full px-3 py-2 text-xs border border-gold-200 rounded-xl focus:outline-none focus:border-gold-500 bg-cream-50/50 resize-none font-arabic"
              />
            </div>

            {/* Price Total */}
            <div className={`flex items-center justify-between mb-6 font-arabic ${
              lang === 'ar' ? 'flex-row-reverse' : 'flex-row'
            }`}>
              <span className="text-gray-600 font-medium text-sm sm:text-base">{t.cartTotal}</span>
              <span className="text-xl sm:text-2xl font-extrabold text-emerald-950 font-mono gold-gradient-text">
                {totalPrice} {t.currency}
              </span>
            </div>

            {/* Checkout CTA */}
            <a
              href={generateWhatsAppLink()}
              target="_blank"
              rel="noreferrer"
              className="w-full py-4 bg-emerald-950 text-white hover:bg-gold-500 border border-gold-400/80 font-bold text-sm rounded-full shadow-lg hover:shadow-xl hover:text-emerald-950 flex items-center justify-center gap-2.5 transition-all duration-300 font-arabic"
            >
              <span>{t.cartSendBtn}</span>
            </a>
          </div>
        )}
      </motion.div>
    </div>
  );
}
