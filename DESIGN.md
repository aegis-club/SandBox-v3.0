---
version: alpha
name: SandBox-v3-design
description: "A screen-printed event poster for a 24-hour security hackathon. A signal yellow field with a white grid carries ink strips, white paper, and a carved seven-box SANDBOX wordmark."

colors:
  yellow: "#ffd400"
  ink: "#14120b"
  paper: "#fffef8"
  white: "#ffffff"
  ink-line: "#3d3823"
  on-yellow-2: "#473c00"
  on-ink-2: "#cfc8a8"
  on-paper-2: "#4d4a3e"

typography:
  display:
    fontFamily: "Archivo Variable, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.3rem, 6.4vw, 6rem)"
    fontWeight: 900
    lineHeight: 0.92
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 125"
  headline:
    fontFamily: "Archivo Variable, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.3rem, 1.1rem + 0.9vw, 2rem)"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "-0.015em"
    fontVariation: "'wdth' 125"
  title:
    fontFamily: "Archivo Variable, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.1rem, 1rem + 0.5vw, 1.4rem)"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 108"
  lead:
    fontFamily: "Archivo Variable, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.0625rem, 0.98rem + 0.4vw, 1.3125rem)"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Archivo Variable, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
  note:
    fontFamily: "Archivo Variable, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Archivo Variable, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 800
    letterSpacing: "0.06em"
    fontVariation: "'wdth' 125"
  button:
    fontFamily: "Archivo Variable, Helvetica Neue, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 700
    fontVariation: "'wdth' 112"
  code:
    fontFamily: "Martian Mono Variable, ui-monospace, Menlo, monospace"
    fontSize: "0.8125rem"
    fontWeight: 600
    letterSpacing: "0em"

rounded:
  none: "0px"

spacing:
  gutter: "clamp(1rem, 4vw, 3rem)"
  band: "clamp(4.5rem, 10vw, 9rem)"
  column-gap: "3rem"
  header: "3.5rem"
  rule: "2px"

components:
  band-yellow:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.ink}"
  band-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  band-paper:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  header:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.ink}"
    height: "{spacing.header}"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.yellow}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 1.4rem"
    height: "3.25rem"
  button-ink-hover:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 1.4rem"
    height: "3.25rem"
  button-line-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.yellow}"
  strip-paper:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
  strip-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.none}"
  strip-yellow:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
  zone-tile:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.title}"
    rounded: "{rounded.none}"
  zone-tile-hover:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.ink}"
  zone-tile-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  brief-panel:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "clamp(1.25rem, 2.6vw, 2.25rem)"
  tag:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.yellow}"
    rounded: "{rounded.none}"
    padding: "0.4rem 0.7rem"
  leg:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "clamp(1.1rem, 2vw, 1.75rem)"
  leg-inside:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
---

# Design System: SandBox v3.0

This file is the single source for design decisions on the SandBox v3.0 website.
Claude reads this file before writing any UI code.
Claude updates this file each time the user shares a new inspo.

The front matter and the first eight sections follow the DESIGN.md format.
Sections 9 to 14 extend the format for project facts, motion, and the Inspo Log.
This file describes the build that shipped on 2026-11-26.

**How the file grows**

1. The user shares one inspo (link, screenshot, or video).
2. Claude adds one entry to the Inspo Log (section 12).
3. Claude records each take, each skip, and the section it applies to.
4. Claude updates the tokens above if the inspo changes them.
5. Claude builds only from ideas that this file records.

An "inspo" is one external design reference.
A "take" is one concrete idea that the site borrows from an inspo.
A "token" is one named design value in the front matter above.
A "strip" is one horizontal banner with a fringe and an end cap at each end.
A "band" is one full-width page section with one surface colour.
A "carve" is one shape that cuts a letter out of its box.

## Overview

**Creative North Star: "The Screen-Printed Poster"**

The site is a screen-printed event poster that moves.
A signal yellow field with a faint white grid fills the first screen.
Strips cross the field and repeat the SANDBOX wordmark.
The wordmark is seven sealed boxes; a carve opens each box into a letter.

The page uses three inks: yellow, warm ink, and paper.
The type is one variable family that changes width instead of changing font.
The surface is flat, with square corners and 2px rules.
Motion tells the product story: a sealed box opens, and the visitor enters it.

The world replaces the earlier near-black Carbon canvas.
The world also rejects the sticker-and-shadow look of the v2 site.
The result must not look too playful, and must not look like a corporate SaaS page.

**Key Characteristics:**

- A signal yellow field with a white grid.
- Three inks only: yellow, warm ink, and paper.
- Strips that alternate polarity, with end caps and a fringe.
- A custom SANDBOX wordmark made of seven carved boxes.
- Archivo Variable at width 125 and weight 900 for display type.
- Martian Mono for codes only.
- Square corners, 2px rules, and no cast shadows.
- Six named motions: carve, wipe, stretch, shear, rule-draw, and breach.

## Colors

The palette is a three-ink print: one yellow, one warm black, and one paper white.

| Token | CSS variable | Role |
|---|---|---|
| `yellow` | `--y` | The field, the header, yellow bands, and headings on ink. |
| `ink` | `--ink` | Text, rules, ink bands, ink buttons, and the selected tile. |
| `paper` | `--paper` | Paper bands, tiles, and text on ink. |
| `white` | `--white` | Grid lines, paper strips in the hero, and the ink button hover fill. |
| `ink-line` | `--ink-line` | 2px rules on ink bands. |
| `on-yellow-2` | `--on-y-2` | Secondary text on yellow. |
| `on-ink-2` | `--on-ink-2` | Secondary text on ink. |
| `on-paper-2` | `--on-paper-2` | Secondary text on paper. |

### Primary

- **Signal Yellow** (`{colors.yellow}`): The field colour. Yellow covers the first screen, the header, and two full bands.

### Neutral

- **Warm Ink** (`{colors.ink}`): A black with a yellow cast. Ink carries all text on yellow and on paper.
- **Paper** (`{colors.paper}`): A warm white for bands and tiles.
- **Print White** (`{colors.white}`): A pure white for grid lines and hero strips.
- **Ink Line** (`{colors.ink-line}`): A dark olive for rules on ink. This colour never carries text.
- **Secondary text tones** (`{colors.on-yellow-2}`, `{colors.on-ink-2}`, `{colors.on-paper-2}`): Each tone tints one ink for notes and descriptions.

Measured contrast ratios:

| Pair | Ratio |
|---|---|
| Ink on yellow | 13.08:1 |
| `on-yellow-2` on yellow | 7.66:1 |
| `on-ink-2` on ink | 11.13:1 |
| `on-paper-2` on paper | 8.79:1 |
| White on yellow | 1.43:1 |

### Named Rules

**The Yellow Field Rule.** Yellow is the brand colour and the user fixed it. Yellow stays the page field on every new surface.

**The Three Inks Rule.** Every surface is yellow, ink, or paper. The secondary text tones tint these inks. The system has no second accent.

**The White Is Not Text Rule.** White and paper never carry text on yellow. White appears on yellow only as grid lines and strip fills.

## Typography

**Display Font:** Archivo Variable (with Helvetica Neue, Arial, sans-serif)
**Body Font:** Archivo Variable (the same family at normal width)
**Label/Mono Font:** Martian Mono Variable (with ui-monospace, Menlo, monospace)

**Character:** One grotesque family does every job by changing width and weight. The wide black cut reads like poster lettering; the normal cut reads like a programme note.

Archivo ships a width axis from 62 to 125 and a weight axis from 100 to 900.
The CSS sets width with `font-stretch` and weight with `font-weight`.
The package `@fontsource-variable/archivo` serves the font from the project.

### Hierarchy

- **Display** (weight 900, width 125, `clamp(2.3rem, 6.4vw, 6rem)`, line-height 0.92, uppercase): Section titles. The closing line and the breach line use the same cut at a larger size.
- **Strip title** (weight 900, width 125, uppercase): A section title inside a strip. The size follows the strip height and shrinks to fit the track.
- **Headline** (weight 900, width 125, `clamp(1.3rem, 1.1rem + 0.9vw, 2rem)`, line-height 1, uppercase): Item headings on ink bands. The colour is yellow.
- **Title** (weight 800, width 108, `clamp(1.1rem, 1rem + 0.5vw, 1.4rem)`, line-height 1.15, sentence case): Phase names, tile names, and list item names.
- **Lead** (weight 400, `clamp(1.0625rem, 0.98rem + 0.4vw, 1.3125rem)`, line-height 1.5): The paragraph next to a section title. The measure is at most 34em.
- **Body** (weight 400, 1.0625rem, line-height 1.55): Descriptions and answers. The measure is 28em to 38em.
- **Note** (weight 400, 0.875rem, line-height 1.5): "To be announced" lines and the footer.
- **Label** (weight 800, width 125, 0.8125rem, letter-spacing 0.06em, uppercase): The name of a group, such as a journey leg or a tag list.
- **Button** (weight 700, width 112, 1rem): Button text in sentence case.
- **Code** (Martian Mono, weight 600, 0.75rem to 0.8125rem, letter-spacing 0): Z codes, phase numbers, the version tag, and coordinates.

### Named Rules

**The Width Is Voice Rule.** Hierarchy comes from width and weight inside one family. Display type uses width 125. Width 62 appears only in the Loop words at rest.

**The Codes Only Rule.** Martian Mono sets machine values only: Z codes, phase numbers, the version tag, and coordinates. Martian Mono never sets a heading, a label, or a sentence.

**The Group Label Rule.** A label names a group of items. A label never sits above a title as a kicker.

## Layout

The page is a stack of full-width bands.
Each band has one surface: yellow, ink, or paper.
Adjacent sections change surface; Venue and FAQ share one paper band.

- **Gutter.** The side padding is `{spacing.gutter}`. Above 96rem of content, the gutter grows and centres the content.
- **Band padding.** Each band has `{spacing.band}` of vertical padding.
- **Grid field.** The white grid divides the content width into 6 cells on phones. The grid has 12 cells from 60rem up. Grid cells are square.
- **Columns.** Sections split into two columns from 60rem up, with a `{spacing.column-gap}` gap. The splits follow the 12-cell grid: 8 and 4, 7 and 5, 6 and 6, 5 and 7.
- **Header.** The header is fixed and `{spacing.header}` tall. Anchor targets offset by the header height.
- **Strips.** A strip spans the content width between the gutters. The hero strip height is the smaller of 12.5svh and 12.2vw.
- **Hero.** The hero is 230svh tall, and its content pins for one screen height. Strips fill the top of the screen; the headline and the buttons sit below.

Responsive changes:

| Breakpoint | Change |
|---|---|
| Up to 26rem | The header hides the version tag. |
| Below 60rem | Single column. The hero shows five strips. A menu button opens a full-screen ink menu. |
| 40rem and up | The territory map shows four tiles per row instead of two. |
| 48rem and up | Rule lists and pillar lists use two or three columns. |
| 60rem and up | The grid has 12 cells. The hero shows four strips. The header shows inline navigation. |
| 68rem and up | The territory map and the briefing sit side by side. |

- Hover effects run only inside `@media (hover: hover)`.
- On touch, a tap on a wordmark letter seals the letter for 900ms.
- Touch targets are at least 44px tall.

## Elevation & Depth

The system is flat.
Depth comes from surface change between bands and from overlap in the breach.
The system has no cast shadows, no blur, and no blended gradients.

Two hard-edged devices use CSS that looks like a shadow or a gradient.
A 2px inset `box-shadow` draws the border of a line button and of a panel.
A hard-stop `linear-gradient` draws the grid lines and the fringe lines.

### Named Rules

**The Flat Print Rule.** Nothing casts a shadow and nothing blends. A gradient is legal only as a hard-edged line pattern, such as the grid and the fringe.

## Shapes

Every box has square corners (`{rounded.none}`).
Rules and borders are 2px thick and solid.
Rules are ink on yellow and on paper; rules are `{colors.ink-line}` on ink.

Curves live in two places only.
The carves inside the wordmark use arcs, teardrops, and one tilted ellipse.
The registration mark in the hero imprint is a circle with a cross.

Small solid squares act as markers: the status square, the phrase separator, and the sponsor slot boxes.

### Named Rules

**The Square Corner Rule.** Buttons, tiles, panels, tags, and strips never round a corner. Curves belong to the carves and to the registration mark.

## Components

Components feel printed and decisive: solid fills, hard edges, and one clear state change.

### Buttons

- **Shape:** Square corners, 3.25rem tall, with 1.4rem side padding.
- **Ink button:** Ink fill and yellow text. This is the primary action, such as "Request entry".
- **Line button:** Transparent fill, a 2px ink inset border, and ink text. This is the secondary action.
- **Hover:** A fill wipes in from the left in 0.45s. The ink button turns white with ink text. The line button turns ink with yellow text.
- **Arrow:** An ink button may end with an SVG arrow. The arrow moves 4px right on hover.
- **Press:** The button scales to 0.97.
- **Focus:** A 3px ink outline sits 3px outside the control. The outline is yellow on ink surfaces.
- **Text link:** Weight 700 with a 2px underline and an optional arrow.

### Strip

The strip is the signature container.
A strip has five parts in a row: fringe, end cap, track, end cap, fringe.

- **Fringe:** Horizontal lines, 2px thick with a 3px gap, in the strip foreground colour.
- **End cap:** A solid block in the foreground colour, 0.4 of the strip height wide. The cap holds a vertical label in Archivo at weight 800 and width 125. The shipped labels are V3.0, 24H, 2027, DSCE, and Open.
- **Track:** The strip background colour. The track clips its content.
- **Polarity:** A strip is paper (white fill, ink content), ink (ink fill, white content), or yellow (yellow fill, ink content). Stacked strips alternate polarity.
- **On ink bands:** The caps and the fringe take the strip fill colour, so the strip stays visible.

A strip carries one of three contents:

1. **Wordmark run.** Six wordmarks repeat in a row. Every row starts on a full word.
2. **Strip title.** One section title fills the track. Journey, The alliance, and Request entry use this form.
3. **Phrase run.** Short uppercase phrases repeat, with a solid square between phrases. Two phrase strips form the tape between sections.

### Wordmark

The SANDBOX wordmark is an SVG, not a font.
Each of the seven letters is a solid box in the strip foreground colour.
Carves in the strip background colour cut the letter out of the box.
The O is one ellipse, tilted 32 degrees.
The header brand mark and the favicon reuse this box and this ellipse.

- **Sealed state:** Every carve scales to 0, so the letter is a solid box.
- **Open state:** Every carve scales to 1 from its own origin.
- **Hover:** A letter seals again in 0.3s while the pointer rests on it.

### Territory tiles and briefing

- **Map:** Eight tiles sit in an ink frame with 2px ink gaps.
- **Tile:** Paper fill, a mono Z code at the top, and the territory name at the bottom.
- **Hover:** The tile turns yellow.
- **Selected:** One ink fill slides between tiles. The code turns yellow and the name turns paper.
- **Briefing:** A yellow panel shows the Z code, the full name, the description, and ink tags.
- **Tags:** Ink fill, yellow text, weight 600, with `0.4rem 0.7rem` padding.
- **Keyboard:** The map is a tab list. Arrow keys, Home, and End move the selection.

### Ruled lists

A ruled list separates items with 2px rules instead of cards.
The pillars, the rules, the sponsor tiers, the phases, and the FAQ use this pattern.

- **Rule:** A 2px line sits above each item.
- **FAQ row:** A question button ends with an ink square that holds a yellow plus. The plus becomes a minus when the answer opens.
- **Sponsor tier:** Outlined yellow squares show the open slots. The squares fill on hover.

### Journey legs

- **Leg:** A yellow panel with a 2px ink inset border.
- **Inside leg:** An ink panel with paper text and yellow numbers. This leg is taller than its neighbours from 60rem up.
- **Phase:** A mono number, a phase name, and a code name in the secondary text tone.

### Navigation

- **Header:** Yellow fill with a 2px ink bottom rule. The header holds the brand mark, the links, and a small ink button.
- **Links:** Weight 600 at 0.9375rem. A 2px ink underline draws from the left on hover.
- **Brand mark:** An ink box with a tilted yellow ellipse. The ellipse rotates 180 degrees on hover.
- **Phone menu:** A full-screen ink panel wipes down from the header. Menu links use the display cut in yellow, with ink-line rules between links.

### Loop words

Four words stack as a ruled list: Build, Break, Experiment, Repeat.
A word at rest is an outline at width 62.
The active word fills yellow and stretches to width 125.

### Venue plot

A square yellow panel with a white grid and a 2px ink inset border.
Two ink lines cross at the venue, and an ink box marks the spot.
Mono coordinates label the lines.

## Do's and Don'ts

### Do:

- **Do** keep the page field yellow (`{colors.yellow}`) on every new surface.
- **Do** build each surface from the three inks: yellow, ink, and paper.
- **Do** set every box with square corners and 2px solid rules.
- **Do** set display type in Archivo at weight 900, width 125, and uppercase.
- **Do** set Z codes, phase numbers, the version tag, and coordinates in Martian Mono.
- **Do** alternate strip polarity when strips stack.
- **Do** separate list items with 2px rules.
- **Do** reveal content with one named motion from section 10.
- **Do** use the CSS custom properties; keep hex values out of component rules.
- **Do** mark unknown facts as "To be announced".

### Don't:

- **Don't** add a second accent colour.
- **Don't** set text in white or paper on yellow.
- **Don't** set body text in yellow.
- **Don't** round a corner on a button, a tile, a panel, a tag, or a strip.
- **Don't** add a cast shadow, a glow, a blur, or a blended gradient.
- **Don't** add a third font family. The SVG wordmark is art, so it does not count.
- **Don't** set a heading or a sentence in Martian Mono.
- **Don't** place a small label above a title as a kicker.
- **Don't** fade a section up on scroll.
- **Don't** add an illustration or a stock photo. Repetition of the wordmark is the graphic.
- **Don't** bring back the near-black Carbon canvas, IBM Plex, or the v2 sticker-and-shadow look.

## 9. Project Facts and Stack

| Item | Value |
|---|---|
| Event | SandBox v3.0, a 24-hour cybersecurity hackathon |
| Organiser | Aegis |
| Venue | Dayananda Sagar College of Engineering (DSCE), Bengaluru |
| Year | 2027, dates not announced |
| Theme line | "Operation: Beyond the boundary" |
| Loop | Build / Break / Experiment / Repeat |
| Tracks | 8 "territories", coded Z-01 to Z-08 |
| Schedule | 9 phases: 3 before, 4 inside, 2 after |

The earlier static site now lives in `legacy/`.
The React build keeps its copy in `src/data.ts` and in the components.
The React build reuses the legacy copy unless the user changes it.

| Layer | Choice | Use |
|---|---|---|
| Framework | React 19 + Vite 8 + TypeScript | App shell and components |
| Styling | Plain CSS with custom properties in `src/styles.css` | Tokens and layout |
| Motion | Motion 14, imported from `"motion/react"` | Scroll-linked motion, reveals, and layout motion |
| CSS transitions | Plain CSS | Carve, stretch, and hover states |
| Smooth scroll | Lenis | Page scroll feel (`lerp: 0.11`) |
| Fonts | `@fontsource-variable/archivo` and `@fontsource-variable/martian-mono` | Self-hosted variable fonts |

The build does not use Tailwind, GSAP, or React Three Fiber.

Stack rules:

1. Import Motion from `"motion/react"`, not from `"framer-motion"`.
2. Write styles in `src/styles.css` with the custom properties on `:root`.
3. Use a CSS transition for a state change on one element.
4. Use Motion for scroll-linked motion, for enter and exit, and for shared layout motion.
5. Never animate one property on one element with both CSS and Motion.
6. Ask the user before adding Tailwind, GSAP, or a 3D library.

Build rules:

1. Build one component at a time and name its front-matter key.
2. Read "Do's and Don'ts" and section 10 before writing any component.
3. Check the Section Map (section 13) for the signature motion of that section.
4. Check the Inspo Log (section 12) for approved takes.
5. Ask the user before adding an effect that no inspo supports.

## 10. Motion System

Motion carries the product story: containment, breach, release.
The build uses six named motions.

| Motion | What moves | Values | Where |
|---|---|---|---|
| Carve | Each carve scales from 0 to 1, so a sealed box becomes a letter. | 0.9s, 70ms per letter, 110ms per row. Re-seal takes 0.3s. | Hero strips on load, Close strips on view, letter hover. |
| Wipe | A `clip-path` inset uncovers an element from one edge. | 0.9s to 1.1s for titles, 0.55s for the menu, 0.5s for the briefing. | Titles, strip titles, the menu, the briefing, button fills. |
| Stretch | A word changes width from 62 to 125 and fills with yellow. | 0.8s. The active word advances every 2.2s. | Loop words. |
| Shear | Stacked strips slide in opposite directions with scroll. | Hero rows move -26, 34, -42, 22, and -34vw. Tape strips move 45vw. Close strips move 30vw. | Hero, Tape, Close. |
| Rule-draw | A 2px rule scales from the left, one item after another. | 0.9s, with a 0.09s stagger. | Ruled lists, journey phases, the venue plot. |
| Breach | One O in the third hero row seals, then grows into an ink screen. | Scroll progress 0.1 to 0.86, with a smoothstep curve. | Hero only. |

All timed motion uses one easing: `cubic-bezier(0.16, 1, 0.3, 1)`.
The CSS names this easing `--out`.
The selected territory fill uses a spring with stiffness 380 and damping 34.

**Principles**

1. Give each section one signature motion from the table above.
2. Tie motion to the story: a sealed box opens, and the visitor enters it.
3. Drive long motion from scroll position with `useScroll` and `useTransform`.
4. Use `layoutId` so one fill moves between states.
5. Use `AnimatePresence` for every element that leaves the page.
6. Reveal lists with rule-draw; do not fade a section up.
7. Play each reveal once per page load.
8. Keep the page usable before any motion finishes.

**Reduced motion**

1. The app wraps the page in `<MotionConfig reducedMotion="user">`.
2. Lenis does not start.
3. The hero does not pin, the strips do not shear, and the breach does not run.
4. The breach line appears as a normal title in the Loop section.
5. CSS transitions drop to 0.01ms.
6. The Loop words stop advancing on their own.

Opacity changes appear in four places: the hero copy on scroll, a FAQ answer, a leaving briefing, and the phone menu links.

**Effects not built**

The earlier catalogue listed these candidates; the build does not use them: text scramble, magnetic button, number count-up, cursor spotlight, and pinned horizontal scene.
A candidate becomes approved only when an inspo supports it.

## 11. Reference Library

Source: https://github.com/VoltAgent/awesome-design-md (MIT licence).
The repository holds DESIGN.md files extracted from 80+ real websites.
Claude saved six relevant files in `inspo/design-md/`.
The full list is in the repository README; Claude fetches more files on request.

| File | Why it is relevant | Take |
|---|---|---|
| `ibm.DESIGN.md` | The legacy static site used Carbon and IBM Plex. | Square corners, rule-based hierarchy, no shadows. |
| `clickhouse.DESIGN.md` | Yellow with black, technical voice. | Full yellow bands. |
| `binance.DESIGN.md` | Yellow with urgency. | Black text on yellow surfaces. |
| `sanity.DESIGN.md` | Editorial site with mono technical labels. | Very large display type. |
| `warp.DESIGN.md` | Terminal-native brand. | No take shipped. |
| `framer.DESIGN.md` | Motion-first site. | Poster-tight section titles. |

**Conflicts resolved**

- IBM uses weight 300 for display type. The build uses Archivo at weight 900.
- IBM and Sanity use mono eyebrows. The build uses no eyebrows; Martian Mono sets codes only.
- ClickHouse and Binance use yellow as a scarce accent on dark. The build uses yellow as the field.
- Warp uses terminal mock-ups as hero imagery. The build uses wordmark strips instead.
- Framer uses gradient panels. The Flat Print Rule bans blended gradients; the build takes only the type treatment.

## 12. Inspo Log

**Entry template**

```
### INSPO-NN — <short name>
- Source: <link or file>
- Status: pending | reviewed
- Summary: <what the inspo shows, in two sentences>
- Takes:
  1. <idea> → <section> → <tool> → <shipped | not shipped>
- Skips: <what the site does not borrow, and why>
- Token changes: <none, or the tokens that change>
```

### INSPO-01 — Dribbble "Hackathons" shot

- Source: https://dribbble.com/shots/3945259-Hackathons
- File: `inspo/inspo-01.png`
- Status: reviewed, built on 2026-11-26
- Summary: Six stacked banner strips repeat the word "HACKATHON" on an acid-lime field with a faint grid. The strips alternate black-on-white and white-on-black, and each strip ends in a rotated "H2.22" label and a fringe of fine lines.
- Takes:
  1. Stacked strips that alternate polarity → Hero and Close → Motion `useScroll`. **Shipped.** The hero has four strips on desktop and five on phones; Close has two.
  2. Custom wordmark with fluid counters inside blocky letters → "SANDBOX" in every wordmark strip. **Shipped.** The build scales SVG carves with CSS; the build does not morph paths.
  3. Rotated end-cap label → every strip. **Shipped.** The labels use CSS `writing-mode` and Archivo, not mono.
  4. Fringe of fine lines at each strip end → every strip. **Shipped** with a CSS repeating gradient.
  5. Flat saturated field with a faint lighter grid → Hero, Tape, Journey, Register, and the venue plot. **Shipped** with white CSS grid lines.
  6. Pure repetition as the graphic, with no illustration → Hero and Close. **Shipped.** The loading screen is not built.
  7. Strict three-colour discipline: one accent, black, white → whole site. **Shipped** as the Three Inks Rule.
- Skips: The acid-lime colour. The user fixed yellow as the brand colour. The static poster layout has no hierarchy for body copy, so the site uses strips only for display moments.
- Token changes: all colour and type tokens. Yellow became the field, and Archivo and Martian Mono replaced IBM Plex. The wordmark is SVG art, so it does not break the two-font rule.

### INSPO-02 — awesome-design-md repository

- Source: https://github.com/VoltAgent/awesome-design-md
- Status: reviewed
- Summary: A collection of DESIGN.md files in the Stitch format. Each file gives tokens, components, and guardrails for one real website.
- Takes:
  1. The DESIGN.md format → this whole file → front matter plus sections. **Shipped.**
  2. Token references such as `{colors.yellow}` → all components → CSS custom properties. **Shipped** without Tailwind.
  3. The six reference files in section 11 → guardrails in "Do's and Don'ts". **Shipped in part**; section 11 lists the takes that remain.
  4. "Alternate surface modes between bands" → page rhythm → layout. **Shipped.**
  5. "Yellow stat numbers" → Stats band → Motion count-up. **Not shipped.** The build has no stats band.
- Skips: Claude did not copy any single brand's look. The reference files do not cover motion.
- Token changes: none. The file was renamed from `DESIGN_INSPO.md` to `DESIGN.md`.

## 13. Section Map and Decisions

| # | Section | Shipped name | Surface | Signature motion | Inspo |
|---|---|---|---|---|---|
| 0 | Header | Nav + "Request entry" | Yellow | Wipe (phone menu) | — |
| 1 | Hero | SANDBOX strips + "24 hours to break things" | Yellow grid | Carve, shear, breach | INSPO-01 |
| 2 | Experience | The loop + three pillars | Ink | Stretch, rule-draw | — |
| 3 | Tape | Two phrase strips | Yellow grid | Shear | INSPO-01 |
| 4 | Territories | "Choose your territory." | Paper | Wipe, sliding ink fill | — |
| 5 | Journey | "The journey." in a strip | Yellow grid | Wipe, rule-draw | INSPO-01 |
| 6 | Rules | "Rules of the playground." | Ink | Wipe, rule-draw | — |
| 7 | Venue | "Your destination." | Paper | Wipe, rule-draw (plot) | — |
| 8 | FAQ | "Know before you enter." | Paper | Wipe | — |
| 9 | Sponsors | "The alliance." in a strip | Ink | Wipe, rule-draw | INSPO-01 |
| 10 | Register | "Request entry." in a strip | Yellow grid | Wipe | INSPO-01 |
| 11 | Close | "Enter the playground. Break the limits." + two strips | Ink | Wipe, carve, shear | INSPO-01 |

The build has no stats band and no console panel.
Two phrase strips replace the hazard tape.

| Date | Decision | Reason |
|---|---|---|
| 2026-11-26 | Stack is React with Motion | User requirement |
| 2026-11-26 | Tokens start from the static site | Superseded on the same day by the yellow poster world |
| 2026-11-26 | File follows the Stitch DESIGN.md format | INSPO-02 |
| 2026-11-26 | Yellow is non-negotiable as the brand colour | User requirement |
| 2026-11-26 | A custom SANDBOX wordmark replaces a generic headline | User requirement |
| 2026-11-26 | The world moved from the dark Carbon canvas to a yellow poster world | INSPO-01 and the user's yellow requirement |
| 2026-11-26 | Plain CSS and Motion replace Tailwind and GSAP | The build needed neither library |

## 14. Open Questions

1. Does the site need a second theme? The build ships one theme and no toggle.
2. Does the user want a 3D hero scene? The build has none.
3. Which other brands from the repository should Claude add to section 11?
4. Does the site need a loading screen that uses the wordmark carve?
5. Should the header button and the menu button grow to 44px on phones? Both are 36px tall today.
