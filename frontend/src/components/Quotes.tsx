import { Section } from "./Section";
import { data } from "../data";
import { Quote as QuoteIcon } from "lucide-react";

export function Quotes() {
  return (
    <Section
      id="quotes"
      eyebrow="Interlude"
      title="The S-1, in their own words"
      blurb="Quotes pulled verbatim from the prospectus."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {data.quotes.map((q, i) => (
          <figure
            key={i}
            className="relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 p-6"
          >
            <QuoteIcon size={20} className="text-cyan-500/40" />
            <blockquote className="mt-3 text-base leading-relaxed text-zinc-200">
              "{q.text}"
            </blockquote>
            <figcaption className="mt-3 font-mono text-xs uppercase tracking-widest text-zinc-500">
              — {q.speaker}
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
