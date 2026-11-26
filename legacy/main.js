(function () {
  "use strict";

  /* ---- Territory briefings ------------------------------------------- */
  var ZONES = [
    { name: "Threat detection and incident response", body: "Spot intrusions early, triage the alerts that matter and coordinate the response before damage spreads.", tags: ["SIEM and log analytics", "Anomaly detection", "Automated playbooks"] },
    { name: "AI security copilot", body: "Build assistants that help analysts investigate faster, without leaking what they see.", tags: ["Alert summaries", "Prompt-injection guardrails", "Analyst-in-the-loop review"] },
    { name: "Application security", body: "Find and fix flaws before attackers do, from the pull request to production.", tags: ["Static and dynamic analysis", "Dependency risk", "Secure defaults"] },
    { name: "Web3 security", body: "Harden smart contracts, wallets and the bridges between chains.", tags: ["Contract auditing", "Transaction monitoring", "Wallet safety"] },
    { name: "Data privacy and protection", body: "Keep personal data minimal, encrypted and accountable, from collection to deletion.", tags: ["Consent and minimisation", "Encryption and key management", "Anonymisation"] },
    { name: "Gamification in cybersecurity", body: "Teach security through play, with challenges, simulations and capture-the-flag rounds.", tags: ["CTF platforms", "Phishing simulations", "Awareness games"] },
    { name: "Dark web monitoring", body: "Track leaked credentials and threat chatter before they turn into incidents.", tags: ["Leak detection", "Threat intelligence feeds", "Ethical crawling"] },
    { name: "Open innovation", body: "A security idea that fits no other zone belongs here.", tags: ["Hardware and IoT", "Policy tooling", "Anything defensible"] }
  ];

  var tabs = Array.prototype.slice.call(document.querySelectorAll(".zone[role=tab]"));
  var panel = document.getElementById("brief");
  function pad(n) { return (n < 10 ? "0" : "") + n; }

  function select(i, focus) {
    var z = ZONES[i];
    tabs.forEach(function (t, j) {
      var on = j === i;
      t.setAttribute("aria-selected", on ? "true" : "false");
      t.tabIndex = on ? 0 : -1;
    });
    panel.setAttribute("aria-labelledby", tabs[i].id);
    panel.querySelector('[data-brief="code"]').textContent = "Briefing // Z-" + pad(i + 1);
    panel.querySelector('[data-brief="count"]').textContent = pad(i + 1) + " of " + pad(ZONES.length);
    panel.querySelector('[data-brief="name"]').textContent = z.name;
    panel.querySelector('[data-brief="body"]').textContent = z.body;
    var ul = panel.querySelector('[data-brief="tags"]');
    ul.textContent = "";
    z.tags.forEach(function (tag) { var li = document.createElement("li"); li.className = "tag"; li.textContent = tag; ul.appendChild(li); });
    panel.classList.remove("is-swapping"); void panel.offsetWidth; panel.classList.add("is-swapping");
    if (focus) tabs[i].focus();
  }

  tabs.forEach(function (t, i) {
    t.addEventListener("click", function () { select(i, false); });
    t.addEventListener("keydown", function (e) {
      var n = tabs.length, k = e.key, next = null;
      if (k === "ArrowRight" || k === "ArrowDown") next = (i + 1) % n;
      else if (k === "ArrowLeft" || k === "ArrowUp") next = (i - 1 + n) % n;
      else if (k === "Home") next = 0;
      else if (k === "End") next = n - 1;
      if (next !== null) { e.preventDefault(); select(next, true); }
    });
  });

  /* ---- Settle reveal: below-fold content, animate once ---------------- */
  var reveal = document.querySelectorAll("[data-reveal]");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!("IntersectionObserver" in window) || reduce) {
    reveal.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    reveal.forEach(function (el) { io.observe(el); });
  }

  /* ---- Header: mark the section in view ------------------------------- */
  var links = Array.prototype.slice.call(document.querySelectorAll(".nav a"));
  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) { a.setAttribute("aria-current", a.getAttribute("href") === "#" + en.target.id ? "true" : "false"); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    links.forEach(function (a) { var s = document.querySelector(a.getAttribute("href")); if (s) spy.observe(s); });
  }

  /* ---- Registration preview: sends nothing ---------------------------- */
  var form = document.querySelector(".reg-form");
  var notice = document.querySelector("[data-notice]");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var bad = form.querySelector(":invalid");
      notice.classList.add("is-shown");
      if (bad) {
        notice.setAttribute("role", "alert");
        notice.innerHTML = "<span><strong>Check the form.</strong> Fill in every required field and accept the Code of Conduct.</span>";
        bad.focus();
        return;
      }
      notice.setAttribute("role", "status");
      notice.innerHTML = "<span><strong>Registration is not open yet.</strong> Nothing was sent. Register again when the 2027 dates are announced.</span>";
    });
  }

  /* ---- Theme: g100 default, g10 light --------------------------------- */
  var btn = document.querySelector("[data-theme-toggle]");
  var label = document.querySelector("[data-theme-label]");
  var root = document.documentElement;
  function sync() { label.textContent = root.dataset.theme === "g10" ? "Dark theme" : "Light theme"; }
  if (btn) {
    sync();
    btn.addEventListener("click", function () {
      if (root.dataset.theme === "g10") { delete root.dataset.theme; try { localStorage.removeItem("sbx-theme"); } catch (e) {} }
      else { root.dataset.theme = "g10"; try { localStorage.setItem("sbx-theme", "g10"); } catch (e) {} }
      sync();
    });
  }
})();
