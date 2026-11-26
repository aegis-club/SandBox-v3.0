import { useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { TAPE } from "../data";
import { StripPhrases } from "./Strip";

/* A band of two phrase strips between sections. Scroll position moves them. */
export function Tape() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const a = useTransform(scrollYProgress, [0, 1], ["0vw", "-45vw"]);
  const b = useTransform(scrollYProgress, [0, 1], ["-45vw", "0vw"]);
  return (
    <div className="tape grid-field" ref={ref}>
      <StripPhrases tone="ink" cap="V3.0" items={TAPE} x={reduce ? undefined : a} />
      <StripPhrases tone="paper" cap="24H" items={[...TAPE].reverse()} x={reduce ? undefined : b} />
    </div>
  );
}
