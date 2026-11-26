import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Strip } from "./Strip";

const ROWS: { tone: "ink" | "paper"; cap: string; shift: number }[] = [
  { tone: "paper", cap: "V3.0", shift: -26 },
  { tone: "ink", cap: "24H", shift: 34 },
  { tone: "paper", cap: "2027", shift: -42 },
  { tone: "ink", cap: "DSCE", shift: 22 },
  { tone: "paper", cap: "V3.0", shift: -34 },
];

const smooth = (t: number) => t * t * (3 - 2 * t);
const START = 0.1;
const END = 0.86;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const seed = useRef<Element | null>(null);
  const reduce = useReducedMotion();
  const [sealed, setSealed] = useState(!reduce);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useEffect(() => {
    const t = window.setTimeout(() => setSealed(false), 450);
    return () => window.clearTimeout(t);
  }, []);

  /* Rows start registered on one word. Scroll shears them in opposite directions. */
  const x0 = useTransform(p, [0, 1], ["0vw", `${ROWS[0].shift}vw`]);
  const x1 = useTransform(p, [0, 1], ["0vw", `${ROWS[1].shift}vw`]);
  const x2 = useTransform(p, [0, 1], ["0vw", `${ROWS[2].shift}vw`]);
  const x3 = useTransform(p, [0, 1], ["0vw", `${ROWS[3].shift}vw`]);
  const x4 = useTransform(p, [0, 1], ["0vw", `${ROWS[4].shift}vw`]);
  const xs = [x0, x1, x2, x3, x4];

  const copyOpacity = useTransform(p, [0, 0.2], [1, 0]);
  const copyY = useTransform(p, [0, 0.3], [0, -40]);

  /* The breach. One letter box in the third row seals shut, then grows until
     it fills the screen. The clip starts at that letter's rectangle. */
  const clip = useMotionValue("inset(50% 50% 50% 50%)");
  const visibility = useMotionValue<"hidden" | "visible">("hidden");
  const scale = useMotionValue(0.1);
  const origin = useMotionValue("50% 50%");
  const box = useRef({ top: 0, right: 0, bottom: 0, left: 0, w: 1 });

  const measured = useRef(false);

  /* Find the O nearest the screen centre in row three and record its rectangle
     as it stands when the breach starts. Past that point the row has sheared,
     so the live position is corrected back to the start position. */
  const measure = (v: number) => {
    const root = pin.current;
    const row = root?.querySelectorAll(".strip")[2];
    if (!root || !row) return;
    const vw = window.innerWidth;
    const fix = v > START ? (-ROWS[2].shift / 100) * vw * (v - START) : 0;
    let best: Element | null = null;
    let rect: DOMRect | null = null;
    let dist = Infinity;
    for (const g of Array.from(row.querySelectorAll(".wm__g:nth-child(6)"))) {
      const r = g.getBoundingClientRect();
      const left = r.left + fix;
      const d = Math.abs(left + r.width / 2 - vw / 2);
      if (left >= 0 && left + r.width <= vw && d < dist) {
        dist = d;
        best = g;
        rect = r;
      }
    }
    if (best !== seed.current) seed.current?.classList.remove("is-shut");
    seed.current = best;
    if (!rect) return;
    const r: DOMRect = rect;
    const host = root.getBoundingClientRect();
    const left = r.left + fix - host.left;
    box.current = {
      top: r.top - host.top,
      left,
      right: host.width - left - r.width,
      bottom: host.bottom - r.bottom,
      w: r.width / host.width,
    };
    origin.set(`${left + r.width / 2}px ${r.top - host.top + r.height / 2}px`);
    measured.current = true;
  };

  const update = (v: number) => {
    if (reduce || !pin.current) return;
    const t = smooth(Math.min(1, Math.max(0, (v - START) / (END - START))));
    if (t <= 0 || !measured.current) measure(v);
    seed.current?.classList.toggle("is-shut", v > START * 0.35);
    if (t <= 0) {
      visibility.set("hidden");
      return;
    }
    const b = box.current;
    const k = 1 - t;
    visibility.set("visible");
    clip.set(`inset(${b.top * k}px ${b.right * k}px ${b.bottom * k}px ${b.left * k}px)`);
    scale.set(b.w + (1 - b.w) * t);
  };

  useMotionValueEvent(p, "change", update);

  useEffect(() => {
    const again = () => {
      measured.current = false;
      update(p.get());
    };
    again();
    window.addEventListener("resize", again);
    return () => window.removeEventListener("resize", again);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="hero" ref={ref} id="top" aria-labelledby="hero-title">
      <div className="hero__pin" ref={pin}>
        <div className="hero__field grid-field">
          <h1 id="hero-title" className="sr">
            SandBox v3.0
          </h1>
          <div className="strips">
            {ROWS.map((r, i) => (
              <Strip key={i} row={i} tone={r.tone} cap={r.cap} sealed={sealed} x={reduce ? undefined : xs[i]} />
            ))}
          </div>
          <motion.div className="hero__copy" style={reduce ? undefined : { opacity: copyOpacity, y: copyY }}>
            <p className="hero__h">
              24 hours to break things and <span>build them back safer.</span>
            </p>
            <div className="hero__side">
              <p className="lead">
                A cybersecurity hackathon by Aegis, back for its third edition. Eight security territories, one
                campus, one night at Dayananda Sagar College of Engineering, Bengaluru.
              </p>
              <div className="hero__cta">
                <a className="btn btn--ink" href="#register">
                  <span>Request entry</span>
                  <Arrow />
                </a>
                <a className="btn btn--line" href="#territories">
                  Explore territories
                </a>
              </div>
              <p className="note">Dates for 2027 are announced with registration.</p>
            </div>
          </motion.div>
          <p className="edition" aria-hidden="true">
            <RegMark />
            <span>Edition 03</span>
            <span>Aegis</span>
            <span>DSCE Bengaluru</span>
            <span>2027</span>
            <RegMark />
          </p>
        </div>
        {!reduce && (
          <motion.div className="hero__inside" style={{ clipPath: clip, visibility }} aria-hidden="true">
            <motion.p className="hero__inside-text" style={{ scale, transformOrigin: origin }}>
              <span>
                Not just a hackathon.
                <br />
                <em>An entire playground.</em>
              </span>
            </motion.p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export function Arrow() {
  return (
    <svg className="arrow" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M9.3 3.7 13.1 7.5 1 7.5 1 8.5 13.1 8.5 9.3 12.3 10 13 15 8 10 3z" />
    </svg>
  );
}

/* A printer's registration mark. */
export function RegMark() {
  return (
    <svg className="reg" viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="5.5" />
      <path d="M10 0v20M0 10h20" />
    </svg>
  );
}
