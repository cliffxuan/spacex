import { useState } from "react";
import { Section, Card, SourceLink } from "./Section";
import { data, SEC_URL } from "../data";
import { AlertTriangle, ChevronRight } from "lucide-react";

const HEAT: Record<string, string> = {
  Execution: "border-red-500/40 bg-red-500/[0.06]",
  "Musk Dependency": "border-amber-500/40 bg-amber-500/[0.06]",
  Litigation: "border-red-500/40 bg-red-500/[0.06]",
  Indebtedness: "border-amber-500/40 bg-amber-500/[0.06]",
  "Customer Concentration": "border-amber-500/40 bg-amber-500/[0.06]",
  "Launch Failures": "border-amber-500/40 bg-amber-500/[0.06]",
  "Regulatory — FAA": "border-amber-500/40 bg-amber-500/[0.06]",
  "Regulatory — FCC": "border-amber-500/40 bg-amber-500/[0.06]",
  "AI Regulation": "border-amber-500/40 bg-amber-500/[0.06]",
  Competition: "border-zinc-700 bg-zinc-900/30",
  Geopolitics: "border-zinc-700 bg-zinc-900/30",
  Scale: "border-zinc-700 bg-zinc-900/30",
  "Forum Restrictions": "border-zinc-700 bg-zinc-900/30",
  "Supply Chain": "border-zinc-700 bg-zinc-900/30",
  Talent: "border-zinc-700 bg-zinc-900/30",
  "AI Integration": "border-zinc-700 bg-zinc-900/30",
  "Unproven Markets": "border-zinc-700 bg-zinc-900/30",
  Environment: "border-zinc-700 bg-zinc-900/30",
};

export function Risks() {
  const [active, setActive] = useState(0);
  const r = data.risk_factors[active];

  return (
    <Section
      id="risks"
      eyebrow="Section 08 · What could go wrong"
      title="The risk factors, sorted by severity"
      blurb="The S-1's Risk Factors section runs ~40 pages. These are the eighteen worth knowing."
      sourceUrl={SEC_URL}
      sourceLabel="Risk Factors"
    >
      <div className="grid gap-5 lg:grid-cols-12">
        <Card className="lg:col-span-5 !p-2">
          <div className="max-h-[28rem] overflow-y-auto scrollbar-thin">
            {data.risk_factors.map((rf, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`flex w-full items-center justify-between gap-2 border-b border-zinc-900/70 px-4 py-3 text-left text-sm transition last:border-b-0 ${
                  active === i ? "bg-zinc-900/70 text-zinc-100" : "text-zinc-400 hover:bg-zinc-900/40 hover:text-zinc-200"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <span
                    className={`h-2 w-2 shrink-0 rounded-full ${
                      HEAT[rf.category]?.includes("red") ? "bg-red-400" : HEAT[rf.category]?.includes("amber") ? "bg-amber-400" : "bg-zinc-500"
                    }`}
                  />
                  {rf.category}
                </span>
                <ChevronRight
                  size={14}
                  className={`transition ${active === i ? "translate-x-1 text-cyan-300" : "opacity-40"}`}
                />
              </button>
            ))}
          </div>
        </Card>

        <Card className={`lg:col-span-7 border ${HEAT[r.category] || ""}`}>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-400">
            <AlertTriangle size={14} className="text-amber-300" />
            Risk · {active + 1} / {data.risk_factors.length}
          </div>
          <h3 className="mt-2 text-2xl font-semibold">{r.category}</h3>
          <p className="mt-4 text-base leading-relaxed text-zinc-300">{r.summary}</p>
          <div className="mt-6 text-xs text-zinc-500">
            Full disclosure in{" "}
            <SourceLink href={SEC_URL}>S-1 · Risk Factors</SourceLink>
          </div>
        </Card>
      </div>
    </Section>
  );
}
