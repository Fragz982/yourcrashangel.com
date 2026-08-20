import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="font-mono text-sm font-medium uppercase tracking-[0.18em] text-foreground">
              The Accident{" "}
              <span className="text-accent-orange">Translator</span>
            </p>
            <p className="mt-3 font-body text-sm leading-relaxed text-muted">
              Real collision estimator in Los Angeles. Helping you understand
              your accident, your estimate, and your rights — in plain English.
            </p>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:gap-12">
            <div>
              <p className="eyebrow text-[0.7rem] text-foreground">
                Contact
              </p>
              <ul className="mt-3 space-y-2 font-body text-sm text-muted">
                <li>
                  <a
                    href="sms:+12132792992"
                    className="transition-colors hover:text-accent-orange"
                  >
                    Text: (213) 279-2992
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+12132792992"
                    className="transition-colors hover:text-accent-orange"
                  >
                    Call: (213) 279-2992
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="eyebrow text-[0.7rem] text-foreground">
                Resources
              </p>
              <ul className="mt-3 space-y-2 font-body text-sm text-muted">
                <li>
                  <Link
                    href="/start"
                    className="transition-colors hover:text-accent-orange"
                  >
                    Crash Was Yesterday? Start Here
                  </Link>
                </li>
                <li>
                  <Link
                    href="/lowball"
                    className="transition-colors hover:text-accent-orange"
                  >
                    Offer Too Low?
                  </Link>
                </li>
                <li>
                  <Link
                    href="/estimate"
                    className="transition-colors hover:text-accent-orange"
                  >
                    Ballpark Estimate Tool
                  </Link>
                </li>
                <li>
                  <Link
                    href="/checklist"
                    className="transition-colors hover:text-accent-orange"
                  >
                    Crash Checklist
                  </Link>
                </li>
                <li>
                  <Link
                    href="/playbook"
                    className="transition-colors hover:text-accent-orange"
                  >
                    The Insurance Playbook
                  </Link>
                </li>
                <li>
                  <Link
                    href="/decoder"
                    className="transition-colors hover:text-accent-orange"
                  >
                    Jargon Decoder
                  </Link>
                </li>
                <li>
                  <Link
                    href="/totaled"
                    className="transition-colors hover:text-accent-orange"
                  >
                    Is My Car Totaled?
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#faq"
                    className="transition-colors hover:text-accent-orange"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/card"
                    className="transition-colors hover:text-accent-orange"
                  >
                    Print the Crash Flyer
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="transition-colors hover:text-accent-orange"
                  >
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="font-body text-xs leading-relaxed text-muted">
            <strong className="text-muted">Disclaimer:</strong> All content on
            this site is for educational and informational purposes only. Nothing
            here constitutes legal, insurance, financial, or professional advice.
            Every accident and claim is different. For advice specific to your
            situation, consult a licensed attorney, public adjuster, or insurance
            professional. I work as a collision estimator at a Los Angeles body
            shop — the repairs and reviews shown on this site come from that
            work. This site is my personal educational project: it is not
            sponsored by any insurance company or law firm, you never owe me
            anything, and you never have to use any particular shop.
          </p>
          <p className="mt-4 font-body text-xs text-muted">
            &copy; {year} yourcrashangel. All rights reserved. Los Angeles, CA.
          </p>
        </div>
      </div>
    </footer>
  );
}
