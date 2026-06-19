import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, onClick, variant = 'primary', className = '', ...props }) => {
  const baseClasses = `
    font-body uppercase text-sm font-bold tracking-wide-sm py-3 px-6 rounded-none
    transition-all duration-300 ease-in-out flex items-center justify-center
  `;

  const variants = {
    primary: `
      bg-accent-gold text-primary-bg
      hover:bg-opacity-90 hover:shadow-lg
    `,
    secondary: `
      bg-transparent border border-accent-gold text-accent-gold
      hover:bg-accent-gold hover:text-primary-bg
    `,
    outline: `
      bg-transparent border border-text-light text-text-light
      hover:bg-text-light hover:text-primary-bg
    `,
    link: `
      bg-transparent text-accent-gold underline
      hover:no-underline p-0
    `
  };

  return (
    <motion.button
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
