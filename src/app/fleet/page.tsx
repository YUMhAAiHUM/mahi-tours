import type { Metadata } from "next";
import { pageMeta } from "@/lib/site";
import Image from "next/image";
import CtaBand from "@/components/CtaBand";
import { fleet, fleetCategories, waLink, weddingCars } from "@/lib/site";

export const metadata: Metadata = pageMeta("Cars, Tempo Traveller & Bus on Rent in Vadodara with Driver", "Hire a car, Innova Crysta, Ertiga, Tempo Traveller, Force Urbania, mini bus or 56-seat AC coach with driver in Vadodara. 4 to 56 passengers. Call 99138 30802 for a quote.", "/fleet");

export default function FleetPage() {
  return (
    <>
      <section className="container page-hero">
        <h1 className="h1">The fleet</h1>
        <p className="lead">Cars, travellers and coaches for 4 to 56 passengers. Every vehicle is rented with a driver. Send your headcount and route and Ajit will suggest the right one.</p>
      </section>

      <div className="container section">
        {fleetCategories.map((c) => (
          <section key={c.id} id={c.id} className="cat-block" aria-labelledby={`${c.id}-h`} style={{ scrollMarginTop: 24 }}>
            <div className="cat-head">
              <h2 id={`${c.id}-h`} className="h2" style={{ fontSize: "clamp(26px, 3vw, 36px)" }}>{c.title}</h2>
              <span className="muted">{c.intro}</span>
            </div>
            {fleet.filter((v) => v.category === c.id).map((v) => (
              <article key={v.slug} id={v.slug} className="vehicle-row">
                <div className="vehicle-media">
                  <Image src={v.image} alt={v.alt} width={1200} height={800} sizes="(max-width: 800px) 100vw, 600px" />
                  {v.manufacturerImage && <span className="media-note">Manufacturer image</span>}
                </div>
                <div className="vehicle-row-body">
                  <h3 className="h2" style={{ fontSize: 28 }}>{v.name}</h3>
                  <p className="body" style={{ marginTop: 10 }}>{v.short}</p>
                  <dl>
                    <dt>Capacity</dt><dd>{v.capacity} {v.unit}</dd>
                    <dt>Driver</dt><dd>Included</dd>
                    <dt>Best for</dt><dd>{v.bestFor}</dd>
                  </dl>
                  <a className="btn btn-primary" style={{ marginTop: 24 }} href={waLink(`Hello Ajit, I’d like a quote for the ${v.name}. My trip: `)}>
                    Ask about the {v.name}
                  </a>
                </div>
              </article>
            ))}
          </section>
        ))}

        <section id="weddings" className="cat-block" aria-labelledby="weddings-h" style={{ scrollMarginTop: 24 }}>
          <div className="cat-head">
            <h2 id="weddings-h" className="h2" style={{ fontSize: "clamp(26px, 3vw, 36px)" }}>Wedding and VIP cars</h2>
            <span className="muted">Decorated arrivals for the couple, and comfortable cars for family.</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 24 }}>
            {weddingCars.map((w) => (
              <figure key={w.name} style={{ margin: 0 }}>
                <Image src={w.image} alt={w.alt} width={w.width} height={w.height} sizes="(max-width: 720px) 100vw, 400px" style={{ width: "100%", aspectRatio: "4 / 5", objectFit: "cover", borderRadius: "var(--radius)" }} />
                <figcaption className="h3" style={{ marginTop: 14 }}>{w.name}</figcaption>
              </figure>
            ))}
          </div>
          <a className="btn btn-primary" style={{ marginTop: 32 }} href={waLink("Hello Ajit, I’d like to book a car for a wedding. Date: , Venue: ")}>Ask about a wedding booking</a>
        </section>

        <p className="small muted" style={{ marginTop: 64 }}>
          Ertiga, Innova Crysta, Force Urbania and Tempo Traveller are shown in manufacturer images. Capacities are passenger seats; confirm the exact seating for your trip when you enquire.
        </p>
      </div>
      <CtaBand />
    </>
  );
}
