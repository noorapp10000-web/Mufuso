# مافيوسو (Mafioso)

لعبة استنتاج اجتماعي عربية — تدعم اللعب المحلي (نفس الجهاز) واللعب الأونلاين متعدد اللاعبين عبر Socket.io.

## Run & Operate

- **Frontend** (port 5000): workflow `Start application` → `cd artifacts/mafioso && PORT=5000 BASE_PATH=/ pnpm dev`
- **API Server** (port 8080): workflow `artifacts/api-server: API Server` → `pnpm --filter @workspace/api-server run dev`
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string
- APK env: `VITE_API_URL` — deployed server URL for Capacitor builds (empty = same-origin proxy in dev/web)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + Tailwind CSS + Framer Motion + Wouter
- API: Express 5 + Socket.io (port 8080)
- DB: PostgreSQL + Drizzle ORM
- Mobile: Capacitor (Android APK)
- Validation: Zod (`zod/v4`), `drizzle-zod`
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/mafioso/src/` — main React app
  - `pages/online/` — all online multiplayer pages (OnlineMenu, OnlineLobby, OnlineCardDraw, OnlineGamePlay, OnlineRoom)
  - `context/OnlineContext.tsx` — socket.io client + room state
  - `data/allCases.ts` — exports `ALL_CASES` (not `allCases`) and `getCaseById`
  - `data/cases.ts`, `data/cases5p.ts`, `data/cases6p.ts` — case data
- `artifacts/api-server/src/socket/index.ts` — complete Socket.io server (all game logic)
- `artifacts/api-server/src/index.ts` — http.createServer + setupSocket, port 8080
- `artifacts/mafioso/vite.config.ts` — proxies `/socket.io` → port 8080

## Architecture decisions

- **Case data is client-side**: host sends `CaseMeta` (id, title, totalRounds, characters[], culpritIds[]) to server on `select_case`; each client loads full case details locally via `getCaseById(id)`
- **Private cards**: server sends `your_card` event only to the specific player's socketId; `safeRoom()` strips all private fields before broadcasting
- **Server-side timer**: server sets `timerEnd` timestamp (unix ms); clients count down locally; server auto-advances via `setTimeout`
- **Reconnection**: sessionStorage stores `{ code, playerId }`; OnlineContext re-emits `reconnect_player` on every socket `connect` event (handles page refresh + network drops)
- **Online route guard**: `OnlineRoom` redirects to `/online` if `room === null`
- **TS errors in cases.ts/cases6p.ts** (`implication` field on Character) are pre-existing and non-blocking — esbuild ignores them

## Product

- **Local mode**: pass-and-play on a single device — players see cards one at a time
- **Online mode**: room code system (4 chars), host creates room, others join via code; host selects case + duration; synchronized gameplay across all devices; reconnection on drop; play-again flow
- Supports 4–6 players, Arabic-only UI, themed around mafia/social deduction mystery cases

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- `ALL_CASES` (uppercase) is the export from `allCases.ts` — NOT `allCases`
- API server uses port **8080** (not 5000); Vite proxies `/socket.io` to 8080 in dev
- Both `Start application` AND `artifacts/api-server: API Server` workflows must be running for online mode to work
- `VITE_API_URL` must be set to the deployed server URL when building the Capacitor APK
- The `artifacts/api-server: API Server` workflow must be restarted after any changes to socket/index.ts (it runs esbuild first)

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
