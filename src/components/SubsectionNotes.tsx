'use client'

import { useNotes } from '@/context/NotesContext'

interface SubsectionNotesProps {
  sectionId: string
}

export function SubsectionNotes({ sectionId }: SubsectionNotesProps) {
  const { getNote, setNote } = useNotes()
  const value = getNote(sectionId)

  return (
    <div className="mt-4 rounded-lg border border-border-subtle bg-surface-900/50 p-3">
      <label className="mb-2 block font-mono text-xs font-semibold uppercase tracking-wider text-slate-500">
        My notes
      </label>
      <textarea
        value={value}
        onChange={(e) => setNote(sectionId, e.target.value)}
        placeholder="Add notes for this step (saved in your browser)..."
        className="min-h-[88px] w-full resize-y rounded-lg border border-border-muted bg-surface-800/80 px-3 py-2 text-sm leading-relaxed text-slate-200 placeholder:text-slate-500 focus:border-accent-cyan/40 focus:outline-none focus:ring-2 focus:ring-accent-cyan/20"
        spellCheck={true}
      />
    </div>
  )
}
