import { describe, it, expect } from 'vitest'
import { filterSeeds, sortSeeds } from './filter-seeds'
import type { Seed } from '@entities/seed/seed'

function makeSeed(o: Partial<Seed>): Seed {
  return {
    id: o.id ?? 'x',
    plantName: o.plantName ?? 'Seed',
    source: o.source ?? 'bought',
    year: o.year ?? 2024,
    quantity: 'full',
    notes: '',
    createdAt: '2024-01-01T00:00:00.000Z',
    ...o,
  }
}

const ids = (seeds: Seed[]) => seeds.map((s) => s.id)

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

  it('returns all seeds when sources array is empty', () => {
    expect(filterSeeds(seeds, { sources: [] })).toHaveLength(5)
  })

  it('returns only matching source when one filter is set', () => {
    expect(ids(filterSeeds(seeds, { sources: ['bought'] }))).toEqual(['a', 'e'])
  })

  it('returns matches across multiple sources', () => {
    expect(ids(filterSeeds(seeds, { sources: ['bought', 'saved'] }))).toEqual(['a', 'b', 'e'])
  })

  it('returns empty array when no seeds match', () => {
    expect(filterSeeds([], { sources: ['bought'] })).toEqual([])
  })
})

describe('sortSeeds', () => {
  const seeds = [
    makeSeed({ id: 'old', year: 2021 }),
    makeSeed({ id: 'new', year: 2026 }),
    makeSeed({ id: 'mid', year: 2024 }),
  ]

  it('sorts ascending by year by default and explicitly', () => {
    expect(ids(sortSeeds(seeds))).toEqual(['old', 'mid', 'new'])
    expect(ids(sortSeeds(seeds, 'asc'))).toEqual(['old', 'mid', 'new'])
  })

  it('sorts descending explicitly', () => {
    expect(ids(sortSeeds(seeds, 'desc'))).toEqual(['new', 'mid', 'old'])
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
    expect(ids(sortSeeds(filterSeeds(seeds, { sources: ['saved'] }), 'asc'))).toEqual(['c', 'a'])
  })
})
