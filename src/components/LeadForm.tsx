import { MessageIcon } from "./Icons";

// Netlify Forms lead capture — static-friendly: the form is detected at deploy
// time and submissions land in the Netlify dashboard (+ email notification).
// No client JS needed, so this stays a server component.
const field =
  "rounded-[var(--radius-inner)] bg-surface-light px-4 font-body text-base text-foreground shadow-[inset_0_0_0_1px_var(--color-border)] outline-none transition-[background-color,box-shadow] focus:bg-surface focus:shadow-[inset_0_0_0_2px_var(--color-accent-orange)]";
const label =
  "font-body text-[0.72rem] font-bold uppercase tracking-[0.1em] text-muted";

export default function LeadForm() {
  return (
    <section id="get-help" className="bg-background py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl items-start gap-8 px-5 md:px-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
        <div className="lg:sticky lg:top-28 lg:pt-6">
          <p className="eyebrow text-accent-orange">Free help, no pressure</p>
          <h2 className="mt-3 display text-4xl text-foreground sm:text-5xl md:text-6xl">
            Tell me what
            <br />
            <span className="block text-accent-lime">happened.</span>
          </h2>
          <p className="mt-5 max-w-md font-body text-base leading-relaxed text-muted md:text-lg">
            Send the basics and I&apos;ll personally tell you what I&apos;d do
            next — the estimate, the insurance call, parts, total-loss, all of
            it. Free, and I answer fast.
          </p>
        </div>

        <div className="rounded-[var(--radius-card)] bg-surface p-5 shadow-[var(--shadow-lift)] sm:p-8 md:p-10">
          <form
            name="crash-help"
            method="POST"
            action="/thanks"
            data-netlify="true"
            netlify-honeypot="bot-field"
            className="flex flex-col gap-4"
          >
            <input type="hidden" name="form-name" value="crash-help" />
            <p className="hidden" aria-hidden="true">
              <label>
                Don&apos;t fill this out: <input name="bot-field" />
              </label>
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className={label}>
                  Your name
                </span>
                <input
                  required
                  name="name"
                  autoComplete="name"
                  className={`h-12 ${field}`}
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className={label}>
                  Phone (call or text)
                </span>
                <input
                  required
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  className={`h-12 ${field}`}
                />
              </label>
            </div>

            <label className="flex flex-col gap-2">
              <span className={label}>
                What happened? (optional — a sentence is plenty)
              </span>
              <textarea
                name="message"
                rows={4}
                placeholder="Rear-ended on the 405. Bumper's hanging, insurance wants me at their shop tomorrow…"
                className={`resize-y py-3 leading-relaxed placeholder:text-muted/75 ${field}`}
              />
            </label>

            <button
              type="submit"
              className="mt-2 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-accent-orange px-8 font-display text-base font-bold text-white shadow-[0_1px_2px_rgb(33_26_20/0.10),0_8px_20px_-10px_rgb(33_26_20/0.35)] transition-[background-color,transform] hover:bg-accent-lime active:scale-[0.97] sm:w-auto sm:self-start"
            >
              <MessageIcon className="h-5 w-5" />
              Send it — I&apos;ll take a look
            </button>
            <p className="font-body text-xs leading-relaxed text-muted">
              Goes straight to me — replies within a few hours, 7am&ndash;9pm,
              7 days a week. No spam, no selling your info (
              <a href="/privacy" className="underline underline-offset-2 transition-colors hover:text-foreground">
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
