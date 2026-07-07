import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Got it — I'm on it | yourcrashangel",
  robots: { index: false },
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
        I read every message myself and usually get back fast. If it&apos;s
        urgent — like the car&apos;s undrivable or insurance is pushing you to
        decide right now — call or text me directly:
      </p>
      <a
        href="tel:+12132792992"
        className="mt-8 rounded-full bg-accent-orange px-8 py-4 font-display text-lg font-semibold text-background transition-transform hover:scale-105 active:scale-95"
      >
        (213) 279-2992
      </a>
      <Link
        href="/"
        className="mt-6 font-body text-sm text-muted underline underline-offset-4"
      >
        Back to yourcrashangel.com
      </Link>
    </main>
  );
}
