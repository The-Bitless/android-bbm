'use client'

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { MethodologyData } from '@/types/methodology'
import { flattenSubsections } from '@/types/methodology'
import { buildTriggerMatchMap } from '@/lib/manifestParser'
import { useProject } from '@/context/ProjectContext'

interface ManifestContextValue {
  manifestText: string
  setManifestText: (text: string) => void
  triggerMatchMap: Record<string, boolean>
  methodology: MethodologyData | null
  setMethodology: (m: MethodologyData | null) => void
  showOnlyInScope: boolean
  setShowOnlyInScope: (v: boolean) => void
}

const ManifestContext = createContext<ManifestContextValue | null>(null)

export function ManifestProvider({
  children,
  initialMethodology,
}: {
  children: React.ReactNode
  initialMethodology: MethodologyData | null
}) {
  const { activeProject, updateProject } = useProject()
  const [methodology, setMethodology] = useState<MethodologyData | null>(initialMethodology)
  const [showOnlyInScope, setShowOnlyInScope] = useState(false)

  const manifestText = activeProject?.manifestText ?? ''

  const setManifestText = useCallback(
    (text: string) => {
      if (activeProject) updateProject(activeProject.id, { manifestText: text })
    },
    [activeProject, updateProject]
  )

  const triggerMatchMap = useMemo(() => {
    if (!manifestText.trim() || !methodology) return {}
    const subsections = flattenSubsections(methodology).map((s) => ({
      id: s.id,
      triggers: s.triggers,
    }))
    return buildTriggerMatchMap(manifestText, subsections)
  }, [manifestText, methodology])

  const value = useMemo<ManifestContextValue>(
    () => ({
      manifestText,
      setManifestText,
      triggerMatchMap,
      methodology,
      setMethodology,
      showOnlyInScope,
      setShowOnlyInScope,
    }),
    [manifestText, setManifestText, triggerMatchMap, methodology, showOnlyInScope]
  )

  return <ManifestContext.Provider value={value}>{children}</ManifestContext.Provider>
}

export function useManifest() {
  const ctx = useContext(ManifestContext)
  if (!ctx) throw new Error('useManifest must be used within ManifestProvider')
  return ctx
}
