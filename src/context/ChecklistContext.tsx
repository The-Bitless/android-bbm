'use client'

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useProject } from '@/context/ProjectContext'

const STORAGE_KEY = 'android-bbm-checklist'

export type ChecklistStatus = 'pending' | 'in_progress' | 'done'

function loadChecklistFromStorage(): Record<string, ChecklistStatus> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Record<string, ChecklistStatus>) : {}
  } catch {
    return {}
  }
}

function saveChecklist(checklist: Record<string, ChecklistStatus>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checklist))
  } catch {
    // ignore
  }
}

function checklistKey(projectId: string, sectionId: string): string {
  return `${projectId}:${sectionId}`
}

export type ChecklistFilter = 'all' | 'pending' | 'in_progress' | 'done'

interface ChecklistContextValue {
  getStatus: (sectionId: string) => ChecklistStatus
  setStatus: (sectionId: string, status: ChecklistStatus) => void
  filter: ChecklistFilter
  setFilter: (f: ChecklistFilter) => void
  matchesFilter: (sectionId: string) => boolean
}

const ChecklistContext = createContext<ChecklistContextValue | null>(null)

export function ChecklistProvider({ children }: { children: React.ReactNode }) {
  const { activeProject } = useProject()
  const [checklist, setChecklist] = useState<Record<string, ChecklistStatus>>({})
  const [filter, setFilter] = useState<ChecklistFilter>('all')

  useEffect(() => {
    setChecklist(loadChecklistFromStorage())
  }, [])

  const projectId = activeProject?.id ?? ''

  const setStatus = useCallback(
    (sectionId: string, status: ChecklistStatus) => {
      if (!projectId) return
      setChecklist((prev) => {
        const key = checklistKey(projectId, sectionId)
        const next = { ...prev, [key]: status }
        saveChecklist(next)
        return next
      })
    },
    [projectId]
  )

  const getStatus = useCallback(
    (sectionId: string): ChecklistStatus =>
      projectId ? (checklist[checklistKey(projectId, sectionId)] ?? 'pending') : 'pending',
    [checklist, projectId]
  )

  const matchesFilter = useCallback(
    (sectionId: string): boolean => {
      if (filter === 'all') return true
      const status = getStatus(sectionId)
      return status === filter
    },
    [filter, getStatus]
  )

  const value = useMemo<ChecklistContextValue>(
    () => ({
      getStatus,
      setStatus,
      filter,
      setFilter,
      matchesFilter,
    }),
    [getStatus, setStatus, filter, setFilter, matchesFilter]
  )

  return (
    <ChecklistContext.Provider value={value}>{children}</ChecklistContext.Provider>
  )
}

export function useChecklist() {
  const ctx = useContext(ChecklistContext)
  if (!ctx) throw new Error('useChecklist must be used within ChecklistProvider')
  return ctx
}
