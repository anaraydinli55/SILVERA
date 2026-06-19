import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

import AnimatedSection from '../components/common/AnimatedSection';
import SectionHeading from '../components/common/SectionHeading';
import Button from '../components/common/Button';
import ProductCard from '../components/common/ProductCard';
import RatingStars from '../components/ui/RatingStars';

import { products, collections, getBestSellers, getNewArrivals } from '../data/products'; // Assuming collections data moved to products.js for simplicity
import { testimonials } from '../data/testimonials';

// Mock images - ensure these exist in public/images/
const heroDesktop = '/images/hero-desktop.jpg';
const heroMobile = '/images/hero-mobile.jpg';
const brandStoryImage = '/images/brand-story.jpg';
const trustQualityImage = '/images/trust-quality.jpg';


const HomePage = () => {
  const { t } = useTranslation();

  const bestSellers = getBestSellers(4);
  const newArrivals = getNewArrivals(4);

  const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <>
      {/* 1. Full-screen cinematic hero section */}
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
        <picture>
          <source media="(max-width: 768px)" srcSet={heroMobile} />
          <img
            src={heroDesktop}
            alt="Silver jewelry hero image"
            className="absolute inset-0 w-full h-full object-cover object-center z-0"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-t from-primary-bg via-primary-bg/30 to-transparent z-10" />
        <motion.div
          className="relative z-20 text-text-light max-w-4xl px-4"
          initial="hidden"
          animate="visible"
          variants={heroVariants}
        >
          <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-heading mb-6 leading-tight drop-shadow-lg">
            {t('hero_section.title')}
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl md:text-2xl font-body mb-8 drop-shadow-md">
            {t('hero_section.subtitle')}
          </motion.p>
          <motion.div variants={itemVariants}>
            <Button variant="primary" as={Link} to="/collections" className="px-10 py-4 text-lg">
              {t('hero_section.shop_now')}
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. Featured Collections section */}
      <AnimatedSection className="py-20 bg-primary-bg">
        <div className="container mx-auto px-4">
          <SectionHeading title={t('featured_collections.title')} subtitle={t('collections.title')} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {collections.map((collection) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7 }}
                className="relative group overflow-hidden"
              >
                <img
                  src={collection.imageUrl}
                  alt={collection.name}
                  className="w-full h-80 object-cover object-center transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
                />
                <div className="absolute inset-0 bg-primary-bg bg-opacity-40 flex items-center justify-center p-4">
                  <Link to={collection.path} className="text-center">
                    <h3 className="text-3xl font-heading text-text-light group-hover:text-accent-gold transition-colors duration-300 mb-2">
                      {t(`featured_collections.${collection.id}`)}
                    </h3>
                    <Button variant="secondary" className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      {t('featured_collections.view_all')}
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* 3. Best Sellers section */}
      <AnimatedSection className="py-20 bg-secondary-bg">
        <div className="container mx-auto px-4">
          <SectionHeading title={t('best_sellers.title')} subtitle={t('common.total')} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="secondary" as={Link} to="/best-sellers" className="px-8 py-3">
              {t('best_sellers.discover_more')}
            </Button>
          </div>
        </div>
      </AnimatedSection>

      {/* 4. New Arrivals section */}
      <AnimatedSection className="py-20 bg-primary-bg">
        <div className="container mx-auto px-4">
          <SectionHeading title={t('new_arrivals.title')} subtitle={t('common.total')} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="secondary" as={Link} to="/new-arrivals" className="px-8 py-3">
              {t('new_arrivals.explore_latest')}
            </Button>
          </div>
        </div>
      </AnimatedSection>

      {/* 5. Brand Story section */}
      <AnimatedSection className="py-20 bg-secondary-bg">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="lg:order-2"
          >
            <img src={brandStoryImage} alt="SILVERA Craftsmanship" className="w-full h-auto object-cover shadow-xl" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:order-1 text-center lg:text-left"
          >
            <SectionHeading
              title={t('brand_story.title')}
              subtitle={t('brand_story.subtitle')}
              className="!text-left lg:!text-left !mb-8"
            />
            <p className="text-lg text-text-muted mb-6 leading-relaxed">
              {t('brand_story.paragraph1')}
            </p>
            <p className="text-lg text-text-muted leading-relaxed">
              {t('brand_story.paragraph2')}
            </p>
            <Button variant="primary" as={Link} to="/about" className="mt-8 px-8 py-3">
              {t('footer.about_us')}
            </Button>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* 6. Product Showcase section (using a more editorial layout) */}
      <AnimatedSection className="py-20 bg-primary-bg">
        <div className="container mx-auto px-4">
          <SectionHeading title={t('product_showcase.title')} subtitle={t('product_showcase.subtitle')} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8 }}
              className="relative group overflow-hidden"
            >
              <img src="/images/showcase-ring.jpg" alt="Showcase Ring" className="w-full h-96 object-cover object-center" />
              <div className="absolute inset-0 bg-primary-bg bg-opacity-40 flex flex-col items-center justify-center text-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-4xl font-heading text-text-light mb-4">Elegant Halo Ring</h3>
                <p className="text-text-muted mb-6">Timeless design with brilliant sparkle.</p>
                <Button variant="secondary" as={Link} to="/product/silver_ring_eternity">
                  {t('common.view_details')}
                </Button>
              </div>
            </motion.div>
            <div className="grid grid-cols-1 gap-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative group overflow-hidden"
              >
                <img src="/images/showcase-necklace.jpg" alt="Showcase Necklace" className="w-full h-80 object-cover object-center" />
                <div className="absolute inset-0 bg-primary-bg bg-opacity-40 flex flex-col items-center justify-center text-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-3xl font-heading text-text-light mb-3">Minimalist Pendant</h3>
                  <Button variant="secondary" as={Link} to="/product/silver_necklace_celestial">
                    {t('common.view_details')}
                  </Button>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative group overflow-hidden"
              >
                <img src="/images/showcase-earrings.jpg" alt="Showcase Earrings" className="w-full h-80 object-cover object-center" />
                <div className="absolute inset-0 bg-primary-bg bg-opacity-40 flex flex-col items-center justify-center text-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-3xl font-heading text-text-light mb-3">Dazzling Studs</h3>
                  <Button variant="secondary" as={Link} to="/product/silver_earrings_starlight">
                    {t('common.view_details')}
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
          <div className="text-center mt-12">
            <Button variant="secondary" as={Link} to="/collections" className="px-8 py-3">
              {t('product_showcase.view_all_products')}
            </Button>
          </div>
        </div>
      </AnimatedSection>

      {/* 7. Customer Testimonials section */}
      <AnimatedSection className="py-20 bg-secondary-bg">
        <div className="container mx-auto px-4">
          <SectionHeading title={t('testimonials.title')} subtitle={t('testimonials.subtitle')} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7 }}
                className="bg-primary-bg p-8 rounded-lg shadow-xl border border-secondary-bg hover:border-accent-gold transition-colors duration-300"
              >
                <RatingStars rating={testimonial.rating} className="mb-4" />
                <p className="text-text-light text-lg mb-6 italic leading-relaxed">
                  "{t(testimonial.reviewKey)}"
                </p>
                <p className="font-heading text-accent-gold text-xl">
                  - {t(testimonial.customerNameKey)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* 8. Trust & Quality section */}
      <AnimatedSection className="py-20 bg-primary-bg">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            <img src={trustQualityImage} alt="Quality Silver" className="w-full h-auto object-cover shadow-xl" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            <SectionHeading
              title={t('trust_quality.title')}
              subtitle={t('common.total')}
              className="!text-left lg:!text-left !mb-8"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              {[
                { title: t('trust_quality.silver_certification_title'), text: t('trust_quality.silver_certification_text') },
                { title: t('trust_quality.secure_payment_title'), text: t('trust_quality.secure_payment_text') },
                { title: t('trust_quality.fast_shipping_title'), text: t('trust_quality.fast_shipping_text') },
                { title: t('trust_quality.craftsmanship_title'), text: t('trust_quality.craftsmanship_text') },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-secondary-bg p-6 rounded-md border border-gray-700 hover:border-accent-gold transition-colors duration-300"
                >
                  <h4 className="text-xl font-heading text-accent-gold mb-2">{item.title}</h4>
                  <p className="text-text-muted text-sm">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </AnimatedSection>


      {/* 9. Newsletter subscription section */}
      <AnimatedSection className="py-20 bg-primary-bg text-center">
        <div className="container mx-auto px-4">
          <SectionHeading title={t('newsletter.title')} subtitle={t('newsletter.subtitle')} />
          <motion.form
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-xl mx-auto flex flex-col md:flex-row gap-4 mt-8"
          >
            <input
              type="email"
              placeholder={t('newsletter.placeholder')}
              className="flex-grow p-4 bg-secondary-bg border border-gray-700 text-text-light placeholder-text-muted
                         focus:outline-none focus:border-accent-gold transition-colors duration-300"
              aria-label={t('newsletter.placeholder')}
            />
            <Button variant="primary" type="submit" className="md:w-auto px-8 py-4">
              {t('newsletter.subscribe')}
            </Button>
          </motion.form>
        </div>
      </AnimatedSection>

      {/* 10. Strong Call-To-Action section */}
      <AnimatedSection className="py-20 bg-cover bg-center text-center relative overflow-hidden" style={{ backgroundImage: 'url(/images/cta-background.jpg)' }}>
        <div className="absolute inset-0 bg-primary-bg bg-opacity-70 z-0"></div>
        <div className="relative z-10 container mx-auto px-4 py-16">
          <SectionHeading
            title={t('call_to_action.title')}
            subtitle={t('call_to_action.subtitle')}
            className="text-text-light"
          />
          <Button variant="primary" as={Link} to="/collections" className="mt-8 px-10 py-4 text-lg">
            {t('call_to_action.shop_all')}
          </Button>
        </div>
      </AnimatedSection>
    </>
  );
};

export default HomePage;
