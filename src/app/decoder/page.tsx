import type { Metadata } from "next";
import Link from "next/link";
import { MessageIcon } from "../../components/Icons";

export const metadata: Metadata = {
  title: "Insurance Jargon Decoder | yourcrashangel",
  description:
    "ACV, supplement, betterment, DRP, diminished value — 24 collision and insurance terms translated into plain English by a real LA collision estimator, with the money angle on every one.",
  alternates: { canonical: "/decoder" },
};

const TERMS = [
  {
    term: "Claim number",
    plainEnglish:
      "The ID number your insurance company stamps on your accident the moment you report it. Every call, email, and check ties back to this one number.",
    whyItMatters:
      "Nothing moves without it. Save it in your phone the second you get it — call without it and you start from zero with a stranger every time.",
  },
  {
    term: "Adjuster",
    plainEnglish:
      "The insurance company employee assigned to your claim. They decide what gets paid, how much, and how fast.",
    whyItMatters:
      "They are polite, but they work for the insurance company, not you. Their job is to close your claim cheap and quick — be nice, take notes, and never treat the first number as final.",
  },
  {
    term: "First-party vs third-party claim",
    plainEnglish:
      "First-party means you file with YOUR insurance company. Third-party means you file with the OTHER driver's insurance because their driver hit you.",
    whyItMatters:
      "Different rules. You have a duty to cooperate with your own insurer, but you do not owe the other driver's insurer a recorded statement. In California, things like diminished value are usually third-party claims.",
  },
  {
    term: "Deductible",
    plainEnglish:
      "Your share of the repair bill when you use your own insurance. Repairs cost $5,000, your deductible is $500 — insurance pays $4,500, you pay $500.",
    whyItMatters:
      "If the other driver was at fault, going through THEIR insurance usually means no deductible at all. Go through yours and you can often get it back later when your insurer collects from the other side.",
  },
  {
    term: "Rental reimbursement",
    plainEnglish:
      "Optional coverage on your own policy that pays for a rental car while yours is in the shop. Usually a daily dollar limit and a max number of days.",
    whyItMatters:
      "If the other driver was at fault, their insurance should cover your rental once they accept fault — don't burn your own coverage if you don't have to. Either way, know the daily limit before you grab the SUV at the counter.",
  },
  {
    term: "Steering",
    plainEnglish:
      "When an insurer points you to one of their network shops — \"we can get you right in at our place.\" Recommending is normal and legal; flat-out telling you that you have no other choice is not.",
    whyItMatters:
      "Take the recommendation seriously — network shops are vetted and usually guarantee the work, so it's often a good option. Just know the final call is yours: in California you can use any licensed shop you trust. Recommended or your own pick, both are valid.",
  },
  {
    term: "DRP (direct repair program)",
    plainEnglish:
      "A partnership between a body shop and an insurer: the shop meets the insurer's standards and pricing, and in return gets steady referrals.",
    whyItMatters:
      "For you, a DRP shop usually means a faster start, less paperwork to chase, and a repair warranty. Plenty of DRP shops do excellent work — it's a convenient, legitimate option. Just pick one with a solid reputation, same as you would any shop.",
  },
  {
    term: "Tear-down",
    plainEnglish:
      "Taking the damaged parts off the car to see what's actually broken underneath. You can't see a bent rail through a bumper cover.",
    whyItMatters:
      "The first estimate is written off what's visible, and real damage hides inside. A shop that tears down before ordering parts finds the full cost up front instead of surprises later.",
  },
  {
    term: "Supplement",
    plainEnglish:
      "Extra damage found after the repair starts, billed to the insurance company on top of the original estimate. Totally normal — it happens on most jobs.",
    whyItMatters:
      "This is where a lowball first estimate gets fixed. A good shop documents the hidden damage and makes the insurer pay — you should never eat that cost. Estimate looks light? Text me a photo of it, free: (213) 279-2992.",
  },
  {
    term: "OEM parts",
    plainEnglish:
      "Parts made by your car's manufacturer — the same stuff the factory bolted on. OEM stands for \"original equipment manufacturer.\"",
    whyItMatters:
      "Nice to have, but not something a standard policy owes you for free. If you want guaranteed OEM, add an OEM endorsement to your policy — or pay the difference at repair time. Otherwise, quality aftermarket is the norm and usually performs the same.",
  },
  {
    term: "Aftermarket parts",
    plainEnglish:
      "Parts made by a company other than your car's maker. In California they must be at least equal in kind and quality to the original, and many are certified to match.",
    whyItMatters:
      "Don't panic when you see \"A/M\" on your estimate — on most repairs these look, fit, and work just like OEM, and they help keep your premium down. If you specifically want OEM, that's a policy choice (the OEM endorsement), not a knock on the part.",
  },
  {
    term: "LKQ / used parts",
    plainEnglish:
      "\"Like kind and quality\" — a used part pulled from a similar car at a salvage yard. It's a real factory part, just with miles on it.",
    whyItMatters:
      "Often a fair deal on older cars — a used original fender can beat a new copy. But it should match your car's age and condition. A rusty door on a two-year-old car is not \"like kind.\"",
  },
  {
    term: "Blend (paint blending)",
    plainEnglish:
      "Fading new paint into the panels next to the repair so the color matches. Paint one door and stop at the edge, and you'll see the line forever.",
    whyItMatters:
      "Insurers love trimming blend time off estimates. One painted panel on a metallic color with zero blend usually means a visible mismatch — make them pay to do it right.",
  },
  {
    term: "Frame / structural damage",
    plainEnglish:
      "Damage to the car's skeleton, not just its skin. The structure is what protects you in the next crash.",
    whyItMatters:
      "It changes everything: repair cost jumps, resale value drops, and total loss gets closer. Demand measurements and documentation — this is not a \"looks fine to me\" repair.",
  },
  {
    term: "Betterment",
    plainEnglish:
      "When the insurer says the repair made your car BETTER than before — like a new tire replacing a worn one — and charges you the difference.",
    whyItMatters:
      "Legit on wear items like tires and batteries. But some adjusters try it on parts that don't wear out. Betterment on a fender? Push back hard.",
  },
  {
    term: "ACV (actual cash value)",
    plainEnglish:
      "What your exact car was worth the minute before the crash — your year, your miles, your condition. Not what a new one costs, and not your loan balance.",
    whyItMatters:
      "This number decides your total loss check, and the first offer is often soft. Pull listings for the same year, miles, and trim near you and make them match reality.",
  },
  {
    term: "Total loss",
    plainEnglish:
      "The insurer decides fixing the car costs too much compared to what it's worth, so they pay you the car's value instead of repairing it.",
    whyItMatters:
      "In California it's a formula — roughly, repair cost plus what they'd get selling the wreck, weighed against the car's value — not a fixed percentage. Borderline cars can go either way, and that math can be argued. Not sure which side you're on? Text me a photo: (213) 279-2992.",
  },
  {
    term: "Salvage title",
    plainEnglish:
      "The permanent mark on a car's title after it's been totaled. It follows the car forever, even after it's fully repaired.",
    whyItMatters:
      "It cuts resale value hard, and some insurers won't fully cover a salvage car. If you keep your totaled car and buy it back, this is the trade — know it going in.",
  },
  {
    term: "Gap insurance",
    plainEnglish:
      "Coverage that pays the difference between what you still owe on your loan and what the car is actually worth when it's totaled.",
    whyItMatters:
      "Without it you can owe thousands on a car that no longer exists. Totaled and upside down on the loan? Dig through your loan paperwork — gap is sometimes buried in there and people forget they bought it.",
  },
  {
    term: "UM/UIM (uninsured / underinsured motorist)",
    plainEnglish:
      "Your own coverage that steps in when the driver who hit you has no insurance, or not enough. UM is uninsured, UIM is underinsured.",
    whyItMatters:
      "Plenty of LA drivers carry nothing or the bare minimum. It's optional in California, but insurers have to offer it — you only lose it by signing a waiver. Check your policy today, not after the next crash.",
  },
  {
    term: "Comparative negligence",
    plainEnglish:
      "California splits blame by percentage. Even if you were 20% at fault, you can still collect 80% of your damages from the other driver.",
    whyItMatters:
      "Adjusters use fault percentages to shave money off your payout — \"we feel you were 25% at fault\" is a negotiation move, not a verdict. Photos, witnesses, and the police report are how you fight that number.",
  },
  {
    term: "Diminished value",
    plainEnglish:
      "Your car is worth less after a crash even when it's repaired perfectly, because the accident now shows up on its history report.",
    whyItMatters:
      "In California you can usually claim this against the AT-FAULT driver's insurance. It's real money on newer cars, and adjusters almost never bring it up — you have to ask, with documentation.",
  },
  {
    term: "Appraisal clause",
    plainEnglish:
      "A tool buried in most policies for when you and your insurer can't agree on your car's value. Each side hires an appraiser, and a neutral umpire breaks the tie.",
    whyItMatters:
      "It's leverage when the total loss offer is insulting and they won't move. There are costs, so read your policy first — but just mentioning it tells the adjuster you know the playbook.",
  },
  {
    term: "Subrogation",
    plainEnglish:
      "After your insurer pays your claim, they go collect that money back from the at-fault driver's insurance. Their fight, behind the scenes.",
    whyItMatters:
      "This is how your deductible comes home. When subrogation succeeds, you're usually entitled to get your deductible back — follow up and ask, because that refund doesn't always show up on its own.",
  },
];

export default function DecoderPage() {
  return (
    <div id="main" className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
        <Link
          href="/"
          className="inline-block eyebrow text-accent-orange transition-colors hover:text-accent-lime"
        >
          ← Back to yourcrashangel
        </Link>

        <p className="mt-10 eyebrow text-accent-orange">Their language, translated</p>
        <h1 className="mt-4 display text-5xl text-foreground sm:text-6xl md:text-7xl">
          Speak adjuster.
          <br />
          <span className="text-accent-lime">Fluently.</span>
        </h1>
        <p className="mt-4 font-body text-lg leading-relaxed text-muted">
          Adjusters and shops talk in code — and every confusing word is a place
          money can quietly move away from you. Here are the 24 terms
          you&apos;ll actually hear, in the order you&apos;ll hear them, in
          plain English.
        </p>

        <div className="mt-14 divide-y divide-border">
          {TERMS.map((entry, i) => (
            <article key={entry.term} className="py-8">
              <div className="flex items-baseline gap-4">
                <span
                  className="font-mono text-sm text-muted"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="font-display text-xl font-bold text-foreground md:text-2xl">
                  {entry.term}
                </h2>
              </div>
              <p className="mt-3 font-body text-base leading-relaxed text-muted">
                {entry.plainEnglish}
              </p>
              <p className="mt-3 font-body text-sm leading-relaxed text-foreground/85">
                <strong className="eyebrow text-[0.7rem] text-accent-lime">
                  Why it matters:{" "}
                </strong>
                {entry.whyItMatters}
              </p>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 rounded-2xl border border-border bg-surface p-8">
          <h2 className="font-display text-2xl font-bold text-foreground">
            Heard a word that&apos;s not on here?
          </h2>
          <p className="mt-3 font-body text-base text-muted">
            Text me exactly what they said — screenshot, voicemail, estimate
            line, whatever. I&apos;ll translate it and tell you if it&apos;s a
            problem. Free, no strings attached.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href="sms:+12132792992"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-orange px-6 py-3 font-display text-sm font-semibold text-background transition-transform hover:scale-105"
            >
              <MessageIcon className="h-4 w-4" />
              Text: (213) 279-2992
            </a>
            <Link
              href="/playbook"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-border px-6 py-3 font-display text-sm font-semibold text-foreground transition-colors hover:border-foreground/40"
            >
              Next: see their playbook →
            </Link>
          </div>
        </div>

        <div className="mt-12 rounded-xl bg-surface p-6">
          <p className="font-body text-xs leading-relaxed text-muted">
            <strong className="text-muted">Disclaimer:</strong> This page is for
            educational and informational purposes only. It is not legal,
            insurance, financial, or professional advice. Every accident and
            claim is different. For advice specific to your situation, consult a
            licensed attorney, public adjuster, or insurance professional.
          </p>
        </div>

        <p className="mt-8 text-center font-display text-sm text-muted">
          Made by{" "}
          <Link
            href="/"
            className="font-semibold text-accent-orange transition-colors hover:text-accent-lime"
          >
            @yourcrashangel
          </Link>{" "}
          — The Accident Translator
        </p>
      </div>
    </div>
  );
}
