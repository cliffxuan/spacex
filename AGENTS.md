# AGENTS.md

Guidance for AI agents working in this repo. Keep it current when workflows change.

## What this is

**SPCX — "The SpaceX IPO, charted."** A single-page site that visualises SpaceX's
Form S-1 prospectus (primary-source breakdown), plus a live pre-IPO-vs-listed price
chart. Deployed at https://spacex.algoentropy.com.

## Stack & layout

- `frontend/` — Vite + React + TypeScript + Tailwind v4 + Recharts. SPA, no router
  (single page; nav is in-page anchors via `#section-id`).
- `main.py` — FastAPI. Serves the built SPA from `frontend/dist` and exposes
  `GET /api/prices` (live price data). Stdlib-only HTTP; **no extra Python deps**.
- `data/prospectus.json` — canonical extracted S-1 data (the source of truth).
- `justfile` — task runner. Run `just` to list recipes.
- `Dockerfile` — multi-stage (node build → python serve). Dokku builds this on deploy.

## Common tasks (use `just`)

- `just install` — frontend npm + `uv sync`.
- `just dev` — backend + frontend together (needed for the price chart: vite proxies
  `/api` → uvicorn on :8000). Ctrl-C stops both.
- `just build` — frontend → `frontend/dist`.
- `just typecheck` — `tsc -b`.
- `just serve` — build, then serve SPA + API from one uvicorn (production-like).
- `just sync-data` — see below.
- `just deploy` — `git push oc main`.

## Data flow — the one easy mistake

`data/prospectus.json` is the canonical file, but the frontend imports
`frontend/src/prospectus.json`. **They must be kept identical.** After editing the
canonical file, run `just sync-data` (or `cp data/prospectus.json
frontend/src/prospectus.json`). Edit `data/prospectus.json`, never the mirror.

Consumed via `frontend/src/data.ts` (`data`, `SEC_URL`, `AMENDMENT_URL`,
`AMENDMENT_INDEX_URL`, plus `fmt*` helpers including a timezone-safe `fmtDate`).

The site's ethos: every prospectus figure links back to its SEC source. Keep new
filing-derived numbers sourced. Data that is **not** from the S-1 (e.g. the index
outlook, live prices) must be visibly labelled as such — don't present analysis or
third-party data as a filing fact.

## Live price API (`/api/prices`)

Merges two daily-close series keyed by date:
- **perp** — Hyperliquid pre-IPO perpetual `xyz:SPCX` (a HIP-3 builder-deployed
  market; POST to `https://api.hyperliquid.xyz/info`, `candleSnapshot`). CORS is open,
  but we proxy server-side for caching + a single merged contract.
- **stock** — listed Nasdaq `SPCX` via Yahoo Finance chart API. Empty until the stock
  actually trades (lists 2026-06-12). Pre-listing placeholder quotes (vendors seed the
  IPO price) are filtered out by dropping dates `< LISTING_DATE`.

There is also `GET /api/filings` — latest SEC EDGAR submissions for CIK 1181412
(10-min cache, serves stale data if EDGAR is down; the SEC User-Agent requirement is
handled in `main.py`). Rendered by `components/Track.tsx` (event calendar, live
valuation panel, filings feed).

60s in-memory cache; resilient (one source failing won't 500). After 2026-06-12,
sanity-check that the real-price line populated; Yahoo is an unofficial endpoint — if
it breaks, swap `_fetch_stock` for a keyed provider. Rendered by
`components/PriceTracker.tsx` (polls every 60s).

## Deploy & the two-remote gotcha

- **`oc`** (`dokku@nuoya.co.uk:spacex`) — the deploy target. `git push oc main`
  triggers a Docker build + release. This is what's live.
- **`origin`** (GitHub) — source mirror.

**The two remotes have divergent histories** (separate root commits — same content,
different SHAs). `local main` tracks the `oc` lineage. A plain `git push origin main`
will be rejected (non-fast-forward). To update GitHub, cherry-pick onto its lineage:

```bash
git checkout -b tmp origin/main
git cherry-pick <commit>            # one or more
git push origin tmp:main
git checkout main && git branch -D tmp
```

After any deploy, verify the live site (`curl https://spacex.algoentropy.com/api/prices`
and check the bundle/section rendered) rather than trusting the push alone.

## Conventions & gotchas

- **Match the surrounding code.** Components use the shared `Section` / `Card` / `Stat`
  / `SourceLink` primitives in `components/Section.tsx`. Adding a section = new
  component in `components/`, wire into `App.tsx` and the `ITEMS` list in `Nav.tsx`.
- Import the `ReactNode` **type** from `react`; don't reference the `React` UMD global.
- LSP diagnostics can lag a multi-edit sequence (flag symbols as unused/missing
  mid-edit). The authoritative check is `just build` / `just typecheck` — trust the
  build over a stale in-flight diagnostic.
- **Fetching from SEC EDGAR requires a `User-Agent` header** (403 otherwise), and
  `WebFetch` is blocked — use `curl -H "User-Agent: <email> <purpose>"`. Submissions
  JSON: `https://data.sec.gov/submissions/CIK0001181412.json`.
- No new Python deps without updating `pyproject.toml` + `uv.lock` (Dockerfile uses
  `uv sync --frozen`). The price endpoint deliberately uses only the stdlib.
- The dev `/api` proxy in `vite.config.ts` is dev-only; in production the same FastAPI
  process serves both the SPA and the API (same origin).
