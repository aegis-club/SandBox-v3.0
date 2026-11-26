import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/archivo/wdth.css";
import "@fontsource-variable/martian-mono/wght.css";
import "../styles.css";
import { Wordmark } from "../components/Wordmark";
import { MARKS, MarkSvg } from "./marks";

const Y = "#ffd400";
const INK = "#14120b";
const PAPER = "#fffef8";

const GROUNDS = [
  { name: "On yellow", bg: Y, fg: INK },
  { name: "On ink", bg: INK, fg: Y },
  { name: "On paper", bg: PAPER, fg: INK },
];

function Lockup({ id, ground }: { id: string; ground: (typeof GROUNDS)[number] }) {
  const mark = MARKS.find((m) => m.id === id)!;
  return (
    <div className="lab-lockup" style={{ background: ground.bg, color: ground.fg, ["--fg" as string]: ground.fg, ["--bg" as string]: ground.bg }}>
      <MarkSvg mark={mark} fg={ground.fg} bg={ground.bg} size={26} />
      <span className="lab-lockup__wm">
        <Wordmark />
      </span>
      <span className="lab-lockup__v">v3.0</span>
    </div>
  );
}

const GROUPS = [
  { id: "letters", title: "Letter marks", text: "Letters carved from boxes, in the wordmark's grammar." },
  { id: "symbols", title: "Symbols", text: "Pictures, not letters. Each uses the same parts: square boxes, carves, ink on yellow." },
] as const;

function Lab() {
  return (
    <main className="lab">
      <header className="lab-head">
        <h1>SandBox logo lab</h1>
        <p>Each row shows a mark at favicon, header and poster sizes, on the three grounds, and as a header lockup with the carved wordmark.</p>
      </header>
      {GROUPS.map((g) => (
        <div key={g.id} className="lab-group">
          <h2 className="lab-group__title">{g.title}</h2>
          <p className="lab-group__text">{g.text}</p>
          {MARKS.filter((m) => m.group === g.id).map((m) => (
        <section key={m.id} className="lab-row" aria-labelledby={`m-${m.id}`}>
          <div className="lab-row__text">
            <h3 id={`m-${m.id}`}>{m.name}</h3>
            <p>{m.idea}</p>
          </div>
          <div className="lab-grounds">
            {GROUNDS.map((g) => (
              <div key={g.name} className="lab-ground" style={{ background: g.bg }}>
                <MarkSvg mark={m} fg={g.fg} bg={g.bg} size={120} title={`${m.name}, ${g.name.toLowerCase()}`} />
                <div className="lab-sizes">
                  <MarkSvg mark={m} fg={g.fg} bg={g.bg} size={48} />
                  <MarkSvg mark={m} fg={g.fg} bg={g.bg} size={24} />
                  <MarkSvg mark={m} fg={g.fg} bg={g.bg} size={16} />
                </div>
                <span className="lab-ground__name" style={{ color: g.fg }}>{g.name}</span>
              </div>
            ))}
          </div>
          <div className="lab-tab" aria-hidden="true">
            <MarkSvg mark={m} fg={INK} bg={Y} size={16} />
            <span>SandBox v3.0, a 24-hour…</span>
          </div>
          <Lockup id={m.id} ground={GROUNDS[0]} />
          <Lockup id={m.id} ground={GROUNDS[1]} />
        </section>
          ))}
        </div>
      ))}
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Lab />
  </StrictMode>,
);
