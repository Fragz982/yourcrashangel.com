"use client";

import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { ChevronDownIcon } from "./Icons";

type Faq = { question: string; answer: string };

const CATEGORIES: { name: string; faqs: Faq[] }[] = [
  {
    name: "Right after the crash",
    faqs: [
      {
        question: "The damage looks minor — should I even bother filing a claim?",
        answer:
          "Get it looked at first. Bumpers are plastic covers over crash structures — I see \"minor\" taps hiding bent reinforcement bars and crushed absorbers all the time. Modern cars also pack sensors and radar behind that plastic. If the damage really is cosmetic and the fix costs less than your deductible, paying out of pocket can make sense. But don't decide that from the curb. And if the other driver was at fault and you go through their insurance, your deductible never enters the picture. Text me a photo — free — and I'll tell you if it's a scratch or a problem. (213) 279-2992.",
      },
      {
        question: "The tow yard is charging me storage every day — what do I do?",
        answer:
          "Move fast. Storage fees are real and they stack daily — often $50 to $100 or more per day in LA. Insurers usually pay reasonable storage, but if your car sits for two weeks while everyone \"processes paperwork,\" they may fight the bill or try to subtract it from your payout. Call your insurer today, tell them exactly where the car is, and push to get it moved to a shop or their storage lot. If they drag their feet, put it in writing that fees are piling up because of their delay. This is one of the few parts of a claim where every single day costs you money.",
      },
      {
        question: "My kid's car seat was in the crash — do I need a new one?",
        answer:
          "Usually, yes — and make the insurance pay for it. Car seats are built for one crash. After a moderate or severe collision, the safety guidance is to replace the seat even if it looks fine, because the plastic and harness can be stressed in ways you can't see. Only a truly minor crash that meets specific criteria lets a seat stay in service. Add the replacement to your claim — it's property damage, same as the bumper, and adjusters usually pay it without a fight. Keep the receipt for the new one, and don't sell or donate the old seat.",
      },
    ],
  },
  {
    name: "Dealing with the other driver's insurance",
    faqs: [
      {
        question: "The other driver's insurance keeps calling me. Do I have to talk to them?",
        answer:
          "No. You have no contract with them, so you owe them almost nothing. In California you do have to cooperate with YOUR OWN insurer — that's in your policy. The other driver's company is a different story. Their adjuster's job is to pay you as little as possible, and the friendly phone calls are part of that job. You can keep it short: give them basic facts about where and when, or just tell them to handle everything through your insurer. You are not required to give them a recorded statement, and I'd suggest you don't.",
      },
      {
        question: "Should I give a recorded statement?",
        answer:
          "To your own insurer: usually you have to cooperate, and a statement is often part of that. Be honest, stick to facts, don't guess — if you don't know how fast you were going, say \"I don't know.\" To the OTHER driver's insurer: no. You're not required to, and that recording mostly exists so they can find a sentence to use against you later. \"I'm fine,\" said politely two hours after a crash, gets quoted back when your neck stiffens up on day three. Politely decline. If anyone was injured, talk to a lawyer before you record anything.",
      },
      {
        question: "They're offering me a quick settlement check. Should I take it?",
        answer:
          "Slow down. A fast check usually means they think the claim is worth more than the check. The big risk is the release you sign with it — once signed, the claim is usually closed for good, even if your shop finds hidden damage next week or your back starts hurting next month. In my experience, hidden damage shows up on most repairs once the car comes apart, so an early number is almost always a low number. Get a real teardown estimate from a shop you trust first. Text me the offer and a photo of the damage — free — and I'll tell you if the math smells right.",
      },
      {
        question: "What is diminished value, and can I claim it?",
        answer:
          "Even after a perfect repair, a car with an accident on its history report is usually worth less than the same car without one. That gap is diminished value. In California you generally claim it third-party — against the at-fault driver's insurance, not your own. So if the other driver caused the crash, you can demand the repair AND the lost resale value. You'll need to back it up: the repair invoice, plus evidence of what clean-history versus damaged-history cars actually sell for. Insurers won't volunteer this money and they'll act like the claim is exotic. It isn't. People often recover real money here just by asking with documentation.",
      },
    ],
  },
  {
    name: "Money: deductibles, rentals, and your rates",
    faqs: [
      {
        question: "What's a deductible, and when do I actually pay it?",
        answer:
          "Your deductible is the chunk of the repair you agreed to cover yourself — usually $500 or $1,000. You typically pay it to the body shop when you pick up your car, not to the insurance company, and only when YOUR policy is paying for the repair. If the other driver was at fault and you go through their insurance, there's no deductible at all. And if you go through your own insurer and the other driver is later found at fault, your insurer usually chases them for the money and refunds your deductible. It's not always gone forever.",
      },
      {
        question: "I can't afford my deductible. What are my options?",
        answer:
          "First: if the other driver was at fault, go through their insurance — no deductible. Second: if fault is yours or still being argued, ask your insurer whether you'll get the deductible back later if the other driver ends up responsible — that happens more than people think. Third: some shops offer payment plans on the deductible. That's legitimate, and completely different from a shop offering to \"waive\" it, which is a fraud red flag. What you should NOT do is let a shop quietly bury your deductible in the bill. Text me before you sign anything and I'll help you find a real path.",
      },
      {
        question: "Who pays for my rental car?",
        answer:
          "Depends on fault. If the other driver caused the crash, their insurance should pay for a rental — or the cash value of one — for the reasonable time your car is in the shop. That's part of your loss. If you're using your own policy, you only get a rental if you bought rental reimbursement coverage, which usually caps out around $30 to $50 a day for about 30 days. Check your declarations page; lots of people have this coverage and forgot. If nobody's paying yet because fault is disputed, keep your rental receipts — you can claim them back later.",
      },
      {
        question: "Will my rates go up if the accident wasn't my fault?",
        answer:
          "In California, insurers generally can't raise your rates over a crash you weren't principally at fault for — that protection comes from Prop 103, the law that regulates auto insurance rates here. So if the other driver was clearly at fault, the accident itself usually shouldn't hike your premium. Two honest caveats: fault has to actually be determined in your favor, not just feel that way, and your rate can still change for other reasons, like an across-the-board increase. Don't skip filing a legitimate claim out of rate fear — in California, when you're not at fault, that fear is mostly misplaced.",
      },
      {
        question: "Can I just take the money instead of fixing the car?",
        answer:
          "Often, yes. It's called a cash-out: the insurer pays the estimate amount and you decide what to do with it. People do this on older cars with cosmetic damage all the time. Three things to know. If you have a loan or lease, the lender usually has to sign off and may require the repair. The insurer may pay less than full shop rates when no shop is involved. And if you cash out and don't repair, future damage in that same spot gets messy to claim. Make sure the estimate is honest first — a lowball estimate means a lowball check.",
      },
    ],
  },
  {
    name: "Getting your car fixed right",
    faqs: [
      {
        question: "Do I have to use my insurer's recommended shop?",
        answer:
          "You can use any licensed shop in California — but don't write off the one your insurer recommends. Those \"Direct Repair Program\" (DRP) shops are vetted by the insurer, they handle the back-and-forth paperwork for you, and they usually guarantee the repair for as long as you own the car. A lot of them do excellent work — I'd know, I'm in this world every day. The insurer recommending a shop isn't a trap; it's often the fastest, smoothest path. So pick a shop you trust. If that's their recommendation, great. If you'd rather bring your own, that's your right too — just choose on the shop's reputation and the people, not on who suggested it.",
      },
      {
        question: "What's a supplement?",
        answer:
          "When a shop tears into your car, they almost always find hidden damage the first estimate missed — stuff behind the bumper, under a panel, structural damage you can't see from the outside. A supplement is the request to the insurer for more money to cover that extra work. It's completely normal — in my experience it happens on most repairs. If a shop tells you \"the estimate covers everything\" before they've even taken the car apart, be suspicious. I write supplements all day — it's the part of this process I know best, so send me yours if something looks off.",
      },
      {
        question: "OEM vs aftermarket parts — does it matter?",
        answer:
          "Honestly? Less than people think — and here's the truth most won't tell you. Aftermarket (A/M) parts are made by other manufacturers, and in the vast majority of cases they look, fit, and function just like the factory (OEM) part. In California a non-OEM crash part is legally required to be at least equal in kind and quality, and many A/M parts are certified to match — on most repairs you genuinely won't see or feel a difference. Here's the part that actually matters: if you want guaranteed OEM, that comes from an OEM (original-equipment) endorsement on your policy — something you add when you buy or renew it. No endorsement? You can still get OEM by paying the difference. What you can't really do is demand free OEM on a standard policy and be upset when the estimate comes back aftermarket — that's just how coverage works. Bottom line: A/M is usually perfectly fine. If OEM matters to you, get the endorsement before you ever need it.",
      },
      {
        question: "How long do repairs actually take?",
        answer:
          "Usually longer than the first estimate says. A simple bumper job can be a few days. Anything with hidden damage, structural work, or backordered parts can run two to six weeks — and lately, parts delays are the biggest holdup I see. The honest timeline only shows up after teardown, when the shop can see everything and order everything. So ask for a target date AFTER teardown, and ask the shop to update you when supplements get approved, because insurer approval time is often the real bottleneck. If your rental coverage has a day cap, tell the shop up front — a good one will plan around it.",
      },
      {
        question: "Someone offered to waive my deductible — should I?",
        answer:
          "Run. Seriously. A shop that says \"we'll cover your deductible\" is telling you they'll cut $500 to $1,000 out of the repair somewhere. That money has to come from somewhere, and it comes from your car — cheaper parts, skipped procedures, shortcuts on paint and blending. It can also cross into insurance fraud, because the shop usually makes up the difference by padding the bill to the insurer. A legit shop charges what the repair actually costs and hands you a bill for your deductible. Boring, I know. Boring is exactly what you want here.",
      },
    ],
  },
  {
    name: "Totaled cars, lawyers, and where I fit in",
    faqs: [
      {
        question: "My car was totaled — is it trash?",
        answer:
          "\"Total loss\" doesn't mean your car is destroyed. It means the insurer decided fixing it isn't worth it. In California that's a formula — repair cost plus salvage value versus what the car is actually worth — not a fixed percentage. Here's the thing: the value they start from is often low. You can dispute their offer with comparable vehicles from your area — same year, mileage, options. People often get a better number, sometimes much better, just by pushing back with evidence. Before you sign anything, text me their valuation report — free — and I'll tell you if it's fair.",
      },
      {
        question: "Do I need a lawyer, or are you enough?",
        answer:
          "Depends on what got hurt. If it's just your car — dents, estimates, total loss numbers, parts fights — you usually don't need a lawyer, and I can walk you through all of it for free. If a PERSON got hurt — real injuries, medical bills, missed work — get a personal injury attorney, and get one early, before you give statements or sign anything. I'm a collision estimator, not a lawyer, and I won't pretend otherwise. What I will do is tell you honestly which situation you're in, and if you need an attorney, point you to ones in LA who actually answer their phones.",
      },
      {
        question: "How much does this cost?",
        answer:
          "Nothing. Texting me, sending me your estimate, asking me questions — it's all free. I do this because I've seen too many people get taken advantage of, and I'm in a position to help. If you need a referral to a good shop or an attorney in LA, I'll point you in the right direction, but there's never a bill from me. Send a photo of the damage or your estimate to (213) 279-2992 and I'll take a look. No strings, no sales pitch, no \"free consultation\" that turns into an invoice.",
      },
    ],
  },
];

function FAQItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: Faq;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-border">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-6 text-left"
        aria-expanded={isOpen}
      >
        <span className="font-display text-lg font-semibold text-foreground md:text-xl">
          {faq.question}
        </span>
        <span
          className="shrink-0 transition-transform duration-200"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <ChevronDownIcon className="h-5 w-5 text-muted" />
        </span>
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="pb-6 font-body text-base leading-relaxed text-muted">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openKey, setOpenKey] = useState<string | null>("0-0");

  return (
    <section id="faq" className="bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <ScrollReveal>
          <p className="eyebrow text-accent-orange">Frequently asked</p>
          <h2 className="mt-4 display text-5xl text-foreground sm:text-6xl md:text-7xl">
            Real questions.
            <br />
            <span className="text-accent-lime">Straight answers.</span>
          </h2>
        </ScrollReveal>

        {CATEGORIES.map((category, ci) => (
          <div key={category.name} className="mt-12">
            <ScrollReveal>
              <p className="eyebrow text-[0.7rem] text-accent-lime">
                {category.name}
              </p>
            </ScrollReveal>
            <div className="mt-4">
              {category.faqs.map((faq, i) => {
                const key = `${ci}-${i}`;
                return (
                  <ScrollReveal key={key} delay={i * 0.04}>
                    <FAQItem
                      faq={faq}
                      isOpen={openKey === key}
                      onToggle={() => setOpenKey(openKey === key ? null : key)}
                    />
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        ))}

        <ScrollReveal delay={0.2}>
          <p className="mt-10 text-center font-body text-sm text-muted">
            Confused by a word they used?{" "}
            <a
              href="/decoder"
              className="font-semibold text-accent-orange transition-colors hover:text-accent-lime"
            >
              Check the Decoder →
            </a>
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <p className="mt-8 rounded-xl bg-background p-6 font-body text-sm leading-relaxed text-muted">
            <strong className="text-foreground">Disclaimer:</strong> This is
            educational information only — not legal, insurance, or financial
            advice. Every situation is different. For advice specific to your
            claim, talk to a licensed professional.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
