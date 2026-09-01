import { describe, it, expect } from 'vitest'
import { addSeed } from './add-seed'
import type { Seed, SeedInput } from '@entities/seed/seed'

const validInput: SeedInput = {
  plantName: 'Basil',
  source: 'saved',
  year: 2024,
  quantity: 'partial',
}

describe('addSeed', () => {
  it('rejects invalid input and returns no seeds', () => {
    const result = addSeed([], { ...validInput, year: 1 })

    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.errors.length).toBeGreaterThan(0)
    }
  })

  it('returns a new array with the added seed appended', () => {
    const existing: Seed[] = []
    const result = addSeed(existing, validInput)

    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.seeds).toHaveLength(1)
      expect(result.seeds[0]).toMatchObject(validInput)
    }
  })

  it('returns the created seed and does not mutate input array', () => {
    const existing: Seed[] = []
    const result = addSeed(existing, validInput)

    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.seed.plantName).toBe('Basil')
      expect(result.seed.id).toBeTruthy()
      expect(existing).toEqual([])
    }
  })

  it('appends to an existing collection', () => {
    const existing: Seed[] = [
      { id: '1', plantName: 'Tomato', source: 'bought', year: 2023, quantity: 'full', notes: '', createdAt: '2024-01-01T00:00:00.000Z' },
    ]
    const result = addSeed(existing, validInput)

    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.seeds).toHaveLength(2)
      expect(result.seeds[1].plantName).toBe('Basil')
    }
  })
})
