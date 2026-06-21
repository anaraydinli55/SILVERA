import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, VolumeX, Volume2 } from 'lucide-react'; // VolumeX ve Volume2 eklendi

const Carousel = ({ images, className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true); // Yeni state: Sesin açık mı kapalı mı olduğunu tutar
  const videoRef = useRef(null);

  // Carousel'in önceki ve sonraki öğelerine geçiş fonksiyonları
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

  // currentMediaUrl veya currentIndex değiştiğinde videoyu yönetmek için useEffect
  useEffect(() => {
    // Önceki videoyu durdur, referansı temizle ve sesini kapat (geçişlerde temizlik)
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // Videoyu başa sar
    }

    const currentMedia = images[currentIndex];
    if (currentMedia && currentMedia.endsWith('.mp4')) {
      // Eğer mevcut medya bir videoysa ve referansı varsa
      if (videoRef.current) {
        // Videonun 'muted' durumunu state'ten al
        videoRef.current.muted = isMuted;

        // Play Promise'ini yönet, otomatik oynatma hatalarını yakala
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            // Otomatik oynatma engellendi, sesi kapatıp tekrar dene (tarayıcı politikası)
            console.warn("Autoplay was prevented, or user interaction required. Playing muted.", error);
            videoRef.current.muted = true; // Sesi kapat
            setIsMuted(true); // State'i de güncelle
            videoRef.current.play(); // Tekrar oynatmayı dene (bu sefer sessiz)
          });
        }
      }
    }
  }, [currentIndex, images, isMuted]); // isMuted state'i de bağımlılık olarak eklendi

  // Ses ikonuna tıklandığında muted durumunu değiştiren fonksiyon
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  // Animasyon varyantları
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

  const currentMediaUrl = images[currentIndex];
  const isVideo = currentMediaUrl && currentMediaUrl.endsWith('.mp4');

  // Görsel yüklenemediğinde veya boş olduğunda gösterilecek içerik
  if (!images || images.length === 0) {
    return (
      <div className={`flex items-center justify-center bg-secondary-bg text-text-muted ${className}`}>
        No media available.
      </div>
    );
  }

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <AnimatePresence initial={false} mode="wait">
        {isVideo ? (
          <motion.video
            key={currentMediaUrl}
            ref={videoRef} // Video elementine referans atıyoruz
            src={currentMediaUrl}
            custom={currentIndex}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="w-full h-full object-contain"
            controls={false} // <- ÖNEMLİ: Kendi kontrollerimizi kullanacağımız için HTML kontrollerini kapatıyoruz
            autoPlay={true}
            muted={isMuted} // <- isMuted state'ine bağlı
            loop={true}
            playsInline={true}
            aria-label={`Product video ${currentIndex + 1}`}
          >
            Tarayıcınız video etiketini desteklemiyor.
          </motion.video>
        ) : (
          <motion.img
            key={currentMediaUrl}
            src={currentMediaUrl}
            alt={`Product image ${currentIndex + 1}`}
            custom={currentIndex}
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

      {/* Sadece video olduğunda ses kontrol butonu */}
      {isVideo && (
        <button
          onClick={toggleMute}
          className="absolute bottom-4 right-4 p-2 bg-primary-bg bg-opacity-50 rounded-full text-accent-gold hover:bg-opacity-75 transition-colors duration-300 z-10"
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      )}

      {images.length > 1 && (
        <>
          {/* Sol ok butonu */}
          <button
            onClick={goToPrevious}
            className="absolute top-1/2 left-4 -translate-y-1/2 p-2 bg-primary-bg bg-opacity-50 rounded-full text-text-light hover:bg-accent-gold transition-colors duration-300 z-10"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
          {/* Sağ ok butonu */}
          <button
            onClick={goToNext}
            className="absolute top-1/2 right-4 -translate-y-1/2 p-2 bg-primary-bg bg-opacity-50 rounded-full text-text-light hover:bg-accent-gold transition-colors duration-300 z-10"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Navigasyon noktaları */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
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
