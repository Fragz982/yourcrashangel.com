"use client";

import ScrollReveal from "./ScrollReveal";
import { TikTokIcon, InstagramIcon, YouTubeIcon } from "./Icons";

export default function About() {
  return (
    <section id="about" className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <ScrollReveal direction="left">
            <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-2xl border border-border bg-surface">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1559366682-b24d010f6d65?w=800&q=80&auto=format&fit=crop"
                alt="Angel — yourcrashangel"
                className="h-full w-full object-cover"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-accent-orange">
              Why trust me?
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
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

            <div className="mt-8 flex items-center gap-4">
              <a
                href="https://tiktok.com/@yourcrashangel"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-surface text-muted transition-colors hover:bg-accent-orange hover:text-background"
                aria-label="TikTok"
              >
                <TikTokIcon className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/yourcrashangel"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-surface text-muted transition-colors hover:bg-accent-orange hover:text-background"
                aria-label="Instagram"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com/@yourcrashangel"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-surface text-muted transition-colors hover:bg-accent-orange hover:text-background"
                aria-label="YouTube"
              >
                <YouTubeIcon className="h-5 w-5" />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
