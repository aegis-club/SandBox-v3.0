/* The SB3 monogram: S, B and 3 carved from three boxes in a 2 by 2 grid.
   The fourth cell stays empty, an open slot in the sandbox.
   `fg` is the box colour and `bg` the carve colour (the ground behind the mark). */

type Props = { fg?: string; bg?: string; size?: number | string; className?: string; title?: string };

export const SB3_CELLS = (fg: string, bg: string) => (
  <>
    {/* S */}
    <rect x="0" y="0" width="47" height="47" fill={fg} />
    <path d="M48 9H21a5 5 0 0 0 0 10h27Z" fill={bg} />
    <path d="M-1 28h27a5 5 0 0 1 0 10H-1Z" fill={bg} />
    {/* B */}
    <rect x="53" y="0" width="47" height="47" fill={fg} />
    <path d="M101 19.5 93 23.5l8 4Z" fill={bg} />
    <path d="M65 8h10a4.5 4.5 0 0 1 0 9H65Z" fill={bg} />
    <path d="M65 30h11a4.5 4.5 0 0 1 0 9H65Z" fill={bg} />
    {/* 3 */}
    <rect x="0" y="53" width="47" height="47" fill={fg} />
    <path d="M-1 62h27a5 5 0 0 1 0 10H-1Z" fill={bg} />
    <path d="M-1 81h27a5 5 0 0 1 0 10H-1Z" fill={bg} />
  </>
);

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
      {SB3_CELLS(fg, bg)}
    </svg>
  );
}
