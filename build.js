/**
 * build.js — turns articles/*.md into styled HTML.
 *
 * Reads every Markdown file in ./articles, parses its front matter,
 * renders the body to HTML, and writes:
 *   - blog/<slug>.html      one page per article
 *   - blog/index.html       the article listing
 *   - articles.json         a manifest the homepage reads for "Latest writing"
 *
 * Usage:  npm run build        (one-off)
 *         npm run watch        (rebuild on change)
 *
 * Front matter each article should have:
 *   ---
 *   title: My article title
 *   date: 2026-08-04
 *   excerpt: One-sentence summary shown in cards and search results.
 *   tags: [AEM, AI]
 *   draft: false        # optional — true hides it from the build
 *   ---
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "marked";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = __dirname;
const ARTICLES_DIR = path.join(ROOT, "articles");
const BLOG_DIR = path.join(ROOT, "blog");
const TEMPLATES_DIR = path.join(ROOT, "templates");

// ▼ EDIT: used to build the "Share on LinkedIn" link. Set to your live site root. ▼
const SITE_URL = "https://aswini-lakshminarayanan.github.io/portfolio";

const WORDS_PER_MIN = 220;

function slugify(str) {
  return String(str)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function formatDate(d) {
  const date = new Date(d);
  if (isNaN(date)) return String(d);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function readTemplate(name) {
  return fs.readFileSync(path.join(TEMPLATES_DIR, name), "utf8");
}

function fill(template, data) {
  return template.replace(/{{\s*(\w+)\s*}}/g, (_, key) =>
    key in data ? data[key] : ""
  );
}

function build() {
  if (!fs.existsSync(ARTICLES_DIR)) {
    console.error("No articles/ directory found.");
    process.exit(1);
  }
  fs.mkdirSync(BLOG_DIR, { recursive: true });

  // Clean previously generated pages so deleted/renamed articles don't linger.
  for (const f of fs.readdirSync(BLOG_DIR)) {
    if (f.endsWith(".html")) fs.rmSync(path.join(BLOG_DIR, f));
  }

  const files = fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"));

  const articleTpl = readTemplate("article.html");
  const indexTpl = readTemplate("blog-index.html");

  const posts = [];

  for (const file of files) {
    const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), "utf8");
    const { data, content } = matter(raw);

    if (data.draft === true) {
      console.log(`  skip (draft): ${file}`);
      continue;
    }

    const title = data.title || path.basename(file, ".md");
    const slug = data.slug || slugify(title);
    const date = data.date || new Date().toISOString().slice(0, 10);
    const tags = Array.isArray(data.tags) ? data.tags : [];
    const words = content.trim().split(/\s+/).length;
    const readingTime = Math.max(1, Math.round(words / WORDS_PER_MIN));
    const bodyHTML = marked.parse(content);
    const excerpt =
      data.excerpt ||
      content.replace(/[#>*`_\-]/g, "").trim().slice(0, 155).replace(/\s+\S*$/, "") + "…";

    const shareUrl =
      "https://www.linkedin.com/sharing/share-offsite/?url=" +
      encodeURIComponent(`${SITE_URL}/blog/${slug}.html`);

    const tagsHTML = tags.map((t) => `<span class="chip">${esc(t)}</span>`).join("");

    const html = fill(articleTpl, {
      title: esc(title),
      excerpt: esc(excerpt),
      dateLabel: esc(formatDate(date)),
      readingTime: String(readingTime),
      tagsHTML,
      content: bodyHTML,
      shareUrl: esc(shareUrl),
    });

    fs.writeFileSync(path.join(BLOG_DIR, `${slug}.html`), html);
    console.log(`  built: blog/${slug}.html`);

    posts.push({
      title,
      slug,
      date,
      dateLabel: formatDate(date),
      excerpt,
      tags,
      readingTime,
    });
  }

  // newest first
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  // blog/index.html listing
  const listHTML = posts.length
    ? posts
        .map(
          (p) => `
        <a class="blog-row" href="${esc(p.slug)}.html">
          <span class="when">${esc(p.dateLabel)} · ${p.readingTime} min read</span>
          <h3>${esc(p.title)}</h3>
          <p>${esc(p.excerpt)}</p>
        </a>`
        )
        .join("\n")
    : '<p class="muted">No articles yet. Add a Markdown file to <code>articles/</code> and rebuild.</p>';

  fs.writeFileSync(path.join(BLOG_DIR, "index.html"), fill(indexTpl, { list: listHTML }));
  console.log(`  built: blog/index.html`);

  // articles.json manifest for the homepage
  fs.writeFileSync(path.join(ROOT, "articles.json"), JSON.stringify(posts, null, 2));
  console.log(`  built: articles.json (${posts.length} post${posts.length === 1 ? "" : "s"})`);
}

console.log("Building site…");
build();

if (process.argv.includes("--watch")) {
  console.log("Watching articles/ and templates/ for changes… (Ctrl+C to stop)");
  let timer = null;
  const rebuild = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      try { build(); } catch (e) { console.error(e.message); }
    }, 120);
  };
  fs.watch(ARTICLES_DIR, rebuild);
  fs.watch(TEMPLATES_DIR, rebuild);
}
