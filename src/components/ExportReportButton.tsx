'use client'

import { useProject } from '@/context/ProjectContext'
import { useManifest } from '@/context/ManifestContext'
import { useNotes } from '@/context/NotesContext'
import { useChecklist } from '@/context/ChecklistContext'
import { buildReportMarkdown, downloadMarkdown } from '@/lib/buildReport'

export function ExportReportButton() {
  const { activeProject } = useProject()
  const { manifestText, triggerMatchMap, methodology } = useManifest()
  const { getNote } = useNotes()
  const { getStatus } = useChecklist()

  const handleExport = () => {
    if (!activeProject) return
    const hasManifest = manifestText.trim().length > 0
    const md = buildReportMarkdown({
      project: activeProject,
      methodology,
      triggerMatchMap,
      getNote,
      getStatus,
      hasManifest,
    })
    const safeName = activeProject.name.replace(/[^a-zA-Z0-9-_]/g, '_')
    downloadMarkdown(md, `bbm-report-${safeName}.md`)
  }

  return (
    <button
      type="button"
      onClick={handleExport}
      className="rounded-lg border border-accent-cyan/40 bg-accent-cyan/10 px-4 py-2 font-mono text-sm font-medium text-accent-cyan shadow-sm transition hover:bg-accent-cyan/20 hover:border-accent-cyan/50"
    >
      Export report
    </button>
  )
}
