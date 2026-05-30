import { Section, Card, SourceLink } from "./Section";
import { data, SEC_URL } from "../data";
import { Crown } from "lucide-react";

export function Management() {
  const musk = data.management.musk_ownership;
  const comp = data.management.comp_2025;
  return (
    <Section
      id="management"
      eyebrow="Section 10 · Who's in charge"
      title="Management, ownership, and compensation"
      blurb="Musk has held a $54,080 base salary unchanged since 2019. He also has 85% of the voting power."
      sourceUrl={SEC_URL}
      sourceLabel="Management · Executive Compensation · Security Ownership"
    >
      <div className="grid gap-5 lg:grid-cols-12">
        <Card className="relative overflow-hidden lg:col-span-5 bg-gradient-to-br from-amber-500/[0.08] via-zinc-900/60 to-zinc-950/80">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-300/80">
            <Crown size={14} /> Voting control
          </div>
          <h3 className="mt-2 text-2xl font-semibold">Elon Musk's stake (pre-offering)</h3>

          <div className="mt-6">
            <div className="flex items-baseline justify-between text-xs text-zinc-400">
              <span>Voting power</span>
              <span className="font-mono tabular text-amber-200">{musk.combined_voting_power_pct}%</span>
            </div>
            <div className="mt-1 h-3 overflow-hidden rounded-full bg-zinc-900">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-amber-200"
                style={{ width: `${musk.combined_voting_power_pct}%` }}
              />
            </div>
          </div>

          <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
            <Row k="Class A held" v={`${musk.class_a_shares_millions}M`} />
            <Row k="Class A %" v={`${musk.class_a_pct}%`} />
            <Row k="Class B held" v={`${musk.class_b_shares_millions.toLocaleString()}M`} />
            <Row k="Class B %" v={`${musk.class_b_pct}%`} />
          </dl>

          <p className="mt-5 text-xs text-zinc-500">
            Class B holders, voting separately, elect 51% of authorized directors. Removing
            Mr. Musk from CEO/Chairman roles requires a majority of total voting power.
          </p>
        </Card>

        <Card className="lg:col-span-7">
          <h3 className="text-lg font-semibold">Named executive compensation, 2025</h3>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-xs uppercase tracking-wider text-zinc-500">
                <tr className="border-b border-zinc-800">
                  <th className="py-2 pr-3">Name</th>
                  <th className="py-2 pr-3 text-right">Salary</th>
                  <th className="py-2 pr-3 text-right">Stock</th>
                  <th className="py-2 pr-3 text-right">Options</th>
                  <th className="py-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="text-zinc-200">
                {comp.map((c) => (
                  <tr key={c.name} className="border-b border-zinc-900/70 last:border-0">
                    <td className="py-3 pr-3">{c.name}</td>
                    <td className="py-3 pr-3 text-right font-mono tabular">${c.salary.toLocaleString()}</td>
                    <td className="py-3 pr-3 text-right font-mono tabular text-zinc-400">
                      {c.stock_awards ? `$${(c.stock_awards / 1e6).toFixed(2)}M` : "—"}
                    </td>
                    <td className="py-3 pr-3 text-right font-mono tabular text-zinc-400">
                      {c.options ? `$${(c.options / 1e6).toFixed(2)}M` : "—"}
                    </td>
                    <td className="py-3 text-right font-mono tabular text-cyan-300">
                      ${(c.total / 1e6).toFixed(2)}M
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-zinc-500">
            Musk's salary has been unchanged since 2019, originally pegged to California's
            minimum exempt salary. He received no 2025 equity grants — his stake is
            historic.{" "}
            <SourceLink href={SEC_URL}>Executive Compensation</SourceLink>
          </p>
        </Card>

        <Card className="lg:col-span-12">
          <h3 className="mb-3 text-lg font-semibold">Board & executive officers</h3>
          <div className="grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
            {data.management.team.map((p) => (
              <div
                key={p.name}
                className="flex items-baseline justify-between gap-3 rounded-lg border border-zinc-800/70 px-4 py-3"
              >
                <div>
                  <div className="text-zinc-100">{p.name}</div>
                  <div className="text-[11px] text-zinc-500">{p.role}</div>
                </div>
                <span className="font-mono text-xs text-zinc-500 tabular">{p.age}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Section>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <>
      <dt className="text-zinc-500">{k}</dt>
      <dd className="text-right font-mono text-zinc-100 tabular">{v}</dd>
    </>
  );
}
