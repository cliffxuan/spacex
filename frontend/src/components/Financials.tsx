import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Section, Card, Stat, SourceLink } from "./Section";
import { data, SEC_URL } from "../data";

const CYAN = "#22d3ee";
const INDIGO = "#818cf8";
const RED = "#f87171";
const EMERALD = "#34d399";

export function Financials() {
  const annual = data.financials.annual.map((y) => ({
    year: String(y.year),
    Revenue: y.revenue,
    "Operating Income": y.operating_income,
    "Net Income": y.net_income,
  }));

  const capex = data.financials.capex.map((y) => ({
    year: String(y.year),
    Space: y.space,
    Connectivity: y.connectivity,
    AI: y.ai,
  }));

  const cash = data.financials.cash_flows.map((y) => ({
    year: String(y.year),
    Operating: y.operating,
    Investing: y.investing,
    Financing: y.financing,
  }));

  return (
    <Section
      id="financials"
      eyebrow="Section 02 · Money in, money out"
      title="The financial trajectory"
      blurb="Revenue tripled in three years. So did the losses — most of it deliberate spending on AI compute and Starship."
      sourceUrl={`${SEC_URL}`}
      sourceLabel="MD&A · F-pages"
    >
      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card>
          <Stat
            label="FY2025 Revenue"
            value="$18.67B"
            sub="+33% YoY · +80% vs 2023"
            accent="text-cyan-300"
          />
        </Card>
        <Card>
          <Stat
            label="FY2025 Adj. EBITDA"
            value="$6.58B"
            sub="35% margin"
            accent="text-emerald-300"
          />
        </Card>
        <Card>
          <Stat
            label="FY2025 Net Loss"
            value="−$4.94B"
            sub="$3.0B Starship R&D + AI buildout"
            accent="text-red-300"
          />
        </Card>
        <Card>
          <Stat
            label="Backlog"
            value="$27.6B"
            sub="As of Mar 31, 2026"
            accent="text-indigo-300"
          />
        </Card>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="mb-3 flex items-baseline justify-between">
            <h3 className="text-lg font-semibold">Revenue vs profitability ($M)</h3>
            <span className="text-xs text-zinc-500">FY2023 – FY2025</span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={annual} margin={{ top: 10, right: 12, left: -10, bottom: 0 }}>
                <CartesianGrid stroke="#1f2937" strokeDasharray="3 3" />
                <XAxis dataKey="year" stroke="#71717a" fontSize={12} />
                <YAxis stroke="#71717a" fontSize={12} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}B`} />
                <Tooltip
                  contentStyle={{ background: "#0a0a0a", border: "1px solid #27272a", borderRadius: 8 }}
                  formatter={(v: number) => [`$${(v / 1000).toFixed(2)}B`, ""]}
                />
                <Legend wrapperStyle={{ paddingTop: 8, fontSize: 12 }} />
                <Bar dataKey="Revenue" fill={CYAN} radius={[4, 4, 0, 0]} />
                <Line dataKey="Operating Income" stroke={EMERALD} strokeWidth={2} dot={{ r: 4 }} />
                <Line dataKey="Net Income" stroke={RED} strokeWidth={2} dot={{ r: 4 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-3 text-xs text-zinc-500">
            Numbers reflect retrospective combination with xAI (acquired Feb 2026) and X
            Holdings (acquired Mar 2025). FY2024 was the one profitable year in the set.{" "}
            <SourceLink href={SEC_URL}>S-1 · Summary Historical Financial Data</SourceLink>
          </p>
        </Card>

        <Card>
          <h3 className="mb-3 text-lg font-semibold">Where the capital goes ($M)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={capex} margin={{ top: 10, right: 4, left: -16, bottom: 0 }}>
                <CartesianGrid stroke="#1f2937" strokeDasharray="3 3" />
                <XAxis dataKey="year" stroke="#71717a" fontSize={12} />
                <YAxis stroke="#71717a" fontSize={12} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}B`} />
                <Tooltip
                  contentStyle={{ background: "#0a0a0a", border: "1px solid #27272a", borderRadius: 8 }}
                  formatter={(v: number) => [`$${(v / 1000).toFixed(2)}B`, ""]}
                />
                <Legend wrapperStyle={{ paddingTop: 8, fontSize: 11 }} />
                <Bar dataKey="Space" stackId="x" fill="#f59e0b" />
                <Bar dataKey="Connectivity" stackId="x" fill={CYAN} />
                <Bar dataKey="AI" stackId="x" fill={INDIGO} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-3 text-xs text-zinc-500">
            FY2025 CapEx hit <span className="text-zinc-300 tabular">$20.7B</span> — AI segment
            alone consumed <span className="text-indigo-300 tabular">$12.7B</span> (61%).
          </p>
        </Card>

        <Card className="lg:col-span-3">
          <div className="mb-3 flex items-baseline justify-between">
            <h3 className="text-lg font-semibold">Cash flow waterfall ($M)</h3>
            <span className="text-xs text-zinc-500">Operating funds operations; financing funds growth.</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cash} margin={{ top: 10, right: 8, left: -10, bottom: 0 }}>
                <CartesianGrid stroke="#1f2937" strokeDasharray="3 3" />
                <XAxis dataKey="year" stroke="#71717a" fontSize={12} />
                <YAxis stroke="#71717a" fontSize={12} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}B`} />
                <Tooltip
                  contentStyle={{ background: "#0a0a0a", border: "1px solid #27272a", borderRadius: 8 }}
                  formatter={(v: number) => [`$${(v / 1000).toFixed(2)}B`, ""]}
                />
                <Legend wrapperStyle={{ paddingTop: 8, fontSize: 12 }} />
                <Bar dataKey="Operating" fill={EMERALD} radius={[3, 3, 0, 0]} />
                <Bar dataKey="Investing">
                  {cash.map((d, i) => (
                    <Cell key={i} fill={d.Investing < 0 ? RED : EMERALD} />
                  ))}
                </Bar>
                <Bar dataKey="Financing" fill={INDIGO} radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-3 text-xs text-zinc-500">
            FY2025: Operating <span className="text-emerald-300 tabular">+$6.8B</span> ·
            Investing <span className="text-red-300 tabular">−$19.6B</span> · Financing{" "}
            <span className="text-indigo-300 tabular">+$26.4B</span> (preferred raise + bridge loan).
          </p>
        </Card>
      </div>
    </Section>
  );
}
