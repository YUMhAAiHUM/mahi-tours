"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/fleet", label: "Fleet" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="site-header">
      <div className="container">
        <nav className="nav nav-left" aria-label="Main">
          {links.map((l) => (
            <Link key={l.href} href={l.href} aria-current={pathname === l.href ? "page" : undefined}>
              {l.label}
            </Link>
          ))}
        </nav>
        <Link href="/" className="brand" aria-label="Mahi Tours & Travels, home">
          <span className="brand-mark">MAHI</span>
          <span className="brand-sub">Tours &amp; Travels</span>
        </Link>
        <div className="header-right">
          <Link href="/#quote" className="btn btn-primary header-cta">Get a quote</Link>
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>
      <nav id="mobile-nav" className="mobile-nav" data-open={open} aria-label="Mobile">
        <ul>
          <li><Link href="/">Home</Link></li>
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} aria-current={pathname === l.href ? "page" : undefined}>{l.label}</Link>
            </li>
          ))}
        </ul>
        <div className="container" style={{ paddingBottom: 24 }}>
          <Link href="/#quote" className="btn btn-primary" onClick={() => setOpen(false)}>Get a quote</Link>
        </div>
      </nav>
    </header>
  );
}
