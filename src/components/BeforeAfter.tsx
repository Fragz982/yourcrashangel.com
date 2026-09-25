"use client";

import { useState, useRef, useCallback } from "react";

// The drag-to-compare photo card. It lives inside the "Real cars. Real
// repairs." section (RealRepairs.tsx), next to the words that explain it.
export default function BeforeAfter() {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.min(100, Math.max(0, (x / rect.width) * 100));
    setPosition(pct);
  }, []);

  const handleMouseDown = useCallback(() => {
    isDragging.current = true;
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging.current) return;
      updatePosition(e.clientX);
    },
    [updatePosition]
  );

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      updatePosition(e.touches[0].clientX);
    },
    [updatePosition]
  );

  return (
    // The photo sits in a white frame, like a card in his apps. 4:3 is the
    // photos' own shape, so nothing gets cropped or stretched.
    <div className="rounded-[var(--radius-card)] bg-surface p-2 shadow-[var(--shadow-lift)] sm:p-2.5">
      <div
        ref={containerRef}
        className="relative aspect-[4/3] w-full cursor-col-resize touch-pan-y select-none overflow-hidden rounded-[var(--radius-inner)] bg-surface-light"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchMove={handleTouchMove}
        role="slider"
        aria-label="Before and after comparison slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        aria-valuetext={`${Math.round(position)}% — showing the repaired result`}
        tabIndex={0}
        onKeyDown={(e) => {
          // The slider owns these keys; without preventDefault the page
          // scrolls too (Home jumps to the top, End to the footer).
          if (!["ArrowLeft", "ArrowDown", "ArrowRight", "ArrowUp", "Home", "End"].includes(e.key)) return;
          e.preventDefault();
          if (e.key === "ArrowLeft" || e.key === "ArrowDown")
            setPosition((p) => Math.max(0, p - 2));
          if (e.key === "ArrowRight" || e.key === "ArrowUp")
            setPosition((p) => Math.min(100, p + 2));
          if (e.key === "Home") setPosition(0);
          if (e.key === "End") setPosition(100);
        }}
      >
        {/* AFTER (right/full) */}
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/work/after.jpg"
            alt="Gray Kia Forte fully repaired — straight panels and factory-fresh paint"
            className="pointer-events-none h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* BEFORE (left/clipped) */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/work/before.jpg"
            alt="Gray Kia Forte with driver-side and rear collision damage, as it arrived"
            className="pointer-events-none h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Slider handle */}
        <div
          className="absolute top-0 bottom-0 z-10 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgb(29_26_23/0.14)]"
          style={{ left: `${position}%` }}
        >
          <div className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-foreground shadow-[var(--shadow-lift)] ring-1 ring-black/5">
            <svg
              className="h-4 w-4 text-foreground"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <path d="M8 4l-6 8 6 8M16 4l6 8-6 8" />
            </svg>
          </div>
        </div>

        {/* Labels */}
        <span className="absolute bottom-3 left-3 z-20 rounded-full bg-white/90 px-3 py-1.5 font-display text-xs font-bold text-foreground shadow-[var(--shadow-card)] backdrop-blur-sm sm:bottom-4 sm:left-4">
          Before
        </span>
        <span className="absolute bottom-3 right-3 z-20 rounded-full bg-white/90 px-3 py-1.5 font-display text-xs font-bold text-foreground shadow-[var(--shadow-card)] backdrop-blur-sm sm:bottom-4 sm:right-4">
          After
        </span>
      </div>

      <p className="py-3 text-center font-body text-sm font-medium text-muted sm:py-3.5">
        ← Drag to compare →
      </p>
    </div>
  );
}
