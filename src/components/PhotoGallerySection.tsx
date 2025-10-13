import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Photo {
  filename: string;
  caption: string;
  alt: string;
}

const getGalleryImage = (filename: string): string => {
  return `/assets/gallery_pictures/${filename}`;
};

const PhotoGallerySection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Gallery photos with captions
  // TO ADD/CHANGE PHOTOS:
  // 1. Add your image file to: /public/assets/gallery_pictures/
  // 2. Add/edit entries below with filename, caption, and alt text
  const photos: Photo[] = [
    {
      filename: 'batch4.jpg',
      caption: '✨ Batch 4 vibes at our retreat - yes, we actually met IRL',
      alt: 'Batch 4 cohort group photo'
    },
    {
      filename: 'batch4_exec.jpg',
      caption: '🎉 Demo Day = done. Sleep schedule = obliterated. Worth it? Absolutely.',
      alt: 'Batch 4 executive team'
    },
    {
      filename: 'cognito.jpg',
      caption: '🎤 Cognito dropping fire pitches like they\'re releasing mixtapes',
      alt: 'Cognito Demo Day presentation'
    },
    {
      filename: 'hike.jpg',
      caption: '⛰️ Plot twist: founders DO touch grass (occasionally)',
      alt: 'Team building hike'
    },
    {
      filename: 'koel_labs.jpg',
      caption: '🗣️ Koel Labs making computers talk - because why not?',
      alt: 'Koel Labs presentation'
    },
    {
      filename: 'slate.jpg',
      caption: '💻 Slate demoing their product to actual humans with money',
      alt: 'Slate product demo'
    },
    {
      filename: 'edu.jpg',
      caption: '📚 Learning things that Google can\'t teach you (yet)',
      alt: 'Educational workshop session'
    },
    {
      filename: 'bonding.jpg',
      caption: '🌲 Team bonding: where "just one more mile" becomes a lifestyle',
      alt: 'Team bonding event'
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
  };

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 8000); // Slowed down from 5s to 8s

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-neutral-50 py-section px-6 md:px-12">
      <div className="max-w-content mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="overline text-pink mb-6">MOMENTS</div>
          <h2 className="section-title text-neutral-900">Capturing Our Journey</h2>
        </motion.div>

        <div className="relative">
          {/* Main Gallery */}
          <div className="relative h-[500px] md:h-[650px] rounded-2xl overflow-hidden bg-white shadow-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <img
                  src={getGalleryImage(photos[currentIndex].filename)}
                  alt={photos[currentIndex].alt}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to gradient background if image doesn't exist
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.style.background = 'linear-gradient(135deg, #fdf2f8 0%, #fff1f2 100%)';
                      parent.innerHTML = `
                        <div class="flex items-center justify-center h-full">
                          <div class="text-center">
                            <div class="text-primary-600 text-4xl mb-4">📸</div>
                            <div class="text-neutral-600">${photos[currentIndex].caption}</div>
                          </div>
                        </div>
                      `;
                    }
                  }}
                />
                
                {/* Caption Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <h3 className="text-white font-medium text-lg">
                    {photos[currentIndex].caption}
                  </h3>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-300 shadow-lg"
              aria-label="Previous photo"
            >
              <ChevronLeft className="text-neutral-700" size={24} />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-300 shadow-lg"
              aria-label="Next photo"
            >
              <ChevronRight className="text-neutral-700" size={24} />
            </button>
          </div>

          {/* Thumbnail Navigation */}
          <div className="flex justify-center mt-8 space-x-3">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary-600 scale-125'
                    : 'bg-neutral-300 hover:bg-primary-400'
                }`}
                aria-label={`Go to photo ${index + 1}`}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-4 w-full bg-neutral-200 h-1 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary-500 to-accent-500"
              initial={{ width: '0%' }}
              animate={{ width: `${((currentIndex + 1) / photos.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default PhotoGallerySection;