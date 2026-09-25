"use client";

import { useEffect, useRef, useState } from "react";
import ScrollReveal from "./ScrollReveal";
import BeforeAfter from "./BeforeAfter";
import { XIcon } from "./Icons";

// "Real cars. Real repairs." — one compact section: the drag-to-compare
// slider up top, then one bubble per job. Tapping a bubble opens that car's
// story (came in -> in progress -> driven off) right under the bubbles, so
// the page shows one car at a time instead of a long list. Every story is in
// the HTML (just hidden), so search engines still read all seven; the photos
// are lazy, so a hidden story downloads nothing.
//
// Real jobs Angel has worked, with the real bill when there is one. Photos
// live in public/work/real-repairs/, bubble thumbnails in thumbs/ (160px
// crops of the check-in photo). The whole section hides while JOBS is empty.
//
// Example shape (fill in when photos + bills are ready):
//   {
//     id: "job1",
//     vehicle: "2021 Honda Civic",
//     short: "Civic",
//     note: "Rear-ended on the 405 — bumper, quarter panel, and a hidden rail.",
//     bill: "$4,200",
//     images: {
//       checkin: "/work/real-repairs/job1-checkin.jpg",
//       during: "/work/real-repairs/job1-during.jpg",
//       after: "/work/real-repairs/job1-after.jpg",
//     },
//   },
type Job = {
  id: string;
  vehicle: string;
  /** Bubble label; the full name shows when the job is open. */
  short: string;
  note: string;
  bill?: string;
  images: { checkin: string; during: string; after: string };
};

const JOBS: Job[] = [
  {
    id: "job1",
    vehicle: "Volkswagen Jetta",
    short: "Jetta",
    note: "Right front corner took the hit — hood buckled, headlamp smashed, bumper torn. Same corner rebuilt, refinished, and rolled out factory-fresh.",
    images: {
      checkin: "/work/real-repairs/job1-checkin.jpg",
      during: "/work/real-repairs/job1-during.jpg",
      after: "/work/real-repairs/job1-after.jpg",
    },
  },
  {
    id: "job3",
    vehicle: "Audi A5 Sportback",
    short: "Audi A5",
    note: "Cracked headlight and a crumpled right-front corner came in — rolled back out gleaming like the day it left the showroom.",
    images: {
      checkin: "/work/real-repairs/job3-checkin.jpg",
      during: "/work/real-repairs/job3-during.jpg",
      after: "/work/real-repairs/job3-after.jpg",
    },
  },
  {
    id: "job2",
    vehicle: "Honda Accord Hybrid",
    short: "Accord",
    note: "Rear end crunched in a collision. Rebuilt panel by panel — same rear view going out clean as it came in wrecked.",
    images: {
      checkin: "/work/real-repairs/job2-checkin.jpg",
      during: "/work/real-repairs/job2-during.jpg",
      after: "/work/real-repairs/job2-after.jpg",
    },
  },
  {
    id: "job4",
    vehicle: "Toyota Camry",
    short: "Camry",
    note: "Right front crushed — fender folded into the door, hood shoved back. Straightened and rebuilt to flawless paint and panel gaps.",
    images: {
      checkin: "/work/real-repairs/job4-checkin.jpg",
      during: "/work/real-repairs/job4-during.jpg",
      after: "/work/real-repairs/job4-after.jpg",
    },
  },
  {
    id: "job5",
    vehicle: "Kia Forte",
    short: "Forte",
    note: "Whole driver side and rear caved in. Every panel rebuilt until it looked factory-fresh.",
    images: {
      checkin: "/work/real-repairs/job5-checkin.jpg",
      during: "/work/real-repairs/job5-during.jpg",
      after: "/work/real-repairs/job5-after.jpg",
    },
  },
  {
    id: "job7",
    vehicle: "Toyota RAV4 Hybrid",
    short: "RAV4",
    note: "Passenger side and front end scraped and crunched. Torn down, repaired, and sent back out good as new.",
    images: {
      checkin: "/work/real-repairs/job7-checkin.jpg",
      during: "/work/real-repairs/job7-during.jpg",
      after: "/work/real-repairs/job7-after.jpg",
    },
  },
  {
    id: "job6",
    vehicle: "Hyundai Elantra",
    short: "Elantra",
    note: "Badly creased driver-side fender and door. Sent back out straight, clean, and driving like new.",
    images: {
      checkin: "/work/real-repairs/job6-checkin.jpg",
      during: "/work/real-repairs/job6-during.jpg",
      after: "/work/real-repairs/job6-after.jpg",
    },
  },
];

const STAGES: { key: keyof Job["images"]; label: string }[] = [
  { key: "checkin", label: "Came in" },
  { key: "during", label: "In progress" },
  { key: "after", label: "Driven off" },
];

export default function RealRepairs() {
  const [openId, setOpenId] = useState<string | null>(null);
  const panelRefs = useRef<Record<string, HTMLElement | null>>({});
  const headingRefs = useRef<Record<string, HTMLHeadingElement | null>>({});
  const bubbleRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  // Set when "Next car" is pressed: the pressed button hides with its story,
  // so focus moves to the new car's name instead of falling to the page.
  const focusNewStory = useRef(false);

  // Keep the opened story on screen, moving the page only as far as needed.
  // If its top is already up under the navbar (a tall story on a short phone,
  // after "Next car"), bring its name back into view instead.
  useEffect(() => {
    const el = openId ? panelRefs.current[openId] : null;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const block = el.getBoundingClientRect().top < 72 ? "start" : "nearest";
    el.scrollIntoView({ block, behavior: reduce ? "auto" : "smooth" });
    if (focusNewStory.current) {
      focusNewStory.current = false;
      headingRefs.current[openId!]?.focus({ preventScroll: true });
    }
  }, [openId]);

  if (JOBS.length === 0) return null;

  const close = () => {
    const id = openId;
    setOpenId(null);
    if (!id) return;
    // After the story folds away the page is shorter, and on a phone the
    // bubbles can end up under the navbar. Bring them back into view.
    requestAnimationFrame(() => {
      bubbleRefs.current[id]?.focus({ preventScroll: true });
      document.getElementById("more-repairs")?.scrollIntoView({ block: "nearest" });
    });
  };

  return (
    <section id="real-repairs" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-14">
          <ScrollReveal>
            <p className="eyebrow text-accent-orange">Before &amp; after</p>
            <h2 className="mt-4 display text-4xl text-foreground sm:text-5xl md:text-6xl">
              Real cars.
              <br />
              <span className="text-accent-lime">Real repairs.</span>
            </h2>
            <p className="mt-5 max-w-xl font-body text-lg leading-relaxed text-muted lg:max-w-md">
              Jobs I personally estimated at the shop where I work — from the
              moment they rolled in to the day they drove off. No stock photos.
            </p>
            <p className="mt-3 max-w-xl font-body text-base leading-relaxed text-muted lg:max-w-md">
              Drag the photo: a real car from a real job, same corner, before
              and after. Clean panel gaps, proper paint blend, like the hit
              never happened.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div id="before-after">
              <BeforeAfter />
            </div>
          </ScrollReveal>
        </div>

        {/* One bubble per job. Tap to open it; tap again (or Close) to fold it away. */}
        <div className="mt-10 md:mt-14">
          <p id="more-repairs" className="eyebrow text-muted">
            More real repairs · tap a car
          </p>
          <ul
            aria-labelledby="more-repairs"
            className="mt-4 flex flex-wrap gap-2 sm:gap-2.5"
          >
            {JOBS.map((job) => {
              const isOpen = job.id === openId;
              return (
                <li key={job.id}>
                  <button
                    type="button"
                    ref={(el) => {
                      bubbleRefs.current[job.id] = el;
                    }}
                    onClick={() => setOpenId(isOpen ? null : job.id)}
                    aria-expanded={isOpen}
                    aria-controls={`repair-${job.id}`}
                    aria-label={`${job.vehicle} — ${isOpen ? "hide" : "see"} the repair`}
                    className={`inline-flex h-12 items-center gap-2.5 whitespace-nowrap rounded-full py-1.5 pl-1.5 pr-4 text-[0.95rem] font-bold transition-[background-color,color,box-shadow,transform] active:scale-[0.97] ${
                      isOpen
                        ? "bg-accent-orange text-white shadow-[0_1px_2px_rgb(33_26_20/0.10),0_8px_20px_-10px_rgb(33_26_20/0.35)]"
                        : "bg-surface text-foreground shadow-[inset_0_0_0_1px_var(--color-border),var(--shadow-card)] hover:bg-surface-light"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/work/real-repairs/thumbs/${job.id}.webp`}
                      alt=""
                      width={36}
                      height={36}
                      className="h-9 w-9 rounded-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    {job.short}
                  </button>
                </li>
              );
            })}
          </ul>

          {JOBS.map((job, i) => {
            const next = JOBS[(i + 1) % JOBS.length];
            return (
              <article
                key={job.id}
                id={`repair-${job.id}`}
                ref={(el) => {
                  panelRefs.current[job.id] = el;
                }}
                hidden={job.id !== openId}
                aria-label={`${job.vehicle} repair`}
                className="mt-5 scroll-mb-24 animate-fade-rise rounded-[var(--radius-card)] bg-surface p-5 shadow-[var(--shadow-card)] md:p-7"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
                    <h3
                      ref={(el) => {
                        headingRefs.current[job.id] = el;
                      }}
                      tabIndex={-1}
                      className="display text-2xl text-foreground outline-none md:text-3xl"
                    >
                      {job.vehicle}
                    </h3>
                    {job.bill && (
                      <span className="inline-flex items-center rounded-full bg-accent-soft px-3 py-1.5 font-display text-xs font-bold leading-none text-accent-lime">
                        Final bill {job.bill}
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={close}
                    aria-label={`Close ${job.vehicle}`}
                    className="-mr-1 -mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-light hover:text-foreground"
                  >
                    <XIcon className="h-5 w-5" />
                  </button>
                </div>
                <p className="mt-2 max-w-2xl font-body text-base leading-relaxed text-muted">
                  {job.note}
                </p>

                {/* Phone: "came in" and "in progress" side by side, and the
                    finished car full width underneath, so the payoff is the
                    biggest photo and nothing hides off-screen.
                    Wider screens: the three stages in a row. */}
                <div className="mt-5 grid grid-cols-2 gap-x-2.5 gap-y-4 sm:grid-cols-3 sm:gap-3 md:mt-6 md:gap-4">
                  {STAGES.map((stage) => (
                    <figure
                      key={stage.key}
                      className={stage.key === "after" ? "col-span-2 sm:col-span-1" : undefined}
                    >
                      <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-inner)] bg-surface-light">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={job.images[stage.key]}
                          alt={`${job.vehicle} — ${stage.label}`}
                          className="h-full w-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <figcaption
                        className={`mt-2.5 flex items-center gap-2 font-display text-xs font-bold uppercase tracking-[0.12em] ${
                          stage.key === "after" ? "text-accent-orange" : "text-muted"
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className={`h-1.5 w-1.5 rounded-full ${
                            stage.key === "after" ? "bg-accent-orange" : "bg-muted/40"
                          }`}
                        />
                        {stage.label}
                      </figcaption>
                    </figure>
                  ))}
                </div>

                {next.id !== job.id && (
                  <div className="mt-5 flex justify-end border-t border-border pt-4 md:mt-6">
                    <button
                      type="button"
                      onClick={() => {
                        focusNewStory.current = true;
                        setOpenId(next.id);
                      }}
                      className="inline-flex h-11 items-center gap-2 rounded-full bg-surface-light px-5 text-sm font-bold text-foreground transition-colors hover:bg-border"
                    >
                      Next car: {next.short} <span aria-hidden="true">→</span>
                    </button>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
