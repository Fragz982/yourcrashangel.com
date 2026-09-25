"use client";

import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import { CameraIcon, CheckIcon } from "./Icons";

const STEPS = [
  { n: "01", label: "Scan your VIN", hint: "Camera pulls up your exact car" },
  { n: "02", label: "Show the damage", hint: "Tap what's hit, add photos" },
  { n: "03", label: "Get your ballpark", hint: "A real range in ~30 seconds" },
];

export default function EstimateCTA() {
  return (
    <section id="cost-tool" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <ScrollReveal>
          <div className="overflow-hidden rounded-[var(--radius-card)] bg-surface p-3 shadow-[var(--shadow-card)] md:p-4">
            <div className="grid items-center gap-6 md:grid-cols-[1.1fr_1fr] md:gap-10">
              <div className="px-3 pb-2 pt-5 md:py-10 md:pl-10 md:pr-0">
                <p className="eyebrow text-accent-orange">Free instant tool</p>
                <h2 className="mt-4 display text-4xl text-foreground sm:text-5xl md:text-6xl">
                  What&apos;s it
                  <br />
                  <span className="text-accent-lime">gonna cost?</span>
                </h2>
                <p className="mt-5 max-w-md font-body text-lg leading-relaxed text-muted">
                  Scan your VIN, show me the damage, and get a rough ballpark in
                  about 30 seconds — then the honest truth about what to do next.
                  No sign-up, nothing stored.
                </p>
                <Link
                  href="/estimate"
                  className="mt-8 inline-flex min-h-14 w-full items-center justify-center gap-2.5 rounded-full bg-accent-orange px-8 font-display text-base font-bold text-white shadow-[var(--shadow-card)] transition-[transform,background-color] duration-150 hover:bg-accent-lime active:scale-[0.97] sm:w-auto md:text-lg"
                >
                  <CameraIcon className="h-5 w-5" />
                  Get my ballpark
                </Link>
              </div>

              <ol className="flex flex-col gap-2.5 rounded-[var(--radius-inner)] bg-surface-light p-2.5 md:gap-3 md:self-stretch md:justify-center md:p-5">
                {STEPS.map((s) => (
                  <li
                    key={s.n}
                    className="flex items-center gap-4 rounded-[var(--radius-inner)] bg-surface p-4 shadow-[var(--shadow-card)] md:p-5"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft font-mono text-sm font-bold text-accent-lime">
                      {s.n}
                    </span>
                    <div className="flex-1">
                      <p className="font-display text-base font-bold tracking-tight text-foreground md:text-lg">
                        {s.label}
                      </p>
                      <p className="font-body text-sm text-muted md:text-[15px]">{s.hint}</p>
                    </div>
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-orange text-white">
                      <CheckIcon className="h-3.5 w-3.5" />
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
