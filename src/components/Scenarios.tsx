"use client";

import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import type { ComponentType } from "react";
import { MessageIcon, ImpactIcon, RunIcon, ScaleIcon, BanIcon, ClockIcon, DollarIcon } from "./Icons";

// Each scenario keeps its emoji in the data; it renders as a site SVG icon.
const SVG_FOR: Record<string, ComponentType<{ className?: string }>> = {
  "💥": ImpactIcon,
  "🏃": RunIcon,
  "⚖️": ScaleIcon,
  "🚫": BanIcon,
  "⏳": ClockIcon,
  "💸": DollarIcon,
};
function ScenarioIcon({ icon, className }: { icon: string; className?: string }) {
  const Svg = SVG_FOR[icon];
  return Svg ? <Svg className={className ?? "h-5 w-5"} /> : <>{icon}</>;
}

const SCENARIOS = [
  {
    id: "rear-ended",
    title: "I got rear-ended",
    hook: "Someone rear-ended you. Take a breath — this is one of the most clear-cut claims there is, and the upper hand is yours.",
    icon: "💥",
    steps: [
      {
        do: "Photograph both cars, their plate, and the road",
        why: "Bumper covers hide damage behind them. Photos lock in the story before the other driver's version changes.",
      },
      {
        do: "Get their insurance card and license on camera",
        why: "Verbal info gets fumbled or faked. A photo of the actual cards can't be argued with later.",
      },
      {
        do: "Decline a recorded statement to THEIR insurer",
        why: "In California you don't owe the other driver's insurer a recorded statement. It's a tool for paying you less, not for helping you.",
      },
      {
        do: "Choose a shop you trust",
        why: "In California the choice is yours — and that can absolutely be the shop your insurer recommends (those are vetted and usually guaranteed). Pick on reputation, not on who suggested it.",
      },
    ],
    textPrompt:
      "Hey Angel, I just got rear-ended. Sending photos of the damage now. What should I watch out for?",
  },
  {
    id: "hit-and-run",
    title: "Hit and run — they drove off",
    hook: "They hit you and drove off. Infuriating — but not hopeless. Let's work on finding them, or getting you covered anyway.",
    icon: "🏃",
    steps: [
      {
        do: "Write down everything you remember, right now",
        why: "Partial plate, car color, direction they went — details vanish fast, and even a partial plate gives police something to run.",
      },
      {
        do: "File a police report within 24 hours",
        why: "In California, hit-and-run claims under uninsured motorist coverage usually require a police report filed fast — often within 24 hours. Skipping it can sink the whole claim.",
      },
      {
        do: "Photograph the paint transfer on your car",
        why: "Their paint on your bumper proves contact happened. Hit-and-run UM claims usually need proof of actual contact.",
      },
      {
        do: "Check your policy for uninsured motorist coverage",
        why: "If you carry UM, it can pay for a hit-and-run in California. A lot of people have it and don't even know.",
      },
    ],
    textPrompt:
      "Angel, someone hit my car and drove off. I have photos and a partial plate. Is this even covered?",
  },
  {
    id: "fault-dispute",
    title: "They say it's MY fault",
    hook: "They're trying to pin it on you. Stay calm — fault isn't decided at the scene, and the evidence does the talking.",
    icon: "⚖️",
    steps: [
      {
        do: "Don't apologize or agree to fault, period",
        why: "Fault gets decided by evidence, not by who yells loudest at the scene. \"I'm sorry\" becomes their Exhibit A.",
      },
      {
        do: "Save photos, dashcam clips, and witness numbers",
        why: "California uses pure comparative negligence — fault is split by percentage, not all-or-nothing. Evidence is what moves your number down.",
      },
      {
        do: "Skip the recorded statement with their insurer",
        why: "You're not required to give one to the OTHER driver's insurance in California. They use it to pin more fault on you.",
      },
      {
        do: "Give your own insurer plain facts only",
        why: "You do have to cooperate with your own company. Facts, not guesses — \"I don't know\" is a complete answer.",
      },
    ],
    textPrompt:
      "Angel, the other driver says the crash is my fault. I have photos. Can you look before I talk to insurance?",
  },
  {
    id: "uninsured-driver",
    title: "They have no insurance",
    hook: "The other driver has no insurance. Breathe — this is exactly what your own coverage is built for. Here's the play.",
    icon: "🚫",
    steps: [
      {
        do: "Photograph their license, plate, and registration",
        why: "Uninsured drivers have a habit of disappearing. Those photos may be the only way anyone finds them again.",
      },
      {
        do: "File a police report before anyone leaves",
        why: "The report locks in who hit you and that they drove uninsured. Without it, your claim gets a lot easier to fight.",
      },
      {
        do: "Check your policy for UM coverage",
        why: "Uninsured motorist coverage is optional in California, but insurers have to offer it — saying no takes a signed waiver. It exists for exactly this.",
      },
      {
        do: "Refuse cash deals at the scene",
        why: "Hidden damage shows up days later and the cash never covers it. Once they drive off, that promise is gone.",
      },
    ],
    textPrompt:
      "Angel, I got hit and the other driver has no insurance. Sending a photo of my damage. What are my options?",
  },
  {
    id: "towed-to-yard",
    title: "My car's at a tow yard",
    hook: "Your car's at a tow yard and the fees are climbing. Let's move quick and steady — here's how to stop the meter.",
    icon: "⏳",
    steps: [
      {
        do: "Call the yard today, ask the daily rate",
        why: "Tow yards charge storage every single day. Insurers also push back on paying for days you sat and waited.",
      },
      {
        do: "Move the car to a shop you choose",
        why: "Moving it stops the meter. In California the shop choice is yours, and a good shop may store it free while the claim sorts out.",
      },
      {
        do: "Get an itemized tow and storage invoice",
        why: "Those fees are usually part of the claim. No receipt, no reimbursement.",
      },
      {
        do: "Tell your insurer where the car sits, today",
        why: "The adjuster can't inspect a car they can't find. Every day of delay is another storage charge.",
      },
    ],
    textPrompt:
      "Angel, my car got towed to a storage yard after a crash. Fees are stacking daily. Can you help me get it moved?",
  },
  {
    id: "total-loss",
    title: "They want to total my car",
    hook: "They want to total your car. Before you stress about the number — it's negotiable, and I'll help you get a fair one.",
    icon: "💸",
    steps: [
      {
        do: "Ask for the valuation report in writing",
        why: "Their number comes from a list of \"comparable\" cars. You can't argue with a number you've never seen.",
      },
      {
        do: "Pull listings for your exact car nearby",
        why: "Same year, trim, and miles in your area. Real local comps are how people often get the offer raised.",
      },
      {
        do: "Don't sign the release until the number's right",
        why: "Signing closes the claim. The first offer is a starting point, not a verdict.",
      },
      {
        do: "Ask if repairing it still makes sense",
        why: "In California \"totaled\" is roughly a formula: repair cost plus salvage value versus what the car is worth. Borderline cars can sometimes be saved.",
      },
    ],
    textPrompt:
      "Angel, insurance wants to total my car. Sending their offer and photos of the damage. Is this number fair?",
  },
];

export default function Scenarios() {
  const [activeId, setActiveId] = useState(SCENARIOS[0].id);
  const [copied, setCopied] = useState(false);
  const active = SCENARIOS.find((s) => s.id === activeId) ?? SCENARIOS[0];

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(active.textPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable (http / old browser) — the sms link still works
    }
  };

  return (
    <section id="scenarios" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <ScrollReveal>
          <p className="eyebrow text-accent-orange">Pick your situation</p>
          <h2 className="mt-4 display text-4xl text-foreground sm:text-5xl md:text-6xl">
            What happened
            <br />
            <span className="text-accent-lime">to you?</span>
          </h2>
          <p className="mt-5 max-w-xl font-body text-lg leading-relaxed text-muted">
            Every crash plays out differently. Tap yours and I&apos;ll tell you
            exactly what to do in the next 24 hours.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="mt-10 overflow-hidden rounded-[var(--radius-card)] bg-surface shadow-[var(--shadow-card)] md:mt-14">
            <div className="grid md:grid-cols-[minmax(260px,1fr)_2fr]">
              {/* Scenario picker */}
              <div className="p-3 md:p-4">
                <div className="flex flex-col gap-2 rounded-[var(--radius-inner)] bg-surface-light p-2.5 md:h-full md:gap-1 md:p-2">
                  {SCENARIOS.map((s) => {
                    const isActive = s.id === activeId;
                    return (
                      <button
                        key={s.id}
                        onClick={() => {
                          setActiveId(s.id);
                          setCopied(false);
                        }}
                        aria-pressed={isActive}
                        className={`flex min-h-11 items-center gap-2.5 rounded-full px-4 py-2 text-left font-display text-sm font-semibold transition-[background-color,color,box-shadow,transform] duration-150 active:scale-[0.97] md:min-h-12 md:gap-3 md:rounded-[var(--radius-inner)] md:text-base ${
                          isActive
                            ? "bg-accent-orange text-white shadow-[var(--shadow-card)]"
                            : "bg-surface text-foreground shadow-[inset_0_0_0_1px_var(--color-border)] hover:bg-background md:bg-transparent md:shadow-none md:hover:bg-surface md:hover:shadow-[var(--shadow-card)]"
                        }`}
                      >
                        <span className="text-lg leading-none md:text-xl" aria-hidden="true">
                          <ScenarioIcon icon={s.icon} />
                        </span>
                        {s.title}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Detail panel */}
              <div className="px-5 pb-6 pt-4 md:py-10 md:pl-6 md:pr-10" aria-live="polite">
                <div key={active.id} className="animate-fade-rise">
                    <p className="font-display text-lg font-medium leading-snug tracking-tight text-foreground md:text-xl">
                      &ldquo;{active.hook}&rdquo;
                    </p>

                    <ol className="mt-7 space-y-5 md:mt-8">
                      {active.steps.map((step, i) => (
                        <li key={i} className="flex gap-4">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-soft font-display text-sm font-bold text-accent-lime">
                            {i + 1}
                          </span>
                          <div className="pt-1">
                            <p className="font-display text-base font-bold leading-snug tracking-tight text-foreground md:text-lg">
                              {step.do}
                            </p>
                            <p className="mt-1.5 font-body text-[15px] leading-relaxed text-muted">
                              {step.why}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ol>

                    <div className="mt-8 rounded-[var(--radius-inner)] bg-surface-light p-4 md:p-6">
                      <p className="eyebrow text-accent-lime">
                        Send me this — I&apos;ll take it from there
                      </p>
                      <p className="mt-3 rounded-[18px] rounded-bl-md bg-surface px-4 py-3 font-body text-[15px] leading-relaxed text-foreground shadow-[var(--shadow-card)]">
                        &ldquo;{active.textPrompt}&rdquo;
                      </p>
                      <div className="mt-4 flex flex-wrap gap-3">
                        <a
                          href={`sms:+12132792992?body=${encodeURIComponent(active.textPrompt)}`}
                          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-accent-orange px-5 font-display text-sm font-bold text-white transition-[transform,background-color] duration-150 hover:bg-accent-lime active:scale-[0.97] md:min-h-12 md:px-6 md:text-base"
                        >
                          <MessageIcon className="h-4 w-4" />
                          Text me this
                        </a>
                        <button
                          onClick={copyText}
                          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-surface px-5 font-display text-sm font-bold text-foreground shadow-[inset_0_0_0_1px_var(--color-border)] transition-[transform,background-color] duration-150 hover:bg-background active:scale-[0.97] md:min-h-12 md:px-6 md:text-base"
                        >
                          {copied ? "Copied ✓" : "Copy text"}
                        </button>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <p className="mt-8 text-center font-body text-sm text-muted md:text-base">
            Want to know every move they&apos;ll make before they make it?{" "}
            <a
              href="/playbook"
              className="font-semibold text-accent-orange underline-offset-4 transition-colors hover:text-accent-lime hover:underline"
            >
              Read the Playbook →
            </a>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
