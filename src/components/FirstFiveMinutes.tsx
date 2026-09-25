"use client";

import ScrollReveal from "./ScrollReveal";
import type { ComponentType } from "react";
import { CameraIcon, MessageIcon, ClipboardIcon, ShieldIcon } from "./Icons";

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

// Each step keeps its emoji in the data (it names the idea); it renders as the
// matching site SVG icon.
const SVG_FOR: Record<string, ComponentType<{ className?: string }>> = {
  "📸": CameraIcon,
  "📋": ClipboardIcon,
  "🤐": ShieldIcon,
  "💬": MessageIcon,
};

export default function FirstFiveMinutes() {
  return (
    <section id="first-5" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <ScrollReveal>
          <p className="eyebrow text-accent-orange">Right after the crash</p>
          <h2 className="mt-4 display text-4xl text-foreground sm:text-5xl md:text-6xl">
            First 5 minutes.
            <br />
            <span className="text-accent-lime">Do this.</span>
          </h2>
        </ScrollReveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 md:mt-14 lg:gap-5">
          {STEPS.map((step, i) => {
            const Svg = SVG_FOR[step.icon];
            return (
              <ScrollReveal key={step.number} delay={i * 0.1} className="h-full">
                <div className="group relative h-full rounded-[var(--radius-card)] bg-surface p-6 shadow-[var(--shadow-card)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)] md:p-8">
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <span
                      className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-inner)] bg-accent-soft text-2xl text-accent-orange"
                      role="img"
                      aria-label={step.title}
                    >
                      {Svg ? <Svg className="h-6 w-6" /> : step.icon}
                    </span>
                    <span className="rounded-full bg-accent-soft px-3 py-1.5 font-display text-xs font-bold leading-none tracking-wide text-accent-lime">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold tracking-tight text-foreground md:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 font-body text-base leading-relaxed text-muted">
                    {step.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal delay={0.4} className="mt-10 flex justify-center md:mt-12">
          <a
            href="sms:+12132792992"
            className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-accent-orange px-7 font-display text-base font-bold text-white shadow-[var(--shadow-card)] transition-[transform,background-color] duration-150 hover:bg-accent-lime active:scale-[0.97]"
          >
            <MessageIcon className="h-5 w-5" />
            Text me — it&apos;s free
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
