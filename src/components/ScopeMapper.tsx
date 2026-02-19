'use client'

import { useManifest } from '@/context/ManifestContext'

export function ScopeMapper() {
  const { manifestText, setManifestText } = useManifest()

  return (
    <section className="card p-6 shadow-card-lg">
      <h2 className="mb-1 font-mono text-xs font-semibold uppercase tracking-widest text-accent-cyan">
        Scope Mapper
      </h2>
      <p className="mb-4 text-sm leading-relaxed text-slate-400">
        Paste your AndroidManifest.xml below. Sections of the methodology will be highlighted when
        matching triggers are found (e.g. exported components, deep links, backup flags).
      </p>
      <textarea
        value={manifestText}
        onChange={(e) => setManifestText(e.target.value)}
        placeholder={`<?xml version="1.0" encoding="utf-8"?>\n<manifest ...>\n  <application android:allowBackup="true" ...>\n  ...\n</manifest>`}
        className="min-h-[200px] w-full resize-y rounded-lg border border-border-muted bg-surface-900/80 px-4 py-3 font-mono text-sm leading-relaxed text-slate-200 placeholder:text-slate-500 focus:border-accent-cyan/40 focus:outline-none focus:ring-2 focus:ring-accent-cyan/20"
        spellCheck={false}
      />
    </section>
  )
}
