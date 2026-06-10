"use client";

import { CameraIcon } from "./Icons";
import Marquee from "./Marquee";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-background pt-20">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <p className="hero-fade mb-4 font-display text-sm font-semibold uppercase tracking-[0.2em] text-accent-orange md:text-base">
          yourcrashangel
        </p>

        <h1
          className="hero-fade font-display text-5xl font-bold leading-[0.95] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
          style={{ animationDelay: "0.1s" }}
        >
          JUST GOT HIT?
          <br />
          <span className="text-accent-lime">DON&apos;T PANIC.</span>
        </h1>

        <p
          className="hero-fade mt-6 max-w-xl font-body text-lg leading-relaxed text-muted md:mt-8 md:text-xl"
          style={{ animationDelay: "0.3s" }}
        >
          I&apos;m Angel — a real collision estimator in Los Angeles. I help you
          understand what&apos;s actually happening with your car and your
          insurance claim. Honest, plain English, zero sales pressure.
        </p>

        <div
          className="hero-fade mt-8 flex flex-col gap-4 sm:flex-row md:mt-10"
          style={{ animationDelay: "0.45s" }}
        >
          <a
            href="sms:+12132792992"
            className="animate-pulse-glow inline-flex items-center justify-center gap-2.5 rounded-full bg-accent-orange px-7 py-4 font-display text-base font-semibold text-background transition-transform hover:scale-105 active:scale-95 md:text-lg"
          >
            <CameraIcon className="h-5 w-5" />
            Text me a pic of the damage
          </a>
          <a
            href="#first-5"
            className="inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-border bg-transparent px-7 py-4 font-display text-base font-semibold text-foreground transition-colors hover:border-foreground/40 md:text-lg"
          >
            What do I do right now?
          </a>
        </div>
      </div>

      <div className="hero-fade" style={{ animationDelay: "0.7s" }}>
        <Marquee />
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
