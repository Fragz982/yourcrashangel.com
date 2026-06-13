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
    color: "from-purple-500/20 to-purple-500/5",
  },
];

export default function ContentCards() {
  return (
    <section id="content" className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <ScrollReveal>
          <p className="eyebrow text-accent-orange">Watch &amp; learn</p>
          <h2 className="mt-4 display text-5xl text-foreground sm:text-6xl md:text-7xl">
            Straight talk on video.
          </h2>
          <p className="mt-4 max-w-xl font-body text-lg text-muted">
            Short, real breakdowns of the stuff shops and insurers don&apos;t
            want you to know.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {VIDEOS.map((video, i) => (
            <ScrollReveal key={video.platform} delay={i * 0.1}>
              <a
                href={video.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex aspect-[9/16] flex-col items-center justify-center overflow-hidden rounded-2xl border border-border bg-surface transition-all hover:border-accent-orange/30 hover:shadow-[0_0_40px_-12px_rgba(255,77,46,0.15)]"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-b ${video.color} opacity-0 transition-opacity group-hover:opacity-100`}
                />

                <div className="relative z-10 flex flex-col items-center gap-4 px-6 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-foreground/10 transition-colors group-hover:bg-accent-orange">
                    <PlayIcon className="h-6 w-6 translate-x-0.5 text-foreground group-hover:text-background" />
                  </div>
                  <p className="font-display text-base font-semibold text-foreground md:text-lg">
                    {video.title}
                  </p>
                  <div className="flex items-center gap-2 text-muted">
                    <video.icon className="h-4 w-4" />
                    <span className="font-body text-sm">{video.platform}</span>
                  </div>
                </div>

                <div className="absolute bottom-6 font-body text-xs uppercase tracking-widest text-muted transition-colors group-hover:text-accent-orange">
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
