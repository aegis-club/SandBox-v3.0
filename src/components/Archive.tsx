import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { EDITIONS } from "../data";
import { StripTitle } from "./Strip";

const WIDE = "(min-width: 60rem) and (hover: hover)";

/* A film strip of photo frames. On wide screens scroll moves the film.
   On phones the film scrolls sideways under the thumb. */
function Film({ frames, edition, dir }: { frames: string[]; edition: string; dir: 1 | -1 }) {
  const ref = useRef<HTMLDivElement>(null);
  const run = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const [wide, setWide] = useState(false);
  const [dist, setDist] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0.1, 0.9], dir === 1 ? [0, -dist] : [-dist, 0]);

  useEffect(() => {
    const mq = window.matchMedia(WIDE);
    const measure = () => {
      setWide(mq.matches && !reduce);
      if (ref.current && run.current) setDist(Math.max(0, run.current.scrollWidth - ref.current.clientWidth));
    };
    measure();
    mq.addEventListener("change", measure);
    window.addEventListener("resize", measure);
    return () => {
      mq.removeEventListener("change", measure);
      window.removeEventListener("resize", measure);
    };
  }, [reduce]);

  return (
    <div
      className={`film${wide ? " film--driven" : ""}`}
      ref={ref}
      role="region"
      aria-label={`${edition} photos`}
      tabIndex={wide ? undefined : 0}
    >
      <motion.ol className="film__run" ref={run} style={wide ? { x } : undefined}>
        {frames.map((f, i) => (
          <li key={f} className="frame">
            <div className="frame__ph" role="img" aria-label={`Photo placeholder: ${f}`}>
              <span className="frame__no">{String(i + 1).padStart(2, "0")}</span>
              <svg viewBox="0 0 20 20" aria-hidden="true">
                <rect width="20" height="20" />
                <ellipse cx="10" cy="10" rx="3.2" ry="6.4" transform="rotate(32 10 10)" />
              </svg>
              <span className="frame__tag">Photo placeholder</span>
            </div>
            <p className="frame__cap">{f}</p>
          </li>
        ))}
      </motion.ol>
    </div>
  );
}

export function Archive() {
  return (
    <section className="band band--yellow grid-field archive" id="archive" aria-labelledby="archive-title">
      <StripTitle id="archive-title" tone="ink" cap="V1–V2">
        The archive.
      </StripTitle>
      <div className="wrap">
        <div className="head head--lead">
          <p className="lead">Two editions came before this one. Every photo and figure here is a placeholder until the real ones arrive.</p>
        </div>
      </div>
      {EDITIONS.map((e, i) => (
        <article key={e.n} className="edition-row" aria-labelledby={`ed-${e.n}`}>
          <div className="wrap edition-row__meta">
            <h3 id={`ed-${e.n}`}>
              <span className="edition-row__n">Edition {e.n}</span>
              {e.name}
            </h3>
            <p className="edition-row__year">{e.year}</p>
            <p className="edition-row__line">{e.line}</p>
            <div className="edition-row__stats">
              <dl>
                {e.stats.map((s) => (
                  <div key={s.k}>
                    <dt>{s.k}</dt>
                    <dd>{s.v}</dd>
                  </div>
                ))}
              </dl>
              <p className="edition-row__sample">Sample figures</p>
            </div>
          </div>
          <Film frames={e.frames} edition={e.name} dir={i % 2 ? -1 : 1} />
        </article>
      ))}
    </section>
  );
}
