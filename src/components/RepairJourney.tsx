"use client";

import ScrollReveal from "./ScrollReveal";
import { MessageIcon } from "./Icons";

const STAGES = [
  {
    n: "01",
    title: "Document",
    line: "Photos, plates, their info, the scene. Your phone is evidence — more is always better.",
  },
  {
    n: "02",
    title: "Estimate",
    line: "I read the damage and the insurer's number for what they really are — and tell you where it's light.",
  },
  {
    n: "03",
    title: "Teardown",
    line: "The shop opens it up and hidden damage surfaces. We make the supplement stick instead of eating it.",
  },
  {
    n: "04",
    title: "Repair",
    line: "Quality parts, real paint blend, no shortcuts — and you'll know exactly what to watch for at every step.",
  },
  {
    n: "05",
    title: "Delivery",
    line: "Final bill checked line-by-line against the estimate. You drive off whole — and you understood all of it.",
    accent: true,
  },
];

export default function RepairJourney() {
  return (
    <section id="journey" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <ScrollReveal>
          <p className="eyebrow text-accent-orange">The repair journey</p>
          <h2 className="display mt-4 text-4xl text-foreground sm:text-5xl md:text-6xl">
            From wreck
            <br />
            <span className="text-accent-lime">to road.</span>
          </h2>
          <p className="mt-5 max-w-xl font-body text-lg leading-relaxed text-muted">
            A claim has five stages, and there&apos;s a way to get played at
            every one. Here&apos;s the whole arc — and where I&apos;ve got your
            back through it.
          </p>
        </ScrollReveal>

        <div className="relative mt-10 grid gap-3 md:mt-14 xl:grid-cols-5 xl:gap-4">
          {/* The track: one thin line through the numbered stops. The cards
              sit on top of it, so it only shows in the gaps between them,
              linking stage to stage (down on a phone, across on a wide desktop). */}
          <span
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-10 w-0.5 -translate-x-1/2 bg-foreground/15 xl:top-11 xl:right-0 xl:bottom-auto xl:left-0 xl:h-0.5 xl:w-auto xl:translate-x-0 xl:-translate-y-1/2"
          />
          {STAGES.map((stage, i) => (
            <ScrollReveal key={stage.n} delay={i * 0.07}>
              <div
                className={`group relative flex h-full gap-4 rounded-[var(--radius-card)] p-5 xl:flex-col xl:gap-5 xl:p-6 ${
                  stage.accent
                    ? "bg-accent-soft shadow-[inset_0_0_0_1px_rgb(180_66_26/0.16),var(--shadow-card)]"
                    : "bg-surface shadow-[var(--shadow-card)]"
                }`}
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-mono text-sm font-bold tabular-nums transition-colors ${
                    stage.accent
                      ? "bg-accent-orange text-white"
                      : "bg-surface-light text-foreground group-hover:bg-accent-orange group-hover:text-white"
                  }`}
                >
                  {stage.n}
                </span>
                <div>
                  <h3
                    className={`display text-2xl xl:text-[1.625rem] ${
                      stage.accent ? "text-accent-lime" : "text-foreground"
                    }`}
                  >
                    {stage.title}
                  </h3>
                  <p className="mt-2 max-w-xl font-body text-[15px] leading-relaxed text-muted">
                    {stage.line}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.2}>
          <p className="mt-5 flex flex-col gap-4 rounded-[var(--radius-card)] bg-surface p-5 font-display text-lg font-bold tracking-tight text-foreground shadow-[var(--shadow-card)] sm:flex-row sm:items-center sm:justify-between md:mt-6 md:p-6 md:pl-8 md:text-xl">
            Stuck on any stage right now?{" "}
            <a
              href="sms:+12132792992"
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2.5 rounded-full bg-accent-orange px-7 font-display text-base font-bold tracking-normal text-white shadow-[var(--shadow-card)] transition-[transform,background-color] duration-150 hover:bg-accent-lime active:scale-[0.97]"
            >
              <MessageIcon className="h-4 w-4" />
              Text me where you are →
            </a>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
