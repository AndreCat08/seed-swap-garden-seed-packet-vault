import type { Seed } from '@entities/seed/seed'

export function removeSeed(seeds: Seed[], id: string): Seed[] {
  return seeds.filter((seed) => seed.id !== id)
}
