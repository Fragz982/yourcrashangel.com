"use client";

import { useState } from "react";

// Quiz-style intake — research: multi-step forms convert ~3x over flat forms
// for crisis-mode visitors (easy non-PII first question, contact info LAST).
// Netlify compatibility: ONE always-mounted <form name="crash-help"> whose
// fields (name, phone, message) match the registered form. Quiz answers are
// folded into the hidden `message` field, so no re-registration is needed.
// All inputs stay in the prerendered DOM (hidden, not unmounted) so Netlify's
// build-bot keeps seeing the full form definition.

type Q = { key: string; question: string; options: string[] };

const QUESTIONS: Q[] = [
  {
    key: "drivable",
    question: "Can you still drive it?",
    options: ["Drives fine", "Drivable, but beat up", "Not drivable", "Not sure"],
  },
  {
    key: "fault",
    question: "Whose fault was it?",
    options: ["The other driver", "Mine", "Shared / unclear", "Hit & run"],
  },
  {
    key: "insurance",
    question: "Heard from insurance yet?",
    options: ["Yes — mine", "Yes — theirs", "Both", "Not yet"],
  },
];

export default function QuizIntake() {
  const [step, setStep] = useState(0); // 0..2 = questions, 3 = contact
  const [answers, setAnswers] = useState<string[]>(["", "", ""]);
  const [extra, setExtra] = useState("");

  const pick = (i: number, opt: string) => {
    const next = [...answers];
    next[i] = opt;
    setAnswers(next);
    setStep(i + 1);
  };

  const message =
    `[Drivable: ${answers[0] || "—"} | Fault: ${answers[1] || "—"} | ` +
    `Insurance contact: ${answers[2] || "—"}] ${extra}`.trim();

  return (
    <section id="get-help" className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto max-w-2xl rounded-3xl border border-border bg-surface p-8 md:p-12">
          <p className="eyebrow text-accent-orange">Free help, no pressure</p>
          <h2 className="mt-4 display text-4xl text-foreground sm:text-5xl">
            Three taps.
            <br />
            <span className="text-accent-lime">Then I take it from there.</span>
          </h2>
          <p className="mt-4 max-w-md font-body text-base leading-relaxed text-muted">
            Answer three quick questions about your situation and leave your
            number — I&apos;ll personally text you back with what I&apos;d do
            next. Free, fast, no spam.
          </p>

          {/* progress */}
          <div className="mt-8 flex items-center gap-2" aria-hidden="true">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i < step
                    ? "w-8 bg-accent-lime"
                    : i === step
                      ? "w-8 bg-accent-orange"
                      : "w-4 bg-border"
                }`}
              />
            ))}
          </div>

          {/* quiz steps — hidden, never unmounted (SSR keeps full DOM) */}
          {QUESTIONS.map((q, i) => (
            <div key={q.key} hidden={step !== i} className="mt-6">
              <p className="font-display text-xl font-semibold text-foreground">
                {q.question}
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {q.options.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => pick(i, opt)}
                    className="rounded-2xl border-2 border-border bg-background px-5 py-4 text-left font-display text-base font-semibold text-foreground transition-all hover:border-accent-orange hover:scale-[1.02] active:scale-95"
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {i > 0 && (
                <button
                  type="button"
                  onClick={() => setStep(i - 1)}
                  className="mt-4 font-body text-sm text-muted underline underline-offset-4"
                >
                  ← Back
                </button>
              )}
            </div>
          ))}

          {/* contact step + the real Netlify form (always in the DOM) */}
          <form
            name="crash-help"
            method="POST"
            action="/thanks"
            data-netlify="true"
            netlify-honeypot="bot-field"
            hidden={step !== 3}
            className="mt-6 flex flex-col gap-4"
          >
            <input type="hidden" name="form-name" value="crash-help" />
            <input type="hidden" name="message" value={message} />
            <p className="hidden" aria-hidden="true">
              <label>
                Don&apos;t fill this out: <input name="bot-field" />
              </label>
            </p>

            {step === 3 && answers[0] && (
              <div className="flex flex-wrap gap-2">
                {answers.map(
                  (a, i) =>
                    a && (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setStep(i)}
                        className="rounded-full border border-border bg-background px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:border-accent-orange"
                        title="Tap to change"
                      >
                        {a} ✎
                      </button>
                    )
                )}
              </div>
            )}

            <p className="font-display text-xl font-semibold text-foreground">
              Where do I text your game plan?
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5">
                <span className="font-mono text-xs uppercase tracking-wider text-muted">
                  First name
                </span>
                <input
                  required
                  name="name"
                  autoComplete="given-name"
                  className="rounded-xl border border-border bg-background px-4 py-3 font-body text-foreground outline-none focus:border-accent-orange"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="font-mono text-xs uppercase tracking-wider text-muted">
                  Phone (call or text)
                </span>
                <input
                  required
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  className="rounded-xl border border-border bg-background px-4 py-3 font-body text-foreground outline-none focus:border-accent-orange"
                />
              </label>
            </div>

            <label className="flex flex-col gap-1.5">
              <span className="font-mono text-xs uppercase tracking-wider text-muted">
                Anything else? (optional)
              </span>
              <textarea
                rows={3}
                value={extra}
                onChange={(e) => setExtra(e.target.value)}
                placeholder="Rear-ended on the 405. Their insurance already called twice…"
                className="rounded-xl border border-border bg-background px-4 py-3 font-body text-foreground outline-none placeholder:text-muted/60 focus:border-accent-orange"
              />
            </label>

            <button
              type="submit"
              className="mt-2 self-start rounded-full bg-accent-orange px-8 py-4 font-display text-base font-semibold text-background transition-transform hover:scale-105 active:scale-95"
            >
              Send it — Angel replies fast
            </button>
            <p className="font-body text-xs text-muted">
              Replies within a few hours, 7am&ndash;9pm, 7 days a week. No
              spam, no selling your info (
              <a href="/privacy" className="underline underline-offset-2">
                privacy
              </a>
              ) — ever.
            </p>
          </form>

          <p className="mt-6 border-t border-border pt-4 font-body text-sm text-muted">
            Prefer to just talk?{" "}
            <a
              href="sms:+12132792992"
              className="font-semibold text-accent-orange transition-colors hover:text-accent-lime"
            >
              Text (213) 279-2992
            </a>{" "}
            — same human, same speed.
          </p>
        </div>
      </div>
    </section>
  );
}
