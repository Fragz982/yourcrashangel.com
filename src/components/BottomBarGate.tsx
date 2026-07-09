"use client";

import { usePathname } from "next/navigation";
import MobileBottomBar from "./MobileBottomBar";

// Sticky call/text bar on every page (the highest-leverage crisis-site
// pattern) — except print/utility pages where it makes no sense.
const HIDDEN_ON = ["/card", "/thanks"];

export default function BottomBarGate() {
  const pathname = usePathname();
  if (HIDDEN_ON.some((p) => pathname.startsWith(p))) return null;

  return (
    <>
      <MobileBottomBar />
      {/* Spacer so the sticky bar (plus iOS home-indicator inset) never covers content */}
      <div
        className="md:hidden"
        style={{ height: "calc(3.5rem + env(safe-area-inset-bottom))" }}
        aria-hidden="true"
      />
    </>
  );
}
