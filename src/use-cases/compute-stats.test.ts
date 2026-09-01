import { describe, it, expect } from 'vitest'
import { computeStats } from './compute-stats'
import type { Seed } from '@entities/seed/seed'

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

describe('computeStats', () => {
  it('returns all-zero stats for an empty collection', () => {
    expect(computeStats([])).toEqual({
      total: 0,
      expiringSoon: 0,
      bySource: { bought: 0, saved: 0, swapped: 0, gifted: 0 },
    })
  })

  it('counts total packets', () => {
    const seeds = [makeSeed({}), makeSeed({ id: 'b' }), makeSeed({ id: 'c' })]
    expect(computeStats(seeds).total).toBe(3)
  })

  it('counts expired and current-year seeds as expiring soon', () => {
    const now = new Date('2026-09-01T12:00:00.000Z')
    const seeds = [
      makeSeed({ year: 2020 }), // expired -> expiring
      makeSeed({ year: 2026 }), // current -> expiring
      makeSeed({ year: 2027 }), // future -> not
      makeSeed({ year: 2030 }), // future -> not
    ]
    expect(computeStats(seeds, now).expiringSoon).toBe(2)
  })

  it('counts by source type', () => {
    const seeds = [
      makeSeed({ source: 'bought' }),
      makeSeed({ source: 'bought' }),
      makeSeed({ source: 'saved' }),
      makeSeed({ source: 'swapped' }),
      makeSeed({ source: 'gifted' }),
    ]
    expect(computeStats(seeds).bySource).toEqual({
      bought: 2,
      saved: 1,
      swapped: 1,
      gifted: 1,
    })
  })
})
