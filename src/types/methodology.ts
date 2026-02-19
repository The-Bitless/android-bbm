export interface Subsection {
  id: string
  titulo: string
  descripcion: string
  triggers: string[]
  pasos: string[]
  /** If true, section is always shown as in scope regardless of manifest triggers */
  alwaysInScope?: boolean
}

export interface Section {
  id: string
  titulo: string
  descripcion: string
  subsecciones: Subsection[]
}

export interface Module {
  id: string
  nombre: string
  descripcion: string
  secciones: Section[]
}

export interface MethodologyData {
  metodologia: string
  version: string
  descripcion: string
  modulos: Module[]
}

/** Flatten all subsections from methodology (for trigger map, export, etc.) */
export function flattenSubsections(data: MethodologyData | null): Subsection[] {
  if (!data?.modulos?.length) return []
  return data.modulos.flatMap((m) =>
    m.secciones.flatMap((s) => s.subsecciones)
  )
}

export type TriggerMatchMap = Record<string, boolean>
