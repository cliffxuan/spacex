import { useEffect, useState } from "react";

export type PricePoint = { date: string; perp: number | null; stock: number | null };

export type PricePayload = {
  ipo_price: number;
  listing_date: string;
  perp_source: string;
  stock_source: string;
  shares_outstanding: number;
  series: PricePoint[];
  latest: {
    perp: number | null;
    perp_prev: number | null;
    stock: number | null;
    stock_prev: number | null;
  };
  updated: number;
};

// Shared live-price feed for the hero quote card and the market chart. The
// backend caches /api/prices for ~60s, so polling from two components is cheap.
export function usePrices(pollMs = 60_000) {
  const [data, setData] = useState<PricePayload | null>(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    let alive = true;
    const load = () =>
      fetch("/api/prices")
        .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
        .then((j: PricePayload) => {
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

// Percent change between a current and reference value, or null if unknown.
export function pctChange(cur: number | null, ref: number | null | undefined) {
  if (cur == null || ref == null || ref === 0) return null;
  return ((cur - ref) / ref) * 100;
}
