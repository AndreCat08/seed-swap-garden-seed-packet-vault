import { act, renderHook } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { useSeedStore } from './useSeedStore'
import type { SeedInput } from '@entities/seed/seed'

const STORAGE_KEY = 'seed-vault-seeds'
const validInput: SeedInput = { plantName: 'Basil', source: 'saved', year: 2024, quantity: 'full', notes: 'Great germination' }
const stored = () => JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null')

describe('useSeedStore', () => {
  beforeEach(() => localStorage.clear())

  it('loads seeds from localStorage on mount', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([{ id: '1', plantName: 'Tomato', source: 'bought', year: 2023, quantity: 'full', notes: '', createdAt: '2024-01-01T00:00:00.000Z' }]),
    )
    const { result } = renderHook(() => useSeedStore())
    expect(result.current.seeds).toHaveLength(1)
    expect(result.current.seeds[0].plantName).toBe('Tomato')
  })

  it('starts empty when nothing is stored', () => {
    const { result } = renderHook(() => useSeedStore())
    expect(result.current.seeds).toEqual([])
  })

  it('adds a seed to state and persists to localStorage', () => {
    const { result } = renderHook(() => useSeedStore())
    act(() => {
      expect(result.current.addSeed(validInput).ok).toBe(true)
    })
    expect(result.current.seeds).toHaveLength(1)
    expect(stored()).toHaveLength(1)
    expect(stored()[0].plantName).toBe('Basil')
  })

  it('rejects invalid seeds without mutating state or storage', () => {
    const { result } = renderHook(() => useSeedStore())
    let errors: string[] = []
    act(() => {
      const outcome = result.current.addSeed({ ...validInput, year: 1 })
      if (!outcome.ok) errors = outcome.errors
    })
    expect(errors.length).toBeGreaterThan(0)
    expect(result.current.seeds).toEqual([])
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull()
  })

  it('removes a seed from state and persists', () => {
    const { result } = renderHook(() => useSeedStore())
    act(() => {
      result.current.addSeed(validInput)
    })
    act(() => {
      result.current.removeSeed(result.current.seeds[0].id)
    })
    expect(result.current.seeds).toEqual([])
    expect(stored()).toEqual([])
  })
})
