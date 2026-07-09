"use client";

import { useState } from "react";

// Referral loop: the person who just got helped is the best distribution
// channel there is. One tap forwards the site to the next crash victim.
const SHARE_TEXT =
  "If you just got in an accident — this helped me. Free straight answers from a real LA collision estimator (what to say to insurance, what repairs should cost, total-loss math): https://yourcrashangel.com";

export default function ShareBlock() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SHARE_TEXT);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (permissions/http) — fall through silently;
      // the SMS/WhatsApp buttons still work.
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <p className="font-display text-lg font-bold text-foreground">
        Know someone who just crashed?
      </p>
      <p className="mt-1 font-body text-sm text-muted">
        The first 48 hours are when people sign the wrong things. Send them
        this before they do.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <a
          href={`sms:?body=${encodeURIComponent(SHARE_TEXT)}`}
          className="inline-flex items-center rounded-full bg-accent-orange px-5 py-2.5 font-display text-sm font-semibold text-background transition-transform hover:scale-105 active:scale-95"
        >
          Text it to them
        </a>
        <a
          href={`https://wa.me/?text=${encodeURIComponent(SHARE_TEXT)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-full border-2 border-border px-5 py-2.5 font-display text-sm font-semibold text-foreground transition-colors hover:border-foreground/30"
        >
          WhatsApp
        </a>
        <button
          onClick={copy}
          className="inline-flex items-center rounded-full border-2 border-border px-5 py-2.5 font-display text-sm font-semibold text-foreground transition-colors hover:border-foreground/30"
        >
          {copied ? "Copied ✓" : "Copy the message"}
        </button>
      </div>
    </div>
  );
}
