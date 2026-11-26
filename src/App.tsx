import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { MotionConfig } from "motion/react";
import { useEffect } from "react";
import { Close } from "./components/Close";
import { Faq } from "./components/Faq";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Journey } from "./components/Journey";
import { Loop } from "./components/Loop";
import { Register } from "./components/Register";
import { Rules } from "./components/Rules";
import { Sponsors } from "./components/Sponsors";
import { Tape } from "./components/Tape";
import { Territories } from "./components/Territories";
import { Venue } from "./components/Venue";

export default function App() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ autoRaf: true, anchors: { offset: -56 }, lerp: 0.11 });
    return () => lenis.destroy();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Loop />
        <Tape />
        <Territories />
        <Journey />
        <Rules />
        <Venue />
        <Faq />
        <Sponsors />
        <Register />
      </main>
      <Close />
    </MotionConfig>
  );
}
