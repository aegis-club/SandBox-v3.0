import { motion, type MotionValue } from "motion/react";
import { useEffect, useState, type CSSProperties, type PointerEvent, type ReactNode } from "react";
import { Wordmark } from "./Wordmark";

type Tone = "ink" | "paper" | "yellow";

/* Phones draw three wordmarks per row instead of six. This halves the SVG work. */
const PHONE = "(max-width: 40rem)";
function usePhone() {
  const [phone, setPhone] = useState(() => window.matchMedia(PHONE).matches);
  useEffect(() => {
    const mq = window.matchMedia(PHONE);
    const on = () => setPhone(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return phone;
}

type ShellProps = {
  tone: Tone;
  cap: string;
  sealed?: boolean;
  className?: string;
  children: ReactNode;
  decorative?: boolean;
};

/* The strip shell: fringe, end-cap label, track, end-cap label, fringe. */
export function StripShell({ tone, cap, sealed, className, children, decorative }: ShellProps) {
  /* Touch has no hover. A tap seals a letter for a moment. */
  const onDown = (e: PointerEvent) => {
    if (e.pointerType === "mouse") return;
    const g = (e.target as Element).closest(".wm__g");
    if (!g) return;
    g.classList.add("is-shut");
    window.setTimeout(() => g.classList.remove("is-shut"), 900);
  };
  return (
    <div
      className={`strip strip--${tone}${sealed ? " is-sealed" : ""} ${className ?? ""}`}
      aria-hidden={decorative ? "true" : undefined}
      onPointerDown={onDown}
    >
      <span className="strip__fringe" aria-hidden="true" />
      <span className="strip__cap" aria-hidden="true">
        <span>{cap}</span>
      </span>
      <div className="strip__track">{children}</div>
      <span className="strip__cap strip__cap--end" aria-hidden="true">
        <span>{cap}</span>
      </span>
      <span className="strip__fringe" aria-hidden="true" />
    </div>
  );
}

type Props = { tone: Tone; cap: string; x?: MotionValue<string>; row?: number; sealed?: boolean };

/* A strip of repeated wordmarks. Every row starts on a full word. Scroll shears the rows. */
export function Strip({ tone, cap, x, row = 0, sealed = false }: Props) {
  const phone = usePhone();
  const lead = phone ? 1 : 2;
  const count = phone ? 3 : 6;
  return (
    <StripShell tone={tone} cap={cap} sealed={sealed} decorative>
      <div className={`strip__base${phone ? " strip__base--phone" : ""}`}>
        <motion.div className="strip__run" style={{ x }}>
          {Array.from({ length: count }, (_, k) => (
            <Wordmark key={k} delay={row * 110 + Math.max(0, k - lead) * 60} />
          ))}
        </motion.div>
      </div>
    </StripShell>
  );
}

/* A strip that carries a section heading. The text scales to fit the track. */
export function StripTitle({ id, tone, cap, children }: { id: string; tone: Tone; cap: string; children: string }) {
  return (
    <motion.div
      className="strip-title"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
    >
      <motion.div
        variants={{
          hidden: { clipPath: "inset(0 100% 0 0)" },
          show: { clipPath: "inset(0 0% 0 0)", transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
        }}
      >
        <StripShell tone={tone} cap={cap}>
          <h2 id={id} className="strip-title__text" style={{ "--n": children.length } as CSSProperties}>
            {children}
          </h2>
        </StripShell>
      </motion.div>
    </motion.div>
  );
}

/* A strip of short phrases. Scroll moves it. */
export function StripPhrases({ tone, cap, x, items }: { tone: Tone; cap: string; x?: MotionValue<string>; items: string[] }) {
  return (
    <StripShell tone={tone} cap={cap} decorative className="strip--phrases">
      <motion.div className="strip__run strip__run--text" style={{ x }}>
        {[0, 1, 2].map((k) => (
          <div key={k} className="phrases">
            {items.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        ))}
      </motion.div>
    </StripShell>
  );
}
