import { animate, motion, useInView, useMotionValue, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { GMAP_EMBED, GMAP_LINK } from "../data";
import { StripShell } from "./Strip";
import { Wordmark } from "./Wordmark";

type MapData = {
  size: number;
  radiusMetres: number;
  centre: [number, number];
  attribution: string;
  layers: Record<"water" | "green" | "campus" | "rail" | "paths" | "minor" | "mid" | "major", string>;
};

const fmt = (n: number, pos: string, neg: string) => `${Math.abs(n).toFixed(4)}° ${n >= 0 ? pos : neg}`;

/* A poster map of the streets around DSCE, drawn from OpenStreetMap data in
   maptoposter's "warm_beige" palette. A miniature SANDBOX band marks the venue.
   The data loads after the page, so it never blocks the first paint. */
export function VenueMap() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const near = useInView(ref, { once: true, margin: "600px 0px" });
  const seen = useInView(ref, { once: true, amount: 0.35 });
  const [data, setData] = useState<MapData | null>(null);
  const r = useMotionValue(reduce ? 760 : 0);
  const [open, setOpen] = useState(!!reduce);
  const [view, setView] = useState<"poster" | "google">("poster");

  useEffect(() => {
    if (!near || data) return;
    import("../assets/venue-map.json").then((m) => setData(m.default as MapData));
  }, [near, data]);

  /* The streets reveal outward from the campus, like a scan. */
  useEffect(() => {
    if (!seen || !data || reduce) return;
    const c = animate(r, 760, { duration: 2.4, ease: [0.16, 1, 0.3, 1], delay: 0.15 });
    const t = window.setTimeout(() => setOpen(true), 900);
    return () => {
      c.stop();
      window.clearTimeout(t);
    };
  }, [seen, data, reduce, r]);

  const S = data?.size ?? 1000;
  const m = data ? S / (2 * data.radiusMetres) : 1;
  const rings = [500, 1000];
  const [lat, lon] = data?.centre ?? [12.90949, 77.56595];

  return (
    <figure className="vmap" ref={ref}>
      <div className="vmap__switch" role="group" aria-label="Map view">
        {(["poster", "google"] as const).map((v) => (
          <button key={v} type="button" aria-pressed={view === v} onClick={() => setView(v)}>
            {view === v && <motion.span className="vmap__switch-fill" layoutId="vmap-switch" transition={{ type: "spring", stiffness: 420, damping: 36 }} />}
            <span>{v === "poster" ? "Poster" : "Google Maps"}</span>
          </button>
        ))}
      </div>
      <div className="vmap__frame">
        {view === "google" && (
          <iframe
            className="vmap__gmap"
            title="Google Map of Dayananda Sagar College of Engineering, Bengaluru"
            src={GMAP_EMBED}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        )}
        <svg viewBox={`0 0 ${S} ${S}`} role="img" aria-label="Street map of the area around Dayananda Sagar College of Engineering, Bengaluru">
          <defs>
            <mask id="vmap-reveal">
              <rect width={S} height={S} fill="black" />
              <motion.circle cx={S / 2} cy={S / 2} r={r} fill="white" />
            </mask>
          </defs>
          <rect width={S} height={S} className="vmap__ground" />
          {data && (
            <g mask="url(#vmap-reveal)">
              <path d={data.layers.green} className="vmap__green" />
              <path d={data.layers.water} className="vmap__water" />
              <path d={data.layers.paths} className="vmap__paths" />
              <path d={data.layers.minor} className="vmap__minor" />
              <path d={data.layers.rail} className="vmap__rail" />
              <path d={data.layers.mid} className="vmap__mid" />
              <path d={data.layers.major} className="vmap__major" />
              <path d={data.layers.campus} className="vmap__campus" />
            </g>
          )}
          {rings.map((d) => (
            <g key={d} className="vmap__ring">
              <circle cx={S / 2} cy={S / 2} r={d * m} />
              <text x={S / 2 + 8} y={S / 2 - d * m - 8}>
                {d >= 1000 ? `${d / 1000} km` : `${d} m`}
              </text>
            </g>
          ))}
          <g className="vmap__pin">
            {!reduce && <circle className="vmap__ping" cx={S / 2} cy={S / 2} r="12" />}
            <rect x={S / 2 - 9} y={S / 2 - 9} width="18" height="18" />
          </g>
        </svg>
        <motion.a
          href={GMAP_LINK}
          target="_blank"
          rel="noreferrer"
          aria-label="Open DSCE, Bengaluru in Google Maps (opens in a new tab)"
          hidden={view === "google"}
          className="vmap__band"
          initial={reduce ? false : { scaleX: 0 }}
          animate={seen || reduce ? { scaleX: 1 } : undefined}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          style={{ "--strip-h": "var(--band-h)" } as CSSProperties}
        >
          <StripShell tone="yellow" cap="DSCE" sealed={!open} decorative>
            <Wordmark delay={0} />
          </StripShell>
          <span className="vmap__stem" aria-hidden="true" />
        </motion.a>
        {view === "poster" && <div className="vmap__fade" aria-hidden="true" />}
      </div>
      <figcaption className="vmap__cap">
        <span className="vmap__city">Bengaluru</span>
        <span className="vmap__rule" aria-hidden="true" />
        <span className="vmap__country">India</span>
        <span className="vmap__coords">
          {fmt(lat, "N", "S")} / {fmt(lon, "E", "W")}
        </span>
        <a className="vmap__open" href={GMAP_LINK} target="_blank" rel="noreferrer">
          DSCE Bengaluru on Google Maps<span className="sr"> (opens in a new tab)</span>
        </a>
        {view === "poster" && (
          <span className="vmap__credit">
            Map data ©{" "}
            <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">
              OpenStreetMap contributors
            </a>
          </span>
        )}
      </figcaption>
    </figure>
  );
}
