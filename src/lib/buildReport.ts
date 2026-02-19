import type { MethodologyData } from '@/types/methodology'
import type { ChecklistStatus } from '@/context/ChecklistContext'
import type { Project } from '@/context/ProjectContext'

interface BuildReportParams {
  project: Project
  methodology: MethodologyData | null
  triggerMatchMap: Record<string, boolean>
  getNote: (sectionId: string) => string
  getStatus: (sectionId: string) => ChecklistStatus
  hasManifest: boolean
}

function isInScope(
  subsection: { id: string; alwaysInScope?: boolean },
  hasManifest: boolean,
  triggerMatchMap: Record<string, boolean>
): boolean {
  if (subsection.alwaysInScope) return true
  if (!hasManifest) return true
  return triggerMatchMap[subsection.id] ?? false
}

export function buildReportMarkdown(params: BuildReportParams): string {
  const {
    project,
    methodology,
    triggerMatchMap,
    getNote,
    getStatus,
    hasManifest,
  } = params

  const date = new Date().toISOString().slice(0, 10)
  const lines: string[] = []

  lines.push(`# ${project.name}`)
  lines.push('')
  lines.push(`**Android Bug Bounty Methodology – Report**`)
  lines.push(`Generated: ${date}`)
  lines.push('')
  lines.push('---')
  lines.push('')

  if (project.manifestText.trim()) {
    lines.push('## Manifest')
    lines.push('')
    lines.push('```xml')
    lines.push(project.manifestText.trim())
    lines.push('```')
    lines.push('')
  }

  if (!methodology?.modulos?.length) {
    lines.push('*No methodology loaded.*')
    return lines.join('\n')
  }

  lines.push('## Methodology')
  lines.push('')

  for (const mod of methodology.modulos) {
    lines.push(`### ${mod.nombre}`)
    lines.push('')
    lines.push(mod.descripcion)
    lines.push('')

    for (const sec of mod.secciones) {
      lines.push(`#### ${sec.id} – ${sec.titulo}`)
      lines.push('')
      lines.push(sec.descripcion)
      lines.push('')

      for (const sub of sec.subsecciones) {
        const inScope = isInScope(sub, hasManifest, triggerMatchMap)
        const status = getStatus(sub.id)
        const note = getNote(sub.id)

        lines.push(`##### ${sub.id} – ${sub.titulo}`)
        lines.push('')
        if (hasManifest) {
          lines.push(`**Scope:** ${inScope ? 'In scope' : 'Not in scope'}`)
          lines.push('')
        }
        lines.push(`**Status:** ${status}`)
        lines.push('')
        lines.push(sub.descripcion)
        lines.push('')
        if (sub.pasos.length > 0) {
          lines.push('Steps:')
          sub.pasos.forEach((p, i) => {
            lines.push(`${i + 1}. ${p}`)
          })
          lines.push('')
        }
        if (note.trim()) {
          lines.push('**My notes:**')
          lines.push('')
          lines.push(note.trim())
          lines.push('')
        }
        lines.push('---')
        lines.push('')
      }
    }
  }

  return lines.join('\n')
}

export function downloadMarkdown(content: string, filename: string) {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename.endsWith('.md') ? filename : `${filename}.md`
  a.click()
  URL.revokeObjectURL(url)
}
