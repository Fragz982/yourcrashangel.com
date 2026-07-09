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
    <div className="border-b border-border">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-6 text-left"
        aria-expanded={isOpen}
      >
        <span className="font-display text-lg font-semibold text-foreground md:text-xl">
          {faq.question}
        </span>
        <span
          className="shrink-0 transition-transform duration-200"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <ChevronDownIcon className="h-5 w-5 text-muted" />
        </span>
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="pb-6 font-body text-base leading-relaxed text-muted">
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
    <section id="faq" className="bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <ScrollReveal>
          <p className="eyebrow text-accent-orange">Frequently asked</p>
          <h2 className="mt-4 display text-5xl text-foreground sm:text-6xl md:text-7xl">
            Real questions.
            <br />
            <span className="text-accent-lime">Straight answers.</span>
          </h2>
        </ScrollReveal>

        {CATEGORIES.map((category, ci) => (
          <div key={category.name} className="mt-12">
            <ScrollReveal>
              <p className="eyebrow text-[0.7rem] text-accent-lime">
                {category.name}
              </p>
            </ScrollReveal>
            <div className="mt-4">
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
          <p className="mt-10 text-center font-body text-sm text-muted">
            Confused by a word they used?{" "}
            <a
              href="/decoder"
              className="font-semibold text-accent-orange transition-colors hover:text-accent-lime"
            >
              Check the Decoder →
            </a>
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <p className="mt-8 rounded-xl bg-background p-6 font-body text-sm leading-relaxed text-muted">
            <strong className="text-foreground">Disclaimer:</strong> This is
            educational information only — not legal, insurance, or financial
            advice. Every situation is different. For advice specific to your
            claim, talk to a licensed professional.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
