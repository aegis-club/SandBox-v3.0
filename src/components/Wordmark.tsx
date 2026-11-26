import type { CSSProperties } from "react";

/* The SANDBOX wordmark. Every letter is a sealed box. Carve shapes cut the
   letter out of its box. CSS scales each carve from 0 to 1, so a strip can
   start sealed and then breach. Carves use the strip background colour. */

type Carve = { d: string; o: string };
type Glyph = { ch: string; w: number; carves: Carve[] };

const GLYPHS: Glyph[] = [
  {
    ch: "S",
    w: 78,
    carves: [
      { d: "M79,20 H35 a11,11 0 0 0 0,22 H79 Z", o: "100% 50%" },
      { d: "M-1,58 H43 a11,11 0 0 1 0,22 H-1 Z", o: "0% 50%" },
    ],
  },
  {
    ch: "A",
    w: 88,
    carves: [
      { d: "M-1,-1 H33 Q14,44 -1,101 Z", o: "0% 0%" },
      { d: "M89,-1 H60 L89,101 Z", o: "100% 0%" },
      { d: "M46,24 C52,37 58,45 58,54 A12,12 0 1 1 34,54 C34,45 40,37 46,24 Z", o: "50% 60%" },
      { d: "M29,101 L45,77 L62,101 Z", o: "50% 100%" },
    ],
  },
  {
    ch: "N",
    w: 88,
    carves: [
      { d: "M36,-1 H62 V62 Q57,26 36,-1 Z", o: "70% 0%" },
      { d: "M26,101 V38 Q31,74 52,101 Z", o: "30% 100%" },
    ],
  },
  {
    ch: "D",
    w: 84,
    carves: [
      { d: "M38,-1 H85 V50 H84 A46,50 0 0 0 38,0 Z", o: "100% 0%" },
      { d: "M38,101 H85 V50 H84 A46,50 0 0 1 38,100 Z", o: "100% 100%" },
      { d: "M26,24 H36 A21,26 0 0 1 36,76 H26 Z", o: "20% 50%" },
    ],
  },
  {
    ch: "B",
    w: 82,
    carves: [
      { d: "M83,38 L60,50 L83,62 Z", o: "100% 50%" },
      { d: "M64,-1 H83 V18 A18,18 0 0 0 64,0 Z", o: "100% 0%" },
      { d: "M64,101 H83 V82 A18,18 0 0 1 64,100 Z", o: "100% 100%" },
      { d: "M26,18 H45 a8.5,8.5 0 0 1 0,17 H26 Z", o: "0% 50%" },
      { d: "M26,63 H49 a9.5,9.5 0 0 1 0,19 H26 Z", o: "0% 50%" },
    ],
  },
  {
    ch: "O",
    w: 90,
    carves: [
      { d: "M45,17 A17,33 0 1 0 45,83 A17,33 0 1 0 45,17 Z", o: "50% 50%" },
    ],
  },
  {
    ch: "X",
    w: 90,
    carves: [
      { d: "M21,-1 H69 L45,37 Z", o: "50% 0%" },
      { d: "M21,101 H69 L45,63 Z", o: "50% 100%" },
      { d: "M-1,23 V77 L29,50 Z", o: "0% 50%" },
      { d: "M91,23 V77 L61,50 Z", o: "100% 50%" },
    ],
  },
];

const GAP = 6;
export const WORDMARK_W = GLYPHS.reduce((a, g) => a + g.w, 0) + GAP * (GLYPHS.length - 1);

type Props = { className?: string; title?: string; delay?: number };

export function Wordmark({ className, title, delay = 0 }: Props) {
  let x = 0;
  return (
    <svg
      className={`wm ${className ?? ""}`}
      viewBox={`0 0 ${WORDMARK_W} 100`}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {GLYPHS.map((g, i) => {
        const gx = x;
        x += g.w + GAP;
        return (
          <g
            key={g.ch}
            className="wm__g"
            transform={`translate(${gx} 0)`}
            style={{ "--i": i, "--d": `${delay}ms` } as CSSProperties}
          >
            <rect className="wm__box" width={g.w} height={100} />
            <g className={g.ch === "O" ? "wm__spin" : undefined}>
              {g.carves.map((c, j) => (
                <path key={j} className="wm__carve" d={c.d} style={{ transformOrigin: c.o }} />
              ))}
            </g>
          </g>
        );
      })}
    </svg>
  );
}
