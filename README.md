<div align="center">

<img src="public/favicon.svg" width="72" height="72" alt="The SBv3 monogram: S, B, v and 3 carved from four boxes" />

# SandBox v3.0

**24 hours to break things and build them back safer.**

The website for SandBox v3.0, a 24-hour cybersecurity hackathon by Aegis at<br />
Dayananda Sagar College of Engineering, Bengaluru, in 2027.

[**Live site →**](https://sandbox-v3.vercel.app) &nbsp;·&nbsp; [Logo lab](https://sandbox-v3.vercel.app/logo-lab.html) &nbsp;·&nbsp; [Design system](DESIGN.md)

![React](https://img.shields.io/badge/React-19-14120b?style=flat-square&logo=react&logoColor=ffd400)
![Motion](https://img.shields.io/badge/Motion-14-14120b?style=flat-square&logoColor=ffd400)
![Vite](https://img.shields.io/badge/Vite-8-14120b?style=flat-square&logo=vite&logoColor=ffd400)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-14120b?style=flat-square&logo=typescript&logoColor=ffd400)
![Vercel](https://img.shields.io/badge/Hosted_on-Vercel-14120b?style=flat-square&logo=vercel&logoColor=ffd400)

<br />

<img src="public/og.png" width="100%" alt="The SandBox v3.0 hero: stacked banner strips that repeat a carved SANDBOX wordmark, above the headline and the Request entry button" />

</div>

<br />

## What's inside

| Section | What it does |
|---|---|
| **Hero** | Stacked strips repeat a custom SANDBOX wordmark. Each letter starts as a sealed box and carves open. On scroll, the strips shear apart and a box grows to fill the screen. |
| **The loop** | Build, Break, Experiment, Repeat. The active word stretches from narrow to wide. |
| **Territories** | Eight security tracks, Z-01 to Z-08, as a tab grid with a briefing panel. |
| **Journey** | Nine phases in three legs: before, inside the sandbox, and after. |
| **Live ops** | A countdown to hour zero that becomes a live board during the event: elapsed time, a 24-hour track, the current phase, and announcements. |
| **Archive** | SandBox v1.0 and v2.0 as film strips of photos. |
| **Venue** | A poster map of the streets around DSCE, with a switch to Google Maps. |
| **FAQ, sponsors, register** | Answers, open sponsor slots, and the request-entry steps. |

> **Sample data:** The event date, live schedule, announcements, archive photos, and archive figures are placeholders. The site labels each one as a sample. Replace them in `src/data.ts`.

<br />

## Run it locally

You need Node.js 22 or later.

1. Install the dependencies.

   ```bash
   npm install
   ```

2. Start the dev server.

   ```bash
   npm run dev
   ```

3. Open http://localhost:5173.

To test on a phone on the same Wi-Fi network, run `npx vite --host` and open the network address it prints.

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Starts the dev server with hot reload. |
| `npm run build` | Type-checks the code, then builds the site into `dist/`. |
| `npm run preview` | Serves the built site from `dist/`. |
| `npm run typecheck` | Type-checks the site and the tests. |
| `npm test` | Runs the unit and structure tests. |
| `npm run test:e2e` | Runs the browser tests on desktop, tablet, and phone sizes. Build first. |
| `npm run budget` | Checks the built files against their size budgets. Build first. |
| `npm run integrity` | Checks your branch's changes against `origin/main`, as the integrity job does. Commit first. |
| `npm run ci` | Runs every check that CI runs, in the same order. |
| `npm run deploy:manual` | Deploys the local folder to Vercel production. For emergencies only. |

<br />

## How it's built

| Layer | Choice |
|---|---|
| Framework | React 19, Vite 8, TypeScript in strict mode |
| Animation | [Motion](https://motion.dev) (formerly Framer Motion), imported from `motion/react` |
| Smooth scroll | [Lenis](https://github.com/darkroomengineering/lenis) |
| Styling | Plain CSS with custom properties, in `src/styles.css` |
| Fonts | Archivo (variable width and weight) and Martian Mono, self-hosted through Fontsource |
| Map data | OpenStreetMap, through the Overpass API |
| Hosting | Vercel |

### Project layout

```text
sandbox-v3/
├── index.html              The site's entry page
├── logo-lab.html           A page that compares logo candidates
├── src/
│   ├── App.tsx             Section order
│   ├── data.ts             All copy and sample data
│   ├── styles.css          Tokens, palettes, and every section's styles
│   ├── components/         One file per section, plus shared parts
│   │   ├── Wordmark.tsx    The carved SANDBOX wordmark
│   │   ├── Mark.tsx        The SBv3 monogram
│   │   ├── Strip.tsx       Banner strips, strip headings, phrase strips
│   │   ├── Clock.tsx       The shared event clock for Live ops
│   │   └── …
│   ├── lab/                The logo lab
│   └── assets/
│       └── venue-map.json  Street paths for the venue map
├── scripts/
│   └── build-venue-map.py  Rebuilds venue-map.json from OpenStreetMap
├── public/                 Favicon and share image
├── legacy/                 The earlier static draft
├── DESIGN.md               The design system and decision log
└── PRODUCT.md              Product facts and constraints
```

<br />

## The design system

The full system lives in [`DESIGN.md`](DESIGN.md). These are the short rules.

- **Yellow stays.** Yellow, or a shade of it, is the brand colour in every palette.
- **Boxes and carves.** The wordmark, the SBv3 monogram, and the strips all start as square boxes with shapes cut out of them.
- **Square corners.** No element has rounded corners.
- **Two typefaces.** Archivo sets every word. Martian Mono sets only codes, numbers, and coordinates.
- **One motion per section.** Motion follows the containment theme: seal, carve, shear, breach.
- **Reduced motion.** Every animation respects the visitor's reduced-motion setting.

### Palettes (under review)

The site ships eight palettes for team feedback. A bar at the bottom-left switches them, and the URL keeps the choice.

| Palette | Pairs yellow with | Preview |
|---|---|---|
| Signal (current) | Near-black | [`?palette=signal`](https://sandbox-v3.vercel.app/?palette=signal) |
| Honey & Indigo | Indigo | [`?palette=honey`](https://sandbox-v3.vercel.app/?palette=honey) |
| Lemon & Lilac | Soft purple | [`?palette=lilac`](https://sandbox-v3.vercel.app/?palette=lilac) |
| Sun & Cobalt | Navy and cobalt | [`?palette=cobalt`](https://sandbox-v3.vercel.app/?palette=cobalt) |
| Lemon & Teal | Deep teal | [`?palette=citrus`](https://sandbox-v3.vercel.app/?palette=citrus) |
| Butter & Forest | Forest green | [`?palette=forest`](https://sandbox-v3.vercel.app/?palette=forest) |
| Marigold & Plum | Plum and vermilion | [`?palette=marigold`](https://sandbox-v3.vercel.app/?palette=marigold) |
| Mustard & Cocoa | Espresso brown | [`?palette=cocoa`](https://sandbox-v3.vercel.app/?palette=cocoa) |

Each palette is a block of custom properties at the end of `src/styles.css`. Once the team picks one, it becomes the default and the switcher goes away.

<br />

## Common tasks

### Change the event details

1. Open `src/data.ts`.
2. Edit `EVENT.start` to set hour zero, and set `sample` to `false`.
3. Edit `LIVE_PHASES` and `ANNOUNCEMENTS` to match the real schedule.
4. Edit `EDITIONS` with real years, figures, and photo captions.

### Rebuild the venue map

The script fetches streets, water, parks, and the campus around DSCE from OpenStreetMap.

```bash
python3 -I scripts/build-venue-map.py
```

The public Overpass servers can be slow. The script tries three mirrors and retries each one.

### Ship a change

`main` is protected. Nobody, including the org owners, can push to it directly.

1. Create a branch and commit your change.
2. Run `npm run ci` to catch problems before CI does.
3. Push the branch and open a pull request into `main`.
4. Wait for the `integrity` and `checks` jobs to pass. Both must pass before the pull request can merge.
5. Ask an org owner to review. One owner's approval is required, and you cannot approve your own pull request.
6. Merge. Vercel deploys `main` to https://sandbox-v3.vercel.app.

Vercel deploys only `main`. Branches and pull requests never reach Vercel, so unchecked code is never published.

## Tests and checks

CI runs on every pull request and on `main` (`.github/workflows/ci.yml`). It has two jobs.

### The `integrity` job: the pull request's own changes

It runs on pull requests only, and looks only at the files and lines the pull request changes.

| Rule | Fails when |
|---|---|
| Forbidden files | The pull request adds an `.env` file, a private key, or a generated folder such as `dist/` or `node_modules/` |
| Large files | A changed file is over 1 MB |
| Secrets | An added line looks like a private key, an API key, a token, a JWT, or a hard-coded password |
| Leftovers | An added line has `test.only`, `debugger`, or `console.log` in site code |
| Tests | Site code in `src/` changed, but nothing in `tests/` changed. An owner can add the `tests-not-needed` label for a change that truly needs no test. |
| Lockfile | Dependencies in `package.json` changed, but `package-lock.json` did not |
| Description | The pull request description is empty or very short |
| Dependencies | `npm ci` cannot install exactly what the lockfile says, a package signature is invalid, or a site dependency has a known high-severity vulnerability |

It also lists, for reviewers, anything that needs a careful look: new dependencies, changed npm scripts, changed CI or deploy files, deleted tests, and removed assertions.

### The `checks` job: the whole site

| Check | What it protects |
|---|---|
| Type-check | The site and the tests compile in strict TypeScript. |
| Data tests | Eight territories, nine journey phases in order, a 24-hour live schedule with no gaps, valid links. |
| Structure tests | The section order, one h1, landmarks, working in-page links, no duplicate ids, safe external links, accessible names. |
| Interaction tests | Territory tabs with mouse and keyboard, the FAQ, the live board stages, and the palette links. |
| Asset tests | The venue map data and its OpenStreetMap credit, the stylesheet's tokens and palettes, the favicon and share image. |
| Size budget | Total JavaScript, CSS, the largest file, and the map data stay under their limits. |
| Browser tests | On 1440 px, 768 px, 412 px, and 360 px screens: no errors, no failed requests, no sideways scroll, every section drawn, working navigation, the map loads, reduced motion, and no serious accessibility problems. |

Vercel also runs the unit and structure tests before every production build, so a failing test stops the deploy.

<br />

## Credits

- **Map data:** © [OpenStreetMap contributors](https://www.openstreetmap.org/copyright), available under the Open Database License.
- **Map style:** The venue map follows the idea and the `warm_beige` palette of [maptoposter](https://github.com/originalankur/maptoposter) by originalankur.
- **Fonts:** [Archivo](https://fonts.google.com/specimen/Archivo) and [Martian Mono](https://fonts.google.com/specimen/Martian+Mono), under the SIL Open Font License.
- **Design references:** [awesome-design-md](https://github.com/VoltAgent/awesome-design-md) by VoltAgent shaped the format of `DESIGN.md`.

<br />

<div align="center">

<sub>Built by Aegis for SandBox v3.0 · Dayananda Sagar College of Engineering, Bengaluru</sub>

</div>
