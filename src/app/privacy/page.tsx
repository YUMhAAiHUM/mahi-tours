import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Mahi Tours & Travels uses the details you send through the website enquiry form and WhatsApp.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <section className="container page-hero" style={{ paddingBottom: "var(--section)" }}>
      <h1 className="h1">Privacy</h1>
      <div className="prose">
        <p>This page explains what happens to the details you share with {site.name} through this website.</p>
        <h2>What we collect</h2>
        <p>When you use the enquiry form, we collect your name, mobile number and trip details: pickup, destination, dates, number of passengers, vehicle and AC preferences, and any notes you add.</p>
        <h2>How we use it</h2>
        <p>We use these details only to reply to your enquiry with availability and a quotation, and to arrange your trip if you decide to book.</p>
        <h2>How it is sent</h2>
        <ul>
          <li>When you submit the form, your details are sent from our website’s server to our WhatsApp number using the WhatsApp Business Platform, which is operated by Meta.</li>
          <li>If you choose to send your enquiry on WhatsApp yourself, the message goes directly from your WhatsApp account to ours.</li>
          <li>The website does not store your enquiry in a database.</li>
        </ul>
        <h2>Cookies and analytics</h2>
        <p>This website does not use advertising or analytics cookies.</p>
        <h2>Questions</h2>
        <p>For any question about your details, email <a href={`mailto:${site.emails[0]}`}>{site.emails[0]}</a> or call <a href={`tel:${site.phones[0].e164}`}>{site.phones[0].display}</a>.</p>
      </div>
    </section>
  );
}
