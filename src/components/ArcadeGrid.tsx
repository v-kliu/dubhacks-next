import React, { useEffect, useRef } from 'react';
import { GRID_SPACING, GRID_LINE_COLOR } from './InteractiveGrid';

export type ArcadePhase = 'ready' | 'playing' | 'over';

export interface ArcadeState {
  phase: ArcadePhase;
  /** Tiles caught in the current (or most recent) run. */
  score: number;
  /** Best run on this browser. */
  best: number;
  /** Play time banked before the last pause, in ms. Final once the run is over. */
  elapsedMs: number;
  /** performance.now() when the clock last started, or null while paused or not playing. */
  runningSince: number | null;
}

export const INITIAL_ARCADE_STATE: ArcadeState = {
  phase: 'ready',
  score: 0,
  best: 0,
  elapsedMs: 0,
  runningSince: null
};

interface ArcadeGridProps {
  /** Called whenever the phase, score or clock changes (never every frame). */
  onStateChange: (state: ArcadeState) => void;
  className?: string;
}

const BEST_KEY = 'next-arcade-best';
// How long the first timed tile waits before it counts as missed, and how much
// faster each later tile switches. Floors at MIN_LIFETIME.
const BASE_LIFETIME = 2000;
const SPEEDUP = 0.94;
const MIN_LIFETIME = 550;
// Tiles never spawn closer than this many cells to the cursor, so none is a free catch
const MIN_SPAWN_DISTANCE = 3;
// The trail behind the cursor grows with the score, snake style, up to this many cells
const MAX_TRAIL = 14;
const POP_MS = 350;
const MISS_MS = 700;

const PINK = '236, 72, 153';
const GOLD = '245, 158, 11';
const RED = '225, 29, 72';

interface Cell {
  cx: number;
  cy: number;
}

interface Target extends Cell {
  spawnedAt: number;
  /** ms before the tile is missed; Infinity for the start tile */
  lifetime: number;
  pausedAt: number | null;
}

const sameCell = (a: Cell | null, b: Cell | null): boolean =>
  a !== null && b !== null && a.cx === b.cx && a.cy === b.cy;

const lifetimeFor = (score: number): number =>
  Math.max(MIN_LIFETIME, BASE_LIFETIME * Math.pow(SPEEDUP, score));

const readBest = (): number => {
  try {
    return Number(window.localStorage.getItem(BEST_KEY)) || 0;
  } catch {
    return 0;
  }
};

const writeBest = (best: number): void => {
  try {
    window.localStorage.setItem(BEST_KEY, String(best));
  } catch {
    // Private mode or blocked storage: the best score just lives for this visit
  }
};

/**
 * The hero grid as a catch-the-tile game. The cell under the cursor is a pink block that
 * leaves a growing trail; a gold tile appears somewhere on the grid, and hovering it scores
 * a point and spawns the next one. Every catch shortens the time before a tile is missed.
 * A missed tile ends the run; catching the next tile starts a fresh one.
 *
 * Elements marked `data-grid-obstacle` (cards, badges, the nav) are never used for spawns,
 * so tiles are always visible.
 */
const ArcadeGrid: React.FC<ArcadeGridProps> = ({ onStateChange, className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onStateChangeRef = useRef(onStateChange);
  onStateChangeRef.current = onStateChange;

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !host || !ctx) return;

    const S = GRID_SPACING;
    let width = 0;
    let height = 0;
    let frame = 0;

    const game = {
      phase: 'ready' as ArcadePhase,
      score: 0,
      best: readBest(),
      elapsedMs: 0,
      runningSince: null as number | null,
      cursor: null as Cell | null,
      trail: [] as Cell[],
      target: null as Target | null,
      pops: [] as Array<Cell & { at: number }>,
      miss: null as (Cell & { at: number }) | null
    };

    const publish = () => {
      onStateChangeRef.current({
        phase: game.phase,
        score: game.score,
        best: game.best,
        elapsedMs: game.elapsedMs,
        runningSince: game.runningSince
      });
    };

    const trailLength = () => Math.min(MAX_TRAIL, 2 + game.score);

    // Cells covered by content boxes, so a tile never hides behind a card
    const blockedCells = (): Set<string> => {
      const hostRect = host.getBoundingClientRect();
      const blocked = new Set<string>();
      document.querySelectorAll<HTMLElement>('[data-grid-obstacle]').forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;
        const left = rect.left - hostRect.left;
        const top = rect.top - hostRect.top;
        const firstCol = Math.floor(left / S);
        const lastCol = Math.floor((left + rect.width - 1) / S);
        const firstRow = Math.floor(top / S);
        const lastRow = Math.floor((top + rect.height - 1) / S);
        for (let cx = firstCol; cx <= lastCol; cx++) {
          for (let cy = firstRow; cy <= lastRow; cy++) {
            blocked.add(`${cx},${cy}`);
          }
        }
      });
      return blocked;
    };

    const spawn = (now: number, lifetime: number) => {
      const cols = Math.floor(width / S);
      const rows = Math.floor(height / S);
      const blocked = blockedCells();
      const candidates: Cell[] = [];
      for (let cx = 0; cx < cols; cx++) {
        for (let cy = 0; cy < rows; cy++) {
          if (blocked.has(`${cx},${cy}`)) continue;
          if (game.cursor && Math.abs(cx - game.cursor.cx) + Math.abs(cy - game.cursor.cy) < MIN_SPAWN_DISTANCE) continue;
          if (game.trail.some((cell) => cell.cx === cx && cell.cy === cy)) continue;
          candidates.push({ cx, cy });
        }
      }
      const pick =
        candidates.length > 0
          ? candidates[Math.floor(Math.random() * candidates.length)]
          : { cx: Math.floor(cols / 2), cy: Math.floor(rows / 2) };
      game.target = { ...pick, spawnedAt: now, lifetime, pausedAt: null };
    };

    const pause = (now: number) => {
      if (game.phase !== 'playing' || game.runningSince === null) return;
      game.elapsedMs += now - game.runningSince;
      game.runningSince = null;
      if (game.target) game.target.pausedAt = now;
      publish();
    };

    const resume = (now: number) => {
      if (game.phase !== 'playing' || game.runningSince !== null) return;
      game.runningSince = now;
      if (game.target && game.target.pausedAt !== null) {
        game.target.spawnedAt += now - game.target.pausedAt;
        game.target.pausedAt = null;
      }
      publish();
    };

    const catchTile = (target: Target, now: number) => {
      game.pops.push({ cx: target.cx, cy: target.cy, at: now });
      if (game.phase === 'playing') {
        game.score += 1;
      } else {
        // The start tile: begin a fresh run
        game.phase = 'playing';
        game.score = 0;
        game.elapsedMs = 0;
        game.runningSince = now;
        game.miss = null;
      }
      spawn(now, lifetimeFor(game.score));
      publish();
    };

    const missTile = (target: Target, now: number) => {
      game.miss = { cx: target.cx, cy: target.cy, at: now };
      game.phase = 'over';
      if (game.runningSince !== null) {
        game.elapsedMs += now - game.runningSince;
        game.runningSince = null;
      }
      if (game.score > game.best) {
        game.best = game.score;
        writeBest(game.best);
      }
      spawn(now, Infinity);
      publish();
    };

    const fillCell = (cell: Cell, color: string, scale = 1) => {
      const size = (S - 2) * scale;
      const offset = (S - size) / 2;
      ctx.fillStyle = color;
      ctx.fillRect(cell.cx * S + offset, cell.cy * S + offset, size, size);
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, width, height);

      ctx.strokeStyle = GRID_LINE_COLOR;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0.5; x <= width; x += S) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0.5; y <= height; y += S) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      game.trail.forEach((cell, index) => {
        const alpha = 0.1 + 0.5 * ((index + 1) / game.trail.length);
        fillCell(cell, `rgba(${PINK}, ${alpha})`);
      });
      if (game.cursor) fillCell(game.cursor, `rgba(${PINK}, 0.85)`);

      if (game.target) {
        const { target } = game;
        const clock = target.pausedAt ?? now;
        const remaining = Number.isFinite(target.lifetime)
          ? Math.max(0, 1 - (clock - target.spawnedAt) / target.lifetime)
          : 1;
        const pulse = game.phase === 'playing' ? 1 : 0.8 + 0.2 * Math.sin(now / 180);
        fillCell(target, `rgba(${GOLD}, 0.25)`);
        fillCell(target, `rgb(${GOLD})`, Math.max(0.15, remaining) * pulse);
      }

      for (const pop of game.pops) {
        const progress = (now - pop.at) / POP_MS;
        const grow = progress * S * 0.6;
        ctx.strokeStyle = `rgba(${GOLD}, ${1 - progress})`;
        ctx.lineWidth = 2;
        ctx.strokeRect(pop.cx * S - grow, pop.cy * S - grow, S + grow * 2, S + grow * 2);
      }

      if (game.miss) {
        const progress = (now - game.miss.at) / MISS_MS;
        fillCell(game.miss, `rgba(${RED}, ${0.7 * (1 - progress)})`);
      }
    };

    const tick = () => {
      const now = performance.now();
      const { target } = game;
      if (game.phase === 'playing' && game.runningSince !== null && target && now - target.spawnedAt > target.lifetime) {
        missTile(target, now);
      }
      game.pops = game.pops.filter((pop) => now - pop.at < POP_MS);
      if (game.miss && now - game.miss.at > MISS_MS) game.miss = null;
      draw(now);
      frame = window.requestAnimationFrame(tick);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      const now = performance.now();
      const cell = {
        cx: Math.floor((event.clientX - rect.left) / S),
        cy: Math.floor((event.clientY - rect.top) / S)
      };
      resume(now);
      if (!sameCell(cell, game.cursor)) {
        game.cursor = cell;
        game.trail = [...game.trail.filter((past) => !sameCell(past, cell)), cell].slice(-trailLength());
      }
      if (game.target && sameCell(cell, game.target)) catchTile(game.target, now);
    };

    const onPointerLeave = () => {
      game.cursor = null;
      pause(performance.now());
    };

    const onVisibilityChange = () => {
      if (document.hidden) pause(performance.now());
    };

    const resize = () => {
      const rect = host.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const { target } = game;
      if (target && (target.cx >= Math.floor(width / S) || target.cy >= Math.floor(height / S))) {
        spawn(performance.now(), target.lifetime);
      }
    };

    const observer = new ResizeObserver(resize);
    observer.observe(host);
    resize();
    spawn(performance.now(), Infinity);
    publish();
    frame = window.requestAnimationFrame(tick);

    host.addEventListener('pointermove', onPointerMove);
    host.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      host.removeEventListener('pointermove', onPointerMove);
      host.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full pointer-events-none z-0 ${className}`}
    />
  );
};

export default ArcadeGrid;
