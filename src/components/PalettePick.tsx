import { useEffect, useState } from "react";

/* A local-only preview tool for comparing palettes on the real page.
   Remove it once a palette is chosen. */
const PALETTES = [
  { id: "signal", name: "Signal (current)", sw: ["#ffd400", "#14120b", "#ffffff"] },
  { id: "honey", name: "Honey & Indigo", sw: ["#ffc72c", "#1b1838", "#fff1c4"] },
  { id: "marigold", name: "Marigold & Plum", sw: ["#f8b131", "#2b1433", "#ef5b3c"] },
  { id: "citrus", name: "Lemon & Teal", sw: ["#f4d23e", "#0d2b33", "#2bb3a3"] },
];

function initial() {
  const q = new URLSearchParams(window.location.search).get("palette");
  if (q && PALETTES.some((p) => p.id === q)) return q;
  return window.localStorage.getItem("sbx-palette") ?? "signal";
}

export function PalettePick() {
  const [id, setId] = useState(initial);

  useEffect(() => {
    document.documentElement.dataset.palette = id;
    window.localStorage.setItem("sbx-palette", id);
    const field = getComputedStyle(document.documentElement).getPropertyValue("--field").trim();
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", field || "#ffd400");
  }, [id]);

  return (
    <div className="palette-pick" role="group" aria-label="Preview a colour palette">
      <span className="palette-pick__label">Palette</span>
      {PALETTES.map((p) => (
        <button key={p.id} type="button" aria-pressed={id === p.id} onClick={() => setId(p.id)} title={p.name}>
          <span className="palette-pick__sw" aria-hidden="true">
            {p.sw.map((c) => (
              <i key={c} style={{ background: c }} />
            ))}
          </span>
          <span>{p.name}</span>
        </button>
      ))}
    </div>
  );
}
