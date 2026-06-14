"use client";

import ScrollReveal from "./ScrollReveal";

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
    line: "OEM parts, real paint blend, no shortcuts. You'll know exactly what to watch for at every step.",
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
    <section id="journey" className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <ScrollReveal>
          <p className="eyebrow text-accent-orange">The repair journey</p>
          <h2 className="display mt-4 text-5xl text-foreground sm:text-6xl md:text-7xl">
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

        <div className="mt-14">
          {STAGES.map((stage, i) => (
            <ScrollReveal key={stage.n} delay={i * 0.07}>
              <div className="group grid grid-cols-[auto_1fr] items-baseline gap-5 border-t border-border py-7 transition-colors last:border-b hover:bg-surface/40 md:grid-cols-[5rem_1fr_auto] md:gap-8 md:px-2">
                <span
                  className={`font-mono text-sm ${
                    stage.accent ? "text-accent-orange" : "text-muted"
                  } transition-colors group-hover:text-accent-orange`}
                >
                  {stage.n}
                </span>
                <div>
                  <h3
                    className={`display text-3xl md:text-4xl ${
                      stage.accent ? "text-accent-lime" : "text-foreground"
                    }`}
                  >
                    {stage.title}
                  </h3>
                  <p className="mt-2 max-w-xl font-body text-base leading-relaxed text-muted">
                    {stage.line}
                  </p>
                </div>
                <span
                  className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-muted opacity-0 transition-all group-hover:border-accent-orange/40 group-hover:text-accent-orange group-hover:opacity-100 md:flex"
                  aria-hidden="true"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-4 w-4"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.2}>
          <p className="mt-10 font-body text-sm text-muted">
            Stuck on any stage right now?{" "}
            <a
              href="sms:+12132792992"
              className="font-semibold text-accent-orange transition-colors hover:text-accent-lime"
            >
              Text me where you are →
            </a>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
