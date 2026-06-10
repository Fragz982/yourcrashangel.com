import type { Metadata } from "next";
import { CheckIcon } from "../../components/Icons";

export const metadata: Metadata = {
  title: "What To Do After A Crash — Free Checklist | yourcrashangel",
  description:
    "Free step-by-step checklist: exactly what to do after a car accident. From a real collision estimator in LA.",
};

const CHECKLIST_ITEMS = [
  {
    category: "At the scene",
    items: [
      "Check for injuries — call 911 if anyone is hurt",
      "Move to safety if possible, turn on hazards",
      "Call the police (even for minor accidents — get a report number)",
      "Take photos: all vehicles, all damage, license plates, street signs, traffic lights, skid marks, debris",
      "Take a video walkthrough of the entire scene",
      "Get the other driver's: name, phone, insurance company, policy number, driver's license number",
      "Get witness names and phone numbers",
      "Do NOT say \"it was my fault\" or \"I'm sorry\" — be polite, share info, that's it",
      "Do NOT discuss the accident details with the other driver beyond exchanging info",
    ],
  },
  {
    category: "Within 24 hours",
    items: [
      "File a claim with YOUR insurance (even if it's their fault)",
      "Document any injuries — see a doctor, even if you feel \"fine\"",
      "Write down everything you remember about the accident while it's fresh",
      "Do NOT give a recorded statement to the other driver's insurance without understanding what you're doing",
      "Text me your photos and estimate — I'll tell you what to watch for (free)",
    ],
  },
  {
    category: "Choosing a shop",
    items: [
      "YOU choose the body shop — not the insurer",
      "Avoid shops that offer to \"waive your deductible\" (that's a red flag)",
      "Ask the shop if they use OEM parts (especially for newer cars)",
      "Ask if the shop does a full teardown before writing the final estimate",
      "Get a written estimate before authorizing work",
    ],
  },
  {
    category: "During the repair",
    items: [
      "Expect supplements — hidden damage is found during teardown, and that's normal",
      "Don't let the insurer pressure your shop into using cheap aftermarket parts",
      "Ask for photos of the repair in progress if the shop offers them",
      "Know your rental coverage limits and timeline",
      "Review the final invoice against the estimate before picking up your car",
    ],
  },
  {
    category: "If it's a total loss",
    items: [
      "Get the insurer's valuation in writing",
      "Research comparable vehicles in your area (same year, make, model, mileage, options)",
      "You CAN dispute the total loss offer — most people don't know this",
      "Check if you have gap insurance (especially if you're upside-down on a loan)",
      "Ask about diminished value if you're keeping the car",
    ],
  },
  {
    category: "Protect yourself",
    items: [
      "Keep every document, text, email, and estimate",
      "Don't sign anything you don't understand — ask me first",
      "Don't accept a quick settlement if you're still treating for injuries",
      "Consider consulting an attorney for serious injuries or major disputes",
      "Remember: adjusters work for the insurance company, not for you",
    ],
  },
];

export default function ChecklistPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
        <a
          href="/"
          className="inline-block font-display text-sm font-semibold uppercase tracking-widest text-accent-orange transition-colors hover:text-accent-lime"
        >
          ← Back to yourcrashangel
        </a>

        <h1 className="mt-8 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          What To Do
          <br />
          <span className="text-accent-lime">After A Crash</span>
        </h1>
        <p className="mt-4 font-body text-lg text-muted">
          Free checklist from a real collision estimator. Screenshot this,
          bookmark it, or save it for when you need it. Hopefully you never do.
        </p>

        <div className="mt-12 space-y-10">
          {CHECKLIST_ITEMS.map((section) => (
            <div key={section.category}>
              <h2 className="font-display text-xl font-bold uppercase tracking-wider text-accent-orange">
                {section.category}
              </h2>
              <ul className="mt-4 space-y-3">
                {section.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-border bg-surface">
                      <CheckIcon className="h-3 w-3 text-accent-lime" />
                    </span>
                    <span className="font-body text-base leading-relaxed text-muted">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-border bg-surface p-8">
          <h2 className="font-display text-2xl font-bold text-foreground">
            Need help reading your estimate?
          </h2>
          <p className="mt-3 font-body text-base text-muted">
            Text me a photo of the damage or your estimate. I&apos;ll break it
            down in plain English. Free, no strings attached.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href="sms:+12132792992"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-orange px-6 py-3 font-display text-sm font-semibold text-background transition-transform hover:scale-105"
            >
              Text: (213) 279-2992
            </a>
            <a
              href="tel:+12132792992"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-border px-6 py-3 font-display text-sm font-semibold text-foreground transition-colors hover:border-foreground/40"
            >
              Call: (213) 279-2992
            </a>
          </div>
        </div>

        <div className="mt-12 rounded-xl bg-background p-6">
          <p className="font-body text-xs leading-relaxed text-muted/70">
            <strong className="text-muted">Disclaimer:</strong> This checklist
            is for educational and informational purposes only. It is not legal,
            insurance, financial, or professional advice. Every accident and
            claim is different. For advice specific to your situation, consult a
            licensed attorney, public adjuster, or insurance professional.
          </p>
        </div>

        <p className="mt-8 text-center font-display text-sm text-muted">
          Made by{" "}
          <a
            href="/"
            className="font-semibold text-accent-orange transition-colors hover:text-accent-lime"
          >
            @yourcrashangel
          </a>{" "}
          — The Accident Translator
        </p>
      </div>
    </div>
  );
}
