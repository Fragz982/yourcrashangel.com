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

// One pill language for the whole site (matches the navbar and the flight).
const primaryBtn =
  "inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-accent-orange px-8 text-base font-bold text-white shadow-[0_1px_2px_rgb(33_26_20/0.10),0_8px_20px_-10px_rgb(33_26_20/0.35)] transition-[background-color,transform] hover:bg-accent-lime active:scale-[0.97] sm:w-auto";
const secondaryBtn =
  "inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-surface px-8 text-base font-bold text-foreground shadow-[inset_0_0_0_1px_var(--color-border)] transition-[background-color,transform] hover:bg-surface-light active:scale-[0.97] sm:w-auto";

export default function Lowball() {
  return (
    <>
      <Navbar />
      <main id="main" className="bg-background">
        <section className="pt-28 pb-12 md:pt-36 md:pb-14">
          <div className="mx-auto max-w-3xl px-5 md:px-8">
            <p className="eyebrow text-accent-orange">Lowball offers, translated</p>
            <h1 className="mt-4 display text-[2.6rem] text-foreground sm:text-6xl md:text-7xl">
              The first offer is an
              <br />
              <span className="text-accent-lime">opening bid.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
              Not a verdict, not an insult — an opening bid, built from
              comparables a vendor picked. Which means it moves the same way
              any bid moves: with better evidence, delivered calmly, in
              writing. Here&apos;s the whole play.
            </p>
          </div>
        </section>

        <section className="pb-12 md:pb-14">
          <div className="mx-auto max-w-3xl px-5 md:px-8">
            <ol className="flex flex-col gap-4">
              {STEPS.map((s, i) => (
                <li
                  key={s.t}
                  className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3.5 gap-y-3 rounded-[var(--radius-card)] bg-surface p-5 shadow-[var(--shadow-card)] sm:gap-x-5 sm:p-7"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent-orange text-base font-extrabold text-white tabular-nums sm:h-10 sm:w-10">
                    {i + 1}
                  </span>
                  <p className="text-lg font-extrabold leading-snug tracking-[-0.02em] text-foreground md:text-xl">
                    {s.t}
                  </p>
                  {/* Phone: the body runs the full card width under the
                      number; from sm up it hangs under the title. */}
                  <p className="col-span-2 text-base leading-relaxed text-muted sm:col-span-1 sm:col-start-2">
                    {s.d}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Copy-paste counter email */}
        <section className="pb-12 md:pb-14">
          <div className="mx-auto max-w-3xl px-5 md:px-8">
            <div className="rounded-[var(--radius-card)] bg-surface p-6 shadow-[var(--shadow-lift)] md:p-9">
              <p className="eyebrow text-accent-orange">Steal this email</p>
              <h2 className="mt-3 display text-3xl text-foreground sm:text-4xl">
                The counter, word for word.
              </h2>
              <div className="mt-6 rounded-[var(--radius-inner)] bg-surface-light p-5 text-[0.95rem] leading-relaxed text-foreground shadow-[inset_0_0_0_1px_var(--color-border)] md:p-6">
                <p className="font-bold">Subject: Claim #[your claim number] — valuation response</p>
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
              <p className="mt-5 text-sm leading-relaxed text-muted">
                Calm, factual, documented. That email tends to get taken
                seriously because it reads like someone who isn&apos;t going
                away.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="pb-20 md:pb-24">
          <div className="mx-auto max-w-3xl px-5 md:px-8">
            <div className="rounded-[var(--radius-card)] bg-surface p-7 text-center shadow-[var(--shadow-card)] md:p-12">
              <h2 className="display text-3xl text-foreground sm:text-4xl md:text-5xl">
                Want a second set of eyes first?
              </h2>
              <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-pretty text-muted md:text-lg">
                Text me the offer letter or valuation report — I see these
                reports every week at the shop, and I&apos;ll tell you, free,
                whether the math looks fair and which comps don&apos;t hold up.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="sms:+12132792992"
                  className={primaryBtn}
                >
                  Text me the offer — free read
                </a>
                <Link
                  href="/totaled"
                  className={secondaryBtn}
                >
                  Run the total-loss math
                </Link>
              </div>
              <p className="mx-auto mt-6 max-w-lg text-xs leading-relaxed text-muted">
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
