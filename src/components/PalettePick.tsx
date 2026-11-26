import { useEffect, useState } from "react";

/* A preview tool for comparing palettes on the real page, shared with the
   team for feedback. The choice is kept in the URL (?palette=<id>) so a
   link opens the same palette. Remove this once a palette is chosen. */
const PALETTES = [
  { id: "signal", name: "Signal (current)", sw: ["#ffd400", "#14120b", "#ffffff"] },
  { id: "honey", name: "Honey & Indigo", sw: ["#ffc72c", "#1b1838", "#8b7dff"] },
  { id: "lilac", name: "Lemon & Lilac", sw: ["#ffe168", "#2a2150", "#b49cff"] },
  { id: "cobalt", name: "Sun & Cobalt", sw: ["#ffd23f", "#0b1b45", "#3d6bff"] },
  { id: "citrus", name: "Lemon & Teal", sw: ["#f4d23e", "#0d2b33", "#2bb3a3"] },
  { id: "forest", name: "Butter & Forest", sw: ["#f2c94c", "#12261c", "#5cc37f"] },
  { id: "marigold", name: "Marigold & Plum", sw: ["#f8b131", "#2b1433", "#ef5b3c"] },
  { id: "cocoa", name: "Mustard & Cocoa", sw: ["#e8a93a", "#2b1a12", "#e0663f"] },
];

function initial() {
  const q = new URLSearchParams(window.location.search).get("palette");
  if (q && PALETTES.some((p) => p.id === q)) return q;
  const saved = window.localStorage.getItem("sbx-palette");
  return saved && PALETTES.some((p) => p.id === saved) ? saved : "signal";
}

export function PalettePick() {
  const [id, setId] = useState(initial);
  const current = PALETTES.find((p) => p.id === id) ?? PALETTES[0];

  useEffect(() => {
    document.documentElement.dataset.palette = id;
    window.localStorage.setItem("sbx-palette", id);
    const url = new URL(window.location.href);
    url.searchParams.set("palette", id);
    window.history.replaceState(null, "", url);
    const field = getComputedStyle(document.documentElement).getPropertyValue("--field").trim();
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", field || "#ffd400");
  }, [id]);

  return (
    <div className="palette-pick" role="group" aria-label="Preview a colour palette">
      <span className="palette-pick__now" aria-live="polite">
        Palette: {current.name}
      </span>
      <span className="palette-pick__label">Palette</span>
      {PALETTES.map((p) => (
        <button key={p.id} type="button" aria-pressed={id === p.id} onClick={() => setId(p.id)} title={p.name} aria-label={p.name}>
          <span className="palette-pick__sw" aria-hidden="true">
            {p.sw.map((c) => (
              <i key={c} style={{ background: c }} />
            ))}
          </span>
          <span aria-hidden="true">{p.name}</span>
        </button>
      ))}
    </div>
  );
}
