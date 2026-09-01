import { useMemo, useState } from 'react'
import { useSeedStore } from '@hooks/useSeedStore'
import { filterSeeds, sortSeeds, type SortDirection } from '@use-cases/filter-seeds'
import { computeStats } from '@use-cases/compute-stats'
import type { Source } from '@entities/seed/seed'
import { TopAppBar } from './components/TopAppBar'
import { StatsBar } from './components/StatsBar'
import { FilterBar } from './components/FilterBar'
import { SeedCard } from './components/SeedCard'
import { AddSeedModal } from './components/AddSeedModal'
import { BottomNav } from './components/BottomNav'

export function App() {
  const { seeds, addSeed, removeSeed } = useSeedStore()
  const [activeSources, setActiveSources] = useState<Source[]>([])
  const [sortDir, setSortDir] = useState<SortDirection>('asc')
  const [modalOpen, setModalOpen] = useState(false)

  const stats = useMemo(() => computeStats(seeds), [seeds])
  const visibleSeeds = useMemo(() => {
    const filtered = filterSeeds(seeds, { sources: activeSources })
    return sortSeeds(filtered, sortDir)
  }, [seeds, activeSources, sortDir])

  const toggleSource = (source: Source) =>
    setActiveSources((prev) =>
      prev.includes(source) ? prev.filter((s) => s !== source) : [...prev, source],
    )

  return (
    <div className="min-h-screen pb-24 md:pb-8 pt-20">
      <TopAppBar onAdd={() => setModalOpen(true)} />

      <main className="max-w-7xl mx-auto px-gutter md:px-container-padding py-section-margin">
        <StatsBar stats={stats} />
        <FilterBar
          activeSources={activeSources}
          onToggleSource={toggleSource}
          sortDir={sortDir}
          onToggleSort={() => setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))}
        />

        {visibleSeeds.length === 0 ? (
          <div className="text-center py-16 text-on-surface-variant" role="status">
            <p className="text-lg">No seeds yet.</p>
            <p className="mt-2 text-sm">Click "Add Seed" to start your vault.</p>
          </div>
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-card-gap">
            {visibleSeeds.map((seed) => (
              <SeedCard key={seed.id} seed={seed} onDelete={removeSeed} />
            ))}
          </section>
        )}
      </main>

      <BottomNav />

      <button
        onClick={() => setModalOpen(true)}
        className="hidden md:flex fixed bottom-8 right-8 bg-cream text-[#080C08] p-4 rounded-2xl shadow-lg hover:scale-105 transition-transform items-center gap-2"
      >
        <span className="material-symbols-outlined">add</span>
        <span className="text-label-caps font-bold">Add Seed</span>
      </button>

      <AddSeedModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={addSeed}
      />
    </div>
  )
}
