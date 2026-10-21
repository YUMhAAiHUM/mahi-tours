"use client";

import Image from "next/image";
import { useState } from "react";
import { fleet, fleetCategories, waLink, type FleetCategory } from "@/lib/site";

type Filter = "all" | FleetCategory;

export default function FleetGrid() {
  const [filter, setFilter] = useState<Filter>("all");
  const tabs: { id: Filter; label: string }[] = [{ id: "all", label: "All" }, ...fleetCategories.map((c) => ({ id: c.id, label: c.label }))];
  const items = filter === "all" ? fleet : fleet.filter((v) => v.category === filter);

  return (
    <>
      <div className="section-head">
        <div>
          <h2 className="h2" id="fleet-heading">The fleet</h2>
          <p className="body">Every vehicle comes with a driver. Pick by how many of you are travelling.</p>
        </div>
        <div className="tabs" role="group" aria-label="Filter the fleet">
          {tabs.map((t) => (
            <button key={t.id} type="button" className="tab" aria-pressed={filter === t.id} onClick={() => setFilter(t.id)}>
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <div className="fleet-grid" aria-live="polite">
        {items.map((v) => (
          <article key={v.slug} className="vehicle">
            <div className="vehicle-media">
              <Image src={v.image} alt={v.alt} width={1200} height={800} sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 400px" />
              {v.manufacturerImage && <span className="media-note">Manufacturer image</span>}
            </div>
            <div className="vehicle-meta">
              <div>
                <h3 className="h3">{v.name}</h3>
                <p>{v.short}</p>
              </div>
              <div className="cap">
                <strong>{v.capacity}</strong>
                <span>{v.unit}</span>
              </div>
            </div>
            <a className="link" href={waLink(`Hello Ajit, I’d like a quote for the ${v.name}. My trip: `)}>
              Ask about this vehicle<span className="sr-only"> ({v.name}) on WhatsApp</span>
            </a>
          </article>
        ))}
      </div>
    </>
  );
}
