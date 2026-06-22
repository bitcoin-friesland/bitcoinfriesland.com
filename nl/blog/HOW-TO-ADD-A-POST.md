# How to add a new blog post

Short and simple. No coding needed beyond copy, paste and edit text.

## The quick version

1. **Copy** the file `beginnen-met-bitcoin-in-friesland.html` and give the copy
   a new name based on the topic, all lowercase with dashes instead of spaces.
   Example: `verslag-meetup-harlingen-mei-2026.html`. This name becomes the web
   address, so keep it short and use words people might search for.

2. **Open the copy** and change these things near the top (the part between
   `<head>` and `</head>`):
   - the `<title>` text
   - the `description` text
   - every place that has the old file name in a web address, change it to your
     new file name (there are a few: canonical, og:url, and the data block)
   - the date in two spots: `article:published_time` and, lower down, the
     `datePublished` and `dateModified` lines

3. **Write your article** in the middle section (between `<main>` and `</main>`).
   Change the big heading, the date line, the photo, and the paragraphs. Keep
   the grey "Risk warning" sentence at the bottom of the article.

4. **Add the post to the list page.** Open `index.html` in this folder, copy the
   block that sits between `<!-- POST CARD -->` and `<!-- END POST CARD -->`,
   paste it directly above the existing one (newest post on top), and change the
   title, date, summary and the link to point at your new file name.

5. **Add it to the feed and the sitemap** (helps Google and RSS readers):
   - In `rss.xml` (this folder), copy one `<item>...</item>` block, paste it as
     the first item, and update the title, link, date and description.
   - In the website's main `sitemap.xml` (top folder), copy one blog `<url>`
     block and update the address and date.

## Pictures

Put images in `assets/images/`. If you add a photo, reuse one that is already
there, or ask for new sizes to be made (the site uses several widths for speed).
Always keep the `alt="..."` description on an image so it stays accessible.

## Good habits

- Write in plain Dutch, the way you would explain it to a friend.
- Link to other pages on the site where it helps (meetups, the map, links).
- One clear topic per post. A short useful post beats a long vague one.
- Posts are in Dutch only for now. If one really deserves an English version,
  that can be added later.
