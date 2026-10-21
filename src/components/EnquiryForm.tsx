"use client";

import { useRef, useState, type FormEvent } from "react";
import { enquiryText, parseEnquiry, type Enquiry, type EnquiryErrors } from "@/lib/enquiry";
import { waLink } from "@/lib/site";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "accepted" }
  | { kind: "fallback"; reason: "unavailable" | "rate_limited"; link: string };

const empty: Enquiry = { name: "", phone: "", pickup: "", destination: "", travelDate: "", returnDate: "", passengers: "", vehicle: "", ac: "", notes: "" };

const vehicles = ["Car or SUV", "Wedding car", "Traveller (12 to 20)", "Mini coach (28 to 29)", "56-seat AC coach"];

export default function EnquiryForm({ compact = false, heading = "Get a quote" }: { compact?: boolean; heading?: string }) {
  const [values, setValues] = useState<Enquiry>(empty);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [more, setMore] = useState(!compact);
  const formRef = useRef<HTMLFormElement>(null);
  const today = new Date().toISOString().slice(0, 10);

  const set = (k: keyof Enquiry) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
    if (status.kind === "accepted" || status.kind === "fallback") setStatus({ kind: "idle" });
  };

  const err = (k: keyof Enquiry) =>
    errors[k] ? { "aria-invalid": true as const, "aria-describedby": `err-${k}` } : {};

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.kind === "sending") return;

    const honeypot = (formRef.current?.elements.namedItem("company") as HTMLInputElement | null)?.value || "";
    const { data, errors: found } = parseEnquiry({ ...values });
    if (Object.keys(found).length > 0) {
      setErrors(found);
      if (found.returnDate || found.notes || found.vehicle) setMore(true);
      // Focus the first invalid field in on-screen order once React has rendered the errors.
      setTimeout(() => formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(), 0);
      return;
    }

    setStatus({ kind: "sending" });
    const fallbackLink = waLink(enquiryText(data));
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, company: honeypot }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; code?: string; errors?: EnquiryErrors };
      if (res.ok && json.ok) {
        setStatus({ kind: "accepted" });
        return;
      }
      if (json.code === "invalid" && json.errors) {
        setErrors(json.errors);
        setStatus({ kind: "idle" });
        return;
      }
      setStatus({ kind: "fallback", reason: json.code === "rate_limited" ? "rate_limited" : "unavailable", link: fallbackLink });
    } catch {
      setStatus({ kind: "fallback", reason: "unavailable", link: fallbackLink });
    }
  }

  const sending = status.kind === "sending";

  return (
    <form ref={formRef} className="quote" onSubmit={onSubmit} noValidate aria-labelledby="quote-heading">
      <div className="quote-head">
        <h2 id="quote-heading">{heading}</h2>
        <p>Ajit replies with availability and the fare. Nothing is booked until you confirm.</p>
      </div>

      <div className="row">
        <div className="field grow">
          <label htmlFor="q-pickup">Pickup</label>
          <input id="q-pickup" name="pickup" type="text" autoComplete="street-address" placeholder="Area or address" value={values.pickup} onChange={set("pickup")} {...err("pickup")} />
          {errors.pickup && <span id="err-pickup" className="field-error">{errors.pickup}</span>}
        </div>
        <div className="field grow">
          <label htmlFor="q-destination">Destination</label>
          <input id="q-destination" name="destination" type="text" placeholder="Where to?" value={values.destination} onChange={set("destination")} {...err("destination")} />
          {errors.destination && <span id="err-destination" className="field-error">{errors.destination}</span>}
        </div>
        <div className="field">
          <label htmlFor="q-date">Travel date</label>
          <input id="q-date" name="travelDate" type="date" min={today} value={values.travelDate} onChange={set("travelDate")} {...err("travelDate")} />
          {errors.travelDate && <span id="err-travelDate" className="field-error">{errors.travelDate}</span>}
        </div>
        <div className="field narrow">
          <label htmlFor="q-pax">Passengers</label>
          <input id="q-pax" name="passengers" type="number" inputMode="numeric" min={1} max={200} placeholder="4" value={values.passengers} onChange={set("passengers")} {...err("passengers")} />
          {errors.passengers && <span id="err-passengers" className="field-error">{errors.passengers}</span>}
        </div>
      </div>

      {more && (
        <div className="row">
          <div className="field">
            <label htmlFor="q-return">Return date (optional)</label>
            <input id="q-return" name="returnDate" type="date" min={values.travelDate || today} value={values.returnDate} onChange={set("returnDate")} {...err("returnDate")} />
            {errors.returnDate && <span id="err-returnDate" className="field-error">{errors.returnDate}</span>}
          </div>
          <div className="field">
            <label htmlFor="q-vehicle">Vehicle (optional)</label>
            <select id="q-vehicle" name="vehicle" value={values.vehicle} onChange={set("vehicle")}>
              <option value="">Suggest one for me</option>
              {vehicles.map((v) => <option key={v}>{v}</option>)}
            </select>
          </div>
          <div className="field">
            <label htmlFor="q-ac">AC (optional)</label>
            <select id="q-ac" name="ac" value={values.ac} onChange={set("ac")}>
              <option value="">No preference</option>
              <option>AC</option>
              <option>Non-AC</option>
            </select>
          </div>
          <div className="field" style={{ flexBasis: "100%" }}>
            <label htmlFor="q-notes">Anything else (optional)</label>
            <textarea id="q-notes" name="notes" maxLength={500} placeholder="Stops on the way, luggage, flight time, hotel help…" value={values.notes} onChange={set("notes")} />
          </div>
        </div>
      )}

      <div className="row">
        <div className="field grow">
          <label htmlFor="q-name">Your name</label>
          <input id="q-name" name="name" type="text" autoComplete="name" value={values.name} onChange={set("name")} {...err("name")} />
          {errors.name && <span id="err-name" className="field-error">{errors.name}</span>}
        </div>
        <div className="field grow">
          <label htmlFor="q-phone">Mobile number</label>
          <input id="q-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="10-digit mobile" value={values.phone} onChange={set("phone")} {...err("phone")} />
          {errors.phone && <span id="err-phone" className="field-error">{errors.phone}</span>}
        </div>
        <button type="submit" className="btn btn-gold submit" disabled={sending} aria-disabled={sending}>
          {sending ? "Sending…" : "Send enquiry"}
        </button>
      </div>

      {/* Honeypot for bots: hidden from people and screen readers. */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="q-company">Company</label>
        <input id="q-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {compact && (
        <button type="button" className="more-toggle" aria-expanded={more} onClick={() => setMore((m) => !m)}>
          {more ? "Fewer options" : "Add return date, vehicle, AC and notes"}
        </button>
      )}

      <div aria-live="polite" role="status">
        {status.kind === "accepted" && (
          <div className="form-status" data-tone="ok">
            <p><strong>Thanks, your enquiry has been sent to Ajit.</strong></p>
            <p>He’ll get back to you on {values.phone} with availability and the fare. If it’s urgent, call{" "}
              <a href="tel:+919913830802" style={{ color: "var(--gold-light)" }}>99138 30802</a>.</p>
          </div>
        )}
        {status.kind === "fallback" && (
          <div className="form-status" data-tone="warn">
            <p>
              {status.reason === "rate_limited"
                ? "You’ve sent several enquiries in a short time. Please send this one on WhatsApp instead."
                : "We couldn’t send your enquiry automatically. Your details are ready to send on WhatsApp instead."}
            </p>
            <a className="btn btn-gold" href={status.link} target="_blank" rel="noopener noreferrer">Send on WhatsApp</a>
          </div>
        )}
      </div>
    </form>
  );
}
