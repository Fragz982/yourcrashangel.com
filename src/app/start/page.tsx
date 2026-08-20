import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "Crash was yesterday? Start here | yourcrashangel",
  description:
    "The accident already happened and you're playing catch-up. What's still recoverable, the DMV SR-1 deadline, and exactly what to say when insurance calls — from a working LA collision estimator.",
  alternates: { canonical: "/start" },
  openGraph: {
    title: "The crash already happened. Start here.",
    description:
      "What's still recoverable, the 10-day DMV rule, and word-for-word scripts for the insurance calls.",
    url: "https://yourcrashangel.com/start",
  },
};

const RECOVER = [
  {
    t: "Photograph everything — today counts too.",
    d: "Full walk-around of your car in daylight: every corner, close-ups of the damage, the odometer, and the interior if anything moved or broke. If you can safely swing by the scene, grab the intersection, skid marks, and any camera-looking buildings. Late photos beat no photos.",
  },
  {
    t: "Round up what you have on the other driver.",
    d: "Name, phone, plate, insurance card photo — whatever you got. Missing their insurance info? Their plate number is often enough for your insurer to track down the carrier. Write down your own memory of what happened NOW, while it's fresh — one paragraph, with times.",
  },
  {
    t: "Witnesses and cameras fade fast.",
    d: "Anyone who saw it and gave you a number — text them today and ask them to reply with what they saw (that text is now written evidence). Nearby businesses often keep camera footage only 3–7 days, so if the fault story is disputed, ask them this week, politely, in person.",
  },
  {
    t: "Feeling sore? Urgent care today, not Friday.",
    d: "Crash soreness famously shows up on day two or three — get checked because it's real and worth taking seriously. A side benefit: the visit creates a medical record, and undocumented pain is much harder to establish later. (I'm an estimator, not a doctor. See one.)",
  },
];

export default function Start() {
  return (
    <>
      <Navbar />
      <main id="main" className="bg-background">
        <section className="pt-32 pb-14 md:pt-40">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <p className="eyebrow text-accent-orange">
              It&apos;s been a day (or three) — you&apos;re not behind
            </p>
            <h1 className="mt-4 display text-5xl text-foreground sm:text-6xl md:text-7xl">
              The crash already
              <br />
              happened. <span className="text-accent-lime">Start here.</span>
            </h1>
            <p className="mt-5 max-w-xl font-body text-lg leading-relaxed text-muted">
              Most advice assumes you&apos;re still standing at the scene.
              You&apos;re not — you&apos;re on the couch, the adrenaline wore
              off, and the phone is about to start ringing. Here&apos;s what
              still matters, in order.
            </p>
          </div>
        </section>

        {/* Still recoverable */}
        <section className="pb-14">
          <div className="mx-auto max-w-3xl px-5 md:px-8">
            <h2 className="display text-3xl text-foreground sm:text-4xl">
              Still recoverable — do these first.
            </h2>
            <div className="mt-6 flex flex-col gap-4">
              {RECOVER.map((r, i) => (
                <div
                  key={r.t}
                  className="flex gap-4 rounded-2xl border border-border bg-surface-light p-5"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-orange font-display text-sm font-bold text-background">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-display text-lg font-semibold text-foreground">
                      {r.t}
                    </p>
                    <p className="mt-1 font-body text-base leading-relaxed text-muted">
                      {r.d}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SR-1 + police report reality */}
        <section className="pb-14">
          <div className="mx-auto max-w-3xl px-5 md:px-8">
            <div className="rounded-3xl border-2 border-accent-orange bg-surface p-6 md:p-8">
              <p className="eyebrow text-accent-orange">
                The one real deadline
              </p>
              <h2 className="mt-2 display text-3xl text-foreground">
                California&apos;s 10-day rule (SR-1)
              </h2>
              <p className="mt-3 font-body text-base leading-relaxed text-muted">
                If anyone was hurt — even a little — or the damage looks like
                more than <strong className="text-foreground">$1,000</strong>{" "}
                (which is almost any visible dent these days), California
                requires you to file an{" "}
                <strong className="text-foreground">SR-1 report with the DMV
                within 10 days</strong> of the crash. It&apos;s separate from
                the police report and separate from your insurance claim, it
                takes about ten minutes online at dmv.ca.gov, and skipping it
                can put your license at risk. Your insurer or agent can help —
                but the legal duty is yours.
              </p>
              <p className="mt-4 font-body text-sm leading-relaxed text-muted">
                <strong className="text-foreground">
                  &ldquo;But I never got a police report…&rdquo;
                </strong>{" "}
                In LA that&apos;s normal. For fender-benders with no injuries,
                LAPD typically doesn&apos;t come out or write a report — claims
                get handled on photos and statements every day. Injury or
                hit-and-run? Different story: report it to the police (LAPD, or
                CHP if it happened on a freeway) as soon as possible.
              </p>
            </div>
          </div>
        </section>

        {/* The scripts */}
        <section className="pb-14">
          <div className="mx-auto max-w-3xl px-5 md:px-8">
            <h2 className="display text-3xl text-foreground sm:text-4xl">
              The calls are coming.
              <br />
              <span className="text-accent-lime">Here&apos;s your script.</span>
            </h2>
            <p className="mt-3 max-w-xl font-body text-base text-muted">
              Two different callers, two completely different rules. Screenshot
              these.
            </p>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-border bg-surface-light p-6">
                <p className="eyebrow text-accent-lime">
                  When YOUR insurer calls
                </p>
                <p className="mt-2 font-body text-sm leading-relaxed text-muted">
                  You have a duty to cooperate with your own company — so take
                  the call, be honest, and stick to plain facts.
                </p>
                <ul className="mt-4 flex flex-col gap-2.5">
                  <li className="font-body text-sm text-foreground">
                    ✓ <em>&ldquo;I was stopped, I was hit from behind, here&apos;s
                    where the damage is.&rdquo;</em> Facts you know.
                  </li>
                  <li className="font-body text-sm text-foreground">
                    ✓ <em>&ldquo;I don&apos;t know&rdquo;</em> is a complete
                    answer. Never guess speeds or distances.
                  </li>
                  <li className="font-body text-sm text-foreground">
                    ✓ <em>&ldquo;Can I call you back at 5?&rdquo;</em> —
                    scheduling the call is allowed. Caught off guard is how
                    mistakes happen.
                  </li>
                  <li className="font-body text-sm text-foreground">
                    ✗ Don&apos;t say <em>&ldquo;I&apos;m fine&rdquo;</em>{" "}
                    unless a doctor said so. &ldquo;I&apos;m getting checked
                    out&rdquo; is the honest version.
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-border bg-surface-light p-6">
                <p className="eyebrow text-accent-orange">
                  When THEIR insurer calls
                </p>
                <p className="mt-2 font-body text-sm leading-relaxed text-muted">
                  You have no contract with them and owe them almost nothing.
                  One polite sentence ends the call:
                </p>
                <div className="mt-4 rounded-xl border border-accent-orange/40 bg-background p-4">
                  <p className="font-body text-base leading-relaxed text-foreground">
                    &ldquo;Please handle everything through my insurance
                    company. I&apos;m not giving a recorded statement.&rdquo;
                  </p>
                </div>
                <p className="mt-3 font-body text-sm leading-relaxed text-muted">
                  That&apos;s it. Repeat it as needed, stay friendly, hang up
                  happy. You&apos;re not required to give them a recorded
                  statement, and recorded words can be interpreted against you
                  later — decline politely and keep everything in writing.
                </p>
                <p className="mt-3 font-body text-xs leading-relaxed text-muted">
                  (Only carry liability and claiming directly against their
                  insurer? You&apos;ll still need to share the basic facts — do
                  it in writing, and you can still decline the recorded
                  statement.)
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What's next + CTA */}
        <section className="pb-24">
          <div className="mx-auto max-w-3xl px-5 md:px-8">
            <div className="rounded-3xl border border-border bg-surface p-8 text-center md:p-10">
              <h2 className="display text-3xl text-foreground sm:text-4xl">
                Caught up. Now let&apos;s get ahead.
              </h2>
              <p className="mx-auto mt-3 max-w-md font-body text-base text-muted">
                Ballpark the damage in 30 seconds, check the total-loss math,
                or just tell me what happened and I&apos;ll text you a game
                plan. All free.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/#get-help"
                  className="rounded-full bg-accent-orange px-7 py-4 font-display text-base font-semibold text-background transition-transform hover:scale-105 active:scale-95"
                >
                  Get my game plan
                </Link>
                <Link
                  href="/estimate"
                  className="rounded-full border border-border bg-background px-7 py-4 font-display text-base font-semibold text-foreground transition-transform hover:scale-105 active:scale-95"
                >
                  Ballpark the damage
                </Link>
              </div>
              <p className="mt-5 font-body text-xs text-muted">
                Educational info from a working estimator — not legal or
                insurance advice. Injuries beyond soreness? Talk to a doctor
                first and consider an attorney early.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
