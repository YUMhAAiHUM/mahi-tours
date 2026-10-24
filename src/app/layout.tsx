import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ActionBar from "@/components/ActionBar";
import { services, site, siteUrl } from "@/lib/site";
import "./globals.css";

const archivo = localFont({
  src: "../fonts/archivo-latin.woff2",
  variable: "--font-archivo",
  weight: "100 900",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
});

const description =
  "Car rental with a driver from Vadodara: cars, SUVs, Tempo Travellers, Force Urbania, mini coaches and a 56-seat AC coach for city travel, outstation trips, airport transfers, weddings and group tours.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: "Car Rental with Driver in Vadodara | Mahi Tours & Travels", template: "%s | Mahi Tours & Travels" },
  description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: site.name,
    title: "Mahi Tours & Travels | Car Rental with Driver, Vadodara",
    description,
    images: [{ url: "/images/og/og-image.jpg", width: 1200, height: 630, alt: "Mahi Tours & Travels fleet, from a BMW to a 56-seat coach" }],
  },
  twitter: { card: "summary_large_image", title: "Car Rental with Driver in Vadodara | Mahi Tours & Travels", description, images: ["/images/og/og-image.jpg"] },
  formatDetection: { telephone: true },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#101A2D" };

const businessSchema = {
  "@context": "https://schema.org",
  "@type": ["AutoRental", "TaxiService"],
  "@id": `${siteUrl()}/#business`,
  name: site.name,
  alternateName: "Mahi Tour and Travels",
  description,
  url: siteUrl(),
  image: `${siteUrl()}/images/og/og-image.jpg`,
  telephone: site.phones.map((p) => p.e164),
  email: site.emails[0],
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    addressCountry: site.address.country,
  },
  areaServed: [{ "@type": "City", name: "Vadodara" }, { "@type": "State", name: "Gujarat" }],
  contactPoint: site.phones.map((p) => ({ "@type": "ContactPoint", telephone: p.e164, contactType: "reservations", areaServed: "IN" })),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Car rental with driver services",
    itemListElement: services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title, description: s.body } })),
  },
  slogan: site.tagline,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={archivo.variable}>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <ActionBar />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }} />
      </body>
    </html>
  );
}
