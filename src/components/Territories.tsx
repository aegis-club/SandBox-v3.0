import { AnimatePresence, motion } from "motion/react";
import { useRef, useState, type KeyboardEvent } from "react";
import { ZONES } from "../data";
import { EASE, Title } from "./Reveal";

const pad = (n: number) => String(n).padStart(2, "0");

export function Territories() {
  const [i, setI] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const brief = useRef<HTMLElement>(null);

  /* On a phone the briefing sits under the map. A tap brings it into view. */
  const pick = (k: number) => {
    setI(k);
    const el = brief.current;
    if (!el || !window.matchMedia("(max-width: 68rem)").matches) return;
    window.requestAnimationFrame(() => {
      if (el.getBoundingClientRect().bottom > window.innerHeight) {
        const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        el.scrollIntoView({ block: "end", behavior: calm ? "auto" : "smooth" });
      }
    });
  };
  const z = ZONES[i];

  const onKey = (e: KeyboardEvent) => {
    const map: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    let next = i;
    if (e.key in map) next = (i + map[e.key] + ZONES.length) % ZONES.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = ZONES.length - 1;
    else return;
    e.preventDefault();
    setI(next);
    tabs.current[next]?.focus();
  };

  return (
    <section className="band band--paper" id="territories" aria-labelledby="terr-title">
      <div className="wrap">
        <div className="head">
          <Title id="terr-title">Choose your territory.</Title>
          <p className="lead">Eight zones are open. Select one to read its briefing.</p>
        </div>
        <div className="zones">
          <div className="zones__map" role="tablist" aria-label="Territories" onKeyDown={onKey}>
            {ZONES.map((zone, k) => (
              <button
                key={zone.name}
                ref={(el) => {
                  tabs.current[k] = el;
                }}
                className="zone"
                role="tab"
                id={`z-${k}`}
                aria-controls="brief"
                aria-selected={k === i}
                tabIndex={k === i ? 0 : -1}
                onClick={() => pick(k)}
              >
                {k === i && (
                  <motion.span
                    className="zone__fill"
                    layoutId="zone-fill"
                    transition={{ type: "spring", stiffness: 380, damping: 34 }}
                  />
                )}
                <span className="zone__code">Z-{pad(k + 1)}</span>
                <span className="zone__name">{zone.short}</span>
              </button>
            ))}
          </div>
          <article className="brief" ref={brief} id="brief" role="tabpanel" aria-labelledby={`z-${i}`} tabIndex={0}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={i}
                className="brief__in"
                initial={{ clipPath: "inset(0 0 100% 0)", y: 12 }}
                animate={{ clipPath: "inset(0 0 0% 0)", y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.12 } }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <h3 className="brief__name">{z.name}</h3>
                <p className="brief__body">{z.body}</p>
                <h4>Scout for</h4>
                <ul className="tags">
                  {z.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </article>
        </div>
      </div>
    </section>
  );
}
