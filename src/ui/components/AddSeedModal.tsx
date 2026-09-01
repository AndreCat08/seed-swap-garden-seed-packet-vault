import { useState } from 'react'
import type { Source, Quantity, SeedInput } from '@entities/seed/seed'
import { SOURCES, QUANTITIES } from '@entities/seed/seed'
import { SOURCE_LABELS, QUANTITY_LABELS } from '../labels'

interface AddSeedModalProps {
  open: boolean
  onClose: () => void
  onSave: (input: SeedInput) => { ok: boolean; errors?: string[] }
}

interface FormState {
  plantName: string
  source: Source
  year: string
  quantity: Quantity
  notes: string
}

const INITIAL: FormState = { plantName: '', source: 'bought', year: '', quantity: 'full', notes: '' }

const inputClass =
  'w-full bg-surface-lowest border border-outline-variant rounded-lg p-2 text-on-surface focus:border-secondary outline-none transition-colors'

function Field({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="text-label-caps text-outline">
        {label}
      </label>
      {children}
    </div>
  )
}

export function AddSeedModal({ open, onClose, onSave }: AddSeedModalProps) {
  const [form, setForm] = useState<FormState>(INITIAL)
  const [errors, setErrors] = useState<string[]>([])

  if (!open) return null

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const result = onSave({
      plantName: form.plantName,
      source: form.source,
      year: parseInt(form.year, 10),
      quantity: form.quantity,
      notes: form.notes,
    })
    if (!result.ok) {
      setErrors(result.errors ?? ['Unable to save'])
      return
    }
    setForm(INITIAL)
    setErrors([])
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Add new seed"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="bg-surface-high w-full max-w-md rounded-xl shadow-lg overflow-hidden border border-outline-variant">
        <div className="p-6 border-b border-outline-variant flex justify-between items-center">
          <h2 className="font-headline text-2xl text-primary">Add New Seed</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-on-surface-variant hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <Field id="plant-name" label="Plant Name">
            <input
              id="plant-name"
              type="text"
              placeholder="e.g. Brandywine Tomato"
              className={inputClass}
              value={form.plantName}
              onChange={(e) => set('plantName', e.target.value)}
              required
            />
          </Field>

          <Field id="seed-source" label="Seed Source">
            <select
              id="seed-source"
              className={inputClass}
              value={form.source}
              onChange={(e) => set('source', e.target.value as Source)}
            >
              {SOURCES.map((s) => (
                <option key={s} value={s}>
                  {SOURCE_LABELS[s]}
                </option>
              ))}
            </select>
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field id="seed-year" label="Year / Exp">
              <input
                id="seed-year"
                type="number"
                min={1900}
                max={2100}
                placeholder="2024"
                className={inputClass}
                value={form.year}
                onChange={(e) => set('year', e.target.value)}
                required
              />
            </Field>
            <Field id="seed-quantity" label="Quantity">
              <select
                id="seed-quantity"
                className={inputClass}
                value={form.quantity}
                onChange={(e) => set('quantity', e.target.value as Quantity)}
              >
                {QUANTITIES.map((q) => (
                  <option key={q} value={q}>
                    {QUANTITY_LABELS[q]}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field id="seed-notes" label="Notes">
            <textarea
              id="seed-notes"
              placeholder="Growing tips..."
              className={`${inputClass} h-24 resize-none`}
              value={form.notes}
              onChange={(e) => set('notes', e.target.value)}
            />
          </Field>

          {errors.length > 0 && (
            <ul className="text-error text-xs space-y-1" role="alert">
              {errors.map((err) => (
                <li key={err}>{err}</li>
              ))}
            </ul>
          )}

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 rounded-full border border-outline text-on-surface hover:bg-surface-variant transition-colors text-label-caps"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 rounded-full bg-cream text-[#080C08] hover:scale-105 transition-transform text-label-caps font-bold"
            >
              Save Seed
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
