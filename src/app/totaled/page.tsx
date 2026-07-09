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

export default function Totaled() {
  return (
    <>
      <Navbar />
      <main id="main" className="bg-background">
        <section className="pt-32 pb-16 md:pt-40">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <p className="eyebrow text-accent-orange">Total loss, translated</p>
            <h1 className="mt-4 display text-5xl text-foreground sm:text-6xl md:text-7xl">
              &ldquo;Totaled&rdquo; is math,
              <br />
              <span className="text-accent-lime">not a verdict.</span>
            </h1>
            <p className="mt-5 max-w-xl font-body text-lg leading-relaxed text-muted">
              &ldquo;Total loss&rdquo; doesn&apos;t mean your car is destroyed —
              it means an equation tipped. Here&apos;s the equation, in your
              hands for once.
            </p>
          </div>
        </section>

        <section className="pb-16">
          <div className="mx-auto max-w-3xl px-5 md:px-8">
            <TotalLossCalculator />
          </div>
        </section>

        <section className="pb-16">
          <div className="mx-auto max-w-3xl px-5 md:px-8">
            <div className="flex flex-col gap-6">
              {FACTS.map((f) => (
                <div
                  key={f.q}
                  className="rounded-3xl border border-border bg-surface-light p-6 md:p-8"
                >
                  <h2 className="display text-2xl text-foreground">{f.q}</h2>
                  <p className="mt-3 font-body text-base leading-relaxed text-muted">
                    {f.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-24">
          <div className="mx-auto max-w-3xl px-5 md:px-8">
            <div className="rounded-3xl border border-border bg-surface p-8 text-center md:p-10">
              <h2 className="display text-3xl text-foreground sm:text-4xl">
                Staring at a total-loss letter?
              </h2>
              <p className="mx-auto mt-3 max-w-md font-body text-base text-muted">
                Send it to me. I read these for a living and I&apos;ll tell you
                — free — whether the math looks right and what I&apos;d do
                next.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/#get-help"
                  className="rounded-full bg-accent-orange px-7 py-4 font-display text-base font-semibold text-background transition-transform hover:scale-105 active:scale-95"
                >
                  Get a free read
                </Link>
                <Link
                  href="/estimate"
                  className="rounded-full border border-border bg-background px-7 py-4 font-display text-base font-semibold text-foreground transition-transform hover:scale-105 active:scale-95"
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
