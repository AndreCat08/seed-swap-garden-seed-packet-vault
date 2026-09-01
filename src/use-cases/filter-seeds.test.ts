import { describe, it, expect } from 'vitest'
import { filterSeeds, sortSeeds, type FilterOptions } from './filter-seeds'
import type { Seed, Source } from '@entities/seed/seed'

function makeSeed(overrides: Partial<Seed>): Seed {
  return {
    id: overrides.id ?? 'x',
    plantName: overrides.plantName ?? 'Seed',
    source: overrides.source ?? 'bought',
    year: overrides.year ?? 2024,
    quantity: 'full',
    notes: '',
    createdAt: '2024-01-01T00:00:00.000Z',
    ...overrides,
  }
}

describe('filterSeeds', () => {
  const seeds = [
    makeSeed({ id: 'a', source: 'bought' }),
    makeSeed({ id: 'b', source: 'saved' }),
    makeSeed({ id: 'c', source: 'swapped' }),
    makeSeed({ id: 'd', source: 'gifted' }),
    makeSeed({ id: 'e', source: 'bought' }),
  ]

  it('returns all seeds when no source filter is set', () => {
    expect(filterSeeds(seeds, {})).toHaveLength(5)
  })

  it('returns only matching source when one filter is set', () => {
    const result = filterSeeds(seeds, { sources: ['bought'] })
    expect(result.map((s) => s.id)).toEqual(['a', 'e'])
  })

  it('returns matches across multiple sources', () => {
    const result = filterSeeds(seeds, { sources: ['bought', 'saved'] })
    expect(result.map((s) => s.id)).toEqual(['a', 'b', 'e'])
  })

  it('returns empty array when no seeds match', () => {
    expect(filterSeeds([], { sources: ['bought'] })).toEqual([])
  })

  it('returns all seeds when sources array is empty', () => {
    const opts: FilterOptions = { sources: [] }
    expect(filterSeeds(seeds, opts)).toHaveLength(5)
  })
})

describe('sortSeeds', () => {
  const seeds = [
    makeSeed({ id: 'old', year: 2021 }),
    makeSeed({ id: 'new', year: 2026 }),
    makeSeed({ id: 'mid', year: 2024 }),
  ]

  it('sorts ascending by year by default', () => {
    expect(sortSeeds(seeds).map((s) => s.id)).toEqual(['old', 'mid', 'new'])
  })

  it('sorts ascending explicitly', () => {
    expect(sortSeeds(seeds, 'asc').map((s) => s.id)).toEqual(['old', 'mid', 'new'])
  })

  it('sorts descending explicitly', () => {
    expect(sortSeeds(seeds, 'desc').map((s) => s.id)).toEqual(['new', 'mid', 'old'])
  })

  it('handles empty array', () => {
    expect(sortSeeds([])).toEqual([])
  })
})

describe('composed filter + sort', () => {
  it('filters then sorts', () => {
    const seeds = [
      makeSeed({ id: 'a', source: 'saved', year: 2024 }),
      makeSeed({ id: 'b', source: 'bought', year: 2026 }),
      makeSeed({ id: 'c', source: 'saved', year: 2021 }),
      makeSeed({ id: 'd', source: 'gifted', year: 2023 }),
    ]
    const sources: Source[] = ['saved']
    const filtered = filterSeeds(seeds, { sources })
    const sorted = sortSeeds(filtered, 'asc')
    expect(sorted.map((s) => s.id)).toEqual(['c', 'a'])
  })
})
