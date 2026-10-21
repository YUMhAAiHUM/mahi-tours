import { site, waLink } from "@/lib/site";

export default function CtaBand() {
  return (
    <section className="cta-band" aria-labelledby="cta-heading">
      <div className="container">
        <h2 id="cta-heading" className="h2">Tell us where you’re going.</h2>
        <div className="cta-actions">
          <a className="btn btn-gold" href={waLink("Hello Ajit, I’d like to ask about a trip.")}>WhatsApp Ajit</a>
          <a className="btn btn-ghost-light" href={`tel:${site.phones[0].e164}`}>Call {site.phones[0].display}</a>
        </div>
      </div>
    </section>
  );
}
