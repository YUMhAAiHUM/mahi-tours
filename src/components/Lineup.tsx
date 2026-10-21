import Image from "next/image";
import { lineup } from "@/lib/site";

export default function Lineup() {
  return (
    <>
      <div className="lineup-wrap">
      <div className="lineup" tabIndex={0} aria-label="Fleet lineup, scroll sideways to see all vehicles">
        <div className="lineup-inner">
          <Image
            src="/images/hero/fleet-lineup.webp"
            alt="Mahi Tours fleet lined up by size: a BMW wedding car, Maruti Suzuki Ertiga, Toyota Innova Crysta, a 29-seat AC mini coach and a 56-seat AC coach"
            width={3037}
            height={720}
            priority
            sizes="(max-width: 800px) 760px, 1184px"
          />
          {lineup.map((l) => (
            <div key={l.label} className="lineup-label" style={{ left: l.left }}>
              <strong>{l.n}</strong>
              <span>{l.label}</span>
            </div>
          ))}
        </div>
      </div>
      </div>
      <p className="lineup-hint" aria-hidden="true">Swipe to see the full fleet →</p>
      <p className="lineup-note">Numbers show passenger seats. Ertiga and Innova Crysta shown in manufacturer images.</p>
    </>
  );
}
