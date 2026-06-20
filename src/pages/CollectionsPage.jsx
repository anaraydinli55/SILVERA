import React, { useState, useEffect } from 'react'; // useEffect'i ekledik
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom'; // useParams'ı ekledik

import SectionHeading from '../components/common/SectionHeading';
import AnimatedSection from '../components/common/AnimatedSection';
import ProductCard from '../components/common/ProductCard';
import { products, collections } from '../data/products';

const CollectionsPage = () => {
  const { t } = useTranslation();
  const { collectionId } = useParams(); // URL'den collectionId parametresini alıyoruz

  // activeCategory state'ini başlatırken URL'den gelen collectionId'yi kullanıyoruz.
  // Eğer URL'de collectionId yoksa (yani sadece /collections ise), 'all' olarak başlar.
  const [activeCategory, setActiveCategory] = useState(collectionId ? collectionId.toLowerCase() : 'all');

  // collectionId URL parametresi değiştiğinde (örneğin kullanıcı farklı bir koleksiyon URL'sine gittiğinde)
  // activeCategory state'ini güncellemek için useEffect kullanıyoruz.
  useEffect(() => {
    if (collectionId) {
      setActiveCategory(collectionId.toLowerCase());
    } else {
      setActiveCategory('all');
    }
  }, [collectionId]); // collectionId her değiştiğinde bu efekt yeniden çalışır

  // Ürünleri activeCategory'ye göre filtreleniyoruz.
  // Ürün kategorilerini küçük harfe çevirerek karşılaştırıyoruz, bu sayede case-insensitivity sağlıyoruz.
  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(product => product.category.toLowerCase() === activeCategory);

  return (
    <div className="bg-primary-bg min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Başlık ve Alt Başlık */}
        <SectionHeading title={t('header.collections')} subtitle={t('product_showcase.subtitle')} />

        {/* Kategori Filtre Butonları */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center flex-wrap gap-4 mb-12"
        >
          {/* 'Tümü' butonu */}
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-6 py-2 uppercase text-sm font-bold tracking-wide-sm border border-accent-gold transition-all duration-300
                        ${activeCategory === 'all' ? 'bg-accent-gold text-primary-bg' : 'text-accent-gold hover:bg-accent-gold hover:text-primary-bg'}`}
          >
            {t('featured_collections.view_all')}
          </button>

          {/* Dinamik Koleksiyon Butonları */}
          {collections.map((collection) => (
            <button
              key={collection.id}
              onClick={() => setActiveCategory(collection.id)}
              className={`px-6 py-2 uppercase text-sm font-bold tracking-wide-sm border border-text-muted transition-all duration-300
                          ${activeCategory === collection.id ? 'bg-secondary-bg text-accent-gold border-accent-gold' : 'text-text-muted hover:text-text-light hover:border-text-light'}`}
            >
              {/* i18n dosyanızda featured_collections.rings, featured_collections.necklaces gibi anahtarlar olmalı */}
              {t(`featured_collections.${collection.id}`)}
            </button>
          ))}
        </motion.div>

        {/* Ürün Izgarası */}
        <AnimatedSection className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            // Eğer filtrelenmiş ürün yoksa gösterilecek mesaj
            <div className="col-span-full text-center text-text-muted text-xl py-10">
              {t('common.no_products_found')} {/* Bu çeviri anahtarı i18n dosyanızda olmalı */}
            </div>
          )}
        </AnimatedSection>
      </div>
    </div>
  );
};

export default CollectionsPage;
