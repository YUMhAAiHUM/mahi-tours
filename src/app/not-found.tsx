import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container page-hero" style={{ paddingBottom: 128 }}>
      <h1 className="h1">Page not found.</h1>
      <p className="lead">The page you’re looking for doesn’t exist. Try the fleet or get in touch.</p>
      <div className="hero-actions">
        <Link className="btn btn-primary" href="/">Go home</Link>
        <Link className="link" href="/fleet">See the fleet</Link>
      </div>
    </section>
  );
}
