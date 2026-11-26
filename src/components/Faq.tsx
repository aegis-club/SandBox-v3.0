import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { FAQ, TBA } from "../data";
import { EASE, Title } from "./Reveal";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="band band--paper band--flush" id="faq" aria-labelledby="faq-title">
      <div className="wrap faq">
        <Title id="faq-title">Know before you enter.</Title>
        <ul className="faq__list">
          {FAQ.map((f, i) => {
            const on = open === i;
            return (
              <li key={f.q} className={on ? "is-on" : undefined}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={on}
                    aria-controls={`faq-${i}`}
                    onClick={() => setOpen(on ? null : i)}
                  >
                    <span>{f.q}</span>
                    <i aria-hidden="true" />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div
                      id={`faq-${i}`}
                      className="faq__a"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: EASE }}
                    >
                      <p>{f.a ?? `${TBA}. The organisers publish this with registration.`}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
