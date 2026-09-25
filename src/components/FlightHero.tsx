"use client";

import { useEffect, useRef } from "react";
import "../app/flight.css";
import { CameraIcon } from "./Icons";

/* The drone flight at the top of the homepage: one continuous scroll-driven
   FPV take through a body shop (seven chained Higgsfield legs), a repair
   tracker at the bottom, and the old hero's words on the first screen.
   Built in scrollcraft/builds/yca-home-v2; the engine lives in
   /public/flight/scrollcraft.js and drives everything with data-sc-*. */

const TEL = "+12132792992";

const LEGS = [
  { n: 1, label: "Arrive" },
  { n: 2, label: "Body floor" },
  { n: 3, label: "Lifts" },
  { n: 4, label: "Paint prep" },
  { n: 5, label: "Booth" },
  { n: 6, label: "Polish" },
  { n: 7, label: "Ready", wash: true },
];

// Everything the tracker shows is keyed to L, the position along the flight
// in legs (leg index + progress inside it, 0..7). Every leg spends its first
// ~40% finishing the previous room, so labels switch where the new room is
// actually on screen.
const NOW: [number, string][] = [
  [0, "Scroll to ride along"],
  [0.6, "Check-in: photos and the first estimate"],
  [1.45, "Body: straightening, welding, sanding"],
  [2.2, "Body: suspension off, new parts on"],
  [3.45, "Paint: masked, primed, bagged and taped"],
  [4.45, "Paint: in the booth"],
  [5.4, "Detail: polished, parts back on"],
  [6.35, "Ready: washed and waiting for you"],
];
const STAGE_AT = [0.6, 1.45, 3.45, 5.4, 6.35];
const JUMP = [1.1, 1.8, 4.75, 5.8, 6.95];
const STAGES = ["Check-in", "Body", "Paint", "Detail", "Ready"];
const TEXT_BASE = "Hi Angel, I was in a crash.";
const TEXT_ASK = "What should I do next?";

type SC = {
  mount: (root: Element) => { layout: () => void };
  reduce: boolean;
  instances: { layout: () => void }[];
};

function loadEngine(): Promise<SC> {
  const w = window as unknown as { ScrollCraft?: SC; __scLoading?: Promise<SC> };
  if (w.ScrollCraft) return Promise.resolve(w.ScrollCraft);
  if (w.__scLoading) return w.__scLoading;
  w.__scLoading = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "/flight/scrollcraft.js";
    s.async = true;
    s.onload = () => (w.ScrollCraft ? resolve(w.ScrollCraft) : reject(new Error("engine missing")));
    s.onerror = reject;
    document.head.appendChild(s);
  });
  return w.__scLoading;
}

export default function FlightHero() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let alive = true;
    const cleanups: (() => void)[] = [];
    const body = document.body;
    const html = document.documentElement;

    loadEngine().then((SC) => {
      if (!alive || !root.isConnected) return;
      // React runs effects twice in dev; the engine must mount exactly once.
      if (root.dataset.scMounted) return;
      root.dataset.scMounted = "1";
      const inst = SC.mount(root);

      const flight = root.querySelector<HTMLElement>('[data-sc-mode="worldflight"]')!;
      const spacer = root.querySelector<HTMLElement>("[data-sc-spacer]")!;
      const tracker = root.querySelector<HTMLElement>(".tracker")!;
      const finale = root.querySelector<HTMLElement>(".finale");
      const nowEl = root.querySelector<HTMLElement>("[data-now]")!;
      const items = Array.from(tracker.querySelectorAll<HTMLElement>(".tracker__stages li"));
      const legs = Array.from(flight.querySelectorAll<HTMLElement>("[data-sc-segment]"));
      const weights = legs.map((s) => parseFloat(s.getAttribute("data-sc-w") || "1.3"));
      const starts: number[] = [];
      weights.reduce((run, w) => (starts.push(run), run + w), 0);
      const total = weights.reduce((a, b) => a + b, 0);
      const hideMQ = matchMedia("(max-width: 760px), (max-height: 700px)");
      let lastLabel = "", lastStage = -2, ticking = false;

      const update = () => {
        ticking = false;
        let k = parseInt(html.style.getPropertyValue("--sc-seg"), 10);
        let p = parseFloat(html.style.getPropertyValue("--sc-segp"));
        if (isNaN(k)) k = 0;
        if (isNaN(p)) p = 0;
        const L = Math.max(0, Math.min(legs.length, k + p));

        let pos = 0;
        for (let i = 0; i < STAGE_AT.length - 1; i++) {
          if (L >= STAGE_AT[i]) pos = i + Math.min(1, (L - STAGE_AT[i]) / (STAGE_AT[i + 1] - STAGE_AT[i]));
        }
        if (L >= STAGE_AT[STAGE_AT.length - 1]) pos = STAGE_AT.length - 1;
        tracker.style.setProperty("--fill", (pos / (STAGE_AT.length - 1)).toFixed(4));

        let stage = -1;
        STAGE_AT.forEach((at, i) => { if (L >= at) stage = i; });
        if (stage !== lastStage) {
          items.forEach((li, i) => {
            li.classList.toggle("is-done", i < stage);
            li.classList.toggle("is-now", i === stage);
            const b = li.querySelector("button")!;
            if (i === stage) b.setAttribute("aria-current", "step"); else b.removeAttribute("aria-current");
          });
          lastStage = stage;
        }
        let label = NOW[0][1];
        NOW.forEach((n) => { if (L >= n[0]) label = n[1]; });
        if (label !== lastLabel) { nowEl.textContent = label; lastLabel = label; }

        body.classList.toggle("is-finale", L > 6.42);
        body.classList.toggle("is-flying", L > 0.62);
        body.classList.toggle("is-late", L > 6.5);
        const hq = Math.max(0, Math.min(1, (L - 0.2) / 0.42));
        html.style.setProperty("--hero-q", (1 - hq * hq * (3 - 2 * hq)).toFixed(3));

        // Hand-off to the page: once the flight has played out, the sections
        // after it rise over it like a sheet; the copy and tracker step aside.
        const vh = innerHeight;
        const endY = spacer.getBoundingClientRect().top + scrollY + total * vh;
        const past = Math.max(0, Math.min(1, (scrollY - endY) / (0.35 * vh)));
        root.style.setProperty("--past", past.toFixed(3));
        root.classList.toggle("is-gone", scrollY > endY + vh * 1.05);
        body.classList.toggle("in-flight", scrollY < endY + vh * 0.2);

        if (finale) finale.inert = L < 6.46 || past > 0.5;
        tracker.inert = (L > 6.42 && hideMQ.matches) || past > 0.5;
      };
      const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
      addEventListener("scroll", onScroll, { passive: true });
      flight.addEventListener("sc:waypoint", onScroll);
      cleanups.push(() => removeEventListener("scroll", onScroll));

      // Tap a stage: fly there.
      tracker.querySelectorAll<HTMLButtonElement>("button[data-stage]").forEach((b) => {
        b.addEventListener("click", () => {
          const L = JUMP[+b.dataset.stage!];
          const leg = Math.min(legs.length - 1, Math.floor(L));
          const top = flight.getBoundingClientRect().top + scrollY;
          const t = starts[leg] + weights[leg] * (L - leg);
          scrollTo({ top: Math.round(top + t * innerHeight), behavior: SC.reduce ? "auto" : "smooth" });
        });
      });

      // "Text me" carries their situation.
      let picked = "";
      const syncSms = () => {
        const bodyTxt = encodeURIComponent(TEXT_BASE + (picked ? " " + picked : "") + " " + TEXT_ASK);
        root.querySelectorAll<HTMLAnchorElement>("[data-sms]").forEach((a) => a.setAttribute("href", `sms:${TEL}?&body=${bodyTxt}`));
      };
      const chips = Array.from(root.querySelectorAll<HTMLButtonElement>("[data-sit]"));
      chips.forEach((c) => c.addEventListener("click", () => {
        const on = c.getAttribute("aria-pressed") !== "true";
        chips.forEach((o) => o.setAttribute("aria-pressed", "false"));
        c.setAttribute("aria-pressed", on ? "true" : "false");
        picked = on ? c.dataset.sit || "" : "";
        syncSms();
      }));
      syncSms();

      // Phones: the engine ignores height-only resizes (the address bar) but
      // keeps using the new screen height, so re-size the scroll track here.
      let lastH = innerHeight;
      const relayout = () => { inst.layout(); onScroll(); };
      const onResize = () => { if (innerHeight === lastH) return; lastH = innerHeight; relayout(); };
      addEventListener("resize", onResize, { passive: true });
      cleanups.push(() => removeEventListener("resize", onResize));
      if (document.readyState !== "complete") addEventListener("load", relayout, { once: true });
      document.fonts?.ready.then(relayout);
      update();
    });

    return () => {
      alive = false;
      cleanups.forEach((f) => f());
      body.classList.remove("is-finale", "is-flying", "is-late", "in-flight");
    };
  }, []);

  return (
    <div className="flight-root" ref={rootRef}>
      <div className="flight" data-sc-mode="worldflight" data-sc-seam="0.16" data-sc-lerp="0.12">
        <div data-sc-world aria-hidden="true">
          {LEGS.map((l) => (
            <div key={l.n} className={l.wash ? "leg-wash" : undefined} data-sc-segment data-sc-w="1.2" data-sc-waypoint={l.label}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="sc-world__poster" src={`/flight/assets/p${l.n}.webp`} alt="" decoding="async" fetchPriority={l.n === 1 ? "high" : undefined} />
              <video data-sc-src={`/flight/assets/l${l.n}.mp4`} data-sc-src-mobile={`/flight/assets/l${l.n}-m.mp4`} muted playsInline />
            </div>
          ))}
        </div>

        <div data-sc-world-copy>
          <div className="sc-world__scrim scrim" aria-hidden="true" />
          <div className="scrim--hero" aria-hidden="true" />

          {/* HERO: present from the first pixel. The old homepage hero, merged. */}
          <section className="copy copy--hero" data-sc-copy data-sc-window="hero" aria-label="Intro">
            <p className="chip chip--glass">Angel · Collision estimator · Los Angeles</p>
            <h1 className="hero__h">Just got hit? <em>Take a breath.</em></h1>
            <p className="hero__lede">
              I&apos;m Angel, a real collision estimator in LA. I&apos;ll walk you through the damage, the estimate, and the insurance side. Calm, honest, always free.
            </p>
            <div className="hero__ctas">
              <a className="btn btn--primary" href={`sms:${TEL}`} data-sms>
                <CameraIcon className="h-5 w-5" />
                Text me a pic of the damage
              </a>
              <a className="btn btn--glass" href="#first-5">What do I do right now?</a>
            </div>
            <p className="hero__small">
              Call or text <a href={`tel:${TEL}`}>(213) 279-2992</a>, answered 7am&ndash;9pm, usually within minutes. Or scroll and ride along with a car through the shop.
            </p>
          </section>

          <section className="copy card" data-sc-copy data-sc-window="0.10 0.19 0.15 0.15" aria-label="Check-in">
            <p className="card__no">01 · Check-in</p>
            <h2 className="card__h">Photos, then the first estimate.</h2>
            <p className="card__p">It only covers what can be seen from outside. You pick the shop, even if it got towed to a yard first.</p>
          </section>
          <section className="copy card" data-sc-copy data-sc-window="0.214 0.414 0.15 0.15" aria-label="Body">
            <p className="card__no">02 · Body</p>
            <h2 className="card__h">It comes apart, then back to shape.</h2>
            <p className="card__p">Taking it apart shows damage you couldn&apos;t see. If there&apos;s more, the estimate gets updated. That&apos;s normal.</p>
          </section>
          <section className="copy card" data-sc-copy data-sc-window="0.493 0.621 0.15 0.15" aria-label="Paint prep">
            <p className="card__no">03 · Paint prep</p>
            <h2 className="card__h">Masked for primer. Then bagged and taped.</h2>
            <p className="card__p">Primer goes on and gets sanded smooth. Then it&apos;s masked again and bagged, so paint only lands where it should.</p>
          </section>
          <section className="copy card" data-sc-copy data-sc-window="0.636 0.757 0.15 0.15" aria-label="The booth">
            <p className="card__no">03 · Paint booth</p>
            <h2 className="card__h">The booth.</h2>
            <p className="card__p">Clean, filtered air. Paint mixed to match your car. Color coat, clear coat, then baked hard.</p>
          </section>
          <section className="copy card" data-sc-copy data-sc-window="0.771 0.9 0.15 0.15" aria-label="Detail">
            <p className="card__no">04 · Detail</p>
            <h2 className="card__h">Polished, then put back together.</h2>
            <p className="card__p">Buffed smooth, parts back on, safety sensors checked. Then the detailer cleans it up.</p>
          </section>

          {/* FINALE: arrival in the lot. */}
          <section className="copy finale" data-sc-copy data-sc-window="0.914 1 0.2 0" aria-label="Text Angel">
            <p className="card__no">05 · Washed and ready</p>
            <h2 className="finale__h">That&apos;s the whole trip.</h2>
            <p className="finale__p">Just got hit? Text me and I&apos;ll tell you what to do next. Free help, always.</p>
            <p className="finale__ask">What happened? Tap one. It goes in your text.</p>
            <div className="chips" role="group" aria-label="What happened">
              {[
                ["Someone rear-ended me.", "Rear-ended"],
                ["It was a hit and run.", "Hit and run"],
                ["They're saying it's my fault.", "They say it's my fault"],
                ["The other driver has no insurance.", "They have no insurance"],
                ["My car is at a tow yard.", "At a tow yard"],
                ["The insurance company wants to total my car.", "They want to total it"],
              ].map(([sit, label]) => (
                <button key={label} type="button" className="chip chip--pick" aria-pressed="false" data-sit={sit}>{label}</button>
              ))}
            </div>
            <div className="finale__actions">
              <a className="btn btn--primary" href={`sms:${TEL}`} data-sms>Text me</a>
              <a className="btn btn--ghost" href={`tel:${TEL}`}>Call (213) 279-2992</a>
            </div>
            <p className="finale__more">
              <a href="#first-5">What to do right now</a>
              <a href="/playbook">The playbook</a>
              <a href="/translator/">Insurance words, translated</a>
            </p>
          </section>
        </div>

        <div data-sc-spacer aria-hidden="true" />
      </div>

      {/* THE TRACKER: a delivery-app order tracker whose position is the scroll. */}
      <nav className="tracker" aria-label="Repair stages">
        <p className="tracker__now" aria-live="polite">
          <span className="tracker__dot" aria-hidden="true" />
          <span data-now>Scroll to ride along</span>
        </p>
        <div className="tracker__row">
          <div className="tracker__line" aria-hidden="true"><span className="tracker__fill" /></div>
          <ol className="tracker__stages">
            {STAGES.map((s, i) => (
              <li key={s}>
                <button type="button" data-stage={i}>
                  <span className="tracker__pip" aria-hidden="true" />
                  <span>{s}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </div>
  );
}
