"use client";

import ScrollReveal from "./ScrollReveal";
import {
  MessageIcon,
  PhoneIcon,
  TikTokIcon,
  InstagramIcon,
  YouTubeIcon,
} from "./Icons";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-background py-24 md:py-32">
      <div className="pointer-events-none absolute top-0 left-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-orange/5 blur-[120px]" />

      <div className="relative mx-auto max-w-4xl px-5 text-center md:px-8">
        <ScrollReveal>
          <p className="eyebrow text-accent-orange">Let&apos;s talk</p>
          <h2 className="mt-5 display text-5xl text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
            Got hit?
            <br />
            Got questions?
          </h2>
          <p className="mx-auto mt-6 max-w-xl font-body text-lg leading-relaxed text-muted md:text-xl">
            Text me a photo of the damage or your estimate. I&apos;ll tell you
            what&apos;s really going on.{" "}
            <strong className="text-foreground">Free.</strong>
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="sms:+12132792992"
              className="animate-pulse-glow inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-accent-orange px-8 py-4 font-display text-lg font-semibold text-background transition-transform hover:scale-105 active:scale-95 sm:w-auto"
            >
              <MessageIcon className="h-5 w-5" />
              Text Me
            </a>
            <a
              href="tel:+12132792992"
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-full border-2 border-border px-8 py-4 font-display text-lg font-semibold text-foreground transition-all hover:scale-105 hover:border-foreground/30 active:scale-95 sm:w-auto"
            >
              <PhoneIcon className="h-5 w-5" />
              Call Me
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <p className="mt-6 font-body text-sm text-muted">
            (213) 279-2992 · Text-first, but calls work too
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <a
              href="https://tiktok.com/@yourcrashangel"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-surface text-muted transition-colors hover:bg-accent-orange hover:text-background"
              aria-label="TikTok"
            >
              <TikTokIcon className="h-5 w-5" />
            </a>
            <a
              href="https://instagram.com/yourcrashangel"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-surface text-muted transition-colors hover:bg-accent-orange hover:text-background"
              aria-label="Instagram"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a
              href="https://youtube.com/@yourcrashangel"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-surface text-muted transition-colors hover:bg-accent-orange hover:text-background"
              aria-label="YouTube"
            >
              <YouTubeIcon className="h-5 w-5" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
