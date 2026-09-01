import type { Source, Quantity } from '@entities/seed/seed'

export const SOURCE_LABELS: Record<Source, string> = {
  bought: 'Bought',
  saved: 'Saved',
  swapped: 'Swapped',
  gifted: 'Gifted',
}

export const QUANTITY_LABELS: Record<Quantity, string> = {
  full: 'Full',
  partial: 'Partial',
  nearly_empty: 'Nearly Empty',
}

export const SOURCE_ORDER: Source[] = ['bought', 'saved', 'swapped', 'gifted']
