import React, { useEffect, useState, useRef } from 'react';

interface EasterEggProps {
  isActive: boolean;
}

interface Blob {
  id: number;
  x: number;
  y: number;
  isFadingOut: boolean;
}

const WELCOME_MESSAGE = "you found an easter egg by the batch 5 exec team! happy building :))";
const TYPING_SPEED = 50;
const DISPLAY_DURATION = 2000;
const FADE_DURATION = 1000;

const EasterEgg: React.FC<EasterEggProps> = ({ isActive }) => {
  const [showWelcome, setShowWelcome] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [blobs, setBlobs] = useState<Blob[]>([]);
  const nextIdRef = useRef(0);
  const prevActiveRef = useRef(false);

  // Typewriter effect for welcome message on activation
  useEffect(() => {
    const justActivated = isActive && !prevActiveRef.current;

    if (!isActive) {
      prevActiveRef.current = false;
      setShowWelcome(false);
      setDisplayedText('');
      setIsTypingComplete(false);

      if (blobs.length > 0) {
        setBlobs((prev) => prev.map(blob => ({ ...blob, isFadingOut: true })));
        setTimeout(() => setBlobs([]), FADE_DURATION);
      }
      return;
    }

    if (justActivated) {
      prevActiveRef.current = true;
      setShowWelcome(true);
      setDisplayedText('');
      setIsTypingComplete(false);
      let index = 0;

      const typeInterval = setInterval(() => {
        if (index < WELCOME_MESSAGE.length) {
          setDisplayedText(WELCOME_MESSAGE.substring(0, index + 1));
          index++;
        } else {
          clearInterval(typeInterval);
          setIsTypingComplete(true);
          setTimeout(() => setShowWelcome(false), DISPLAY_DURATION);
        }
      }, TYPING_SPEED);

      return () => clearInterval(typeInterval);
    }
  }, [isActive, blobs.length]);

  // Track mouse position for custom cursor
  useEffect(() => {
    if (!isActive) return;

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [isActive]);

  // Handle clicks to spawn blobs
  useEffect(() => {
    if (!isActive) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.heart-emoji')) return;

      const newBlob: Blob = {
        id: nextIdRef.current++,
        x: e.clientX + window.scrollX,
        y: e.clientY + window.scrollY,
        isFadingOut: false
      };
      setBlobs((prev) => [...prev, newBlob]);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [isActive]);

  if (!isActive) return null;

  return (
    <>
      <style>
        {`
          body.easter-egg-active,
          body.easter-egg-active * {
            cursor: none !important;
          }

          @keyframes fadeOut {
            0% { opacity: 1; }
            67% { opacity: 1; }
            100% { opacity: 0; }
          }
        `}
      </style>

      {/* Custom cursor */}
      <div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '32px',
          height: '32px',
          pointerEvents: 'none',
          zIndex: 999999,
          transform: `translate(${cursorPos.x - 16}px, ${cursorPos.y - 16}px)`,
          transition: 'transform 0.05s ease-out'
        }}
      >
        <img
          src="/assets/party_blob.gif"
          alt="cursor"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Spawned blobs */}
      {blobs.map((blob) => (
        <div
          key={blob.id}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '32px',
            height: '32px',
            pointerEvents: 'none',
            zIndex: 9998,
            transform: `translate(${blob.x - 16}px, ${blob.y - 16}px)`,
            opacity: blob.isFadingOut ? 0 : 1,
            transition: 'opacity 1s ease-out'
          }}
        >
          <img
            src="/assets/party_blob.gif"
            alt="blob"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      ))}

      {/* Welcome message */}
      {showWelcome && (
        <div
          style={{
            position: 'fixed',
            bottom: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10000,
            color: 'white',
            fontFamily: '"Courier New", Courier, monospace',
            fontSize: '16px',
            textAlign: 'center',
            maxWidth: '80%',
            padding: '15px 20px',
            border: '2px solid #E052A0',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            borderRadius: '8px',
            pointerEvents: 'none',
            boxShadow: '0 4px 20px rgba(224, 82, 160, 0.5)',
            animation: isTypingComplete ? 'fadeOut 3s ease-in-out forwards' : 'none'
          }}
        >
          {displayedText}
        </div>
      )}
    </>
  );
};

// Hook to manage body class for cursor
export const useEasterEggCursor = (isActive: boolean) => {
  useEffect(() => {
    if (isActive) {
      document.body.classList.add('easter-egg-active');
    } else {
      document.body.classList.remove('easter-egg-active');
    }

    return () => {
      document.body.classList.remove('easter-egg-active');
    };
  }, [isActive]);
};

export default EasterEgg;
