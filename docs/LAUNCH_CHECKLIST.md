# Launch checklist

## Before go-live
- [ ] Owner confirms the items in README → “Before launch”.
- [ ] Vercel env vars set; `NEXT_PUBLIC_SITE_URL` = real domain (no trailing slash).
- [ ] Custom domain added in Vercel; HTTPS active; `www` redirects to the main domain (or the reverse).
- [ ] Open `/sitemap.xml` and `/robots.txt` on the live domain; URLs show the real domain.
- [ ] Submit a test enquiry and confirm the owner’s phone receives it (see WHATSAPP_SETUP.md).
- [ ] Tap every phone, email and WhatsApp link on a real phone.
- [ ] Run Lighthouse (mobile) on `/` and `/fleet`.
- [ ] Validate structured data at search.google.com/test/rich-results.

## Search Console
1. search.google.com/search-console → Add property → **Domain** → verify via DNS TXT record at the domain registrar.
2. Sitemaps → submit `https://<domain>/sitemap.xml`.
3. URL inspection → request indexing for `/`, `/fleet`, `/services`, `/contact`.

## Google Business Profile (biggest local-search lever)
- Claim or create the profile for Mahi Tours & Travels with the **same** name, phone and address as the site; add the website URL and real fleet photos.

## Monthly
- Search Console → Performance: queries such as “car rental with driver Vadodara”, “tempo traveller rental Vadodara”, “airport taxi Vadodara”. Watch impressions, clicks and average position. Rankings are not guaranteed.
- Check Vercel logs for `[enquiries] WhatsApp send failed`.
- Keep `src/lib/site.ts` current when vehicles change.
