# Mahi Tours & Travels — website

Car rental with driver, New VIP Road, Vadodara. Next.js 15 (App Router) + TypeScript, no database.

## Run locally

```bash
npm install
cp .env.example .env.local   # optional; the site runs without it
npm run dev                  # http://localhost:3000
```

Checks: `npx tsc --noEmit`, `npm run lint`, `npm run build`.

## Structure

| Path | What it is |
|---|---|
| `src/lib/site.ts` | **All business facts**: phones, emails, fleet, services, FAQs. Edit content here. |
| `src/lib/enquiry.ts` | Enquiry validation (shared by browser and server) and WhatsApp message text |
| `src/lib/whatsapp.ts` | Server-only WhatsApp Cloud API sender (template message) |
| `src/app/api/enquiries/route.ts` | `POST /api/enquiries`: validation, honeypot, rate limit, owner notification |
| `src/components/` | Header, Footer, Lineup, FleetGrid, EnquiryForm, Faq, CtaBand, ActionBar |
| `src/app/` | Pages: `/`, `/fleet`, `/services`, `/about`, `/contact`, `/privacy`, plus `sitemap.xml`, `robots.txt` |
| `src/app/globals.css` | Design tokens and all styles |
| `public/images/` | Edited, optimised WebP images used by the site |
| `assets/originals/` | Original photos as supplied (not served) |
| `docs/` | WhatsApp setup, image manifest, launch checklist and test report |

## How enquiries work

1. Customer submits the form → `POST /api/enquiries` validates it on the server.
2. If WhatsApp Cloud API is configured, the server sends the owner a template message. The customer sees “sent” only when Meta **accepts** the message (acceptance is not proof of delivery).
3. If it isn’t configured, Meta rejects it, or the customer is rate-limited, the customer gets a **Send on WhatsApp** button with all their details prefilled. No enquiry is silently lost.

Every “Ask about this vehicle” link opens WhatsApp with a prefilled message; the customer presses Send.

Setup: see `docs/WHATSAPP_SETUP.md`.

## Deploy (Vercel)

1. Push this repo to GitHub.
2. Vercel → **Add New → Project** → import the repo. Framework: Next.js (auto). No build settings to change.
3. Add environment variables from `.env.example` (Production + Preview). Leave the WhatsApp API ones blank until Meta setup is done.
4. Deploy, then add the custom domain under **Settings → Domains** and set `NEXT_PUBLIC_SITE_URL` to it. Redeploy.

## Before launch: confirm with the owner

- Which number receives WhatsApp enquiries (currently 99138 30802).
- Seat counts, and whether bus seat numbers include the driver.
- BMW (5 Series) and Audi (Q7) model names, identified from photos.
- Permission to show the man in the Audi photo, or a replacement photo.
- Rights to use the bus photos that carry other operators’ names (Patliputra, Jay Jalaram/Helly, Ambica).
- Exact wording of the Devanagari line “॥ नवदुर्गा बिना ॥” (left off the site; “बिना” means “without”).
- Logo file, if one exists (the site currently uses a typeset wordmark).
- Ertiga, Innova Crysta, Force Urbania and Tempo Traveller use manufacturer images and are labelled as such. Replace them with photos of the real vehicles when possible.
