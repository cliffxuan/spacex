import { Section, Card, SourceLink } from "./Section";
import { data, SEC_URL, AMENDMENT_URL } from "../data";
import { Target } from "lucide-react";

export function Valuation() {
  const tam = data.valuation.tam;
  const p = data.ipo.pricing;
  return (
    <Section
      id="valuation"
      eyebrow="Section 12 · The big number"
      title="The $28.5 trillion TAM claim"
      blurb={`"We believe we have identified the largest actionable total addressable market in human history." Take with appropriate sodium chloride.`}
      sourceUrl={SEC_URL}
      sourceLabel="Our Market Opportunity"
    >
      <div className="grid gap-5 lg:grid-cols-12">
        <Card className="lg:col-span-7 relative overflow-hidden bg-gradient-to-br from-indigo-500/10 via-zinc-900/60 to-zinc-950/80">
          <div className="absolute inset-0 grid-bg opacity-10" />
          <div className="relative">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-indigo-300">
              <Target size={14} /> Total addressable market — SpaceX's framing
            </div>
            <div className="mt-3 text-7xl font-semibold tabular bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent">
              ${tam.total_trillions}T
            </div>
            <p className="mt-2 text-sm text-zinc-400 max-w-md">
              Excludes China and Russia. Most of it is AI; most of the AI is "enterprise
              applications" — i.e., business productivity software writ very large.
            </p>

            <div className="mt-6 space-y-3">
              <TamBar
                label="AI — enterprise applications"
                value={`$${tam.ai_enterprise_trillions}T`}
                pct={(tam.ai_enterprise_trillions / tam.total_trillions) * 100}
                color="bg-indigo-400"
              />
              <TamBar
                label="AI — infrastructure"
                value={`$${tam.ai_infrastructure_trillions}T`}
                pct={(tam.ai_infrastructure_trillions / tam.total_trillions) * 100}
                color="bg-indigo-300"
              />
              <TamBar
                label="Connectivity"
                value={`$${tam.connectivity_trillions}T`}
                pct={(tam.connectivity_trillions / tam.total_trillions) * 100}
                color="bg-cyan-400"
              />
              <TamBar
                label="AI — consumer"
                value={`$${(tam.ai_consumer_billions / 1000).toFixed(2)}T`}
                pct={(tam.ai_consumer_billions / 1000 / tam.total_trillions) * 100}
                color="bg-indigo-500"
              />
              <TamBar
                label="AI — advertising"
                value={`$${(tam.ai_advertising_billions / 1000).toFixed(2)}T`}
                pct={(tam.ai_advertising_billions / 1000 / tam.total_trillions) * 100}
                color="bg-indigo-600"
              />
              <TamBar
                label="Space"
                value={`$${(tam.space_billions / 1000).toFixed(2)}T`}
                pct={(tam.space_billions / 1000 / tam.total_trillions) * 100}
                color="bg-orange-400"
              />
            </div>
          </div>
        </Card>

        <div className="space-y-5 lg:col-span-5">
          <Card className="bg-gradient-to-br from-emerald-500/[0.07] via-zinc-900/60 to-zinc-950/80">
            <div className="text-xs uppercase tracking-widest text-emerald-300/80">
              From private marks to a public price
            </div>
            <h3 className="mt-2 text-lg font-semibold">The IPO repriced everything</h3>
            <dl className="mt-4 space-y-3 text-sm">
              <Row k="Class C 409A — May 2025" v={`$${data.valuation.class_c_409a_may_2025.toFixed(2)}`} />
              <Row k="Class C 409A — Oct 2025" v={`$${data.valuation.class_c_409a_oct_2025.toFixed(2)}`} />
              <Row k="IPO price — Jun 2026 (S-1/A)" v={`$${p.price_per_share_usd.toFixed(2)}`} />
              <Row k="Shares offered" v={`${(p.shares_offered / 1e6).toFixed(0)}M`} />
              <Row k="Gross proceeds" v={`~$${p.gross_proceeds_usd_billions}B`} />
              <Row k="Total shares outstanding" v={`${(p.total_shares_outstanding / 1e9).toFixed(2)}B`} />
              <Row k="Implied IPO valuation" v={`~$${p.implied_ipo_valuation_usd_trillions}T`} />
            </dl>
            <p className="mt-3 text-xs text-zinc-500">
              Amendment No. 2 (June 3, 2026) set the price at{" "}
              <span className="text-zinc-300">${p.price_per_share_usd.toFixed(2)}</span> — vs. the
              ~${data.valuation.implied_private_valuation_oct_2025_usd_billions}B illustrative private
              mark this site originally carried. At {(p.total_shares_outstanding / 1e9).toFixed(2)}B shares
              that's a ~${p.implied_ipo_valuation_usd_trillions}T fully-diluted valuation.{" "}
              <SourceLink href={AMENDMENT_URL}>S-1/A No. 2 — The Offering</SourceLink>
            </p>
          </Card>
          <Card className="bg-gradient-to-br from-cyan-500/[0.06] via-zinc-900/60 to-zinc-950/80">
            <h3 className="text-lg font-semibold">Optional Cursor acquisition</h3>
            <p className="mt-2 text-sm text-zinc-400">
              The S-1 discloses an option to acquire <span className="text-zinc-100">Anysphere (Cursor)</span> at an implied{" "}
              <span className="text-cyan-300 tabular">${data.valuation.cursor_implied_billions}B</span>{" "}
              equity value. Termination fee: $1.5B option + $8.5B deferred compute.{" "}
              <SourceLink href={SEC_URL}>Related-party / Strategic transactions</SourceLink>
            </p>
          </Card>
        </div>
      </div>
    </Section>
  );
}

function TamBar({ label, value, pct, color }: { label: string; value: string; pct: number; color: string }) {
  return (
    <div>
      <div className="flex items-baseline justify-between text-xs">
        <span className="text-zinc-300">{label}</span>
        <span className="font-mono tabular text-zinc-400">{value}</span>
      </div>
      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-zinc-900">
        <div className={`h-full ${color}`} style={{ width: `${Math.max(pct, 0.5)}%` }} />
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between border-b border-zinc-800/60 pb-2 last:border-0">
      <dt className="text-zinc-500">{k}</dt>
      <dd className="font-mono text-zinc-100 tabular">{v}</dd>
    </div>
  );
}
