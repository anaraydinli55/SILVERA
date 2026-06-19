import React from 'react';
import { motion } from 'framer-motion';

const AnimatedSection = ({ children, className = '', variants, initial = "hidden", whileInView = "visible", viewport = { once: true, amount: 0.3 } }) => {
  const defaultVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <motion.section
      className={className}
      initial={initial}
      whileInView={whileInView}
      viewport={viewport}
      variants={variants || defaultVariants}
    >
      {children}
    </motion.section>
  );
};

export default AnimatedSection;
