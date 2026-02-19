'use client'

import { useChecklist } from '@/context/ChecklistContext'
import { useManifest } from '@/context/ManifestContext'
import type { ChecklistFilter } from '@/context/ChecklistContext'

const FILTERS: { value: ChecklistFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'in_progress', label: 'In progress' },
  { value: 'done', label: 'Done' },
]

export function ChecklistFilterBar() {
  const { filter, setFilter } = useChecklist()
  const { showOnlyInScope, setShowOnlyInScope, manifestText } = useManifest()
  const hasManifest = manifestText.trim().length > 0

  return (
    <div className="card flex flex-wrap items-center gap-4 px-4 py-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-xs font-medium text-slate-500">Show</span>
        {FILTERS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            onClick={() => setFilter(value)}
            className={`rounded-lg px-3 py-1.5 font-mono text-xs font-medium transition ${
              filter === value
                ? 'bg-accent-cyan/15 text-accent-cyan shadow-sm'
                : 'text-slate-400 hover:bg-surface-700/80 hover:text-slate-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      {hasManifest && (
        <label className="flex cursor-pointer items-center gap-2.5">
          <input
            type="checkbox"
            checked={showOnlyInScope}
            onChange={(e) => setShowOnlyInScope(e.target.checked)}
            className="h-4 w-4 rounded border-border-muted bg-surface-900 text-accent-cyan focus:ring-2 focus:ring-accent-cyan/30"
          />
          <span className="text-sm text-slate-400">Show only in scope</span>
        </label>
      )}
    </div>
  )
}
