"use client";

import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { ChevronDownIcon } from "./Icons";
import { CATEGORIES, type Faq } from "./faqData";


function FAQItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: Faq;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="group flex w-full items-center justify-between gap-4 rounded-[var(--radius-inner)] px-4 py-5 text-left transition-colors hover:bg-surface-light focus-visible:outline-offset-[-2px] md:px-5"
        aria-expanded={isOpen}
      >
        <span className="text-[1.05rem] font-semibold leading-snug tracking-[-0.01em] text-foreground md:text-lg">
          {faq.question}
        </span>
        <span
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-[transform,background-color,color] duration-200 ${
            isOpen
              ? "bg-accent-orange text-white"
              : "bg-surface-light text-muted group-hover:bg-accent-soft group-hover:text-accent-orange"
          }`}
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <ChevronDownIcon className="h-4 w-4" />
        </span>
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="px-4 pb-6 text-base leading-relaxed text-muted md:px-5 md:pr-16">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openKey, setOpenKey] = useState<string | null>("0-0");

  return (
    <section id="faq" className="bg-background py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 md:px-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <ScrollReveal>
            <p className="eyebrow text-accent-orange">Frequently asked</p>
            <h2 className="mt-4 display text-4xl text-foreground sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
              Real questions.
              <br />
              <span className="text-accent-lime">Straight answers.</span>
            </h2>
          </ScrollReveal>
        </div>

        <div className="flex flex-col gap-5 md:gap-6">
          {CATEGORIES.map((category, ci) => (
            <div
              key={category.name}
              className="rounded-[var(--radius-card)] bg-surface p-2 shadow-[var(--shadow-card)]"
            >
              <ScrollReveal>
                <p className="eyebrow px-4 pt-4 pb-1 text-[0.7rem] text-accent-lime md:px-5 md:pt-5">
                  {category.name}
                </p>
              </ScrollReveal>
              <div className="mt-1 divide-y divide-border">
                {category.faqs.map((faq, i) => {
                  const key = `${ci}-${i}`;
                  return (
                    <ScrollReveal key={key} delay={i * 0.04}>
                      <FAQItem
                        faq={faq}
                        isOpen={openKey === key}
                        onToggle={() => setOpenKey(openKey === key ? null : key)}
                      />
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          ))}

          <ScrollReveal delay={0.2}>
            <p className="mt-4 px-1 text-[0.95rem] text-muted">
              Confused by a word they used?{" "}
              <a
                href="/decoder"
                className="whitespace-nowrap font-bold text-accent-orange underline-offset-4 transition-colors hover:text-accent-lime hover:underline"
              >
                Check the Decoder →
              </a>
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p className="rounded-[var(--radius-inner)] bg-surface/60 p-5 text-sm leading-relaxed text-muted shadow-[inset_0_0_0_1px_var(--color-border)] md:p-6">
              <strong className="text-foreground">Disclaimer:</strong> This is
              educational information only — not legal, insurance, or financial
              advice. Every situation is different. For advice specific to your
              claim, talk to a licensed professional.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
