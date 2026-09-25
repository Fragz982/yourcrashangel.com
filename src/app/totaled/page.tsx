import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import TotalLossCalculator from "../../components/TotalLossCalculator";
import ShareBlock from "../../components/ShareBlock";

export const metadata: Metadata = {
  title: "Is my car totaled? California total loss calculator | yourcrashangel",
  description:
    "California has no fixed total-loss percentage — it uses the Total Loss Formula. Run your numbers, understand ACV and salvage value, and learn how to keep your totaled car.",
  alternates: { canonical: "/totaled" },
  openGraph: {
    title: "Is my car totaled? Run the California math",
    description:
      "Repair cost + salvage value vs. what your car's worth — the actual formula California insurers use, in a free calculator.",
    url: "https://yourcrashangel.com/totaled",
  },
};

const FACTS = [
  {
    q: "How California actually decides",
    a: "There's no magic percentage in California. Insurers use the Total Loss Formula: if the cost of repairs plus the car's salvage value is equal to or more than the car's actual cash value (ACV), it can be declared a total loss. A drivable car with expensive damage can total; a scary-looking one might not.",
  },
  {
    q: "“ACV” is where the fight really is",
    a: "Actual cash value is what your exact car — year, trim, miles, condition, your zip code — was worth the second before the crash. The insurer's valuation report is built from comparable listings. You're allowed to check their comparables and bring your own. Most total-loss disputes aren't about the damage at all; they're about this one number.",
  },
  {
    q: "Yes, you can usually keep your totaled car",
    a: "It's called owner-retained salvage. The insurer pays you the ACV minus the salvage value, the car gets a salvage title through the DMV, and after repairs it needs a revived-salvage inspection to get back on the road. Makes sense for sentimental cars or light damage — bad math on newer financed cars.",
  },
  {
    q: "If the offer feels low, it might be",
    a: "Pull the valuation report and read the comparable vehicles line by line — wrong trim, wrong mileage band, and “condition adjustments” are where value quietly disappears. Polite, documented pushback with better comparables is normal and often works. Your policy may also include an appraisal clause for when the numbers stay far apart.",
  },
];

// One pill language for the whole site (matches the navbar and the flight).
const primaryBtn =
  "inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-accent-orange px-8 text-base font-bold text-white shadow-[0_1px_2px_rgb(33_26_20/0.10),0_8px_20px_-10px_rgb(33_26_20/0.35)] transition-[background-color,transform] hover:bg-accent-lime active:scale-[0.97] sm:w-auto";
const secondaryBtn =
  "inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-surface px-8 text-base font-bold text-foreground shadow-[inset_0_0_0_1px_var(--color-border)] transition-[background-color,transform] hover:bg-surface-light active:scale-[0.97] sm:w-auto";

export default function Totaled() {
  return (
    <>
      <Navbar />
      <main id="main" className="bg-background">
        <section className="pt-28 pb-12 md:pt-36 md:pb-14">
          <div className="mx-auto max-w-3xl px-5 md:px-8">
            <p className="eyebrow text-accent-orange">Total loss, translated</p>
            <h1 className="mt-4 display text-[2.6rem] text-foreground sm:text-6xl md:text-7xl">
              &ldquo;Totaled&rdquo; is math,
              <br />
              <span className="text-accent-lime">not a verdict.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
              &ldquo;Total loss&rdquo; doesn&apos;t mean your car is destroyed —
              it means an equation tipped. Here&apos;s the equation, in your
              hands for once.
            </p>
          </div>
        </section>

        <section className="pb-12 md:pb-16">
          <div className="mx-auto max-w-3xl px-5 md:px-8">
            <TotalLossCalculator />
          </div>
        </section>

        <section className="pb-12 md:pb-16">
          <div className="mx-auto max-w-3xl px-5 md:px-8">
            <div className="flex flex-col gap-4 md:gap-5">
              {FACTS.map((f) => (
                <div
                  key={f.q}
                  className="rounded-[var(--radius-card)] bg-surface p-6 shadow-[var(--shadow-card)] md:p-8"
                >
                  <h2 className="text-xl font-extrabold leading-snug tracking-[-0.025em] text-balance text-foreground md:text-2xl">{f.q}</h2>
                  <p className="mt-3 text-base leading-relaxed text-muted">
                    {f.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-20 md:pb-24">
          <div className="mx-auto max-w-3xl px-5 md:px-8">
            <div className="rounded-[var(--radius-card)] bg-surface p-7 text-center shadow-[var(--shadow-card)] md:p-12">
              <h2 className="display text-3xl text-foreground sm:text-4xl md:text-5xl">
                Staring at a total-loss letter?
              </h2>
              <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-pretty text-muted md:text-lg">
                Send it to me. I read these for a living and I&apos;ll tell you
                — free — whether the math looks right and what I&apos;d do
                next.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/#get-help"
                  className={primaryBtn}
                >
                  Get a free read
                </Link>
                <Link
                  href="/estimate"
                  className={secondaryBtn}
                >
                  Ballpark my repair
                </Link>
              </div>
            </div>
            <div className="mt-6">
              <ShareBlock />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
