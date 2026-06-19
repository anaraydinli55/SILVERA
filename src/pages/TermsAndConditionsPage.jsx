import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

import SectionHeading from '../components/common/SectionHeading';
import AnimatedSection from '../components/common/AnimatedSection';

const TermsAndConditionsPage = () => {
  const { t } = useTranslation();

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    <div className="bg-primary-bg min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <SectionHeading title={t('footer.terms_conditions')} subtitle={t('common.legal_info')} /> {/* Add common.legal_info */}

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
          <motion.p variants={textVariants}>
            {t('terms_conditions.intro_paragraph_1')} {/* Add to translation files */}
          </motion.p>
          <motion.p variants={textVariants}>
            {t('terms_conditions.intro_paragraph_2')}
          </motion.p>

          <motion.h3 variants={textVariants} className="text-3xl font-heading text-text-light mt-10 mb-4 border-b border-accent-gold pb-2">
            {t('terms_conditions.section_1_title', 'Acceptance of Terms')}
          </motion.h3>
          <motion.p variants={textVariants}>
            {t('terms_conditions.section_1_content_1')}
          </motion.p>

          <motion.h3 variants={textVariants} className="text-3xl font-heading text-text-light mt-10 mb-4 border-b border-accent-gold pb-2">
            {t('terms_conditions.section_2_title', 'User Accounts')}
          </motion.h3>
          <motion.p variants={textVariants}>
            {t('terms_conditions.section_2_content_1')}
          </motion.p>

          <motion.h3 variants={textVariants} className="text-3xl font-heading text-text-light mt-10 mb-4 border-b border-accent-gold pb-2">
            {t('terms_conditions.section_3_title', 'Product Information and Pricing')}
          </motion.h3>
          <motion.p variants={textVariants}>
            {t('terms_conditions.section_3_content_1')}
          </motion.p>

          <motion.h3 variants={textVariants} className="text-3xl font-heading text-text-light mt-10 mb-4 border-b border-accent-gold pb-2">
            {t('terms_conditions.section_4_title', 'Orders and Payment')}
          </motion.h3>
          <motion.p variants={textVariants}>
            {t('terms_conditions.section_4_content_1')}
          </motion.p>

          <motion.h3 variants={textVariants} className="text-3xl font-heading text-text-light mt-10 mb-4 border-b border-accent-gold pb-2">
            {t('terms_conditions.section_5_title', 'Intellectual Property')}
          </motion.h3>
          <motion.p variants={textVariants}>
            {t('terms_conditions.section_5_content_1')}
          </motion.p>

          <motion.h3 variants={textVariants} className="text-3xl font-heading text-text-light mt-10 mb-4 border-b border-accent-gold pb-2">
            {t('terms_conditions.section_6_title', 'Limitation of Liability')}
          </motion.h3>
          <motion.p variants={textVariants}>
            {t('terms_conditions.section_6_content_1')}
          </motion.p>

          <motion.h3 variants={textVariants} className="text-3xl font-heading text-text-light mt-10 mb-4 border-b border-accent-gold pb-2">
            {t('terms_conditions.section_7_title', 'Governing Law')}
          </motion.h3>
          <motion.p variants={textVariants}>
            {t('terms_conditions.section_7_content_1')}
          </motion.p>

          <motion.h3 variants={textVariants} className="text-3xl font-heading text-text-light mt-10 mb-4 border-b border-accent-gold pb-2">
            {t('terms_conditions.section_8_title', 'Changes to Terms')}
          </motion.h3>
          <motion.p variants={textVariants}>
            {t('terms_conditions.section_8_content_1')}
          </motion.p>

          <motion.p variants={textVariants} className="text-right text-sm italic">
            {t('terms_conditions.last_updated', 'Last updated: 15 April 2024')}
          </motion.p>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;
