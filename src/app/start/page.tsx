import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { CheckIcon, XIcon } from "../../components/Icons";

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

// One card, one button language for the whole site (EstimateGuard / flight).
const card =
  "rounded-[var(--radius-card)] bg-surface shadow-[var(--shadow-card)]";
const btnPrimary =
  "inline-flex h-14 items-center justify-center gap-2 rounded-full bg-accent-orange px-7 text-base font-bold tracking-[-0.01em] text-white shadow-[0_1px_2px_rgb(33_26_20/0.10),0_8px_20px_-10px_rgb(33_26_20/0.35)] transition-[background-color,scale] duration-150 hover:bg-accent-lime active:scale-[0.97]";
const btnSecondary =
  "inline-flex h-14 items-center justify-center gap-2 rounded-full bg-surface px-7 text-base font-bold tracking-[-0.01em] text-foreground shadow-[inset_0_0_0_1px_var(--color-border)] transition-[background-color,scale] duration-150 hover:bg-surface-light active:scale-[0.97]";
const scriptItem = "flex gap-3 font-body text-[0.95rem] leading-relaxed text-foreground";
const yesMark =
  "mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent-soft text-accent-orange";
const noMark =
  "mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-foreground text-white";

export default function Start() {
  return (
    <>
      <Navbar />
      <main id="main" className="bg-background">
        {/* Hero */}
        <section className="pt-32 pb-12 md:pt-44 md:pb-16">
          <div className="mx-auto max-w-4xl px-5 md:px-8">
            <p className="eyebrow flex items-center gap-3 text-accent-orange">
              <span
                aria-hidden="true"
                className="hidden h-px w-8 shrink-0 bg-accent-orange sm:block"
              />
              It&apos;s been a day (or three) — you&apos;re not behind
            </p>
            <h1 className="mt-5 display text-[2.6rem] text-foreground sm:text-6xl md:text-7xl">
              The crash already
              <br className="hidden sm:inline" />{" "}
              happened. <span className="text-accent-orange">Start here.</span>
            </h1>
            <p className="mt-6 max-w-xl font-body text-lg leading-relaxed text-muted md:text-xl">
              Most advice assumes you&apos;re still standing at the scene.
              You&apos;re not — you&apos;re on the couch, the adrenaline wore
              off, and the phone is about to start ringing. Here&apos;s what
              still matters, in order.
            </p>
          </div>
        </section>

        {/* Still recoverable */}
        <section className="pb-16 md:pb-20">
          <div className="mx-auto max-w-4xl px-5 md:px-8">
            <h2 className="display text-[2.1rem] text-foreground sm:text-5xl">
              Still recoverable — do these first.
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2 md:gap-5">
              {RECOVER.map((r, i) => (
                <div key={r.t} className={`${card} p-6 md:p-7`}>
                  <div className="flex items-start gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent-orange font-display text-base font-extrabold text-white">
                      {i + 1}
                    </span>
                    <p className="pt-1.5 font-display text-xl font-bold leading-snug tracking-[-0.02em] text-foreground">
                      {r.t}
                    </p>
                  </div>
                  <p className="mt-3 font-body text-[0.95rem] leading-relaxed text-muted md:pl-14">
                    {r.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SR-1 + police report reality */}
        <section className="pb-16 md:pb-20">
          <div className="mx-auto max-w-4xl px-5 md:px-8">
            <div className="relative overflow-hidden rounded-[var(--radius-card)] bg-surface p-6 shadow-[var(--shadow-lift)] sm:p-8 md:p-10">
              <span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-1.5 bg-accent-orange"
              />
              <p className="eyebrow inline-flex items-center rounded-full bg-accent-soft px-3.5 py-2 text-accent-lime">
                The one real deadline
              </p>
              <h2 className="mt-4 display text-3xl text-foreground md:text-5xl">
                California&apos;s 10-day rule (SR-1)
              </h2>
              <p className="mt-4 max-w-3xl font-body text-base leading-relaxed text-muted md:text-lg">
                If anyone was hurt — even a little — or the damage looks like
                more than <strong className="text-foreground">$1,000</strong>{" "}
                (which is almost any visible dent these days), California
                requires you to file an{" "}
                <strong className="text-foreground">SR-1 report with the DMV
                within 10 days</strong>{" "}of the crash. It&apos;s separate from
                the police report and separate from your insurance claim, it
                takes about ten minutes online at dmv.ca.gov, and skipping it
                can put your license at risk. Your insurer or agent can help —
                but the legal duty is yours.
              </p>
              <p className="mt-6 rounded-[var(--radius-inner)] bg-surface-light p-5 font-body text-sm leading-relaxed text-muted md:text-[0.95rem]">
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
        <section className="pb-16 md:pb-20">
          <div className="mx-auto max-w-4xl px-5 md:px-8">
            <h2 className="display text-[2.1rem] text-foreground sm:text-5xl">
              The calls are coming.
              <br className="hidden sm:inline" />{" "}
              <span className="text-accent-orange">Here&apos;s your script.</span>
            </h2>
            <p className="mt-4 max-w-xl font-body text-lg text-muted">
              Two different callers, two completely different rules. Screenshot
              these.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2 md:gap-5">
              <div className={`${card} p-6 md:p-7`}>
                <p className="eyebrow text-accent-lime">
                  When YOUR insurer calls
                </p>
                <p className="mt-3 font-body text-[0.95rem] leading-relaxed text-muted">
                  You have a duty to cooperate with your own company — so take
                  the call, be honest, and stick to plain facts.
                </p>
                <ul className="mt-5 flex flex-col gap-3.5 border-t border-border pt-5">
                  <li className={scriptItem}>
                    <span className={yesMark}>
                      <CheckIcon className="h-3.5 w-3.5" />
                      <span className="sr-only">Do say: </span>
                    </span>
                    <span>
                      <em>&ldquo;I was stopped, I was hit from behind, here&apos;s
                      where the damage is.&rdquo;</em> Facts you know.
                    </span>
                  </li>
                  <li className={scriptItem}>
                    <span className={yesMark}>
                      <CheckIcon className="h-3.5 w-3.5" />
                      <span className="sr-only">Do say: </span>
                    </span>
                    <span>
                      <em>&ldquo;I don&apos;t know&rdquo;</em> is a complete
                      answer. Never guess speeds or distances.
                    </span>
                  </li>
                  <li className={scriptItem}>
                    <span className={yesMark}>
                      <CheckIcon className="h-3.5 w-3.5" />
                      <span className="sr-only">Do say: </span>
                    </span>
                    <span>
                      <em>&ldquo;Can I call you back at 5?&rdquo;</em> —
                      scheduling the call is allowed. Caught off guard is how
                      mistakes happen.
                    </span>
                  </li>
                  <li className={scriptItem}>
                    <span className={noMark}>
                      <XIcon className="h-3.5 w-3.5" />
                      <span className="sr-only">Don&apos;t: </span>
                    </span>
                    <span>
                      Don&apos;t say <em>&ldquo;I&apos;m fine&rdquo;</em>{" "}
                      unless a doctor said so. &ldquo;I&apos;m getting checked
                      out&rdquo; is the honest version.
                    </span>
                  </li>
                </ul>
              </div>

              <div className={`${card} p-6 md:p-7`}>
                <p className="eyebrow text-accent-orange">
                  When THEIR insurer calls
                </p>
                <p className="mt-3 font-body text-[0.95rem] leading-relaxed text-muted">
                  You have no contract with them and owe them almost nothing.
                  One polite sentence ends the call:
                </p>
                <div className="mt-5 rounded-[var(--radius-inner)] bg-accent-soft p-5">
                  <p className="font-display text-lg font-semibold leading-snug tracking-[-0.01em] text-foreground md:text-xl">
                    &ldquo;Please handle everything through my insurance
                    company. I&apos;m not giving a recorded statement.&rdquo;
                  </p>
                </div>
                <p className="mt-4 font-body text-[0.95rem] leading-relaxed text-muted">
                  That&apos;s it. Repeat it as needed, stay friendly, hang up
                  happy. You&apos;re not required to give them a recorded
                  statement, and recorded words can be interpreted against you
                  later — decline politely and keep everything in writing.
                </p>
                <p className="mt-3 font-body text-sm leading-relaxed text-muted">
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
        <section className="pb-20 md:pb-28">
          <div className="mx-auto max-w-4xl px-5 md:px-8">
            <div className="rounded-[var(--radius-card)] bg-surface px-6 py-10 text-center shadow-[var(--shadow-lift)] sm:px-10 md:py-14">
              <h2 className="display text-[2.1rem] text-foreground sm:text-5xl">
                Caught up. Now let&apos;s get ahead.
              </h2>
              <p className="mx-auto mt-4 max-w-md font-body text-lg leading-relaxed text-muted">
                Ballpark the damage in 30 seconds, check the total-loss math,
                or just tell me what happened and I&apos;ll text you a game
                plan. All free.
              </p>
              <div className="mx-auto mt-8 flex max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
                <Link href="/#get-help" className={btnPrimary}>
                  Get my game plan
                </Link>
                <Link href="/estimate" className={btnSecondary}>
                  Ballpark the damage
                </Link>
              </div>
              <p className="mx-auto mt-8 max-w-lg font-body text-xs leading-relaxed text-muted">
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
