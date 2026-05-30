---
name: Online multiplayer architecture
description: Key decisions and gotchas for the Mafioso Socket.io online mode
---

## Core decisions

- **API server on port 8080** — separate from the Vite dev server (port 5000). Vite proxies `/socket.io` → `localhost:8080` in dev. For APK builds set `VITE_API_URL` env var to the deployed server URL.
- **Case data stays client-side** — host sends only `CaseMeta` (id, title, totalRounds, characters[], culpritIds[]) to server; each client loads full case locally via `getCaseById(id)`. Never send the full case object over the wire.
- **Private cards** — server emits `your_card` to a specific `socketId` only. `safeRoom()` strips all private fields (characterId, isMafioso, etc.) before any broadcast.
- **Server-side timer** — server sets `timerEnd` (unix ms timestamp); clients count down locally. Server auto-advances via `setTimeout`. Client never drives game transitions.
- **Reconnection** — sessionStorage stores `{ code, playerId }`. OnlineContext emits `reconnect_player` on every socket `connect` event — handles page refresh and network drops.

## Important naming gotcha

`ALL_CASES` (uppercase constant) is the export from `src/data/allCases.ts` — NOT `allCases`. Always use `ALL_CASES` when filtering/listing cases. `getCaseById(id)` is also exported from the same file.

## Workflows required for online mode

Both must be running:
1. `Start application` — Vite dev server, port 5000
2. `artifacts/api-server: API Server` — Socket.io + Express, port 8080

**Why:** The API server workflow runs esbuild first then starts the server. Restart it after any changes to `src/socket/index.ts`.

## Route guard

`OnlineRoom` component (at `/online/room`) redirects to `/online` when `room === null`. This handles leaveRoom, kick, and session expiry.

## Pre-existing TS errors (non-blocking)

`cases.ts` and `cases6p.ts` have `implication` field errors on `Character` type. These are pre-existing and do NOT affect runtime — esbuild ignores them.
