import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Search, Heart, ShoppingCart, User, Mail } from 'lucide-react';
import LanguageSwitcher from '../common/LanguageSwitcher';

const Header = () => {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: t('header.home'), path: '/' },
    { name: t('header.collections'), path: '/collections' },
    { name: t('header.new_arrivals'), path: '/new-arrivals' }, // Will link to a section on HomePage or a dedicated page
    { name: t('header.best_sellers'), path: '/best-sellers' }, // Will link to a section on HomePage or a dedicated page
    { name: t('header.contact'), path: '/contact' },
  ];

  const iconNavItems = [
    { icon: Search, label: t('header.search'), path: '/search' }, // Placeholder path
    { icon: Heart, label: t('header.wishlist'), path: '/wishlist' },
    { icon: ShoppingCart, label: t('header.cart'), path: '/cart' },
    { icon: User, label: t('header.account'), path: '/account' }, // Placeholder path
  ];

  const mobileMenuVariants = {
    hidden: { x: '100vw' },
    visible: { x: '0', transition: { type: 'spring', stiffness: 50, damping: 20 } },
    exit: { x: '100vw', transition: { ease: 'easeInOut' } },
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="fixed top-0 left-0 w-full bg-primary-bg bg-opacity-90 backdrop-blur-sm z-50 shadow-lg"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-3xl font-heading text-accent-gold font-bold">
          SILVERA
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex flex-grow justify-center">
          <ul className="flex space-x-8">
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `uppercase text-sm font-body tracking-wide-sm relative py-1
                     ${isActive ? 'text-accent-gold' : 'text-text-light hover:text-accent-gold'}
                     after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-accent-gold
                     after:transition-all after:duration-300 hover:after:w-full
                     ${isActive ? 'after:w-full' : ''}`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Icons & Language Switcher (Desktop) */}
        <div className="hidden lg:flex items-center space-x-6">
          <a href="mailto:info@silvera.com" className="flex items-center space-x-1 text-text-muted hover:text-accent-gold transition-colors duration-300">
            <Mail size={18} />
            <span className="text-sm">info@silvera.com</span>
          </a>
          {iconNavItems.map((item) => (
            <Link key={item.label} to={item.path} className="text-text-light hover:text-accent-gold transition-colors duration-300">
              <item.icon size={20} aria-label={item.label} />
            </Link>
          ))}
          <LanguageSwitcher />
        </div>

        {/* Mobile Menu Toggle & Icons */}
        <div className="flex lg:hidden items-center space-x-4">
          <Link to="/search" className="text-text-light hover:text-accent-gold transition-colors duration-300">
            <Search size={20} aria-label={t('header.search')} />
          </Link>
          <Link to="/cart" className="text-text-light hover:text-accent-gold transition-colors duration-300">
            <ShoppingCart size={20} aria-label={t('header.cart')} />
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-text-light focus:outline-none hover:text-accent-gold transition-colors duration-300"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-primary-bg z-40 flex flex-col pt-20 px-8 lg:hidden"
          >
            <nav className="flex flex-col space-y-6 mt-8">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-xl font-heading py-2 block border-b border-secondary-bg
                     ${isActive ? 'text-accent-gold' : 'text-text-light hover:text-accent-gold'}`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
              <div className="pt-4 border-b border-secondary-bg">
                <Link to="/wishlist" className="flex items-center py-2 text-xl font-heading text-text-light hover:text-accent-gold" onClick={() => setIsMobileMenuOpen(false)}>
                  <Heart size={20} className="mr-3" /> {t('header.wishlist')}
                </Link>
              </div>
              <div className="border-b border-secondary-bg">
                <Link to="/account" className="flex items-center py-2 text-xl font-heading text-text-light hover:text-accent-gold" onClick={() => setIsMobileMenuOpen(false)}>
                  <User size={20} className="mr-3" /> {t('header.account')}
                </Link>
              </div>
            </nav>
            <div className="mt-8 flex justify-center">
              <LanguageSwitcher />
            </div>
            <div className="mt-8 text-center">
              <a href="mailto:info@silvera.com" className="text-text-muted hover:text-accent-gold transition-colors duration-300 flex items-center justify-center">
                <Mail size={18} className="mr-2" />
                <span className="text-lg">info@silvera.com</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
