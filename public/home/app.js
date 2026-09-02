/* yca-home · the page writes your text.
   The engine drives the acts. This file owns the right-hand panel: it
   composes the message from the visitor's own answers, types it in, keeps
   the sms: link current, and collapses the split at the close by reading
   the close act's --sc-p (the engine writes it inline every frame). */
(function () {
  "use strict";
  var TEL = "+12132792992";
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var phone = matchMedia("(max-width: 860px)");

  // Every string the message can contain, once, for the Spanish build.
  var LINES = {
    hi: "Hi Angel.",
    hit: "I just got hit.",
    ask: "Can you tell me what to do next?"
  };
  var HINTS = {
    start: "This writes itself as you answer. Edit anything.",
    edited: "Your words now. Send it when you're ready.",
    copied: "Copied. Text it to (213) 279-2992.",
    ready: "That's your text. One tap sends it."
  };

  var msg = document.getElementById("msg");
  var sendBtn = document.getElementById("sendBtn");
  var copyBtn = document.getElementById("copyBtn");
  var hint = document.getElementById("hint");
  if (!msg || !sendBtn) return;

  var state = { hit: false, ask: false, sit: "", drive: "", fault: "", ins: "" };
  var rendered = "";      // what the page last wrote into the textarea
  var userEdited = false; // the visitor typed; from then on we only append
  var typing = null;

  function compose() {
    var lines = [state.hit ? LINES.hi + " " + LINES.hit : LINES.hi];
    if (state.sit) lines.push(state.sit);
    if (state.drive) lines.push(state.drive);
    if (state.fault) lines.push(state.fault);
    if (state.ins) lines.push(state.ins);
    if (state.ask) lines.push(LINES.ask);
    return lines.join("\n");
  }

  function syncLink() {
    var body = encodeURIComponent(msg.value.trim());
    // "?&body=" is the form both iOS and Android accept
    sendBtn.setAttribute("href", "sms:" + TEL + "?&body=" + body);
  }

  // Type the difference in, a few characters per frame. If the visitor has
  // edited the text, new lines are appended rather than rewriting their words.
  function render() {
    var target = compose();
    if (target === rendered) return;
    var from = msg.value;
    var next;
    if (!userEdited) {
      // rewrite from the common prefix
      var i = 0; while (i < from.length && i < target.length && from[i] === target[i]) i++;
      next = { keep: target.slice(0, i), add: target.slice(i), replaceAll: true };
    } else {
      // append only the lines that are new since the last render
      var addLines = target.split("\n").filter(function (l) { return rendered.indexOf(l) === -1; });
      if (!addLines.length) { rendered = target; return; }
      next = { keep: from.replace(/\s+$/, ""), add: "\n" + addLines.join("\n"), replaceAll: false };
    }
    rendered = target;
    if (typing) cancelAnimationFrame(typing);
    if (reduce) { msg.value = next.keep + next.add; syncLink(); return; }
    msg.value = next.keep;
    var k = 0, add = next.add;
    (function step() {
      k = Math.min(add.length, k + 2);
      msg.value = next.keep + add.slice(0, k);
      syncLink();
      if (k < add.length) typing = requestAnimationFrame(step);
      else typing = null;
    })();
  }

  // ---- inputs ------------------------------------------------------------
  Array.prototype.forEach.call(document.querySelectorAll("input[type=radio]"), function (r) {
    r.addEventListener("change", function () {
      if (!r.checked) return;
      state[r.name] = r.value;
      render();
    });
  });
  msg.addEventListener("input", function () {
    if (typing) return; // our own typing fires input too
    userEdited = true;
    hint.textContent = HINTS.edited;
    syncLink();
  });
  copyBtn.addEventListener("click", function () {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(msg.value.trim()).then(function () {
      var was = copyBtn.textContent;
      copyBtn.textContent = "Copied";
      hint.textContent = HINTS.copied;
      setTimeout(function () { copyBtn.textContent = was; }, 2200);
    }).catch(function () {});
  });

  // ---- scroll-stamped lines ---------------------------------------------
  // "Hi Angel." types on load; "I just got hit." when the steps arrive;
  // the closing question when the collapse begins.
  hint.textContent = HINTS.start;
  setTimeout(render, reduce ? 0 : 700);
  var steps = document.getElementById("first-five");
  if (steps) {
    new IntersectionObserver(function (es, io) {
      es.forEach(function (e) { if (e.isIntersecting) { state.hit = true; render(); io.disconnect(); } });
    }, { threshold: 0.25 }).observe(steps);
  }

  // ---- the collapse -----------------------------------------------------
  // The close act's --sc-p drives the panel from half the screen to all of it.
  var close = document.getElementById("send");
  var root = document.documentElement;
  var ticking = false, live = false;
  function ease(t) { return t * t * (3 - 2 * t); }
  function tick() {
    ticking = false;
    var p = parseFloat(close.style.getPropertyValue("--sc-p")) || 0;
    var q = ease(Math.min(1, Math.max(0, p / 0.85)));
    root.style.setProperty("--collapse", q.toFixed(4));
    if (p > 0.1 && !state.ask) { state.ask = true; render(); hint.textContent = HINTS.ready; }
    document.body.classList.toggle("is-ready", p > 0.6);
  }
  function onScroll() { if (live && !ticking) { ticking = true; requestAnimationFrame(tick); } }
  if (close) {
    new IntersectionObserver(function (es) {
      es.forEach(function (e) { live = e.isIntersecting; if (live) onScroll(); else { root.style.setProperty("--collapse", "0"); document.body.classList.remove("is-ready"); } });
    }, { rootMargin: "20% 0px 20% 0px" }).observe(close);
    addEventListener("scroll", onScroll, { passive: true });
  }

  // ---- the beats list: where you are on the argument ---------------------
  var beats = document.querySelectorAll("[data-beat]");
  var items = {};
  Array.prototype.forEach.call(document.querySelectorAll(".beats a"), function (a) { items[a.getAttribute("href").slice(1)] = a.parentNode; });
  new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      var li = items[e.target.id]; if (!li) return;
      if (e.isIntersecting) {
        Object.keys(items).forEach(function (k) { items[k].classList.remove("is-on"); });
        li.classList.add("is-on");
      }
    });
  }, { rootMargin: "-45% 0px -45% 0px" }).observe;
  var beatIO = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      var li = items[e.target.id]; if (!li) return;
      if (e.isIntersecting) {
        Object.keys(items).forEach(function (k) { items[k].classList.remove("is-on"); });
        li.classList.add("is-on");
      }
    });
  }, { rootMargin: "-45% 0px -45% 0px" });
  Array.prototype.forEach.call(beats, function (b) { beatIO.observe(b); });

  // the beats list scrolls instantly: the page sets smooth scrolling, and a
  // glide through eleven screens would play every act at speed
  Array.prototype.forEach.call(document.querySelectorAll(".beats a"), function (a) {
    a.addEventListener("click", function (ev) {
      var el = document.getElementById(a.getAttribute("href").slice(1));
      if (!el) return;
      ev.preventDefault();
      el.scrollIntoView({ block: "start", behavior: "instant" });
    });
  });

  syncLink();
})();
