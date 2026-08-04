/* Homepage behaviour: mobile nav, scroll reveal, latest posts feed. */
(function () {
  "use strict";

  // Current year in footer
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Reveal-on-scroll
  var revealables = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealables.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    revealables.forEach(function (el) { io.observe(el); });
  } else {
    revealables.forEach(function (el) { el.classList.add("in"); });
  }

  // Latest posts feed (homepage only)
  var mount = document.getElementById("latest-posts");
  if (mount) {
    fetch("articles.json", { cache: "no-cache" })
      .then(function (r) { return r.ok ? r.json() : []; })
      .then(function (posts) {
        if (!Array.isArray(posts) || posts.length === 0) {
          mount.innerHTML = '<p class="posts-empty">No articles yet — your first post will appear here.</p>';
          return;
        }
        var latest = posts.slice(0, 3);
        mount.innerHTML = latest.map(cardHTML).join("");
      })
      .catch(function () {
        mount.innerHTML = '<p class="posts-empty">Run <code>npm run build</code> to generate your articles.</p>';
      });
  }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function cardHTML(p) {
    var tags = (p.tags || []).slice(0, 3).map(function (t) {
      return '<span class="chip">' + esc(t) + "</span>";
    }).join("");
    return (
      '<a class="post-card" href="blog/' + esc(p.slug) + '.html">' +
      '<span class="when">' + esc(p.dateLabel || "") + "</span>" +
      "<h3>" + esc(p.title) + "</h3>" +
      "<p>" + esc(p.excerpt || "") + "</p>" +
      (tags ? '<div class="tags">' + tags + "</div>" : "") +
      '<span class="read">Read →</span>' +
      "</a>"
    );
  }
})();
