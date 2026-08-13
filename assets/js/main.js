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
