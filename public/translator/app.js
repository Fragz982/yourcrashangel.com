/* yourcrashangel · page-local behavior.
   The engine is untouched. Everything here reads --sc-p (published by the
   engine on every act) and writes per-unit custom properties ONCE at setup;
   CSS does every animated frame. */
(function () {
  "use strict";
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Deterministic pseudo-random in [-1, 1], seeded by index. No Math.random:
  // the stagger must be identical on every load and every verify pass.
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

  function span(cls, text) {
    var s = document.createElement("span");
    s.className = cls;
    if (text != null) s.textContent = text;
    return s;
  }

  // Window [w0, w0 + 1/iw] on an element: CSS turns it into --q from --sc-p.
  function setWin(el, w0, spanW) {
    el.style.setProperty("--w0", w0.toFixed(3));
    el.style.setProperty("--iw", (1 / spanW).toFixed(3));
  }

  /* ------------------------------------------------- the decoder (signature)
     The term does not fade and get replaced. Its letters go where they can:
       carry  letters the sentence keeps (BETTER inside "better", L K Q onto
              Like Kind Quality) travel on a measured straight line, at full
              ink, shrinking to the sentence's size, and hand off in place;
       fall   the rest drop straight down through the rule and go;
       words  the sentence rises into place in reading order;
       ret    (rows only) the term re-prints in its column, so the settled
              glossary is still an index: TERM, then meaning;
       label  (peak only) the term settles back as a caption on the rule.
     Everything is one axis or one measured vector. Nothing rotates. Windows
     are fractions of the act's p. A flow row is around p≈0.57 when its top
     reaches mid-screen, so the row windows finish gathering right there. */
  var PROFILES = {
    peak: { fall: [0.04, 0.30], carry: [0.25, 0.60], words: [0.40, 0.72], label: 0.74, ret: null },
    row:  { fall: [0.30, 0.42], carry: [0.36, 0.50], words: [0.42, 0.56], label: null, ret: 0.60 }
  };

  // Longest common substring, case-insensitive, of the term's letters and the
  // sentence. Returns {a, b, len} indices into both, or null under minLen.
  function lcs(t, s, minLen) {
    var best = { len: 0, a: 0, b: 0 };
    var prev = [], cur;
    for (var i = 0; i < t.length; i++) {
      cur = [];
      for (var j = 0; j < s.length; j++) {
        var v = (t[i] === s[j]) ? ((i && j) ? (prev[j - 1] || 0) : 0) + 1 : 0;
        cur[j] = v;
        if (v > best.len) best = { len: v, a: i - v + 1, b: j - v + 1 };
      }
      prev = cur;
    }
    return best.len >= minLen ? best : null;
  }

  // Wrap character ranges of a plain-text element into spans. `marks` is a
  // list of {at, len, cls} in char order; everything else becomes `restCls`.
  function wrapChars(el, text, marks, restCls) {
    el.textContent = "";
    var pos = 0;
    var out = [];
    marks.forEach(function (m) {
      if (m.at > pos) el.appendChild(span(restCls, text.slice(pos, m.at)));
      var s = span(m.cls, text.slice(m.at, m.at + m.len));
      el.appendChild(s);
      out.push(s);
      pos = m.at + m.len;
    });
    if (pos < text.length) el.appendChild(span(restCls, text.slice(pos)));
    return out;
  }

  function setupDecoder() {
    var blocks = document.querySelectorAll("[data-decode]");
    var measured = [];
    Array.prototype.forEach.call(blocks, function (block, bi) {
      var prof = PROFILES[block.getAttribute("data-profile")] || PROFILES.row;
      var term = block.querySelector(".dc__term");
      var plain = block.querySelector(".dc__plain");
      var expand = block.querySelector(".dc__expand");
      if (!term || !plain) return;

      var termText = term.textContent;
      var plainText = plain.textContent;
      // letter count feeds the peak's size cap, so a longer word in another
      // language shrinks to the measure instead of running off the spine
      var tLetters = termText.replace(/\s/g, "");
      term.style.setProperty("--n", String(tLetters.length || 10));

      // ---- term: chars grouped per word in no-wrap wrappers ---------------
      term.textContent = "";
      term.appendChild(span("sr", termText));
      var tAnim = span("dc__anim"); tAnim.setAttribute("aria-hidden", "true");
      var chs = [];
      var tWords = splitWords(termText);
      tWords.forEach(function (w, wi) {
        var wrap = span("chw");
        w.trim().split("").forEach(function (c) {
          var s = span("ch", c);
          wrap.appendChild(s);
          chs.push(s);
        });
        tAnim.appendChild(wrap);
        if (wi < tWords.length - 1) tAnim.appendChild(document.createTextNode(" "));
      });
      term.appendChild(tAnim);

      // ---- sentence: words, with a char index map -------------------------
      plain.textContent = "";
      plain.appendChild(span("sr", plainText));
      var pAnim = span("dc__anim"); pAnim.setAttribute("aria-hidden", "true");
      var pWords = splitWords(plainText);
      var wds = [], charMap = [], pos = 0;
      pWords.forEach(function (w, i) {
        var s = span("wd", w);
        pAnim.appendChild(s);
        wds.push({ el: s, text: w, start: pos, marks: [] });
        for (var k = 0; k < w.length; k++) charMap.push(i);
        pos += w.length;
      });
      plain.appendChild(pAnim);

      // ---- where can the letters go? --------------------------------------
      // pairs: [{src: term char index, tgt: {word, at}}] in term-letter order
      var pairs = [];
      var mode = block.getAttribute("data-carry-mode") || "";
      var explicit = block.getAttribute("data-carry") || "";
      var tLow = tLetters.toLowerCase(), pLow = plainText.toLowerCase();

      if (mode === "initials" && expand) {
        // acronym: each term letter drops onto the initial of the next word
        // in the expansion line that starts with it (lowercase connectors
        // like "and" are skipped)
        var eText = expand.textContent;
        var eWords = splitWords(eText), ePos = 0, eIdx = 0;
        var eMarks = [];
        var eStarts = eWords.map(function (w) { var st = ePos; ePos += w.length; return st; });
        for (var li = 0; li < tLetters.length; li++) {
          for (; eIdx < eWords.length; eIdx++) {
            var first = eWords[eIdx].charAt(0);
            if (first === first.toLowerCase()) continue; // connector
            if (first.toLowerCase() === tLetters[li].toLowerCase()) {
              eMarks.push({ at: eStarts[eIdx], len: 1, cls: "tg", src: li });
              eIdx++;
              break;
            }
          }
        }
        if (eMarks.length) {
          expand.setAttribute("aria-label", eText);
          var tgs = wrapChars(expand, eText, eMarks, "tn");
          expand.classList.add("dc__host");
          eMarks.forEach(function (m, k) { pairs.push({ src: m.src, tgtEl: tgs[k] }); });
        }
      } else {
        var hit = null;
        if (explicit) {
          var at = pLow.indexOf(explicit.toLowerCase());
          if (at > -1) {
            // map each target letter to the first unused matching term letter
            var used = {};
            hit = { b: at, len: explicit.length, srcs: [] };
            for (var c = 0; c < explicit.length; c++) {
              var want = explicit[c].toLowerCase(), found = -1;
              for (var ti = 0; ti < tLow.length; ti++) if (!used[ti] && tLow[ti] === want) { found = ti; break; }
              if (found < 0) { hit = null; break; }
              used[found] = true; hit.srcs.push(found);
            }
          }
        } else {
          var l = lcs(tLow, pLow, 4);
          if (l) { hit = { b: l.b, len: l.len, srcs: [] }; for (var q = 0; q < l.len; q++) hit.srcs.push(l.a + q); }
        }
        if (hit) {
          for (var h = 0; h < hit.len; h++) {
            var gi = hit.b + h, w = wds[charMap[gi]];
            w.marks.push({ at: gi - w.start, len: 1, cls: "tg", src: hit.srcs[h] });
          }
          wds.forEach(function (w) {
            if (!w.marks.length) return;
            var tgs = wrapChars(w.el, w.text, w.marks, "tn");
            w.el.classList.add("wd--host");
            w.marks.forEach(function (m, k) { pairs.push({ src: m.src, tgtEl: tgs[k] }); });
          });
        }
      }

      // ---- windows ---------------------------------------------------------
      var carrySrc = {};
      pairs.forEach(function (p) { carrySrc[p.src] = p; });
      var falls = chs.filter(function (_, i) { return !carrySrc[i]; });
      var nF = falls.length, nC = pairs.length;

      // fall: staggered left to right with a little unevenness (capped well
      // under the spacing, so the word crumbles rather than shuffles)
      var f0 = prof.fall[0], f1 = prof.fall[1];
      var fSpan = (f1 - f0) * 0.32, fStep = (f1 - f0) * 0.82 / Math.max(nF - 1, 1);
      falls.forEach(function (s, i) {
        var t = nF > 1 ? i / (nF - 1) : 0;
        var jitter = rnd(bi * 101 + i) * fStep * 0.3;
        setWin(s, f0 + (f1 - f0) * (0.09 + 0.82 * t) + jitter, fSpan);
        s.style.setProperty("--dx", "0px");
        s.style.setProperty("--dy", prof.label != null ? "1.4em" : "1.2em");
        s.style.setProperty("--ds", "1");
      });

      // carry: strict reading order, no jitter; the target glyph is keyed to
      // the same window so it appears exactly as the letter arrives
      var c0 = prof.carry[0], c1 = prof.carry[1];
      var cSpan = (c1 - c0) * 0.32;
      pairs.forEach(function (p, i) {
        var t = nC > 1 ? i / (nC - 1) : 0;
        var w0 = c0 + (c1 - c0) * (0.09 + 0.82 * t);
        var src = chs[p.src];
        src.classList.add("ch--carry");
        setWin(src, w0, cSpan);
        setWin(p.tgtEl, w0, cSpan);
        p.srcEl = src;
      });

      // words: reading order, zero jitter
      var g0 = prof.words[0], g1 = prof.words[1];
      var gSpan = (g1 - g0) * 0.32;
      wds.forEach(function (w, i) {
        var t = wds.length > 1 ? i / (wds.length - 1) : 0;
        setWin(w.el, g0 + (g1 - g0) * (0.09 + 0.82 * t), gSpan);
      });
      if (expand && expand.classList.contains("dc__host")) setWin(expand, g0, gSpan);

      // return (rows): the term re-prints in place once the sentence is in
      if (prof.ret != null) chs.forEach(function (s) { s.style.setProperty("--r0", prof.ret.toFixed(2)); });

      // ghost label (peak): the term settles back as a caption on the rule
      if (prof.label != null) {
        var label = span("dc__label", termText);
        label.setAttribute("aria-hidden", "true");
        setWin(label, prof.label, 0.06);
        term.appendChild(label);
      }

      block._pairs = pairs;
      block.classList.add("is-split");
      if (pairs.length) measured.push(block);
    });

    // ---- measure the vectors --------------------------------------------
    // Source and target are read in the same frame with transforms and
    // opacity neutralised, so the delta is independent of scroll position.
    function measureAll() {
      measured.forEach(function (b) { b.classList.add("is-measuring"); });
      measured.forEach(function (b) {
        b._pairs.forEach(function (p) {
          var a = p.srcEl.getBoundingClientRect(), t = p.tgtEl.getBoundingClientRect();
          var fa = parseFloat(getComputedStyle(p.srcEl).fontSize) || 1;
          var ft = parseFloat(getComputedStyle(p.tgtEl).fontSize) || 1;
          p.srcEl.style.setProperty("--dx", (t.left - a.left).toFixed(1) + "px");
          p.srcEl.style.setProperty("--dy", (t.top - a.top).toFixed(1) + "px");
          p.srcEl.style.setProperty("--ds", (ft / fa).toFixed(3));
        });
      });
      measured.forEach(function (b) { b.classList.remove("is-measuring"); });
    }
    var ready = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    ready.then(function () { requestAnimationFrame(measureAll); });
    var lastW = innerWidth, rt;
    addEventListener("resize", function () {
      if (innerWidth === lastW) return; // height-only: the phone URL bar
      lastW = innerWidth;
      clearTimeout(rt); rt = setTimeout(measureAll, 150);
    });
  }

  /* ------------------------------------------------------- the wall schedule
     Nine rows land as cuts down the index, and the gaps between them shrink:
     the overwhelm is pacing, not scatter. The first window is negative so
     the stage is never empty while it slides into view (ground or greet).
     The heard-fragment lands one tick after its term: the word, then what
     someone said. */
  var WALL_ROWS = [-0.06, 0.10, 0.21, 0.30, 0.37, 0.42, 0.46, 0.49, 0.51];
  var WALL_CLOSE = 0.72;
  function setupWall() {
    var rows = document.querySelectorAll("#ch-words .wl__row");
    Array.prototype.forEach.call(rows, function (r, i) {
      var w = WALL_ROWS[Math.min(i, WALL_ROWS.length - 1)];
      r.style.setProperty("--w0", String(w));
      var g = r.querySelector(".wl__gloss");
      if (g) g.style.setProperty("--w0", (w + 0.025).toFixed(3));
    });
  }

  /* ------------------------------------------------------------- myths
     Each heard line is authored once in HTML; the struck twin that the wipe
     reveals is filled here, so a translation can never drift between them. */
  function setupMyths() {
    var heard = document.querySelectorAll(".myth__heard");
    Array.prototype.forEach.call(heard, function (h) {
      var plain = h.querySelector(".myth__plain");
      var struck = h.querySelector(".myth__struck");
      if (plain && struck) struck.textContent = plain.textContent;
    });
  }

  /* ------------------------------------------------------------- share
     Native share sheet where there is one, clipboard where there is not.
     No third-party code; the copy is one string for the Spanish build. */
  var SHARE_TEXT = "Insurance words in plain English, from a collision estimator in LA.";
  function setupShare() {
    var btn = document.querySelector("[data-share]");
    if (!btn) return;
    var label = btn.textContent;
    btn.addEventListener("click", function () {
      var url = location.href.split("#")[0];
      if (navigator.share) {
        navigator.share({ title: document.title, text: SHARE_TEXT, url: url }).catch(function () {});
        return;
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(function () {
          btn.textContent = "Link copied.";
          setTimeout(function () { btn.textContent = label; }, 2000);
        }).catch(function () {});
      }
    });
  }

  /* --------------------------------------------------------- deep links
     /translator/#supplement is the thing Angel texts a customer. The row
     lands at the bottom of the screen still intact, so the first swipe
     cracks it open. Instant, not smooth: the page sets scroll-behavior
     smooth, and a glide through eleven thousand pixels would play every
     act at speed. */
  function setupDeepLinks() {
    function go() {
      var id = location.hash.replace(/^#/, "");
      if (!id) return;
      var el = document.getElementById(id);
      if (!el || !el.hasAttribute("data-decode")) return;
      var pinned = el.closest(".sc-act--pinned");
      if (pinned) pinned.scrollIntoView({ block: "start", behavior: "instant" });
      else el.scrollIntoView({ block: "end", behavior: "instant" });
    }
    addEventListener("hashchange", go);
    requestAnimationFrame(go);
  }

  /* --------------------------------------------------------------- folio
     A printed running head: a full-width band on the ground of whatever
     chapter is under it, folio text on the spine. Off over the open and
     the colophon. */
  function setupFolio() {
    var folio = document.getElementById("folio");
    if (!folio) return;
    var no = folio.querySelector(".folio__no");
    var title = folio.querySelector(".folio__title");
    var chapters = document.querySelectorAll("[data-chapter]");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var c = e.target;
        no.textContent = c.getAttribute("data-chapter");
        title.textContent = c.getAttribute("data-chapter-title");
        folio.classList.add("is-on");
        folio.setAttribute("aria-hidden", "false");
        folio.classList.toggle("is-darkside", c.classList.contains("is-dark"));
        // the band takes the ground of the chapter's stage (or the chapter)
        var ground = c.querySelector("[data-sc-stage]") || c;
        var bg = getComputedStyle(ground).backgroundColor;
        if (/rgba\(\s*0,\s*0,\s*0,\s*0\s*\)|transparent/.test(bg)) bg = "";
        folio.style.setProperty("--folio-bg", bg);
      });
    }, { rootMargin: "0px 0px -94% 0px" });
    Array.prototype.forEach.call(chapters, function (c) { io.observe(c); });
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
     grade the real timeline. Lab only: it polls computed style every frame,
     which is a tax no visitor should pay. The lab runner adds ?verify. */
  function setupVerifyState() {
    var acts = [
      { act: document.getElementById("ch-words"), key: "stamped", on: false, last: "" },
      { act: document.getElementById("ch-translation"), key: "decode", on: false, last: "" },
    ].filter(function (a) { return a.act; });
    acts.forEach(function (a) { a.stage = a.act.querySelector("[data-sc-stage]"); });
    var wallWins = WALL_ROWS.concat([WALL_CLOSE]);
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
  var verifying = /[?&]verify/.test(location.search) || document.documentElement.hasAttribute("data-sc-verify");

  if (reduce) {
    // Fewer and gentler, not zero: everything renders settled and legible.
    var wallStage = document.querySelector("#ch-words [data-sc-stage]");
    var peakStage = document.querySelector("#ch-translation [data-sc-stage]");
    if (wallStage) wallStage.setAttribute("data-sc-verify-hold", "true");
    if (peakStage) peakStage.setAttribute("data-sc-verify-hold", "true");
    setupMyths();
    setupShare();
    setupDeepLinks();
    setupFolio();
    return;
  }

  setupMyths();
  setupShare();
  setupDecoder();
  setupWall();
  setupDeepLinks();
  setupFolio();
  if (verifying) setupVerifyState();
})();
