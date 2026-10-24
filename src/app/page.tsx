import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Lineup from "@/components/Lineup";
import EnquiryForm from "@/components/EnquiryForm";
import FleetGrid from "@/components/FleetGrid";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import { fleet, pageMeta, services, waLink, weddingCars } from "@/lib/site";

export const metadata: Metadata = pageMeta(
  "Car Rental with Driver in Vadodara | Taxi, Outstation Cab & Bus Hire | Mahi Tours & Travels",
  "Car rental with driver and taxi service in Vadodara: outstation cabs, airport transfers, Innova Crysta, Tempo Traveller and 56-seat AC coach hire for weddings and group tours. Call 99138 30802.",
  "/",
  true,
);

const groupFleet = fleet.filter((v) => v.category !== "cars");

export default function Home() {
  const [bmw, vintage, audi] = weddingCars;
  return (
    <>
      <section className="hero container" aria-labelledby="hero-heading">
        <Lineup />
        <div className="hero-top">
          <h1 id="hero-heading" className="h1 hero-title"><span className="sr-only">Car rental with driver in Vadodara: </span>From a wedding car to a 56-seat coach.</h1>
          <div className="hero-side">
            <p className="lead">Car rental with a driver from Vadodara, for city runs, outstation trips, airport transfers and group travel.</p>
            <div className="hero-actions">
              <a href="#quote" className="btn btn-primary">Plan your journey</a>
              <Link href="/fleet" className="link">Explore the fleet</Link>
            </div>
          </div>
        </div>
      </section>

      <section id="quote" className="container" style={{ paddingTop: 36, scrollMarginTop: 16 }}>
        <EnquiryForm compact />
      </section>

      <section className="section container" aria-labelledby="fleet-heading">
        <FleetGrid />
      </section>

      <section className="dark-band" aria-labelledby="weddings-heading">
        <div className="container wedding">
          <div className="wedding-copy">
            <h2 id="weddings-heading" className="h2">Weddings and VIP arrivals</h2>
            <p className="body">A decorated BMW for the groom, an open-top vintage car for the photographs, an Audi Q7 for family and guests. Add travellers and coaches to bring everyone else.</p>
            <a className="btn btn-gold" href={waLink("Hello Ajit, I’d like to book a car for a wedding. Date: , Venue: ")}>Ask about a wedding booking</a>
          </div>
          <div className="wedding-photos">
            <Image src={bmw.image} alt={bmw.alt} width={bmw.width} height={bmw.height} sizes="(max-width: 720px) 100vw, 420px" />
            <div className="wedding-stack">
              <Image src={vintage.image} alt={vintage.alt} width={vintage.width} height={vintage.height} sizes="(max-width: 720px) 100vw, 340px" style={{ objectPosition: "40% 55%" }} />
              <Image src={audi.image} alt={audi.alt} width={audi.width} height={audi.height} sizes="(max-width: 720px) 100vw, 340px" style={{ objectPosition: "25% 60%" }} />
            </div>
          </div>
        </div>
      </section>

      <section id="groups" className="section container split" aria-labelledby="groups-heading">
        <div>
          <h2 id="groups-heading" className="h2">Group travel</h2>
          <p className="body" style={{ marginTop: 18, maxWidth: "26em" }}>School and college picnics, office outings, pilgrimages and wedding guests. Tell us the headcount and route and we’ll suggest one vehicle or a mix.</p>
          <a className="btn btn-primary" style={{ marginTop: 28 }} href={waLink("Hello Ajit, I’m planning a group trip. Group size: , Route: , Dates: ")}>Plan a group trip</a>
        </div>
        <div>
          {groupFleet.map((v) => (
            <div key={v.slug} className="ladder-row">
              <strong>{v.capacity}</strong>
              <div>
                <p>{v.name}</p>
                <span>{v.bestFor}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section container" aria-labelledby="services-heading">
        <h2 id="services-heading" className="h2">Where we take you</h2>
        <div className="svc-grid">
          {services.map((s) => (
            <div key={s.slug} className="svc">
              <h3>{s.title}</h3>
              <p>{s.short}</p>
              <Link href={`/services#${s.slug}`}>More about {s.title.toLowerCase()}</Link>
            </div>
          ))}
        </div>
      </section>

      <section className="section container" aria-labelledby="steps-heading">
        <div className="steps">
          <h2 id="steps-heading">How booking works</h2>
          <ol>
            <li><span className="step-num wide">1</span><h3>Share your journey</h3><p>Pickup, destination, dates and headcount, by the form, WhatsApp or a call.</p></li>
            <li><span className="step-num wide">2</span><h3>Get a quotation</h3><p>Ajit checks which vehicle is free on your dates and sends the fare.</p></li>
            <li><span className="step-num wide">3</span><h3>Confirm directly</h3><p>Your trip is booked once you agree the details with Mahi Tours &amp; Travels.</p></li>
          </ol>
        </div>
      </section>

      <section className="section container split" aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="h2">Questions</h2>
        <Faq withSchema />
      </section>

      <CtaBand />
    </>
  );
}
