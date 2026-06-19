import React from 'react';
import { motion } from 'framer-motion';

const SectionHeading = ({ title, subtitle, className = '' }) => {
  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={variants}
      className={`text-center mb-12 ${className}`}
    >
      {subtitle && (
        <h3 className="text-lg font-body text-accent-gold mb-2 uppercase tracking-wide-sm">
          {subtitle}
        </h3>
      )}
      <h2 className="text-5xl md:text-6xl font-heading text-text-light leading-tight">
        {title}
      </h2>
      <div className="w-16 h-0.5 bg-accent-gold mx-auto mt-4" />
    </motion.div>
  );
};

export default SectionHeading;
