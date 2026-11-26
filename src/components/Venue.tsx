import { motion, useReducedMotion } from "motion/react";
import { DIRECTIONS } from "../data";
import { Arrow } from "./Hero";
import { EASE, Title } from "./Reveal";

export function Venue() {
  const reduce = useReducedMotion();
  return (
    <section className="band band--paper" id="venue" aria-labelledby="venue-title">
      <div className="wrap venue">
        <div className="venue__text">
          <Title id="venue-title" from="bottom">Your destination.</Title>
          <p className="venue__name">Dayananda Sagar College of Engineering</p>
          <p className="lead">Kumaraswamy Layout, Bengaluru, Karnataka</p>
          <a className="btn btn--ink" href={DIRECTIONS} target="_blank" rel="noreferrer">
            <span>Get directions</span>
            <Arrow />
            <span className="sr">(opens in a new tab)</span>
          </a>
        </div>
        <div className="plot" aria-hidden="true">
          <motion.span
            className="plot__x"
            initial={reduce ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.9, ease: EASE }}
          />
          <motion.span
            className="plot__y"
            initial={reduce ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
          />
          <motion.span
            className="plot__box"
            initial={reduce ? false : { scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.55 }}
          />
          <span className="plot__label">DSCE</span>
          <span className="plot__lat">12.9081° N</span>
          <span className="plot__lng">77.5666° E</span>
        </div>
      </div>
    </section>
  );
}
