import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { XCircle } from 'lucide-react';

import SectionHeading from '../components/common/SectionHeading';
import Button from '../components/common/Button';
import AnimatedSection from '../components/common/AnimatedSection';
import { useCart } from '../contexts/CartContext';

const CartPage = () => {
  const { t } = useTranslation();
  const { cartItems, updateQuantity, removeFromCart, getSubtotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="bg-primary-bg min-h-screen flex flex-col items-center justify-center pt-24 pb-12">
        <SectionHeading title={t('cart.shopping_cart')} subtitle={t('common.total')} />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="text-2xl text-text-muted mb-8">{t('cart.empty_cart')}</p>
          <Button as={Link} to="/collections" variant="primary" className="px-8 py-3 text-lg">
            {t('cart.continue_shopping')}
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-primary-bg min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <SectionHeading title={t('cart.shopping_cart')} subtitle={t('common.total')} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
          {/* Cart Items */}
          <AnimatedSection
            className="lg:col-span-2 bg-secondary-bg p-8 rounded-lg shadow-xl border border-gray-800"
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
          >
            {cartItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center border-b border-gray-700 py-6 last:border-b-0"
              >
                <Link to={`/product/${item.id}`} className="flex-shrink-0 w-24 h-24 overflow-hidden rounded-md border border-gray-600">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover object-center" />
                </Link>
                <div className="ml-6 flex-grow">
                  <Link to={`/product/${item.id}`} className="text-xl font-heading text-text-light hover:text-accent-gold transition-colors duration-300 block mb-2">
                    {item.name}
                  </Link>
                  <p className="text-accent-gold text-lg mb-2">
                    {t('common.price')}: {item.price} {item.currency}
                  </p>
                  <div className="flex items-center space-x-4">
                    <label htmlFor={`quantity-${item.id}`} className="sr-only">{t('common.quantity')}</label>
                    <input
                      type="number"
                      id={`quantity-${item.id}`}
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                      className="w-20 p-2 bg-primary-bg border border-gray-600 text-text-light focus:outline-none focus:border-accent-gold"
                    />
                    <Button
                      onClick={() => removeFromCart(item.id)}
                      variant="link"
                      className="text-red-500 hover:text-red-400"
                    >
                      <XCircle size={18} className="mr-1" /> {t('cart.remove')}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatedSection>

          {/* Order Summary */}
          <AnimatedSection
            className="bg-secondary-bg p-8 rounded-lg shadow-xl border border-gray-800 lg:sticky top-28 h-fit"
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } }
            }}
          >
            <h3 className="text-3xl font-heading text-text-light mb-6 border-b border-gray-700 pb-4">
              {t('checkout.order_summary')} {/* Add this translation key */}
            </h3>
            <div className="flex justify-between items-center text-xl text-text-light mb-4">
              <span>{t('cart.subtotal')}:</span>
              <span>{getSubtotal()} {cartItems[0]?.currency || 'AZN'}</span>
            </div>
            <p className="text-text-muted text-sm mb-6">
              {t('checkout.shipping_tax_note')} {/* Add this translation key */}
            </p>
            <Button as={Link} to="/checkout" variant="primary" className="w-full py-4 text-xl">
              {t('cart.checkout')}
            </Button>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
