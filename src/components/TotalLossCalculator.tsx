"use client";

import { useState } from "react";
import Link from "next/link";

// California uses the Total Loss Formula (no fixed percentage):
// repair cost + salvage value >= vehicle's actual cash value  ->  total loss.
// This is an educational ballpark — the insurer's own numbers control.
function money(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

// Inputs read as soft insets inside the white card; focus lifts them to white
// and the global focus-visible outline marks them.
const inputCls =
  "h-14 w-full rounded-[var(--radius-inner)] bg-surface-light px-4 text-lg font-semibold tabular-nums text-foreground outline-none shadow-[inset_0_0_0_1px_var(--color-border)] transition-[background-color,box-shadow] placeholder:font-normal placeholder:text-muted/60 focus:bg-surface";

export default function TotalLossCalculator() {
  const [repair, setRepair] = useState("");
  const [acv, setAcv] = useState("");
  const [salvagePct, setSalvagePct] = useState(20);

  const repairN = parseFloat(repair.replace(/[^0-9.]/g, "")) || 0;
  const acvN = parseFloat(acv.replace(/[^0-9.]/g, "")) || 0;
  const salvageN = acvN * (salvagePct / 100);
  const formula = repairN + salvageN;
  const hasInput = repairN > 0 && acvN > 0;
  const isTotal = hasInput && formula >= acvN;
  const margin = Math.abs(acvN - formula);

  return (
    <div className="rounded-[var(--radius-card)] bg-surface p-6 shadow-[var(--shadow-lift)] sm:p-8 md:p-10">
      <p className="eyebrow text-accent-orange">The California math</p>
      <h2 className="mt-3 display text-3xl text-foreground sm:text-4xl">
        Run your numbers.
      </h2>
      <p className="mt-3 max-w-xl text-[0.95rem] leading-relaxed text-muted">
        California has no fixed &ldquo;70%&rdquo; rule — it uses the Total Loss
        Formula: if <span className="font-semibold text-foreground">repair cost + salvage value</span>{" "}
        meets or beats what your car is worth, they can total it.
      </p>

      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="eyebrow text-muted">
            Repair estimate ($)
          </span>
          <input
            inputMode="decimal"
            value={repair}
            onChange={(e) => setRepair(e.target.value)}
            placeholder="9,400"
            className={inputCls}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="eyebrow text-muted">
            Your car&apos;s value / ACV ($)
          </span>
          <input
            inputMode="decimal"
            value={acv}
            onChange={(e) => setAcv(e.target.value)}
            placeholder="17,500"
            className={inputCls}
          />
        </label>
      </div>

      <label className="mt-6 flex flex-col gap-2">
        <span className="eyebrow text-muted">
          Salvage value estimate: {salvagePct}% of ACV{" "}
          {acvN > 0 ? `(${money(salvageN)})` : ""}
        </span>
        <input
          type="range"
          min={10}
          max={35}
          value={salvagePct}
          onChange={(e) => setSalvagePct(parseInt(e.target.value, 10))}
          className="h-11 w-full cursor-pointer accent-accent-orange"
        />
        <span className="text-xs leading-relaxed text-muted">
          Typical range is 15&ndash;25%. Insurers get this number from salvage
          bids — you won&apos;t know it exactly until they do.
        </span>
      </label>

      <div
        className={`mt-7 rounded-[var(--radius-inner)] p-5 transition-colors md:p-6 ${
          !hasInput
            ? "bg-surface-light shadow-[inset_0_0_0_1px_var(--color-border)]"
            : isTotal
              ? "bg-accent-soft shadow-[inset_0_0_0_1px_rgb(180_66_26/0.22)]"
              : "bg-surface-light shadow-[inset_0_0_0_1px_var(--color-border)]"
        }`}
        aria-live="polite"
      >
        {!hasInput ? (
          <p className="text-sm leading-relaxed text-muted">
            Enter your repair estimate and your car&apos;s value to see which
            side of the line you&apos;re on.
          </p>
        ) : (
          <>
            <p className="text-sm font-semibold tabular-nums text-muted">
              {money(repairN)} repair + {money(salvageN)} salvage ={" "}
              {money(formula)} vs {money(acvN)} value
            </p>
            <p
              className={`mt-2 display text-3xl sm:text-4xl ${isTotal ? "text-accent-orange" : "text-foreground"}`}
            >
              {isTotal ? "Likely total loss" : "Likely repairable"}
            </p>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
              {isTotal
                ? `The formula beats your car's value by ${money(margin)}. Expect total-loss talk — which is a negotiation about your car's VALUE, not about the damage.`
                : `The formula comes in ${money(margin)} under your car's value. If someone says "total" anyway, the value number deserves a hard look.`}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
              <a
                href={`sms:+12132792992?body=${encodeURIComponent(
                  `Hey Angel — ran the total-loss math: repair ~${money(repairN)}, they say my car's worth ${money(acvN)}. Can you check their numbers?`
                )}`}
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-accent-orange px-6 py-2.5 text-center text-sm font-bold text-white shadow-[0_1px_2px_rgb(33_26_20/0.10),0_8px_20px_-10px_rgb(33_26_20/0.35)] transition-[background-color,transform] hover:bg-accent-lime active:scale-[0.97]"
              >
                Text me your valuation letter — free check
              </a>
              <Link
                href="/#get-help"
                className="inline-flex min-h-11 items-center text-sm font-bold text-accent-orange transition-colors hover:text-accent-lime"
              >
                or type it out →
              </Link>
            </div>
          </>
        )}
      </div>
      {!hasInput && (
        <p className="mt-4 text-xs leading-relaxed text-muted">
          Don&apos;t have these numbers yet? The repair figure comes from the
          shop&apos;s estimate (get a rough one in 30 seconds with the{" "}
          <Link
            href="/estimate"
            className="font-bold text-accent-orange underline decoration-accent-orange/40 underline-offset-2 transition-colors hover:text-accent-lime"
          >
            ballpark tool
          </Link>
          ); the value number comes from the insurer&apos;s valuation report —
          they must give it to you in writing.
        </p>
      )}

      <p className="mt-4 text-xs leading-relaxed text-muted">
        Educational ballpark only — the insurer&apos;s appraisal and salvage
        bids control the real decision. But now you know what the decision is
        made of.
      </p>
    </div>
  );
}
