import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Gamepad2 } from 'lucide-react';
import InteractiveGrid from './InteractiveGrid';
import ArcadeGrid, { ArcadeState, INITIAL_ARCADE_STATE } from './ArcadeGrid';
import { useMediaQuery } from '../hooks/useMediaQuery';

type GridMode = 'drift' | 'arcade';

const MODE_KEY = 'next-grid-mode';

const readMode = (): GridMode => {
  try {
    return window.localStorage.getItem(MODE_KEY) === 'arcade' ? 'arcade' : 'drift';
  } catch {
    return 'drift';
  }
};

const writeMode = (mode: GridMode): void => {
  try {
    window.localStorage.setItem(MODE_KEY, mode);
  } catch {
    // Storage blocked: the choice just lasts for this visit
  }
};

const formatTime = (ms: number): string => {
  const seconds = ms / 1000;
  if (seconds < 60) return `${seconds.toFixed(1)}s`;
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${(seconds - minutes * 60).toFixed(1).padStart(4, '0')}`;
};

const tiles = (count: number): string => `${count} ${count === 1 ? 'tile' : 'tiles'}`;

const ArcadeHud: React.FC<{ state: ArcadeState }> = ({ state }) => {
  const [now, setNow] = useState(() => performance.now());

  // Tick the stopwatch only while the clock is running
  useEffect(() => {
    if (state.runningSince === null) return;
    setNow(performance.now());
    const interval = window.setInterval(() => setNow(performance.now()), 100);
    return () => window.clearInterval(interval);
  }, [state.runningSince]);

  const elapsed = state.elapsedMs + (state.runningSince !== null ? Math.max(0, now - state.runningSince) : 0);

  let headline: string;
  let hint: string | null;
  if (state.phase === 'ready') {
    headline = 'Catch the gold tile to start';
    hint = state.best > 0 ? `Best run: ${tiles(state.best)}` : 'Every catch speeds things up';
  } else if (state.phase === 'playing') {
    headline = `${tiles(state.score)} · ${formatTime(elapsed)}`;
    hint = state.runningSince === null ? 'Paused. Move back onto the grid.' : null;
  } else {
    headline = `Game over: ${tiles(state.score)} in ${formatTime(elapsed)}`;
    hint = `Best run: ${tiles(state.best)}. Catch a tile to go again.`;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white/90 backdrop-blur-md border-2 border-primary-200 rounded-xl shadow-lg shadow-primary-500/10 px-4 py-2 text-right"
    >
      <div className="text-sm font-semibold text-neutral-900 tabular-nums">{headline}</div>
      {hint && <div className="text-xs text-neutral-600">{hint}</div>}
    </motion.div>
  );
};

/**
 * The hero background grid plus its mode switch. "Drift" is the grid that follows the cursor;
 * "Arcade" turns it into the catch-the-tile game. Mouse-and-laptop only: the switch and the
 * game need a fine pointer and the room of the lg layout.
 */
const HeroGrid: React.FC = () => {
  const canPlay = useMediaQuery('(pointer: fine) and (min-width: 1024px)');
  const [mode, setMode] = useState<GridMode>(readMode);
  const [arcade, setArcade] = useState<ArcadeState>(INITIAL_ARCADE_STATE);
  const arcadeOn = canPlay && mode === 'arcade';

  const toggleMode = () => {
    const next: GridMode = mode === 'arcade' ? 'drift' : 'arcade';
    setMode(next);
    writeMode(next);
  };

  return (
    <>
      {arcadeOn ? <ArcadeGrid onStateChange={setArcade} /> : <InteractiveGrid />}

      {canPlay && (
        <div
          data-grid-obstacle
          className="absolute top-24 right-[max(5%,calc((100%_-_1200px)/2))] z-20 flex flex-row-reverse items-center gap-3"
        >
          <button
            type="button"
            role="switch"
            aria-checked={arcadeOn}
            onClick={toggleMode}
            className="inline-flex items-center gap-2 min-h-[44px] pl-4 pr-3 bg-white/90 backdrop-blur-md border-2 border-primary-200 rounded-full shadow-lg shadow-primary-500/10 text-sm font-medium text-neutral-700 hover:border-primary-400 hover:shadow-xl transition-all duration-300"
          >
            <Gamepad2 size={16} className="text-primary-600" />
            <span>Arcade mode</span>
            <span
              aria-hidden="true"
              className={`relative inline-block w-9 h-5 rounded-full transition-colors duration-300 ${
                arcadeOn ? 'bg-primary-600' : 'bg-neutral-300'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 ${
                  arcadeOn ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </span>
          </button>

          {arcadeOn && <ArcadeHud state={arcade} />}
        </div>
      )}
    </>
  );
};

export default HeroGrid;
