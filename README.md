# Personal Portfolio & Writing Site

A fast, static portfolio + blog. Write articles in Markdown; a small build script
turns them into styled pages. No framework, no database — just files you can host
free on GitHub Pages.

```
portfolio/
├── index.html              ← your home page (edit the text marked "▼ EDIT")
├── articles/               ← write your posts here, one Markdown file each
│   └── *.md
├── blog/                   ← GENERATED — article pages + the /blog listing
├── articles.json           ← GENERATED — feeds "Latest writing" on the home page
├── templates/              ← HTML shells the build fills in
├── assets/css/style.css    ← all styling (brand colors near the top)
├── assets/js/main.js       ← nav, scroll effects, latest-posts feed
├── build.js                ← the Markdown → HTML build
└── serve.js                ← local preview server
```

## Quick start

```bash
cd portfolio
npm install        # once
npm run serve      # builds + serves at http://localhost:8080
```

Other commands:

```bash
npm run build      # build once (writes blog/ and articles.json)
npm run watch      # rebuild automatically while you write
```

## Writing an article

1. Create a file in `articles/`, e.g. `articles/my-first-post.md`.
2. Start it with front matter, then write in Markdown:

   ```markdown
   ---
   title: My first post
   date: 2026-08-04
   excerpt: One sentence shown in cards and previews.
   tags: [Product, AI]
   draft: false        # set true to keep it out of the build
   ---

   Your content here. **Bold**, _italics_, lists, `code`, > quotes, and images
   all work.
   ```

3. Run `npm run build` (or keep `npm run watch` running). The post appears at
   `/blog/my-first-post.html`, in the `/blog` list, and in "Latest writing" on
   the home page.

Each article page includes a **Share on LinkedIn** button.

## Make it yours

- **Text & links:** open `index.html` and edit everywhere marked `▼ EDIT`
  (name, headline, about, experience, contact, social links).
- **Brand color:** change `--accent` at the top of `assets/css/style.css`.
  Dark mode is automatic and follows the visitor's system setting.
- **Name in blog/article headers:** these come from `templates/*.html` — replace
  "Your Name" / "YourName" there, then rebuild.
- **Site URL** (for the LinkedIn share link): set `SITE_URL` near the top of
  `build.js`.
- **Contact form:** the form posts to [Formspree](https://formspree.io) — create
  a free form and paste its ID into the `action` in `index.html`, or delete the
  form and keep just the email link.

## Deploy to GitHub Pages

1. Create a repo (e.g. `portfolio`) and push this folder to it.
2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Push to `main`. The included workflow (`.github/workflows/deploy.yml`) builds
   and publishes automatically. Your site will be at
   `https://<your-username>.github.io/<repo>/`.

> Tip: update `SITE_URL` in `build.js` to that address so LinkedIn shares point
> to the right place.
