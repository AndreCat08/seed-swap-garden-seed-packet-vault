import { createSeed, validateSeed, type Seed, type SeedInput } from '@entities/seed/seed'

export type AddSeedResult =
  | { ok: true; seed: Seed }
  | { ok: false; errors: string[] }

export function addSeed(store: { seeds: Seed[] }, input: SeedInput): AddSeedResult {
  const errors = validateSeed(input)
  if (errors.length > 0) return { ok: false, errors }
  const seed = createSeed(input)
  store.seeds.push(seed)
  return { ok: true, seed }
}
