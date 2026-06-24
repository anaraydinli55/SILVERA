import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, MessageSquare } from 'lucide-react'; // Whatsapp yerine MessageSquare kullanıldı

import { getProductById, getRelatedProducts } from '../data/products';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';

import Button from '../components/common/Button';
import SectionHeading from '../components/common/SectionHeading';
import ProductCard from '../components/common/ProductCard'; // ProductCard doğru import edildi
import Carousel from '../components/ui/Carousel';
import AnimatedSection from '../components/common/AnimatedSection';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description'); // 'description', 'details'

  useEffect(() => {
    setLoading(true);
    // In a real app, this would be an API call
    const fetchedProduct = getProductById(id);
    if (fetchedProduct) {
      setProduct(fetchedProduct);
      setLoading(false);
      window.scrollTo(0, 0); // Scroll to top on product change
    } else {
      // Handle product not found, e.g., redirect to 404
      setProduct(null);
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-text-light">Loading product...</div>;
  }

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">Product not found.</div>;
  }

  const relatedProducts = getRelatedProducts(product.id, product.category, 4);
  const prefilledWhatsAppMessage = encodeURIComponent(`${t('contact_page.whatsapp_message_prefill')} - ${product.name} (${product.id})`);
  const whatsappLink = `https://wa.me/YOUR_WHATSAPP_NUMBER?text=${prefilledWhatsAppMessage}`; // Replace YOUR_WHATSAPP_NUMBER

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleAddToWishlist = () => {
    addToWishlist(product);
  };

  const isProductInWishlist = isInWishlist(product.id);

  return (
    <div className="bg-primary-bg min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Product Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Product Image Carousel */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:sticky top-28"
          >
            <Carousel images={product.images} className="h-[500px] md:h-[600px] lg:h-[700px] w-full" />
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-8 lg:mt-0"
          >
            <h1 className="text-5xl font-heading text-text-light mb-4 leading-tight">{product.name}</h1>
            <p className="text-3xl font-body text-accent-gold mb-6">
              {t('common.price')}: {product.price} {product.currency}
            </p>

            <div className="mb-8">
              <label htmlFor="quantity" className="block text-text-muted text-sm uppercase tracking-wide-sm mb-2">
                {t('common.quantity')}:
              </label>
              <input
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-20 p-2 bg-secondary-bg border border-gray-700 text-text-light focus:outline-none focus:border-accent-gold"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button onClick={handleAddToCart} variant="primary" className="flex-grow py-4 text-lg">
                <ShoppingCart size={20} className="mr-3" /> {t('product_detail.add_to_cart')}
              </Button>
              <Button
                onClick={handleAddToWishlist}
                variant={isProductInWishlist ? 'primary' : 'secondary'}
                className={`py-4 px-6 text-lg ${isProductInWishlist ? 'bg-accent-gold !text-primary-bg' : ''}`}
              >
                <Heart size={20} className="mr-3" /> {isProductInWishlist ? t('wishlist.added_to_wishlist') : t('product_detail.add_to_wishlist')}
              </Button>
            </div>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 transition-colors duration-300 mb-8"
            >
              <MessageSquare size={20} className="mr-3" /> {/* Whatsapp yerine MessageSquare kullanıldı */}
              {t('contact_page.whatsapp_message_prefill')}
            </a>

            {/* Tabs for Description/Details */}
            <div className="border-b border-gray-700 mb-6">
              <button
                onClick={() => setActiveTab('description')}
                className={`py-3 px-6 text-lg font-body uppercase tracking-wide-sm transition-colors duration-300
                            ${activeTab === 'description' ? 'text-accent-gold border-b-2 border-accent-gold' : 'text-text-muted hover:text-text-light'}`}
              >
                {t('product_detail.description')}
              </button>
              <button
                onClick={() => setActiveTab('details')}
                className={`py-3 px-6 text-lg font-body uppercase tracking-wide-sm transition-colors duration-300
                            ${activeTab === 'details' ? 'text-accent-gold border-b-2 border-accent-gold' : 'text-text-muted hover:text-text-light'}`}
              >
                {t('product_detail.details')}
              </button>
            </div>

            <div>
              {activeTab === 'description' && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-text-muted leading-relaxed text-lg"
                >
                  {product.description}
                </motion.p>
              )}
              {activeTab === 'details' && (
                <motion.ul
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-text-muted space-y-2 text-lg"
                >
                  <li><span className="font-bold text-text-light">{t('product_detail.material')}</span> {product.material}</li>
                  <li><span className="font-bold text-text-light">{t('product_detail.dimensions')}</span> {product.dimensions}</li>
                  <li><span className="font-bold text-text-light">{t('product_detail.weight')}</span> {product.weight}</li>
                  <li><span className="font-bold text-text-light">{t('Məhsulun Kateqoriyası')}</span> {t(`featured_collections.${product.category.toLowerCase()}`)}</li>
                </motion.ul>
              )}
            </div>
          </motion.div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <AnimatedSection className="mt-20 py-12 bg-secondary-bg rounded-lg">
            <SectionHeading title={t('product_detail.related_products')} subtitle={t('common.total')} className="!mb-10" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </AnimatedSection>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
