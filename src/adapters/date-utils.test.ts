import { describe, it, expect } from 'vitest'
import { isExpired, isExpiringSoon } from './date-utils'

const NOW = new Date('2026-09-01T12:00:00.000Z')

describe('isExpired', () => {
  it('returns true for a year before the current year', () => {
    expect(isExpired(2025, NOW)).toBe(true)
  })

  it('returns false for the current year', () => {
    expect(isExpired(2026, NOW)).toBe(false)
  })

  it('returns false for a future year', () => {
    expect(isExpired(2030, NOW)).toBe(false)
  })
})

describe('isExpiringSoon', () => {
  it('returns true for the current year', () => {
    expect(isExpiringSoon(2026, NOW)).toBe(true)
  })

  it('returns false for a past year', () => {
    expect(isExpiringSoon(2025, NOW)).toBe(false)
  })

  it('returns false for a future year', () => {
    expect(isExpiringSoon(2027, NOW)).toBe(false)
  })
})
