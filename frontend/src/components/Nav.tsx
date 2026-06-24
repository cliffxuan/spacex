const ITEMS = [
  { id: "snapshot", label: "Snapshot" },
  { id: "market", label: "Market" },
  { id: "ipo", label: "IPO Mechanics" },
  { id: "financials", label: "Financials" },
  { id: "segments", label: "Segments" },
  { id: "starlink", label: "Starlink" },
  { id: "launches", label: "Launches" },
  { id: "starship", label: "Starship" },
  { id: "customers", label: "Customers" },
  { id: "risks", label: "Risks" },
  { id: "use", label: "Use of Proceeds" },
  { id: "management", label: "Management" },
  { id: "litigation", label: "Litigation" },
];

export function Nav() {
  return (
    <nav className="sticky top-0 z-40 border-b border-zinc-900/80 bg-[#050608]/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 overflow-x-auto px-5 py-3 scrollbar-thin">
        <a
          href="#top"
          className="shrink-0 font-mono text-xs font-semibold tracking-[0.25em] text-cyan-300"
        >
          SPCX/
        </a>
        <div className="flex shrink-0 gap-1">
          {ITEMS.map((it) => (
            <a
              key={it.id}
              href={`#${it.id}`}
              className="rounded-full px-3 py-1.5 text-xs text-zinc-400 transition hover:bg-zinc-900 hover:text-zinc-100"
            >
              {it.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
