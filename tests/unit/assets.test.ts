import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import map from "../../src/assets/venue-map.json";
import { WORDMARK_W } from "../../src/components/Wordmark";

const root = resolve(__dirname, "../..");
const read = (p: string) => readFileSync(resolve(root, p), "utf8");

describe("venue map data", () => {
  it("has the expected shape and the OpenStreetMap credit the licence requires", () => {
    expect(map.size).toBe(1000);
    expect(map.radiusMetres).toBeGreaterThan(0);
    expect(map.centre).toHaveLength(2);
    expect(map.attribution).toContain("OpenStreetMap");
  });

  it("has streets in every road layer", () => {
    for (const layer of ["major", "mid", "minor"] as const) {
      expect(map.layers[layer].length).toBeGreaterThan(1000);
      expect(map.layers[layer].startsWith("M")).toBe(true);
    }
  });

  it("stays under 200 KB, so phones load it quickly", () => {
    expect(JSON.stringify(map).length).toBeLessThan(200_000);
  });
});

describe("wordmark", () => {
  it("keeps the seven-letter width the strips are sized for", () => {
    expect(WORDMARK_W).toBe(636);
  });
});

describe("stylesheet", () => {
  const css = read("src/styles.css");

  it("has balanced braces", () => {
    expect(css.split("{").length).toBe(css.split("}").length);
  });

  it("defines every core colour token", () => {
    for (const token of ["--y", "--ink", "--paper", "--field", "--strip-light", "--hot", "--grid-rgb"]) {
      expect(css).toContain(`${token}:`);
    }
  });

  it("gives every palette the full set of colour tokens", () => {
    const blocks = [...css.matchAll(/html\[data-palette="([a-z]+)"\]\s*\{([^}]*)\}/g)];
    expect(blocks.length).toBeGreaterThanOrEqual(7);
    for (const [, name, body] of blocks) {
      for (const token of ["--field", "--y", "--ink", "--ink-line", "--paper", "--on-y-2", "--on-ink-2", "--on-paper-2", "--grid-rgb", "--hot"]) {
        expect(body, `${name} is missing ${token}`).toContain(`${token}:`);
      }
    }
  });

  it("respects reduced motion", () => {
    expect(css).toContain("@media (prefers-reduced-motion: reduce)");
  });
});

describe("page shell", () => {
  const html = read("index.html");

  it("keeps the title, description, viewport, and share tags", () => {
    expect(html).toMatch(/<title>SandBox v3\.0[^<]*<\/title>/);
    expect(html).toContain('name="description"');
    expect(html).toContain('name="viewport"');
    expect(html).toContain('property="og:image"');
    expect(html).toContain('<div id="root"></div>');
  });

  it("ships the favicon and the share image", () => {
    expect(read("public/favicon.svg")).toContain("<svg");
    expect(readFileSync(resolve(root, "public/og.png")).length).toBeGreaterThan(10_000);
  });
});
