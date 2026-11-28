import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

/* Disaster checks on the real production build, in a real browser,
   on desktop, tablet, and phone sizes. */

const SECTIONS = ["top", "experience", "territories", "journey", "live", "rules", "archive", "venue", "faq", "sponsors", "register"];

function watchErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(`console: ${m.text()}`);
  });
  page.on("response", (r) => {
    const url = r.url();
    if (url.startsWith("http://localhost") && r.status() >= 400) errors.push(`${r.status()} ${url}`);
  });
  return errors;
}

async function scrollThrough(page: Page) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  const step = (page.viewportSize()?.height ?? 800) * 0.7;
  for (let y = 0; y < height; y += step) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(60);
  }
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(300);
}

const overflowX = (page: Page) =>
  page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);

test.describe("home page", () => {
  test("loads with no errors, failed requests, or sideways scroll", async ({ page }) => {
    const errors = watchErrors(page);
    await page.goto("/");
    await expect(page.locator("#hero-title")).toHaveText("SandBox v3.0");
    expect(await overflowX(page)).toBeLessThanOrEqual(0);
    await scrollThrough(page);
    expect(await overflowX(page)).toBeLessThanOrEqual(0);
    expect(errors).toEqual([]);
  });

  test("renders every section, in order", async ({ page }) => {
    await page.goto("/");
    const ids = await page.locator("main > section[id]").evaluateAll((els) => els.map((e) => e.id));
    expect(ids).toEqual(SECTIONS);
    for (const id of SECTIONS) await expect(page.locator(`#${id}`)).toBeAttached();
  });

  test("shows the hero headline and primary action in the first screen", async ({ page }) => {
    await page.goto("/");
    const cta = page.locator(".hero__cta a.btn--ink");
    await expect(cta).toBeInViewport();
    await expect(page.locator(".hero__h")).toBeInViewport();
    await expect(page.locator(".strips").first()).toBeInViewport();
  });

  test("moves to the register section from the primary action", async ({ page }) => {
    await page.goto("/");
    await page.locator(".hero__cta a.btn--ink").click();
    await expect(page.locator("#register")).toBeInViewport({ timeout: 5000 });
  });

  test("draws every section heading with real size", async ({ page }) => {
    await page.goto("/");
    await scrollThrough(page);
    for (const id of SECTIONS.filter((s) => s !== "top" && s !== "experience")) {
      const box = await page.locator(`#${id} h2`).first().boundingBox();
      expect(box, `#${id} heading has no box`).not.toBeNull();
      expect(box!.width).toBeGreaterThan(80);
      expect(box!.height).toBeGreaterThan(16);
    }
  });

  test("loads the venue map streets", async ({ page }) => {
    await page.goto("/");
    await page.locator("#venue").scrollIntoViewIfNeeded();
    await expect(page.locator(".vmap__major")).toHaveAttribute("d", /^M/, { timeout: 10_000 });
  });

  test("switches the live board through every stage", async ({ page }) => {
    await page.goto("/");
    const group = page.getByRole("group", { name: "Preview the live board" });
    await group.scrollIntoViewIfNeeded();
    await group.getByRole("button", { name: "Live" }).click();
    await expect(page.getByText("Announcements")).toBeVisible();
    await group.getByRole("button", { name: "After" }).click();
    await expect(page.getByText(/Winners are announced/)).toBeVisible();
  });

  test("has no serious accessibility problems", async ({ page }) => {
    await page.goto("/");
    await scrollThrough(page);
    await page.evaluate(() => window.scrollTo(0, 0));
    const results = await new AxeBuilder({ page })
      .exclude(".vmap__gmap")
      .disableRules(["color-contrast"])
      .analyze();
    const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(serious.map((v) => `${v.id}: ${v.help} (${v.nodes.length})`)).toEqual([]);
  });
});

test.describe("navigation", () => {
  test("reaches each section from the header or the menu", async ({ page }, info) => {
    await page.goto("/");
    const narrow = (page.viewportSize()?.width ?? 1440) < 1152;
    for (const id of ["territories", "journey", "venue", "faq"]) {
      if (narrow) {
        await page.locator(".menu-btn").click();
        await page.locator(`#menu a[href="#${id}"]`).click();
      } else {
        await page.locator(`.nav a[href="#${id}"]`).click();
      }
      await expect(page.locator(`#${id}`), `${info.project.name}: #${id}`).toBeInViewport({ timeout: 5000 });
    }
  });
});

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("shows all content without animation", async ({ page }) => {
    const errors = watchErrors(page);
    await page.goto("/");
    await expect(page.locator(".hero__h")).toBeVisible();
    await page.locator("#experience").scrollIntoViewIfNeeded();
    await expect(page.locator("#loop-title")).toBeVisible();
    expect(errors).toEqual([]);
  });
});

test.describe("palettes", () => {
  for (const palette of ["signal", "honey", "cobalt"]) {
    test(`renders the ${palette} palette`, async ({ page }) => {
      const errors = watchErrors(page);
      await page.goto(`/?palette=${palette}`);
      await expect(page.locator("html")).toHaveAttribute("data-palette", palette);
      expect(await overflowX(page)).toBeLessThanOrEqual(0);
      expect(errors).toEqual([]);
    });
  }
});

test.describe("other pages and files", () => {
  test("serves the logo lab", async ({ page }) => {
    const errors = watchErrors(page);
    await page.goto("/logo-lab.html");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("SandBox logo lab");
    expect(errors).toEqual([]);
  });

  test("serves the favicon and the share image", async ({ request }) => {
    for (const path of ["/favicon.svg", "/og.png"]) {
      const res = await request.get(path);
      expect(res.status(), path).toBe(200);
    }
  });
});
