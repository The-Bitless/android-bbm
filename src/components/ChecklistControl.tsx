'use client'

import { useChecklist } from '@/context/ChecklistContext'
import type { ChecklistStatus } from '@/context/ChecklistContext'

interface ChecklistControlProps {
  sectionId: string
}

const STATUS_LABELS: Record<ChecklistStatus, string> = {
  pending: 'Pending',
  in_progress: 'In progress',
  done: 'Done',
}

export function ChecklistControl({ sectionId }: ChecklistControlProps) {
  const { getStatus, setStatus } = useChecklist()
  const status = getStatus(sectionId)

  return (
    <div className="mt-3 flex items-center gap-2">
      <span className="font-mono text-xs font-medium text-slate-500">Status</span>
      <select
        value={status}
        onChange={(e) => setStatus(sectionId, e.target.value as ChecklistStatus)}
        className={`rounded-lg border px-2.5 py-1.5 font-mono text-xs font-medium focus:outline-none focus:ring-2 ${
          status === 'done'
            ? 'border-accent-emerald/40 bg-accent-emerald/10 text-accent-emerald focus:ring-accent-emerald/20'
            : status === 'in_progress'
              ? 'border-accent-amber/40 bg-accent-amber/10 text-accent-amber focus:ring-accent-amber/20'
              : 'border-border-muted bg-surface-900/80 text-slate-400 focus:ring-accent-cyan/20'
        }`}
      >
        {(['pending', 'in_progress', 'done'] as const).map((s) => (
          <option key={s} value={s}>
            {STATUS_LABELS[s]}
          </option>
        ))}
      </select>
    </div>
  )
}
