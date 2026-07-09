import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accident flyer — print me | yourcrashangel",
  description:
    "Printable take-home flyer: what to do after a crash, your California rights, and the three decisions coming your way.",
  robots: { index: false },
  alternates: { canonical: "/card" },
};

// One-page take-home flyer. The paper IS the help: it answers the decisions a
// crash victim is about to face so they can read it at home, calm. The QR is a
// small "when you're ready" corner — not the point of the page.
export default function Flyer() {
  return (
    <main className="min-h-screen bg-background px-6 py-10 print:bg-white print:p-0">
      <div className="mx-auto max-w-2xl">
        <p className="mb-5 text-center font-body text-sm text-muted print:hidden">
          Print a stack (Ctrl/Cmd+P) for the counter and the waiting room. It
          reads like help, not an ad — people keep what helps them.
        </p>

        <div className="rounded-3xl border-2 border-foreground bg-background p-8 print:rounded-none print:border-0 print:p-2">
          {/* Header */}
          <div className="border-b-2 border-foreground pb-4">
            <p className="eyebrow text-accent-orange">
              Keep this — you&apos;ll want it tonight
            </p>
            <h1 className="mt-2 display text-5xl leading-none text-foreground">
              Just crashed?
              <br />
              <span className="text-accent-lime">Breathe.</span>
            </h1>
            <p className="mt-3 font-body text-sm leading-relaxed text-muted">
              I&apos;m Angel — a collision estimator in Los Angeles. This page
              is the five-minute version of what I tell my own friends after an
              accident. No catch, no pitch. It&apos;s just easier to read this
              at home than to figure it out at a counter.
            </p>
          </div>

          {/* Prominent contact bar — the number should catch the eye up top too */}
          <a
            href="tel:+12132792992"
            className="mt-4 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-2xl border-2 border-accent-orange bg-accent-orange/5 px-5 py-3 print:rounded-lg"
          >
            <span className="font-display text-sm font-semibold text-foreground">
              Free help, any hour — call or text:
            </span>
            <span className="font-mono text-xl font-bold whitespace-nowrap text-accent-orange">
              (213) 279-2992
            </span>
          </a>

          {/* Right now */}
          <div className="mt-5">
            <h2 className="display text-xl text-foreground">
              <span className="text-accent-orange">1 ·</span> Before you leave
              the scene / the shop
            </h2>
            <ul className="mt-2 flex flex-col gap-1.5">
              <li className="font-body text-sm text-foreground">
                <b>Photos of everything</b> — all four corners of both cars,
                the other plate, their insurance card, the street.
              </li>
              <li className="font-body text-sm text-foreground">
                <b>Don&apos;t discuss fault</b>{" "}— not to the other driver,
                not on the phone. &ldquo;I&apos;m getting checked out and
                I&apos;ll follow up&rdquo; is a complete sentence.
              </li>
              <li className="font-body text-sm text-foreground">
                <b>If it&apos;s towed, YOU say where it goes.</b> A tow yard
                charges storage by the day.
              </li>
              <li className="font-body text-sm text-foreground">
                <b>Anything hurts? Doctor today.</b> Paper trail beats
                toughing it out.
              </li>
            </ul>
          </div>

          {/* Rights */}
          <div className="mt-5">
            <h2 className="display text-xl text-foreground">
              <span className="text-accent-orange">2 ·</span> Your rights in
              California (most people don&apos;t know these)
            </h2>
            <ul className="mt-2 flex flex-col gap-1.5">
              <li className="font-body text-sm text-foreground">
                <b>You choose the body shop.</b>{" "}Your insurer can recommend
                one — some recommended shops are excellent — but by law (Ins.
                Code 758.5) the choice is yours, and they can&apos;t punish you
                for it.
              </li>
              <li className="font-body text-sm text-foreground">
                <b>You can get your own estimate</b> before agreeing to
                anything. A second set of eyes is normal, not rude.
              </li>
              <li className="font-body text-sm text-foreground">
                <b>&ldquo;Total loss&rdquo; is math, not a verdict</b>{" "}—
                repair cost + salvage value vs. what your car&apos;s worth. The
                number worth checking is what they say your car is <i>worth</i>.
              </li>
            </ul>
          </div>

          {/* Decisions */}
          <div className="mt-5">
            <h2 className="display text-xl text-foreground">
              <span className="text-accent-orange">3 ·</span> The three
              decisions coming your way
            </h2>
            <ul className="mt-2 flex flex-col gap-1.5">
              <li className="font-body text-sm text-foreground">
                <b>Claim it, or pay cash?</b> Get the real repair number FIRST
                — small damage is sometimes cheaper out of pocket than a claim.
              </li>
              <li className="font-body text-sm text-foreground">
                <b>Repair or total?</b>{" "}Don&apos;t argue the damage — check
                their value number against real listings for your exact car.
              </li>
              <li className="font-body text-sm text-foreground">
                <b>Which shop?</b> Pick on reputation and communication, never
                on pressure. A good shop welcomes your questions.
              </li>
            </ul>
          </div>

          {/* Footer CTA band — the "act now" zone, phone as the hero */}
          <div className="mt-6 rounded-2xl border-2 border-foreground bg-surface p-5 print:rounded-lg">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="eyebrow text-accent-orange">
                  When the adrenaline wears off
                </p>
                <a
                  href="tel:+12132792992"
                  className="mt-1 block font-mono text-3xl font-bold leading-none text-foreground sm:text-4xl"
                >
                  (213) 279-2992
                </a>
                <p className="mt-2 font-body text-sm leading-relaxed text-muted">
                  Call or text me a photo of your car — or any paperwork — and
                  I&apos;ll tell you what I see. Free, no pressure, no spam.
                </p>
                <p className="mt-3 font-body text-xs leading-relaxed text-muted">
                  Or from the couch tonight: 30-second ballpark estimate ·
                  total-loss calculator · estimate decoder — all free at{" "}
                  <span className="font-mono font-semibold text-foreground">
                    yourcrashangel.com
                  </span>
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/qr.png"
                  alt="QR code — opens yourcrashangel.com"
                  className="h-28 w-28 rounded-lg border border-border bg-white p-1.5"
                />
                <span className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.15em] text-muted">
                  Scan me
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
