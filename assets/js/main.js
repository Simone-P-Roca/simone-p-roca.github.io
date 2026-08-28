(function () {
  var nav = document.querySelector(".nav");
  var hero = document.querySelector(".hero");
  if (!nav || !hero) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        nav.classList.toggle("is-scrolled", !entry.isIntersecting);
      });
    },
    { rootMargin: "-" + ((nav.offsetHeight || 64) + 220) + "px 0px 0px 0px", threshold: 0 }
  );
  observer.observe(hero);
})();

(function () {
  var root = document.documentElement;
  var btn = document.querySelector(".theme-toggle");
  if (!btn) return;

  var STORAGE_KEY = "theme";
  var mq = window.matchMedia("(prefers-color-scheme: dark)");

  function sync() {
    var isDark = root.getAttribute("data-theme") === "dark";
    btn.setAttribute("aria-pressed", String(isDark));
  }
  sync();

  btn.addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (e) {}
    sync();
  });

  mq.addEventListener("change", function (e) {
    var saved;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch (err) {}
    if (!saved) {
      root.setAttribute("data-theme", e.matches ? "dark" : "light");
      sync();
    }
  });
})();

(function () {
  var btn = document.querySelector(".updates-more");
  var list = document.querySelector(".updates-list");
  var word = document.querySelector(".updates-more__word");
  if (!btn || !list || !word) return;

  var hiddenItems = list.querySelectorAll(".updates-item[hidden]");

  function expand() {
    hiddenItems.forEach(function (item) {
      item.hidden = false;
    });
    btn.setAttribute("aria-expanded", "true");
    word.textContent = "fewer";
  }

  if (!hiddenItems.length) {
    btn.remove();
    return;
  }

  if (window.location.hash) {
    try {
      var target = document.querySelector(window.location.hash);
      if (target && target.hasAttribute("hidden")) {
        expand();
        target.scrollIntoView();
      }
    } catch (e) {}
  }

  btn.addEventListener("click", function () {
    var expanded = btn.getAttribute("aria-expanded") === "true";
    hiddenItems.forEach(function (item) {
      item.hidden = expanded;
    });
    btn.setAttribute("aria-expanded", String(!expanded));
    word.textContent = expanded ? "earlier" : "fewer";
  });
})();

(function () {
  var KEY = "cookie-consent";
  try {
    if (localStorage.getItem(KEY)) return;
  } catch (e) {
    return;
  }

  var bar = document.createElement("div");
  bar.className = "cookie-banner";
  bar.innerHTML =
    '<p>This site uses local storage only, to remember your theme preference. No cookies, no tracking. See the <a href="/privacy-policy.html">Privacy Policy</a>.</p>' +
    '<button type="button">Got it</button>';
  document.body.appendChild(bar);

  bar.querySelector("button").addEventListener("click", function () {
    try {
      localStorage.setItem(KEY, "1");
    } catch (e) {}
    bar.remove();
  });
})();

(function () {
  var input = document.getElementById("bib-filter");
  var count = document.getElementById("bib-count");
  if (!input || !count) return;

  var entries = Array.prototype.slice.call(document.querySelectorAll(".bib-entry"));
  var sections = Array.prototype.slice.call(document.querySelectorAll(".cv-section"));
  var total = entries.length;

  function apply() {
    var q = input.value.trim().toLowerCase();
    var shown = 0;
    entries.forEach(function (el) {
      var match = !q || el.textContent.toLowerCase().indexOf(q) !== -1;
      el.hidden = !match;
      if (match) shown++;
    });
    sections.forEach(function (sec) {
      var any = sec.querySelector(".bib-entry:not([hidden])");
      sec.hidden = !!q && !any;
      if (q && any) sec.open = true;
    });
    if (q) {
      count.textContent = shown + " of " + total + " entries";
    } else {
      count.textContent = "";
    }
  }

  input.addEventListener("input", apply);
})();
