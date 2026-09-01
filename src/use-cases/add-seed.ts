import { createSeed, validateSeed, type Seed, type SeedInput } from '@entities/seed/seed'

export type AddSeedResult =
  | { ok: true; seed: Seed; seeds: Seed[] }
  | { ok: false; errors: string[] }

export function addSeed(seeds: Seed[], input: SeedInput): AddSeedResult {
  const errors = validateSeed(input)
  if (errors.length > 0) return { ok: false, errors }
  const seed = createSeed(input)
  return { ok: true, seed, seeds: [...seeds, seed] }
}
