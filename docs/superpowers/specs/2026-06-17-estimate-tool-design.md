# Instant Ballpark Estimate Tool — Design

Date: 2026-06-17
Status: Approved (engine = "guided ballpark")

## Goal
A calm, guardian-toned "what's this gonna cost?" tool. Inspired by Tesla's app:
decode the visitor's vehicle from their VIN, capture the damage, show an instant
**rough visual ballpark**, hammer that the real number only goes UP after teardown,
and steer them to file with insurance (with benefits named). Funnels to Angel's text.

## Scope (v1)
- Route: `/estimate` (standalone page, warm guardian palette, back-to-home link).
- 100% client-side. No backend, no API keys, no per-use cost. Nothing stored or sent
  except the SMS the user chooses to send Angel.

## Flow
1. **Your car** — paste/type VIN (17 chars). "Decode" → NHTSA vPIC `DecodeVinValues`
   (CORS `*`, free). Show "2003 Honda Accord Coupe EX-V6" + a body-type illustration
   (from `BodyClass`). Fallback: "skip / I don't have it" → proceed without vehicle.
   (True barcode scanning = future; v1 is type/paste with "where to find your VIN" help.)
2. **The damage** — multi-select areas (front bumper, hood, fender, door, rear bumper,
   quarter panel, roof, multiple); severity (scuffs / dents / smashed / heavy); "still
   drives safely?" yes/no. Optional photo picker (camera on mobile) — local preview only.
3. **The ballpark** — `$low–$high` from a transparent lookup table
   (area base range × severity multiplier, + not-drivable bump), rounded to clean numbers.
   Framed loudly: *visual ballpark only, only goes UP after teardown, NOT a quote.*
4. **Why go through insurance** — benefits block (accurate, matches the pro-insurance/
   pro-DRP stance): they pay minus deductible; not-at-fault = other insurer pays, often
   no deductible; shop + adjuster handle supplements (you don't eat hidden-damage
   surprises); rental coverage; total-loss / diminished-value handled; DRP lifetime
   warranty; cash out-of-pocket = every surprise is yours alone.
5. **Handoff** — "Text Angel the details" → `sms:` prefilled with vehicle + damage
   summary; prompt to attach the photos they picked (browsers can't auto-attach).

## Estimate numbers
Seeded with conservative, clearly-labeled placeholder ranges in a single data table
(`AREA_BASE`, `SEVERITY_MULT`). **Angel replaces these with his real numbers.** The tool
is only as good as his ranges; structure makes swapping trivial.

## Vehicle visual
Body-type SVG illustration keyed off `BodyClass` (sedan/coupe/SUV/truck/van/other) +
decoded text. No paid image API (exact-car photos = future paid option).

## Tech / infra
- Stays `output: "export"` static. Client component `EstimateTool.tsx` + thin
  `app/estimate/page.tsx` (metadata + back link).
- CSP: add `https://vpic.nhtsa.dot.gov` to `connect-src` in `netlify.toml`.
- Add nav link "Estimate" and a home entry point.

## Out of scope (v1)
AI photo analysis, exact-vehicle images, server-side photo capture/storage, live VIN
barcode scanning.

## Liability posture
Never call it a "quote" or "estimate guarantee" — it's a "rough visual ballpark."
Prominent disclaimer; pro-insurance steer; the real estimate is Angel's after he sees it.
```
