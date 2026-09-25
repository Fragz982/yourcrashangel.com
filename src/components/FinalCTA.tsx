"use client";

import ScrollReveal from "./ScrollReveal";
import { MessageIcon, PhoneIcon } from "./Icons";

export default function FinalCTA() {
  return (
    <section className="relative bg-background pb-12 md:pb-16">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="relative overflow-hidden rounded-[28px] bg-surface px-6 py-14 text-center shadow-[var(--shadow-lift)] sm:px-10 md:rounded-[32px] md:px-16 md:py-20">
          {/* One quiet hairline ring behind the headline, a nod to the
              drone's orbit: drawn with a border (no glow, no gradient), and
              only on wider screens where it clears the text. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-1/2 hidden h-[880px] w-[880px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-border md:block"
          />

          <div className="relative mx-auto max-w-3xl">
            <ScrollReveal>
              <span
                aria-hidden="true"
                className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full bg-accent-orange text-white shadow-[0_1px_2px_rgb(33_26_20/0.10),0_10px_24px_-10px_rgb(180_66_26/0.55)]"
              >
                <MessageIcon className="h-6 w-6" />
              </span>
              <p className="eyebrow text-accent-orange">Let&apos;s talk</p>
              <h2 className="mt-4 display text-4xl text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                Got hit?
                <br />
                Got questions?
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted md:text-xl">
                Text me a photo of the damage or your estimate. I&apos;ll tell you
                what&apos;s really going on.{" "}
                <strong className="text-foreground">Free.</strong>
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="sms:+12132792992"
                  className="inline-flex h-14 w-full items-center justify-center gap-2.5 rounded-full bg-accent-orange px-9 text-lg font-bold text-white shadow-[0_1px_2px_rgb(33_26_20/0.10),0_8px_20px_-10px_rgb(33_26_20/0.35)] transition-[background-color,transform] hover:bg-accent-lime active:scale-[0.97] sm:w-auto"
                >
                  <MessageIcon className="h-5 w-5" />
                  Text Me
                </a>
                <a
                  href="tel:+12132792992"
                  className="inline-flex h-14 w-full items-center justify-center gap-2.5 rounded-full bg-surface px-9 text-lg font-bold text-foreground shadow-[inset_0_0_0_1px_var(--color-border)] transition-[background-color,transform] hover:bg-surface-light active:scale-[0.97] sm:w-auto"
                >
                  <PhoneIcon className="h-5 w-5" />
                  Call Me
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="mt-6 text-sm text-muted">
                (213) 279-2992 · Text-first, but calls work too · answered
                7am&ndash;9pm, 7 days
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
