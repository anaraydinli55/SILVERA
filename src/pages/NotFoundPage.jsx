import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  const { t } = useTranslation(); // You'd need to add 'not_found.title', 'not_found.message', 'not_found.go_home' to translations

  return (
    <div className="bg-primary-bg min-h-screen flex flex-col items-center justify-center text-center text-text-light py-20">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-9xl font-heading text-accent-gold mb-8">404</h1>
        <h2 className="text-5xl font-heading text-text-light mb-6">
          {t('not_found.title', 'Page Not Found')}
        </h2>
        <p className="text-xl text-text-muted mb-10">
          {t('not_found.message', 'The page you are looking for does not exist or has been moved.')}
        </p>
        <Link
          to="/"
          className="inline-block bg-accent-gold text-primary-bg uppercase text-lg font-bold tracking-wide-sm py-3 px-8
                     hover:bg-opacity-90 transition-colors duration-300"
        >
          {t('not_found.go_home', 'Go to Homepage')}
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
