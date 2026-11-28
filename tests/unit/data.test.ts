import { describe, expect, it } from "vitest";
import {
  ANNOUNCEMENTS,
  DIRECTIONS,
  EDITIONS,
  EVENT,
  FAQ,
  GMAP_EMBED,
  GMAP_LINK,
  JOURNEY,
  LIVE_PHASES,
  LOOP,
  MLH,
  NAV,
  PILLARS,
  RULES,
  TAPE,
  TIERS,
  ZONES,
} from "../../src/data";

/* The site's copy and sample data. These tests stop an edit from breaking
   the facts the page relies on: counts, order, and links. */

describe("territories", () => {
  it("has exactly eight territories", () => {
    expect(ZONES).toHaveLength(8);
  });

  it("gives every territory a unique name, a short name, a body, and three tags", () => {
    expect(new Set(ZONES.map((z) => z.name)).size).toBe(ZONES.length);
    for (const z of ZONES) {
      expect(z.name.trim()).not.toBe("");
      expect(z.short.trim()).not.toBe("");
      expect(z.short.length).toBeLessThanOrEqual(24);
      expect(z.body.trim()).not.toBe("");
      expect(z.tags).toHaveLength(3);
    }
  });
});

describe("journey", () => {
  const phases = JOURNEY.flatMap((leg) => leg.phases);

  it("has nine phases numbered 01 to 09 in order", () => {
    expect(phases.map((p) => p.n)).toEqual(["01", "02", "03", "04", "05", "06", "07", "08", "09"]);
  });

  it("has three legs, and only the middle leg is inside the sandbox", () => {
    expect(JOURNEY).toHaveLength(3);
    expect(JOURNEY.map((leg) => leg.inside)).toEqual([false, true, false]);
  });

  it("puts phases 04 to 07 inside the sandbox", () => {
    expect(JOURNEY[1].phases.map((p) => p.n)).toEqual(["04", "05", "06", "07"]);
  });
});

describe("live schedule", () => {
  it("has a valid hour zero and a 24-hour event", () => {
    expect(Number.isNaN(Date.parse(EVENT.start))).toBe(false);
    expect(EVENT.hours).toBe(24);
  });

  it("covers hour 0 to hour 24 with no gaps or overlaps", () => {
    expect(LIVE_PHASES[0].from).toBe(0);
    expect(LIVE_PHASES[LIVE_PHASES.length - 1].to).toBe(EVENT.hours);
    for (let i = 1; i < LIVE_PHASES.length; i++) {
      expect(LIVE_PHASES[i].from).toBe(LIVE_PHASES[i - 1].to);
    }
    for (const p of LIVE_PHASES) expect(p.to).toBeGreaterThan(p.from);
  });

  it("uses the same phase numbers and names as the journey's inside leg", () => {
    expect(LIVE_PHASES.map((p) => [p.n, p.name])).toEqual(JOURNEY[1].phases.map((p) => [p.n, p.name]));
  });

  it("keeps announcements in order and inside the event", () => {
    const times = ANNOUNCEMENTS.map((a) => a.at);
    expect([...times].sort((a, b) => a - b)).toEqual(times);
    expect(new Set(times).size).toBe(times.length);
    for (const t of times) {
      expect(t).toBeGreaterThanOrEqual(0);
      expect(t).toBeLessThan(EVENT.hours);
    }
  });
});

describe("other sections", () => {
  it("keeps the loop as Build, Break, Experiment, Repeat", () => {
    expect(LOOP.map((l) => l.word)).toEqual(["Build", "Break", "Experiment", "Repeat"]);
  });

  it("has three pillars and four rules", () => {
    expect(PILLARS).toHaveLength(3);
    expect(RULES).toHaveLength(4);
  });

  it("has unique FAQ questions", () => {
    expect(new Set(FAQ.map((f) => f.q)).size).toBe(FAQ.length);
    expect(FAQ.length).toBeGreaterThanOrEqual(5);
  });

  it("has the four sponsor tiers in order with at least one slot each", () => {
    expect(TIERS.map((t) => t.name)).toEqual(["Title", "Platinum", "Gold", "Community"]);
    for (const t of TIERS) expect(t.slots).toBeGreaterThan(0);
  });

  it("has two past editions with six frames each and unique frame captions", () => {
    expect(EDITIONS.map((e) => e.name)).toEqual(["SandBox v1.0", "SandBox v2.0"]);
    for (const e of EDITIONS) {
      expect(e.frames).toHaveLength(6);
      expect(new Set(e.frames).size).toBe(6);
    }
  });

  it("has a non-empty tape with unique phrases", () => {
    expect(new Set(TAPE).size).toBe(TAPE.length);
  });
});

describe("links", () => {
  it("points every nav link at an in-page anchor", () => {
    for (const n of NAV) expect(n.href).toMatch(/^#[a-z]+$/);
    expect(new Set(NAV.map((n) => n.href)).size).toBe(NAV.length);
  });

  it("uses https for every external link", () => {
    for (const url of [MLH, DIRECTIONS, GMAP_LINK, GMAP_EMBED]) {
      expect(new URL(url).protocol).toBe("https:");
    }
  });

  it("embeds Google Maps through the embed path, which allows framing", () => {
    expect(GMAP_EMBED.startsWith("https://www.google.com/maps/embed?")).toBe(true);
  });
});
