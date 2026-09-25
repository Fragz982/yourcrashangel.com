"use client";

import { useState } from "react";
import { MessageIcon } from "./Icons";

// Referral loop: the person who just got helped is the best distribution
// channel there is. One tap forwards the site to the next crash victim.
const SHARE_TEXT =
  "If you just got in an accident — this helped me. Free straight answers from a real LA collision estimator (what to say to insurance, what repairs should cost, total-loss math): https://yourcrashangel.com";

// Secondary pill: white with a hairline, the same as every other quiet button.
const secondary =
  "inline-flex h-11 items-center rounded-full bg-surface px-5 text-sm font-bold text-foreground shadow-[inset_0_0_0_1px_var(--color-border)] transition-[background-color,transform] hover:bg-surface-light active:scale-[0.97]";

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
    <div className="rounded-[var(--radius-card)] bg-surface p-6 shadow-[var(--shadow-card)] md:p-7">
      <p className="text-xl font-extrabold tracking-[-0.02em] text-foreground">
        Know someone who just crashed?
      </p>
      <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted">
        The first 48 hours are when people sign the wrong things. Send them
        this before they do.
      </p>
      <div className="mt-5 flex flex-wrap gap-2.5">
        <a
          href={`sms:?body=${encodeURIComponent(SHARE_TEXT)}`}
          className="inline-flex h-11 items-center gap-2 rounded-full bg-accent-orange px-5 text-sm font-bold text-white shadow-[0_1px_2px_rgb(33_26_20/0.10),0_8px_20px_-10px_rgb(33_26_20/0.35)] transition-[background-color,transform] hover:bg-accent-lime active:scale-[0.97]"
        >
          <MessageIcon className="h-4 w-4" />
          Text it to them
        </a>
        <a
          href={`https://wa.me/?text=${encodeURIComponent(SHARE_TEXT)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={secondary}
        >
          WhatsApp
        </a>
        <button
          onClick={copy}
          className={secondary}
        >
          {copied ? "Copied ✓" : "Copy the message"}
        </button>
      </div>
    </div>
  );
}
