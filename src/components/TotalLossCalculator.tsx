"use client";

import { useState } from "react";

// California uses the Total Loss Formula (no fixed percentage):
// repair cost + salvage value >= vehicle's actual cash value  ->  total loss.
// This is an educational ballpark — the insurer's own numbers control.
function money(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

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
    <div className="rounded-3xl border border-border bg-surface p-6 md:p-8">
      <p className="eyebrow text-accent-orange">The California math</p>
      <h2 className="mt-2 display text-3xl text-foreground sm:text-4xl">
        Run your numbers.
      </h2>
      <p className="mt-3 max-w-lg font-body text-sm text-muted">
        California has no fixed &ldquo;70%&rdquo; rule — it uses the Total Loss
        Formula: if <span className="font-semibold text-foreground">repair cost + salvage value</span>{" "}
        meets or beats what your car is worth, they can total it.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-xs uppercase tracking-wider text-muted">
            Repair estimate ($)
          </span>
          <input
            inputMode="decimal"
            value={repair}
            onChange={(e) => setRepair(e.target.value)}
            placeholder="9,400"
            className="rounded-xl border border-border bg-background px-4 py-3 font-body text-foreground outline-none placeholder:text-muted/50 focus:border-accent-orange"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-xs uppercase tracking-wider text-muted">
            Your car&apos;s value / ACV ($)
          </span>
          <input
            inputMode="decimal"
            value={acv}
            onChange={(e) => setAcv(e.target.value)}
            placeholder="17,500"
            className="rounded-xl border border-border bg-background px-4 py-3 font-body text-foreground outline-none placeholder:text-muted/50 focus:border-accent-orange"
          />
        </label>
      </div>

      <label className="mt-4 flex flex-col gap-1.5">
        <span className="font-mono text-xs uppercase tracking-wider text-muted">
          Salvage value estimate: {salvagePct}% of ACV{" "}
          {acvN > 0 ? `(${money(salvageN)})` : ""}
        </span>
        <input
          type="range"
          min={10}
          max={35}
          value={salvagePct}
          onChange={(e) => setSalvagePct(parseInt(e.target.value, 10))}
          className="accent-accent-orange"
        />
        <span className="font-body text-xs text-muted">
          Typical range is 15&ndash;25%. Insurers get this number from salvage
          bids — you won&apos;t know it exactly until they do.
        </span>
      </label>

      <div
        className={`mt-6 rounded-2xl border p-5 ${
          !hasInput
            ? "border-border bg-background"
            : isTotal
              ? "border-accent-orange/50 bg-accent-orange/5"
              : "border-accent-lime/50 bg-accent-lime/5"
        }`}
        aria-live="polite"
      >
        {!hasInput ? (
          <p className="font-body text-sm text-muted">
            Enter your repair estimate and your car&apos;s value to see which
            side of the line you&apos;re on.
          </p>
        ) : (
          <>
            <p className="font-mono text-xs uppercase tracking-wider text-muted">
              {money(repairN)} repair + {money(salvageN)} salvage ={" "}
              {money(formula)} vs {money(acvN)} value
            </p>
            <p
              className={`mt-2 display text-2xl sm:text-3xl ${isTotal ? "text-accent-orange" : "text-accent-lime"}`}
            >
              {isTotal ? "Likely total loss" : "Likely repairable"}
            </p>
            <p className="mt-2 font-body text-sm text-muted">
              {isTotal
                ? `The formula beats your car's value by ${money(margin)}. Expect total-loss talk — which is a negotiation about your car's VALUE, not about the damage.`
                : `The formula comes in ${money(margin)} under your car's value. If someone says "total" anyway, the value number deserves a hard look.`}
            </p>
          </>
        )}
      </div>

      <p className="mt-4 font-body text-xs text-muted">
        Educational ballpark only — the insurer&apos;s appraisal and salvage
        bids control the real decision. But now you know what the decision is
        made of.
      </p>
    </div>
  );
}
