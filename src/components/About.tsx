"use client";

import ScrollReveal from "./ScrollReveal";

export default function About() {
  return (
    <section id="about" className="overflow-x-clip bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-center gap-8 overflow-hidden rounded-[var(--radius-card)] bg-surface p-3 shadow-[var(--shadow-card)] sm:p-4 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-4 lg:gap-8">
          <ScrollReveal direction="left">
            <figure className="w-full">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[18px] bg-surface-light md:aspect-square">
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
              <figcaption className="mt-3 px-2 font-body text-[0.8rem] font-medium leading-snug text-muted">
                One of mine — the Jetta from the gallery, mid-rebuild
              </figcaption>
            </figure>
          </ScrollReveal>

          <ScrollReveal direction="right" className="px-3 pb-5 sm:px-5 md:py-8 md:pl-4 md:pr-10 lg:pr-14">
            <p className="eyebrow text-accent-orange">Why trust me?</p>
            <h2 className="mt-3 display text-5xl text-foreground md:text-6xl">
              I&apos;m Angel.
            </h2>
            <div className="mt-6 space-y-4 font-body text-base leading-relaxed text-muted md:text-[1.075rem]">
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
                className="inline-flex h-12 items-center rounded-full bg-accent-orange px-6 font-display text-base font-bold text-white shadow-[0_1px_2px_rgb(33_26_20/0.10),0_8px_20px_-10px_rgb(33_26_20/0.35)] transition-[background-color,transform] hover:bg-accent-lime active:scale-[0.97]"
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
