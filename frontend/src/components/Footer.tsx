import { ExternalLink, FileText, Database, Globe } from "lucide-react";
import { data } from "../data";

export function Footer() {
  return (
    <footer className="border-t border-zinc-900 bg-[#04050a]">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="font-mono text-xs tracking-[0.3em] text-cyan-300">
              ALGOENTROPY · SPCX
            </div>
            <h3 className="mt-3 text-2xl font-semibold">The SpaceX IPO, charted.</h3>
            <p className="mt-2 max-w-md text-sm text-zinc-500">
              Built from the primary source: SEC Form S-1 filed by Space Exploration
              Technologies Corp. on May 20, 2026. Every number on this page deep-links to
              its disclosure.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
              Primary documents
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <FootLink
                  href={data.filing_metadata.source_url}
                  icon={<FileText size={14} />}
                  label="S-1 prospectus (full HTML)"
                />
              </li>
              <li>
                <FootLink
                  href={data.filing_metadata.filing_index_url}
                  icon={<Database size={14} />}
                  label="SEC EDGAR filing index"
                />
              </li>
              <li>
                <FootLink
                  href={data.filing_metadata.latest_amendment.source_url}
                  icon={<FileText size={14} />}
                  label={`S-1/A Amendment No. ${data.filing_metadata.latest_amendment.amendment_no} (pricing)`}
                />
              </li>
              <li>
                <FootLink
                  href={data.filing_metadata.latest_amendment.filing_index_url}
                  icon={<Database size={14} />}
                  label={`S-1/A Amendment No. ${data.filing_metadata.latest_amendment.amendment_no} index`}
                />
              </li>
              <li>
                <FootLink
                  href="https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001181412&type=S-1&dateb=&owner=include&count=40"
                  icon={<Database size={14} />}
                  label="All SpaceX S-1 amendments"
                />
              </li>
              <li>
                <FootLink
                  href={`https://www.sec.gov/cgi-bin/viewer?action=view&cik=1181412&accession_number=${data.filing_metadata.accession_number}&xbrl_type=v`}
                  icon={<Database size={14} />}
                  label="Interactive XBRL viewer"
                />
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
              Filing metadata
            </h4>
            <dl className="mt-3 space-y-1.5 text-sm text-zinc-500">
              <Row k="Issuer" v="Space Exploration Technologies Corp." />
              <Row k="CIK" v={data.filing_metadata.cik} />
              <Row k="Accession" v={data.filing_metadata.accession_number} />
              <Row k="Filed" v="2026-05-20" />
              <Row k="Priced S-1/A" v={data.filing_metadata.latest_amendment.filed_date} />
              <Row k="HQ" v="Starbase, Texas" />
            </dl>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-zinc-900 pt-6 text-xs text-zinc-600">
          <div>
            Not investment advice. S-1/A Amendment No. 2 pricing — figures subject to final effectiveness and revision.
            Cross-check the latest SEC filings before acting on any number.
          </div>
          <a
            href="https://algoentropy.com"
            className="inline-flex items-center gap-1 hover:text-zinc-300"
          >
            <Globe size={12} />
            algoentropy.com
            <ExternalLink size={10} />
          </a>
        </div>
      </div>
    </footer>
  );
}

function FootLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2 text-zinc-400 transition hover:text-cyan-300"
    >
      <span className="text-zinc-600 group-hover:text-cyan-300">{icon}</span>
      {label}
      <ExternalLink size={11} className="opacity-50 group-hover:opacity-100" />
    </a>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt>{k}</dt>
      <dd className="text-right font-mono text-zinc-400 tabular">{v}</dd>
    </div>
  );
}
