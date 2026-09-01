import { describe, it, expect, beforeEach } from 'vitest'
import { loadSeeds, saveSeeds, STORAGE_KEY } from './local-storage'
import type { Seed } from '@entities/seed/seed'

function makeSeed(overrides: Partial<Seed> = {}): Seed {
  return {
    id: 'seed-1',
    plantName: 'Basil',
    source: 'bought',
    year: 2024,
    quantity: 'full',
    notes: '',
    createdAt: '2024-01-01T00:00:00.000Z',
    ...overrides,
  }
}

describe('localStorage adapter', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns empty array when nothing is stored', () => {
    expect(loadSeeds()).toEqual([])
  })

  it('returns empty array on corrupt JSON', () => {
    localStorage.setItem(STORAGE_KEY, '{not valid json')
    expect(loadSeeds()).toEqual([])
  })

  it('returns empty array when stored value is not an array', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ foo: 'bar' }))
    expect(loadSeeds()).toEqual([])
  })

  it('loads previously saved seeds', () => {
    const seeds = [makeSeed(), makeSeed({ id: 'seed-2', plantName: 'Tomato' })]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seeds))

    expect(loadSeeds()).toEqual(seeds)
  })

  it('saves seeds to localStorage as JSON', () => {
    const seeds = [makeSeed()]
    saveSeeds(seeds)

    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!)).toEqual(seeds)
  })

  it('round-trips seeds through load and save', () => {
    const seeds = [makeSeed(), makeSeed({ id: 'seed-2', source: 'gifted', year: 2026 })]
    saveSeeds(seeds)
    expect(loadSeeds()).toEqual(seeds)
  })
})
