"use client";

import { useEffect, useRef, useState } from "react";
import { XIcon } from "./Icons";

// VINs never use I, O, or Q. Pull a clean 17-char VIN out of decoded barcode
// text (strips any Code-39 delimiter chars / spaces along the way).
function extractVin(text: string): string | null {
  const cleaned = text.toUpperCase().replace(/[^A-HJ-NPR-Z0-9]/g, "");
  const m = cleaned.match(/[A-HJ-NPR-Z0-9]{17}/);
  return m ? m[0] : null;
}

type Status = "starting" | "scanning" | "denied" | "error";

interface Props {
  onDetected: (vin: string) => void;
  onClose: () => void;
}

export default function VinScanner({ onDetected, onClose }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const foundRef = useRef(false);
  const onDetectedRef = useRef(onDetected);
  useEffect(() => {
    onDetectedRef.current = onDetected;
  });
  const [status, setStatus] = useState<Status>("starting");

  // Escape to close.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Camera + decode loop. Runs once; library is dynamically imported so it
  // only loads when someone actually scans (keeps it out of the main bundle).
  useEffect(() => {
    let cancelled = false;
    let controls: { stop: () => void } | null = null;
    // If the camera never starts (permission ignored, odd device), don't trap
    // the user on "Starting camera…" — fall back to manual entry.
    const timeout = setTimeout(() => {
      setStatus((s) => (s === "starting" ? "error" : s));
    }, 9000);

    (async () => {
      try {
        const { BrowserMultiFormatReader } = await import("@zxing/browser");
        const { DecodeHintType, BarcodeFormat } = await import("@zxing/library");
        const hints = new Map();
        hints.set(DecodeHintType.POSSIBLE_FORMATS, [
          BarcodeFormat.CODE_39,
          BarcodeFormat.CODE_128,
          BarcodeFormat.DATA_MATRIX,
          BarcodeFormat.ITF,
          BarcodeFormat.QR_CODE,
          BarcodeFormat.PDF_417,
        ]);
        const reader = new BrowserMultiFormatReader(hints);
        if (cancelled || !videoRef.current) return;
        controls = await reader.decodeFromConstraints(
          { video: { facingMode: "environment" } },
          videoRef.current,
          (result) => {
            if (foundRef.current || !result) return;
            const vin = extractVin(result.getText());
            if (vin) {
              foundRef.current = true;
              onDetectedRef.current(vin);
            }
          }
        );
        if (cancelled) controls.stop();
        else {
          clearTimeout(timeout);
          setStatus("scanning");
        }
      } catch (e) {
        if (cancelled) return;
        const name = e instanceof DOMException ? e.name : "";
        setStatus(name === "NotAllowedError" ? "denied" : "error");
      }
    })();

    return () => {
      cancelled = true;
      clearTimeout(timeout);
      controls?.stop();
    };
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Scan your VIN barcode"
      className="fixed inset-0 z-[60] flex flex-col bg-black"
    >
      {/* header */}
      <div className="flex items-center justify-between px-5 py-4">
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-white/80">
          Scan your VIN
        </span>
        <button
          onClick={onClose}
          aria-label="Close scanner"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white"
        >
          <XIcon className="h-5 w-5" />
        </button>
      </div>

      {/* camera area */}
      <div className="relative flex-1 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="h-full w-full object-cover"
        />

        {status === "scanning" && (
          <>
            {/* framing guide */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="h-28 w-[80%] max-w-sm rounded-xl border-2 border-white/80" />
            </div>
            <p className="absolute bottom-8 left-1/2 w-[88%] max-w-sm -translate-x-1/2 text-center font-body text-sm leading-relaxed text-white/90">
              Point at the <strong>barcode</strong> on your driver&apos;s door-jamb
              sticker, your registration, or your insurance card.
            </p>
          </>
        )}

        {status === "starting" && (
          <p className="absolute inset-0 flex items-center justify-center font-body text-sm text-white/80">
            Starting camera…
          </p>
        )}

        {(status === "denied" || status === "error") && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-8 text-center">
            <p className="font-body text-base leading-relaxed text-white/90">
              {status === "denied"
                ? "Camera access is blocked. Turn it on in your browser settings — or just type your VIN instead."
                : "Couldn't start the camera. No worries — type your VIN instead."}
            </p>
            <button
              onClick={onClose}
              className="rounded-full bg-accent-orange px-6 py-3 font-display text-sm font-semibold text-background"
            >
              Type my VIN instead
            </button>
          </div>
        )}
      </div>

      {/* footer */}
      {status === "scanning" && (
        <div className="flex justify-center px-5 py-5">
          <button
            onClick={onClose}
            className="font-display text-sm font-semibold text-white/80"
          >
            Can&apos;t scan? Type it instead
          </button>
        </div>
      )}
    </div>
  );
}
