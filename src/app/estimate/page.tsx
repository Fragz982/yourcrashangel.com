import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import EstimateTool from "../../components/EstimateTool";

export const metadata: Metadata = {
  title: "What's This Gonna Cost? — Free Estimate Tool | yourcrashangel",
  description:
    "Pull up your car by VIN, show the damage, and get a rough visual ballpark for collision repair in 30 seconds — plus the honest truth about going through insurance. Free, from a real LA collision estimator.",
  alternates: { canonical: "/estimate" },
  openGraph: {
    title: "What's this gonna cost? Free 30-second collision ballpark",
    description:
      "Show the damage, get a real range — from a working LA collision estimator. No sign-up, nothing stored.",
    url: "https://yourcrashangel.com/estimate",
  },
};

export default function EstimatePage() {
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-5 pt-32 pb-16 md:px-8 md:pt-40 md:pb-24">
        <p className="eyebrow text-accent-orange">Free tool</p>
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
        <p className="mt-3 font-body text-sm text-muted">
          Rather skip the tool?{" "}
          <a
            href="sms:+12132792992"
            className="font-semibold text-accent-orange transition-colors hover:text-accent-lime"
          >
            Text me a photo instead
          </a>{" "}
          — (213) 279-2992, answered 7am&ndash;9pm.
        </p>

        <div className="mt-12">
          <EstimateTool />
        </div>

        <p className="mt-10 rounded-xl bg-surface p-5 font-body text-xs leading-relaxed text-muted">
          <strong className="text-muted">Disclaimer:</strong> The ballpark is an
          educational visual-only range, not a repair quote or an insurance
          valuation. Real numbers come from a teardown at a licensed shop —
          hidden damage is found on most repairs, so treat any first number as
          a floor, not a ceiling.
        </p>

        <p className="mt-8 text-center font-display text-sm text-muted">
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
      </main>
      <Footer />
    </>
  );
}
