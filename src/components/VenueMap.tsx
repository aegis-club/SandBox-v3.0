import { animate, motion, useInView, useMotionValue, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type MapData = {
  size: number;
  radiusMetres: number;
  centre: [number, number];
  attribution: string;
  layers: Record<"water" | "green" | "campus" | "rail" | "paths" | "minor" | "mid" | "major", string>;
};

const fmt = (n: number, pos: string, neg: string) => `${Math.abs(n).toFixed(4)}° ${n >= 0 ? pos : neg}`;

/* A dark poster map of the streets around DSCE, drawn from OpenStreetMap data.
   The data loads after the page, so it never blocks the first paint. */
export function VenueMap() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const near = useInView(ref, { once: true, margin: "600px 0px" });
  const seen = useInView(ref, { once: true, amount: 0.35 });
  const [data, setData] = useState<MapData | null>(null);
  const r = useMotionValue(reduce ? 760 : 0);

  useEffect(() => {
    if (!near || data) return;
    import("../assets/venue-map.json").then((m) => setData(m.default as MapData));
  }, [near, data]);

  /* The streets reveal outward from the campus, like a scan. */
  useEffect(() => {
    if (!seen || !data || reduce) return;
    const c = animate(r, 760, { duration: 2.4, ease: [0.16, 1, 0.3, 1], delay: 0.15 });
    return () => c.stop();
  }, [seen, data, reduce, r]);

  const S = data?.size ?? 1000;
  const m = data ? S / (2 * data.radiusMetres) : 1;
  const rings = [500, 1000];
  const [lat, lon] = data?.centre ?? [12.90949, 77.56595];

  return (
    <figure className="vmap" ref={ref}>
      <div className="vmap__frame">
        <svg viewBox={`0 0 ${S} ${S}`} role="img" aria-label="Street map of the area around Dayananda Sagar College of Engineering, Bengaluru">
          <defs>
            <mask id="vmap-reveal">
              <rect width={S} height={S} fill="black" />
              <motion.circle cx={S / 2} cy={S / 2} r={r} fill="white" />
            </mask>
            <pattern id="vmap-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <path d="M0 0V6" className="vmap__hatch" />
            </pattern>
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
            {!reduce && <circle className="vmap__ping" cx={S / 2} cy={S / 2} r="18" />}
            <rect x={S / 2 - 16} y={S / 2 - 16} width="32" height="32" />
            <ellipse cx={S / 2} cy={S / 2} rx="5.5" ry="11" transform={`rotate(32 ${S / 2} ${S / 2})`} />
          </g>
        </svg>
        <span className="vmap__label">DSCE</span>
      </div>
      <figcaption className="vmap__cap">
        <span className="vmap__city">Bengaluru</span>
        <span className="vmap__coords">
          {fmt(lat, "N", "S")} · {fmt(lon, "E", "W")}
        </span>
        <span className="vmap__credit">
          Map data ©{" "}
          <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">
            OpenStreetMap contributors
          </a>
        </span>
      </figcaption>
    </figure>
  );
}
