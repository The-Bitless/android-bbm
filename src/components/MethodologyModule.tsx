'use client'

import { useManifest } from '@/context/ManifestContext'
import { useChecklist } from '@/context/ChecklistContext'
import { SubsectionNotes } from '@/components/SubsectionNotes'
import { ChecklistControl } from '@/components/ChecklistControl'
import type { Module } from '@/types/methodology'

interface MethodologyModuleProps {
  module: Module
}

function SubsectionBlock({
  sub,
  isActive,
  hasManifest,
}: {
  sub: { id: string; titulo: string; descripcion: string; triggers: string[]; pasos: string[] }
  isActive: boolean
  hasManifest: boolean
}) {
  return (
    <li
      className={
        isActive
          ? 'section-active px-6 py-4'
          : 'section-disabled px-6 py-4'
      }
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-xs text-slate-500">{sub.id}</span>
        {hasManifest && (
          <span
            className={`rounded-md px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wide ${
              isActive
                ? 'bg-accent-emerald/15 text-accent-emerald'
                : 'bg-slate-600/20 text-slate-500'
            }`}
          >
            {isActive ? 'In scope' : 'Not in scope'}
          </span>
        )}
      </div>
      <h4 className="mt-1 font-medium text-slate-200">{sub.titulo}</h4>
      <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{sub.descripcion}</p>
      {sub.triggers.length > 0 && (
        <p className="mt-2 text-xs text-slate-500">
          Triggers: {sub.triggers.map((t) => `"${t}"`).join(', ')}
        </p>
      )}
      {sub.pasos.length > 0 && (
        <ol className="mt-3 list-inside list-decimal space-y-1 text-sm text-slate-400">
          {sub.pasos.map((paso, i) => (
            <li key={i}>{paso}</li>
          ))}
        </ol>
      )}
      <ChecklistControl sectionId={sub.id} />
      <SubsectionNotes sectionId={sub.id} />
    </li>
  )
}

export function MethodologyModule({ module: mod }: MethodologyModuleProps) {
  const { triggerMatchMap, manifestText, showOnlyInScope } = useManifest()
  const { matchesFilter } = useChecklist()
  const hasManifest = manifestText.trim().length > 0

  return (
    <article className="card overflow-hidden shadow-card-lg">
      <header className="border-b border-border-subtle bg-surface-900/70 px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent-cyan">{mod.id}</span>
          <h2 className="text-lg font-semibold tracking-tight text-slate-100">{mod.nombre}</h2>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">{mod.descripcion}</p>
      </header>
      <div className="divide-y divide-border-subtle">
        {mod.secciones.map((sec) => {
          const visibleSubs = sec.subsecciones.filter((sub) => {
            const isActive =
              sub.alwaysInScope === true ||
              (hasManifest ? (triggerMatchMap[sub.id] ?? false) : true)
            const passesChecklist = matchesFilter(sub.id)
            const passesScopeFilter = !showOnlyInScope || isActive
            return passesChecklist && passesScopeFilter
          })
          if (visibleSubs.length === 0) return null
          return (
            <section key={sec.id} className="border-border-subtle">
              <div className="border-b border-border-subtle bg-surface-900/50 px-6 py-3">
                <span className="font-mono text-xs font-semibold text-accent-cyan">{sec.id}</span>
                <h3 className="mt-0.5 font-medium text-slate-200">{sec.titulo}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-400">{sec.descripcion}</p>
              </div>
              <ul className="divide-y divide-border-subtle">
                {visibleSubs.map((sub) => {
                  const isActive =
                    sub.alwaysInScope === true ||
                    (hasManifest ? (triggerMatchMap[sub.id] ?? false) : true)
                  return (
                    <SubsectionBlock
                      key={sub.id}
                      sub={sub}
                      isActive={isActive}
                      hasManifest={hasManifest}
                    />
                  )
                })}
              </ul>
            </section>
          )
        })}
      </div>
    </article>
  )
}
