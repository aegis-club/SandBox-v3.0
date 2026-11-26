import type { ReactElement } from "react";

/* Candidate SandBox marks. Each mark is a sealed box with carves cut from it,
   drawn in the same grammar as the SANDBOX wordmark. `fg` is the box colour,
   `bg` is the carve colour (the colour of whatever sits behind the mark). */

type MarkProps = { fg: string; bg: string; size: number; title?: string };

export type Mark = { id: string; name: string; idea: string; draw: (fg: string, bg: string) => ReactElement };

export const MARKS: Mark[] = [
  {
    id: "o",
    name: "A · The O (current)",
    idea: "The tilted O from the wordmark, carved from one box.",
    draw: (fg, bg) => (
      <>
        <rect width="100" height="100" fill={fg} />
        <ellipse cx="50" cy="50" rx="16" ry="33" transform="rotate(32 50 50)" fill={bg} />
      </>
    ),
  },
  {
    id: "s",
    name: "B · The S",
    idea: "The S carve: two bars cut from opposite sides. Reads as an S and as a sealed lid.",
    draw: (fg, bg) => (
      <>
        <rect width="100" height="100" fill={fg} />
        <path d="M101 20H45a12 12 0 0 0 0 24h56Z" fill={bg} />
        <path d="M-1 56h56a12 12 0 0 1 0 24H-1Z" fill={bg} />
      </>
    ),
  },
  {
    id: "breach",
    name: "C · The breach",
    idea: "A box with one corner carved open, and the piece escaping. Beyond the boundary.",
    draw: (fg, bg) => (
      <>
        <rect width="100" height="100" fill={bg} />
        <path d="M0 24h52a24 24 0 0 0 24 24v52H0Z" fill={fg} />
        <rect x="80" y="0" width="20" height="20" fill={fg} />
      </>
    ),
  },
  {
    id: "sb",
    name: "D · S + B pair",
    idea: "Two boxes, S and B, side by side. A monogram that keeps the wordmark's letters.",
    draw: (fg, bg) => (
      <>
        <rect width="100" height="100" fill={bg} />
        <rect x="0" y="0" width="47" height="100" fill={fg} />
        <path d="M48 20H22a10 10 0 0 0 0 20h26Z" fill={bg} />
        <path d="M-1 60h26a10 10 0 0 1 0 20H-1Z" fill={bg} />
        <rect x="53" y="0" width="47" height="100" fill={fg} />
        <path d="M101 44 86 50l15 6Z" fill={bg} />
        <path d="M65 17h12a8 8 0 0 1 0 16H65Z" fill={bg} />
        <path d="M65 63h14a9 9 0 0 1 0 18H65Z" fill={bg} />
      </>
    ),
  },
  {
    id: "three",
    name: "E · The 3",
    idea: "The edition number in the carve grammar: two bars cut from the left. Changes each year.",
    draw: (fg, bg) => (
      <>
        <rect width="100" height="100" fill={fg} />
        <path d="M-1 20h56a12 12 0 0 1 0 24H-1Z" fill={bg} />
        <path d="M-1 56h56a12 12 0 0 1 0 24H-1Z" fill={bg} />
      </>
    ),
  },
];

export function MarkSvg({ mark, fg, bg, size, title }: MarkProps & { mark: Mark }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      {mark.draw(fg, bg)}
    </svg>
  );
}
