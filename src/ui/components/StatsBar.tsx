import type { SeedStats } from '@use-cases/compute-stats'
import { SOURCE_LABELS, SOURCE_ORDER } from '../labels'

interface StatsBarProps {
  stats: SeedStats
}

export function StatsBar({ stats }: StatsBarProps) {
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-card-gap mb-section-margin">
      <div className="bg-surface-container p-6 rounded-xl shadow-ambient">
        <h3 className="text-label-caps text-outline mb-2">Total Packets</h3>
        <p className="font-headline text-3xl text-primary">{stats.total}</p>
      </div>

      <div className="bg-error-container p-6 rounded-xl shadow-ambient border border-error">
        <h3 className="text-label-caps text-on-error-container mb-2">Expiring Soon</h3>
        <p className="font-headline text-3xl text-on-error-container">{stats.expiringSoon}</p>
      </div>

      <div className="bg-surface-container p-6 rounded-xl shadow-ambient col-span-2 flex justify-between items-center">
        <div className="w-full">
          <h3 className="text-label-caps text-outline mb-2">Sources</h3>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-mono-data text-on-surface-variant">
            {SOURCE_ORDER.map((source) => (
              <span key={source}>
                {SOURCE_LABELS[source]}: {stats.bySource[source] ?? 0}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
