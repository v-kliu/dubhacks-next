import React, { useEffect, useState, useRef, useCallback } from 'react';

interface DollarBill {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface MoneyModeProps {
  isActive: boolean;
}

const VELOCITY_RANGE = 1;
const EMOJI_SIZE = 30;
const FADE_DURATION = 500;

const MoneyMode: React.FC<MoneyModeProps> = ({ isActive }) => {
  const [dollarBills, setDollarBills] = useState<DollarBill[]>([]);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const nextIdRef = useRef(0);

  // Handle clicks to spawn dollar bills
  const handleClick = useCallback((e: MouseEvent) => {
    const newDollar: DollarBill = {
      id: nextIdRef.current++,
      x: e.clientX,
      y: e.clientY,
      vx: (Math.random() - 0.5) * VELOCITY_RANGE,
      vy: (Math.random() - 0.5) * VELOCITY_RANGE,
    };
    setDollarBills((prev) => [...prev, newDollar]);
  }, []);

  useEffect(() => {
    if (!isActive) return;

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [isActive, handleClick]);

  // Animate dollar bills with DVD screensaver-style bouncing
  useEffect(() => {
    if (!isActive || dollarBills.length === 0) return;

    let animationFrameId: number;

    const animate = () => {
      setDollarBills((bills) =>
        bills.map((bill) => {
          let newX = bill.x + bill.vx;
          let newY = bill.y + bill.vy;
          let newVx = bill.vx;
          let newVy = bill.vy;

          // Bounce off walls
          const maxX = window.innerWidth - EMOJI_SIZE;
          const maxY = window.innerHeight - EMOJI_SIZE;

          if (newX <= 0 || newX >= maxX) {
            newVx = -newVx;
            newX = newX <= 0 ? 0 : maxX;
          }
          if (newY <= 0 || newY >= maxY) {
            newVy = -newVy;
            newY = newY <= 0 ? 0 : maxY;
          }

          return {
            ...bill,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy,
          };
        })
      );

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isActive, dollarBills.length]);

  // Fade out and clear dollar bills when money mode is deactivated
  useEffect(() => {
    if (!isActive && dollarBills.length > 0) {
      setIsFadingOut(true);

      const timeoutId = setTimeout(() => {
        setDollarBills([]);
        setIsFadingOut(false);
      }, FADE_DURATION);

      return () => clearTimeout(timeoutId);
    } else if (isActive) {
      setIsFadingOut(false);
    }
  }, [isActive, dollarBills.length]);

  if (!isActive && dollarBills.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {dollarBills.map((bill) => (
        <div
          key={bill.id}
          className="absolute text-3xl transition-opacity duration-500"
          style={{
            left: `${bill.x}px`,
            top: `${bill.y}px`,
            transform: 'translate(-50%, -50%)',
            opacity: isFadingOut ? 0 : 1,
          }}
        >
          💵
        </div>
      ))}
    </div>
  );
};

export default MoneyMode;
