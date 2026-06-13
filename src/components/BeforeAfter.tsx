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
            className="relative aspect-[16/10] w-full max-w-4xl cursor-col-resize overflow-hidden rounded-2xl border border-border sm:aspect-[16/9]"
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
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft")
                setPosition((p) => Math.max(0, p - 2));
              if (e.key === "ArrowRight")
                setPosition((p) => Math.min(100, p + 2));
            }}
          >
            {/* AFTER (right/full) */}
            <div className="absolute inset-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1708805282706-f44730b7e527?w=1200&q=80&auto=format&fit=crop"
                alt="Car after professional repair — clean, polished finish"
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* BEFORE (left/clipped) */}
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1673187139612-6bf684a74815?w=1200&q=80&auto=format&fit=crop"
                alt="Car with collision damage before repair"
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* Slider handle */}
            <div
              className="absolute top-0 bottom-0 z-10 w-0.5 bg-foreground"
              style={{ left: `${position}%` }}
            >
              <div className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-foreground bg-background shadow-lg">
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
