"use client";

import ScrollReveal from "./ScrollReveal";

export default function About() {
  return (
    <section id="about" className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <ScrollReveal direction="left">
            <figure className="mx-auto w-full max-w-md">
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-surface">
                {/* Real work, not a stock face — a front-end rebuild Angel
                    estimated, mid-teardown. Swap for his headshot when ready. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/work/real-repairs/job1-during.jpg"
                  alt="A front-end rebuild Angel estimated — mid-teardown at the shop"
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <figcaption className="mt-2 font-mono text-xs uppercase tracking-wider text-muted">
                One of mine — the Jetta from the gallery, mid-rebuild
              </figcaption>
            </figure>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <p className="eyebrow text-accent-orange">Why trust me?</p>
            <h2 className="mt-4 display text-5xl text-foreground sm:text-6xl">
              I&apos;m Angel.
            </h2>
            <div className="mt-6 space-y-4 font-body text-base leading-relaxed text-muted md:text-lg">
              <p>
                I write collision estimates for a living. I see what shops
                charge, what insurers approve, and where people get screwed in
                between. Every single day.
              </p>
              <p>
                I started @yourcrashangel because I kept watching friends, family,
                and strangers make the same expensive mistakes — signing things
                too fast, trusting the wrong shop, accepting lowball offers —
                because nobody explained what was happening in plain English.
              </p>
              <p>
                I&apos;m not selling you a repair. I&apos;m not an attorney.
                I&apos;m not your adjuster. I&apos;m just a person who reads
                estimates all day and will tell you the truth about yours.{" "}
                <span className="text-foreground font-semibold">For free.</span>
              </p>
            </div>

            <div className="mt-8">
              <a
                href="#get-help"
                className="inline-flex items-center rounded-full bg-accent-orange px-6 py-3 font-display text-sm font-semibold text-background transition-transform hover:scale-105 active:scale-95"
              >
                Tell me what happened →
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
