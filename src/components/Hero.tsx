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
      {/* Cinematic ghost numeral — layered depth behind the headline */}
      <span
        aria-hidden="true"
        className="display pointer-events-none absolute -top-4 right-0 select-none text-[28vw] leading-none text-foreground/[0.03] md:right-4 md:text-[20vw]"
      >
        911
      </span>

      <div className="relative mx-auto w-full max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="hero-fade mb-7 flex flex-wrap gap-2">
          <span className="spec-chip">Est. Los Angeles</span>
          <span className="spec-chip border-accent-lime/30 text-accent-lime">
            Free — no sales pitch
          </span>
          <span className="spec-chip">I-CAR logic</span>
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
          className="hero-fade mt-8 max-w-xl font-body text-lg leading-relaxed text-muted md:text-xl"
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
            className="inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-border bg-transparent px-7 py-4 font-display text-base font-semibold text-foreground transition-colors hover:border-foreground/40 md:text-lg"
          >
            What do I do right now?
          </a>
        </div>

        {/* Stat row — Anton numbers + mono labels */}
        <div
          className="hero-fade mt-12 flex flex-wrap gap-8 border-t border-border pt-7 sm:gap-12"
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

      <div className="hero-fade" style={{ animationDelay: "0.75s" }}>
        <Marquee />
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
