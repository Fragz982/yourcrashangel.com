/* yca-home v2 · the repair tracker.
   The engine flies the drone and publishes where it is (--sc-seg, --sc-segp on
   <html>, and a sc:waypoint event). This file turns that into a delivery-app
   order tracker, lets a tap on a stage fly there, and keeps the "Text me"
   links carrying the visitor's situation. */
(function () {
  "use strict";
  var TEL = "+12132792992";
  var root = document.documentElement;
  var flight = document.querySelector('[data-sc-mode="worldflight"]');
  var tracker = document.querySelector(".tracker");
  if (!flight || !tracker) return;
  var finale = document.querySelector(".finale");
  var hideMQ = matchMedia("(max-width: 760px), (max-height: 700px)");

  // Everything below is keyed to L, the position along the flight in legs
  // (leg index + progress inside it, 0..7). Every leg spends its first ~40%
  // finishing the previous room, so labels switch where the new room is
  // actually on screen, not where the leg begins.
  // Strings, once, for the Spanish build.
  var NOW = [
    [0,    "Scroll to ride along"],
    [0.6,  "Check-in: photos and the first estimate"],
    [1.45, "Body: straightening, welding, sanding"],
    [2.2,  "Body: suspension off, new parts on"],
    [3.45, "Paint: masked, primed, bagged and taped"],
    [4.45, "Paint: in the booth"],
    [5.4,  "Detail: polished, parts back on"],
    [6.35, "Ready: washed and waiting for you"]
  ];
  var TEXT_BASE = "Hi Angel, I was in a crash.";
  var TEXT_ASK = "What should I do next?";
  // L at which each tracker stage begins (Check-in, Body, Paint, Detail, Ready).
  var STAGE_AT = [0.6, 1.45, 3.45, 5.4, 6.35];
  // Where a tap on each stage flies to, in L.
  var JUMP = [1.1, 1.8, 4.75, 5.8, 6.95];

  var legs = flight.querySelectorAll("[data-sc-segment]");
  var weights = Array.prototype.map.call(legs, function (s) { return parseFloat(s.getAttribute("data-sc-w")) || 1.3; });
  var starts = []; weights.reduce(function (run, w) { starts.push(run); return run + w; }, 0);

  var items = tracker.querySelectorAll(".tracker__stages li");
  var nowEl = document.getElementById("now");
  var lastLabel = "", lastStage = -1, ticking = false;

  function update() {
    ticking = false;
    var k = parseInt(root.style.getPropertyValue("--sc-seg"), 10);
    var p = parseFloat(root.style.getPropertyValue("--sc-segp"));
    if (isNaN(k)) k = 0;
    if (isNaN(p)) p = 0;
    var L = Math.max(0, Math.min(legs.length, k + p));

    // fill: 0 at the first stage, 1 at the last, linear between stage starts
    var pos = 0;
    for (var i = 0; i < STAGE_AT.length - 1; i++) {
      if (L >= STAGE_AT[i]) pos = i + Math.min(1, (L - STAGE_AT[i]) / (STAGE_AT[i + 1] - STAGE_AT[i]));
    }
    if (L >= STAGE_AT[STAGE_AT.length - 1]) pos = STAGE_AT.length - 1;
    tracker.style.setProperty("--fill", (pos / (STAGE_AT.length - 1)).toFixed(4));

    var stage = -1;
    STAGE_AT.forEach(function (at, i) { if (L >= at) stage = i; });
    if (stage !== lastStage) {
      Array.prototype.forEach.call(items, function (li, i) {
        li.classList.toggle("is-done", i < stage);
        li.classList.toggle("is-now", i === stage);
        var b = li.querySelector("button");
        if (i === stage) b.setAttribute("aria-current", "step"); else b.removeAttribute("aria-current");
      });
      lastStage = stage;
    }
    var label = NOW[0][1];
    NOW.forEach(function (n) { if (L >= n[0]) label = n[1]; });
    if (label !== lastLabel) { nowEl.textContent = label; lastLabel = label; }

    // The last leg hands the screen to the finale card; the tracker steps aside.
    document.body.classList.toggle("is-finale", L > 6.42);
    document.body.classList.toggle("is-flying", L > 0.62);
    document.body.classList.toggle("is-late", L > 6.5);
    // the hero shade fades out with the headline
    var hq = Math.max(0, Math.min(1, (L - 0.2) / 0.42));
    root.style.setProperty("--hero-q", (1 - hq * hq * (3 - 2 * hq)).toFixed(3));
    // controls that can't be seen can't be focused
    if (finale) finale.inert = L < 6.46;
    tracker.inert = L > 6.42 && hideMQ.matches;
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
  addEventListener("scroll", onScroll, { passive: true });
  flight.addEventListener("sc:waypoint", onScroll);

  // Tap a stage: fly there. A smooth scroll plays the drone forward (or back)
  // at speed, which is the point: it reads as fast-forwarding the repair.
  Array.prototype.forEach.call(tracker.querySelectorAll("button[data-stage]"), function (b) {
    b.addEventListener("click", function () {
      var L = JUMP[+b.getAttribute("data-stage")];
      var leg = Math.min(legs.length - 1, Math.floor(L));
      var top = flight.getBoundingClientRect().top + scrollY;
      var t = starts[leg] + weights[leg] * (L - leg);
      scrollTo({ top: Math.round(top + t * innerHeight), behavior: ScrollCraft.reduce ? "auto" : "smooth" });
    });
  });

  // ---- "Text me" carries their situation -------------------------------
  var picked = "";
  function syncSms() {
    var body = encodeURIComponent(TEXT_BASE + (picked ? " " + picked : "") + " " + TEXT_ASK);
    Array.prototype.forEach.call(document.querySelectorAll("[data-sms]"), function (a) {
      a.setAttribute("href", "sms:" + TEL + "?&body=" + body);
    });
  }
  Array.prototype.forEach.call(document.querySelectorAll("[data-sit]"), function (c, _, all) {
    c.addEventListener("click", function () {
      var on = c.getAttribute("aria-pressed") !== "true";
      Array.prototype.forEach.call(all, function (o) { o.setAttribute("aria-pressed", "false"); });
      c.setAttribute("aria-pressed", on ? "true" : "false");
      picked = on ? c.getAttribute("data-sit") : "";
      syncSms();
    });
  });
  syncSms();

  // On a laptop an sms: link often does nothing, so show the number itself.
  if (matchMedia("(hover: hover) and (pointer: fine)").matches) {
    var cta = document.querySelector(".pill--cta");
    if (cta) cta.textContent = "Text (213) 279-2992";
  }

  // The engine sizes the scroll track at mount and ignores height-only resizes
  // on phones (the address bar hiding) while still using the new screen height,
  // so the track would end before the finale. Re-size it here. In a flight the
  // film position is scrollY / screen height, so this never jumps the picture.
  var sc = ScrollCraft.instances[ScrollCraft.instances.length - 1], lastH = innerHeight;
  function relayout() { if (sc && sc.layout) sc.layout(); onScroll(); }
  addEventListener("resize", function () {
    if (innerHeight === lastH) return;
    lastH = innerHeight;
    relayout();
  }, { passive: true });
  addEventListener("load", relayout);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(relayout);
  update();
})();
