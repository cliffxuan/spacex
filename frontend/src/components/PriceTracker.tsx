import { type ReactNode } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Section, Card, Stat, SourceLink } from "./Section";
import { fmtDate } from "../data";
import { usePrices, pctChange } from "../usePrices";
import { Activity, TrendingUp, TrendingDown } from "lucide-react";

const HL_URL = "https://app.hyperliquid.xyz/trade/xyz:SPCX";

export function PriceTracker() {
  const { data: d, err } = usePrices();

  const ipo = d?.ipo_price ?? 135;
  const perp = d?.latest.perp ?? null;
  const stock = d?.latest.stock ?? null;
  const stockVsIpo = pctChange(stock, ipo);
  const stockDay = pctChange(stock, d?.latest.stock_prev);
  const listed = stock != null;

  return (
    <Section
      id="market"
      eyebrow="Live · The market"
      title="SPCX, live on Nasdaq"
      blurb="The real Nasdaq close since SpaceX listed on 12 Jun 2026, against Hyperliquid's pre-IPO perpetual that tracked it beforehand. The $135 IPO price is marked for reference. The perp is a third-party derivative, not the official SPCX stock."
      sourceUrl={HL_URL}
      sourceLabel="Hyperliquid · xyz:SPCX"
    >
      <div className="grid gap-5 lg:grid-cols-12">
        <Card className="lg:col-span-8">
          <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-400">
            <Activity size={14} className="text-cyan-300" /> Daily close · USD
          </div>
          <div className="h-80">
            {err && !d ? (
              <Centered>Couldn't load live prices. Retrying…</Centered>
            ) : !d ? (
              <Centered>Loading live prices…</Centered>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={d.series} margin={{ top: 8, right: 16, left: -8, bottom: 0 }}>
                  <CartesianGrid stroke="#1f2937" strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    stroke="#71717a"
                    fontSize={11}
                    tickFormatter={(v: string) => v.slice(5)}
                    minTickGap={28}
                  />
                  <YAxis
                    stroke="#71717a"
                    fontSize={11}
                    // Always keep the $135 IPO reference line in view, even when
                    // the traded price sits well above it.
                    domain={[
                      (dataMin: number) => Math.floor(Math.min(dataMin, ipo) * 0.97),
                      (dataMax: number) => Math.ceil(Math.max(dataMax, ipo) * 1.03),
                    ]}
                    tickFormatter={(v: number) => `$${v}`}
                    width={48}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#0a0a0a",
                      border: "1px solid #27272a",
                      borderRadius: 8,
                    }}
                    formatter={(v: number, name) => [`$${v}`, name === "perp" ? "Perp (Hyperliquid)" : "Stock (Nasdaq)"]}
                  />
                  <ReferenceLine
                    y={ipo}
                    stroke="#f59e0b"
                    strokeDasharray="5 4"
                    label={{ value: `IPO $${ipo}`, position: "insideTopRight", fill: "#f59e0b", fontSize: 11 }}
                  />
                  <ReferenceLine
                    x={d.listing_date}
                    stroke="#6366f1"
                    strokeDasharray="2 4"
                    label={{ value: `Lists ${fmtDate(d.listing_date)}`, position: "insideTopLeft", fill: "#818cf8", fontSize: 11 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="perp"
                    name="perp"
                    stroke="#22d3ee"
                    strokeWidth={2}
                    dot={false}
                    connectNulls
                    isAnimationActive={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="stock"
                    name="stock"
                    stroke="#34d399"
                    strokeWidth={2}
                    dot={false}
                    connectNulls
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-zinc-500">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-0.5 w-4 rounded bg-cyan-400" /> Pre-IPO perp (Hyperliquid)
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-0.5 w-4 rounded bg-emerald-400" /> Listed stock (Nasdaq)
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-0.5 w-4 rounded border-t border-dashed border-amber-500" /> $135 IPO price
            </span>
          </div>
        </Card>

        <div className="space-y-5 lg:col-span-4">
          <Card className="bg-gradient-to-br from-emerald-500/[0.08] via-zinc-900/60 to-zinc-950/80">
            <Stat
              label="SPCX · Nasdaq"
              value={listed ? `$${stock!.toFixed(2)}` : "Not yet listed"}
              accent={listed ? "text-emerald-300" : "text-zinc-500"}
              sub={
                listed ? (
                  <span className="flex flex-wrap gap-x-3 gap-y-1">
                    {stockDay != null && <Delta pct={stockDay} label="today" />}
                    {stockVsIpo != null && <Delta pct={stockVsIpo} label="vs $135 IPO" />}
                  </span>
                ) : (
                  `Begins trading ${d ? fmtDate(d.listing_date) : "12 Jun 2026"}`
                )
              }
            />
          </Card>
          <Card>
            <Stat
              label="Pre-IPO perp · latest"
              value={perp != null ? `$${perp.toFixed(2)}` : "—"}
              accent="text-cyan-300"
              sub="Hyperliquid · xyz:SPCX"
            />
          </Card>
          <p className="text-[11px] leading-relaxed text-zinc-500">
            The cyan line is a <span className="text-zinc-400">pre-IPO perpetual future</span> on{" "}
            <SourceLink href={HL_URL}>Hyperliquid</SourceLink> — a leveraged, third-party market, <span className="text-zinc-400">not</span> the
            official SpaceX share price. The green line begins when SPCX actually lists on Nasdaq. Prices
            refresh ~every minute; not investment advice.
          </p>
        </div>
      </div>
    </Section>
  );
}

function Delta({ pct, label }: { pct: number; label: string }) {
  const up = pct >= 0;
  return (
    <span className={up ? "text-emerald-400" : "text-red-400"}>
      {up ? <TrendingUp size={12} className="inline" /> : <TrendingDown size={12} className="inline" />}{" "}
      {up ? "+" : ""}
      {pct.toFixed(1)}% <span className="text-zinc-500">{label}</span>
    </span>
  );
}

function Centered({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full items-center justify-center text-sm text-zinc-500">{children}</div>
  );
}
