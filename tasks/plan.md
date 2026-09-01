# Implementation Plan: Seed Swap — Garden Seed Packet Vault

## Overview

Build a React + Vite single-page app with clean architecture, unit tests (Vitest), and responsive Tailwind CSS design. All seed data persists in localStorage. The project must stay under 40KB raw source code.

## Architecture Decisions

- **React + Vite** — Fast dev, tree-shaking, built-in test support via Vitest
- **Clean Architecture with pure functions** — Use cases are simple functions, not classes, to minimize overhead
- **Tailwind CSS via CDN script** — Matches the design spec exactly; PurgeCSS strips unused classes in production
- **localStorage adapter** — Single persistence layer, injected into use cases
- **UUID via `crypto.randomUUID()`** — Native Web API, zero dependency
- **No state management library** — React `useState` + custom hook is sufficient for this scope

## Task List

### Phase 1: Project Scaffold & Foundation
- [ ] Task 1: Initialize Vite + React + TypeScript project
- [ ] Task 2: Configure Tailwind CSS with design system tokens
- [ ] Task 3: Set up Vitest and verify test pipeline
- [ ] Task 4: Create clean architecture directory structure

### Checkpoint: Foundation
- [ ] `npm run dev` starts successfully
- [ ] `npm run test` runs and passes (placeholder test)
- [ ] Directory structure matches architecture spec

### Phase 2: Domain Layer (Entities & Use Cases)
- [ ] Task 5: Seed entity — type, factory, validators + tests
- [ ] Task 6: localStorage adapter — read/write/serialize + tests
- [ ] Task 7: Date utility — isExpired, isExpiringSoon + tests
- [ ] Task 8: Add seed use case + tests
- [ ] Task 9: Filter & sort use case + tests
- [ ] Task 10: Compute stats use case + tests
- [ ] Task 11: Remove seed use case + tests

### Checkpoint: Domain
- [ ] All use case tests pass
- [ ] No React imports in entities/use-cases/adapters layers
- [ ] Domain logic is fully testable in isolation

### Phase 3: React UI Components
- [ ] Task 12: useSeedStore hook — bridges localStorage adapter with React state
- [ ] Task 13: SeedCard component — responsive, badges, status flags
- [ ] Task 14: StatsBar component — total, expiring, source breakdown
- [ ] Task 15: FilterBar component — source filter chips + sort toggle
- [ ] Task 16: AddSeedModal component — form with validation
- [ ] Task 17: TopAppBar component — title + action buttons
- [ ] Task 18: BottomNav component — mobile-only nav

### Checkpoint: Components
- [ ] All components render without errors
- [ ] Responsive layout verified at 320px, 768px, 1280px
- [ ] Design matches DESIGN.md (colors, fonts, shapes)

### Phase 4: Integration & Polish
- [ ] Task 19: App.tsx — composition root, wire all components together
- [ ] Task 20: Global styles — ambient shadows, font loading, base styles
- [ ] Task 21: Accessibility — keyboard nav, aria labels, focus management
- [ ] Task 22: Bundle size audit — verify ≤ 40KB raw source

### Checkpoint: Complete
- [ ] All acceptance criteria met
- [ ] All tests pass: `npm run test`
- [ ] Build succeeds: `npm run build`
- [ ] Manual end-to-end flow works (add, filter, sort, stats, persistence)
- [ ] Source code ≤ 40KB

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| 40KB limit exceeded | High | Audit after Phase 3; strip unused Tailwind classes; use pure functions over React where possible |
| Tailwind CDN includes all classes | Medium | Switch to PostCSS + purge for production build |
| Clean architecture adds boilerplate | Medium | Use cases are 5-15 line pure functions; no interfaces, no classes |
| Font loading causes FOUC | Low | Use `display=swap` in Google Fonts URL |

## Open Questions

- Should seed cards show placeholder images or just color blocks when no image exists?
- Is the bottom nav's "Analytics", "Exchange", "Settings" purely decorative or should they navigate to empty placeholder pages?
