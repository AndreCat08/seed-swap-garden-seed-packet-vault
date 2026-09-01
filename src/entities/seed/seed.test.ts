import { describe, it, expect } from 'vitest'
import { createSeed, validateSeed, SOURCES, QUANTITIES, type SeedInput } from './seed'

describe('createSeed', () => {
  it('creates a seed with generated id and timestamp for valid input', () => {
    const input: SeedInput = {
      plantName: 'Brandywine Tomato',
      source: 'saved',
      year: 2023,
      quantity: 'full',
      notes: 'Biggest fruit of the season',
    }

    const seed = createSeed(input)

    expect(seed.id).toBeTruthy()
    expect(seed.plantName).toBe('Brandywine Tomato')
    expect(seed.source).toBe('saved')
    expect(seed.year).toBe(2023)
    expect(seed.quantity).toBe('full')
    expect(seed.notes).toBe('Biggest fruit of the season')
    expect(seed.createdAt).toMatch(/^\d{4}-\d{2}-\d{2}T/)
  })

  it('trims whitespace from plant name', () => {
    const seed = createSeed({
      plantName: '  Basil  ',
      source: 'bought',
      year: 2024,
      quantity: 'partial',
    })
    expect(seed.plantName).toBe('Basil')
  })

  it('defaults notes to empty string when omitted', () => {
    const seed = createSeed({
      plantName: 'Poppy',
      source: 'swapped',
      year: 2024,
      quantity: 'nearly_empty',
    })
    expect(seed.notes).toBe('')
  })
})

describe('validateSeed', () => {
  const valid: SeedInput = {
    plantName: 'Cherry Tomato',
    source: 'bought',
    year: 2024,
    quantity: 'full',
  }

  it('returns no errors for valid input', () => {
    expect(validateSeed(valid)).toEqual([])
  })

  it('rejects missing or empty plant name', () => {
    expect(validateSeed({ ...valid, plantName: '' })).toContain('Plant name is required')
    expect(validateSeed({ ...valid, plantName: '   ' })).toContain('Plant name is required')
  })

  it('rejects invalid source', () => {
    expect(validateSeed({ ...valid, source: 'stolen' as never })).toContain('Source must be one of: bought, saved, swapped, gifted')
  })

  it('rejects invalid quantity', () => {
    expect(validateSeed({ ...valid, quantity: 'lots' as never })).toContain('Quantity must be one of: full, partial, nearly_empty')
  })

  it('rejects year below 1900', () => {
    expect(validateSeed({ ...valid, year: 1899 })).toContain('Year must be between 1900 and 2100')
  })

  it('rejects year above 2100', () => {
    expect(validateSeed({ ...valid, year: 2101 })).toContain('Year must be between 1900 and 2100')
  })

  it('rejects non-integer year', () => {
    expect(validateSeed({ ...valid, year: 2024.5 })).toContain('Year must be a whole number')
  })

  it('accepts boundary years 1900 and 2100', () => {
    expect(validateSeed({ ...valid, year: 1900 })).toEqual([])
    expect(validateSeed({ ...valid, year: 2100 })).toEqual([])
  })
})

describe('enum constants', () => {
  it('defines the four seed sources', () => {
    expect(SOURCES).toEqual(['bought', 'saved', 'swapped', 'gifted'])
  })

  it('defines the three quantity levels', () => {
    expect(QUANTITIES).toEqual(['full', 'partial', 'nearly_empty'])
  })
})
