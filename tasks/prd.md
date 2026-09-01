# Product Requirements Document: Seed Swap — Garden Seed Packet Vault

## Overview

A single-page web application for home gardeners to catalog and manage their seed packet collection. Users can add seeds with metadata (plant name, source, year/expiration, quantity, notes), browse them as a card grid, filter by source type, sort by expiration year, and view summary stats. All data persists in `localStorage` — no backend, no login.

**Stack:** React 18 + Vite + Vitest (unit tests) + Tailwind CSS  
**Constraint:** Max 40KB raw source code (excluding markdown, images, and dependencies)  
**Architecture:** Clean architecture (entities → use cases → adapters → UI)  
**Design:** "Digital Potting Shed" — dark forest green, Vollkorn + Space Grotesk, pill-shaped components

---

## User Stories

| ID | Story | Priority |
|----|-------|----------|
| US1 | As a gardener, I want to add a seed packet with plant name, source, year, quantity, and notes so I can catalog my stash. | Must |
| US2 | As a gardener, I want to see all my seeds as a browsable card grid so I can quickly scan my collection. | Must |
| US3 | As a gardener, I want to filter seeds by source type (bought/saved/swapped/gifted) so I can find specific packets. | Must |
| US4 | As a gardener, I want to sort seeds by expiration year so I know which to use first. | Must |
| US5 | As a gardener, I want to see expired/expiring seeds visually flagged so I don't waste them. | Must |
| US6 | As a gardener, I want a stats bar showing total packets, expiring count, and source breakdown so I know my collection at a glance. | Must |
| US7 | As a gardener, I want my data to persist across page refreshes so I don't lose my catalog. | Must |
| US8 | As a gardener, I want the app to work on mobile and desktop so I can use it in the garden or at my desk. | Must |
| US9 | As a gardener, I want to edit or delete a seed entry so I can keep my catalog accurate. | Should |
| US10 | As a gardener, I want to search seeds by name so I can find a specific packet quickly. | Could |

---

## Functional Requirements

### FR1: Seed Data Model
Each seed entry contains:
- `id`: string (UUID)
- `plantName`: string (required)
- `source`: enum `['bought', 'saved', 'swapped', 'gifted']` (required)
- `year`: number (4-digit year, required)
- `quantity`: enum `['full', 'partial', 'nearly_empty']` (required)
- `notes`: string (optional)
- `createdAt`: ISO timestamp

### FR2: Add Seed
- Modal form with fields matching the data model
- Client-side validation (required fields, year range 1900-2100)
- On submit: save to localStorage, close modal, refresh grid

### FR3: Seed Card Grid
- Responsive grid: 1 col (mobile), 2 col (tablet), 3 col (desktop)
- Each card shows: plant name, source badge, year, quantity, notes preview
- Expired seeds (year < current year): red border + "Expired" badge
- Expiring seeds (year === current year): amber border + "Expiring" badge

### FR4: Filter & Sort
- Filter chips for source types (multi-select)
- Sort toggle: ascending/descending by year
- Filter and sort compose together

### FR5: Stats Bar
- Total packets count
- Expiring soon count (year ≤ current year)
- Breakdown by source: Bought: N, Saved: N, Swapped: N, Gifted: N

### FR6: Persistence
- All seed data stored in `localStorage` under key `seed-vault-seeds`
- Load on app mount, save on every mutation

### FR7: Responsive Design
- Mobile-first layout
- Bottom nav on mobile (Vault only — analytics/exchange/settings out of scope)
- Desktop: top app bar + FAB for adding seeds

---

## Non-Functional Requirements

| ID | Requirement | Target |
|----|-------------|--------|
| NFR1 | Source code size | ≤ 40KB raw (excluding node_modules, markdown, images) |
| NFR2 | Test coverage | Unit tests for all use cases and utilities |
| NFR3 | Architecture | Clean architecture: entities → use cases → adapters → UI layers |
| NFR4 | Responsive | Works on 320px–1920px viewports |
| NFR5 | Performance | Initial render < 1s on 3G, LCP < 2.5s |
| NFR6 | Accessibility | WCAG 2.1 AA for contrast, keyboard nav, aria labels |
| NFR7 | Browser support | Latest 2 versions of Chrome, Firefox, Safari, Edge |

---

## Design Specifications

### Colors (from DESIGN.md)
- Background: `#080C08` (deep forest)
- Surface: `#101510` / `#1c211c`
- Primary text: `#dfe4dc` (cream)
- Secondary: `#b8cdac` (sage)
- Error/expired: `#ffb4ab` / `#93000a`
- Accent: `#F5F5DC` (cream for buttons)

### Typography
- **Vollkorn** — headlines (48px/32px, 600-700 weight)
- **Space Grotesk** — body, labels, mono data (12-16px)

### Components
- **Cards:** `rounded-xl` (32px), ambient shadow, image area (h-48), content below
- **Buttons/Chips:** pill-shaped (`rounded-full`)
- **Modal:** centered, backdrop blur, max-w-md
- **Badges:** source badge (sage), expired (red), expiring (amber)

### Layout
- Top app bar: fixed, blur backdrop, title + filter/sort/add buttons
- Stats bar: 2-col (mobile) / 4-col (desktop) grid
- Card grid: 1/2/3 responsive columns
- Mobile bottom nav: fixed, blur, 4 items (Vault active)
- Desktop FAB: bottom-right, "Add Seed"

---

## Architecture: Clean Architecture Layers

```
src/
├── entities/
│   └── seed/
│       ├── seed.ts          # Seed type, factory, validators
│       └── seed.test.ts
├── use-cases/
│   ├── add-seed.ts          # Add seed use case
│   ├── add-seed.test.ts
│   ├── filter-seeds.ts      # Filter + sort logic
│   ├── filter-seeds.test.ts
│   ├── compute-stats.ts     # Stats aggregation
│   ├── compute-stats.test.ts
│   └── remove-seed.ts       # Delete seed
├── adapters/
│   ├── local-storage.ts     # localStorage read/write adapter
│   ├── local-storage.test.ts
│   └── date-utils.ts        # Year comparison helpers
├── ui/
│   ├── components/
│   │   ├── SeedCard.tsx
│   │   ├── StatsBar.tsx
│   │   ├── FilterBar.tsx
│   │   ├── AddSeedModal.tsx
│   │   ├── TopAppBar.tsx
│   │   └── BottomNav.tsx
│   ├── App.tsx              # Composition root
│   └── main.tsx             # Entry point
├── hooks/
│   └── useSeedStore.ts      # React hook wrapping localStorage adapter
└── index.css                # Tailwind + custom styles
```

**Dependency rule:** entities → use-cases → adapters → ui (inner layers have no knowledge of outer layers)

---

## Out of Scope

- User authentication
- Backend / database
- Image upload (design uses placeholder images)
- Analytics / Exchange / Settings screens (bottom nav placeholders only)
- Data export/import
- Push notifications

---

## Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| 40KB limit exceeded | High | Monitor bundle size early; prefer vanilla logic over React for use cases; tree-shake Tailwind |
| Clean architecture adds overhead | Medium | Keep layers thin; use cases are pure functions, not classes |
| Tailwind CSS bloat | Medium | PurgeCSS via Vite; only use classes from design spec |
| Font loading (Vollkorn + Space Grotesk) | Low | Preload via `<link>`; fonts loaded from Google (not counted in source size) |
