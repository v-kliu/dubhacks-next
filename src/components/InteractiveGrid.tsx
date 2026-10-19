import React, { useEffect, useRef } from 'react';

interface InteractiveGridProps {
  /** Extra classes for the canvas, e.g. an opacity utility. */
  className?: string;
}

// Same cell size and line colour as the static .grid-overlay in index.css
export const GRID_SPACING = 60;
export const GRID_LINE_COLOR = 'rgba(236, 72, 153, 0.1)';
// Distance between points along each line; smaller bends more smoothly near the cursor
const SEGMENT = 10;
// How far from the cursor the lines get pulled, and how hard at the centre
const PINCH_RADIUS = 240;
const PINCH_STRENGTH = 22;
// How far the whole grid slides toward the cursor
const DRIFT = 16;
// Fraction of the remaining distance covered each frame: lower is a slower, lazier follow
const EASE = 0.05;

/**
 * A pink grid that drifts toward the cursor and pinches in around it.
 * Drop it inside a `relative` section; it fills the section and ignores pointer events.
 * Static on touch screens and for users who prefer reduced motion.
 */
const InteractiveGrid: React.FC<InteractiveGridProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !host || !ctx) return;

    const interactive =
      window.matchMedia('(pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let frame = 0;
    let running = false;

    // Where the cursor is now, and where the effect has eased to so far
    const target = { x: 0, y: 0, inside: false };
    const cursor = { x: 0, y: 0, pull: 0 }; // pull fades the pinch in (1) and out (0)
    const drift = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const pullToward = (x: number, y: number): [number, number] => {
      if (cursor.pull < 0.001) return [x, y];
      const dx = cursor.x - x;
      const dy = cursor.y - y;
      const dist2 = dx * dx + dy * dy;
      const falloff = Math.exp(-dist2 / (PINCH_RADIUS * PINCH_RADIUS));
      if (falloff < 0.002) return [x, y];
      const dist = Math.sqrt(dist2) || 1;
      const amount = falloff * PINCH_STRENGTH * cursor.pull;
      return [x + (dx / dist) * amount, y + (dy / dist) * amount];
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = GRID_LINE_COLOR;
      ctx.lineWidth = 1;
      ctx.beginPath();

      // Slide the grid origin by the drift, wrapping so lines always cover the edges.
      // The +0.5 keeps undisturbed 1px lines crisp.
      const offsetX = (((drift.x % GRID_SPACING) + GRID_SPACING) % GRID_SPACING) + 0.5;
      const offsetY = (((drift.y % GRID_SPACING) + GRID_SPACING) % GRID_SPACING) + 0.5;

      for (let x = offsetX - GRID_SPACING; x <= width + GRID_SPACING; x += GRID_SPACING) {
        for (let y = 0; y <= height + SEGMENT; y += SEGMENT) {
          const [px, py] = pullToward(x, Math.min(y, height));
          if (y === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
      }
      for (let y = offsetY - GRID_SPACING; y <= height + GRID_SPACING; y += GRID_SPACING) {
        for (let x = 0; x <= width + SEGMENT; x += SEGMENT) {
          const [px, py] = pullToward(Math.min(x, width), y);
          if (x === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
      }
      ctx.stroke();
    };

    const settled = () =>
      !target.inside &&
      cursor.pull < 0.001 &&
      Math.abs(drift.targetX - drift.x) < 0.05 &&
      Math.abs(drift.targetY - drift.y) < 0.05;

    const tick = () => {
      cursor.x += (target.x - cursor.x) * EASE;
      cursor.y += (target.y - cursor.y) * EASE;
      cursor.pull += ((target.inside ? 1 : 0) - cursor.pull) * EASE;
      drift.x += (drift.targetX - drift.x) * EASE;
      drift.y += (drift.targetY - drift.y) * EASE;
      draw();
      if (settled()) {
        running = false;
        return;
      }
      frame = window.requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      frame = window.requestAnimationFrame(tick);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      target.x = event.clientX - rect.left;
      target.y = event.clientY - rect.top;
      if (!target.inside) {
        // Entering the section: start the pinch under the cursor instead of sliding in from the corner
        cursor.x = target.x;
        cursor.y = target.y;
        target.inside = true;
      }
      drift.targetX = (target.x / width - 0.5) * 2 * DRIFT;
      drift.targetY = (target.y / height - 0.5) * 2 * DRIFT;
      start();
    };

    const onPointerLeave = () => {
      target.inside = false;
      start();
    };

    const resize = () => {
      const rect = host.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(host);
    resize();

    if (interactive) {
      host.addEventListener('pointermove', onPointerMove);
      host.addEventListener('pointerleave', onPointerLeave);
    }

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      host.removeEventListener('pointermove', onPointerMove);
      host.removeEventListener('pointerleave', onPointerLeave);
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

export default InteractiveGrid;
