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
    <section id="cost-tool" className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <ScrollReveal>
          <div className="overflow-hidden rounded-3xl border border-border bg-surface p-8 md:p-14">
            <div className="grid items-center gap-10 md:grid-cols-[1.1fr_1fr]">
              <div>
                <p className="eyebrow text-accent-orange">Free instant tool</p>
                <h2 className="mt-4 display text-5xl text-foreground sm:text-6xl">
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
                  className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-accent-orange px-7 py-4 font-display text-base font-semibold text-background transition-transform hover:scale-105 active:scale-95 md:text-lg"
                >
                  <CameraIcon className="h-5 w-5" />
                  Get my ballpark
                </Link>
              </div>

              <ol className="flex flex-col gap-4">
                {STEPS.map((s) => (
                  <li
                    key={s.n}
                    className="flex items-center gap-4 rounded-2xl border border-border bg-background p-4"
                  >
                    <span className="font-mono text-sm text-muted">{s.n}</span>
                    <div className="flex-1">
                      <p className="font-display text-base font-semibold text-foreground">
                        {s.label}
                      </p>
                      <p className="font-body text-sm text-muted">{s.hint}</p>
                    </div>
                    <CheckIcon className="h-4 w-4 shrink-0 text-accent-lime" />
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
