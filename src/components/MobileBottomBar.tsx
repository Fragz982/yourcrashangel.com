"use client";

import { MessageIcon, PhoneIcon } from "./Icons";

export default function MobileBottomBar() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-md md:hidden"
      role="navigation"
      aria-label="Quick contact"
    >
      <div className="flex items-stretch">
        <a
          href="sms:+12132792992"
          className="flex flex-1 items-center justify-center gap-2 bg-accent-orange py-3.5 font-display text-sm font-semibold text-background"
        >
          <MessageIcon className="h-4 w-4" />
          Text Me
        </a>
        <a
          href="tel:+12132792992"
          className="flex flex-1 items-center justify-center gap-2 py-3.5 font-display text-sm font-semibold text-foreground"
        >
          <PhoneIcon className="h-4 w-4" />
          Call Me
        </a>
      </div>
    </div>
  );
}
