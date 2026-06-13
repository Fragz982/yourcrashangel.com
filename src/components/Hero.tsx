"use client";

import { CameraIcon } from "./Icons";
import Marquee from "./Marquee";

const STATS = [
  { value: "12+", label: "Years writing estimates", accent: "text-accent-orange" },
  { value: "$0", label: "What my advice costs", accent: "text-foreground" },
  { value: "100%", label: "In your corner", accent: "text-foreground" },
];

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-background pt-20">
      {/* Full-bleed cinematic backdrop — a dark car emerging from black,
          blended into the page with layered overlays so type stays legible. */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/work/hero.jpg"
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          className="animate-slow-zoom h-full w-full object-cover object-center opacity-80"
        />
        {/* darken + left-weighted gradient for headline contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="hero-fade mb-7 flex flex-wrap gap-2">
          <span className="spec-chip bg-background/40 backdrop-blur-sm">
            Est. Los Angeles
          </span>
          <span className="spec-chip border-accent-lime/30 bg-background/40 text-accent-lime backdrop-blur-sm">
            Free — no sales pitch
          </span>
          <span className="spec-chip bg-background/40 backdrop-blur-sm">
            I-CAR logic
          </span>
        </div>

        <h1
          className="hero-fade display text-6xl text-foreground sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem]"
          style={{ animationDelay: "0.1s" }}
        >
          Just got hit?
          <br />
          <span className="text-accent-lime">Don&apos;t panic.</span>
        </h1>

        <p
          className="hero-fade mt-8 max-w-xl font-body text-lg leading-relaxed text-foreground/80 md:text-xl"
          style={{ animationDelay: "0.3s" }}
        >
          I&apos;m Angel — a real collision estimator in Los Angeles. I read
          these estimates all day. Send me a photo of the damage and I&apos;ll
          tell you, in plain English, exactly what&apos;s happening and what to
          say.
        </p>

        <div
          className="hero-fade mt-9 flex flex-col gap-4 sm:flex-row md:mt-10"
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
            className="inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-foreground/25 bg-background/30 px-7 py-4 font-display text-base font-semibold text-foreground backdrop-blur-sm transition-colors hover:border-foreground/50 md:text-lg"
          >
            What do I do right now?
          </a>
        </div>

        <div
          className="hero-fade mt-12 flex flex-wrap gap-8 border-t border-border/60 pt-7 sm:gap-12"
          style={{ animationDelay: "0.6s" }}
        >
          {STATS.map((stat) => (
            <div key={stat.label}>
              <div className={`display text-4xl ${stat.accent}`}>
                {stat.value}
              </div>
              <div className="eyebrow mt-2 text-[0.625rem] text-muted">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 hero-fade" style={{ animationDelay: "0.75s" }}>
        <Marquee />
      </div>
    </section>
  );
}
