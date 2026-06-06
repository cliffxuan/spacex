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
  return (
    <div id="top" className="min-h-screen bg-[#050608] text-zinc-100">
      <Hero />
      <Nav />
      <main>
        <Snapshot />
        <IPOMechanics />
        <Financials />
        <Segments />
        <Starlink />
        <Launches />
        <Starship />
        <Customers />
        <Risks />
        <Valuation />
        <PriceTracker />
        <UseOfProceeds />
        <Management />
        <Litigation />
        <Quotes />
      </main>
      <Footer />
    </div>
  );
}
