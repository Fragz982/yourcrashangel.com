import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ShareBlock from "../../components/ShareBlock";

export const metadata: Metadata = {
  title: "Insurance offer too low? Push back the right way | yourcrashangel",
  description:
    "The first total-loss or repair offer is an opening bid, not a verdict. How to get the valuation report, audit the comps, counter in writing, and what California says they owe you — from a working LA collision estimator.",
  alternates: { canonical: "/lowball" },
  openGraph: {
    title: "The first offer is an opening bid, not a verdict.",
    description:
      "Get the valuation report, audit the comps, counter in writing — the calm, evidence-first way to push back on a low offer.",
    url: "https://yourcrashangel.com/lowball",
  },
};

const STEPS = [
  {
    t: "Get the valuation report — in writing.",
    d: "Their number comes from a market-valuation report (usually built by a vendor like CCC or Mitchell). California's fair-claims rules require insurers to itemize and explain the basis of a total-loss valuation in writing at the time they make the offer — you shouldn't even have to ask. Didn't get the full report? Request it, politely, in writing: “Please send the complete valuation report used to determine my vehicle's value.”",
  },
  {
    t: "Audit the comparables line by line.",
    d: "The report lists “comparable” vehicles. Check each one against YOUR car: same year? Same trim (an EX-L is not an LX)? Similar mileage? Reasonable distance from you? Then look for “condition adjustments” that can knock hundreds off with little explanation — ask them to justify each one in writing. Wrong trims and 60k-mile gaps are where value disappears.",
  },
  {
    t: "Pull 3–5 real listings and counter in writing.",
    d: "Find current listings for your actual car — year, trim, mileage band, your region — on the big marketplaces. Screenshot them with dates. Send them with a short, calm email (template below). Written evidence is what adjusters can actually act on — and often do. (No promises: some first offers are genuinely fair.)",
  },
  {
    t: "Make sure the check includes the California extras.",
    d: "On a total loss in California, the settlement isn't just the car's value — it generally must also account for sales tax and required transfer/registration fees on the replacement. On a $15,000 car that's real money. If the offer sheet doesn't show tax and fees, ask where they are.",
  },
  {
    t: "Standoff? Ask about the appraisal provision.",
    d: "Many California auto policies include an appraisal provision for value disputes on your own policy: you hire an appraiser, they hire one, the two pick an umpire, and the result settles the number. It costs something, so it's a tool for real gaps, not $300 ones — but knowing it exists (and saying so) changes conversations. Check your policy's exact terms.",
  },
  {
    t: "Don't sign the release until the number is right.",
    d: "The settlement release generally ends the property-damage claim. Sign it after the number includes the value you proved, the tax and fees, and any storage or rental you're owed — not before. There's no prize for settling fast — take the time to verify the number first.",
  },
];

export default function Lowball() {
  return (
    <>
      <Navbar />
      <main id="main" className="bg-background">
        <section className="pt-32 pb-14 md:pt-40">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <p className="eyebrow text-accent-orange">Lowball offers, translated</p>
            <h1 className="mt-4 display text-5xl text-foreground sm:text-6xl md:text-7xl">
              The first offer is an
              <br />
              <span className="text-accent-lime">opening bid.</span>
            </h1>
            <p className="mt-5 max-w-xl font-body text-lg leading-relaxed text-muted">
              Not a verdict, not an insult — an opening bid, built from
              comparables a vendor picked. Which means it moves the same way
              any bid moves: with better evidence, delivered calmly, in
              writing. Here&apos;s the whole play.
            </p>
          </div>
        </section>

        <section className="pb-14">
          <div className="mx-auto max-w-3xl px-5 md:px-8">
            <div className="flex flex-col gap-4">
              {STEPS.map((s, i) => (
                <div
                  key={s.t}
                  className="flex gap-4 rounded-2xl border border-border bg-surface-light p-5"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-orange font-display text-sm font-bold text-background">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-display text-lg font-semibold text-foreground">
                      {s.t}
                    </p>
                    <p className="mt-1 font-body text-base leading-relaxed text-muted">
                      {s.d}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Copy-paste counter email */}
        <section className="pb-14">
          <div className="mx-auto max-w-3xl px-5 md:px-8">
            <div className="rounded-3xl border-2 border-foreground bg-surface p-6 md:p-8">
              <p className="eyebrow text-accent-orange">Steal this email</p>
              <h2 className="mt-2 display text-3xl text-foreground">
                The counter, word for word.
              </h2>
              <div className="mt-4 rounded-xl border border-border bg-background p-5 font-body text-sm leading-relaxed text-foreground">
                <p>Subject: Claim #[your claim number] — valuation response</p>
                <br />
                <p>Hi [adjuster name],</p>
                <br />
                <p>
                  Thank you for the valuation. After reviewing the report, I
                  don&apos;t believe the comparables reflect my vehicle: [one
                  sentence — e.g., &ldquo;two of the three comps are a lower
                  trim, and all three have significantly higher mileage.&rdquo;]
                </p>
                <br />
                <p>
                  Attached are [3&ndash;5] current listings for the same year,
                  trim, and mileage range in my area, averaging $[X]. Based on
                  these, I believe $[X] reflects the actual cash value, and I&apos;m
                  requesting a revised offer — including applicable sales tax
                  and transfer/registration fees in the settlement.
                </p>
                <br />
                <p>
                  Please reply in writing. I&apos;m ready to resolve this
                  quickly at a fair number.
                </p>
                <br />
                <p>Thanks,<br />[Name] · [Phone]</p>
              </div>
              <p className="mt-4 font-body text-sm text-muted">
                Calm, factual, documented. That email tends to get taken
                seriously because it reads like someone who isn&apos;t going
                away.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="pb-24">
          <div className="mx-auto max-w-3xl px-5 md:px-8">
            <div className="rounded-3xl border border-border bg-surface p-8 text-center md:p-10">
              <h2 className="display text-3xl text-foreground sm:text-4xl">
                Want a second set of eyes first?
              </h2>
              <p className="mx-auto mt-3 max-w-md font-body text-base text-muted">
                Text me the offer letter or valuation report — I see these
                reports every week at the shop, and I&apos;ll tell you, free,
                whether the math looks fair and which comps don&apos;t hold up.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="sms:+12132792992"
                  className="rounded-full bg-accent-orange px-7 py-4 font-display text-base font-semibold text-background transition-transform hover:scale-105 active:scale-95"
                >
                  Text me the offer — free read
                </a>
                <Link
                  href="/totaled"
                  className="rounded-full border border-border bg-background px-7 py-4 font-display text-base font-semibold text-foreground transition-transform hover:scale-105 active:scale-95"
                >
                  Run the total-loss math
                </Link>
              </div>
              <p className="mt-5 font-body text-xs text-muted">
                Educational info, not legal or insurance advice — and your
                negotiating stays yours: I&apos;ll tell you what I see, you
                make the calls. Check your own policy&apos;s exact terms.
              </p>
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
