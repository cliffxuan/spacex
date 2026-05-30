import {
  Cell,
  Legend,
  Pie,
  PieChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Section, Card } from "./Section";
import { data, SEC_URL } from "../data";

const COLORS = {
  Space: "#f59e0b",
  Connectivity: "#22d3ee",
  AI: "#818cf8",
};

export function Segments() {
  const fy25 = data.segments.FY2025;

  const segPie = [
    { name: "Space", value: fy25.Space.total },
    { name: "Connectivity", value: fy25.Connectivity.total },
    { name: "AI", value: fy25.AI.total },
  ];
  const total = segPie.reduce((s, x) => s + x.value, 0);

  const growth = (["FY2023", "FY2024", "FY2025"] as const).map((y) => ({
    year: y.replace("FY", ""),
    Space: data.segments[y].Space.total,
    Connectivity: data.segments[y].Connectivity.total,
    AI: data.segments[y].AI.total,
  }));

  const ebitda = (["FY2023", "FY2024", "FY2025"] as const).map((y) => ({
    year: y.replace("FY", ""),
    Space: data.segments[y].Space.adj_ebitda,
    Connectivity: data.segments[y].Connectivity.adj_ebitda,
    AI: data.segments[y].AI.adj_ebitda,
  }));

  return (
    <Section
      id="segments"
      eyebrow="Section 03 · Three businesses"
      title="Space, Connectivity, AI"
      blurb="Connectivity is now 61% of revenue and ~$7.2B of segment EBITDA. AI is the spend engine. Space is the engine engine."
      sourceUrl={SEC_URL}
      sourceLabel="Note 19 · Segments"
    >
      <div className="grid gap-5 lg:grid-cols-12">
        <Card className="lg:col-span-5">
          <h3 className="mb-3 text-lg font-semibold">FY2025 revenue mix</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={segPie}
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={2}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                >
                  {segPie.map((s) => (
                    <Cell key={s.name} fill={COLORS[s.name as keyof typeof COLORS]} stroke="#0a0a0a" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: "#0a0a0a", border: "1px solid #27272a", borderRadius: 8 }}
                  formatter={(v: number) => [`$${(v / 1000).toFixed(2)}B (${((v / total) * 100).toFixed(0)}%)`, ""]}
                />
                <Legend
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                  wrapperStyle={{ fontSize: 13 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 grid grid-cols-3 gap-2 text-center">
            {segPie.map((s) => (
              <div key={s.name}>
                <div
                  className="text-2xl font-semibold tabular"
                  style={{ color: COLORS[s.name as keyof typeof COLORS] }}
                >
                  {((s.value / total) * 100).toFixed(0)}%
                </div>
                <div className="text-[10px] uppercase tracking-wider text-zinc-500">{s.name}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="lg:col-span-7">
          <h3 className="mb-3 text-lg font-semibold">Revenue by segment, by year ($M)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={growth} margin={{ top: 10, right: 4, left: -10, bottom: 0 }}>
                <CartesianGrid stroke="#1f2937" strokeDasharray="3 3" />
                <XAxis dataKey="year" stroke="#71717a" fontSize={12} />
                <YAxis stroke="#71717a" fontSize={12} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}B`} />
                <Tooltip
                  contentStyle={{ background: "#0a0a0a", border: "1px solid #27272a", borderRadius: 8 }}
                  formatter={(v: number) => [`$${(v / 1000).toFixed(2)}B`, ""]}
                />
                <Legend wrapperStyle={{ paddingTop: 8, fontSize: 12 }} />
                <Bar dataKey="Space" fill={COLORS.Space} radius={[3, 3, 0, 0]} />
                <Bar dataKey="Connectivity" fill={COLORS.Connectivity} radius={[3, 3, 0, 0]} />
                <Bar dataKey="AI" fill={COLORS.AI} radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-3 text-xs text-zinc-500">
            Connectivity 49.8% YoY growth FY2024→FY2025. Space declines slightly while
            Falcon launches went from 138 → 170; the segment is being deliberately starved
            for cash so AI and Starship can be fed.
          </p>
        </Card>

        <Card className="lg:col-span-12">
          <h3 className="mb-3 text-lg font-semibold">Segment-level Adjusted EBITDA ($M)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ebitda} margin={{ top: 10, right: 4, left: -10, bottom: 0 }}>
                <CartesianGrid stroke="#1f2937" strokeDasharray="3 3" />
                <XAxis dataKey="year" stroke="#71717a" fontSize={12} />
                <YAxis stroke="#71717a" fontSize={12} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}B`} />
                <Tooltip
                  contentStyle={{ background: "#0a0a0a", border: "1px solid #27272a", borderRadius: 8 }}
                  formatter={(v: number) => [`$${(v / 1000).toFixed(2)}B`, ""]}
                />
                <Legend wrapperStyle={{ paddingTop: 8, fontSize: 12 }} />
                <Bar dataKey="Space" fill={COLORS.Space} radius={[3, 3, 0, 0]} />
                <Bar dataKey="Connectivity" fill={COLORS.Connectivity} radius={[3, 3, 0, 0]} />
                <Bar dataKey="AI" fill={COLORS.AI} radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-3 text-xs text-zinc-500">
            Connectivity is the cash cow — $7.2B Adj. EBITDA in FY2025 (+86% YoY). The AI
            segment swung to <span className="text-red-300 tabular">−$1.24B</span> as compute
            buildout outpaced ad revenue.
          </p>
        </Card>
      </div>
    </Section>
  );
}
