"use client";

import ScrollReveal from "./ScrollReveal";

// Real jobs Angel has worked — check-in -> in-progress -> after, with the real
// bill. Populate this array once the photos land in public/work/real-repairs/.
// The whole section stays hidden while it's empty, so nothing ships looking bare.
//
// Example shape (fill in when photos + bills are ready):
//   {
//     id: "job1",
//     vehicle: "2021 Honda Civic",
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
  note: string;
  bill?: string;
  images: { checkin: string; during: string; after: string };
};

const JOBS: Job[] = [];

const STAGES: { key: keyof Job["images"]; label: string }[] = [
  { key: "checkin", label: "Came in" },
  { key: "during", label: "In progress" },
  { key: "after", label: "Driven off" },
];

export default function RealRepairs() {
  if (JOBS.length === 0) return null;

  return (
    <section id="real-repairs" className="bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <ScrollReveal>
          <p className="eyebrow text-accent-orange">Real work</p>
          <h2 className="mt-4 display text-5xl text-foreground sm:text-6xl md:text-7xl">
            Real cars.
            <br />
            <span className="text-accent-lime">Real repairs.</span>
          </h2>
          <p className="mt-4 max-w-xl font-body text-lg text-muted">
            Actual jobs — from the moment they rolled in to the day they drove
            off. No stock photos.
          </p>
        </ScrollReveal>

        <div className="mt-14 flex flex-col gap-12">
          {JOBS.map((job, i) => (
            <ScrollReveal key={job.id} delay={i * 0.05}>
              <div className="rounded-3xl border border-border bg-background p-6 md:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="display text-2xl text-foreground md:text-3xl">
                    {job.vehicle}
                  </h3>
                  {job.bill && (
                    <span className="spec-chip border-accent-lime/40 text-accent-lime">
                      Final bill {job.bill}
                    </span>
                  )}
                </div>
                <p className="mt-2 max-w-2xl font-body text-base text-muted">
                  {job.note}
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {STAGES.map((stage) => (
                    <figure key={stage.key} className="overflow-hidden rounded-2xl">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={job.images[stage.key]}
                          alt={`${job.vehicle} — ${stage.label}`}
                          className="h-full w-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <figcaption className="mt-2 font-mono text-xs uppercase tracking-wider text-muted">
                        {stage.label}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
