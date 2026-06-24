import { Section, Card, SourceLink } from "./Section";
import { data, SEC_URL } from "../data";
import { Coins } from "lucide-react";

export function UseOfProceeds() {
  return (
    <Section
      id="use"
      eyebrow="Section 09 · Where the money goes"
      title="Use of proceeds"
      blurb="By contract, the first $20B of net proceeds was earmarked to repay the bridge loan. The rest funds the long-term thesis."
      sourceUrl={SEC_URL}
      sourceLabel="Use of Proceeds (p. 67)"
    >
      <div className="grid gap-5 lg:grid-cols-12">
        <Card className="lg:col-span-7">
          <ol className="space-y-3">
            {data.use_of_proceeds.map((u, i) => (
              <li
                key={i}
                className="flex items-start gap-4 rounded-xl border border-zinc-800/70 bg-zinc-950/40 p-4"
              >
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-cyan-500/15 font-mono text-xs text-cyan-300">
                  {i + 1}
                </span>
                <span className="text-sm leading-relaxed text-zinc-200">{u}</span>
              </li>
            ))}
          </ol>
        </Card>

        <Card className="lg:col-span-5 bg-gradient-to-br from-red-500/[0.07] via-zinc-900/60 to-zinc-950/80">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-red-300">
            <Coins size={14} /> Bridge loan — non-negotiable
          </div>
          <h3 className="mt-2 text-2xl font-semibold">$20.0B mandatory repayment</h3>
          <p className="mt-3 text-sm text-zinc-400">
            Net proceeds of the IPO were required by covenant to repay the SpaceX
            Bridge Loan — earmarked to clear it ahead of its{" "}
            <span className="text-zinc-200">Sept 2, 2027</span> maturity.
          </p>
          <div className="mt-5 grid grid-cols-2 gap-3 text-center text-sm">
            <Mini label="Bridge loan" value="$20.0B" />
            <Mini label="Other financings" value="$9.1B" />
            <Mini label="Credit facility cap" value="$5.0B" />
            <Mini label="Total LT debt" value="$29.1B" />
          </div>
          <p className="mt-4 text-xs text-zinc-500">
            All figures as of Mar 31, 2026.{" "}
            <SourceLink href={SEC_URL}>Capitalization (pp. 69-70)</SourceLink>
          </p>
        </Card>
      </div>
    </Section>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-zinc-950/50 px-2 py-3">
      <div className="text-xl font-semibold tabular text-red-300">{value}</div>
      <div className="mt-1 text-[10px] uppercase tracking-wider text-zinc-500">{label}</div>
    </div>
  );
}
