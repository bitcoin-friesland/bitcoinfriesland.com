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

## Good to know
- No page design, colours or footer navigation changed for visitors.
- The "X" and "Nostr" footer links are gone for now. Add them back when you
  have the real account addresses.
- After this goes live, it helps to open Google Search Console and ask Google
  to re-check the home page so it picks up the new questions-and-answers data.
