import { TikTokIcon, InstagramIcon, YouTubeIcon } from "./Icons";

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
                Follow
              </p>
              <div className="mt-3 flex items-center gap-3">
                <a
                  href="https://tiktok.com/@yourcrashangel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-surface text-muted transition-colors hover:bg-accent-orange hover:text-background"
                  aria-label="TikTok"
                >
                  <TikTokIcon className="h-4 w-4" />
                </a>
                <a
                  href="https://instagram.com/yourcrashangel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-surface text-muted transition-colors hover:bg-accent-orange hover:text-background"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="h-4 w-4" />
                </a>
                <a
                  href="https://youtube.com/@yourcrashangel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-surface text-muted transition-colors hover:bg-accent-orange hover:text-background"
                  aria-label="YouTube"
                >
                  <YouTubeIcon className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div>
              <p className="eyebrow text-[0.7rem] text-foreground">
                Resources
              </p>
              <ul className="mt-3 space-y-2 font-body text-sm text-muted">
                <li>
                  <a
                    href="/checklist"
                    className="transition-colors hover:text-accent-orange"
                  >
                    Crash Checklist
                  </a>
                </li>
                <li>
                  <a
                    href="/playbook"
                    className="transition-colors hover:text-accent-orange"
                  >
                    The Insurance Playbook
                  </a>
                </li>
                <li>
                  <a
                    href="/decoder"
                    className="transition-colors hover:text-accent-orange"
                  >
                    Jargon Decoder
                  </a>
                </li>
                <li>
                  <a
                    href="/totaled"
                    className="transition-colors hover:text-accent-orange"
                  >
                    Is My Car Totaled?
                  </a>
                </li>
                <li>
                  <a
                    href="/#faq"
                    className="transition-colors hover:text-accent-orange"
                  >
                    FAQ
                  </a>
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
            professional. @yourcrashangel is an independent educational resource
            and is not affiliated with any insurance company, body shop, or legal
            firm.
          </p>
          <p className="mt-4 font-body text-xs text-muted">
            &copy; {year} yourcrashangel. All rights reserved. Los Angeles, CA.
          </p>
        </div>
      </div>
    </footer>
  );
}
