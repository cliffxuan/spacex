import { useEffect, useState } from "react";

export type Filing = {
  form: string;
  filed: string;
  description: string;
  url: string;
};

export type FilingsPayload = {
  company: string | null;
  cik: string;
  source: string;
  filings: Filing[];
  updated: number;
};

// Latest EDGAR submissions, proxied by the backend (10-min server cache), so
// polling slowly from the client is plenty.
export function useFilings(pollMs = 600_000) {
  const [data, setData] = useState<FilingsPayload | null>(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    let alive = true;
    const load = () =>
      fetch("/api/filings")
        .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
        .then((j: FilingsPayload) => {
          if (alive) {
            setData(j);
            setErr(false);
          }
        })
        .catch(() => alive && setErr(true));
    load();
    const id = setInterval(load, pollMs);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, [pollMs]);

  return { data, err };
}
