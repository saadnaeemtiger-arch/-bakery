import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { Language, CartItem, Product } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import WhyChooseUs from './components/WhyChooseUs';
import Menu from './components/Menu';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sync HTML dir and lang attributes dynamically
  useEffect(() => {
    const htmlElement = document.documentElement;
    htmlElement.setAttribute('lang', lang);
    htmlElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    
    // Smooth dynamic page title update
    document.title = lang === 'ar' 
      ? 'حلويات المغرف - حلويات عربية أصيلة ومخبوزات فاخرة' 
      : 'Al-Magharif Sweets - Authentic Arabic Sweets & Premium Bakery';
  }, [lang]);

  // Cart Management Operations
  const handleAddToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { product, quantity: 1 }];
    });
    // Micro-interaction: open cart on adding first item
    setIsCartOpen(true);
  };

  const handleUpdateQty = (productId: string, action: 'add' | 'remove') => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = action === 'add' ? item.quantity + 1 : item.quantity - 1;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className={`min-h-screen bg-cream-50 overflow-x-hidden ${
      lang === 'ar' ? 'font-arabic' : 'font-sans'
    }`}>
      
      {/* Premium Sticky Navigation Header */}
      <Header
        lang={lang}
        setLang={setLang}
        cartCount={cartCount}
        onCartToggle={() => setIsCartOpen(!isCartOpen)}
      />

      {/* Hero Section */}
      <Hero lang={lang} />

      {/* About Us Narrative story */}
      <About lang={lang} />

      {/* Selling highlights Bento grid */}
      <WhyChooseUs lang={lang} />

      {/* Sweets Interactive Menu & Selection */}
      <Menu
        lang={lang}
        cartItems={cartItems}
        onAddToCart={handleAddToCart}
      />

      {/* Filterable Showcase Media Gallery with Lightbox */}
      <Gallery lang={lang} />

      {/* Testimonials and customer review submit module */}
      <Reviews lang={lang} />

      {/* Interactive Accordion FAQs */}
      <FAQ lang={lang} />

      {/* Contact Form with Riyadh Suleimania Custom Vector Map */}
      <Contact lang={lang} />

      {/* Footer and dynamic detailed Legal Modals */}
      <Footer lang={lang} />

      {/* Sliding interactive Shopping Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <CartSidebar
            lang={lang}
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cartItems={cartItems}
            onUpdateQty={handleUpdateQty}
            onRemoveItem={handleRemoveItem}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
