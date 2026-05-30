import type { ReactNode } from "react";
import { ExternalLink } from "lucide-react";

interface Props {
  id: string;
  eyebrow: string;
  title: string;
  blurb?: string;
  sourceUrl?: string;
  sourceLabel?: string;
  children: ReactNode;
  className?: string;
}

export function Section({ id, eyebrow, title, blurb, sourceUrl, sourceLabel, children, className = "" }: Props) {
  return (
    <section id={id} className={`scroll-mt-20 py-16 sm:py-24 ${className}`}>
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-400/80">
              {eyebrow}
            </div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              {title}
            </h2>
            {blurb && (
              <p className="mt-3 max-w-2xl text-zinc-400">{blurb}</p>
            )}
          </div>
          {sourceUrl && (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-fit items-center gap-1.5 rounded-full border border-zinc-700/70 bg-zinc-900/60 px-3 py-1.5 text-xs text-zinc-300 transition hover:border-cyan-400/40 hover:bg-zinc-800/60 hover:text-cyan-300"
            >
              {sourceLabel || "Source: S-1 filing"}
              <ExternalLink size={12} className="opacity-60 group-hover:opacity-100" />
            </a>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl border border-zinc-800/80 bg-gradient-to-b from-zinc-900/80 to-zinc-950/80 p-6 backdrop-blur ${className}`}
    >
      {children}
    </div>
  );
}

export function Stat({
  label,
  value,
  sub,
  accent = "text-zinc-100",
}: {
  label: string;
  value: ReactNode;
  sub?: ReactNode;
  accent?: string;
}) {
  return (
    <div className="flex flex-col">
      <div className="text-xs uppercase tracking-wider text-zinc-500">{label}</div>
      <div className={`mt-1 text-2xl font-semibold tabular sm:text-3xl ${accent}`}>{value}</div>
      {sub && <div className="mt-1 text-xs text-zinc-500">{sub}</div>}
    </div>
  );
}

export function SourceLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1 text-cyan-400 underline decoration-cyan-700/50 underline-offset-2 transition hover:text-cyan-300 ${className}`}
    >
      {children}
      <ExternalLink size={11} />
    </a>
  );
}
