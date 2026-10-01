// Google Search Console ownership file for https://bitcoinfriesland.com/.
// Served by a Function because Cloudflare Pages redirects every static .html
// address to its clean URL, and Google needs this exact path to answer 200.
// Keep this file for as long as the Search Console property should stay verified.

const BODY = 'google-site-verification: googleb3d0f0d3587596d4.html';

export function onRequestGet() {
  return new Response(BODY, { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
}
