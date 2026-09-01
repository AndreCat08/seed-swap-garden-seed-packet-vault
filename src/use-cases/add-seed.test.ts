import { describe, it, expect } from 'vitest'
import { addSeed } from './add-seed'
import { createSeed, type SeedInput } from '@entities/seed/seed'
import type { Seed } from '@entities/seed/seed'

interface Store {
  seeds: Seed[]
}

function makeStore(): Store {
  return { seeds: [] }
}

const validInput: SeedInput = {
  plantName: 'Basil',
  source: 'saved',
  year: 2024,
  quantity: 'partial',
}

describe('addSeed', () => {
  it('rejects invalid input and does not mutate the store', () => {
    const store = makeStore()
    const result = addSeed(store, { ...validInput, year: 1 })

    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.errors.length).toBeGreaterThan(0)
    }
    expect(store.seeds).toEqual([])
  })

  it('adds a valid seed to the store', () => {
    const store = makeStore()
    const result = addSeed(store, validInput)

    expect(result.ok).toBe(true)
    expect(store.seeds).toHaveLength(1)
    expect(store.seeds[0]).toMatchObject(validInput)
  })

  it('returns the created seed on success', () => {
    const store = makeStore()
    const result = addSeed(store, validInput)

    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.seed.plantName).toBe('Basil')
      expect(result.seed.id).toBeTruthy()
    }
  })

  it('uses a real createSeed implementation (no mock)', () => {
    const store = makeStore()
    const created = createSeed(validInput)
    store.seeds.push(created)

    const result = addSeed(store, { ...validInput, plantName: 'Tomato' })
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(store.seeds).toHaveLength(2)
      expect(result.seed).not.toBe(created)
    }
  })
})
