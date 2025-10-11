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
    }, 1400);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: isComplete ? 0 : 1 }}
      transition={{ duration: 0.3, delay: isComplete ? 0 : 0 }}
    >
      <div className="relative">
        {/* Logo with creative square animation */}
        <motion.div
          className="relative w-24 h-24 mx-auto mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Animated border squares */}
          <motion.div
            className="absolute inset-0 border-2 border-primary-500"
            initial={{ scale: 1.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          />
          <motion.div
            className="absolute inset-1 border border-accent-400"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          />
          
          {/* Logo */}
          <motion.img
            src="/dubhacksnext.png"
            alt="DubHacks Next"
            className="absolute w-14 h-14 object-contain"
            style={{ 
              left: '50%', 
              top: '50%', 
              transform: 'translate(-50%, -50%)' 
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          />
          
          {/* Rotating accent squares */}
          <motion.div
            className="absolute -inset-2 border border-primary-300/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute -inset-4 border border-accent-300/20"
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
        
        {/* Text with staggered reveal */}
        <motion.div
          className="text-center space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <div className="overflow-hidden">
            <motion.div
              className="text-white text-2xl md:text-3xl font-light tracking-widest"
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, delay: 0.7, ease: [0.4, 0, 0.2, 1] }}
            >
              DUBHACKS
            </motion.div>
          </div>
          <div className="overflow-hidden">
            <motion.div
              className="text-primary-400 text-lg font-light tracking-wider"
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, delay: 0.8, ease: [0.4, 0, 0.2, 1] }}
            >
              NEXT
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;