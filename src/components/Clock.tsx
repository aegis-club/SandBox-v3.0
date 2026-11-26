import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { EVENT } from "../data";

export type Mode = "real" | "before" | "live" | "after";
export type Stage = "before" | "live" | "after";

const HOUR = 3_600_000;
export const START = Date.parse(EVENT.start);
export const END = START + EVENT.hours * HOUR;

type Clock = { now: number; stage: Stage; mode: Mode; setMode: (m: Mode) => void };
const Ctx = createContext<Clock | null>(null);

/* One clock for the whole page. Preview modes shift time so each event stage
   can be seen before the real dates exist. */
export function ClockProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<Mode>("real");
  const [tick, setTick] = useState(() => Date.now());
  const anchor = useRef({ at: Date.now(), to: Date.now() });

  useEffect(() => {
    const t = window.setInterval(() => setTick(Date.now()), 1000);
    return () => window.clearInterval(t);
  }, []);

  const setMode = (m: Mode) => {
    const at = Date.now();
    const to = m === "live" ? START + 7.5 * HOUR : m === "after" ? END + 2 * HOUR : m === "before" ? START - (2 * 24 + 5) * HOUR - 17 * 60_000 : at;
    anchor.current = { at, to };
    setModeState(m);
    setTick(at);
  };

  const value = useMemo<Clock>(() => {
    const now = mode === "real" ? tick : anchor.current.to + (tick - anchor.current.at);
    const stage: Stage = now < START ? "before" : now < END ? "live" : "after";
    return { now, stage, mode, setMode };
  }, [tick, mode]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useClock() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useClock needs ClockProvider");
  return c;
}

export const pad = (n: number, w = 2) => String(Math.max(0, Math.floor(n))).padStart(w, "0");

/* "H+07:32:10" for a time inside the event. */
export function hplus(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return `H+${pad(s / 3600)}:${pad((s % 3600) / 60)}:${pad(s % 60)}`;
}
