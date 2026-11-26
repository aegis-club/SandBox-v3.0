import { motion, useReducedMotion } from "motion/react";
import { JOURNEY } from "../data";
import { listParent, Rule } from "./Reveal";
import { StripTitle } from "./Strip";

export function Journey() {
  const reduce = useReducedMotion();

  return (
    <section className="band band--yellow grid-field" id="journey" aria-labelledby="journey-title">
      <StripTitle id="journey-title" tone="ink" cap="24H">
        The journey.
      </StripTitle>
      <div className="wrap">
        <div className="head head--lead">
          <p className="lead">
            Nine phases, from the first registration to the closing ceremony. Four of them happen inside the
            sandbox.
          </p>
        </div>
        <div className="journey">
          {JOURNEY.map((leg) => (
            <motion.div
              key={leg.leg}
              className={`leg${leg.inside ? " leg--inside" : ""}`}
              variants={listParent}
              initial={reduce ? false : "hidden"}
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
            >
              <p className="leg__head">
                <span>{leg.leg}</span>
                <span>{leg.range}</span>
              </p>
              <ol>
                {leg.phases.map((ph) => (
                  <li key={ph.n} className="phase">
                    <Rule />
                    <span className="phase__n">{ph.n}</span>
                    <span className="phase__t">{ph.name}</span>
                    <span className="phase__c">{ph.code}</span>
                  </li>
                ))}
              </ol>
            </motion.div>
          ))}
        </div>
        <p className="note">All 2027 dates are announced with registration.</p>
      </div>
    </section>
  );
}
