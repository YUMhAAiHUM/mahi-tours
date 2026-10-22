import type { Metadata } from "next";
import { pageMeta } from "@/lib/site";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import { services, waLink } from "@/lib/site";

export const metadata: Metadata = pageMeta("Outstation Cab, Airport Taxi & Tour Services from Vadodara", "Taxi service in Vadodara for city travel, outstation cab trips, airport transfers, tours, pilgrimages, school picnics, corporate travel and wedding cars. All with driver.", "/services");

export default function ServicesPage() {
  return (
    <>
      <section className="container page-hero">
        <h1 className="h1">Where we take you</h1>
        <p className="lead">Every trip comes with a vehicle and a driver. Tell us what you’re planning and we’ll match the vehicle to your group and route.</p>
      </section>
      <div className="container section">
        {services.map((s) => (
          <section key={s.slug} id={s.slug} className="service-block" aria-labelledby={`${s.slug}-h`}>
            <h2 id={`${s.slug}-h`}>{s.title}</h2>
            <div>
              <p className="body">{s.body}</p>
              <p className="small muted">Usually booked with: {s.vehicles}</p>
              <p style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: "8px 24px" }}>
                <a className="link" href={waLink(`Hello Ajit, I’m enquiring about ${s.title.toLowerCase()}. `)}>Enquire on WhatsApp</a>
                <Link className="link" href="/fleet">See the fleet</Link>
              </p>
            </div>
          </section>
        ))}
      </div>
      <CtaBand />
    </>
  );
}
