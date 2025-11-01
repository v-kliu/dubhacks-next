import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface MoneyBill {
  id: number;
  x: number;
  y: number;
  rotation: number;
  velocityX: number;
  velocityY: number;
  rotationSpeed: number;
}

const HiddenPage: React.FC = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [moneyBills, setMoneyBills] = useState<MoneyBill[]>([]);
  const [nextId, setNextId] = useState(0);

  // Physics loop for bouncing bills
  useEffect(() => {
    if (!isActive || moneyBills.length === 0) return;

    const interval = setInterval(() => {
      setMoneyBills((bills) =>
        bills.map((bill) => {
          let newX = bill.x + bill.velocityX;
          let newY = bill.y + bill.velocityY;
          let newVelocityX = bill.velocityX;
          let newVelocityY = bill.velocityY + 0.5; // Gravity

          // Bounce off walls
          if (newX <= 0 || newX >= window.innerWidth - 60) {
            newVelocityX = -newVelocityX * 0.8;
            newX = newX <= 0 ? 0 : window.innerWidth - 60;
          }

          // Bounce off floor
          if (newY >= window.innerHeight - 60) {
            newVelocityY = -newVelocityY * 0.7;
            newY = window.innerHeight - 60;
          }

          return {
            ...bill,
            x: newX,
            y: newY,
            velocityX: newVelocityX,
            velocityY: newVelocityY,
            rotation: bill.rotation + bill.rotationSpeed,
          };
        })
      );
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [isActive, moneyBills.length]);

  const handleClick = (e: React.MouseEvent) => {
    if (isActive) {
      // Spawn money bills at click location
      const newBills: MoneyBill[] = Array.from({ length: 5 }, (_, i) => ({
        id: nextId + i,
        x: e.clientX - 30,
        y: e.clientY - 30,
        rotation: Math.random() * 360,
        velocityX: (Math.random() - 0.5) * 20,
        velocityY: (Math.random() - 0.5) * 20 - 10,
        rotationSpeed: (Math.random() - 0.5) * 10,
      }));

      setMoneyBills((prev) => [...prev, ...newBills]);
      setNextId((prev) => prev + 5);
    }
  };

  const handleHeartClick = () => {
    if (isActive) {
      // Stop bouncing, make bills fly away
      setIsActive(false);
      setMoneyBills((bills) =>
        bills.map((bill) => ({
          ...bill,
          velocityX: bill.velocityX * 3,
          velocityY: bill.velocityY * 3 - 30,
        }))
      );

      // Clear bills after they fly off
      setTimeout(() => {
        setMoneyBills([]);
      }, 3000);
    } else {
      // Start bouncing mode
      setIsActive(true);
    }
  };

  return (
    <div
      className="relative min-h-screen bg-gradient-to-br from-green-900 via-black to-green-950 overflow-hidden"
      onClick={handleClick}
      style={{ cursor: isActive ? 'crosshair' : 'default' }}
    >
      {/* Animated money bills */}
      <AnimatePresence>
        {moneyBills.map((bill) => (
          <motion.div
            key={bill.id}
            className="absolute text-6xl pointer-events-none select-none"
            style={{
              left: bill.x,
              top: bill.y,
              rotate: bill.rotation,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: isActive ? 1 : 0,
              x: !isActive ? bill.velocityX * 100 : 0,
              y: !isActive ? bill.velocityY * 100 - 500 : 0,
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              scale: { duration: 0.2 },
              opacity: { duration: isActive ? 0.2 : 1.5 },
              x: { duration: 3 },
              y: { duration: 3 },
            }}
          >
            💵
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="text-9xl mb-6 pointer-events-auto cursor-pointer inline-block"
            onClick={(e) => {
              e.stopPropagation();
              handleHeartClick();
            }}
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            animate={{
              scale: isActive ? [1, 1.1, 1] : 1,
            }}
            transition={{
              scale: isActive ? { duration: 0.5, repeat: Infinity } : {},
            }}
          >
            ❤️
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            {isActive ? 'Click to Make It Rain! 💸' : 'Click the Heart'}
          </h1>

          <p className="text-xl md:text-2xl text-green-300 font-light mb-8">
            {isActive
              ? 'Click anywhere to spawn money • Click heart again to stop'
              : 'Activate money mode'}
          </p>

          {!isActive && moneyBills.length === 0 && (
            <p className="text-white/60 text-sm">
              (Your secret easter egg 🥚)
            </p>
          )}
        </motion.div>

        {/* Stats */}
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-lg px-8 py-4 rounded-full border-2 border-green-500/50"
          >
            <p className="text-green-400 font-bold text-lg">
              Money Bills: {moneyBills.length} 💰
            </p>
          </motion.div>
        )}

        {/* Back Button */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            navigate('/');
          }}
          className="absolute top-8 left-8 px-6 py-3 bg-white/10 backdrop-blur-lg border border-white/30 rounded-full text-white text-sm hover:bg-white/20 transition-all duration-300 pointer-events-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Back Home
        </motion.button>
      </div>

      {/* Background floating money (ambient) */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`ambient-${i}`}
            className="absolute text-4xl"
            style={{
              left: `${(i * 12.5)}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -50, 0],
              rotate: [0, 360],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            💵
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HiddenPage;
