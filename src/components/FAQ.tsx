"use client";

import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { ChevronDownIcon } from "./Icons";

const FAQS = [
  {
    question: "Do I have to use my insurer's recommended shop?",
    answer:
      "No. In California (and most states), you have the legal right to choose any licensed body shop you want. Insurers will push you toward their \"Direct Repair Program\" (DRP) shops because those shops agree to use cheaper parts and cut corners to keep costs down for the insurer. That's great for them. Not always great for your car. Pick your own shop.",
  },
  {
    question: "What's a supplement?",
    answer:
      "When a shop starts tearing apart your car, they almost always find hidden damage the initial estimate missed — stuff behind the bumper, under a panel, structural damage you can't see from the outside. A supplement is the request to the insurer for more money to cover that extra work. It's completely normal and happens on the majority of repairs. If a shop tells you \"the estimate covers everything\" before they've even taken the car apart, be suspicious.",
  },
  {
    question: "My car was totaled — is it trash?",
    answer:
      "\"Total loss\" doesn't mean your car is destroyed. It means the insurer decided the repair cost exceeds a certain percentage of your car's value (usually around 75%). But here's the thing: they often lowball the value. You can dispute their offer with comparable vehicles from your area (same year, mileage, options). Many people get thousands more than the initial offer just by pushing back with evidence. I can help you figure out if their number is fair.",
  },
  {
    question: "Someone offered to waive my deductible — should I?",
    answer:
      "Run. Seriously. A shop that says \"we'll cover your deductible\" is advertising that they'll cut $500–$1000 from the repair cost somewhere. That money has to come from somewhere, and it comes from your car — cheaper parts, skipped procedures, shortcuts on paint and blending. It's also potentially insurance fraud. A legit shop charges what the repair actually costs.",
  },
  {
    question: "OEM vs aftermarket parts — does it matter?",
    answer:
      "Yes, it matters. OEM (Original Equipment Manufacturer) parts are made by the same company that built your car. They fit right, they're tested to the same safety specs, and they maintain your car's value. Aftermarket parts are cheaper knockoffs that may not fit perfectly and haven't been through the same crash testing. Insurers love aftermarket because it's cheaper for them. You can request OEM — especially if your car is newer or still under warranty.",
  },
  {
    question: "How much does this cost?",
    answer:
      "Nothing. Texting me, sending me your estimate, asking me questions — it's all free. I do this because I've seen too many people get taken advantage of, and I'm in a position to help. If you need a referral to a good shop or attorney in LA, I'll point you in the right direction, but there's never a bill from me.",
  },
];

function FAQItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: (typeof FAQS)[0];
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
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <ScrollReveal>
          <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-accent-orange">
            Frequently asked
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Real questions.
            <br />
            <span className="text-accent-lime">Straight answers.</span>
          </h2>
        </ScrollReveal>

        <div className="mt-12">
          {FAQS.map((faq, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <FAQItem
                faq={faq}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </ScrollReveal>
          ))}
        </div>

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
