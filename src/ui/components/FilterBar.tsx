import type { Source } from '@entities/seed/seed'
import type { SortDirection } from '@use-cases/filter-seeds'
import { SOURCE_LABELS, SOURCE_ORDER } from '../labels'

interface FilterBarProps {
  activeSources: Source[]
  onToggleSource: (source: Source) => void
  sortDir: SortDirection
  onToggleSort: () => void
}

export function FilterBar({ activeSources, onToggleSource, sortDir, onToggleSort }: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      <span className="text-label-caps text-outline uppercase">Filter:</span>
      {SOURCE_ORDER.map((source) => {
        const active = activeSources.includes(source)
        return (
          <button
            key={source}
            onClick={() => onToggleSource(source)}
            aria-pressed={active}
            className={`px-4 py-1.5 rounded-full text-label-caps transition-colors border ${
              active
                ? 'bg-secondary-container text-on-secondary-container border-secondary'
                : 'text-on-surface-variant border-outline-variant hover:bg-surface-container'
            }`}
          >
            {SOURCE_LABELS[source]}
          </button>
        )
      })}

      <div className="flex-1" />

      <button
        onClick={onToggleSort}
        aria-label={`Sort by expiration year ${sortDir === 'asc' ? 'ascending' : 'descending'}`}
        className="px-4 py-1.5 rounded-full text-label-caps transition-colors border border-outline-variant text-on-surface-variant hover:bg-surface-container"
      >
        Year {sortDir === 'asc' ? '↑' : '↓'}
      </button>
    </div>
  )
}
