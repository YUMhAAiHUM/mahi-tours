# Test report (pre-deployment, local production build)

Date: 21 Oct 2026. Environment: `next build` + `next start`, Node 22, headless Chromium 141.

## Passed

| Area | Test | Result |
|---|---|---|
| Build | `npx tsc --noEmit` | Pass, 0 errors |
| Build | `npm run lint` | Pass, 0 warnings |
| Build | `npm run build` | Pass. All pages static except `/api/enquiries`. Home first-load JS 117 kB |
| Routes | `/ /fleet /services /about /contact /privacy /robots.txt /sitemap.xml /icon.svg` | All 200; unknown route returns 404 page |
| API | Valid enquiry, API configured (mock Graph server) | 200 `accepted`. Payload: `/v24.0/{id}/messages`, Bearer token, template `website_enquiry`, 10 params in order, newline in notes flattened |
| API | Meta rejects (mock 400) | 502 `send_failed`; server logs Meta error code and message, no secrets |
| API | Not configured | 503 `not_configured` |
| API | Invalid fields | 422 with per-field errors |
| API | Honeypot filled | 200 (silently discarded, nothing sent) |
| API | Malformed JSON | 400 |
| API | Rate limit (7 rapid requests, one IP) | Requests 6–7 return 429 |
| Form | Empty submit | 6 inline errors; focus moves to first invalid field |
| Form | Valid submit with API unconfigured | Fallback shown with prefilled `wa.me/919913830802` link containing all details |
| Form | Double submit | Button disabled while sending |
| Fleet | Filter “Coaches” | 3 vehicles shown |
| Layout | Horizontal overflow at 1440px and 390px (home, fleet, contact, services) | None |
| Images | Broken images | None. All 9 lazy fleet images load on scroll at 390px |
| Mobile | Menu opens; Escape closes | Pass |
| Mobile | Hero lineup swipes horizontally with visible hint | Pass |
| SEO | Unique `<title>` and canonical per page, one `<h1>` per page | Pass |
| SEO | JSON-LD | `AutoRental` (site-wide) and `FAQPage` (home) present; syntax valid JSON |
| SEO | robots.txt allows site, disallows `/api/`, links sitemap | Pass |

## Not yet tested (blocked or out of scope here)

| Item | Why |
|---|---|
| Live WhatsApp owner notification | Needs Meta account, approved template and token. Mock only |
| Production URLs in sitemap and canonicals | Local run uses localhost; on Vercel they use the production domain |
| Lighthouse scores | Not run. Run on the deployed URL |
| Screen-reader pass (NVDA/VoiceOver) | Not run. Semantic markup, labels, focus states and aria-live are in place |
| Real iOS/Android devices | Tested in Chromium device emulation only |
| Rate limiter across serverless instances | In-memory, per instance; best-effort only |

## Known console output

The 503 from `/api/enquiries` appears in the browser console while WhatsApp is unconfigured. This is expected; the customer sees the WhatsApp fallback.
