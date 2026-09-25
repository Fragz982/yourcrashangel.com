import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { MessageIcon } from "../../components/Icons";

export const metadata: Metadata = {
  title: "Insurance Jargon Decoder | yourcrashangel",
  description:
    "ACV, supplement, betterment, DRP, diminished value — 25 collision and insurance terms translated into plain English by a real LA collision estimator, with the money angle on every one.",
  alternates: { canonical: "/decoder" },
};

type Term = {
  term: string;
  slug: string;
  heard?: string;
  plainEnglish: string;
  whyItMatters: string;
};

const TERMS: Term[] = [
  {
    term: "Claim number",
    slug: "claim-number",
    plainEnglish:
      "The ID number your insurance company stamps on your accident the moment you report it. Every call, email, and check ties back to this one number.",
    whyItMatters:
      "Nothing moves without it. Save it in your phone the second you get it — call without it and you start from zero with a stranger every time.",
  },
  {
    term: "Adjuster",
    slug: "adjuster",
    plainEnglish:
      "The insurance company employee assigned to your claim. They decide what gets paid, how much, and how fast.",
    whyItMatters:
      "They are polite, but they work for the insurance company, not you. Their job is to close your claim cheap and quick — be nice, take notes, and never treat the first number as final.",
  },
  {
    term: "First-party vs third-party claim",
    slug: "first-party-vs-third-party-claim",
    plainEnglish:
      "First-party means you file with YOUR insurance company. Third-party means you file with the OTHER driver's insurance because their driver hit you.",
    whyItMatters:
      "Different rules. You have a duty to cooperate with your own insurer, but you do not owe the other driver's insurer a recorded statement. In California, things like diminished value are usually third-party claims.",
  },
  {
    term: "Deductible",
    slug: "deductible",
    plainEnglish:
      "Your share of the repair bill when you use your own insurance. Repairs cost $5,000, your deductible is $500 — insurance pays $4,500, you pay $500.",
    whyItMatters:
      "If the other driver was at fault, going through THEIR insurance usually means no deductible at all. Go through yours and you can often get it back later when your insurer collects from the other side.",
  },
  {
    term: "Rental reimbursement",
    slug: "rental-reimbursement",
    plainEnglish:
      "Optional coverage on your own policy that pays for a rental car while yours is in the shop. Usually a daily dollar limit and a max number of days.",
    whyItMatters:
      "If the other driver was at fault, their insurance should cover your rental once they accept fault — don't burn your own coverage if you don't have to. Either way, know the daily limit before you grab the SUV at the counter.",
  },
  {
    term: "Steering",
    slug: "steering",
    plainEnglish:
      "When an insurer points you to one of their network shops — \"we can get you right in at our place.\" Recommending is normal and legal; flat-out telling you that you have no other choice is not.",
    whyItMatters:
      "Take the recommendation seriously — network shops are vetted and usually guarantee the work, so it's often a good option. Just know the final call is yours: in California you can use any licensed shop you trust. Recommended or your own pick, both are valid.",
  },
  {
    term: "DRP (direct repair program)",
    slug: "drp",
    heard: "we're a DRP shop",
    plainEnglish:
      "A partnership between a body shop and an insurer: the shop meets the insurer's standards and pricing, and in return gets steady referrals.",
    whyItMatters:
      "For you, a DRP shop usually means a faster start, less paperwork to chase, and a repair warranty. Plenty of DRP shops do excellent work — it's a convenient, legitimate option. Just pick one with a solid reputation, same as you would any shop.",
  },
  {
    term: "Teardown",
    slug: "teardown",
    heard: "we need a teardown authorization",
    plainEnglish:
      "Taking the damaged parts off the car to see what's actually broken underneath. You can't see a bent rail through a bumper cover.",
    whyItMatters:
      "The first estimate is written off what's visible, and real damage hides inside. A shop that tears down before ordering parts finds the full cost up front instead of surprises later. A \"teardown authorization\" is the shop asking your OK to take it apart. Ask if there's a charge if the car ends up totaled or you move it.",
  },
  {
    term: "Supplement",
    slug: "supplement",
    heard: "the supplement is still pending",
    plainEnglish:
      "Extra damage found after the repair starts, billed to the insurance company on top of the original estimate. Totally normal — it happens on most jobs.",
    whyItMatters:
      "This is where a lowball first estimate gets fixed. A good shop documents the hidden damage and makes the insurer pay — you should never eat that cost. Estimate looks light? Text me a photo of it, free: (213) 279-2992.",
  },
  {
    term: "OEM parts",
    slug: "oem-parts",
    plainEnglish:
      "Parts made by your car's manufacturer — the same stuff the factory bolted on. OEM stands for \"original equipment manufacturer.\"",
    whyItMatters:
      "Nice to have, but not something a standard policy owes you for free. If you want guaranteed OEM, add an OEM endorsement to your policy — or pay the difference at repair time. Otherwise, quality aftermarket is the norm and usually performs the same.",
  },
  {
    term: "Aftermarket parts",
    slug: "aftermarket-parts",
    plainEnglish:
      "Parts made by a company other than your car's maker. In California they must be at least equal in kind and quality to the original, and many are certified to match.",
    whyItMatters:
      "Don't panic when you see \"A/M\" on your estimate — on most repairs these look, fit, and work just like OEM, and they help keep your premium down. If you specifically want OEM, that's a policy choice (the OEM endorsement), not a knock on the part.",
  },
  {
    term: "LKQ / used parts",
    slug: "lkq",
    heard: "we're going LKQ on the door",
    plainEnglish:
      "\"Like kind and quality\" — a used part pulled from a similar car at a salvage yard. It's a real factory part, just with miles on it.",
    whyItMatters:
      "Often a fair deal on older cars — a used original fender can beat a new copy. But it should match your car's age and condition. A rusty door on a two-year-old car is not \"like kind.\"",
  },
  {
    term: "Blend (paint blending)",
    slug: "blend",
    plainEnglish:
      "Fading new paint into the panels next to the repair so the color matches. Paint one door and stop at the edge, and you'll see the line forever.",
    whyItMatters:
      "Insurers love trimming blend time off estimates. One painted panel on a metallic color with zero blend usually means a visible mismatch — make them pay to do it right.",
  },
  {
    term: "Frame / structural damage",
    slug: "frame-structural-damage",
    plainEnglish:
      "Damage to the car's skeleton, not just its skin. The structure is what protects you in the next crash.",
    whyItMatters:
      "It changes everything: repair cost jumps, resale value drops, and total loss gets closer. Demand measurements and documentation — this is not a \"looks fine to me\" repair.",
  },
  {
    term: "OEM repair procedures",
    slug: "oem-procedures",
    heard: "per OEM procedures",
    plainEnglish:
      "The repair steps written by the company that built your car. They spell out how your exact model should be fixed and checked.",
    whyItMatters:
      "Today's cars are full of sensors, cameras, and special steel. Following the maker's steps is how the car comes back working the way it was built. It's a fair question for any shop: do you follow the OEM procedures on my car?",
  },
  {
    term: "Betterment",
    slug: "betterment",
    heard: "there's a betterment on the tires",
    plainEnglish:
      "When the insurer says the repair made your car BETTER than before — like a new tire replacing a worn one — and charges you the difference.",
    whyItMatters:
      "Legit on wear items like tires and batteries. But some adjusters try it on parts that don't wear out. Betterment on a fender? Push back hard.",
  },
  {
    term: "ACV (actual cash value)",
    slug: "acv",
    heard: "it's based on the ACV",
    plainEnglish:
      "What your exact car was worth the minute before the crash — your year, your miles, your condition. Not what a new one costs, and not your loan balance.",
    whyItMatters:
      "This number decides your total loss check, and the first offer is often soft. Pull listings for the same year, miles, and trim near you and make them match reality.",
  },
  {
    term: "Total loss",
    slug: "total-loss",
    heard: "it might be over the threshold",
    plainEnglish:
      "The insurer decides fixing the car costs too much compared to what it's worth, so they pay you the car's value instead of repairing it.",
    whyItMatters:
      "In California it's a formula — roughly, repair cost plus what they'd get selling the wreck, weighed against the car's value — not a fixed percentage. Borderline cars can go either way, and that math can be argued. Not sure which side you're on? Text me a photo: (213) 279-2992.",
  },
  {
    term: "Salvage title",
    slug: "salvage-title",
    plainEnglish:
      "The permanent mark on a car's title after it's been totaled. It follows the car forever, even after it's fully repaired.",
    whyItMatters:
      "It cuts resale value hard, and some insurers won't fully cover a salvage car. If you keep your totaled car and buy it back, this is the trade — know it going in.",
  },
  {
    term: "Gap insurance",
    slug: "gap-insurance",
    plainEnglish:
      "Coverage that pays the difference between what you still owe on your loan and what the car is actually worth when it's totaled.",
    whyItMatters:
      "Without it you can owe thousands on a car that no longer exists. Totaled and upside down on the loan? Dig through your loan paperwork — gap is sometimes buried in there and people forget they bought it.",
  },
  {
    term: "UM/UIM (uninsured / underinsured motorist)",
    slug: "um-uim",
    plainEnglish:
      "Your own coverage that steps in when the driver who hit you has no insurance, or not enough. UM is uninsured, UIM is underinsured.",
    whyItMatters:
      "Plenty of LA drivers carry nothing or the bare minimum. It's optional in California, but insurers have to offer it — you only lose it by signing a waiver. Check your policy today, not after the next crash.",
  },
  {
    term: "Comparative negligence",
    slug: "comparative-negligence",
    plainEnglish:
      "California splits blame by percentage. Even if you were 20% at fault, you can still collect 80% of your damages from the other driver.",
    whyItMatters:
      "Adjusters use fault percentages to shave money off your payout — \"we feel you were 25% at fault\" is a negotiation move, not a verdict. Photos, witnesses, and the police report are how you fight that number.",
  },
  {
    term: "Diminished value",
    slug: "diminished-value",
    heard: "that would be diminished value",
    plainEnglish:
      "Your car is worth less after a crash even when it's repaired perfectly, because the accident now shows up on its history report.",
    whyItMatters:
      "In California you can usually claim this against the AT-FAULT driver's insurance. It's real money on newer cars, and adjusters almost never bring it up — you have to ask, with documentation.",
  },
  {
    term: "Appraisal clause",
    slug: "appraisal-clause",
    plainEnglish:
      "A tool buried in most policies for when you and your insurer can't agree on your car's value. Each side hires an appraiser, and a neutral umpire breaks the tie.",
    whyItMatters:
      "It's leverage when the total loss offer is insulting and they won't move. There are costs, so read your policy first — but just mentioning it tells the adjuster you know the playbook.",
  },
  {
    term: "Subrogation",
    slug: "subrogation",
    plainEnglish:
      "After your insurer pays your claim, they go collect that money back from the at-fault driver's insurance. Their fight, behind the scenes.",
    whyItMatters:
      "This is how your deductible comes home. When subrogation succeeds, you're usually entitled to get your deductible back — follow up and ask, because that refund doesn't always show up on its own.",
  },
];

// Where a repair actually waits, and four things people hear that aren't
// quite true. Both came over from the old /translator scroll page.
const STAGES = [
  {
    title: "Tow & check-in",
    what: "The car arrives, gets photographed and logged, and a first estimate is written from what's visible.",
    stalls: "the car sits at a tow yard before it reaches a shop.",
  },
  {
    title: "Teardown",
    what: "The damaged area comes apart. This is where the real repair list gets written.",
    stalls: "hidden damage means the plan has to change.",
  },
  {
    title: "Supplement",
    what: "The new findings are documented, priced, and sent for review.",
    stalls: "the new findings need a sign-off before work continues. Nothing moves until everyone agrees on the same plan.",
  },
  {
    title: "Body & paint",
    what: "Parts come in, metal gets straightened, panels get painted to match.",
    stalls: "a part is on backorder, which means nobody has one to ship yet.",
  },
  {
    title: "Pickup",
    what: "Everything goes back together, the electronics get checked, the car gets cleaned and returned.",
    stalls: "the final check finds something that needs another pass.",
  },
];

const MYTHS = [
  {
    heard: "A supplement means something went wrong.",
    truth: "It means the teardown did its job. Finding hidden damage is the point.",
  },
  {
    heard: "More days in the shop means worse work.",
    truth: "Days in the shop are not days on the car. The calendar fills with waiting for parts and sign-offs.",
  },
  {
    heard: "A totaled car was beyond fixing.",
    truth: "Total loss is math. The cost to fix, measured against what the car is worth. It is a number, not a verdict on the car.",
  },
  {
    heard: "Asking questions slows things down.",
    truth: "Questions don't slow a repair. Parts and paperwork do. Ask.",
  },
];

// One pill language for the whole site (matches the navbar and the flight):
// the orange primary and the white hairline secondary, 48px tall.
const primaryBtn =
  "inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent-orange px-6 text-[0.95rem] font-bold text-white shadow-[0_1px_2px_rgb(33_26_20/0.10),0_8px_20px_-10px_rgb(33_26_20/0.35)] transition-[background-color,transform] hover:bg-accent-lime active:scale-[0.97]";
const secondaryBtn =
  "inline-flex h-12 items-center justify-center gap-2 rounded-full bg-surface px-6 text-[0.95rem] font-bold text-foreground shadow-[inset_0_0_0_1px_var(--color-border)] transition-[background-color,transform] hover:bg-surface-light active:scale-[0.97]";

export default function DecoderPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-5 pt-28 pb-16 md:px-8 md:pt-36 md:pb-24">
        <Link
          href="/"
          className="-ml-1 inline-flex min-h-11 items-center rounded-full px-1 eyebrow text-accent-orange transition-colors hover:text-accent-lime"
        >
          ← Back to yourcrashangel
        </Link>

        <p className="mt-6 eyebrow text-accent-orange">Their language, translated</p>
        <h1 className="mt-4 display text-5xl text-foreground sm:text-6xl md:text-7xl">
          Speak adjuster.
          <br />
          <span className="text-accent-lime">Fluently.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
          Adjusters and shops talk in code — and every confusing word is a place
          money can quietly move away from you. Here are the 25 terms
          you&apos;ll actually hear, in the order you&apos;ll hear them, in
          plain English.
        </p>

        <div className="mt-12 grid gap-4 md:mt-14 md:grid-cols-2 md:gap-5">
          {TERMS.map((entry, i) => (
            <article
              key={entry.term}
              id={entry.slug}
              className="scroll-mt-28 md:last:odd:col-span-2 md:last:odd:mx-auto md:last:odd:w-[calc(50%-0.625rem)] flex flex-col rounded-[var(--radius-card)] bg-surface p-5 shadow-[var(--shadow-card)] sm:p-6 md:p-7"
            >
              <div className="flex items-start gap-3">
                <span
                  className="mt-0.5 grid h-8 min-w-8 shrink-0 place-items-center rounded-full bg-accent-soft px-2 text-[0.8rem] font-extrabold tabular-nums text-accent-orange"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="text-xl font-extrabold leading-snug tracking-[-0.02em] text-foreground md:text-[1.35rem]">
                  {entry.term}
                </h2>
              </div>
              {entry.heard && (
                <p className="mt-3 text-[0.95rem] italic text-foreground/80">
                  <span className="sr-only">How you&apos;ll hear it: </span>
                  &ldquo;{entry.heard}&rdquo;
                </p>
              )}
              <p className="mt-3 text-base leading-relaxed text-muted">
                {entry.plainEnglish}
              </p>
              <div className="mt-auto pt-4">
                <p className="rounded-[var(--radius-inner)] bg-surface-light p-4 text-sm leading-relaxed text-foreground">
                  <strong className="eyebrow text-accent-lime">
                    Why it matters:{" "}
                  </strong>
                  {entry.whyItMatters}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* How a repair moves, and where it waits */}
        <section className="mt-16 md:mt-24" aria-labelledby="stages-h">
          <p className="eyebrow text-accent-orange">What actually happens to your car</p>
          <h2
            id="stages-h"
            className="mt-3 display text-4xl text-foreground md:text-5xl"
          >
            Where a repair slows down.
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            Five stages. A repair walks them in this order. A total loss drops
            out early, sometimes at the first look and sometimes after teardown
            finds more damage. Most of the waiting happens in the middle.
          </p>
          <ol className="mt-8 grid gap-3 sm:grid-cols-2 md:mt-10 lg:grid-cols-5">
            {STAGES.map((stage, i) => (
              <li
                key={stage.title}
                className="sm:last:col-span-2 lg:last:col-span-1 flex flex-col rounded-[var(--radius-card)] bg-surface p-5 shadow-[var(--shadow-card)]"
              >
                <span
                  className="grid h-8 w-8 place-items-center rounded-full bg-accent-soft text-[0.8rem] font-extrabold tabular-nums text-accent-orange"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg font-extrabold leading-snug tracking-[-0.02em] text-foreground">
                  {stage.title}
                </h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                  {stage.what}
                </p>
                <div className="mt-auto pt-4">
                  <p className="rounded-[var(--radius-inner)] bg-surface-light p-3 text-sm leading-relaxed text-foreground">
                    <strong className="font-bold text-accent-lime">Stalls when</strong>{" "}
                    {stage.stalls}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Heard vs. true */}
        <section className="mt-16 md:mt-24" aria-labelledby="myths-h">
          <p className="eyebrow text-accent-orange">Heard and true</p>
          <h2
            id="myths-h"
            className="mt-3 display text-4xl text-foreground md:text-5xl"
          >
            What you heard vs. what&apos;s true.
          </h2>
          <ul className="mt-8 grid gap-4 md:mt-10 md:grid-cols-2 md:gap-5">
            {MYTHS.map((m) => (
              <li
                key={m.heard}
                className="rounded-[var(--radius-card)] bg-surface p-5 shadow-[var(--shadow-card)] sm:p-6"
              >
                <p className="text-[0.95rem] leading-relaxed text-muted">
                  <span className="eyebrow mr-2">Heard</span>
                  &ldquo;{m.heard}&rdquo;
                </p>
                <p className="mt-3 text-base font-semibold leading-relaxed text-foreground">
                  <span className="eyebrow mr-2 text-accent-orange">True</span>
                  {m.truth}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* CTA */}
        <div className="mt-12 rounded-[var(--radius-card)] bg-surface p-6 shadow-[var(--shadow-lift)] sm:p-8 md:flex md:items-center md:justify-between md:gap-10 md:p-10">
          <div className="max-w-xl">
            <h2 className="text-2xl font-extrabold tracking-[-0.03em] text-foreground md:text-3xl">
              Heard a word that&apos;s not on here?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted md:text-lg">
              Text me exactly what they said — screenshot, voicemail, estimate
              line, whatever. I&apos;ll translate it and tell you if it&apos;s a
              problem. Free, no strings attached.
            </p>
          </div>
          <div className="mt-7 flex shrink-0 flex-col gap-3 sm:flex-row md:mt-0 md:flex-col">
            <a
              href="sms:+12132792992"
              className={primaryBtn}
            >
              <MessageIcon className="h-4 w-4" />
              Text: (213) 279-2992
            </a>
            <Link
              href="/playbook"
              className={secondaryBtn}
            >
              Next: see their playbook →
            </Link>
          </div>
        </div>

        <div className="mt-10 rounded-[var(--radius-card)] bg-surface p-6 shadow-[inset_0_0_0_1px_var(--color-border)]">
          <p className="text-xs leading-relaxed text-muted">
            <strong className="text-foreground">Disclaimer:</strong> This page is for
            educational and informational purposes only. It is not legal,
            insurance, financial, or professional advice. Every accident and
            claim is different. For advice specific to your situation, consult a
            licensed attorney, public adjuster, or insurance professional.
          </p>
        </div>

        <p className="mt-8 text-center text-sm text-muted">
          Made by{" "}
          <Link
            href="/"
            className="font-bold text-accent-orange transition-colors hover:text-accent-lime"
          >
            @yourcrashangel
          </Link>{" "}
          — The Accident Translator
        </p>
      </div>
      </main>
      <Footer />
    </>
  );
}
