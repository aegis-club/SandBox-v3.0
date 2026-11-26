import type { ReactElement } from "react";

/* SandBox monograms. Each letter is a 47 by 47 box with carves cut from it,
   in the grammar of the SANDBOX wordmark. `fg` is the box colour and `bg`
   the carve colour (the ground behind the mark). Cells sit on a 100 by 100
   grid with a 6 unit gap. */

type Cell = (fg: string, bg: string) => ReactElement;

const S: Cell = (fg, bg) => (
  <>
    <rect width="47" height="47" fill={fg} />
    <path d="M48 9H21a5 5 0 0 0 0 10h27Z" fill={bg} />
    <path d="M-1 28h27a5 5 0 0 1 0 10H-1Z" fill={bg} />
  </>
);

const B: Cell = (fg, bg) => (
  <>
    <rect width="47" height="47" fill={fg} />
    <path d="M48 19.5 40 23.5l8 4Z" fill={bg} />
    <path d="M12 8h10a4.5 4.5 0 0 1 0 9H12Z" fill={bg} />
    <path d="M12 30h11a4.5 4.5 0 0 1 0 9H12Z" fill={bg} />
  </>
);

const V: Cell = (fg, bg) => (
  <>
    <rect width="47" height="47" fill={fg} />
    <path d="M11-1h25L23.5 33Z" fill={bg} />
    <path d="M-1 9v39h17Z" fill={bg} />
    <path d="M48 9v39H31Z" fill={bg} />
  </>
);

const THREE: Cell = (fg, bg) => (
  <>
    <rect width="47" height="47" fill={fg} />
    <path d="M-1 9h27a5 5 0 0 1 0 10H-1Z" fill={bg} />
    <path d="M-1 28h27a5 5 0 0 1 0 10H-1Z" fill={bg} />
  </>
);

const at = (x: number, y: number, cell: Cell, fg: string, bg: string) => (
  <g transform={`translate(${x} ${y})`}>{cell(fg, bg)}</g>
);

/* The earlier three-box version, kept for the logo lab. */
export const SB3_CELLS = (fg: string, bg: string) => (
  <>
    {at(0, 0, S, fg, bg)}
    {at(53, 0, B, fg, bg)}
    {at(0, 53, THREE, fg, bg)}
  </>
);

/* SBv3: S B on top, v 3 below. */
export const SBV3_CELLS = (fg: string, bg: string) => (
  <>
    {at(0, 0, S, fg, bg)}
    {at(53, 0, B, fg, bg)}
    {at(0, 53, V, fg, bg)}
    {at(53, 53, THREE, fg, bg)}
  </>
);

type Props = { fg?: string; bg?: string; size?: number | string; className?: string; title?: string };

export function Mark({ fg = "var(--ink)", bg = "var(--y)", size = 28, className, title }: Props) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <clipPath id="mark-clip">
        <rect width="100" height="100" />
      </clipPath>
      <g clipPath="url(#mark-clip)">{SBV3_CELLS(fg, bg)}</g>
    </svg>
  );
}
