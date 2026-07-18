import { type ReactNode } from "react";
import { Section, Card, Stat, SourceLink } from "./Section";
import { data, fmtDate } from "../data";
import { usePrices, pctChange } from "../usePrices";
import { useFilings } from "../useFilings";
import { CalendarClock, FileText, Gauge, ExternalLink } from "lucide-react";

const EDGAR_BROWSE_URL =
  "https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001181412&type=&dateb=&owner=include&count=40";

// Trailing-twelve-month revenue to Mar 31, 2026 ($M): FY2025 − Q1 2025 + Q1 2026,
// all from the S-1. The latest fundamentals anyone has until the first 10-Q.
const fy2025Revenue = data.financials.annual.find((a) => a.year === 2025)?.revenue ?? 0;
const q1_2025Revenue = data.financials.quarterly.find((q) => q.period === "Q1 2025")?.revenue ?? 0;
const q1_2026Revenue = data.financials.quarterly.find((q) => q.period === "Q1 2026")?.revenue ?? 0;
const TTM_REVENUE_M = fy2025Revenue - q1_2025Revenue + q1_2026Revenue;

// Add days to an ISO date (YYYY-MM-DD) in UTC, avoiding timezone drift.
const addDaysISO = (iso: string, days: number) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d + days)).toISOString().slice(0, 10);
};

const daysUntil = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return Math.ceil((Date.UTC(y, m - 1, d) - Date.now()) / 86_400_000);
};

export function Track() {
  const { data: px } = usePrices();
  const { data: fl, err: flErr } = useFilings();

  const ipo = data.ipo;
  const pricing = ipo.pricing;
  const io = ipo.index_outlook;

  const lockupDate = addDaysISO(ipo.expected_timeline.pricing_date, ipo.lock_up_days);
  const lockupDays = daysUntil(lockupDate);
  const lockedShares = pricing.total_shares_outstanding - pricing.shares_offered;

  const stock = px?.latest.stock ?? null;
  const shares = px?.shares_outstanding ?? pricing.total_shares_outstanding;
  const marketCapT = stock != null ? (stock * shares) / 1e12 : null;
  const vsIpo = pctChange(stock, px?.ipo_price ?? pricing.price_per_share_usd);

  const stockPoints = (px?.series ?? []).filter(
    (p): p is { date: string; perp: number | null; stock: number } => p.stock != null,
  );
  const high = stockPoints.reduce<{ date: string; stock: number } | null>(
    (best, p) => (best == null || p.stock > best.stock ? p : best),
    null,
  );
  const offHigh = pctChange(stock, high?.stock);
  const psTTM = stock != null && TTM_REVENUE_M > 0 ? (stock * shares) / (TTM_REVENUE_M * 1e6) : null;
  const perpBasis = pctChange(px?.latest.perp ?? null, stock);

  return (
    <Section
      id="track"
      eyebrow="Live · Post-IPO watch"
      title="Tracking SPCX from here"
      blurb="The structural events that move a fresh IPO, the valuation the market is printing right now, and every new SEC filing as it lands. Live and derived figures below are not S-1 facts."
      sourceUrl={EDGAR_BROWSE_URL}
      sourceLabel="SEC EDGAR · CIK 1181412"
    >
      <div className="grid gap-5 lg:grid-cols-12">
        <Card className="lg:col-span-7">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-cyan-300/80">
              <CalendarClock size={14} /> Event calendar
            </div>
            <span className="rounded-full border border-zinc-700/60 px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest text-zinc-500">
              Our analysis · not the S-1
            </span>
          </div>
          <div className="mt-4 space-y-3">
            <EventRow
              name="Lock-up expiry"
              when={fmtDate(lockupDate)}
              chip={
                lockupDays > 0
                  ? `${lockupDays} day${lockupDays === 1 ? "" : "s"} away`
                  : "Passed"
              }
              chipTone={
                lockupDays <= 0
                  ? "border-zinc-600/60 text-zinc-400"
                  : lockupDays <= 30
                    ? "border-red-500/40 text-red-300"
                    : "border-amber-500/40 text-amber-300"
              }
            >
              {ipo.lock_up_days} days after the {fmtDate(ipo.expected_timeline.pricing_date)} pricing.
              ~{(lockedShares / 1e9).toFixed(1)}B locked shares against a{" "}
              {(pricing.shares_offered / 1e6).toFixed(0)}M-share float — the largest supply event on
              the calendar. Underwriters can release holders early.
            </EventRow>
            <EventRow
              name="First quarterly report (Q2 2026)"
              when="Expected Aug–Sep 2026"
              chip="Not yet announced"
              chipTone="border-zinc-600/60 text-zinc-400"
            >
              The first fundamental datapoint beyond the S-1 — until then, Q1 2026 (revenue $
              {(q1_2026Revenue / 1000).toFixed(1)}B) is the freshest number anyone has. Watch for the
              8-K and 10-Q in the filings feed below.
            </EventRow>
            <EventRow
              name="Nasdaq-100 · Fast Entry"
              when={io.nasdaq_100.estimate}
              chip={io.nasdaq_100.status}
              chipTone="border-emerald-500/40 text-emerald-300"
              href={io.nasdaq_100.source_url}
            >
              {io.nasdaq_100.detail}
            </EventRow>
            <EventRow
              name="S&P 500"
              when={io.sp_500.estimate}
              chip={io.sp_500.status}
              chipTone="border-amber-500/40 text-amber-300"
              href={io.sp_500.source_url}
            >
              {io.sp_500.detail}
            </EventRow>
          </div>
        </Card>

        <Card className="lg:col-span-5 bg-gradient-to-br from-emerald-500/[0.07] via-zinc-900/60 to-zinc-950/80">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-300/80">
            <Gauge size={14} /> What the market is paying
          </div>
          <div className="mt-4">
            <Stat
              label="Live market cap"
              value={marketCapT != null ? `$${marketCapT.toFixed(2)}T` : "—"}
              accent="text-emerald-300"
              sub={`${(shares / 1e9).toFixed(2)}B shares × ${
                stock != null ? `$${stock.toFixed(2)} last close` : "last close"
              }`}
            />
          </div>
          <dl className="mt-5 space-y-3 text-sm">
            <Row
              k={`IPO valuation — ${fmtDate(ipo.expected_timeline.pricing_date)}`}
              v={`$${pricing.implied_ipo_valuation_usd_trillions}T`}
              delta={vsIpo}
            />
            <Row
              k={high ? `Post-listing high — ${fmtDate(high.date)}` : "Post-listing high"}
              v={high ? `$${high.stock.toFixed(2)}` : "—"}
              delta={offHigh}
            />
            <Row
              k="Price / TTM revenue"
              v={psTTM != null ? `${psTTM.toFixed(0)}×` : "—"}
            />
            <Row
              k="Pre-IPO perp vs stock"
              v={
                px?.latest.perp != null && perpBasis != null
                  ? `$${px.latest.perp.toFixed(2)}`
                  : "—"
              }
              delta={perpBasis}
            />
          </dl>
          <p className="mt-4 text-[11px] leading-relaxed text-zinc-500">
            Derived from the live price — not filing facts. TTM revenue to Mar 31, 2026 is $
            {(TTM_REVENUE_M / 1000).toFixed(1)}B (FY2025 − Q1 2025 + Q1 2026, per the S-1). The perp
            row is Hyperliquid's third-party pre-IPO market, which should converge to the stock.
          </p>
        </Card>

        <Card className="lg:col-span-12">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-indigo-300/80">
              <FileText size={14} /> SEC filings · live from EDGAR
            </div>
            <SourceLink href={EDGAR_BROWSE_URL} className="text-xs">
              All filings on EDGAR
            </SourceLink>
          </div>
          {fl && fl.filings.length > 0 ? (
            <ul className="mt-4 divide-y divide-zinc-800/60">
              {fl.filings.map((f) => (
                <li key={f.url}>
                  <a
                    href={f.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group -mx-3 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition hover:bg-zinc-900/40"
                  >
                    <span
                      className={`min-w-16 shrink-0 rounded border px-1.5 py-0.5 text-center font-mono text-[11px] ${formTone(f.form)}`}
                    >
                      {f.form}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-zinc-300 group-hover:text-zinc-100">
                      {f.description}
                    </span>
                    <span className="shrink-0 font-mono text-xs text-zinc-500">
                      {fmtDate(f.filed)}
                    </span>
                    <ExternalLink size={12} className="shrink-0 text-zinc-600 group-hover:text-cyan-300" />
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-zinc-500">
              {flErr ? "Couldn't reach EDGAR right now. Retrying…" : "Loading filings…"}
            </p>
          )}
          <p className="mt-3 text-[11px] text-zinc-500">
            Direct from SEC EDGAR (CIK 1181412), refreshed ~every 10 minutes. Forms 3/4 are insider
            ownership disclosures — the ones to watch once the lock-up ends.
          </p>
        </Card>
      </div>
    </Section>
  );
}

function EventRow({
  name,
  when,
  chip,
  chipTone,
  href,
  children,
}: {
  name: string;
  when: string;
  chip: string;
  chipTone: string;
  href?: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-zinc-800/70 bg-zinc-950/40 p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h4 className="text-sm font-semibold text-zinc-100">{name}</h4>
        <span className={`rounded-full border px-2 py-0.5 text-[11px] font-mono ${chipTone}`}>
          {chip}
        </span>
      </div>
      <div className="mt-1 text-[11px] uppercase tracking-wider text-zinc-500">{when}</div>
      <p className="mt-2 text-xs leading-relaxed text-zinc-400">{children}</p>
      {href && (
        <div className="mt-2">
          <SourceLink href={href}>Methodology</SourceLink>
        </div>
      )}
    </div>
  );
}

function Row({ k, v, delta }: { k: string; v: string; delta?: number | null }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-zinc-800/60 pb-2 last:border-0">
      <dt className="text-zinc-500">{k}</dt>
      <dd className="flex items-baseline gap-2 font-mono text-zinc-100 tabular">
        {delta != null && (
          <span className={`text-xs ${delta >= 0 ? "text-emerald-400" : "text-red-400"}`}>
            {delta >= 0 ? "+" : ""}
            {delta.toFixed(1)}%
          </span>
        )}
        {v}
      </dd>
    </div>
  );
}

function formTone(form: string) {
  if (form.startsWith("8-K")) return "border-cyan-500/40 text-cyan-300";
  if (form.startsWith("10-")) return "border-emerald-500/40 text-emerald-300";
  if (form.startsWith("S-") || form.startsWith("424")) return "border-indigo-500/40 text-indigo-300";
  // Anchored so amendments (3/A, 4/A) match but 424B4/425 (checked above) can't.
  if (/^[345](\/A)?$/.test(form)) return "border-amber-500/40 text-amber-300";
  return "border-zinc-600/60 text-zinc-400";
}
