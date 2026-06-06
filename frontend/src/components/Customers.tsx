import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Section, Card, SourceLink } from "./Section";
import { data, SEC_URL, AMENDMENT_URL } from "../data";
import { Shield, Building2, AlertTriangle, Cpu } from "lucide-react";

export function Customers() {
  const concPct = data.customers.customer_a_revenue_pct.map((p) => ({
    year: String(p.year),
    "Customer A %": p.pct,
    Other: 100 - p.pct,
  }));

  return (
    <Section
      id="customers"
      eyebrow="Section 07 · Customers"
      title="Who's actually paying"
      blurb="One unnamed customer — widely understood from public reporting to be the U.S. government — is 20.9% of total revenue. Two large new compute deals — Anthropic and Google — could rival it."
      sourceUrl={SEC_URL}
      sourceLabel="Note 3 — Concentration of Risk"
    >
      <div className="grid gap-5 lg:grid-cols-12">
        <Card className="lg:col-span-7">
          <h3 className="mb-3 text-lg font-semibold">Customer A as % of total revenue</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={concPct} margin={{ top: 10, right: 12, left: -10, bottom: 0 }}>
                <CartesianGrid stroke="#1f2937" strokeDasharray="3 3" />
                <XAxis dataKey="year" stroke="#71717a" fontSize={12} />
                <YAxis stroke="#71717a" fontSize={12} tickFormatter={(v) => `${v}%`} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ background: "#0a0a0a", border: "1px solid #27272a", borderRadius: 8 }}
                  formatter={(v: number, name) => [`${v.toFixed(1)}%`, name]}
                />
                <Bar dataKey="Customer A %" stackId="x" fill="#ef4444">
                  {concPct.map((_, i) => (
                    <Cell key={i} fill="#ef4444" />
                  ))}
                </Bar>
                <Bar dataKey="Other" stackId="x" fill="#27272a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-3 text-xs text-zinc-500">
            Concentration is dropping (25.2% → 20.9%) but remains material. No other
            customer crossed 10% in FY2023-2025. Customer A revenue "relates to all three
            segments."
          </p>
        </Card>

        <div className="space-y-5 lg:col-span-5">
          <Card>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-400">
              <Shield size={14} /> Named government customers
            </div>
            <ul className="mt-3 space-y-2 text-sm text-zinc-300">
              <li className="flex justify-between border-b border-zinc-800/60 pb-2">
                <span>NASA — ISS crew & cargo (2025)</span>
                <span className="font-mono text-emerald-300">5 of 5</span>
              </li>
              <li className="flex justify-between border-b border-zinc-800/60 pb-2">
                <span>NSSL medium / heavy lift (2025)</span>
                <span className="font-mono text-emerald-300">11 of 12</span>
              </li>
              <li className="flex justify-between">
                <span>HLS for Artemis</span>
                <span className="font-mono text-zinc-400">Awarded</span>
              </li>
            </ul>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-500/10 via-zinc-900/60 to-zinc-950/80">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-indigo-300/80">
              <Cpu size={14} /> Big new commercial contract
            </div>
            <h3 className="mt-2 text-xl font-semibold">Anthropic compute deal</h3>
            <div className="mt-4 grid grid-cols-2 gap-3 text-center text-sm">
              <Stat2 label="Monthly fee" value="$1.25B" />
              <Stat2 label="Term" value="36 mo." />
              <Stat2 label="Annualized" value="$15B" />
              <Stat2 label="Contracted" value="~$45B" />
            </div>
            <p className="mt-4 text-xs text-zinc-500">
              Signed May 2026, runs through May 2029. Either party can terminate on 90 days'
              notice — so treat the $45B headline with care.{" "}
              <SourceLink href={SEC_URL}>S-1 — Recent Developments</SourceLink>
            </p>
          </Card>

          <Card className="bg-gradient-to-br from-cyan-500/10 via-zinc-900/60 to-zinc-950/80">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-cyan-300/80">
              <Cpu size={14} /> Newer commercial contract
            </div>
            <h3 className="mt-2 text-xl font-semibold">Google compute deal</h3>
            <div className="mt-4 grid grid-cols-2 gap-3 text-center text-sm">
              <Stat2 label="Monthly fee" value={`$${data.customers.google_deal.monthly_fee_billions.toFixed(2)}B`} accent="text-cyan-300" />
              <Stat2 label="GPUs" value={`${(data.customers.google_deal.gpus / 1000).toFixed(0)}K`} accent="text-cyan-300" />
              <Stat2 label="Annualized" value={`~$${data.customers.google_deal.annualized_billions}B`} accent="text-cyan-300" />
              <Stat2 label="Window" value="Oct '26–Jun '29" accent="text-cyan-300" />
            </div>
            <p className="mt-4 text-xs text-zinc-500">
              Signed June 5, 2026 (disclosed in a free writing prospectus): ~110,000 NVIDIA GPUs,
              ramping through Sept 2026. Either party can terminate on 90 days' notice after Dec 31,
              2026.{" "}
              <SourceLink href={AMENDMENT_URL}>FWP — Recent Developments</SourceLink>
            </p>
          </Card>
        </div>

        <Card className="lg:col-span-12 bg-gradient-to-r from-red-500/[0.06] to-zinc-900/60">
          <div className="flex items-start gap-3">
            <AlertTriangle size={18} className="mt-0.5 text-red-300" />
            <div>
              <h3 className="text-lg font-semibold text-red-100">Concentration is a risk factor</h3>
              <p className="mt-2 text-sm text-zinc-300">
                Government revenue is subject to{" "}
                <span className="text-zinc-100">competitive bidding</span>,{" "}
                <span className="text-zinc-100">appropriations risk</span>, and{" "}
                <span className="text-zinc-100">termination for convenience</span>. Most
                Space-segment revenue is fixed-price — overruns hit margin directly.{" "}
                <SourceLink href={SEC_URL}>Risk Factors · Government Contracts</SourceLink>
              </p>
            </div>
          </div>
        </Card>

        <Card className="lg:col-span-12">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-400">
            <Building2 size={14} /> Operational scale
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Mini label="Employees" value={`${(data.facts.employees_mar_31_2026 / 1000).toFixed(0)}K+`} sub="Worldwide" />
            <Mini label="Backlog" value="$27.6B" sub="32% within 1 year" />
            <Mini label="Deferred revenue" value="$12.1B" sub="Dec 31, 2025" />
            <Mini label="Litigation accrual" value="$530M" sub="Dec 31, 2025" />
          </div>
        </Card>
      </div>
    </Section>
  );
}

function Stat2({ label, value, accent = "text-indigo-300" }: { label: string; value: string; accent?: string }) {
  return (
    <div className="rounded-lg bg-zinc-950/40 px-3 py-2">
      <div className={`text-lg font-semibold tabular ${accent}`}>{value}</div>
      <div className="mt-1 text-[10px] uppercase tracking-wider text-zinc-500">{label}</div>
    </div>
  );
}

function Mini({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-lg border border-zinc-800/70 p-3">
      <div className="text-2xl font-semibold tabular">{value}</div>
      <div className="mt-1 text-[11px] text-zinc-500">{label}</div>
      <div className="text-[10px] text-zinc-600">{sub}</div>
    </div>
  );
}
