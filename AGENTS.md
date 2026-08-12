# AGENTS.md — Rules for AI Coding Agents

You are one of several AI agents working in this repository alongside 3 human maintainers. These rules exist so concurrent work does not collide and the live site does not break. **Read this file fully before making any change.** Then read [AI_CONTEXT.md](AI_CONTEXT.md) for site internals.

## 0. Read order (mandatory)

1. `AGENTS.md` (this file) — the rules
2. `AI_CONTEXT.md` — runtime behavior, content patterns, maintenance scripts
3. Open pull requests and existing branches — another agent may already be working on your task

## 1. Git workflow (non-negotiable)

- **`main` is live.** Pushing to `main` publishes bitcoinfriesland.com. Never push directly to `main`.
- Always work on a dedicated branch: `feature/<slug>`, `fix/<slug>`, or `docs/<slug>`.
- **Before creating a branch, check whether it already exists** — a previous agent run may have left one behind. If it exists, inspect its commits before adding your own.
- Open a pull request when done. **Never merge a PR yourself** — merging is a human decision.
- In the PR body, state: what changed, which files, which pages, which languages, and what you could **not** verify.

## 2. The three-language rule (most common mistake)

The site is trilingual (`nl/`, `en/`, `fy/`) with language parity. When you add or change content:

- Apply the change to **all three language folders** with identical structure.
- Write genuine Frisian (`fy`) translations — never leave Dutch or English text in `fy/` pages.
- Navigation, hero blocks, CTAs and footers stay structurally identical across languages.
- **The footer is sacred**: it must keep the risk warning block (all three languages) and the GitHub link, and is always updated across all pages together (use `node maintain-footer.cjs all`).

## 3. Code conventions

- **No build step.** Edit HTML/CSS/JS directly. Do not introduce frameworks, bundlers or package.json.
- **Never edit `assets/styles.css`** (compiled Tailwind output). Only classes already used on the site exist in it — do not rely on new Tailwind classes.
- Custom CSS goes at the bottom of **`assets/enhancements.css`** in a commented block, using **prefixed custom classes** (e.g. `.nr-promo-*`) for new sections.
- New JS behavior goes in **`assets/main.js`**, dependency-free.
- Brand colors: `--bf-blue: #0066cc`, `--bf-orange: #f97316`, `--bf-red: #ea384c`.
- Images: `<picture>` with WebP + fallback, explicit `width`/`height`; photos get 320/480/640/960/1280 variants (see CONTRIBUTING.md).
- Documentation and code comments in **English**, unless the user explicitly asks otherwise.

## 4. Housekeeping duties (part of every content PR)

- New public page → add it to `sitemap.xml` and `llms.txt`.
- New/changed event, offer or key page → update `llms.txt` (AI assistants read it).
- User-facing or structural change → add a plain-language entry to `CHANGES.md` under the latest round (or start a new round).

## 5. Verification & honesty

- Test by serving the repo (`npx serve .`) and clicking through all three languages when possible.
- If you cannot run or render something, **say so explicitly in the PR body** — never claim a page "works" without verification.
- Do not invent dates, URLs, prices or statistics. Fetch and verify external facts, or omit them.
- This is a public repo, but still: summarize in conversations, don't paste large blobs of file content into chat output.

## 6. When unsure

Stop and ask the human. A small, correct PR beats an ambitious wrong one.
