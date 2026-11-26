import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { NAV } from "../data";
import { EASE } from "./Reveal";

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("is-locked", open);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="header">
        <a className="brand" href="#top" aria-label="SandBox v3.0, back to top">
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <rect width="20" height="20" />
            <ellipse cx="10" cy="10" rx="3.2" ry="6.4" transform="rotate(32 10 10)" />
          </svg>
          <span>
            SandBox <em>v3.0</em>
          </span>
        </a>
        <nav className="nav" aria-label="Sections">
          {NAV.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </nav>
        <a className="btn btn--ink btn--sm" href="#register">
          Request entry
        </a>
        <button
          className="menu-btn"
          type="button"
          aria-expanded={open}
          aria-controls="menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr">{open ? "Close menu" : "Open menu"}</span>
          <i data-open={open} />
        </button>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div
            id="menu"
            className="menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <nav aria-label="Sections">
              {[...NAV, { href: "#register", label: "Request entry" }].map((n, i) => (
                <motion.a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.12 + i * 0.05, duration: 0.5, ease: EASE }}
                >
                  {n.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
