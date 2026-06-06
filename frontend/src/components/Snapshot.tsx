import { Section, Card, SourceLink } from "./Section";
import { data, SEC_URL, AMENDMENT_INDEX_URL } from "../data";
import {
  Banknote,
  Rocket,
  Satellite,
  Cpu,
  Users,
  Globe2,
  Gauge,
  DollarSign,
} from "lucide-react";

export function Snapshot() {
  const tiles = [
    {
      icon: <Rocket size={18} />,
      label: "Falcon launches in 2025",
      value: `${data.launch.annual_falcon_launches.at(-1)!.launches}`,
      sub: `${data.launch.falcon_mission_success_rate_pct}% mission success · ${data.launch.world_mass_to_orbit_share_since_2023_pct}% of world mass to orbit`,
      accent: "text-orange-300",
    },
    {
      icon: <Satellite size={18} />,
      label: "Starlink subscribers",
      value: `${data.starlink.subscribers_millions.at(-1)!.value}M`,
      sub: `${data.starlink.broadband_countries} countries · ${data.starlink.satellites_in_orbit_mar_31_2026.toLocaleString()} sats in orbit`,
      accent: "text-cyan-300",
    },
    {
      icon: <Cpu size={18} />,
      label: "AI compute draw",
      value: "1.0 GW",
      sub: "Q1 2026 — up from 0 GW in 2023. Long-term goal: 100 GW in orbit.",
      accent: "text-indigo-300",
    },
    {
      icon: <DollarSign size={18} />,
      label: "FY2025 Revenue",
      value: "$18.67B",
      sub: `+33% YoY · 80% of mass-to-orbit dollars`,
      accent: "text-emerald-300",
    },
    {
      icon: <Users size={18} />,
      label: "Employees",
      value: `${(data.facts.employees_mar_31_2026 / 1000).toFixed(0)}K+`,
      sub: "Worldwide · no collective bargaining",
    },
    {
      icon: <Banknote size={18} />,
      label: "IPO raise (S-1/A)",
      value: `~$${data.ipo.pricing.gross_proceeds_usd_billions}B`,
      sub: `${(data.ipo.pricing.shares_offered / 1e6).toFixed(1)}M shares @ $${data.ipo.pricing.price_per_share_usd.toFixed(2)} · ~$${data.ipo.pricing.implied_ipo_valuation_usd_trillions}T valuation`,
      accent: "text-emerald-300",
    },
    {
      icon: <Gauge size={18} />,
      label: "Backlog",
      value: "$27.6B",
      sub: "32% recognized within 1 year",
    },
    {
      icon: <Globe2 size={18} />,
      label: "Claimed TAM",
      value: "$28.5T",
      sub: "AI: $26.5T · Connectivity: $1.6T · Space: $370B",
      accent: "text-purple-300",
    },
  ];

  return (
    <Section
      id="snapshot"
      eyebrow="Section 01 · The snapshot"
      title="Eight numbers that frame the offering"
      blurb="The S-1 runs 12 MB. These tiles, scraped from it, are the orientation."
      sourceUrl={SEC_URL}
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map((t) => (
          <Card key={t.label} className="!p-5">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-zinc-500">
              <span className="grid h-6 w-6 place-items-center rounded-md bg-zinc-800/80">
                {t.icon}
              </span>
              {t.label}
            </div>
            <div className={`mt-3 text-3xl font-semibold tabular ${t.accent || "text-zinc-100"}`}>
              {t.value}
            </div>
            <div className="mt-1.5 text-xs text-zinc-500">{t.sub}</div>
          </Card>
        ))}
      </div>

      <p className="mt-6 text-sm text-zinc-500">
        These figures reflect the pricing terms set in Amendment No. 2 to the S-1, filed June 3, 2026.
        Pull the latest updates directly from the{" "}
        <SourceLink href={AMENDMENT_INDEX_URL}>S-1/A Filing Index on SEC EDGAR</SourceLink>
        .
      </p>
    </Section>
  );
}
