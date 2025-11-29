import React, { useEffect, useRef, useState } from 'react';

interface FounderModeProps {
  isActive: boolean;
  onExit: () => void;
}

interface TextSnapshot {
  text: string;
  x: number;
  y: number;
  fontSize: number;
  scrambleProgress: number; // 0 to 1, how much of the text has been scrambled
}

interface FallingChar {
  char: string;
  x: number;
  y: number;
  vy: number; // velocity Y
  alpha: number;
}

// Legendary founder quotes
const FOUNDER_QUOTES = [
  "Stay hungry. Stay foolish. - Steve Jobs",
  "Make something people want. - Paul Graham",
  "The best way to predict the future is to invent it. - Alan Kay",
  "Ideas are easy. Execution is everything. - John Doerr",
  "Move fast and break things. - Mark Zuckerberg",
  "If you're not embarrassed by the first version of your product, you've launched too late. - Reid Hoffman",
  "The biggest risk is not taking any risk. - Mark Zuckerberg",
  "Don't worry about failure; you only have to be right once. - Drew Houston",
  "It's not about ideas. It's about making ideas happen. - Scott Belsky",
  "The only way to do great work is to love what you do. - Steve Jobs",
  "Your most unhappy customers are your greatest source of learning. - Bill Gates",
  "Build something 100 people love, not something 1 million people kind of like. - Brian Chesky",
  "Good artists copy; great artists steal. - Pablo Picasso",
  "The best startups generally come from somebody needing to scratch an itch. - Michael Arrington",
  "If you're changing the world, you're working on important things. You're excited to get up in the morning. - Larry Page",
  "I think frugality drives innovation. - Jeff Bezos",
  "The way to get startup ideas is not to try to think of startup ideas. - Paul Graham",
  "Fail fast, fail often. - Tom Kelley",
  "Done is better than perfect. - Sheryl Sandberg",
  "The riskiest thing is to take no risks. - Mark Zuckerberg"
];

const FounderMode: React.FC<FounderModeProps> = ({ isActive, onExit }) => {
  const [phase, setPhase] = useState<'scramble' | 'falling' | 'quotes'>('scramble');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const textSnapshotsRef = useRef<TextSnapshot[]>([]);
  const fallingCharsRef = useRef<FallingChar[]>([]);
  const quoteIndexRef = useRef(0);
  const quoteAnimationRef = useRef<{
    currentQuote: string;
    displayIndex: number;
    phase: 'typing' | 'holding' | 'deleting' | 'waiting';
    timer: number;
    randomX?: number;
    randomY?: number;
  }>({
    currentQuote: '',
    displayIndex: 0,
    phase: 'typing',
    timer: 0
  });

  // Capture text snapshots from the DOM
  const captureTextSnapshots = (): void => {
    const snapshots: TextSnapshot[] = [];
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null
    );

    let node: Node | null;
    while ((node = walker.nextNode())) {
      const text = node.textContent?.trim();
      if (!text || text.length === 0) continue;

      const range = document.createRange();
      range.selectNodeContents(node);
      const rects = range.getClientRects();

      for (let i = 0; i < rects.length; i++) {
        const rect = rects[i];
        if (rect.width === 0 || rect.height === 0) continue;

        // Get computed font size
        const parent = node.parentElement;
        const fontSize = parent
          ? parseInt(window.getComputedStyle(parent).fontSize)
          : 16;

        snapshots.push({
          text: text.substring(
            Math.floor((i / rects.length) * text.length),
            Math.floor(((i + 1) / rects.length) * text.length)
          ),
          x: rect.left,
          y: rect.top + fontSize,
          fontSize: fontSize,
          scrambleProgress: 0
        });
      }
    }

    textSnapshotsRef.current = snapshots;
  };

  // Generate scrambled text
  const scrambleText = (originalText: string, progress: number): string => {
    const chars = originalText.split('');
    const scrambledCount = Math.floor(chars.length * progress);

    return chars.map((char, index) => {
      if (index < scrambledCount) {
        return Math.random() > 0.5 ? '1' : '0';
      }
      return char;
    }).join('');
  };

  // Phase 1: Scramble animation
  const animateScramble = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void => {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#fff';
    ctx.font = '16px "Courier New", monospace';

    let allScrambled = true;

    textSnapshotsRef.current.forEach((snapshot) => {
      // Randomly increase scramble progress
      if (snapshot.scrambleProgress < 1) {
        snapshot.scrambleProgress += Math.random() * 0.05;
        allScrambled = false;
      } else {
        snapshot.scrambleProgress = 1;
      }

      const displayText = scrambleText(snapshot.text, snapshot.scrambleProgress);
      ctx.font = `${snapshot.fontSize}px "Courier New", monospace`;
      ctx.fillText(displayText, snapshot.x, snapshot.y);
    });

    if (!allScrambled) {
      animationFrameRef.current = requestAnimationFrame(() => animateScramble(ctx, canvas));
    } else {
      // Move to falling phase
      setTimeout(() => {
        initializeFallingPhase();
        setPhase('falling');
      }, 500);
    }
  };

  // Phase 2: Initialize falling characters
  const initializeFallingPhase = (): void => {
    const chars: FallingChar[] = [];

    textSnapshotsRef.current.forEach((snapshot) => {
      const binaryText = scrambleText(snapshot.text, 1);
      const charWidth = snapshot.fontSize * 0.6;

      for (let i = 0; i < binaryText.length; i++) {
        chars.push({
          char: binaryText[i],
          x: snapshot.x + i * charWidth,
          y: snapshot.y,
          vy: 0, // Start with no velocity - will be activated gradually
          alpha: 1
        });
      }
    });

    fallingCharsRef.current = chars;
  };

  // Phase 2: Falling animation with cinematic waterfall effect
  const animateFalling = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, startTime?: number): void => {
    const TOTAL_DURATION = 7000; // 7 seconds
    const now = Date.now();
    const elapsed = startTime ? now - startTime : 0;
    const realStartTime = startTime || now;

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = '16px "Courier New", monospace';

    // Calculate exponential ramp-up for activation rate
    const progress = Math.min(elapsed / TOTAL_DURATION, 1);
    const activationRate = Math.pow(progress, 2); // Exponential ramp

    // Activate characters gradually
    const charsToActivate = Math.floor(fallingCharsRef.current.length * activationRate);

    fallingCharsRef.current.forEach((char, index) => {
      if (index < charsToActivate && char.vy === 0) {
        // Slow, feather-like fall velocity
        char.vy = Math.random() * 0.3 + 0.2; // Very slow initial velocity
      }
    });

    let anyVisible = false;

    fallingCharsRef.current = fallingCharsRef.current.filter((char) => {
      if (char.vy > 0) {
        char.y += char.vy;
        char.vy += 0.05; // Very gentle gravity acceleration (feather-like)
      }

      // Fade out as they approach bottom
      if (char.y > canvas.height - 150) {
        char.alpha -= 0.01;
      }

      if (char.y < canvas.height + 100 && char.alpha > 0) {
        ctx.fillStyle = `rgba(255, 255, 255, ${char.alpha})`;
        ctx.fillText(char.char, char.x, char.y);
        anyVisible = true;
        return true;
      }

      return false;
    });

    if (anyVisible || elapsed < TOTAL_DURATION) {
      animationFrameRef.current = requestAnimationFrame(() => animateFalling(ctx, canvas, realStartTime));
    } else {
      // Move to quotes phase
      setTimeout(() => {
        setPhase('quotes');
      }, 500);
    }
  };

  // Phase 3: Quotes animation with random positioning
  const animateQuotes = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void => {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const quote = quoteAnimationRef.current;
    const TYPING_SPEED = 100; // 50% slower (was 50)
    const HOLD_TIME = 5000; // 5 seconds hold
    const DELETE_SPEED = 60; // 50% slower (was 30)
    const GAP_TIME = 5000; // 5 seconds gap between quotes

    // Update animation state
    quote.timer += 16; // ~60fps

    if (quote.phase === 'typing') {
      if (quote.timer > TYPING_SPEED) {
        quote.timer = 0;
        quote.displayIndex++;

        if (quote.displayIndex >= quote.currentQuote.length) {
          quote.phase = 'holding';
          quote.timer = 0;
        }
      }
    } else if (quote.phase === 'holding') {
      if (quote.timer > HOLD_TIME) {
        quote.phase = 'deleting';
        quote.timer = 0;
      }
    } else if (quote.phase === 'deleting') {
      if (quote.timer > DELETE_SPEED) {
        quote.timer = 0;
        quote.displayIndex--;

        if (quote.displayIndex <= 0) {
          // Move to waiting phase before next quote
          quote.phase = 'waiting';
          quote.timer = 0;
        }
      }
    } else if (quote.phase === 'waiting') {
      if (quote.timer > GAP_TIME) {
        // Move to next quote after gap
        quoteIndexRef.current = (quoteIndexRef.current + 1) % FOUNDER_QUOTES.length;
        quote.currentQuote = FOUNDER_QUOTES[quoteIndexRef.current];
        quote.displayIndex = 0;
        quote.phase = 'typing';
        quote.timer = 0;
      }
    }

    // Render current text
    const displayText = quote.currentQuote.substring(0, quote.displayIndex);

    ctx.fillStyle = '#fff';
    ctx.font = '20px "Courier New", Courier, monospace';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';

    // Word wrap
    const maxWidth = Math.min(600, canvas.width * 0.6);
    const words = displayText.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    words.forEach((word) => {
      const testLine = currentLine + (currentLine ? ' ' : '') + word;
      const metrics = ctx.measureText(testLine);

      if (metrics.width > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    });

    if (currentLine) {
      lines.push(currentLine);
    }

    // Calculate random position with padding
    // Only calculate new position when starting a new quote
    if (!quoteAnimationRef.current.randomX || !quoteAnimationRef.current.randomY) {
      const padding = 50;
      const lineHeight = 30;
      const totalHeight = lines.length * lineHeight;

      quoteAnimationRef.current.randomX = padding + Math.random() * (canvas.width - maxWidth - padding * 2);
      quoteAnimationRef.current.randomY = padding + Math.random() * (canvas.height - totalHeight - padding * 2);
    }

    // Reset position when moving to next quote
    if (quote.displayIndex === 0 && quote.phase === 'typing') {
      delete quoteAnimationRef.current.randomX;
      delete quoteAnimationRef.current.randomY;

      // Calculate new random position
      const padding = 50;
      const lineHeight = 30;
      const totalHeight = lines.length * lineHeight;

      quoteAnimationRef.current.randomX = padding + Math.random() * (canvas.width - maxWidth - padding * 2);
      quoteAnimationRef.current.randomY = padding + Math.random() * (canvas.height - totalHeight - padding * 2);
    }

    // Draw lines at random position
    const lineHeight = 30;
    const startX = quoteAnimationRef.current.randomX || canvas.width / 2;
    const startY = quoteAnimationRef.current.randomY || canvas.height / 2;

    lines.forEach((line, index) => {
      ctx.fillText(line, startX, startY + index * lineHeight);
    });

    animationFrameRef.current = requestAnimationFrame(() => animateQuotes(ctx, canvas));
  };

  // Main animation loop
  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Setup
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.style.overflow = 'hidden';

    // Capture snapshots
    captureTextSnapshots();

    // Hide original content
    const originalVisibility = document.body.style.visibility;
    document.body.style.visibility = 'hidden';

    // Make canvas visible
    canvas.style.visibility = 'visible';

    // Start appropriate animation
    if (phase === 'scramble') {
      animateScramble(ctx, canvas);
    } else if (phase === 'falling') {
      animateFalling(ctx, canvas);
    } else if (phase === 'quotes') {
      quoteAnimationRef.current.currentQuote = FOUNDER_QUOTES[quoteIndexRef.current];
      quoteAnimationRef.current.displayIndex = 0;
      quoteAnimationRef.current.phase = 'typing';
      quoteAnimationRef.current.timer = 0;
      animateQuotes(ctx, canvas);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      document.body.style.visibility = originalVisibility;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, phase]);

  // Cleanup on exit
  const handleExit = (): void => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    document.body.style.overflow = '';
    document.body.style.visibility = '';

    // Reset state
    setPhase('scramble');
    textSnapshotsRef.current = [];
    fallingCharsRef.current = [];
    quoteIndexRef.current = 0;

    onExit();
  };

  if (!isActive) return null;

  return (
    <>
      {/* Full-screen canvas overlay */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 9998,
          backgroundColor: '#000',
          visibility: 'hidden'
        }}
      />

      {/* Pink exit button - always visible */}
      <div
        onClick={handleExit}
        className="fixed bottom-8 right-8 w-20 h-20 rounded-full cursor-pointer hover:scale-110 transition-transform duration-300 shadow-2xl flex items-center justify-center overflow-hidden"
        style={{
          zIndex: 2147483647,
          backgroundColor: '#E052A0',
          border: 'none'
        }}
        title="Exit Founder Mode"
      >
        <img
          src="/dubhacksnext.png"
          alt="DubHacks Next Logo"
          className="w-full h-full object-cover"
          style={{ filter: 'none' }}
        />
      </div>
    </>
  );
};

export default FounderMode;
