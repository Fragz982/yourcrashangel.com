/* yourcrashangel · page-local behavior.
   The engine is untouched. Everything here reads --sc-p (published by the
   engine on every act) and writes per-unit custom properties ONCE at setup;
   CSS does every animated frame. */
(function () {
  "use strict";
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Deterministic pseudo-random in [-1, 1], seeded by index. No Math.random:
  // the scatter must be identical on every load and every verify pass.
  function rnd(seed) {
    var x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
    return (x - Math.floor(x)) * 2 - 1;
  }

  // Split "a b  c" into ["a ", "b  ", "c"] without regex lookbehind
  // (a lookbehind literal is a parse error on Safari before 16.4 and would
  // take the whole file down with it).
  function splitWords(text) {
    var parts = text.split(/(\s+)/);
    var words = [];
    parts.forEach(function (p) {
      if (!p) return;
      if (/^\s+$/.test(p) && words.length) words[words.length - 1] += p;
      else words.push(p);
    });
    return words;
  }

  /* ------------------------------------------------- the decoder (signature)
     Term chars scatter out through per-char windows; plain-sentence words
     gather in through later windows; then the term settles back in quietly as
     a ghost label so a settled row still reads TERM: sentence. Profiles:
       peak  scatter [0.14..0.50], gather [0.36..0.72], big vectors
       row   scatter [0.10..0.32], gather [0.24..0.44], small vectors
     (flow acts hit p≈0.45 as the row reaches mid-screen). */
  var PROFILES = {
    peak: { s0: 0.14, s1: 0.50, g0: 0.36, g1: 0.72, dist: Math.min(innerWidth * 0.16, 230), rise: 90, rot: 26 },
    row:  { s0: 0.10, s1: 0.32, g0: 0.24, g1: 0.44, dist: 52, rise: 26, rot: 10 }
  };

  function makeUnit(u, cls, i, n, seedBase, from, to, dist, rise, rot, invert) {
    var s = document.createElement("span");
    s.className = cls;
    s.textContent = u;
    var t = n > 1 ? i / (n - 1) : 0;
    // staggered but not strictly ordered: neighbours leave near each other
    var jitter = rnd(seedBase + i) * 0.06;
    var w0 = from + (to - from) * Math.min(1, Math.max(0, t * 0.82 + 0.09 + jitter));
    var span = (to - from) * 0.32;
    s.style.setProperty("--w0", w0.toFixed(3));
    s.style.setProperty("--iw", (1 / span).toFixed(3));
    s.style.setProperty("--dx", (rnd(seedBase + i * 7 + 1) * dist).toFixed(1) + "px");
    s.style.setProperty("--dy", ((invert ? 1 : -1) * (Math.abs(rnd(seedBase + i * 13 + 2)) * rise + rise * 0.25)).toFixed(1) + "px");
    if (rot) s.style.setProperty("--dr", (rnd(seedBase + i * 3 + 5) * rot).toFixed(1) + "deg");
    return s;
  }

  // Rebuild an element as: [sr real text] + [aria-hidden animated units].
  // The element itself keeps its semantics (a split h3 stays a heading).
  function splitInto(el, mode, cls, seedBase, from, to, dist, rise, rot, invert) {
    var text = el.textContent;
    el.textContent = "";
    var sr = document.createElement("span");
    sr.className = "sr";
    sr.textContent = text;
    el.appendChild(sr);
    var anim = document.createElement("span");
    anim.className = "dc__anim";
    anim.setAttribute("aria-hidden", "true");
    var units = [];
    if (mode === "chars") {
      // chars grouped per word inside a no-wrap wrapper, so a narrow screen
      // can never break a line in the middle of a word
      var flat = [];
      splitWords(text).forEach(function (w) { flat.push(w); });
      var n = text.replace(/\s/g, "").length, i = 0;
      flat.forEach(function (w, wi) {
        var wrap = document.createElement("span");
        wrap.className = "chw";
        w.trim().split("").forEach(function (c) {
          wrap.appendChild(makeUnit(c, cls, i++, n, seedBase, from, to, dist, rise, rot, invert));
        });
        anim.appendChild(wrap);
        if (wi < flat.length - 1) anim.appendChild(document.createTextNode(" "));
      });
    } else {
      units = splitWords(text);
      units.forEach(function (w, i) {
        anim.appendChild(makeUnit(w, cls, i, units.length, seedBase, from, to, dist, rise, rot, invert));
      });
    }
    el.appendChild(anim);
    return text;
  }

  function setupDecoder() {
    var blocks = document.querySelectorAll("[data-decode]");
    Array.prototype.forEach.call(blocks, function (block, bi) {
      var prof = PROFILES[block.getAttribute("data-profile")] || PROFILES.row;
      var term = block.querySelector(".dc__term");
      var plain = block.querySelector(".dc__plain");
      if (!term || !plain) return;

      var termText = splitInto(term, "chars", "ch", bi * 101 + 7,
        prof.s0, prof.s1, prof.dist, prof.rise, prof.rot, false);
      splitInto(plain, "words", "wd", bi * 211 + 41,
        prof.g0, prof.g1, prof.dist * 0.55, prof.rise * 0.6, 0, true);

      // the ghost label: the term settles back, quietly, once the sentence
      // has assembled, so a settled row still names what it translated
      var label = document.createElement("span");
      label.className = "dc__label";
      label.setAttribute("aria-hidden", "true");
      label.textContent = termText;
      label.style.setProperty("--w0", (prof.g1 + 0.02).toFixed(3));
      label.style.setProperty("--iw", (1 / 0.06).toFixed(1));
      term.appendChild(label);

      block.classList.add("is-split");
    });
  }

  /* ------------------------------------------------------- the wall schedule
     Nine rows land down the index, and the gaps between them shrink: the
     overwhelm is pacing, not scatter. The first window is negative so the
     stage is never empty while it slides into view (ground or greet). */
  var WALL_ROWS = [-0.06, 0.10, 0.22, 0.32, 0.40, 0.47, 0.53, 0.58, 0.62];
  function setupWall() {
    var rows = document.querySelectorAll("#ch-words .wl__row");
    Array.prototype.forEach.call(rows, function (r, i) {
      r.style.setProperty("--w0", String(WALL_ROWS[Math.min(i, WALL_ROWS.length - 1)]));
    });
  }

  /* ------------------------------------------------ timeline settle stagger */
  function setupTimeline() {
    var stages = document.querySelectorAll(".tl__stage");
    Array.prototype.forEach.call(stages, function (s, i) {
      // first card exempt: a pan act needs its opening content present
      s.style.setProperty("--s0", i === 0 ? "-0.2" : (0.04 + i * 0.09).toFixed(2));
    });
  }

  /* --------------------------------------------------------------- folio */
  function setupFolio() {
    var folio = document.getElementById("folio");
    if (!folio) return;
    var no = folio.querySelector(".folio__no");
    var title = folio.querySelector(".folio__title");
    var chapters = document.querySelectorAll("[data-chapter]");
    // The folio sits in the top band, so a chapter takes it over only when its
    // own ground has actually reached that band; switching earlier paints the
    // wrong colors against the outgoing act.
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        no.textContent = e.target.getAttribute("data-chapter");
        title.textContent = e.target.getAttribute("data-chapter-title");
        folio.classList.add("is-on");
        folio.setAttribute("aria-hidden", "false");
        folio.classList.toggle("is-darkside", e.target.classList.contains("is-dark"));
      });
    }, { rootMargin: "0px 0px -94% 0px" });
    Array.prototype.forEach.call(chapters, function (c) { io.observe(c); });
    // no chrome over the cold open, and none over the colophon
    var io2 = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && e.intersectionRatio > 0.4) {
          folio.classList.remove("is-on");
          folio.setAttribute("aria-hidden", "true");
        }
      });
    }, { threshold: [0.4] });
    ["open", "close"].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) io2.observe(el);
    });
  }

  /* -------------------------------------------------- verify-state publisher
     The wall and the peak animate through bespoke CSS the harness cannot see.
     Publish a compact signature of what actually paints so dead-scroll checks
     grade the real timeline. The loop only runs while one of the two acts is
     actually near the viewport; off-screen, nothing is polled. */
  function setupVerifyState() {
    var acts = [
      { act: document.getElementById("ch-words"), key: "stamped", on: false, last: "" },
      { act: document.getElementById("ch-translation"), key: "decode", on: false, last: "" },
    ].filter(function (a) { return a.act; });
    acts.forEach(function (a) { a.stage = a.act.querySelector("[data-sc-stage]"); });
    // every window that actually paints something on the wall, in order:
    // the nine index rows and the closing line
    var wallWins = WALL_ROWS.concat([0.86]);
    var running = false;
    function tick() {
      var any = false;
      acts.forEach(function (a) {
        if (!a.on || !a.stage) return;
        any = true;
        var p = parseFloat(getComputedStyle(a.act).getPropertyValue("--sc-p")) || 0;
        var s = a.key === "stamped"
          ? "stamped:" + wallWins.filter(function (w) { return p > w; }).length
          : "decode:" + Math.round(p * 20);
        if (s !== a.last) { a.stage.setAttribute("data-sc-verify-state", s); a.last = s; }
      });
      if (any) requestAnimationFrame(tick);
      else running = false;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var a = acts.find(function (x) { return x.act === e.target; });
        if (a) a.on = e.isIntersecting;
      });
      if (!running && acts.some(function (a) { return a.on; })) {
        running = true;
        requestAnimationFrame(tick);
      }
    }, { rootMargin: "50% 0px 50% 0px" });
    acts.forEach(function (a) { io.observe(a.act); });
  }

  if (reduce) {
    // Fewer and gentler, not zero: everything renders settled and legible.
    var wallStage = document.querySelector("#ch-words [data-sc-stage]");
    var peakStage = document.querySelector("#ch-translation [data-sc-stage]");
    if (wallStage) wallStage.setAttribute("data-sc-verify-hold", "true");
    if (peakStage) peakStage.setAttribute("data-sc-verify-hold", "true");
    setupFolio();
    return;
  }

  setupDecoder();
  setupWall();
  setupTimeline();
  setupFolio();
  setupVerifyState();

  // dev aid for the pan-overflow check in verify.md; harmless in production
  addEventListener("load", function () {
    var rail = document.querySelector(".tl__rail");
    if (rail) console.info("[yca] rail overflow px:", rail.scrollWidth - innerWidth);
  });
})();
