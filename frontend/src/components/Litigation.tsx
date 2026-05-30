import { Section, Card, SourceLink } from "./Section";
import { data, SEC_URL } from "../data";
import { Scale } from "lucide-react";

export function Litigation() {
  return (
    <Section
      id="litigation"
      eyebrow="Section 11 · Legal exposure"
      title="Material litigation"
      blurb="$530M accrued for probable losses at year-end 2025. Several open matters are large and unpredictable."
      sourceUrl={SEC_URL}
      sourceLabel="Legal Proceedings · Note 17"
    >
      <div className="grid gap-3 md:grid-cols-2">
        {data.litigation.map((l) => (
          <Card key={l.name} className="bg-gradient-to-br from-zinc-900/80 to-zinc-950/80">
            <div className="flex items-start gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-red-500/15 text-red-300">
                <Scale size={16} />
              </span>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-zinc-100">{l.name}</h3>
                {"fine" in l && l.fine && (
                  <div className="mt-1 font-mono text-xs text-red-300">{l.fine}</div>
                )}
                <p className="mt-2 text-sm text-zinc-400">{l.status}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <p className="mt-6 text-sm text-zinc-500">
        Full schedule and accruals in{" "}
        <SourceLink href={SEC_URL}>Notes 16 / 17 of the financial statements</SourceLink>.
      </p>
    </Section>
  );
}
