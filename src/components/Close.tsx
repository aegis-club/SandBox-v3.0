import { motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { MLH, NAV } from "../data";
import { Strip } from "./Strip";

export function Close() {
  const ref = useRef<HTMLElement>(null);
  const stripsRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const seen = useInView(stripsRef, { once: true, amount: 0.5 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const left = useTransform(scrollYProgress, [0, 1], ["-30vw", "0vw"]);
  const right = useTransform(scrollYProgress, [0, 1], ["30vw", "0vw"]);

  return (
    <footer className="band band--ink close" ref={ref}>
      <div className="wrap">
        <motion.p
          className="close__big"
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.span
            className="title__in"
            variants={{
              hidden: { clipPath: "inset(0 100% 0 0)" },
              show: { clipPath: "inset(0 0% 0 0)", transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } },
            }}
          >
            Enter the playground. <em>Break the limits.</em>
          </motion.span>
        </motion.p>
      </div>
      <div className="strips strips--close" ref={stripsRef}>
        <Strip tone="yellow" cap="V3.0" row={0} sealed={!seen && !reduce} x={reduce ? undefined : left} />
        <Strip tone="paper" cap="2027" row={1} sealed={!seen && !reduce} x={reduce ? undefined : right} />
      </div>
      <div className="wrap foot">
        <p>© 2027 Aegis, Dayananda Sagar College of Engineering</p>
        <nav aria-label="Footer">
          {NAV.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
          <a href={MLH} target="_blank" rel="noreferrer">
            Code of conduct<span className="sr"> (opens in a new tab)</span>
          </a>
        </nav>
      </div>
    </footer>
  );
}
