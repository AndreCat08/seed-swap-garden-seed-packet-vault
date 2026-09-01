import { describe, it, expect } from 'vitest'
import { removeSeed } from './remove-seed'
import type { Seed } from '@entities/seed/seed'

function makeSeed(id: string): Seed {
  return {
    id,
    plantName: 'Seed',
    source: 'bought',
    year: 2024,
    quantity: 'full',
    notes: '',
    createdAt: '2024-01-01T00:00:00.000Z',
  }
}

describe('removeSeed', () => {
  it('removes the seed with the matching id', () => {
    const seeds = [makeSeed('a'), makeSeed('b'), makeSeed('c')]
    const result = removeSeed(seeds, 'b')

    expect(result.map((s) => s.id)).toEqual(['a', 'c'])
  })

  it('returns the same array (no-op) when id does not exist', () => {
    const seeds = [makeSeed('a'), makeSeed('b')]
    const result = removeSeed(seeds, 'zzz')

    expect(result.map((s) => s.id)).toEqual(['a', 'b'])
  })

  it('does not mutate the input array', () => {
    const seeds = [makeSeed('a'), makeSeed('b')]
    const snapshot = [...seeds]
    removeSeed(seeds, 'a')

    expect(seeds).toEqual(snapshot)
  })

  it('handles empty array', () => {
    expect(removeSeed([], 'a')).toEqual([])
  })
})
