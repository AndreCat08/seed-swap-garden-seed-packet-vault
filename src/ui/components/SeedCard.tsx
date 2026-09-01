import { isExpired, isExpiringSoon } from '@adapters/date-utils'
import { SOURCE_LABELS, QUANTITY_LABELS } from '../labels'
import type { Seed } from '@entities/seed/seed'

interface SeedCardProps {
  seed: Seed
  onDelete?: (id: string) => void
}

export function SeedCard({ seed, onDelete }: SeedCardProps) {
  const expired = isExpired(seed.year)
  const expiring = isExpiringSoon(seed.year)

  const statusClass = expired
    ? 'border border-error'
    : expiring
      ? 'border border-warning'
      : ''

  const statusBadge = expired ? (
    <span className="bg-error text-on-error px-3 py-1 rounded-full font-label-caps text-label-caps">
      Expired {seed.year}
    </span>
  ) : expiring ? (
    <span className="bg-warning text-on-warning px-3 py-1 rounded-full font-label-caps text-label-caps">
      Expiring {seed.year}
    </span>
  ) : null

  return (
    <article
      className={`bg-surface-low rounded-xl overflow-hidden shadow-ambient flex flex-col relative ${statusClass}`}
      aria-label={`${seed.plantName}, ${SOURCE_LABELS[seed.source]}, ${QUANTITY_LABELS[seed.quantity]}`}
    >
      <div className="absolute top-4 right-4 z-10 flex gap-2 flex-wrap justify-end">
        {statusBadge}
        <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full font-label-caps text-label-caps border border-secondary">
          {SOURCE_LABELS[seed.source]}
        </span>
      </div>

      <div className="h-40 w-full bg-surface-highest" aria-hidden="true" />

      <div className="p-6 flex-1 flex flex-col">
        <h2 className="font-headline text-xl text-primary mb-2 font-semibold">{seed.plantName}</h2>
        <div className="flex justify-between items-center text-sm text-on-surface-variant mb-4">
          <span>{seed.year}</span>
          <span>Qty: {QUANTITY_LABELS[seed.quantity]}</span>
        </div>
        {seed.notes && <p className="text-on-surface-variant text-sm flex-1">{seed.notes}</p>}
        {onDelete && (
          <button
            onClick={() => onDelete(seed.id)}
            className="mt-4 self-end text-sm text-outline hover:text-error transition-colors"
            aria-label={`Delete ${seed.plantName}`}
          >
            Delete
          </button>
        )}
      </div>
    </article>
  )
}
