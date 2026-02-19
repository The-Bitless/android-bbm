import { getMethodology } from '@/lib/methodology'
import { ScopeMapper } from '@/components/ScopeMapper'
import { ProjectSelector } from '@/components/ProjectSelector'
import { ChecklistFilterBar } from '@/components/ChecklistFilter'
import { ExportReportButton } from '@/components/ExportReportButton'
import { MethodologyModule } from '@/components/MethodologyModule'

export default async function HomePage() {
  let methodology = null
  try {
    methodology = await getMethodology()
  } catch {
    // Handled below with fallback copy
  }

  return (
    <div className="space-y-10">
      <header className="flex flex-wrap items-start justify-between gap-6 rounded-xl border border-border-muted/80 bg-surface-800/60 px-6 py-5 shadow-card">
        <div>
          <h1 className="font-mono text-2xl font-semibold tracking-tight text-slate-100">
            {methodology?.metodologia ?? 'Android Bug Bounty Methodology'}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            {methodology?.descripcion ??
              'Modular methodology for APK assessment based on OWASP WSTG standards.'}
          </p>
          {methodology?.version && (
            <p className="mt-2 font-mono text-xs text-slate-500">Version {methodology.version}</p>
          )}
        </div>
        <ExportReportButton />
      </header>

      <ProjectSelector />
      <ScopeMapper />

      {methodology?.modulos?.length ? (
        <div className="space-y-10">
          <ChecklistFilterBar />
          {methodology.modulos.map((mod) => (
            <MethodologyModule key={mod.id} module={mod} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-500">
          No methodology modules loaded. Ensure{' '}
          <code className="rounded bg-surface-800 px-1 font-mono text-xs">
            public/methodology.json
          </code>{' '}
          exists.
        </p>
      )}
    </div>
  )
}
