import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import SectionHeading from '../components/common/SectionHeading';
import Button from '../components/common/Button';
import Input from '../components/ui/Input';
import AnimatedSection from '../components/common/AnimatedSection';
import { useCart } from '../contexts/CartContext';
import { CreditCard, Truck } from 'lucide-react';

const CheckoutPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { cartItems, getSubtotal, clearCart } = useCart();

  const [shippingAddress, setShippingAddress] = useState({
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  });

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert(t('cart.empty_cart'));
      navigate('/cart');
      return;
    }

    console.log('Placing order with:', {
      cartItems,
      shippingAddress,
      paymentInfo,
      total: getSubtotal(),
    });

    // Simulate API call for order placement
    setTimeout(() => {
      alert(t('checkout.order_placed_success')); // Add this translation key
      clearCart();
      navigate('/'); // Redirect to home or an order confirmation page
    }, 1500);
  };

  if (cartItems.length === 0) {
    return (
      <div className="bg-primary-bg min-h-screen flex flex-col items-center justify-center pt-24 pb-12">
        <SectionHeading title={t('checkout.title')} subtitle={t('common.total')} />
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
        <SectionHeading title={t('checkout.title')} subtitle={t('common.total')} />

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          {/* Shipping Address */}
          <AnimatedSection
            className="bg-secondary-bg p-8 rounded-lg shadow-xl border border-gray-800"
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
          >
            <h3 className="text-3xl font-heading text-text-light mb-6 flex items-center">
              <Truck size={28} className="mr-3 text-accent-gold" /> {t('checkout.shipping_address')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
              <Input id="firstName" name="firstName" label={t('checkout.first_name')} value={shippingAddress.firstName} onChange={handleShippingChange} />
              <Input id="lastName" name="lastName" label={t('checkout.last_name')} value={shippingAddress.lastName} onChange={handleShippingChange} />
            </div>
            <Input id="address1" name="address1" label={t('checkout.address_line1')} value={shippingAddress.address1} onChange={handleShippingChange} />
            <Input id="address2" name="address2" label={t('checkout.address_line2')} value={shippingAddress.address2} onChange={handleShippingChange} optional />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
              <Input id="city" name="city" label={t('checkout.city')} value={shippingAddress.city} onChange={handleShippingChange} />
              <Input id="state" name="state" label={t('checkout.state_province')} value={shippingAddress.state} onChange={handleShippingChange} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
              <Input id="zip" name="zip" label={t('checkout.zip_code')} value={shippingAddress.zip} onChange={handleShippingChange} />
              <Input id="country" name="country" label={t('checkout.country')} value={shippingAddress.country} onChange={handleShippingChange} />
            </div>
          </AnimatedSection>

          {/* Payment Method & Order Summary */}
          <div className="flex flex-col gap-12">
            <AnimatedSection
              className="bg-secondary-bg p-8 rounded-lg shadow-xl border border-gray-800"
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } }
              }}
            >
              <h3 className="text-3xl font-heading text-text-light mb-6 flex items-center">
                <CreditCard size={28} className="mr-3 text-accent-gold" /> {t('checkout.payment_method')}
              </h3>
              <Input id="cardNumber" name="cardNumber" label={t('checkout.card_number')} value={paymentInfo.cardNumber} onChange={handlePaymentChange} />
              <div className="grid grid-cols-2 gap-x-6">
                <Input id="expirationDate" name="expirationDate" label={t('checkout.expiration_date')} value={paymentInfo.expirationDate} onChange={handlePaymentChange} placeholder="MM/YY" />
                <Input id="cvv" name="cvv" label={t('checkout.cvv')} value={paymentInfo.cvv} onChange={handlePaymentChange} />
              </div>
            </AnimatedSection>

            <AnimatedSection
              className="bg-secondary-bg p-8 rounded-lg shadow-xl border border-gray-800"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.4 } }
              }}
            >
              <h3 className="text-3xl font-heading text-text-light mb-6 border-b border-gray-700 pb-4">
                {t('checkout.order_summary')}
              </h3>
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between text-text-muted text-lg mb-2">
                  <span>{item.name} ({item.quantity})</span>
                  <span>{(item.price * item.quantity).toFixed(2)} {item.currency}</span>
                </div>
              ))}
              <div className="flex justify-between items-center text-2xl font-bold text-accent-gold mt-6 pt-4 border-t border-gray-700">
                <span>{t('common.total')}:</span>
                <span>{getSubtotal()} {cartItems[0]?.currency || 'AZN'}</span>
              </div>
              <Button type="submit" variant="primary" className="w-full py-4 text-xl mt-8">
                {t('checkout.place_order')}
              </Button>
            </AnimatedSection>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
