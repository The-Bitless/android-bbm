import type { MethodologyData } from '@/types/methodology'

interface MethodologyReferenceProps {
  methodology: MethodologyData | null
}

export function MethodologyReference({ methodology }: MethodologyReferenceProps) {
  if (!methodology?.modulos?.length) {
    return (
      <p className="text-sm text-slate-500">
        No methodology loaded. Ensure{' '}
        <code className="rounded bg-surface-800 px-1 font-mono text-xs">
          public/methodology.json
        </code>{' '}
        exists.
      </p>
    )
  }

  return (
    <div className="space-y-10">
      {methodology.modulos.map((mod) => (
        <article
          key={mod.id}
          className="card overflow-hidden shadow-card-lg"
        >
          <header className="border-b border-border-subtle bg-surface-900/70 px-6 py-4">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent-cyan">{mod.id}</span>
            <h2 className="mt-2 text-lg font-semibold tracking-tight text-slate-100">{mod.nombre}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">{mod.descripcion}</p>
          </header>
          <div className="divide-y divide-border-subtle">
            {mod.secciones.map((sec) => (
              <section key={sec.id} className="border-border-subtle">
                <div className="border-b border-border-subtle bg-surface-900/50 px-6 py-3">
                  <span className="font-mono text-xs font-semibold text-accent-cyan">{sec.id}</span>
                  <h3 className="mt-0.5 font-medium text-slate-200">{sec.titulo}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-400">{sec.descripcion}</p>
                </div>
                <ul className="divide-y divide-border-subtle">
                  {sec.subsecciones.map((sub) => (
                    <li key={sub.id} className="px-6 py-4">
                      <span className="font-mono text-xs text-slate-500">{sub.id}</span>
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
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </article>
      ))}
    </div>
  )
}
