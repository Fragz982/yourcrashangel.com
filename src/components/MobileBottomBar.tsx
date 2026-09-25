"use client";

import { MessageIcon, PhoneIcon } from "./Icons";

// A floating glass pill, the same chrome as the navbar up top. It stays inside
// the 3.5rem spacer BottomBarGate reserves (4px lift + 4px pad + 44px buttons
// + 4px pad = 56px), so it never covers the end of the page.
export default function MobileBottomBar() {
  return (
    <div
      className="mobile-bar pointer-events-none fixed bottom-0 left-0 right-0 z-50 px-3 md:hidden"
      style={{ paddingBottom: "calc(0.25rem + env(safe-area-inset-bottom))" }}
      role="navigation"
      aria-label="Quick contact"
    >
      <div className="pointer-events-auto mx-auto flex max-w-md items-stretch gap-1 rounded-full bg-white/90 p-1 shadow-[0_1px_0_rgb(255_255_255/0.6)_inset,0_18px_40px_-18px_rgb(10_8_6/0.45),0_2px_8px_-2px_rgb(10_8_6/0.18)] backdrop-blur-xl">
        <a
          href="sms:+12132792992"
          className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-accent-orange text-[0.95rem] font-bold text-white transition-[background-color,transform] active:scale-[0.97] active:bg-accent-lime"
        >
          <MessageIcon className="h-4 w-4" />
          Text Me
        </a>
        <a
          href="tel:+12132792992"
          className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full text-[0.95rem] font-bold text-foreground transition-[background-color,transform] active:scale-[0.97] active:bg-surface-light"
        >
          <PhoneIcon className="h-4 w-4" />
          Call Me
        </a>
      </div>
    </div>
  );
}
