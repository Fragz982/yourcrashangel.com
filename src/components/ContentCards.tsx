"use client";

import ScrollReveal from "./ScrollReveal";
import { PlayIcon, TikTokIcon, InstagramIcon, YouTubeIcon } from "./Icons";

const VIDEOS = [
  {
    title: '"They said it was totaled — was it?"',
    platform: "TikTok",
    icon: TikTokIcon,
    href: "https://tiktok.com/@yourcrashangel",
    color: "from-accent-orange/20 to-accent-orange/5",
  },
  {
    title: '"OEM vs aftermarket — here\'s the truth"',
    platform: "Instagram Reels",
    icon: InstagramIcon,
    href: "https://instagram.com/yourcrashangel",
    color: "from-accent-lime/20 to-accent-lime/5",
  },
  {
    title: '"Your insurer picked the shop? Red flag."',
    platform: "YouTube Shorts",
    icon: YouTubeIcon,
    href: "https://youtube.com/@yourcrashangel",
    color: "from-accent-orange/20 to-accent-orange/5",
  },
];

export default function ContentCards() {
  return (
    <section id="content" className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <ScrollReveal>
          <p className="eyebrow text-accent-orange">Watch &amp; learn</p>
          <h2 className="mt-4 display text-4xl text-foreground sm:text-5xl md:text-6xl">
            Straight talk on video.
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
            Short, real breakdowns of the stuff shops and insurers don&apos;t
            want you to know.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-3 md:gap-6">
          {VIDEOS.map((video, i) => (
            <ScrollReveal key={video.platform} delay={i * 0.1}>
              <a
                href={video.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex min-h-[19rem] flex-col items-center justify-center overflow-hidden rounded-[var(--radius-card)] bg-surface shadow-[var(--shadow-card)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] sm:aspect-[4/5] sm:min-h-0"
              >
                {/* A faint accent wash on hover; the card itself stays white. */}
                <div
                  className={`absolute inset-0 bg-gradient-to-b ${video.color} opacity-0 transition-opacity duration-300 group-hover:opacity-40`}
                />

                <div className="relative z-10 flex flex-col items-center gap-4 px-6 pt-8 pb-16 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-orange text-white shadow-[0_1px_2px_rgb(33_26_20/0.10),0_10px_24px_-10px_rgb(180_66_26/0.55)] transition-[transform,background-color] duration-300 group-hover:scale-105 group-hover:bg-accent-lime">
                    <PlayIcon className="h-6 w-6 translate-x-0.5" />
                  </div>
                  <p className="text-lg font-bold leading-snug tracking-[-0.02em] text-foreground md:text-xl">
                    {video.title}
                  </p>
                  <div className="spec-chip">
                    <video.icon className="h-4 w-4 text-foreground" />
                    <span className="text-sm">{video.platform}</span>
                  </div>
                </div>

                <div className="eyebrow absolute bottom-6 text-muted transition-colors group-hover:text-accent-orange">
                  Watch now →
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
