import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

import SectionHeading from '../components/common/SectionHeading';
import AnimatedSection from '../components/common/AnimatedSection';

const ShippingReturnsPage = () => {
  const { t } = useTranslation();

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    <div className="bg-primary-bg min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <SectionHeading title={t('footer.shipping_returns')} subtitle={t('common.delivery_info')} /> {/* Add common.delivery_info */}

        <AnimatedSection
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 } }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-text-muted leading-relaxed space-y-8 mt-12"
        >
          {/* Shipping Policy */}
          <motion.h3 variants={textVariants} className="text-3xl font-heading text-text-light mt-10 mb-4 border-b border-accent-gold pb-2">
            {t('shipping_returns.shipping_title', 'Shipping Policy')}
          </motion.h3>
          <motion.p variants={textVariants}>
            {t('shipping_returns.shipping_intro')} {/* Add to translation files */}
          </motion.p>

          <motion.h4 variants={textVariants} className="text-2xl font-heading text-accent-gold mt-6 mb-3">
            {t('shipping_returns.processing_time_title', 'Order Processing Time')}
          </motion.h4>
          <motion.p variants={textVariants}>
            {t('shipping_returns.processing_time_content')}
          </motion.p>

          <motion.h4 variants={textVariants} className="text-2xl font-heading text-accent-gold mt-6 mb-3">
            {t('shipping_returns.shipping_methods_title', 'Shipping Methods & Delivery Times')}
          </motion.h4>
          <motion.ul variants={textVariants} className="list-disc list-inside space-y-2 ml-4">
            <motion.li variants={textVariants}>
              <span className="font-bold text-text-light">{t('shipping_returns.standard_shipping', 'Standard Shipping:')}</span> {t('shipping_returns.standard_shipping_details', 'Estimated 5-10 business days.')}
            </motion.li>
            <motion.li variants={textVariants}>
              <span className="font-bold text-text-light">{t('shipping_returns.express_shipping', 'Express Shipping:')}</span> {t('shipping_returns.express_shipping_details', 'Estimated 2-4 business days.')}
            </motion.li>
            <motion.li variants={textVariants}>
              <span className="font-bold text-text-light">{t('shipping_returns.international_shipping', 'International Shipping:')}</span> {t('shipping_returns.international_shipping_details', 'Times vary by destination, typically 7-21 business days.')}
            </motion.li>
          </motion.ul>
          <motion.p variants={textVariants}>
            {t('shipping_returns.shipping_note_1')}
          </motion.p>
          <motion.p variants={textVariants}>
            {t('shipping_returns.shipping_note_2')}
          </motion.p>

          {/* Returns Policy */}
          <motion.h3 variants={textVariants} className="text-3xl font-heading text-text-light mt-10 mb-4 border-b border-accent-gold pb-2">
            {t('shipping_returns.returns_title', 'Returns Policy')}
          </motion.h3>
          <motion.p variants={textVariants}>
            {t('shipping_returns.returns_intro')}
          </motion.p>

          <motion.h4 variants={textVariants} className="text-2xl font-heading text-accent-gold mt-6 mb-3">
            {t('shipping_returns.eligibility_title', 'Eligibility for Returns')}
          </motion.h4>
          <motion.ul variants={textVariants} className="list-disc list-inside space-y-2 ml-4">
            <motion.li variants={textVariants}>{t('shipping_returns.eligibility_item_1', 'Items must be returned within 14 days of receipt.')}</motion.li>
            <motion.li variants={textVariants}>{t('shipping_returns.eligibility_item_2', 'Items must be unused, unworn, and in their original packaging.')}</motion.li>
            <motion.li variants={textVariants}>{t('shipping_returns.eligibility_item_3', 'Custom or engraved items are non-returnable.')}</motion.li>
          </motion.ul>

          <motion.h4 variants={textVariants} className="text-2xl font-heading text-accent-gold mt-6 mb-3">
            {t('shipping_returns.how_to_return_title', 'How to Initiate a Return')}
          </motion.h4>
          <motion.ol variants={textVariants} className="list-decimal list-inside space-y-2 ml-4">
            <motion.li variants={textVariants}>{t('shipping_returns.return_step_1', 'Contact our customer service team at info@silvera.com to request a return authorization.')}</motion.li>
            <motion.li variants={textVariants}>{t('shipping_returns.return_step_2', 'Package your item securely in its original packaging.')}</motion.li>
            <motion.li variants={textVariants}>{t('shipping_returns.return_step_3', 'Ship the item to the address provided by our customer service.')}</motion.li>
          </motion.ol>

          <motion.h4 variants={textVariants} className="text-2xl font-heading text-accent-gold mt-6 mb-3">
            {t('shipping_returns.refunds_title', 'Refunds')}
          </motion.h4>
          <motion.p variants={textVariants}>
            {t('shipping_returns.refunds_content')}
          </motion.p>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default ShippingReturnsPage;
