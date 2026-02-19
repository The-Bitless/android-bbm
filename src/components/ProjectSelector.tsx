'use client'

import { useState } from 'react'
import { useProject } from '@/context/ProjectContext'

export function ProjectSelector() {
  const { projects, activeProject, setActiveProjectId, addProject, updateProject, deleteProject } =
    useProject()
  const [isAdding, setIsAdding] = useState(false)
  const [newName, setNewName] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')

  const handleAdd = () => {
    if (newName.trim()) {
      addProject(newName.trim())
      setNewName('')
      setIsAdding(false)
    }
  }

  const startEdit = (id: string, currentName: string) => {
    setEditingId(id)
    setEditName(currentName)
  }

  const saveEdit = () => {
    if (editingId && editName.trim()) {
      updateProject(editingId, { name: editName.trim() })
      setEditingId(null)
      setEditName('')
    }
  }

  const handleDelete = (id: string) => {
    if (projects.length <= 1) return
    if (confirm('Delete this project? Notes and checklist for it will be removed.')) {
      deleteProject(id)
    }
  }

  return (
    <section className="card p-6 shadow-card-lg">
      <h2 className="mb-1 font-mono text-xs font-semibold uppercase tracking-widest text-accent-cyan">
        Project
      </h2>
      <p className="mb-4 text-sm leading-relaxed text-slate-400">
        Switch between targets. Each project has its own manifest, notes and checklist.
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <select
          value={activeProject?.id ?? ''}
          onChange={(e) => setActiveProjectId(e.target.value)}
          className="rounded-lg border border-border-muted bg-surface-900/80 px-3 py-2 font-mono text-sm text-slate-200 focus:border-accent-cyan/40 focus:outline-none focus:ring-2 focus:ring-accent-cyan/20"
        >
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        {activeProject && (
          <>
            <button
              type="button"
              onClick={() => startEdit(activeProject.id, activeProject.name)}
              className="rounded-lg border border-border-muted bg-surface-900/80 px-2.5 py-1.5 text-xs font-medium text-slate-400 transition hover:bg-surface-800 hover:text-slate-200"
            >
              Rename
            </button>
            {projects.length > 1 && (
              <button
                type="button"
                onClick={() => handleDelete(activeProject.id)}
                className="rounded-lg border border-border-muted bg-surface-900/80 px-2.5 py-1.5 text-xs font-medium text-slate-400 transition hover:bg-red-900/20 hover:text-red-400"
              >
                Delete
              </button>
            )}
          </>
        )}
        {!isAdding ? (
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="rounded-lg border border-accent-cyan/40 bg-accent-cyan/10 px-3 py-2 text-xs font-medium text-accent-cyan transition hover:bg-accent-cyan/20 hover:border-accent-cyan/50"
          >
            + New project
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Project name"
              className="w-40 rounded-lg border border-border-muted bg-surface-900/80 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:border-accent-cyan/40 focus:outline-none focus:ring-2 focus:ring-accent-cyan/20"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAdd()
                if (e.key === 'Escape') setIsAdding(false)
              }}
              autoFocus
            />
            <button
              type="button"
              onClick={handleAdd}
              className="rounded-lg bg-accent-cyan/20 px-3 py-2 text-xs font-medium text-accent-cyan hover:bg-accent-cyan/30"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => { setIsAdding(false); setNewName('') }}
              className="text-xs text-slate-500 hover:text-slate-300"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
      {editingId && (
        <div className="mt-4 flex items-center gap-2 border-t border-border-subtle pt-4">
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            className="w-48 rounded-lg border border-border-muted bg-surface-900/80 px-3 py-2 text-sm text-slate-200 focus:border-accent-cyan/40 focus:outline-none focus:ring-2 focus:ring-accent-cyan/20"
            onKeyDown={(e) => {
              if (e.key === 'Enter') saveEdit()
              if (e.key === 'Escape') setEditingId(null)
            }}
          />
          <button
            type="button"
            onClick={saveEdit}
            className="rounded-lg bg-accent-cyan/20 px-3 py-2 text-xs font-medium text-accent-cyan hover:bg-accent-cyan/30"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => setEditingId(null)}
            className="text-xs text-slate-500 hover:text-slate-300"
          >
            Cancel
          </button>
        </div>
      )}
    </section>
  )
}
