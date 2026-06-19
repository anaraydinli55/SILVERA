import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, XCircle } from 'lucide-react';

import SectionHeading from '../components/common/SectionHeading';
import Button from '../components/common/Button';
import AnimatedSection from '../components/common/AnimatedSection';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';

const WishlistPage = () => {
  const { t } = useTranslation();
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="bg-primary-bg min-h-screen flex flex-col items-center justify-center pt-24 pb-12">
        <SectionHeading title={t('wishlist.your_wishlist')} subtitle={t('common.total')} />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="text-2xl text-text-muted mb-8">{t('wishlist.empty_wishlist')}</p>
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
        <SectionHeading title={t('wishlist.your_wishlist')} subtitle={t('common.total')} />

        <AnimatedSection className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-12">
          {wishlistItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="group relative bg-secondary-bg border border-secondary-bg overflow-hidden
                         hover:shadow-2xl hover:border-accent-gold transition-all duration-500 ease-in-out"
            >
              <Link to={`/product/${item.id}`} className="block">
                <div className="relative overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-72 object-cover object-center transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-primary-bg bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleMoveToCart(item); }} variant="primary" className="mx-2">
                      <ShoppingCart size={18} className="mr-2" /> {t('wishlist.add_to_cart')}
                    </Button>
                    <Button onClick={(e) => { e.preventDefault(); e.stopPropagation(); removeFromWishlist(item.id); }} variant="secondary" className="mx-2 p-3">
                      <XCircle size={18} />
                    </Button>
                  </div>
                </div>
                <div className="p-5 text-center">
                  <h3 className="text-xl font-heading text-text-light mb-2 line-clamp-1">{item.name}</h3>
                  <p className="text-base font-body text-accent-gold">
                    {t('common.price')}: {item.price} {item.currency}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatedSection>
      </div>
    </div>
  );
};

export default WishlistPage;
