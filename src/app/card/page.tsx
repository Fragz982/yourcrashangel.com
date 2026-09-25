import type { Metadata } from "next";
import { PhoneIcon } from "../../components/Icons";

export const metadata: Metadata = {
  title: "Accident flyer — print me | yourcrashangel",
  description:
    "Printable take-home flyer: what to do after a crash, your California rights, and the three decisions coming your way.",
  robots: { index: false },
  alternates: { canonical: "/card" },
};

// Section heads and rows share one rhythm. Backgrounds and shadows don't
// print by default, so anything that frames content on paper uses a border.
const sectionHead = "display text-xl text-foreground sm:text-2xl";
const sectionNum = "mr-1 text-accent-orange";
const row = "font-body text-sm leading-relaxed text-foreground sm:text-[0.95rem] print:text-sm print:leading-snug";

// One-page take-home flyer. The paper IS the help: it answers the decisions a
// crash victim is about to face so they can read it at home, calm. The QR is a
// small "when you're ready" corner — not the point of the page.
export default function Flyer() {
  return (
    <main className="min-h-screen bg-background px-4 py-8 sm:px-6 sm:py-12 print:bg-white print:p-0">
      <div className="mx-auto max-w-2xl">
        <p className="mx-auto mb-6 max-w-lg text-center font-body text-sm leading-relaxed text-muted print:hidden">
          Print a stack (Ctrl/Cmd+P) for the counter and the waiting room. It
          reads like help, not an ad — people keep what helps them.
        </p>

        <div className="rounded-[var(--radius-card)] bg-surface p-6 shadow-[var(--shadow-lift)] sm:p-9 print:rounded-none print:p-2 print:shadow-none">
          {/* Header */}
          <div className="border-b border-border pb-5 print:border-foreground print:pb-3">
            <p className="eyebrow text-accent-orange">
              Keep this — you&apos;ll want it tonight
            </p>
            <h1 className="mt-3 display text-[2.5rem] text-foreground sm:text-5xl">
              Just crashed?
              <br />
              <span className="text-accent-orange">Breathe.</span>
            </h1>
            <p className="mt-4 font-body text-[0.95rem] leading-relaxed text-muted print:text-sm">
              I&apos;m Angel — a collision estimator in Los Angeles. This page
              is the five-minute version of what I tell my own friends after an
              accident. No catch, no pitch. It&apos;s just easier to read this
              at home than to figure it out at a counter.
            </p>
          </div>

          {/* Prominent contact bar — the number should catch the eye up top too */}
          <a
            href="tel:+12132792992"
            className="mt-5 flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 rounded-[var(--radius-inner)] bg-accent-soft px-5 py-4 transition-colors hover:bg-accent-orange/10 print:mt-3 print:rounded-lg print:border-2 print:border-accent-orange print:bg-transparent print:py-2.5"
          >
            <span className="font-display text-sm font-semibold text-foreground">
              Free help, any hour — call or text:
            </span>
            <span className="inline-flex items-center gap-2 font-mono text-xl font-extrabold tracking-[-0.02em] whitespace-nowrap text-accent-orange">
              <PhoneIcon className="h-5 w-5 print:hidden" />
              (213) 279-2992
            </span>
          </a>

          {/* Right now */}
          <div className="mt-7 print:mt-4">
            <h2 className={sectionHead}>
              <span className={sectionNum}>1 ·</span> Before you leave
              the scene / the shop
            </h2>
            <ul className="mt-3 flex flex-col gap-2 print:mt-2 print:gap-1.5">
              <li className={row}>
                <b>Photos of everything</b> — all four corners of both cars,
                the other plate, their insurance card, the street.
              </li>
              <li className={row}>
                <b>Don&apos;t discuss fault</b>{" "}— not to the other driver,
                not on the phone. &ldquo;I&apos;m getting checked out and
                I&apos;ll follow up&rdquo; is a complete sentence.
              </li>
              <li className={row}>
                <b>If it&apos;s towed, YOU say where it goes.</b> A tow yard
                charges storage by the day.
              </li>
              <li className={row}>
                <b>Anything hurts? Doctor today.</b> Paper trail beats
                toughing it out.
              </li>
            </ul>
          </div>

          {/* Rights */}
          <div className="mt-7 print:mt-4">
            <h2 className={sectionHead}>
              <span className={sectionNum}>2 ·</span> Your rights in
              California (most people don&apos;t know these)
            </h2>
            <ul className="mt-3 flex flex-col gap-2 print:mt-2 print:gap-1.5">
              <li className={row}>
                <b>You choose the body shop.</b>{" "}Your insurer can recommend
                one — some recommended shops are excellent — but by law (Ins.
                Code 758.5) the choice is yours, and they can&apos;t punish you
                for it.
              </li>
              <li className={row}>
                <b>You can get your own estimate</b> before agreeing to
                anything. A second set of eyes is normal, not rude.
              </li>
              <li className={row}>
                <b>&ldquo;Total loss&rdquo; is math, not a verdict</b>{" "}—
                repair cost + salvage value vs. what your car&apos;s worth. The
                number worth checking is what they say your car is <i>worth</i>.
              </li>
            </ul>
          </div>

          {/* Decisions */}
          <div className="mt-7 print:mt-4">
            <h2 className={sectionHead}>
              <span className={sectionNum}>3 ·</span> The three
              decisions coming your way
            </h2>
            <ul className="mt-3 flex flex-col gap-2 print:mt-2 print:gap-1.5">
              <li className={row}>
                <b>Claim it, or pay cash?</b> Get the real repair number FIRST
                — small damage is sometimes cheaper out of pocket than a claim.
              </li>
              <li className={row}>
                <b>Repair or total?</b>{" "}Don&apos;t argue the damage — check
                their value number against real listings for your exact car.
              </li>
              <li className={row}>
                <b>Which shop?</b> Pick on reputation and communication, never
                on pressure. A good shop welcomes your questions.
              </li>
            </ul>
          </div>

          {/* Footer CTA band — the "act now" zone, phone as the hero */}
          <div className="mt-8 rounded-[var(--radius-inner)] border border-border p-5 sm:p-6 print:mt-5 print:rounded-lg print:border-2 print:border-foreground">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="eyebrow text-accent-orange">
                  When the adrenaline wears off
                </p>
                <a
                  href="tel:+12132792992"
                  className="mt-2 block font-mono text-[2rem] font-extrabold leading-none tracking-[-0.03em] text-foreground transition-colors hover:text-accent-orange sm:text-4xl"
                >
                  (213) 279-2992
                </a>
                <p className="mt-3 font-body text-sm leading-relaxed text-muted">
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
              <div className="flex shrink-0 flex-col items-center self-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/qr.png"
                  alt="QR code — opens yourcrashangel.com"
                  className="h-28 w-28 rounded-[10px] border border-border bg-white p-1.5"
                />
                <span className="mt-1.5 font-mono text-[0.65rem] font-bold uppercase tracking-[0.15em] text-muted">
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
