import { Section, Card, SourceLink } from "./Section";
import { data, SEC_URL, AMENDMENT_URL, fmtDate } from "../data";
import { Vote, Lock, Building2, Coins, Banknote, AlertTriangle, Tag, CalendarClock, LineChart } from "lucide-react";

export function IPOMechanics() {
  const p = data.ipo.pricing;
  const t = data.ipo.expected_timeline;
  const io = data.ipo.index_outlook;
  return (
    <Section
      id="ipo"
      eyebrow="Section 02 · How this offering was structured"
      title="The mechanics, in plain English"
      blurb="Public capital — but private-style control. The terms that took SpaceX public, in plain English. Pricing below is from S-1/A Amendment No. 2 (June 3, 2026)."
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
              <span className="text-zinc-100 tabular">{(p.shares_offered / 1e6).toFixed(1)}M shares</span>{" "}
              of Class A at{" "}
              <span className="text-emerald-300 tabular">${p.price_per_share_usd.toFixed(2)}</span> —
              roughly <span className="text-zinc-100 tabular">${p.gross_proceeds_usd_billions}B</span> in gross
              proceeds. That implied a{" "}
              <span className="text-emerald-300 tabular">~${p.implied_ipo_valuation_usd_trillions}T</span>{" "}
              fully-diluted valuation at IPO.{" "}
              <SourceLink href={AMENDMENT_URL}>S-1/A No. 2 — The Offering</SourceLink>
            </>
          }
        />

        <MechanicCard
          icon={<CalendarClock size={18} />}
          title="Key dates"
          tone="from-cyan-500/15"
          body={
            <>
              The roadshow opened{" "}
              <span className="text-zinc-100">{fmtDate(t.roadshow_start)}</span>. The final price was
              set on{" "}
              <span className="text-cyan-300">{fmtDate(t.pricing_date)}</span>, and{" "}
              <span className="font-mono text-cyan-300">{data.ipo.ticker}</span> began
              trading on {t.exchange} on{" "}
              <span className="text-cyan-300">{fmtDate(t.trading_start)}</span> (settled{" "}
              {fmtDate(t.settlement_date)}).{" "}
              <SourceLink href={AMENDMENT_URL}>IPO factsheet · offer timetable</SourceLink>
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
              SpaceX is a <span className="text-zinc-100">"controlled company"</span>{" "}
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
              pricing — so the lock-up runs into{" "}
              <span className="text-zinc-100">{fmtDate("2026-12-08")}</span>. The underwriters
              can release early, and a "directed share program" of employees is exempt.
            </>
          }
        />

        <MechanicCard
          icon={<Coins size={18} />}
          title="Ticker & listing"
          tone="from-cyan-500/15"
          body={
            <>
              Class A common stock trades as{" "}
              <span className="font-mono text-cyan-300">{data.ipo.ticker}</span> on{" "}
              {data.ipo.exchange} — listed dually on Nasdaq's new Texas venue.
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
              By contract, net IPO proceeds were earmarked to repay the{" "}
              <span className="text-red-300">$20B SpaceX Bridge Loan</span> first — ahead of its
              Sept 2, 2027 maturity.{" "}
              <SourceLink href={SEC_URL}>Use of Proceeds</SourceLink>
            </>
          }
        />
      </div>

      <Card className="mt-6 bg-gradient-to-br from-indigo-500/[0.06] via-zinc-900/60 to-zinc-950/80">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-indigo-300/80">
            <LineChart size={14} /> Index outlook
          </div>
          <span className="rounded-full border border-zinc-700/60 px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest text-zinc-500">
            Our analysis · not the S-1
          </span>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <IndexRow
            name="Nasdaq-100"
            status={io.nasdaq_100.status}
            estimate={io.nasdaq_100.estimate}
            detail={io.nasdaq_100.detail}
            href={io.nasdaq_100.source_url}
            tone="text-emerald-300"
          />
          <IndexRow
            name="S&P 500"
            status={io.sp_500.status}
            estimate={io.sp_500.estimate}
            detail={io.sp_500.detail}
            href={io.sp_500.source_url}
            tone="text-amber-300"
          />
        </div>
        <p className="mt-4 text-[11px] text-zinc-500">{io.disclaimer}</p>
      </Card>

      <div className="mt-6 rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] p-5 text-sm text-amber-100/80">
        <strong className="text-amber-200">Translation: </strong> Your shares get a
        cashflow claim and a public price, but very little governance leverage. If you don't
        believe in Elon Musk's stewardship, this is not the security for you.
      </div>
    </Section>
  );
}

function IndexRow({
  name,
  status,
  estimate,
  detail,
  href,
  tone,
}: {
  name: string;
  status: string;
  estimate: string;
  detail: string;
  href: string;
  tone: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-800/70 bg-zinc-950/40 p-4">
      <div className="flex items-baseline justify-between">
        <h4 className="font-mono text-sm font-semibold text-zinc-100">{name}</h4>
        <span className={`text-xs font-semibold ${tone}`}>{status}</span>
      </div>
      <div className="mt-1 text-[11px] uppercase tracking-wider text-zinc-500">{estimate}</div>
      <p className="mt-2 text-xs leading-relaxed text-zinc-400">{detail}</p>
      <div className="mt-2">
        <SourceLink href={href}>Index methodology</SourceLink>
      </div>
    </div>
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
