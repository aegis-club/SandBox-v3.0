import { motion, useReducedMotion } from "motion/react";
import { TIERS } from "../data";
import { listParent, Rule } from "./Reveal";
import { StripTitle } from "./Strip";

export function Sponsors() {
  const reduce = useReducedMotion();
  return (
    <section className="band band--ink" id="sponsors" aria-labelledby="sponsors-title">
      <StripTitle id="sponsors-title" tone="yellow" cap="Open">
        The alliance.
      </StripTitle>
      <div className="wrap">
        <div className="head head--lead">
          <p className="lead">
            Sponsors put tools, mentors and prizes in the hands of builders. Every slot below is open.
          </p>
        </div>
        <motion.ul
          className="tiers"
          variants={listParent}
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          {TIERS.map((t) => (
            <li key={t.name} className="tier">
              <Rule />
              <h3>{t.name}</h3>
              <p>{t.text}</p>
              <p className="tier__open">
                <span className="tier__boxes" aria-hidden="true">
                  {Array.from({ length: t.slots }, (_, k) => (
                    <i key={k} />
                  ))}
                </span>
                {t.slots} {t.slots === 1 ? "slot" : "slots"} open
              </p>
            </li>
          ))}
        </motion.ul>
        <p className="note">The sponsorship brochure and contact are announced soon.</p>
      </div>
    </section>
  );
}
