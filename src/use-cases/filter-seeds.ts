import type { Seed, Source } from '@entities/seed/seed'

export interface FilterOptions {
  sources?: Source[]
}

export function filterSeeds(seeds: Seed[], options: FilterOptions): Seed[] {
  const { sources = [] } = options
  if (sources.length === 0) return seeds
  return seeds.filter((seed) => sources.includes(seed.source))
}

export type SortDirection = 'asc' | 'desc'

export function sortSeeds(seeds: Seed[], direction: SortDirection = 'asc'): Seed[] {
  return [...seeds].sort((a, b) => (direction === 'asc' ? a.year - b.year : b.year - a.year))
}
