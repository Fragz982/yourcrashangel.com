"use client";

import { useState, useRef, useCallback } from "react";
import ScrollReveal from "./ScrollReveal";

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
    <section id="before-after" className="bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <ScrollReveal>
          <p className="eyebrow text-accent-orange">The difference</p>
          <h2 className="mt-4 display text-5xl text-foreground sm:text-6xl md:text-7xl">
            Before &amp; After.
          </h2>
          <p className="mt-4 max-w-xl font-body text-lg text-muted">
            Drag the slider to see the difference a proper repair makes — clean
            panel gaps, real paint blend, like the hit never happened.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2} className="mt-12">
          <div
            ref={containerRef}
            className="relative aspect-[16/10] w-full max-w-4xl cursor-col-resize touch-pan-y overflow-hidden rounded-2xl border border-border sm:aspect-[16/9]"
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
                alt="Black car restored to a flawless, glossy finish after repair"
                className="h-full w-full object-cover"
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
                alt="Black coupe with heavy front-end collision damage before repair"
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Slider handle */}
            <div
              className="absolute top-0 bottom-0 z-10 w-0.5 bg-foreground"
              style={{ left: `${position}%` }}
            >
              <div className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-foreground bg-background shadow-lg">
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
            <span className="spec-chip absolute bottom-4 left-4 bg-background/80 text-foreground backdrop-blur-sm">
              Before
            </span>
            <span className="spec-chip absolute bottom-4 right-4 bg-background/80 text-foreground backdrop-blur-sm">
              After
            </span>
          </div>

          <p className="mt-4 text-center font-body text-sm text-muted">
            ← Drag to compare →
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
