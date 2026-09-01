import type { Seed } from '@entities/seed/seed'
import { currentYear } from '@adapters/date-utils'

export interface SeedStats {
  total: number
  expiringSoon: number
  bySource: Record<string, number>
}

export function computeStats(seeds: Seed[], now: Date = new Date()): SeedStats {
  const bySource: Record<string, number> = { bought: 0, saved: 0, swapped: 0, gifted: 0 }
  let expiringSoon = 0

  const year = currentYear(now)
  for (const seed of seeds) {
    bySource[seed.source] = (bySource[seed.source] ?? 0) + 1
    if (seed.year <= year) expiringSoon += 1
  }

  return { total: seeds.length, expiringSoon, bySource }
}
