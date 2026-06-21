import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Carousel = ({ images, className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Animasyon varyantlarını medya öğesine uygulayacağız
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: '0',
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  // Şu anki medya öğesinin URL'sini alalım
  const currentMediaUrl = images[currentIndex];
  // Medya türünü kontrol edelim
  const isVideo = currentMediaUrl && currentMediaUrl.endsWith('.mp4');

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <AnimatePresence initial={false} mode="wait"> {/* 'custom' prop yerine 'mode="wait"' kullanmak daha temiz bir geçiş sağlar */}
        {isVideo ? (
          <motion.video
            key={currentMediaUrl} // Medya URL'sini key olarak kullanıyoruz
            src={currentMediaUrl}
            custom={currentIndex} // custom prop'unu hala geçirebiliriz, animasyon yönü için
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="w-full h-full object-contain" // object-contain video için genellikle daha iyidir
            controls={true}
            autoPlay={true}
            muted={true}
            loop={true}
            playsInline={true}
            aria-label={`Product video ${currentIndex + 1}`}
          >
            Tarayıcınız video etiketini desteklemiyor.
          </motion.video>
        ) : (
          <motion.img
            key={currentMediaUrl} // Medya URL'sini key olarak kullanıyoruz
            src={currentMediaUrl}
            alt={`Product image ${currentIndex + 1}`}
            custom={currentIndex} // custom prop'unu hala geçirebiliriz
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="w-full h-full object-cover object-center"
          />
        )}
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute top-1/2 left-4 -translate-y-1/2 p-2 bg-primary-bg bg-opacity-50 rounded-full text-text-light hover:bg-accent-gold transition-colors duration-300 z-10"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={goToNext}
            className="absolute top-1/2 right-4 -translate-y-1/2 p-2 bg-primary-bg bg-opacity-50 rounded-full text-text-light hover:bg-accent-gold transition-colors duration-300 z-10"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Navigation dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index} // Key olarak indeksi kullanmaya devam edebiliriz, çünkü bu sadece butonlar için
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full ${
              currentIndex === index ? 'bg-accent-gold' : 'bg-text-muted opacity-50'
            } transition-colors duration-300`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
