import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsComplete(true);
      setTimeout(onComplete, 300);
    }, 1800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-br from-primary-500 via-primary-600 to-accent-600 z-50 flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: isComplete ? 0 : 1 }}
      transition={{ duration: 0.3, delay: isComplete ? 0 : 0 }}
    >
      <div className="relative flex items-center space-x-4">
        <motion.img
          src="/dubhacksnext.png"
          alt="DubHacks Next"
          className="w-16 h-16 object-contain"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        <motion.div
          className="text-white text-4xl md:text-6xl font-light tracking-wider"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          DUBHACKS NEXT
        </motion.div>
        <motion.div
          className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-white to-primary-200"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
          style={{ transformOrigin: "left center" }}
        />
      </div>
    </motion.div>
  );
};

export default LoadingScreen;