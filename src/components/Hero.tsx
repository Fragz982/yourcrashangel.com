"use client";

import { CameraIcon } from "./Icons";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-background pt-20">
      {/* Soft guardian light — warm glow like light breaking through, calm and
          reassuring rather than dramatic. Decorative only. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute -top-32 left-1/2 h-[480px] w-[760px] -translate-x-1/2"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255,184,92,0.30), rgba(255,184,92,0) 70%)",
          }}
        />
        <div
          className="absolute -top-20 right-0 h-[420px] w-[420px]"
          style={{
            background:
              "radial-gradient(circle at center, rgba(255,255,255,0.7), rgba(255,255,255,0) 70%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="hero-fade mb-6 flex items-center gap-3">
          <span className="eyebrow text-accent-orange">Your crash angel</span>
          <span className="eyebrow text-muted">Los Angeles</span>
        </div>

        <h1
          className="hero-fade display text-6xl text-foreground sm:text-7xl md:text-8xl lg:text-9xl"
          style={{ animationDelay: "0.1s" }}
        >
          Just got hit?
          <br />
          <span className="text-accent-orange">Take a breath.</span>
        </h1>

        <p
          className="hero-fade mt-8 max-w-xl font-body text-lg leading-relaxed text-muted md:text-xl"
          style={{ animationDelay: "0.3s" }}
        >
          I&apos;m Angel — a real collision estimator in LA, and I&apos;ll guide
          you through the whole thing: the damage, the estimate, the insurance
          games. Calm, honest, and always free. You&apos;re not doing this
          alone.
        </p>

        <div
          className="hero-fade mt-9 flex flex-col gap-4 sm:flex-row md:mt-10"
          style={{ animationDelay: "0.45s" }}
        >
          <a
            href="sms:+12132792992"
            className="inline-flex items-center justify-center gap-2.5 rounded-full bg-accent-orange px-7 py-4 font-display text-base font-semibold text-background transition-transform hover:scale-105 active:scale-95 md:text-lg"
          >
            <CameraIcon className="h-5 w-5" />
            Text me a pic of the damage
          </a>
          <a
            href="#first-5"
            className="inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-border bg-transparent px-7 py-4 font-display text-base font-semibold text-foreground transition-colors hover:border-foreground/30 md:text-lg"
          >
            What do I do right now?
          </a>
        </div>

        <div
          className="hero-fade mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border pt-7"
          style={{ animationDelay: "0.6s" }}
        >
          <span className="eyebrow text-[0.7rem] text-muted">Free — always</span>
          <span className="eyebrow text-[0.7rem] text-accent-lime">
            No sales pitch
          </span>
          <span className="eyebrow text-[0.7rem] text-muted">
            A real human, same day
          </span>
        </div>
      </div>
    </section>
  );
}
