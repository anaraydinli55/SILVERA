import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Whatsapp } from 'lucide-react';

import SectionHeading from '../components/common/SectionHeading';
import Button from '../components/common/Button';
import Input from '../components/ui/Input';
import TextArea from '../components/ui/TextArea';
import AnimatedSection from '../components/common/AnimatedSection';

const ContactPage = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    // In a real application, send this data to a backend API
    alert(t('contact_page.message_sent_success')); // Add this translation key
    setFormData({ name: '', email: '', message: '' });
  };

  const prefilledWhatsAppMessage = encodeURIComponent(t('contact_page.whatsapp_message_prefill'));
  const whatsappLink = `https://wa.me/YOUR_WHATSAPP_NUMBER?text=${prefilledWhatsAppMessage}`; // Replace with your actual WhatsApp number

  return (
    <div className="bg-primary-bg min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <SectionHeading title={t('contact_page.title')} subtitle={t('common.contact_us_subtitle')} /> {/* Add common.contact_us_subtitle */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          {/* Contact Information */}
          <AnimatedSection
            className="bg-secondary-bg p-10 rounded-lg shadow-xl border border-gray-800"
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
          >
            <h3 className="text-3xl font-heading text-accent-gold mb-6">{t('contact_page.title')}</h3>
            <ul className="space-y-6 text-text-light text-lg">
              <li className="flex items-center">
                <Mail size={24} className="mr-4 text-accent-gold" />
                <div>
                  <span className="block text-text-muted">{t('contact_page.email_address')}</span>
                  <a href="mailto:info@silvera.com" className="hover:text-accent-gold transition-colors duration-300">info@silvera.com</a>
                </div>
              </li>
              <li className="flex items-center">
                <Whatsapp size={24} className="mr-4 text-accent-gold" />
                <div>
                  <span className="block text-text-muted">WhatsApp</span>
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="hover:text-accent-gold transition-colors duration-300">
                    {t('contact_page.send_message')}
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <Phone size={24} className="mr-4 text-accent-gold flex-shrink-0" />
                <div>
                  <span className="block text-text-muted">Telefon</span>
                  <a href="tel:+994501234567" className="hover:text-accent-gold transition-colors duration-300">+994 50 123 45 67</a> {/* Replace with actual number */}
                </div>
              </li>
              <li className="flex items-start">
                <MapPin size={24} className="mr-4 text-accent-gold flex-shrink-0" />
                <div>
                  <span className="block text-text-muted">Ünvan</span>
                  <span>Bakı, Azərbaycan</span> {/* Replace with actual address */}
                </div>
              </li>
              <li className="flex items-start">
                <Mail size={24} className="mr-4 text-accent-gold flex-shrink-0" />
                <div>
                  <span className="block text-text-muted">{t('contact_page.business_hours')}</span>
                  <p>{t('contact_page.hours_monday_friday')}</p>
                  <p>{t('contact_page.hours_saturday')}</p>
                  <p>{t('contact_page.hours_sunday')}</p>
                </div>
              </li>
            </ul>
          </AnimatedSection>

          {/* Contact Form */}
          <AnimatedSection
            className="bg-secondary-bg p-10 rounded-lg shadow-xl border border-gray-800"
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } }
            }}
          >
            <h3 className="text-3xl font-heading text-text-light mb-6">{t('contact_page.send_message')}</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                id="name"
                label={t('contact_page.your_name')}
                value={formData.name}
                onChange={handleChange}
              />
              <Input
                id="email"
                label={t('contact_page.your_email')}
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
              <TextArea
                id="message"
                label={t('contact_page.your_message')}
                value={formData.message}
                onChange={handleChange}
              />
              <Button variant="primary" type="submit" className="w-full py-3 text-lg">
                {t('contact_page.send_message')}
              </Button>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
