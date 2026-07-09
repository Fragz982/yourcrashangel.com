import Link from "next/link";
import type { Metadata } from "next";
import ShareBlock from "../../components/ShareBlock";

export const metadata: Metadata = {
  title: "Got it — I'm on it | yourcrashangel",
  description: "Your message is in. Here's what happens next.",
  robots: { index: false },
  alternates: { canonical: "/thanks" },
};

export default function Thanks() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-24 text-center">
      <p className="eyebrow text-accent-orange">Message received</p>
      <h1 className="mt-4 display text-5xl text-foreground sm:text-6xl">
        You&apos;re not
        <br />
        <span className="text-accent-lime">alone in this.</span>
      </h1>
      <p className="mt-6 max-w-md font-body text-lg leading-relaxed text-muted">
        I read every message myself — expect a reply{" "}
        <strong className="text-foreground">
          within a few hours, 7 days a week
        </strong>{" "}
        (7am&ndash;9pm; overnight messages get answered first thing). If
        it&apos;s urgent — car&apos;s undrivable, insurance pushing you to
        decide right now — call or text me directly:
      </p>
      <a
        href="tel:+12132792992"
        className="mt-8 rounded-full bg-accent-orange px-8 py-4 font-display text-lg font-semibold text-background transition-transform hover:scale-105 active:scale-95"
      >
        (213) 279-2992
      </a>
      <div className="mt-10 w-full max-w-2xl">
        <p className="eyebrow text-muted">While you wait</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <Link
            href="/checklist"
            className="rounded-2xl border border-border bg-surface p-4 text-left transition-colors hover:border-accent-orange/40"
          >
            <p className="font-display text-sm font-semibold text-foreground">
              The first 24 hours
            </p>
            <p className="mt-1 font-body text-xs text-muted">
              Step-by-step checklist →
            </p>
          </Link>
          <Link
            href="/estimate"
            className="rounded-2xl border border-border bg-surface p-4 text-left transition-colors hover:border-accent-orange/40"
          >
            <p className="font-display text-sm font-semibold text-foreground">
              Ballpark your repair
            </p>
            <p className="mt-1 font-body text-xs text-muted">
              30-second estimate →
            </p>
          </Link>
          <Link
            href="/totaled"
            className="rounded-2xl border border-border bg-surface p-4 text-left transition-colors hover:border-accent-orange/40"
          >
            <p className="font-display text-sm font-semibold text-foreground">
              Think it&apos;s totaled?
            </p>
            <p className="mt-1 font-body text-xs text-muted">
              Run the math →
            </p>
          </Link>
        </div>
      </div>
      <div className="mt-8 w-full max-w-2xl text-left">
        <ShareBlock />
      </div>
      <Link
        href="/"
        className="mt-8 font-body text-sm text-muted underline underline-offset-4"
      >
        Back to yourcrashangel.com
      </Link>
    </main>
  );
}
