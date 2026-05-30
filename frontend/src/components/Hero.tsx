import { ArrowDown, ExternalLink } from "lucide-react";
import { data, SEC_URL } from "../data";

export function Hero() {
  const fy25 = data.financials.annual.find((y) => y.year === 2025)!;
  const subs = data.starlink.subscribers_millions.at(-1)!.value;
  const sats = data.starlink.satellites_in_orbit_mar_31_2026;
  const ebitda = data.financials.adjusted_ebitda_FY2025;
  return (
    <header className="starfield relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
      <div className="relative mx-auto max-w-6xl px-5 pt-16 pb-24 sm:pt-24 sm:pb-32">
        <div className="flex items-center justify-between">
          <div className="font-mono text-xs tracking-[0.3em] text-cyan-300/80">
            ALGOENTROPY · IPO PRIMER
          </div>
          <a
            href={SEC_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 rounded-full border border-zinc-700/60 bg-black/30 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-zinc-300 backdrop-blur transition hover:border-cyan-400/40 hover:text-cyan-300"
          >
            Read the S-1
            <ExternalLink size={11} />
          </a>
        </div>

        <div className="mt-16 grid items-end gap-10 sm:mt-24 sm:grid-cols-12">
          <div className="sm:col-span-8">
            <div className="font-mono text-[11px] uppercase tracking-[0.32em] text-cyan-400">
              <span className="mr-2 inline-block h-2 w-2 -translate-y-px rounded-full bg-cyan-400 pulse-dot align-middle" />
              S-1 filed 20 May 2026 · Preliminary prospectus
            </div>
            <h1 className="mt-6 text-5xl font-semibold leading-[0.95] tracking-tighter glow-text sm:text-7xl md:text-[88px]">
              SpaceX is going public.
              <br />
              <span className="bg-gradient-to-r from-zinc-100 via-cyan-200 to-indigo-300 bg-clip-text text-transparent">
                Here's the prospectus, charted.
              </span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg text-zinc-300">
              A primary-source breakdown of the largest IPO in market history — built
              line-by-line from the {" "}
              <a
                href={SEC_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-cyan-500/60 underline-offset-4 hover:text-cyan-300"
              >
                Form S-1 filed with the SEC
              </a>
              . Every number on this page links back to its source.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="#snapshot"
                className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-2.5 text-sm font-medium text-zinc-950 transition hover:bg-cyan-300"
              >
                Explore the data
                <ArrowDown size={14} />
              </a>
              <a
                href="#financials"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-5 py-2.5 text-sm text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-900/60"
              >
                Jump to financials
              </a>
            </div>
          </div>

          <div className="sm:col-span-4">
            <div className="rounded-2xl border border-zinc-800 bg-black/30 p-5 backdrop-blur-md">
              <div className="flex items-baseline justify-between border-b border-zinc-800 pb-3">
                <span className="font-mono text-xs tracking-[0.25em] text-zinc-400">
                  TICKER
                </span>
                <span className="font-mono text-2xl font-bold tracking-tight text-cyan-300">
                  {data.ipo.ticker}
                </span>
              </div>
              <dl className="mt-4 space-y-3 text-sm">
                <Row k="Exchange" v={data.ipo.exchange} />
                <Row k="Security" v="Class A common" />
                <Row k="Voting (A · B)" v={`1× · 10×`} />
                <Row k="Lock-up" v={`${data.ipo.lock_up_days} days`} />
                <Row k="Controlled co." v="Yes" />
                <Row k="Dividends" v="None planned" />
              </dl>
            </div>
            <div className="mt-3 px-1 text-[10px] font-mono uppercase tracking-widest text-zinc-500">
              Pricing & share count are placeholders in the preliminary S-1.
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-3 sm:mt-20 sm:grid-cols-4 sm:gap-4">
          <HeroStat
            label="FY2025 Revenue"
            value={`$${(fy25.revenue / 1000).toFixed(2)}B`}
            sub={`+33% YoY`}
          />
          <HeroStat
            label="FY2025 Adj. EBITDA"
            value={`$${(ebitda / 1000).toFixed(2)}B`}
            sub="Non-GAAP"
            accent="text-emerald-300"
          />
          <HeroStat
            label="Starlink subs"
            value={`${subs}M`}
            sub="Q1 2026"
            accent="text-cyan-300"
          />
          <HeroStat
            label="Satellites in orbit"
            value={sats.toLocaleString()}
            sub={`${data.starlink.share_of_active_maneuverable_satellites_pct}% of all maneuverable sats`}
            accent="text-indigo-300"
          />
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#050608]" />
    </header>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-zinc-500">{k}</dt>
      <dd className="font-mono text-zinc-100">{v}</dd>
    </div>
  );
}

function HeroStat({
  label,
  value,
  sub,
  accent = "text-zinc-100",
}: {
  label: string;
  value: string;
  sub: string;
  accent?: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-800/70 bg-zinc-950/40 px-4 py-4 backdrop-blur">
      <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
        {label}
      </div>
      <div className={`mt-2 text-2xl font-semibold tabular sm:text-3xl ${accent}`}>
        {value}
      </div>
      <div className="mt-1 text-[11px] text-zinc-500">{sub}</div>
    </div>
  );
}
