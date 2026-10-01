# DESIGN.md: The Sticker Rulebook

How bitcoinfriesland.com looks, why it looks that way, and how to add things
without making it look like three different websites in a trench coat.

**Short version:** if it would not look good as a vinyl sticker on a laptop
lid, it does not belong on the site.

---

## 1. The idea

The community hands out "Betaal hier met Bitcoin" stickers: thick black
outline, flat colour, a mascot with its tongue out. The site borrows that
language everywhere:

- **Ink outlines.** Every card, button and panel has a solid black border.
- **Hard shadows.** Offset, no blur. Shadows are a black slab behind the
  object, not a fog around it.
- **Flat brand colours.** Frisian blue, Bitcoin orange, sticker yellow, a soft
  sky blue for backgrounds. No gradients. Gradients were asked to leave in
  Round 39 and have not been back.
- **A little wonk.** Some stickers sit at -1 to 2 degrees. Never more than
  that; we are playful, not seasick.
- **Line icons, never emojis.** Emojis render differently on every phone and
  look like a group chat. Use inline SVG icons (Lucide-style, 24x24,
  `stroke-width="2.2"`, `class="st-icon"`).

## 2. Where the code lives

| File | What it is | May I edit it? |
|---|---|---|
| `assets/styles.css` | Compiled Tailwind from the original site | **No.** Treat as bedrock. |
| `assets/enhancements.css` | Hand-written layer. The sticker system is the big block at the bottom, scoped to `body.st` | Yes, this is the place |
| `assets/main.js` | All behaviour, vanilla JS, no dependencies | Yes |

Every page has `<body class="st">`. All sticker rules are scoped to `.st` so
removing that class would show the old site underneath (please do not).

### The `#main-content` trick

Older rules in `enhancements.css` use `!important` with high specificity
(gradients, tinted panels). To beat them without an `!important` arms race,
sticker overrides for legacy markup are written as
`.st #main-content <selector>`. The id gives enough weight to win cleanly.
New `st-*` components do not need this; only use it when restyling old
Tailwind markup.

### Cache-busting is mandatory

Pages load `enhancements.css?v=...` and `main.js?v=...`. When you change
either file, bump the version on **every** page in one go (the audit fails if
pages disagree):

```sh
find . -name '*.html' -not -path './.git/*' -exec sed -i '' 's/enhancements\.css?v=OLD/enhancements.css?v=NEW/g' {} +
```

(On Linux, drop the `''` after `-i`.)

## 3. Tokens

Defined on `:root` at the top of the sticker block in `enhancements.css`. Use the variables, not raw hex values.

| Token | Value | Use |
|---|---|---|
| `--st-ink` | `#121212` | Outlines, shadows, headings, dark panels |
| `--st-orange` | `#f97316` | Primary buttons, highlights, Bitcoin-ish things |
| `--st-blue` | `#0066cc` | Frisian blue: secondary buttons, Telegram bands |
| `--st-yellow` | `#ffe14d` | Sticker yellow: quote of the day, tips, badges |
| `--st-sky` / `--st-sky-dot` | `#e8f1ff` / `#c7d9f5` | Section backgrounds with the dotted pattern |
| `--st-red` | `#e3263b` | Rare. Errors, the mascot's tongue |
| `--st-text` | `#2a2a2e` | Body text |
| `--st-line` | `2.5px` | Standard outline width |
| `--st-shadow-sm` / `--st-shadow` / `--st-shadow-lg` | 3, 5, 8px offset | Small chips / cards and buttons / hero-sized panels |
| `--st-r` / `--st-r-lg` / `--st-r-xl` | 14, 22, 32px | Radius for small, normal, big things |
| `--st-display` | Bricolage Grotesque | Headings and big numbers. Body text is Inter |

**Contrast:** text must pass WCAG AA. White text goes on ink, blue or the
Nostr purple. Ink text goes on orange, yellow, white and sky. White on orange
does not pass; do not try it, the contrast audit will tattle.

## 4. Components

Copy an existing example from a page rather than writing markup from scratch.

### Layout

| Class | What it does |
|---|---|
| `.st-section` | Standard vertical section. Add `--sky` for the dotted blue background, `--tight` for less padding |
| `.st-shell` | Centred content width |
| `.st-section-head` | Eyebrow + h2 + lede block at the top of a section |
| `.st-grid-2` / `-3` / `-4` | Responsive card grids; collapse to one column on phones |

### Hero

| Class | Where |
|---|---|
| `.st-hero.st-hero--home` | Homepage: slogan, mascot and sticker pile (`.st-stickers`, `.st-sticker--*`) |
| `.st-hero.st-hero--page` | Every other page: badge, title, intro |
| `.st-hero--art` + `.st-hero-art` | Page hero with an artwork pile on the right (links: `.st-ha-chip` link stickers; news: `.st-ha-cover` guide covers; support: `.st-ha-paper` sticker sheet with `.st-ha-round`). Each piece is absolutely positioned with inline `left/top` percentages and a `--r` rotation |
| `.st-posters` / `.st-poster` | Meetings page poster wall |
| `.st-map` | Map page Fryslân map with town dots |

A page hero without art looks unfinished next to the others. Give every new
page hero a `.st-hero-art` pile, or at least the badge.

### Text bits

| Class | Use |
|---|---|
| `.st-step-label` | Black pill eyebrow ("STAP 2", "VOLG ONS") |
| `.st-kicker`, `.st-hero-badge` | Small labels above titles |
| `.st-h1`, `.st-lede` | Page title and intro paragraph |
| `.st-fine` | Small print, disclaimers |
| `.st-mark` | Orange underline highlight on a word ("dwaan") |

### Buttons and chips

| Class | Look |
|---|---|
| `.st-btn` | White sticker button with ink border and shadow. Lifts on hover, presses on click |
| `.st-btn--orange` | Primary action. Ink text |
| `.st-btn--blue` | Secondary action. White text |
| `.st-btn--yellow` | Friendly extra action |
| `.st-btn--purple` | Nostr only |
| `.st-btn--dark` | Ink button with an orange shadow; one per section at most ("Bekijk alle bronnen") |
| `.st-ctas` (`--sm`) | Row of buttons with consistent spacing |
| `.st-chip` | Small pill button (calculator quick amounts, copy npub) |

External links get `target="_blank" rel="noopener"` and the small
external-link icon.

### Cards

| Class | Use |
|---|---|
| `.st-card` | Standard white sticker card. Modifiers: `--compact`, `--step`, `--faq` |
| `.st-card-icon` | Round icon badge at the top of a card |
| `.st-tag` (`--orange`) | Little label sticker in the card corner ("Makkelijkste start") |
| `.st-steps` / `.st-stepcard` / `.st-num` | Numbered how-to steps |
| `.st-tip` (`--alt`) | Callout with icon and bold title. Yellow by default, white with `--alt` |
| `.st-quote` | Quote of the day, big yellow panel |
| `.st-social-card--nostr` / `--x` | Follow cards on the homepage |
| `.st-band` | Full-width coloured band (Telegram, map promo) |
| `.st-art` | Illustration thumbnail, 8:3, outlined |
| `.st-grid-3 > .st-card` | Cards in a 3-grid are flex columns: their `.st-ctas` row sticks to the bottom so buttons line up |

### Meetup cards (meetings pages)

Every event, upcoming or past, is one `<article class="st-event">`. The card
is built from fixed-height blocks so **all cards are the same size and all
buttons sit on the same line**. Do not add extra blocks or remove empty ones;
leave a block empty instead (for example an event without a location).

```html
<article class="st-event">
  <div class="st-event-media"><picture>…4:5 image…</picture><span class="st-event-tag">Afgelopen</span></div>
  <div class="st-event-body">
    <p class="st-event-date"><svg class="st-icon">…calendar…</svg><span>Vrijdag 29 mei 2026 · vanaf 19:30</span></p>
    <h3>Bitcoin Friesland Meetup</h3>
    <p class="st-event-loc"><svg class="st-icon">…pin…</svg><span>Het Brouwdok, Willemskade 8, Harlingen</span></p>
    <div class="st-event-text" id="ev-nl-3" data-event-text><p>…</p></div>
    <button type="button" class="st-event-more" aria-expanded="false" aria-controls="ev-nl-3"
            data-more="Lees meer" data-less="Minder" hidden><span>Lees meer</span><svg class="st-icon st-event-more-icon">…</svg></button>
    <div class="st-event-cta"><a class="st-btn" href="…">Bezoek →</a></div>
  </div>
</article>
```

- Date and location show at most two lines, the title two lines, the text
  three lines. `main.js` reveals "Lees meer" only when the text is longer.
- The image box is 4:5 with `object-fit: contain`, so posters are never cut
  off. New artwork should be 960x1200 (see section 6).
- `id`s must be unique per page (`ev-<lang>-<n>`). Translate `data-more` and
  `data-less` per language ("Read more"/"Show less", "Lês mear"/"Minder").
- An upcoming event goes in `#upcoming-events` without the "Afgelopen" tag;
  when it has passed, move the card to the top of `#past-events` and add the
  tag. There is no automatic date rollover. Keep the three languages in the
  same order (newest first) and update `meetings.html.md` too.
- The Noderunners card carries `data-event-end`; `maintenance.test.cjs`
  checks it stays in the past list.

### Footer

`.st-footer-strip` holds the live block height (`.st-block`) and the
Noderunners badge (`.st-nr`); `.st-credit` is the StudioFab.nl line. The
footer is **sacred** (see AGENTS.md): risk warning and credit line on every
page, changed on all pages at once.

## 5. Live widgets (`assets/main.js`)

Every widget must work without its API. If the network says no, show less,
never an error.

| Hook | What it does | Source and fallback |
|---|---|---|
| `[data-block-height]` | Current block in the footer, every 60 s | mempool.space, then Blockstream |
| `[data-sats-calculator]` | Sats to EUR/USD and back | mempool.space prices, then CoinGecko |
| `[data-quote-of-the-day]` | One quote per day from `BF_QUOTES` (21 sourced quotes) | Local list, no network |
| `[data-nostr-feed]` | Latest note of our npub | damus, nos.lol, primal relays. Stays hidden when there is no note |
| `[data-copy]` | Copies the attribute value, shows `data-copied-text` | Clipboard API |

Quotes must be real, with source and date. Do not add anything Satoshi
"probably would have said".

## 6. Art and images

- Illustrations are flat, ink-outlined, in the token colours. The references:
  homepage card art (`assets/images/art-*-960x360.jpg`), guide covers
  (`assets/images/*-cover-1600x840.jpg`, with 640x336 copies for the news
  hero), meetup art (`assets/images/event-*-{480,640,960}.{jpg,webp}`, 4:5)
  and the share cards (`assets/images/og/og-<page>-<lang>.jpg`, 1200x630).
- Artwork is drawn as SVG/HTML and rendered with headless Chrome, then saved
  as JPEG and WebP. The mascot is always the real
  `bitcoin-friesland-logo.png`, never redrawn.
- Every public page has its own share card. A new page needs a new
  `og-<page>-<lang>.jpg` plus `og:image`, `twitter:image`, alt texts and
  `primaryImageOfPage` pointing to it.
- No stock photos with handshakes. No AI images with seven fingers.
- Always set `width`, `height`, `alt` and `loading="lazy"` below the fold.
  Supply at least 2x the displayed size so nothing looks pixelated.

### Favicons

`favicon.ico` (16/32/48), `assets/images/icon-32.png`, `icon-192.png` and
`icon-512.png` are the mascot as a sticker on an orange tile.
`apple-touch-icon.png` and `icon-maskable-512.png` are full-bleed orange,
because iOS and Android cut their own shape. `site.webmanifest` lists them.
Replace all of them together, never just one.

## 7. Copy

- Three languages, always: `nl/`, `en/`, `fy/`. Same structure, same
  components. Frisian should be reviewed by a native speaker.
- Dutch website copy: no emphasis accents ("een", not "één"), but keep the
  spelling marks that belong to the word (ideeën, cliënten, geïnteresseerd).
- Write for a curious neighbour, not for a cryptographer. Short sentences.
- Disclaimers may wink, but must keep their substance: prices swing, lost
  keys or custodial platforms can mean losing everything, no deposit
  guarantee, not financial advice. The footer risk-warning label stays short
  (it is a one-line pill); put the joke in the paragraph.

## 8. Before you open a pull request

```sh
node --check assets/main.js
node audit-site.cjs
node --test audit-site.test.cjs maintenance.test.cjs forms-function.test.cjs
node maintain-llms-full.cjs --check
```

Then look at your change on a phone-width screen and a desktop screen. If you
added colour, check contrast. If you added a soft shadow, a gradient or an
emoji, you know what you did.
