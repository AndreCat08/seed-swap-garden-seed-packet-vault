import type { Seed } from '@entities/seed/seed'

export const STORAGE_KEY = 'seed-vault-seeds'

export function loadSeeds(): Seed[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as Seed[]) : []
  } catch {
    return []
  }
}

export function saveSeeds(seeds: Seed[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seeds))
}
