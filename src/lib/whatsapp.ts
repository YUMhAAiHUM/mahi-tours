import "server-only";
import type { Enquiry } from "./enquiry";

/**
 * Sends the owner notification through the WhatsApp Business Platform (Meta Cloud API).
 * Business-initiated messages outside a 24-hour customer-service window must use an
 * approved template, so this sends a template. See docs/WHATSAPP_SETUP.md for the
 * template body; its variables must be in the order of `templateParams` below.
 */

export type SendResult =
  | { ok: true; messageId: string }
  | { ok: false; reason: "not_configured" | "send_failed"; detail?: string };

function config() {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const to = process.env.WHATSAPP_OWNER_RECIPIENT;
  const template = process.env.WHATSAPP_TEMPLATE_NAME;
  if (!token || !phoneNumberId || !to || !template) return null;
  return {
    token,
    phoneNumberId,
    to: to.replace(/\D/g, ""),
    template,
    language: process.env.WHATSAPP_TEMPLATE_LANGUAGE || "en",
    version: process.env.WHATSAPP_API_VERSION || "v24.0",
    // Only for local testing against a mock server; leave unset in production.
    base: (process.env.WHATSAPP_GRAPH_BASE_URL || "https://graph.facebook.com").replace(/\/$/, ""),
  };
}

export function isWhatsAppConfigured(): boolean {
  return config() !== null;
}

/** Template parameters can't contain newlines, tabs or 4+ consecutive spaces, or be empty. */
const param = (v?: string) => ({ type: "text", text: (v || "-").replace(/[\n\t]+/g, " ").replace(/ {4,}/g, "   ").slice(0, 300) });

function templateParams(e: Enquiry) {
  return [e.name, e.phone, e.pickup, e.destination, e.travelDate, e.returnDate, e.passengers, e.vehicle, e.ac, e.notes].map(param);
}

export async function sendOwnerNotification(e: Enquiry): Promise<SendResult> {
  const c = config();
  if (!c) return { ok: false, reason: "not_configured" };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10_000);
  try {
    const res = await fetch(`${c.base}/${c.version}/${c.phoneNumberId}/messages`, {
      method: "POST",
      headers: { Authorization: `Bearer ${c.token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: c.to,
        type: "template",
        template: {
          name: c.template,
          language: { code: c.language },
          components: [{ type: "body", parameters: templateParams(e) }],
        },
      }),
      signal: controller.signal,
      cache: "no-store",
    });
    const json = (await res.json().catch(() => ({}))) as { messages?: { id: string }[]; error?: { message?: string; code?: number } };
    if (res.ok && json.messages?.[0]?.id) return { ok: true, messageId: json.messages[0].id };
    return { ok: false, reason: "send_failed", detail: `${res.status} ${json.error?.code ?? ""} ${json.error?.message ?? ""}`.trim() };
  } catch (err) {
    return { ok: false, reason: "send_failed", detail: err instanceof Error ? err.message : "unknown error" };
  } finally {
    clearTimeout(timer);
  }
}
