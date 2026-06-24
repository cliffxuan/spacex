from __future__ import annotations

import json
import time
import urllib.request
from pathlib import Path

from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles

app = FastAPI(title="SPCX · SpaceX IPO, charted")

# --- Live price tracker: pre-IPO perp (Hyperliquid) vs. listed stock (Nasdaq) ---
IPO_PRICE = 135.0
LISTING_DATE = "2026-06-12"
# Total shares outstanding post-offering (S-1/A No. 2). Used for live market cap.
SHARES_OUTSTANDING = 12_520_309_620
PERP_COIN = "xyz:SPCX"
STOCK_SYMBOL = "SPCX"
HL_URL = "https://api.hyperliquid.xyz/info"
YF_URL = (
    "https://query1.finance.yahoo.com/v8/finance/chart/"
    "{symbol}?interval=1d&range=3mo"
)
CACHE_TTL = 60.0  # seconds

_cache: dict[str, object] = {"ts": 0.0, "data": None}


def _http_json(
    url: str, *, method: str = "GET", body: dict | None = None, timeout: int = 8
) -> dict | list:
    headers = {"User-Agent": "Mozilla/5.0 (SPCX-site price tracker)"}
    data = None
    if body is not None:
        data = json.dumps(body).encode()
        headers["Content-Type"] = "application/json"
    req = urllib.request.Request(url, data=data, headers=headers, method=method)
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return json.loads(resp.read().decode())


def _fetch_perp() -> dict[str, float]:
    """Daily close of the Hyperliquid pre-IPO perp, keyed by UTC date."""
    end = int(time.time() * 1000)
    start = end - 120 * 86400 * 1000
    body = {
        "type": "candleSnapshot",
        "req": {
            "coin": PERP_COIN,
            "interval": "1d",
            "startTime": start,
            "endTime": end,
        },
    }
    candles = _http_json(HL_URL, method="POST", body=body)
    out: dict[str, float] = {}
    if isinstance(candles, list):
        for c in candles:
            date = time.strftime("%Y-%m-%d", time.gmtime(c["t"] / 1000))
            out[date] = round(float(c["c"]), 2)
    return out


def _fetch_stock() -> dict[str, float]:
    """Daily close of the listed Nasdaq stock (empty until it starts trading)."""
    res = _http_json(YF_URL.format(symbol=STOCK_SYMBOL))
    out: dict[str, float] = {}
    try:
        r = res["chart"]["result"][0]
        ts = r.get("timestamp") or []
        closes = r["indicators"]["quote"][0].get("close") or []
        for t, c in zip(ts, closes):
            if c is None:
                continue
            date = time.strftime("%Y-%m-%d", time.gmtime(t))
            # Skip pre-listing placeholder quotes (data vendors seed the IPO
            # price before the stock actually trades) so the listed-price line
            # only starts once SPCX is genuinely trading.
            if date < LISTING_DATE:
                continue
            out[date] = round(float(c), 2)
    except (KeyError, IndexError, TypeError):
        pass
    return out


def _build_payload() -> dict:
    perp: dict[str, float] = {}
    stock: dict[str, float] = {}
    try:
        perp = _fetch_perp()
    except Exception:  # noqa: BLE001 — one source down shouldn't 500 the chart
        pass
    try:
        stock = _fetch_stock()
    except Exception:  # noqa: BLE001
        pass

    dates = sorted(set(perp) | set(stock))
    series = [{"date": d, "perp": perp.get(d), "stock": stock.get(d)} for d in dates]

    def _last_two(key: str) -> tuple[float | None, float | None]:
        """Most-recent and prior non-null close for a series (for day change)."""
        vals = [pt[key] for pt in series if pt[key] is not None]
        last = vals[-1] if vals else None
        prev = vals[-2] if len(vals) > 1 else None
        return last, prev

    perp_last, perp_prev = _last_two("perp")
    stock_last, stock_prev = _last_two("stock")

    return {
        "ipo_price": IPO_PRICE,
        "listing_date": LISTING_DATE,
        "perp_source": "Hyperliquid · xyz:SPCX (pre-IPO perp)",
        "stock_source": "Nasdaq · SPCX (via Yahoo Finance)",
        "shares_outstanding": SHARES_OUTSTANDING,
        "series": series,
        "latest": {
            "perp": perp_last,
            "perp_prev": perp_prev,
            "stock": stock_last,
            "stock_prev": stock_prev,
        },
        "updated": int(time.time()),
    }


@app.get("/api/prices")
def prices() -> JSONResponse:
    now = time.time()
    if _cache["data"] is None or now - float(_cache["ts"]) > CACHE_TTL:
        _cache["data"] = _build_payload()
        _cache["ts"] = now
    return JSONResponse(_cache["data"])


@app.get("/healthz")
def healthz() -> dict[str, str]:
    return {"status": "ok"}


DIST = Path(__file__).parent / "frontend" / "dist"
if DIST.is_dir():
    app.mount("/", StaticFiles(directory=DIST, html=True), name="spa")
