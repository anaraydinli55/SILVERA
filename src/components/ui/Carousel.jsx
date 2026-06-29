// src/components/Carousel.jsx (veya projenizdeki Carousel dosyasının yolu)
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, VolumeX, Volume2 } from 'lucide-react';

const Carousel = ({ images, className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 0: başlangıç, 1: ileri, -1: geri
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // currentMediaUrl veya currentIndex değiştiğinde videoyu yönetmek için useEffect
  useEffect(() => {
    const currentMedia = images[currentIndex];
    const isVideo = currentMedia && currentMedia.endsWith('.mp4');

    // Her değişimde mevcut videoyu durdur ve başa sar
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }

    if (isVideo) {
      // Eğer mevcut medya bir videoysa
      if (videoRef.current) {
        videoRef.current.muted = isMuted; // Videonun 'muted' durumunu state'ten al

        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            // Otomatik oynatma engellendi, sesi kapatıp tekrar dene
            console.warn("Autoplay was prevented, or user interaction required. Playing muted.", error);
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play();
          });
        }
      }
    }
    // currentIndex değiştiğinde yönü sıfırla (animasyonun doğru çalışması için)
    // setDirection(0); // Bu satırı ekleyebiliriz ama framer-motion'ın kendi mantığı da yeterli olabilir
  }, [currentIndex, images, isMuted]); // isMuted state'i de bağımlılık olarak eklendi

  // Ses ikonuna tıklandığında muted durumunu değiştiren fonksiyon
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  // Video bittiğinde bir sonraki medyaya geç (isteğe bağlı)
  const handleVideoEnded = () => {
    goToNext();
  };

  // Animasyon varyantları (direction state'ini kullanıyoruz)
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

  if (!images || images.length === 0) {
    return (
      <div className={`flex items-center justify-center bg-secondary-bg text-text-muted ${className}`}>
        No media available.
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}> {/* className buraya uygulandı */}
      <AnimatePresence initial={false} mode="wait" custom={direction}>
        {isVideo ? (
          <motion.video
            key={currentMediaUrl}
            ref={videoRef}
            src={currentMediaUrl}
            custom={direction} // Yönü animasyona iletiyoruz
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute inset-0 w-full h-full object-cover" // Kapsayıcı div'i doldur
            controls={false}
            autoPlay={true}
            muted={isMuted}
            loop={true}
            playsInline={true}
            onEnded={handleVideoEnded} // Video bittiğinde next'e geç
            aria-label={`Product video ${currentIndex + 1}`}
          >
            Tarayıcınız video etiketini desteklemiyor.
          </motion.video>
        ) : (
          <motion.img
            key={currentMediaUrl}
            src={currentMediaUrl}
            alt={`Product image ${currentIndex + 1}`}
            custom={direction} // Yönü animasyona iletiyoruz
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute inset-0 w-full h-full object-cover" // Kapsayıcı div'i doldur
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
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => { setDirection(index > currentIndex ? 1 : -1); setCurrentIndex(index); }} // Noktalara tıklarken de yönü ayarla
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
