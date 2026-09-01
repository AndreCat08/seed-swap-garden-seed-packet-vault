import { useState, useCallback, useEffect } from 'react'
import { loadSeeds, saveSeeds } from '@adapters/local-storage'
import { addSeed as addSeedUseCase, type AddSeedResult } from '@use-cases/add-seed'
import { removeSeed as removeSeedUseCase } from '@use-cases/remove-seed'
import type { Seed, SeedInput } from '@entities/seed/seed'

export function useSeedStore() {
  const [seeds, setSeeds] = useState<Seed[]>([])

  useEffect(() => {
    setSeeds(loadSeeds())
  }, [])

  const addSeed = useCallback((input: SeedInput): AddSeedResult => {
    const result = addSeedUseCase(loadSeeds(), input)
    if (result.ok) {
      saveSeeds(result.seeds)
      setSeeds(result.seeds)
    }
    return result
  }, [])

  const removeSeed = useCallback((id: string) => {
    setSeeds((prev) => {
      const next = removeSeedUseCase(prev, id)
      saveSeeds(next)
      return next
    })
  }, [])

  return { seeds, addSeed, removeSeed }
}
