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
| `MAINTENANCE.md` | Maintainers | Sources of truth, verification, script limitations and safe handoff |
| `AGENTS.md` | **AI assistants** | Canonical rules for AI coding agents (read first) |
| `AI_CONTEXT.md` | AI assistants | Deep site internals: runtime behavior, content patterns, scripts |
| `.github/copilot-instructions.md` | GitHub Copilot | Auto-loaded Copilot context (short version of AGENTS.md) |
| `DESIGN.md` | Everyone who touches the look | The sticker design system: tokens, components, widgets, rules |
| `CHANGES.md` | Everyone | Plain-language changelog of every improvement round |
| `BACKLOG.md` | Everyone | Ideas parked for later |
| `llms.txt` | LLM agents | v2-compatible site guide with links to clean Markdown content |

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
| Fonts | Bricolage Grotesque (headings) + Inter (body) via Google Fonts |
| Images | `<picture>` with WebP + fallback, explicit width/height |
| Hosting | Cloudflare Pages (clean URLs, `_headers`, one Pages Function for the forms) |

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
│   ├── support.html          #   Supporters (in preparation), waitlist & feedback
│   ├── what-is-bitcoin.html  #   Beginner explanation + glossary
│   ├── sats-calculator.html  #   Sats ↔ EUR/USD calculator
│   └── treasure-hunt.html    #   Treasure hunt
├── nl/blog/                  # Dutch blog (+ HOW-TO-ADD-A-POST.md, RSS)
├── nl/evenementen/           # Dedicated Dutch event pages
├── assets/
│   ├── styles.css            # Compiled Tailwind — treat as read-only
│   ├── enhancements.css      # Custom, hand-written polish layer (edit here)
│   ├── main.js               # All runtime behavior
│   └── images/               # Logos, flags, photos (WebP + fallback variants)
├── robots.txt / sitemap.xml  # Crawler directives & index
├── functions/
│   ├── [lang]/support.js     # Receives the support forms and forwards them to Telegram
│   └── googleb3d0f0d3587596d4.html.js  # Google Search Console verification (keep!)
├── site.webmanifest          # App name and icons for phones
├── _headers                  # Security + caching headers (Cloudflare Pages)
├── llms.txt / llms-full.txt  # LLM guide; core pages also have .html.md versions (llms-full.txt is generated)
├── BingSiteAuth.xml          # Bing Webmaster verification (keep!)
├── 0655de…bdf2.txt           # IndexNow key (keep!)
├── maintain-llms-full.cjs    # Regenerates llms-full.txt from the .html.md files
├── AGENTS.md                 # Canonical rules for AI coding agents
├── AI_CONTEXT.md             # Deep site internals for AI assistants
├── CONTRIBUTING.md           # Contribution guide for humans
├── DESIGN.md                 # Sticker design system rulebook
├── CHANGES.md                # Plain-language changelog ("rounds")
├── BACKLOG.md                # Ideas for later
├── .github/
│   └── copilot-instructions.md  # Auto-loaded GitHub Copilot context
└── maintain-*.cjs / translations-*.cjs  # Node maintenance scripts (no deps)
```

## Running & editing locally

No build step. Serve the repository root so root-relative links work correctly:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Then visit `http://localhost:8000/nl/` (or `/en/`, `/fy/`). Stop the server with Ctrl+C. Alternatively, use `npx serve .` and open the address printed by that server. Node.js 20+ is needed for the audit and regression tests, not for serving the site.

When adding a page, **copy an existing page as a template** so the nav, footer and risk warning stay intact, then translate the content.

## The three-language rule

This is the most important convention in the repo:

1. Every content change lands in **all three languages** — `nl/`, `en/`, `fy/` — with identical structure.
2. Navigation, hero blocks, CTA buttons and footers must stay structurally identical across languages.
3. The footer must always include the **risk warning block** (NL/EN/FY) and the credit line (Noderunners badge, block height, StudioFab.nl credit). The GitHub source link lives on the About pages. Never edit the footer on one page only — update all pages together. See [maintenance limitations](MAINTENANCE.md#legacy-editing-scripts) before using the legacy footer script.
4. Documentation and code comments are written in **English**, unless a user explicitly asks otherwise.

## Styling system

- **`assets/styles.css`** is compiled Tailwind output. Do not hand-edit it, and do not rely on Tailwind classes that are not already used somewhere on the site — unused classes do not exist in the compiled file.
- **`assets/enhancements.css`** is the hand-written layer loaded after it. All custom styling goes here. The current look is the **sticker design system** (ink outlines, hard shadows, flat brand colours), a block at the bottom scoped to `body.st`.
- **Read [DESIGN.md](DESIGN.md) before changing anything visual.** It lists the tokens (`--st-ink`, `--st-orange`, `--st-blue`, `--st-yellow`, ...), every `st-*` component, the contrast rules and the cache-busting routine.
- No emojis on the site; use inline SVG line icons (`class="st-icon"`).

## Runtime behavior (JS)

All behavior lives in `assets/main.js`: mobile menu, language dropdown (with outside-click close and keyboard support), FAQ accordion, sticky-header shadow, sortable tables, copy-to-clipboard helpers, form feedback, the sats calculator, the live block height in the footer, the quote of the day and the Nostr follow card. Live widgets use public APIs with a fallback and degrade silently when offline (details in [DESIGN.md](DESIGN.md#5-live-widgets-assetsmainjs)). Keep new behavior here, dependency-free.

## SEO, social & LLM assets

Already in place — keep them working when adding pages:

- `hreflang` links between the three language versions of every translated page
- Canonical URL, Open Graph + Twitter cards, crawler preview controls, and page-appropriate JSON-LD (`Organization`, `BlogPosting`, `FAQPage`, `Event`)
- `sitemap.xml` — update when adding/removing public pages
- `robots.txt` — shared crawl directives that apply consistently to search crawlers
- `llms.txt` — v2-compatible guide that AI agents can use to discover the clean Markdown versions of core pages
- `*.html.md` — concise, navigation-free Markdown counterparts for the most important NL/EN/FY pages
- `llms-full.txt` — all Markdown summaries in one file; regenerate with `node maintain-llms-full.cjs` after editing any `.html.md`
- `_headers` — security and caching headers; serves `llms*.txt` and `.md` with the right type
- `404.html` — branded not-found page

Run `node audit-site.cjs` before a PR. It checks essential metadata, social cards, JSON-LD syntax, image attributes, local links, language parity, sitemap canonicals, asset versions and LLM discovery links.

Run `node --test audit-site.test.cjs maintenance.test.cjs forms-function.test.cjs` for the dependency-free regression suite. See [MAINTENANCE.md](MAINTENANCE.md#verification) for the full checks and optional browser tests; these checks do not replace browser testing.

## Maintenance scripts

Node scripts, no dependencies:

| Script | Purpose |
|---|---|
| `node audit-site.cjs` | Read-only SEO, social metadata, sitemap and LLM discoverability audit |
| `node maintain-pages.cjs consumer\|business\|all` | Tweaks consumer/business pages (terminology, links, phrasing) |
| `node maintain-footer.cjs text\|warning\|all` | Legacy footer replacements: text targets map pages; warning scans all language HTML |
| `node translations-restore.cjs` | Restores EN/FY translations for map strings |
| `node translations-frisian.cjs` | Applies extra Frisian translations to `fy/map.html` |

Editing scripts are historical text replacements, not a build pipeline. Run them from the repository root, only for a relevant change, and inspect the diff. Details: [MAINTENANCE.md](MAINTENANCE.md).

## Deployment

The site is static and served as-is. **Pushing to `main` publishes the site.** Because of that, all changes go through a branch + pull request (see [CONTRIBUTING.md](CONTRIBUTING.md)); `main` is live.

Hosting is **Cloudflare Pages**. Every pushed branch gets its own preview at `https://<branch-name>.bitcoinfriesland-com.pages.dev` (the branch name is shortened by Cloudflare); the link also appears as a check on the pull request. Follow the [preview handoff instructions](MAINTENANCE.md#branch-and-deployment-handoff); a pushed branch is not proof of deployment.

**Search engines.** The site is verified in Google Search Console (HTML file served by `functions/googleb3d0f0d3587596d4.html.js`) and in Bing Webmaster Tools (`BingSiteAuth.xml` plus the `msvalidate.01` meta tag on the homepages). Both have the sitemap. Removing any of these files un-verifies the site. After a deploy with new or changed pages, ping IndexNow as described in [MAINTENANCE.md](MAINTENANCE.md#search-and-ai-visibility).

The support forms post to a Pages Function (`functions/[lang]/support.js`) that forwards each request to a private Telegram chat. It needs `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` in Cloudflare Pages > Settings > Variables and Secrets; until they are set, visitors get a polite error page with the e-mail address instead of a fake confirmation.

## Contributing

This repository is maintained by **3 humans and several AI coding agents** — please read the right guide before your first change:

- **Humans:** [CONTRIBUTING.md](CONTRIBUTING.md)
- **AI assistants:** [AGENTS.md](AGENTS.md) (rules) + [AI_CONTEXT.md](AI_CONTEXT.md) (site internals)
- **Changelog:** user-facing and structural changes are recorded in [CHANGES.md](CHANGES.md) in plain language ("rounds")

Questions or ideas? Reach the community on [Telegram](https://t.me/bitcoinfriesland).

---

Made with 🧡 in Friesland.
