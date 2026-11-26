import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { LOOP, PILLARS } from "../data";
import { listParent, Rule } from "./Reveal";

export function Loop() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { amount: 0.4 });
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);

  useEffect(() => {
    if (!inView || held || reduce) return;
    const t = window.setInterval(() => setActive((a) => (a + 1) % LOOP.length), 2200);
    return () => window.clearInterval(t);
  }, [inView, held, reduce]);

  return (
    <section className="band band--ink loop" id="experience" aria-labelledby="loop-title">
      <div className="wrap">
        <h2 id="loop-title" className={reduce ? "title loop__title" : "sr"}>
          Not just a hackathon. An entire playground.
        </h2>
        <p className="lead loop__lead">
          You get a contained environment, mentors on the floor and a full day to prove one idea. The loop never
          changes.
        </p>
        <ol className="loop__list" ref={ref} onPointerLeave={() => setHeld(false)} onBlur={() => setHeld(false)}>
          {LOOP.map((l, i) => (
            <li key={l.word} className={i === active ? "is-on" : undefined}>
              <button
                type="button"
                aria-pressed={i === active}
                onPointerEnter={(e) => {
                  if (e.pointerType !== "mouse") return;
                  setHeld(true);
                  setActive(i);
                }}
                onFocus={() => {
                  setHeld(true);
                  setActive(i);
                }}
                onClick={() => {
                  setHeld(true);
                  setActive(i);
                }}
              >
                <span className="loop__word">{l.word}</span>
                <span className="loop__text">{l.text}</span>
              </button>
            </li>
          ))}
        </ol>
        <motion.ul
          className="pillars"
          variants={listParent}
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          {PILLARS.map((p) => (
            <li key={p.name}>
              <Rule />
              <h3>{p.name}</h3>
              <p>{p.text}</p>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
