import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-5 text-center">
      <p className="eyebrow text-accent-orange">Error 404</p>
      <h1 className="mt-4 display text-6xl text-foreground sm:text-7xl md:text-8xl">
        This page
        <br />
        <span className="text-accent-lime">took a detour.</span>
      </h1>
      <p className="mt-6 max-w-md font-body text-lg text-muted">
        The link you followed is bent out of shape. But if you just got hit, I
        can still help with the real thing — for free.
      </p>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-orange px-6 py-3 font-display text-sm font-semibold text-background transition-transform hover:scale-105"
        >
          Back to safety
        </Link>
        <a
          href="sms:+12132792992"
          className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-border px-6 py-3 font-display text-sm font-semibold text-foreground transition-colors hover:border-foreground/40"
        >
          Text: (213) 279-2992
        </a>
      </div>

      <Link
        href="/checklist"
        className="mt-8 font-display text-sm text-muted underline-offset-4 transition-colors hover:text-accent-orange hover:underline"
      >
        Or grab the free after-a-crash checklist →
      </Link>
    </main>
  );
}
