# Bitcoin Friesland — bitcoinfriesland.com

![Languages: NL · EN · FY](https://img.shields.io/badge/languages-NL%20%C2%B7%20EN%20%C2%B7%20FY-0066cc)
![Stack: static HTML/CSS/JS](https://img.shields.io/badge/stack-static%20HTML%2FCSS%2FJS-f97316)
![Build step: none](https://img.shields.io/badge/build%20step-none-4ade80)
![PRs welcome](https://img.shields.io/badge/PRs-welcome-ea384c)

The official website of **Bitcoin Friesland / Bitcoin Fryslân** — a volunteer community promoting Bitcoin adoption and education in the Dutch province of Friesland.

**Live site:** https://bitcoinfriesland.com · **Community:** [Telegram](https://t.me/bitcoinfriesland) · **Contact:** info@bitcoinfriesland.com

## 🇳🇱 Kort samengevat
Statische website (HTML/CSS/JS) met taalpariteit in `nl/`, `en/` en `fy/`. Geen build-stap. Bijdragen via branch + pull request op `main`. Houd alle drie talen synchroon. Richtlijnen: `CONTRIBUTING.md` (mensen) en `AGENTS.md` (AI-assistenten).

## 🇬🇧 In short
Static HTML/CSS/JS site with language parity across `nl/`, `en/` and `fy/`. No build step. Contribute via branch + pull request against `main`. Keep all three languages in sync. Guidelines: `CONTRIBUTING.md` (humans) and `AGENTS.md` (AI assistants).

## Frysk yn it koart
Statyske side (HTML/CSS/JS) mei taalpariteit yn `nl/`, `en/` en `fy/`. Gjin build-stap. Bydrage fia branch + pull request nei `main`. Hâld alle trije talen lykmjittich. Rjochtlinen: `CONTRIBUTING.md` (minsken) en `AGENTS.md` (AI-assistenten).

---

## Documentation map

| File | Audience | Purpose |
|---|---|---|
| `README.md` | Everyone | You are here — overview, structure, how to run and edit |
| `CONTRIBUTING.md` | **Humans** | Branch/PR workflow, checklists, image & styling rules |
| `AGENTS.md` | **AI assistants** | Canonical rules for AI coding agents (read first) |
| `AI_CONTEXT.md` | AI assistants | Deep site internals: runtime behavior, content patterns, scripts |
| `.github/copilot-instructions.md` | GitHub Copilot | Auto-loaded Copilot context (short version of AGENTS.md) |
| `CHANGES.md` | Everyone | Plain-language changelog of every improvement round |
| `llms.txt` | LLM crawlers | Plain-language site summary (keep updated!) |

---

## Contents

- [Tech stack](#tech-stack)
- [Repository structure](#repository-structure)
- [Running & editing locally](#running--editing-locally)
- [The three-language rule](#the-three-language-rule)
- [Styling system](#styling-system)
- [Runtime behavior (JS)](#runtime-behavior-js)
- [SEO, social & LLM assets](#seo-social--llm-assets)
- [Maintenance scripts](#maintenance-scripts)
- [Deployment](#deployment)
- [Contributing](#contributing)

## Tech stack

Deliberately boring — no build step, no framework, no dependencies:

| Layer | What we use |
|---|---|
| Markup | Hand-written HTML5, one file per page per language |
| Styling | `assets/styles.css` (compiled Tailwind output) + `assets/enhancements.css` (custom polish layer) |
| Behavior | `assets/main.js` (vanilla JS, no bundler) |
| Fonts | Inter via Google Fonts |
| Images | `<picture>` with WebP + fallback, explicit width/height |

## Repository structure

```
├── index.html                # Root redirect → nl/
├── 404.html                  # Friendly not-found page (trilingual links)
├── nl/ en/ fy/               # Language folders — same pages in each:
│   ├── index.html            #   Home
│   ├── meetings.html         #   Meetups & events
│   ├── map.html              #   Bitcoin map (accepting businesses)
│   ├── consumers.html        #   Getting started (consumers)
│   ├── business.html         #   For businesses
│   ├── links.html            #   Resources & links
│   ├── about.html            #   About the community
│   └── treasure-hunt.html    #   Treasure hunt
├── nl/blog/                  # Dutch blog (+ HOW-TO-ADD-A-POST.md, RSS)
├── nl/evenementen/           # Dedicated Dutch event pages
├── assets/
│   ├── styles.css            # Compiled Tailwind — treat as read-only
│   ├── enhancements.css      # Custom, hand-written polish layer (edit here)
│   ├── main.js               # All runtime behavior
│   └── images/               # Logos, flags, photos (WebP + fallback variants)
├── robots.txt / sitemap.xml  # Crawler directives & index
├── llms.txt                  # Plain-language site summary for AI assistants
├── AGENTS.md                 # Canonical rules for AI coding agents
├── AI_CONTEXT.md             # Deep site internals for AI assistants
├── CONTRIBUTING.md           # Contribution guide for humans
├── CHANGES.md                # Plain-language changelog ("rounds")
├── .github/
│   └── copilot-instructions.md  # Auto-loaded GitHub Copilot context
└── maintain-*.cjs / translations-*.cjs  # Node maintenance scripts (no deps)
```

## Running & editing locally

No build step. Either open the HTML files directly in a browser, or serve the folder for correct relative paths:

```sh
npx serve .        # or: python3 -m http.server
```

Then visit `http://localhost:3000/nl/` (or `/en/`, `/fy/`).

When adding a page, **copy an existing page as a template** so the nav, footer and risk warning stay intact, then translate the content.

## The three-language rule

This is the most important convention in the repo:

1. Every content change lands in **all three languages** — `nl/`, `en/`, `fy/` — with identical structure.
2. Navigation, hero blocks, CTA buttons and footers must stay structurally identical across languages.
3. The footer must always include the **risk warning block** (NL/EN/FY) and the GitHub link. Never edit the footer on one page only — update all pages together (`maintain-footer.cjs` exists for this).
4. Documentation and code comments are written in **English**, unless a user explicitly asks otherwise.

## Styling system

- **`assets/styles.css`** is compiled Tailwind output. Do not hand-edit it, and do not rely on Tailwind classes that are not already used somewhere on the site — unused classes do not exist in the compiled file.
- **`assets/enhancements.css`** is the hand-written layer loaded after it. All custom styling goes here, at the bottom, in a commented block. It is additive only: removing the file + its `<link>` reverts the site to the base look.
- Brand colors: `--bf-blue: #0066cc` (Frisian flag blue), `--bf-orange: #f97316` (Bitcoin orange), `--bf-red: #ea384c`.
- New, self-contained sections should use **prefixed custom classes** (e.g. `.nr-promo-*`) in `enhancements.css` so they render identically everywhere without depending on the compiled Tailwind set.

## Runtime behavior (JS)

All behavior lives in `assets/main.js`: mobile menu, language dropdown (with outside-click close and keyboard support), FAQ accordion, sticky-header shadow, sortable tables, and copy-to-clipboard helpers. Keep new behavior here, dependency-free.

## SEO, social & LLM assets

Already in place — keep them working when adding pages:

- `hreflang` links between the three language versions of every page
- Canonical URL, Open Graph + Twitter cards, geo tags, and JSON-LD (`Organization`, `FAQPage`, `Event`) per page
- `sitemap.xml` — update when adding/removing public pages
- `robots.txt` — crawl directives
- `llms.txt` — plain-language summary that AI assistants read; update it when events, offers or key pages change
- `404.html` — branded not-found page

## Maintenance scripts

Node scripts, no dependencies:

| Script | Purpose |
|---|---|
| `node maintain-pages.cjs consumer\|business\|all` | Tweaks consumer/business pages (terminology, links, phrasing) |
| `node maintain-footer.cjs text\|warning\|all` | Updates footer copyright/GitHub link and risk warnings on every page |
| `node translations-restore.cjs` | Restores EN/FY translations for map strings |
| `node translations-frisian.cjs` | Applies extra Frisian translations to `fy/map.html` |

## Deployment

The site is static and served as-is. **Pushing to `main` publishes the site.** Because of that, all changes go through a branch + pull request (see [CONTRIBUTING.md](CONTRIBUTING.md)); `main` is live.

## Contributing

This repository is maintained by **3 humans and several AI coding agents** — please read the right guide before your first change:

- **Humans:** [CONTRIBUTING.md](CONTRIBUTING.md)
- **AI assistants:** [AGENTS.md](AGENTS.md) (rules) + [AI_CONTEXT.md](AI_CONTEXT.md) (site internals)
- **Changelog:** user-facing and structural changes are recorded in [CHANGES.md](CHANGES.md) in plain language ("rounds")

Questions or ideas? Reach the community on [Telegram](https://t.me/bitcoinfriesland).

---

Made with 🧡 in Friesland.
