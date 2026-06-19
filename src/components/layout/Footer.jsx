import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const prefilledWhatsAppMessage = encodeURIComponent(t('contact_page.whatsapp_message_prefill'));
  const whatsappLink = `https://wa.me/YOUR_PHONE_NUMBER?text=${prefilledWhatsAppMessage}`; // Replace YOUR_PHONE_NUMBER

  const footerLinks = [
    { title: t('footer.about_us'), path: '/about' }, // Placeholder
    { title: t('footer.contact_us'), path: '/contact' },
    { title: t('footer.faq'), path: '/faq' }, // Placeholder
    { title: t('footer.privacy_policy'), path: '/privacy-policy' },
    { title: t('footer.terms_conditions'), path: '/terms-conditions' },
    { title: t('footer.shipping_returns'), path: '/shipping-returns' },
  ];

  const socialLinks = [
    { icon: Instagram, url: 'https://instagram.com/silvera' }, // Replace with actual links
    { icon: Facebook, url: 'https://facebook.com/silvera' },
    { icon: Twitter, url: 'https://twitter.com/silvera' },
  ];

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInVariants}
      className="bg-secondary-bg text-text-muted py-16 px-4 border-t border-gray-800"
    >
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand Info */}
        <div className="col-span-full lg:col-span-1 text-center lg:text-left">
          <Link to="/" className="text-4xl font-heading text-accent-gold font-bold block mb-4">
            SILVERA
          </Link>
          <p className="text-sm leading-relaxed max-w-sm mx-auto lg:mx-0">
            {t('brand_story.paragraph1').split('.')[0]}.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-heading text-text-light mb-5 uppercase tracking-wide-sm border-b-2 border-accent-gold inline-block pb-1">
            {t('footer.about_us')}
          </h3>
          <ul className="space-y-3 mt-4">
            {footerLinks.slice(0, 3).map((link, index) => (
              <li key={index}>
                <Link to={link.path} className="text-sm hover:text-accent-gold transition-colors duration-300">
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h3 className="text-lg font-heading text-text-light mb-5 uppercase tracking-wide-sm border-b-2 border-accent-gold inline-block pb-1">
            {t('footer.contact_us')}
          </h3>
          <ul className="space-y-3 mt-4">
            {footerLinks.slice(3).map((link, index) => (
              <li key={index}>
                <Link to={link.path} className="text-sm hover:text-accent-gold transition-colors duration-300">
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-lg font-heading text-text-light mb-5 uppercase tracking-wide-sm border-b-2 border-accent-gold inline-block pb-1">
            {t('footer.contact_us')}
          </h3>
          <ul className="space-y-3 mt-4 text-sm">
            <li>
              <span className="block text-accent-gold">{t('footer.email_us')}</span>
              <a href="mailto:info@silvera.com" className="hover:text-accent-gold transition-colors duration-300">info@silvera.com</a>
            </li>
            <li>
              <span className="block text-accent-gold">WhatsApp:</span>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="hover:text-accent-gold transition-colors duration-300 flex items-center">
                <MessageSquare size={16} className="mr-1" /> {t('common.send_whatsapp_message', 'Send Message')} {/* Yeni çeviri anahtarı ekledim */}
              </a>
            </li>
            <li className="mt-4">
              <span className="block text-accent-gold mb-2">{t('footer.follow_us')}</span>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a key={index} href={social.url} target="_blank" rel="noopener noreferrer" className="text-text-light hover:text-accent-gold transition-colors duration-300">
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto mt-16 pt-8 border-t border-gray-700 text-center text-xs text-text-muted">
        <p>&copy; {currentYear} SILVERA. {t('footer.all_rights_reserved')}</p>
      </div>
    </motion.footer>
  );
};

export default Footer;
