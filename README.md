# SPCX — The SpaceX IPO, charted

Primary-source breakdown of the SpaceX Form S-1 prospectus (filed May 20, 2026),
visualised. Deployed at https://spacex.algoentropy.com/.

## Structure

- `frontend/` — Vite + React + TS + Tailwind v4 + Recharts
- `main.py` — FastAPI shell that serves the built SPA
- `Dockerfile` — multi-stage (node build → python serve)
- `data/prospectus.json` — extracted data, mirrored into `frontend/src/`

## Local dev

```bash
cd frontend && npm install && npm run dev
```

## Deploy

```bash
git push oc main
```

Dokku app `spacex` on host `oc` (nuoya.co.uk).
