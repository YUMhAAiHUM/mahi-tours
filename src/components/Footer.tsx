import Link from "next/link";
import { site, fleetCategories, services } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <p className="footer-brand">MAHI</p>
            <p>Tours &amp; Travels</p>
            <p style={{ marginTop: 18 }}>{site.address.street}, {site.address.locality}, {site.address.region}, India</p>
            <p style={{ marginTop: 6 }}>Safe, comfortable, reliable, affordable.</p>
          </div>
          <div>
            <h2>Contact {site.contactPerson}</h2>
            <ul>
              {site.phones.map((p) => (
                <li key={p.e164}><a className="gold" href={`tel:${p.e164}`}>{p.display}</a></li>
              ))}
              {site.emails.map((e) => (
                <li key={e}><a className="gold" href={`mailto:${e}`}>{e}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Fleet</h2>
            <ul>
              {fleetCategories.map((c) => (
                <li key={c.id}><Link href={`/fleet#${c.id}`}>{c.title}</Link></li>
              ))}
              <li><Link href="/fleet#weddings">Wedding cars</Link></li>
            </ul>
          </div>
          <div>
            <h2>Services</h2>
            <ul>
              {services.slice(0, 5).map((s) => (
                <li key={s.slug}><Link href={`/services#${s.slug}`}>{s.title}</Link></li>
              ))}
              <li><Link href="/services">All services</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {year} {site.name}</span>
          <span style={{ display: "flex", gap: 20 }}>
            <Link href="/about">About</Link>
            <Link href="/privacy">Privacy</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
