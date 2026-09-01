export const SOURCES = ['bought', 'saved', 'swapped', 'gifted'] as const
export type Source = (typeof SOURCES)[number]

export const QUANTITIES = ['full', 'partial', 'nearly_empty'] as const
export type Quantity = (typeof QUANTITIES)[number]

export interface Seed {
  id: string
  plantName: string
  source: Source
  year: number
  quantity: Quantity
  notes: string
  createdAt: string
}

export interface SeedInput {
  plantName: string
  source: Source
  year: number
  quantity: Quantity
  notes?: string
}

export function createId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}

export function validateSeed(input: SeedInput): string[] {
  const errors: string[] = []
  if (!input.plantName.trim()) errors.push('Plant name is required')
  if (!SOURCES.includes(input.source)) {
    errors.push('Source must be one of: bought, saved, swapped, gifted')
  }
  if (!Number.isInteger(input.year)) errors.push('Year must be a whole number')
  else if (input.year < 1900 || input.year > 2100) errors.push('Year must be between 1900 and 2100')
  if (!QUANTITIES.includes(input.quantity)) {
    errors.push('Quantity must be one of: full, partial, nearly_empty')
  }
  return errors
}

export function createSeed(input: SeedInput): Seed {
  return {
    id: createId(),
    plantName: input.plantName.trim(),
    source: input.source,
    year: input.year,
    quantity: input.quantity,
    notes: input.notes?.trim() ?? '',
    createdAt: new Date().toISOString(),
  }
}
