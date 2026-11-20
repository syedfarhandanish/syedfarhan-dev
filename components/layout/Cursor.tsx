'use client';

import { useEffect, useRef } from 'react';

/**
 * A small trailing ring that grows over interactive elements.
 * Desktop fine-pointer only, disabled for reduced motion. The native cursor
 * is never hidden, so clicking always behaves normally.
 */
export default function Cursor() {
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;
    document.documentElement.classList.add('has-cursor');

    let x = -100,
      y = -100,
      cx = -100,
      cy = -100,
      raf = 0,
      hovering = false,
      visible = false;

    const loop = () => {
      cx += (x - cx) * 0.22;
      cy += (y - cy) * 0.22;
      const el = ring.current;
      if (el) {
        el.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%) scale(${hovering ? 1.9 : 1})`;
        el.style.opacity = visible ? '1' : '0';
      }
      if (Math.abs(x - cx) > 0.1 || Math.abs(y - cy) > 0.1) raf = requestAnimationFrame(loop);
      else raf = 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      x = e.clientX;
      y = e.clientY;
      visible = true;
      const t = e.target as Element | null;
      hovering = !!t?.closest('a,button,[role="option"],input,select,textarea,label,[data-cursor]');
      kick();
    };
    const onLeave = () => {
      visible = false;
      kick();
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove('has-cursor');
    };
  }, []);

  return (
    <div
      ref={ring}
      aria-hidden
      className="cursor-dot pointer-events-none fixed left-0 top-0 z-[150] h-7 w-7 rounded-full border border-accent opacity-0 transition-[opacity,scale] duration-300"
      style={{ transitionProperty: 'opacity' }}
    />
  );
}
