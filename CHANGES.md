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

## Files changed
- All 24 language pages in `nl/`, `en/` and `fy/`
- `index.html` (the front-door redirect page, now with language links)
- `404.html` (new, friendly page-not-found)
- `assets/main.js` (keyboard accessibility)
- `sitemap.xml` (rebuilt)
- `robots.txt` (faster crawl setting)
- `llms.txt` (new, summary for AI tools)

## Good to know
- No page design, colours, text content or navigation changed for visitors.
- The "X" and "Nostr" footer links are gone for now. Add them back when you
  have the real account addresses.
- After this goes live, it helps to open Google Search Console and ask Google
  to re-check the home page so it picks up the new questions-and-answers data.
