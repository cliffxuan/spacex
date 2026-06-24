import { useEffect } from "react";
import { Hero } from "./components/Hero";
import { Nav } from "./components/Nav";
import { Snapshot } from "./components/Snapshot";
import { IPOMechanics } from "./components/IPOMechanics";
import { Financials } from "./components/Financials";
import { Segments } from "./components/Segments";
import { Starlink } from "./components/Starlink";
import { Launches } from "./components/Launches";
import { Starship } from "./components/Starship";
import { Customers } from "./components/Customers";
import { Risks } from "./components/Risks";
import { Valuation } from "./components/Valuation";
import { PriceTracker } from "./components/PriceTracker";
import { UseOfProceeds } from "./components/UseOfProceeds";
import { Management } from "./components/Management";
import { Litigation } from "./components/Litigation";
import { Quotes } from "./components/Quotes";
import { Footer } from "./components/Footer";

export default function App() {
  // On a fresh load the browser tries to scroll to the URL hash before React
  // has rendered the sections (and async content like the live chart shifts
  // layout afterwards), so the target is missed. Re-scroll to it once it
  // exists, re-attempting briefly to survive layout shifts, and bail if the
  // user starts scrolling themselves.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;

    let cancelled = false;
    const onUserScroll = () => {
      cancelled = true;
    };
    window.addEventListener("wheel", onUserScroll, { passive: true });
    window.addEventListener("touchmove", onUserScroll, { passive: true });
    window.addEventListener("keydown", onUserScroll);

    const start = performance.now();
    const tick = () => {
      if (cancelled) return cleanup();
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "auto", block: "start" });
      // Keep nudging for ~1.5s to catch late-loading content that grows the page.
      if (performance.now() - start < 1500) {
        timer = window.setTimeout(tick, 150);
      } else {
        cleanup();
      }
    };

    let timer = window.setTimeout(tick, 0);
    const cleanup = () => {
      window.clearTimeout(timer);
      window.removeEventListener("wheel", onUserScroll);
      window.removeEventListener("touchmove", onUserScroll);
      window.removeEventListener("keydown", onUserScroll);
    };
    return cleanup;
  }, []);

  return (
    <div id="top" className="min-h-screen bg-[#050608] text-zinc-100">
      <Hero />
      <Nav />
      <main>
        <Snapshot />
        <PriceTracker />
        <IPOMechanics />
        <Financials />
        <Segments />
        <Starlink />
        <Launches />
        <Starship />
        <Customers />
        <Risks />
        <Valuation />
        <UseOfProceeds />
        <Management />
        <Litigation />
        <Quotes />
      </main>
      <Footer />
    </div>
  );
}
