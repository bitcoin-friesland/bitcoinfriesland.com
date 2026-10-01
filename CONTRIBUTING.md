# Contributing to bitcoinfriesland.com

Thanks for helping build the Bitcoin Friesland website. This repo is worked on by **3 humans and several AI coding agents**, and `main` publishes the live site — so we keep a strict but simple workflow.

> 🤖 AI assistants: follow [AGENTS.md](AGENTS.md) + [AI_CONTEXT.md](AI_CONTEXT.md) instead — they contain machine-oriented rules and site internals.

## The golden rules

1. **Every change lands in all three languages** (`nl/`, `en/`, `fy/`) with identical structure.
2. **`main` is live.** All changes go through a branch + pull request.
3. **The footer is sacred**: keep the risk warning block and the credit line (Noderunners badge, block height, StudioFab.nl credit) across all languages and pages. The GitHub source link lives on the About pages. Review the [maintenance script limitations](MAINTENANCE.md#legacy-editing-scripts) before running bulk updates.
4. **Log your work**: add a short, plain-language entry to [CHANGES.md](CHANGES.md) under the latest round (or start a new one).

## Workflow

1. Inspect existing branches and open PRs before starting. Normally create a branch from `main`; if continuing unmerged work, explicitly identify the parent branch and use it as the PR base so unrelated changes do not enter the review:
   - `feature/<short-description>` for new content/sections
   - `fix/<short-description>` for fixes
   - `docs/<short-description>` for documentation
2. Make your changes (see checklists below).
3. Test locally — no build step needed:
   ```sh
   node audit-site.cjs
   node --test audit-site.test.cjs maintenance.test.cjs
   node --check assets/main.js
   git diff --check
   python3 -m http.server 8000 --bind 127.0.0.1
   ```
   Open `http://localhost:8000/nl/`. The server runs until you press Ctrl+C; use a second terminal for further commands. Click through the pages you touched, in **all three languages**, on desktop and a narrow (mobile) viewport. Node.js 20+ is required for the checks; Python 3 is only used for this local server.
4. Open a pull request with:
   - a clear title
   - what changed, on which pages, in which languages
   - screenshots for visual changes
   - checks performed and what remains unverified (especially hosted forms or deployment)
5. Wait for review. With several contributors (human and AI) active, keep PRs small and focused, and check open PRs before starting something big.

## Checklist for content changes

- [ ] Same section added/changed in `nl/`, `en/` and `fy/`
- [ ] Translations are real translations — no Dutch or English left in the Frisian pages
- [ ] Links work (relative links between language pages, absolute for external)
- [ ] New public pages added to `sitemap.xml` and `llms.txt`
- [ ] Key pages have a concise `.html.md` counterpart and a Markdown alternate link
- [ ] Entry added to `CHANGES.md`

## Checklist for visual/structural changes

- [ ] Custom CSS goes in `assets/enhancements.css` (never edit the compiled `assets/styles.css`) and follows [DESIGN.md](DESIGN.md)
- [ ] New sections use prefixed custom classes (e.g. `.nr-promo-*`), not uncompiled Tailwind classes
- [ ] Images use `<picture>` with WebP + fallback and explicit `width`/`height`
- [ ] New JS behavior goes in `assets/main.js`, dependency-free
- [ ] Checked mobile nav, language dropdown and FAQ still work

## Images

- Logos/flags/icons: PNG with explicit width/height; wrap in `<picture>` only if WebP exists
- Photos: width variants 320/480/640/960/1280 in WebP **and** JPEG, named `...-<width>.webp|jpg`, with `srcset` + `sizes`; fallback `src` = the 640 variant

## Repository hygiene

- Follow `.editorconfig` for new edits; do not reformat unrelated files or the compiled stylesheet.
- Keep credentials, `.env` files, supporter records and browser reports out of Git. `.gitignore` is a convenience, not a security boundary; review `git diff --cached` before committing.
- Use placeholder values only in committed `.env.example` files. Ignoring a file does not untrack it or remove it from history.
- Keep changes focused and preserve other contributors' uncommitted work. Documentation-only edits do not need asset version or sitemap date changes.
- Use the [optional browser suite](MAINTENANCE.md#supporter-flow-regression-tests) for interaction changes. CI currently runs the dependency-free checks, not Playwright.

## Questions?

Open an issue, or reach the community on [Telegram](https://t.me/bitcoinfriesland).
