import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/* A heading that wipes in, like a redaction bar lifting.
   The outer element is observed; the inner span carries the clip. */
export function Title({
  id,
  children,
  className,
  from = "left",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  from?: "left" | "bottom";
}) {
  const reduce = useReducedMotion();
  const hidden = from === "left" ? "inset(0 100% 0 0)" : "inset(100% 0 0 0)";
  return (
    <motion.h2
      id={id}
      className={`title ${className ?? ""}`}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
    >
      <motion.span
        className="title__in"
        variants={{
          hidden: { clipPath: hidden },
          show: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 0.9, ease: EASE } },
        }}
      >
        {children}
      </motion.span>
    </motion.h2>
  );
}

/* Lists do not fade in. Their rules draw across, one after another. */
export const listParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

export function Rule() {
  return (
    <motion.span
      className="rule"
      aria-hidden="true"
      variants={{
        hidden: { scaleX: 0 },
        show: { scaleX: 1, transition: { duration: 0.9, ease: EASE } },
      }}
    />
  );
}

export { EASE };
