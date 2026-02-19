'use client'

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useProject } from '@/context/ProjectContext'

const STORAGE_KEY = 'android-bbm-notes'

function loadNotesFromStorage(): Record<string, string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Record<string, string>) : {}
  } catch {
    return {}
  }
}

function saveNotes(notes: Record<string, string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
  } catch {
    // ignore
  }
}

function noteKey(projectId: string, sectionId: string): string {
  return `${projectId}:${sectionId}`
}

interface NotesContextValue {
  getNote: (sectionId: string) => string
  setNote: (sectionId: string, value: string) => void
}

const NotesContext = createContext<NotesContextValue | null>(null)

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const { activeProject } = useProject()
  const [notes, setNotes] = useState<Record<string, string>>({})

  useEffect(() => {
    setNotes(loadNotesFromStorage())
  }, [])

  const projectId = activeProject?.id ?? ''

  const setNote = useCallback(
    (sectionId: string, value: string) => {
      if (!projectId) return
      setNotes((prev) => {
        const next = { ...prev }
        const key = noteKey(projectId, sectionId)
        if (value.trim() === '') {
          delete next[key]
        } else {
          next[key] = value
        }
        saveNotes(next)
        return next
      })
    },
    [projectId]
  )

  const getNote = useCallback(
    (sectionId: string) => (projectId ? notes[noteKey(projectId, sectionId)] ?? '' : ''),
    [notes, projectId]
  )

  const value = useMemo(() => ({ getNote, setNote }), [getNote, setNote])

  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
}

export function useNotes() {
  const ctx = useContext(NotesContext)
  if (!ctx) throw new Error('useNotes must be used within NotesProvider')
  return ctx
}
