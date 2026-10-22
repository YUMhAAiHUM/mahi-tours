import type { Metadata } from "next";

/**
 * Single source of truth for business facts shown on the site.
 * Everything here comes from the client's catalogue or the vehicle photos supplied.
 * Items marked VERIFY need confirmation from the owner before launch (see README).
 */

export const site = {
  name: "Mahi Tours & Travels",
  shortName: "Mahi",
  tagline: "Car Rental with Driver",
  contactPerson: "Ajit",
  phones: [
    { display: "99138 30802", e164: "+919913830802" },
    { display: "98241 30802", e164: "+919824130802" },
  ],
  emails: ["mahi.tours@gmail.com", "mahi.tours10@gmail.com"],
  address: {
    street: "New VIP Road",
    locality: "Vadodara",
    region: "Gujarat",
    country: "IN",
  },
  values: ["Safe", "Comfortable", "Reliable", "Affordable"],
} as const;

/** WhatsApp number used for customer-initiated chats (digits only, with country code). VERIFY. */
export const whatsappNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919913830802").replace(/\D/g, "");

export function waLink(text: string): string {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
}

/** Canonical public domain. */
export const PRODUCTION_URL = "https://mahitoursandtravels.site";

export function siteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  if (process.env.VERCEL_ENV === "production") return PRODUCTION_URL;
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export type FleetCategory = "cars" | "travellers" | "coaches";

export interface Vehicle {
  slug: string;
  category: FleetCategory;
  name: string;
  /** Passenger capacity as shown to customers. VERIFY with owner. */
  capacity: string;
  unit: "passengers" | "seats";
  image: string;
  alt: string;
  short: string;
  bestFor: string;
  /** True when the photo is the manufacturer's image rather than Mahi's own vehicle. */
  manufacturerImage?: boolean;
}

export const fleetCategories: { id: FleetCategory; label: string; title: string; intro: string }[] = [
  { id: "cars", label: "Cars", title: "Cars and SUVs", intro: "For families, airport runs, outstation drives and weddings." },
  { id: "travellers", label: "Travellers", title: "Travellers and vans", intro: "For family tours, pilgrimages and office teams of 12 to 20." },
  { id: "coaches", label: "Coaches", title: "Mini coaches and coaches", intro: "For schools, colleges, events and large groups of up to 56." },
];

export const fleet: Vehicle[] = [
  {
    slug: "bmw-5-series",
    category: "cars",
    name: "BMW 5 Series",
    capacity: "4",
    unit: "passengers",
    image: "/images/fleet/bmw-5-series.webp",
    alt: "White BMW 5 Series decorated with red ribbon and flowers for a wedding",
    short: "Luxury sedan, often booked for weddings.",
    bestFor: "Wedding arrivals, VIP pickups and special occasions.",
  },
  {
    slug: "maruti-suzuki-ertiga",
    category: "cars",
    name: "Maruti Suzuki Ertiga",
    capacity: "6",
    unit: "passengers",
    image: "/images/fleet/ertiga.webp",
    alt: "Red Maruti Suzuki Ertiga, front three-quarter view",
    short: "Practical for families and airport runs.",
    bestFor: "Family trips, airport transfers and city travel.",
    manufacturerImage: true,
  },
  {
    slug: "toyota-innova-crysta",
    category: "cars",
    name: "Toyota Innova Crysta",
    capacity: "6–7",
    unit: "passengers",
    image: "/images/fleet/innova-crysta.webp",
    alt: "Bronze Toyota Innova Crysta, front three-quarter view",
    short: "Comfortable on long highway drives.",
    bestFor: "Outstation journeys, corporate travel and families with luggage.",
    manufacturerImage: true,
  },
  {
    slug: "maharaja-traveller",
    category: "travellers",
    name: "Maharaja traveller",
    capacity: "12",
    unit: "seats",
    image: "/images/fleet/maharaja-traveller-12-seat.webp",
    alt: "Grey Maharaja luxury traveller, front view",
    short: "Premium seating for family tours.",
    bestFor: "Family tours, pilgrimages and small groups who want extra comfort.",
  },
  {
    slug: "force-urbania",
    category: "travellers",
    name: "Force Urbania",
    capacity: "16",
    unit: "passengers",
    image: "/images/fleet/force-urbania.webp",
    alt: "White Force Urbania van, side profile",
    short: "Modern van for mid-sized groups.",
    bestFor: "Corporate transfers, day trips and mid-sized groups.",
    manufacturerImage: true,
  },
  {
    slug: "tempo-traveller",
    category: "travellers",
    name: "Tempo Traveller",
    capacity: "20",
    unit: "seats",
    image: "/images/fleet/tempo-traveller-20-seat.webp",
    alt: "White Force Tempo Traveller, front three-quarter view",
    short: "The classic for picnics and pilgrimages.",
    bestFor: "School picnics, family groups and pilgrimage tours.",
    manufacturerImage: true,
  },
  {
    slug: "mini-coach-28",
    category: "coaches",
    name: "Mini coach",
    capacity: "28",
    unit: "seats",
    image: "/images/fleet/mini-coach-28-seat.webp",
    alt: "White 28-seat mini coach with yellow curtains",
    short: "College trips and wedding guests.",
    bestFor: "College trips, wedding guest transport and company outings.",
  },
  {
    slug: "ac-mini-coach-29",
    category: "coaches",
    name: "AC mini coach",
    capacity: "29",
    unit: "seats",
    image: "/images/fleet/mini-coach-29-seat.webp",
    alt: "White 29-seat air-conditioned mini coach, front three-quarter view",
    short: "Longer group journeys in comfort.",
    bestFor: "Longer group journeys, tours and events.",
  },
  {
    slug: "ac-coach-56",
    category: "coaches",
    name: "AC coach",
    capacity: "56",
    unit: "seats",
    image: "/images/fleet/ac-coach-56-seat.webp",
    alt: "Sky-blue 56-seat air-conditioned coach",
    short: "Our largest, for schools and big events.",
    bestFor: "Large school and college groups, events and big wedding parties.",
  },
];

export const weddingCars = [
  { name: "BMW 5 Series", image: "/images/weddings/bmw-wedding-decorated.webp", alt: "White BMW decorated with red ribbon and flowers", width: 720, height: 720 },
  { name: "Vintage open-top car", image: "/images/weddings/vintage-open-top-wedding.webp", alt: "White open-top vintage car decorated with flowers", width: 720, height: 818 },
  { name: "Audi Q7", image: "/images/weddings/audi-q7.webp", alt: "Dark blue Audi Q7 parked under trees", width: 720, height: 720 },
];

export interface Service {
  slug: string;
  title: string;
  short: string;
  body: string;
  vehicles: string;
}

export const services: Service[] = [
  { slug: "city-travel", title: "City travel", short: "A car and driver by the hour or for the day.", body: "Meetings, shopping, hospital visits or a day of errands around Vadodara. Book a car with a driver and keep it for as long as you need it.", vehicles: "Ertiga, Innova Crysta, BMW" },
  { slug: "outstation-trips", title: "Outstation trips", short: "One-way or return, across Gujarat and beyond.", body: "Drives to other cities, weekend getaways and long road trips from Vadodara. Share the route and the number of days and we’ll quote for the full trip.", vehicles: "Innova Crysta, Ertiga, travellers" },
  { slug: "airport-transfers", title: "Airport transfers", short: "Pickups and drops, early mornings included.", body: "Pickups and drops between your home, hotel or office and the airport. Share your flight time when you enquire so the pickup can be planned around it.", vehicles: "Ertiga, Innova Crysta" },
  { slug: "domestic-tours", title: "Domestic tours", short: "Multi-day holidays with the same vehicle and driver.", body: "Holiday tours over several days with one vehicle and driver throughout. Tell us the places you want to cover and we’ll suggest a vehicle for your group.", vehicles: "Innova Crysta, Maharaja traveller, Tempo Traveller" },
  { slug: "pilgrimages", title: "Pilgrimages", short: "Temple circuits and yatras at your pace.", body: "Temple visits and yatra circuits for families and community groups, with room for elders to travel comfortably.", vehicles: "Maharaja traveller, Tempo Traveller, coaches" },
  { slug: "school-college-picnics", title: "School and college picnics", short: "Travellers and coaches sized to the batch.", body: "Day trips and educational tours for schools and colleges. Share the number of students and staff and we’ll suggest one vehicle or a combination.", vehicles: "Tempo Traveller, mini coaches, 56-seat AC coach" },
  { slug: "corporate-travel", title: "Corporate travel", short: "Guest pickups, team outings, regular runs.", body: "Client and guest pickups, team outings and staff transport for companies in and around Vadodara.", vehicles: "Innova Crysta, Force Urbania, mini coaches" },
  { slug: "weddings-events", title: "Weddings and events", short: "Decorated cars, plus transport for guests.", body: "A decorated car for the couple and transport for guests between the venue, hotels and the station.", vehicles: "BMW, Audi Q7, vintage car, travellers and coaches" },
  { slug: "hotel-booking", title: "Hotel and resort booking", short: "Help arranging the stay alongside the trip.", body: "Planning a tour? Mention where you want to stay and we can help arrange hotel or resort bookings along with the transport.", vehicles: "Any vehicle" },
];

export const faqs = [
  { q: "How do I get a quotation?", a: "Send your pickup, destination, travel dates and number of passengers using the enquiry form, WhatsApp or a phone call. Ajit replies with availability and the fare for your trip." },
  { q: "Does every vehicle come with a driver?", a: "Yes. Mahi Tours & Travels rents cars, travellers and coaches with a driver." },
  { q: "Is my trip booked once I send the form?", a: "No. The form sends your trip details. Your trip is booked only after you confirm the vehicle, date and fare directly with Mahi Tours & Travels." },
  { q: "Do you do outstation trips from Vadodara?", a: "Yes, one-way and return trips. Share the route and dates to get a quote." },
  { q: "What is the largest group you can take?", a: "Up to 56 passengers in one AC coach. Bigger groups can be split across several vehicles." },
  { q: "What information should I share when I enquire?", a: "Pickup point, destination, travel date, return date if any, number of passengers, and any preference for vehicle type or AC." },
  { q: "Can you help with hotels as well?", a: "Yes. Mention it in your enquiry and we’ll help arrange a hotel or resort booking." },
];

export const lineup = [
  { left: "6.6%", n: "4", label: "BMW" },
  { left: "21.4%", n: "6", label: "Ertiga" },
  { left: "38.7%", n: "6–7", label: "Innova Crysta" },
  { left: "56%", n: "29", label: "AC mini coach" },
  { left: "80.9%", n: "56", label: "AC coach" },
];


const OG_IMAGE = { url: "/images/og/og-image.jpg", width: 1200, height: 630, alt: "Mahi Tours & Travels fleet, from a BMW to a 56-seat coach" };

/** Per-page metadata with matching canonical, Open Graph and Twitter tags. */
export function pageMeta(title: string, description: string, path: string, absoluteTitle = false): Metadata {
  const full = absoluteTitle ? title : `${title} | ${site.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", locale: "en_IN", siteName: site.name, url: path, title: full, description, images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title: full, description, images: [OG_IMAGE.url] },
  };
}
