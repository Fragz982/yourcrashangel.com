"use client";

import { useState, useEffect } from "react";
import { MessageIcon, PhoneIcon, MenuIcon, XIcon } from "./Icons";

const NAV_LINKS = [
  { label: "Start Here", href: "/start" },
  { label: "Estimate", href: "/estimate" },
  { label: "Totaled?", href: "/totaled" },
  { label: "Playbook", href: "/playbook" },
  { label: "What To Do", href: "/checklist" },
  { label: "Get Help", href: "/#get-help" },
];

// Floating glass pills, the same chrome as the drone flight: the wordmark on
// the left, the links in one pill, the Text button in orange. They float over
// the flight on the homepage and over the light ground everywhere else.
const glass =
  "bg-white/90 backdrop-blur-xl shadow-[0_1px_0_rgb(255_255_255/0.6)_inset,0_18px_40px_-18px_rgb(10_8_6/0.45),0_2px_8px_-2px_rgb(10_8_6/0.18)]";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Intentional mount flag: first client render must match SSR, then the
    // navbar slides in. The one-time cascading render is the point.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className="pointer-events-none fixed top-0 left-0 right-0 z-50"
        style={{
          paddingTop: "max(clamp(0.75rem, 2.4vw, 1.25rem), env(safe-area-inset-top))",
          transform: mounted ? "translateY(0)" : "translateY(-120%)",
          transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 md:px-8"
          aria-label="Main navigation"
        >
          {/* A plain link on purpose: the homepage flight mounts its engine on
              a full page load, so going home is always a fresh load. */}
          <a
            href="/"
            className={`pointer-events-auto inline-flex h-11 items-center gap-2.5 rounded-full pl-1.5 pr-4 text-foreground transition-transform active:scale-[0.97] ${glass}`}
            aria-label="Your Crash Angel, The Accident Translator, home"
          >
            <span
              aria-hidden="true"
              className="grid h-8 w-8 place-items-center rounded-full bg-accent-orange text-[0.95rem] font-extrabold text-white"
            >
              A
            </span>
            <span className="whitespace-nowrap text-[0.95rem] font-bold tracking-[-0.01em]">
              Your Crash Angel
            </span>
            <span className="hidden whitespace-nowrap text-[0.7rem] font-semibold uppercase tracking-[0.13em] text-muted 2xl:inline">
              · The Accident Translator
            </span>
          </a>

          <div
            className={`pointer-events-auto hidden h-11 items-center gap-0.5 rounded-full px-2 xl:flex ${glass}`}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="whitespace-nowrap rounded-full px-3 py-2 text-sm font-semibold text-muted transition-colors hover:bg-surface-light hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pointer-events-auto flex items-center gap-2">
            <a
              href="sms:+12132792992"
              className="hidden h-11 items-center gap-2 rounded-full bg-accent-orange px-5 text-sm font-bold text-white shadow-[0_1px_2px_rgb(33_26_20/0.10),0_8px_20px_-10px_rgb(33_26_20/0.35)] transition-colors hover:bg-accent-lime active:scale-[0.97] whitespace-nowrap md:inline-flex"
            >
              <MessageIcon className="h-4 w-4" />
              <span className="xl:hidden">Text Me</span>
              <span className="hidden xl:inline">Text (213) 279-2992</span>
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`inline-flex h-11 w-11 items-center justify-center rounded-full text-foreground xl:hidden ${glass}`}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 flex flex-col overflow-y-auto bg-background/97 px-5 pt-24 backdrop-blur-xl transition-opacity duration-200 xl:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        style={{ paddingBottom: "calc(2rem + env(safe-area-inset-bottom))" }}
        inert={!mobileOpen}
        aria-hidden={!mobileOpen}
      >
        <div className="mx-auto flex w-full max-w-md flex-col gap-2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="card flex items-center justify-between px-5 py-4 text-xl font-bold tracking-[-0.02em] text-foreground transition-colors hover:text-accent-orange"
            >
              {link.label}
              <span aria-hidden="true" className="text-accent-orange">→</span>
            </a>
          ))}
          <div className="mt-4 grid gap-2">
            <a
              href="sms:+12132792992"
              onClick={() => setMobileOpen(false)}
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-accent-orange text-lg font-bold text-white"
            >
              <MessageIcon className="h-5 w-5" />
              Text Me
            </a>
            <a
              href="tel:+12132792992"
              onClick={() => setMobileOpen(false)}
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-surface text-lg font-bold text-foreground shadow-[inset_0_0_0_1px_var(--color-border)]"
            >
              <PhoneIcon className="h-5 w-5" />
              Call (213) 279-2992
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
