import prospectus from "./prospectus.json";

export const data = prospectus;
export const SEC_URL = prospectus.filing_metadata.source_url;
export const FILING_INDEX = prospectus.filing_metadata.filing_index_url;
export const AMENDMENT_URL = prospectus.filing_metadata.latest_amendment.source_url;
export const AMENDMENT_INDEX_URL = prospectus.filing_metadata.latest_amendment.filing_index_url;

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
