import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { MessageIcon, FlagIcon } from "../../components/Icons";

export const metadata: Metadata = {
  title: "The Insurance Playbook | yourcrashangel",
  description:
    "The most common moves insurance companies run on accident victims — quick lowball checks, recorded-statement traps, delay games, betterment surprises — and the exact counter for each. From a real LA collision estimator.",
  alternates: { canonical: "/playbook" },
};

const TACTICS = [
  {
    name: "The Quick Cash Offer",
    whatTheySay:
      "Good news — we'd like to resolve this for you fast. We can get you a check for $1,500 this week. We just need you to sign this release.",
    whatsReallyHappening:
      "They're calling you 24–48 hours after the crash, before you've seen a doctor or gotten a real estimate. That release usually closes the claim for good — hidden damage found later, injuries that show up next week, none of it gets covered. Fast money is cheap money, and they know exactly which one of those matters to them.",
    yourMove:
      "Don't sign anything the first week. Say: \"I'm not settling until the vehicle has been fully inspected and torn down.\" Then get a real estimate before you even think about a number — text me a photo of the damage at (213) 279-2992 and I'll tell you if their offer is a joke. It usually is.",
  },
  {
    name: "The Recorded Statement Trap",
    whatTheySay:
      "This call is being recorded. We just need a quick statement from you to process the claim — it's standard procedure.",
    whatsReallyHappening:
      "If that's the OTHER driver's insurance company, that recording exists for one reason: to find words they can use to put fault on you. California is a pure comparative negligence state — every percent of blame they pin on you comes straight out of your payout. \"I guess I didn't see him\" becomes Exhibit A.",
    yourMove:
      "You are not required to give a recorded statement to the other driver's insurer. Say: \"I'm not giving a recorded statement. You can send questions in writing.\" Your OWN insurer is different — you do have a duty to cooperate with them — but stick to facts, don't guess, and never say \"I'm fine\" before a doctor says so.",
  },
  {
    name: "The Garbage-Comps Total Loss Offer",
    whatTheySay:
      "Our market valuation report shows your vehicle's actual cash value is $9,200, based on comparable vehicles in your area.",
    whatsReallyHappening:
      "\"Your area\" can mean a base-trim car with 60,000 more miles sitting 200 miles away, marked down further by vague \"condition adjustments.\" The valuation comes from a vendor the insurer pays, built from comps that have a funny habit of landing low. The first number is an opening bid, not a verdict.",
    yourMove:
      "Demand the full valuation report in writing and check every comp — year, trim, mileage, distance. Pull 3–5 real local listings that match YOUR car and send them back in writing. No guarantees, but people often get meaningfully more just by pushing back with evidence. Stuck on the report? Text it to me.",
  },
  {
    name: "The Delay Game",
    whatTheySay:
      "It's still under review. Your adjuster is out of the office this week. Go ahead and call back Monday.",
    whatsReallyHappening:
      "Every day you wait costs you money — rental car, storage fees, a paycheck if you can't get to work — and costs them nothing. Slow-walking is a bet that you'll get tired and take whatever ends it. California rules require timely responses from insurers — generally around 15 days just to acknowledge communications — so weeks of dead silence usually isn't \"backlog.\" It's a choice.",
    yourMove:
      "Move everything to email so there's a dated paper trail. Ask for claim status and a written explanation for any delay. If the stonewalling continues, tell them you're filing a complaint with the California Department of Insurance — and mean it. That sentence wakes adjusters up like nothing else.",
  },
  {
    name: "The Betterment Surprise",
    whatTheySay:
      "There's a $212 betterment charge on your portion — the new part is an upgrade over the worn one that was on the vehicle.",
    whatsReallyHappening:
      "They're charging YOU money because the replacement part is \"better\" than your old one. Betterment has a narrow legitimate use — true wear items like tires or batteries that were already half used up — but some carriers stretch it onto parts where it doesn't belong, hoping you'll just pay it at pickup.",
    yourMove:
      "Ask them to justify the charge in writing: which part, what the measured wear was, and how they calculated the number. Push back on anything that isn't a genuine wear item — a bumper reinforcement doesn't \"wear out.\" Text me the line item before you pay it. Run from anyone who can't explain their own math. Seriously.",
  },
  {
    name: "The \"Too Minor to Claim\" Brush-Off",
    whatTheySay:
      "Honestly, that just looks like a scratched bumper. This might not even be worth filing a claim over.",
    whatsReallyHappening:
      "A modern bumper is a plastic skin over crush structures, brackets, and sensors. A clean-looking cover can hide a bent reinforcement bar, crushed absorbers, and radar that no longer aims straight. Photo-only estimates miss this stuff constantly — and if you skip the claim, the hidden damage becomes your bill forever.",
    yourMove:
      "Never let a photo decide what's behind a bumper. Get the car inspected — ideally torn down — before you write anything off. Text me a picture of the hit at (213) 279-2992. It's free, takes two minutes, and I'll tell you straight if that \"scratch\" is hiding $4,000.",
  },
];

const TIMELINE = [
  {
    phase: "Crash day",
    window: "Day 0",
    whatsNormal:
      "You exchange info, take photos of everything (cars, plates, street, their insurance card), and the car gets towed if it can't drive. Tow and storage fees start accruing daily from this moment — that clock is real.",
    redFlag:
      "A tow yard or random shop pressuring you to sign a repair authorization on the spot — sign nothing at the scene except the tow ticket.",
  },
  {
    phase: "Filing the claim",
    window: "Day 1–3",
    whatsNormal:
      "You report the crash, get a claim number, and an adjuster usually gets assigned within a couple of days. California rules require insurers to respond to you in a timely way, so early contact should be quick.",
    redFlag:
      "A week goes by and nobody can tell you who your adjuster is, or every call ends in \"someone will reach out.\"",
  },
  {
    phase: "Inspection and first estimate",
    window: "Roughly day 3–10",
    whatsNormal:
      "The car gets inspected — in person or by photos — and a written estimate is produced. Remember: in California, you pick the shop, not them.",
    redFlag:
      "Weeks pass with no inspection scheduled, or they push a photo-only estimate on a car with obvious heavy damage.",
  },
  {
    phase: "The total-loss fork",
    window: "Week 1–3, if it goes that way",
    whatsNormal:
      "If repair cost plus what the wreck is worth as salvage adds up to more than the car's value, California's formula flags it a total loss — roughly, the point where fixing it stops making financial sense. You get a valuation report, an offer, and a chance to negotiate with your own comps.",
    redFlag:
      "Pressure to accept the first number before you've seen the full valuation report, while storage fees quietly pile up to squeeze you.",
  },
  {
    phase: "Teardown and supplement",
    window: "First days after repairs start",
    whatsNormal:
      "The shop tears down the damaged area, finds what the first estimate couldn't see, and files a supplement. The adjuster typically reviews or re-inspects within a few days and approves the added work.",
    redFlag:
      "Your supplement sits \"under review\" for weeks while your car sits in pieces — that's the delay game wearing a different hat.",
  },
  {
    phase: "Parts and repair",
    window: "Usually 1–4 weeks, depending on damage and parts",
    whatsNormal:
      "Parts get ordered once supplements are approved, repairs move in stages (body, paint, reassembly, calibration), and the shop gives you updates without being chased.",
    redFlag:
      "Promise dates blow by with no explanation, or nobody at the shop can tell you what the car is actually waiting on.",
  },
  {
    phase: "Final payment and pickup",
    window: "A few days to ~2 weeks after repairs finish",
    whatsNormal:
      "The final bill matches the approved estimate plus supplements, the insurer issues payment promptly, you inspect the car in good light before driving off, and any check to you clears without drama.",
    redFlag:
      "Surprise charges appearing at pickup — betterment, storage, \"admin fees\" — or the insurer sitting on the final payment for weeks after the work is done.",
  },
];

// One pill language for the whole site (matches the navbar and the flight):
// the orange primary and the white hairline secondary, 48px tall.
const primaryBtn =
  "inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent-orange px-6 text-[0.95rem] font-bold text-white shadow-[0_1px_2px_rgb(33_26_20/0.10),0_8px_20px_-10px_rgb(33_26_20/0.35)] transition-[background-color,transform] hover:bg-accent-lime active:scale-[0.97]";
const secondaryBtn =
  "inline-flex h-12 items-center justify-center gap-2 rounded-full bg-surface px-6 text-[0.95rem] font-bold text-foreground shadow-[inset_0_0_0_1px_var(--color-border)] transition-[background-color,transform] hover:bg-surface-light active:scale-[0.97]";

export default function PlaybookPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-5 pt-28 pb-16 md:px-8 md:pt-36 md:pb-24">
        <Link
          href="/"
          className="-ml-1 inline-flex min-h-11 items-center rounded-full px-1 eyebrow text-accent-orange transition-colors hover:text-accent-lime"
        >
          ← Back to yourcrashangel
        </Link>

        <p className="mt-6 eyebrow text-accent-orange">Know their moves</p>
        <h1 className="mt-4 display text-4xl text-foreground sm:text-6xl md:text-7xl">
          They have a playbook.
          <br />
          <span className="text-accent-lime">Now you have theirs.</span>
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted md:text-xl">
          Insurance companies handle thousands of claims a day. You&apos;ll handle
          maybe a few in your life. That gap is where the money moves. These are
          the plays I watch them run on people every single week — what they say,
          what it actually means, and what to do about it.
        </p>

        {/* Triage — meet the reader where they are tonight */}
        <div className="mt-10 rounded-[var(--radius-card)] bg-accent-soft p-6 shadow-[inset_0_0_0_1px_rgb(180_66_26/0.16)] md:p-7">
          <p className="eyebrow text-accent-orange">In a hurry?</p>
          <p className="mt-3 text-base leading-relaxed text-foreground md:text-[1.05rem]">
            <strong>Insurer calling you tomorrow?</strong>{" "}
            Read Play #2 (the
            recorded statement) — two minutes, and it&apos;s the one that
            protects you on the phone.{" "}
            <strong>Already got a low offer?</strong> Play #3, then the full
            counter-punch guide at{" "}
            <Link
              href="/lowball"
              className="font-bold text-accent-orange underline decoration-accent-orange/40 underline-offset-4 transition-colors hover:text-accent-lime hover:decoration-accent-lime"
            >
              /lowball
            </Link>
            . <strong>Crash just happened and you&apos;re lost?</strong>{" "}
            <Link
              href="/start"
              className="font-bold text-accent-orange underline decoration-accent-orange/40 underline-offset-4 transition-colors hover:text-accent-lime hover:decoration-accent-lime"
            >
              Start here
            </Link>{" "}
            instead — come back to this page when the calls begin.
          </p>
        </div>

        {/* Tactics */}
        <div className="mt-14 space-y-6 md:mt-16 md:space-y-8">
          {TACTICS.map((tactic, i) => (
            <article
              key={tactic.name}
              className="rounded-[var(--radius-card)] bg-surface p-5 shadow-[var(--shadow-card)] sm:p-8 md:p-10"
            >
              <div className="flex items-center gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-accent-soft text-lg font-extrabold tabular-nums tracking-[-0.02em] text-accent-orange">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="text-2xl font-extrabold leading-tight tracking-[-0.03em] text-foreground md:text-3xl">
                  {tactic.name}
                </h2>
              </div>

              <blockquote className="mt-6 rounded-[var(--radius-inner)] bg-surface-light px-4 py-3.5 sm:px-5 sm:py-4 text-base italic leading-relaxed text-foreground md:text-[1.05rem]">
                &ldquo;{tactic.whatTheySay}&rdquo;
              </blockquote>

              <p className="mt-7 eyebrow text-muted">
                What&apos;s really happening
              </p>
              <p className="mt-2 text-base leading-relaxed text-muted md:text-[1.05rem]">
                {tactic.whatsReallyHappening}
              </p>

              <div className="mt-6 rounded-[var(--radius-inner)] bg-accent-soft p-4 sm:p-5">
                <p className="eyebrow text-accent-lime">
                  Your move
                </p>
                <p className="mt-2 text-base leading-relaxed text-foreground md:text-[1.05rem]">
                  {tactic.yourMove}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Timeline */}
        <h2 className="mt-20 display text-4xl text-foreground sm:text-5xl md:mt-24 md:text-6xl">
          What a claim is{" "}
          <span className="text-accent-lime">supposed to look like.</span>
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          Half the stress is not knowing what&apos;s normal. Here&apos;s the
          honest week-by-week — and what stalling looks like at every stage.
        </p>

        <div className="mt-10 rounded-[var(--radius-card)] bg-surface p-5 shadow-[var(--shadow-card)] sm:p-8 md:p-10">
          {TIMELINE.map((step, i) => (
            <div
              key={step.phase}
              className={`relative flex gap-4 sm:gap-5 md:gap-6 ${i < TIMELINE.length - 1 ? "pb-10" : ""}`}
            >
              {/* line + dot */}
              <div className="flex flex-col items-center">
                <span className="mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full bg-accent-orange ring-4 ring-accent-soft" />
                {i < TIMELINE.length - 1 && (
                  <span className="mt-3 w-px flex-1 bg-border" aria-hidden="true" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <h3 className="text-xl font-extrabold tracking-[-0.02em] text-foreground">
                    {step.phase}
                  </h3>
                  <span className="spec-chip">{step.window}</span>
                </div>
                <p className="mt-3 text-base leading-relaxed text-muted">
                  {step.whatsNormal}
                </p>
                <p className="mt-4 rounded-[var(--radius-inner)] bg-accent-soft px-4 py-3 text-sm leading-relaxed text-foreground">
                  <strong className="eyebrow inline-flex items-center gap-1.5 text-accent-orange">
                    <FlagIcon className="h-3.5 w-3.5" />
                    Red flag:
                  </strong>{" "}
                  {step.redFlag}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-[var(--radius-card)] bg-surface p-6 shadow-[var(--shadow-lift)] sm:p-8 md:p-10">
          <h2 className="text-2xl font-extrabold tracking-[-0.03em] text-foreground md:text-3xl">
            See one of these plays happening to you?
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted md:text-lg">
            Text me what they said, or a photo of the estimate or offer.
            I&apos;ll tell you which play it is and what to say back. Free, no
            strings attached.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href="sms:+12132792992"
              className={primaryBtn}
            >
              <MessageIcon className="h-4 w-4" />
              Text: (213) 279-2992
            </a>
            <Link
              href="/decoder"
              className={secondaryBtn}
            >
              Next: learn their language →
            </Link>
          </div>
        </div>

        <div className="mt-10 rounded-[var(--radius-card)] bg-surface p-6 shadow-[inset_0_0_0_1px_var(--color-border)]">
          <p className="text-xs leading-relaxed text-muted">
            <strong className="text-foreground">Disclaimer:</strong>{" "}
            This page is for
            educational and informational purposes only. It is not legal,
            insurance, financial, or professional advice, and it doesn&apos;t
            describe any specific company. Every accident and claim is
            different. For advice specific to your situation, consult a licensed
            attorney, public adjuster, or insurance professional.
          </p>
        </div>

        <p className="mt-8 text-center text-sm text-muted">
          Made by{" "}
          <Link
            href="/"
            className="font-bold text-accent-orange transition-colors hover:text-accent-lime"
          >
            @yourcrashangel
          </Link>{" "}
          — The Accident Translator
        </p>
      </div>
      </main>
      <Footer />
    </>
  );
}
