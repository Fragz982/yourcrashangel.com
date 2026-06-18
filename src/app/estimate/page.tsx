import type { Metadata } from "next";
import Link from "next/link";
import EstimateTool from "../../components/EstimateTool";

export const metadata: Metadata = {
  title: "What's This Gonna Cost? — Free Estimate Tool | yourcrashangel",
  description:
    "Pull up your car by VIN, show the damage, and get a rough visual ballpark for collision repair in 30 seconds — plus the honest truth about going through insurance. Free, from a real LA collision estimator.",
  alternates: { canonical: "/estimate" },
};

export default function EstimatePage() {
  return (
    <div id="main" className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
        <Link
          href="/"
          className="inline-block eyebrow text-accent-orange transition-colors hover:text-accent-lime"
        >
          ← Back to yourcrashangel
        </Link>

        <p className="mt-10 eyebrow text-accent-orange">Free tool</p>
        <h1 className="mt-4 display text-5xl text-foreground sm:text-6xl md:text-7xl">
          What&apos;s this
          <br />
          <span className="text-accent-lime">gonna cost?</span>
        </h1>
        <p className="mt-5 max-w-xl font-body text-lg leading-relaxed text-muted">
          Pull up your car, show me the damage, and I&apos;ll give you a rough
          ballpark in about 30 seconds — then the honest truth about what to do
          next. No sign-up, nothing stored.
        </p>

        <div className="mt-12">
          <EstimateTool />
        </div>

        <p className="mt-12 text-center font-display text-sm text-muted">
          Made by{" "}
          <Link
            href="/"
            className="font-semibold text-accent-orange transition-colors hover:text-accent-lime"
          >
            @yourcrashangel
          </Link>{" "}
          — The Accident Translator
        </p>
      </div>
    </div>
  );
}
