import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import type { Metadata } from "next";
import ShareBlock from "../../components/ShareBlock";
import { CheckIcon, PhoneIcon } from "../../components/Icons";

export const metadata: Metadata = {
  title: "Got it — I'm on it | yourcrashangel",
  description: "Your message is in. Here's what happens next.",
  robots: { index: false },
  alternates: { canonical: "/thanks" },
};

// "While you wait" tiles: white cards that lift a hair on hover.
const tile =
  "flex min-h-[5.5rem] flex-col justify-center rounded-[var(--radius-card)] bg-surface px-5 py-4 text-left shadow-[var(--shadow-card)] transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]";

export default function Thanks() {
  return (
    <>
    <Navbar />
    <main id="main" className="flex min-h-screen flex-col items-center justify-center bg-background px-5 pb-16 pt-28 text-center sm:px-6 md:pb-24 md:pt-32">
      <span
        aria-hidden="true"
        className="grid h-14 w-14 place-items-center rounded-full bg-accent-soft text-accent-orange shadow-[inset_0_0_0_1px_rgb(180_66_26/0.15)]"
      >
        <CheckIcon className="h-6 w-6" />
      </span>
      <p className="mt-6 eyebrow text-accent-orange">Message received</p>
      <h1 className="mt-4 display text-[2.75rem] text-foreground sm:text-6xl md:text-7xl">
        You&apos;re not
        <br />
        <span className="text-accent-orange">alone in this.</span>
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
        className="mt-8 inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-accent-orange px-8 text-lg font-bold tracking-[-0.01em] text-white shadow-[0_1px_2px_rgb(33_26_20/0.10),0_8px_20px_-10px_rgb(33_26_20/0.35)] transition-[background-color,scale] duration-150 hover:bg-accent-lime active:scale-[0.97]"
      >
        <PhoneIcon className="h-5 w-5" />
        (213) 279-2992
      </a>
      <div className="mt-14 w-full max-w-2xl">
        <p className="eyebrow text-muted">While you wait</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <Link href="/checklist" className={tile}>
            <p className="font-display text-base font-bold tracking-[-0.01em] text-foreground">
              The first 24 hours
            </p>
            <p className="mt-1 font-body text-sm text-muted">
              Step-by-step checklist →
            </p>
          </Link>
          <Link href="/estimate" className={tile}>
            <p className="font-display text-base font-bold tracking-[-0.01em] text-foreground">
              Ballpark your repair
            </p>
            <p className="mt-1 font-body text-sm text-muted">
              30-second estimate →
            </p>
          </Link>
          <Link href="/totaled" className={tile}>
            <p className="font-display text-base font-bold tracking-[-0.01em] text-foreground">
              Think it&apos;s totaled?
            </p>
            <p className="mt-1 font-body text-sm text-muted">
              Run the math →
            </p>
          </Link>
        </div>
      </div>
      <div className="mt-4 w-full max-w-2xl text-left">
        <ShareBlock />
      </div>
      <Link
        href="/"
        className="mt-8 inline-flex h-11 items-center rounded-full px-5 font-body text-sm font-semibold text-muted underline decoration-foreground/25 underline-offset-4 transition-colors hover:text-foreground hover:decoration-accent-orange"
      >
        Back to yourcrashangel.com
      </Link>
    </main>
    <Footer />
    </>
  );
}
