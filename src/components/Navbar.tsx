"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageIcon, MenuIcon, XIcon } from "./Icons";

const NAV_LINKS = [
  { label: "What To Do", href: "#first-5" },
  { label: "Playbook", href: "/playbook" },
  { label: "Decoder", href: "/decoder" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Intentional mount flag: first client render must match SSR, then the
    // navbar slides in. The one-time cascading render is the point.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/90 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        }`}
        style={{
          transform: mounted ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1), background-color 0.3s, border-color 0.3s",
        }}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8"
          aria-label="Main navigation"
        >
          <a
            href="#"
            className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-foreground md:text-sm"
          >
            The Accident
            <br className="md:hidden" />{" "}
            <span className="text-accent-orange">Translator</span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-xs uppercase tracking-[0.14em] text-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            <a
              href="sms:+12132792992"
              className="inline-flex items-center gap-2 rounded-full bg-accent-orange px-5 py-2.5 font-display text-sm font-semibold text-background transition-transform hover:scale-105 active:scale-95"
            >
              <MessageIcon className="h-4 w-4" />
              Text Me
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex items-center justify-center rounded-lg p-2 text-foreground md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <XIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-xl pt-20 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col items-center gap-6 px-6 pt-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="display text-4xl text-foreground transition-colors hover:text-accent-lime"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="sms:+12132792992"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent-orange px-8 py-3.5 font-display text-lg font-semibold text-background"
              >
                <MessageIcon className="h-5 w-5" />
                Text Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
