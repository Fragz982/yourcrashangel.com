"use client";

import ScrollReveal from "./ScrollReveal";
import { MessageIcon } from "./Icons";

const STEPS = [
  {
    number: "01",
    title: "Shoot everything",
    description:
      "Photos and video of all vehicles, plates, damage, the scene, street signs, and the other driver's insurance card. More is better. Your phone is evidence.",
    icon: "📸",
  },
  {
    number: "02",
    title: "Get their info",
    description:
      "Name, phone, insurance company, policy number, driver's license. If there are witnesses, grab their numbers too. Don't rely on a police report alone.",
    icon: "📋",
  },
  {
    number: "03",
    title: "Don't admit fault",
    description:
      "Be polite but don't apologize, don't say \"it was my fault,\" and don't speculate about what happened. That's for insurance to determine, not the side of the road.",
    icon: "🤐",
  },
  {
    number: "04",
    title: "Text me before you commit",
    description:
      "Before you agree to anything — a shop, a rental, a settlement — text me. I'll tell you if it's a good deal or if you're getting played. Free, no strings.",
    icon: "💬",
  },
];

export default function FirstFiveMinutes() {
  return (
    <section id="first-5" className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <ScrollReveal>
          <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-accent-orange">
            Right after the crash
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            First 5 minutes.
            <br />
            <span className="text-accent-lime">Do this.</span>
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:gap-8">
          {STEPS.map((step, i) => (
            <ScrollReveal key={step.number} delay={i * 0.1}>
              <div className="group relative h-full rounded-2xl border border-border bg-surface p-8 transition-colors hover:border-accent-orange/30 md:p-10">
                <div className="mb-6 flex items-center gap-4">
                  <span className="font-display text-4xl font-bold text-border transition-colors group-hover:text-accent-orange/40">
                    {step.number}
                  </span>
                  <span className="text-3xl" role="img" aria-label={step.title}>
                    {step.icon}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-foreground md:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-3 font-body text-base leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.4} className="mt-12 flex justify-center">
          <a
            href="sms:+12132792992"
            className="inline-flex items-center gap-2 rounded-full bg-accent-orange px-6 py-3.5 font-display text-base font-semibold text-background transition-transform hover:scale-105 active:scale-95"
          >
            <MessageIcon className="h-4 w-4" />
            Text me — it&apos;s free
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
