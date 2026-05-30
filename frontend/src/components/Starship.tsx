import { Section, Card, SourceLink } from "./Section";
import { data, SEC_URL } from "../data";
import { Flame, Rocket, DollarSign } from "lucide-react";

export function Starship() {
  return (
    <Section
      id="starship"
      eyebrow="Section 06 · The bet"
      title="Starship: the entire growth story rides on one vehicle"
      blurb='"Our ability to execute our growth strategy is highly dependent on Starship." — S-1 Risk Factors'
      sourceUrl={SEC_URL}
      sourceLabel="Risk Factors · Business — Space"
    >
      <div className="grid gap-5 lg:grid-cols-12">
        <Card className="relative overflow-hidden lg:col-span-7">
          <div className="absolute inset-0 -z-0 opacity-20 grid-bg" />
          <div className="relative">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-orange-300/80">
              <Flame size={14} /> Flight 12 · next milestone
            </div>
            <h3 className="mt-3 text-2xl font-semibold">
              {data.starship.flight_tests_executed} flight tests so far.
              <br />
              <span className="bg-gradient-to-r from-orange-300 to-amber-200 bg-clip-text text-transparent">
                The next one debuts next-gen Starship + Super Heavy.
              </span>
            </h3>
            <p className="mt-3 max-w-xl text-sm text-zinc-400">
              First payload to orbit is targeted for <span className="text-zinc-200">H2 2026</span>{" "}
              from a newly designed pad at Starbase. Per the prospectus, Starship V3 targets{" "}
              <span className="text-zinc-200">100 metric tons</span> to orbit fully reusable,
              with future generations aiming to double that.
            </p>

            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              <Spec label="Payload to LEO" value="100 t" sub="V3, fully reusable" />
              <Spec label="Cost reduction goal" value="99%" sub="vs. historical avg." />
              <Spec label="Turnaround" value="Hours" sub="Multiple launches/day/pad" />
            </div>
          </div>
        </Card>

        <Card className="lg:col-span-5">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-400">
            <DollarSign size={14} /> What it's costing right now
          </div>
          <h3 className="mt-2 text-xl font-semibold">R&D run-rate</h3>
          <div className="mt-5 space-y-4">
            <Bar
              label="FY2025 Starship R&D (Space segment)"
              value="$3.00B"
              pct={100}
              color="bg-amber-400"
            />
            <Bar
              label="Q1 2026 Starship R&D"
              value="$930M"
              pct={31}
              color="bg-orange-400"
            />
            <Bar
              label="FY2025 R&D growth YoY"
              value="+150%"
              pct={150 / 1.6}
              color="bg-red-400"
            />
          </div>
          <p className="mt-4 text-xs text-zinc-500">
            The cost reduction is genuine; the delay risk is too. Per the S-1, Falcon
            cannot deploy V3 or V2-mobile satellites — so any Starship slip flows
            straight into the Starlink growth story.{" "}
            <SourceLink href={SEC_URL}>Read the risk factor</SourceLink>
          </p>
        </Card>

        <Card className="lg:col-span-12 bg-gradient-to-r from-orange-500/[0.07] via-zinc-900/60 to-zinc-950/80">
          <div className="flex items-start gap-4">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-orange-500/20 text-orange-300">
              <Rocket size={20} />
            </span>
            <div>
              <h3 className="text-lg font-semibold">Why Starship matters financially</h3>
              <ul className="mt-3 space-y-2 text-sm text-zinc-300">
                <li>
                  <span className="text-amber-300">Starlink V3:</span> 60 satellites per Starship vs. ~20 Falcon launches needed for equivalent capacity.
                </li>
                <li>
                  <span className="text-amber-300">NSSL / NASA:</span> Starship is NASA's Human Landing System for Artemis.
                </li>
                <li>
                  <span className="text-amber-300">Orbital AI compute:</span> Long-term goal of 100 GW of compute in orbit; only Starship-class economics make it plausible.
                </li>
                <li>
                  <span className="text-amber-300">Mars / Moon:</span> Stated mission and use-of-proceeds anchor — the entire long-term thesis.
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </Section>
  );
}

function Spec({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-lg border border-zinc-800/70 bg-zinc-950/50 px-3 py-4">
      <div className="text-2xl font-semibold tabular text-orange-300">{value}</div>
      <div className="mt-1 text-[10px] uppercase tracking-widest text-zinc-500">{label}</div>
      <div className="mt-1 text-[10px] text-zinc-600">{sub}</div>
    </div>
  );
}

function Bar({ label, value, pct, color }: { label: string; value: string; pct: number; color: string }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-xs text-zinc-400">{label}</span>
        <span className="font-mono text-sm text-zinc-100 tabular">{value}</span>
      </div>
      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-zinc-900">
        <div className={`h-full ${color}`} style={{ width: `${Math.min(pct, 100)}%` }} />
      </div>
    </div>
  );
}
