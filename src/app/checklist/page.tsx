import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
  CheckIcon,
  ChevronDownIcon,
  MessageIcon,
  PhoneIcon,
} from "../../components/Icons";

export const metadata: Metadata = {
  title: "What To Do After A Crash — Free Checklist | yourcrashangel",
  description:
    "Free step-by-step checklist: exactly what to do after a car accident. From a real collision estimator in LA.",
  alternates: { canonical: "/checklist" },
  openGraph: {
    title: "What To Do After A Crash — the free checklist",
    description:
      "At the scene, the first 24 hours, choosing a shop, total loss — every step, from a working LA collision estimator.",
    url: "https://yourcrashangel.com/checklist",
  },
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
      "You can use any licensed shop — including the one your insurer recommends (DRP shops are vetted and usually guarantee the work). Pick the shop you trust",
      "Avoid shops that offer to \"waive your deductible\" (that's a red flag)",
      "Ask what parts the estimate uses — OEM or aftermarket. Both are usually fine; guaranteed OEM is a policy choice (an OEM endorsement), not automatic",
      "Ask if the shop does a full teardown before writing the final estimate",
      "Get a written estimate before authorizing work",
    ],
  },
  {
    category: "During the repair",
    items: [
      "Expect supplements — hidden damage is found during teardown, and that's normal",
      "Aftermarket parts are usually fine — they're held to an equal-quality standard. If you specifically want OEM, that comes from an OEM endorsement on your policy",
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
      "Keeping the car? Get the salvage deduction in writing and understand the salvage-title process first",
      "Run your numbers with the free California total-loss calculator at yourcrashangel.com/totaled",
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

// One card, one button language for the whole site (EstimateGuard / flight).
const card =
  "rounded-[var(--radius-card)] bg-surface shadow-[var(--shadow-card)]";
const btnPrimary =
  "inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent-orange px-6 text-base font-bold tracking-[-0.01em] text-white shadow-[0_1px_2px_rgb(33_26_20/0.10),0_8px_20px_-10px_rgb(33_26_20/0.35)] transition-[background-color,scale] duration-150 hover:bg-accent-lime active:scale-[0.97]";
const btnSecondary =
  "inline-flex h-12 items-center justify-center gap-2 rounded-full bg-surface px-6 text-base font-bold tracking-[-0.01em] text-foreground shadow-[inset_0_0_0_1px_var(--color-border)] transition-[background-color,scale] duration-150 hover:bg-surface-light active:scale-[0.97]";
const nextCard = `${card} group relative flex flex-col p-6 pr-16 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)] md:p-7 md:pr-16`;
const nextArrow =
  "absolute top-6 right-6 grid h-9 w-9 place-items-center rounded-full bg-surface-light text-foreground transition-colors group-hover:bg-accent-orange group-hover:text-white md:top-7";

export default function ChecklistPage() {
  return (
    <>
    <Navbar />
    <div id="main" className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-5 pb-10 pt-28 md:px-8 md:pb-16 md:pt-32">
        <Link
          href="/"
          className="eyebrow inline-flex h-11 items-center rounded-full bg-surface px-4 text-accent-orange shadow-[inset_0_0_0_1px_var(--color-border)] transition-colors hover:text-accent-lime"
        >
          ← Back to yourcrashangel
        </Link>

        <h1 className="mt-10 display text-5xl text-foreground sm:text-6xl md:text-7xl">
          What To Do
          <br />
          <span className="text-accent-orange">After A Crash</span>
        </h1>
        <p className="mt-5 max-w-2xl font-body text-lg leading-relaxed text-muted md:text-xl">
          Free checklist from a real collision estimator. Screenshot this,
          bookmark it, or save it for when you need it. Hopefully you never do.
        </p>

        <div className="mt-10 flex flex-col gap-4 md:mt-12 md:gap-5">
          {CHECKLIST_ITEMS.map((section) => (
            <div key={section.category} className={`${card} p-6 md:p-8`}>
              <h2 className="display text-2xl text-accent-orange md:text-3xl">
                {section.category}
              </h2>
              <ul className="mt-3 divide-y divide-border">
                {section.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3.5 py-3.5 last:pb-0"
                  >
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent-soft text-accent-orange">
                      <CheckIcon className="h-3.5 w-3.5" />
                    </span>
                    <span className="font-body text-base leading-relaxed text-foreground/80">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-[var(--radius-card)] bg-surface p-6 shadow-[var(--shadow-lift)] sm:p-8 md:p-10">
          <h2 className="display text-3xl text-foreground md:text-4xl">
            Need help reading your estimate?
          </h2>
          <p className="mt-3 max-w-xl font-body text-lg leading-relaxed text-muted">
            Text me a photo of the damage or your estimate. I&apos;ll break it
            down in plain English. Free, no strings attached.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a href="sms:+12132792992" className={btnPrimary}>
              <MessageIcon className="h-4 w-4" />
              Text: (213) 279-2992
            </a>
            <a href="tel:+12132792992" className={btnSecondary}>
              <PhoneIcon className="h-4 w-4" />
              Call: (213) 279-2992
            </a>
          </div>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 md:gap-5">
          <Link href="/playbook" className={nextCard}>
            <span aria-hidden="true" className={nextArrow}>
              <ChevronDownIcon className="h-4 w-4 -rotate-90" />
            </span>
            <p className="eyebrow text-accent-orange">Next up</p>
            <p className="mt-3 font-display text-xl font-bold tracking-[-0.02em] text-foreground">
              The Insurance Playbook
            </p>
            <p className="mt-1.5 font-body text-[0.95rem] leading-relaxed text-muted">
              The 6 moves they&apos;ll run on you — and the counter for each.
            </p>
          </Link>
          <Link href="/decoder" className={nextCard}>
            <span aria-hidden="true" className={nextArrow}>
              <ChevronDownIcon className="h-4 w-4 -rotate-90" />
            </span>
            <p className="eyebrow text-accent-lime">Also useful</p>
            <p className="mt-3 font-display text-xl font-bold tracking-[-0.02em] text-foreground">
              The Jargon Decoder
            </p>
            <p className="mt-1.5 font-body text-[0.95rem] leading-relaxed text-muted">
              24 adjuster words translated into plain English.
            </p>
          </Link>
        </div>

        <div className="mt-12 border-t border-border pt-6">
          <p className="font-body text-xs leading-relaxed text-muted">
            <strong className="text-foreground">Disclaimer:</strong> This checklist
            is for educational and informational purposes only. It is not legal,
            insurance, financial, or professional advice. Every accident and
            claim is different. For advice specific to your situation, consult a
            licensed attorney, public adjuster, or insurance professional.
          </p>
        </div>

        <p className="mt-8 text-center font-display text-sm text-muted">
          Made by{" "}
          <Link
            href="/"
            className="font-semibold text-accent-orange transition-colors hover:text-accent-lime"
          >
            @yourcrashangel
          </Link>{" "}
          — The Accident Translator
        </p>
      </div>
    </div>
    <Footer />
    </>
  );
}
