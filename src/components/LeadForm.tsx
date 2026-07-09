// Netlify Forms lead capture — static-friendly: the form is detected at deploy
// time and submissions land in the Netlify dashboard (+ email notification).
// No client JS needed, so this stays a server component.
export default function LeadForm() {
  return (
    <section id="get-help" className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto max-w-2xl rounded-3xl border border-border bg-surface p-8 md:p-12">
          <p className="eyebrow text-accent-orange">Free help, no pressure</p>
          <h2 className="mt-4 display text-4xl text-foreground sm:text-5xl">
            Tell me what
            <br />
            <span className="text-accent-lime">happened.</span>
          </h2>
          <p className="mt-4 max-w-md font-body text-base leading-relaxed text-muted">
            Send the basics and I&apos;ll personally tell you what I&apos;d do
            next — the estimate, the insurance call, parts, total-loss, all of
            it. Free, and I answer fast.
          </p>

          <form
            name="crash-help"
            method="POST"
            action="/thanks"
            data-netlify="true"
            netlify-honeypot="bot-field"
            className="mt-8 flex flex-col gap-4"
          >
            <input type="hidden" name="form-name" value="crash-help" />
            <p className="hidden" aria-hidden="true">
              <label>
                Don&apos;t fill this out: <input name="bot-field" />
              </label>
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5">
                <span className="font-mono text-xs uppercase tracking-wider text-muted">
                  Your name
                </span>
                <input
                  required
                  name="name"
                  autoComplete="name"
                  className="rounded-xl border border-border bg-background px-4 py-3 font-body text-foreground outline-none focus:border-accent-orange"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="font-mono text-xs uppercase tracking-wider text-muted">
                  Phone (call or text)
                </span>
                <input
                  required
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  className="rounded-xl border border-border bg-background px-4 py-3 font-body text-foreground outline-none focus:border-accent-orange"
                />
              </label>
            </div>

            <label className="flex flex-col gap-1.5">
              <span className="font-mono text-xs uppercase tracking-wider text-muted">
                What happened? (optional — a sentence is plenty)
              </span>
              <textarea
                name="message"
                rows={4}
                placeholder="Rear-ended on the 405. Bumper's hanging, insurance wants me at their shop tomorrow…"
                className="rounded-xl border border-border bg-background px-4 py-3 font-body text-foreground outline-none placeholder:text-muted/60 focus:border-accent-orange"
              />
            </label>

            <button
              type="submit"
              className="mt-2 self-start rounded-full bg-accent-orange px-8 py-4 font-display text-base font-semibold text-background transition-transform hover:scale-105 active:scale-95"
            >
              Send it — I&apos;ll take a look
            </button>
            <p className="font-body text-xs text-muted">
              Goes straight to me — replies within a few hours, 7am&ndash;9pm,
              7 days a week. No spam, no selling your info (
              <a href="/privacy" className="underline underline-offset-2">
                privacy
              </a>
              ) — ever.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
