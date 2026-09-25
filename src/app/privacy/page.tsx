import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | yourcrashangel",
  description:
    "What information yourcrashangel.com collects, why, where it lives, and how to have it deleted. Short version: your info goes to Angel and nowhere else.",
  alternates: { canonical: "/privacy" },
};

const SECTIONS = [
  {
    h: "What I collect",
    p: "If you use the contact form: your name, phone number, and whatever you write in the message. If you use the estimate tool: the details you enter (VIN, damage selections, photos) are processed to generate your ballpark and are not saved on a server by me. That's it — no accounts, no newsletters, no tracking pixels from ad networks.",
  },
  {
    h: "Why I collect it",
    p: "One reason: so I can reply to you about your accident. Your form message goes to me, Angel, and I use it to answer your question. I don't use it for marketing lists and I never sell or share it with insurers, shops, lawyers, or anyone else.",
  },
  {
    h: "Where it lives",
    p: "The site is hosted on Netlify, and form submissions are stored in Netlify's form service (their privacy policy applies to that processing) so they can be delivered to me. Standard server logs (IP address, pages visited) exist at the hosting level like on virtually every website.",
  },
  {
    h: "How long, and how to delete it",
    p: "Form submissions are kept only as long as useful for helping you. Want yours gone? Text or call (213) 279-2992 or submit the form asking for deletion, and I'll remove it. California residents: you have the right to know what's collected and to request deletion — this page is the disclosure, and that number is the request line.",
  },
  {
    h: "Photos you send by text",
    p: "Texting me photos of your car goes through your phone carrier and mine, like any text message. I don't publish anything you send me. The repair photos on this site come from my own work, with license plates and personal details blurred.",
  },
];

const inlineLink =
  "font-semibold text-accent-orange underline decoration-accent-orange/35 underline-offset-4 transition-colors hover:text-accent-lime hover:decoration-accent-lime";

export default function Privacy() {
  return (
    <>
      <Navbar />
      <main id="main" className="bg-background">
        <section className="pt-32 pb-20 md:pt-44 md:pb-28">
          <div className="mx-auto max-w-4xl px-5 md:px-8">
            <p className="eyebrow flex items-center gap-3 text-accent-orange">
              <span
                aria-hidden="true"
                className="h-px w-8 shrink-0 bg-accent-orange"
              />
              The fine print, unfine
            </p>
            <h1 className="mt-5 display text-5xl text-foreground sm:text-6xl md:text-7xl">
              Privacy,
              <br />
              <span className="text-accent-orange">plain English.</span>
            </h1>
            <p className="mt-6 max-w-xl font-body text-lg leading-relaxed text-muted md:text-xl">
              Short version: what you send me goes to me, gets used to help
              you, and goes nowhere else. Longer version below.
            </p>

            {/* One white sheet, one row per question: heading left, answer right on desktop. */}
            <div className="mt-10 rounded-[var(--radius-card)] bg-surface px-6 shadow-[var(--shadow-card)] sm:px-8 md:mt-14 md:px-10">
              {SECTIONS.map((s) => (
                <div
                  key={s.h}
                  className="grid gap-2 border-b border-border py-7 last:border-b-0 md:grid-cols-[15rem_1fr] md:gap-10 md:py-9"
                >
                  <h2 className="display text-2xl text-foreground md:text-[1.6rem]">{s.h}</h2>
                  <p className="font-body text-base leading-relaxed text-muted md:text-[1.05rem]">
                    {s.p}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-8 max-w-2xl font-body text-sm leading-relaxed text-muted">
              Effective July 2026. If this policy changes, the changes show up
              on this page. Questions:{" "}
              <a href="sms:+12132792992" className={inlineLink}>
                (213) 279-2992
              </a>{" "}
              or the{" "}
              <Link href="/#get-help" className={inlineLink}>
                contact form
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
