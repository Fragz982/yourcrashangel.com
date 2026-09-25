import Link from "next/link";
import { ChevronDownIcon, ContactIcon, MessageIcon, PhoneIcon } from "./Icons";

// Resource links: on a phone, an app-style list (48px rows, hairlines, a
// chevron); from sm up, a quiet grid of plain links.
const resourceLink =
  "group flex min-h-12 items-center justify-between gap-3 rounded-lg py-2 transition-colors hover:text-accent-orange sm:min-h-0 sm:justify-start sm:py-1.5";

// Contact lines read as quiet pills: the loud orange Text button lives in the
// section right above the footer, so these stay secondary.
const contactPill =
  "inline-flex h-11 items-center gap-2 whitespace-nowrap rounded-full bg-surface-light pr-5 pl-4 text-foreground transition-colors hover:bg-accent-soft hover:text-accent-lime";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-background">
      <div className="mx-auto max-w-7xl px-4 pt-4 pb-10 md:px-8 md:pb-14">
        <div className="rounded-[var(--radius-card)] bg-surface p-6 shadow-[var(--shadow-card)] sm:p-8 md:p-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:flex-wrap lg:items-end lg:justify-between">
            <div className="max-w-md">
              <p className="text-2xl font-extrabold tracking-[-0.03em] text-foreground">
                The Accident{" "}
                <span className="text-accent-orange">Translator</span>
              </p>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
                Real collision estimator in Los Angeles. Helping you understand
                your accident, your estimate, and your rights — in plain English.
              </p>
            </div>

            {/* display:contents lets Contact sit beside the brand on desktop
                while Resources wraps to its own full-width row below. */}
            <div className="contents">
              <div>
                <p className="eyebrow text-[0.7rem] text-foreground">
                  Contact
                </p>
                <ul className="mt-3 flex flex-wrap gap-2.5 text-sm font-semibold">
                  <li>
                    <a
                      href="sms:+12132792992"
                      className={contactPill}
                    >
                      <MessageIcon className="h-4 w-4 text-accent-orange" />
                      Text: (213) 279-2992
                    </a>
                  </li>
                  <li>
                    <a
                      href="tel:+12132792992"
                      className={contactPill}
                    >
                      <PhoneIcon className="h-4 w-4 text-accent-orange" />
                      Call: (213) 279-2992
                    </a>
                  </li>
                  <li>
                    {/* A contact card, so the number is already in their
                        phone the next time something happens. */}
                    <a
                      href="/angel.vcf"
                      download="Angel - Your Crash Angel.vcf"
                      className={contactPill}
                    >
                      <ContactIcon className="h-4 w-4 text-accent-orange" />
                      Save my number
                    </a>
                  </li>
                </ul>
              </div>

              <div className="mt-2 border-t border-border pt-8 lg:order-last lg:mt-0 lg:basis-full">
                <p className="eyebrow text-[0.7rem] text-foreground">
                  Resources
                </p>
                <ul className="mt-2 grid grid-cols-1 divide-y divide-border text-[0.95rem] text-muted sm:mt-4 sm:grid-cols-2 sm:gap-x-8 sm:divide-y-0 lg:grid-cols-3 xl:grid-cols-4">
                  <li>
                    <Link
                      href="/start"
                      className={resourceLink}
                    >
                      Crash Was Yesterday? Start Here
                      <ChevronDownIcon className="h-4 w-4 shrink-0 -rotate-90 text-muted transition-colors group-hover:text-accent-orange sm:hidden" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/lowball"
                      className={resourceLink}
                    >
                      Offer Too Low?
                      <ChevronDownIcon className="h-4 w-4 shrink-0 -rotate-90 text-muted transition-colors group-hover:text-accent-orange sm:hidden" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/estimate"
                      className={resourceLink}
                    >
                      Ballpark Estimate Tool
                      <ChevronDownIcon className="h-4 w-4 shrink-0 -rotate-90 text-muted transition-colors group-hover:text-accent-orange sm:hidden" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/checklist"
                      className={resourceLink}
                    >
                      Crash Checklist
                      <ChevronDownIcon className="h-4 w-4 shrink-0 -rotate-90 text-muted transition-colors group-hover:text-accent-orange sm:hidden" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/playbook"
                      className={resourceLink}
                    >
                      The Insurance Playbook
                      <ChevronDownIcon className="h-4 w-4 shrink-0 -rotate-90 text-muted transition-colors group-hover:text-accent-orange sm:hidden" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/decoder"
                      className={resourceLink}
                    >
                      Jargon Decoder
                      <ChevronDownIcon className="h-4 w-4 shrink-0 -rotate-90 text-muted transition-colors group-hover:text-accent-orange sm:hidden" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/totaled"
                      className={resourceLink}
                    >
                      Is My Car Totaled?
                      <ChevronDownIcon className="h-4 w-4 shrink-0 -rotate-90 text-muted transition-colors group-hover:text-accent-orange sm:hidden" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/#faq"
                      className={resourceLink}
                    >
                      FAQ
                      <ChevronDownIcon className="h-4 w-4 shrink-0 -rotate-90 text-muted transition-colors group-hover:text-accent-orange sm:hidden" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/card"
                      className={resourceLink}
                    >
                      Print the Crash Flyer
                      <ChevronDownIcon className="h-4 w-4 shrink-0 -rotate-90 text-muted transition-colors group-hover:text-accent-orange sm:hidden" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacy"
                      className={resourceLink}
                    >
                      Privacy
                      <ChevronDownIcon className="h-4 w-4 shrink-0 -rotate-90 text-muted transition-colors group-hover:text-accent-orange sm:hidden" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 px-1 md:mt-10 md:px-2">
          <p className="max-w-5xl text-xs leading-relaxed text-muted">
            <strong className="text-foreground">Disclaimer:</strong> All content on
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
          <p className="mt-4 text-xs text-muted">
            &copy; {year} yourcrashangel. All rights reserved. Los Angeles, CA.
          </p>
        </div>
      </div>
    </footer>
  );
}
