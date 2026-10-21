import { site, waLink } from "@/lib/site";

/** Fixed call / WhatsApp bar shown on phones only (see .action-bar in globals.css). */
export default function ActionBar() {
  return (
    <div className="action-bar" role="region" aria-label="Quick contact">
      <a className="btn btn-primary" href={`tel:${site.phones[0].e164}`}>Call Ajit</a>
      <a className="btn btn-gold" href={waLink("Hello Ajit, I’d like to ask about a trip.")}>WhatsApp</a>
    </div>
  );
}
