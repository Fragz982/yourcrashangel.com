"use client";

import ScrollReveal from "./ScrollReveal";

const REVIEWS = [
  {
    name: "Joe R.",
    text: "This was my closest shop that was a Geico authorized shop. To my surprise it was the best and you can tell as soon as you walk in. There is a sense of pride and professionalism that extends from the office and into the work done on the vehicle. My car looks better than when I got it originally and it feels as safe as it did then.",
    rating: 5,
    source: "Google",
  },
  {
    name: "Rosa C.",
    text: "This shop is amazing, best customer service, very nice and polite people and great work! I was involved in a minor accident and needed my car repaired. I brought it here and they left the damaged part like new. I'm so glad I brought it here — it was a great experience. 100% recommend!",
    rating: 5,
    source: "Google",
  },
  {
    name: "Kelly W.",
    text: "I've been here twice for repairs to my vehicle and the staff has been amazing both times. Great communication, very friendly, and I was extremely happy with the work that was done.",
    rating: 5,
    source: "Google",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          className="h-4 w-4 text-accent-orange"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" className="bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <ScrollReveal>
          <p className="eyebrow text-accent-orange">Real people, real stories</p>
          <h2 className="mt-4 display text-5xl text-foreground sm:text-6xl md:text-7xl">
            Don&apos;t take my word for it.
          </h2>
          <p className="mt-4 max-w-xl font-body text-base text-muted">
            Straight from Google: reviews of the LA shop where I write
            estimates every day — the same work you see in the gallery above.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {REVIEWS.map((review, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="flex h-full flex-col rounded-2xl border border-border bg-background p-8">
                <Stars count={review.rating} />
                <blockquote className="mt-4 flex-1 font-body text-base leading-relaxed text-muted italic">
                  &ldquo;{review.text}&rdquo;
                </blockquote>
                <p className="mt-6 font-display text-sm font-semibold text-foreground">
                  — {review.name}
                </p>
                <p className="mt-1 font-body text-xs text-muted">
                  via {review.source}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
