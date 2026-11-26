import type { ReactElement } from "react";
import { SB3_CELLS, SBV3_CELLS } from "../components/Mark";

/* Candidate SandBox marks. Letter marks carve letters from boxes; symbols are
   pictures in the same grammar: square boxes, carves, ink on yellow.
   `fg` is the box colour, `bg` is the carve colour. */

export type Mark = { id: string; group: "letters" | "symbols"; name: string; idea: string; draw: (fg: string, bg: string) => ReactElement };

export const MARKS: Mark[] = [
  {
    id: "sbv3",
    group: "letters",
    name: "SBv3 (on the site now)",
    idea: "S, B, v and 3 carved from four boxes. A full square that spells the version.",
    draw: (fg, bg) => (
      <>
        <rect width="100" height="100" fill={bg} />
        {SBV3_CELLS(fg, bg)}
      </>
    ),
  },
  {
    id: "sb3",
    group: "letters",
    name: "SB3 (previous)",
    idea: "S, B and 3 in a 2 by 2 grid with the fourth cell empty.",
    draw: (fg, bg) => (
      <>
        <rect width="100" height="100" fill={bg} />
        {SB3_CELLS(fg, bg)}
      </>
    ),
  },
  {
    id: "breach",
    group: "symbols",
    name: "1 · Breach",
    idea: "A box with one corner carved away, and the piece escaping past the edge. Beyond the boundary.",
    draw: (fg, bg) => (
      <>
        <rect width="100" height="100" fill={bg} />
        <path d="M0 26h50a24 24 0 0 0 24 24v50H0Z" fill={fg} />
        <rect x="78" y="0" width="22" height="22" fill={fg} />
      </>
    ),
  },
  {
    id: "hourglass",
    group: "symbols",
    name: "2 · Hourglass",
    idea: "A box carved into an hourglass: sand, and 24 hours. The grain at the waist is still falling.",
    draw: (fg, bg) => (
      <>
        <rect width="100" height="100" fill={fg} />
        <path d="M-1 10 43 50-1 90Z" fill={bg} />
        <path d="M101 10 57 50l44 40Z" fill={bg} />
        <path d="M30 12h40l-20 18Z" fill={bg} />
        <rect x="47" y="56" width="6" height="12" fill={bg} />
      </>
    ),
  },
  {
    id: "keyhole",
    group: "symbols",
    name: "3 · Keyhole",
    idea: "A sealed box with a keyhole carved through it. Security, and a way in.",
    draw: (fg, bg) => (
      <>
        <rect width="100" height="100" fill={fg} />
        <circle cx="50" cy="40" r="15" fill={bg} />
        <path d="M43 48h14l6 34H37Z" fill={bg} />
      </>
    ),
  },
  {
    id: "brackets",
    group: "symbols",
    name: "4 · Containment",
    idea: "Two brackets hold a single box: the sandbox as a contained environment. From the v2 favicon.",
    draw: (fg, bg) => (
      <>
        <rect width="100" height="100" fill={bg} />
        <path d="M0 0h30v14H14v72h16v14H0Z" fill={fg} />
        <path d="M100 0H70v14h16v72H70v14h30Z" fill={fg} />
        <rect x="36" y="36" width="28" height="28" fill={fg} />
      </>
    ),
  },
  {
    id: "grid",
    group: "symbols",
    name: "5 · Escaping cell",
    idea: "A 3 by 3 grid of boxes. One has broken out of formation. Eight teams build, one breaks.",
    draw: (fg, bg) => (
      <>
        <rect width="100" height="100" fill={bg} />
        {[0, 1, 2].flatMap((r) =>
          [0, 1, 2].map((c) =>
            r === 0 && c === 2 ? null : <rect key={`${r}${c}`} x={4 + c * 32} y={10 + r * 30} width="24" height="24" fill={fg} />,
          ),
        )}
        <rect x="74" y="0" width="24" height="24" fill={fg} transform="rotate(14 86 12)" />
      </>
    ),
  },
  {
    id: "strips",
    group: "symbols",
    name: "6 · Strip stack",
    idea: "Three banner strips from the hero, shifted like they are being scrolled. The page's signature, as a mark.",
    draw: (fg, bg) => (
      <>
        <rect width="100" height="100" fill={bg} />
        <rect x="0" y="8" width="84" height="22" fill={fg} />
        <rect x="16" y="39" width="84" height="22" fill={fg} />
        <rect x="6" y="70" width="84" height="22" fill={fg} />
        {[0, 1, 2].map((r) => (
          <g key={r}>
            {[0, 1, 2].map((k) => (
              <rect key={k} x={(r === 1 ? 20 : r === 2 ? 10 : 4) + k * 4} y={8 + r * 31 + 3} width="2" height="16" fill={bg} />
            ))}
          </g>
        ))}
      </>
    ),
  },
];

export function MarkSvg({ mark, fg, bg, size, title }: { mark: Mark; fg: string; bg: string; size: number; title?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      {mark.draw(fg, bg)}
    </svg>
  );
}
