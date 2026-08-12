# GitHub Copilot instructions — bitcoinfriesland.com

Static trilingual website (HTML/CSS/JS, no build step). Full agent rules: `AGENTS.md`. Site internals: `AI_CONTEXT.md`.

## Non-negotiable rules

- **`main` is live.** All changes via branch + PR; never commit directly to `main`.
- **Three-language parity**: every content change lands in `nl/`, `en/` AND `fy/` with identical structure and genuine translations (real Frisian in `fy/`).
- **Footer is sacred**: keep the risk warning block (NL/EN/FY) and GitHub link; update all pages together (`node maintain-footer.cjs all`).
- **Never edit `assets/styles.css`** (compiled Tailwind — only existing classes work). Custom CSS goes in `assets/enhancements.css` with prefixed classes (e.g. `.nr-promo-*`).
- New JS goes in `assets/main.js`, dependency-free. No frameworks, no bundlers.
- Brand colors: `--bf-blue: #0066cc`, `--bf-orange: #f97316`, `--bf-red: #ea384c`.
- Images: `<picture>` with WebP + fallback, explicit width/height.
- New public page → update `sitemap.xml` and `llms.txt`. Changed event/offer → update `llms.txt`.
- User-facing change → add a plain-language entry to `CHANGES.md` (latest round).
- Docs and code comments in English unless the user asks otherwise.
- When you cannot verify something renders/works, say so explicitly — never claim unverified success.
