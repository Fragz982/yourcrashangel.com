"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { MessageIcon } from "./Icons";

const SCENARIOS = [
  {
    id: "rear-ended",
    title: "I got rear-ended",
    hook: "I was just sitting there and someone slammed into me — now I'm scared their insurance will stall me or lowball me.",
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
        do: "Pick your own body shop, not theirs",
        why: "In California, you have the right to choose your repair shop. Their \"preferred\" shop answers to them, not you.",
      },
    ],
    textPrompt:
      "Hey Angel, I just got rear-ended. Sending photos of the damage now. What should I watch out for?",
  },
  {
    id: "hit-and-run",
    title: "Hit and run — they drove off",
    hook: "They hit me and took off, and now I'm afraid I'm the one stuck paying for someone else's crime.",
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
    hook: "They're blaming the whole thing on me and I'm terrified I'll get stuck with a bill for a crash I didn't cause.",
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
    hook: "The person who hit me has nothing, and I'm panicking that the whole bill is about to land on me.",
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
    hook: "My car is locked in some tow yard and I can feel the bill growing every day while I figure out what to do.",
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
    hook: "They want to cut a check for my car and I'm scared it won't cover what I still owe, let alone replace it.",
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
    <section id="scenarios" className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <ScrollReveal>
          <p className="eyebrow text-accent-orange">Pick your situation</p>
          <h2 className="mt-4 display text-5xl text-foreground sm:text-6xl md:text-7xl">
            What happened
            <br />
            <span className="text-accent-lime">to you?</span>
          </h2>
          <p className="mt-4 max-w-xl font-body text-lg text-muted">
            Every crash plays out differently. Tap yours and I&apos;ll tell you
            exactly what to do in the next 24 hours.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="mt-12 overflow-hidden rounded-3xl border border-border bg-surface">
            <div className="grid md:grid-cols-[minmax(240px,1fr)_2fr]">
              {/* Scenario picker */}
              <div className="flex flex-col gap-2 border-b border-border p-4 md:border-b-0 md:border-r md:p-6">
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
                      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left font-display text-sm font-semibold transition-colors md:text-base ${
                        isActive
                          ? "bg-accent-orange text-background"
                          : "text-muted hover:bg-background hover:text-foreground"
                      }`}
                    >
                      <span className="text-xl" aria-hidden="true">
                        {s.icon}
                      </span>
                      {s.title}
                    </button>
                  );
                })}
              </div>

              {/* Detail panel */}
              <div className="p-6 md:p-10" aria-live="polite">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="font-body text-base italic leading-relaxed text-muted">
                      &ldquo;{active.hook}&rdquo;
                    </p>

                    <ol className="mt-8 space-y-5">
                      {active.steps.map((step, i) => (
                        <li key={i} className="flex gap-4">
                          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-background font-display text-sm font-bold text-accent-lime">
                            {i + 1}
                          </span>
                          <div>
                            <p className="font-display text-base font-semibold text-foreground md:text-lg">
                              {step.do}
                            </p>
                            <p className="mt-1 font-body text-sm leading-relaxed text-muted">
                              {step.why}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ol>

                    <div className="mt-8 rounded-2xl border border-border bg-background p-5">
                      <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted">
                        Send me this — I&apos;ll take it from there
                      </p>
                      <p className="mt-3 font-body text-sm leading-relaxed text-foreground">
                        &ldquo;{active.textPrompt}&rdquo;
                      </p>
                      <div className="mt-4 flex flex-wrap gap-3">
                        <a
                          href={`sms:+12132792992?body=${encodeURIComponent(active.textPrompt)}`}
                          className="inline-flex items-center gap-2 rounded-full bg-accent-orange px-5 py-2.5 font-display text-sm font-semibold text-background transition-transform hover:scale-105 active:scale-95"
                        >
                          <MessageIcon className="h-4 w-4" />
                          Text me this
                        </a>
                        <button
                          onClick={copyText}
                          className="inline-flex items-center gap-2 rounded-full border-2 border-border px-5 py-2.5 font-display text-sm font-semibold text-foreground transition-colors hover:border-foreground/40"
                        >
                          {copied ? "Copied ✓" : "Copy text"}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <p className="mt-8 text-center font-body text-sm text-muted">
            Want to know every move they&apos;ll make before they make it?{" "}
            <a
              href="/playbook"
              className="font-semibold text-accent-orange transition-colors hover:text-accent-lime"
            >
              Read the Playbook →
            </a>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
