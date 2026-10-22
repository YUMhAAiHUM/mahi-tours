import type { Metadata } from "next";
import { pageMeta } from "@/lib/site";
import Link from "next/link";
import Image from "next/image";
import CtaBand from "@/components/CtaBand";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta("About Us: Car Rental with Driver, New VIP Road, Vadodara", "Mahi Tours & Travels is a Vadodara car rental and taxi service on New VIP Road, run by Ajit, with cars, travellers and coaches for 4 to 56 passengers.", "/about");

export default function AboutPage() {
  return (
    <>
      <section className="container page-hero">
        <h1 className="h1">About Mahi Tours &amp; Travels</h1>
        <p className="lead">A Vadodara car rental business on New VIP Road. Every vehicle comes with a driver, from a single car to the airport to coaches for a whole school.</p>
      </section>
      <section className="container section split">
        <h2 className="h2">What we do</h2>
        <div className="prose" style={{ marginTop: 0 }}>
          <p>Mahi Tours &amp; Travels rents sedans, SUVs, travellers, mini coaches and a 56-seat AC coach with a driver. Customers book us for city travel, outstation trips, airport transfers, holidays, pilgrimages, school and college picnics, corporate travel and weddings. We can also help arrange hotel and resort bookings.</p>
          <p>Bookings are handled by {site.contactPerson}. Share your trip and he’ll tell you which vehicle suits your group, whether it’s free on your dates and what it will cost.</p>
          <p>We work by four simple values: {site.values.join(", ").toLowerCase()}.</p>
          <p style={{ marginTop: 24 }}><Link className="link" href="/fleet">See the fleet</Link></p>
        </div>
      </section>
      <section className="container section">
        <Image src="/images/hero/fleet-lineup.webp" alt="The Mahi Tours fleet lined up by size" width={3037} height={720} sizes="(max-width: 1240px) 100vw, 1184px" />
      </section>
      <CtaBand />
    </>
  );
}
