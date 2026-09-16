import prospectus from "./prospectus.json";
import overlay from "./prospectus_overlay_2026_09.json";

function deepMerge(base: Record<string, unknown>, patch: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = { ...base };
  for (const [k, v] of Object.entries(patch)) {
    const cur = out[k];
    if (
      v &&
      typeof v === "object" &&
      !Array.isArray(v) &&
      cur &&
      typeof cur === "object" &&
      !Array.isArray(cur)
    ) {
      out[k] = deepMerge(cur as Record<string, unknown>, v as Record<string, unknown>);
    } else if (k !== "risk_factors_unproven_markets_summary") {
      out[k] = v;
    }
  }
  return out;
}

const merged = deepMerge(
  prospectus as unknown as Record<string, unknown>,
  overlay as unknown as Record<string, unknown>,
) as typeof prospectus;

if (
  "risk_factors_unproven_markets_summary" in overlay &&
  Array.isArray((merged as { risk_factors?: { category?: string; summary?: string }[] }).risk_factors)
) {
  for (const rf of (merged as { risk_factors: { category?: string; summary?: string }[] }).risk_factors) {
    if (rf.category === "Unproven Markets") {
      rf.summary = (overlay as { risk_factors_unproven_markets_summary: string }).risk_factors_unproven_markets_summary;
    }
  }
}

export const data = merged;
export const SEC_URL = data.filing_metadata.source_url;
export const FILING_INDEX = data.filing_metadata.filing_index_url;
export const AMENDMENT_URL = data.filing_metadata.latest_amendment.source_url;
export const AMENDMENT_INDEX_URL = data.filing_metadata.latest_amendment.filing_index_url;

export const fmtUSD = (n: number, suffix = "M") => {
  if (Math.abs(n) >= 1000) return `$${(n / 1000).toFixed(1)}B`;
  return `$${n.toLocaleString()}${suffix}`;
};

export const fmtPct = (n: number, digits = 1) => `${n.toFixed(digits)}%`;

// Format an ISO date (YYYY-MM-DD) as "12 Jun 2026" without timezone drift.
export const fmtDate = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  const mon = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][m - 1];
  return `${d} ${mon} ${y}`;
};

export const fmtNum = (n: number, digits = 1) => {
  if (Math.abs(n) >= 1e9) return `${(n / 1e9).toFixed(digits)}B`;
  if (Math.abs(n) >= 1e6) return `${(n / 1e6).toFixed(digits)}M`;
  if (Math.abs(n) >= 1e3) return `${(n / 1e3).toFixed(digits)}K`;
  return n.toLocaleString();
};
