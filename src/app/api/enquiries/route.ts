import { NextResponse } from "next/server";
import { parseEnquiry } from "@/lib/enquiry";
import { sendOwnerNotification } from "@/lib/whatsapp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Best-effort, per-instance rate limit: 5 enquiries per IP per 10 minutes.
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > LIMIT;
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, code: "bad_request" }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field. Pretend success so bots move on.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true, code: "accepted" });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, code: "rate_limited" }, { status: 429 });
  }

  const { data, errors } = parseEnquiry(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, code: "invalid", errors }, { status: 422 });
  }

  const result = await sendOwnerNotification(data);
  if (result.ok) {
    // "accepted" means Meta accepted the message for delivery, not that it was delivered or read.
    return NextResponse.json({ ok: true, code: "accepted" });
  }
  if (result.reason === "not_configured") {
    return NextResponse.json({ ok: false, code: "not_configured" }, { status: 503 });
  }
  console.error("[enquiries] WhatsApp send failed:", result.detail);
  return NextResponse.json({ ok: false, code: "send_failed" }, { status: 502 });
}
