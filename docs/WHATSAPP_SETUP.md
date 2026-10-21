# WhatsApp setup

There are two separate features.

## A. Customer-initiated chat (works now)

`wa.me` links with prefilled text, on every vehicle card, the CTA band, the mobile action bar and as the form fallback.
Number: `NEXT_PUBLIC_WHATSAPP_NUMBER` (default `919913830802`). **Confirm this number is on WhatsApp.**

## B. Automatic notification to the owner (needs Meta setup)

Status: **implemented, awaiting configuration.** Tested only against a mock server (see TEST_REPORT.md).

### What the owner needs

1. A **Meta Business Portfolio** (business.facebook.com).
2. A **WhatsApp Business Account** with a **sending number** registered on the Cloud API.
   - Simplest setup: register a **separate number** for sending (a new SIM or virtual number). The owner keeps 99138 30802 on his phone as the **recipient**.
   - A number registered on the Cloud API generally can’t stay in the normal WhatsApp app, unless Meta’s *coexistence* onboarding is available for the account. Check Meta’s current docs before moving an existing number.
3. A Meta app (developers.facebook.com → Create app → Business) with the WhatsApp product added.
4. A **permanent access token**: Business Settings → System users → add a system user → assign the app and WhatsApp account → generate a token with `whatsapp_business_messaging` and `whatsapp_business_management`.
5. A payment method on the WhatsApp account. Business-initiated template messages are chargeable by Meta. Check current pricing for India.

### Message template

Create it in WhatsApp Manager → Message templates. Use category **Utility**, name `website_enquiry`, language **English** (code `en`).

Body (exactly 10 variables, in this order):

```
New website enquiry for Mahi Tours & Travels.
Name: {{1}}
Phone: {{2}}
Pickup: {{3}}
Destination: {{4}}
Travel date: {{5}}
Return date: {{6}}
Passengers: {{7}}
Vehicle: {{8}}
AC: {{9}}
Notes: {{10}}
```

Empty optional fields are sent as `-`. Wait for the template to be approved before testing. If Meta changes the template category or rejects it, adjust the wording and resubmit.

### Environment variables (Vercel → Settings → Environment Variables)

| Variable | Value |
|---|---|
| `WHATSAPP_ACCESS_TOKEN` | Permanent system-user token (secret) |
| `WHATSAPP_PHONE_NUMBER_ID` | From WhatsApp → API Setup (ID of the **sending** number, not the number itself) |
| `WHATSAPP_OWNER_RECIPIENT` | `919913830802`, or whichever number the owner confirms |
| `WHATSAPP_TEMPLATE_NAME` | `website_enquiry` |
| `WHATSAPP_TEMPLATE_LANGUAGE` | `en` (must match the template) |
| `WHATSAPP_API_VERSION` | A currently supported Graph API version, e.g. `v24.0`. Check Meta’s changelog. |

All are server-only. Never prefix them with `NEXT_PUBLIC_`. Redeploy after setting them.

### Live test

1. Submit the form on the production site with your own name and number.
2. Confirm the form says “sent”, **and** confirm the owner’s phone actually received the message.
3. If the form shows the WhatsApp fallback, check Vercel → Logs for `[enquiries] WhatsApp send failed:`. That line shows Meta’s error code. Common causes: template not approved, parameter count mismatch, expired token, or no payment method.

Only mark this feature live after step 2 succeeds on the real number.
