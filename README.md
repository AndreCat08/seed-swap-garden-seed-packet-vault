# seed-swap-garden-seed-packet-vault

A small offline-first web app for cataloguing your garden seed packets: what you
have, where it came from, what year, and how much is left. Data lives in the
browser's `localStorage` — no backend, no account.

## Stack

React 18 + TypeScript + Vite, Tailwind for styling, Vitest for tests.

## Getting started

```bash
npm install
npm run dev      # start Vite dev server
```

## Scripts

| Command             | What it does                          |
| ------------------- | ------------------------------------- |
| `npm run dev`       | Dev server with HMR                   |
| `npm run build`     | Type-check then production build      |
| `npm run preview`   | Serve the production build locally    |
| `npm test`          | Run the test suite once              |
| `npm run test:watch`| Run tests in watch mode               |

## Layout

```
src/
  entities/seed/     Seed type, validation, factory
  use-cases/         add / remove / filter / sort seeds
  adapters/          localStorage + date helpers
  hooks/             useSeedStore — wires use-cases to React state
  ui/                App + components
  test/setup.ts      Vitest + Testing Library setup
```

Path aliases (`@entities`, `@use-cases`, `@adapters`, `@hooks`) are defined in
the Vite config.

## Data model

A seed packet:

- `plantName` — required
- `source` — one of `bought`, `saved`, `swapped`, `gifted`
- `year` — 1900–2100
- `quantity` — one of `full`, `partial`, `nearly_empty`
- `notes` — optional
