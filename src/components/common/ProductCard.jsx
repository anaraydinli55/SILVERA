import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart } from 'lucide-react';
import Button from './Button';

const ProductCard = ({ product, className = '' }) => {
  const { t } = useTranslation();

  // Placeholder functions for cart/wishlist
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(`Added ${product.name} to cart`);
    // Integrate with CartContext
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(`Added ${product.name} to wishlist`);
    // Integrate with WishlistContext
  };

  return (
    <motion.div
      className={`group relative bg-secondary-bg border border-secondary-bg overflow-hidden
                  hover:shadow-2xl hover:border-accent-gold transition-all duration-500 ease-in-out ${className}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-72 object-cover object-center transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
          />
          <div className="absolute inset-0 bg-primary-bg bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button onClick={handleAddToCart} variant="primary" className="mx-2">
              <ShoppingCart size={18} className="mr-2" /> {t('product_detail.add_to_cart')}
            </Button>
            <Button onClick={handleAddToWishlist} variant="secondary" className="mx-2 p-3">
              <Heart size={18} />
            </Button>
          </div>
        </div>
        <div className="p-5 text-center">
          <h3 className="text-xl font-heading text-text-light mb-2 line-clamp-1">{product.name}</h3>
          <p className="text-base font-body text-accent-gold">
            {t('common.price')}: {product.price} {product.currency}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
