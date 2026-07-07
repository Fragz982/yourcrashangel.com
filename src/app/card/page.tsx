import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crash card — print me | yourcrashangel",
  robots: { index: false },
};

// Printable counter card / flyer. Print it, stack it at the front desk, hand it
// to every customer, tow driver, and adjuster. QR goes straight to the site.
export default function Card() {
  return (
    <main className="min-h-screen bg-background px-6 py-10 print:bg-white print:p-0">
      <div className="mx-auto max-w-md">
        <p className="mb-5 text-center font-body text-sm text-muted print:hidden">
          Print this page (Ctrl/Cmd+P) → stack it at the counter → hand it to
          every customer, tow driver, and adjuster you meet.
        </p>

        <div className="rounded-3xl border-2 border-foreground bg-surface p-8 text-center print:rounded-xl">
          <p className="eyebrow text-accent-orange">Just crashed? Breathe.</p>
          <h1 className="mt-3 display text-5xl leading-none text-foreground">
            your crash
            <br />
            <span className="text-accent-lime">angel</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xs font-body text-base leading-relaxed text-muted">
            Free, honest answers from a real collision estimator — before you
            sign anything or accept any number.
          </p>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/qr.png"
            alt="QR code — scan to open yourcrashangel.com"
            className="mx-auto mt-6 h-44 w-44 rounded-xl border border-border bg-white p-2"
          />

          <p className="mt-4 font-mono text-base font-semibold tracking-wide text-foreground">
            yourcrashangel.com
          </p>
          <p className="mt-1 font-mono text-sm text-accent-orange">
            (213) 279-2992 · call or text
          </p>

          <div className="mx-auto mt-5 flex max-w-xs flex-col gap-1 text-left">
            <p className="font-body text-xs text-muted">
              ✓ 30-second ballpark estimate — scan your VIN with your phone
            </p>
            <p className="font-body text-xs text-muted">
              ✓ Real repairs, real cars — see the before &amp; afters
            </p>
            <p className="font-body text-xs text-muted">
              ✓ Total-loss, OEM parts, insurance — explained straight
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
