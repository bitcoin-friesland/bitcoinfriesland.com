# Contributing to bitcoinfriesland.com

Thanks for helping build the Bitcoin Friesland website. This repo is worked on by **multiple humans and AI assistants**, and `main` publishes the live site — so we keep a strict but simple workflow.

> 🤖 AI assistants: follow [AI_CONTEXT.md](AI_CONTEXT.md) — it contains machine-oriented rules and site internals.

## The golden rules

1. **Every change lands in all three languages** (`nl/`, `en/`, `fy/`) with identical structure.
2. **`main` is live.** All changes go through a branch + pull request.
3. **The footer is sacred**: it must keep the risk warning block (all three languages) and the GitHub link, and is always updated across all pages together (use `node maintain-footer.cjs all`).

## Workflow

1. Create a branch from `main`:
   - `feature/<short-description>` for new content/sections
   - `fix/<short-description>` for fixes
   - `docs/<short-description>` for documentation
2. Make your changes (see checklists below).
3. Test locally — no build step needed:
   ```sh
   npx serve .
   ```
   Click through the pages you touched, in **all three languages**, on desktop and a narrow (mobile) viewport.
4. Open a pull request with:
   - a clear title
   - what changed, on which pages, in which languages
   - screenshots for visual changes
5. Add a short, plain-language entry to [CHANGES.md](CHANGES.md) as a new numbered point under the latest round (or start a new round).

## Checklist for content changes

- [ ] Same section added/changed in `nl/`, `en/` and `fy/`
- [ ] Translations are real translations — no Dutch or English left in the Frisian pages
- [ ] Links work (relative links between language pages, absolute for external)
- [ ] New public pages added to `sitemap.xml` and `llms.txt`

## Checklist for visual/structural changes

- [ ] Custom CSS goes in `assets/enhancements.css` (never edit the compiled `assets/styles.css`)
- [ ] New sections use prefixed custom classes (e.g. `.nr-promo-*`), not uncompiled Tailwind classes
- [ ] Images use `<picture>` with WebP + fallback and explicit `width`/`height`
- [ ] New JS behavior goes in `assets/main.js`, dependency-free
- [ ] Checked mobile nav, language dropdown and FAQ still work

## Images

- Logos/flags/icons: PNG with explicit width/height; wrap in `<picture>` only if WebP exists
- Photos: width variants 320/480/640/960/1280 in WebP **and** JPEG, named `...-<width>.webp|jpg`, with `srcset` + `sizes`; fallback `src` = the 640 variant

## Questions?

Open an issue, or reach the community on [Telegram](https://t.me/bitcoinfriesland).
