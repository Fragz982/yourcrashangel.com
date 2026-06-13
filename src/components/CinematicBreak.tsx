"use client";

import ScrollReveal from "./ScrollReveal";
import { MessageIcon } from "./Icons";

// Full-bleed cinematic stage — edge-to-edge dark photography with one bold
// statement overlaid. The Gunther rhythm: let an image own the viewport.
export default function CinematicBreak() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-background">
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/work/stage.jpg"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 md:px-8">
        <ScrollReveal>
          <p className="eyebrow text-accent-orange">Before you sign anything</p>
          <h2 className="mt-4 display text-5xl text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
            Know what it&apos;s
            <br />
            <span className="text-accent-lime">really worth.</span>
          </h2>
          <p className="mt-6 max-w-lg font-body text-lg leading-relaxed text-foreground/80">
            One photo of the estimate or the damage. I&apos;ll tell you where
            it&apos;s light, what they owe you, and exactly what to say back.
            Free, no strings.
          </p>
          <a
            href="sms:+12132792992"
            className="mt-9 inline-flex items-center gap-2.5 rounded-full bg-accent-orange px-7 py-4 font-display text-base font-semibold text-background transition-transform hover:scale-105 active:scale-95 md:text-lg"
          >
            <MessageIcon className="h-5 w-5" />
            Text me before you sign
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
