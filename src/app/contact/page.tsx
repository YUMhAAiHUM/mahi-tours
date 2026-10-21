import type { Metadata } from "next";
import EnquiryForm from "@/components/EnquiryForm";
import { site, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact and Quotes",
  description: "Call or WhatsApp Ajit at Mahi Tours & Travels, New VIP Road, Vadodara on 99138 30802 or 98241 30802, or send your trip details for a quotation.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="container page-hero">
        <h1 className="h1">Contact</h1>
        <p className="lead">Call, WhatsApp or send your trip details below. Ajit replies with availability and the fare.</p>
      </section>
      <section className="container section split">
        <div>
          <ul className="contact-list">
            <li>
              <strong>Phone</strong>
              {site.phones.map((p) => <a key={p.e164} href={`tel:${p.e164}`}>{p.display}</a>)}
            </li>
            <li>
              <strong>WhatsApp</strong>
              <a href={waLink("Hello Ajit, I’d like to ask about a trip.")}>Message Ajit</a>
            </li>
            <li>
              <strong>Email</strong>
              {site.emails.map((e) => <a key={e} href={`mailto:${e}`} style={{ fontSize: 17 }}>{e}</a>)}
            </li>
            <li>
              <strong>Location</strong>
              <span style={{ fontSize: 19, fontWeight: 600 }}>{site.address.street}, {site.address.locality}, {site.address.region}</span>
            </li>
          </ul>
        </div>
        <div id="quote" style={{ scrollMarginTop: 16 }}>
          <EnquiryForm heading="Send your trip details" />
        </div>
      </section>
      <div style={{ height: "var(--section)" }} />
    </>
  );
}
