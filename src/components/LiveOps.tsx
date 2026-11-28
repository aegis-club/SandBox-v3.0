import { AnimatePresence, motion } from "motion/react";
import { ANNOUNCEMENTS, EVENT, LIVE_PHASES } from "../data";
import { END, hplus, pad, START, useClock, type Mode } from "./Clock";
import { EASE } from "./Reveal";
import { StripTitle } from "./Strip";

const HOUR = 3_600_000;
const when = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
}).format(new Date(START));

/* One digit that rolls up when it changes, like a split-flap board. */
function Digit({ d }: { d: string }) {
  return (
    <span className="dg">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={d}
          initial={{ y: "105%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-105%" }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          {d}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function Roll({ value }: { value: string }) {
  return (
    <span className="roll" aria-hidden="true">
      {value.split("").map((c, i) => (/\d/.test(c) ? <Digit key={i} d={c} /> : <span key={i} className="roll__sep">{c}</span>))}
    </span>
  );
}

const MODES: { m: Mode; label: string }[] = [
  { m: "real", label: "Today" },
  { m: "before", label: "Before" },
  { m: "live", label: "Live" },
  { m: "after", label: "After" },
];

export function LiveOps() {
  const { now, stage, mode, setMode } = useClock();
  const cap = stage === "live" ? "Live" : stage === "before" ? "Soon" : "Done";

  return (
    <section className="band band--paper live" id="live" aria-labelledby="live-title">
      <StripTitle id="live-title" tone="ink" cap={cap}>
        Live ops.
      </StripTitle>
      <div className="wrap">
        <div className="live__bar">
          <p className="lead">
            {stage === "before" && "The clock to hour zero. During the event this section becomes the live board."}
            {stage === "live" && "The sandbox is sealed. This board follows the event hour by hour."}
            {stage === "after" && "The sandbox is closed. Results are decrypted at the closing ceremony."}
          </p>
          {EVENT.sample && (
            <div className="preview">
              <p className="preview__note">
                <b>Sample schedule.</b> Preview each stage of the board.
              </p>
              <div className="preview__seg" role="group" aria-label="Preview the live board">
                {MODES.map((x) => (
                  <button key={x.m} type="button" aria-pressed={mode === x.m} onClick={() => setMode(x.m)}>
                    {mode === x.m && <motion.span className="preview__fill" layoutId="preview-fill" transition={{ type: "spring", stiffness: 420, damping: 36 }} />}
                    <span>{x.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={stage}
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {stage === "before" && <Before now={now} />}
            {stage === "live" && <Live now={now} />}
            {stage === "after" && <After />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function Before({ now }: { now: number }) {
  const s = Math.max(0, Math.floor((START - now) / 1000));
  const parts = [
    { k: "Days", v: pad(s / 86400, s >= 8_640_000 ? 3 : 2) },
    { k: "Hours", v: pad((s % 86400) / 3600) },
    { k: "Minutes", v: pad((s % 3600) / 60) },
    { k: "Seconds", v: pad(s % 60) },
  ];
  return (
    <div className="count">
      <p className="sr" aria-live="off">
        {parts.map((p) => `${p.v} ${p.k}`).join(", ")} to hour zero.
      </p>
      <ol className="count__grid">
        {parts.map((p) => (
          <li key={p.k}>
            <Roll value={p.v} />
            <span className="count__k">{p.k}</span>
          </li>
        ))}
      </ol>
      <p className="count__when">
        Hour zero · {when} IST{EVENT.sample ? " · sample date" : ""}
      </p>
    </div>
  );
}

function Live({ now }: { now: number }) {
  const t = now - START;
  const h = t / HOUR;
  const cur = LIVE_PHASES.find((p) => h >= p.from && h < p.to) ?? LIVE_PHASES[LIVE_PHASES.length - 1];
  const next = LIVE_PHASES[LIVE_PHASES.indexOf(cur) + 1];
  const left = next ? next.from * HOUR - t : END - now;
  const feed = ANNOUNCEMENTS.filter((a) => a.at <= h).reverse();

  return (
    <div className="board">
      <div className="board__clock">
        <span className="board__dot" aria-hidden="true" />
        <span className="board__label">Elapsed</span>
        <Roll value={hplus(t)} />
        <span className="sr">{hplus(t)} elapsed</span>
      </div>

      <ol className="hours" aria-label={`Hour ${Math.floor(h) + 1} of 24`}>
        {Array.from({ length: EVENT.hours }, (_, i) => (
          <li key={i} className={i < Math.floor(h) ? "is-past" : i === Math.floor(h) ? "is-now" : undefined}>
            <span className="sr">Hour {i + 1}</span>
          </li>
        ))}
      </ol>
      <ol className="hours__phases" aria-hidden="true">
        {LIVE_PHASES.map((p) => (
          <li key={p.n} style={{ gridColumn: `${p.from + 1} / ${p.to + 1}` }} className={[p === cur ? "is-now" : "", p.to - p.from < 3 ? "is-narrow" : ""].join(" ").trim() || undefined}>
            <span>{p.n}</span> {p.code}
          </li>
        ))}
      </ol>

      <div className="board__grid">
        <div className="board__now">
          <p className="board__k">Now</p>
          <p className="board__phase">
            <span className="board__n">{cur.n}</span>
            {cur.name}
          </p>
          <p className="board__code">{cur.code}</p>
          <p className="board__next">
            {next ? (
              <>
                Next: <b>{next.name}</b> in {Math.floor(left / HOUR)}h {pad((left % HOUR) / 60_000)}m
              </>
            ) : (
              <>
                Build closes in {Math.floor(left / HOUR)}h {pad((left % HOUR) / 60_000)}m
              </>
            )}
          </p>
        </div>
        <div className="feed">
          <p className="board__k">Announcements</p>
          <ul aria-live="polite" aria-label="Announcements" tabIndex={0}>
            <AnimatePresence initial={false}>
              {feed.map((a) => (
                <motion.li
                  key={a.at}
                  layout
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <span className="feed__t">{hplus(a.at * HOUR).slice(0, 7)}</span>
                  <span>{a.text}</span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </div>
    </div>
  );
}

function After() {
  return (
    <div className="after">
      <p className="after__big">
        24 hours. <span>Sealed.</span>
      </p>
      <ol className="after__steps">
        <li>
          <span className="board__n">08</span>
          <b>Results</b> Decrypt
        </li>
        <li>
          <span className="board__n">09</span>
          <b>Closing ceremony</b> Exit the sandbox
        </li>
      </ol>
      <p className="note">Winners are announced at the closing ceremony and posted here.</p>
    </div>
  );
}
