import React from 'react';
import { motion } from 'framer-motion';
import { Whatsapp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FloatingWhatsApp = () => {
  const { t } = useTranslation();
  const prefilledMessage = encodeURIComponent(t('contact_page.whatsapp_message_prefill'));
  const whatsappNumber = 'YOUR_WHATSAPP_NUMBER'; // Replace with your actual WhatsApp number

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${prefilledMessage}`;

  return (
    <motion.a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-accent-gold text-primary-bg shadow-lg cursor-pointer"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 1 }}
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Contact us on WhatsApp"
    >
      <Whatsapp size={32} />
    </motion.a>
  );
};

export default FloatingWhatsApp;
