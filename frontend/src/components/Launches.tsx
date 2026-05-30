import {
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Section, Card, Stat } from "./Section";
import { data, SEC_URL } from "../data";

export function Launches() {
  const launches = data.launch.annual_falcon_launches.map((y) => ({
    year: String(y.year),
    Launches: y.launches,
    "Mass to orbit (t)": y.mass_to_orbit_mt,
  }));

  const costs = [
    { era: "Pre-SpaceX avg.", cost: data.launch.cost_per_kg_pre_spacex },
    { era: "Falcon 9 (2010)", cost: data.launch.falcon_9_cost_per_kg_2010 },
    { era: "Falcon Heavy (2018)", cost: data.launch.falcon_heavy_cost_per_kg_2018 },
  ];

  return (
    <Section
      id="launches"
      eyebrow="Section 05 · Space"
      title="Launch cadence and the cost-per-kilogram collapse"
      blurb="Since 2023, SpaceX has launched more than 80% of mass to orbit for the entire world. Each year."
      sourceUrl={SEC_URL}
      sourceLabel="Business — Space"
    >
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card>
          <Stat
            label="2025 Falcon launches"
            value={String(data.launch.annual_falcon_launches.at(-1)!.launches)}
            sub="vs. 138 in 2024 · 98 in 2023"
            accent="text-orange-300"
          />
        </Card>
        <Card>
          <Stat
            label="Mission success rate"
            value={`>${data.launch.falcon_mission_success_rate_pct}%`}
            sub={`Across ~${data.launch.all_time_orbital_launches} orbital launches`}
            accent="text-emerald-300"
          />
        </Card>
        <Card>
          <Stat
            label="Max booster reflights"
            value={String(data.launch.max_first_stage_reflights)}
            sub="One booster, 34 missions"
          />
        </Card>
        <Card>
          <Stat
            label="World mass-to-orbit"
            value={`${data.launch.world_mass_to_orbit_share_since_2023_pct}%`}
            sub="Since 2023, every year"
            accent="text-indigo-300"
          />
        </Card>
      </div>

      <div className="grid gap-5 lg:grid-cols-12">
        <Card className="lg:col-span-7">
          <h3 className="mb-3 text-lg font-semibold">Falcon flight cadence vs. mass delivered</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={launches} margin={{ top: 10, right: 12, left: -8, bottom: 0 }}>
                <CartesianGrid stroke="#1f2937" strokeDasharray="3 3" />
                <XAxis dataKey="year" stroke="#71717a" fontSize={12} />
                <YAxis yAxisId="L" stroke="#f59e0b" fontSize={12} />
                <YAxis
                  yAxisId="R"
                  orientation="right"
                  stroke="#22d3ee"
                  fontSize={12}
                  tickFormatter={(v) => `${(v / 1000).toFixed(1)}kt`}
                />
                <Tooltip
                  contentStyle={{ background: "#0a0a0a", border: "1px solid #27272a", borderRadius: 8 }}
                />
                <Legend wrapperStyle={{ paddingTop: 8, fontSize: 12 }} />
                <Bar yAxisId="L" dataKey="Launches" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                <Line yAxisId="R" dataKey="Mass to orbit (t)" stroke="#22d3ee" strokeWidth={2.5} dot={{ r: 4 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-3 text-xs text-zinc-500">
            Mass to orbit grew from 1,210 t (2023) → 2,213 t (2025). The 2026 ramp continues:
            40 Falcon launches in Q1 2026 alone, 39 of which used flight-proven boosters.
          </p>
        </Card>

        <Card className="lg:col-span-5">
          <h3 className="mb-3 text-lg font-semibold">$ / kg to orbit — the collapse</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={costs} margin={{ top: 10, right: 12, left: -10, bottom: 0 }} layout="vertical">
                <CartesianGrid stroke="#1f2937" strokeDasharray="3 3" />
                <XAxis type="number" stroke="#71717a" fontSize={11} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <YAxis type="category" dataKey="era" stroke="#a1a1aa" fontSize={11} width={120} />
                <Tooltip
                  contentStyle={{ background: "#0a0a0a", border: "1px solid #27272a", borderRadius: 8 }}
                  formatter={(v: number) => [`$${v.toLocaleString()}/kg`, ""]}
                />
                <Bar dataKey="cost" fill="#22d3ee" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-3 text-xs text-zinc-500">
            From <span className="text-zinc-200">$18,500/kg</span> in the pre-SpaceX era to{" "}
            <span className="text-zinc-200">$1,400/kg</span> on Falcon Heavy. Starship's
            stated goal: a further <span className="text-zinc-200">99%+ reduction</span>.
          </p>
        </Card>

        <Card className="lg:col-span-12 bg-gradient-to-r from-zinc-900/60 via-zinc-900/40 to-cyan-950/30">
          <h3 className="text-lg font-semibold">A few records worth marking</h3>
          <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
            {data.facts.industry_firsts.map((f) => (
              <div
                key={f.year + f.achievement}
                className="flex gap-3 rounded-lg border border-zinc-800/70 p-3"
              >
                <span className="font-mono text-cyan-300 tabular">{f.year}</span>
                <span className="text-zinc-300">{f.achievement}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Section>
  );
}
