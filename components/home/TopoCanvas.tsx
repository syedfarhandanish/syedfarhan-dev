'use client';

import { useEffect, useRef } from 'react';
import { fbm } from '@/lib/noise';

/**
 * Interactive topographic map, drawn with marching squares on a noise height field.
 * The pointer raises a small "summit" under it. Lightweight 2D canvas:
 * pauses off-screen and in background tabs, and renders a single still frame
 * when the visitor prefers reduced motion.
 */
export default function TopoCanvas({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const LEVELS = 13;
    let w = 0,
      h = 0,
      cols = 0,
      rows = 0,
      cell = 16,
      dpr = 1;
    let field = new Float32Array(0);
    let t = Math.random() * 100;
    let raf = 0,
      last = 0,
      running = false,
      inView = true;
    const ptr = { x: -9999, y: -9999, tx: -9999, ty: -9999, strength: 0, target: 0 };
    let colors = { line: 'rgba(0,0,0,0.12)', strong: 'rgba(0,0,0,0.22)', accent: '#c2410c' };

    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      const rgb = cs.getPropertyValue('--topo').trim().split(/\s+/).join(',');
      const a = parseFloat(cs.getPropertyValue('--topo-alpha')) || 0.12;
      colors = {
        line: `rgba(${rgb},${a})`,
        strong: `rgba(${rgb},${Math.min(1, a * 2.1)})`,
        accent: cs.getPropertyValue('--accent').trim() || '#c2410c',
      };
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cell = w < 640 ? 18 : 15;
      cols = Math.ceil(w / cell) + 1;
      rows = Math.ceil(h / cell) + 1;
      field = new Float32Array(cols * rows);
    };

    const sample = () => {
      const scale = 0.0042;
      const r2 = Math.pow(Math.min(w, h) * 0.22, 2);
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const x = i * cell,
            y = j * cell;
          let v = fbm(x * scale, y * scale, t, 3);
          // Gentle ridge running diagonally, so it reads like a valley system.
          v += 0.08 * Math.sin((x * 0.6 + y) * 0.004 + t * 0.4);
          if (ptr.strength > 0.001) {
            const dx = x - ptr.x,
              dy = y - ptr.y;
            v += 0.22 * ptr.strength * Math.exp(-(dx * dx + dy * dy) / r2);
          }
          field[j * cols + i] = v;
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      sample();
      const lo = 0.28,
        hi = 0.86;
      for (let l = 0; l < LEVELS; l++) {
        const iso = lo + ((hi - lo) * l) / (LEVELS - 1);
        const major = l % 4 === 0;
        const accent = l === LEVELS - 3;
        ctx.beginPath();
        for (let j = 0; j < rows - 1; j++) {
          for (let i = 0; i < cols - 1; i++) {
            const a = field[j * cols + i],
              b = field[j * cols + i + 1],
              c = field[(j + 1) * cols + i + 1],
              d = field[(j + 1) * cols + i];
            let idx = 0;
            if (a > iso) idx |= 8;
            if (b > iso) idx |= 4;
            if (c > iso) idx |= 2;
            if (d > iso) idx |= 1;
            if (idx === 0 || idx === 15) continue;
            const x = i * cell,
              y = j * cell;
            // Interpolated crossing points on each edge
            const top = () => [x + cell * ((iso - a) / (b - a)), y];
            const right = () => [x + cell, y + cell * ((iso - b) / (c - b))];
            const bottom = () => [x + cell * ((iso - d) / (c - d)), y + cell];
            const left = () => [x, y + cell * ((iso - a) / (d - a))];
            const seg = (p: number[], q: number[]) => {
              ctx.moveTo(p[0], p[1]);
              ctx.lineTo(q[0], q[1]);
            };
            switch (idx) {
              case 1: case 14: seg(left(), bottom()); break;
              case 2: case 13: seg(bottom(), right()); break;
              case 3: case 12: seg(left(), right()); break;
              case 4: case 11: seg(top(), right()); break;
              case 5: seg(left(), top()); seg(bottom(), right()); break;
              case 6: case 9: seg(top(), bottom()); break;
              case 7: case 8: seg(left(), top()); break;
              case 10: seg(left(), bottom()); seg(top(), right()); break;
            }
          }
        }
        ctx.lineWidth = accent ? 1.4 : major ? 1.15 : 0.8;
        ctx.strokeStyle = accent ? colors.accent : major ? colors.strong : colors.line;
        ctx.globalAlpha = accent ? 0.75 : 1;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    };

    const frame = (now: number) => {
      raf = 0;
      if (!running) return;
      // ~30fps is plenty for slow drift and halves the work.
      if (now - last > 33) {
        const dt = Math.min(0.05, (now - last) / 1000);
        last = now;
        t += dt * 0.06;
        ptr.x += (ptr.tx - ptr.x) * 0.15;
        ptr.y += (ptr.ty - ptr.y) * 0.15;
        ptr.strength += (ptr.target - ptr.strength) * 0.08;
        draw();
      }
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (reduce || running || !inView || document.hidden) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left,
        y = e.clientY - rect.top;
      const inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
      if (ptr.x < -1000) {
        ptr.x = x;
        ptr.y = y;
      }
      ptr.tx = x;
      ptr.ty = y;
      ptr.target = inside ? 1 : 0;
    };
    const onLeave = () => (ptr.target = 0);

    readColors();
    resize();
    draw();
    start();

    const ro = new ResizeObserver(() => {
      resize();
      draw();
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) start();
      else stop();
    });
    io.observe(canvas);

    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVis);

    const mo = new MutationObserver(() => {
      readColors();
      draw();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    if (!reduce) {
      window.addEventListener('pointermove', onPointer, { passive: true });
      document.addEventListener('pointerleave', onLeave);
    }

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('pointermove', onPointer);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={`block h-full w-full ${className}`} />;
}
