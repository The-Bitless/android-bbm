import { getMethodology } from '@/lib/methodology'
import { MethodologyReference } from '@/components/MethodologyReference'

export const metadata = {
  title: 'Methodology | Android Bug Bounty Methodology',
  description: 'Reference methodology for APK assessment (Manifest, Dynamic, Component Exploitation).',
}

export default async function MethodologyPage() {
  let methodology = null
  try {
    methodology = await getMethodology()
  } catch {
    // Handled in component
  }

  return (
    <div className="space-y-10">
      <header className="rounded-xl border border-border-muted/80 bg-surface-800/60 px-6 py-5 shadow-card">
        <h1 className="font-mono text-2xl font-semibold tracking-tight text-slate-100">
          {methodology?.metodologia ?? 'Android Bug Bounty Methodology'}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">
          {methodology?.descripcion ??
            'Modular methodology for APK assessment. Information extraction and analysis of the application blueprint, dynamic behaviour, and component exploitation.'}
        </p>
        {methodology?.version && (
          <p className="mt-2 font-mono text-xs text-slate-500">Version {methodology.version}</p>
        )}
        <p className="mt-4 text-xs leading-relaxed text-slate-500">
          Reference view. Use the <strong className="text-slate-400">Tool</strong> tab to map scope, take notes and track progress per project.
        </p>
      </header>

      <MethodologyReference methodology={methodology} />
    </div>
  )
}
