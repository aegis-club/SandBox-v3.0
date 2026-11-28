import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "../../src/App";
import { FAQ, NAV, ZONES } from "../../src/data";

/* These tests render the whole page and guard its structure: the section
   order, the landmarks, the headings, and the links between them. */

const SECTION_ORDER = ["top", "experience", "territories", "journey", "live", "rules", "archive", "venue", "faq", "sponsors", "register"];

function renderApp() {
  return render(<App />);
}

describe("page structure", () => {
  it("renders the sections in the agreed order", () => {
    const { container } = renderApp();
    const ids = [...container.querySelectorAll("main > section[id]")].map((s) => s.id);
    expect(ids).toEqual(SECTION_ORDER);
  });

  it("has one header, one main, and one footer", () => {
    const { container } = renderApp();
    expect(container.querySelectorAll("header.header")).toHaveLength(1);
    expect(container.querySelectorAll("main#main")).toHaveLength(1);
    expect(container.querySelectorAll("footer")).toHaveLength(1);
  });

  it("has exactly one h1, and it names the event", () => {
    renderApp();
    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent("SandBox v3.0");
  });

  it("labels every section with a heading that exists", () => {
    const { container } = renderApp();
    for (const section of container.querySelectorAll("main > section")) {
      const label = section.getAttribute("aria-labelledby");
      expect(label, `section #${section.id} has no aria-labelledby`).toBeTruthy();
      const heading = container.querySelector(`#${CSS.escape(label!)}`);
      expect(heading, `#${label} is missing`).not.toBeNull();
      expect(heading!.textContent!.trim()).not.toBe("");
    }
  });

  it("points every nav link at a section that exists", () => {
    const { container } = renderApp();
    for (const n of NAV) {
      expect(container.querySelector(n.href), `${n.href} has no target`).not.toBeNull();
    }
  });

  it("points every in-page link at an element that exists", () => {
    const { container } = renderApp();
    for (const a of container.querySelectorAll('a[href^="#"]')) {
      const href = a.getAttribute("href")!;
      expect(container.querySelector(href), `${href} has no target`).not.toBeNull();
    }
  });

  it("has a skip link to the main content", () => {
    renderApp();
    expect(screen.getByRole("link", { name: "Skip to content" })).toHaveAttribute("href", "#main");
  });

  it("has no duplicate ids", () => {
    const { container } = renderApp();
    const ids = [...container.querySelectorAll("[id]")].map((e) => e.id);
    const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
    expect(dupes).toEqual([]);
  });

  it("opens every external link in a new tab, safely", () => {
    const { container } = renderApp();
    for (const a of container.querySelectorAll('a[href^="http"]')) {
      expect(a).toHaveAttribute("target", "_blank");
      expect(a.getAttribute("rel") ?? "").toContain("noreferrer");
    }
  });

  it("never prints undefined, NaN, or [object Object]", () => {
    const { container } = renderApp();
    expect(container.textContent).not.toMatch(/undefined|NaN|\[object Object\]/);
  });

  it("keeps the primary action on the hero", () => {
    const { container } = renderApp();
    const cta = container.querySelector(".hero__cta a.btn--ink");
    expect(cta).toHaveAttribute("href", "#register");
    expect(cta).toHaveTextContent("Request entry");
  });

  it("gives every button and link an accessible name", () => {
    const { container } = renderApp();
    for (const el of container.querySelectorAll("button, a[href]")) {
      const name = (el.getAttribute("aria-label") ?? el.textContent ?? "").trim();
      expect(name, `${el.outerHTML.slice(0, 80)} has no name`).not.toBe("");
    }
  });
});

describe("territories", () => {
  it("shows one tab per territory, with the first selected", () => {
    renderApp();
    const list = screen.getByRole("tablist", { name: "Territories" });
    const tabs = within(list).getAllByRole("tab");
    expect(tabs).toHaveLength(ZONES.length);
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");
  });

  it("switches the briefing with a click and with the arrow keys", async () => {
    const user = userEvent.setup();
    renderApp();
    const tabs = within(screen.getByRole("tablist", { name: "Territories" })).getAllByRole("tab");
    await user.click(tabs[2]);
    expect(tabs[2]).toHaveAttribute("aria-selected", "true");
    expect(await screen.findByRole("heading", { level: 3, name: ZONES[2].name })).toBeInTheDocument();
    await user.keyboard("{ArrowRight}");
    expect(tabs[3]).toHaveAttribute("aria-selected", "true");
    await user.keyboard("{End}");
    expect(tabs[ZONES.length - 1]).toHaveAttribute("aria-selected", "true");
    await user.keyboard("{Home}");
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");
  });
});

describe("FAQ", () => {
  it("opens the first answer by default and toggles others", async () => {
    const user = userEvent.setup();
    renderApp();
    const first = screen.getByRole("button", { name: FAQ[0].q });
    expect(first).toHaveAttribute("aria-expanded", "true");
    const second = screen.getByRole("button", { name: FAQ[1].q });
    await user.click(second);
    expect(second).toHaveAttribute("aria-expanded", "true");
    expect(first).toHaveAttribute("aria-expanded", "false");
  });
});

describe("live ops", () => {
  it("switches between the before, live, and after boards", async () => {
    const user = userEvent.setup();
    renderApp();
    const group = screen.getByRole("group", { name: "Preview the live board" });
    await user.click(within(group).getByRole("button", { name: "Live" }));
    expect(await screen.findByText("Announcements")).toBeInTheDocument();
    await user.click(within(group).getByRole("button", { name: "After" }));
    expect(await screen.findByText(/Winners are announced/)).toBeInTheDocument();
    await user.click(within(group).getByRole("button", { name: "Before" }));
    expect(await screen.findByText("Days")).toBeInTheDocument();
  });
});

describe("palettes", () => {
  it("applies the palette named in the URL", async () => {
    window.history.replaceState(null, "", "/?palette=honey");
    renderApp();
    await act(async () => {});
    expect(document.documentElement.dataset.palette).toBe("honey");
  });

  it("falls back to signal for an unknown palette", async () => {
    window.history.replaceState(null, "", "/?palette=nope");
    renderApp();
    await act(async () => {});
    expect(document.documentElement.dataset.palette).toBe("signal");
  });
});
