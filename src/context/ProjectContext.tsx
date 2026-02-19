'use client'

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'android-bbm-projects'

export interface Project {
  id: string
  name: string
  manifestText: string
}

interface ProjectsState {
  activeProjectId: string | null
  projects: Project[]
}

function loadProjects(): ProjectsState {
  if (typeof window === 'undefined') {
    return { activeProjectId: null, projects: [] }
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      const defaultProject: Project = {
        id: 'default-' + Date.now(),
        name: 'Default',
        manifestText: '',
      }
      return { activeProjectId: defaultProject.id, projects: [defaultProject] }
    }
    const data = JSON.parse(raw) as ProjectsState
    if (!Array.isArray(data.projects) || data.projects.length === 0) {
      const defaultProject: Project = {
        id: 'default-' + Date.now(),
        name: 'Default',
        manifestText: '',
      }
      return { activeProjectId: defaultProject.id, projects: [defaultProject] }
    }
    const validId =
      data.activeProjectId && data.projects.some((p) => p.id === data.activeProjectId)
        ? data.activeProjectId
        : data.projects[0].id
    return { activeProjectId: validId, projects: data.projects }
  } catch {
    const defaultProject: Project = {
      id: 'default-' + Date.now(),
      name: 'Default',
      manifestText: '',
    }
    return { activeProjectId: defaultProject.id, projects: [defaultProject] }
  }
}

function saveProjects(state: ProjectsState) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // ignore
  }
}

function generateId(): string {
  return 'proj-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 9)
}

interface ProjectContextValue {
  projects: Project[]
  activeProject: Project | null
  setActiveProjectId: (id: string) => void
  addProject: (name: string) => Project
  updateProject: (id: string, payload: Partial<Pick<Project, 'name' | 'manifestText'>>) => void
  deleteProject: (id: string) => void
}

const ProjectContext = createContext<ProjectContextValue | null>(null)

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ProjectsState>({ activeProjectId: null, projects: [] })

  useEffect(() => {
    setState(loadProjects())
  }, [])

  useEffect(() => {
    if (state.projects.length === 0) return
    saveProjects(state)
  }, [state])

  const activeProject = useMemo(
    () => state.projects.find((p) => p.id === state.activeProjectId) ?? null,
    [state.projects, state.activeProjectId]
  )

  const setActiveProjectId = useCallback((id: string) => {
    setState((prev) =>
      prev.projects.some((p) => p.id === id) ? { ...prev, activeProjectId: id } : prev
    )
  }, [])

  const addProject = useCallback((name: string) => {
    const project: Project = { id: generateId(), name: name || 'Unnamed', manifestText: '' }
    setState((prev) => ({
      ...prev,
      projects: [...prev.projects, project],
      activeProjectId: project.id,
    }))
    return project
  }, [])

  const updateProject = useCallback(
    (id: string, payload: Partial<Pick<Project, 'name' | 'manifestText'>>) => {
      setState((prev) => ({
        ...prev,
        projects: prev.projects.map((p) =>
          p.id === id ? { ...p, ...payload } : p
        ),
      }))
    },
    []
  )

  const deleteProject = useCallback((id: string) => {
    setState((prev) => {
      const nextProjects = prev.projects.filter((p) => p.id !== id)
      const nextActive =
        prev.activeProjectId === id
          ? (nextProjects[0]?.id ?? null)
          : prev.activeProjectId
      return { activeProjectId: nextActive, projects: nextProjects }
    })
  }, [])

  const value = useMemo<ProjectContextValue>(
    () => ({
      projects: state.projects,
      activeProject,
      setActiveProjectId,
      addProject,
      updateProject,
      deleteProject,
    }),
    [state.projects, activeProject, setActiveProjectId, addProject, updateProject, deleteProject]
  )

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
}

export function useProject() {
  const ctx = useContext(ProjectContext)
  if (!ctx) throw new Error('useProject must be used within ProjectProvider')
  return ctx
}
