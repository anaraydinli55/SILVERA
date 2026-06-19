import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

import SectionHeading from '../components/common/SectionHeading';
import AnimatedSection from '../components/common/AnimatedSection';
import ProductCard from '../components/common/ProductCard';
import { products, collections } from '../data/products'; // Assuming collections data is now directly in products.js or imported from a common source

const CollectionsPage = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all'); // 'all' or specific category id like 'rings'

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(product => product.category.toLowerCase() === activeCategory);

  return (
    <div className="bg-primary-bg min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <SectionHeading title={t('header.collections')} subtitle={t('product_showcase.subtitle')} />

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center flex-wrap gap-4 mb-12"
        >
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-6 py-2 uppercase text-sm font-bold tracking-wide-sm border border-accent-gold transition-all duration-300
                        ${activeCategory === 'all' ? 'bg-accent-gold text-primary-bg' : 'text-accent-gold hover:bg-accent-gold hover:text-primary-bg'}`}
          >
            {t('featured_collections.view_all')}
          </button>
          {collections.map((collection) => (
            <button
              key={collection.id}
              onClick={() => setActiveCategory(collection.id)}
              className={`px-6 py-2 uppercase text-sm font-bold tracking-wide-sm border border-text-muted transition-all duration-300
                          ${activeCategory === collection.id ? 'bg-secondary-bg text-accent-gold border-accent-gold' : 'text-text-muted hover:text-text-light hover:border-text-light'}`}
            >
              {t(`featured_collections.${collection.id}`)}
            </button>
          ))}
        </motion.div>

        {/* Product Grid */}
        <AnimatedSection className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {filteredProducts.length === 0 && (
            <div className="col-span-full text-center text-text-muted text-xl py-10">
              {t('common.no_products_found')} {/* Add this translation key */}
            </div>
          )}
        </AnimatedSection>
      </div>
    </div>
  );
};

export default CollectionsPage;
