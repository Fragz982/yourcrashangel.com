"use client";

import { useState } from "react";
import { ChevronDownIcon, MessageIcon, PencilIcon } from "./Icons";

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
    <section id="get-help" className="bg-background py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl items-start gap-8 px-5 md:px-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
        <div className="lg:sticky lg:top-28 lg:pt-6">
          <p className="eyebrow text-accent-orange">Free help, no pressure</p>
          <h2 className="mt-3 display text-4xl text-foreground sm:text-5xl md:text-6xl">
            Three taps.
            <br />
            <span className="block text-accent-lime">Then I take it from there.</span>
          </h2>
          <p className="mt-5 max-w-md font-body text-base leading-relaxed text-muted md:text-lg">
            Answer three quick questions about your situation and leave your
            number — I&apos;ll personally text you back with what I&apos;d do
            next. Free, fast, no spam.
          </p>
        </div>

        <div className="rounded-[var(--radius-card)] bg-surface p-5 shadow-[var(--shadow-lift)] sm:p-8 md:p-10">
          {/* progress */}
          <div className="grid grid-cols-4 gap-1.5" aria-hidden="true">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-colors duration-300 ${
                  i < step
                    ? "bg-accent-lime"
                    : i === step
                      ? "bg-accent-orange"
                      : "bg-border"
                }`}
              />
            ))}
          </div>

          {/* quiz steps — hidden, never unmounted (SSR keeps full DOM) */}
          {QUESTIONS.map((q, i) => (
            <div key={q.key} hidden={step !== i} className="mt-7 animate-fade-rise">
              <p className="font-display text-2xl font-bold tracking-[-0.025em] text-foreground md:text-[1.75rem]">
                {q.question}
              </p>
              <div className="mt-5 grid gap-2.5 sm:grid-cols-2 sm:gap-3">
                {q.options.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => pick(i, opt)}
                    className="group flex min-h-14 items-center justify-between gap-3 rounded-[var(--radius-inner)] bg-surface-light px-5 py-3.5 text-left font-display text-base font-semibold text-foreground shadow-[inset_0_0_0_1px_var(--color-border)] transition-[background-color,box-shadow,transform] duration-200 hover:bg-accent-soft hover:shadow-[inset_0_0_0_1.5px_var(--color-accent-orange)] active:scale-[0.98]"
                  >
                    {opt}
                    <ChevronDownIcon className="h-4 w-4 shrink-0 -rotate-90 text-accent-orange transition-transform duration-200 group-hover:translate-x-0.5" />
                  </button>
                ))}
              </div>
              {i > 0 && (
                <button
                  type="button"
                  onClick={() => setStep(i - 1)}
                  className="-ml-3 mt-4 inline-flex h-11 items-center rounded-full px-3 font-body text-sm font-semibold text-muted transition-colors hover:bg-surface-light hover:text-foreground"
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
            className="mt-7 flex flex-col gap-4 animate-fade-rise"
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
                        className="inline-flex min-h-11 items-center rounded-full bg-accent-soft px-4 font-body text-sm font-semibold text-accent-lime transition-colors hover:bg-[#fbe4da] sm:min-h-9 sm:px-3.5"
                        title="Tap to change"
                      >
                        {a} <PencilIcon className="ml-1.5 h-3.5 w-3.5" />
                      </button>
                    )
                )}
              </div>
            )}

            <p className="mt-1 font-display text-2xl font-bold tracking-[-0.025em] text-foreground md:text-[1.75rem]">
              Where do I text your game plan?
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="font-body text-[0.72rem] font-bold uppercase tracking-[0.1em] text-muted">
                  First name
                </span>
                <input
                  required
                  name="name"
                  autoComplete="given-name"
                  className="h-12 rounded-[var(--radius-inner)] bg-surface-light px-4 font-body text-base text-foreground shadow-[inset_0_0_0_1px_var(--color-border)] outline-none transition-[background-color,box-shadow] focus:bg-surface focus:shadow-[inset_0_0_0_2px_var(--color-accent-orange)]"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="font-body text-[0.72rem] font-bold uppercase tracking-[0.1em] text-muted">
                  Phone (call or text)
                </span>
                <input
                  required
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  className="h-12 rounded-[var(--radius-inner)] bg-surface-light px-4 font-body text-base text-foreground shadow-[inset_0_0_0_1px_var(--color-border)] outline-none transition-[background-color,box-shadow] focus:bg-surface focus:shadow-[inset_0_0_0_2px_var(--color-accent-orange)]"
                />
              </label>
            </div>

            <label className="flex flex-col gap-2">
              <span className="font-body text-[0.72rem] font-bold uppercase tracking-[0.1em] text-muted">
                Anything else? (optional)
              </span>
              <textarea
                rows={3}
                value={extra}
                onChange={(e) => setExtra(e.target.value)}
                placeholder="Rear-ended on the 405. Their insurance already called twice…"
                className="resize-y rounded-[var(--radius-inner)] bg-surface-light px-4 py-3 font-body text-base leading-relaxed text-foreground shadow-[inset_0_0_0_1px_var(--color-border)] outline-none transition-[background-color,box-shadow] placeholder:text-muted/75 focus:bg-surface focus:shadow-[inset_0_0_0_2px_var(--color-accent-orange)]"
              />
            </label>

            <button
              type="submit"
              className="mt-2 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-accent-orange px-8 font-display text-base font-bold text-white shadow-[0_1px_2px_rgb(33_26_20/0.10),0_8px_20px_-10px_rgb(33_26_20/0.35)] transition-[background-color,transform] hover:bg-accent-lime active:scale-[0.97] sm:w-auto sm:self-start"
            >
              <MessageIcon className="h-5 w-5" />
              Send it — Angel replies fast
            </button>
            <p className="font-body text-xs leading-relaxed text-muted">
              Replies within a few hours, 7am&ndash;9pm, 7 days a week. No
              spam, no selling your info (
              <a href="/privacy" className="underline underline-offset-2 transition-colors hover:text-foreground">
                privacy
              </a>
              ) — ever.
            </p>
          </form>

          <p className="mt-7 border-t border-border pt-5 font-body text-sm leading-relaxed text-muted">
            Prefer to just talk?{" "}
            <a
              href="sms:+12132792992"
              className="font-bold text-accent-orange underline-offset-4 transition-colors hover:text-accent-lime hover:underline"
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
