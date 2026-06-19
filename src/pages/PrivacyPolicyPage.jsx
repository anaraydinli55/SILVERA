import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

import SectionHeading from '../components/common/SectionHeading';
import AnimatedSection from '../components/common/AnimatedSection';

const PrivacyPolicyPage = () => {
  const { t } = useTranslation();

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    <div className="bg-primary-bg min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <SectionHeading title={t('footer.privacy_policy')} subtitle={t('common.information')} /> {/* Add common.information */}

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
            {t('privacy_policy.intro_paragraph_1')} {/* Add to translation files */}
          </motion.p>
          <motion.p variants={textVariants}>
            {t('privacy_policy.intro_paragraph_2')}
          </motion.p>

          <motion.h3 variants={textVariants} className="text-3xl font-heading text-text-light mt-10 mb-4 border-b border-accent-gold pb-2">
            {t('privacy_policy.section_1_title', 'Information We Collect')}
          </motion.h3>
          <motion.p variants={textVariants}>
            {t('privacy_policy.section_1_content_1')}
          </motion.p>
          <motion.ul variants={textVariants} className="list-disc list-inside space-y-2 ml-4">
            <motion.li variants={textVariants}>{t('privacy_policy.list_1_item_1', 'Personal Identification Information (Name, Email Address, Phone Number, Shipping Address)')}</motion.li>
            <motion.li variants={textVariants}>{t('privacy_policy.list_1_item_2', 'Payment Information (Encrypted and securely processed by third-party payment gateways)')}</motion.li>
            <motion.li variants={textVariants}>{t('privacy_policy.list_1_item_3', 'Browsing Data (IP address, browser type, pages visited, time spent on site)')}</motion.li>
            <motion.li variants={textVariants}>{t('privacy_policy.list_1_item_4', 'Communication Data (Emails, chat records with customer service)')}</motion.li>
          </motion.ul>

          <motion.h3 variants={textVariants} className="text-3xl font-heading text-text-light mt-10 mb-4 border-b border-accent-gold pb-2">
            {t('privacy_policy.section_2_title', 'How We Use Your Information')}
          </motion.h3>
          <motion.p variants={textVariants}>
            {t('privacy_policy.section_2_content_1')}
          </motion.p>
          <motion.ul variants={textVariants} className="list-disc list-inside space-y-2 ml-4">
            <motion.li variants={textVariants}>{t('privacy_policy.list_2_item_1', 'To Process Transactions and Deliver Products')}</motion.li>
            <motion.li variants={textVariants}>{t('privacy_policy.list_2_item_2', 'To Improve Our Website and Services')}</motion.li>
            <motion.li variants={textVariants}>{t('privacy_policy.list_2_item_3', 'To Send Periodic Emails (Newsletters, Order Updates)')}</motion.li>
            <motion.li variants={textVariants}>{t('privacy_policy.list_2_item_4', 'For Customer Service and Support')}</motion.li>
          </motion.ul>

          <motion.h3 variants={textVariants} className="text-3xl font-heading text-text-light mt-10 mb-4 border-b border-accent-gold pb-2">
            {t('privacy_policy.section_3_title', 'Sharing Your Personal Information')}
          </motion.h3>
          <motion.p variants={textVariants}>
            {t('privacy_policy.section_3_content_1')}
          </motion.p>

          <motion.h3 variants={textVariants} className="text-3xl font-heading text-text-light mt-10 mb-4 border-b border-accent-gold pb-2">
            {t('privacy_policy.section_4_title', 'Data Security')}
          </motion.h3>
          <motion.p variants={textVariants}>
            {t('privacy_policy.section_4_content_1')}
          </motion.p>

          <motion.h3 variants={textVariants} className="text-3xl font-heading text-text-light mt-10 mb-4 border-b border-accent-gold pb-2">
            {t('privacy_policy.section_5_title', 'Your Rights')}
          </motion.h3>
          <motion.p variants={textVariants}>
            {t('privacy_policy.section_5_content_1')}
          </motion.p>

          <motion.h3 variants={textVariants} className="text-3xl font-heading text-text-light mt-10 mb-4 border-b border-accent-gold pb-2">
            {t('privacy_policy.section_6_title', 'Changes to This Privacy Policy')}
          </motion.h3>
          <motion.p variants={textVariants}>
            {t('privacy_policy.section_6_content_1')}
          </motion.p>
          <motion.p variants={textVariants} className="text-right text-sm italic">
            {t('privacy_policy.last_updated', 'Last updated: 15 April 2024')}
          </motion.p>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
