import { Section, Card, SourceLink } from "./Section";
import { data, SEC_URL, AMENDMENT_URL } from "../data";
import { Vote, Lock, Building2, Coins, Banknote, AlertTriangle, Tag } from "lucide-react";

export function IPOMechanics() {
  const p = data.ipo.pricing;
  return (
    <Section
      id="ipo"
      eyebrow="Section 02 · How this offering is structured"
      title="The mechanics, in plain English"
      blurb="Public capital — but private-style control. Read this before you read the rest. Pricing terms below are from S-1/A Amendment No. 2 (June 3, 2026)."
      sourceUrl={AMENDMENT_URL}
      sourceLabel="S-1/A No. 2 · The Offering · Description of Capital Stock"
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <MechanicCard
          icon={<Tag size={18} />}
          title="Priced at $135.00 / share"
          tone="from-emerald-500/15"
          body={
            <>
              The amendment set the offering at{" "}
              <span className="text-zinc-100 tabular">{(p.shares_offered / 1e6).toFixed(0)}M shares</span>{" "}
              of Class A at{" "}
              <span className="text-emerald-300 tabular">${p.price_per_share_usd.toFixed(2)}</span> —
              roughly <span className="text-zinc-100 tabular">${p.gross_proceeds_usd_billions}B</span> in gross
              proceeds. That implies a{" "}
              <span className="text-emerald-300 tabular">~${p.implied_ipo_valuation_usd_trillions}T</span>{" "}
              fully-diluted valuation.{" "}
              <SourceLink href={AMENDMENT_URL}>S-1/A No. 2 — The Offering</SourceLink>
            </>
          }
        />

        <MechanicCard
          icon={<Vote size={18} />}
          title="Dual-class with 10× votes"
          tone="from-amber-500/15"
          body={
            <>
              You buy <span className="text-zinc-100">Class A</span> at{" "}
              <span className="text-zinc-100">1 vote / share</span>. Insiders hold{" "}
              <span className="text-zinc-100">Class B</span> at{" "}
              <span className="text-zinc-100">10 votes / share</span>. Voting separately,
              Class B holders elect{" "}
              <span className="text-amber-300">
                {data.ipo.dual_class_class_b_director_election_pct}% of the board
              </span>
              .
            </>
          }
        />

        <MechanicCard
          icon={<Building2 size={18} />}
          title="Controlled company"
          tone="from-amber-500/15"
          body={
            <>
              SpaceX will be a <span className="text-zinc-100">"controlled company"</span>{" "}
              under Nasdaq rules — exempted from several governance requirements (independent
              compensation committee, etc.). Musk personally controls{" "}
              <span className="text-amber-300">
                {data.ipo.musk_voting_power_pre_offering_pct}%
              </span>{" "}
              of voting power pre-offering.
            </>
          }
        />

        <MechanicCard
          icon={<Lock size={18} />}
          title="180-day lock-up"
          tone="from-cyan-500/15"
          body={
            <>
              Insiders cannot sell for{" "}
              <span className="text-zinc-100">{data.ipo.lock_up_days} days</span> after
              pricing — though the underwriters can release early, and a "directed share
              program" of employees is exempt.
            </>
          }
        />

        <MechanicCard
          icon={<Coins size={18} />}
          title="Ticker & listing"
          tone="from-cyan-500/15"
          body={
            <>
              Class A common stock will trade as{" "}
              <span className="font-mono text-cyan-300">{data.ipo.ticker}</span> on{" "}
              {data.ipo.exchange}. The filing notes the offering will be listed dually on
              Nasdaq's new Texas venue.
            </>
          }
        />

        <MechanicCard
          icon={<Banknote size={18} />}
          title="No dividends"
          tone="from-zinc-500/10"
          body={
            <>
              Management does not anticipate paying cash dividends. The SpaceX credit
              agreement also includes covenants restricting dividends.
            </>
          }
        />

        <MechanicCard
          icon={<AlertTriangle size={18} />}
          title="Mandatory debt repayment"
          tone="from-red-500/15"
          body={
            <>
              By contract, net IPO proceeds must first repay the{" "}
              <span className="text-red-300">$20B SpaceX Bridge Loan</span> — which matures
              Sept 2, 2027.{" "}
              <SourceLink href={SEC_URL}>Use of Proceeds</SourceLink>
            </>
          }
        />
      </div>

      <div className="mt-6 rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] p-5 text-sm text-amber-100/80">
        <strong className="text-amber-200">Translation: </strong> Your shares get a
        cashflow claim and a public price, but very little governance leverage. If you don't
        believe in Elon Musk's stewardship, this is not the security for you.
      </div>
    </Section>
  );
}

function MechanicCard({
  icon,
  title,
  body,
  tone,
}: {
  icon: React.ReactNode;
  title: string;
  body: React.ReactNode;
  tone: string;
}) {
  return (
    <Card className={`relative overflow-hidden bg-gradient-to-br ${tone} via-zinc-900/60 to-zinc-950/80`}>
      <div className="flex items-center gap-2">
        <span className="grid h-7 w-7 place-items-center rounded-md bg-zinc-900 text-zinc-200">
          {icon}
        </span>
        <h3 className="text-base font-semibold">{title}</h3>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-zinc-300">{body}</p>
    </Card>
  );
}
