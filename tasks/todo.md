# Task List: Seed Swap — Garden Seed Packet Vault

## Phase 1: Foundation

### Task 1: Initialize Vite + React + TypeScript project
**Description:** Scaffold Vite project with React + TypeScript.
**Acceptance criteria:**
- [ ] `npm run dev` starts without errors
- [ ] `npm run build` produces valid dist
- [ ] TypeScript strict mode enabled

**Verification:** `npm run build`
**Dependencies:** None
**Files:** `package.json`, `tsconfig.json`, `vite.config.ts`, `index.html`
**Scope:** XS

---

### Task 2: Configure Tailwind CSS with design system tokens
**Description:** Install Tailwind via PostCSS. Add all DESIGN.md tokens (colors, fonts, spacing, borderRadius). Load Google Fonts.
**Acceptance criteria:**
- [ ] Tailwind configured with all design tokens
- [ ] Base styles set (background #080C08, ambient shadow)
- [ ] Fonts loaded (Vollkorn, Space Grotesk)
- [ ] Unused classes purged in production

**Verification:** `npm run build`
**Dependencies:** Task 1
**Files:** `tailwind.config.js`, `postcss.config.js`, `src/index.css`, `index.html`
**Scope:** S

---

### Task 3: Set up Vitest
**Description:** Install Vitest + jsdom. Verify test runner works.
**Acceptance criteria:**
- [ ] `npm run test` runs and passes
- [ ] jsdom environment configured for React tests

**Verification:** `npm run test`
**Dependencies:** Task 1
**Files:** `vite.config.ts`, placeholder test
**Scope:** XS

---

### Task 4: Create clean architecture directory structure
**Description:** Create folders + path aliases for entities, use-cases, adapters, ui, hooks.
**Acceptance criteria:**
- [ ] Directory structure matches PRD architecture spec
- [ ] tsconfig path aliases work (`@entities`, `@use-cases`, etc.)

**Verification:** `npm run build`
**Dependencies:** Task 1
**Files:** `tsconfig.json`, `vite.config.ts`
**Scope:** XS

---

### Checkpoint: Foundation
- [ ] `npm run dev` works
- [ ] `npm run test` passes
- [ ] `npm run build` succeeds

---

## Phase 2: Domain Layer

### Task 5: Seed entity + tests
**Description:** Seed type, Source/Quantity enums, createSeed() factory, validateSeed().
**Acceptance criteria:**
- [ ] All fields typed (id, plantName, source, year, quantity, notes, createdAt)
- [ ] Year validation: 1900-2100
- [ ] Enum validation for source and quantity
- [ ] Tests: valid, invalid, edge cases

**Verification:** `npm run test`
**Dependencies:** Task 3, 4
**Files:** `src/entities/seed/seed.ts`, `seed.test.ts`
**Scope:** S

---

### Task 6: localStorage adapter + tests
**Description:** loadSeeds/saveSeeds with JSON serialization and error handling.
**Acceptance criteria:**
- [ ] Reads from `seed-vault-seeds` key
- [ ] Handles missing/corrupt data (returns [])
- [ ] Tests mock localStorage

**Verification:** `npm run test`
**Dependencies:** Task 5
**Files:** `src/adapters/local-storage.ts`, `local-storage.test.ts`
**Scope:** S

---

### Task 7: Date utilities + tests
**Description:** isExpired(year), isExpiringSoon(year) based on current year.
**Acceptance criteria:**
- [ ] isExpired: year < currentYear
- [ ] isExpiringSoon: year === currentYear
- [ ] Tests cover past, current, future years

**Verification:** `npm run test`
**Dependencies:** Task 5
**Files:** `src/adapters/date-utils.ts`, `date-utils.test.ts`
**Scope:** XS

---

### Task 8: Add seed use case + tests
**Description:** Validates input, creates seed, persists via adapter.
**Acceptance criteria:**
- [ ] Rejects invalid input with error message
- [ ] Creates seed with UUID + timestamp on success
- [ ] Persists to storage adapter
- [ ] Tests: valid add, invalid add, storage called

**Verification:** `npm run test`
**Dependencies:** Task 5, 6
**Files:** `src/use-cases/add-seed.ts`, `add-seed.test.ts`
**Scope:** S

---

### Task 9: Filter & sort use case + tests
**Description:** Compose filter (by source) and sort (by year asc/desc) on Seed[].
**Acceptance criteria:**
- [ ] Filter by one or more source types
- [ ] Sort ascending/descending by year
- [ ] Empty filter = show all
- [ ] Tests: single filter, multi filter, sort both directions, empty array

**Verification:** `npm run test`
**Dependencies:** Task 5
**Files:** `src/use-cases/filter-seeds.ts`, `filter-seeds.test.ts`
**Scope:** S

---

### Task 10: Compute stats use case + tests
**Description:** Aggregate total count, expiring count, source breakdown from Seed[].
**Acceptance criteria:**
- [ ] Returns { total, expiringSoon, bySource: {bought, saved, swapped, gifted} }
- [ ] Expiring = year <= currentYear
- [ ] Tests: empty array, mixed seeds, all sources

**Verification:** `npm run test`
**Dependencies:** Task 5, 7
**Files:** `src/use-cases/compute-stats.ts`, `compute-stats.test.ts`
**Scope:** S

---

### Task 11: Remove seed use case + tests
**Description:** Delete seed by id, persist updated list.
**Acceptance criteria:**
- [ ] Removes seed by id
- [ ] Persists to storage
- [ ] Returns updated array
- [ ] Tests: existing id, non-existent id

**Verification:** `npm run test`
**Dependencies:** Task 5, 6
**Files:** `src/use-cases/remove-seed.ts`, `remove-seed.test.ts`
**Scope:** XS

---

### Checkpoint: Domain
- [ ] All domain tests pass
- [ ] No React/DOM imports in entities/use-cases/adapters
- [ ] Pure functions, fully testable in isolation

---

## Phase 3: React UI Components

### Task 12: useSeedStore hook
**Description:** React hook that bridges localStorage adapter with state. Loads on mount, exposes add/remove/persist.
**Acceptance criteria:**
- [ ] Loads seeds on mount
- [ ] addSeed/removeSeed update state + persist
- [ ] State updates trigger re-render

**Verification:** `npm run test` (hook test)
**Dependencies:** Task 6, 8, 11
**Files:** `src/hooks/useSeedStore.ts`
**Scope:** S

---

### Task 13: SeedCard component
**Description:** Single seed card with plant name, source badge, year, quantity, notes, status flags.
**Acceptance criteria:**
- [ ] Shows all seed fields
- [ ] Expired: red border + "Expired" badge
- [ ] Expiring: amber border + "Expiring" badge
- [ ] Source badge color-coded (sage=saved, terra=swapped, cream=bought/gifted)
- [ ] Rounded-xl, ambient shadow

**Verification:** Manual check in browser
**Dependencies:** Task 5, 7
**Files:** `src/ui/components/SeedCard.tsx`
**Scope:** M

---

### Task 14: StatsBar component
**Description:** Grid showing total packets, expiring soon, source breakdown.
**Acceptance criteria:**
- [ ] 2-col (mobile) / 4-col (desktop) grid
- [ ] Shows: Total, Expiring Soon, Sources breakdown
- [ ] Colors match design (error-container for expiring)

**Verification:** Manual check
**Dependencies:** Task 10
**Files:** `src/ui/components/StatsBar.tsx`
**Scope:** S

---

### Task 15: FilterBar component
**Description:** Source filter chips (multi-select) + sort direction toggle.
**Acceptance criteria:**
- [ ] 4 source chips: Bought, Saved, Swapped, Gifted
- [ ] Toggle to activate/deactivate filter
- [ ] Sort button toggles asc/desc
- [ ] Active state styling

**Verification:** Manual check
**Dependencies:** Task 9
**Files:** `src/ui/components/FilterBar.tsx`
**Scope:** S

---

### Task 16: AddSeedModal component
**Description:** Modal form for adding seeds with client-side validation.
**Acceptance criteria:**
- [ ] Fields: plant name, source select, year input, quantity select, notes textarea
- [ ] Validation: name required, year 1900-2100 (4 digits)
- [ ] Show/hide error messages
- [ ] Backdrop blur, centered, max-w-md
- [ ] Close on X, Cancel, or Escape

**Verification:** Manual check
**Dependencies:** Task 5
**Files:** `src/ui/components/AddSeedModal.tsx`
**Scope:** M

---

### Task 17: TopAppBar component
**Description:** Fixed header with title + action buttons (filter, sort, add).
**Acceptance criteria:**
- [ ] Fixed top, backdrop blur
- [ ] "Seed Vault" title in Vollkorn
- [ ] Icon buttons: filter, sort, add
- [ ] Responsive: hide icons on mobile (show in bottom nav)

**Verification:** Manual check
**Dependencies:** Task 15
**Files:** `src/ui/components/TopAppBar.tsx`
**Scope:** S

---

### Task 18: BottomNav component
**Description:** Mobile-only fixed bottom navigation bar.
**Acceptance criteria:**
- [ ] Hidden on desktop (md:hidden)
- [ ] 4 items: Vault (active), Analytics, Exchange, Settings
- [ ] Backdrop blur, rounded-t
- [ ] Active state: secondary-container background

**Verification:** Manual check at 320px
**Dependencies:** None
**Files:** `src/ui/components/BottomNav.tsx`
**Scope:** XS

---

### Checkpoint: Components
- [ ] All components render without errors
- [ ] Responsive: 320px, 768px, 1280px
- [ ] Visual match to DESIGN.md

---

## Phase 4: Integration & Polish

### Task 19: App.tsx composition root
**Description:** Wire all components together. Manage filter/sort state, pass to children.
**Acceptance criteria:**
- [ ] Composes: TopAppBar, StatsBar, FilterBar, CardGrid, BottomNav, AddSeedModal
- [ ] State: seeds, activeFilters, sortDir, modalOpen
- [ ] Full flow works: add seed → appears in grid → stats update

**Verification:** Manual end-to-end flow
**Dependencies:** Tasks 12-18
**Files:** `src/ui/App.tsx`, `src/ui/main.tsx`
**Scope:** M

---

### Task 20: Global styles & polish
**Description:** Ambient shadows, smooth transitions, scroll behavior, font loading.
**Acceptance criteria:**
- [ ] Ambient shadow utility class applied to cards
- [ ] Font loading with display=swap (no FOUC)
- [ ] Smooth transitions on hover/active states
- [ ] Proper spacing (8px base unit)

**Verification:** Manual check
**Dependencies:** Task 19
**Files:** `src/index.css`
**Scope:** XS

---

### Task 21: Accessibility
**Description:** Keyboard navigation, aria labels, focus management, contrast.
**Acceptance criteria:**
- [ ] All interactive elements reachable via Tab
- [ ] Modal: focus trap, close on Escape, aria-modal
- [ ] Cards have aria-label with seed info
- [ ] Filter chips: aria-pressed state
- [ ] Color contrast meets WCAG AA

**Verification:** Keyboard-only navigation test
**Dependencies:** Task 19
**Files:** All UI components
**Scope:** S

---

### Task 22: Bundle size audit
**Description:** Verify source code is under 40KB raw.
**Acceptance criteria:**
- [ ] Total raw source (all .ts, .tsx, .css files) < 40KB
- [ ] No unused imports
- [ ] Tailwind purge removes unused classes

**Verification:** `du -sb src/` or equivalent
**Dependencies:** Task 19
**Files:** All (verification only)
**Scope:** XS

---

### Checkpoint: Complete
- [ ] All tests pass: `npm run test`
- [ ] Build succeeds: `npm run build`
- [ ] End-to-end flow works (add, filter, sort, stats, persistence)
- [ ] Source code < 40KB
- [ ] Responsive at all breakpoints
- [ ] Accessible (keyboard, aria)
