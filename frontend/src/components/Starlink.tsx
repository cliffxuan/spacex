import {
  Bar,
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

export function Starlink() {
  const subs = data.starlink.subscribers_millions;
  const arpu = data.starlink.arpu_usd;
  const merged = subs.map((s) => {
    const arpuVal = arpu.find((a) => a.period === s.period)?.value;
    return {
      period: s.period,
      Subscribers: s.value,
      ARPU: arpuVal,
    };
  });


  return (
    <Section
      id="starlink"
      eyebrow="Section 04 · Connectivity"
      title="Starlink: 10.3M subscribers, 9,600 satellites"
      blurb="The cash cow. Growing fast. ARPU is going the wrong way — by design."
      sourceUrl={SEC_URL}
      sourceLabel="MD&A · Key Business Metrics"
    >
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card>
          <Stat
            label="Subscribers (Q1 2026)"
            value="10.3M"
            sub={`From 2.3M in 2023 (4.5× in 2y)`}
            accent="text-cyan-300"
          />
        </Card>
        <Card>
          <Stat
            label="Sats in orbit"
            value={data.starlink.satellites_in_orbit_mar_31_2026.toLocaleString()}
            sub={`${data.starlink.share_of_active_maneuverable_satellites_pct}% of world's maneuverable sats`}
          />
        </Card>
        <Card>
          <Stat
            label="Manufacturing rate"
            value="~70 / wk"
            sub="Redmond, WA · ~3,640 / year"
          />
        </Card>
        <Card>
          <Stat
            label="Median speed"
            value={`${data.starlink.residential_median_download_mbps} Mbps`}
            sub="Residential peak hours"
          />
        </Card>
      </div>

      <div className="grid gap-5 lg:grid-cols-12">
        <Card className="lg:col-span-7">
          <h3 className="mb-3 text-lg font-semibold">Subscribers vs. ARPU</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={merged} margin={{ top: 10, right: 12, left: -8, bottom: 0 }}>
                <CartesianGrid stroke="#1f2937" strokeDasharray="3 3" />
                <XAxis dataKey="period" stroke="#71717a" fontSize={11} />
                <YAxis
                  yAxisId="left"
                  stroke="#22d3ee"
                  fontSize={12}
                  tickFormatter={(v) => `${v}M`}
                  label={{ value: "Subs (M)", angle: -90, position: "insideLeft", offset: 12, fill: "#22d3ee", fontSize: 11 }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="#f59e0b"
                  fontSize={12}
                  tickFormatter={(v) => `$${v}`}
                  label={{ value: "ARPU ($/mo)", angle: 90, position: "insideRight", offset: 12, fill: "#f59e0b", fontSize: 11 }}
                />
                <Tooltip
                  contentStyle={{ background: "#0a0a0a", border: "1px solid #27272a", borderRadius: 8 }}
                />
                <Legend wrapperStyle={{ paddingTop: 8, fontSize: 12 }} />
                <Bar yAxisId="left" dataKey="Subscribers" fill="#22d3ee" radius={[4, 4, 0, 0]} />
                <Line yAxisId="right" dataKey="ARPU" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 4 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-3 text-xs text-zinc-500">
            Subscribers up 4.5× since FY2023. Blended ARPU drifted from <span className="text-zinc-200">$99</span> to <span className="text-zinc-200">$66</span> as
            cheaper international plans expanded the funnel. Consumer revenue still grew{" "}
            <span className="text-emerald-300">+49%</span> in FY2025.
          </p>
        </Card>

        <div className="space-y-5 lg:col-span-5">
          <Card>
            <h3 className="text-lg font-semibold">The Starship inflection</h3>
            <p className="mt-2 text-sm text-zinc-400">
              Each Starship can deploy up to <span className="text-cyan-300 tabular">60 V3 satellites</span> — about a{" "}
              <span className="text-cyan-300 tabular">20× increase</span> in downlink
              capacity vs. a Falcon 9 launch. V3 sats target ~1 Tbps each.
            </p>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              <Mini label="V3 downlink" value="1 Tbps" />
              <Mini label="V3 per Starship" value="60" />
              <Mini label="Capacity mult." value="20×" />
            </div>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold">Global footprint</h3>
            <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <Footprint
                label="Broadband countries"
                value={data.starlink.broadband_countries}
              />
              <Footprint
                label="Sat-to-mobile countries"
                value={data.starlink.satellite_to_mobile_countries}
              />
              <Footprint
                label="MNO partners"
                value={`~${data.starlink.mno_partnerships}`}
              />
              <Footprint
                label="Sat-to-mobile devices / mo"
                value={`~${data.starlink.monthly_unique_satellite_to_mobile_devices_millions}M`}
              />
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-zinc-900/60 px-2 py-3">
      <div className="text-lg font-semibold tabular text-cyan-300">{value}</div>
      <div className="mt-1 text-[10px] uppercase tracking-wider text-zinc-500">{label}</div>
    </div>
  );
}

function Footprint({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border border-zinc-800/70 px-3 py-3">
      <div className="text-2xl font-semibold tabular">{value}</div>
      <div className="mt-1 text-[11px] text-zinc-500">{label}</div>
    </div>
  );
}
