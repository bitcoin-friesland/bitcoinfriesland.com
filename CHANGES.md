# What changed and why (June 2026)

A plain-language list of the improvements made to the website. Nothing was
removed that visitors need. The look and layout of the pages stayed the same.
The changes are mostly things search engines and AI tools read, plus a few
small clean-ups.

## Top 10 improvements

1. **Search engines now know the 3 languages belong together.**
   Every page got "hreflang" tags that link the Dutch, English and Frisian
   versions of that page. Before, Google saw them as separate pages competing
   with each other. Now they support each other.

2. **Every page now has one clear web address (a "canonical" tag).**
   This stops Google from getting confused between slightly different versions
   of the same address, which used to split the page's score in two.

3. **Page titles are clearer and use real search words.**
   The home page title used to say "Bitcoin Friesland - index". It now says
   "Bitcoin Friesland - Community, Meetups en Bitcoin Kaart". Every page got a
   title that matches what people actually search for.

4. **The Frisian pages had English and Dutch titles by mistake. Fixed.**
   The Frisian map, links, meetings and consumers pages now have proper
   Frisian titles and descriptions.

5. **Links shared on Telegram, X and WhatsApp now show a picture and text.**
   Added "Open Graph" and "Twitter card" tags. Before, sharing a link showed a
   bare address with nothing else. Now it shows the community photo, the page
   title and a short description.

6. **Google can now show your questions and answers directly in search.**
   The list of common questions on the home page (what is Bitcoin, how do I
   start, and so on) is now marked up so Google can show them as a rich result.
   Added for all three languages.

7. **Added an "About us" block that search engines and AI read.**
   Every page now carries a small hidden data card with the community name,
   region, email and Telegram link. This helps Google and AI tools describe
   the community correctly.

8. **Fixed broken and empty links.**
   The "X" and "Nostr" icons in the footer pointed nowhere (they just jumped to
   the top of the page), so they were removed. They can be added back any time
   real account links exist. On the home page, two resource buttons that went
   nowhere now point to the business page and the Bitcoin Wiki.

9. **Small clean-ups that make pages tidier and load cleaner.**
   Removed a stray setting on the stylesheet link that could block loading,
   removed duplicated image size settings left over from the page builder, and
   updated the copyright year from 2025 to 2026 on every page.

10. **Made one name consistent and added two helper files.**
    The footer logo text sometimes said "Fryslân" on Dutch and English pages.
    Now Dutch and English pages say "Friesland" and Frisian pages say "Fryslân".
    Also added an "llms.txt" file (a summary for AI tools) and rebuilt the
    "sitemap.xml" with today's date and all language links.

## Extra quick wins (same update)

11. **Made outgoing links safer.** 97 links that open in a new tab (to wallets,
    exchanges, news sites and so on) now carry a small safety setting
    ("rel=noopener") that stops the other site from being able to touch your
    page. This is a standard best practice.

12. **Pages load lighter on phones.** 62 photos now load only when the visitor
    scrolls down to them, instead of all at once. The logos still load
    immediately so the top of the page appears just as fast as before.

13. **Added a phone browser colour.** On mobile, the browser bar now shows the
    Friesland blue colour, which looks more finished and branded.

## Round 3 (more improvements)

14. **The NodeRunners Conference 2026 can now show in Google with its date.**
    Added event data (date, time, venue in Arnhem, ticket info) to the meetings
    pages so Google can show it as a proper event result.

15. **Added a friendly "page not found" page.**
    If someone follows a broken or old link, they now see a branded 404 page
    with buttons back to the homepage and the Bitcoin map, in all three
    languages, instead of a blank error.

16. **The site is now usable with a keyboard.**
    The language picker and the question-and-answer sections can now be opened
    with the Tab and Enter keys, which also helps screen reader users. Nothing
    changed for mouse and touch users.

17. **Faster, friendlier crawling.**
    Lowered a setting that was telling search engines to wait 10 seconds between
    pages. They can now read the site more quickly.

18. **Added a small "Design by studiofab.nl" credit.**
    Placed quietly in the footer of the About page only (not the homepage), in
    all three languages.

## Please note (content to refresh)
- The meetings page lists a "Bitcoin Friesland Meetup" on 29 May 2026 under
  "Upcoming Events", but that date has already passed. It is worth moving it to
  the past events list and adding the next meetup date when known. (I did not
  change event text, only added the conference data.)

## Round 4 (news/blog section)

19. **Added a Nieuws (news/blog) section.** A new Dutch blog lives at
    `/nl/blog/`. It has a landing page that lists posts and one ready-to-read
    starter article, "Beginnen met Bitcoin in Friesland". Fresh posts like this
    are the best long-term way to bring new visitors from Google.

20. **Put the blog in the menu everywhere.** Every page now links to it in the
    top menu, the mobile menu and the footer (Nieuws in Dutch, News in English,
    Nijs in Frisian).

21. **Made future posts easy.** There is a plain-language guide,
    `nl/blog/HOW-TO-ADD-A-POST.md`, that explains how to add a new article by
    copying one file and changing the text. No coding needed.

22. **Added an RSS feed and search data.** The blog has an RSS feed (handy for
    the Nostr and Bitcoin crowd) and each post carries article data so Google
    can show it nicely. Blog pages were added to the sitemap.

## Round 5 (business listings)

23. **Added two businesses to the Bitcoin map list.** StudioFab (Webdesign,
    Goutum) and Sloopkamer (Rage Room, Dokkum) were added to the
    "Bitcoin-vriendelijke Bedrijven in Friesland" table on all three map pages,
    placed in the middle of the list, with links and all three payment columns
    ticked. Both businesses show a "Bitcoin accepted" badge on their own sites.

## Round 6 (visual refresh)

24. **Modern typeface.** The whole site now uses Inter, a clean professional
    font, instead of the browser default. This alone makes it look more current.

25. **Glass navigation bar.** The top menu is now slightly see-through with a
    soft blur, a thin border and a refined shadow when you scroll. Menu links
    get a subtle blue-to-orange underline on hover.

26. **Richer hero.** The top section of the homepage now has a soft, on-brand
    blue-and-orange glow instead of a flat grey gradient. Same colours, more
    depth.

27. **Premium buttons.** All buttons share one polished style now: rounder
    corners, a soft coloured shadow, and a gentle lift when you hover. The
    Telegram band uses the real Friesland blue instead of a generic blue.

28. **Softer, modern cards and shadows.** Shadows across the site were made
    softer and more expensive-looking, the heavy glow behind the homepage cards
    was toned down, and corners are a touch rounder.

29. **Clear focus rings.** Keyboard users now see a clean blue ring on buttons
    and links, which also looks more polished.

    How it works: all of the above lives in ONE new file,
    `assets/enhancements.css`, layered on top of the existing styles. It changes
    how things look, not the page content or layout. To undo any of it, that one
    file (and its link) can be removed. Note: the Inter font loads from Google
    Fonts, which is a new outside connection.

## Round 7 (more visual touches)

30. **Brand accent line on the footer.** A thin blue-to-orange line now sits at
    the top of the footer on every page. Small, but it ties the look together.

31. **Photos gently zoom on the blog cards** when you hover them. Subtle and
    modern. The long article pages are left alone.

32. **Nicer business table.** The Bitcoin map list now has soft striped rows and
    a light blue hover, so it is easier to read down a long list.

33. **Small tactile details.** Buttons press in slightly when clicked, the FAQ
    boxes and the links-page cards lift on hover, blog text links got readable
    underlines, the phone "tap flash" is gone, and the scrollbar is now a slim
    on-brand blue. All of this is still in the one `enhancements.css` file.

## Round 8 (new event)

34. **Added the "Meat the Resistance" BBQ event.** Friday 14 August 2026 from
    19:00 at Vliegveld Drachten, shown as the first upcoming event on the
    meetings page (Dutch, English and Frisian), reusing the earlier Drachten BBQ
    photo, with a "Get your ticket" button to meat-the-resistance.info and event
    data for Google (ticket € 25, paid in sats).

## Round 9 (event findability + backlink)

35. **Moved the 29 May meetup to past events** on all three pages (dimmed, grey
    header, like the other past events).

36. **Fixed missing image descriptions.** Nine past-event photos had empty alt
    text; they now describe the image (accessibility + image search).

37. **Dedicated event page for the BBQ.** New page
    `/nl/evenementen/bitcoin-bbq-meat-the-resistance-drachten.html` with a
    keyword-rich title, a clear facts block (date, place, price, tickets), a
    ticket button, and Event + FAQ + breadcrumb data. This is what helps people
    find it when they Google the event, and what an AI assistant reads when
    someone asks about Bitcoin meetups in Friesland. Linked from the meetings
    card, added to the sitemap, and listed in `llms.txt` (the file AI crawlers
    read) with date, location and ticket info.

38. **Stronger studiofab.nl backlink, done the clean way.** Moved the credit
    from a small footer line into the About page's main text as one contextual,
    followed link with a descriptive anchor ("StudioFab — webdesign uit
    Friesland"). It stays on the About page only (not site-wide, which Google
    discounts) and is visible to people (no hidden-text tricks, which would risk
    studiofab.nl).

## Round 10 (optics sweep, from looking at the live site)

39. **Fixed the blank boxes on the meetings page.** The upcoming event photos
    (top of the page) now load immediately instead of showing an empty white
    box. Older events lower down still load as you scroll, to keep the page
    light.

40. **Fixed an image that jumped while loading.** The BBQ photo was told the
    wrong shape (wide instead of tall), which made the page jump as it loaded.
    Corrected on the meetings cards and the event page.

41. **Filled the empty gaps in the homepage "Bronnen & Links" cards.** Two of
    the three cards had no image and left a big blank space. They now have a
    matching photo, so all three cards look even and finished.

## Round 11 (site-wide design polish)

42. **One consistent hero look.** The inner pages used three different flat grey
    backgrounds; they now all share the same warm blue-and-orange glow as the
    homepage, so every page feels part of one site.

43. **A brand signature line.** A thin blue-to-orange line now sits under the
    menu on every page (matching the one on the footer), tying the whole site
    to the brand colours.

44. **Buttons have depth.** The flat buttons now have a subtle gradient, so they
    look designed rather than plain.

45. **Consistent hover effects.** Event cards and the links on the Links page now
    lift gently and gain a soft shadow when you move the mouse over them, with
    photos zooming slightly inside cards. Same feel everywhere.

46. **Careful detail work.** Softer, more even shadows, tighter headings, and
    tidy focus outlines throughout. All of this is still in the one
    `enhancements.css` file, and I previewed it on the live pages to check it
    looks right.

## Round 12 (conference promo + repo documentation)

47. **Noderunners Conference 2026 promo on the homepage.** A dark, on-brand
    promo band directly under the hero on all three homepages (NL/EN/FY):
    an "exclusive for Bitcoin Friesland" badge, date and venue chips
    (19 September 2026, 11:00-18:00, Koepelgevangenis Arnhem), a copyable 10%
    discount code (BITCOINFRIESLAND, valid until the conference) and a ticket
    button to conf2026.noderunners.network/BITCOINFRIESLAND (the link applies
    the code). Styling lives in a self-contained block at the end of
    `assets/enhancements.css` (prefixed `.nr-promo-*` classes, so it does not
    depend on the compiled Tailwind file); the copy button uses a small
    `copyPromoCode()` helper added to `assets/main.js`.

48. **Updated llms.txt for the promo.** The NodeRunners entry now points to the
    current conference site (conf2026.noderunners.network) and mentions the
    exclusive BITCOINFRIESLAND discount code, so AI assistants can relay it
    when people ask about the conference.

49. **Proper repository documentation.** The README was rebuilt into real
    documentation: repository layout, how to run and edit locally, the
    three-language rule, the styling system (never edit the compiled
    styles.css; custom work goes in enhancements.css), the SEO/LLM assets to
    keep alive, the maintenance scripts, and how publishing works. A new
    CONTRIBUTING.md gives human contributors the branch/PR workflow and
    checklists. AI_CONTEXT.md stays the guide for AI assistants and is now
    linked from both.

## Files changed
- All 24 language pages in `nl/`, `en/` and `fy/` (added the Nieuws menu link)
- `nl/map.html`, `en/map.html`, `fy/map.html` (two new businesses)
- `index.html` (the front-door redirect page, now with language links)
- `404.html` (new, friendly page-not-found)
- `assets/main.js` (keyboard accessibility)
- `sitemap.xml` (rebuilt)
- `robots.txt` (faster crawl setting)
- `llms.txt` (new, summary for AI tools)
- `nl/blog/` (new: landing page, starter post, RSS feed, how-to guide)
- `nl/evenementen/` (new: dedicated BBQ event page)
- `nl/meetings.html`, `en/meetings.html`, `fy/meetings.html` (BBQ event, 29 May moved to past, alt text, event-page link)
- `nl/about.html`, `en/about.html`, `fy/about.html` (studiofab.nl credit moved into content)
- `assets/enhancements.css` (new: the visual polish layer) + linked on every page

## Round 12 files
- `nl/index.html`, `en/index.html`, `fy/index.html` (promo section under hero)
- `assets/enhancements.css` (promo styling block appended)
- `assets/main.js` (copyPromoCode helper)
- `llms.txt` (conference URL + discount code)
- `README.md` (rebuilt), `CONTRIBUTING.md` (new), `CHANGES.md` (this entry)

## Round 13 (Noderunners promo restyle)

50. **The Noderunners promo band went from dark to light.** The heavy dark
    promo band under the homepage hero clashed with the light sections around
    it. It now uses the same soft blue-and-orange brand glow as the hero, with
    the signature blue-to-orange line on top, and the text flipped to
    dark-on-light. This is done with style overrides appended to
    `assets/enhancements.css` (same class names, later in the file, so they
    win); the original dark block is untouched, so reverting is one delete.

51. **The meetings cards now sell the discount.** On the meetings pages in all
    three languages, the Noderunners Conference card got a "10% off" discount
    tag under the date, an exclusive BITCOINFRIESLAND code box, and a primary
    orange ticket button that links straight to
    conf2026.noderunners.network/BITCOINFRIESLAND (the code is applied
    automatically). The old outline "view program" button is replaced by this
    ticket button.

## Round 13 files
- `assets/enhancements.css` (v3 restyle block appended)
- `nl/meetings.html`, `en/meetings.html`, `fy/meetings.html` (discount tag, code box, ticket CTA)

## Round 14 (smoothness pass from the old React site)

52. **The hero now enters in steps.** The old React site faded each hero
    element in one after another (title lines, intro text, buttons). The
    homepage hero now does the same with pure CSS — a soft 20px rise with a
    small stagger — and the logo card gently floats up and down, exactly like
    the old `animate-float`.

53. **Cards fade in while scrolling.** Meeting cards, blog cards and link
    categories rise into view as you scroll, via a small IntersectionObserver
    in `assets/main.js`. Without JavaScript nothing is hidden, and visitors
    who prefer reduced motion are skipped automatically.

54. **Outline buttons fill on hover.** The outline buttons on cards (like
    "Meer info & tickets") now fill with the Friesland blue and turn their
    text white on hover, just like the buttons on the old site.

## Round 14 files
- `assets/enhancements.css` (v4 smoothness block appended)
- `assets/main.js` (scroll-reveal module appended)
- `CHANGES.md` (this entry)

## Round 15 (hero upgrade + Signal)

55. **The homepage hero got more presence.** Bigger headline with a
    blue-to-orange gradient accent, a larger floating logo card with a soft
    brand glow, subtle blue and orange light blobs behind the content, and
    more breathing room. All in the existing brand colours, pure CSS in the
    v5 block of `assets/enhancements.css`.

56. **Signal is now everywhere Telegram is.** The community has a Signal
    group next to Telegram. Added in all three languages: the footer
    (every page), the community card and the chat section on the homepage,
    the links page, the consumers page buttons, the signup line on the
    meetings page, and the treasure hunt page. Signal uses a speech-bubble
    icon and, on dark bands, a white outline button (`.bf-btn-ghost-white`).

## Round 15 files
- `assets/enhancements.css` (v5 hero + Signal button styles)
- all `nl/`, `en/`, `fy/` pages (footer Signal link)
- `nl/index.html`, `en/index.html`, `fy/index.html` (community card + NL chat section)
- `nl/links.html`, `en/links.html`, `fy/links.html` (Signal community link)
- `nl/consumers.html`, `en/consumers.html`, `fy/consumers.html` (Signal button)
- `nl/meetings.html`, `en/meetings.html`, `fy/meetings.html` (signup line)
- `nl/treasure-hunt.html`, `en/treasure-hunt.html`, `fy/treasure-hunt.html` (Signal button)
- `nl/blog/index.html`, `nl/blog/beginnen-met-bitcoin-in-friesland.html`,
  `nl/evenementen/bitcoin-bbq-meat-the-resistance-drachten.html` (compact footer + inline chat buttons)
- `CHANGES.md` (this entry)

## Round 16 (nav underline fix)

57. **The active menu underline is now short and straight.** The line under
    the current page in the navigation ran the full width of the menu item
    and looked bent at the ends. It is now a crisp, centered bar at 55% of
    the text width with clean square ends, in the brand blue-to-orange
    gradient. It grows slightly on hover. Pure CSS in the v6 block of
    `assets/enhancements.css`; the inline styles in the HTML are untouched.

## Round 16 files
- `assets/enhancements.css` (v6 nav underline block)
- `CHANGES.md` (this entry)

## Round 17 (supporter programme foundation)

58. **Added a complete support page in Dutch, English and Frisian.**
    Visitors can now read how the EUR 21 yearly supporter contribution,
    business support and donations work. The page makes clear that the
    community and Telegram group remain free.

59. **Added honest contact flows while payment details are still open.**
    Supporter, business, donation and sticker buttons open a prepared email.
    The site does not show a fake checkout, stale Lightning invoice or
    unconfirmed donation address.

60. **Made independence and promotion rules explicit.**
    The pages state that support cannot buy influence or an endorsement.
    Bitcoin-related promotion requires prior approval and must be honest,
    clear and free of spam or dubious investments.

61. **Prepared the webshop without pretending it is live.**
    The shop section explains that stickers and other items are being
    prepared, that margin goes to the community fund, and that ordering is
    handled personally for now.

62. **Added support links throughout the site.**
    Desktop navigation, mobile navigation and footers now link to the new
    page. The sitemap and `llms.txt` also describe it.

## Round 17 files

- `nl/support.html`, `en/support.html`, `fy/support.html`
- `assets/enhancements.css`, `assets/main.js`
- Navigation and footer links across all language pages
- `sitemap.xml`, `llms.txt`, `README.md`, `AI_CONTEXT.md`

## Round 18 (supporter interest form)

63. **Visitors can now register their interest without opening an email app.**
    The supporter, business, donation and sticker actions lead to one short
    form on the page. The selected support type is filled in automatically.

64. **The form is ready for Netlify Forms.** It has matching fields in Dutch,
    English and Frisian, a spam honeypot, a language marker and a clear
    confirmation message. Payment and sticker fulfilment still happen
    personally, so the form does not pretend there is an online checkout.

## Round 18 files

- `nl/support.html`, `en/support.html`, `fy/support.html`
- `assets/enhancements.css`, `assets/main.js`
- `README.md`, `AI_CONTEXT.md`, `CHANGES.md`

## Round 19 (simpler supporter coin)

65. **The orange supporter coin is now simpler.** The reference to Bitcoin's
    21 million supply and the yearly label were removed from the hero graphic.
    It now says only `€21` and `in sats` in all three languages.

## Round 19 files

- `nl/support.html`, `en/support.html`, `fy/support.html`
- `CHANGES.md`

## Round 20 (confirmed supporter benefits)

66. **The supporter benefits are now specific.** A yearly supporter receives
    21 Bitcoin Friesland stickers, discount codes for events, and a visible
    supporter tag in the Telegram and Signal groups. The same promise appears
    in Dutch, English and Frisian.

## Round 20 files

- `nl/support.html`, `en/support.html`, `fy/support.html`
- `CHANGES.md`

## Round 21 (simpler top navigation)

67. **Removed the redundant Home link from the top navigation.** The Bitcoin
    Friesland logo remains the clear route back to the homepage. The link was
    removed from both desktop and mobile menus on every Dutch, English and
    Frisian page.

## Round 21 files

- All HTML pages in `nl/`, `en/` and `fy/`
- `CHANGES.md`

## Round 22 (BBQ moved to past events)

68. **The Bitcoin Friesland BBQ of 14 August 2026 is now marked as past.**
    The card moved from upcoming to past events in Dutch, English and Frisian.
    Stale ticket buttons and `InStock` event data were removed, while the
    Dutch event information page remains available as a historical page.

## Round 22 files

- `nl/meetings.html`, `en/meetings.html`, `fy/meetings.html`
- `nl/evenementen/bitcoin-bbq-meat-the-resistance-drachten.html`
- `llms.txt`, `CHANGES.md`

## Round 23 (subtle risk warning)

69. **The footer risk warning is now visually quieter.** The warning text stays
    unchanged, but the strong red box has become a compact neutral note with a
    thin muted-blue accent, smaller heading and softer text. The treatment is
    consistent across every Dutch, English and Frisian page.

## Round 23 files

- `assets/enhancements.css`, `maintain-footer.cjs`
- All HTML pages in `nl/`, `en/` and `fy/`
- `CHANGES.md`

## Round 24 (supporter signup popup)

70. **The supporter buttons now open a three-step signup popup.** Supporters
    provide a required name and email, plus at least a Telegram or Signal
    username. They choose sats or EUR, online or meetup payment, and postal or
    meetup delivery for their 21 stickers. Postal delivery reveals address
    fields. A final review step makes clear that submitting is not yet payment.

71. **Supporter requests have their own Netlify form.** The new
    `supporter-signup` form records the request as new and keeps payment status
    separate from form submission. Dutch, English and Frisian use identical
    field names so future administration can process them consistently.

## Round 24 files

- `nl/support.html`, `en/support.html`, `fy/support.html`
- `assets/enhancements.css`, `assets/main.js`
- `CHANGES.md`

## Round 25 (sats-only supporter contribution)

72. **The supporter contribution can only be paid in sats.** The EUR payment
    option has been removed from the Dutch, English and Frisian signup flows.
    The fixed contribution is now stated as the current satoshi value of €21,
    while supporters can still choose online payment or payment at a meetup.

## Round 25 files

- `nl/support.html`, `en/support.html`, `fy/support.html`
- `assets/main.js`
- `CHANGES.md`

## Round 26 (supporter flow quick wins)

73. **The sats-only contribution is now consistent everywhere.** The trust
    block, supporter card and general support form now all say that the yearly
    contribution is the satoshi value of €21, rather than describing sats as a
    preference.

74. **The short contact form no longer creates incomplete supporter requests.**
    Choosing supporter in that form now opens the full supporter flow, which
    collects the required contact, payment timing and sticker delivery details.

75. **Forms and navigation are more robust.** Text fields now have sensible
    length limits, username fields are easier to enter on mobile, menu states
    are exposed to assistive technology, Escape closes open menus, and sortable
    table headers work with a keyboard and sort ascending on their first use.

## Round 26 files

- `nl/support.html`, `en/support.html`, `fy/support.html`
- `assets/enhancements.css`, `assets/main.js`
- `AI_CONTEXT.md`, `CHANGES.md`

## Round 27 (site-wide accessibility and content quick wins)

76. **Mobile menus and FAQ controls now have safer defaults.** Every HTML
    button has an explicit type, mobile menu buttons expose their initial
    collapsed state before JavaScript runs, and business FAQ questions are
    linked to their answers for assistive technology.

77. **The language picker now speaks the page language.** Its accessible label
    is Dutch, English or Frisian to match the current page, while the menu and
    Escape-key behaviour remain unchanged.

78. **Removed two brittle content claims.** The business FAQ no longer shows
    an undated 59% mining-energy statistic, `BT Pay` is corrected to
    `BTCPay Server`, and the treasure hunt no longer promises an unverified
    `100+` community count.

## Round 27 files

- All HTML pages in `nl/`, `en/` and `fy/`
- `assets/main.js`
- `AI_CONTEXT.md`, `CHANGES.md`

## Round 28 (native controls and menu polish)

79. **The language selector is now a real HTML button.** All 29 language
    selectors can be understood and operated correctly even before JavaScript
    adds enhancements. Their Dutch, English and Frisian labels are included
    directly in the page.

80. **Keyboard controls no longer risk firing twice.** Native buttons now use
    their built-in Enter and Space behaviour; the JavaScript keyboard fallback
    is reserved for older non-button controls.

81. **Navigation menus no longer overlap.** Opening the language selector
    closes the mobile menu and vice versa. Clicking outside closes either menu,
    and resizing to desktop resets an open mobile menu.

82. **Map sorting is clearer and more natural.** Sortable table columns now
    announce `Sort by`, `Sorteer op` or `Sortearje op`, and compare text using
    the current page language with natural number handling.

83. **Browsers reliably receive the latest assets.** References to the shared
    JavaScript and enhancement stylesheet now use one current cache-busting
    version across the site instead of a mix of old versions and unversioned
    URLs.

## Round 28 files

- All pages containing the language selector in `nl/`, `en/` and `fy/`
- All HTML pages referencing shared assets, including `404.html`
- `assets/main.js`
- `AI_CONTEXT.md`, `CHANGES.md`

## Round 29 (supporter transparency and metadata)

84. **The required email address now has a clear purpose.** The supporter flow
    explains in Dutch, English and Frisian that contact details are used for
    the request, payment, stickers, discount codes, invitations and community
    benefits.

85. **Forms show that submission is in progress.** Both support forms disable
    their submit button, expose an accessible busy state and show localized
    sending text after a valid submission, reducing accidental duplicates.

86. **Screen readers can identify the active navigation page.** Navigation
    links now receive `aria-current` after clean Netlify URLs and `.html` URLs
    are normalized. Dutch blog articles keep News marked as their section.

87. **Search and AI metadata match the current site.** Sitemap dates now
    reflect the pages changed on 1 September 2026, while `llms.txt` lists the
    upcoming event before the past BBQ and accurately summarizes the supporter
    programme.

## Round 29 files

- `nl/support.html`, `en/support.html`, `fy/support.html`
- All HTML asset references, `assets/main.js`
- `sitemap.xml`, `llms.txt`, `AI_CONTEXT.md`, `CHANGES.md`

## Round 30 (SEO and LLM discoverability)

88. **Search crawlers now receive one consistent rule set.** Unsupported crawl
    delays and separate Google/Bing groups were removed, so the intended path
    exclusions apply to every matching crawler.

89. **The sitemap now contains canonical pages only.** The root redirect was
    removed because its canonical destination is the Dutch homepage.

90. **AI agents get clean, structured content.** `llms.txt` now follows the v2
    proposal with descriptive Markdown links. The home, meetings, map and
    supporter pages have concise Markdown counterparts in Dutch, English and
    Frisian, and the HTML advertises those versions directly.

91. **Search and social previews are more explicit.** Public pages allow large
    image previews, expose `llms.txt`, identify alternate Open Graph locales and
    provide image descriptions for Open Graph and Twitter cards.

92. **SEO regressions can be caught with one command.** The dependency-free
    `node audit-site.cjs` check covers metadata, structured data, images, local
    links, translations, canonical sitemap URLs, shared asset versions and LLM
    files.

## Round 30 files

- All public HTML pages in `nl/`, `en/`, `fy/`
- Core `*.html.md` files in `nl/`, `en/`, `fy/`
- `robots.txt`, `sitemap.xml`, `llms.txt`, `audit-site.cjs`
- `README.md`, `CONTRIBUTING.md`, `AI_CONTEXT.md`, `CHANGES.md`

## Round 31 (community identity for search and AI answers)

- Replaced the empty About pages with genuine Dutch, English and Frisian
  introductions, answers about free participation, independence and contact.
- Added descriptive links to meetups, the map, beginner and business information,
  and the supporter programme.
- Linked AboutPage and Organization structured data with one shared organization
  identifier across languages. The data describes the visible content.
- Expanded the LLM guide with all three About pages and corrected contradictory
  deployment instructions in AI_CONTEXT.md.
- Files: nl/about.html, en/about.html, fy/about.html, llms.txt, sitemap.xml,
  AI_CONTEXT.md and CHANGES.md.

## Round 32 (code quality and maintainer documentation)

- Hardened the read-only site audit: missing translations no longer silently
  bypass checks, empty folders are not valid page links, malformed URLs report
  useful errors, and missing asset versions and duplicate sitemap URLs fail.
- Added six dependency-free regression tests using isolated temporary copies.
- Added MAINTENANCE.md with sources of truth, verification steps, audit limits,
  legacy-script cautions and safe handoff guidance.
- Corrected local-server instructions, footer-script scope and a reference to
  a nonexistent map data file. No visitor-facing pages or styling changed.
- Files: audit-site.cjs, audit-site.test.cjs, MAINTENANCE.md, README.md,
  CONTRIBUTING.md, AI_CONTEXT.md and CHANGES.md.

## Round 33 (consistent identity and trustworthy information)

- Connected community structured data across all 30 language pages with one
  organization identifier and homepage, including article and event references.
  External organizers remain separate. Community descriptions now describe the
  organization consistently rather than borrowing unrelated page descriptions.
- Added information-checking and correction guidance to all three About pages.
- Clarified that the LLM guide links to summaries, while HTML and the linked
  organizers/businesses provide the primary information. Removed the stale
  guide-wide review date rather than implying every linked fact was rechecked.
- Added an identity regression test; all seven tests and the site audit pass.
  Checked the new content in the local browser for NL, EN and FY.
- Documented evidence-based GEO maintenance and measurement; no ranking or
  citation increase is claimed. No deployment was performed in this round.

## Round 34 (earlier loading and less runtime work)

- Moved shared JavaScript into the head with defer across all 30 language pages,
  bringing download discovery earlier without blocking HTML parsing.
- Prioritized the first event poster and enabled native lazy loading for map
  embeds in NL/EN/FY. Kept the existing visual design and image assets.
- Reduced header scroll work and initialized navigation before images/embeds
  finish loading. Resize updates now run only at the desktop breakpoint.
- Bumped shared asset versions, added a defer regression test and documented
  the remaining protected-stylesheet font bottleneck. Eight tests pass.
- Local Chromium checks cover mobile/desktop navigation, scroll state and
  supporter-dialog opening in all languages. Real-world timings were not
  established, and no production or preview deployment was performed.

## Round 35 (supporter form bug fixes)

- Reproduced and fixed three bugs in all languages: Enter was blocked by hidden
  required fields, whitespace-only names passed validation, and switching from
  post to pickup still included the old postal address in the submission.
- Validation now reveals the correct step before reporting an invalid field,
  rejects whitespace-only addresses, and preserves postal edits without sending
  them for pickup. Removed delayed opening focus that could interrupt typing.
- Added 12 isolated Playwright browser checks, preserving Netlify form names,
  honeypot and field declarations. No real submissions or payments were made.
- Updated shared asset versions and maintainer guidance. No deployment this round.

## Round 36 (shared form logic refactor)

- Consolidated button and Enter navigation into one supporter step transition.
- Extracted shared required-field validation and localized submission-button
  presentation; replaced step magic numbers with named constants and cached
  static panel/address references within the flow.
- Expanded browser coverage for successful postal submissions, back-and-edit
  review updates and both forms' busy states. Preserved Netlify form contracts,
  existing design and the dependency-free website runtime.
- Updated maintainer guidance and shared asset versions. No deployment this round.

## Round 37 (nine improvements and full preview release)

Low-hanging fruit:
1. Corrected CLI help names and rejected invalid/extra arguments without edits.
2. Protected new-tab links generated by maintenance helpers; added an audit guard.
3. External map links now preserve the embedded Friesland location and zoom.

Low-risk improvements:
4. Added localized keyboard skip links and homepage main landmarks.
5. Restore pending submit buttons when returning through browser history.
6. Audit duplicate IDs, broken same-page anchors and malformed fragments.

High-impact improvements:
7. Added searchable NL/EN/FY business lists with counts, empty-state guidance,
   sorting compatibility and a no-JavaScript fallback.
8. Added pinned, read-only PR/push quality checks in GitHub Actions.
9. Added public-file-only preview staging with preview-only noindex headers.

Updated shared asset versions, map summaries and maintenance documentation.
This release includes previously undeployed work from rounds 32–36; the live
site and main branch remain unchanged. Deployment results are recorded separately.

## Round 38 (search and AI visibility audit)

- **Every page now advertises the address the server actually serves.** The host redirects `/nl/about.html` to `/nl/about`, but canonical tags, language links, the sitemap, `llms.txt` and internal links all pointed at the `.html` form. Google received a canonical that redirected elsewhere. All of them now use the clean address, and the site audit fails if a `.html` address is advertised again.
- **Search snippets rewritten.** Meta descriptions on the about, business, consumers, links, map, meetings and treasure-hunt pages (all three languages) are now 130-155 characters and describe what the page really contains. The treasure-hunt titles no longer invite people to join a hunt that has ended. The blog post and BBQ page titles were shortened so Google does not cut them off.
- **A proper share image.** All 27 main pages shared a Thai-food event poster whose text was cut off in link previews. They now use a 1200x630 card with the logo and name. Width, height and type are declared so previews render immediately.
- **More structured data.** Every main page now describes the website, the page and its breadcrumb trail. The organisation record gained a contact point, the GitHub organisation and topics. No search box markup was added because the site has no site-wide search.
- **More for AI assistants.** Nine new Markdown summaries (about, consumers and business in three languages), a "Quick answers" block in `llms.txt`, and a new `llms-full.txt` that joins every summary in one file. `node maintain-llms-full.cjs` regenerates it and the audit fails when it goes stale.
- **Headers and IndexNow.** A new `_headers` file adds security headers, long caching for versioned assets and correct types for the Markdown and text files. An IndexNow key file lets Bing (which feeds ChatGPT search) be told about changed pages after a deploy.
- No design, colours or footer content changed for visitors.

## Round 39: The Sticker Glow-Up (October 2026)

> *In which a perfectly decent website looks in the mirror, sees a 2019
> template with soft gradients and a heart-shaped favicon from its previous
> owner, and decides it is time for a haircut.*

The community hands out "Betaal hier met Bitcoin" stickers: thick black
outlines, flat colours, a mascot sticking its tongue out. They are loud,
friendly and impossible to miss. The website was none of those things. It is
now. Every page, all three languages, one design language. The full rulebook
lives in [DESIGN.md](DESIGN.md) so nobody has to reverse-engineer it from CSS
at 2 a.m.

### The look

- **Everything got outlines and hard shadows.** Navigation, buttons, cards,
  FAQ, forms, the business table and dialogs now look like stickers someone
  slapped on a laptop lid. Headings use Bricolage Grotesque, body text stays
  Inter. Soft blurry shadows were escorted out of the building.
- **Homepage hero: "Bitcoin in Friesland? Gewoon dwaan."** The slogan from
  the community flyer, the mascot, and a little pile of stickers (Lightning,
  Fryslân flag, "Betaal hier met Bitcoin", 21 stickers for supporters).
- **Meetings page:** a poster wall of real meetup posters from Leeuwarden,
  Harlingen, Drachten and Heerenveen. Now in high resolution, because
  pixelated posters are a crime against graphic designers.
- **Map page:** a hand-drawn-looking map of Fryslân with a dot for every town
  on the business list (OpenStreetMap coordinates, province outline from
  CBS/PDOK open data) and live counts. If someone adds a business and forgets
  the map, a test fails and tells on them.
- **Other pages** get a matching sticker header. The "W. Terschellng" typo was
  found and given its missing vowel back.
- **Emojis are retired.** They were replaced by proper line icons. The emojis
  have been informed and are taking it well.
- **New favicon.** The browser tab still showed a white heart left behind by
  the site builder the site was originally made with. It is now the mascot on
  an orange tile, including 192px and Apple touch icons. The heart has moved
  on to new opportunities.
- **Real art instead of stock thumbnails.** The homepage cards "Ontvang
  Bitcoin", "Bitcoin wiki" and "Bijeenkomsten en meetups" now have drawn
  illustrations in the sticker style. The previous thumbnails have been
  quietly composted.
- **Readability fixes.** Telegram bands, dark buttons and the orange wordmark
  now pass contrast checks. An automated check over every page found no
  unreadable text left. The blurry news image (a 128-pixel thumbnail
  stretched to 640, bravely) is now a sharp 1600x840 cover.
- **The footer** is a light sticker panel that mirrors the hero. The risk
  warning is a calm white card, not a red alarm. A second pass replaced every
  remaining old-style button, soft shadow, gradient and tinted box; an
  automated style audit over all pages found zero survivors.
- **Business table** on the map pages: black header row, zebra stripes and
  check marks that look like little green stickers.
- **Tips on the consumer page** used to be pale yellow boxes with the energy
  of a forgotten Post-it. They are now proper sticker callouts with an icon
  and a bold heading.

### New things to click

- **"Wat is Bitcoin?"** (`/nl/what-is-bitcoin`, also in English and Frisian):
  the explanation you would give your aunt at a birthday party. Plain words, a
  glossary, a short history and next steps, with FAQ structured data.
- **Sats calculator** (`/nl/sats-calculator`): sats to euros or dollars and
  back, with the live price from mempool.space (CoinGecko as backup). Quick
  buttons like "21 euro" included. Lives under Tools on the links page.
- **Live block height in the footer.** Every page now shows the current
  Bitcoin block, refreshed every minute from mempool.space (Blockstream as
  backup). It is the most Bitcoin thing a footer can do.
- **Quote of the day** on the homepage: a different original quote each day
  from Satoshi Nakamoto, Hal Finney, Eric Hughes, Tim May, Nick Szabo or Wei
  Dai, always with source and date. No made-up Satoshi quotes. We checked.
- **Follow us on Nostr and X.** A homepage section with a Nostr card (copy
  the npub, follow link, and the latest note as soon as one is published) and
  an X card for @bitcoinfryslan. Both are also in the footer, in the
  structured data and in `llms.txt`.
- **Four guides** in the news section: "Beginnen met Bitcoin in Friesland",
  "Bitcoin veilig bewaren", "Betalen met Lightning" and "Bitcoin accepteren
  in je zaak", each with a sticker cover, in the RSS feed, the sitemap,
  `llms.txt` and the links page.
- **"Gestart door twee Noderunners"** badge with logo and a followed link in
  every footer; the about pages tell the origin story.
- **"Webdesign door StudioFab.nl"** credit in every footer (followed link).

### Rebuilt pages

- **Consumer page** is now a 1-2-3 guide: pick a wallet, buy your first sats
  (Strike, wave.space, Bitonic), pay and meet. Then long-term saving with
  hardware wallets (Trezor, BitBox, and now Bitkey and Blockstream Jade),
  converting back to euros and a help band.
- **Business page** explains what is in it for a business before asking
  anything: new customers, a spot on the map, word of mouth, low fees,
  instant and final payments. Then "In 4 stappen" and a comparison of
  Coinos, Wallet of Satoshi, BTCPay Server and Lightning Checkout.
- **Supporter programme is "in preparation".** Payment and organisation are
  not ready yet, so the signup popup is gone. The support page offers a
  waitlist and a feedback form instead, delivered to Telegram, and no longer
  suggests anyone can pay today.

### Corrections, because facts matter

- Wallet of Satoshi is self-custodial these days, and still the easiest start.
- "Gratis op de kaart" is gone: listing on the map will become paid.
- The Sat.trading link went to a site that no longer exists. Removed.
- Two outdated business links and a dead Comfrey Computers link fixed or
  removed. Restaurant Kreta is no longer used as an example; it left the map.
- The outdated "Speur mee in Sneek" promo is gone; that treasure hunt ended.
- The Dutch menu says **Meet-ups** instead of "Bijeenkomsten".
- "Fork mij op Github" left the footer. The source code is still linked from
  the About pages.

### Under the hood

- Everything visual lives in one block at the bottom of
  `assets/enhancements.css`, scoped to `body.st`. The compiled Tailwind file
  was not touched and there is still no build step.
- New behaviour (calculator, block height, quote of the day, Nostr feed,
  copy buttons) is in `assets/main.js`, dependency-free, and degrades
  gracefully: if an API is down, the page simply shows less, never an error.
- Checks: site audit, 31 regression tests, a style audit for leftover
  old-style elements and a contrast audit over every page. All green.
- Future ideas are parked in [BACKLOG.md](BACKLOG.md), starting with a
  Facebook page that posts once a week on autopilot.

## Round 40: Share cards and a homepage clean-up (October 2026)

- **Every page got its own share card.** When someone posts a link on WhatsApp, Telegram, X or Facebook, they now see a sticker-style card made for that page (35 in total, in Dutch, English and Frisian) instead of one blue logo card for everything. The map card shows the actual map, the meetups card real posters, the calculator card a calculator. Link previews finally look like they belong to the same website.
- **Homepage leftovers rebuilt.** "Waarom aansluiten", "Leer over Bitcoin" and "Bronnen en links" were the last blocks wearing the old outfit (pastel gradients, text links pretending to be buttons, a 2015 Bitcoin logo). They are now proper sticker cards with real buttons. The English and Frisian homepages, which were missing two of these blocks, now have them too, and the English meetups card no longer sends you to X.

## Round 41: Meetups that look like meetups (October 2026)

- **Every meetup card rebuilt.** All 15 past events now use one sticker card: same size, image in the same spot, buttons on exactly the same line. Long descriptions fold up after three lines with a "Lees meer" button, so one chatty event no longer stretches the whole row. The faded grey look for past events is gone; a small "Afgelopen" sticker does that job now.
- **Real artwork instead of food clipart.** The Kreta (Greek), ByOak (Thai) and Nieuwjaarsborrel cards got hand-built illustrations in the site style, and the three 2025 meetups that had no picture at all now share a generic meetup illustration.
- **Small facts fixed along the way.** The Kreta card promised Thai food at a Greek restaurant; it now promises Greek. The English and Frisian pages were missing two 2025 events (the October BBQ and NodeRunners Conference 2025) and listed them in a different order. All three languages now have the same 15 events, newest first.
- **Heroes with character for Links, Nieuws and Steunen.** Links gets a pile of link stickers, Nieuws the four guide covers, Steunen a sticker sheet with the "Binnenkort" label. They now feel like siblings of the home, map and meetup heroes.
- **Disclaimers with a wink.** Same legal message (prices swing, lose your keys and it is gone, no deposit guarantee, no financial advice), but written by humans: "soms richting de maan, soms richting de kelder" and "We zijn Friese Bitcoiners, geen beleggingsadviseurs".
- **New favicon set.** The mascot as a proper sticker on an orange tile, with a die-cut white edge, crisp from 16 pixels up, plus home-screen icons and a web app manifest.

## Round 42: Knocking on Google's and Bing's door (October 2026)

- **Search engines get an invitation, and accepted it.** The site is verified in Google Search Console (HTML file, served by a tiny Function because Cloudflare otherwise redirects it) and in Bing Webmaster Tools (`BingSiteAuth.xml` and a meta tag). The sitemap is submitted to both; Google read all 39 pages without a single error. All 41 URLs were also pushed to Bing and other engines through IndexNow.
- **Fresh sitemap dates.** All 39 pages report 2 October 2026 as last change, so crawlers know everything is worth another look.
- **More facts for AI assistants.** `llms.txt` now states the map numbers (43 places in 20 towns, 14 in Sneek), that listing will become paid, the Noderunners origin, the Nostr and X accounts, how often meetups happen and where the sats calculator lives. Fewer chances for a chatbot to make things up about us.

## Round 43: Zap us (October 2026)

- **Donating sats works today.** The donation card on the support page no longer says "ask us personally". It shows the community's Lightning address (`bitcoinFriesland@coinos.io`) with a copy button, a purple "Zap ons op Nostr" button and an "Open in je wallet" button that hands the address to any Lightning wallet. People were already zapping the Nostr profile; now the website admits it.
- The site audit treats `lightning:`, `bitcoin:` and `nostr:` links as external, like `mailto:`.
- `llms.txt` and the support summaries mention the donation route.

## Maintenance notes
### Support forms on Cloudflare Pages - 28 September 2026
- The forms were built for Netlify Forms, but the site runs on Cloudflare Pages, where posting to `/nl/support` answered "405 Method Not Allowed" and every request would have been lost. A small Pages Function now receives both forms in all three languages and sends each request to a private Telegram chat, then returns visitors to the same confirmation as before.
- Visitors only see "received" after Telegram accepted the message; otherwise they get an error page with the e-mail address. Spam is limited by the honeypot, a same-site check and length caps.
- One-time setup (bot token and chat id in Cloudflare) is described in MAINTENANCE.md. Until it is done, the forms show the error page instead of a false confirmation. No visible design or copy changes.

### Repository hygiene — 26 September 2026
- Aligned contributor and maintenance checks with the actual CI workflow, including its trigger and browser-test limitations.
- Corrected footer-helper and fragment-audit guidance; documented local-only serving, stacked branches and preview/production boundaries.
- Added editor defaults and ignore rules for local credentials, dependencies and browser reports. No runtime, content, compiled CSS or deployment changes.

### Keyboard navigation fixes — 26 September 2026
- Fixed the inactive homepage down arrow in all three languages; it now scrolls and moves keyboard focus to the introduction.
- Fixed lost keyboard focus when switching between mobile and desktop navigation.
- Close language and mobile dropdowns when keyboard users tab out, keeping expanded-state announcements synchronized.
- Added nine browser regressions (three per language) and refreshed shared asset versions.

### Event archive correction — 26 September 2026
- Moved the 19 September NodeRunners conference into past events in Dutch, English and Frisian, with an explicit past label and archival description.
- Removed expired homepage ticket promotions and conference discount controls.
- Updated AI-readable summaries, sitemap dates and regression tests. No upcoming events are currently listed.

- No page design, colours or footer navigation changed for visitors.
- The "X" and "Nostr" footer links are gone for now. Add them back when you
  have the real account addresses. (Update, October 2026: they are back, with
  the real accounts. See Round 39.)
- After this goes live, it helps to open Google Search Console and ask Google
  to re-check the home page so it picks up the new questions-and-answers data.
