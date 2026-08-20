"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { CameraIcon, MessageIcon, CheckIcon } from "./Icons";
import VinScanner from "./VinScanner";

// ----- Damage model -----
// SEED RANGES — conservative, industry-typical placeholders. Angel replaces
// these with his real numbers (he writes estimates daily). One table, easy swap.
const AREAS: { id: string; label: string; base: [number, number] }[] = [
  { id: "front-bumper", label: "Front bumper", base: [450, 1800] },
  { id: "rear-bumper", label: "Rear bumper", base: [450, 1800] },
  { id: "hood", label: "Hood", base: [500, 2200] },
  { id: "fender", label: "Fender", base: [400, 1600] },
  { id: "door", label: "Door(s)", base: [500, 2000] },
  { id: "quarter-panel", label: "Quarter panel", base: [800, 3400] },
  { id: "headlight", label: "Headlight / grille", base: [350, 1800] },
  { id: "roof-pillar", label: "Roof / pillar", base: [900, 4000] },
];

const SEVERITIES: { id: string; label: string; hint: string; mult: number }[] = [
  { id: "scuffs", label: "Scuffs & scratches", hint: "Paint only, no real dents", mult: 0.45 },
  { id: "dents", label: "Dents & dings", hint: "Pushed in, panel still shaped", mult: 1.0 },
  { id: "smashed", label: "Smashed", hint: "Crumpled, parts cracked or hanging", mult: 1.9 },
  { id: "heavy", label: "Heavy hit", hint: "Won't close right, fluids, airbags", mult: 3.0 },
];

type BodyCat = "sedan" | "coupe" | "suv" | "truck" | "van" | "car";

function classifyBody(bodyClass: string | undefined): BodyCat {
  const b = (bodyClass || "").toLowerCase();
  if (b.includes("pickup") || b.includes("truck")) return "truck";
  if (b.includes("van") || b.includes("mpv")) return "van";
  if (b.includes("suv") || b.includes("sport utility") || b.includes("crossover"))
    return "suv";
  if (b.includes("coupe")) return "coupe";
  if (b.includes("sedan") || b.includes("saloon")) return "sedan";
  return "car";
}

function BodyIllustration({ cat }: { cat: BodyCat }) {
  // Simple calm line-art silhouettes; stroke uses currentColor.
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  const wheels = (
    <>
      <circle cx="42" cy="62" r="9" {...common} />
      <circle cx="118" cy="62" r="9" {...common} />
    </>
  );
  const paths: Record<BodyCat, ReactNode> = {
    sedan: <path d="M12 62h12m26 0h44m24 0h18M16 62c0-10 6-16 16-18l10-14c3-4 7-6 13-6h34c6 0 10 3 13 7l9 13c10 2 16 8 16 18" {...common} />,
    car: <path d="M12 62h12m26 0h44m24 0h18M16 62c0-10 6-16 16-18l10-14c3-4 7-6 13-6h34c6 0 10 3 13 7l9 13c10 2 16 8 16 18" {...common} />,
    coupe: <path d="M12 62h12m26 0h44m24 0h18M16 62c0-10 6-17 18-19l16-15c3-3 6-4 11-4h28c6 0 10 3 13 8l7 11c10 2 16 9 16 19" {...common} />,
    suv: <path d="M12 62h12m26 0h44m24 0h18M16 62V40c0-6 5-12 14-13l8-12c2-3 6-5 12-5h34c6 0 9 2 12 5l8 12c9 1 14 7 14 13v22" {...common} />,
    truck: <path d="M12 62h12m26 0h44m24 0h18M16 62V42c0-5 4-10 11-11l7-11c2-3 6-4 11-4h20c5 0 8 3 8 8v18h41v20" {...common} />,
    van: <path d="M12 62h12m26 0h44m24 0h18M16 62V34c0-6 5-11 13-11h62c8 0 13 5 13 11v28" {...common} />,
  };
  return (
    <svg viewBox="0 0 150 80" className="h-20 w-full text-foreground/70" aria-hidden="true">
      {paths[cat]}
      {wheels}
    </svg>
  );
}

const round = {
  lo: (n: number) => Math.max(150, Math.floor(n / 100) * 100),
  hi: (n: number) => Math.ceil(n / 250) * 250,
};
const money = (n: number) => "$" + n.toLocaleString("en-US");

// Downscale a photo to a compact JPEG data URL before sending it to the
// estimate function (keeps payloads small and within function limits).
async function fileToDataUrl(file: File, max = 1024): Promise<string> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
  const w = Math.round(bitmap.width * scale);
  const h = Math.round(bitmap.height * scale);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  canvas.getContext("2d")?.drawImage(bitmap, 0, 0, w, h);
  return canvas.toDataURL("image/jpeg", 0.7);
}

interface Vehicle {
  year: string;
  make: string;
  model: string;
  trim: string;
  body: string;
}

export default function EstimateTool() {
  const [step, setStep] = useState(1);

  // Step 1
  const [vin, setVin] = useState("");
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [decoding, setDecoding] = useState(false);
  const [vinError, setVinError] = useState("");
  const [scanning, setScanning] = useState(false);

  // Step 2
  const [areas, setAreas] = useState<string[]>([]);
  const [severity, setSeverity] = useState<string>("");
  const [drivable, setDrivable] = useState<boolean | null>(null);
  const [photoCount, setPhotoCount] = useState(0);
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);

  // AI estimate (when a provider key is configured server-side); otherwise null
  // and the guided ballpark is used.
  const [aiResult, setAiResult] = useState<{ lo: number; hi: number } | null>(
    null
  );
  const [aiLoading, setAiLoading] = useState(false);

  const decodeVin = async (raw?: string) => {
    const clean = (raw ?? vin).trim().toUpperCase();
    setVin(clean);
    if (clean.length !== 17) {
      setVinError(
        `A full VIN is 17 characters — this one is ${clean.length}. Check for missing characters, or skip below.`
      );
      return;
    }
    setDecoding(true);
    setVinError("");
    try {
      const res = await fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/${encodeURIComponent(
          clean
        )}?format=json`
      );
      const data = await res.json();
      const r = data?.Results?.[0] ?? {};
      if (!r.Make || !r.ModelYear) {
        setVinError("Couldn't read that VIN. Double-check it, or skip and tell me your car.");
        setDecoding(false);
        return;
      }
      setVehicle({
        year: r.ModelYear,
        make: r.Make,
        model: r.Model || "",
        trim: r.Trim || r.Series || "",
        body: r.BodyClass || "",
      });
      setStep(2);
    } catch {
      setVinError("Couldn't reach the lookup just now. Skip and tell me your car instead.");
    }
    setDecoding(false);
  };

  const toggleArea = (id: string) =>
    setAreas((a) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id]));

  const onPhotos = (files: FileList | null) => {
    if (!files) return;
    const list = Array.from(files).slice(0, 8);
    setPhotoFiles(list);
    setPhotoUrls(list.map((f) => URL.createObjectURL(f)));
    setPhotoCount(files.length);
  };

  // Try a real AI estimate from the photos via the serverless function. If no
  // provider key is configured (today) or anything fails, leave aiResult null
  // and the guided ballpark is shown instead — never blocks the user.
  const runAiEstimate = async () => {
    if (!photoFiles.length) return;
    setAiLoading(true);
    try {
      const images = await Promise.all(
        photoFiles.slice(0, 2).map((f) => fileToDataUrl(f))
      );
      const res = await fetch("/.netlify/functions/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ areas, severity, drivable, images }),
      });
      const data = await res.json();
      if (
        data?.configured &&
        !data.failed &&
        typeof data.lo === "number" &&
        typeof data.hi === "number"
      ) {
        setAiResult({ lo: data.lo, hi: data.hi });
      } else {
        setAiResult(null);
      }
    } catch {
      setAiResult(null);
    }
    setAiLoading(false);
  };

  const ballpark = useMemo(() => {
    if (!areas.length || !severity) return null;
    const mult = SEVERITIES.find((s) => s.id === severity)?.mult ?? 1;
    let lo = 0;
    let hi = 0;
    for (const id of areas) {
      const a = AREAS.find((x) => x.id === id);
      if (a) {
        lo += a.base[0];
        hi += a.base[1];
      }
    }
    lo *= mult;
    hi *= mult;
    if (drivable === false) {
      lo *= 1.4;
      hi *= 1.4;
    }
    return { lo: round.lo(lo), hi: round.hi(hi) };
  }, [areas, severity, drivable]);

  const smsBody = useMemo(() => {
    const v = vehicle
      ? `${vehicle.year} ${vehicle.make} ${vehicle.model}`.trim()
      : "my car";
    const areaLabels = areas
      .map((id) => AREAS.find((a) => a.id === id)?.label)
      .filter(Boolean)
      .join(", ");
    const sevLabel = SEVERITIES.find((s) => s.id === severity)?.label ?? "";
    const drive =
      drivable === true ? "still drivable" : drivable === false ? "not drivable" : "";
    const shown = aiResult ?? ballpark;
    const bp = shown
      ? `Your tool ballparked ${money(shown.lo)}–${money(shown.hi)}. `
      : "";
    return `Hey Angel — ${v}. Damage: ${areaLabels} (${sevLabel})${drive ? ", " + drive : ""}. ${bp}Sending photos now — what's the real read?`;
  }, [vehicle, areas, severity, drivable, ballpark, aiResult]);

  const cat = classifyBody(vehicle?.body);

  return (
    <div className="mx-auto max-w-2xl">
      {/* Stepper */}
      <div className="mb-8 flex items-center gap-2" aria-hidden="true">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              step >= n ? "bg-accent-orange" : "bg-border"
            }`}
          />
        ))}
      </div>

      {/* STEP 1 — vehicle */}
      {step === 1 && (
        <div>
          <p className="eyebrow text-accent-orange">Step 1 — Your car</p>
          <h2 className="mt-3 display text-4xl text-foreground sm:text-5xl">
            What got hit?
          </h2>
          <p className="mt-4 font-body text-base leading-relaxed text-muted">
            Type or paste your VIN — it&apos;s on your dashboard by the
            windshield, the driver&apos;s door jamb, or your insurance card. I&apos;ll
            pull up your exact vehicle.
          </p>
          <label htmlFor="vin" className="sr-only">
            Vehicle Identification Number
          </label>
          <input
            id="vin"
            value={vin}
            onChange={(e) => setVin(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === "Enter" && decodeVin()}
            placeholder="e.g. 1HGCM82633A004352"
            maxLength={17}
            autoComplete="off"
            spellCheck={false}
            className="mt-6 w-full rounded-2xl border border-border bg-surface px-5 py-4 font-mono text-lg tracking-wider text-foreground outline-none placeholder:text-muted/60 focus:border-accent-orange"
          />
          {vinError && (
            <p className="mt-3 font-body text-sm text-accent-orange">{vinError}</p>
          )}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => setScanning(true)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-orange px-7 py-3.5 font-display text-base font-semibold text-background transition-transform hover:scale-105 active:scale-95"
            >
              <CameraIcon className="h-5 w-5" />
              Scan my VIN
            </button>
            <button
              onClick={() => decodeVin()}
              disabled={decoding}
              className="inline-flex items-center justify-center rounded-full border-2 border-border px-7 py-3.5 font-display text-base font-semibold text-foreground transition-colors hover:border-foreground/30 disabled:opacity-60"
            >
              {decoding ? "Looking it up…" : "Pull up my car"}
            </button>
          </div>
          <button
            onClick={() => {
              setVehicle(null);
              setStep(2);
            }}
            className="mt-4 inline-flex w-full items-center justify-center rounded-full border-2 border-border px-7 py-3.5 font-display text-base font-semibold text-foreground transition-colors hover:border-foreground/30 sm:w-auto"
          >
            Skip the VIN — just show the damage →
          </button>
          <p className="mt-2 font-body text-xs text-muted">
            No VIN needed for a ballpark. It only makes the numbers a bit more
            exact.
          </p>
        </div>
      )}

      {/* STEP 2 — damage */}
      {step === 2 && (
        <div>
          <p className="eyebrow text-accent-orange">Step 2 — The damage</p>
          {vehicle ? (
            <div className="mt-3 flex items-center gap-4 rounded-2xl border border-border bg-surface p-4">
              <div className="w-24 shrink-0">
                <BodyIllustration cat={cat} />
              </div>
              <div>
                <p className="display text-xl text-foreground">
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </p>
                {vehicle.trim && (
                  <p className="font-mono text-xs uppercase tracking-wider text-muted">
                    {vehicle.trim}
                    {vehicle.body ? ` · ${vehicle.body}` : ""}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <h2 className="mt-3 display text-3xl text-foreground sm:text-4xl">
              Tell me about the hit.
            </h2>
          )}

          <p className="mt-8 font-display text-base font-semibold text-foreground">
            Where&apos;s the damage? <span className="text-muted">(tap all that apply)</span>
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {AREAS.map((a) => {
              const on = areas.includes(a.id);
              return (
                <button
                  key={a.id}
                  onClick={() => toggleArea(a.id)}
                  aria-pressed={on}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 font-display text-sm font-semibold transition-colors ${
                    on
                      ? "border-accent-orange bg-accent-orange text-background"
                      : "border-border bg-surface text-foreground hover:border-foreground/30"
                  }`}
                >
                  {on && <CheckIcon className="h-3.5 w-3.5" />}
                  {a.label}
                </button>
              );
            })}
          </div>

          <p className="mt-8 font-display text-base font-semibold text-foreground">
            How bad is it?
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {SEVERITIES.map((s) => {
              const on = severity === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setSeverity(s.id)}
                  aria-pressed={on}
                  className={`rounded-2xl border p-4 text-left transition-colors ${
                    on
                      ? "border-accent-orange bg-accent-orange/10"
                      : "border-border bg-surface hover:border-foreground/30"
                  }`}
                >
                  <span className="font-display text-base font-semibold text-foreground">
                    {s.label}
                  </span>
                  <span className="mt-0.5 block font-body text-sm text-muted">
                    {s.hint}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="mt-8 font-display text-base font-semibold text-foreground">
            Does it still drive safely?
          </p>
          <div className="mt-3 flex gap-2">
            {[
              { v: true, label: "Yes, it drives" },
              { v: false, label: "No / not sure" },
            ].map((o) => {
              const on = drivable === o.v;
              return (
                <button
                  key={o.label}
                  onClick={() => setDrivable(o.v)}
                  aria-pressed={on}
                  className={`flex-1 rounded-2xl border px-4 py-3 font-display text-sm font-semibold transition-colors ${
                    on
                      ? "border-accent-orange bg-accent-orange text-background"
                      : "border-border bg-surface text-foreground hover:border-foreground/30"
                  }`}
                >
                  {o.label}
                </button>
              );
            })}
          </div>

          <p className="mt-8 font-display text-base font-semibold text-foreground">
            Add photos of the damage{" "}
            <span className="text-muted">(optional — for your text to me)</span>
          </p>
          <label className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-surface px-5 py-5 font-display text-sm font-semibold text-muted transition-colors hover:border-accent-orange/40 hover:text-foreground">
            <CameraIcon className="h-5 w-5" />
            {photoCount > 0 ? `${photoCount} photo${photoCount > 1 ? "s" : ""} added` : "Take or choose photos"}
            {/* No `capture` attr: forcing the in-browser camera means photos
                never land in the user's camera roll, so they can't re-attach
                them in Messages later. The picker lets them use the Camera
                app (which saves) or existing photos. */}
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => onPhotos(e.target.files)}
            />
          </label>
          {photoUrls.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {photoUrls.map((u, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src={u}
                  alt={`Damage photo ${i + 1}`}
                  className="h-16 w-16 rounded-lg border border-border object-cover"
                />
              ))}
            </div>
          )}

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => {
                setAiResult(null);
                setStep(3);
                runAiEstimate();
              }}
              disabled={!areas.length || !severity}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-orange px-7 py-3.5 font-display text-base font-semibold text-background transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              {!areas.length || !severity
                ? "Pick the damage first ↑"
                : "See my ballpark"}
            </button>
            <button
              onClick={() => setStep(1)}
              className="inline-flex items-center justify-center rounded-full border-2 border-border px-7 py-3.5 font-display text-base font-semibold text-foreground transition-colors hover:border-foreground/30"
            >
              Back
            </button>
          </div>
        </div>
      )}

      {/* STEP 3 — result */}
      {step === 3 && ballpark && (
        <div aria-live="polite">
          <p className="eyebrow text-accent-orange">Step 3 — Your ballpark</p>

          <div className="mt-4 rounded-3xl border border-border bg-surface p-7 text-center">
            <p className="font-display text-sm font-semibold uppercase tracking-wider text-muted">
              {aiResult ? "AI read from your photos" : "Rough visual range"}
              {vehicle ? ` · ${vehicle.year} ${vehicle.make} ${vehicle.model}` : ""}
            </p>
            {aiLoading ? (
              <p className="mt-3 font-body text-lg text-muted">
                Reading your photos…
              </p>
            ) : (
              <p className="mt-2 display text-5xl text-foreground sm:text-6xl">
                {money((aiResult ?? ballpark).lo)}–{money((aiResult ?? ballpark).hi)}
              </p>
            )}
            {!aiLoading && (
              <p className="mt-3 font-body text-xs text-muted">
                In line with typical 2025 collision repair costs. Your real
                number depends on an in-person teardown.
              </p>
            )}
          </div>

          {/* The non-negotiable framing */}
          <div className="mt-5 rounded-2xl border-2 border-accent-orange/40 bg-accent-orange/5 p-5">
            <p className="font-display text-base font-bold text-foreground">
              Read this before you do anything.
            </p>
            <p className="mt-2 font-body text-sm leading-relaxed text-foreground/90">
              This is a <strong>visual ballpark only</strong> — guessed from the
              outside. It is <strong>not a quote</strong>. The real number only goes{" "}
              <strong>UP</strong> from here: once a shop pulls the panels off, they
              almost always find hidden damage (supplements). Treat this as a rough
              floor, not a ceiling.
            </p>
          </div>

          {/* Insurance steer */}
          <div className="mt-5 rounded-2xl border border-border bg-surface p-6">
            <p className="font-display text-lg font-bold text-foreground">
              The smart move: file it through insurance.
            </p>
            <ul className="mt-4 space-y-3">
              {[
                "Not your fault? The other driver's insurance pays — usually no deductible to you at all. Filing on your own policy? You're only ever out your deductible.",
                "Your shop and adjuster fight for the supplements. When teardown finds hidden damage, that's covered — you don't pay out of pocket for surprises.",
                "Rental car while yours is in the shop (if you carry rental, or through the at-fault party).",
                "Total loss or diminished value? They handle the valuation — and you can push back on a lowball.",
                "Go through a shop's insurer program and you usually get a lifetime repair warranty.",
              ].map((b, i) => (
                <li key={i} className="flex gap-3">
                  <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-accent-lime" />
                  <span className="font-body text-sm leading-relaxed text-muted">
                    {b}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 font-body text-sm leading-relaxed text-foreground/90">
              Pay cash out of pocket and every hidden-damage surprise is yours alone,
              with no safety net. That&apos;s exactly how people get buried.
            </p>
          </div>

          {/* Handoff */}
          <div className="mt-5 rounded-2xl border border-border bg-background p-6">
            <p className="font-display text-base font-bold text-foreground">
              Want the real read? Send it to me.
            </p>
            <p className="mt-2 font-body text-sm text-muted">
              I&apos;ll text you back what it actually looks like and what to say to
              your insurer. Free.{" "}
              {photoCount > 0
                ? "Your text opens pre-filled. Heads-up: photos taken inside this tool may not save to your camera roll — snap them in your Camera app, then attach from your photos in Messages."
                : "Snap the damage in your Camera app, then attach the photos in Messages."}
            </p>
            <a
              href={`sms:+12132792992?body=${encodeURIComponent(smsBody)}`}
              className="mt-5 inline-flex items-center gap-2.5 rounded-full bg-accent-orange px-7 py-4 font-display text-base font-semibold text-background transition-transform hover:scale-105 active:scale-95"
            >
              <MessageIcon className="h-5 w-5" />
              Text Angel the details
            </a>

            {/* Desktop / hesitant-texter fallback: capture the lead with the
                ballpark context baked in. Posts to the registered crash-help
                form (name/phone/message are its registered fields). */}
            <form
              name="crash-help"
              method="POST"
              action="/thanks"
              className="mt-5 border-t border-border pt-4"
            >
              <input type="hidden" name="form-name" value="crash-help" />
              <input type="hidden" name="message" value={`[From estimate tool] ${smsBody}`} />
              <p className="font-body text-sm text-muted">
                Can&apos;t text right now? Leave your number — your ballpark
                details ride along automatically:
              </p>
              <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                <input
                  name="name"
                  placeholder="First name"
                  autoComplete="given-name"
                  className="flex-1 rounded-xl border border-border bg-surface px-4 py-3 font-body text-sm text-foreground outline-none placeholder:text-muted/60 focus:border-accent-orange"
                />
                <input
                  required
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  autoComplete="tel"
                  className="flex-1 rounded-xl border border-border bg-surface px-4 py-3 font-body text-sm text-foreground outline-none placeholder:text-muted/60 focus:border-accent-orange"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-foreground px-6 py-3 font-display text-sm font-semibold text-background transition-transform hover:scale-105 active:scale-95"
                >
                  Have Angel text me
                </button>
              </div>
            </form>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={() => setStep(2)}
              className="font-display text-sm font-semibold text-muted transition-colors hover:text-foreground"
            >
              ← Adjust the damage
            </button>
            <button
              onClick={() => {
                setStep(1);
                setVin("");
                setVehicle(null);
                setAreas([]);
                setSeverity("");
                setDrivable(null);
                setPhotoUrls([]);
                setPhotoCount(0);
              }}
              className="font-display text-sm font-semibold text-muted transition-colors hover:text-foreground"
            >
              Start over
            </button>
          </div>

          <p className="mt-8 rounded-xl bg-surface p-5 font-body text-xs leading-relaxed text-muted">
            This rough range is for general information only — not a quote, appraisal,
            or guarantee, and not legal, insurance, or financial advice. Actual repair
            cost depends on a full in-person inspection. Nothing you enter here is
            stored or sent anywhere unless you choose to text it.
          </p>
        </div>
      )}

      {scanning && (
        <VinScanner
          onDetected={(v) => {
            setScanning(false);
            decodeVin(v);
          }}
          onClose={() => setScanning(false)}
        />
      )}
    </div>
  );
}
