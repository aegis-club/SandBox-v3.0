import { motion, useReducedMotion } from "motion/react";
import { MLH, RULES } from "../data";
import { Arrow } from "./Hero";
import { listParent, Rule, Title } from "./Reveal";

export function Rules() {
  const reduce = useReducedMotion();
  return (
    <section className="band band--ink" id="rules" aria-labelledby="rules-title">
      <div className="wrap">
        <div className="head">
          <Title id="rules-title" from="bottom">Rules of the playground.</Title>
          <p className="lead">
            SandBox follows the MLH Code of Conduct. It covers participants, organisers, volunteers, sponsors,
            judges and mentors.
          </p>
        </div>
        <motion.ul
          className="rules"
          variants={listParent}
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {RULES.map((r) => (
            <li key={r.name}>
              <Rule />
              <h3>{r.name}</h3>
              <p>{r.text}</p>
            </li>
          ))}
        </motion.ul>
        <p className="rules__foot">
          <a className="link" href={MLH} target="_blank" rel="noreferrer">
            <span>Read the MLH Code of Conduct</span>
            <Arrow />
            <span className="sr">(opens in a new tab)</span>
          </a>
          <span className="note">The incident contact and help desk location are announced with registration.</span>
        </p>
      </div>
    </section>
  );
}
